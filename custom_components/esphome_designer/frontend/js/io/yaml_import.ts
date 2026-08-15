import { AppState } from '../core/state';
import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES } from './devices.js';
import { omitSecretSettings } from '../core/stores/secrets_store.js';
import * as yaml from 'js-yaml';
import {
    DESIGNER_STATE_TRIGGER_MARKER,
    HA_BINARY_DOMAINS
} from './adapters/entity_dedup.js';

import { parseSettings } from './yaml_parsers/settings_parser.js';
import { parseDisplayBlocks } from './yaml_parsers/display_parser.js';
import { extractLambdaLines } from './yaml_parsers/lambda_extractor.js';
import { isBareOEPLArray, parseOEPLArrayToLayout } from './yaml_parsers/oepl_parser.js';

export interface ParsedWidget {
    id?: string;
    type?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    locked?: boolean;
    [key: string]: any;
}

export interface ParsedPage {
    id?: string;
    name?: string;
    widgets?: ParsedWidget[];
    [key: string]: any;
}

export interface ParsedLayout {
    name?: string;
    deviceName?: string;
    device_model?: string;
    deviceModel?: string;
    device_id?: string;
    currentLayoutId?: string;
    settings?: Record<string, any>;
    customHardware?: Record<string, any>;
    custom_hardware?: Record<string, any>;
    protocolHardware?: Record<string, any>;
    protocol_hardware?: Record<string, any>;
    manualYamlOverride?: string;
    manual_yaml_override?: string;
    importWarnings?: string[];
    pages?: ParsedPage[];
    data?: {
        devices?: Record<string, any>;
    };
    [key: string]: any;
}

interface RawTriggerBlock {
    entityId: string;
    triggerName: 'on_state' | 'on_value';
    actionsText: string;
    widgetId: string | null;
}

const SYSTEM_ROOT_KEYS = [
    'esphome:', 'esp32:', 'esp8266:', 'psram:', 'wifi:', 'api:', 'ota:',
    'logger:', 'web_server:', 'captive_portal:', 'preferences:',
    'platformio_options:', 'deep_sleep:'
];

const SYSTEM_SECTION_IMPORT_WARNING = 'Imported root hardware/system YAML for context; generated output may still comment those sections to avoid duplicate ESPHome definitions.';

const SNAKE_CASE_SETTING_MAP: Record<string, string> = {
    dark_mode: 'darkMode',
    inverted_colors: 'invertedColors',
    refresh_interval: 'refreshInterval',
    manual_refresh_only: 'manualRefreshOnly',
    auto_cycle_enabled: 'autoCycleEnabled',
    auto_cycle_interval_s: 'autoCycleIntervalS',
    lcd_eco_strategy: 'lcdEcoStrategy',
    sleep_enabled: 'sleepEnabled',
    sleep_start_hour: 'sleepStartHour',
    sleep_end_hour: 'sleepEndHour',
    deep_sleep_enabled: 'deepSleepEnabled',
    deep_sleep_interval: 'deepSleepInterval',
    deep_sleep_stay_awake_switch: 'deepSleepStayAwakeSwitch',
    deep_sleep_stay_awake_entity_id: 'deepSleepStayAwakeEntityId',
    deep_sleep_firmware_guard: 'deepSleepFirmwareGuard',
    daily_refresh_enabled: 'dailyRefreshEnabled',
    daily_refresh_time: 'dailyRefreshTime',
    no_refresh_start_hour: 'noRefreshStartHour',
    no_refresh_end_hour: 'noRefreshEndHour',
    rendering_mode: 'renderingMode',
    extended_latin_glyphs: 'extendedLatinGlyphs',
    oepl_entity_id: 'oeplEntityId',
    oepl_dither: 'oeplDither',
    opendisplay_device_id: 'opendisplayDeviceId',
    opendisplay_entity_id: 'opendisplayEntityId',
    opendisplay_dither: 'opendisplayDither',
    opendisplay_ttl: 'opendisplayTtl'
};

/**
 * Users often paste snippets copied from GitHub discussions, including
 * surrounding Markdown code fences or single inline backticks. Strip those
 * wrappers before handing the text to the YAML parser.
 *
 * @param {string} yamlText
 * @returns {string}
 */
