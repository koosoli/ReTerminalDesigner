import { getTouchDebounceMs } from './navigation_debounce.js';
import { resolveTouchscreenId } from './display_ids.js';

/** @typedef {Record<string, any>} ProfileLike */
/** @typedef {Record<string, any>} WidgetLike */
/** @typedef {string | number | boolean | Record<string, any>} ButtonPinLike */

/**
 * @param {ProfileLike} profile
 * @param {number} numPages
 * @param {string} [displayId]
 * @param {WidgetLike[]} [touchAreaWidgets]
 * @returns {string[]}
 */
export function generateBinarySensorSection(profile, numPages, displayId = "my_display", touchAreaWidgets = []) {
    const lines = /** @type {string[]} */ ([]);
    const hasButtons = profile && profile.features && profile.features.buttons;
    const hasTouchAreas = touchAreaWidgets.length > 0;

    if (!hasButtons && !hasTouchAreas) return lines;

    lines.push("binary_sensor:");

    if (hasButtons) {
        const isCoreInk = profile.name && profile.name.includes("CoreInk");
        const buttons = profile.pins.buttons || {};

        const addButton = (
            /** @type {ButtonPinLike} */ buttonConfig,
            /** @type {string} */ fallbackId,
            /** @type {string} */ fallbackName,
            /** @type {string[]} */ onPressLines
        ) => {
            lines.push("  - platform: gpio");
            lines.push("    pin:");
            if (typeof buttonConfig === "object") {
                lines.push(`      number: ${buttonConfig.number}`);
                lines.push(`      mode: ${buttonConfig.mode || "INPUT_PULLUP"}`);
                lines.push(`      inverted: ${buttonConfig.inverted !== undefined ? buttonConfig.inverted : true}`);
                if (buttonConfig.allow_other_uses !== undefined) {
                    lines.push(`      allow_other_uses: ${buttonConfig.allow_other_uses}`);
                }
            } else {
                lines.push(`      number: ${buttonConfig}`);
                lines.push("      mode: INPUT_PULLUP");
                lines.push("      inverted: true");
            }
            lines.push(`    name: "${fallbackName}"`);
            lines.push(`    id: ${fallbackId}`);
            lines.push("    on_press:");
            lines.push("      then:");
            lines.push(...onPressLines);
        };


        if (buttons.left && numPages > 1) {
            addButton(buttons.left, "button_left", "Left Button", [
                "        - script.execute:",
                "            id: change_page_to",
                `            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${numPages - 1};'`
            ]);
        }

        if (buttons.right && numPages > 1) {
            addButton(buttons.right, "button_right", "Right Button", [
                "        - script.execute:",
                "            id: change_page_to",
                `            target_page: !lambda 'return id(display_page) < ${numPages - 1} ? id(display_page) + 1 : 0;'`
            ]);
        }

        if (buttons.refresh) {
            addButton(
                buttons.refresh,
                isCoreInk ? "button_enter" : "button_refresh",
                isCoreInk ? "Enter Button" : "Refresh Button",
                [`        - component.update: ${displayId}`]
            );
        }

        if (buttons.home) {
            const onPressLines = [];
            if (numPages > 1) {
                onPressLines.push(
                    "        - script.execute:",
                    "            id: change_page_to",
                    "            target_page: 0"
                );
            }
            onPressLines.push("        - script.execute: manage_run_and_sleep");
            addButton(buttons.home, "button_home", "Home Button", onPressLines);
        }
    }

    if (hasTouchAreas && profile?.touch) {
        lines.push("  # Touch Area Binary Sensors");
        const totalPages = touchAreaWidgets.reduce((max, widget) => Math.max(max, (widget._pageIndex ?? 0) + 1), 0) || 1;
        const touchDebounceMs = getTouchDebounceMs(profile);
        const touchscreenId = resolveTouchscreenId(profile);

        touchAreaWidgets.forEach((widget) => {
            const type = (widget.type || "").toLowerCase();
            const props = widget.props || {};

            if (type === "template_nav_bar") {
                const allowPaging = totalPages > 1;
                const showPrev = allowPaging && props.show_prev !== false;
                const showHome = props.show_home !== false;
                const showNext = allowPaging && props.show_next !== false;

                let activeCount = 0;
                if (showPrev) activeCount++;
                if (showHome) activeCount++;
                if (showNext) activeCount++;
                if (activeCount <= 0) return;

                const widthPerButton = Math.floor(widget.width / activeCount);
                let currentIdx = 0;

                const addNavTouch = (/** @type {string} */ action) => {
                    const xMin = widget.x + (currentIdx * widthPerButton);
                    const xMax = xMin + widthPerButton;
                    const yMin = widget.y;
                    const yMax = widget.y + widget.height;
                    const pageIdx = widget._pageIndex !== undefined ? widget._pageIndex : 0;

                    lines.push("  - platform: touchscreen");
                    lines.push(`    id: nav_${action}_${widget.id}`);
                    lines.push(`    touchscreen_id: ${touchscreenId}`);
                    lines.push(`    x_min: ${xMin}`);
                    lines.push(`    x_max: ${xMax}`);
                    lines.push(`    y_min: ${yMin}`);
                    lines.push(`    y_max: ${yMax}`);
                    lines.push("    on_press:");
                    lines.push("      - if:");
                    lines.push("          condition:");
                    lines.push(`            lambda: 'return id(display_page) == ${pageIdx} && (millis() - id(last_touch_time) > ${touchDebounceMs});'`);
                    lines.push("          then:");
                    lines.push("            - lambda: 'id(last_touch_time) = millis();'");

                    if (action === "prev") {
                        lines.push("            - script.execute:");
                        lines.push("                id: change_page_to");
                        lines.push("                target_page: !lambda 'return id(display_page) - 1;'");
                    } else if (action === "home") {
                        lines.push("            - script.execute: manage_run_and_sleep");
                    } else if (action === "next") {
                        lines.push("            - script.execute:");
                        lines.push("                id: change_page_to");
                        lines.push("                target_page: !lambda 'return id(display_page) + 1;'");
                    }

                    currentIdx++;
                };

                if (showPrev) addNavTouch("prev");
                if (showHome) addNavTouch("home");
                if (showNext) addNavTouch("next");
                return;
            }

            const safeId = `touch_area_${widget.id}`.replace(/[^a-zA-Z0-9_]/g, "_");
            const iconSize = parseInt(String(props.icon_size || 40), 10);
            const minWidth = Math.max(widget.width, iconSize);
            const minHeight = Math.max(widget.height, iconSize);

            let xMin = widget.x - Math.floor((minWidth - widget.width) / 2);
            let xMax = xMin + minWidth;
            let yMin = widget.y - Math.floor((minHeight - widget.height) / 2);
            let yMax = yMin + minHeight;

            xMin = Math.max(0, xMin);
            yMin = Math.max(0, yMin);

            const requestedNavAction = props.nav_action || "none";
            const navAction = totalPages > 1 ? requestedNavAction : (requestedNavAction === "reload_page" ? "reload_page" : "none");
            const pageIdx = widget._pageIndex !== undefined ? widget._pageIndex : 0;

            lines.push("  - platform: touchscreen");
            lines.push(`    id: ${safeId}`);
            lines.push(`    touchscreen_id: ${touchscreenId}`);
            lines.push(`    x_min: ${xMin}`);
            lines.push(`    x_max: ${xMax}`);
            lines.push(`    y_min: ${yMin}`);
            lines.push(`    y_max: ${yMax}`);

            if (navAction === "none" && !widget.entity_id) return;

            lines.push("    on_press:");
            lines.push("      - if:");
            lines.push("          condition:");
            lines.push(`            lambda: 'return id(display_page) == ${pageIdx} && (millis() - id(last_touch_time) > ${touchDebounceMs});'`);
            lines.push("          then:");
            lines.push("            - lambda: 'id(last_touch_time) = millis();'");

            if (navAction === "next_page") {
                lines.push("            - script.execute:");
                lines.push("                id: change_page_to");
                lines.push("                target_page: !lambda 'return id(display_page) + 1;'");
            } else if (navAction === "previous_page") {
                lines.push("            - script.execute:");
                lines.push("                id: change_page_to");
                lines.push("                target_page: !lambda 'return id(display_page) - 1;'");
            } else if (navAction === "reload_page") {
                lines.push("            - script.execute: manage_run_and_sleep");
            } else if (widget.entity_id) {
                lines.push("            - homeassistant.action:");
                lines.push("                action: homeassistant.toggle");
                lines.push("                data:");
                lines.push(`                  entity_id: ${widget.entity_id}`);
            }
        });
    }

    lines.push("");
    return lines;
}

