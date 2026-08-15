// --- Graph Preview Helpers ---

const DEFAULT_DURATION_SECONDS = 3600;
const DURATION_PATTERN = /^(\d+(?:\.\d+)?)([a-z]+)$/i;

/**
 * @param {string|number|null|undefined} durationStr
 * @returns {{ value: number, unit: string } | null}
 */
function parseDurationParts(durationStr) {
    if (durationStr === null || durationStr === undefined || durationStr === '') {
        return null;
    }

    if (typeof durationStr === 'number') {
        return Number.isFinite(durationStr) ? { value: durationStr, unit: 's' } : null;
    }

    const str = String(durationStr).trim();
    if (!str) {
        return null;
    }

    if (/^\d+(?:\.\d+)?$/.test(str)) {
        return { value: parseFloat(str), unit: 's' };
    }

    const match = str.match(DURATION_PATTERN);
    if (!match) {
        return null;
    }

    return {
        value: parseFloat(match[1]),
        unit: match[2].toLowerCase()
    };
}

/**
 * @param {{ value: number, unit: string } | null} parsed
 * @returns {number | null}
 */
function durationPartsToSeconds(parsed) {
    if (!parsed || !Number.isFinite(parsed.value)) {
        return null;
    }

    const { value, unit } = parsed;
    if (unit.startsWith('s')) return value;
    if (unit.startsWith('m')) return value * 60;
    if (unit.startsWith('h')) return value * 3600;
    if (unit.startsWith('d')) return value * 86400;
    if (unit.startsWith('w')) return value * 604800;
    return null;
}

/**
 * Parses a duration string (for example "1h", "30min", "7d", or "1w") into seconds.
 * @param {string|number} durationStr
 * @returns {number} Seconds
 */
export function parseDuration(durationStr) {
    if (!durationStr) return DEFAULT_DURATION_SECONDS;

    const seconds = durationPartsToSeconds(parseDurationParts(durationStr));
    return Number.isFinite(seconds) ? seconds : DEFAULT_DURATION_SECONDS;
}

/**
 * Canonical ESPHome time units. ESPHome accepts us/ms/s/min/h/d - but NOT weeks,
 * so "1w" style values must be converted before they reach the generated YAML.
 * @type {Record<string, string>}
 */
const ESPHOME_TIME_UNITS = {
    s: 's', sec: 's', secs: 's', second: 's', seconds: 's',
    m: 'min', min: 'min', mins: 'min', minute: 'min', minutes: 'min',
    h: 'h', hour: 'h', hours: 'h',
    d: 'd', day: 'd', days: 'd'
};

/**
 * @param {number} seconds
 * @returns {string}
 */
function formatEsphomeTimePeriod(seconds) {
    const rounded = Math.max(1, Math.round(seconds));
    if (rounded % 86400 === 0) return `${rounded / 86400}d`;
    if (rounded % 3600 === 0) return `${rounded / 3600}h`;
    if (rounded % 60 === 0) return `${rounded / 60}min`;
    return `${rounded}s`;
}

/**
 * Normalizes a duration into a time period ESPHome's config validation accepts.
 * ESPHome has no "week" unit, so "1w" becomes "7d"; unparseable values fall back.
 * @param {string|number|null|undefined} value
 * @param {string} [fallback="1h"]
 * @returns {string}
 */
export function toEsphomeTimePeriod(value, fallback = '1h') {
    const parsed = parseDurationParts(value);
    const seconds = durationPartsToSeconds(parsed);
    if (!Number.isFinite(seconds) || Number(seconds) <= 0) {
        return fallback;
    }

    const canonicalUnit = parsed ? ESPHOME_TIME_UNITS[parsed.unit] : null;
    if (canonicalUnit && parsed && Number.isInteger(parsed.value)) {
        return `${parsed.value}${canonicalUnit}`;
    }

    return formatEsphomeTimePeriod(Number(seconds));
}

/**
 * Resolves the y_grid step, guaranteeing a value ESPHome accepts (a float > 0).
 * @param {string|number|null|undefined} rawValue Explicit user value (wins when valid)
 * @param {string|number|null|undefined} minValue
 * @param {string|number|null|undefined} maxValue
 * @returns {string}
 */
