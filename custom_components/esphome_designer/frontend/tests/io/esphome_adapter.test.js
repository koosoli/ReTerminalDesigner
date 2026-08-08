import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { getCondProps } from '../../js/io/generators/native_generator.js';
import { mergeYamlSections } from '../../js/io/generators/yaml_merger.js';

const { mockRegistry, mockDeviceProfiles, mockHaFetch, mockGetHaHeaders, mockHasHaBackend, mockHaApiBase } = vi.hoisted(() => ({
    mockRegistry: {
        get: vi.fn(),
        getAll: vi.fn(() => []),
        load: vi.fn(async (type) => mockRegistry.get(type)),
        onExportGlobals: vi.fn(),
        onExportNumericSensors: vi.fn(),
        onExportTextSensors: vi.fn(),
        onExportBinarySensors: vi.fn(),
        onExportComponents: vi.fn(),
        onExportHelpers: vi.fn(),
        onExportEsphome: vi.fn()
    },
    mockDeviceProfiles: {},
    mockHaFetch: vi.fn(),
    mockGetHaHeaders: vi.fn(() => ({ Authorization: 'Bearer test-token' })),
    mockHasHaBackend: vi.fn(() => false),
    mockHaApiBase: vi.fn(() => null)
}));

// Top-level mocks for dependencies
vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn()
    }
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/core/state', () => ({
    AppState: {
        deviceModel: 'reterminal_e1001',
        getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 })),
        getCanvasShape: vi.fn(() => 'rect')
    }
}));

vi.mock('../../js/core/utils', () => ({
    Utils: {
        getIconCode: vi.fn((name) => 'F000'), // eslint-disable-line no-unused-vars
        getColorConst: vi.fn((c) => `Color(${c})`),
        getAlignX: vi.fn((a, x) => x),
        getAlignY: vi.fn((a, y) => y),
        addDitherMask: vi.fn()
    }
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: mockDeviceProfiles
}));

vi.mock('../../js/io/hardware_generators.js', () => ({
    generateI2CSection: vi.fn(() => []),
    generateSPISection: vi.fn(() => []),
    generateSensorSection: vi.fn(() => []),
    generateBinarySensorSection: vi.fn(() => []),
    generateButtonSection: vi.fn(() => []),
    generateDisplaySection: vi.fn(() => ["display:"]),
    generateExtraComponents: vi.fn(() => []),
    generateAXP2101Section: vi.fn(() => []),
    generateOutputSection: vi.fn(() => []),
    generateBacklightSection: vi.fn(() => []),
    generateRTTTLSection: vi.fn(() => []),
    generateAudioSection: vi.fn(() => [])
}));

vi.mock('../../js/io/ha_api.js', () => ({
    haFetch: mockHaFetch,
    getHaHeaders: mockGetHaHeaders
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: mockHasHaBackend,
    get HA_API_BASE() {
        return mockHaApiBase();
    }
}));

vi.mock('../../js/io/adapters/base_adapter.js', () => ({
    BaseAdapter: class {
        constructor() { }
        async generate() { return ""; }
        generatePage() { return []; }
        generateWidget() { return []; }
        async preProcessWidgets() { return; }
        sanitize(s) { return s; }
    }
}));

vi.mock('../../js/core/constants', () => ({
    COLORS: {},
    ALIGNMENT: {}
}));

const mockAppState = {
    deviceModel: 'reterminal_e1001',
    getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 })),
    getCanvasShape: vi.fn(() => 'rect')
};

import textPlugin from '../../features/text/plugin.js';
import iconPlugin from '../../features/icon/plugin.js';
import touchAreaPlugin from '../../features/touch_area/plugin.js';
import sensorTextPlugin from '../../features/sensor_text/plugin.js';

