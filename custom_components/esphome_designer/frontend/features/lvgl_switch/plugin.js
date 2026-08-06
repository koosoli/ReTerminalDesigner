/**
 * LVGL Switch Plugin
 */

import { makeSafeId } from '../../js/utils/export_helpers.js';

const buildLoopGuardedToggleAction = (entityId) => ({
    if: {
        condition: {
            lambda: `return x != id(${makeSafeId(entityId)}).state;`
        },
        then: entityId.startsWith('lock.')
            ? [{ if: {
                condition: { lambda: 'return x;' },
                then: [{ "homeassistant.service": { service: "lock.lock", data: { entity_id: entityId } } }],
                else: [{ "homeassistant.service": { service: "lock.unlock", data: { entity_id: entityId } } }]
            } }]
            : [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: entityId } } }]
    }
});

const buildCheckedStateUpdateAction = (widgetId) => `- lvgl.widget.update:
    id: ${widgetId}
    state:
      checked: !lambda return x;`;

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const checked = props.checked || false;
    const bgColor = getColorStyle(props.bg_color || "gray");
    const indicatorColor = getColorStyle(props.color || "blue");
    const knobColor = getColorStyle(props.knob_color || "white");
    const width = widget.width || 60;
    const height = widget.height || 30;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";

    const track = document.createElement("div");
    track.style.width = `${width}px`;
    track.style.height = `${height}px`;
    track.style.borderRadius = `${height / 2}px`;
    track.style.backgroundColor = checked ? indicatorColor : bgColor;
    track.style.position = "relative";
    track.style.transition = "background-color 0.2s";

    const knob = document.createElement("div");
    const knobSize = height - 4;
    knob.style.width = `${knobSize}px`;
    knob.style.height = `${knobSize}px`;
    knob.style.borderRadius = "50%";
    knob.style.backgroundColor = knobColor;
    knob.style.position = "absolute";
    knob.style.top = "2px";
    knob.style.left = checked ? `${width - knobSize - 2}px` : "2px";
    knob.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
    knob.style.transition = "left 0.2s";

    track.appendChild(knob);
    el.appendChild(track);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, _profile }) => {
    const p = w.props || {};

    // Robust entity ID detection
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();
    const checkedState = entityId
        ? `!lambda return id(${makeSafeId(entityId)}).state;`
        : p.checked;

    const switchObj = {
        switch: {
            ...common,
            state: {
                checked: checkedState
            },
            bg_color: convertColor(p.bg_color),
            indicator: { bg_color: convertColor(p.color) },
            knob: { bg_color: convertColor(p.knob_color) },
            opa: formatOpacity(p.opa),
            on_value: undefined
        }
    };
    if (entityId) {
        switchObj.switch.on_value = [buildLoopGuardedToggleAction(entityId)];
    }
    return switchObj;
};


const onExportBinarySensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_switch") continue;

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
    id: "lvgl_switch",
    name: "Switch / Lock",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        checked: false,
        bg_color: "gray",
        color: "blue",
        knob_color: "white",
        opa: 255,
        entity_id: "",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "entity_id", target: "root", label: "Control Entity ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "checked", label: "Checked", type: "checkbox", default: false },
                { key: "color", label: "Indicator Color", type: "color", default: "blue" },
                { key: "bg_color", label: "Track Color", type: "color", default: "gray" },
                { key: "knob_color", label: "Knob Color", type: "color", default: "white" },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportBinarySensors
};
