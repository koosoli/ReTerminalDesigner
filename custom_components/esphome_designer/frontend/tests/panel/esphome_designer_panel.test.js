/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('esphome-designer-panel', () => {
    beforeEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        delete window.__ESPHOME_DESIGNER_HASS__;
    });

    it('mounts a same-origin iframe wrapper and forwards the HA token', async () => {
        const mod = await import('../../panel/esphome-designer-panel.js');

        expect(customElements.get('esphome-designer-panel')).toBe(mod.ESPHomeDesignerPanel);

        const el = document.createElement('esphome-designer-panel');
        el.hass = {
            auth: {
                data: {
                    access_token: 'ha-runtime-token',
                },
            },
        };

        document.body.appendChild(el);

        const iframe = /** @type {HTMLIFrameElement | null} */ (el.querySelector('iframe'));
        expect(iframe).not.toBeNull();
        expect(iframe?.src).toContain('/esphome-designer/editor/index.html');
        expect(el.style.height).toBe('100dvh');
        expect(el.style.minHeight).toBe('0');
        expect(iframe?.style.height).toBe('100%');

        const payload = JSON.parse(iframe?.name || '{}');
        expect(payload).toEqual({
            type: 'esphome-designer-ha-auth',
            accessToken: 'ha-runtime-token',
        });
        expect(window.__ESPHOME_DESIGNER_HASS__).toEqual(el._hass);
    });

    it('suppresses the benign HA transition abort rejection', async () => {
        const mod = await import('../../panel/esphome-designer-panel.js');

        expect(
            mod.isIgnorableTransitionAbort(new DOMException('Transition was skipped', 'AbortError'))
        ).toBe(true);
        expect(
            mod.isIgnorableTransitionAbort(new DOMException('Transition was aborted because of invalid state', 'InvalidStateError'))
        ).toBe(true);
        expect(
            mod.isIgnorableTransitionAbort(new Error('something else'))
        ).toBe(false);

        const event = new Event('unhandledrejection', { cancelable: true });
        Object.defineProperty(event, 'reason', {
            configurable: true,
            value: new DOMException('Transition was skipped', 'AbortError'),
        });

        window.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
    });

    it('marks blank iframes for rehydration after idle wake-up', async () => {
        const mod = await import('../../panel/esphome-designer-panel.js');
        const iframe = document.createElement('iframe');
        const blankDoc = document.implementation.createHTMLDocument('blank');

        Object.defineProperty(iframe, 'contentWindow', {
            configurable: true,
            value: { location: { href: 'about:blank' } },
        });
        Object.defineProperty(iframe, 'contentDocument', {
            configurable: true,
            value: blankDoc,
        });

        expect(mod.iframeNeedsRehydration(iframe)).toBe(true);

        const liveDoc = document.implementation.createHTMLDocument('live');
        liveDoc.body.innerHTML = '<div class="app-content"><div id="canvasContainer"></div></div>';

        Object.defineProperty(iframe, 'contentWindow', {
            configurable: true,
            value: { location: { href: 'http://localhost/esphome-designer/editor/index.html' } },
        });
        Object.defineProperty(iframe, 'contentDocument', {
            configurable: true,
            value: liveDoc,
        });

        expect(mod.iframeNeedsRehydration(iframe)).toBe(false);
    });

    it('rehydrates a blank panel iframe on wake-up and reapplies auth', async () => {
        await import('../../panel/esphome-designer-panel.js');

        const el = document.createElement('esphome-designer-panel');
        el.hass = {
            auth: {
                data: {
                    access_token: 'wake-token',
                },
            },
        };

        document.body.appendChild(el);

        const firstIframe = /** @type {HTMLIFrameElement | null} */ (el.querySelector('iframe'));
        expect(firstIframe).not.toBeNull();

        const blankDoc = document.implementation.createHTMLDocument('blank');
        Object.defineProperty(firstIframe, 'contentWindow', {
            configurable: true,
            value: {
                location: { href: 'about:blank' },
                postMessage: vi.fn(),
                close: vi.fn(),
            },
        });
        Object.defineProperty(firstIframe, 'contentDocument', {
            configurable: true,
            value: blankDoc,
        });

        window.dispatchEvent(new Event('focus'));

        const rehydratedIframe = /** @type {HTMLIFrameElement | null} */ (el.querySelector('iframe'));
        expect(rehydratedIframe).not.toBeNull();
        expect(rehydratedIframe).not.toBe(firstIframe);
        expect(JSON.parse(rehydratedIframe?.name || '{}')).toEqual({
            type: 'esphome-designer-ha-auth',
            accessToken: 'wake-token',
        });
        expect(window.__ESPHOME_DESIGNER_HASS__).toEqual(el._hass);
    });

    it('keeps a healthy iframe mounted and resyncs auth on wake-up', async () => {
        await import('../../panel/esphome-designer-panel.js');

        const el = document.createElement('esphome-designer-panel');
        el.hass = {
            auth: {
                data: {
                    access_token: 'healthy-token',
                },
            },
        };

        document.body.appendChild(el);

        const iframe = /** @type {HTMLIFrameElement | null} */ (el.querySelector('iframe'));
        expect(iframe).not.toBeNull();

        const liveDoc = document.implementation.createHTMLDocument('live');
        liveDoc.body.innerHTML = '<div class="app-content"><div id="canvasContainer"></div></div>';
        const postMessage = vi.fn();

        Object.defineProperty(iframe, 'contentWindow', {
            configurable: true,
            value: {
                location: { href: 'http://localhost/esphome-designer/editor/index.html' },
                postMessage,
                close: vi.fn(),
            },
        });
        Object.defineProperty(iframe, 'contentDocument', {
            configurable: true,
            value: liveDoc,
        });

        window.dispatchEvent(new Event('pageshow'));

        expect(el.querySelector('iframe')).toBe(iframe);
        expect(postMessage).toHaveBeenCalledWith({
            type: 'esphome-designer-ha-auth',
            accessToken: 'healthy-token',
        }, window.location.origin);
    });
});
