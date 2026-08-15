/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, title?: string }} GraphWidget */
/** @typedef {{ x: number, y: number | string }} GraphPoint */
/** @typedef {{ line_width: number, line_rounded: boolean, line_dash_width?: number, line_dash_gap?: number }} GraphLineProps */

import { clampFontWeight } from '../../js/core/font_weights.js';
import { getGraphGridDivisions } from '../../js/utils/graph_helpers.js';

/**
 * @param {GraphWidget} w
 */
export const getLvglGraphIds = (w) => {
    const base = `lvgl_graph_${w.id}`.replace(/-/g, '_');
    return {
        base,
        lineId: `${base}_line`,
        samplesId: `${base}_samples`,
        countId: `${base}_count`,
        minId: `${base}_min`,
        maxId: `${base}_max`
    };
};

/**
 * @param {GraphWidget} w
 */
export const getLvglGraphPointCount = (w) => {
    const p = w.props || {};
    const width = Math.max(40, parseInt(w.width || p.width || 100, 10) || 100);
    const requested = parseInt(p.history_points || Math.round(width / 8), 10) || 12;
    return Math.max(8, Math.min(48, requested));
};

/**
 * @param {GraphWidget} w
 */
const getLvglGraphMetrics = (w) => {
    const p = w.props || {};
    const width = Math.max(40, parseInt(w.width || p.width || 100, 10) || 100);
    const height = Math.max(30, parseInt(w.height || p.height || 100, 10) || 100);
    const hasTitle = !!(w.title || p.title);
    const titleFontSize = parseInt(p.font_size || 12, 10) || 12;
    const plotTop = hasTitle ? Math.max(18, titleFontSize + 6) : 6;
    const plotBottom = 6;
    const plotHeight = Math.max(12, height - plotTop - plotBottom);

    return {
        width,
        height,
        plotTop,
        plotHeight,
        plotBottom,
        pointCount: getLvglGraphPointCount(w)
    };
};

/**
 * @param {GraphWidget} w
 * @returns {GraphPoint[]}
 */
const getPreviewGraphPoints = (w) => {
    const { width, plotTop, plotHeight, pointCount } = getLvglGraphMetrics(w);
    /** @type {GraphPoint[]} */
    const points = [];

    for (let index = 0; index < pointCount; index += 1) {
        const x = pointCount === 1 ? 0 : Math.round((index * (width - 1)) / (pointCount - 1));
        const phase = pointCount === 1 ? 0 : index / (pointCount - 1);
        const wave = Math.sin(phase * Math.PI * 1.5);
        const y = plotTop + Math.round((1 - ((wave + 1) / 2)) * plotHeight);
        points.push({ x, y });
    }

    return points;
};

/**
 * @param {GraphWidget} w
 * @param {number} pointIndex
 */
const buildLvglPointLambda = (w, pointIndex) => {
    const { pointCount, plotHeight, plotTop } = getLvglGraphMetrics(w);
    const { samplesId, countId, minId, maxId } = getLvglGraphIds(w);

    return [
        '!lambda |-',
        `  const int total = ${pointCount};`,
        `  const int count = id(${countId});`,
        `  if (count <= 0) return ${plotTop + plotHeight};`,
        '  const int first = count < total ? total - count : 0;',
        `  if (${pointIndex} < first) return ${plotTop + plotHeight};`,
        `  const int sample_index = count < total ? ${pointIndex} - first : ${pointIndex};`,
        `  float range = id(${maxId}) - id(${minId});`,
        '  if (range <= 0.0001f) range = 1.0f;',
        `  float normalized = (id(${samplesId})[sample_index] - id(${minId})) / range;`,
        '  if (normalized < 0.0f) normalized = 0.0f;',
        '  if (normalized > 1.0f) normalized = 1.0f;',
        `  return ${plotTop + plotHeight} - static_cast<int>(normalized * ${plotHeight});`
    ].join('\n');
};

/**
 * @param {Record<string, any>} p
 * @returns {GraphLineProps}
 */
const getLvglGraphLineProps = (p) => {
    const lineType = (p.line_type || 'SOLID').toUpperCase();
    /** @type {GraphLineProps} */
    const lineProps = {
        line_width: Math.max(1, parseInt(p.line_thickness || 3, 10) || 3),
        line_rounded: true
    };

    if (lineType === 'DASHED') {
        lineProps.line_dash_width = 6;
        lineProps.line_dash_gap = 4;
    } else if (lineType === 'DOTTED') {
        lineProps.line_dash_width = 2;
        lineProps.line_dash_gap = 3;
    }

    return lineProps;
};

