import { WEATHER_ICON_CODES } from '../weather_icon/shared.js';
import { clampFontWeight } from '../../js/core/font_weights.js';

/**
 * @typedef {{
 *   id: string,
 *   type?: string,
 *   entity_id?: string,
 *   props?: Record<string, any>
 * }} WeatherForecastWidget
 *
 * @typedef {{
 *   lines: string[],
 *   widgets?: WeatherForecastWidget[],
 *   isLvgl?: boolean,
 *   pendingTriggers?: Map<string, Set<string>>,
 *   seenSensorIds?: Set<string>,
 *   trackIcon?: (code: string, size: number) => void,
 *   addFont?: (family: string, weight: number, size: number) => void
 * }} WeatherForecastExportContext
 *
 * @typedef {{
 *   entity: string,
 *   tempUnit: string,
 *   slots: Set<string | number>
 * }} WeatherForecastModeConfig
 */

/**
 * @param {WeatherForecastExportContext} context
 */
export const onExportNumericSensors = (context) => {
    const { lines, widgets = [], isLvgl, pendingTriggers } = context;
    const weatherWidgets = widgets.filter(w => w.type === "weather_forecast");
    if (weatherWidgets.length === 0) return;

    weatherWidgets.forEach(w => {
        const mode = w.props?.forecast_mode || "daily";
        const hourlyMode = w.props?.hourly_mode === "relative" ? "relative" : "fixed";
        const relativeCount = parseInt(w.props?.relative_count || 5, 10);
        const startOffset = parseInt(w.props?.start_offset || 0, 10);
        /** @type {string[]} */
        const hourlySlots = String(w.props?.hourly_slots || "06,09,12,15,18,21")
            .split(',').map(s => s.trim()).filter(Boolean);

        const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
        const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(w.props?.days, 10) || 5));

        for (let day = 0; day < count; day++) {
            const dayIdx = day + startOffset;
            let prefix;
            if (mode === "hourly") {
                prefix = hourlyMode === "relative" ? `sensor.weather_forecast_plus_${day + 1}h` : `sensor.weather_forecast_hour_${actualSlots[day]}00`;
            } else {
                prefix = `sensor.weather_forecast_day_${dayIdx}`;
            }
            const sensors = mode === "hourly"
                ? [prefix, `${prefix}_condition`]
                : [`${prefix}_high`, `${prefix}_low`, `${prefix}_condition`];

            sensors.forEach(sid => {
                if (isLvgl && pendingTriggers) {
                    const safeWidgetId = w.id.replace(/-/g, "_");
                    if (!pendingTriggers.has(sid)) pendingTriggers.set(sid, new Set());
                    const triggerSet = pendingTriggers.get(sid);
                    if (!triggerSet) return;
                    triggerSet.add(`- lvgl.widget.refresh: ${safeWidgetId}_day${day}`);
                    triggerSet.add(`- lvgl.widget.refresh: ${safeWidgetId}_icon${day}`);
                    triggerSet.add(`- lvgl.widget.refresh: ${safeWidgetId}_temp${day}`);
                }
            });
        }

        const tempUnit = w.props?.temp_unit || "C";
        const unitSymbol = tempUnit === "F" ? "°F" : "°C";

        for (let day = 0; day < count; day++) {
            const dayIdx = day + startOffset;
            let highSid;
            let lowSid;
            let highId;
            let lowId;
            let highName;
            let lowName;

            if (mode === "hourly") {
                if (hourlyMode === "relative") {
                    highSid = `sensor.weather_forecast_plus_${day + 1}h`;
                    lowSid = `sensor.weather_forecast_plus_${day + 1}h_low`;
                    highId = `weather_high_hplus${day + 1}`;
                    lowId = `weather_low_hplus${day + 1}`;
                    highName = `Weather High Plus ${day + 1}h`;
                    lowName = `Weather Low Plus ${day + 1}h`;
                } else {
                    highSid = `sensor.weather_forecast_hour_${actualSlots[day]}00`;
                    lowSid = `sensor.weather_forecast_hour_${actualSlots[day]}00_low`;
                    highId = `weather_high_h${actualSlots[day]}00`;
                    lowId = `weather_low_h${actualSlots[day]}00`;
                    highName = `Weather High Hour ${actualSlots[day]}00`;
                    lowName = `Weather Low Hour ${actualSlots[day]}00`;
                }
            } else {
                highSid = `sensor.weather_forecast_day_${dayIdx}_high`;
                lowSid = `sensor.weather_forecast_day_${dayIdx}_low`;
                highId = `weather_high_day${dayIdx}`;
                lowId = `weather_low_day${dayIdx}`;
                highName = `Weather High Day ${dayIdx}`;
                lowName = `Weather Low Day ${dayIdx}`;
            }

            /** @type {{ eid: string, id: string, name: string }[]} */
            const sensorsToExport = mode === "hourly"
                ? [{ eid: highSid, id: highId, name: highName }]
                : [
                    { eid: highSid, id: highId, name: highName },
                    { eid: lowSid, id: lowId, name: lowName }
                ];

            sensorsToExport.forEach(s => {
                if (context.seenSensorIds && !context.seenSensorIds.has(s.id)) {
                    if (context.seenSensorIds.size === 0) {
                        lines.push("");
                        lines.push("# Weather Forecast Numeric Sensors");
                    }
                    context.seenSensorIds.add(s.id);
                    lines.push("- platform: homeassistant");
                    lines.push(`  id: ${s.id}`);
                    lines.push(`  entity_id: ${s.eid}`);
                    lines.push(`  unit_of_measurement: '${unitSymbol}'`);
                    lines.push(`  internal: true`);
                }
            });
        }
    });
};

