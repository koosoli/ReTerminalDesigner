/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import weatherIconPlugin from '../../features/weather_icon/plugin.js';
import { renderWifiSignal } from '../../features/wifi_signal/render.js';
import {
    exportLVGL as exportForecastLVGL,
    exportOEPL as exportForecastOEPL,
    exportOpenDisplay as exportForecastOpenDisplay
} from '../../features/weather_forecast/export_protocols.js';

describe('weather protocol misc coverage', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    it('exports weather icon fallback output and de-duplicates generated condition sensors', () => {
        const lines = [];
        weatherIconPlugin.export({
            id: 'weather_icon_direct',
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            entity_id: '   ',
            props: {
                weather_entity: '',
                size: 28,
                bg_color: 'white',
                border_width: 1,
                border_color: 'black'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'mdi_28'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => ''
        });

        const directOutput = lines.join('\n');
        expect(directOutput).toContain('it.filled_rectangle(0, 0, 40, 40, Color(white));');
        expect(directOutput).toContain('it.rectangle(0 + 0, 0 + 0, 40 - 2 * 0, 40 - 2 * 0, Color(black));');
        expect(directOutput).toContain('\\U000F0625');

        const context = {
            lines: [],
            widgets: [
                {
                    id: 'weather_widget',
                    type: 'weather_icon',
                    entity_id: 'weather.home',
                    props: {
                        attribute: 'forecast.condition'
                    }
                },
                {
                    id: 'mqtt_weather',
                    type: 'weather_icon',
                    entity_id: 'mqtt:weather/cond',
                    props: {
                        mqtt_topic: 'weather/cond'
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set()
        };

        weatherIconPlugin.onExportTextSensors(context);

        const sensorOutput = context.lines.join('\n');
        expect(sensorOutput).toContain('- platform: homeassistant');
        expect(sensorOutput).toContain('attribute: forecast');
        expect(sensorOutput).toContain('- platform: mqtt_subscribe');
        expect(sensorOutput).toContain('topic: "weather/cond"');
        expect(Array.from(context.pendingTriggers.get('weather_home_forecast_txt') || [])).toEqual([
            '- lvgl.widget.refresh: weather_widget'
        ]);
        expect(Array.from(context.pendingTriggers.get('mqtt_weather_cond_txt') || [])).toEqual([
            '- lvgl.widget.refresh: mqtt_weather'
        ]);
    });

    it('uses OpenDisplay MDI weather icon names instead of OEPL aliases', () => {
        const openDisplay = weatherIconPlugin.exportOpenDisplay({
            id: 'weather_odp',
            type: 'weather_icon',
            x: 10,
            y: 20,
            width: 40,
            height: 40,
            entity_id: 'weather.home',
            props: {
                size: 24,
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(openDisplay.value).toContain("'sunny': 'weather-sunny'");
        expect(openDisplay.value).toContain("'partlycloudy': 'weather-partly-cloudy'");
        expect(openDisplay.value).toContain("'partlycloudy-night': 'weather-night-partly-cloudy'");
        expect(openDisplay.value).toContain("'cloudy': 'weather-cloudy'");
        expect(openDisplay.value).not.toContain("'sunny': 'sun'");
        expect(openDisplay.color).toBe('black');
    });

    it('renders weak wifi previews without a dBm label and with cleared borders', () => {
        mockAppState.entityStates = {
            'sensor.wifi_bad': { state: '-120' }
        };

        const el = document.createElement('div');
        renderWifiSignal(el, {
            width: 40,
            height: 30,
            entity_id: 'sensor.wifi_bad',
            props: {
                is_local_sensor: false,
                show_dbm: false,
                fit_icon_to_frame: true,
                border_width: 0
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value
        });

        expect(el.textContent).not.toContain('dB');
        expect(el.innerText.codePointAt(0)).toBe(0xf092b);
        expect(el.style.border).not.toContain('solid');
        expect(el.style.fontSize).toBe('22px');
    });

    it('exports forecast protocols with hourly slot handling and theme-aware colors', () => {
        const lvgl = exportForecastLVGL({
            id: 'forecast_hourly',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 3,
                start_offset: 2,
                layout: 'vertical',
                color: 'theme_auto',
                day_font_size: 11,
                icon_size: 20,
                temp_font_size: 15
            }
        }, {
            common: { id: 'forecast_root' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_')
        });

        expect(lvgl.obj.widgets).toHaveLength(3);
        expect(lvgl.obj.layout.flex_flow).toBe('column');
        expect(JSON.stringify(lvgl)).toContain('weather_cond_hplus1');
        expect(JSON.stringify(lvgl)).toContain('\\U000F0625');

        const fixedHourlyLvgl = exportForecastLVGL({
            id: 'forecast_hourly_fixed',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'fixed',
                hourly_slots: '06,09,12',
                start_offset: 1
            }
        }, {
            common: { id: 'forecast_hourly_fixed_root' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_')
        });

        const fixedOutput = JSON.stringify(fixedHourlyLvgl);
        expect(fixedHourlyLvgl.obj.widgets[0].obj.widgets[0].label.text).toContain('09:00');
        expect(fixedOutput).toContain('weather_cond_h0900');
        expect(fixedOutput).toContain('weather_high_h0900');

        const dailyLvgl = exportForecastLVGL({
            id: 'forecast_daily_unknowns',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'daily',
                days: 1
            }
        }, {
            common: { id: 'forecast_daily_unknowns_root' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_')
        });

        expect(JSON.stringify(dailyLvgl)).toContain('std::isnan(high) && std::isnan(low)');
        expect(JSON.stringify(dailyLvgl)).toContain('temp_text = \\"--/--\\"');

        const localizedDailyLvgl = exportForecastLVGL({
            id: 'forecast_daily_de',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'daily',
                days: 2,
                day_language: 'de'
            }
        }, {
            common: { id: 'forecast_daily_root' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_')
        });

        const localizedOutput = JSON.stringify(localizedDailyLvgl);
        expect(localizedOutput).toContain('weekday_names[] = {\\"So\\", \\"Mo\\", \\"Di\\", \\"Mi\\", \\"Do\\", \\"Fr\\", \\"Sa\\"}');
        expect(localizedOutput).toContain('return std::string(\\"Heute\\")');

        const openDisplay = exportForecastOpenDisplay({
            x: 4,
            y: 6,
            width: 40,
            height: 50,
            entity_id: 'weather.home',
            props: {
                color: 'theme_auto',
                icon_size: 18,
                temp_font_size: 12
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });

        expect(openDisplay[0].color).toBe('white');
        expect(openDisplay[0].value).toContain("default('help-circle-outline')");
        expect(openDisplay[1].value).toContain("state_attr('weather.home', 'temperature')");

        const openDisplayNoEntity = exportForecastOpenDisplay({
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            entity_id: '',
            props: {
                weather_entity: '',
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(openDisplayNoEntity[0].value).toBe('help-circle-outline');

        const oepl = exportForecastOEPL({
            x: 1,
            y: 2,
            entity_id: 'weather.home',
            props: {
                temp_font_size: 12,
                color: 'theme_auto'
            }
        }, {
            _layout: {},
            _page: {}
        });

        expect(oepl).toMatchObject({
            type: 'text',
            color: 'theme_auto',
            anchor: 'lt'
        });
    });

    it('applies configured font weights to LVGL forecast labels (#488)', () => {
        const lvgl = exportForecastLVGL({
            id: 'forecast_weights_lvgl',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            props: {
                forecast_mode: 'daily',
                days: 1,
                font_family: 'Inter',
                font_weight_day: 800,
                font_weight_temp: 300
            }
        }, {
            common: { id: 'forecast_weights_root' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_')
        });

        const labels = lvgl.obj.widgets[0].obj.widgets.map((entry) => entry.label.text_font);
        expect(labels).toContain('Inter_12_800');
        expect(labels).toContain('Inter_14_300');
    });
});
