import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockFeatureRender,
    mockRegistry,
    mockAddResizeHandles,
    mockConfirmAction,
    mockCreateMdiIconButton,
    mockRenderContextToolbar,
    mockRenderDebugGridOverlay,
    mockRenderLvglGridOverlayToElement,
    mockGetPageEffectiveDarkMode,
    mockGetEffectiveDarkMode
} = vi.hoisted(() => ({
    mockAppState: {
        pages: [],
        currentPageIndex: 0,
        selectedWidgetIds: [],
        showGrid: false,
        showDebugGrid: false,
        settings: {
            editor_light_mode: false,
            device_model: 'demo_model'
        },
        getCanvasDimensions: vi.fn(() => ({ width: 200, height: 100 })),
        getCanvasShape: vi.fn(() => 'rect'),
        reorderPage: vi.fn(),
        addPage: vi.fn(),
        setCurrentPageIndex: vi.fn(),
        clearCurrentPage: vi.fn(),
        deletePage: vi.fn()
    },
    mockFeatureRender: vi.fn(),
    mockRegistry: {
        get: vi.fn()
    },
    mockAddResizeHandles: vi.fn(),
    mockConfirmAction: vi.fn(),
    mockCreateMdiIconButton: vi.fn((icon, label, onClick) => {
        const button = document.createElement('button');
        button.dataset.icon = icon;
        button.title = label;
        button.addEventListener('click', onClick);
        return button;
    }),
    mockRenderContextToolbar: vi.fn(),
    mockRenderDebugGridOverlay: vi.fn(),
    mockRenderLvglGridOverlayToElement: vi.fn(),
    mockGetPageEffectiveDarkMode: vi.fn(),
    mockGetEffectiveDarkMode: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        demo_model: { name: 'Demo Model', features: { lcd: true } }
    }
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn()
    }
}));

vi.mock('../../js/utils/device.js', () => ({
    getColorStyle: (value) => `resolved-${value}`
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/core/canvas_renderer_ui.js', () => ({
    addResizeHandles: mockAddResizeHandles,
    confirmAction: mockConfirmAction,
    createMdiIconButton: mockCreateMdiIconButton,
    renderContextToolbar: mockRenderContextToolbar,
    renderDebugGridOverlay: mockRenderDebugGridOverlay,
    renderLvglGridOverlayToElement: mockRenderLvglGridOverlayToElement
}));

vi.mock('../../js/core/canvas_renderer_navigation.js', () => ({
    getPageEffectiveDarkMode: mockGetPageEffectiveDarkMode,
    getEffectiveDarkMode: mockGetEffectiveDarkMode,
    applyZoom: vi.fn(),
    focusPage: vi.fn(),
    zoomToFitAll: vi.fn(),
    calculateZoomToFit: vi.fn(),
    updateWidgetDOM: vi.fn()
}));

import { isWidgetVisibleInPreview, render } from '../../js/core/canvas_renderer.js';

