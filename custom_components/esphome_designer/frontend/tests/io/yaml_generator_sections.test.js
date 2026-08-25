import { describe, expect, it } from 'vitest';

import {
    generateFirmwareGuardGlobals,
    generateInstructionHeader,
    generateStayAwakeSection,
    generateSystemSections,
    getStayAwakeEntityId
} from '../../js/io/adapters/yaml_generator_sections.js';

describe('yaml_generator_sections', () => {
    it('normalizes stay-awake ids and builds esp8266 guidance without icon copy steps', () => {
        const lines = generateInstructionHeader({
            id: 'demo8266',
            name: 'Demo 8266',
            chip: 'esp8266',
            features: { lcd: true, psram: true }
        }, {
            orientation: 'portrait',
            darkMode: true,
            refreshInterval: 30,
            manualRefreshOnly: true,
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: true,
            deepSleepStayAwakeEntityId: '  input_boolean.panel_awake  ',
            deepSleepFirmwareGuard: false
        }, false).join('\n');

        expect(getStayAwakeEntityId({
            deepSleepStayAwakeEntityId: '  input_boolean.panel_awake  '
        })).toBe('input_boolean.panel_awake');
        expect(lines).not.toContain('Material Design Icons');
        expect(lines).toContain('Select: ESP8266');
        expect(lines).toContain('Framework: Arduino (Default)');
        expect(lines).toContain('Power Strategy: Manual Refresh Only');
        expect(lines).toContain('Deep Sleep Stay Awake Entity: input_boolean.panel_awake');
        expect(lines).toContain('Layout Signature:');
        expect(lines).toContain('Layout Summary: mode=direct pages=0 widgets=0');
        expect(lines).toContain('Boot Log Hint: Compare the runtime build signature with this header to spot OTA rollbacks.');
    });

    it('generates commented coreink system sections and un-commented deep sleep for epaper layouts', () => {
        const lines = generateSystemSections({
            name: 'CoreInk',
            chip: 'esp32-s3',
            board: 'm5stack-coreink',
            features: { epaper: true }
        }, {
            plugin_includes: ['custom/include.h'],
            autoCycleEnabled: true,
            deepSleepEnabled: true,
            deepSleepInterval: 300
        }).join('\n');

        expect(lines).toContain('#   includes:');
        expect(lines).toContain('#     - custom/include.h');
        expect(lines).toContain('gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);');
        expect(lines).toContain('#       - script.execute: auto_cycle_timer');
        expect(lines).toContain('deep_sleep:');
        expect(lines).toContain('sleep_duration: 300s');
    });

    it('builds stay-awake and firmware-guard globals only when the deep sleep features are enabled', () => {
        const stayAwake = generateStayAwakeSection({
            deepSleepEnabled: true,
            deepSleepStayAwakeSwitch: true,
            deepSleepStayAwakeEntityId: 'input_boolean.keep_awake',
            deepSleepFirmwareGuard: true
        }).join('\n');
        const globals = generateFirmwareGuardGlobals({
            deepSleepEnabled: true,
            deepSleepFirmwareGuard: true
        }).join('\n');

        expect(stayAwake).toContain('entity_id: input_boolean.keep_awake');
        expect(stayAwake).toContain('deep_sleep.prevent: deep_sleep_control');
        expect(stayAwake).toContain('return id(is_new_flash);');
        expect(globals).toContain('id: firmware_fingerprint');
        expect(globals).toContain("initial_value: 'false'");
        expect(generateStayAwakeSection({
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: true
        })).toEqual([]);
        expect(generateFirmwareGuardGlobals({
            deepSleepEnabled: true,
            deepSleepFirmwareGuard: false
        })).toEqual([]);
    });

    it('documents ESP32-P4 setup guidance and emits the required variant block', () => {
        const header = generateInstructionHeader({
            id: 'waveshare_p4',
            name: 'Waveshare P4',
            chip: 'esp32-p4',
            features: { lcd: true, psram: true }
        }, {
            orientation: 'landscape',
            darkMode: false,
            refreshInterval: 60,
            manualRefreshOnly: false,
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: false,
            deepSleepFirmwareGuard: false
        }).join('\n');
        const system = generateSystemSections({
            chip: 'esp32-p4',
            features: { lcd: true }
        }, {}).join('\n');

        expect(header).toContain('Select: ESP32-P4');
        expect(header).toContain('Framework: ESP-IDF (Required)');
        expect(system).toContain('#   board: esp32-p4-evboard');
        expect(system).toContain('#   variant: esp32p4');
        expect(system).toContain('#     advanced:');
        expect(system).toContain('#       enable_idf_experimental_features: true');
    });

    it('generates RP2 setup guidance and omits unsupported deep-sleep config', () => {
        const profile = {
            chip: 'rp2350',
            board: 'rpipico2w',
            supportsDeepSleep: false,
            features: { epaper: true }
        };
        const layout = { deepSleepEnabled: true };
        const header = generateInstructionHeader(profile, layout).join('\n');
        const system = generateSystemSections(profile, layout).join('\n');

        expect(header).toContain('Select: Raspberry Pi Pico 2 W');
        expect(header).toContain('System sections (esphome, rp2) are auto-commented');
        expect(header).toContain('Deep Sleep is unavailable on this hardware platform.');
        expect(system).toContain('# rp2:');
        expect(system).toContain('#   board: rpipico2w');
        expect(system).not.toContain('# esp32:');
        expect(system).not.toContain('\ndeep_sleep:');
    });

    it('warns about USB conflict and suggests UART0 when GPIO19/20 are in use', () => {
        const header = generateInstructionHeader({
            id: 'reterminal_e1001',
            name: 'reTerminal E1001',
            chip: 'esp32-s3',
            pins: {
                i2c: { sda: 'GPIO19', scl: 'GPIO20' }
            },
            features: { epaper: true }
        }, {
            orientation: 'landscape',
            darkMode: false,
            refreshInterval: 60,
            manualRefreshOnly: false,
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: false,
            deepSleepFirmwareGuard: false
        }).join('\n');

        const system = generateSystemSections({
            chip: 'esp32-s3',
            pins: {
                i2c: { sda: 'GPIO19', scl: 'GPIO20' }
            }
        }, {}).join('\n');

        expect(header).toContain('WARNING: GPIO19/GPIO20 are used by this device\'s hardware');
        expect(header).toContain('Do NOT enable USB_CDC logging');
        expect(header).not.toContain('#      hardware_uart: USB_CDC');

        expect(system).toContain('NOTE: GPIO19/20 in use. USB_CDC logging disabled to prevent conflicts');
        expect(system).toContain('hardware_uart: UART0 # Use UART0 instead of USB_CDC');
        expect(system).not.toContain('hardware_uart: USB_CDC # Enable for USB debugging on S3');
    });

    it('no longer boots PhotoPainter with a blank display refresh (#487)', () => {
        const system = generateSystemSections({
            id: 'esp32_s3_photopainter',
            chip: 'esp32-s3',
            features: { epaper: true }
        }, {}).join('\n');

        expect(system).toContain('AXP2101 Configured');
        expect(system).not.toContain('#       - delay: 200ms\n#       - component.update: epaper_display');
    });
});
