import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import { exportDoc as exportWeatherDoc } from '../../features/weather_forecast/export_direct.js';
import { collectRequirements as collectWeatherRequirements } from '../../features/weather_forecast/export_sensors.js';
import { renderWeatherIcon } from '../../features/weather_icon/render.js';

describe('weather feature exports', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    it('exports direct daily forecasts with rounded backgrounds and high/low formatting', () => {
        const lines = [];

        exportWeatherDoc({
            id: 'weather_daily',
            x: 0,
            y: 0,
            width: 210,
            height: 70,
            props: {
                layout: 'horizontal',
                days: 3,
                background_color: 'white',
                border_width: 1,
                border_color: 'black',
                border_radius: 8,
                color: 'blue',
                day_language: 'de',
                precision: 0
            }
        }, {
            lines,
            addFont: vi.fn(() => 'weather_font'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rounded_rectangle(0, 0, 210, 70, 8, Color(white));');
        expect(output).toContain('auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c) {');
        expect(output).toContain('draw_rrect_border(0, 0, 210, 70, 8, 1, Color(black));');
        expect(output).toContain('auto get_day_name = [](int offset) -> std::string {');
        expect(output).toContain('static const char* weekday_names[] = {"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"};');
        expect(output).toContain('if (target_day == 0) return "Heute";');
        expect(output).toContain('sprintf(temp_buf, "%.*f/%.*f');
        expect(output).toContain('weather_cond_day0');
    });

    it('exports direct hourly forecasts with fixed slots and single temperature values', () => {
        const lines = [];

        exportWeatherDoc({
            id: 'weather_hourly',
            x: 5,
            y: 6,
            width: 120,
            height: 100,
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'fixed',
                hourly_slots: '06,09,12',
                start_offset: 1,
                precision: 1,
                temp_unit: 'F',
                show_high_low: false
            }
        }, {
            lines,
            addFont: vi.fn(() => 'weather_font'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('const char* slots[] = {"09:00", "12:00"};');
        expect(output).toContain('weather_cond_h0900');
        expect(output).toContain('it.printf(dx + 30, dy + 52, id(weather_font), Color(theme_auto), TextAlign::TOP_CENTER, "--");');
    });

    it('renders weather icons from nested attributes and shows a no-entity preview label when appropriate', () => {
        mockAppState.entityStates = {
            'weather.home': {
                state: 'sunny',
                attributes: {
                    forecast: {
                        condition: 'lightning-rainy'
                    }
                }
            }
        };

        const withEntity = document.createElement('div');
        renderWeatherIcon(withEntity, {
            id: 'weather_icon_attr',
            width: 40,
            height: 36,
            entity_id: 'weather.home',
            props: {
                attribute: 'forecast.condition',
                fit_icon_to_frame: true,
                border_width: 1,
                border_color: 'black',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value || '#000'
        });

        expect(withEntity.style.fontSize).toBe('28px');
        expect(withEntity.style.border).toContain('1px solid');
        expect(withEntity.innerText.codePointAt(0)).toBe(0xf067e);

        const noEntity = document.createElement('div');
        renderWeatherIcon(noEntity, {
            id: 'weather_icon_empty',
            width: 32,
            height: 32,
            props: {}
        }, {
            getColorStyle: (value) => value || '#000'
        });

        expect(noEntity.textContent).toContain('No Entity');
        expect(noEntity.innerText.codePointAt(0)).toBe(0xf0625);
    });

    it('exports direct forecasts with rectangular borders when border_radius is zero', () => {
        const lines = [];

        exportWeatherDoc({
            id: 'weather_rect_border',
            x: 10,
            y: 20,
            width: 150,
            height: 80,
            props: {
                layout: 'horizontal',
                days: 2,
                background_color: 'white',
                border_width: 2,
                border_color: 'black',
                border_radius: 0,
                color: 'blue',
                day_language: 'en',
                precision: 0
            }
        }, {
            lines,
            addFont: vi.fn(() => 'weather_font'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(10, 20, 150, 80, Color(white));');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 150 - 2 * 0, 80 - 2 * 0, Color(black));');
        expect(output).toContain('it.rectangle(10 + 1, 20 + 1, 150 - 2 * 1, 80 - 2 * 1, Color(black));');
    });

    it('requests the configured day and temp font weights instead of hardcoded values (#488)', () => {
        const lines = [];
        const addFont = vi.fn(() => 'weather_font');

        exportWeatherDoc({
            id: 'weather_weights',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'daily',
                days: 1,
                font_family: 'Inter',
                font_weight_day: 500,
                font_weight_temp: 600
            }
        }, {
            lines,
            addFont,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        expect(addFont).toHaveBeenCalledWith('Inter', 500, 12);
        expect(addFont).toHaveBeenCalledWith('Inter', 600, 14);

        const tracked = [];
        collectWeatherRequirements({
            id: 'weather_weights_req',
            props: {
                font_family: 'Roboto',
                font_weight_day: 300,
                font_weight_temp: 900,
                icon_size: 24
            }
        }, {
            addFont: (family, weight, size) => tracked.push([family, weight, size]),
            trackIcon: () => {}
        });

        expect(tracked).toContainEqual(['Roboto', 300, 12]);
        expect(tracked).toContainEqual(['Roboto', 900, 14]);
    });
});
