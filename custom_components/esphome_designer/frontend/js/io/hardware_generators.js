// ============================================================================
// HARDWARE SECTION GENERATORS
// ============================================================================

import {
    generateTouchscreenSection as generateTouchscreenSectionHelper,
    generateSensorSection as generateSensorSectionHelper,
    generateBinarySensorSection as generateBinarySensorSectionHelper,
    generateButtonSection as generateButtonSectionHelper
} from './hardware_generators_sections.js';
import { resolveDisplayId } from './display_ids.js';

/** @typedef {Record<string, any>} ProfileLike */
/** @typedef {{ orientation?: string, refreshInterval?: number, lcdEcoStrategy?: string }} LayoutLike */
/** @typedef {Record<string, any>} WidgetLike */
/** @typedef {string | number | boolean | Record<string, any>} PinValue */

/**
 * @param {ProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateBacklightSection(profile) {
    const lines = /** @type {string[]} */ ([]);
    if (!profile || !profile.backlight) return lines;

    const bl = profile.backlight;

    // Output component for the backlight pin
    if (bl.platform === "ledc" || bl.platform === "gpio" || bl.platform === "switch") {
        if (bl.platform === "switch") {
            lines.push("switch:");
            lines.push("  - platform: gpio"); // Usually gpio switch for on/off backlights
            lines.push("    id: lcdbacklight");
            lines.push("    name: lcdbacklight");
            // Handle complex pin objects (e.g. attached to IO expander)
            if (typeof bl.pin === 'object') {
                lines.push("    pin:");
                Object.entries(bl.pin).forEach(([k, v]) => {
                    if (typeof v === 'object') {
                        lines.push(`      ${k}:`);
                        Object.entries(v).forEach(([sk, sv]) => lines.push(`        ${sk}: ${sv}`));
                    } else {
                        lines.push(`      ${k}: ${v}`);
                    }
                });
            } else {
                lines.push(`    pin: ${bl.pin}`);
            }
            lines.push("    restore_mode: ALWAYS_ON");
            lines.push("");
        } else {
            lines.push("output:");
            lines.push(`  - platform: ${bl.platform}`);
            lines.push(`    id: gpio_backlight_pwm`);
            lines.push(`    pin: ${bl.pin}`);
            if (bl.frequency) lines.push(`    frequency: ${bl.frequency}`);
            lines.push("");
        }
    }

    // Light component to control it
    lines.push("light:");
    lines.push("  - platform: monochromatic");
    lines.push("    name: Display Backlight");
    lines.push("    id: display_backlight");
    lines.push("    restore_mode: ALWAYS_ON");

    if (bl.platform === "switch") {
        // Fake output for switch-based backlights (Waveshare 7" style)
        lines.push("    output: fake_backlight_output");
        lines.push("    default_transition_length: 0s");
        lines.push("");
        lines.push("output:");
        lines.push("  - platform: template");
        lines.push("    id: fake_backlight_output");
        lines.push("    type: float");
        lines.push("    write_action:");
        lines.push("      - if:");
        lines.push("          condition:");
        lines.push("            lambda: 'return state > 0.0;'");
        lines.push("          then:");
        lines.push("            - switch.turn_on: lcdbacklight");
        lines.push("          else:");
        lines.push("            - switch.turn_off: lcdbacklight");
    } else {
        lines.push("    output: gpio_backlight_pwm");
    }
    lines.push("");
    return lines;
}

/**
 * @param {ProfileLike} profile
 * @returns {string[]}
 */
export function generateExtraComponents(profile) {
    const lines = /** @type {string[]} */ ([]);

    // 1. External Components (structured from profile)
    if (profile.external_components && Array.isArray(profile.external_components) && profile.external_components.length > 0) {
        lines.push("external_components:");
        lines.push(...profile.external_components);
        lines.push("");
    }

    // 2. Extra Components (Legacy/Misc)
    if (profile.extra_components && Array.isArray(profile.extra_components)) {
        lines.push(...profile.extra_components);
        lines.push("");
    }
    if (profile.extra_components_raw) {
        lines.push(profile.extra_components_raw);
        lines.push("");
    }
    return lines;
}

/**
 * @param {ProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateI2CSection(profile) {
    const lines = /** @type {string[]} */ ([]);
    if (profile && profile.pins && profile.pins.i2c) {
        lines.push("i2c:");
        lines.push("  - sda: " + profile.pins.i2c.sda);
        lines.push("    scl: " + profile.pins.i2c.scl);
        lines.push("    scan: " + (profile.i2c_config?.scan !== false));
        lines.push("    id: bus_a");
        if (profile.i2c_config?.frequency) {
            lines.push("    frequency: " + profile.i2c_config.frequency);
        }
        lines.push("");
    }
    return lines;
}

