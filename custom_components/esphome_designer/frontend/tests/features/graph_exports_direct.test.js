import { describe, expect, it, vi } from 'vitest';

import { exportDoc } from '../../features/graph/exports_direct.js';

function createContext(overrides = {}) {
    return {
        lines: [],
        addFont: vi.fn(() => 'graph_font'),
        getColorConst: (value) => `Color(${value})`,
        addDitherMask: vi.fn((lines) => lines.push('        // dither mask')),
        getConditionCheck: () => '',
        isEpaper: false,
        sanitize: (value) => value,
        ...overrides
    };
}

describe('graph exports_direct', () => {
    it('exports direct-mode graphs with borders, static labels, grids, and time markers', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-1',
            x: 10,
            y: 20,
            width: 120,
            height: 60,
            entity_id: 'sensor.room_temp',
            title: 'Room',
            props: {
                duration: '2h',
                color: 'blue',
                border: true,
                border_width: 2,
                border_color: 'navy',
                font_family: 'Inter',
                font_size: 14,
                font_weight: 700,
                min_value: '0',
                max_value: '80',
                auto_scale: false
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('it.graph(10, 20, id(graph_graph_1));');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 120 - 2 * 0, 60 - 2 * 0, Color(navy));');
        expect(output).toContain('it.printf(10 - 4, 20 + 30 - 6, id(graph_font), Color(blue), TextAlign::TOP_RIGHT, "%.0f", (float)40);');
        // Regression (#482): it.graph() already draws the grid from the graph: component,
        // so the lambda must not paint a second, fixed 4x4 grid on top of it.
        expect(output).not.toContain('it.draw_pixel_at(');
        expect(output).toContain('it.printf(10 + 0, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_LEFT, "-2.0h");');
        expect(output).toContain('it.printf(10 + 60, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_CENTER, "-1.0h");');
        expect(output).toContain('it.printf(10 + 120, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_RIGHT, "Now");');
        expect(context.addFont).toHaveBeenCalledWith('Inter', 700, 14);
        expect(context.addDitherMask).toHaveBeenCalledOnce();
    });

    it('exports HA-history graphs with background fill and dynamic axis labels', () => {
        const context = createContext({
            getConditionCheck: () => 'if (id(graph_enabled)) {'
        });

        exportDoc({
            id: 'graph-2',
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            entity_id: 'sensor.energy',
            props: {
                use_ha_history: true,
                auto_scale: true,
                line_thickness: 2,
                bg_color: 'white',
                color: 'red'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('if (id(graph_enabled)) {');
        expect(output).toContain('it.filled_rectangle(0, 0, 100, 40, Color(white));');
        expect(output).toContain('float g_pad = (g_max - g_min) * 0.05;');
        expect(output).toContain('int hist_count = id(hist_graph_2_count);');
        expect(output).toContain('it.line(x1, y1+1, x2, y2+1, Color(red));');
        expect(output).toContain('const char* fmt = g_range >= 10 ? "%.0f" : "%.1f";');
    });

    it('emits a clear placeholder when the graph has no entity source', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-empty',
            x: 5,
            y: 6,
            width: 80,
            height: 30,
            props: {
                color: 'black'
            }
        }, context);

        expect(context.lines.join('\n')).toContain('Graph (no entity)');
    });

    it('draws one hand-rolled grid division per x_grid interval for HA-history graphs', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-grid',
            x: 0,
            y: 0,
            width: 280,
            height: 140,
            entity_id: 'sensor.energy',
            props: {
                use_ha_history: true,
                auto_scale: false,
                duration: '7d',
                x_grid: '24h',
                y_grid: '10',
                min_value: '0',
                max_value: '30',
                color: 'black'
            }
        }, context);

        const output = context.lines.join('\n');
        // 7d / 24h => 7 columns => 6 interior vertical lines.
        const verticalLines = output.match(/it\.draw_pixel_at\(\d+, 0 \+ i,/g) || [];
        expect(verticalLines).toHaveLength(6);
        // range 30 / y_grid 10 => 3 rows => 2 interior horizontal lines.
        const horizontalLines = output.match(/it\.draw_pixel_at\(0 \+ i, \d+,/g) || [];
        expect(horizontalLines).toHaveLength(2);
    });

    it('omits hand-rolled grid lines when the grid is switched off', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-nogrid',
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            entity_id: 'sensor.energy',
            props: {
                use_ha_history: true,
                grid: false,
                duration: '7d',
                x_grid: '24h',
                y_grid: '10',
                color: 'black'
            }
        }, context);

        expect(context.lines.join('\n')).not.toContain('it.draw_pixel_at(');
    });

    it('formats week-long graph labels with day and week units', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-week',
            x: 0,
            y: 0,
            width: 120,
            height: 50,
            entity_id: 'sensor.energy',
            props: {
                duration: '1w',
                color: 'black'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('"-1.0w"');
        expect(output).toContain('"-3.5d"');
    });
});
