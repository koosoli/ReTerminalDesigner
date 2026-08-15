import { describe, expect, it, vi } from 'vitest';

import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';
import { resolveAdapterProfile } from '../../js/io/adapters/esphome_adapter_profile.js';
import { generateBinarySensorSection, generateOutputSection, generatePSRAMSection } from '../../js/io/hardware_generators.js';

const fetchDynamicHardwareProfilesMock = vi.fn(async () => []);
const getOfflineProfilesFromStorageMock = vi.fn(() => ({}));
const emitMock = vi.fn();

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

vi.mock('../../js/io/hardware_profile_sources.js', () => ({
    fetchDynamicHardwareProfiles: fetchDynamicHardwareProfilesMock,
    getOfflineProfilesFromStorage: getOfflineProfilesFromStorageMock
}));

vi.mock('../../js/core/events.js', () => ({
    emit: emitMock,
    EVENTS: { DEVICE_PROFILES_UPDATED: 'device-profiles-updated' }
}));

describe('built-in device profiles', async () => {
    const devices = await import('../../js/io/devices.js');

    it('includes the Lilygo T5 4.7 profile as built-in but untested', () => {
        const profile = devices.DEVICE_PROFILES.lilygo_t5_47;

        expect(profile).toBeTruthy();
        expect(profile.name).toContain('Lilygo T5 4.7');
        expect(profile.displayPlatform).toBe('t547');
        expect(profile.resolution).toEqual({ width: 960, height: 540 });
        expect(profile.isUntestedProfile).toBe(true);
        expect(profile.external_components?.join('\n')).toContain('cjb0001/esphome-components');
        expect(profile.system_section_overrides?.esp32?.join('\n')).toContain('type: arduino');
    });

    it('preserves the built-in profile key as its resolved id', () => {
        const profile = resolveAdapterProfile('reterminal_e1001', {}, devices.DEVICE_PROFILES);

        expect(profile.id).toBe('reterminal_e1001');
    });

    it('uses the vendor E1001 model and configures E1003 battery and touch hardware without GPIO21 conflicts', () => {
        expect(devices.DEVICE_PROFILES.reterminal_e1001.displayModel).toBe('7.50inv2p');
        const e1003 = devices.DEVICE_PROFILES.reterminal_e1003;
        expect(e1003.pins.batteryEnable).toBe('GPIO40');
        expect(e1003.touch).toMatchObject({
            platform: 'gt911',
            i2c_id: 'bus_a',
            address: '0x5D',
            interrupt_pin: 'GPIO2',
            reset_pin: 'GPIO48'
        });
        expect(generateOutputSection(e1003).join('\n')).toContain('pin: GPIO40\n    id: bsp_battery_enable\n    restore_mode: ALWAYS_ON');
    });

    it('excludes untested built-ins from the tested profile id list', () => {
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('lilygo_t5_47');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('reterminal_e1001');
    });

    it('surfaces the corrected JC4832W535 board id while hiding the legacy alias', () => {
        const profile = devices.DEVICE_PROFILES.guition_esp32_jc4832w535;
        const legacy = devices.DEVICE_PROFILES.guition_esp32_jc8048w535;

        expect(profile).toBeTruthy();
        expect(profile.name).toContain('JC4832W535');
        expect(profile.hardwarePackage).toBe('hardware/guition-esp32-jc8048w535.yaml');
        expect(profile.displayModel).toBe('JC4832W535');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('guition_esp32_jc4832w535');

        expect(legacy).toBeTruthy();
        expect(legacy.isUntestedProfile).toBe(true);
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('guition_esp32_jc8048w535');
    });

    it('includes the M5Stack Tab5, Guition P4, and GeekMagic package profiles as supported built-ins', () => {
        const tab5 = devices.DEVICE_PROFILES.m5stack_tab5;
        const guitionP4 = devices.DEVICE_PROFILES.guition_esp32_p4_jc4880p443;
        const guitionP4Large = devices.DEVICE_PROFILES.guition_esp32_p4_jc8012p4a1c;
        const geekMagic = devices.DEVICE_PROFILES.geekmagic_mini_esp8266;
        const geekMagicPro = devices.DEVICE_PROFILES.geekmagic_pro_esp32;

        expect(tab5).toMatchObject({
            name: 'M5Stack Tab5',
            chip: 'esp32-p4',
            displayPlatform: 'mipi_dsi',
            displayModel: 'M5STACK-TAB5-V2',
            hardwarePackage: 'hardware/m5stack-tab5.yaml',
            resolution: { width: 1280, height: 720 }
        });
        expect(tab5.features.touch).toBe(true);
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('m5stack_tab5');

        expect(guitionP4).toMatchObject({
            name: 'Guition JC4880P443 4.3" 480x800',
            chip: 'esp32-p4',
            board: 'esp32-p4-evboard',
            displayPlatform: 'mipi_dsi',
            displayModel: 'JC4880P443',
            displayId: 'main_display',
            touchscreenId: 'device_touchscreen',
            hardwarePackage: 'hardware/guition-esp32-p4-jc4880p443.yaml',
            resolution: { width: 480, height: 800 }
        });
        expect(guitionP4.features.touch).toBe(true);
        expect(guitionP4.touch.id).toBe('device_touchscreen');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('guition_esp32_p4_jc4880p443');

        expect(guitionP4Large).toMatchObject({
            name: 'Guition JC8012P4A1C 10.1" 800x1280',
            chip: 'esp32-p4',
            board: 'esp32-p4-evboard',
            displayPlatform: 'mipi_dsi',
            displayModel: 'JC8012P4A1',
            displayId: 'main_display',
            touchscreenId: 'device_touchscreen',
            hardwarePackage: 'hardware/guition-esp32-p4-jc8012p4a1c.yaml',
            resolution: { width: 800, height: 1280 }
        });
        expect(guitionP4Large.features.touch).toBe(true);
        expect(guitionP4Large.touch.id).toBe('device_touchscreen');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('guition_esp32_p4_jc8012p4a1c');

        expect(geekMagic).toMatchObject({
            name: 'GeekMagic Mini (ESP8266)',
            chip: 'esp8266',
            board: 'esp01_1m',
            displayPlatform: 'mipi_spi',
            displayModel: 'ST7789V',
            hardwarePackage: 'hardware/geekmagic-mini-esp8266.yaml',
            resolution: { width: 240, height: 240 }
        });
        expect(geekMagic.features.touch).toBe(false);
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('geekmagic_mini_esp8266');

        expect(geekMagicPro).toMatchObject({
            name: 'GeekMagic Pro (ESP32)',
            chip: 'esp32',
            board: 'esp32dev',
            displayPlatform: 'mipi_spi',
            displayModel: 'st7789v',
            hardwarePackage: 'hardware/geekmagic-pro-esp32.yaml',
            resolution: { width: 240, height: 240 }
        });
        expect(geekMagicPro.features.lvgl).toBe(true);
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('geekmagic_pro_esp32');
    });

    it('includes the Seeed reTerminal E1004 large color e-paper profile', () => {
        const profile = devices.DEVICE_PROFILES.reterminal_e1004;

        expect(profile).toMatchObject({
            name: 'Seeedstudio reTerminal E1004 13.3" (Spectra 6)',
            displayType: 'color',
            chip: 'esp32-s3',
            board: 'esp32-s3-devkitc-1',
            displayPlatform: 'epaper_spi',
            displayModel: 'seeed-reterminal-e1004',
            resolution: { width: 1200, height: 1600 }
        });
        expect(profile.features.epaper).toBe(true);
        expect(profile.features.psram).toBe(true);
        // Profile is now active - no longer coming soon
        expect(profile.isComingSoon).toBeUndefined();
        expect(profile.unavailableReason).toBeUndefined();
        // Has display_config with allow_other_uses on shared GPIO2 pin
        expect(Array.isArray(profile.display_config)).toBe(true);
        expect(profile.display_config.some((/** @type {string} */ l) => l.includes('allow_other_uses'))).toBe(true);
        // Has external_components for PR #16706
        expect(Array.isArray(profile.external_components)).toBe(true);
        expect(profile.external_components.some((/** @type {string} */ l) => l.includes('16706'))).toBe(true);
        // Home button has allow_other_uses due to GPIO2 sharing
        expect(profile.pins.buttons.home).toMatchObject({ number: 'GPIO2', allow_other_uses: true });
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('reterminal_e1004');
    });

    it('includes verified E1003, Pico, and Elecrow P4 profiles', () => {
        const e1003 = devices.DEVICE_PROFILES.reterminal_e1003;
        const picoW = devices.DEVICE_PROFILES.raspberry_pi_pico_w_waveshare_2_13_v3;
        const pico2W = devices.DEVICE_PROFILES.raspberry_pi_pico_2_w_waveshare_2_13_v3;
        const elecrow = devices.DEVICE_PROFILES.elecrow_esp32_p4_9inch_v1_2;

        expect(e1003).toMatchObject({
            chip: 'esp32-s3',
            displayPlatform: 'it8951',
            displayModel: 'Seeed-reTerminal-E1003',
            resolution: { width: 1872, height: 1404 }
        });
        expect(e1003.frameworkHint).toContain('ESP-IDF');
        expect(e1003.pins.spi).toEqual({ clk: 'GPIO7', mosi: 'GPIO9', miso: 'GPIO8' });
        expect(e1003.features.epaper).toBe(true);
        expect(e1003.features.inverted_colors).toBe(false);
        // #449: Home GPIO2 removed to avoid conflict with GT911 touch controller
        expect(e1003.pins.buttons.home).toBeUndefined();
        // GT911 touchscreen added per #449 user report
        expect(e1003.features.touch).toBe(true);
        expect(e1003.touch).toMatchObject({ platform: 'gt911' });

        expect(picoW).toMatchObject({ chip: 'rp2040', board: 'rpipicow', displayModel: '2.13inv3', rotation_offset: 90 });
        expect(pico2W).toMatchObject({ chip: 'rp2350', board: 'rpipico2w', displayModel: '2.13inv3', rotation_offset: 90 });
        expect(pico2W.supportsDeepSleep).toBe(false);

        expect(elecrow).toMatchObject({
            chip: 'esp32-p4',
            displayPlatform: 'mipi_dsi',
            hardwarePackage: 'hardware/elecrow-esp32-p4-9inch-v1.2.yaml',
            resolution: { width: 1024, height: 600 }
        });
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('reterminal_e1003');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('raspberry_pi_pico_2_w_waveshare_2_13_v3');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('elecrow_esp32_p4_9inch_v1_2');
    });

    it('includes the Seeed reTerminal D1001 P4 profile as an untested built-in', () => {
        const profile = devices.DEVICE_PROFILES.seeedstudio_reterminal_d1001;

        expect(profile).toMatchObject({
            name: 'Seeed Studio reTerminal D1001 8" 800x1280',
            chip: 'esp32-p4',
            board: 'esp32-p4-evboard',
            displayPlatform: 'mipi_dsi',
            displayModel: 'SEEED-RETERMINAL-D1001',
            displayId: 'main_display',
            touchscreenId: 'device_touchscreen',
            hardwarePackage: 'hardware/seeedstudio-reterminal-d1001.yaml',
            resolution: { width: 800, height: 1280 }
        });
        expect(profile.features.touch).toBe(true);
        expect(profile.touch).toMatchObject({ platform: 'gsl3670', id: 'device_touchscreen' });
        expect(profile.isUntestedProfile).toBe(true);
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('seeedstudio_reterminal_d1001');
    });

    it('recomputes supported ids after loading external profiles', async () => {
        fetchDynamicHardwareProfilesMock.mockResolvedValueOnce([
            {
                id: 'custom_dynamic_board',
                name: 'Custom Dynamic Board',
                resolution: { width: 320, height: 240 },
                features: { lcd: true }
            },
            {
                id: 'custom_untested_board',
                name: 'Custom Untested Board',
                resolution: { width: 320, height: 240 },
                isUntestedProfile: true
            }
        ]);
        getOfflineProfilesFromStorageMock.mockReturnValueOnce({
            custom_offline_board: {
                id: 'custom_offline_board',
                name: 'Custom Offline Board',
                resolution: { width: 400, height: 300 }
            }
        });

        await devices.loadExternalProfiles();

        expect(devices.SUPPORTED_DEVICE_IDS).toContain('custom_dynamic_board');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('custom_offline_board');
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('custom_untested_board');
        expect(emitMock).toHaveBeenCalledWith('device-profiles-updated');
    });

    it('merges dynamic features without dropping built-in feature flags', () => {
        const merged = devices.mergeDeviceProfile(
            { features: { psram: true, epaper: true }, chip: 'esp32-s3' },
            { features: { touch: true }, chip: 'esp32' }
        );

        expect(merged.features).toEqual({ psram: true, epaper: true, touch: true });
        expect(merged.chip).toBe('esp32');
    });

    it('applies Lilygo-specific commented system overrides and psram speed', () => {
        const profile = devices.DEVICE_PROFILES.lilygo_t5_47;
        const generator = new YamlGenerator();

        const headerLines = generator.generateInstructionHeader(profile, {}, true);
        const systemLines = generator.generateSystemSections(profile, {});
        const psramLines = generatePSRAMSection(profile);
        const binaryLines = generateBinarySensorSection(profile, 1, 'epaper_display', []);
        const scriptLines = generator.generateScriptSection({ refreshInterval: 600 }, [{ name: 'Overview' }], profile);

        expect(headerLines.join('\n')).toContain('#         - Framework: Arduino 3.x (required by the t547 component)');
        expect(headerLines.join('\n')).toContain('#         - Select: ESP32');
        expect(headerLines.join('\n')).toContain('#         - Framework: Arduino 3.x (required by the t547 component)');
        expect(headerLines.join('\n')).toContain('#         - System sections (esphome, esp32) are auto-commented');
        expect(headerLines.join('\n')).toContain('# Deep Sleep Interval: Disabled');
        expect(systemLines.join('\n')).toContain('#   framework:');
        expect(systemLines.join('\n')).toContain('#     type: arduino');
        expect(systemLines.join('\n')).toContain('#   flash_size: 16MB');
        expect(systemLines.join('\n')).toContain('#   platformio_options:');
        expect(psramLines).toContain('  speed: 80MHz');
        expect(binaryLines.join('\n')).not.toContain('name: "Left Button"');
        expect(binaryLines.join('\n')).not.toContain('name: "Right Button"');
        expect(binaryLines.join('\n')).toContain('name: "Refresh Button"');
        expect(scriptLines.join('\n')).not.toContain('bool is_sleep_time = false;');
        expect(scriptLines.join('\n')).not.toContain('int start = 0;');
        expect(scriptLines.join('\n')).not.toContain('int end = 0;');
    });
});
