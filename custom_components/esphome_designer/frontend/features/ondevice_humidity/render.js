import { AppState } from '../../js/core/state';

/**
 * @param {HTMLElement} el
 * @param {{
 *   height?: number,
 *   entity_id?: string,
 *   props?: {
 *     color?: string,
 *     size?: number,
 *     font_size?: number,
 *     font_family?: string,
 *     label_font_size?: number,
 *     unit?: string,
 *     show_label?: boolean,
 *     precision?: number,
 *     fit_icon_to_frame?: boolean,
 *     is_local_sensor?: boolean
 *   }
 * }} widget
 * @param {{ getColorStyle: (value: string) => string }} context
 * @returns {void}
 */
export const renderOnDeviceHumidity = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    let iconSize = props.size || 32;
    let fontSize = props.font_size || 16;
    let labelFontSize = props.label_font_size || 12;
    const unit = props.unit || "%";
    const showLabel = props.show_label !== false;
    const precision = props.precision ?? 0;

    let humidity = 45; // Default preview value

    if (props.fit_icon_to_frame) {
        const padding = 2;
        const h = (widget.height || 60) - padding * 2;

        iconSize = Math.round(h * 0.45);
        fontSize = Math.round(h * 0.25);
        labelFontSize = Math.round(h * 0.15);

        // Bound checks
        iconSize = Math.max(8, iconSize);
        fontSize = Math.max(8, fontSize);
        labelFontSize = Math.max(6, labelFontSize);
    }

    if (!props.is_local_sensor && widget.entity_id) {
        if (AppState && AppState.entityStates) {
            const stateObj = AppState.entityStates[widget.entity_id];
            if (stateObj && stateObj.state !== undefined) {
                const val = parseFloat(stateObj.state);
                if (!isNaN(val)) {
                    humidity = val;
                }
            }
        }
    }

    let iconCode;
    if (humidity <= 30) {
        iconCode = "F0E7A"; // water-outline (low)
    } else if (humidity <= 60) {
        iconCode = "F058E"; // water-percent (normal)
    } else {
        iconCode = "F058C"; // water (high)
    }

    const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
    const ch = String.fromCodePoint(cp);

    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.color = getColorStyle(color);

    const iconEl = document.createElement("div");
    iconEl.textContent = ch;
    iconEl.style.fontSize = `${iconSize}px`;
    iconEl.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    iconEl.style.lineHeight = "1";
    el.appendChild(iconEl);

    const valueEl = document.createElement("div");
    valueEl.style.fontFamily = fontFamily;
    valueEl.style.fontSize = `${fontSize}px`;
    valueEl.style.fontWeight = "500";
    valueEl.style.marginTop = "2px";
    valueEl.textContent = humidity.toFixed(precision) + unit;
    el.appendChild(valueEl);

    if (showLabel) {
        const labelEl = document.createElement("div");
        labelEl.style.fontFamily = fontFamily;
        labelEl.style.fontSize = `${labelFontSize}px`;
        labelEl.style.opacity = "0.7";
        labelEl.style.marginTop = "1px";
        labelEl.textContent = "Humidity";
        el.appendChild(labelEl);
    }
};


