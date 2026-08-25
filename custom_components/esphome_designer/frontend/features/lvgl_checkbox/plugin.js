/**
 * LVGL Checkbox Plugin
 */

import { makeSafeId } from '../../js/utils/export_helpers.js';

const buildLoopGuardedToggleAction = (entityId) => ({
    if: {
        condition: {
            lambda: `return x != id(${makeSafeId(entityId)}).state;`
        },
        then: [{ "homeassistant.action": { action: "homeassistant.toggle", data: { entity_id: entityId } } }]
    }
});

const buildCheckedStateUpdateAction = (widgetId) => `- lvgl.widget.update:
    id: ${widgetId}
    state:
      checked: !lambda return x;`;

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = getColorStyle(props.color || "blue");
    const checked = props.checked || false;
    const text = props.text || "Checkbox";
    const textColor = getColorStyle("theme_auto");

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.gap = "10px";
    el.style.boxSizing = "border-box";
    el.style.padding = "5px";

    const box = document.createElement("div");
    box.style.width = "20px";
    box.style.height = "20px";
    box.style.border = `2px solid ${color}`;
    box.style.borderRadius = "3px";
    box.style.backgroundColor = checked ? color : "#fff";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.flexShrink = "0";

    if (checked) {
        const check = document.createElement("span");
        check.textContent = "✓";
        check.style.color = "#fff";
        check.style.fontSize = "14px";
        check.style.fontWeight = "bold";
        box.appendChild(check);
    }
    el.appendChild(box);

    const label = document.createElement("span");
    label.textContent = text;
    label.style.color = textColor;
    label.style.fontSize = "14px";
    label.style.fontFamily = "Roboto, sans-serif";
    el.appendChild(label);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, _profile }) => {
    const p = w.props || {};

    // Robust entity ID detection
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();
    const checkedState = entityId
        ? `!lambda return id(${makeSafeId(entityId)}).state;`
        : p.checked;

    const checkboxObj = {
        checkbox: {
            ...common,
            text: `"${p.text || 'Checkbox'}"`,
            state: {
                checked: checkedState
            },
            indicator: {
                bg_color: convertColor(p.color || "blue"),
            },
            opa: formatOpacity(p.opa),
            on_value: undefined
        }
    };
    if (entityId) {
        checkboxObj.checkbox.on_value = [buildLoopGuardedToggleAction(entityId)];
    }
    return checkboxObj;
};

const onExportBinarySensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_checkbox") continue;

        let eid = (w.entity_id || w.props?.entity_id || w.props?.entity || "").trim();
        if (!eid) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(eid)) {
                pendingTriggers.set(eid, new Set());
            }
            pendingTriggers.get(eid).add(buildCheckedStateUpdateAction(w.id));
        }
    }
};

export default {
    id: "lvgl_checkbox",
    name: "Checkbox",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        text: "Checkbox",
        checked: false,
        color: "blue",
        opa: 255,
        entity_id: "",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "text", label: "Label Text", type: "text", default: "Checkbox" },
                { key: "entity_id", target: "root", label: "Control Entity ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "checked", label: "Initially Checked", type: "checkbox", default: false },
                { key: "color", label: "Check Color", type: "color", default: "blue" },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportBinarySensors
};
