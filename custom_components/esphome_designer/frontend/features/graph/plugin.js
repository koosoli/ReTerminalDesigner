/**
 * Graph Plugin
 */
import { AppState } from '@core/state';
import { clampFontWeight, getWeightsForFont } from '@core/font_weights.js';
import { FONT_OPTIONS } from '../../js/core/properties/legacy_renderer_widget_properties_shared.js';
import {
    buildGraphHistoryTemplateEntityId,
    buildGraphHistoryTemplateFilename,
    buildGraphHistoryTemplateYaml
} from './history_template.js';
import { render } from './render.js';
import {
    exportLVGL,
    exportDoc,
    onExportComponents,
    onExportEsphome,
    onExportGlobals,
    onExportNumericSensors,
    onExportTextSensors
} from './exports.js';

const BUILT_IN_FONT_OPTIONS = FONT_OPTIONS.filter((option) => option !== "Custom...");
const DURATION_PRESET_OPTIONS = [
    { value: '15min', label: '15 Minutes' },
    { value: '30min', label: '30 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '3h', label: '3 Hours' },
    { value: '6h', label: '6 Hours' },
    { value: '12h', label: '12 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '3d', label: '3 Days' },
    // ESPHome time periods have no "week" unit, so weeks are expressed in days.
    { value: '7d', label: '1 Week' },
    { value: '14d', label: '2 Weeks' },
    { value: 'custom', label: 'Custom...' }
];

/**
 * @param {string} text
 * @param {HTMLButtonElement} button
 * @param {string} idleText
 * @returns {Promise<void>}
 */
const copyTextToClipboard = async (text, button, idleText) => {
    const setLabel = (label) => {
        button.textContent = label;
        window.setTimeout(() => {
            button.textContent = idleText;
        }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            setLabel('Copied');
            return;
        } catch {
            // Fall through to the legacy copy path.
        }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        if (document.execCommand('copy')) {
            setLabel('Copied');
        } else {
            setLabel('Error');
        }
    } catch {
        setLabel('Error');
    } finally {
        document.body.removeChild(textarea);
    }
};

/**
 * @param {Record<string, any>} panel
 * @param {GraphWidget} widget
 * @returns {void}
 */
const appendHistoryTemplateButtons = (panel, widget) => {
    const sourceEntity = (widget.entity_id || '').trim();
    const helperEntityId = buildGraphHistoryTemplateEntityId(widget);
    const helperYaml = buildGraphHistoryTemplateYaml(widget);
    const fileName = buildGraphHistoryTemplateFilename(widget);
    const canGenerate = !!sourceEntity && !sourceEntity.toLowerCase().startsWith('mqtt:');

    const buttonRow = document.createElement('div');
    buttonRow.style.display = 'flex';
    buttonRow.style.gap = '8px';
    buttonRow.style.marginTop = '12px';

    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-secondary btn-full btn-xs';
    copyButton.textContent = 'Copy HA YAML';
    copyButton.title = 'Copy the Home Assistant helper package';
    copyButton.style.flex = '1';
    copyButton.disabled = !canGenerate;
    copyButton.addEventListener('click', () => {
        void copyTextToClipboard(helperYaml, copyButton, 'Copy HA YAML');
    });

    const downloadButton = document.createElement('button');
    downloadButton.className = 'btn btn-secondary btn-full btn-xs';
    downloadButton.textContent = 'Download YAML';
    downloadButton.title = 'Download the Home Assistant helper package';
    downloadButton.style.flex = '1';
    downloadButton.disabled = !canGenerate;
    downloadButton.addEventListener('click', () => {
        const blob = new Blob([helperYaml], { type: 'text/yaml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
    });

    buttonRow.appendChild(copyButton);
    buttonRow.appendChild(downloadButton);
    panel.getContainer().appendChild(buttonRow);

    if (canGenerate) {
        panel.addHint(`Starter package ready. After importing it into Home Assistant, set this graph's Entity ID to <code>${helperEntityId}</code>.`);
    } else {
        panel.addHint('Pick a Home Assistant entity first to generate a history helper package. MQTT topics are not supported for this helper.');
    }
};

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, title?: string }} GraphWidget */

/**
 * @param {Record<string, any>} panel
 * @param {GraphWidget} widget
 */
const renderProperties = (panel, widget) => {
    const props = widget.props || {};

    /** @param {string} key @param {unknown} val */
    const updateProp = (key, val) => {
        const newProps = { ...widget.props, [key]: val };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    /** @param {string} key */
    const setTextProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, String(value));
    /** @param {string} key */
    const setIntProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, parseInt(String(value), 10));
    /** @param {string} key */
    const setBoolProp = (key) => /** @param {boolean} value */ (value) => updateProp(key, value);

    panel.createSection("Data Source", true);
    panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { entity_id: value });
    }, widget);

    panel.addCheckbox("Is Local Sensor", !!props.is_local_sensor, setBoolProp("is_local_sensor"));
    panel.addLabeledInput("Title", "text", widget.title || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { title: value });
    });
    const duration = props.duration || "1h";
    const selectedDurationPreset = DURATION_PRESET_OPTIONS.some((option) => option.value === duration) ? duration : 'custom';
    panel.addSelect("Duration Preset", selectedDurationPreset, DURATION_PRESET_OPTIONS, (value) => {
        if (value !== 'custom') {
            updateProp('duration', value);
        }
    });
    panel.addLabeledInput("Duration", "text", duration, setTextProp("duration"));
    panel.addHint("Pick a preset or enter a custom span like 90min, 12h, or 7d. ESPHome has no week unit, so use 7d instead of 1w.");
    panel.addHint("The device collects data from boot. The graph fills up over the configured duration.");
    panel.endSection();

    panel.createSection("Advanced: HA History Attribute", false);
    panel.addCheckbox("Read History from HA Attribute", !!props.use_ha_history, setBoolProp("use_ha_history"));
    if (props.use_ha_history) {
        panel.addLabeledInput("HA Attribute", "text", props.history_attribute || "history", setTextProp("history_attribute"));
        panel.addLabeledInput("Points to keep", "number", props.history_points || 100, setIntProp("history_points"));
        panel.addCheckbox("Smooth Data (Moving Avg)", !!props.history_smoothing, setBoolProp("history_smoothing"));
        panel.addHint('Warning: <span style="color:orange">Requires a custom HA template sensor that exposes history as a JSON array attribute.</span> Standard HA entities do not have this attribute by default.');
        appendHistoryTemplateButtons(panel, widget);
    }
    panel.endSection();

    panel.createSection("Appearance", true);
    panel.addCheckbox("Auto-scale Y Axis", props.auto_scale !== false, setBoolProp("auto_scale"));

    panel.addCompactPropertyRow(() => {
        const isAuto = props.auto_scale !== false;
        panel.addLabeledInput(isAuto ? "Min (Override)" : "Min Value", "number", props.min_value !== undefined ? props.min_value : "", setTextProp("min_value"));
        panel.addLabeledInput(isAuto ? "Max (Override)" : "Max Value", "number", props.max_value !== undefined ? props.max_value : "", setTextProp("max_value"));
    });

    if (props.auto_scale !== false) {
        panel.addLabeledInput("Min Range", "number", props.min_range || "10", setTextProp("min_range"));
        panel.addHint("Min/Max inputs override auto-scaling for that bound. Min Range ensures minimum spread.");
    } else {
        panel.addHint("Fixed Y-axis bounds.");
    }
    panel.addCompactPropertyRow(() => {
        panel.addLabeledInput("Max Range", "number", props.max_range || "", setTextProp("max_range"));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, setIntProp("opacity"));
    });

    panel.addColorSelector("Line Color", props.color || "theme_auto", null, setTextProp("color"));
    panel.addSelect("Line Type", props.line_type || "SOLID", ["SOLID", "DASHED", "DOTTED"], setTextProp("line_type"));
    panel.addLabeledInput("Line Thickness", "number", props.line_thickness || 3, setIntProp("line_thickness"));
    panel.addCheckbox("Continuous Line", props.continuous !== false, setBoolProp("continuous"));
    panel.addColorSelector("Background", props.background_color || "transparent", null, setTextProp("background_color"));
    panel.endSection();

    panel.createSection("Typography", false);
    const fontFamily = props.font_family || "Roboto";
    const fontWeight = clampFontWeight(fontFamily, parseInt(String(props.font_weight || 400), 10) || 400);
    panel.addSelect("Font Family", fontFamily, BUILT_IN_FONT_OPTIONS, (value) => {
        const nextWeight = clampFontWeight(value, parseInt(String(props.font_weight || 400), 10) || 400);
        AppState.updateWidget(widget.id, {
            props: {
                ...widget.props,
                font_family: value,
                font_weight: nextWeight
            }
        });
    });
    panel.addSelect("Font Weight", fontWeight, getWeightsForFont(fontFamily), (value) => updateProp("font_weight", parseInt(String(value), 10)));
    panel.addLabeledInput("Font Size", "number", props.font_size || 12, setIntProp("font_size"));
    panel.endSection();

    panel.createSection("Grid Style", false);
    panel.addCheckbox("Show Grid", props.grid !== false, setBoolProp("grid"));
    panel.addLabeledInput("X Grid Interval", "text", props.x_grid || "", setTextProp("x_grid"));
    panel.addLabeledInput("Y Grid Step", "number", props.y_grid || "", setTextProp("y_grid"));
    panel.addHint("X Grid is a time span, not a line count: <code>24h</code> draws one vertical line per day (set Duration to <code>7d</code> for a week of days). Y Grid is a step in sensor units, e.g. <code>5</code>.");
    panel.addHint("Leave empty for an auto-grid of 4 divisions.");
    panel.endSection();

    panel.createSection("Border Style", false);
    panel.addLabeledInput("Border Width", "number", props.border_width !== undefined ? props.border_width : (props.border !== false ? 2 : 0), setIntProp("border_width"));
    panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, setTextProp("border_color"));
    panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, setIntProp("border_radius"));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
};

export default {
    id: "graph",
    name: "Graph / Chart",
    category: "Advanced",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this widget
    // requires significant C++ logic/global arrays which are not yet supported
    // in those modes.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        width: 205,
        height: 100,
        duration: "1h",
        entity_id: "",
        border: true,
        grid: true,
        color: "theme_auto",
        background_color: "transparent",
        title: "",
        font_family: "Roboto",
        font_size: 12,
        font_weight: 400,
        x_grid: "",
        y_grid: "",
        line_thickness: 3,
        line_type: "SOLID",
        continuous: true,
        min_value: "",
        max_value: "",
        is_local_sensor: false,
        opa: 255
    },
    renderProperties,
    render,
    exportLVGL,
    export: exportDoc,
    onExportComponents,
    onExportNumericSensors,
    onExportGlobals,
    onExportEsphome,
    onExportTextSensors
};