export function resolveGraphValueGrid(rawValue, minValue, maxValue) {
    const explicit = parseFloat(String(rawValue ?? ''));
    if (Number.isFinite(explicit) && explicit > 0) {
        return String(explicit);
    }

    const parsedMin = parseFloat(String(minValue ?? ''));
    const parsedMax = parseFloat(String(maxValue ?? ''));
    const min = Number.isFinite(parsedMin) ? parsedMin : 0;
    const max = Number.isFinite(parsedMax) ? parsedMax : 100;
    const range = Math.abs(max - min);
    if (!Number.isFinite(range) || range <= 0) {
        return '1';
    }

    const step = range / 4;
    const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
    const normalized = step / niceStep;
    const value = normalized <= 1
        ? niceStep
        : normalized <= 2
            ? 2 * niceStep
            : normalized <= 5
                ? 5 * niceStep
                : 10 * niceStep;

    return Number.isFinite(value) && value > 0 ? String(value) : '1';
}

/**
 * @param {number} value
 * @returns {number}
 */
const clampGridDivisions = (value) => Math.max(1, Math.min(48, Math.round(value)));

/**
 * Converts x_grid / y_grid settings into the number of visible grid divisions,
 * so previews and hand-drawn grids match what ESPHome would render.
 * @param {{ duration?: string|number, xGrid?: string|number, yGrid?: string|number, minValue?: string|number, maxValue?: string|number }} [options]
 * @returns {{ x: number, y: number }}
 */
export function getGraphGridDivisions(options = {}) {
    const divisions = { x: 4, y: 4 };

    const totalSeconds = durationPartsToSeconds(parseDurationParts(options.duration));
    const gridSeconds = durationPartsToSeconds(parseDurationParts(options.xGrid));
    if (Number.isFinite(totalSeconds) && Number(totalSeconds) > 0
        && Number.isFinite(gridSeconds) && Number(gridSeconds) > 0) {
        divisions.x = clampGridDivisions(Number(totalSeconds) / Number(gridSeconds));
    }

    const step = parseFloat(String(options.yGrid ?? ''));
    const min = parseFloat(String(options.minValue ?? ''));
    const max = parseFloat(String(options.maxValue ?? ''));
    if (Number.isFinite(step) && step > 0 && Number.isFinite(min) && Number.isFinite(max)) {
        const range = Math.abs(max - min);
        if (range > 0) {
            divisions.y = clampGridDivisions(range / step);
        }
    }

    return divisions;
}

/**
 * Infers a readable x-grid interval from the overall graph duration.
 * @param {string|number} durationStr
 * @returns {string}
 */
export function inferGraphTimeGrid(durationStr) {
    const parsed = parseDurationParts(durationStr);
    const totalSeconds = durationPartsToSeconds(parsed);
    if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
        return '1h';
    }

    const gridSeconds = totalSeconds / 4;
    if (gridSeconds >= 86400) return `${Math.max(1, Math.round(gridSeconds / 86400))}d`;
    if (gridSeconds >= 3600) return `${Math.max(1, Math.round(gridSeconds / 3600))}h`;
    if (gridSeconds >= 60) return `${Math.max(1, Math.round(gridSeconds / 60))}min`;
    return `${Math.max(1, Math.round(gridSeconds))}s`;
}

/**
 * Formats a relative graph label like "-2.0h" or "-1.0w".
 * @param {number} seconds
 * @returns {string}
 */
export function formatGraphLookbackLabel(seconds) {
    const safeSeconds = Math.max(0, Number(seconds) || 0);
    if (safeSeconds >= 604800) return `-${(safeSeconds / 604800).toFixed(1)}w`;
    if (safeSeconds >= 86400) return `-${(safeSeconds / 86400).toFixed(1)}d`;
    if (safeSeconds >= 3600) return `-${(safeSeconds / 3600).toFixed(1)}h`;
    if (safeSeconds >= 60) return `-${(safeSeconds / 60).toFixed(0)}m`;
    return `-${safeSeconds.toFixed(0)}s`;
}

/**
 * Generates mock data points for a graph.
 * @param {number} width
 * @param {number} height
 * @param {number} [_min]
 * @param {number} [_max]
 * @returns {{x: number, y: number}[]}
 */