describe('ESPHomeAdapter', () => {
    let adapter;

    beforeEach(() => {
        adapter = new ESPHomeAdapter();
        mockHaFetch.mockReset();
        mockGetHaHeaders.mockClear();
        mockHasHaBackend.mockReturnValue(false);
        mockHaApiBase.mockReturnValue(null);
        // Use real plugins for rendering in tests
        mockRegistry.get.mockImplementation((type) => {
            if (type === 'text') return textPlugin;
            if (type === 'icon') return iconPlugin;
            if (type === 'button' || type === 'touch_area') return touchAreaPlugin;
            if (type === 'sensor_text') return sensorTextPlugin;
            return null;
        });

        global.AppState = mockAppState;
        window.LVGLExport = {
            generateLVGLSnippet: vi.fn(() => []),
            serializeWidget: vi.fn(() => '')
        };
        Object.keys(mockDeviceProfiles).forEach(key => delete mockDeviceProfiles[key]);
        Object.assign(mockDeviceProfiles, {
            'reterminal_e1001': {
                name: 'Test Device',
                features: {},
                pins: {},
                battery: {
                    attenuation: '12db',
                    multiplier: 2.0
                }
            }
        });
    });

    it('should be instantiable', () => {
        expect(adapter).toBeDefined();
    });

    it('resolves bundled hardware packages through the authenticated HA package endpoint whenever HA is available', async () => {
        mockHaFetch.mockResolvedValue({
            ok: true,
            text: vi.fn().mockResolvedValue('package: test')
        });
        mockHasHaBackend.mockReturnValue(true);
        mockHaApiBase.mockReturnValue('/api/esphome_designer');
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: { pathname: '/' }
        });

        const result = await adapter.fetchHardwarePackage('hardware/demo.yaml');

        expect(result).toBe('package: test');
        expect(mockHaFetch).toHaveBeenCalledWith(
            '/api/esphome_designer/hardware/package?path=hardware%2Fdemo.yaml',
            {
                cache: 'no-store',
                headers: { Authorization: 'Bearer test-token' }
            }
        );
    });

    it('uses the authenticated HA fetch when HA_API_BASE is an absolute URL', async () => {
        mockHaFetch.mockResolvedValue({
            ok: true,
            text: vi.fn().mockResolvedValue('package: test')
        });
        mockHasHaBackend.mockReturnValue(true);
        mockHaApiBase.mockReturnValue('https://ha.example/api/esphome_designer');
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: { pathname: '/' }
        });

        const result = await adapter.fetchHardwarePackage('hardware/demo.yaml');

        expect(result).toBe('package: test');
        expect(mockHaFetch).toHaveBeenCalledWith(
            'https://ha.example/api/esphome_designer/hardware/package?path=hardware%2Fdemo.yaml',
            {
                cache: 'no-store',
                headers: { Authorization: 'Bearer test-token' }
            }
        );
    });

    it('returns an inline error snippet when hardware package fetch fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: { pathname: '/' }
        });

        const result = await adapter.fetchHardwarePackage('https://example.com/pkg.yaml');

        expect(result).toContain('# ERROR LOADING PROFILE: boom');
    });

    it('falls back to bundled GeekMagic hardware when the HA package endpoint returns 404', async () => {
        mockHaFetch.mockResolvedValue({ ok: false, status: 404 });
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: { pathname: '/esphome-designer/editor' }
        });

        const result = await adapter.fetchHardwarePackage('hardware/geekmagic-mini-esp8266.yaml');

        expect(result).toContain('TARGET DEVICE: GeekMagic Mini');
        expect(result).not.toContain('# ERROR LOADING PROFILE');
    });

    // Fix #218: Test that mergeYamlSections correctly merges duplicate sections
    describe('mergeYamlSections', () => {
        it('should merge duplicate sensor sections', () => {
            const baseYaml = `# Hardware Recipe
sensor:
  - platform: adc
    pin: GPIO34
    name: "board_ldr"
    update_interval: 1500ms

display:
  - platform: ili9xxx
    model: ILI9342`;

            const extraYaml = `sensor:
  - platform: homeassistant
    id: sensor_temp
    entity_id: sensor.temperature
    internal: true
  - platform: wifi_signal
    name: "WiFi Signal"
    id: wifi_signal_dbm`;

            const result = mergeYamlSections(baseYaml, extraYaml);

            // Should have only ONE sensor: section
            const sensorMatches = result.match(/^sensor:$/gm);
            expect(sensorMatches).toHaveLength(1);

            // Should contain all sensors
            expect(result).toContain('platform: adc');
            expect(result).toContain('board_ldr');
            expect(result).toContain('platform: homeassistant');
            expect(result).toContain('sensor_temp');
            expect(result).toContain('platform: wifi_signal');
            expect(result).toContain('WiFi Signal');
        });

        it('should handle empty extra yaml', () => {
            const baseYaml = `sensor:
  - platform: adc
    pin: GPIO34`;

            const result = mergeYamlSections(baseYaml, '');
            expect(result).toBe(baseYaml);
        });

        it('should handle empty base yaml', () => {
            const extraYaml = `sensor:
  - platform: homeassistant
    id: test`;

            const result = mergeYamlSections('', extraYaml);
            expect(result).toBe(extraYaml);
        });

        it('should merge multiple different section types', () => {
            const baseYaml = `sensor:
  - platform: adc
    pin: GPIO34
font:
  - file: fonts/test.ttf
    id: font_base`;

            const extraYaml = `sensor:
  - platform: homeassistant
    id: extra_sensor
font:
  - file: fonts/roboto.ttf
    id: font_extra`;

            const result = mergeYamlSections(baseYaml, extraYaml);

            // Should have only ONE of each section
            expect(result.match(/^sensor:$/gm)).toHaveLength(1);
            expect(result.match(/^font:$/gm)).toHaveLength(1);

            // Should contain all entries
            expect(result).toContain('platform: adc');
            expect(result).toContain('platform: homeassistant');
            expect(result).toContain('font_base');
            expect(result).toContain('font_extra');
        });

        it('coalesces repeated mergeable sections that reappear later in extra yaml', () => {
            const baseYaml = `display:
  - platform: ili9xxx
    id: panel`;

            const extraYaml = `sensor:
  - platform: homeassistant
    id: sensor_one
    entity_id: sensor.one
text_sensor:
  - platform: homeassistant
    id: text_one
    entity_id: text.one
lvgl:
  pages: []
sensor:
  - platform: homeassistant
    id: sensor_two
    entity_id: sensor.two
text_sensor:
  - platform: homeassistant
    id: text_two
    entity_id: text.two`;

            const result = mergeYamlSections(baseYaml, extraYaml);

            expect(result.match(/^sensor:$/gm)).toHaveLength(1);
            expect(result.match(/^text_sensor:$/gm)).toHaveLength(1);
            expect(result).toContain('id: sensor_one');
            expect(result).toContain('id: sensor_two');
            expect(result).toContain('id: text_one');
            expect(result).toContain('id: text_two');
            expect(result).toContain('lvgl:');
        });
    });

    it('should generate a basic YAML structure for a page', async () => {
        const projectState = {
            pages: [
                {
                    name: "Main",
                    widgets: [
                        { id: "w1", type: "text", props: { text: "Hello" }, x: 10, y: 10, width: 100, height: 30 }
                    ]
                }
            ],
            deviceName: "Test Device"
        };

        const yaml = await adapter.generate(projectState);
        expect(yaml).toContain('Test Device');
        expect(yaml).toContain('Hello');
        expect(yaml).toContain('id:w1'); // Metadata tag
    });

    it('should handle empty pages correctly', async () => {
        const projectState = {
            pages: [{ name: "Empty", widgets: [] }],
            deviceName: "Empty Device"
        };
        const yaml = await adapter.generate(projectState);
        expect(yaml).toContain('Test Device'); // From profile name
        expect(yaml).toContain('// page:name "Empty"');
    });

    it('uses package profile display and touchscreen ids in generated LVGL blocks', async () => {
        Object.assign(mockDeviceProfiles, {
            guition_esp32_p4_jc4880p443: {
                name: 'Guition JC4880P443 4.3" 480x800',
                features: { lcd: true, lvgl: true, touch: true },
                displayId: 'main_display',
                touchscreenId: 'device_touchscreen',
                touch: { platform: 'gt911', id: 'device_touchscreen' },
                isPackageBased: true,
                hardwarePackage: 'hardware/guition-esp32-p4-jc4880p443.yaml'
            }
        });
        mockHaFetch.mockResolvedValue({
            ok: true,
            text: vi.fn().mockResolvedValue(`display:
  - platform: mipi_dsi
    id: main_display
    model: JC4880P443
    # __LAMBDA_PLACEHOLDER__
touchscreen:
  - platform: gt911
    id: device_touchscreen`)
        });
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: { pathname: '/esphome-designer/editor' }
        });

        const yaml = await adapter.generate({
            deviceModel: 'guition_esp32_p4_jc4880p443',
            renderingMode: 'lvgl',
            pages: [{ name: 'Main', widgets: [] }]
        });

        expect(yaml).toContain('id: main_display');
        expect(yaml).toContain('id: device_touchscreen');
        expect(yaml).toContain('  displays:\n    - main_display');
        expect(yaml).toContain('  touchscreens:\n    - touchscreen_id: device_touchscreen');
        expect(yaml).not.toContain('    - my_display');
        expect(yaml).not.toContain('    - my_touchscreen');
    });

    it('should generate correct condition properties for state comparison', () => {
        const widget = {
            condition_entity: 'switch.test',
            condition_operator: '==',
            condition_value: 'on',
            condition_invert: false
        };
        // getCondProps returns a space-separated string, we can split it or check inclusion
        const propsStr = getCondProps(widget);
        expect(propsStr).toContain('cond_ent:"switch.test"');
        expect(propsStr).toContain('cond_op:"=="');
        expect(propsStr).toContain('cond_val:"on"');
        expect(propsStr).toContain('cond_inv:"false"');
        expect(propsStr).not.toContain('cond_ent_2');
    });

    it('should generate correct condition properties for entity comparison', () => {
        const widget = {
            condition_entity: 'sensor.temp',
            condition_operator: '>',
            condition_entity_2: 'sensor.target',
            condition_invert: true
        };
        const propsStr = getCondProps(widget);
        expect(propsStr).toContain('cond_ent:"sensor.temp"');
        expect(propsStr).toContain('cond_op:">"');
        expect(propsStr).toContain('cond_ent_2:"sensor.target"');
        expect(propsStr).toContain('cond_inv:"true"');
        expect(propsStr).not.toContain('cond_val');
    });

    describe('End-to-End Golden Master Replacement (Structural Assertions)', () => {
        it('generates correct structure for multi-page native layout', async () => {
            const projectState = {
                deviceName: "Native Device",
                deviceModel: "reterminal_e1001",
                pages: [
                    {
                        name: "Home",
                        widgets: [
                            { id: "txt1", type: "text", props: { text: "Dashboard" }, x: 0, y: 0, width: 200, height: 40 },
                            { id: "icon1", type: "icon", props: { icon: "mdi:home" }, x: 10, y: 50, width: 32, height: 32 }
                        ]
                    },
                    {
                        name: "Lights",
                        widgets: [
                            { id: "btn1", type: "button", entity_id: "light.living_room", x: 20, y: 20, width: 100, height: 100 }
                        ]
                    }
                ]
            };

            const yaml = await adapter.generate(projectState);

            // Core infrastructure
            expect(yaml).toContain('globals:');
            expect(yaml).toContain('id: display_page');
            expect(yaml).toContain('id: last_page_switch_time');
            expect(yaml).toContain('id: initial_sensor_sync_pending');
            expect(yaml).not.toContain('id: last_touch_time');

            // Page switching and navigation
            expect(yaml).toContain('script:');
            expect(yaml).toContain('id: change_page_to');
            expect(yaml).toContain('id: manage_run_and_sleep');

            // Fonts and Time
            expect(yaml).toContain('font:');
            expect(yaml).toContain('font_roboto');
            expect(yaml).toContain('time:');
            expect(yaml).toContain('ha_time');

            // Entity registration
            expect(yaml).toContain('switch:');
            expect(yaml).toContain('light_living_room'); // Expected sanitized ID

            // Display & Lambda correctness
            expect(yaml).toContain('display:');
            expect(yaml).toContain('lambda: |-');
            expect(yaml).toContain('page:name "Home"');
            expect(yaml).toContain('page:name "Lights"');

            // Widget metadata
            expect(yaml).toMatch(/id:txt1/);
            expect(yaml).toMatch(/id:icon1/);
            expect(yaml).toContain('"Dashboard"');

            // Sanitization checks
            expect(yaml).not.toContain('undefined');
            expect(yaml).not.toContain('NaN');
            expect(yaml).not.toContain('[object Object]');
        });

        it('omits page-switch debounce globals for single-page layouts', async () => {
            const projectState = {
                deviceName: 'Single Page Device',
                deviceModel: 'reterminal_e1001',
                pages: [
                    {
                        name: 'Home',
                        widgets: [
                            { id: 'txt1', type: 'text', props: { text: 'Dashboard' }, x: 0, y: 0, width: 200, height: 40 }
                        ]
                    }
                ]
            };

            const yaml = await adapter.generate(projectState);

            expect(yaml).toContain('id: display_page');
            expect(yaml).toContain('id: page_refresh_current_s');
            expect(yaml).toContain('id: initial_sensor_sync_pending');
            expect(yaml).not.toContain('id: last_touch_time');
            expect(yaml).not.toContain('id: last_page_switch_time');
            expect(yaml).not.toContain('id: change_page_to');
            expect(yaml).not.toContain('id(last_page_switch_time)');
        });

        it('emits last_touch_time only when touch debounce widgets are present', async () => {
            const projectState = {
                deviceName: 'Touch Device',
                deviceModel: 'reterminal_e1001',
                pages: [
                    {
                        name: 'Home',
                        widgets: [
                            {
                                id: 'touch1',
                                type: 'touch_area',
                                x: 10,
                                y: 10,
                                width: 40,
                                height: 40,
                                props: {
                                    nav_action: 'reload_page'
                                }
                            }
                        ]
                    }
                ]
            };

            const yaml = await adapter.generate(projectState);

            expect(yaml).toContain('id: last_touch_time');
        });

        it('handles entity deduplication arrays and attributes correctly', async () => {
            const projectState = {
                deviceName: "Dense Dedup Tester",
                deviceModel: "reterminal_e1001",
                pages: [
                    {
                        name: "Sensors",
                        widgets: [
                            { id: "w1", type: "sensor_text", entity_id: "sensor.temperature", x: 0, y: 0, width: 50, height: 20 },
                            { id: "w2", type: "sensor_text", entity_id: "sensor.temperature", props: { attribute: "calibration" }, x: 60, y: 0, width: 50, height: 20 },
                            { id: "w3", type: "text", entity_id: "weather.home", props: { attribute: "temperature" }, x: 0, y: 30, width: 100, height: 30 },
                            { id: "w4", type: "icon", condition_entity: "binary_sensor.door", condition_state: "off", x: 0, y: 70, width: 40, height: 40 },
                            { id: "w5", type: "icon", condition_entity: "sensor.state", condition_state: "Playing", x: 50, y: 70, width: 40, height: 40 },
                            { id: "w6", type: "text", entity_id: "sensor.weather", props: { attribute: "forecast[0].condition" }, x: 0, y: 120, width: 150, height: 30 }
                        ]
                    }
                ]
            };

            // Mock state so entity_dedup recognizes the types
            global.AppState.entityStates = {
                "sensor.temperature": { state: "20", attributes: { calibration: "2" } },
                "weather.home": { state: "sunny", attributes: { temperature: "25" } },
                "sensor.state": { state: "Playing" },
                "sensor.weather": { state: "clear", attributes: { forecast: [{ condition: "cloudy" }] } }
            };

            const yaml = await adapter.generate(projectState);

            // Verify dedup logic creates correct sensor types
            expect(yaml).toContain('id: sensor_temperature');
            expect(yaml).toContain('id: sensor_temperature_calibration');
            expect(yaml).toContain('attribute: calibration');

            // Text sensors
            expect(yaml).toContain('text_sensor:');
            expect(yaml).toContain('id: weather_home_temperature_txt');
            expect(yaml).toContain('id: sensor_state_txt');

            // Binary sensors
            expect(yaml).toContain('id: binary_sensor_door');

            // Deep attributes
            expect(yaml).toContain('id: sensor_weather_forecast_0__condition');
            expect(yaml).toContain('attribute: forecast[0].condition');

            // Ensure sections only appear once
            const sensorMatches = yaml.match(/^sensor:$/gm);
            expect(sensorMatches).toHaveLength(1);

            const textSensorMatches = yaml.match(/^text_sensor:$/gm);
            expect(textSensorMatches).toHaveLength(1);

            const binarySensorMatches = yaml.match(/^binary_sensor:$/gm);
            expect(binarySensorMatches).toHaveLength(1);
        });

        it('generates global mqtt block if any entity uses mqtt: prefix', async () => {
            const projectState = {
                deviceName: "MQTT Device",
                deviceModel: "reterminal_e1001",
                pages: [
                    {
                        name: "Home",
                        widgets: [
                            { id: "txt1", type: "text", entity_id: "mqtt:home/test", x: 0, y: 0, width: 200, height: 40 }
                        ]
                    }
                ]
            };
            const yaml = await adapter.generate(projectState);
            expect(yaml).toContain('mqtt:');
            expect(yaml).toContain('broker: !secret mqtt_broker');
            expect(yaml).toContain('mqtt_home_test');
            expect(yaml).toContain('topic: "home/test"');
        });
    });
});
