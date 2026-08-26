import { AppState } from '../core/state';
import { emit, EVENTS } from '../core/events.js';
import { getHaRequestToken, hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { Logger } from '../utils/logger.js';
import { appendToDesignerOverlayRoot } from '../utils/runtime_root.js';
import { fetchViaEmbeddedHaBridge } from './ha_embedded_bridge.js';
export { getEmbeddedHaHass, toHaCallApiPath } from './ha_embedded_bridge.js';

/**
 * @typedef {{
 *   entity_id: string,
 *   domain?: string,
 *   name?: string,
 *   state?: string,
 *   unit?: string,
 *   attributes?: Record<string, any>,
 *   formatted?: string
 * }} HaEntityState
 */

// --- HA Entity States Cache ---
/** @type {HaEntityState[]} */
export let entityStatesCache = [];
let entityStatesFetchInProgress = false;

/**
 * Gets the headers required for Home Assistant API requests.
 * @returns {Record<string, string>} Headers object.
 */
export function getHaHeaders() {
    /** @type {Record<string, string>} */
    const headers = {
        "Content-Type": "application/json"
    };
    const token = getHaRequestToken();
    if (token && token.trim() !== "" && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Fetch helper that prefers Home Assistant's authenticated `hass.callApi`
 * when the editor is embedded in the panel iframe.
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export async function haFetch(url, options = {}) {
    const embeddedResponse = await fetchViaEmbeddedHaBridge(url, options);
    if (embeddedResponse) {
        return embeddedResponse;
    }

    return fetch(url, options);
}

// --- Entity Datalist for Autocomplete ---
export const ENTITY_DATALIST_ID = 'entity-datalist-global';
/** @type {HTMLDataListElement | null} */
let entityDatalistEl = null;

/** @returns {HTMLDataListElement} */
export function ensureEntityDatalist() {
    if (!entityDatalistEl) {
        entityDatalistEl = /** @type {HTMLDataListElement | null} */ (document.getElementById(ENTITY_DATALIST_ID));
        if (!entityDatalistEl) {
            entityDatalistEl = document.createElement('datalist');
            entityDatalistEl.id = ENTITY_DATALIST_ID;
            appendToDesignerOverlayRoot(entityDatalistEl);
        }
    }
    return entityDatalistEl;
}

/** @param {HaEntityState[]} entities */
function updateEntityDatalist(entities) {
    const datalist = ensureEntityDatalist();
    datalist.innerHTML = '';

    if (!entities || entities.length === 0) return;

    entities.forEach((e) => {
        const opt = document.createElement('option');
        opt.value = e.entity_id;
        opt.label = e.name || e.entity_id;
        datalist.appendChild(opt);
    });
    Logger.log(`[EntityDatalist] Updated with ${entities.length} entities`);
}

/**
 * Fetches entity states from Home Assistant.
 * Supports both integrated mode (custom component API) and standalone mode (HA REST API).
 * Emits EVENTS.ENTITIES_LOADED on success.
 * @returns {Promise<HaEntityState[]>} The list of entities or empty array.
 */
export async function fetchEntityStates() {
    if (!hasHaBackend() || !HA_API_BASE) {
        return [];
    }
    if (entityStatesFetchInProgress) return entityStatesCache;

    entityStatesFetchInProgress = true;
    try {
        // Use a timeout to avoid hanging forever - 10 seconds for cross-network requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        /** @type {string} */
        let apiUrl;
        let useNativeHaApi = false;

        // Check if we have an LLAT token - if so, we might be in external/standalone mode
        const token = getHaRequestToken();

        // First try the custom component endpoint
        apiUrl = `${HA_API_BASE}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene,lock`;

        Logger.log("[EntityStates] Fetching from:", apiUrl);

        let resp;
        try {
            resp = await haFetch(apiUrl, {
                headers: getHaHeaders(),
                signal: controller.signal
            });
        } catch (fetchErr) {
            // If custom component endpoint fails and we have a token, try native HA API
            if (token && HA_API_BASE) {
                const haBaseUrl = HA_API_BASE.replace('/api/esphome_designer', '');
                apiUrl = `${haBaseUrl}/api/states`;
                Logger.log("[EntityStates] Custom endpoint failed, trying native HA API:", apiUrl);
                useNativeHaApi = true;
                resp = await haFetch(apiUrl, {
                    headers: getHaHeaders(),
                    signal: controller.signal
                });
            } else {
                throw fetchErr;
            }
        }

        clearTimeout(timeoutId);

        if (!resp.ok) {
            Logger.warn("[EntityStates] Failed to fetch:", resp.status);
            return [];
        }

        /** @type {any[]} */
        let entities = await resp.json();

        // Transform native HA API response to our format
        if (useNativeHaApi && Array.isArray(entities)) {
            // Native HA /api/states returns full state objects
            // Filter to useful domains
            const allowedDomains = ['sensor', 'binary_sensor', 'weather', 'light', 'switch',
                'fan', 'cover', 'climate', 'media_player', 'input_number',
                'number', 'input_boolean', 'input_text', 'input_select',
                'button', 'input_button', 'calendar', 'person', 'device_tracker',
                'sun', 'update', 'scene', 'lock'];
            entities = entities
                .filter((/** @type {any} */ e) => {
                    const domain = e.entity_id?.split('.')[0];
                    return allowedDomains.includes(domain);
                })
                .map((/** @type {any} */ e) => ({
                    entity_id: e.entity_id,
                    name: e.attributes?.friendly_name || e.entity_id,
                    state: e.state,
                    unit: e.attributes?.unit_of_measurement,
                    attributes: e.attributes || {}
                }));
        }

        if (!Array.isArray(entities)) {
            Logger.warn("[EntityStates] Invalid response format");
            return [];
        }

        Logger.log(`[EntityStates] Received ${entities.length} entities`);

        // Cache as array of objects for easier searching/filtering
        entityStatesCache = entities.map((/** @type {any} */ entity) => {
            const formatted = entity.unit ? `${entity.state} ${entity.unit}` : entity.state;
            return {
                entity_id: entity.entity_id,
                domain: entity.entity_id?.split('.')?.[0] || '',
                name: entity.name || entity.entity_id,
                state: entity.state,
                unit: entity.unit,
                attributes: entity.attributes || {},
                formatted: formatted
            };
        });

        Logger.log(`[EntityStates] Cached ${entityStatesCache.length} entity states`);

        // Also populate AppState.entityStates as lookup object for render functions
        if (AppState) {
            AppState.entityStates = {};
            entityStatesCache.forEach((e) => {
                AppState.entityStates[e.entity_id] = e;
            });
            Logger.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(AppState.entityStates).length} entries`);
        }

        // Update autocomplete datalist for entity inputs
        updateEntityDatalist(entityStatesCache);

        emit(EVENTS.ENTITIES_LOADED, entityStatesCache);

        return entityStatesCache;
    } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            Logger.warn("[EntityStates] Request timed out after 10 seconds");
        } else {
            Logger.warn("[EntityStates] Error fetching:", err);
        }
        return [];
    } finally {
        entityStatesFetchInProgress = false;
    }
}

/**
 * Gets the cached attributes for a specific entity.
 * @param {string} entityId 
 * @returns {Record<string, any>|null} Attributes object or null if not found.
 */
export function getEntityAttributes(/** @type {string} */ entityId) {
    const entry = entityStatesCache.find(e => e.entity_id === entityId);
    return entry ? (entry.attributes ?? null) : null;
}

export { loadLayoutFromBackend, saveLayoutToBackend, importSnippetBackend } from './ha_api_layouts.js';

/**
 * @param {string | number} duration
 * @returns {number}
 */
function durationToMilliseconds(duration) {
    if (duration === null || duration === undefined || duration === '') {
        return 24 * 60 * 60 * 1000;
    }

    if (typeof duration === 'number') {
        return Math.max(duration, 0) * 1000;
    }

    const text = String(duration).trim();
    if (!text) {
        return 24 * 60 * 60 * 1000;
    }

    if (/^\d+(?:\.\d+)?$/.test(text)) {
        return parseFloat(text) * 1000;
    }

    const match = text.match(/^(\d+(?:\.\d+)?)([a-z]+)$/i);
    if (!match) {
        return 24 * 60 * 60 * 1000;
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith('s')) return value * 1000;
    if (unit.startsWith('m')) return value * 60 * 1000;
    if (unit.startsWith('h')) return value * 60 * 60 * 1000;
    if (unit.startsWith('d')) return value * 24 * 60 * 60 * 1000;
    if (unit.startsWith('w')) return value * 7 * 24 * 60 * 60 * 1000;
    return value * 1000;
}

/**
 * @returns {string}
 */
function getNativeHaApiBase() {
    const apiBase = HA_API_BASE || '';
    return apiBase.replace(/\/api\/esphome_designer$/, '');
}

/**
 * @param {any} payload
 * @returns {any[]}
 */
function normalizeNativeHistoryPayload(payload) {
    if (!Array.isArray(payload) || payload.length === 0) {
        return [];
    }

    const candidate = Array.isArray(payload[0]) ? payload[0] : payload;

    return candidate
        .filter((item) => item && typeof item === 'object')
        .map((item) => ({
            state: item.state,
            last_changed: item.last_changed ?? item.last_updated ?? null,
            last_updated: item.last_updated ?? item.last_changed ?? null,
        }))
        .filter((item) => item.state !== undefined && item.state !== null);
}

/**
 * Fetches historical data for an entity from Home Assistant.
 * Uses Home Assistant's native history API directly so preview graphs
 * do not depend on the custom integration proxy path.
 * NOTE: This is only used for graph preview in the editor. Not critical.
 * @param {string} entityId 
 * @param {string} duration - Duration string like "24h", "1h", etc.
 * @returns {Promise<any[]>} List of state objects from HA history.
 */
let historyFetchWarned = false;
export async function fetchEntityHistory(/** @type {string} */ entityId, duration = "24h") {
    if (!hasHaBackend() || !HA_API_BASE || !entityId) return [];

    const nativeBase = getNativeHaApiBase();
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - durationToMilliseconds(duration));
    const nativeHistoryUrl = nativeBase
        ? `${nativeBase}/api/history/period/${encodeURIComponent(startTime.toISOString())}`
            + `?filter_entity_id=${encodeURIComponent(entityId)}`
            + `&end_time=${encodeURIComponent(endTime.toISOString())}`
            + '&minimal_response'
            + '&no_attributes'
            + '&significant_changes_only=0'
        : null;

    try {
        if (!nativeHistoryUrl) {
            return [];
        }

        const resp = await haFetch(nativeHistoryUrl, {
            headers: getHaHeaders()
        });

        if (!resp.ok) {
            const errorText = await resp.text().catch(() => "Unknown error");
            // Only log once to avoid console spam - history is non-critical (preview only)
            if (!historyFetchWarned) {
                Logger.log(`[EntityHistory] History fetch failed for ${entityId}: ${errorText}`);
                historyFetchWarned = true;
            }
            return [];
        }

        return normalizeNativeHistoryPayload(await resp.json());
    } catch {
        // Silently fail - history is only for editor preview
        return [];
    }
}

/**
 * Ensures entities are loaded, fetching if necessary.
 * @returns {Promise<HaEntityState[]>} The list of entities.
 */
export async function loadHaEntitiesIfNeeded() {
    if (hasHaBackend()) {
        if (entityStatesCache.length > 0) {
            return entityStatesCache;
        }
        return fetchEntityStates();
    }
    return [];
}