export function generateMockData(width, height, _min, _max) {
    /** @type {{x: number, y: number}[]} */
    const points = [];
    const numPoints = 50;

    // Generate a nice wavy line
    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * width;

        // Sine wave + noise
        const normalizedX = i / numPoints;
        const base = Math.sin(normalizedX * Math.PI * 2); // One full wave
        const noise = (Math.random() - 0.5) * 0.2; // +/- 10% noise

        let normalizedY = 0.5 + (base * 0.3) + noise;
        normalizedY = Math.max(0.1, Math.min(0.9, normalizedY)); // Clamp to keep inside

        // Map to pixel coordinates (Y is inverted in SVG/Canvas)
        const y = height - (normalizedY * height);
        points.push({ x, y });
    }
    return points;
}

/**
 * Maps Home Assistant history data to SVG coordinates for the graph.
 * @param {number} width
 * @param {number} height
 * @param {number} min
 * @param {number} max
 * @param {any[]} historyData
 * @param {string|number} durationStr
 * @returns {{x: number, y: number}[]}
 */
export function generateHistoricalDataPoints(width, height, min, max, historyData, durationStr) {
    if (!historyData || historyData.length === 0) return generateMockData(width, height, min, max);

    /** @type {{x: number, y: number}[]} */
    const points = [];
    const durationSec = parseDuration(durationStr);
    const now = Date.now();
    const startTime = now - (durationSec * 1000);

    // HA history data filter and map
    const mappedData = historyData
        .map(item => ({
            time: new Date(item.last_changed || item.when || Date.now()).getTime(),
            value: parseFloat(item.state)
        }))
        .filter(item => !isNaN(item.value));

    if (mappedData.length === 0) return generateMockData(width, height, min, max);

    // Sort by time
    mappedData.sort((a, b) => a.time - b.time);

    // Auto-scaling logic
    let effectiveMin = min;
    let effectiveMax = max;

    const values = mappedData.map(d => d.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);

    // If min/max are explicitly same or unset (auto), use data range
    if (min === max || (isNaN(min) && isNaN(max)) || (min === 0 && max === 100 && (dataMin > 100 || dataMax < 0))) {
        effectiveMin = dataMin;
        effectiveMax = dataMax;

        // Add 10% padding
        const padding = (effectiveMax - effectiveMin) * 0.1 || 1.0;
        effectiveMin -= padding;
        effectiveMax += padding;
    }

    const range = (effectiveMax - effectiveMin) || 1;

    mappedData.forEach(item => {
        // Map time to X (0 to width)
        const x = ((item.time - startTime) / (durationSec * 1000)) * width;

        // Map value to Y (height to 0)
        let normalizedY = (item.value - effectiveMin) / range;
        normalizedY = Math.max(-0.1, Math.min(1.1, normalizedY)); // Allow a bit over/under for smooth lines
        const y = height - (normalizedY * height);

        // Only include points within the duration window (roughly)
        if (x >= -10 && x <= width + 10) {
            points.push({ x, y });
        }
    });

    // If we have very few points, it might look empty, maybe add a point at "Now"
    if (points.length > 0 && points[points.length - 1].x < width - 1) {
        points.push({ x: width, y: points[points.length - 1].y });
    }

    return points;
}

/**
 * Draws the preview grid. The number of divisions follows the configured
 * x_grid / y_grid so the canvas matches what ESPHome renders on the device.
 * @param {SVGElement} svg
 * @param {number} width
 * @param {number} height
 * @param {string} xGridStr x_grid interval, e.g. "24h"
 * @param {string} yGridStr y_grid step, e.g. "10"
 * @param {string} [color="rgba(0,0,0,0.1)"]
 * @param {{ duration?: string|number, minValue?: number, maxValue?: number }} [options]
 */
export function drawInternalGrid(svg, width, height, xGridStr, yGridStr, color = "rgba(0,0,0,0.1)", options = {}) {
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.setAttribute("stroke", color);
    gridGroup.setAttribute("stroke-dasharray", "2,2");
    gridGroup.setAttribute("stroke-width", "1");

    // Falls back to a 4x4 heuristic when no interval is configured.
    const { x: xLines, y: yLines } = getGraphGridDivisions({
        duration: options.duration,
        xGrid: xGridStr,
        yGrid: yGridStr,
        minValue: options.minValue,
        maxValue: options.maxValue
    });

    for (let i = 1; i < xLines; i++) {
        const x = (i / xLines) * width;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(x));
        line.setAttribute("y1", "0");
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(height));
        gridGroup.appendChild(line);
    }

    for (let i = 1; i < yLines; i++) {
        const y = (i / yLines) * height;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", String(y));
        line.setAttribute("x2", String(width));
        line.setAttribute("y2", String(y));
        gridGroup.appendChild(line);
    }

    svg.appendChild(gridGroup);
}

