import { getTouchDebounceMs } from '../../js/io/navigation_debounce.js';
import { resolveTouchscreenId } from '../../js/io/display_ids.js';

/**
 * Touch Area Plugin
 */
import { mdiIconCodesByName } from '../../js/core/mdi_icon_names.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.style.backgroundColor = props.color || "rgba(0, 0, 255, 0.2)";
    el.style.border = `1px dashed ${props.border_color || "#0000ff"}`;
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.color = props.icon_color ? getColorStyle(props.icon_color) : (props.border_color || "#0000ff");
    el.style.fontSize = "12px";
    el.style.fontWeight = "bold";
    el.style.overflow = "hidden";

    if (props.icon) {
        const getChar = (code) => {
            const c = (code || "").trim().replace("mdi:", "").toUpperCase();
            if (/^F[0-9A-F]{4}$/i.test(c)) {
                const cp = 0xf0000 + parseInt(c.slice(1), 16);
                return String.fromCodePoint(cp);
            }
            const iconName = (code || "").trim().replace("mdi:", "").toLowerCase();
            const iconCode = mdiIconCodesByName[iconName];
            if (iconCode) {
                const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
                return String.fromCodePoint(cp);
            }
            return null;
        };

        const normalChar = getChar(props.icon);
        const pressedChar = props.icon_pressed ? getChar(props.icon_pressed) : null;

        if (normalChar) {
            const iconEl = document.createElement("span");
            iconEl.innerText = normalChar;
            iconEl.style.fontFamily = "MDI, system-ui, sans-serif";
            iconEl.style.fontSize = (props.icon_size || 40) + "px";
            iconEl.style.lineHeight = "1";
            iconEl.style.color = props.icon_color ? getColorStyle(props.icon_color) : (props.border_color || "#0000ff");
            el.appendChild(iconEl);

            if (pressedChar) {
                el.style.cursor = "pointer";
                el.addEventListener("mouseenter", () => {
                    iconEl.innerText = pressedChar;
                    if (props.color && props.color.startsWith("rgba")) {
                        el.style.backgroundColor = props.color.replace(/[\d.]+\)$/, "0.4)");
                    } else {
                        el.style.backgroundColor = "rgba(0, 0, 255, 0.4)";
                    }
                });
                el.addEventListener("mouseleave", () => {
                    iconEl.innerText = normalChar;
                    el.style.backgroundColor = props.color || "rgba(0, 0, 255, 0.2)";
                });
            }

            if (props.title && widget.height > (props.icon_size || 40) + 20) {
                const lbl = document.createElement("div");
                lbl.innerText = props.title;
                lbl.style.fontSize = "10px";
                lbl.style.marginTop = "2px";
                el.appendChild(lbl);
            }
        } else {
            el.innerText = props.title || widget.entity_id || "Touch Area";
        }
    } else {
        el.innerText = props.title || widget.entity_id || "Touch Area";
    }
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, getCondProps, getConditionCheck // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const icon = (p.icon || "").replace("mdi:", "").toUpperCase();
    const iconPressed = (p.icon_pressed || "").replace("mdi:", "").toUpperCase();
    const iconSize = parseInt(p.icon_size || 40, 10);
    const iconColorProp = p.icon_color || "theme_auto";
    const iconColor = getColorConst(iconColorProp);


    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (icon) {
        const fontRef = addFont("Material Design Icons", 400, iconSize);
        const safeId = `touch_area_${w.id}`.replace(/[^a-zA-Z0-9_]/g, "_");

        if (iconPressed) {
            lines.push(`        if (id(${safeId}).state) {`);
            lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${iconPressed}");`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
            lines.push(`        }`);
        } else {
            lines.push(`        it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
        }
    }

    if (cond) lines.push(`        }`);
};

const onExportBinarySensors = (context) => {
    const { lines, widgets, profile } = context;
    if (!profile || !profile.touch) return;

    const targets = widgets.filter(w => w.type === 'touch_area' || w.type === 'nav_next_page' || w.type === 'nav_previous_page' || w.type === 'nav_reload_page');
    if (targets.length === 0) return;

    const totalPages = widgets.reduce((max, widget) => Math.max(max, (widget._pageIndex ?? 0) + 1), 0) || 1;
    const touchDebounceMs = getTouchDebounceMs(profile);
    const touchscreenId = resolveTouchscreenId(profile);

    lines.push("# Touch Area Binary Sensors");
    targets.forEach(w => {
        const p = w.props || {};
        const safeId = `touch_area_${w.id}`.replace(/[^a-zA-Z0-9_]/g, "_");

        lines.push(`- platform: touchscreen`);
        lines.push(`  id: ${safeId}`);
        lines.push(`  touchscreen_id: ${touchscreenId}`);
        lines.push(`  x_min: ${w.x}`);
        lines.push(`  x_max: ${w.x + w.width}`);
        lines.push(`  y_min: ${w.y}`);
        lines.push(`  y_max: ${w.y + w.height}`);

        const requestedNavAction = p.nav_action || "none";
        const navAction = totalPages > 1
            ? requestedNavAction
            : (requestedNavAction === "reload_page" ? "reload_page" : "none");
        const pageIdx = w._pageIndex !== undefined ? w._pageIndex : 0;

        if (navAction !== "none" || w.entity_id) {
            lines.push(`  on_press:`);
            lines.push(`    - if:`);
            lines.push(`        condition:`);
            lines.push(`          lambda: 'return id(display_page) == ${pageIdx} && (millis() - id(last_touch_time) > ${touchDebounceMs});'`);
            lines.push(`        then:`);
            lines.push(`          - lambda: 'id(last_touch_time) = millis();'`);

            if (navAction === "next_page") {
                lines.push(`          - script.execute:`);
                lines.push(`              id: change_page_to`);
                lines.push(`              target_page: !lambda 'return id(display_page) + 1;'`);
            } else if (navAction === "previous_page") {
                lines.push(`          - script.execute:`);
                lines.push(`              id: change_page_to`);
                lines.push(`              target_page: !lambda 'return id(display_page) - 1;'`);
            } else if (navAction === "reload_page") {
                lines.push(`          - script.execute: manage_run_and_sleep`);
            } else if (w.entity_id) {
                lines.push(`          - homeassistant.action:`);
                lines.push(`              action: homeassistant.toggle`);
                lines.push(`              data:`);
                lines.push(`                entity_id: ${w.entity_id}`);
            }
        }
    });
};

const collectRequirements = (widget, { trackIcon }) => {
    const props = widget.props || {};
    if (props.icon) trackIcon(props.icon, props.icon_size || 40);
    if (props.icon_pressed) trackIcon(props.icon_pressed, props.icon_size || 40);
};

export default {
    id: "touch_area",
    name: "Touch Area",
    category: "Controls",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this 
    // widget is strictly for display.lambda touchscreens. LVGL has its own 
    // internal touch handling via objects.
    supportedModes: ['direct'],
    defaults: {
        title: "",
        icon: "",
        icon_pressed: "",
        icon_size: 40,
        icon_color: "theme_auto",
        color: "rgba(0, 0, 255, 0.15)",
        border_color: "#0000ff",
        on_click: "",
        entity_id: "",
        nav_action: "none"
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "title", label: "Display Title", type: "text", default: "" },
                { key: "icon", label: "Touch Icon (MDI)", type: "icon_picker", default: "" },
                { key: "icon_pressed", label: "Pressed Icon", type: "icon_picker", default: "" },
                { key: "entity_id", target: "root", label: "Target Entity", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Navigation",
            fields: [
                { key: "nav_action", label: "Page Action", type: "select", options: ["none", "next_page", "previous_page", "reload_page"], default: "none" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "icon_size", label: "Icon Size", type: "number", default: 40 },
                { key: "icon_color", label: "Icon Color", type: "color", default: "theme_auto" },
                { key: "color", label: "Fill Color (Editor)", type: "color", default: "rgba(0, 0, 255, 0.15)" },
                { key: "border_color", label: "Border Color (Editor)", type: "color", default: "#0000ff" },
                { key: "on_click", label: "On Click Lambda", type: "text", default: "" }
            ]
        }
    ],
    render,
    collectRequirements,
    onExportBinarySensors,
    export: exportDoc
};