describe('canvas_renderer core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockAppState.pages = [];
        mockAppState.currentPageIndex = 0;
        mockAppState.selectedWidgetIds = [];
        mockAppState.showGrid = false;
        mockAppState.showDebugGrid = false;
        mockAppState.settings = {
            editor_light_mode: false,
            device_model: 'demo_model'
        };
        mockAppState.entityStates = {};
        mockAppState.getCanvasShape.mockReturnValue('rect');
        mockAppState.addPage.mockImplementation((index) => {
            const page = { name: `Page ${mockAppState.pages.length + 1}`, widgets: [] };
            if (typeof index === 'number') {
                mockAppState.pages.splice(index, 0, page);
            } else {
                mockAppState.pages.push(page);
            }
            return page;
        });
        mockGetEffectiveDarkMode.mockReturnValue(false);
        mockGetPageEffectiveDarkMode.mockImplementation((page) => page.dark_mode === 'dark');
    });

    it('renders themed artboards, plugin output, overlays, and error fallbacks', () => {
        mockAppState.pages = [
            {
                name: 'Overview',
                dark_mode: 'dark',
                layout: '2x2',
                widgets: [
                    { id: 'group_1', type: 'group', x: 0, y: 0, width: 20, height: 20, props: {} },
                    { id: 'text_1', type: 'text', x: 12, y: 16, width: 80, height: 24, props: { color: 'black', opacity: 60 } },
                    { id: 'broken_1', type: 'broken', x: 2, y: 4, width: 30, height: 20, props: {} },
                    { id: 'missing_1', type: 'unknown', x: 5, y: 6, width: 30, height: 20, props: {} }
                ]
            },
            {
                name: 'Status',
                dark_mode: 'light',
                widgets: []
            }
        ];
        mockAppState.selectedWidgetIds = ['text_1'];
        mockAppState.showGrid = true;
        mockAppState.showDebugGrid = true;
        mockAppState.settings.editor_light_mode = true;
        mockAppState.getCanvasShape.mockReturnValue('round');
        mockGetEffectiveDarkMode.mockReturnValue(true);
        mockRegistry.get.mockImplementation((type) => {
            if (type === 'text') {
                return {
                    render: mockFeatureRender.mockImplementation((el) => {
                        el.textContent = 'Rendered text';
                    })
                };
            }
            if (type === 'broken') {
                return {
                    render: () => {
                        throw new Error('boom');
                    }
                };
            }
            return undefined;
        });

        const canvas = document.createElement('div');
        const lasso = document.createElement('div');
        lasso.className = 'lasso-selection';
        canvas.appendChild(lasso);
        const viewport = document.createElement('div');
        const canvasInstance = {
            canvas,
            viewport,
            app: {
                pageSettings: {
                    open: vi.fn()
                },
                canvas: {
                    suppressNextFocus: false
                }
            }
        };

        render(canvasInstance);

        expect(canvas.classList.contains('light-mode')).toBe(true);
        expect(viewport.classList.contains('device-dark-mode')).toBe(true);
        expect(canvas.querySelectorAll('.artboard-wrapper')).toHaveLength(2);
        expect(canvas.querySelector('.artboard-wrapper.active-page')).toBeTruthy();
        expect(canvas.querySelector('.artboard.dark.round-display')).toBeTruthy();
        expect(canvas.querySelectorAll('.canvas-grid')).toHaveLength(2);
        expect(mockRenderDebugGridOverlay).toHaveBeenCalledTimes(2);
        expect(mockRenderLvglGridOverlayToElement).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            '2x2',
            { width: 200, height: 100 },
            true
        );
        expect(mockFeatureRender).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({ id: 'text_1' }),
            expect.objectContaining({
                selected: true,
                isDark: true,
                profile: expect.any(Object),
                getColorStyle: expect.any(Function)
            })
        );
        expect(canvas.querySelector('.widget[data-id="text_1"]')?.style.opacity).toBe('0.6');
        expect(mockAddResizeHandles).toHaveBeenCalledTimes(3);
        expect(canvas.querySelector('.widget[data-id="broken_1"]')?.textContent).toBe('Error: broken');
        expect(canvas.querySelector('.widget[data-id="missing_1"]')?.innerText).toBe('Missing: unknown');
        expect(canvas.querySelector('.lasso-selection')).toBeTruthy();
        expect(mockRenderContextToolbar).toHaveBeenCalledWith(canvasInstance);
    });

    it('matches widget visibility conditions against cached entity states', () => {
        const binaryWidget = {
            condition_entity: 'binary_sensor.door',
            condition_operator: '==',
            condition_state: 'on'
        };

        expect(isWidgetVisibleInPreview(binaryWidget, {
            'binary_sensor.door': { state: 'on' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview(binaryWidget, {
            'binary_sensor.door': { state: 'off' }
        })).toBe(false);
        expect(isWidgetVisibleInPreview({ condition_entity: '' }, {})).toBe(true);
        expect(isWidgetVisibleInPreview(binaryWidget, {
            'binary_sensor.door': { state: null }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'input_boolean.night_mode',
            condition_operator: '==',
            condition_state: 'true'
        }, {
            'input_boolean.night_mode': { state: 'on' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'binary_sensor.connection',
            condition_operator: '==',
            condition_state: 'unavailable'
        }, {
            'binary_sensor.connection': { state: 'unavailable' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'input_boolean.night_mode',
            condition_operator: '==',
            condition_state: 'true',
            condition_invert: true
        }, {
            'input_boolean.night_mode': { state: 'off' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_min: '18',
            condition_max: '24'
        }, {
            'sensor.temperature': { state: '21.5' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_min: '18',
            condition_max: '24'
        }, {
            'sensor.temperature': { state: '25' }
        })).toBe(false);
        expect(isWidgetVisibleInPreview(binaryWidget, {})).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '==',
            condition_state: '21'
        }, {
            'sensor.temperature': { state: '21.0' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.mode',
            condition_operator: '!=',
            condition_state: 'away'
        }, {
            'sensor.mode': { state: 'home' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '<',
            condition_state: '22'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '>',
            condition_state: '20'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '<=',
            condition_state: '21'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '>=',
            condition_state: '21'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: '>',
            condition_state: 'high'
        }, {
            'sensor.temperature': { state: 'unknown' }
        })).toBe(false);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_min: '18'
        }, {
            'sensor.temperature': { state: 'unknown' }
        })).toBe(false);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_max: '24'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_operator: 'unsupported',
            condition_state: '21'
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
        expect(isWidgetVisibleInPreview({
            condition_entity: 'sensor.temperature',
            condition_state: ''
        }, {
            'sensor.temperature': { state: '21' }
        })).toBe(true);
    });

    it('renders conditionally hidden widgets in edit mode with a distinct outline', () => {
        mockAppState.pages = [{
            name: 'Overview',
            widgets: [{
                id: 'conditional_1',
                type: 'text',
                x: 10,
                y: 10,
                width: 80,
                height: 20,
                condition_entity: 'binary_sensor.door',
                condition_state: 'on',
                props: {}
            }]
        }];
        mockAppState.entityStates = { 'binary_sensor.door': { state: 'off' } };
        mockAppState.settings.showConditionalWidgets = true;
        mockRegistry.get.mockReturnValue({ render: mockFeatureRender });

        const canvas = document.createElement('div');
        render({ canvas, viewport: document.createElement('div'), app: {} });

        expect(canvas.querySelector('.widget[data-id="conditional_1"]')?.classList.contains('conditional-hidden-widget')).toBe(true);
    });

    it('wires header action buttons to page operations', () => {
        mockAppState.pages = [
            { name: 'Page One', widgets: [] },
            { name: 'Page Two', widgets: [] }
        ];

        const pageSettingsOpen = vi.fn();
        const canvas = document.createElement('div');
        const viewport = document.createElement('div');
        const canvasInstance = {
            canvas,
            viewport,
            app: {
                pageSettings: {
                    open: pageSettingsOpen
                },
                canvas: {
                    suppressNextFocus: false
                }
            }
        };

        render(canvasInstance);

        canvas.querySelector('button[title="Page Settings"]')?.click();
        expect(pageSettingsOpen).toHaveBeenCalledWith(0);

        canvas.querySelector('button[title="Move Right"]')?.click();
        expect(mockAppState.reorderPage).toHaveBeenCalledWith(0, 1);

        canvas.querySelector('button[title="Move Left"]')?.click();
        expect(mockAppState.reorderPage).toHaveBeenCalledWith(1, 0);

        canvas.querySelector('button[title="Add Page After"]')?.click();
        expect(mockAppState.addPage).toHaveBeenCalledWith(1);

        canvas.querySelector('button[title="Clear Current Page"]')?.click();
        const clearDialog = mockConfirmAction.mock.calls.at(-1)[0];
        clearDialog.onConfirm();
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(0);
        expect(mockAppState.clearCurrentPage).toHaveBeenCalled();

        canvas.querySelector('button[title="Delete Page"]')?.click();
        const deleteDialog = mockConfirmAction.mock.calls.at(-1)[0];
        deleteDialog.onConfirm();
        expect(mockAppState.deletePage).toHaveBeenCalledWith(0);
    });

    it('adds pages from the placeholder and suppresses focus jumps on the next render', () => {
        mockAppState.pages = [
            { name: 'Page One', widgets: [] },
            { name: 'Page Two', widgets: [] }
        ];
        mockAppState.getCanvasShape.mockReturnValue('circle');

        const canvas = document.createElement('div');
        const viewport = document.createElement('div');
        const canvasInstance = {
            canvas,
            viewport,
            app: {
                pageSettings: {
                    open: vi.fn()
                },
                canvas: {
                    suppressNextFocus: false
                }
            }
        };

        render(canvasInstance);

        const placeholder = canvas.querySelector('.add-page-placeholder');
        expect(placeholder?.classList.contains('round-display')).toBe(true);

        placeholder?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

        expect(mockAppState.addPage).toHaveBeenCalledWith();
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(2);
        expect(canvasInstance.app.canvas.suppressNextFocus).toBe(true);
    });
});