/**
 * @param {WeatherForecastExportContext} context
 */
export const onExportTextSensors = (context) => {
    const { lines, widgets = [] } = context;
    const targets = widgets.filter(w => w.type === "weather_forecast");
    if (targets.length === 0) return;

    let addedAny = false;

    targets.forEach(w => {
        const p = w.props || {};
        const mode = p.forecast_mode || "daily";
        const hourlyMode = p.hourly_mode === "relative" ? "relative" : "fixed";
        const relativeCount = parseInt(p.relative_count || 5, 10);
        const startOffset = parseInt(p.start_offset || 0, 10);
        /** @type {string[]} */
        const hourlySlots = String(p.hourly_slots || "06,09,12,15,18,21")
            .split(',').map(s => s.trim()).filter(Boolean);

        const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
        const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));

        for (let day = 0; day < count; day++) {
            const dayIdx = day + startOffset;
            let condId;
            if (mode === "hourly") {
                condId = hourlyMode === "relative" ? `weather_cond_hplus${day + 1}` : `weather_cond_h${actualSlots[day]}00`;
            } else {
                condId = `weather_cond_day${dayIdx}`;
            }
            if (context.seenSensorIds && context.seenSensorIds.has(condId)) continue;

            if (!addedAny) {
                lines.push("");
                lines.push("# Weather Forecast Condition Sensors");
                addedAny = true;
            }

            if (context.seenSensorIds) context.seenSensorIds.add(condId);

            lines.push("- platform: homeassistant");
            lines.push(`  id: ${condId}`);
            if (mode === "hourly") {
                if (hourlyMode === "relative") {
                    lines.push(`  entity_id: sensor.weather_forecast_plus_${day + 1}h_condition`);
                } else {
                    lines.push(`  entity_id: sensor.weather_forecast_hour_${actualSlots[day]}00_condition`);
                }
            } else {
                lines.push(`  entity_id: sensor.weather_forecast_day_${dayIdx}_condition`);
            }
            lines.push(`  internal: true`);
        }
    });

    /** @type {Map<string, WeatherForecastModeConfig>} */
    const modeConfigs = new Map();
    targets.forEach(w => {
        const p = w.props || {};
        const mode = p.forecast_mode || "daily";
        const hourlyMode = p.hourly_mode === "relative" ? "relative" : "fixed";
        const modeKey = mode === "hourly" && hourlyMode === "relative" ? "hourly_relative" : mode;
        const weatherEntity = w.entity_id || p.weather_entity || "weather.forecast_home";
        const tempUnit = p.temp_unit || "C";

        if (!modeConfigs.has(modeKey)) {
            modeConfigs.set(modeKey, {
                entity: weatherEntity,
                tempUnit,
                slots: new Set()
            });
        }

        const config = modeConfigs.get(modeKey);
        if (!config) return;
        const startOffset = parseInt(p.start_offset || 0, 10);

        if (mode === "hourly") {
            if (hourlyMode === "relative") {
                const relativeCount = parseInt(p.relative_count || 5, 10);
                for (let i = 1; i <= relativeCount; i++) {
                    config.slots.add(i);
                }
            } else {
                /** @type {string[]} */
                const hourlySlots = String(p.hourly_slots || "06,09,12,15,18,21").split(',').map(s => s.trim()).filter(Boolean);
                const actualSlots = hourlySlots.slice(startOffset);
                actualSlots.forEach(s => config.slots.add(s));
            }
        } else {
            const count = Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
            for (let day = 0; day < count; day++) {
                config.slots.add(day + startOffset);
            }
        }
    });

    modeConfigs.forEach((config, mode) => {
        lines.push("");
        lines.push("# ============================================================================");
        lines.push(`# HOME ASSISTANT TEMPLATE SENSORS (${mode.toUpperCase()})`);
        lines.push("# Add these template sensors to your Home Assistant configuration.yaml:");
        lines.push("# ============================================================================");
        lines.push("#");
        lines.push("# template:");

        const sortedSlots = Array.from(config.slots).sort((a, b) => parseInt(String(a), 10) - parseInt(String(b), 10));
        const unitSymbol = config.tempUnit === "F" ? "°F" : "°C";

        if (mode.startsWith("hourly")) {
            const isRelative = mode === "hourly_relative";
            lines.push("#   - trigger:");
            lines.push("#       - trigger: time_pattern");
            lines.push("#         minutes: '/30'");
            lines.push("#       - trigger: homeassistant");
            lines.push("#         event: start");
            lines.push("#     action:");
            lines.push("#       - action: weather.get_forecasts");
            lines.push("#         target:");
            lines.push(`#           entity_id: ${config.entity}`);
            lines.push("#         data:");
            lines.push("#           type: hourly");
            lines.push("#         response_variable: hourly");
            lines.push("#     sensor:");

            sortedSlots.forEach(slot => {
                if (isRelative) {
                    lines.push(`#       - name: 'Weather Forecast Plus ${slot}h High'`);
                    lines.push(`#         unique_id: weather_forecast_plus_${slot}h`);
                    lines.push(`#         default_entity_id: sensor.weather_forecast_plus_${slot}h`);
                    lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
                    lines.push(`#         state: >`);
                    lines.push(`#           {% set fc = hourly['${config.entity}'].forecast %}`);
                    lines.push(`#           {% set target = as_timestamp((now() + timedelta(hours=${slot})).replace(minute=0, second=0, microsecond=0)) %}`);
                    lines.push(`#           {% set ns = namespace(hit=none) %}`);
                    lines.push(`#           {% for f in fc if ns.hit is none %}`);
                    lines.push(`#             {% if as_timestamp(f.datetime) == target %}`);
                    lines.push(`#               {% set ns.hit = f %}`);
                    lines.push(`#             {% endif %}`);
                    lines.push(`#           {% endfor %}`);
                    lines.push(`#           {{ ns.hit.temperature if ns.hit else 'N/A' }}`);
                    lines.push(`#       - name: 'Weather Forecast Plus ${slot}h Condition'`);
                    lines.push(`#         unique_id: weather_forecast_plus_${slot}h_condition`);
                    lines.push(`#         default_entity_id: sensor.weather_forecast_plus_${slot}h_condition`);
                    lines.push(`#         state: >`);
                    lines.push(`#           {% set fc = hourly['${config.entity}'].forecast %}`);
                    lines.push(`#           {% set target = as_timestamp((now() + timedelta(hours=${slot})).replace(minute=0, second=0, microsecond=0)) %}`);
                    lines.push(`#           {% set ns = namespace(hit=none) %}`);
                    lines.push(`#           {% for f in fc if ns.hit is none %}`);
                    lines.push(`#             {% if as_timestamp(f.datetime) == target %}`);
                    lines.push(`#               {% set ns.hit = f %}`);
                    lines.push(`#             {% endif %}`);
                    lines.push(`#           {% endfor %}`);
                    lines.push(`#           {{ ns.hit.condition if ns.hit else 'unknown' }}`);
                } else {
                    const paddedSlot = String(slot).padStart(2, '0');
                    lines.push(`#       - name: 'Weather Forecast Hour ${slot}00 High'`);
                    lines.push(`#         unique_id: weather_forecast_hour_${slot}00`);
                    lines.push(`#         default_entity_id: sensor.weather_forecast_hour_${slot}00`);
                    lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
                    lines.push(`#         state: >`);
                    lines.push(`#           {% set fc = hourly['${config.entity}'].forecast %}`);
                    lines.push(`#           {% set target = today_at('${paddedSlot}:00') %}`);
                    lines.push(`#           {% set target = target + timedelta(days=1) if now() > target + timedelta(hours=1) else target %}`);
                    lines.push(`#           {% set target_ts = as_timestamp(target) %}`);
                    lines.push(`#           {% set ns = namespace(hit=none) %}`);
                    lines.push(`#           {% for f in fc if ns.hit is none %}`);
                    lines.push(`#             {% if as_timestamp(f.datetime) == target_ts %}`);
                    lines.push(`#               {% set ns.hit = f %}`);
                    lines.push(`#             {% endif %}`);
                    lines.push(`#           {% endfor %}`);
                    lines.push(`#           {{ ns.hit.temperature if ns.hit else 'N/A' }}`);
                    lines.push(`#       - name: 'Weather Forecast Hour ${slot}00 Condition'`);
                    lines.push(`#         unique_id: weather_forecast_hour_${slot}00_condition`);
                    lines.push(`#         default_entity_id: sensor.weather_forecast_hour_${slot}00_condition`);
                    lines.push(`#         state: >`);
                    lines.push(`#           {% set fc = hourly['${config.entity}'].forecast %}`);
                    lines.push(`#           {% set target = today_at('${paddedSlot}:00') %}`);
                    lines.push(`#           {% set target = target + timedelta(days=1) if now() > target + timedelta(hours=1) else target %}`);
                    lines.push(`#           {% set target_ts = as_timestamp(target) %}`);
                    lines.push(`#           {% set ns = namespace(hit=none) %}`);
                    lines.push(`#           {% for f in fc if ns.hit is none %}`);
                    lines.push(`#             {% if as_timestamp(f.datetime) == target_ts %}`);
                    lines.push(`#               {% set ns.hit = f %}`);
                    lines.push(`#             {% endif %}`);
                    lines.push(`#           {% endfor %}`);
                    lines.push(`#           {{ ns.hit.condition if ns.hit else 'unknown' }}`);
                }
            });
        } else {
            lines.push("#   - trigger:");
            lines.push("#       - trigger: state");
            lines.push(`#         entity_id: ${config.entity}`);
            lines.push("#       - trigger: time_pattern");
            lines.push("#         hours: '/1'");
            lines.push("#     action:");
            lines.push("#       - action: weather.get_forecasts");
            lines.push("#         target:");
            lines.push(`#           entity_id: ${config.entity}`);
            lines.push("#         data:");
            lines.push("#           type: daily");
            lines.push("#         response_variable: forecast_data");
            lines.push("#     sensor:");

            sortedSlots.forEach(dayIdx => {
                lines.push(`#       - name: 'Weather Forecast Day ${dayIdx} High'`);
                lines.push(`#         unique_id: weather_forecast_day_${dayIdx}_high`);
                lines.push(`#         default_entity_id: sensor.weather_forecast_day_${dayIdx}_high`);
                lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
                lines.push(`#         state: '{{ forecast_data["${config.entity}"].forecast[${dayIdx}].temperature | default("N/A") }}'`);
                lines.push(`#       - name: 'Weather Forecast Day ${dayIdx} Low'`);
                lines.push(`#         unique_id: weather_forecast_day_${dayIdx}_low`);
                lines.push(`#         default_entity_id: sensor.weather_forecast_day_${dayIdx}_low`);
                lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
                lines.push(`#         state: '{{ forecast_data["${config.entity}"].forecast[${dayIdx}].templow | default("N/A") }}'`);
                lines.push(`#       - name: 'Weather Forecast Day ${dayIdx} Condition'`);
                lines.push(`#         unique_id: weather_forecast_day_${dayIdx}_condition`);
                lines.push(`#         default_entity_id: sensor.weather_forecast_day_${dayIdx}_condition`);
                lines.push(`#         state: '{{ forecast_data["${config.entity}"].forecast[${dayIdx}].condition | default("unknown") }}'`);
            });
        }
        lines.push("#");
        lines.push("# ============================================================================");
    });
};

/**
 * @param {WeatherForecastWidget} w
 * @param {WeatherForecastExportContext} context
 */
export const collectRequirements = (w, context) => {
    const { trackIcon, addFont } = context;
    const p = w.props || {};
    const iconSize = parseInt(p.icon_size || 32, 10);
    const dayFS = parseInt(p.day_font_size || 12, 10);
    const tempFS = parseInt(p.temp_font_size || 14, 10);
    const family = p.font_family || "Roboto";

    if (!addFont || !trackIcon) return;

    addFont(family, clampFontWeight(family, p.font_weight_day || 700), dayFS);
    addFont(family, clampFontWeight(family, p.font_weight_temp || 400), tempFS);
    addFont("Material Design Icons", 400, iconSize);

    WEATHER_ICON_CODES.forEach(c => trackIcon(c, iconSize));
};
