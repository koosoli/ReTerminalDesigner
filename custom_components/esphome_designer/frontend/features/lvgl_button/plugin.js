/**
 * LVGL Button Plugin
 */

import { makeSafeId } from '../../js/utils/export_helpers.js';
import { getWeightsForFont, clampFontWeight } from '../../js/core/font_weights.js'; // eslint-disable-line no-unused-vars

const isMirrorableEntity = (entityId) => {
    const normalized = String(entityId || '').trim().toLowerCase();
    return normalized.startsWith('switch.')
        || normalized.startsWith('light.')
        || normalized.startsWith('fan.')
        || normalized.startsWith('input_boolean.');
};

const shouldSyncCheckedState = (props, entityId) => !!props.sync_state && isMirrorableEntity(entityId);

const getButtonPressService = (entityId) => String(entityId || '').trim().startsWith("input_button.")
    ? "input_button.press"
    : "button.press";

const buildCheckedStateUpdateAction = (widgetId) => `- lvgl.widget.update:
    id: ${widgetId}
    state:
      checked: !lambda return x;`;

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const textColor = props.color || props.text_color || "theme_auto";
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = getColorStyle(props.bg_color || "white");
    el.style.border = `${props.border_width || 2}px solid ${getColorStyle(textColor)}`;
    el.style.borderRadius = `${props.radius || 5}px`;

    const text = document.createElement("span");
    text.textContent = props.text || "BTN";
    text.style.color = getColorStyle(textColor);
    text.style.fontFamily = props.font_family || "Roboto, sans-serif";
    text.style.fontSize = (props.font_size || 14) + "px";
    text.style.fontWeight = props.font_weight || 400;
    if (props.italic) text.style.fontStyle = "italic";
    text.style.pointerEvents = "none";
    el.appendChild(text);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, _profile, getLVGLFont }) => {
    const p = w.props || {};
    const textColor = p.color || p.text_color;

    // Robust entity ID detection: check top-level, props.entity_id, and props.entity
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();
    const syncCheckedState = shouldSyncCheckedState(p, entityId);
    const checkable = (p.checkable || syncCheckedState) ? true : common.checkable;
    const state = syncCheckedState
        ? { checked: `!lambda return id(${makeSafeId(entityId)}).state;` }
        : undefined;

    const btnObj = {
        button: {
            ...common,
            ...(checkable !== undefined ? { checkable } : {}),
            bg_color: convertColor(p.bg_color),
            bg_opa: "cover",
            border_width: p.border_width,
            border_color: convertColor(textColor),
            radius: p.radius,
            opa: formatOpacity(p.opa),
            ...(state ? { state } : {}),
            on_click: undefined,
            widgets: [
                {
                    label: {
                        align: "center",
                        text: `"${p.text || 'BTN'}"`,
                        text_font: getLVGLFont ? getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic) : undefined,
                        text_color: convertColor(textColor)
                    }
                }
            ]
        }
    };

    const serviceOverride = p.service || "auto";

    if (entityId) {
        let action = [];

        if (serviceOverride !== "auto" && serviceOverride !== "") {
            // Use the exact service specified by the user
            const service = serviceOverride === "button.press"
                ? getButtonPressService(entityId)
                : serviceOverride;
            action = [{ "homeassistant.action": { action: service, data: { entity_id: entityId } } }];
        } else {
            // Auto-detect based on entity prefix
            if (entityId.startsWith("switch.") || entityId.startsWith("light.") || entityId.startsWith("fan.") || entityId.startsWith("input_boolean.")) {
                action = [{ "homeassistant.action": { action: "homeassistant.toggle", data: { entity_id: entityId } } }];
            } else if (entityId.startsWith("script.")) {
                action = [{ "script.execute": entityId }];
            } else if (entityId.startsWith("button.") || entityId.startsWith("input_button.")) {
                action = [{ "homeassistant.action": { action: getButtonPressService(entityId), data: { entity_id: entityId } } }];
            } else if (entityId.startsWith("scene.")) {
                action = [{ "scene.turn_on": entityId }];
            } else if (entityId.startsWith("cover.")) {
                action = [{ "homeassistant.action": { action: "cover.toggle", data: { entity_id: entityId } } }];
            } else {
                // Default to toggle for unknown domains if it looks like an entity ID
                action = [{ "homeassistant.action": { action: "homeassistant.toggle", data: { entity_id: entityId } } }];
            }
        }
        btnObj.button.on_click = action;
    }
    return btnObj;
};

const onExportBinarySensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_button") continue;

        const props = w.props || {};
        const entityId = (w.entity_id || props.entity_id || props.entity || "").trim();
        if (!shouldSyncCheckedState(props, entityId)) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(buildCheckedStateUpdateAction(w.id));
        }
    }
};

export default {
    id: "lvgl_button",
    name: "Button",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        text: "Button",
        bg_color: "theme_auto_inverse",
        color: "theme_auto",
        border_width: 2,
        radius: 5,
        checkable: false,
        opa: 255,
        font_size: 14,
        font_family: "Roboto",
        font_weight: 400,
        italic: false,
        entity_id: "",
        sync_state: false,
        service: "auto",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "text", label: "Button Text", type: "text", default: "Button" },
                { key: "entity_id", target: "root", label: "Action Entity ID", type: "entity_picker", default: "" },
                { key: "sync_state", label: "Sync Checked State from HA", type: "checkbox", default: false },
                {
                    key: "service", label: "Service Override", type: "select", options: [
                        { value: "auto", label: "Auto (Detect from Entity)" },
                        { value: "homeassistant.toggle", label: "Toggle" },
                        { value: "homeassistant.turn_on", label: "Turn On" },
                        { value: "homeassistant.turn_off", label: "Turn Off" },
                        { value: "cover.open_cover", label: "Cover: Open" },
                        { value: "cover.close_cover", label: "Cover: Close" },
                        { value: "cover.stop_cover", label: "Cover: Stop" },
                        { value: "cover.toggle", label: "Cover: Toggle" },
                        { value: "button.press", label: "Button Press" },
                        { value: "input_button.press", label: "Input Button Press" },
                        { value: "script.execute", label: "Script Execute" }
                    ], default: "auto"
                }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Text/Border Color", type: "color", default: "theme_auto" },
                { key: "bg_color", label: "Background color", type: "color", default: "theme_auto_inverse" },
                { key: "border_width", label: "Border width", type: "number", default: 2 },
                { key: "radius", label: "Corner Radius", type: "number", default: 5 },
                { key: "checkable", label: "Checkable (Toggle)", type: "checkbox", default: false },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        },
        {
            section: "Typography",
            fields: [
                { key: "font_size", label: "Font Size", type: "number", default: 14 },
                { key: "font_family", label: "Font Family", type: "select", options: ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand"], default: "Roboto" },
                { key: "font_weight", label: "Font Weight", type: "select", options: [100, 200, 300, 400, 500, 600, 700, 800, 900], default: 400 },
                { key: "italic", label: "Italic", type: "checkbox", default: false }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportBinarySensors,
    collectRequirements: (w, { addFont }) => {
        const p = w.props || {};
        addFont(p.font_family || "Roboto", p.font_weight || 400, p.font_size || 14, !!p.italic);
    }
};
