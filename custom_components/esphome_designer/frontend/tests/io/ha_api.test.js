import { beforeEach, describe, expect, it, vi } from 'vitest';

let hasBackend = true;
let token = 'test-token';
let haApiBase = 'http://localhost:8123/api/esphome_designer';

const mockEmit = vi.fn();
const mockLoadLayoutIntoState = vi.fn();

const mockAppState = {
    entityStates: {},
    currentLayoutId: 'layout-1',
    settings: { device_model: 'reterminal_e1001' },
    deviceModel: 'reterminal_e1001',
    deviceName: 'Test Layout',
    pages: [],
    setCurrentLayoutId: vi.fn(),
    getPagesPayload: vi.fn(() => ({
        pages: [{ id: 'page_0', widgets: [] }],
        renderingMode: 'direct'
    }))
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        ENTITIES_LOADED: 'ENTITIES_LOADED',
        LAYOUT_IMPORTED: 'LAYOUT_IMPORTED'
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    getHaToken: () => token,
    getHaRequestToken: () => token,
    hasHaBackend: () => hasBackend,
    get HA_API_BASE() {
        return haApiBase;
    }
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

describe('ha_api', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        hasBackend = true;
        token = 'test-token';
        haApiBase = 'http://localhost:8123/api/esphome_designer';
        mockAppState.entityStates = {};
        mockAppState.currentLayoutId = 'layout-1';
        document.body.innerHTML = '';
        vi.unstubAllGlobals();
        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: globalThis
        });
    });

    it('builds HA headers with and without token', async () => {
        const mod = await import('../../js/io/ha_api.js');

        let headers = mod.getHaHeaders();
        expect(headers['Content-Type']).toBe('application/json');
        expect(headers.Authorization).toBe('Bearer test-token');

        token = '';
        headers = mod.getHaHeaders();
        expect(headers.Authorization).toBeUndefined();
    });

    it('uses the parent panel hass.callApi bridge when embedded in the HA iframe', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const callApi = vi.fn().mockResolvedValue({ layouts: [{ id: 'layout-1' }] });

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                document: {
                    querySelector: vi.fn((selector) => {
                        if (selector === 'esphome-designer-panel') {
                            return { _hass: { callApi } };
                        }
                        return null;
                    })
                }
            }
        });

        const response = await mod.haFetch('http://localhost:8123/api/esphome_designer/layouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true })
        });

        expect(callApi).toHaveBeenCalledWith('post', 'esphome_designer/layouts', { test: true });
        await expect(response.json()).resolves.toEqual({ layouts: [{ id: 'layout-1' }] });
    });

    it('prefers an embedded parent global hass bridge and normalizes embedded errors', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const callApi = vi.fn().mockRejectedValue({
            statusCode: 422,
            body: '{"detail":"invalid"}',
            message: 'Bridge failed'
        });

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                __ESPHOME_DESIGNER_HASS__: { callApi },
                document: {
                    querySelector: vi.fn(() => null)
                }
            }
        });

        expect(mod.getEmbeddedHaHass()).toEqual({ callApi });

        const response = await mod.haFetch('http://localhost:8123/api/esphome_designer/layouts', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ name: 'Kitchen' })
        });

        expect(callApi).toHaveBeenCalledWith('post', 'esphome_designer/layouts', { name: 'Kitchen' });
        expect(response.status).toBe(422);
        await expect(response.json()).resolves.toEqual({
            message: 'Bridge failed',
            detail: 'invalid'
        });
    });

    it('falls back to the home-assistant root hass object and preserves string error bodies', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const callApi = vi.fn().mockRejectedValue({
            status: 409,
            body: 'already_exists',
            message: 'Conflict'
        });

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                document: {
                    querySelector: vi.fn((selector) => {
                        if (selector === 'home-assistant') {
                            return { hass: { callApi } };
                        }
                        return null;
                    })
                }
            }
        });

        const response = await mod.haFetch('http://localhost:8123/api/esphome_designer/layouts?draft=1');

        expect(callApi).toHaveBeenCalledWith('get', 'esphome_designer/layouts?draft=1', undefined);
        expect(response.status).toBe(409);
        await expect(response.json()).resolves.toEqual({
            error: 'already_exists',
            message: 'Conflict'
        });
    });

    it('returns null for invalid callApi paths and rejects aborted embedded requests', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const controller = new AbortController();
        controller.abort();

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                __ESPHOME_DESIGNER_HASS__: {
                    callApi: vi.fn()
                },
                document: {
                    querySelector: vi.fn(() => null)
                }
            }
        });

        expect(mod.toHaCallApiPath('')).toBeNull();
        expect(mod.toHaCallApiPath('%%%%')).toBeNull();

        await expect(mod.haFetch('http://localhost:8123/api/esphome_designer/layouts', {
            signal: controller.signal
        })).rejects.toMatchObject({ name: 'AbortError' });
    });

    it('handles inaccessible embedded parents and normalizes relative string payloads', async () => {
        const mod = await import('../../js/io/ha_api.js');

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            get() {
                throw new Error('cross-origin access denied');
            }
        });

        expect(mod.getEmbeddedHaHass()).toBeNull();

        const throwingQuerySelector = vi.fn(() => {
            throw new Error('blocked');
        });

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                get __ESPHOME_DESIGNER_HASS__() {
                    throw new Error('blocked');
                },
                document: {
                    querySelector: throwingQuerySelector
                }
            }
        });

        expect(mod.getEmbeddedHaHass()).toBeNull();
        expect(throwingQuerySelector).toHaveBeenCalledTimes(2);

        const callApi = vi.fn().mockResolvedValue({ ok: true });
        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                __ESPHOME_DESIGNER_HASS__: { callApi },
                document: {
                    querySelector: vi.fn(() => null)
                }
            }
        });

        expect(mod.toHaCallApiPath('/layouts?draft=1')).toBe('layouts?draft=1');

        await mod.haFetch('/layouts?draft=1', {
            method: 'POST',
            headers: [['Content-Type', 'text/plain']],
            body: 'plain text'
        });

        await mod.haFetch('/layouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '   '
        });

        expect(callApi).toHaveBeenNthCalledWith(1, 'post', 'layouts?draft=1', 'plain text');
        expect(callApi).toHaveBeenNthCalledWith(2, 'post', 'layouts', undefined);
    });

    it('normalizes embedded object and fallback errors while preserving request payloads', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const callApi = vi.fn()
            .mockRejectedValueOnce({
                status_code: 418,
                body: { detail: 'steep' },
                message: 'Teapot'
            })
            .mockRejectedValueOnce({
                message: 'Broken bridge'
            });

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                __ESPHOME_DESIGNER_HASS__: { callApi },
                document: {
                    querySelector: vi.fn(() => null)
                }
            }
        });

        const objectBodyResponse = await mod.haFetch('/layouts', {
            method: 'POST',
            body: { draft: true }
        });
        expect(callApi).toHaveBeenNthCalledWith(1, 'post', 'layouts', { draft: true });
        expect(objectBodyResponse.status).toBe(418);
        await expect(objectBodyResponse.json()).resolves.toEqual({
            message: 'Teapot',
            detail: 'steep'
        });

        const rawBodyResponse = await mod.haFetch('/layouts/raw', {
            method: 'POST',
            body: 'raw-body'
        });
        expect(callApi).toHaveBeenNthCalledWith(2, 'post', 'layouts/raw', 'raw-body');
        expect(rawBodyResponse.status).toBe(500);
        await expect(rawBodyResponse.json()).resolves.toEqual({
            error: 'Broken bridge',
            message: 'Broken bridge'
        });
    });

    it('creates and reuses global entity datalist', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const first = mod.ensureEntityDatalist();
        const second = mod.ensureEntityDatalist();

        expect(first).toBe(second);
        expect(first.id).toBe(mod.ENTITY_DATALIST_ID);
        expect(document.getElementById(mod.ENTITY_DATALIST_ID)).toBeTruthy();
    });

    it('returns empty entities when backend is unavailable', async () => {
        hasBackend = false;
        const mod = await import('../../js/io/ha_api.js');

        const entities = await mod.fetchEntityStates();
        expect(entities).toEqual([]);
    });

    it('returns empty entities when the custom endpoint fails without a token or responds with a bad status', async () => {
        const mod = await import('../../js/io/ha_api.js');
        token = '';

        vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('offline')));
        await expect(mod.fetchEntityStates()).resolves.toEqual([]);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 503,
            text: vi.fn().mockResolvedValue('unavailable')
        }));

        await expect(mod.fetchEntityStates()).resolves.toEqual([]);
    });

    it('treats aborted entity fetches as empty results without throwing', async () => {
        const mod = await import('../../js/io/ha_api.js');
        vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new DOMException('aborted', 'AbortError')));

        await expect(mod.fetchEntityStates()).resolves.toEqual([]);
    });

    it('treats aborted entity fetches without a fallback token as empty results', async () => {
        const mod = await import('../../js/io/ha_api.js');
        token = '';
        vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new DOMException('aborted', 'AbortError')));

        await expect(mod.fetchEntityStates()).resolves.toEqual([]);
    });

    it('fetches and caches entities via custom endpoint', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const payload = [
            {
                entity_id: 'sensor.temp',
                name: 'Temperature',
                state: '22',
                unit: '°C',
                attributes: { unit_of_measurement: '°C' }
            },
            {
                entity_id: 'weather.home',
                name: 'Home Weather',
                state: 'sunny',
                attributes: {}
            }
        ];

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(payload)
        }));

        const entities = await mod.fetchEntityStates();

        expect(entities).toHaveLength(2);
        expect(mod.entityStatesCache).toHaveLength(2);
        expect(mod.entityStatesCache[0].formatted).toBe('22 °C');
        expect(mockAppState.entityStates['sensor.temp'].state).toBe('22');
        expect(mockEmit).toHaveBeenCalledWith('ENTITIES_LOADED', expect.any(Array));
        const datalist = mod.ensureEntityDatalist();
        expect(datalist.children.length).toBe(2);
    });

    it('falls back to native HA /api/states when custom endpoint fetch throws', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const nativeStates = [
            {
                entity_id: 'sensor.temp',
                state: '21',
                attributes: { friendly_name: 'Temp', unit_of_measurement: '°C' }
            },
            {
                entity_id: 'light.kitchen',
                state: 'on',
                attributes: { friendly_name: 'Kitchen Light' }
            },
            {
                entity_id: 'lock.front_door',
                state: 'locked',
                attributes: { friendly_name: 'Front Door' }
            },
            {
                entity_id: 'camera.front_door',
                state: 'idle',
                attributes: { friendly_name: 'Front Door' }
            }
        ];

        const fetchMock = vi.fn()
            .mockRejectedValueOnce(new Error('custom endpoint unavailable'))
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue(nativeStates)
            });
        vi.stubGlobal('fetch', fetchMock);

        const entities = await mod.fetchEntityStates();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(entities.map(e => e.entity_id)).toContain('sensor.temp');
        expect(entities.map(e => e.entity_id)).toContain('light.kitchen');
        // Issue #468: lock entities must appear in the picker suggestions
        expect(entities.map(e => e.entity_id)).toContain('lock.front_door');
        expect(entities.map(e => e.entity_id)).not.toContain('camera.front_door');
    });

    it('uses native HA history and returns empty data when history requests fail', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const fetchMock = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue([[{ state: '20', last_changed: '2026-03-28T10:00:00Z' }, { state: '21', last_changed: '2026-03-28T10:30:00Z' }]])
        });
        vi.stubGlobal('fetch', fetchMock);

        const okData = await mod.fetchEntityHistory('sensor.temp', '24h');
        expect(okData).toHaveLength(2);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toContain('/api/history/period/');

        fetchMock.mockReset();
        fetchMock.mockResolvedValueOnce({
            ok: false,
            text: vi.fn().mockResolvedValue('history unavailable')
        });

        const failData = await mod.fetchEntityHistory('sensor.temp', '24h');
        expect(failData).toEqual([]);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('normalizes flat native history payloads and supports alternate durations', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const fetchMock = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue([
                { state: '20', last_updated: '2026-03-28T10:00:00Z' },
                null,
                { state: '21', last_changed: '2026-03-28T10:30:00Z' }
            ])
        });
        vi.stubGlobal('fetch', fetchMock);

        const data = await mod.fetchEntityHistory('sensor.temp', '30m');

        expect(data).toEqual([
            { state: '20', last_changed: '2026-03-28T10:00:00Z', last_updated: '2026-03-28T10:00:00Z' },
            { state: '21', last_changed: '2026-03-28T10:30:00Z', last_updated: '2026-03-28T10:30:00Z' }
        ]);
        expect(fetchMock.mock.calls[0][0]).toContain('/api/history/period/');
    });

    it('returns empty history when the native history API is empty', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const fetchMock = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue([])
        });
        vi.stubGlobal('fetch', fetchMock);

        const data = await mod.fetchEntityHistory('sensor.temp', '24h');

        expect(data).toEqual([]);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toContain('/api/history/period/');
    });

    it('returns empty results for invalid entity payloads and exposes cached attributes', async () => {
        const mod = await import('../../js/io/ha_api.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue({
                entities: []
            })
        }));

        const invalid = await mod.fetchEntityStates();
        expect(invalid).toEqual([]);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue([
                {
                    entity_id: 'sensor.temp',
                    name: 'Temperature',
                    state: '22',
                    unit: 'C',
                    attributes: { source: 'test' }
                }
            ])
        }));

        await mod.fetchEntityStates();
        expect(mod.getEntityAttributes('sensor.temp')).toEqual({ source: 'test' });
        expect(mod.getEntityAttributes('sensor.missing')).toBeNull();
    });

    it('reuses the cached entity list when entities are already loaded', async () => {
        const mod = await import('../../js/io/ha_api.js');
        mod.entityStatesCache.push({
            entity_id: 'sensor.cached',
            name: 'Cached',
            state: '1',
            attributes: {},
            formatted: '1'
        });
        vi.stubGlobal('fetch', vi.fn());

        const entities = await mod.loadHaEntitiesIfNeeded();

        expect(entities).toHaveLength(1);
        expect(entities[0].entity_id).toBe('sensor.cached');
        expect(fetch).not.toHaveBeenCalled();
    });

    it('returns empty entities without a backend and supports multiple history duration formats', async () => {
        const mod = await import('../../js/io/ha_api.js');

        hasBackend = false;
        await expect(mod.loadHaEntitiesIfNeeded()).resolves.toEqual([]);

        hasBackend = true;
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue([])
        });
        vi.stubGlobal('fetch', fetchMock);

        vi.useFakeTimers();
        try {
            vi.setSystemTime(new Date('2026-03-28T12:00:00.000Z'));

            await mod.fetchEntityHistory('sensor.temp', 60);
            await mod.fetchEntityHistory('sensor.temp', '');
            await mod.fetchEntityHistory('sensor.temp', '600');
            await mod.fetchEntityHistory('sensor.temp', 'nonsense');
            await mod.fetchEntityHistory('sensor.temp', '2d');
            await mod.fetchEntityHistory('sensor.temp', '7q');
        } finally {
            vi.useRealTimers();
        }

        const calledUrls = fetchMock.mock.calls.map(([url]) => url);
        expect(fetchMock).toHaveBeenCalledTimes(6);
        expect(calledUrls[0]).toContain(encodeURIComponent('2026-03-28T11:59:00.000Z'));
        expect(calledUrls[1]).toContain(encodeURIComponent('2026-03-27T12:00:00.000Z'));
        expect(calledUrls[2]).toContain(encodeURIComponent('2026-03-28T11:50:00.000Z'));
        expect(calledUrls[3]).toContain(encodeURIComponent('2026-03-27T12:00:00.000Z'));
        expect(calledUrls[4]).toContain(encodeURIComponent('2026-03-26T12:00:00.000Z'));
        expect(calledUrls[5]).toContain(encodeURIComponent('2026-03-28T11:59:53.000Z'));
    });

    it('swallows history fetch exceptions because history is preview-only', async () => {
        const mod = await import('../../js/io/ha_api.js');

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        await expect(mod.fetchEntityHistory('sensor.temp', '1h')).resolves.toEqual([]);
    });

    it('loads last active layout from backend and emits import event', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const listResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({
                last_active_layout_id: 'layout-2',
                layouts: [{ id: 'layout-1' }, { id: 'layout-2' }]
            })
        };

        const layoutResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({
                device_id: 'layout-2',
                name: 'Layout 2',
                device_model: 'reterminal_e1001',
                pages: [{ id: 'p1', widgets: [] }]
            })
        };

        const fetchMock = vi.fn()
            .mockResolvedValueOnce(listResponse)
            .mockResolvedValueOnce(layoutResponse);
        vi.stubGlobal('fetch', fetchMock);

        await mod.loadLayoutFromBackend();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout-2');
        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.any(Object));
    });

    it('saves layout and imports snippet through backend', async () => {
        const mod = await import('../../js/io/ha_api.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true })
        }));

        const saved = await mod.saveLayoutToBackend();
        expect(saved).toBe(true);

        const importResult = await mod.importSnippetBackend('sensor:\n  - platform: homeassistant');
        expect(importResult).toEqual({ success: true });
    });
});
