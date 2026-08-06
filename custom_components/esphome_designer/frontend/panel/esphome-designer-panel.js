import { installIgnorableRejectionHandler, isIgnorableWindowRejection } from '../js/utils/ignorable_rejections.js';

const PANEL_TAG_NAME = 'esphome-designer-panel';
const PANEL_IFRAME_ID = 'esphome-designer-panel-frame';
const HA_AUTH_MESSAGE_TYPE = 'esphome-designer-ha-auth';
const HA_HASS_GLOBAL_KEY = '__ESPHOME_DESIGNER_HASS__';
const EDITOR_URL = '/esphome-designer/editor/index.html';

/**
 * @param {HTMLIFrameElement | null | undefined} iframe
 * @returns {boolean}
 */
export function iframeNeedsRehydration(iframe) {
    if (!iframe) {
        return true;
    }

    try {
        const frameLocation = iframe.contentWindow?.location?.href || '';
        if (frameLocation === 'about:blank') {
            return true;
        }

        const doc = iframe.contentDocument;
        if (!doc || doc.readyState === 'loading') {
            return false;
        }

        return !(
            doc.querySelector('.app-content')
            || doc.getElementById('canvasContainer')
            || doc.getElementById('canvas')
            || doc.getElementById('widgetPalette')
            || doc.getElementById('header-placeholder')
        );
    } catch {
        return false;
    }
}

/**
 * @param {unknown} reason
 * @returns {boolean}
 */
export function isIgnorableTransitionAbort(reason) {
    return isIgnorableWindowRejection(reason);
}

/**
 * @param {any} hass
 * @returns {string | null}
 */
function extractAccessToken(hass) {
    return (
        hass?.auth?.data?.access_token
        || hass?.connection?.options?.auth?.access_token
        || hass?.connection?._auth?.accessToken
        || null
    );
}

/**
 * @param {HTMLIFrameElement} iframe
 * @param {string | null} accessToken
 */
function syncIframeAuth(iframe, accessToken) {
    if (!accessToken) {
        return;
    }

    const payload = {
        type: HA_AUTH_MESSAGE_TYPE,
        accessToken,
    };
    const serialized = JSON.stringify(payload);
    iframe.name = serialized;

    try {
        iframe.contentWindow?.postMessage(payload, window.location.origin);
    } catch {
        // Ignore iframe timing races during initial navigation.
    }
}

installIgnorableRejectionHandler();

export class ESPHomeDesignerPanel extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
        this._iframe = null;
        this._hass = null;
        this._boundWake = () => {
            if (document.visibilityState === 'hidden') {
                return;
            }
            this._rehydrateIframeIfNeeded();
        };
        this._lifecycleHandlersAttached = false;
    }

    set hass(value) {
        this._hass = value;
        try {
            window[HA_HASS_GLOBAL_KEY] = value;
        } catch {
            // Ignore global exposure failures in restricted runtimes.
        }
        this._syncAuth();
    }

    connectedCallback() {
        this._applyHostStyles();
        this._attachLifecycleHandlers();

        if (this._rendered) {
            this._rehydrateIframeIfNeeded();
            return;
        }

        this._rendered = true;
        this._mountFreshIframe();
    }

    disconnectedCallback() {
        this._detachLifecycleHandlers();
    }

    _syncAuth() {
        if (!this._iframe) {
            return;
        }

        syncIframeAuth(this._iframe, extractAccessToken(this._hass));
    }

    _applyHostStyles() {
        this.style.display = 'block';
        // HA 2026.8 no longer supplies custom panels with a definite height.
        // A definite height is also required for the iframe's percentage height.
        this.style.height = '100vh';
        this.style.height = '100dvh';
        this.style.minHeight = '0';
        this.style.overflow = 'hidden';
    }

    _createIframe() {
        const iframe = document.createElement('iframe');
        iframe.id = PANEL_IFRAME_ID;
        iframe.src = EDITOR_URL;
        iframe.title = 'ESPHome Designer';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.style.display = 'block';
        iframe.referrerPolicy = 'same-origin';
        iframe.addEventListener('load', () => this._syncAuth());
        return iframe;
    }

    _mountFreshIframe() {
        const iframe = this._createIframe();
        this.replaceChildren(iframe);
        this._iframe = iframe;
        this._syncAuth();
    }

    _rehydrateIframeIfNeeded() {
        if (!this._iframe || !this._iframe.isConnected) {
            this._mountFreshIframe();
            return;
        }

        if (iframeNeedsRehydration(this._iframe)) {
            this._mountFreshIframe();
            return;
        }

        this._syncAuth();
    }

    _attachLifecycleHandlers() {
        if (this._lifecycleHandlersAttached) {
            return;
        }

        document.addEventListener('visibilitychange', this._boundWake);
        window.addEventListener('focus', this._boundWake);
        window.addEventListener('pageshow', this._boundWake);
        this._lifecycleHandlersAttached = true;
    }

    _detachLifecycleHandlers() {
        if (!this._lifecycleHandlersAttached) {
            return;
        }

        document.removeEventListener('visibilitychange', this._boundWake);
        window.removeEventListener('focus', this._boundWake);
        window.removeEventListener('pageshow', this._boundWake);
        this._lifecycleHandlersAttached = false;
    }
}

if (!customElements.get(PANEL_TAG_NAME)) {
    customElements.define(PANEL_TAG_NAME, ESPHomeDesignerPanel);
}
