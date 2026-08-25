import { AppState } from '@core/state';
import { getWeightsForFont, clampFontWeight } from '../../js/core/font_weights.js';
import { DAY_LANGUAGE_OPTIONS, DEFAULT_DAY_LANGUAGE } from './day_labels.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string }} WeatherForecastWidget */

/**
 * @param {string} weatherEntity
 * @param {string | number} slot
 * @param {string} unitSymbol
 * @returns {string}
 */
const buildRelativeHourlyHelperYaml = (weatherEntity, slot, unitSymbol) => `
      - name: 'Weather Forecast Plus ${slot}h High'
        unique_id: weather_forecast_plus_${slot}h
        default_entity_id: sensor.weather_forecast_plus_${slot}h
        unit_of_measurement: '${unitSymbol}'
        state: >
          {% set fc = hourly['${weatherEntity}'].forecast %}
          {% set target = as_timestamp((now() + timedelta(hours=${slot})).replace(minute=0, second=0, microsecond=0)) %}
          {% set ns = namespace(hit=none) %}
          {% for f in fc if ns.hit is none %}
            {% if as_timestamp(f.datetime) == target %}
              {% set ns.hit = f %}
            {% endif %}
          {% endfor %}
          {{ ns.hit.temperature if ns.hit else 'N/A' }}
      - name: 'Weather Forecast Plus ${slot}h Condition'
        unique_id: weather_forecast_plus_${slot}h_condition
        default_entity_id: sensor.weather_forecast_plus_${slot}h_condition
        state: >
          {% set fc = hourly['${weatherEntity}'].forecast %}
          {% set target = as_timestamp((now() + timedelta(hours=${slot})).replace(minute=0, second=0, microsecond=0)) %}
          {% set ns = namespace(hit=none) %}
          {% for f in fc if ns.hit is none %}
            {% if as_timestamp(f.datetime) == target %}
              {% set ns.hit = f %}
            {% endif %}
          {% endfor %}
          {{ ns.hit.condition if ns.hit else 'unknown' }}`;

/**
 * @param {string} weatherEntity
 * @param {string} slot
 * @param {string} unitSymbol
 * @returns {string}
 */
const buildFixedHourlyHelperYaml = (weatherEntity, slot, unitSymbol) => {
    const paddedSlot = String(slot).padStart(2, '0');
    return `
      - name: 'Weather Forecast Hour ${slot}00 High'
        unique_id: weather_forecast_hour_${slot}00
        default_entity_id: sensor.weather_forecast_hour_${slot}00
        unit_of_measurement: '${unitSymbol}'
        state: >
          {% set fc = hourly['${weatherEntity}'].forecast %}
          {% set target = today_at('${paddedSlot}:00') %}
          {% set target = target + timedelta(days=1) if now() > target + timedelta(hours=1) else target %}
          {% set target_ts = as_timestamp(target) %}
          {% set ns = namespace(hit=none) %}
          {% for f in fc if ns.hit is none %}
            {% if as_timestamp(f.datetime) == target_ts %}
              {% set ns.hit = f %}
            {% endif %}
          {% endfor %}
          {{ ns.hit.temperature if ns.hit else 'N/A' }}
      - name: 'Weather Forecast Hour ${slot}00 Condition'
        unique_id: weather_forecast_hour_${slot}00_condition
        default_entity_id: sensor.weather_forecast_hour_${slot}00_condition
        state: >
          {% set fc = hourly['${weatherEntity}'].forecast %}
          {% set target = today_at('${paddedSlot}:00') %}
          {% set target = target + timedelta(days=1) if now() > target + timedelta(hours=1) else target %}
          {% set target_ts = as_timestamp(target) %}
          {% set ns = namespace(hit=none) %}
          {% for f in fc if ns.hit is none %}
            {% if as_timestamp(f.datetime) == target_ts %}
              {% set ns.hit = f %}
            {% endif %}
          {% endfor %}
          {{ ns.hit.condition if ns.hit else 'unknown' }}`;
};

/**
 * @param {Record<string, any>} panel
 * @param {WeatherForecastWidget} widget
 */
