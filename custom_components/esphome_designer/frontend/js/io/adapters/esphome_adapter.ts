/**
 * @file esphome_adapter.ts
 * @description ESPHome-specific output adapter.
 */

import { Logger } from '../../utils/logger.js';
import { getHaHeaders, haFetch } from '../ha_api.js';
import { BaseAdapter } from './base_adapter.js';
import { AppState } from '../../core/state';
import { registry } from '../../core/plugin_registry.js';
import { Utils } from '../../core/utils';
import { DEVICE_PROFILES } from '../devices.js';
import * as Generators from '../hardware_generators.js';
import { generateLVGLSnippet, resolveDisplayId, serializeWidget } from '../yaml_export_lvgl.js';
import { COLORS, ALIGNMENT } from '../../core/constants';
import { FontRegistry } from './font_registry.js';
import { YamlGenerator } from './yaml_generator.js';
import { applyPackageOverrides } from '../generators/yaml_merger.js';
import { generateDisplayLambda } from '../generators/native_generator.js';
import { processPackageContent } from './package_processor.js';
import { hardwareProfileRuntime } from '../hardware_profile_sources.js';
import { hasHaBackend, HA_API_BASE } from '../../utils/env.js';
import { collectRenderableWidgets, createExportContext } from './esphome_adapter_context.js';
import { buildGlobalExportSections, appendMqttSection, sortExportPlugins } from './esphome_adapter_generate_sections.js';
import { detectRenderingMode, resolveAdapterProfile } from './esphome_adapter_profile.js';
import { processPendingTriggers, buildInfrastructureLines, buildSensorSections } from './esphome_adapter_sections.js';

export class ESPHomeAdapter extends BaseAdapter {
    fonts!: FontRegistry;
    yaml!: YamlGenerator;
    usedPlugins: Set<any> = new Set();
    preProcessWidgetsPromise?: Promise<void>;
    _pendingTouchSensors: string[] = [];

    constructor() {
        super();
        this.fonts = new FontRegistry();
        this.yaml = new YamlGenerator();
        this.reset();
    }

    reset(): void {
        if (this.fonts) this.fonts.reset();
        this.usedPlugins = new Set();
    }

