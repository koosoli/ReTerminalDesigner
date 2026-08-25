/**
 * LVGL Slider Plugin
 */

const isLightEntity = (entityId) => String(entityId || "").trim().toLowerCase().startsWith("light.");
const isMediaPlayerEntity = (entityId) => String(entityId || "").trim().toLowerCase().startsWith("media_player.");

const getSliderSensorId = (entityId) => String(entityId || "").trim().replace(/[^a-zA-Z0-9_]/g, "_");

const getBrightnessSensorId = (entityId) => `${getSliderSensorId(entityId)}_brightness`;
const getMediaVolumeSensorId = (entityId) => `${getSliderSensorId(entityId)}_volume_level`;

const parseSliderBound = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const getSliderRange = (props = {}) => ({
    min: parseSliderBound(props.min, 0),
    max: parseSliderBound(props.max, 100)
});

const buildLightSliderValueLambda = (sensorId, minValue, maxValue) => {
    return `!lambda |-
      if (!id(${sensorId}).has_state()) return static_cast<float>(${minValue});
      const float slider_min = static_cast<float>(${minValue});
      const float slider_max = static_cast<float>(${maxValue});
      const float brightness = id(${sensorId}).state;
      if (slider_max <= slider_min) return brightness;
      return slider_min + ((brightness / 255.0f) * (slider_max - slider_min));`;
};

const buildLightBrightnessLambda = (minValue, maxValue) => {
    if (minValue === 0 && maxValue === 255) {
        return "!lambda 'return int(x);'";
    }

    return `!lambda |-
      const float raw_x = static_cast<float>(x);
      const float slider_min = static_cast<float>(${minValue});
      const float slider_max = static_cast<float>(${maxValue});
      if (slider_max <= slider_min) return int(raw_x);
      const float clamped = raw_x < slider_min ? slider_min : (raw_x > slider_max ? slider_max : raw_x);
      return int(((clamped - slider_min) * 255.0f) / (slider_max - slider_min));`;
};

const buildLightSliderUpdateAction = (widgetId, minValue, maxValue) => {
    if (minValue === 0 && maxValue === 255) {
        return `- lvgl.slider.update:
    id: ${widgetId}
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x);`;
    }

    return `- lvgl.slider.update:
    id: ${widgetId}
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(${minValue});
      const float raw_x = static_cast<float>(x);
      const float slider_min = static_cast<float>(${minValue});
      const float slider_max = static_cast<float>(${maxValue});
      if (slider_max <= slider_min) return raw_x;
      return slider_min + ((raw_x / 255.0f) * (slider_max - slider_min));`;
};

const buildMediaVolumeSliderValueLambda = (sensorId, minValue, maxValue) => {
    return `!lambda |-
      if (!id(${sensorId}).has_state()) return static_cast<float>(${minValue});
      const float slider_min = static_cast<float>(${minValue});
      const float slider_max = static_cast<float>(${maxValue});
      const float volume = id(${sensorId}).state * 100.0f;
      if (slider_max <= slider_min) return volume;
      return slider_min + ((volume / 100.0f) * (slider_max - slider_min));`;
};