export const renderProperties = (panel, widget) => {
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

    const mode = props.forecast_mode || "daily";
    const hourlyMode = props.hourly_mode || "fixed";

    panel.createSection("Weather Data", true);
    panel.addLabeledInputWithPicker("Weather Entity ID", "text", widget.entity_id || props.weather_entity || "weather.forecast_home", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { entity_id: value });
    }, widget);

    panel.addSelect("Forecast Mode", mode, [
        { value: "daily", label: "Daily Forecast" },
        { value: "hourly", label: "Hourly Forecast" }
    ], setTextProp("forecast_mode"));
    panel.addSelect("Day Language", props.day_language || DEFAULT_DAY_LANGUAGE, DAY_LANGUAGE_OPTIONS, setTextProp("day_language"));
    panel.addHint("Controls both the preview day labels and generated firmware labels. Auto uses the current browser locale when exporting.");

    if (mode === "hourly") {
        panel.addSelect("Hourly Mode", hourlyMode, [
            { value: "fixed", label: "Fixed Hours" },
            { value: "relative", label: "Relative (e.g. +1h, +2h...)" }
        ], setTextProp("hourly_mode"));

        if (hourlyMode === "relative") {
            panel.addNumberWithSlider("Hours Ahead", props.relative_count || 5, 1, 12, setIntProp("relative_count"));
            panel.addHint("Shows forecasts for the next N hours from the current time.");
        } else {
            panel.addLabeledInput("Hourly Slots (comma-sep)", "text", props.hourly_slots || "06,09,12,15,18,21", setTextProp("hourly_slots"));
            panel.addHint("Hours to show, e.g. 06,09,12,15,18,21. Uses 24h format.");
            panel.addLabeledInput("Start Offset", "number", props.start_offset || 0, setIntProp("start_offset"));
            panel.addHint("Skip the first N slots (e.g. 1 to skip 06:00).");
        }
    } else {
        panel.addNumberWithSlider("Forecast Days", props.days || 5, 1, 14, setIntProp("days"));
        panel.addLabeledInput("Start Offset", "number", props.start_offset || 0, setIntProp("start_offset"));
        panel.addHint("0 = Today, 1 = Tomorrow, etc.");
    }

    panel.addSelect("Unit", props.temp_unit || "C", ["C", "F"], setTextProp("temp_unit"));
    panel.addLabeledInput("Temp Precision", "number", props.precision !== undefined ? props.precision : 1, setIntProp("precision"));

    /** @type {HTMLDivElement} */
    const btnGroup = document.createElement("div");
    btnGroup.style.display = "flex";
    btnGroup.style.gap = "8px";
    btnGroup.style.marginTop = "12px";

    /** @type {HTMLButtonElement} */
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn btn-secondary btn-full btn-xs";
    copyBtn.textContent = "Copy HA YAML";
    copyBtn.title = "Copy HA Template YAML to Clipboard";
    copyBtn.style.flex = "1";
    copyBtn.addEventListener("click", () => {
        const weatherEntity = widget.entity_id || props.weather_entity || "weather.forecast_home";
        const unitSymbol = (props.temp_unit || "C") === "F" ? "Â°F" : "Â°C";
        let yaml = "";

        if (mode === "hourly") {
            const activeHourlyMode = props.hourly_mode || "fixed";

            yaml = `
# Add to Home Assistant configuration.yaml
template:
  - trigger:
      - trigger: time_pattern
        minutes: "/30"
      - trigger: homeassistant
        event: start
    action:
      - action: weather.get_forecasts
        target:
          entity_id: ${weatherEntity}
        data:
          type: hourly
        response_variable: hourly
    sensor:`;

            if (activeHourlyMode === "relative") {
                const relativeCount = parseInt(String(props.relative_count || 5), 10);
                for (let index = 1; index <= relativeCount; index += 1) {
                    yaml += buildRelativeHourlyHelperYaml(weatherEntity, index, unitSymbol);
                }
            } else {
                const hourlySlots = (props.hourly_slots || "06,09,12,15,18,21")
                    .split(',')
                    .map((/** @type {string} */ slot) => slot.trim())
                    .filter(Boolean);
                const startOff = parseInt(String(props.start_offset || 0), 10);
                const slots = hourlySlots.slice(startOff);

                slots.forEach((/** @type {string} */ slot) => {
                    yaml += buildFixedHourlyHelperYaml(weatherEntity, slot, unitSymbol);
                });
            }
        } else {
            const days = Math.min(14, Math.max(1, parseInt(String(props.days), 10) || 5));
            yaml = `
# Add to Home Assistant configuration.yaml
template:
  - trigger:
      - trigger: state
        entity_id: ${weatherEntity}
      - trigger: time_pattern
        hours: "/1"
    action:
      - action: weather.get_forecasts
        target:
          entity_id: ${weatherEntity}
        data:
          type: daily
        response_variable: forecast_data
    sensor:`;

            for (let index = 0; index < days; index += 1) {
                yaml += `
      - name: 'Weather Forecast Day ${index} High'
        unique_id: weather_forecast_day_${index}_high
        default_entity_id: sensor.weather_forecast_day_${index}_high
        unit_of_measurement: '${unitSymbol}'
        state: '{{ forecast_data["${weatherEntity}"].forecast[${index}].temperature | default("N/A") }}'
      - name: 'Weather Forecast Day ${index} Low'
        unique_id: weather_forecast_day_${index}_low
        default_entity_id: sensor.weather_forecast_day_${index}_low
        unit_of_measurement: '${unitSymbol}'
        state: '{{ forecast_data["${weatherEntity}"].forecast[${index}].templow | default("N/A") }}'
      - name: 'Weather Forecast Day ${index} Condition'
        unique_id: weather_forecast_day_${index}_condition
        default_entity_id: sensor.weather_forecast_day_${index}_condition
        state: '{{ forecast_data["${weatherEntity}"].forecast[${index}].condition | default("cloudy") }}'`;
            }
        }

        const textToCopy = yaml.trim();
        const originalText = "Copy HA YAML";

        const setSuccessState = () => {
            copyBtn.textContent = "âœ“ Copied";
            setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
        };

        const setErrorState = () => {
            copyBtn.textContent = "âœ— Error";
            setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(setSuccessState).catch(setErrorState);
        } else {
            /** @type {HTMLTextAreaElement} */
            const textarea = document.createElement("textarea");
            textarea.value = textToCopy;
            textarea.style.position = "fixed";
            textarea.style.left = "-999999px";
            textarea.style.top = "-999999px";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                if (document.execCommand("copy")) {
                    setSuccessState();
                } else {
                    setErrorState();
                }
            } catch {
                setErrorState();
            }
            document.body.removeChild(textarea);
        }
    });

    btnGroup.appendChild(copyBtn);
    panel.getContainer().appendChild(btnGroup);
    panel.addHint("Detailed YAML is also generated in the ESPHome export comments.");
    panel.endSection();

    panel.createSection("Layout", true);
    panel.addSelect("Layout Mode", props.layout || "horizontal", ["horizontal", "vertical"], setTextProp("layout"));
    if (mode !== "hourly") {
        panel.addCheckbox("Show High/Low", props.show_high_low !== false, setBoolProp("show_high_low"));
    }
    panel.addLabeledInput("Weather Icon Size", "number", props.icon_size || 32, setIntProp("icon_size"));
    panel.endSection();

    panel.createSection("Typography", false);
    const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
    const currentFont = props.font_family || "Roboto";
    const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

    panel.addSelect("Font Family", isCustom ? "Custom..." : currentFont, fontOptions, (/** @type {string} */ value) => {
        if (value !== "Custom...") {
            const newProps = { ...props };
            newProps.font_family = value;
            newProps.custom_font_family = "";
            newProps.font_weight_day = clampFontWeight(value, newProps.font_weight_day || 700);
            newProps.font_weight_temp = clampFontWeight(value, newProps.font_weight_temp || 400);
            AppState.updateWidget(widget.id, { props: newProps });
        } else {
            updateProp("font_family", "Custom...");
        }
    });

    if (isCustom || props.font_family === "Custom...") {
        panel.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (/** @type {string} */ value) => {
            const newProps = { ...props };
            newProps.font_family = value || "Roboto";
            newProps.custom_font_family = value;
            newProps.font_weight_day = clampFontWeight(newProps.font_family, newProps.font_weight_day || 700);
            newProps.font_weight_temp = clampFontWeight(newProps.font_family, newProps.font_weight_temp || 400);
            AppState.updateWidget(widget.id, { props: newProps });
        });
        panel.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
    }

    const validWeights = getWeightsForFont(props.font_family || "Roboto");
    panel.addSelect("Day Name Weight", props.font_weight_day || 700, validWeights, setIntProp("font_weight_day"));
    panel.addSelect("Temp Text Weight", props.font_weight_temp || 400, validWeights, setIntProp("font_weight_temp"));
    panel.addLabeledInput("Day Name Size", "number", props.day_font_size || 12, setIntProp("day_font_size"));
    panel.addLabeledInput("Temp Text Size", "number", props.temp_font_size || 14, setIntProp("temp_font_size"));
    panel.endSection();

    panel.createSection("Appearance", false);
    panel.addColorSelector("Main Text Color", props.color || "theme_auto", null, setTextProp("color"));
    panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, setIntProp("opacity"));
    panel.addColorSelector("Background", props.bg_color || props.background_color || "transparent", null, setTextProp("bg_color"));
    panel.addLabeledInput("Border Width", "number", props.border_width || 0, setIntProp("border_width"));
    panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, setTextProp("border_color"));
    panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, setIntProp("border_radius"));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
};
