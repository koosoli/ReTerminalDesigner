import { Logger } from '../../utils/logger.js';

import { buildWidgetProps } from './widget_props_map.js';
import { parseCppDrawingCommand } from './cpp_drawing_parser.js';

/**
 * @typedef {{ load: (text: string, options?: Record<string, any>) => any }} YamlModuleLike
 * @typedef {Record<string, any> & { device_name?: string }} DeviceSettingsLike
 * @typedef {Record<string, any> & {
 *   _inline?: string;
 *   id?: string;
 *   type?: string;
 *   x?: string | number;
 *   y?: string | number;
 *   width?: string | number;
 *   height?: string | number;
 *   w?: string | number;
 *   h?: string | number;
 *   title?: string;
 *   name?: string;
 *   entity_id?: string;
 *   entity?: string;
 *   ent?: string;
 *   sensor?: string;
 *   widgets?: Array<Record<string, Record<string, any>>>;
 * }} NativeWidgetProps
 * @typedef {{ widgetType: string, props: Record<string, string> }} WidgetMarker
 */

/**
 * Parses ESPHome YAML (or LVGL/OpenDisplay C++) blocks into a structured layout object.
 * 
 * @param {string[]} lambdaLines - Array of lines from the lambda/script block containing widgets
 * @param {string[]} rawLines - Array of all lines in the document for YAML sub-block extraction
 * @param {DeviceSettingsLike} deviceSettings - Base settings for the device layout
 * @param {() => (Record<string, any> | null)} getESPHomeSchema
 * @param {YamlModuleLike} yaml - The loaded js-yaml module reference
 * @returns {ProjectPayload} The complete LayoutObject containing pages and widgets
 */
