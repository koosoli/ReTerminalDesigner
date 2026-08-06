import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRegistry, mockLogger, mockAppState } = vi.hoisted(() => {
    const mockPlugin = {
        export: (_widget, context) => {
            context.lines.push('        it.print(10, 20, id(font_roboto_400_16), COLOR_BLACK, "Hello");');
        },
        collectRequirements: (_widget, helpers) => {
            helpers.addFont('Roboto', 400, 16);
        }
    };

    return {
        mockRegistry: {
            get: vi.fn(() => mockPlugin),
            load: vi.fn(() => Promise.resolve(mockPlugin)),
            onExportHelpers: vi.fn(),
            onCollectRequirements: vi.fn()
        },
        mockLogger: {
            log: vi.fn(),
            error: vi.fn(),
            warn: vi.fn(),
            info: vi.fn()
        },
        mockAppState: {
            deviceModel: 'reterminal_e1001',
            settings: { renderingMode: 'c' }
        }
    };
});

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { CAdapter } from '../../js/io/adapters/c_adapter.js';
import { createAdapterForMode } from '../../js/io/adapter_factory.js';

describe('CAdapter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('emits drawing code without ESPHome YAML scaffolding', async () => {
        const adapter = new CAdapter();
        const output = await adapter.generate({
            currentPageIndex: 0,
            pages: [{
                name: 'Main',
                widgets: [
                    { id: 'text_1', type: 'text', x: 10, y: 20, width: 100, height: 20, props: { text: 'Hello' } }
                ]
            }]
        });

        expect(output).toContain('ESPHome Designer C/C++ drawing output');
        expect(output).toContain('Paste this into a display render callback');
        expect(output).toContain('int currentPage = 0;');
        expect(output).toContain('it.print(10, 20, id(font_roboto_400_16), COLOR_BLACK, "Hello");');
        expect(output).toContain('Font references used by this drawing code');
        expect(output).not.toContain('\nesphome:');
        expect(output).not.toContain('\ndisplay:');
        expect(mockRegistry.onCollectRequirements).not.toHaveBeenCalled();
    });

    it('passes per-widget requirement helpers to plugins in C mode', async () => {
        const weatherLikePlugin = {
            export: (_widget, context) => {
                context.lines.push('        it.printf(20, 20, id(icon_font), COLOR_BLACK, "icon");');
            },
            collectRequirements: (_widget, { trackIcon }) => {
                trackIcon('F0599', 48);
            }
        };
        mockRegistry.load.mockResolvedValueOnce(weatherLikePlugin);
        mockRegistry.get.mockReturnValueOnce(weatherLikePlugin);

        const adapter = new CAdapter();
        const output = await adapter.generate({
            currentPageIndex: 0,
            pages: [{
                name: 'Main',
                widgets: [
                    { id: 'weather_1', type: 'weather_icon', x: 0, y: 0, width: 40, height: 40, props: { size: 48 } }
                ]
            }]
        });

        expect(output).toContain('ESPHome Designer C/C++ drawing output');
        expect(mockRegistry.onCollectRequirements).not.toHaveBeenCalled();
    });

    it('omits generated comments when configured', async () => {
        const adapter = new CAdapter();
        const output = await adapter.generate({
            c_include_comments: false,
            currentPageIndex: 0,
            pages: [{
                name: 'Main',
                widgets: [{ id: 'text_1', type: 'text', x: 10, y: 20, width: 100, height: 20, props: { text: 'Hello' } }]
            }]
        });

        expect(output).toContain('int currentPage = 0;');
        expect(output).toContain('it.print(10, 20, id(font_roboto_400_16), COLOR_BLACK, "Hello");');
        expect(output).not.toContain('//');
        expect(output).not.toContain('/*');
    });

    it('keeps comment-like text inside C++ string literals', async () => {
        mockRegistry.get.mockReturnValueOnce({
            export: (_widget, context) => context.lines.push('it.print(10, 20, id(font_roboto_400_16), COLOR_BLACK, "https://example.test");')
        });

        const adapter = new CAdapter();
        const output = await adapter.generate({
            c_include_comments: false,
            pages: [{
                name: 'Main',
                widgets: [{ id: 'text_1', type: 'text', x: 10, y: 20, width: 100, height: 20, props: {} }]
            }]
        });

        expect(output).toContain('"https://example.test"');
    });

    it('is selected by the rendering mode factory', () => {
        const adapter = createAdapterForMode('c');

        expect(adapter).toBeInstanceOf(CAdapter);
        expect(adapter.mode).toBe('c');
    });
});