function normalizePastedYamlSnippet(yamlText: string): string {
    let text = String(yamlText || '').trim();

    const fenced = text.match(/^```[a-zA-Z0-9_-]*\s*\r?\n([\s\S]*?)\r?\n```$/);
    if (fenced) return fenced[1].trim();

    if (text.startsWith('`') && text.endsWith('`') && !text.startsWith('```')) {
        text = text.slice(1, -1).trim();
    }

    return text;
}

/**
 * Normalize mixed camelCase/snake_case layout settings into the frontend's camelCase shape.
 * @param {Record<string, any>} settings
 * @returns {Record<string, any>}
 */
function normalizeImportedSettings(settings: Record<string, any>): Record<string, any> {
    const normalized: Record<string, any> = {};

    Object.entries(settings).forEach(([key, value]) => {
        if (value === undefined) return;
        normalized[key] = value;

        const mappedKey = SNAKE_CASE_SETTING_MAP[key];
        if (mappedKey && normalized[mappedKey] === undefined) {
            normalized[mappedKey] = value;
        }
    });

    const deviceId = typeof normalized.opendisplayDeviceId === 'string'
        ? normalized.opendisplayDeviceId.trim()
        : '';
    const legacyEntityId = typeof normalized.opendisplayEntityId === 'string'
        ? normalized.opendisplayEntityId.trim()
        : '';

    if (!normalized.opendisplayEntityId && deviceId) {
        normalized.opendisplayEntityId = deviceId;
    }

    if (!deviceId && legacyEntityId && !legacyEntityId.includes('.') && !/\s/.test(legacyEntityId)) {
        normalized.opendisplayDeviceId = legacyEntityId;
    }

    return normalized;
}

/**
 * Creates a custom js-yaml schema that supports ESPHome tags like !lambda.
 * @returns {Object|null} The extended YAML schema, or null if unavailable
 */
