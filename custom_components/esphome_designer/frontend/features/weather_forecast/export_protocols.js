import { getDayLabelSet } from './day_labels.js';
import { clampFontWeight } from '../../js/core/font_weights.js';
import {
    UNKNOWN_WEATHER_ICON,
    WEATHER_ICON_OPTIONS
} from '../weather_icon/shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string }} WeatherForecastWidget */

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportLVGL = (w, { common, convertColor, getLVGLFont }) => {
    const p = w.props || {};
    const mode = p.forecast_mode || "daily";
    const hourlyMode = p.hourly_mode || "fixed";
    const relativeCount = parseInt(p.relative_count || 5, 10);
    const startOffset = parseInt(p.start_offset || 0, 10);
    const hourlySlots = (p.hourly_slots || "06,09,12,15,18,21")
        .split(',').map((/** @type {string} */ s) => s.trim()).filter(Boolean);

    const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
    const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
    const isHorizontal = (p.layout || "horizontal") === "horizontal";
    const color = convertColor(p.color || "theme_auto");
    const dayLabels = getDayLabelSet(p.day_language);
    const dayFS = parseInt(p.day_font_size || 12, 10);
    const iconS = parseInt(p.icon_size || 32, 10);
    const tempFS = parseInt(p.temp_font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const dayWeight = clampFontWeight(fontFamily, p.font_weight_day || 700);
    const tempWeight = clampFontWeight(fontFamily, p.font_weight_temp || 400);
    const showHighLow = mode === "hourly" ? false : p.show_high_low !== false;
    const precision = (typeof p.precision === 'number' && !isNaN(p.precision)) ? p.precision : 1;

    /** @type {Array<Record<string, any>>} */
    const widgets = [];

    for (let i = 0; i < count; i++) {
        let dayNameLambda;
        const dayIdx = i + startOffset;
        let condId;
        let highId;
        let lowId;

        if (mode === "hourly") {
            if (hourlyMode === "relative") {
                dayNameLambda = `!lambda |-\n                      auto t = id(ha_time).now();\n                      if (!t.is_valid()) return std::string("---");\n                      static char buf[8];\n                      sprintf(buf, "%02d:00", (t.hour + ${i + 1}) % 24);\n                      return std::string(buf);\n                    `;
                condId = `weather_cond_hplus${i + 1}`;
                highId = `weather_high_hplus${i + 1}`;
                lowId = `weather_low_hplus${i + 1}`;
            } else {
                dayNameLambda = `!lambda "return \\"${actualSlots[i]}:00\\";"`;
                condId = `weather_cond_h${actualSlots[i]}00`;
                highId = `weather_high_h${actualSlots[i]}00`;
                lowId = `weather_low_h${actualSlots[i]}00`;
            }
        } else {
            dayNameLambda = `!lambda |-\n                  static const char* weekday_names[] = {${dayLabels.weekdays.map((label) => JSON.stringify(label)).join(', ')}};\n                  if (${dayIdx} == 0) return std::string(${JSON.stringify(dayLabels.today)});\n                  auto t = id(ha_time).now();\n                  if (!t.is_valid()) return std::string("---");\n                  ESPTime future = ESPTime::from_epoch_local(t.timestamp + (${dayIdx} * 86400));\n                  char weekday_buf[2];\n                  future.strftime(weekday_buf, sizeof(weekday_buf), "%w");\n                  int weekday_index = weekday_buf[0] - '0';\n                  if (weekday_index < 0 || weekday_index > 6) return std::string("---");\n                  return std::string(weekday_names[weekday_index]);\n                `;
            condId = `weather_cond_day${dayIdx}`;
            highId = `weather_high_day${dayIdx}`;
            lowId = `weather_low_day${dayIdx}`;
        }

        const iconLambda = `!lambda |-\n              std::string c = id(${condId}).state;\n${WEATHER_ICON_OPTIONS.map(({ condition, code }) => `              if (c == "${condition}") return "\\U000${code}";\n`).join('')}              return "\\U000${UNKNOWN_WEATHER_ICON.code}";\n            `;

        const tempTextLambda = showHighLow
            ? `!lambda |-\n              static std::string temp_text;\n              float high = id(${highId}).state;\n              float low = id(${lowId}).state;\n              if (std::isnan(high) && std::isnan(low)) temp_text = "--/--";\n              else if (std::isnan(high)) temp_text = str_sprintf("--/%.*f", ${precision}, low);\n              else if (std::isnan(low)) temp_text = str_sprintf("%.*f/--", ${precision}, high);\n              else temp_text = str_sprintf("%.*f/%.*f", ${precision}, high, ${precision}, low);\n              return temp_text.c_str();\n            `
            : `!lambda |-\n              static std::string temp_text;\n              float temp_val = id(${highId}).state;\n              if (std::isnan(temp_val)) return "--";\n              temp_text = str_sprintf("%.*f", ${precision}, temp_val);\n              return temp_text.c_str();\n            `;

        const dayWidgets = [
            {
                label: {
                    id: `${w.id}_day${i}`.replace(/-/g, '_'),
                    align: "top_mid",
                    text: dayNameLambda,
                    text_font: getLVGLFont(fontFamily, dayFS, dayWeight),
                    text_color: color
                }
            },
            {
                label: {
                    id: `${w.id}_icon${i}`.replace(/-/g, '_'),
                    align: "center",
                    y: 0,
                    text: iconLambda,
                    text_font: getLVGLFont("Material Design Icons", iconS, 400),
                    text_color: color
                }
            },
            {
                label: {
                    id: `${w.id}_temp${i}`.replace(/-/g, '_'),
                    align: "bottom_mid",
                    text: tempTextLambda,
                    text_font: getLVGLFont(fontFamily, tempFS, tempWeight),
                    text_color: color
                }
            }
        ];

        widgets.push({
            obj: {
                width: isHorizontal ? (100 / count) + "%" : "100%",
                height: isHorizontal ? "100%" : (100 / count) + "%",
                bg_opa: "transp",
                border_width: 0,
                widgets: dayWidgets
            }
        });
    }

    return {
        obj: {
            ...common,
            bg_color: convertColor(p.background_color || "white"),
            bg_opa: "COVER",
            radius: 8,
            border_width: p.show_border !== false ? (p.border_width || 1) : 0,
            border_color: convertColor(p.border_color || p.color || "theme_auto"),
            layout: { type: "flex", flex_flow: isHorizontal ? "row" : "column", flex_align_main: "space_around", flex_align_cross: "center" },
            widgets
        }
    };
};

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOpenDisplay = (w, { layout, _page }) => {
    const p = w.props || {};
    const entityId = String(w.entity_id ?? p.weather_entity ?? '').trim();
    const iconSize = p.icon_size || 32;
    const tempSize = p.temp_font_size || 14;

    let color = p.color || "black";
    if (color === "theme_auto") {
        color = layout?.darkMode ? "white" : "black";
    }

    const iconTemplate = `{{ {
            ${WEATHER_ICON_OPTIONS.map(({ condition, protocolIcon }) => `'${condition}': '${protocolIcon}'`).join(',\n            ')}
        }[states('${entityId}')] | default('${UNKNOWN_WEATHER_ICON.protocolIcon}') }}`;

    const tempTemplate = `{{ states('${entityId}') }} | {{ state_attr('${entityId}', 'temperature') }}°`;

    return [
        {
            type: "icon",
            value: entityId ? iconTemplate : UNKNOWN_WEATHER_ICON.protocolIcon,
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y),
            size: iconSize,
            color,
            anchor: "mt"
        },
        {
            type: "text",
            value: tempTemplate,
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + iconSize + 2),
            size: tempSize,
            color,
            anchor: "mt"
        }
    ];
};

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOEPL = (w, { _layout, _page }) => {
    const p = w.props || {};
    const entityId = String(w.entity_id ?? p.weather_entity ?? '').trim();
    return {
        type: "text",
        value: `{{ states('${entityId}') }}`,
        x: Math.round(w.x),
        y: Math.round(w.y),
        size: p.temp_font_size || 14,
        color: p.color || "theme_auto",
        anchor: "lt"
    };
};