/**
 * @param {ProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateSPISection(profile) {
    const lines = /** @type {string[]} */ ([]);
    if (profile && profile.pins && profile.pins.spi) {
        lines.push("spi:");
        const spi = profile.pins.spi;
        if (spi.id) lines.push(`  - id: ${spi.id}`);
        else lines.push("  - id: spi_bus");

        lines.push(`    clk_pin: ${spi.clk}`);
        if (spi.mosi) lines.push(`    mosi_pin: ${spi.mosi}`);
        if (spi.miso) lines.push(`    miso_pin: ${spi.miso}`);

        if (spi.type === "quad") {
            lines.push("    interface: triple");
            if (spi.data_pins) {
                lines.push(`    data_pins: [${spi.data_pins.join(', ')}]`);
            }
        }
        lines.push("");

        // Extra SPI buses?
        if (profile.extra_spi) {
            lines.push(...profile.extra_spi);
            lines.push("");
        }
    }
    return lines;
}

/**
 * @param {ProfileLike | null | undefined} profile
 * @param {LayoutLike} [layout]
 * @param {boolean} [isLvgl]
 * @returns {string[]}
 */
export function generateDisplaySection(profile, layout = {}, isLvgl = false) {
    const lines = /** @type {string[]} */ ([]);
    if (!profile) return lines;

    const orientation = layout.orientation || 'landscape';
    const resolution = profile.resolution || { width: 800, height: 480 };
    const isNativePortrait = resolution.height > resolution.width;
    const isRequestedPortrait = orientation === 'portrait' || orientation === 'portrait_inverted';
    const isRequestedInverted = orientation === 'landscape_inverted' || orientation === 'portrait_inverted';

    let displayRotation = 0;
    if (isNativePortrait) {
        displayRotation = isRequestedPortrait ? 0 : 90;
    } else {
        displayRotation = isRequestedPortrait ? 90 : 0;
    }

    if (isRequestedInverted) displayRotation = (displayRotation + 180) % 360;
    if (profile.rotation_offset) {
        displayRotation = (displayRotation + profile.rotation_offset) % 360;
    }

    if (profile.display_config) {
        lines.push("display:");
        // Fix: Filter out existing rotation from profile config to strictly enforce Designer's orientation setting
        const configLines = /** @type {string[]} */ (profile.display_config.filter((/** @type {string} */ l) => !l.trim().startsWith("rotation:")));
        lines.push(...configLines);

        // Fix #330: Ensure display ID is always present in display_config profiles
        const expectedId = resolveDisplayId(profile);
        const hasId = configLines.some(l => l.trim().startsWith('id:'));
        if (!hasId) {
            lines.push(`    id: ${expectedId}`);
        }

        // Correct auto_clear_enabled for LVGL if present in config
        if (isLvgl) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes("auto_clear_enabled: true")) {
                    lines[i] = lines[i].replace("auto_clear_enabled: true", "auto_clear_enabled: false");
                }
            }
        }

        // Inject the calculated rotation (ensures Designer 'Landscape/Portrait' toggle works)
        // Issue #490: ESPHome 2026.4 rejects display-level rotation when LVGL is
        // enabled; the lvgl component carries the rotation in that mode instead.
        if (!isLvgl) lines.push(`    rotation: ${displayRotation}`);
        lines.push("");
    } else {
        const isLcd = !!(profile.features && (profile.features.lcd || profile.features.oled));
        const displayId = resolveDisplayId(profile);
        lines.push("display:");
        lines.push(`  - platform: ${profile.displayPlatform}`);
        lines.push(`    id: ${displayId}`);
        if (isLvgl) lines.push("    auto_clear_enabled: false");

        const p = (profile.pins && profile.pins.display) ? profile.pins.display : null;
        if (p) {
            const addPin = (/** @type {string} */ key, /** @type {PinValue | null | undefined} */ val) => {
                if (!val) return;
                if (typeof val === 'object') {
                    lines.push(`    ${key}:`);
                    lines.push(`      number: ${/** @type {Record<string, any>} */ (val).number}`);
                    if (/** @type {Record<string, any>} */ (val).inverted !== undefined) lines.push(`      inverted: ${/** @type {Record<string, any>} */ (val).inverted}`);
                } else {
                    lines.push(`    ${key}: ${val}`);
                }
            };

            addPin("cs_pin", p.cs);
            addPin("dc_pin", p.dc);
            addPin("reset_pin", p.reset);
            addPin("busy_pin", p.busy);
        }

        if (profile.displayPlatform === "waveshare_epaper") {
            if (profile.displayModel) lines.push(`    model: "${profile.displayModel}"`);
        }


        // Issue #490: skip display-level rotation in LVGL mode (handled by lvgl:).
        if (!isLvgl) lines.push(`    rotation: ${displayRotation}`);
        // M5Paper / IT8951 needs specific reset durations
        if (profile.displayModel === "M5Paper" || profile.displayPlatform === "it8951e") {
            lines.push("    reversed: false");
            lines.push("    reset_duration: 200ms");
        }
        else if (profile.displayModel && profile.displayPlatform !== "waveshare_epaper") {
            let modelLine = `    model: "${profile.displayModel}"`;
            if (profile.displayModel === "Seeed-reTerminal-E1002") {
                modelLine += " #Please update your ESPHome version to 2025.11.1 above";
            }
            lines.push(modelLine);
        }

        const refreshInterval = layout.refreshInterval || 1;
        lines.push(`    update_interval: ${isLcd ? refreshInterval + 's' : 'never'}`);

        const modelsWithFullUpdate = [
            "1.54in", "1.54inv2", "2.13in", "2.13in-ttgo", "2.13in-ttgo-b1",
            "2.13in-ttgo-b73", "2.13in-ttgo-b74", "2.13in-ttgo-dke", "2.13inv2", "2.13inv3",
            "2.90in", "2.90in-dke", "2.90inv2", "2.90inv2-r2", "7.50inv2p",
            "gdew029t5", "gdey029t94", "gdey042t81", "gdey0583t81"
        ];
        if (profile.displayModel && modelsWithFullUpdate.includes(profile.displayModel)) {
            lines.push("    full_update_every: 30");
        }
        lines.push("");
    }

    const linkedDisplayId = resolveDisplayId(profile);
    lines.push(...generateTouchscreenSectionHelper(profile, linkedDisplayId, displayRotation, layout, isLvgl));

    return lines;
}

