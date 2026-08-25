import { render } from './render.js';
import { renderProperties } from './properties.js';
import { collectRequirements, exportDoc, exportLVGL, exportOEPL, exportOpenDisplay, onExportNumericSensors, onExportTextSensors } from './exports.js';

export default {
    id: "weather_forecast",
    name: "Weather Forecast",
    category: "Sensors",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
defaults: {
        weather_entity: "weather.forecast_home",
        forecast_mode: "daily",
        hourly_mode: "fixed",
        relative_count: 5,
        hourly_slots: "06,09,12,15,18,21",
        days: 5,
        layout: "horizontal",
        icon_size: 32,
        temp_font_size: 14,
        day_font_size: 12,
        font_weight_day: 700,
        font_weight_temp: 400,
        color: "theme_auto",
        font_family: "Roboto",
        show_high_low: true,
        start_offset: 0,
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
        background_color: "transparent",
        temp_unit: "C",
        precision: 1,
        width: 370,
        height: 90,
        opa: 255,
        opacity: 100,
        bg_color: "transparent",
        custom_font_family: ""
    },
    renderProperties,
    render,
    exportLVGL,
    exportOpenDisplay,
    exportOEPL,
    export: exportDoc,
    onExportNumericSensors,
    onExportTextSensors,
    collectRequirements
};