function getESPHomeSchema(): yaml.Schema | null {
    if (!yaml || !yaml.Type || !yaml.DEFAULT_SCHEMA) {
        return null;
    }

    try {
        const LambdaType = new yaml.Type('!lambda', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        const SecretType = new yaml.Type('!secret', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        const IncludeType = new yaml.Type('!include', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        return yaml.DEFAULT_SCHEMA.extend([LambdaType, SecretType, IncludeType]);
    } catch (e) {
        Logger.warn("[getESPHomeSchema] Could not extend schema, falling back to default.");
        return yaml.DEFAULT_SCHEMA;
    }
}

/**
 * Extract an ODP/OEPL payload block directly from raw YAML when top-level parsing fails.
 * This handles templated strings that may not survive a full safe_load pass.
 * @param {string} yamlText
 * @returns {any[] | null}
 */
function extractServicePayloadArray(yamlText: string): any[] | null {
    const serviceMatch = yamlText.match(/^\s*(?:service|action):\s*([^\n]+)\s*$/m);
    if (!serviceMatch) {
        return null;
    }

    const serviceName = serviceMatch[1].trim();
    if (!['opendisplay.drawcustom', 'open_epaper_link.drawcustom'].includes(serviceName)) {
        return null;
    }

    const lines = yamlText.split(/\r?\n/);
    const payloadStart = lines.findIndex((line) => /^\s*payload:\s*(?:\|-)?\s*$/.test(line));
    if (payloadStart === -1) {
        return null;
    }

    const payloadIndent = getLineIndent(lines[payloadStart]);
    const payloadLines: string[] = [];
    for (let index = payloadStart + 1; index < lines.length; index += 1) {
        const line = lines[index];
        if (line.trim() === '') {
            payloadLines.push('');
            continue;
        }

        if (getLineIndent(line) <= payloadIndent) {
            break;
        }

        payloadLines.push(line.slice(payloadIndent + 2));
    }

    if (payloadLines.length === 0) {
        return null;
    }

    try {
        const schema = getESPHomeSchema();
        const parsed = yaml.load(payloadLines.join('\n'), schema ? { schema } : {});
        return Array.isArray(parsed) ? parsed : null;
    } catch (e) {
        Logger.warn('[extractServicePayloadArray] Failed to parse payload block', e);
        return null;
    }
}

function applyProtocolRotation(layout: ParsedLayout | null, rotate: unknown): ParsedLayout | null {
    if (!layout) return layout;
    const numericRotate = Number(rotate);
    if (!Number.isFinite(numericRotate)) return layout;

    const normalizedRotate = ((numericRotate % 360) + 360) % 360;
    layout.settings = {
        ...(layout.settings || {}),
        orientation: ({
            0: 'landscape',
            90: 'portrait',
            180: 'landscape_inverted',
            270: 'portrait_inverted'
        } as Record<number, string>)[normalizedRotate] || 'landscape'
    };
    return layout;
}

function getLineIndent(line: string): number {
    return (line.match(/^\s*/) || [''])[0].length;
}

function hasUncommentedSystemRootSections(rawLines: string[]): boolean {
    return rawLines.some((line) => {
        if (getLineIndent(line) !== 0) return false;
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return false;
        return SYSTEM_ROOT_KEYS.includes(trimmed);
    });
}

function appendImportWarning(layout: ParsedLayout | null, warning: string): ParsedLayout | null {
    if (!layout) return layout;
    const warnings = Array.isArray(layout.importWarnings) ? layout.importWarnings : [];
    if (!warnings.includes(warning)) {
        layout.importWarnings = [...warnings, warning];
    }
    return layout;
}

function extractMarkedWidgetId(actionLines: string[]): string | null {
    const markerLine = actionLines.find((line) => line.trim().startsWith(DESIGNER_STATE_TRIGGER_MARKER));
    if (!markerLine) {
        return null;
    }

    return markerLine.trim().slice(DESIGNER_STATE_TRIGGER_MARKER.length).trim() || null;
}

function stripStateTriggerMarker(actionLines: string[]): string[] {
    return actionLines.filter((line) => !line.trim().startsWith(DESIGNER_STATE_TRIGGER_MARKER));
}

function isKnownGeneratedStateTrigger(actionsText: string): boolean {
    const normalized = actionsText.trim();
    if (!normalized) return true;

    if (/^- lvgl\.widget\.refresh:\s+[A-Za-z0-9_:-]+\s*$/m.test(normalized)) {
        return true;
    }

    return /- lvgl\.widget\.update:\s*\n\s+id:\s*[A-Za-z0-9_:-]+\s*\n\s+state:\s*\n\s+checked:\s*!lambda return x;?\s*$/m.test(normalized);
}

function extractRawTriggerBlocks(rawLines: string[]): RawTriggerBlock[] {
    const sections = ['sensor:', 'text_sensor:', 'binary_sensor:', 'switch:'];
    /** @type {RawTriggerBlock[]} */
    const blocks: RawTriggerBlock[] = [];

    for (let sectionIndex = 0; sectionIndex < rawLines.length; sectionIndex += 1) {
        const sectionLine = rawLines[sectionIndex];
        if (!sections.includes(sectionLine.trim())) continue;

        const sectionIndent = getLineIndent(sectionLine);
        let sectionEnd = rawLines.length;
        for (let lineIndex = sectionIndex + 1; lineIndex < rawLines.length; lineIndex += 1) {
            const line = rawLines[lineIndex];
            if (!line.trim()) continue;
            if (getLineIndent(line) <= sectionIndent) {
                sectionEnd = lineIndex;
                break;
            }
        }

        for (let itemStart = sectionIndex + 1; itemStart < sectionEnd; itemStart += 1) {
            const itemLine = rawLines[itemStart];
            if (!itemLine.trim().startsWith('- ') || getLineIndent(itemLine) !== sectionIndent + 2) {
                continue;
            }

            let itemEnd = sectionEnd;
            for (let lineIndex = itemStart + 1; lineIndex < sectionEnd; lineIndex += 1) {
                const line = rawLines[lineIndex];
                if (line.trim().startsWith('- ') && getLineIndent(line) === sectionIndent + 2) {
                    itemEnd = lineIndex;
                    break;
                }
            }

            const itemLines = rawLines.slice(itemStart, itemEnd);
            const entityLine = itemLines.find((line) => /^\s*entity_id:\s*/.test(line));
            if (!entityLine) {
                itemStart = itemEnd - 1;
                continue;
            }

            const entityMatch = entityLine.match(/^\s*entity_id:\s*["']?([^"'\s#]+)["']?/);
            const entityId = entityMatch?.[1]?.trim();
            if (!entityId) {
                itemStart = itemEnd - 1;
                continue;
            }

            (['on_state', 'on_value'] as const).forEach((triggerName) => {
                const triggerIndex = itemLines.findIndex((line) => line.trim() === `${triggerName}:`);
                if (triggerIndex === -1) return;

                const triggerIndent = getLineIndent(itemLines[triggerIndex]);
                const thenIndex = itemLines.findIndex((line, index) => index > triggerIndex && line.trim() === 'then:');
                if (thenIndex === -1 || getLineIndent(itemLines[thenIndex]) <= triggerIndent) return;

                let baseIndent: number | null = null;
                const actionLines: string[] = [];

                for (let lineIndex = thenIndex + 1; lineIndex < itemLines.length; lineIndex += 1) {
                    const line = itemLines[lineIndex];
                    if (!line.trim()) {
                        if (baseIndent !== null) actionLines.push('');
                        continue;
                    }

                    const indent = getLineIndent(line);
                    if (indent <= getLineIndent(itemLines[thenIndex])) {
                        break;
                    }

                    if (baseIndent === null) {
                        baseIndent = indent;
                    }

                    actionLines.push(line.slice(baseIndent));
                }

                if (actionLines.length === 0) return;

                const widgetId = extractMarkedWidgetId(actionLines);
                const strippedActionLines = stripStateTriggerMarker(actionLines);
                const actionsText = strippedActionLines.join('\n').trim();
                if (!actionsText) return;

                blocks.push({
                    entityId,
                    triggerName,
                    actionsText,
                    widgetId
                });
            });

            itemStart = itemEnd - 1;
        }
    }

    return blocks;
}

export function recoverDesignerStateTriggers(layout: ParsedLayout | null, rawLines: string[]): ParsedLayout | null {
    if (!layout?.pages?.length) {
        return layout;
    }

    const widgets = layout.pages.flatMap((page) => page.widgets || []);
    const widgetById = new Map(
        widgets
            .filter((widget) => widget.id)
            .map((widget) => [String(widget.id), widget])
    );

    if (widgetById.size === 0) {
        return layout;
    }

    const triggerBlocks = extractRawTriggerBlocks(rawLines);
    if (triggerBlocks.length === 0) {
        return layout;
    }

    let recoveredBlocks = 0;
    let unsupportedBlocks = 0;

    triggerBlocks.forEach((block) => {
        const targetWidget = block.widgetId ? widgetById.get(block.widgetId) : null;
        if (!targetWidget) {
            if (!isKnownGeneratedStateTrigger(block.actionsText)) {
                unsupportedBlocks += 1;
            }
            return;
        }

        const props = { ...(targetWidget.props || {}) };
        if (props.state_trigger_entity || props.state_trigger_actions) {
            unsupportedBlocks += 1;
            return;
        }

        props.state_trigger_entity = block.entityId;
        props.state_trigger_mode = block.triggerName === 'on_state' || HA_BINARY_DOMAINS.some((domain) => block.entityId.startsWith(domain))
            ? 'on_state'
            : 'on_value';
        props.state_trigger_actions = block.actionsText;
        targetWidget.props = props;
        recoveredBlocks += 1;
    });

    if (unsupportedBlocks > 0) {
        layout.importWarnings = [
            'Imported visual layout; unsupported custom automations remain raw YAML only.'
        ];
    } else if (recoveredBlocks > 0) {
        layout.importWarnings = [];
    }

    return layout;
}

/**
 * Parses an ESPHome YAML snippet offline to extract the layout.
 * 
 * @param {string} yamlText - The raw YAML/C++ payload containing the display configuration
 * @returns {ParsedLayout | null} The fully parsed project configuration and widget tree
 */
export function parseSnippetYamlOffline(yamlText: string): ParsedLayout | null {
    Logger.log("[parseSnippetYamlOffline] Start parsing...");
    const normalizedYamlText = normalizePastedYamlSnippet(yamlText);
    const rawLines = normalizedYamlText.split(/\r?\n/);

    let doc: any = {};
    let payloadFallback: any[] | null = null;
    try {
        const schema = getESPHomeSchema();
        doc = yaml.load(normalizedYamlText, schema ? { schema } : {}) || {};
    } catch (e) {
        Logger.error("[parseSnippetYamlOffline] YAML parse error:", e);
        payloadFallback = extractServicePayloadArray(normalizedYamlText);
    }

    // --- Specialized Format Detection (OEPL / ODP) ---
    if (payloadFallback && Array.isArray(payloadFallback)) {
        Logger.log("[parseSnippetYamlOffline] Recovered service payload from raw YAML block");
        return parseOEPLArrayToLayout(payloadFallback);
    }

    if (isBareOEPLArray(normalizedYamlText) && Array.isArray(doc)) {
        Logger.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format");
        return parseOEPLArrayToLayout(doc);
    }

    const actionName = doc?.action || doc?.service;
    if (actionName) {
        if (['opendisplay.drawcustom', 'open_epaper_link.drawcustom'].includes(actionName) && doc.data && doc.data.payload) {
            let payload = doc.data.payload;

            // Older adapters emitted `payload: |-` block scalars while newer ones emit
            // structured YAML arrays. Re-parse legacy string payloads when needed.
            if (typeof payload === 'string') {
                try {
                    payload = yaml.load(payload);
                } catch (e) {
                    Logger.error("[parseSnippetYamlOffline] Failed to re-parse payload string:", e);
                }
            }

            if (Array.isArray(payload)) {
                Logger.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call");
                return applyProtocolRotation(parseOEPLArrayToLayout(payload), doc.data.rotate);
            }
        }
    }

    // --- Standard ESPHome Format Parsing ---
    const lambdaLines: string[] = [];
    if (doc.display) {
        const displays = Array.isArray(doc.display) ? doc.display : [doc.display];
        displays.forEach((d: any) => { if (d && d.lambda) lambdaLines.push(...d.lambda.split("\n")); });
    }

    // Fallback to specialized scanning if lines are missing or block is manual
    if (lambdaLines.length === 0 || normalizedYamlText.includes("lvgl:")) {
        const extracted = extractLambdaLines(rawLines, normalizedYamlText);
        lambdaLines.push(...extracted);
    }

    const deviceSettings = parseSettings(rawLines, doc);
    const layout = parseDisplayBlocks(lambdaLines, rawLines, deviceSettings, getESPHomeSchema, yaml);
    const recovered = recoverDesignerStateTriggers(layout, rawLines);

    if (hasUncommentedSystemRootSections(rawLines)) {
        return appendImportWarning(recovered, SYSTEM_SECTION_IMPORT_WARNING);
    }

    return recovered;
}

/**
 * Loads a parsed layout into the application state.
 * Supports modern layout objects and legacy JSON/HA storage formats.
 * 
 * @param {ParsedLayout} layout - The project payload object to load into state
 */
export function loadLayoutIntoState(layout: ParsedLayout | null | undefined): void {
    if (!layout) return;
    Logger.log("[loadLayoutIntoState] Loading layout...");

    // 1. Handle HA Storage / Wrapped formats
    let data = layout;
    if (layout.data && layout.data.devices) {
        const firstKey = Object.keys(layout.data.devices)[0];
        data = layout.data.devices[firstKey];
    }

    if (!data) return;

    // 2. Map Device Metadata (Backward Compatibility)
    if (data.name) AppState.setDeviceName(data.name);
    else if (data.deviceName) AppState.setDeviceName(data.deviceName);

    if (data.device_model) AppState.setDeviceModel(data.device_model);
    else if (data.deviceModel) AppState.setDeviceModel(data.deviceModel);

    if (data.device_id) AppState.setCurrentLayoutId(data.device_id);
    else if (data.currentLayoutId) AppState.setCurrentLayoutId(data.currentLayoutId);

    // 3. Map Settings / Project State
    const topLevelSettings: Record<string, any> = {};
    const directSettingKeys = [
        'orientation', 'renderingMode', 'darkMode', 'invertedColors',
        'refreshInterval', 'manualRefreshOnly', 'autoCycleEnabled', 'autoCycleIntervalS',
        'lcdEcoStrategy', 'dimTimeout', 'sleepEnabled', 'sleepStartHour', 'sleepEndHour',
        'deepSleepEnabled', 'deepSleepInterval', 'deepSleepStayAwakeSwitch', 'deepSleepStayAwakeEntityId', 'deepSleepFirmwareGuard',
        'dailyRefreshEnabled', 'dailyRefreshTime',
        'noRefreshStartHour', 'noRefreshEndHour', 'oeplEntityId', 'oeplDither',
        'opendisplayDeviceId',
        'opendisplayEntityId', 'opendisplayDither', 'opendisplayTtl', 'glyphsets',
        'extendedLatinGlyphs', 'editor_light_mode', 'snapEnabled', 'showGrid',
        'showDebugGrid', 'showRulers', 'gridOpacity',
        'ai_provider', 'ai_model_filter', 'ai_model_gemini', 'ai_model_openai',
        'ai_model_openrouter', 'ai_model_minimax', 'ai_model_glm'
    ];

    directSettingKeys.forEach((key) => {
        if (data[key] !== undefined) topLevelSettings[key] = data[key];
    });

    Object.entries(SNAKE_CASE_SETTING_MAP).forEach(([snakeKey, camelKey]) => {
        if (data[snakeKey] !== undefined && topLevelSettings[camelKey] === undefined) {
            topLevelSettings[camelKey] = data[snakeKey];
        }
    });

    // Credentials are never imported from a layout: older exports embedded them,
    // and a shared layout must not overwrite the local user's API keys.
    const mergedSettings = normalizeImportedSettings(omitSecretSettings({
        ...topLevelSettings,
        ...(data.settings || {})
    }));

    if (Object.keys(mergedSettings).length > 0 && AppState.updateSettings) {
        AppState.updateSettings(mergedSettings);
    }

    const customHardware = data.customHardware || data.custom_hardware;
    if (customHardware && AppState.setCustomHardware) {
        AppState.setCustomHardware(customHardware);
    }

    const protocolHardware = data.protocolHardware || data.protocol_hardware;
    if (protocolHardware) {
        if (AppState.updateProtocolHardware) {
            AppState.updateProtocolHardware(protocolHardware);
        } else if (AppState.project?.state) {
            AppState.project.state.protocolHardware = protocolHardware;
        }
    }

    const manualYamlOverride = typeof data.manualYamlOverride === 'string'
        ? data.manualYamlOverride
        : (typeof data.manual_yaml_override === 'string' ? data.manual_yaml_override : '');
    if (typeof AppState.setManualYamlOverride === 'function') {
        AppState.setManualYamlOverride(manualYamlOverride, { emitStateChange: false });
    } else if (AppState.project?.state) {
        AppState.project.state.manualYamlOverride = manualYamlOverride;
    }

    // 4. Load Pages
    if (data.pages && AppState.setPages) {
        const processedPages = data.pages.map(p => ({
            ...p,
            widgets: (p.widgets || []).map(w => ({ ...w, locked: !!w.locked }))
        }));
        AppState.setPages(processedPages);
    }

    // 5. Restore the active page after pages exist so the canvas/sidebar
    // switch to the loaded layout deterministically.
    const rawCurrentPageIndex = data.currentPageIndex ?? data.current_page ?? 0;
    const parsedCurrentPageIndex = Number.isFinite(Number(rawCurrentPageIndex))
        ? Number(rawCurrentPageIndex)
        : 0;
    if (AppState.setCurrentPageIndex) {
        AppState.setCurrentPageIndex(parsedCurrentPageIndex, { forceFocus: true });
    }

    if (typeof AppState.replaceHistoryBaseline === 'function') {
        AppState.replaceHistoryBaseline();
    }

    Logger.log("[loadLayoutIntoState] Finished loading state.");
}

export { isBareOEPLArray, parseOEPLArrayToLayout };