/**
 * @param {GraphWidget} w
 * @returns {GraphPoint[]}
 */
const buildLvglGraphPoints = (w) => {
    const hasLiveData = !!((w.entity_id || '').trim());
    const { width, pointCount } = getLvglGraphMetrics(w);

    if (!hasLiveData) {
        return getPreviewGraphPoints(w);
    }

    return Array.from({ length: pointCount }, (_, index) => ({
        x: pointCount === 1 ? 0 : Math.round((index * (width - 1)) / (pointCount - 1)),
        y: buildLvglPointLambda(w, index)
    }));
};

/**
 * @param {GraphWidget} w
 * @param {(value: string) => any} convertColor
 */
const buildLvglGridLines = (w, convertColor) => {
    const p = w.props || {};
    const { width, plotTop, plotHeight } = getLvglGraphMetrics(w);
    const gridColor = convertColor(p.grid_color || 'gray');
    /** @type {Array<Record<string, any>>} */
    const lines = [];

    if (p.grid === false) {
        return lines;
    }

    // Honour x_grid / y_grid so "one line per day" is possible in LVGL mode too.
    // LVGL grids are static objects, so the division count is capped for sanity.
    const divisions = getGraphGridDivisions({
        duration: p.duration,
        xGrid: p.x_grid,
        yGrid: p.y_grid,
        minValue: p.min_value,
        maxValue: p.max_value
    });
    const xDivisions = Math.min(divisions.x, 12);
    const yDivisions = Math.min(divisions.y, 12);

    for (let index = 1; index < yDivisions; index += 1) {
        const y = plotTop + Math.round((plotHeight * index) / yDivisions);
        lines.push({
            line: {
                line_color: gridColor,
                line_width: 1,
                points: [
                    { x: 0, y },
                    { x: width - 1, y }
                ]
            }
        });
    }

    for (let index = 1; index < xDivisions; index += 1) {
        const x = Math.round(((width - 1) * index) / xDivisions);
        lines.push({
            line: {
                line_color: gridColor,
                line_width: 1,
                points: [
                    { x, y: plotTop },
                    { x, y: plotTop + plotHeight }
                ]
            }
        });
    }

    return lines;
};

/**
 * @param {GraphWidget} w
 * @param {string} countExpr
 * @param {(index: string) => string} sampleExpr
 */
export const buildLvglBoundsLines = (w, countExpr, sampleExpr) => {
    const p = w.props || {};
    const { minId, maxId } = getLvglGraphIds(w);
    const autoScale = p.auto_scale !== false;
    const minValue = parseFloat(p.min_value);
    const maxValue = parseFloat(p.max_value);
    const minRange = parseFloat(p.min_range);
    const maxRange = parseFloat(p.max_range);
    const hasMinValue = Number.isFinite(minValue);
    const hasMaxValue = Number.isFinite(maxValue);
    /** @type {string[]} */
    const lines = [];

    if (!autoScale) {
        lines.push(`id(${minId}) = ${hasMinValue ? minValue : 0};`);
        lines.push(`id(${maxId}) = ${hasMaxValue ? maxValue : 100};`);
        return lines;
    }

    lines.push(`float min_v = ${sampleExpr('0')};`);
    lines.push(`float max_v = ${sampleExpr('0')};`);
    lines.push(`for (int i = 1; i < ${countExpr}; i++) {`);
    lines.push(`  float sample = ${sampleExpr('i')};`);
    lines.push('  if (sample < min_v) min_v = sample;');
    lines.push('  if (sample > max_v) max_v = sample;');
    lines.push('}');

    if (hasMinValue) lines.push(`min_v = ${minValue};`);
    if (hasMaxValue) lines.push(`max_v = ${maxValue};`);

    if (Number.isFinite(minRange) && minRange > 0) {
        lines.push('float range_min = max_v - min_v;');
        lines.push(`if (range_min < ${minRange}) {`);
        lines.push('  float center = (max_v + min_v) / 2.0f;');
        lines.push(`  min_v = center - ${minRange} / 2.0f;`);
        lines.push(`  max_v = center + ${minRange} / 2.0f;`);
        lines.push('}');
    }

    if (Number.isFinite(maxRange) && maxRange > 0) {
        lines.push('float range_max = max_v - min_v;');
        lines.push(`if (range_max > ${maxRange}) {`);
        lines.push('  float center = (max_v + min_v) / 2.0f;');
        lines.push(`  min_v = center - ${maxRange} / 2.0f;`);
        lines.push(`  max_v = center + ${maxRange} / 2.0f;`);
        lines.push('}');
    }

    lines.push('float span = max_v - min_v;');
    lines.push('if (span < 0.0f) span = -span;');
    lines.push('if (span < 0.001f) {');
    lines.push('  min_v -= 0.5f;');
    lines.push('  max_v += 0.5f;');
    lines.push('}');
    lines.push(`id(${minId}) = min_v;`);
    lines.push(`id(${maxId}) = max_v;`);

    return lines;
};