/**
 * @param {ProfileLike} profile
 * @param {string[]} [widgetSensorLines]
 * @param {string} [displayId]
 * @param {WidgetLike[]} [allWidgets]
 * @returns {string[]}
 */
export function generateSensorSection(profile, widgetSensorLines = [], displayId = "my_display", allWidgets = []) {
    return generateSensorSectionHelper(profile, widgetSensorLines, displayId, allWidgets);
}

/**
 * @param {ProfileLike} profile
 * @param {number} numPages
 * @param {string} [displayId]
 * @param {WidgetLike[]} [touchAreaWidgets]
 * @returns {string[]}
 */
export function generateBinarySensorSection(profile, numPages, displayId = "my_display", touchAreaWidgets = []) {
    return generateBinarySensorSectionHelper(profile, numPages, displayId, touchAreaWidgets);
}

/**
 * @param {ProfileLike} profile
 * @param {number} numPages
 * @param {string} [displayId]
 * @returns {string[]}
 */
export function generateButtonSection(profile, numPages, displayId = "my_display") {
    return generateButtonSectionHelper(profile, numPages, displayId);
}

/**
 * @param {ProfileLike} profile
 * @returns {string[]}
 */
export function generatePSRAMSection(profile) {
    const hasPsram = (profile.features && profile.features.psram) || (profile.features && profile.features.features && profile.features.features.psram);
    if (!hasPsram) return [];

    // Chip check: Ensure chip supports PSRAM
    const chip = (profile.chip || "").toLowerCase();
    const unsupportedChips = ["esp32-c3", "esp32-c6", "esp8266", "rp2040", "rp2350"];
    if (unsupportedChips.some(c => chip.includes(c))) return [];

    const lines = ["psram:"];
    if (profile.psram_mode) {
        lines.push(`  mode: ${profile.psram_mode}`);
    }
    if (profile.psram_speed) {
        lines.push(`  speed: ${profile.psram_speed}`);
    } else if (profile.psram_mode) {
        lines.push("  speed: 80MHz");
    }
    lines.push("");
    return lines;
}

/**
 * @param {ProfileLike} profile
 * @returns {string[]}
 */
export function generateAXP2101Section(profile) {
    if (!profile.features || !profile.features.axp2101 || profile.features.manual_pmic) return [];

    return [
        "axp2101:",
        "  i2c_id: bus_a",
        "  address: 0x34",
        "  irq_pin: GPIO21",
        "  battery_voltage:",
        "    name: \"Battery Voltage\"",
        "    id: battery_voltage",
        "  battery_level:",
        "    name: \"Battery Level\"",
        "    id: battery_level",
        "  on_setup:",
        "    - axp2101.set_ldo_voltage:",
        "        id: bldo1",
        "        voltage: 3300mv",
        "    - switch.turn_on: bldo1  # EPD_VCC (Screen Power)",
        "    - axp2101.set_ldo_voltage:",
        "        id: aldo1",
        "        voltage: 3300mv",
        "    - switch.turn_on: aldo1  # Peripherals",
        "    - axp2101.set_ldo_voltage:",
        "        id: aldo3",
        "        voltage: 3300mv",
        "    - switch.turn_on: aldo3  # Backlight/Logic",
        ""
    ];
}