    async generate(layout: any): Promise<string> {
        if (!layout) {
            Logger.error("ESPHomeAdapter: Missing layout");
            return "";
        }
        this.reset();

        const pages = layout.pages || [];
        const model = layout.deviceModel || (AppState ? (AppState as any).deviceModel : null) || "reterminal_e1001";
        const profile = this._resolveProfile(model, layout);

        const isLvgl = this._detectRenderingMode(layout, profile, pages);

        const lines: string[] = [];

        // 1. Preparation
        const displayId = resolveDisplayId(profile);

        this.preProcessWidgetsPromise = this.preProcessWidgets(pages);
        await this.preProcessWidgetsPromise;

        // 2. Hardware Package (Pre-fetch for later)
        let packageContent: string | null = null;
        if (profile.isPackageBased) {
            if (profile.isOfflineImport && profile.content) {
                packageContent = profile.content;
            } else if (profile.hardwarePackage) {
                packageContent = await this.fetchHardwarePackage(profile.hardwarePackage);
            }
        }

        const allWidgets = collectRenderableWidgets(pages);
        const context = createExportContext({
            widgets: allWidgets,
            profile,
            layout,
            displayId,
            adapter: this,
            isLvgl,
            appState: AppState
        });

        const { globalLines, requiresMaterialIcons } = buildGlobalExportSections({
            context,
            layout,
            profile,
            pages,
            registry,
            yaml: this.yaml,
            fonts: this.fonts
        });
        if (!layout.isSelectionSnippet) {
            lines.push(...this.yaml.generateInstructionHeader(profile, layout, requiresMaterialIcons));
            lines.push(...this.yaml.generateSystemSections(profile, layout));
            lines.push("");
        }

        if (globalLines.length > 0 && !layout.isSelectionSnippet) {
            lines.push("globals:");
            lines.push(...globalLines.map(l => "  " + l));
        }

        // 2. Hardware Infrastructure (PSRAM, I2C, SPI, output, time, sensor seeding)
        this._buildInfrastructureLines(profile, layout, lines, packageContent, context.seenSensorIds);

        appendMqttSection(lines, allWidgets, !!layout.isSelectionSnippet);

        // 3. Sensor Sections (Numeric, Text, Binary, Touch)
        this._buildSensorSections(context, lines);

        // Top-level Components (image, graph, etc.)
        const plugins = sortExportPlugins(registry.getAll());
        plugins.forEach(p => p.onExportComponents && p.onExportComponents({ ...context, lines }));

        // Before generating fonts/scripts, generate the lambda content to track dependencies
        const lambdaContent = generateDisplayLambda(pages, layout, profile, context, this);

        // 5. Fonts
        lines.push(...this.fonts.getLines(layout.glyphsets, layout.extendedLatinGlyphs));

        // 6. Scripts
        const scriptLines = this.yaml.generateScriptSection(layout, pages, profile);
        if (scriptLines.length > 0) {
            lines.push(...scriptLines);
        }

        // 6.5 LVGL (If supported)
        let hasLvgl = false;
        if (isLvgl && generateLVGLSnippet) {
            const lvglSnippet = generateLVGLSnippet(pages, model, profile, layout);
            if (lvglSnippet && lvglSnippet.length > 0) {
                lines.push(...lvglSnippet);
                hasLvgl = true;
            }
        }

        // 7. Display Hardware & Lambda
        if (!profile.isPackageBased) {
            const hardwareLines = Generators.generateDisplaySection
                ? Generators.generateDisplaySection(profile, layout, isLvgl)
                : [];
            lines.push(...hardwareLines);

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === "display:") {
                    let j = i + 1;
                    while (j < lines.length && (lines[j].startsWith("  ") || lines[j].trim() === "")) j++;
                    if (!hasLvgl) {
                        lines.splice(j, 0, "    lambda: |-", ...lambdaContent.map(l => l.trim() ? "      " + l : ""));
                    }
                    break;
                }
            }
        } else if (packageContent) {
            return processPackageContent(packageContent, lambdaContent, this._pendingTouchSensors, profile, layout, isLvgl, lines);
        }

        return lines.map(l => l.trimEnd()).join('\n');
    }

    async preProcessWidgets(pages: any[]): Promise<void> {
        for (const p of pages) {
            if (p.widgets) {
                for (const w of p.widgets.filter((widget: any) => !widget.hidden && widget.type !== 'group')) {
                    const type = w.type;
                    const plugin = registry ? await registry.load(type) : null;
                    if (plugin) {
                        this.usedPlugins.add(plugin);

                        if (typeof plugin.collectRequirements === 'function') {
                            plugin.collectRequirements(w, {
                                trackIcon: (name: string, size: number) => this.fonts.trackIcon(name, size),
                                addFont: (f: string, w: number, s: number, i: boolean) => this.fonts.addFont(f, w, s, i)
                            });
                        }
                    }

                }
            }
        }
    }

    processPendingTriggers(sensorLines: string[], pendingTriggers: Map<string, Set<string>>, isLvgl: boolean, triggerName: string = "on_value"): string[] {
        return processPendingTriggers(sensorLines, pendingTriggers, isLvgl, triggerName);
    }


    async fetchHardwarePackage(url: string): Promise<string> {
        let fetchUrl = url;
        if (!url.startsWith("http") && !url.startsWith("/") && hasHaBackend() && HA_API_BASE) {
            fetchUrl = `${HA_API_BASE}/hardware/package?path=${encodeURIComponent(url)}`;
        }

        try {
            const requestOptions: RequestInit = { cache: "no-store" };
            const isHaApiRequest = fetchUrl.startsWith('/api/esphome_designer/')
                || (!!HA_API_BASE && fetchUrl.startsWith(`${HA_API_BASE}/`));
            const response = isHaApiRequest
                ? await haFetch(fetchUrl, {
                    ...requestOptions,
                    headers: getHaHeaders(),
                })
                : await fetch(fetchUrl, requestOptions);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (e: any) {
            const filename = url.startsWith('hardware/') ? url.slice('hardware/'.length) : '';
            const bundled = hardwareProfileRuntime.getGlob()?.()[`../../hardware/${filename}`];
            if (typeof bundled === 'string') {
                Logger.warn(`Using bundled hardware fallback for ${url}`);
                return bundled;
            }
            Logger.error("Failed to fetch hardware package:", e);
            return `# ERROR LOADING PROFILE: ${e.message}`;
        }
    }

    _resolveProfile(model: string, layout: any): any {
        return resolveAdapterProfile(model, layout, DEVICE_PROFILES as Record<string, any>);
    }

    _detectRenderingMode(layout: any, profile: any, pages: any[]): boolean {
        return detectRenderingMode(layout, profile, pages, AppState);
    }

    _buildInfrastructureLines(profile: any, layout: any, lines: string[], packageContent: string | null, seenSensorIds: Set<string>): void {
        buildInfrastructureLines(profile, layout, lines, packageContent, seenSensorIds);
    }

    _buildSensorSections(context: any, lines: string[]): void {
        buildSensorSections({
            context,
            lines,
            yaml: this.yaml,
            setPendingTouchSensors: (touchSensorContent) => {
                this._pendingTouchSensors = touchSensorContent;
            }
        });
    }
}