/**
 * @param {GraphWidget} w
 */
export const buildLvglLineUpdateAction = (w) => {
    const { lineId } = getLvglGraphIds(w);
    const points = buildLvglGraphPoints(w);
    const lines = [
        '- lvgl.line.update:',
        `    id: ${lineId}`,
        '    points:'
    ];

    points.forEach((point) => {
        lines.push(`      - x: ${point.x}`);
        if (typeof point.y === 'string' && point.y.includes('\n')) {
            const parts = point.y.split('\n');
            lines.push(`        y: ${parts[0]}`);
            parts.slice(1).forEach((part) => {
                lines.push(`          ${part}`);
            });
        } else {
            lines.push(`        y: ${point.y}`);
        }
    });

    return lines.join('\n');
};

/**
 * @param {GraphWidget} w
 */
export const buildLvglLiveUpdateAction = (w) => {
    const { samplesId, countId } = getLvglGraphIds(w);
    const pointCount = getLvglGraphPointCount(w);
    const lambdaLines = [
        '- lambda: |-',
        `    const int max_samples = ${pointCount};`,
        '    float value = x;',
        '    if (isnan(value)) return;',
        `    if (id(${countId}) < max_samples) {`,
        `      id(${samplesId})[id(${countId})] = value;`,
        `      id(${countId}) += 1;`,
        '    } else {',
        '      for (int i = 1; i < max_samples; i++) {',
        `        id(${samplesId})[i - 1] = id(${samplesId})[i];`,
        '      }',
        `      id(${samplesId})[max_samples - 1] = value;`,
        '    }'
    ];

    buildLvglBoundsLines(w, `id(${countId})`, (/** @type {string} */ index) => `id(${samplesId})[${index}]`).forEach((line) => {
        lambdaLines.push(`    ${line}`);
    });

    return `${lambdaLines.join('\n')}\n${buildLvglLineUpdateAction(w)}`;
};

/**
 * @param {GraphWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportLVGL = (w, { common, convertColor, getLVGLFont }) => {
    const p = w.props || {};
    const title = w.title || p.title || 'Graph';
    const { lineId } = getLvglGraphIds(w);
    const bgColor = p.background_color || p.bg_color || 'transparent';
    const fontFamily = p.font_family || "Roboto";
    const fontSize = parseInt(p.font_size || 12, 10) || 12;
    const fontWeight = clampFontWeight(fontFamily, parseInt(p.font_weight || 400, 10) || 400);
    const resolveLVGLFont = getLVGLFont || ((family, size, weight) => `font_${String(family || "Roboto").toLowerCase().replace(/\s+/g, "_")}_${weight || 400}_${size || 12}`);
    const widgets = [
        ...buildLvglGridLines(w, convertColor),
        {
            line: {
                id: lineId,
                line_color: convertColor(p.color || 'black'),
                points: buildLvglGraphPoints(w),
                ...getLvglGraphLineProps(p)
            }
        }
    ];

    if (title) {
        widgets.push({
            label: {
                align: 'top_mid',
                text: `"${title}"`,
                text_font: resolveLVGLFont(fontFamily, fontSize, fontWeight),
                text_color: convertColor(p.color || 'black')
            }
        });
    }

    return {
        obj: {
            ...common,
            ...(bgColor === 'transparent' ? { bg_opa: 'transp' } : { bg_color: convertColor(bgColor) }),
            border_color: convertColor(p.border_color || p.color || 'black'),
            border_width: p.border === false ? 0 : (p.border_width ?? 1),
            radius: p.border_radius || 0,
            widgets
        }
    };
};