/**
 * @param {HTMLElement|null} container
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} min
 * @param {number} max
 * @param {string|number} durationStr
 * @param {string} widgetId
 * @param {string} [color="#666"]
 * @param {{ fontFamily?: string, fontSize?: number, fontWeight?: string | number }} [typography]
 */
export function drawSmartAxisLabels(container, x, y, width, height, min, max, durationStr, widgetId, color = "#666", typography = {}) {
    // container should be the ARTBOARD (div.artboard)
    if (!container) return;

    // Remove existing axis labels for THIS widget only
    const existing = container.querySelectorAll(`.graph-axis-label[data-widget-id="${widgetId}"]`);
    existing.forEach(el => el.remove());

    // Y-Axis Labels (Left of graph)
    const range = max - min;
    const steps = 4; // Min, 25%, 50%, 75%, Max

    // Use artboard dimensions for logical clamping
    const canvasWidth = parseInt(container.style.width, 10) || 800;
    const canvasHeight = parseInt(container.style.height, 10) || 480;
    const fontFamily = typography.fontFamily || "Roboto";
    const fontSize = Math.max(8, parseInt(String(typography.fontSize || 10), 10) || 10);
    const fontWeight = String(parseInt(String(typography.fontWeight || 400), 10) || 400);

    // Determine if labels should be inside or outside
    const yLabelsInside = x < 40;
    const xLabelsInside = (y + height + 20) > canvasHeight;

    for (let i = 0; i <= steps; i++) {
        const val = min + (range * (i / steps));
        const labelY = y + height - ((i / steps) * height);

        /** @type {HTMLDivElement} */
        const div = document.createElement("div");
        div.className = "graph-axis-label";
        div.dataset.widgetId = widgetId;
        const style = div.style;
        style.position = "absolute";

        if (yLabelsInside) {
            style.left = `${x + 4}px`;
            style.textAlign = "left";
        } else {
            // Positon to left of graph.
            // We use left-based positioning to be relative to artboard origin.
            style.left = `${x - 4}px`;
            style.transform = "translateX(-100%)";
            style.textAlign = "right";
        }

        style.top = `${labelY - 6}px`; // Center vertically
        style.fontSize = `${fontSize}px`;
        style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
        style.fontWeight = fontWeight;
        style.color = color;
        style.opacity = yLabelsInside ? "0.7" : "1.0";
        style.pointerEvents = "none";
        style.zIndex = "10";
        div.textContent = val.toFixed(1);
        container.appendChild(div);
    }

    // X-Axis Labels (Below graph)
    const durationSec = parseDuration(durationStr);
    const xSteps = 2; // Start, Middle, End

    for (let i = 0; i <= xSteps; i++) {
        const ratio = i / xSteps;
        const labelX = x + (width * ratio);

        let labelText = "";
        if (i === xSteps) labelText = "Now";
        else {
            const timeAgo = durationSec * (1 - ratio);
            labelText = formatGraphLookbackLabel(timeAgo);
        }

        /** @type {HTMLDivElement} */
        const div = document.createElement("div");
        div.className = "graph-axis-label";
        div.dataset.widgetId = widgetId;
        const style = div.style;
        style.position = "absolute";
        style.left = `${labelX}px`;

        if (xLabelsInside) {
            style.top = `${y + height - 14}px`; // Inside, above bottom
        } else {
            style.top = `${y + height + 4}px`; // Below graph
        }

        style.fontSize = `${fontSize}px`;
        style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
        style.fontWeight = fontWeight;
        style.color = color;
        style.opacity = xLabelsInside ? "0.7" : "1.0";
        style.pointerEvents = "none";
        style.zIndex = "10";

        // Horizontal clamping for X labels relative to artboard
        if (labelX < 20) {
            style.transform = "none";
            style.textAlign = "left";
        } else if (labelX > canvasWidth - 20) {
            style.transform = "translateX(-100%)";
            style.textAlign = "right";
        } else {
            style.transform = "translateX(-50%)";
            style.textAlign = "center";
        }

        div.textContent = labelText;
        container.appendChild(div);
    }
}
