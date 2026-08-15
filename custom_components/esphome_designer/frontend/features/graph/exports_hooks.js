import { getSensorPlatformLines } from '../../js/io/adapters/mqtt_helpers.js';
import { buildLvglBoundsLines, buildLvglLineUpdateAction, buildLvglLiveUpdateAction, getLvglGraphIds, getLvglGraphPointCount } from './exports_lvgl.js';
import { inferGraphTimeGrid, resolveGraphValueGrid, toEsphomeTimePeriod } from '../../js/utils/graph_helpers.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, _pageIndex?: number }} GraphWidget */

/**
 * @param {Record<string, any>} context
 */
export const onExportComponents = (context) => {
    const { lines, widgets, profile, layout, isLvgl } = context;
    if (isLvgl) return;

    const graphWidgets = widgets.filter((/** @type {GraphWidget} */ w) => w.type === 'graph');
    const useInvertedColors = !!(profile?.features?.inverted_colors || layout?.invertedColors);
    /** @type {Record<string, number[]>} */
    const COLOR_MAP = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        yellow: [255, 255, 0],
        orange: [255, 165, 0],
        gray: [160, 160, 160],
        grey: [160, 160, 160],
        purple: [128, 0, 128],
        cyan: [0, 255, 255],
        magenta: [255, 0, 255],
    };

    if (graphWidgets.length > 0) {
        lines.push("color:");
        graphWidgets.forEach((/** @type {GraphWidget} */ w) => {
            const p = w.props || {};
            const colorId = `graph_color_${w.id}`.replace(/-/g, "_");
            const pageIndex = w._pageIndex || 0;
            const page = (layout?.pages || [])[pageIndex] || {};
            const isDarkMode = !!(page.dark_mode === 'dark' || (page.dark_mode === 'inherit' && layout?.darkMode));

            let r = 0;
            let g = 0;
            let b = 0;
            const colorValue = p.color || 'theme_auto';

            if (colorValue === 'theme_auto') {
                if (isDarkMode) {
                    r = 255;
                    g = 255;
                    b = 255;
                }
            } else if (colorValue.startsWith('#')) {
                const hex = colorValue.substring(1);
                r = parseInt(hex.substring(0, 2), 16) || 0;
                g = parseInt(hex.substring(2, 4), 16) || 0;
                b = parseInt(hex.substring(4, 6), 16) || 0;
            } else if (colorValue.startsWith('0x')) {
                const hex = colorValue.substring(2);
                r = parseInt(hex.substring(0, 2), 16) || 0;
                g = parseInt(hex.substring(2, 4), 16) || 0;
                b = parseInt(hex.substring(4, 6), 16) || 0;
            } else {
                const namedColor = COLOR_MAP[String(colorValue).toLowerCase()];
                if (namedColor) {
                    [r, g, b] = namedColor;
                }
            }

            const shouldInvert = useInvertedColors !== isDarkMode;
            if (shouldInvert) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
            }

            lines.push(`  - id: ${colorId}`);
            lines.push(`    red_int: ${r}`);
            lines.push(`    green_int: ${g}`);
            lines.push(`    blue_int: ${b}`);
        });
        lines.push("");

        lines.push("graph:");
        graphWidgets.forEach((/** @type {GraphWidget} */ w) => {
            const p = w.props || {};
            const safeId = `graph_${w.id}`.replace(/-/g, "_");
            const colorId = `graph_color_${w.id}`.replace(/-/g, "_");
            // ESPHome has no "week" unit: 1w must be emitted as 7d or the config fails validation.
            const duration = toEsphomeTimePeriod(p.duration || "1h");
            const width = parseInt(String(w.width), 10);
            const height = parseInt(String(w.height), 10);
            const maxRange = p.max_range ? parseFloat(p.max_range) : null;
            const minRange = p.min_range ? parseFloat(p.min_range) : null;

            const gridEnabled = p.grid !== false;
            let xGrid = "";
            let yGrid = "";

            if (gridEnabled) {
                // x_grid is a time period relative to duration (24h => one line per day).
                xGrid = toEsphomeTimePeriod(p.x_grid || inferGraphTimeGrid(duration), inferGraphTimeGrid(duration));
                // y_grid must be a float > 0 for ESPHome, never 0/NaN.
                yGrid = resolveGraphValueGrid(p.y_grid, p.min_value, p.max_value);
            }

            let entityId = (w.entity_id || "").trim();
            if (entityId && !entityId.includes(".") && !p.is_local_sensor && !entityId.toLowerCase().startsWith("mqtt:")) {
                entityId = `sensor.${entityId}`;
            }
            const localSensorId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") || "none";
            const lineType = (p.line_type || "SOLID").toUpperCase();
            const lineThickness = parseInt(p.line_thickness || 3, 10);
            const border = p.border !== false;
            const continuous = !!p.continuous;

            lines.push(`  - id: ${safeId}`);
            lines.push(`    duration: ${duration}`);
            lines.push(`    width: ${width}`);
            lines.push(`    height: ${height}`);
            lines.push(`    border: ${border}`);
            if (gridEnabled && xGrid) lines.push(`    x_grid: ${xGrid}`);
            if (gridEnabled && yGrid) lines.push(`    y_grid: ${yGrid}`);
            lines.push('    traces:');
            lines.push(`      - sensor: ${localSensorId}`);
            lines.push(`        color: ${colorId}`);
            lines.push(`        line_thickness: ${lineThickness}`);
            if (lineType !== "SOLID") lines.push(`        line_type: ${lineType}`);
            if (continuous) lines.push('        continuous: true');

            const hasMinValue = p.min_value !== undefined && p.min_value !== null && String(p.min_value).trim() !== "";
            const hasMaxValue = p.max_value !== undefined && p.max_value !== null && String(p.max_value).trim() !== "";
            const hasMinRange = minRange !== null;
            const hasMaxRange = maxRange !== null;

            if (hasMinValue) lines.push(`    min_value: ${p.min_value}`);
            if (hasMaxValue) lines.push(`    max_value: ${p.max_value}`);
            if (hasMaxRange) lines.push(`    max_range: ${maxRange}`);
            if (hasMinRange) lines.push(`    min_range: ${minRange}`);
            if (!hasMinValue && !hasMaxValue && !hasMinRange && !hasMaxRange) {
                lines.push('    min_range: 10');
            }
        });
        lines.push("");
    }
};