const buildMediaVolumeSliderUpdateAction = (widgetId, minValue, maxValue) => {
    if (minValue === 0 && maxValue === 100) {
        return `- lvgl.slider.update:
    id: ${widgetId}
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x * 100.0f);`;
    }

    return `- lvgl.slider.update:
    id: ${widgetId}
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(${minValue});
      const float slider_min = static_cast<float>(${minValue});
      const float slider_max = static_cast<float>(${maxValue});
      const float volume = static_cast<float>(x * 100.0f);
      if (slider_max <= slider_min) return volume;
      return slider_min + ((volume / 100.0f) * (slider_max - slider_min));`;
};

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const fgColor = getColorStyle(props.color || "black");
    const bgColor = getColorStyle(props.bg_color || "gray");
    const borderWidth = props.border_width || 2;
    const isVertical = props.vertical || false;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";

    const min = props.min || 0;
    const max = props.max || 100;
    const val = props.value !== undefined ? props.value : 30;
    const range = max - min;
    const pct = Math.max(0, Math.min(100, ((val - min) / (range || 1)) * 100));

    const trackC = document.createElement("div");
    trackC.style.position = "relative";
    trackC.style.backgroundColor = bgColor;
    trackC.style.borderRadius = "10px";

    if (isVertical) {
        trackC.style.width = "30%";
        trackC.style.height = "100%";
        el.style.flexDirection = "column";
    } else {
        trackC.style.width = "100%";
        trackC.style.height = "30%";
    }

    el.appendChild(trackC);

    const indicator = document.createElement("div");
    indicator.style.position = "absolute";
    indicator.style.backgroundColor = fgColor;
    indicator.style.borderRadius = "10px";

    if (isVertical) {
        indicator.style.left = "0";
        indicator.style.bottom = "0";
        indicator.style.width = "100%";
        indicator.style.height = `${pct}%`;
    } else {
        indicator.style.left = "0";
        indicator.style.top = "0";
        indicator.style.height = "100%";
        indicator.style.width = `${pct}%`;
    }
    trackC.appendChild(indicator);

    const knob = document.createElement("div");
    const knobSize = isVertical ? widget.width * 0.8 : widget.height * 0.8;
    knob.style.width = `${knobSize}px`;
    knob.style.height = `${knobSize}px`;
    knob.style.backgroundColor = fgColor;
    knob.style.border = `${borderWidth}px solid white`;
    knob.style.borderRadius = "50%";
    knob.style.position = "absolute";

    if (isVertical) {
        knob.style.left = `calc(50% - ${knobSize / 2}px)`;
        knob.style.bottom = `calc(${pct}% - ${knobSize / 2}px)`;
    } else {
        knob.style.left = `calc(${pct}% - ${knobSize / 2}px)`;
        knob.style.top = `calc(50% - ${knobSize / 2}px)`;
    }

    trackC.appendChild(knob);
};

