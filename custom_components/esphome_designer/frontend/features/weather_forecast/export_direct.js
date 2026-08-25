import { getDayLabelSet } from './day_labels.js';
import { clampFontWeight } from '../../js/core/font_weights.js';
import { UNKNOWN_WEATHER_ICON } from '../weather_icon/shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string }} WeatherForecastWidget */

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} context
 */
export const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, sanitize, getCondProps, getConditionCheck, isEpaper // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const weatherEntity = w.entity_id || p.weather_entity || "weather.forecast_home"; // eslint-disable-line no-unused-vars
    const layout = p.layout || "horizontal";
    const mode = p.forecast_mode || "daily";
    const hourlyMode = p.hourly_mode === "relative" ? "relative" : "fixed";
    const relativeCount = parseInt(p.relative_count || 5, 10);
    const startOffset = parseInt(p.start_offset || 0, 10);
    const hourlySlots = (p.hourly_slots || "06,09,12,15,18,21")
        .split(',').map((/** @type {string} */ s) => s.trim()).filter(Boolean);

    const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
    const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
    const showHighLow = mode === "hourly" ? false : p.show_high_low !== false;
    const dayFontSize = parseInt(String(p.day_font_size || 12), 10);
    const tempFontSize = parseInt(String(p.temp_font_size || 14), 10);
    const iconSize = parseInt(String(p.icon_size || 32), 10);
    const fontFamily = p.font_family || "Roboto";
    const colorProp = p.color || "theme_auto";
    const color = getColorConst(colorProp);
    const dayLabels = getDayLabelSet(p.day_language);
    const tempUnit = p.temp_unit || "C";
    const unitSymbol = tempUnit === "F" ? "°F" : "°C";
    const precision = (typeof p.precision === 'number' && !isNaN(p.precision)) ? p.precision : 1;

    const dayFontId = addFont(fontFamily, clampFontWeight(fontFamily, p.font_weight_day || 700), dayFontSize);
    const tempFontId = addFont(fontFamily, clampFontWeight(fontFamily, p.font_weight_temp || 400), tempFontSize);
    const iconFontId = addFont("Material Design Icons", 400, iconSize);

    const condFore = getConditionCheck(w);
    if (condFore) lines.push(`        ${condFore}`);

    lines.push(`        {`);
    lines.push(`          static std::map<std::string, const char*> weather_icons = {`);
    lines.push(`            {"clear-night", "\\U000F0594"}, {"cloudy", "\\U000F0590"},`);
    lines.push(`            {"exceptional", "\\U000F0026"}, {"fog", "\\U000F0591"},`);
    lines.push(`            {"hail", "\\U000F0592"}, {"lightning", "\\U000F0593"},`);
    lines.push(`            {"lightning-rainy", "\\U000F067E"}, {"partlycloudy", "\\U000F0595"},`);
    lines.push(`            {"pouring", "\\U000F0596"}, {"rainy", "\\U000F0597"},`);
    lines.push(`            {"snowy", "\\U000F0598"}, {"snowy-rainy", "\\U000F067F"},`);
    lines.push(`            {"sunny", "\\U000F0599"}, {"windy", "\\U000F059D"},`);
    lines.push(`            {"windy-variant", "\\U000F059E"}`);
    lines.push(`          };`);
    lines.push(`          auto get_icon = [&](const std::string& cond_val) -> const char* {`);
    lines.push(`            return weather_icons.count(cond_val) ? weather_icons[cond_val] : "\\U000${UNKNOWN_WEATHER_ICON.code}";`);
    lines.push(`          };`);
    if (mode === "hourly") {
        lines.push(`          auto get_hour_label = [](int offset) -> std::string {`);
        if (hourlyMode === "relative") {
            lines.push(`            auto t = id(ha_time).now();`);
            lines.push(`            if (!t.is_valid()) return "---";`);
            lines.push(`            char buf[8]; sprintf(buf, "%02d:00", (t.hour + offset + 1) % 24);`);
            lines.push(`            return std::string(buf);`);
        } else {
            lines.push(`            const char* slots[] = {${actualSlots.map((/** @type {string} */ s) => `"${s}:00"`).join(', ')}};`);
            lines.push(`            if (offset >= 0 && offset < ${actualSlots.length}) return std::string(slots[offset]);`);
            lines.push(`            return "---";`);
        }
        lines.push(`          };`);
    } else {
        lines.push(`          auto get_day_name = [](int offset) -> std::string {`);
        lines.push(`            static const char* weekday_names[] = {${dayLabels.weekdays.map((label) => JSON.stringify(label)).join(', ')}};`);
        lines.push(`            int target_day = offset + ${startOffset};`);
        lines.push(`            if (target_day == 0) return ${JSON.stringify(dayLabels.today)};`);
        lines.push(`            auto t = id(ha_time).now();`);
        lines.push(`            if (!t.is_valid()) return "---";`);
        lines.push(`            ESPTime future = ESPTime::from_epoch_local(t.timestamp + (target_day * 86400));`);
        lines.push(`            char weekday_buf[2]; future.strftime(weekday_buf, sizeof(weekday_buf), "%w");`);
        lines.push(`            int weekday_index = weekday_buf[0] - '0';`);
        lines.push(`            if (weekday_index < 0 || weekday_index > 6) return "---";`);
        lines.push(`            return std::string(weekday_names[weekday_index]);`);
        lines.push(`          };`);
    }

    const bgColorProp = p.bg_color || p.background_color || "transparent";
    const radius = p.border_radius || 0;

    if (bgColorProp && bgColorProp !== "transparent") {
        const bgColorConst = getColorConst(bgColorProp);
        if (radius > 0) {
            lines.push(`          it.filled_rounded_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${bgColorConst});`);
        } else {
            lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }
        addDitherMask(lines, bgColorProp, isEpaper, w.x, w.y, w.width, w.height);
    }

    const borderWidth = parseInt(p.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = p.border_color || colorProp;
        const borderColorConst = getColorConst(borderColorProp);
        if (radius > 0) {
            lines.push("          auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c) {");
            lines.push("            int inner_r = r - t;");
            lines.push("            if (inner_r < 0) inner_r = 0;");
            lines.push("            it.filled_rectangle(x + r, y, w - 2 * r, t, c);");
            lines.push("            it.filled_rectangle(x + r, y + h - t, w - 2 * r, t, c);");
            lines.push("            it.filled_rectangle(x, y + r, t, h - 2 * r, c);");
            lines.push("            it.filled_rectangle(x + w - t, y + r, t, h - 2 * r, c);");
            lines.push("            for (int dx = 0; dx <= r; dx++) {");
            lines.push("              for (int dy = 0; dy <= r; dy++) {");
            lines.push("                int ds = dx*dx + dy*dy;");
            lines.push("                if (ds <= r*r && ds > inner_r*inner_r) {");
            lines.push("                  it.draw_pixel_at(x + r - dx, y + r - dy, c);");
            lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + r - dy, c);");
            lines.push("                  it.draw_pixel_at(x + r - dx, y + h - r + dy - 1, c);");
            lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + h - r + dy - 1, c);");
            lines.push("                }");
            lines.push("              }");
            lines.push("            }");
            lines.push("          };");
            lines.push(`          draw_rrect_border(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${borderWidth}, ${borderColorConst});`);
        } else {
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`          it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
            }
        }
    }

    const isHorizontal = layout === "horizontal";

    const xInc = isHorizontal ? Math.floor(w.width / count) : 0;
    const yInc = isHorizontal ? 0 : Math.floor(w.height / count);
    const centerOffset = isHorizontal ? Math.floor(xInc / 2) : Math.floor(w.width / 2);

    const totalContentHeight = dayFontSize + 4 + iconSize + 4 + tempFontSize;
    const slotHeight = isHorizontal ? w.height : yInc;
    const verticalStartOffset = Math.max(0, Math.floor((slotHeight - totalContentHeight) / 2));

    for (let day = 0; day < count; day++) {
        const dayIdx = day + startOffset;
        let condSensorId;
        let highSensorId;
        let lowSensorId;

        if (mode === "hourly") {
            if (hourlyMode === "relative") {
                condSensorId = `weather_cond_hplus${day + 1}`;
                highSensorId = `weather_high_hplus${day + 1}`;
                lowSensorId = `weather_low_hplus${day + 1}`;
            } else {
                condSensorId = `weather_cond_h${actualSlots[day]}00`;
                highSensorId = `weather_high_h${actualSlots[day]}00`;
                lowSensorId = `weather_low_h${actualSlots[day]}00`;
            }
        } else {
            condSensorId = `weather_cond_day${dayIdx}`;
            highSensorId = `weather_high_day${dayIdx}`;
            lowSensorId = `weather_low_day${dayIdx}`;
        }
        const dayX = w.x + day * xInc;
        const dayY = w.y + day * yInc;

        lines.push(`          {`);
        lines.push(`            int dx = ${dayX}; int dy = ${dayY} + ${verticalStartOffset};`);
        if (mode === "hourly") {
            lines.push(`            it.printf(dx + ${centerOffset}, dy, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_hour_label(${day}).c_str());`);
        } else {
            lines.push(`            it.printf(dx + ${centerOffset}, dy, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_day_name(${day}).c_str());`);
        }
        lines.push(`            std::string cond_day = id(${condSensorId}).state.c_str();`);
        lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + 4}, id(${iconFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_icon(cond_day));`);
        if (showHighLow) {
            lines.push(`            float high = id(${highSensorId}).state; float low = id(${lowSensorId}).state;`);
            lines.push(`            char temp_buf[32];`);
            lines.push(`            if (std::isnan(high) && std::isnan(low)) {`);
            lines.push(`                sprintf(temp_buf, "--/--");`);
            lines.push(`            } else if (std::isnan(high)) {`);
            lines.push(`                sprintf(temp_buf, "--/%.*f${unitSymbol}", ${precision}, low);`);
            lines.push(`            } else if (std::isnan(low)) {`);
            lines.push(`                sprintf(temp_buf, "%.*f${unitSymbol}/--", ${precision}, high);`);
            lines.push(`            } else {`);
            lines.push(`                sprintf(temp_buf, "%.*f/%.*f${unitSymbol}", ${precision}, high, ${precision}, low);`);
            lines.push(`            }`);
            lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "%s", temp_buf);`);
        } else {
            lines.push(`            float temp_val = id(${highSensorId}).state;`);
            lines.push(`            if (std::isnan(temp_val)) {`);
            lines.push(`              it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "--");`);
            lines.push(`            } else {`);
            lines.push(`              it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "%.*f${unitSymbol}", ${precision}, temp_val);`);
            lines.push(`            }`);
        }
        lines.push(`          }`);
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (condFore) lines.push(`        }`);
};