/**
 * @param {Record<string, any>} context
 */
export const onExportGlobals = (context) => {
    const { lines, widgets } = context;
    widgets.filter((/** @type {GraphWidget} */ w) => w.type === 'graph' && context.isLvgl && (w.entity_id || '').trim()).forEach((/** @type {GraphWidget} */ w) => {
        const { samplesId, countId, minId, maxId } = getLvglGraphIds(w);
        const points = getLvglGraphPointCount(w);
        lines.push(`- id: ${samplesId}`);
        lines.push(`  type: float[${points}]`);
        lines.push(`- id: ${countId}`);
        lines.push('  type: int');
        lines.push("  initial_value: '0'");
        lines.push(`- id: ${minId}`);
        lines.push('  type: float');
        lines.push("  initial_value: '0'");
        lines.push(`- id: ${maxId}`);
        lines.push('  type: float');
        lines.push("  initial_value: '100'");
    });

    widgets.filter((/** @type {GraphWidget} */ w) => w.type === 'graph' && w.props?.use_ha_history).forEach((/** @type {GraphWidget} */ w) => {
        const props = w.props || {};
        const histId = `hist_${w.id}`.replace(/-/g, "_");
        const points = props.history_points || 100;
        lines.push(`- id: ${histId}`);
        lines.push(`  type: float[${points}]`);
        lines.push(`- id: ${histId}_count`);
        lines.push('  type: int');
        lines.push("  initial_value: '0'");
        if (props.auto_scale !== false) {
            lines.push(`- id: ${histId}_min`);
            lines.push('  type: float');
            lines.push("  initial_value: '0'");
            lines.push(`- id: ${histId}_max`);
            lines.push('  type: float');
            lines.push("  initial_value: '100'");
        }
    });
};

/**
 * @param {Record<string, any>} context
 */
export const onExportEsphome = (context) => {
    const { lines, widgets } = context;
    const hasHistoryGraph = widgets.some((/** @type {GraphWidget} */ w) => w.type === 'graph' && w.props?.use_ha_history);
    if (hasHistoryGraph) {
        if (!lines.includes("<algorithm>")) lines.push("<algorithm>");
        if (!lines.includes("<cstdlib>")) lines.push("<cstdlib>");
        if (!lines.includes("<vector>")) lines.push("<vector>");
    }
};

/**
 * @param {Record<string, any>} context
 */
