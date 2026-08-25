import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import { render } from '../../features/weather_forecast/render.js';
import { renderProperties } from '../../features/weather_forecast/properties.js';

function createPanel() {
    const labels = [];
    return {
        labels,
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn(),
        addDropShadowButton: vi.fn(),
        addCheckbox(label) { labels.push(label); },
        addLabeledInputWithPicker(label) { labels.push(label); },
        addSelect(label) { labels.push(label); },
        addNumberWithSlider(label) { labels.push(label); },
        addLabeledInput(label) { labels.push(label); },
        addColorSelector(label) { labels.push(label); },
        getContainer() {
            return document.body;
        }
    };
}

describe('weather_forecast render and properties', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        mockAppState.updateWidget.mockReset();
        document.body.innerHTML = '';
        vi.stubGlobal('navigator', {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined)
            }
        });
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: true
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('renders daily forecasts from live Home Assistant entity state', () => {
        mockAppState.entityStates = {
            'sensor.weather_forecast_day_0_condition': { state: 'sunny' },
            'sensor.weather_forecast_day_0_high': { state: '72' },
            'sensor.weather_forecast_day_0_low': { state: '61' },
            'sensor.weather_forecast_day_1_condition': { state: 'rainy' },
            'sensor.weather_forecast_day_1_high': { state: '65' },
            'sensor.weather_forecast_day_1_low': { state: '55' }
        };

        const el = document.createElement('div');
        render(el, {
            width: 300,
            height: 90,
            entity_id: 'weather.home',
            props: {
                days: 2,
                temp_unit: 'F',
                precision: 0,
                border_width: 2,
                border_color: 'black',
                background_color: 'white'
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.children).toHaveLength(2);
        expect(el.textContent).toContain('Today');
        expect(el.textContent).toContain('72°F/61°F');
        expect(el.style.border).toContain('2px solid');
    });

    it('renders localized day labels consistently when a day language is selected', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-27T10:15:00'));

        const el = document.createElement('div');
        render(el, {
            width: 300,
            height: 90,
            props: {
                days: 2,
                day_language: 'de',
                temp_unit: 'C',
                precision: 0
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.textContent).toContain('Heute');
        expect(el.textContent).toContain('Sa');
    });

    it('renders fixed hourly forecasts using slot labels and single temperature values', () => {
        mockAppState.entityStates = {
            'sensor.weather_forecast_hour_0900_condition': { state: 'cloudy' },
            'sensor.weather_forecast_hour_0900_high': { state: '18.4' },
            'sensor.weather_forecast_hour_0900_low': { state: '10.0' }
        };

        const el = document.createElement('div');
        render(el, {
            width: 180,
            height: 80,
            entity_id: 'weather.home',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'fixed',
                hourly_slots: '06,09',
                start_offset: 1,
                temp_unit: 'C',
                precision: 1
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.children).toHaveLength(1);
        expect(el.textContent).toContain('09:00');
        expect(el.textContent).toContain('18.4°C');
        expect(el.textContent).not.toContain('/');
    });

    it('renders relative-mode property controls and copies the generated HA YAML', async () => {
        const panel = createPanel();
        const widget = {
            id: 'weather_1',
            entity_id: 'weather.home',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 2,
                temp_unit: 'F',
                color: 'theme_auto',
                bg_color: 'transparent'
            }
        };

        renderProperties(panel, widget);
        const copyButton = document.querySelector('button');
        copyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await Promise.resolve();

        expect(panel.labels).toContain('Hours Ahead');
        expect(panel.labels).toContain('Day Language');
        expect(panel.labels).toContain('Temp Precision');
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        const copiedText = navigator.clipboard.writeText.mock.calls[0][0];
        expect(copiedText).toContain("name: 'Weather Forecast Plus 1h High'");
        expect(copiedText).toContain('unique_id: weather_forecast_plus_1h');
        expect(copiedText).toContain('default_entity_id: sensor.weather_forecast_plus_1h');
        expect(copiedText).toContain('default_entity_id: sensor.weather_forecast_plus_1h_condition');
        expect(copiedText).toContain('timedelta(hours=1)');
        expect(copiedText).toContain("as_timestamp((now() + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0))");
        expect(copiedText).toContain('{% set ns = namespace(hit=none) %}');
        expect(copiedText).not.toContain('weather_forecast_plus_1h_high');
        expect(copiedText).not.toContain("selectattr('datetime','search'");
    });

    it('copies fixed hourly YAML using the configured slot offset', async () => {
        const panel = createPanel();
        const widget = {
            id: 'weather_fixed',
            entity_id: 'weather.home',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'fixed',
                hourly_slots: '06,09,12',
                start_offset: 1,
                temp_unit: 'C'
            }
        };

        renderProperties(panel, widget);
        document.querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await Promise.resolve();

        const copiedText = navigator.clipboard.writeText.mock.calls[0][0];
        expect(copiedText).toContain('unique_id: weather_forecast_hour_0900');
        expect(copiedText).toContain('default_entity_id: sensor.weather_forecast_hour_0900');
        expect(copiedText).toContain('default_entity_id: sensor.weather_forecast_hour_0900_condition');
        expect(copiedText).toContain('weather_forecast_hour_1200');
        expect(copiedText).toContain("{% set target = today_at('09:00') %}");
        expect(copiedText).toContain("{% set target_ts = as_timestamp(target) %}");
        expect(copiedText).not.toContain('weather_forecast_hour_0600_high');
        expect(copiedText).not.toContain('weather_forecast_hour_0900_high');
        expect(copiedText).not.toContain("selectattr('datetime','search'");
    });

    it('falls back to execCommand copy when the clipboard API is unavailable', () => {
        const panel = createPanel();
        const execCommand = vi.fn(() => true);
        vi.stubGlobal('navigator', {});
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: false
        });
        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: execCommand
        });

        renderProperties(panel, {
            id: 'weather_daily',
            entity_id: 'weather.home',
            props: {
                forecast_mode: 'daily',
                days: 2,
                temp_unit: 'F'
            }
        });
        document.querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(document.querySelector('textarea')).toBeNull();
    });

    it('renders relative hourly forecasts using the current hour labels in vertical layouts', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-27T10:15:00'));
        mockAppState.entityStates = {
            'sensor.weather_forecast_plus_1h_condition': { state: 'sunny' },
            'sensor.weather_forecast_plus_1h': { state: '14.7' },
            'sensor.weather_forecast_plus_2h_condition': { state: 'rainy' },
            'sensor.weather_forecast_plus_2h': { state: '12.4' }
        };

        const el = document.createElement('div');
        render(el, {
            width: 120,
            height: 160,
            props: {
                weather_entity: 'weather.home',
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 2,
                layout: 'vertical',
                temp_unit: 'C',
                precision: 0
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.style.flexDirection).toBe('column');
        expect(el.children).toHaveLength(2);
        expect(el.textContent).toContain('11:00');
        expect(el.textContent).toContain('12:00');
        expect(el.textContent).toContain('15°C');
        expect(el.textContent).toContain('12°C');
    });

    it('renders one-sided temperature placeholders when only part of a forecast is missing', () => {
        mockAppState.entityStates = {
            'sensor.weather_forecast_day_0_condition': { state: 'rainy' },
            'sensor.weather_forecast_day_0_low': { state: '9.5' },
            'sensor.weather_forecast_day_1_condition': { state: 'cloudy' },
            'sensor.weather_forecast_day_1_high': { state: '17.2' }
        };

        const el = document.createElement('div');
        render(el, {
            width: 260,
            height: 90,
            props: {
                days: 2,
                temp_unit: 'C',
                precision: 1
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.children[0].textContent).toContain('--/9.5°C');
        expect(el.children[1].textContent).toContain('17.2°C/--');
    });

    it('shows explicit unknown placeholders when live forecast values are unavailable', () => {
        mockAppState.entityStates = {
            'sensor.weather_forecast_day_2_condition': { state: 'unknown' },
            'sensor.weather_forecast_day_2_high': { state: 'unknown' },
            'sensor.weather_forecast_day_2_low': { state: 'unknown' }
        };

        const el = document.createElement('div');
        render(el, {
            width: 220,
            height: 90,
            props: {
                days: 1,
                start_offset: 2,
                temp_unit: 'C',
                precision: 1
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        const firstDay = /** @type {HTMLDivElement} */ (el.firstElementChild);
        expect(firstDay.textContent).not.toContain('Today');
        expect(firstDay.textContent).toContain('--/--');
        expect(firstDay.children[1].innerText.codePointAt(0)).toBe(0xf0625);
        expect(el.style.border).toBe('');
    });

    it('wires the weight selects and clamps weights when the font family changes (#488)', () => {
        const handlers = {};
        const panel = {
            createSection: vi.fn(),
            endSection: vi.fn(),
            addHint: vi.fn(),
            addDropShadowButton: vi.fn(),
            getContainer: () => document.body,
            addSelect: (label, _current, _options, cb) => { if (cb) handlers[label] = cb; },
            addLabeledInput: (label, _type, _value, cb) => { if (cb) handlers[label] = cb; },
            addCheckbox: vi.fn(),
            addNumberWithSlider: vi.fn(),
            addColorSelector: vi.fn(),
            addLabeledInputWithPicker: vi.fn()
        };

        const widget = {
            id: 'wf_props_weights',
            props: {
                forecast_mode: 'daily',
                font_family: 'Roboto',
                font_weight_day: 500,
                font_weight_temp: 600,
                days: 3
            }
        };
        renderProperties(panel, widget);

        handlers['Font Family']('Merriweather');
        let saved = mockAppState.updateWidget.mock.calls.at(-1)[1].props;
        expect(saved.font_family).toBe('Merriweather');
        // 500 is not a Merriweather weight -> clamped to the nearest valid 400.
        expect(saved.font_weight_day).toBe(400);
        expect(saved.font_weight_temp).toBe(700);

        mockAppState.updateWidget.mockClear();
        handlers['Day Name Weight']('900');
        saved = mockAppState.updateWidget.mock.calls.at(-1)[1].props;
        expect(saved.font_weight_day).toBe(900);

        mockAppState.updateWidget.mockClear();
        handlers['Temp Text Weight']('300');
        saved = mockAppState.updateWidget.mock.calls.at(-1)[1].props;
        expect(saved.font_weight_temp).toBe(300);

        const custom = { id: 'wf_props_custom', props: { forecast_mode: 'daily', font_family: 'Custom...', custom_font_family: 'MyFont' } };
        renderProperties(panel, custom);
        handlers['Custom Font Name']('MyFont2');
        saved = mockAppState.updateWidget.mock.calls.at(-1)[1].props;
        expect(saved.font_family).toBe('MyFont2');
        expect(saved.custom_font_family).toBe('MyFont2');
        expect(saved.font_weight_day).toBe(700);
        expect(saved.font_weight_temp).toBe(400);
    });
});
