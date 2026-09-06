/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { renderOnDeviceTemperature } from '../../features/ondevice_temperature/render.js';
import { renderOnDeviceHumidity } from '../../features/ondevice_humidity/render.js';
import temperaturePlugin from '../../features/ondevice_temperature/plugin.js';
import humidityPlugin from '../../features/ondevice_humidity/plugin.js';
import { FontRegistry } from '../../js/io/adapters/font_registry.js';
import { buildBasicWidgetProps } from '../../js/io/yaml_parsers/widget_props_map_basic.js';
import { load } from 'js-yaml';

describe('ondevice sensor plugins', () => {
    const fahrenheitUnit = temperaturePlugin.schema
        .flatMap((section) => section.fields || [])
        .find((field) => field.key === 'unit')
        ?.options?.[1] || '°F';

    beforeEach(() => {
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders external temperature and humidity previews across hot and humid thresholds', () => {
        mockAppState.entityStates = {
            'sensor.temp_hot': { state: '31' },
            'sensor.humid_room': { state: '72' }
        };

        const tempEl = document.createElement('div');
        renderOnDeviceTemperature(tempEl, {
            height: 70,
            entity_id: 'sensor.temp_hot',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                show_label: false,
                unit: fahrenheitUnit,
                precision: 1
            }
        }, {
            getColorStyle: (value) => value
        });

        const humidityEl = document.createElement('div');
        renderOnDeviceHumidity(humidityEl, {
            height: 70,
            entity_id: 'sensor.humid_room',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                show_label: false,
                precision: 0
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(tempEl.textContent).toMatch(/87\.8.*F/);
        expect(tempEl.children).toHaveLength(2);
        expect(humidityEl.textContent).toContain('72%');
        expect(humidityEl.children).toHaveLength(2);
    });

    it('exports OpenDisplay, OEPL, and LVGL payloads for supported ondevice sensors', () => {
        const tempOpenDisplay = temperaturePlugin.exportOpenDisplay({
            x: 4,
            y: 6,
            width: 40,
            height: 40,
            entity_id: 'sensor.temp_hot',
            props: {
                color: 'theme_auto',
                size: 18,
                font_size: 10,
                unit: fahrenheitUnit
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(tempOpenDisplay[0]).toMatchObject({
            type: 'icon',
            fill: 'white'
        });
        expect(tempOpenDisplay[1].value).toContain("states('sensor.temp_hot')");

        const humidityOepl = humidityPlugin.exportOEPL({
            x: 4,
            y: 6,
            width: 40,
            height: 40,
            entity_id: 'sensor.humid_room',
            props: {
                color: 'blue',
                size: 18,
                font_size: 10,
                unit: '%'
            }
        }, {
            _layout: {},
            _page: {}
        });
        expect(humidityOepl[0].value).toContain("states('sensor.humid_room')");
        expect(humidityOepl[1]).toMatchObject({
            type: 'text',
            color: 'blue',
            align: 'center'
        });

        const tempLvgl = temperaturePlugin.exportLVGL({
            id: 'temp_widget',
            entity_id: 'sensor.temp_hot',
            props: {
                is_local_sensor: false,
                unit: fahrenheitUnit,
                show_label: false
            }
        }, {
            common: { id: 'temp_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: { sht4x: true } }
        });

        expect(JSON.stringify(tempLvgl)).toContain('(id(sensor_temp_hot).state * 9.0 / 5.0) + 32.0');
        expect(tempLvgl.obj.widgets).toHaveLength(2);
        expect(tempLvgl.obj.widgets[0].label.id).toBe('temp_widget_icon');
        expect(tempLvgl.obj.widgets[1].label.id).toBe('temp_widget_text');

        const humidityLvgl = humidityPlugin.exportLVGL({
            id: 'hum_widget',
            entity_id: '',
            props: {
                is_local_sensor: false,
                show_label: true
            }
        }, {
            common: { id: 'hum_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: {} }
        });
        expect(humidityLvgl.obj.widgets[1].label.text).toContain('--%');
        expect(humidityLvgl.obj.widgets[2].label.text).toBe('"Humidity"');
        expect(humidityLvgl.obj.widgets[0].label.id).toBe('hum_widget_icon');
        expect(humidityLvgl.obj.widgets[1].label.id).toBe('hum_widget_text');
    });

    it('collects fonts/icons and exports direct sensor code for fallback and external paths', () => {
        const addFont = vi.fn((family, _weight, size) => `${family}_${size}`);
        const trackIcon = vi.fn();

        temperaturePlugin.collectRequirements({
            props: {
                size: 24,
                font_size: 14,
                label_font_size: 9,
                show_label: true
            }
        }, { addFont, trackIcon });
        humidityPlugin.collectRequirements({
            props: {
                size: 26,
                font_size: 13,
                label_font_size: 8,
                show_label: false
            }
        }, { addFont, trackIcon });

        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 24);
        expect(addFont).toHaveBeenCalledWith('Roboto', 400, 14);
        expect(trackIcon).toHaveBeenCalledTimes(6);

        const tempLines = [];
        temperaturePlugin.export({
            id: 'temp_direct',
            x: 0,
            y: 0,
            width: 80,
            height: 60,
            entity_id: '',
            props: {
                is_local_sensor: true,
                size: 20,
                font_size: 12,
                label_font_size: 8,
                unit: fahrenheitUnit,
                show_label: true
            }
        }, {
            lines: tempLines,
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => null,
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: { features: { sht3x: true } }
        });
        expect(tempLines.join('\n')).toContain('(id(sht3x_temperature).state * 9.0 / 5.0) + 32.0');
        expect(tempLines.join('\n')).toContain('"Temperature"');

        const humidityLines = [];
        humidityPlugin.export({
            id: 'humidity_direct',
            x: 0,
            y: 0,
            width: 70,
            height: 50,
            entity_id: '',
            props: {
                is_local_sensor: true,
                show_label: false,
                unit: '%'
            }
        }, {
            lines: humidityLines,
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => null,
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: { features: {} }
        });
        expect(humidityLines.join('\n')).toContain('"--%"');
        expect(humidityLines.join('\n')).toContain('\\U000F058E');
    });

    it('exports external and local numeric sensor blocks with platform-specific addresses', () => {
        const tempContext = {
            lines: [],
            widgets: [
                {
                    id: 'temp_ext',
                    type: 'ondevice_temperature',
                    entity_id: 'garage_temp',
                    props: {
                        is_local_sensor: false
                    }
                },
                {
                    id: 'temp_local',
                    type: 'ondevice_temperature',
                    props: {
                        is_local_sensor: true
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: { sht3x: true } },
            mainLines: []
        };
        temperaturePlugin.onExportNumericSensors(tempContext);
        const tempOutput = tempContext.lines.join('\n');
        expect(tempOutput).toContain('# External Temperature Sensors');
        expect(tempOutput).toContain('entity_id: sensor.garage_temp');
        expect(tempOutput).toContain('- platform: sht3xd');
        expect(tempOutput).toContain('id: sht3x_temperature');
        expect(tempOutput).toContain('address: 0x44');
        expect(Array.from(tempContext.pendingTriggers.get('sensor.garage_temp') || [])).toEqual([
            '- lvgl.widget.refresh: temp_ext_icon',
            '- lvgl.widget.refresh: temp_ext_text'
        ]);

        const humidityContext = {
            lines: [],
            widgets: [
                {
                    id: 'hum_ext',
                    type: 'ondevice_humidity',
                    entity_id: 'basement_humidity',
                    props: {
                        is_local_sensor: false
                    }
                },
                {
                    id: 'hum_local',
                    type: 'ondevice_humidity',
                    props: {
                        is_local_sensor: true
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: { sht3x: true } },
            mainLines: []
        };
        humidityPlugin.onExportNumericSensors(humidityContext);
        const humidityOutput = humidityContext.lines.join('\n');
        expect(humidityOutput).toContain('# External Humidity Sensors');
        expect(humidityOutput).toContain('entity_id: sensor.basement_humidity');
        expect(humidityOutput).toContain('- platform: sht3xd');
        expect(humidityOutput).toContain('id: sht3x_humidity');
        expect(humidityOutput).toContain('address: 0x44');
        expect(Array.from(humidityContext.pendingTriggers.get('sensor.basement_humidity') || [])).toEqual([
            '- lvgl.widget.refresh: hum_ext_icon',
            '- lvgl.widget.refresh: hum_ext_text'
        ]);
    });
});

describe.each([
    [temperaturePlugin, renderOnDeviceTemperature],
    [humidityPlugin, renderOnDeviceHumidity]
])('ondevice sensor font selection: $0.id', (plugin, render) => {
    it.each(['sensor.external', ''])('uses the selected family for value and label, including sensor fallback (%s)', (entityId) => {
        const widget = {
            id: 'font_sensor', type: plugin.id, x: 0, y: 0, width: 80, height: 60,
            entity_id: entityId,
            props: { font_family: 'Inter', size: 24, font_size: 16, label_font_size: 10, show_label: true, is_local_sensor: false }
        };
        const registry = new FontRegistry();
        const addFont = registry.addFont.bind(registry);
        plugin.collectRequirements(widget, { addFont, trackIcon: registry.trackIcon.bind(registry) });
        const lines = [];
        plugin.export(widget, {
            lines, addFont, profile: { features: {} },
            getColorConst: (value) => value,
            getConditionCheck: () => null
        });
        expect(lines.join('\n')).toContain('id(font_inter_400_16)');
        expect(lines.join('\n')).toContain('id(font_inter_400_10)');
        expect(lines.join('\n')).toContain('id(font_material_design_icons_400_24)');
        expect(lines.join('\n')).not.toContain('font_roboto');

        const lvgl = plugin.exportLVGL(widget, {
            common: {}, profile: { features: {} }, convertColor: (value) => value,
            getLVGLFont: (family, size, weight) => addFont(family, weight, size)
        });
        expect(lvgl.obj.widgets[0].label.text_font).toBe('font_material_design_icons_400_24');
        expect(lvgl.obj.widgets[1].label.text_font).toBe('font_inter_400_16');
        expect(lvgl.obj.widgets[2].label.text_font).toBe('font_inter_400_10');

        const yaml = load(registry.getLines().join('\n'));
        const textFonts = yaml.font.filter((font) => typeof font.file === 'object');
        expect(textFonts.map((font) => font.file.family)).toEqual(['Inter', 'Inter']);
    });

    it('renders the chosen family on text while preserving the icon font', () => {
        const el = document.createElement('div');
        render(el, { height: 60, props: { font_family: 'Open Sans', show_label: true } }, {
            getColorStyle: (value) => value
        });
        expect(el.children[0].style.fontFamily).toContain('MDI');
        expect(el.children[1].style.fontFamily).toContain('Open Sans');
        expect(el.children[2].style.fontFamily).toBe(el.children[1].style.fontFamily);
    });

    it('retains the selected family when importing widget metadata', () => {
        const imported = buildBasicWidgetProps(plugin.id, { font_family: 'Open Sans' }, {});
        expect(imported.font_family).toBe('Open Sans');
        const el = document.createElement('div');
        render(el, { height: 60, props: imported }, { getColorStyle: (value) => value });
        expect(el.children[1].style.fontFamily).toContain('Open Sans');
    });

    it('keeps Roboto for layouts without a font-family property', () => {
        const widget = { id: 'legacy', props: { show_label: true, is_local_sensor: false } };
        const lvgl = plugin.exportLVGL(widget, {
            common: {}, profile: { features: {} }, convertColor: (value) => value,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`
        });
        expect(lvgl.obj.widgets[1].label.text_font).toBe('Roboto_16_400');
        expect(lvgl.obj.widgets[2].label.text_font).toBe('Roboto_10_400');
        const el = document.createElement('div');
        render(el, widget, { getColorStyle: (value) => value });
        expect(el.children[1].style.fontFamily).toContain('Roboto');
    });
});
