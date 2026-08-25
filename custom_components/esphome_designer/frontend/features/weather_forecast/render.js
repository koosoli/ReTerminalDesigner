import { AppState } from '@core/state';
import { getDayLabelSet } from './day_labels.js';
import {
    getWeatherIconMeta,
    toWeatherMdiCharacter
} from '../weather_icon/shared.js';

/**
 * @typedef {{
 *   width: number,
 *   height: number,
 *   entity_id?: string,
 *   props?: Record<string, any>
 * }} WeatherForecastWidget
 *
 * @typedef {{
 *   getColorStyle: (value: string) => string
 * }} WeatherForecastRenderTools
 */

/**
 * @param {HTMLElement} el
 * @param {WeatherForecastWidget} widget
 * @param {WeatherForecastRenderTools} tools
 */
export const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const layout = props.layout || "horizontal";
    const mode = props.forecast_mode || "daily";
    const dayLabels = getDayLabelSet(props.day_language);
    const hourlyMode = props.hourly_mode === "relative" ? "relative" : "fixed";
    const relativeCount = parseInt(props.relative_count || 5, 10);
    const startOffset = parseInt(props.start_offset || 0, 10);
    /** @type {string[]} */
    const hourlySlots = String(props.hourly_slots || "06,09,12,15,18,21")
        .split(',').map(s => s.trim()).filter(Boolean);

    // For hourly, we take slice of slots; for daily, we iterate 'days'
    const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
    const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(props.days, 10) || 5));

    const iconSize = parseInt(props.icon_size, 10) || 32;
    const tempFontSize = parseInt(props.temp_font_size, 10) || 14;
    const dayFontSize = parseInt(props.day_font_size, 10) || 12;
    // Hourly forecasts do not have templow data in Home Assistant.
    const showHighLow = mode === "hourly" ? false : props.show_high_low !== false;
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    const precision = (typeof props.precision === 'number' && !isNaN(props.precision)) ? props.precision : 1;

    // Theme awareness
    const color = props.color || "theme_auto";
    const colorStyle = getColorStyle(color);
    el.style.color = colorStyle;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = layout === "vertical" ? "column" : "row";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.gap = layout === "vertical" ? "4px" : "0px";
    el.style.overflow = "hidden";
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    // Border and Background
    const borderRadius = props.border_radius || 0;
    el.style.backgroundColor = getColorStyle(props.background_color || "transparent");
    el.style.borderRadius = `${borderRadius}px`;

    // Apply Border
    if (props.border_width) {
        const borderW = props.border_width;
        const borderColor = getColorStyle(props.border_color || color);
        el.style.border = `${borderW}px solid ${borderColor}`;
    } else {
        el.style.border = "none";
    }

    const availableWidth = widget.width - (el.style.border !== "none" ? (parseInt(props.border_width || 0) * 2) : 0) - 8; // -8 for 4px padding on both sides
    const availableHeight = widget.height - (el.style.border !== "none" ? (parseInt(props.border_width || 0) * 2) : 0) - 8;

    const itemWidth = layout === "horizontal" ? Math.floor(availableWidth / count) : availableWidth;
    const itemHeight = layout === "vertical" ? Math.floor(availableHeight / count) : availableHeight;

    const weatherEntity = String(widget.entity_id ?? props.weather_entity ?? '').trim();

    for (let i = 0; i < count; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.style.display = "flex";
        dayDiv.style.flexDirection = "column";
        dayDiv.style.alignItems = "center";
        dayDiv.style.justifyContent = "center";
        dayDiv.style.width = `${itemWidth}px`;
        dayDiv.style.minHeight = layout === "vertical" ? `${itemHeight}px` : "100%";
        dayDiv.style.color = colorStyle;
        dayDiv.style.fontFamily = fontFamily;

        // Try to get live data
        let liveCond = null;
        let liveHigh = null;
        let liveLow = null;

        if (AppState && AppState.entityStates) {
            const dayIdx = i + startOffset;
            let condId, highId, lowId, legacyHighId;

            if (mode === "hourly") {
                if (hourlyMode === "relative") {
                    condId = `sensor.weather_forecast_plus_${i + 1}h_condition`;
                    highId = `sensor.weather_forecast_plus_${i + 1}h`;
                    legacyHighId = `sensor.weather_forecast_plus_${i + 1}h_high`;
                    lowId = `sensor.weather_forecast_plus_${i + 1}h_low`;
                } else {
                    condId = `sensor.weather_forecast_hour_${actualSlots[i]}00_condition`;
                    highId = `sensor.weather_forecast_hour_${actualSlots[i]}00`;
                    legacyHighId = `sensor.weather_forecast_hour_${actualSlots[i]}00_high`;
                    lowId = `sensor.weather_forecast_hour_${actualSlots[i]}00_low`;
                }
            } else {
                condId = `sensor.weather_forecast_day_${dayIdx}_condition`;
                highId = `sensor.weather_forecast_day_${dayIdx}_high`;
                lowId = `sensor.weather_forecast_day_${dayIdx}_low`;
            }

            const condState = AppState.entityStates[condId];
            const highState = AppState.entityStates[highId] || (legacyHighId ? AppState.entityStates[legacyHighId] : null);
            const lowState = AppState.entityStates[lowId];

            if (condState && condState.state && condState.state !== "unknown") liveCond = condState.state.toLowerCase();
            if (highState && highState.state && highState.state !== "unknown") liveHigh = parseFloat(highState.state);
            if (lowState && lowState.state && lowState.state !== "unknown") liveLow = parseFloat(lowState.state);
        }

        const dayLabel = document.createElement("div");
        dayLabel.style.fontSize = `${dayFontSize}px`;
        dayLabel.style.fontWeight = String(props.font_weight_day || 700);
        dayLabel.style.marginBottom = "2px";

        if (mode === "hourly") {
            if (hourlyMode === "relative") {
                const now = new Date();
                const targetHour = (now.getHours() + i + 1) % 24;
                dayLabel.textContent = `${targetHour.toString().padStart(2, '0')}:00`;
            } else {
                dayLabel.textContent = `${actualSlots[i]}:00`;
            }
        } else {
            const dayIdx = i + startOffset;
            if (dayIdx === 0) {
                dayLabel.textContent = dayLabels.today;
            } else {
                const future = new Date();
                future.setDate(future.getDate() + dayIdx);
                dayLabel.textContent = dayLabels.weekdays[future.getDay()] || dayLabels.weekdays[0];
            }
        }
        dayDiv.appendChild(dayLabel);

        const iconDiv = document.createElement("div");
        const weatherIcon = getWeatherIconMeta(liveCond);
        iconDiv.innerText = toWeatherMdiCharacter(weatherIcon.code);
        iconDiv.style.fontSize = `${iconSize}px`;
        iconDiv.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        iconDiv.style.lineHeight = "1.1";
        dayDiv.appendChild(iconDiv);

        const tempDiv = document.createElement("div");
        tempDiv.style.fontSize = `${tempFontSize}px`;
        tempDiv.style.fontWeight = String(props.font_weight_temp || 400);

        const hasLiveHigh = typeof liveHigh === "number" && !Number.isNaN(liveHigh);
        const hasLiveLow = typeof liveLow === "number" && !Number.isNaN(liveLow);

        /** @param {number | null} val */
        const formatTemp = (val) => {
            if (typeof val !== 'number' || isNaN(val)) return "--";
            return val.toFixed(precision);
        };

        const tempUnit = props.temp_unit || "C";
        const unitSymbol = tempUnit === "F" ? "°F" : "°C";
        if (showHighLow) {
            if (!hasLiveHigh && !hasLiveLow) {
                tempDiv.textContent = "--/--";
            } else if (!hasLiveHigh) {
                tempDiv.textContent = `--/${formatTemp(liveLow)}${unitSymbol}`;
            } else if (!hasLiveLow) {
                tempDiv.textContent = `${formatTemp(liveHigh)}${unitSymbol}/--`;
            } else {
                tempDiv.textContent = `${formatTemp(liveHigh)}${unitSymbol}/${formatTemp(liveLow)}${unitSymbol}`;
            }
        } else {
            tempDiv.textContent = hasLiveHigh ? `${formatTemp(liveHigh)}${unitSymbol}` : "--";
        }
        dayDiv.appendChild(tempDiv);

        el.appendChild(dayDiv);
    }
    // weatherEntity already declared above

    if (!weatherEntity) {
        const warning = document.createElement("div");
        warning.style.position = "absolute";
        warning.style.bottom = "2px";
        warning.style.right = "4px";
        warning.style.fontSize = "9px";
        warning.style.color = "#888";
        warning.textContent = "⚠ No weather entity";
        el.appendChild(warning);
    }
};
