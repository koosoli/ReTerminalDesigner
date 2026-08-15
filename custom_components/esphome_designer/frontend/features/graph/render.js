import { drawInternalGrid, drawSmartAxisLabels, generateHistoricalDataPoints, parseDuration } from '../../js/utils/graph_helpers.js';
import { fetchEntityHistory, getEntityAttributes } from '../../js/io/ha_api.js';
import { emit, EVENTS } from '../../js/core/events.js';

const historyCache = new Map();
const fetchInProgress = new Set();

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, title?: string }} GraphWidget */

/**
 * @param {HTMLElement} el
 * @param {GraphWidget} widget
 * @param {{ getColorStyle: (value?: string) => string }} helpers
 */
export const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const entityId = widget.entity_id || "";
    const borderEnabled = props.border !== false;
    const isDark = getColorStyle() === "#ffffff";
    const fontFamily = props.font_family || "Roboto";
    const fontSize = Math.max(8, parseInt(String(props.font_size || 12), 10) || 12);
    const fontWeight = String(parseInt(String(props.font_weight || 400), 10) || 400);

    let bgColor = props.background_color;
    if (!bgColor || bgColor === "transparent" || bgColor === "inherit") {
        bgColor = isDark ? "black" : "white";
    }

    let color = props.color || "theme_auto";
    if (color === bgColor) {
        color = bgColor === "white" || bgColor === "#ffffff" ? "black" : "white";
    }

    const colorStyle = getColorStyle(color);
    const bgStyle = getColorStyle(bgColor);

    el.style.boxSizing = "border-box";
    el.style.backgroundColor = bgStyle;
    el.style.overflow = "hidden";

    if (props.border_width !== undefined ? props.border_width > 0 : borderEnabled) {
        const borderWidth = props.border_width !== undefined ? props.border_width : 2;
        const borderColor = getColorStyle(props.border_color || color);
        el.style.border = `${borderWidth}px solid ${borderColor}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
    } else {
        el.style.border = "none";
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${widget.width} ${widget.height}`);
    svg.style.display = "block";

    const minValue = props.auto_scale !== false ? Number.NaN : (parseFloat(props.min_value) || 0);
    const maxValue = props.auto_scale !== false ? Number.NaN : (parseFloat(props.max_value) || 100);

    /** @type {Array<{ state: string | number, last_changed: number }> | null} */
    let historyData = null;
    if (entityId) {
        if (props.use_ha_history) {
            const attrs = getEntityAttributes(entityId);
            const attrName = props.history_attribute || 'history';
            if (attrs && attrs[attrName]) {
                const rawData = attrs[attrName];
                const values = [];
                if (Array.isArray(rawData)) {
                    rawData.forEach((/** @type {any} */ item) => {
                        if (typeof item === 'number') values.push(item);
                        else if (typeof item === 'string') {
                            const parsed = parseFloat(item);
                            if (!isNaN(parsed)) values.push(parsed);
                        } else if (typeof item === 'object' && item !== null && item.value !== undefined) {
                            const parsed = parseFloat(item.value);
                            if (!isNaN(parsed)) values.push(parsed);
                        }
                    });
                } else if (typeof rawData === 'string') {
                    try {
                        const parsed = JSON.parse(rawData);
                        if (Array.isArray(parsed)) {
                            parsed.forEach((/** @type {any} */ item) => {
                                if (typeof item === 'number') values.push(item);
                                else if (item?.value !== undefined) values.push(parseFloat(item.value));
                            });
                        }
                    } catch {
                        if (rawData.includes('value:') || rawData.includes('value :')) {
                            const regex = /value\s*:\s*([\d.-]+)/g;
                            /** @type {RegExpExecArray | null} */
                            let match;
                            while ((match = regex.exec(rawData)) !== null) {
                                values.push(parseFloat(match[1]));
                            }
                        } else {
                            const cleaned = rawData.replace(/[[\]"']/g, '');
                            cleaned.split(',').forEach((/** @type {string} */ segment) => {
                                const parsed = parseFloat(segment.trim());
                                if (!isNaN(parsed)) values.push(parsed);
                            });
                        }
                    }
                }

                if (values.length > 0) {
                    const durationMs = parseDuration(props.duration || '1h') * 1000;
                    const now = Date.now();
                    const step = durationMs / Math.max(values.length - 1, 1);
                    historyData = values.map((value, index) => ({
                        state: value,
                        last_changed: now - durationMs + (index * step)
                    }));
                }
            }
        } else {
            const duration = props.duration || "1h";
            const cacheKey = `${entityId}_${duration}`;
            const cached = historyCache.get(cacheKey);

            if (cached && (Date.now() - cached.timestamp < 60000)) {
                historyData = cached.data;
            } else if (!fetchInProgress.has(cacheKey)) {
                fetchInProgress.add(cacheKey);
                fetchEntityHistory(entityId, duration).then((/** @type {any[]} */ data) => {
                    historyCache.set(cacheKey, { data, timestamp: Date.now() });
                    fetchInProgress.delete(cacheKey);
                    emit(EVENTS.WIDGET_UPDATED, widget.id);
                }).catch(() => {
                    fetchInProgress.delete(cacheKey);
                });
            }
        }
    }

    let effectiveMin = minValue;
    let effectiveMax = maxValue;
    if (historyData && historyData.length > 0 && (isNaN(minValue) || isNaN(maxValue))) {
        const values = historyData.map((/** @type {{ state: string | number }} */ item) => parseFloat(String(item.state))).filter((/** @type {number} */ value) => !isNaN(value));
        if (values.length > 0) {
            effectiveMin = Math.min(...values);
            effectiveMax = Math.max(...values);
            const pad = (effectiveMax - effectiveMin) * 0.1 || 1.0;
            effectiveMin -= pad;
            effectiveMax += pad;
        }
    }
    if (isNaN(effectiveMin)) effectiveMin = 0;
    if (isNaN(effectiveMax)) effectiveMax = 100;

    // Drawn after the scale is known so the y-grid step maps to real divisions.
    if (props.grid !== false) {
        drawInternalGrid(
            svg,
            widget.width,
            widget.height,
            props.x_grid,
            props.y_grid,
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            {
                duration: props.duration || "1h",
                minValue: effectiveMin,
                maxValue: effectiveMax
            }
        );
    }

    const points = generateHistoricalDataPoints(
        widget.width,
        widget.height,
        effectiveMin,
        effectiveMax,
        historyData || [],
        props.duration
    );

    const polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("points", points.map((point) => `${point.x},${point.y}`).join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", colorStyle);
    polyline.setAttribute("stroke-width", String(parseInt(props.line_thickness || 3, 10)));
    polyline.setAttribute("stroke-linejoin", "round");

    const lineType = props.line_type || "SOLID";
    if (lineType === "DASHED") {
        polyline.setAttribute("stroke-dasharray", "5,5");
    } else if (lineType === "DOTTED") {
        polyline.setAttribute("stroke-dasharray", "2,2");
    }

    svg.appendChild(polyline);
    el.appendChild(svg);

    const ownerDocument = el.ownerDocument || document;
    setTimeout(() => {
        if (ownerDocument.visibilityState === 'hidden' || !el.isConnected) {
            return;
        }

        const artboard = /** @type {HTMLElement | null} */ (el.closest('.artboard'));
        if (artboard && artboard.isConnected) {
            drawSmartAxisLabels(
                artboard,
                widget.x,
                widget.y,
                widget.width,
                widget.height,
                effectiveMin,
                effectiveMax,
                props.duration,
                widget.id,
                isDark ? "#ffffff" : "#666666",
                {
                    fontFamily,
                    fontSize,
                    fontWeight
                }
            );
        }
    }, 0);

    if (widget.title) {
        const label = document.createElement("div");
        label.style.position = "absolute";
        label.style.top = "2px";
        label.style.left = "50%";
        label.style.transform = "translateX(-50%)";
        label.style.fontSize = `${fontSize}px`;
        label.style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
        label.style.fontWeight = fontWeight;
        label.style.color = colorStyle;
        label.style.backgroundColor = bgColor === "black" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
        label.style.padding = "0 4px";
        label.style.borderRadius = "2px";
        label.style.whiteSpace = "nowrap";
        label.textContent = widget.title;
        el.appendChild(label);
    } else if (!entityId) {
        const label = document.createElement("div");
        label.style.position = "absolute";
        label.style.top = "50%";
        label.style.left = "50%";
        label.style.transform = "translate(-50%, -50%)";
        label.style.fontSize = `${fontSize}px`;
        label.style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
        label.style.fontWeight = fontWeight;
        label.style.color = isDark ? "#ccc" : "#999";
        label.style.backgroundColor = bgColor === "black" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)";
        label.style.padding = "2px 6px";
        label.textContent = "graph (No Entity)";
        el.appendChild(label);
    }
};