export function parseDisplayBlocks(lambdaLines, rawLines, deviceSettings, getESPHomeSchema, yaml) {
    const pageMap = new Map();
    const intervalMap = new Map();
    const nameMap = new Map();
    const darkModeMap = new Map();
    const refreshTypeMap = new Map();
    const refreshTimeMap = new Map();
    const visibleFromMap = new Map();
    const visibleToMap = new Map();
    const pagePropsMap = new Map();
    const layoutMap = new Map();

    const parseYamlSubBlock = (/** @type {string[]} */ linesList, /** @type {number} */ startIdx, /** @type {number} */ baseIndent) => {
        const blockLines = /** @type {string[]} */ ([]);
        let j = startIdx;
        while (j < linesList.length) {
            const line = linesList[j];
            if (!line) { j++; continue; }
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) {
                blockLines.push(line);
                j++;
                continue;
            }
            const indentMatch = line.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1].length : 0;
            if (indent < baseIndent) break;
            blockLines.push(line);
            j++;
        }
        try {
            const yamlStr = blockLines.join("\n");
            return { value: /** @type {Record<string, any> | null} */ (yaml.load(yamlStr, { schema: getESPHomeSchema() })), nextJ: j };
        } catch (e) {
            Logger.error("Error parsing YAML sub-block:", e);
            return { value: null, nextJ: j };
        }
    };

    const _lines = rawLines;
    /** @type {number | null} */
    let currentPageIndex = null;
    let inWidgetsBlockLookahead = false;

    const WIDGET_TAGS = [
        "label", "button", "arc", "bar", "slider", "chart", "dropdown",
        "roller", "spinbox", "switch", "textarea", "obj", "img", "image",
        "qrcode", "led", "spinner", "line", "meter", "tabview",
        "tileview", "checkbox", "keyboard", "buttonmatrix", "list", "icon"
    ];

    const TAG_MAP = /** @type {Record<string, string>} */ ({
        "label": "lvgl_label", "button": "lvgl_button", "arc": "lvgl_arc", "bar": "lvgl_bar",
        "slider": "lvgl_slider", "chart": "lvgl_chart", "dropdown": "lvgl_dropdown",
        "roller": "lvgl_roller", "spinbox": "lvgl_spinbox", "switch": "lvgl_switch",
        "textarea": "lvgl_textarea", "obj": "lvgl_obj", "img": "lvgl_img", "image": "lvgl_img",
        "qrcode": "lvgl_qrcode", "led": "lvgl_led", "spinner": "lvgl_spinner",
        "line": "lvgl_line", "meter": "lvgl_meter", "tabview": "lvgl_tabview",
        "tileview": "lvgl_tileview", "checkbox": "lvgl_checkbox", "keyboard": "lvgl_keyboard",
        "buttonmatrix": "lvgl_buttonmatrix", "icon": "icon"
    });

    const unquoteText = (/** @type {unknown} */ value) => {
        if (value === undefined || value === null) return "";
        return String(value).trim().replace(/^["']|["']$/g, "");
    };

    const parseInlineYamlValue = (/** @type {string} */ inlineValue) => {
        if (!inlineValue) return {};
        try {
            const parsed = yaml.load(inlineValue, { schema: getESPHomeSchema() });
            return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : { _inline: unquoteText(parsed) };
        } catch (e) {
            Logger.warn("[YAML_IMPORT] Could not parse inline LVGL widget mapping:", e);
            return { _inline: inlineValue.replace(/^["']|["']$/g, "") };
        }
    };

    const parsePositionNumber = (/** @type {unknown} */ value, /** @type {number} */ fallback = 0) => {
        if (value === undefined || value === null || value === "") return fallback;
        const parsed = parseInt(String(value), 10);
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    const getCanvasSize = () => ({
        width: parsePositionNumber(deviceSettings?.width, 800),
        height: parsePositionNumber(deviceSettings?.height, 480)
    });

    const applyLvglAlignPosition = (
        /** @type {Record<string, any>} */ widget,
        /** @type {NativeWidgetProps} */ nativeProps,
        /** @type {Record<string, any> | null} */ parentWidget = null
    ) => {
        const align = String(nativeProps.align || "").trim().toUpperCase();
        if (!align) return;

        const canvas = getCanvasSize();
        const parentX = parentWidget ? parsePositionNumber(parentWidget.x, 0) : 0;
        const parentY = parentWidget ? parsePositionNumber(parentWidget.y, 0) : 0;
        const parentW = parentWidget ? parsePositionNumber(parentWidget.width, canvas.width) : canvas.width;
        const parentH = parentWidget ? parsePositionNumber(parentWidget.height, canvas.height) : canvas.height;
        const offsetX = parsePositionNumber(nativeProps.x, 0);
        const offsetY = parsePositionNumber(nativeProps.y, 0);
        const width = parsePositionNumber(widget.width, 0);
        const height = parsePositionNumber(widget.height, 0);

        const horizontal = align.includes("RIGHT")
            ? "right"
            : (align.includes("MID") || align.includes("CENTER") ? "center" : "left");
        const vertical = align.includes("TOP")
            ? "top"
            : (align.includes("BOTTOM")
                ? "bottom"
                : (align === "CENTER" || align.includes("_MID") || align.startsWith("MID") ? "center" : "top"));

        if (horizontal === "right") widget.x = parentX + parentW - width + offsetX;
        else if (horizontal === "center") widget.x = parentX + Math.round((parentW - width) / 2) + offsetX;
        else widget.x = parentX + offsetX;

        if (vertical === "bottom") widget.y = parentY + parentH - height + offsetY;
        else if (vertical === "center") widget.y = parentY + Math.round((parentH - height) / 2) + offsetY;
        else widget.y = parentY + offsetY;
    };

    const makeSafeEntityId = (/** @type {string} */ entityId) => entityId.replace(/[^a-zA-Z0-9_]/g, "_");

    const collectHomeAssistantServiceCalls = (/** @type {unknown} */ value, /** @type {Array<{ service: string, entityId: string }>} */ calls = []) => {
        if (Array.isArray(value)) {
            value.forEach((item) => collectHomeAssistantServiceCalls(item, calls));
            return calls;
        }

        if (!value || typeof value !== "object") return calls;

        const record = /** @type {Record<string, any>} */ (value);
        const servicePayload = record["homeassistant.action"] || record["homeassistant.service"];
        if (servicePayload && typeof servicePayload === "object") {
            const payload = /** @type {Record<string, any>} */ (servicePayload);
            const service = String(payload.action || payload.service || "").trim();
            const entityId = String(
                payload.entity_id
                || payload.data?.entity_id
                || payload.target?.entity_id
                || ""
            ).trim();

            if (service && entityId) calls.push({ service, entityId });
        }

        Object.values(record).forEach((item) => collectHomeAssistantServiceCalls(item, calls));
        return calls;
    };

    const inferActionEntity = (/** @type {NativeWidgetProps} */ nativeProps) => {
        const calls = collectHomeAssistantServiceCalls(nativeProps.on_click);
        if (calls.length === 0) return null;

        const entityCounts = new Map();
        calls.forEach((call) => {
            entityCounts.set(call.entityId, (entityCounts.get(call.entityId) || 0) + 1);
        });

        const entityId = Array.from(entityCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (!entityId) return null;

        const servicesForEntity = calls.filter((call) => call.entityId === entityId).map((call) => call.service);
        const uniqueServices = Array.from(new Set(servicesForEntity));
        const turnPair = uniqueServices.length === 2
            && uniqueServices.some((service) => service.endsWith(".turn_on"))
            && uniqueServices.some((service) => service.endsWith(".turn_off"));

        return {
            entityId,
            service: turnPair ? "auto" : (uniqueServices[0] || "auto")
        };
    };

    const extractCheckedStateExpression = (/** @type {NativeWidgetProps} */ nativeProps) => {
        const checked = nativeProps.state?.checked ?? nativeProps.checked?.state?.checked;
        return checked === undefined || checked === null ? "" : String(checked);
    };

    const isCheckedStateBoundToEntity = (/** @type {NativeWidgetProps} */ nativeProps, /** @type {string} */ entityId) => {
        const expression = extractCheckedStateExpression(nativeProps);
        if (!expression || !entityId) return false;
        return expression.includes(`id(${makeSafeEntityId(entityId)})`) && expression.includes(".state");
    };

    const applyLvglButtonImportHints = (/** @type {NativeWidgetProps} */ nativeProps) => {
        if (nativeProps.text === undefined && Array.isArray(nativeProps.widgets)) {
            const labelChild = nativeProps.widgets
                .map((entry) => entry?.label)
                .find((label) => label && typeof label === "object" && label.text !== undefined);
            if (labelChild) nativeProps.text = unquoteText(labelChild.text);
        }

        if (!nativeProps.entity_id) {
            const inferred = inferActionEntity(nativeProps);
            if (inferred) {
                nativeProps.entity_id = inferred.entityId;
                if (!nativeProps.service && inferred.service !== "auto") nativeProps.service = inferred.service;
            }
        }

        const hasCheckedState = !!extractCheckedStateExpression(nativeProps);
        if (hasCheckedState) nativeProps.checkable = true;
        if (nativeProps.entity_id && isCheckedStateBoundToEntity(nativeProps, String(nativeProps.entity_id))) {
            nativeProps.sync_state = true;
        }
    };

    // First pass: Page Metadata
    for (let i = 0; i < lambdaLines.length; i++) {
        const line = lambdaLines[i];
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        let pageMatch = line.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            inWidgetsBlockLookahead = false;
            if (!pageMap.has(currentPageIndex)) pageMap.set(currentPageIndex, []);
        }

        const lvglPageMatch = line.match(/^\s*-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            let idx = numMatch ? parseInt(numMatch[1], 10) : pageMap.size;
            if (!pageMap.has(idx)) {
                pageMap.set(idx, []);
                nameMap.set(idx, pageIdStr);
            }
            currentPageIndex = idx;
            inWidgetsBlockLookahead = false;
        }

        const layoutMatch = line.match(/^\s*layout:\s*(\d+x\d+)/);
        if (layoutMatch && currentPageIndex !== null) layoutMap.set(currentPageIndex, layoutMatch[1]);

        if (trimmedLine.startsWith("widgets:")) { inWidgetsBlockLookahead = true; continue; }

        const intervalMatch = line.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);
        if (intervalMatch) {
            const idx = parseInt(intervalMatch[1], 10);
            intervalMap.set(idx, parseInt(intervalMatch[2], 10));
            if (!pageMap.has(idx)) pageMap.set(idx, []);
        }

        const mName = line.match(/\/\/\s*page:name\s+"(.+)"/);
        if (mName && currentPageIndex !== null) nameMap.set(currentPageIndex, mName[1]);

        const mDM = line.match(/\/\/\s*page:dark_mode\s+"(.+)"/);
        if (mDM && currentPageIndex !== null) darkModeMap.set(currentPageIndex, mDM[1]);

        const mRT = line.match(/\/\/\s*page:refresh_type\s+"(.+)"/);
        if (mRT && currentPageIndex !== null) refreshTypeMap.set(currentPageIndex, mRT[1]);

        const mTime = line.match(/\/\/\s*page:refresh_time\s+"(.*)"/);
        if (mTime && currentPageIndex !== null) refreshTimeMap.set(currentPageIndex, mTime[1]);

        const mVF = line.match(/\/\/\s*page:visible_from\s+"(.*)"/);
        if (mVF && currentPageIndex !== null) visibleFromMap.set(currentPageIndex, mVF[1]);

        const mVT = line.match(/\/\/\s*page:visible_to\s+"(.*)"/);
        if (mVT && currentPageIndex !== null) visibleToMap.set(currentPageIndex, mVT[1]);

        if (!inWidgetsBlockLookahead) {
            const pgBgColorMatch = line.match(/^\s*bg_color:\s*(.*)/);
            if (pgBgColorMatch && currentPageIndex !== null) {
                let val = pgBgColorMatch[1].trim().replace(/^["']|["']$/g, "");
                if (val.startsWith("0x")) val = "#" + val.substring(2);
                if (!pagePropsMap.has(currentPageIndex)) pagePropsMap.set(currentPageIndex, {});
                pagePropsMap.get(currentPageIndex).bg_color = val;
            }

            const pgBgOpaMatch = line.match(/^\s*bg_opa:\s*(.*)/);
            if (pgBgOpaMatch && currentPageIndex !== null) {
                let val = pgBgOpaMatch[1].trim().replace(/^["']|["']$/g, "");
                if (val.endsWith("%")) val = String(Math.round(parseFloat(val) * 2.55));
                if (!pagePropsMap.has(currentPageIndex)) pagePropsMap.set(currentPageIndex, {});
                pagePropsMap.get(currentPageIndex).bg_opa = parseInt(val, 10);
            }
        }
    }

    if (pageMap.size === 0) pageMap.set(0, []);

    const layout = /** @type {ProjectPayload} */ ({
        name: deviceSettings?.device_name || "Imported Layout",
        settings: deviceSettings,
        pages: Array.from(pageMap.entries()).sort((a, b) => a[0] - b[0]).map(([idx, _]) => ({
            id: `page_${idx}`,
            name: nameMap.has(idx) ? nameMap.get(idx) : `Page ${idx + 1}`,
            refresh_s: intervalMap.has(idx) ? intervalMap.get(idx) : null,
            refresh_type: refreshTypeMap.has(idx) ? refreshTypeMap.get(idx) : "interval",
            refresh_time: refreshTimeMap.has(idx) ? refreshTimeMap.get(idx) : "",
            visible_from: visibleFromMap.has(idx) ? visibleFromMap.get(idx) : "",
            visible_to: visibleToMap.has(idx) ? visibleToMap.get(idx) : "",
            dark_mode: darkModeMap.has(idx) ? darkModeMap.get(idx) : "inherit",
            layout: layoutMap.has(idx) ? layoutMap.get(idx) : null,
            bg_color: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_color : null,
            bg_opa: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_opa : null,
            widgets: []
        }))
    });

    currentPageIndex = 0;
    const getCurrentPageWidgets = () => {
        const page = layout.pages.find((/** @type {Record<string, any>} */ p, /** @type {number} */ idx) => idx === (currentPageIndex ?? 0));
        return page ? page.widgets : layout.pages[0].widgets;
    };

    const parseWidgetMarker = (/** @type {string} */ comment) => {
        const match = comment.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);
        if (!match) return null;
        const widgetType = match[1];
        const propsStr = match[2];
        const props = /** @type {Record<string, string>} */ ({});
        const regex = /(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;
        let m;
        while ((m = regex.exec(propsStr)) !== null) {
            let value = m[2] !== undefined ? m[2] : m[3];
            if (value) value = value.trim();
            props[m[1]] = value;
        }
        return { widgetType, props };
    };

    let skipRendering = false;
    for (let i = 0; i < lambdaLines.length; i++) {
        const cmd = lambdaLines[i];
        const trimmed = cmd.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith("#") && !trimmed.match(/^#\s*widget:/)) continue;

        let pageMatch = trimmed.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) { currentPageIndex = parseInt(pageMatch[1], 10); continue; }

        const lvglPageMatch = trimmed.match(/^-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            currentPageIndex = numMatch ? parseInt(numMatch[1], 10) : (Array.from(nameMap.entries()).find(([_k, v]) => v === pageIdStr)?.[0] || 0);
            continue;
        }

        const widgets = /** @type {Array<Record<string, any>>} */ (getCurrentPageWidgets());
        if (skipRendering) {
            if (trimmed.match(/^(?:#\s*|\/\/\s*)widget:/) || trimmed.match(/^\s*-\s*id:/) || !cmd.match(/^\s/)) skipRendering = false;
            else continue;
        }

        if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
            const marker = parseWidgetMarker(trimmed);
            if (marker && marker.props.id) {
                const p = marker.props;
                const widgetType = marker.widgetType || p.type;
                if (!widgetType) continue;

                const widget = {
                    id: p.id, type: widgetType,
                    x: parseInt(String(p.x || 0), 10), y: parseInt(String(p.y || 0), 10),
                    width: parseInt(String(p.w || 100), 10), height: parseInt(String(p.h || 30), 10),
                    title: p.title || "", entity_id: p.entity || p.ent || p.entity_id,
                    props: {}
                };

                // Delegate property reconstruction to mapping module
                widget.props = buildWidgetProps(widgetType, /** @type {Record<string, string>} */ (p), widget);

                widgets.push(widget);
                skipRendering = true;
                continue;
            }
            continue;
        }

        // Delegate C++ drawing command parsing to specialized module
        const drawWidget = parseCppDrawingCommand(trimmed, widgets.length);
        if (drawWidget) {
            widgets.push(drawWidget);
            continue;
        }

        // --- NATIVE YAML PARSING (LVGL) ---
        const nativeRegex = new RegExp(`^(\\s*)-?\\s*(${WIDGET_TAGS.join('|')}):\\s*(.*)$`);
        const mNative = cmd.match(nativeRegex);
        if (mNative) {
            const indent = mNative[1].length;
            const nativeTag = mNative[2];
            const inlineValue = mNative[3].trim();
            const widgetType = TAG_MAP[nativeTag] || `lvgl_${nativeTag}`;
            const nativeProps = /** @type {NativeWidgetProps} */ ({});
            if (inlineValue) Object.assign(nativeProps, parseInlineYamlValue(inlineValue));
            const res = parseYamlSubBlock(lambdaLines, i + 1, indent + 2);
            Object.assign(nativeProps, res.value || {});
            i = res.nextJ - 1;
            if (widgetType === "lvgl_button") applyLvglButtonImportHints(nativeProps);

            const widget = {
                id: nativeProps.id || `lv_${nativeTag}_${widgets.length}`,
                type: widgetType,
                x: parsePositionNumber(nativeProps.x, 0), y: parsePositionNumber(nativeProps.y, 0),
                width: parsePositionNumber(nativeProps.width || nativeProps.w, 100),
                height: parsePositionNumber(nativeProps.height || nativeProps.h, 30),
                title: nativeProps.title || nativeProps.name || "",
                entity_id: nativeProps.entity_id || nativeProps.entity || nativeProps.sensor,
                props: {}
            };
            applyLvglAlignPosition(widget, nativeProps);

            // Reuse the widget prop builder even for native YAML to avoid duplication
            widget.props = buildWidgetProps(widgetType, /** @type {Record<string, string>} */ (/** @type {unknown} */ (nativeProps)), widget);
            widgets.push(widget);

            // Handle nested widgets (flattening into the page for now as per backup)
            if (Array.isArray(nativeProps.widgets)) {
                nativeProps.widgets.forEach((/** @type {Record<string, Record<string, any>>} */ nw) => {
                    const tag = Object.keys(nw)[0];
                    const nwProps = tag ? nw[tag] : null;
                    if (nativeTag === "button" && tag === "label") return;
                    if (tag && nwProps && typeof nwProps === 'object') {
                        const nwType = TAG_MAP[tag] || `lvgl_${tag}`;
                        const nestedWidget = {
                            id: nwProps.id || `lv_${tag}_${widgets.length}`,
                            type: nwType,
                            x: widget.x + parsePositionNumber(nwProps.x, 0), // Relative to parent
                            y: widget.y + parsePositionNumber(nwProps.y, 0),
                            width: parsePositionNumber(nwProps.width || nwProps.w, 50),
                            height: parsePositionNumber(nwProps.height || nwProps.h, 20),
                            props: {}
                        };
                        applyLvglAlignPosition(nestedWidget, /** @type {NativeWidgetProps} */ (nwProps), widget);
                        nestedWidget.props = buildWidgetProps(nwType, nwProps, nestedWidget);
                        widgets.push(nestedWidget);
                    }
                });
            }
        }
    }
    return layout;
}