/**
 * @param {ProfileLike} profile
 * @param {number} numPages
 * @param {string} [displayId]
 * @returns {string[]}
 */
export function generateButtonSection(profile, numPages, displayId = "my_display") {
    const lines = /** @type {string[]} */ ([]);
    lines.push("button:");

    if (numPages > 1) {
        lines.push("  - platform: template");
        lines.push("    name: \"Next Page\"");
        lines.push("    on_press:");
        lines.push("      then:");
        lines.push("        - script.execute:");
        lines.push("            id: change_page_to");
        lines.push("            target_page: !lambda 'return id(display_page) + 1;'");

        lines.push("  - platform: template");
        lines.push("    name: \"Previous Page\"");
        lines.push("    on_press:");
        lines.push("      then:");
        lines.push("        - script.execute:");
        lines.push("            id: change_page_to");
        lines.push("            target_page: !lambda 'return id(display_page) - 1;'");
    }

    lines.push("  - platform: template");
    lines.push("    name: \"Refresh Display\"");
    lines.push("    on_press:");
    lines.push("      then:");
    lines.push(`        - component.update: ${displayId}`);

    for (let i = 0; i < numPages; i++) {
        if (numPages <= 1) break;
        lines.push("  - platform: template");
        lines.push(`    name: "Go to Page ${i + 1}"`);
        lines.push("    on_press:");
        lines.push("      then:");
        lines.push("        - script.execute:");
        lines.push("            id: change_page_to");
        lines.push(`            target_page: ${i}`);
    }

    if (profile.features && profile.features.buzzer) {
        lines.push("  # Buzzer Sounds");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep Short\"");
        lines.push("    icon: \"mdi:bell-ring\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"beep:d=32,o=5,b=200:16e6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep OK\"");
        lines.push("    icon: \"mdi:check-circle-outline\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"ok:d=16,o=5,b=200:e6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep Error\"");
        lines.push("    icon: \"mdi:alert-circle-outline\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"error:d=16,o=5,b=200:c6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Star Wars\"");
        lines.push("    icon: \"mdi:music-note\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"StarWars:d=4,o=5,b=45:32p,32f,32f,32f,8a#.,8f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32d#,8c6\"");
    }

    lines.push("");
    return lines;
}
