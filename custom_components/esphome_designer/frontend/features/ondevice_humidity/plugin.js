import { renderOnDeviceHumidity } from './render.js';
/**
 * On-Device Humidity Plugin
 */

const render = renderOnDeviceHumidity;

export default {
    id: "ondevice_humidity",
    name: "Humidity",
    category: "SHT4x",
    // CRITICAL ARCHITECTURAL NOTE: Protocol-based modes (OEPL/OpenDisplay) do not support 
    // on-device hardware sensors.
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 60,
        height: 60,
        size: 32,
        font_family: "Roboto",
        font_size: 16,
        label_font_size: 10,
        color: "black",
        unit: "%",
        show_label: true,
        precision: 0,
        fit_icon_to_frame: true,
        is_local_sensor: true,
        entity_id: "",
        opa: 255,
        opacity: 255
    },
    schema: [
        {
            section: "Sensor Data",
            fields: [
                { key: "is_local_sensor", label: "Use Onboard Sensor", type: "checkbox", default: true },
                { key: "entity_id", target: "root", label: "External Entity ID", type: "entity_picker", default: "" },
                { key: "unit", label: "Unit", type: "text", default: "%" },
                { key: "precision", label: "Precision", type: "number", default: 0 }
            ]
        },
        {
            section: "Content",
            fields: [
                { key: "show_label", label: "Show 'Humidity' Label", type: "checkbox", default: true }
            ]
        },
        {
            section: "Sizing",
            fields: [
                { key: "fit_icon_to_frame", label: "Auto-Fit to Widget", type: "checkbox", default: true },
                { key: "size", label: "Fixed Icon Size", type: "number", default: 32 },
                { key: "font_size", label: "Fixed Value Size", type: "number", default: 16 },
                { key: "label_font_size", label: "Fixed Label Size", type: "number", default: 10 }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "font_family", label: "Font Family (Direct/LVGL)", type: "select", options: ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand"], default: "Roboto" },
                { key: "color", label: "Main Color", type: "color", default: "black" },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportOpenDisplay: (w, { layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "sensor.humidity").trim();
        const size = p.size || 32;
        const fontSize = p.font_size || 16;
        const unit = p.unit || "%";

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        const iconTemplate = `{% set h = states('${entityId}') | float %}` +
            `{% if h <= 30 %}water-outline{% elif h >= 70 %}water{% else %}water-percent{% endif %}`;

        return [
            {
                type: "icon",
                value: iconTemplate,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y),
                size: size,
                fill: color,
                anchor: "mt"
            },
            {
                type: "text",
                value: `{{ states('${entityId}') }}${unit}`,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y + size + 2),
                size: fontSize,
                color: color,
                anchor: "mt"
            }
        ];
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "sensor.humidity").trim();
        const size = p.size || 32;
        const fontSize = p.font_size || 16;
        const color = p.color || "black";
        const unit = p.unit || "%";

        const iconTemplate = `{% set h = states('${entityId}') | float %}` +
            `{% if h <= 30 %}water-outline{% elif h >= 70 %}water{% else %}water-percent{% endif %}`;

        return [
            {
                type: "icon",
                value: iconTemplate,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y),
                size: size,
                color: color,
                anchor: "mt"
            },
            {
                type: "text",
                value: `{{ states('${entityId}') }}${unit}`,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y + size + 2),
                size: fontSize,
                color: color,
                align: "center",
                anchor: "mt"
            }
        ];
    },
    exportLVGL: (w, { common, convertColor, getLVGLFont, profile }) => {
        const p = w.props || {};
        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
        if (isLocal && profile.features) {
            sensorId = profile.features.sht4x ? "sht4x_humidity" : (profile.features.sht3x ? "sht3x_humidity" : (profile.features.shtc3 ? "shtc3_humidity" : "onboard_humidity"));
        }
        if (!sensorId) sensorId = "onboard_humidity";

        const color = convertColor(p.color || "black");
        const iconSize = parseInt(p.size || 32, 10);
        const fontSize = parseInt(p.font_size || 16, 10);
        const labelSize = parseInt(p.label_font_size || 10, 10);
        const unit = p.unit || "%";
        const safeWidgetId = String(w.id || '').replace(/[^a-zA-Z0-9_]/g, '_');
        const iconLabelId = `${safeWidgetId}_icon`;
        const textLabelId = `${safeWidgetId}_text`;

        // Strict validation: Local sensor is only valid if hardware actually supports it
        const supportsOnboard = profile.features && (profile.features.sht4x || profile.features.sht3x || profile.features.shtc3);
        const hasValidSensor = (isLocal && supportsOnboard && sensorId !== "onboard_humidity") || !!w.entity_id;

        // If no valid sensor, return static strings to avoid "ID not declared" errors
        if (!hasValidSensor) {
            return {
                obj: {
                    ...common,
                    bg_opa: "transp",
                    border_width: 0,
                    widgets: [
                        {
                            label: {
                                id: iconLabelId,
                                width: iconSize + 10,
                                height: iconSize + 4,
                                align: "top_mid",
                                text: "\\U000F058E", // Static icon
                                text_font: getLVGLFont("Material Design Icons", iconSize, 400),
                                text_color: color
                            }
                        },
                        {
                            label: {
                                id: textLabelId,
                                width: "100%",
                                height: fontSize + 6,
                                align: "top_mid",
                                y: iconSize + 2,
                                text: `--${unit}`, // Static text
                                text_font: getLVGLFont(p.font_family || "Roboto", fontSize, 400),
                                text_color: color,
                                text_align: "center"
                            }
                        },
                        ...(p.show_label ? [{
                            label: {
                                width: "100%",
                                height: labelSize + 4,
                                align: "bottom_mid",
                                text: `"Humidity"`,
                                text_font: getLVGLFont(p.font_family || "Roboto", labelSize, 400),
                                text_color: color,
                                text_align: "center",
                                opa: "70%"
                            }
                        }] : [])
                    ]
                }
            };
        }

        let iconLambda = '!lambda |-\n';
        iconLambda += `          if (id(${sensorId}).has_state()) {\n`;
        iconLambda += `            float h = id(${sensorId}).state;\n`;
        iconLambda += `            if (h <= 30) return "\\U000F0E7A";\n`;
        iconLambda += `            if (h <= 60) return "\\U000F058E";\n`;
        iconLambda += `            return "\\U000F058C";\n`;
        iconLambda += '          }\n';
        iconLambda += '          return "\\U000F058E";';

        let textLambda = '!lambda |-\n';
        textLambda += `          if (id(${sensorId}).has_state()) {\n`;
        textLambda += `            return str_sprintf("%.0f${unit}", id(${sensorId}).state).c_str();\n`;
        textLambda += '          }\n';
        textLambda += `          return "--${unit}";`;

        /** @type {any[]} */
        const widgets = [
            {
                label: {
                    id: iconLabelId,
                    width: iconSize + 10,
                    height: iconSize + 4,
                    align: "top_mid",
                    text: iconLambda,
                    text_font: getLVGLFont("Material Design Icons", iconSize, 400),
                    text_color: color
                }
            },
            {
                label: {
                    id: textLabelId,
                    width: "100%",
                    height: fontSize + 6,
                    align: "top_mid",
                    y: iconSize + 2,
                    text: textLambda,
                    text_font: getLVGLFont(p.font_family || "Roboto", fontSize, 400),
                    text_color: color,
                    text_align: "center"
                }
            }
        ];

        if (p.show_label) {
            widgets.push({
                label: {
                    width: "100%",
                    height: labelSize + 4,
                    align: "bottom_mid",
                    text: `"Humidity"`,
                    text_font: getLVGLFont(p.font_family || "Roboto", labelSize, 400),
                    text_color: color,
                    text_align: "center",
                    opa: "70%"
                }
            });
        }

        return {
            obj: {
                ...common,
                bg_opa: "transp",
                border_width: 0,
                widgets: widgets
            }
        };
    },
    collectRequirements: (w, context) => {
        const { trackIcon, addFont } = context;
        const p = w.props || {};
        const iconSize = parseInt(p.size || 32, 10);
        const fontSize = parseInt(p.font_size || 16, 10);
        const labelSize = parseInt(p.label_font_size || 10, 10);

        addFont("Material Design Icons", 400, iconSize);
        addFont(p.font_family || "Roboto", 400, fontSize);
        if (p.show_label) addFont(p.font_family || "Roboto", 400, labelSize);

        ["F0E7A", "F058E", "F058C"].forEach(c => trackIcon(c, iconSize));
    },
    export: (w, context) => {
        const {
            lines, getColorConst, getCondProps, getConditionCheck, addFont, profile // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const color = getColorConst(p.color || "black");
        const unit = p.unit || "%";
        const iconSize = p.size || 32;
        const fontSize = p.font_size || 16;
        const iconFontId = addFont("Material Design Icons", 400, iconSize);
        const valueFontId = addFont(p.font_family || "Roboto", 400, fontSize);

        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");

        if (isLocal) {
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_humidity" : (profile.features.sht3x ? "sht3x_humidity" : (profile.features.shtc3 ? "shtc3_humidity" : "onboard_humidity"));
            }
        }
        if (!sensorId) sensorId = "onboard_humidity";


        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Standardized Centering Logic
        const centerX = `${w.x} + ${w.width} / 2`;

        const labelSize = p.label_font_size || 10;
        const totalHeight = iconSize + 2 + fontSize + (p.show_label ? (1 + labelSize) : 0);
        const paddingY = Math.max(0, Math.round((w.height - totalHeight) / 2));

        const iconCenterY = `${w.y} + ${paddingY} + ${Math.round(iconSize / 2)}`;
        const valueTopY = `${w.y} + ${paddingY} + ${iconSize} + 2`;
        const labelTopY = `${w.y} + ${paddingY} + ${iconSize} + 2 + ${fontSize} + 1`;

        // Icon based on humidity
        // Strict validation: Local sensor is only valid if hardware actually supports it
        const supportsOnboard = profile.features && (profile.features.sht4x || profile.features.sht3x || profile.features.shtc3);
        const hasValidSensor = (isLocal && supportsOnboard) || !!w.entity_id;

        // If no valid sensor, return static strings to avoid "ID not declared" errors
        if (!hasValidSensor) {
            // --- ICON ---
            lines.push(`          it.printf(${centerX}, ${iconCenterY}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
        } else {
            // --- ICON ---
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          if (id(${sensorId}).state <= 30) {`);
            lines.push(`            it.printf(${centerX}, ${iconCenterY}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F0E7A");`);
            lines.push(`          } else if (id(${sensorId}).state <= 60) {`);
            lines.push(`            it.printf(${centerX}, ${iconCenterY}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
            lines.push(`          } else {`);
            lines.push(`            it.printf(${centerX}, ${iconCenterY}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058C");`);
            lines.push(`          }`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${iconCenterY}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
            lines.push(`        }`);
        }

        // --- VALUE ---
        if (hasValidSensor) {
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          it.printf(${centerX}, ${valueTopY}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "%.0f${unit}", id(${sensorId}).state);`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${valueTopY}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
            lines.push(`        }`);
        } else {
            lines.push(`          it.printf(${centerX}, ${valueTopY}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
        }

        if (p.show_label) {
            const labelFontId = addFont(p.font_family || "Roboto", 400, labelSize);
            lines.push(`        it.printf(${centerX}, ${labelTopY}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "Humidity");`);
        }

        if (cond) lines.push(`        }`);
    },
    onExportNumericSensors: (context) => {
        // REGRESSION PROOF: Always destructure 'lines' from context to allow sensor generation
        const { lines, widgets, isLvgl, pendingTriggers, profile } = context;
        if (!widgets) return;

        let needsLocalSHT = false;
        for (const w of widgets) {
            if (w.type !== "ondevice_humidity") continue;
            const p = w.props || {};
            const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);

            let eid = (w.entity_id || "").trim();
            if (isLocal) {
                needsLocalSHT = true;
                if (profile.features) {
                    eid = profile.features.sht4x ? "sht4x_humidity" : (profile.features.sht3x ? "sht3x_humidity" : (profile.features.shtc3 ? "shtc3_humidity" : "onboard_humidity"));
                } else {
                    eid = "onboard_humidity";
                }
            } else if (eid) {
                if (!eid.includes(".")) eid = `sensor.${eid}`;
            }

            if (!eid) continue;

            if (!eid) continue;

            if (isLvgl && pendingTriggers) {
                if (!pendingTriggers.has(eid)) {
                    pendingTriggers.set(eid, new Set());
                }
                const safeWidgetId = String(w.id || '').replace(/[^a-zA-Z0-9_]/g, '_');
                pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${safeWidgetId}_icon`);
                pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${safeWidgetId}_text`);
            }

            // Explicitly export the Home Assistant sensor block if it's not a local sensor
            if (!isLocal && eid.startsWith("sensor.")) {
                const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                if (context.seenSensorIds && !context.seenSensorIds.has(safeId)) {
                    if (context.seenSensorIds.size === 0) {
                        lines.push("");
                        lines.push("# External Humidity Sensors");
                    }
                    context.seenSensorIds.add(safeId);
                    lines.push("- platform: homeassistant");
                    lines.push(`  id: ${safeId}`);
                    lines.push(`  entity_id: ${eid}`);
                    lines.push(`  internal: true`);
                }
            }
        }

        if (needsLocalSHT && profile.features) {
            const hasSht4x = !!profile.features.sht4x;
            const hasSht3x = !!profile.features.sht3x;
            const hasShtc3 = !!profile.features.shtc3;

            if (hasSht4x || hasSht3x || hasShtc3) {
                const shtId = hasSht4x ? "sht4x_sensor" : (hasSht3x ? "sht3x_sensor" : "shtc3_sensor");
                const shtPlatform = hasSht4x ? "sht4x" : (hasSht3x ? "sht3xd" : "shtcx");
                const humId = hasSht4x ? "sht4x_humidity" : (hasSht3x ? "sht3x_humidity" : "shtc3_humidity");

                const checkLines = context.mainLines || lines;
                const alreadyDefined = (context.seenSensorIds && context.seenSensorIds.has(shtId)) ||
                    checkLines.some(l => l.includes(`id: ${shtId}`));

                if (!alreadyDefined) {
                    if (context.seenSensorIds) {
                        context.seenSensorIds.add(shtId);
                        context.seenSensorIds.add(humId);
                    }
                    lines.push(`- platform: ${shtPlatform}`, `  id: ${shtId}`);
                    lines.push(`  humidity:`, `    id: ${humId}`, `    internal: true`);
                    lines.push(`  update_interval: 60s`);

                    if (shtPlatform === "shtcx" && !lines.some(l => l.includes("address: 0x70"))) {
                        lines.push("    address: 0x70");
                        lines.push("    i2c_id: bus_a");
                    }
                    if (shtPlatform === "sht3xd" && !lines.some(l => l.includes("address: 0x44"))) {
                        lines.push("    address: 0x44");
                    }
                }
            }
        }
    }
};