const exportLVGL = (w, { common, convertColor, profile }) => {
    const p = w.props || {};
    const hasTouch = profile?.touch; // eslint-disable-line no-unused-vars
    const { min: minValue, max: maxValue } = getSliderRange(p);
    let sliderValue = p.value || 30;
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();
    const normalizedEntityId = entityId.toLowerCase();

    if (entityId) {
        if (isLightEntity(entityId)) {
            const brightnessSensorId = getBrightnessSensorId(entityId);
            sliderValue = buildLightSliderValueLambda(brightnessSensorId, minValue, maxValue);
        } else if (isMediaPlayerEntity(entityId)) {
            const volumeSensorId = getMediaVolumeSensorId(entityId);
            sliderValue = buildMediaVolumeSliderValueLambda(volumeSensorId, minValue, maxValue);
        } else {
            sliderValue = `!lambda "return id(${getSliderSensorId(entityId)}).state;"`;
        }
    }

    const sliderObj = {
        slider: {
            ...common,
            min_value: minValue,
            max_value: maxValue,
            value: sliderValue,
            border_width: p.border_width || 2,
            bg_color: convertColor(p.bg_color || "gray"),
            indicator: { bg_color: convertColor(p.color) },
            knob: { bg_color: convertColor(p.color), border_width: 2, border_color: "0xFFFFFF" },
            mode: p.mode || "normal",
            on_value: undefined
        }
    };

    if (entityId) {
        let serviceCall;
        if (isLightEntity(entityId)) {
            const brightnessValue = buildLightBrightnessLambda(minValue, maxValue);
            serviceCall = {
                "if": {
                    condition: { lambda: "return x <= 0;" },
                    then: [
                        { "homeassistant.action": { action: "light.turn_off", data: { entity_id: entityId } } }
                    ],
                    else: [
                        { "homeassistant.action": { action: "light.turn_on", data: { entity_id: entityId, brightness: brightnessValue } } }
                    ]
                }
            };
        } else if (normalizedEntityId.startsWith("fan.")) {
            serviceCall = { "homeassistant.action": { action: "fan.set_percentage", data: { entity_id: entityId, percentage: "!lambda 'return x;'" } } };
        } else if (normalizedEntityId.startsWith("cover.")) {
            serviceCall = { "homeassistant.action": { action: "cover.set_cover_position", data: { entity_id: entityId, position: "!lambda 'return x;'" } } };
        } else if (normalizedEntityId.startsWith("media_player.")) {
            serviceCall = { "homeassistant.action": { action: "media_player.volume_set", data: { entity_id: entityId, volume_level: "!lambda 'return x / 100.0;'" } } };
        } else if (normalizedEntityId.startsWith("climate.")) {
            serviceCall = { "homeassistant.action": { action: "climate.set_temperature", data: { entity_id: entityId, temperature: "!lambda 'return x;'" } } };
        } else {
            serviceCall = { "homeassistant.action": { action: "number.set_value", data: { entity_id: entityId, value: "!lambda 'return x;'" } } };
        }
        if (isLightEntity(entityId)) {
            sliderObj.slider.on_release = [serviceCall];
            delete sliderObj.slider.on_value;
        } else {
            sliderObj.slider.on_value = [serviceCall];
        }
    }
    return sliderObj;
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers, lines, seenEntityIds, seenSensorIds } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_slider") continue;

        const eid = (w.entity_id || w.props?.entity_id || w.props?.entity || "").trim();
        if (!eid) continue;

        const { min: minValue, max: maxValue } = getSliderRange(w.props || {});

        if (isLightEntity(eid)) {
            const sensorId = getBrightnessSensorId(eid);
            const entityKey = `${eid}__attr__brightness`;
            if (seenEntityIds && !seenEntityIds.has(entityKey)) {
                seenEntityIds.add(entityKey);
                if (seenSensorIds && !seenSensorIds.has(sensorId)) {
                    seenSensorIds.add(sensorId);
                    lines.push(
                        "- platform: homeassistant",
                        `  id: ${sensorId}`,
                        `  entity_id: ${eid}`,
                        "  attribute: brightness",
                        "  internal: true"
                    );
                }
            }
        } else if (isMediaPlayerEntity(eid)) {
            const sensorId = getMediaVolumeSensorId(eid);
            const entityKey = `${eid}__attr__volume_level`;
            if (seenEntityIds && !seenEntityIds.has(entityKey)) {
                seenEntityIds.add(entityKey);
                if (seenSensorIds && !seenSensorIds.has(sensorId)) {
                    seenSensorIds.add(sensorId);
                    lines.push(
                        "- platform: homeassistant",
                        `  id: ${sensorId}`,
                        `  entity_id: ${eid}`,
                        "  attribute: volume_level",
                        "  internal: true"
                    );
                }
            }
        }

        if (isLvgl && pendingTriggers) {
            const triggerKey = isLightEntity(eid)
                ? getBrightnessSensorId(eid)
                : (isMediaPlayerEntity(eid) ? getMediaVolumeSensorId(eid) : eid);
            if (!pendingTriggers.has(triggerKey)) {
                pendingTriggers.set(triggerKey, new Set());
            }
            pendingTriggers.get(triggerKey).add(
                isLightEntity(eid)
                    ? buildLightSliderUpdateAction(w.id, minValue, maxValue)
                    : (isMediaPlayerEntity(eid)
                        ? buildMediaVolumeSliderUpdateAction(w.id, minValue, maxValue)
                        : `- lvgl.widget.refresh: ${w.id}`)
            );
        }
    }
};

export default {
    id: "lvgl_slider",
    name: "Slider",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        value: 30,
        min: 0,
        max: 100,
        color: "blue",
        bg_color: "gray",
        border_width: 2,
        mode: "normal",
        vertical: false,
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
            section: "Range",
            fields: [
                { key: "value", label: "Value", type: "number", default: 30 },
                { key: "min", label: "Min Value", type: "number", default: 0 },
                { key: "max", label: "Max Value", type: "number", default: 100 },
                { key: "mode", label: "Mode", type: "select", options: ["normal", "symmetrical", "range"], default: "normal" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Main Color", type: "color", default: "blue" },
                { key: "bg_color", label: "Track Color", type: "color", default: "gray" },
                { key: "border_width", label: "Knob Border", type: "number", default: 2 },
                { key: "vertical", label: "Vertical Orientation", type: "checkbox", default: false },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportNumericSensors
};
