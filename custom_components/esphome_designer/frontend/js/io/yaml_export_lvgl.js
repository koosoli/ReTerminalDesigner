/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

import { DEVICE_PROFILES } from './devices.js';
import { resolveDisplayId, resolveTouchscreenId } from './display_ids.js';
import { serializeWidget, serializeYamlObject } from './yaml_export_lvgl_serialization.js';
import { transpilePageWidget } from './yaml_export_lvgl_transpile.js';

export { convertAlign, convertColor, formatOpacity, getLVGLFont } from './yaml_export_lvgl_core.js';
export { resolveDisplayId, resolveTouchscreenId } from './display_ids.js';
export { serializeWidget } from './yaml_export_lvgl_serialization.js';
export { hasLVGLWidgets, stripDefaults } from './yaml_export_lvgl_transpile.js';

/**
 * @param {Record<string, any>} profile
 * @returns {string | null}
 */
function getTouchscreenIdForLVGL(profile) {
    if (!profile.touch || Array.isArray(profile.touch)) return null;

    const touchscreenId = resolveTouchscreenId(profile);
    return typeof touchscreenId === 'string' && touchscreenId.trim()
        ? touchscreenId.trim()
        : null;
}

/**
 * Computes the rotation the lvgl component must apply for the requested
 * orientation, mirroring the display-rotation math used elsewhere.
 * @param {Record<string, any>} profile
 * @param {Record<string, any>} layout
 * @returns {number}
 */
function resolveLvglRotation(profile, layout) {
    const resolution = profile && profile.resolution;
    if (!resolution || !layout) return 0;

    const orientation = layout.orientation || 'landscape';
    const isNativePortrait = resolution.height > resolution.width;
    const isRequestedPortrait = orientation === 'portrait' || orientation === 'portrait_inverted';
    const isRequestedInverted = orientation === 'landscape_inverted' || orientation === 'portrait_inverted';

    let rotation = isNativePortrait
        ? (isRequestedPortrait ? 0 : 90)
        : (isRequestedPortrait ? 90 : 0);

    if (isRequestedInverted) rotation = (rotation + 180) % 360;
    if (profile.rotation_offset) rotation = (rotation + profile.rotation_offset) % 360;
    return rotation;
}

/**
 * @param {Page[]} pages
 * @param {string} deviceModel
 * @param {Record<string, any> | null} [profileOverride]
 * @param {Record<string, any>} [layout]
 * @returns {string[]}
 */
export function generateLVGLSnippet(pages, deviceModel, profileOverride = null, layout = {}) {
    /** @type {string[]} */
    const lines = [];
    const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES || {});
    const profile = profileOverride || profiles[deviceModel] || {};
    lines.push("# ============================================================================");
    lines.push("# LVGL Configuration");
    lines.push("# ============================================================================");
    lines.push("");

    lines.push("lvgl:");
    lines.push("  id: my_lvgl");
    lines.push("  log_level: WARN");

    // Issue #490: ESPHome 2026.4 rejects `rotation:` in the display section when
    // LVGL is enabled. Rotation is configured on the lvgl component instead,
    // which also adjusts touch input coordinates automatically.
    const lvglRotation = resolveLvglRotation(profile, layout);
    if (lvglRotation !== 0) {
        lines.push(`  rotation: ${lvglRotation}`);
    }

    const isDarkMode = !!layout.darkMode;
    const bgColor = isDarkMode ? '"0x000000"' : '"0xFFFFFF"';
    lines.push(`  bg_color: ${bgColor}`);
    lines.push("  displays:");

    const displayId = resolveDisplayId(profile);
    lines.push(`    - ${displayId}`);

    const touchscreenId = getTouchscreenIdForLVGL(profile);
    if (touchscreenId) {
        lines.push("  touchscreens:");
        lines.push(`    - touchscreen_id: ${touchscreenId}`);
    }

    if (layout.lcdEcoStrategy === 'dim_after_timeout') {
        const timeout = (layout.dimTimeout || 10) + "s";
        lines.push("  on_idle:");
        lines.push(`    timeout: ${timeout}`);
        lines.push("    then:");
        lines.push("      - light.turn_off: display_backlight");
        lines.push("      - lvgl.pause:");
    }
    lines.push("");

    lines.push("  pages:");

    pages.forEach((page, pageIndex) => {
        lines.push(`    - id: page_${pageIndex}`);

        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            lines.push(`      layout: ${page.layout}`);
        }

        lines.push("      widgets:");

        const widgets = /** @type {Widget[]} */ (page.widgets || []).filter((widget) => !widget.hidden && widget.type !== 'group');
        if (widgets.length === 0) {
            lines.push("        []");
            return;
        }

        widgets.forEach((widget) => {
            lines.push(`        ${serializeWidget(widget).replace(/^\/\//, '#')}`);

            const lvglWidget = transpilePageWidget(widget, profile, isDarkMode, page.layout);
            if (!lvglWidget) return;

            const typeKey = Object.keys(lvglWidget)[0];
            const props = lvglWidget[typeKey];

            lines.push(`        - ${typeKey}:`);
            serializeYamlObject(props, lines, 12);
        });
    });

    return lines;
}
