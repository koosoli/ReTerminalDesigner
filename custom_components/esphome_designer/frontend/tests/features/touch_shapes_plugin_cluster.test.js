/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';

import debugGridPlugin from '../../features/debug_grid/plugin.js';
import roundedRectPlugin from '../../features/rounded_rect/plugin.js';
import shapeCirclePlugin from '../../features/shape_circle/plugin.js';
import templateNavBarPlugin from '../../features/template_nav_bar/plugin.js';
import touchAreaPlugin from '../../features/touch_area/plugin.js';

describe('touch and shape plugin cluster', () => {
    it('renders and exports debug grids', () => {
        const host = document.createElement('div');

        debugGridPlugin.render(host, {
            width: 40,
            height: 20,
            props: {
                spacing: 20,
                dashed: true,
                dash_length: 3,
                space_length: 5,
                line_color: 'red'
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const lines = host.querySelectorAll('line');
        expect(lines).toHaveLength(5);
        expect(lines[0].getAttribute('stroke')).toBe('css-red');
        expect(lines[0].getAttribute('stroke-dasharray')).toBe('3, 5');

        expect(debugGridPlugin.exportOpenDisplay({
            props: {
                spacing: 18,
                line_color: 'blue',
                dashed: false,
                label_font_size: 9
            }
        }, {})).toEqual({
            type: 'debug_grid',
            spacing: 18,
            line_color: 'blue',
            dashed: false,
            dash_length: 2,
            space_length: 4,
            show_labels: true,
            label_step: 40,
            label_color: 'black',
            label_font_size: 9,
            font: 'ppb.ttf'
        });
    });

    it('renders touch icons and exports binary sensor actions', () => {
        const host = document.createElement('div');
        const widget = {
            id: 'touch_1',
            type: 'touch_area',
            entity_id: 'light.kitchen',
            x: 10,
            y: 15,
            width: 30,
            height: 30,
            _pageIndex: 1,
            props: {
                title: 'Kitchen',
                icon: 'F0141',
                icon_pressed: 'F0142',
                icon_size: 24,
                color: 'rgba(0, 0, 255, 0.2)',
                border_color: '#0000ff',
                nav_action: 'none'
            }
        };

        touchAreaPlugin.render(host, widget, {
            getColorStyle: (value) => value
        });

        const icon = host.querySelector('span');
        expect(icon).not.toBeNull();
        expect(icon?.style.fontFamily).toContain('MDI');
        host.dispatchEvent(new Event('mouseenter'));
        expect(host.style.backgroundColor).toBe('rgba(0, 0, 255, 0.4)');
        host.dispatchEvent(new Event('mouseleave'));
        expect(host.style.backgroundColor).toBe('rgba(0, 0, 255, 0.2)');

        const requirements = {
            trackIcon: vi.fn()
        };
        touchAreaPlugin.collectRequirements(widget, requirements);
        expect(requirements.trackIcon).toHaveBeenCalledWith('F0141', 24);
        expect(requirements.trackIcon).toHaveBeenCalledWith('F0142', 24);

        const exportContext = {
            lines: [],
            addFont: vi.fn(() => 'mdi_font'),
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            getConditionCheck: vi.fn(() => null),
            widgets: [
                widget,
                {
                    id: 'touch_next',
                    type: 'touch_area',
                    x: 35,
                    y: 15,
                    width: 12,
                    height: 12,
                    _pageIndex: 1,
                    props: {
                        nav_action: 'next_page'
                    }
                },
                {
                    id: 'touch_reload',
                    type: 'touch_area',
                    x: 50,
                    y: 15,
                    width: 20,
                    height: 20,
                    _pageIndex: 1,
                    props: {
                        nav_action: 'reload_page'
                    }
                },
                {
                    id: 'placeholder',
                    type: 'text',
                    _pageIndex: 0
                }
            ],
            profile: {
                features: { lcd: true },
                touch: { platform: 'gt911' }
            }
        };

        touchAreaPlugin.export(widget, exportContext);
        touchAreaPlugin.onExportBinarySensors(exportContext);

        const joined = exportContext.lines.join('\n');
        expect(joined).toContain('id(mdi_font)');
        expect(joined).toContain('target_page: !lambda \'return id(display_page) + 1;\'');
        expect(joined).toContain('id: change_page_to');
        expect(joined).toContain('script.execute: manage_run_and_sleep');
        expect(joined).toContain('action: homeassistant.toggle');
    });

    it('renders and exports circular and rounded shapes with resolved colors', () => {
        const circleHost = document.createElement('div');
        shapeCirclePlugin.render(circleHost, {
            props: {
                fill: true,
                color: 'theme_auto',
                bg_color: 'white',
                border_color: 'red',
                border_width: 2,
                opacity: 50
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? 'black' : value
        });

        expect(circleHost.style.backgroundColor).toBe('white');
        expect(circleHost.style.border).toBe('2px solid red');
        expect(circleHost.style.opacity).toBe('0.5');

        expect(shapeCirclePlugin.exportOpenDisplay({
            x: 2,
            y: 4,
            width: 40,
            height: 30,
            props: {
                fill: true,
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        })).toMatchObject({
            type: 'circle',
            fill: 'white',
            outline: 'white'
        });

        const roundedHost = document.createElement('div');
        roundedRectPlugin.render(roundedHost, {
            props: {
                fill: true,
                show_border: false,
                color: 'black',
                bg_color: 'white',
                radius: 12,
                border_width: 3
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(roundedHost.style.border).toBe('0px solid white');
        expect(roundedHost.style.borderRadius).toBe('12px');
        expect(roundedRectPlugin.exportLVGL({
            props: {
                fill: true,
                bg_color: 'white',
                color: 'black',
                border_color: 'red',
                radius: 12,
                border_width: 3,
                opa: 200
            }
        }, {
            common: { id: 'rounded' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        })).toEqual({
            obj: {
                id: 'rounded',
                bg_color: 'Color(white)',
                bg_opa: 'cover',
                border_width: 3,
                border_color: 'Color(red)',
                radius: 12,
                opa: 'opa(200)'
            }
        });
    });

    it('renders nav bars with preview contrast and exports LVGL plus touch handlers', () => {
        const host = document.createElement('div');

        templateNavBarPlugin.render(host, {
            props: {
                show_prev: true,
                show_home: true,
                show_next: false,
                show_background: true,
                background_color: 'black',
                color: 'black',
                icon_size: 20
            }
        }, {
            getColorStyle: () => '#000000'
        });

        expect(host.style.color).toBe('rgb(255, 255, 255)');
        expect(host.children).toHaveLength(2);

        const lvgl = templateNavBarPlugin.exportLVGL({
            props: {
                show_prev: true,
                show_home: true,
                show_next: true,
                show_background: false,
                prev_target: '2',
                home_target: 'home',
                next_target: 'relative_next',
                icon_size: 20,
                border_radius: 6,
                border_thickness: 1,
                border_color: 'white',
                color: 'white'
            }
        }, {
            common: { id: 'nav_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (_family, size, weight) => `mdi_${size}_${weight}`
        });

        expect(lvgl.obj.widgets).toHaveLength(3);
        expect(lvgl.obj.widgets[0].button.on_click).toEqual([
            { 'script.execute': { id: 'change_page_to', target_page: '2' } }
        ]);
        expect(lvgl.obj.widgets[1].button.on_click).toEqual([
            { 'script.execute': { id: 'change_page_to', target_page: 0 } }
        ]);
        expect(lvgl.obj.bg_opa).toBe('transp');
        expect(lvgl.obj.bg_color).toBeUndefined();
        expect(lvgl.obj.border_width).toBe(0);
        expect(lvgl.obj.radius).toBe(0);

        const sensorContext = {
            lines: [],
            widgets: [{
                id: 'nav_bar',
                type: 'template_nav_bar',
                x: 0,
                y: 0,
                width: 90,
                height: 30,
                _pageIndex: 1,
                props: {
                    prev_target: 'relative_prev',
                    home_target: 'home',
                    next_target: '3'
                }
            }, {
                id: 'page_zero',
                type: 'text',
                _pageIndex: 0
            }],
            profile: {
                touch: { platform: 'gt911' },
                features: { lcd: true }
            }
        };

        templateNavBarPlugin.onExportBinarySensors(sensorContext);

        const joined = sensorContext.lines.join('\n');
        expect(joined).toContain('id: nav_prev_nav_bar');
        expect(joined).toContain('id: nav_home_nav_bar');
        expect(joined).toContain('id: nav_next_nav_bar');
        expect(joined).toContain('id: change_page_to');
        expect(joined).toContain('target_page: 0');
        expect(joined).toContain('target_page: 3');
    });
});
