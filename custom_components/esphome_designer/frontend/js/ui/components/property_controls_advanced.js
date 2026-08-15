import { AppState } from '../../core/state';

export {
    addPageSelectorControl as addPageSelector,
    addDropShadowButtonControl as addDropShadowButton,
    addSectionLabelControl as addSectionLabel
} from './property_controls_compound_helpers.js';
export {
    addIconInputControl as addIconInput,
    addLabeledInputWithIconPickerControl as addLabeledInputWithIconPicker,
    addLabeledInputWithDataListControl as addLabeledInputWithDataList
} from './property_controls_picker_helpers.js';

export function addCommonLVGLProperties(controls, widget, props) {
    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    controls.panel.createSection("Common LVGL", false);

    const flagContainer = document.createElement("div");
    flagContainer.style.display = "grid";
    flagContainer.style.gridTemplateColumns = "1fr 1fr";
    flagContainer.style.gap = "4px";

    controls.getContainer().appendChild(flagContainer);

    const addFlag = (label, key, def = false) => {
        const wrap = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = props[key] !== undefined ? props[key] : def;
        checkbox.addEventListener("change", () => updateProp(key, checkbox.checked));
        const lbl = document.createElement("span");
        lbl.textContent = " " + label;
        lbl.style.fontSize = "10px";
        wrap.appendChild(checkbox);
        wrap.appendChild(lbl);
        flagContainer.appendChild(wrap);
    };

    addFlag("Hidden", "hidden", false);
    addFlag("Clickable", "clickable", true);
    addFlag("Checkable", "checkable", false);
    addFlag("Scrollable", "scrollable", true);
    addFlag("Floating", "floating", false);
    addFlag("Ignore Layout", "ignore_layout", false);

    controls.addSelect("Scrollbar Mode", props.scrollbar_mode || "AUTO", ["AUTO", "ON", "OFF", "ACTIVE"], (value) => updateProp("scrollbar_mode", value));
    controls.panel.endSection();
}

export function addVisibilityConditions(controls, widget) {
    widget.condition_entity = widget.condition_entity || "";
    widget.condition_operator = widget.condition_operator || "==";
    widget.condition_state = widget.condition_state || "";
    widget.condition_min = widget.condition_min || "";
    widget.condition_max = widget.condition_max || "";

    const helpWrap = document.createElement("div");
    helpWrap.className = "field";
    helpWrap.style.fontSize = "9px";
    helpWrap.style.color = "#9499a6";
    helpWrap.style.marginBottom = "6px";
    helpWrap.innerHTML = "Show/hide this widget based on an entity's state.";
    controls.getContainer().appendChild(helpWrap);

    controls.addLabeledInputWithPicker("Condition Entity", "text", widget.condition_entity, (value) => {
        AppState.updateWidget(widget.id, { condition_entity: value });
    }, widget, { skipAutoUpdate: true });

    const operators = ["==", "!=", "<", ">", "<=", ">="];
    controls.addSelect("Operator", widget.condition_operator, operators, (value) => {
        AppState.updateWidget(widget.id, { condition_operator: value });
    });

    const commonStates = ["on", "off", "open", "closed", "true", "false", "home", "not_home", "locked", "unlocked", "active", "inactive", "detected", "clear", "occupied"];
    controls.addLabeledInputWithDataList("Condition State", "text", widget.condition_state, commonStates, (value) => {
        AppState.updateWidget(widget.id, { condition_state: value });
    });

    controls.addLabeledInput("Min Value (Range)", "text", widget.condition_min, (value) => {
        AppState.updateWidget(widget.id, { condition_min: value });
    });

    controls.addLabeledInput("Max Value (Range)", "text", widget.condition_max, (value) => {
        AppState.updateWidget(widget.id, { condition_max: value });
    });

    const clearWrap = document.createElement("div");
    clearWrap.className = "field";
    clearWrap.style.marginTop = "8px";

    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-secondary btn-full";
    clearBtn.textContent = "Clear Condition";
    clearBtn.type = "button";
    clearBtn.addEventListener("click", () => {
        AppState.updateWidget(widget.id, {
            condition_entity: "",
            condition_operator: "==",
            condition_state: "",
            condition_min: "",
            condition_max: ""
        });
    });

    clearWrap.appendChild(clearBtn);
    controls.getContainer().appendChild(clearWrap);
}

export function addLVGLStateTriggerControls(controls, widget) {
    const props = widget.props || {};
    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    controls.panel.createSection("State Trigger", false);

    const helpWrap = document.createElement("div");
    helpWrap.className = "field";
    helpWrap.style.fontSize = "9px";
    helpWrap.style.color = "#9499a6";
    helpWrap.style.marginBottom = "6px";
    helpWrap.innerHTML = "Add a supported Home Assistant trigger that round-trips with the canvas. Paste the YAML actions exactly as they belong under <code>then:</code>.";
    controls.getContainer().appendChild(helpWrap);

    controls.addLabeledInputWithPicker("Trigger Entity", "text", props.state_trigger_entity || "", (value) => {
        updateProp("state_trigger_entity", value);
    }, widget, { skipAutoUpdate: true });

    controls.addSelect("Trigger Type", props.state_trigger_mode || "auto", [
        { value: "auto", label: "Auto (binary uses on_state)" },
        { value: "on_state", label: "State Change (binary)" },
        { value: "on_value", label: "Value Change" }
    ], (value) => {
        updateProp("state_trigger_mode", value);
    });

    controls.addLabeledInput("Actions YAML", "textarea", props.state_trigger_actions || "", (value) => {
        updateProp("state_trigger_actions", value);
    });

    const clearWrap = document.createElement("div");
    clearWrap.className = "field";
    clearWrap.style.marginTop = "8px";

    const clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-secondary btn-full";
    clearBtn.textContent = "Clear State Trigger";
    clearBtn.type = "button";
    clearBtn.addEventListener("click", () => {
        AppState.updateWidget(widget.id, {
            props: {
                ...widget.props,
                state_trigger_entity: "",
                state_trigger_mode: "auto",
                state_trigger_actions: ""
            }
        });
    });

    clearWrap.appendChild(clearBtn);
    controls.getContainer().appendChild(clearWrap);
    controls.panel.endSection();
}
