// @ts-check
import { DEVICE_PROFILES } from '../io/devices.js';
import { AppState } from './state';
import { Logger } from '../utils/logger.js';
import { getColorStyle } from '../utils/device.js';
import { registry } from './plugin_registry.js';
import {
    addResizeHandles,
    confirmAction,
    createMdiIconButton,
    renderContextToolbar,
    renderDebugGridOverlay,
    renderLvglGridOverlayToElement
} from './canvas_renderer_ui.js';
import { getPageEffectiveDarkMode, getEffectiveDarkMode } from './canvas_renderer_navigation.js';
import { HA_BINARY_DOMAINS } from '../io/adapters/entity_dedup.js';

export { renderContextToolbar } from './canvas_renderer_ui.js';
export { applyZoom, focusPage, zoomToFitAll, calculateZoomToFit, updateWidgetDOM } from './canvas_renderer_navigation.js';

const TRUE_BINARY_STATES = new Set(['1', 'true', 'on', 'open', 'locked', 'home', 'active', 'occupied', 'detected', 'online']);
const FALSE_BINARY_STATES = new Set(['0', 'false', 'off', 'closed', 'unlocked', 'not_home', 'inactive', 'clear', 'offline']);

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeBinaryState(value) {
    const normalized = String(value ?? '').trim().toLowerCase();
    if (TRUE_BINARY_STATES.has(normalized)) return 'true';
    if (FALSE_BINARY_STATES.has(normalized)) return 'false';
    return normalized;
}

/**
 * @param {Record<string, any>} widget
 * @param {Record<string, any>} entityStates
 * @returns {boolean}
 */
export function isWidgetVisibleInPreview(widget, entityStates) {
    const entityId = String(widget.condition_entity || '').trim();
    if (!entityId) return true;

    const entity = entityStates?.[entityId];
    if (entity == null || entity.state == null) return true;

    const isBinaryEntity = HA_BINARY_DOMAINS.some((domain) => entityId.startsWith(domain));
    const state = isBinaryEntity ? normalizeBinaryState(entity.state) : String(entity.state);
    const min = Number(widget.condition_min);
    const max = Number(widget.condition_max);
    const hasMin = String(widget.condition_min || '').trim() !== '' && Number.isFinite(min);
    const hasMax = String(widget.condition_max || '').trim() !== '' && Number.isFinite(max);

    if (hasMin || hasMax) {
        const numericState = Number(state);
        return Number.isFinite(numericState)
            && (!hasMin || numericState >= min)
            && (!hasMax || numericState <= max);
    }

    let expected = widget.condition_state ?? widget.condition_value;
    if (expected == null || String(expected).trim() === '') return true;

    if (isBinaryEntity) {
        expected = normalizeBinaryState(expected);
        if (widget.condition_invert) expected = expected === 'true' ? 'false' : 'true';
    }

    const operator = widget.condition_operator || '==';
    const numericState = Number(state);
    const numericExpected = Number(expected);
    const isNumeric = Number.isFinite(numericState) && Number.isFinite(numericExpected);

    if (operator === '==') return isNumeric ? numericState === numericExpected : state === String(expected);
    if (operator === '!=') return isNumeric ? numericState !== numericExpected : state !== String(expected);
    if (!isNumeric) return false;
    if (operator === '<') return numericState < numericExpected;
    if (operator === '>') return numericState > numericExpected;
    if (operator === '<=') return numericState <= numericExpected;
    if (operator === '>=') return numericState >= numericExpected;

    return true;
}

/**
 * @param {import('./canvas').Canvas} canvasInstance
 */
