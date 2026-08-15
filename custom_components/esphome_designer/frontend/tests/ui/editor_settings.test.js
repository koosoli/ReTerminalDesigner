import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockEmit = vi.fn();
const mockShowToast = vi.fn();
const mockFetchEntityStates = vi.fn();
const mockSetHaManualUrl = vi.fn();
const mockRefreshHaBaseUrl = vi.fn();
const mockSetHaToken = vi.fn();
const mockGetHaManualUrl = vi.fn(() => 'http://ha.local:8123');
const mockGetHaToken = vi.fn(() => 'token123');
const mockIsDeployedInHa = vi.fn(() => false);
const mockAiService = {
    cache: { models: {} },
    fetchModels: vi.fn()
};
const mockLogger = {
    error: vi.fn(),
    log: vi.fn()
};

const mockAppState = {
    settings: {
        editor_light_mode: false,
        showConditionalWidgets: false,
        c_include_comments: true,
        autoSaveEnabled: true,
        grid_opacity: 30,
        glyphsets: ['GF_Latin_Kernel'],
        ai_provider: 'gemini',
        ai_model_filter: '',
        ai_api_key_gemini: 'gemini-key',
        ai_api_key_openai: 'openai-key',
        ai_api_key_openrouter: 'router-key',
        ai_model_gemini: 'gemini-pro',
        ai_model_openai: 'gpt-4o-mini'
    },
    snapEnabled: true,
    showGrid: true,
    setSnapEnabled: vi.fn(),
    setShowGrid: vi.fn(),
    updateSettings: vi.fn()
};

function flushAsync() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: { STATE_CHANGED: 'STATE_CHANGED' }
}));
vi.mock('../../js/utils/env.js', () => ({
    setHaManualUrl: mockSetHaManualUrl,
    refreshHaBaseUrl: mockRefreshHaBaseUrl,
    setHaToken: mockSetHaToken,
    getHaManualUrl: mockGetHaManualUrl,
    getHaToken: mockGetHaToken,
    isDeployedInHa: mockIsDeployedInHa
}));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));
vi.mock('../../js/io/ha_api.js', () => ({
    fetchEntityStates: mockFetchEntityStates,
    entityStatesCache: { 'sensor.temp': { state: '22' }, 'sensor.hum': { state: '55' } }
}));
vi.mock('../../js/io/ai_service.js', () => ({ aiService: mockAiService }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));