export const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    widgets.filter((/** @type {GraphWidget} */ w) => w.type === 'graph' && w.props?.use_ha_history).forEach((/** @type {GraphWidget} */ w) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        if (!entityId) return;

        const histId = `hist_${w.id}`.replace(/-/g, "_");
        const points = p.history_points || 100;
        const attr = p.history_attribute || "history";

        const fakeWidget = { props: { mqtt_topic: p.mqtt_topic } };
        lines.push(...getSensorPlatformLines(fakeWidget, entityId, `${histId}_fetcher`, attr));
        lines.push('  on_value:');
        lines.push('    then:');
        lines.push('      - lambda: |-');
        lines.push('          std::string input = x;');
        lines.push('          if (input.empty()) return;');
        lines.push('          ');
        lines.push('          std::vector<float> values;');
        lines.push('          ');
        lines.push('          // Check if structured format (contains "value:")');
        lines.push('          if (input.find("value:") != std::string::npos || input.find("value :") != std::string::npos) {');
        lines.push('            // Lightweight parsing without regex to avoid compiler errors');
        lines.push('            size_t pos = 0;');
        lines.push('            while ((pos = input.find("value", pos)) != std::string::npos) {');
        lines.push('                size_t colon = input.find(\':\', pos);');
        lines.push('                if (colon == std::string::npos) break;');
        lines.push('                ');
        lines.push('                // Parse number after colon');
        lines.push('                size_t val_start = colon + 1; ');
        lines.push('                while (val_start < input.length() && (input[val_start] == \' \' || input[val_start] == \'"\' || input[val_start] == \'\\\'\')) val_start++;');
        lines.push('                ');
        lines.push('                if (val_start < input.length()) {');
        lines.push('                    char *end_ptr;');
        lines.push('                    float val = std::strtof(input.c_str() + val_start, &end_ptr);');
        lines.push('                    if (end_ptr != input.c_str() + val_start) {');
        lines.push('                        values.push_back(val);');
        lines.push('                    }');
        lines.push('                }');
        lines.push('                pos = colon + 1;');
        lines.push('            }');
        lines.push('          } else {');
        lines.push('            // Simple array format: [10, 11, 12] or ["10", "11"]');
        lines.push('            input.erase(std::remove(input.begin(), input.end(), \'[\'), input.end());');
        lines.push('            input.erase(std::remove(input.begin(), input.end(), \']\'), input.end());');
        lines.push('            input.erase(std::remove(input.begin(), input.end(), \'"\'), input.end());');
        lines.push('            input.erase(std::remove(input.begin(), input.end(), \'\\\'\'), input.end());');
        lines.push('            std::replace(input.begin(), input.end(), \',\', \' \');');
        lines.push('            const char* ptr = input.c_str();');
        lines.push('            char* end;');
        lines.push('            while (*ptr) {');
        lines.push('                float val = std::strtof(ptr, &end);');
        lines.push('                if (ptr == end) {');
        lines.push('                    ptr++;');
        lines.push('                } else {');
        lines.push('                    values.push_back(val);');
        lines.push('                    ptr = end;');
        lines.push('                }');
        lines.push('            }');
        lines.push('          }');
        lines.push('          ');
        lines.push('          // Populate global array');
        lines.push('          int idx = 0;');
        if (p.auto_scale !== false) {
            lines.push('          float min_v = 1e30, max_v = -1e30;');
        }
        lines.push('          for (float val : values) {');
        lines.push(`            if (idx >= ${points}) break;`);
        lines.push(`            id(${histId})[idx++] = val;`);
        if (p.auto_scale !== false) {
            lines.push('            if (val < min_v) min_v = val;');
            lines.push('            if (val > max_v) max_v = val;');
        }
        lines.push('          }');
        lines.push(`          id(${histId}_count) = idx;`);
        if (p.auto_scale !== false) {
            lines.push(`          id(${histId}_min) = min_v;`);
            lines.push(`          id(${histId}_max) = max_v;`);
        }
        if (p.history_smoothing) {
            lines.push('          // Simple moving average smoothing (window=3)');
            lines.push('          for (int i = 1; i < idx - 1; i++) {');
            lines.push(`             id(${histId})[i] = (id(${histId})[i-1] + id(${histId})[i] + id(${histId})[i+1]) / 3.0;`);
            lines.push('          }');
        }
        if (context.isLvgl) {
            lines.push('      - lambda: |-');
            lines.push('          if (idx <= 0) return;');
            buildLvglBoundsLines(w, 'idx', (/** @type {string} */ index) => `id(${histId})[${index}]`).forEach((line) => {
                lines.push(`          ${line}`);
            });
            const { samplesId, countId } = getLvglGraphIds(w);
            lines.push(`          int limit = std::min(idx, ${getLvglGraphPointCount(w)});`);
            lines.push(`          id(${countId}) = limit;`);
            lines.push('          int start = idx > limit ? idx - limit : 0;');
            lines.push('          for (int i = 0; i < limit; i++) {');
            lines.push(`            id(${samplesId})[i] = id(${histId})[start + i];`);
            lines.push('          }');
            buildLvglBoundsLines(w, `id(${countId})`, (/** @type {string} */ index) => `id(${samplesId})[${index}]`).forEach((line) => {
                lines.push(`          ${line}`);
            });
            buildLvglLineUpdateAction(w).split('\n').forEach((line) => {
                lines.push(`      ${line}`);
            });
        }
    });
};

/**
 * @param {Record<string, any>} context
 */
export const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "graph") continue;

        let entityId = (w.entity_id || "").trim();
        const p = w.props || {};
        if (!entityId || p.is_local_sensor) continue;

        if (!entityId.includes(".") && !entityId.toLowerCase().startsWith("mqtt:")) {
            entityId = `sensor.${entityId}`;
        }

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(buildLvglLiveUpdateAction(w));
        }
    }
};
