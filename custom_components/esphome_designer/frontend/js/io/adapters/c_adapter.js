import { AppState } from '../../core/state';
import { Logger } from '../../utils/logger.js';
import { ESPHomeAdapter } from './esphome_adapter';
import { collectRenderableWidgets, createExportContext } from './esphome_adapter_context.js';
import { generateDisplayLambda } from '../generators/native_generator.js';

function stripCppComment(line) {
    let inString = false;
    let escaped = false;

    for (let index = 0; index < line.length - 1; index++) {
        const char = line[index];
        if (char === '"' && !escaped) inString = !inString;
        if (!inString && char === '/' && line[index + 1] === '/') return line.slice(0, index).trimEnd();
        escaped = char === '\\' && !escaped;
        if (char !== '\\') escaped = false;
    }

    return line;
}

/**
 * Emits only the native drawing callback body, without ESPHome YAML scaffolding.
 * This gives non-ESPHome projects a compact C/C++ starting point while reusing the
 * mature direct-mode widget exporters.
 */
export class CAdapter extends ESPHomeAdapter {
    async generate(layout) {
        if (!layout) {
            Logger.error("CAdapter: Missing layout");
            return "";
        }

        this.reset();

        const pages = layout.pages || [];
        const model = layout.deviceModel || AppState?.deviceModel || "reterminal_e1001";
        const profile = this._resolveProfile(model, layout);
        const allWidgets = collectRenderableWidgets(pages);

        this.preProcessWidgetsPromise = this.preProcessWidgets(pages);
        await this.preProcessWidgetsPromise;

        const context = createExportContext({
            widgets: allWidgets,
            profile,
            layout,
            displayId: "display",
            adapter: this,
            isLvgl: false,
            appState: AppState
        });

        const currentPageIndex = Number.isFinite(Number(layout.currentPageIndex))
            ? Number(layout.currentPageIndex)
            : 0;
        const includeComments = layout.c_include_comments !== false;
        const lambdaLines = generateDisplayLambda(pages, layout, profile, context, this)
            .map((line) => line === "int currentPage = id(display_page);"
                ? `int currentPage = ${currentPageIndex};${includeComments ? ' // Set this from your app when using multiple pages.' : ''}`
                : line)
            .map((line) => includeComments ? line : stripCppComment(line))
            .filter((line) => includeComments || line.trim() !== '');
        const fontLines = this.fonts.getLines(layout.glyphsets, layout.extendedLatinGlyphs);

        const output = includeComments
            ? [
                "/*",
                " * ESPHome Designer C/C++ drawing output",
                " *",
                " * Paste this into a display render callback where the drawing target is named `it`.",
                " * Dynamic Home Assistant values are left as `id(...)` placeholders so they can be",
                " * replaced with variables from your own application.",
                " */",
                ""
            ]
            : [];

        if (includeComments && fontLines.length > 0) {
            output.push("/* Font references used by this drawing code:");
            output.push(...fontLines.map((line) => ` * ${line}`));
            output.push(" */", "");
        }

        output.push(...lambdaLines);
        return output.map((line) => line.trimEnd()).join('\n');
    }

    async preProcessWidgets(pages) {
        await super.preProcessWidgets(pages);
    }
}
