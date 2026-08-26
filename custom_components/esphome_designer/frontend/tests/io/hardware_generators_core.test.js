import { describe, expect, it } from 'vitest';

import {
    generateAudioSection,
    generateAXP2101Section,
    generateBacklightSection,
    generateDisplaySection,
    generateExtraComponents,
    generateI2CSection,
    generateOutputSection,
    generatePSRAMSection,
    generateRTTTLSection,
    generateSPISection
} from '../../js/io/hardware_generators.js';
import { DEVICE_PROFILES } from '../../js/io/devices.js';

describe('hardware_generators core', () => {
    it('builds touchscreen-aware display sections with LVGL wake hooks and transform metadata', () => {
        const lines = generateDisplaySection({
            displayPlatform: 'ili9xxx',
            displayModel: 'ST7789V',
            resolution: { width: 800, height: 480 },
            features: { lcd: true },
            pins: {
                display: {
                    cs: 'GPIO10',
                    dc: 'GPIO11',
                    reset: { number: 'GPIO12', inverted: true },
                    busy: 'GPIO13'
                }
            },
            touch: {
                platform: 'gt911',
                i2c_id: 'bus_a',
                interrupt_pin: 'GPIO4',
                reset_pin: { number: 'GPIO5', mode: 'OUTPUT' },
                transform: { swap_xy: true, mirror_x: true },
                calibration: { x_min: 0, x_max: 100, y_min: 0, y_max: 200 }
            }
        }, {
            orientation: 'portrait_inverted',
            lcdEcoStrategy: 'dim_after_timeout',
            refreshInterval: 5
        }, true);

        const joined = lines.join('\n');
        expect(joined).toContain('display:');
        expect(joined).toContain('id: my_display');
        expect(joined).toContain('auto_clear_enabled: false');
        // Issue #490: LVGL mode carries orientation via the lvgl component instead.
        expect(joined).not.toContain('rotation:');
        expect(joined).toContain('update_interval: 5s');
        expect(joined).toContain('touchscreen:');
        expect(joined).toContain('platform: gt911');
        expect(joined).toContain('display: my_display');
        expect(joined).toContain('interrupt_pin: GPIO4');
        expect(joined).toContain('reset_pin:');
        expect(joined).toContain('number: GPIO5');
        expect(joined).toContain('transform:');
        expect(joined).toContain('swap_xy: true');
        expect(joined).toContain('mirror_x: true');
        expect(joined).toContain('on_release:');
        expect(joined).toContain('lvgl.resume:');
        expect(joined).toContain('calibration:');
    });

    it('generates backlight, external component, I2C, and SPI sections for complex profiles', () => {
        const switchBacklight = generateBacklightSection({
            backlight: {
                platform: 'switch',
                pin: {
                    number: 'GPIO6',
                    mode: {
                        output: true
                    }
                }
            }
        }).join('\n');

        const ledcBacklight = generateBacklightSection({
            backlight: {
                platform: 'ledc',
                pin: 'GPIO7',
                frequency: '1200Hz'
            }
        }).join('\n');

        const extras = generateExtraComponents({
            external_components: ['  - source: github://demo/components'],
            extra_components: ['sensor:'],
            extra_components_raw: 'esphome:'
        }).join('\n');

        const i2c = generateI2CSection({
            pins: {
                i2c: { sda: 'GPIO1', scl: 'GPIO2' }
            },
            i2c_config: {
                scan: false,
                frequency: '400kHz'
            }
        }).join('\n');

        const spi = generateSPISection({
            pins: {
                spi: {
                    id: 'quad_bus',
                    clk: 'GPIO3',
                    mosi: 'GPIO4',
                    miso: 'GPIO5',
                    type: 'quad',
                    data_pins: ['GPIO6', 'GPIO7']
                }
            },
            extra_spi: ['  - id: extra_spi']
        }).join('\n');

        expect(switchBacklight).toContain('switch:');
        expect(switchBacklight).toContain('fake_backlight_output');
        expect(switchBacklight).toContain('mode:');
        expect(ledcBacklight).toContain('platform: ledc');
        expect(ledcBacklight).toContain('frequency: 1200Hz');
        expect(ledcBacklight).toContain('output: gpio_backlight_pwm');
        expect(extras).toContain('external_components:');
        expect(extras).toContain('sensor:');
        expect(extras).toContain('esphome:');
        expect(i2c).toContain('scan: false');
        expect(i2c).toContain('frequency: 400kHz');
        expect(spi).toContain('id: quad_bus');
        expect(spi).toContain('interface: triple');
        expect(spi).toContain('data_pins: [GPIO6, GPIO7]');
        expect(spi).toContain('id: extra_spi');
    });

    it('emits PSRAM, PMIC, output, RTTTL, and audio sections only for supported hardware', () => {
        const psram = generatePSRAMSection({
            features: { psram: true },
            chip: 'esp32-s3',
            psram_mode: 'octal'
        }).join('\n');

        const unsupportedPsram = generatePSRAMSection({
            features: { psram: true },
            chip: 'esp32-c3'
        });

        const axp = generateAXP2101Section({
            features: { axp2101: true }
        }).join('\n');

        const noAxp = generateAXP2101Section({
            features: { axp2101: true, manual_pmic: true }
        });

        const output = generateOutputSection({
            pins: {
                batteryEnable: {
                    number: 'GPIO1',
                    ignore_strapping_warning: true,
                    inverted: false
                },
                main_power_pin: 'GPIO8',
                battery_power_pin: 'GPIO9',
                buzzer: 'GPIO2'
            }
        }).join('\n');

        const rtttl = generateRTTTLSection({
            features: { buzzer: true }
        }).join('\n');

        const audio = generateAudioSection({
            audio: {
                i2s_audio: {
                    i2s_lrclk_pin: 'GPIO10',
                    i2s_bclk_pin: 'GPIO11',
                    i2s_mclk_pin: 'GPIO12'
                },
                speaker: {
                    platform: 'i2s_audio',
                    dac_type: 'external',
                    i2s_dout_pin: 'GPIO13',
                    mode: 'mono'
                }
            }
        }).join('\n');

        expect(psram).toContain('psram:');
        expect(psram).toContain('mode: octal');
        expect(psram).toContain('speed: 80MHz');
        expect(unsupportedPsram).toEqual([]);
        expect(axp).toContain('axp2101:');
        expect(axp).toContain('switch.turn_on: bldo1');
        expect(noAxp).toEqual([]);
        expect(output).toContain('ignore_strapping_warning: true');
        expect(output).toContain('id: main_power');
        expect(output).toContain('id: battery_power');
        expect(output).toContain('id: buzzer_output');
        expect(rtttl).toContain('output: buzzer_output');
        expect(audio).toContain('i2s_audio:');
        expect(audio).toContain('speaker:');
        expect(audio).toContain('i2s_dout_pin: GPIO13');
    });

    it('normalizes display_config profiles, rotates native-portrait panels, and preserves special model metadata', () => {
        const configLines = generateDisplaySection({
            display_config: [
                '  - platform: ili9xxx',
                '    model: "PanelX"',
                '    auto_clear_enabled: true'
            ],
            resolution: { width: 480, height: 800 },
            rotation_offset: 180,
            features: { lcd: true }
        }, {
            orientation: 'landscape'
        }, true).join('\n');

        const directConfigLines = generateDisplaySection({
            display_config: [
                '  - platform: ili9xxx',
                '    model: "PanelX"',
                '    auto_clear_enabled: true'
            ],
            resolution: { width: 480, height: 800 },
            rotation_offset: 180,
            features: { lcd: true }
        }, {
            orientation: 'landscape'
        }, false).join('\n');

        const m5paperLines = generateDisplaySection({
            displayPlatform: 'it8951e',
            displayModel: 'M5Paper',
            resolution: { width: 960, height: 540 },
            features: { epaper: true }
        }).join('\n');

        const reterminalLines = generateDisplaySection({
            displayPlatform: 'ili9xxx',
            displayModel: 'Seeed-reTerminal-E1002',
            resolution: { width: 1280, height: 720 },
            features: { lcd: true }
        }).join('\n');

        expect(configLines).toContain('id: my_display');
        expect(configLines).toContain('auto_clear_enabled: false');
        // Issue #490: LVGL mode carries orientation via the lvgl component instead.
        expect(configLines).not.toContain('rotation:');
        expect(directConfigLines).toContain('rotation: 270');
        expect(m5paperLines).toContain('reversed: false');
        expect(m5paperLines).toContain('reset_duration: 200ms');
        expect(reterminalLines).toContain('Please update your ESPHome version to 2025.11.1 above');
    });

    it('generates the official E1003 IT8951 display with its SPI bus', () => {
        const display = generateDisplaySection({
            displayPlatform: 'it8951',
            displayModel: 'Seeed-reTerminal-E1003',
            resolution: { width: 1872, height: 1404 },
            features: { epaper: true }
        }).join('\n');
        const spi = generateSPISection({
            pins: { spi: { clk: 'GPIO7', mosi: 'GPIO9', miso: 'GPIO8' } }
        }).join('\n');

        expect(display).toContain('platform: it8951');
        expect(display).toContain('model: "Seeed-reTerminal-E1003"');
        expect(display).toContain('update_interval: never');
        expect(display).not.toContain('dc_pin:');
        expect(spi).toContain('clk_pin: GPIO7');
        expect(spi).toContain('mosi_pin: GPIO9');
        expect(spi).toContain('miso_pin: GPIO8');
    });

    it('handles plain switch backlight pins and full-update epaper models', () => {
        const switchBacklight = generateBacklightSection({
            backlight: {
                platform: 'switch',
                pin: 'GPIO14'
            }
        }).join('\n');

        const epaperLines = generateDisplaySection({
            displayPlatform: 'waveshare_epaper',
            displayModel: '2.13inv2',
            resolution: { width: 250, height: 122 },
            features: { epaper: true }
        }).join('\n');

        expect(switchBacklight).toContain('pin: GPIO14');
        expect(epaperLines).toContain('full_update_every: 30');
        expect(epaperLines).toContain('update_interval: never');
    });

    it('generates the M5Stack PaperMono display, expander, and touch sections', () => {
        const profile = DEVICE_PROFILES.m5stack_paper_mono;
        expect(profile.isUntestedProfile).toBe(true);

        const lvglDisplay = generateDisplaySection(profile, { orientation: 'landscape' }, true).join('\n');
        expect(lvglDisplay).toContain('model: ssd1677');
        expect(lvglDisplay).toContain('cs_pin: GPIO16');
        expect(lvglDisplay).toContain('busy_pin: GPIO18');
        // Display reset hangs off the M5IOE1 expander, not a direct GPIO
        expect(lvglDisplay).toContain('m5ioe1_id: m5ioe1_hub');
        expect(lvglDisplay).toContain('width: 480');
        expect(lvglDisplay).toContain('height: 800');
        expect(lvglDisplay).not.toContain('rotation:');
        expect(lvglDisplay).toContain('platform: ft6336u');
        expect(lvglDisplay).toContain('interrupt_pin: GPIO4');

        const directDisplay = generateDisplaySection(profile, { orientation: 'portrait' }, false).join('\n');
        expect(directDisplay).toContain('rotation: 0');

        const extras = generateExtraComponents(profile).join('\n');
        expect(extras).toContain('components: [ m5ioe1 ]');
        expect(extras).toContain('address: 0x4F');
        expect(extras).toContain('id: epd_power_enable');

        const psram = generatePSRAMSection(profile).join('\n');
        expect(psram).toContain('mode: octal');

        const i2c = generateI2CSection(profile).join('\n');
        expect(i2c).toContain('sda: GPIO47');
    });
});
