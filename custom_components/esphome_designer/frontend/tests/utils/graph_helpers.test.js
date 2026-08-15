import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    formatGraphLookbackLabel,
    getGraphGridDivisions,
    inferGraphTimeGrid,
    parseDuration,
    generateMockData,
    generateHistoricalDataPoints,
    drawInternalGrid,
    drawSmartAxisLabels,
    resolveGraphValueGrid,
    toEsphomeTimePeriod
} from '../../js/utils/graph_helpers.js';

describe('graph_helpers', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    it('parses duration variants', () => {
        expect(parseDuration()).toBe(3600);
        expect(parseDuration(42)).toBe(42);
        expect(parseDuration('120')).toBe(120);
        expect(parseDuration('10m')).toBe(600);
        expect(parseDuration('2h')).toBe(7200);
        expect(parseDuration('1d')).toBe(86400);
        expect(parseDuration('1w')).toBe(604800);
        expect(parseDuration('1.5h')).toBe(5400);
        expect(parseDuration('bad')).toBe(3600);
    });

    it('infers human-friendly grid intervals and lookback labels', () => {
        expect(inferGraphTimeGrid('2h')).toBe('30min');
        expect(inferGraphTimeGrid('90min')).toBe('23min');
        expect(inferGraphTimeGrid('1w')).toBe('2d');
        expect(inferGraphTimeGrid('bad')).toBe('1h');

        expect(formatGraphLookbackLabel(7200)).toBe('-2.0h');
        expect(formatGraphLookbackLabel(3.5 * 86400)).toBe('-3.5d');
        expect(formatGraphLookbackLabel(604800)).toBe('-1.0w');
    });

    it('falls back cleanly for empty or unsupported durations and formats seconds labels', () => {
        expect(inferGraphTimeGrid(undefined)).toBe('1h');
        expect(inferGraphTimeGrid('   ')).toBe('1h');
        expect(inferGraphTimeGrid('1fortnight')).toBe('1h');
        expect(inferGraphTimeGrid('4s')).toBe('1s');
        expect(formatGraphLookbackLabel(45)).toBe('-45s');
    });

    it('generates deterministic mock points shape', () => {
        const points = generateMockData(200, 100);
        expect(points).toHaveLength(50);
        expect(points[0].x).toBe(0);
        expect(points[49].x).toBe(200);
        expect(points.every(p => p.y >= 0 && p.y <= 100)).toBe(true);
    });

    it('maps historical points and appends tail point when needed', () => {
        const now = Date.now();
        vi.spyOn(Date, 'now').mockReturnValue(now);
        const historyData = [
            { last_changed: new Date(now - 3600_000).toISOString(), state: '10' },
            { last_changed: new Date(now - 1800_000).toISOString(), state: '20' },
            { last_changed: new Date(now - 600_000).toISOString(), state: '30' }
        ];

        const points = generateHistoricalDataPoints(200, 100, 0, 100, historyData, '1h');
        expect(points.length).toBeGreaterThan(2);
        expect(points[0].x).toBeGreaterThanOrEqual(-10);
        expect(points.at(-1).x).toBeLessThanOrEqual(200);
    });

    it('falls back to mock points for empty/invalid history', () => {
        const empty = generateHistoricalDataPoints(100, 50, 0, 10, [], '1h');
        const invalid = generateHistoricalDataPoints(100, 50, 0, 10, [{ state: 'nan' }], '1h');
        expect(empty).toHaveLength(50);
        expect(invalid).toHaveLength(50);
    });

    it('normalizes durations into units ESPHome accepts (#482)', () => {
        expect(toEsphomeTimePeriod('1w')).toBe('7d');
        expect(toEsphomeTimePeriod('2w')).toBe('14d');
        expect(toEsphomeTimePeriod('7d')).toBe('7d');
        expect(toEsphomeTimePeriod('24h')).toBe('24h');
        expect(toEsphomeTimePeriod('90min')).toBe('90min');
        expect(toEsphomeTimePeriod('10m')).toBe('10min');
        expect(toEsphomeTimePeriod('1.5h')).toBe('90min');
        expect(toEsphomeTimePeriod('bad')).toBe('1h');
        expect(toEsphomeTimePeriod('0s', '15min')).toBe('15min');
    });

    it('never infers a week-based x_grid interval (#482)', () => {
        expect(inferGraphTimeGrid('4w')).toBe('7d');
        expect(inferGraphTimeGrid('28d')).toBe('7d');
    });

    it('resolves a positive y_grid step even for degenerate ranges (#482)', () => {
        expect(resolveGraphValueGrid('5', '0', '30')).toBe('5');
        expect(resolveGraphValueGrid('', '0', '100')).toBe('50');
        expect(resolveGraphValueGrid('0', '50', '50')).toBe('1');
        expect(resolveGraphValueGrid('-2', '50', '50')).toBe('1');
    });

    it('derives grid divisions from x_grid and y_grid settings (#482)', () => {
        expect(getGraphGridDivisions({ duration: '7d', xGrid: '24h' }).x).toBe(7);
        expect(getGraphGridDivisions({ duration: '1w', xGrid: '24h' }).x).toBe(7);
        expect(getGraphGridDivisions({}).x).toBe(4);
        expect(getGraphGridDivisions({ duration: '1h', xGrid: 'bad' }).x).toBe(4);
        expect(getGraphGridDivisions({ yGrid: '25', minValue: 0, maxValue: 100 }).y).toBe(4);
        expect(getGraphGridDivisions({ yGrid: '5', minValue: 0, maxValue: 30 }).y).toBe(6);
        // Guard against pathological configurations flooding the canvas.
        expect(getGraphGridDivisions({ duration: '30d', xGrid: '1min' }).x).toBe(48);
    });

    it('draws grid and axis labels onto dom', () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        drawInternalGrid(svg, 200, 100, '', '');
        expect(svg.querySelectorAll('line').length).toBeGreaterThan(0);

        const dailySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        drawInternalGrid(dailySvg, 280, 100, '24h', '', 'rgba(0,0,0,0.1)', { duration: '7d' });
        const vertical = Array.from(dailySvg.querySelectorAll('line'))
            .filter((line) => line.getAttribute('x1') === line.getAttribute('x2'));
        expect(vertical).toHaveLength(6);

        const container = document.createElement('div');
        container.style.width = '240px';
        container.style.height = '140px';
        document.body.appendChild(container);

        drawSmartAxisLabels(container, 20, 20, 180, 80, 0, 100, '1h', 'w1', '#666', {
            fontFamily: 'Inter',
            fontSize: 14,
            fontWeight: 700
        });
        const labels = container.querySelectorAll('.graph-axis-label[data-widget-id="w1"]');
        expect(labels.length).toBeGreaterThan(0);
        expect(labels[0].style.fontFamily).toContain('Inter');
        expect(labels[0].style.fontWeight).toBe('700');
        expect(labels[0].style.fontSize).toBe('14px');

        drawSmartAxisLabels(container, 20, 20, 180, 80, 0, 100, '1h', 'w1', '#666', {
            fontFamily: 'Inter',
            fontSize: 14,
            fontWeight: 700
        });
        expect(container.querySelectorAll('.graph-axis-label[data-widget-id="w1"]').length).toBe(labels.length);
    });

    it('auto-scales out-of-range history and clamps labels inside cramped artboards', () => {
        const now = Date.now();
        vi.spyOn(Date, 'now').mockReturnValue(now);

        const points = generateHistoricalDataPoints(100, 40, 0, 100, [
            { last_changed: new Date(now - 1700_000).toISOString(), state: '150' },
            { last_changed: new Date(now - 900_000).toISOString(), state: '180' },
            { last_changed: new Date(now - 100_000).toISOString(), state: '210' }
        ], '30m');

        expect(points.length).toBeGreaterThanOrEqual(3);
        expect(points.every(point => point.y >= -4 && point.y <= 44)).toBe(true);

        const container = document.createElement('div');
        container.style.width = '80px';
        container.style.height = '60px';
        document.body.appendChild(container);

        drawSmartAxisLabels(container, 10, 45, 60, 20, 0, 10, '30m', 'w2');

        const labels = [...container.querySelectorAll('.graph-axis-label[data-widget-id="w2"]')];
        expect(labels[0].style.left).toBe('14px');
        expect(labels[0].style.textAlign).toBe('left');
        expect(labels.at(-1).style.transform).toBe('translateX(-100%)');
        expect(labels.at(-1).textContent).toBe('Now');
    });

    it('positions y-axis labels outside the graph when there is room on the left', () => {
        const container = document.createElement('div');
        container.style.width = '240px';
        container.style.height = '160px';
        document.body.appendChild(container);

        drawSmartAxisLabels(container, 60, 20, 120, 60, 10, 30, '4s', 'w3');

        const labels = [...container.querySelectorAll('.graph-axis-label[data-widget-id="w3"]')];
        expect(labels.length).toBeGreaterThan(0);
        expect(labels[0].style.left).toBe('56px');
        expect(labels[0].style.transform).toBe('translateX(-100%)');
        expect(labels[0].style.textAlign).toBe('right');
    });
});