export function render(canvasInstance) {
    if (!canvasInstance.canvas) return;

    const app = canvasInstance.app;

    /** @type {any[]} */
    const pages = AppState.pages;
    const dims = AppState.getCanvasDimensions();

    // Maintain lasso and snap guides if they existed (though they might need artboard-specific logic)
    const _existingGuides = canvasInstance.canvas.querySelectorAll(".snap-guide");
    const existingLasso = canvasInstance.canvas.querySelector(".lasso-selection");
    const fragment = document.createDocumentFragment();

    canvasInstance.canvas.innerHTML = "";

    // Apply global editor theme to the stage
    if (AppState.settings.editor_light_mode) {
        canvasInstance.canvas.classList.add("light-mode");
    } else {
        canvasInstance.canvas.classList.remove("light-mode");
    }

    // Apply viewport contrast based on the active page
    if (getEffectiveDarkMode()) { // Use the new getEffectiveDarkMode function
        if (canvasInstance.viewport) canvasInstance.viewport.classList.add("device-dark-mode");
    } else {
        if (canvasInstance.viewport) canvasInstance.viewport.classList.remove("device-dark-mode");
    }

    // Render each page as an artboard
    pages.forEach((page, index) => {
        const displayWidth = dims.width;
        const displayHeight = dims.height;

        const artboardWrapper = document.createElement("div");
        artboardWrapper.className = "artboard-wrapper";
        artboardWrapper.dataset.index = String(index);
        if (index === AppState.currentPageIndex) {
            artboardWrapper.classList.add("active-page");
        }

        // 1. Render Artboard Header
        const header = document.createElement("div");
        header.className = "artboard-header";

        // Settings button (Far Left)
        header.appendChild(createMdiIconButton("mdi-cog-outline", "Page Settings", () => {
            if (app && app.pageSettings) {
                app.pageSettings.open(index);
            }
        }));

        const nameLabel = document.createElement("span");
        nameLabel.className = "artboard-name";
        nameLabel.textContent = page.name || `Page ${index + 1} `;
        header.appendChild(nameLabel);

        const actions = document.createElement("div");
        actions.className = "artboard-actions";

        // Reorder buttons
        if (index > 0) {
            actions.appendChild(createMdiIconButton("mdi-chevron-left", "Move Left", () => {
                AppState.reorderPage(index, index - 1);
            }));
        }
        if (index < pages.length - 1) {
            actions.appendChild(createMdiIconButton("mdi-chevron-right", "Move Right", () => {
                AppState.reorderPage(index, index + 1);
            }));
        }

        // Add Page button (Plus)
        actions.appendChild(createMdiIconButton("mdi-plus", "Add Page After", () => {
            AppState.addPage(index + 1);
        }));

        // Clear Page button (Eraser) - Distinguished from deletion
        actions.appendChild(createMdiIconButton("mdi-eraser", "Clear Current Page", () => {
            confirmAction({
                title: "Clear Page",
                message: `Are you sure you want to clear all widgets from < b > "${page.name || `Page ${index + 1}`}"</b >? <br><br>This cannot be undone.`,
                confirmLabel: "Clear Page",
                confirmClass: "btn-danger",
                onConfirm: () => {
                    AppState.setCurrentPageIndex(index);
                    AppState.clearCurrentPage();
                }
            });
        }));

        // Delete Page button (Trash)
        actions.appendChild(createMdiIconButton("mdi-delete-outline", "Delete Page", () => {
            confirmAction({
                title: "Delete Page",
                message: `Are you sure you want to delete the page <b>"${page.name || `Page ${index + 1}`}"</b>?<br><br>All widgets on this page will be lost.`,
                confirmLabel: "Delete Page",
                confirmClass: "btn-danger",
                onConfirm: () => {
                    AppState.deletePage(index);
                }
            });
        }));

        header.appendChild(actions);

        // Atomic Scaling: Wrap header in a container to maintain layout while scaling content
        const headerContainer = document.createElement("div");
        headerContainer.className = "artboard-header-container";
        headerContainer.style.width = displayWidth + "px";
        headerContainer.appendChild(header);

        const refWidth = 320; // Natural width required for all tools + name
        if (displayWidth < refWidth) {
            const scale = displayWidth / refWidth;
            header.style.width = refWidth + "px";
            header.style.transform = `scale(${scale})`;
            header.style.transformOrigin = "top left";
            headerContainer.style.height = (40 * scale) + "px"; // 40px is the header height in CSS
        } else {
            header.style.width = "100%";
            header.style.transform = "none";
            headerContainer.style.height = "auto";
        }

        artboardWrapper.appendChild(headerContainer);

        // 2. Render Artboard Content
        const shape = AppState.getCanvasShape();
        const isRound = shape === "round" || shape === "circle";

        const artboard = document.createElement("div");
        artboard.className = "artboard";
        artboard.dataset.index = String(index);

        // For round displays, use actual resolution - this allows ellipses for non-square resolutions
        // The device settings auto-set square resolution when 'round' is selected, but users can override
        artboard.style.width = `${displayWidth}px`;
        artboard.style.height = `${displayHeight}px`;

        // Apply page-specific theme
        const isDark = getPageEffectiveDarkMode(page);
        artboard.classList.toggle("dark", isDark);

        // Apply display shape
        artboard.classList.toggle("round-display", isRound);

        // Apply grid if enabled
        if (AppState.showGrid) {
            const grid = document.createElement("div");
            grid.className = "canvas-grid";
            artboard.appendChild(grid);
        }

        // Render Debug Grid if enabled
        if (AppState.showDebugGrid) {
            renderDebugGridOverlay(artboard, dims, isDark);
        }

        // Render LVGL grid overlay if page has grid layout
        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            renderLvglGridOverlayToElement(artboard, page.layout, dims, isDark);
        }

        // Render widgets
        for (const widget of page.widgets) {
            const conditionallyHidden = !isWidgetVisibleInPreview(widget, AppState.entityStates || {});
            if (conditionallyHidden && !AppState.settings.showConditionalWidgets) continue;

            /** @type {HTMLElement} */
            const el = document.createElement("div");
            el.className = "widget";
            el.style.left = String(widget.x) + "px";
            el.style.top = String(widget.y) + "px";
            el.style.width = String(widget.width) + "px";
            el.style.height = String(widget.height) + "px";
            el.dataset.id = widget.id;
            el.dataset.pageIndex = String(index);

            if (AppState.selectedWidgetIds.includes(widget.id)) {
                el.classList.add("active");
            }
            if (widget.locked) el.classList.add("locked");
            if (widget.hidden) el.classList.add("hidden-widget");
            if (conditionallyHidden) el.classList.add("conditional-hidden-widget");

            const type = (widget.type || "").toLowerCase();
            const feature = registry.get(type);

            if (type === 'group') {
                // Internal group rendering: simple container logic
                el.classList.add('widget-group');
                el.innerHTML = ''; // Groups are mostly invisible containers
            } else if (feature && feature.render) {
                try {
                    /** @param {string | null | undefined} colorName */
                    const wrappedGetColorStyle = (colorName) => {
                        if (colorName === 'theme_auto') return isDark ? '#ffffff' : '#000000';
                        if (colorName === 'theme_auto_inverse') return isDark ? '#000000' : '#ffffff';
                        const effectiveColor = colorName;
                        if (!effectiveColor) return isDark ? '#ffffff' : '#000000';
                        return getColorStyle(effectiveColor);
                    };

                    const isSelected = AppState.selectedWidgetIds.includes(widget.id);
                    const deviceModel = AppState.settings.device_model || 'reterminal_e1001';
                    const profile = DEVICE_PROFILES && deviceModel in DEVICE_PROFILES
                        ? DEVICE_PROFILES[/** @type {keyof typeof DEVICE_PROFILES} */ (deviceModel)]
                        : null;

                    feature.render(el, widget, {
                        getColorStyle: wrappedGetColorStyle,
                        selected: isSelected,
                        profile: profile,
                        isDark: isDark
                    });

                    // Central opacity application — drives the canvas preview for all plugins
                    const opa = widget.props?.opacity;
                    if (opa !== undefined && opa < 100) {
                        el.style.opacity = String(opa / 100);
                    }
                } catch {
                    el.textContent = `Error: ${type}`;
                    el.style.border = "2px solid red";
                }
            } else {
                el.innerText = `Missing: ${type}`;
                el.style.color = "red";
                el.style.border = "1px dashed red";
            }

            if (type !== 'group') {
                addResizeHandles(el);
            }
            artboard.appendChild(el);
        }

        artboardWrapper.appendChild(artboard);
        fragment.appendChild(artboardWrapper);
    });

    // 3. Render Add Page Placeholder (nice faded plus icon)
    const addPlaceholder = document.createElement("div");
    addPlaceholder.className = "add-page-placeholder";
    addPlaceholder.title = "Click to add a new page";

    // Match dimensions of artboards if possible
    addPlaceholder.style.width = `${dims.width}px`;
    addPlaceholder.style.height = `${dims.height}px`;
    addPlaceholder.style.marginTop = "32px"; // Offset to align with artboard content, not header
    addPlaceholder.style.position = "relative";
    addPlaceholder.style.zIndex = "2000"; // Higher than overlays
    addPlaceholder.style.pointerEvents = "auto"; // Explicitly enable clicks

    addPlaceholder.innerHTML = `
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;

    // Apply round display shape if applicable
    const placeholderShape = AppState.getCanvasShape();
    if (placeholderShape === "round" || placeholderShape === "circle") {
        addPlaceholder.classList.add("round-display");
    }

    /** @param {MouseEvent} e */
    const handleClick = (e) => {
        Logger.log("[Canvas] Add Page placeholder clicked");
        e.stopPropagation();
        e.preventDefault(); // Prevent accidental selection logic

        const newPage = AppState.addPage();
        if (newPage) {
            const newIndex = AppState.pages.length - 1;

            // Set suppression flag on canvas BEFORE triggering page change
            if (app && app.canvas) {
                app.canvas.suppressNextFocus = true;
            }

            AppState.setCurrentPageIndex(newIndex);
        }
    };

    // Dual binding was causing double execution. Sticking to addEventListener only.
    addPlaceholder.addEventListener('mousedown', (/** @type {MouseEvent} */ e) => e.stopPropagation()); // Prevent canvas drag start
    addPlaceholder.addEventListener('click', handleClick);

    // Append to the end of the canvas (after the last page)
    fragment.appendChild(addPlaceholder);

    if (existingLasso) fragment.appendChild(existingLasso);

    canvasInstance.canvas.appendChild(fragment);

    // Render contextual toolbar for selection
    renderContextToolbar(canvasInstance);
}
