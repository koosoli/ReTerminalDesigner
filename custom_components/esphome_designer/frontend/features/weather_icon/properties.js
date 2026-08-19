import { AppState } from '@core/state';

/**
 * @typedef {{
 *   id: string,
 *   entity_id?: string,
 *   props?: Record<string, any>
 * }} WeatherIconWidget
 */

/**
 * @typedef {{
 *   createSection: (...args: any[]) => void,
 *   addLabeledInputWithPicker: (...args: any[]) => void,
 *   addLabeledInput: (...args: any[]) => void,
 *   addHint: (...args: any[]) => void,
 *   addNumberWithSlider: (...args: any[]) => void,
 *   addCheckbox: (...args: any[]) => void,
 *   addColorSelector: (...args: any[]) => void,
 *   addDropShadowButton: (...args: any[]) => void,
 *   endSection: () => void,
 *   getContainer: () => HTMLElement
 * }} WeatherIconPropertyPanel
 */

/**
 * @param {WeatherIconPropertyPanel} panel
 * @param {WeatherIconWidget} widget
 */
export function renderWeatherIconProperties(panel, widget) {
        const props = widget.props || {};
        /**
         * @param {string} key
         * @param {any} val
         */
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Data Source", true);
        panel.addLabeledInputWithPicker("Weather Entity", "text", widget.entity_id || props.weather_entity || "weather.forecast_home", (/** @type {string} */ v) => {
            AppState.updateWidget(widget.id, { entity_id: v });
        }, widget);

        panel.addLabeledInput("Entity Attribute", "text", props.attribute || "", (/** @type {string} */ v) => updateProp("attribute", v.trim()));
        panel.addHint("Optional: Read condition from an attribute (e.g. for forecasts).");
        panel.endSection();

        panel.createSection("Icon Settings", true);
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (/** @type {number} */ v) => updateProp("opacity", v));
        panel.addLabeledInput("Icon Size (px)", "number", props.size || 48, (/** @type {string} */ v) => {
            let n = parseInt(v || "48", 10);
            updateProp("size", isNaN(n) ? 48 : n);
        });
        panel.addCheckbox("Fit icon to frame", !!props.fit_icon_to_frame, (/** @type {boolean} */ v) => updateProp("fit_icon_to_frame", v));
        panel.addCheckbox("Local / On-Device Sensor", !!props.is_local_sensor, (/** @type {boolean} */ v) => updateProp("is_local_sensor", v));
        panel.addColorSelector("Icon Color", props.color || "theme_auto", null, (/** @type {string} */ v) => updateProp("color", v));
        panel.endSection();

        panel.createSection("Appearance", false);
        panel.addColorSelector("Background", props.bg_color || props.background_color || "transparent", null, (/** @type {string} */ v) => updateProp("bg_color", v));
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (/** @type {string} */ v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (/** @type {string} */ v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (/** @type {string} */ v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
}