/**
 * @param {ProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateOutputSection(profile) {
    const lines = /** @type {string[]} */ ([]);
    const hasM5Power = !!(profile?.m5paper?.main_power_pin || profile?.pins?.main_power_pin || profile?.m5paper?.battery_power_pin || profile?.pins?.battery_power_pin);
    if (!profile || !profile.pins || (!profile.pins.batteryEnable && !profile.pins.buzzer && !hasM5Power)) return lines;

    const batteryEnableAlwaysOn = !!profile.batteryEnableAlwaysOn;
    const needsOutput = (!batteryEnableAlwaysOn && profile.pins.batteryEnable) || profile.pins.buzzer || hasM5Power;

    if (batteryEnableAlwaysOn && profile.pins.batteryEnable) {
        lines.push("switch:");
        lines.push("  - platform: gpio");
        lines.push(`    pin: ${profile.pins.batteryEnable}`);
        lines.push("    id: bsp_battery_enable");
        lines.push("    restore_mode: ALWAYS_ON");
        lines.push("    internal: true");
        lines.push("");
    }

    if (needsOutput) lines.push("output:");
    if (!batteryEnableAlwaysOn && profile.pins.batteryEnable) {
        lines.push("  - platform: gpio"); // Use standard gpio output
        if (typeof profile.pins.batteryEnable === 'object') {
            lines.push("    pin:");
            lines.push(`      number: ${profile.pins.batteryEnable.number}`);
            if (profile.pins.batteryEnable.ignore_strapping_warning) {
                lines.push("      ignore_strapping_warning: true");
            }
            if (profile.pins.batteryEnable.inverted !== undefined) {
                lines.push(`      inverted: ${profile.pins.batteryEnable.inverted}`);
            }
        } else {
            lines.push(`    pin: ${profile.pins.batteryEnable}`);
        }
        lines.push("    id: bsp_battery_enable");
    }

    // M5Paper / Device-specific main power pins
    if (profile.m5paper?.main_power_pin || profile.pins?.main_power_pin) {
        if (!batteryEnableAlwaysOn && profile.pins.batteryEnable) lines.push("");
        lines.push("  - platform: gpio");
        lines.push(`    pin: ${profile.m5paper?.main_power_pin || profile.pins.main_power_pin}`);
        lines.push("    id: main_power");
    }

    if (profile.m5paper?.battery_power_pin || profile.pins?.battery_power_pin) {
        if ((!batteryEnableAlwaysOn && profile.pins.batteryEnable) || profile.m5paper?.main_power_pin) lines.push("");
        lines.push("  - platform: gpio");
        lines.push(`    pin: ${profile.m5paper?.battery_power_pin || profile.pins.battery_power_pin}`);
        lines.push("    id: battery_power");
    }

    if (profile.pins.buzzer) {
        if ((!batteryEnableAlwaysOn && profile.pins.batteryEnable) || hasM5Power) lines.push("");
        lines.push("  - platform: ledc");
        lines.push(`    pin: ${profile.pins.buzzer}`);
        lines.push("    id: buzzer_output");
    }
    lines.push("");
    return lines;
}

/**
 * @param {ProfileLike} profile
 * @returns {string[]}
 */
export function generateRTTTLSection(profile) {
    if (!profile.features || !profile.features.buzzer) return [];
    return [
        "rtttl:",
        "  id: reterminal_buzzer",
        "  output: buzzer_output",
        ""
    ];
}

/**
 * @param {ProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateAudioSection(profile) {
    if (!profile || !profile.audio) return [];
    const lines = /** @type {string[]} */ ([]);
    if (profile.audio.i2s_audio) {
        lines.push("i2s_audio:");
        lines.push(`  i2s_lrclk_pin: ${profile.audio.i2s_audio.i2s_lrclk_pin}`);
        lines.push(`  i2s_bclk_pin: ${profile.audio.i2s_audio.i2s_bclk_pin}`);
        if (profile.audio.i2s_audio.i2s_mclk_pin) lines.push(`  i2s_mclk_pin: ${profile.audio.i2s_audio.i2s_mclk_pin}`);
        lines.push("");
    }
    if (profile.audio.speaker) {
        lines.push("speaker:");
        lines.push(`  - platform: ${profile.audio.speaker.platform}`);
        lines.push(`    id: my_speaker`);
        if (profile.audio.speaker.dac_type) lines.push(`    dac_type: ${profile.audio.speaker.dac_type}`);
        if (profile.audio.speaker.i2s_dout_pin) lines.push(`    i2s_dout_pin: ${profile.audio.speaker.i2s_dout_pin}`);
        if (profile.audio.speaker.mode) lines.push(`    mode: ${profile.audio.speaker.mode}`);
        lines.push("");
    }
    return lines;
}