describe('EditorSettings', () => {
    let EditorSettings;
    let editorSettings;

    function seedDom() {
        document.body.innerHTML = `
            <div id="editorSettingsModal" class="hidden">
                <div class="settings-category">
                    <div class="settings-category-header">Advanced</div>
                </div>
            </div>
            <button id="editorSettingsClose"></button>
            <button id="editorSettingsDone"></button>

            <input id="editorSnapToGrid" type="checkbox" />
            <input id="editorShowGrid" type="checkbox" />
            <input id="editorShowConditionalWidgets" type="checkbox" />
            <input id="editorLightMode" type="checkbox" />
            <input id="editorCIncludeComments" type="checkbox" />
            <input id="editorAutoSave" type="checkbox" />
            <button id="editorRefreshEntities">Refresh</button>
            <div id="editorEntityCount"></div>
            <input id="editorGridOpacity" type="range" value="20" />
            <input id="editorExtendedLatinGlyphs" type="checkbox" />

            <input id="haManualUrl" />
            <input id="haLlatToken" />
            <button id="editorTestHaBtn">Test</button>
            <div id="haTestResult"></div>
            <div id="haDeployedWarning" class="hidden"></div>
            <div id="haCorsTip" class="hidden"></div>
            <span id="haOriginPlaceholder"></span>

            <select id="aiProvider">
                <option value="gemini">Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="openrouter">OpenRouter</option>
            </select>
            <input id="aiApiKeyGemini" />
            <input id="aiApiKeyOpenai" />
            <input id="aiApiKeyOpenrouter" />
            <input id="aiModelFilter" />
            <select id="aiModelSelect"></select>
            <button id="aiRefreshModelsBtn">Refresh Models</button>
            <div id="aiTestResult"></div>

            <div id="aiKeyGeminiRow"></div>
            <div id="aiKeyOpenaiRow"></div>
            <div id="aiKeyOpenrouterRow"></div>

            <input class="glyphset-checkbox" type="checkbox" value="GF_Latin_Kernel" />
            <input class="glyphset-checkbox" type="checkbox" value="GF_Latin_Extras" />
            <div class="canvas-grid"></div>
        `;
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        mockAiService.cache.models = {};
        mockAiService.fetchModels.mockReset();
        mockAppState.updateSettings.mockReset();
        mockIsDeployedInHa.mockReturnValue(false);
        mockAppState.settings.ai_provider = 'gemini';
        mockAppState.settings.ai_model_filter = '';
        mockAppState.settings.ai_api_key_gemini = 'gemini-key';
        mockAppState.settings.ai_api_key_openai = 'openai-key';
        mockAppState.settings.ai_api_key_openrouter = 'router-key';
        mockAppState.settings.ai_model_gemini = 'gemini-pro';
        mockAppState.settings.ai_model_openai = 'gpt-4o-mini';
        seedDom();

        ({ EditorSettings } = await import('../../js/ui/editor_settings.js'));
        editorSettings = new EditorSettings();

        editorSettings.updateAIKeyVisibility = vi.fn();
        editorSettings.refreshModelSelect = vi.fn();
        editorSettings.applyEditorTheme = vi.fn();
    });

    it('initializes listeners and opens modal with populated values', () => {
        editorSettings.init();
        editorSettings.open();

        expect(editorSettings.modal.classList.contains('hidden')).toBe(false);
        expect(document.getElementById('haManualUrl').value).toBe('http://ha.local:8123');
        expect(document.getElementById('haLlatToken').value).toBe('token123');
        expect(document.getElementById('editorEntityCount').textContent).toContain('entities cached');
        expect(document.getElementById('editorAutoSave').checked).toBe(true);
    });

    it('handles close actions', () => {
        editorSettings.open();
        editorSettings.close();
        expect(editorSettings.modal.classList.contains('hidden')).toBe(true);
        expect(editorSettings.modal.style.display).toBe('none');
    });

    it('updates snap/grid/light settings through listeners', () => {
        editorSettings.init();

        const snap = document.getElementById('editorSnapToGrid');
        snap.checked = false;
        snap.dispatchEvent(new Event('change'));
        expect(mockAppState.setSnapEnabled).toHaveBeenCalledWith(false);

        const showGrid = document.getElementById('editorShowGrid');
        showGrid.checked = false;
        showGrid.dispatchEvent(new Event('change'));
        expect(mockAppState.setShowGrid).toHaveBeenCalledWith(false);

        const light = document.getElementById('editorLightMode');
        light.checked = true;
        light.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ editor_light_mode: true });
        expect(mockEmit).toHaveBeenCalled();

        const showConditionalWidgets = document.getElementById('editorShowConditionalWidgets');
        showConditionalWidgets.checked = true;
        showConditionalWidgets.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ showConditionalWidgets: true });

        const cIncludeComments = document.getElementById('editorCIncludeComments');
        cIncludeComments.checked = false;
        cIncludeComments.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ c_include_comments: false });

        const autoSave = document.getElementById('editorAutoSave');
        autoSave.checked = false;
        autoSave.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ autoSaveEnabled: false });
    });

    it('handles grid opacity and HA settings changes', () => {
        editorSettings.init();

        const opacity = document.getElementById('editorGridOpacity');
        opacity.value = '44';
        opacity.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ grid_opacity: 44 });

        const haUrl = document.getElementById('haManualUrl');
        haUrl.value = 'http://new';
        haUrl.dispatchEvent(new Event('change'));
        expect(mockSetHaManualUrl).toHaveBeenCalledWith('http://new');
        expect(mockRefreshHaBaseUrl).toHaveBeenCalled();

        const token = document.getElementById('haLlatToken');
        token.value = 'abc';
        token.dispatchEvent(new Event('change'));
        expect(mockSetHaToken).toHaveBeenCalledWith('abc');
    });

    it('refreshes entities and tests HA connection success', async () => {
        mockFetchEntityStates.mockResolvedValue([{ entity_id: 'sensor.temp' }]);
        editorSettings.init();

        const refreshBtn = document.getElementById('editorRefreshEntities');
        refreshBtn.click();
        await Promise.resolve();
        expect(mockFetchEntityStates).toHaveBeenCalled();

        const testBtn = document.getElementById('editorTestHaBtn');
        testBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('haTestResult').textContent).toContain('Success');
    });

    it('shows failure message for empty entity fetch on HA test', async () => {
        mockFetchEntityStates.mockResolvedValue([]);
        editorSettings.init();

        const testBtn = document.getElementById('editorTestHaBtn');
        testBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('haTestResult').innerHTML).toContain('Failed');
    });

    it('handles deployed HA mode and connection errors without leaving stale UI state', async () => {
        mockIsDeployedInHa.mockReturnValue(true);
        mockFetchEntityStates.mockRejectedValue(new Error('offline'));
        editorSettings.init();
        editorSettings.open();

        expect(document.getElementById('haManualUrl').disabled).toBe(true);
        expect(document.getElementById('haLlatToken').disabled).toBe(true);
        expect(document.getElementById('haDeployedWarning').classList.contains('hidden')).toBe(false);
        expect(document.getElementById('haCorsTip').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('haOriginPlaceholder').textContent).toBe(window.location.origin);

        const testBtn = document.getElementById('editorTestHaBtn');
        testBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('haTestResult').innerHTML).toContain('Connection Error');
        expect(testBtn.disabled).toBe(false);
    });

    it('wires AI provider, keys, filter, model selection, glyphsets, and extended latin toggles', () => {
        editorSettings.init();

        const provider = /** @type {HTMLSelectElement} */ (document.getElementById('aiProvider'));
        provider.value = 'openai';
        provider.dispatchEvent(new Event('change'));
        mockAppState.settings.ai_provider = 'openai';
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_provider: 'openai' });
        expect(editorSettings.updateAIKeyVisibility).toHaveBeenCalled();
        expect(editorSettings.refreshModelSelect).toHaveBeenCalled();

        const geminiKey = /** @type {HTMLInputElement} */ (document.getElementById('aiApiKeyGemini'));
        geminiKey.value = ' new-gemini ';
        geminiKey.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_api_key_gemini: 'new-gemini' });

        const filter = /** @type {HTMLInputElement} */ (document.getElementById('aiModelFilter'));
        filter.value = 'vision';
        filter.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_model_filter: 'vision' });

        const modelSelect = /** @type {HTMLSelectElement} */ (document.getElementById('aiModelSelect'));
        modelSelect.innerHTML = '<option value="gpt-4o-mini">gpt-4o-mini</option>';
        modelSelect.value = 'gpt-4o-mini';
        modelSelect.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_model_openai: 'gpt-4o-mini' });

        const glyphs = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox'));
        glyphs[0].checked = true;
        glyphs[1].checked = true;
        glyphs[1].dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ glyphsets: ['GF_Latin_Kernel', 'GF_Latin_Extras'] });

        const extended = /** @type {HTMLInputElement} */ (document.getElementById('editorExtendedLatinGlyphs'));
        extended.checked = true;
        extended.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ extendedLatinGlyphs: true });
    });

    it('handles AI model refresh for missing keys, success, and failure', async () => {
        editorSettings.init();

        const refreshBtn = document.getElementById('aiRefreshModelsBtn');
        const geminiKey = /** @type {HTMLInputElement} */ (document.getElementById('aiApiKeyGemini'));

        geminiKey.value = '';
        refreshBtn.click();
        expect(mockShowToast).toHaveBeenCalledWith('Please enter an API key first', 'error', 3000);

        geminiKey.value = 'live-key';
        mockAiService.fetchModels.mockResolvedValueOnce([
            { id: 'gemini-1.5-flash', name: 'Gemini Flash' }
        ]);
        refreshBtn.click();
        await flushAsync();
        await flushAsync();
        expect(mockAiService.fetchModels).toHaveBeenCalledWith('gemini', 'live-key');
        expect(document.getElementById('aiTestResult').textContent).toContain('Success');
        expect(refreshBtn.textContent).toBe('Test & Load Models');

        mockAiService.fetchModels.mockRejectedValueOnce(new Error('bad key'));
        refreshBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('aiTestResult').textContent).toContain('Failed');
    });

    it('executes the real AI visibility/model/theme helpers with provider-specific keys', async () => {
        mockAppState.settings.ai_provider = 'openai';
        mockAppState.settings.ai_model_filter = 'mini';
        mockAiService.cache.models = {
            openai: [
                { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
                { id: 'gpt-4.1', name: 'GPT-4.1' }
            ]
        };

        const directEditorSettings = new EditorSettings();
        directEditorSettings.aiModelSelect.innerHTML = '';
        directEditorSettings.updateAIKeyVisibility();

        expect(directEditorSettings.aiKeyRows.openai.style.display).toBe('block');
        expect(directEditorSettings.aiKeyRows.gemini.style.display).toBe('none');

        directEditorSettings.filterModels();
        expect(Array.from(directEditorSettings.aiModelSelect.options).map((option) => option.value)).toEqual(['gpt-4o-mini']);

        mockAiService.cache.models = {};
        mockAiService.fetchModels.mockResolvedValueOnce([
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini' }
        ]);
        await directEditorSettings.refreshModelSelect();
        expect(mockAiService.fetchModels).toHaveBeenCalledWith('openai', 'openai-key');

        directEditorSettings.applyEditorTheme(true);
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        directEditorSettings.applyEditorTheme(false);
        expect(document.documentElement.getAttribute('data-theme')).toBeNull();
        expect(localStorage.getItem('reterminal-editor-theme')).toBe('dark');
    });

    it('keeps a chosen Gemini model across a settings close/reopen round-trip', async () => {
        // Regression (#484): the provider dropdown is left on its default, so
        // ai_provider is never written to settings. The model change handler
        // must still resolve the provider as "gemini" instead of persisting the
        // choice under ai_model_undefined and losing it on reopen.
        delete mockAppState.settings.ai_provider;
        mockAppState.settings.ai_model_gemini = '';
        mockAppState.updateSettings.mockImplementation((updates) => {
            Object.assign(mockAppState.settings, updates);
        });
        mockAiService.cache.models = {
            gemini: [
                { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
                { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' },
                { id: 'gemini-3.5-pro', name: 'Gemini 3.5 Pro' }
            ]
        };

        const directEditorSettings = new EditorSettings();
        directEditorSettings.init();
        directEditorSettings.open();
        await flushAsync();

        const modelSelect = /** @type {HTMLSelectElement} */ (document.getElementById('aiModelSelect'));
        modelSelect.value = 'gemini-3.5-pro';
        modelSelect.dispatchEvent(new Event('change'));

        expect(mockAppState.settings.ai_model_gemini).toBe('gemini-3.5-pro');
        expect(mockAppState.settings.ai_model_undefined).toBeUndefined();

        directEditorSettings.close();
        directEditorSettings.open();
        await flushAsync();

        expect(modelSelect.value).toBe('gemini-3.5-pro');
    });

    it('applies the saved model after the model list is populated asynchronously', async () => {
        mockAppState.settings.ai_model_gemini = 'gemini-3.5-pro';
        mockAiService.cache.models = {};

        /** @type {(models: Array<{ id: string, name: string }>) => void} */
        let resolveModels = () => undefined;
        mockAiService.fetchModels.mockReturnValueOnce(new Promise((resolve) => {
            resolveModels = resolve;
        }));

        const directEditorSettings = new EditorSettings();
        const pending = directEditorSettings.refreshModelSelect();

        const modelSelect = /** @type {HTMLSelectElement} */ (document.getElementById('aiModelSelect'));
        expect(modelSelect.options.length).toBe(0);

        resolveModels([
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
            { id: 'gemini-3.5-pro', name: 'Gemini 3.5 Pro' }
        ]);
        await pending;

        expect(modelSelect.value).toBe('gemini-3.5-pro');
    });

    it('keeps the saved model selected when the filter would hide it', () => {
        mockAppState.settings.ai_model_gemini = 'gemini-3.5-pro';
        mockAppState.settings.ai_model_filter = 'flash';
        mockAiService.cache.models = {
            gemini: [
                { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' },
                { id: 'gemini-3.5-pro', name: 'Gemini 3.5 Pro' }
            ]
        };

        const directEditorSettings = new EditorSettings();
        directEditorSettings.filterModels();

        const modelSelect = /** @type {HTMLSelectElement} */ (document.getElementById('aiModelSelect'));
        expect(Array.from(modelSelect.options).map((option) => option.value))
            .toEqual(['gemini-3.5-pro', 'gemini-3.5-flash']);
        expect(modelSelect.value).toBe('gemini-3.5-pro');
    });

    it('toggles collapsible settings sections and logs localStorage theme failures', async () => {
        const directEditorSettings = new EditorSettings();
        directEditorSettings.init();

        const header = /** @type {HTMLElement} */ (document.querySelector('.settings-category-header'));
        const category = /** @type {HTMLElement} */ (document.querySelector('.settings-category'));
        header.click();
        expect(category.classList.contains('expanded')).toBe(true);
        header.click();
        expect(category.classList.contains('expanded')).toBe(false);

        const originalStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
        Object.defineProperty(globalThis, 'localStorage', {
            configurable: true,
            value: {
                getItem: vi.fn(() => null),
                setItem: vi.fn(() => {
                    throw new Error('denied');
                }),
                removeItem: vi.fn(),
                clear: vi.fn(),
                key: vi.fn(() => null),
                length: 0
            }
        });

        directEditorSettings.applyEditorTheme(true);
        expect(mockLogger.log).toHaveBeenCalled();

        if (originalStorageDescriptor) {
            Object.defineProperty(globalThis, 'localStorage', originalStorageDescriptor);
        }
    });
});
