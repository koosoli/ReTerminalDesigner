import { AppState } from '../core/state';
import { emit, EVENTS } from '../core/events.js';
import { setHaManualUrl, refreshHaBaseUrl, setHaToken, getHaManualUrl, getHaToken, isDeployedInHa } from '../utils/env.js';
import { showToast } from '../utils/dom.js';
import { fetchEntityStates, entityStatesCache } from '../io/ha_api.js';
import { aiService } from '../io/ai_service.js';
import { Logger } from '../utils/logger.js';

/** @returns {Storage | null} */
function getWebStorage() {
    try {
        return globalThis.localStorage ?? null;
    } catch {
        return null;
    }
}

/** @returns {string} */
function getBrowserOrigin() {
    try {
        return globalThis.location?.origin || "";
    } catch {
        return "";
    }
}

/**
 * @param {any} cache
 * @returns {number}
 */
function countCachedEntities(cache) {
    if (!cache) return 0;
    if (Array.isArray(cache)) return cache.length;
    if (typeof cache === 'object') return Object.keys(cache).length;
    return 0;
}

export class EditorSettings {
    constructor() {
        const getElement = (/** @type {string} */ id) => /** @type {HTMLElement | null} */ (document.getElementById(id));
        const getInput = (/** @type {string} */ id) => /** @type {HTMLInputElement | null} */ (document.getElementById(id));
        const getSelect = (/** @type {string} */ id) => /** @type {HTMLSelectElement | null} */ (document.getElementById(id));
        const getButton = (/** @type {string} */ id) => /** @type {HTMLButtonElement | null} */ (document.getElementById(id));

        this.modal = getElement('editorSettingsModal');
        this.closeBtn = getElement('editorSettingsClose');
        this.doneBtn = getElement('editorSettingsDone');

        this.snapToGrid = getInput('editorSnapToGrid');
        this.showGrid = getInput('editorShowGrid');
        this.showConditionalWidgets = getInput('editorShowConditionalWidgets');
        this.lightMode = getInput('editorLightMode');
        this.cIncludeComments = getInput('editorCIncludeComments');
        this.autoSave = getInput('editorAutoSave');
        this.refreshEntitiesBtn = getButton('editorRefreshEntities');
        this.entityCountLabel = getElement('editorEntityCount');
        this.gridOpacity = getInput('editorGridOpacity');
        this.extendedLatinGlyphs = getInput('editorExtendedLatinGlyphs');

        this.haManualUrl = getInput('haManualUrl');
        this.haLlatToken = getInput('haLlatToken');
        this.testHaBtn = getButton('editorTestHaBtn');
        this.haTestResult = getElement('haTestResult');
        this.haDeployedWarning = getElement('haDeployedWarning');
        this.haCorsTip = getElement('haCorsTip');

        this.aiProvider = getSelect('aiProvider');
        this.aiApiKeyGemini = getInput('aiApiKeyGemini');
        this.aiApiKeyOpenai = getInput('aiApiKeyOpenai');
        this.aiApiKeyOpenrouter = getInput('aiApiKeyOpenrouter');
        this.aiApiKeyMinimax = getInput('aiApiKeyMinimax');
        this.aiApiKeyGlm = getInput('aiApiKeyGlm');
        this.aiModelFilter = getInput('aiModelFilter');
        this.aiModelSelect = getSelect('aiModelSelect');
        this.aiRefreshModelsBtn = getButton('aiRefreshModelsBtn');
        this.aiTestResult = getElement('aiTestResult');

        this.aiKeyRows = {
            gemini: getElement('aiKeyGeminiRow'),
            openai: getElement('aiKeyOpenaiRow'),
            openrouter: getElement('aiKeyOpenrouterRow'),
            minimax: getElement('aiKeyMinimaxRow'),
            glm: getElement('aiKeyGlmRow')
        };
    }

    init() {
        if (!this.modal) return;

        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.doneBtn) this.doneBtn.addEventListener('click', () => this.close());

        this.setupListeners();
    }

    open() {
        if (!this.modal) return;

        const settings = AppState.settings;

        if (this.snapToGrid) {
            this.snapToGrid.checked = AppState.snapEnabled !== false;
        }

        if (this.showGrid) {
            this.showGrid.checked = AppState.showGrid !== false;
        }

        if (this.showConditionalWidgets) {
            this.showConditionalWidgets.checked = !!settings.showConditionalWidgets;
        }

        if (this.lightMode) {
            this.lightMode.checked = !!settings.editor_light_mode;
        }

        if (this.cIncludeComments) {
            this.cIncludeComments.checked = settings.c_include_comments !== false;
        }

        if (this.autoSave) {
            this.autoSave.checked = settings.autoSaveEnabled !== false;
        }

        if (this.aiProvider) this.aiProvider.value = settings.ai_provider || "gemini";
        if (this.aiApiKeyGemini) this.aiApiKeyGemini.value = settings.ai_api_key_gemini || "";
        if (this.aiApiKeyOpenai) this.aiApiKeyOpenai.value = settings.ai_api_key_openai || "";
        if (this.aiApiKeyOpenrouter) this.aiApiKeyOpenrouter.value = settings.ai_api_key_openrouter || "";
        if (this.aiApiKeyMinimax) this.aiApiKeyMinimax.value = settings.ai_api_key_minimax || "";
        if (this.aiApiKeyGlm) this.aiApiKeyGlm.value = settings.ai_api_key_glm || "";
        if (this.aiModelFilter) this.aiModelFilter.value = settings.ai_model_filter || "";

        this.updateAIKeyVisibility();
        this.refreshModelSelect();

        if (this.gridOpacity) {
            this.gridOpacity.value = String(settings.grid_opacity !== undefined ? settings.grid_opacity : 20);
        }

        const selectedGlyphsets = settings.glyphsets || ["GF_Latin_Kernel"];
        const glyphsetCheckboxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox'));
        glyphsetCheckboxes.forEach((cb) => {
            cb.checked = selectedGlyphsets.includes(cb.value);
        });

        if (this.extendedLatinGlyphs) {
            this.extendedLatinGlyphs.checked = !!settings.extendedLatinGlyphs;
        }

        const deployedInHa = isDeployedInHa();
        if (this.haManualUrl) {
            this.haManualUrl.value = getHaManualUrl() || "";
            this.haManualUrl.disabled = deployedInHa;
            this.haManualUrl.style.opacity = deployedInHa ? "0.5" : "1";
        }
        if (this.haLlatToken) {
            this.haLlatToken.value = getHaToken() || "";
            this.haLlatToken.disabled = deployedInHa;
            this.haLlatToken.style.opacity = deployedInHa ? "0.5" : "1";
        }
        if (this.haDeployedWarning) {
            this.haDeployedWarning.classList.toggle('hidden', !deployedInHa);
        }
        if (this.haCorsTip) {
            this.haCorsTip.classList.toggle('hidden', deployedInHa);
        }

        if (this.haTestResult) this.haTestResult.textContent = "";
        if (this.aiTestResult) this.aiTestResult.textContent = "";

        const originPlaceholder = /** @type {HTMLElement | null} */ (document.getElementById('haOriginPlaceholder'));
        if (originPlaceholder) {
            originPlaceholder.textContent = getBrowserOrigin();
        }

        this.updateEntityCount();

        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    updateEntityCount() {
        if (this.entityCountLabel && entityStatesCache) {
            const count = countCachedEntities(entityStatesCache);
            this.entityCountLabel.textContent = `${count} entities cached`;
        }
    }

    setupListeners() {
        if (!this.modal) return;

        const snapToGrid = this.snapToGrid;
        if (snapToGrid) {
            snapToGrid.addEventListener('change', () => {
                AppState.setSnapEnabled(snapToGrid.checked);
            });
        }

        const showGrid = this.showGrid;
        if (showGrid) {
            showGrid.addEventListener('change', () => {
                AppState.setShowGrid(showGrid.checked);
                const gridEl = /** @type {HTMLElement | null} */ (document.querySelector('.canvas-grid'));
                if (gridEl) {
                    gridEl.style.display = showGrid.checked ? 'block' : 'none';
                }
            });
        }

        const showConditionalWidgets = this.showConditionalWidgets;
        if (showConditionalWidgets) {
            showConditionalWidgets.addEventListener('change', () => {
                AppState.updateSettings({ showConditionalWidgets: showConditionalWidgets.checked });
                emit(EVENTS.STATE_CHANGED);
            });
        }

        const lightMode = this.lightMode;
        if (lightMode) {
            lightMode.addEventListener('change', () => {
                const isLight = lightMode.checked;
                AppState.updateSettings({ editor_light_mode: isLight });
                this.applyEditorTheme(isLight);
                emit(EVENTS.STATE_CHANGED);
            });
        }

        const cIncludeComments = this.cIncludeComments;
        if (cIncludeComments) {
            cIncludeComments.addEventListener('change', () => {
                AppState.updateSettings({ c_include_comments: cIncludeComments.checked });
            });
        }

        const autoSave = this.autoSave;
        if (autoSave) {
            autoSave.addEventListener('change', () => {
                AppState.updateSettings({ autoSaveEnabled: autoSave.checked });
            });
        }

        const gridOpacity = this.gridOpacity;
        if (gridOpacity) {
            gridOpacity.addEventListener('input', () => {
                const val = parseInt(gridOpacity.value, 10);
                AppState.updateSettings({ grid_opacity: val });
            });
        }

        const refreshEntitiesBtn = this.refreshEntitiesBtn;
        if (refreshEntitiesBtn) {
            refreshEntitiesBtn.addEventListener('click', async () => {
                refreshEntitiesBtn.disabled = true;
                refreshEntitiesBtn.textContent = "Refreshing...";

                if (fetchEntityStates) {
                    await fetchEntityStates();
                }

                this.updateEntityCount();
                refreshEntitiesBtn.disabled = false;
                refreshEntitiesBtn.textContent = "â†» Refresh Entity List";
            });
        }

        const haManualUrl = this.haManualUrl;
        if (haManualUrl) {
            haManualUrl.addEventListener('change', () => {
                setHaManualUrl(haManualUrl.value.trim());
                refreshHaBaseUrl();
            });
        }

        const haLlatToken = this.haLlatToken;
        if (haLlatToken) {
            haLlatToken.addEventListener('change', () => {
                setHaToken(haLlatToken.value.trim());
            });
        }

        const testHaBtn = this.testHaBtn;
        if (testHaBtn) {
            testHaBtn.addEventListener('click', async () => {
                const haTestResult = this.haTestResult;
                testHaBtn.disabled = true;
                if (haTestResult) {
                    haTestResult.textContent = "Testing...";
                    haTestResult.style.color = "var(--muted)";
                }

                try {
                    refreshHaBaseUrl();
                    const entities = await fetchEntityStates();
                    if (entities && entities.length > 0) {
                        if (haTestResult) {
                            haTestResult.textContent = "âœ… Success!";
                            haTestResult.style.color = "var(--success)";
                        }
                        this.updateEntityCount();
                    } else if (haTestResult) {
                        haTestResult.innerHTML = "âŒ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?";
                        haTestResult.style.color = "var(--danger)";
                    }
                } catch {
                    if (haTestResult) {
                        haTestResult.innerHTML = "âŒ Connection Error.<br>Check browser console.";
                        haTestResult.style.color = "var(--danger)";
                    }
                } finally {
                    testHaBtn.disabled = false;
                }
            });
        }

        const aiProvider = this.aiProvider;
        if (aiProvider) {
            aiProvider.addEventListener('change', () => {
                AppState.updateSettings({ ai_provider: aiProvider.value });
                this.updateAIKeyVisibility();
                this.refreshModelSelect();
            });
        }

        /**
         * @param {string} id
         * @param {string} key
         */
        const bindAIKey = (id, key) => {
            const el = /** @type {HTMLInputElement | null} */ (document.getElementById(id));
            if (el) el.addEventListener('input', () => AppState.updateSettings({ [key]: el.value.trim() }));
        };
        bindAIKey('aiApiKeyGemini', 'ai_api_key_gemini');
        bindAIKey('aiApiKeyOpenai', 'ai_api_key_openai');
        bindAIKey('aiApiKeyOpenrouter', 'ai_api_key_openrouter');
        bindAIKey('aiApiKeyMinimax', 'ai_api_key_minimax');
        bindAIKey('aiApiKeyGlm', 'ai_api_key_glm');

        const aiModelFilter = this.aiModelFilter;
        if (aiModelFilter) {
            aiModelFilter.addEventListener('input', () => {
                AppState.updateSettings({ ai_model_filter: aiModelFilter.value });
                this.filterModels();
            });
        }

        const aiModelSelect = this.aiModelSelect;
        if (aiModelSelect) {
            aiModelSelect.addEventListener('change', () => {
                const provider = AppState.settings.ai_provider;
                AppState.updateSettings({ [`ai_model_${provider}`]: aiModelSelect.value });
            });
        }

        const aiRefreshModelsBtn = this.aiRefreshModelsBtn;
        if (aiRefreshModelsBtn) {
            aiRefreshModelsBtn.addEventListener('click', async () => {
                const provider = AppState.settings.ai_provider || "gemini";
                let apiKey = AppState.settings[`ai_api_key_${provider}`];
                const inputId = `aiApiKey${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
                const inputEl = /** @type {HTMLInputElement | null} */ (document.getElementById(inputId));

                if (inputEl) {
                    apiKey = inputEl.value.trim();
                    AppState.updateSettings({ [`ai_api_key_${provider}`]: apiKey });
                }

                if (!apiKey) {
                    showToast("Please enter an API key first", "error", 3000);
                    return;
                }

                aiRefreshModelsBtn.disabled = true;
                aiRefreshModelsBtn.textContent = "...";
                const aiTestResult = this.aiTestResult;
                if (aiTestResult) {
                    aiTestResult.textContent = "Testing...";
                    aiTestResult.style.color = "var(--muted)";
                }

                try {
                    const models = await aiService.fetchModels(provider, apiKey);
                    aiService.cache.models[provider] = models;
                    this.refreshModelSelect();
                    if (aiTestResult) {
                        aiTestResult.textContent = `âœ… Success! Found ${models.length} models.`;
                        aiTestResult.style.color = "var(--success)";
                    }
                } catch {
                    if (aiTestResult) {
                        aiTestResult.textContent = "âŒ Failed. Check key/console.";
                        aiTestResult.style.color = "var(--danger)";
                    }
                } finally {
                    aiRefreshModelsBtn.disabled = false;
                    aiRefreshModelsBtn.textContent = "Test & Load Models";
                }
            });
        }

        const glyphsetCheckboxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox'));
        glyphsetCheckboxes.forEach((cb) => {
            cb.addEventListener('change', () => {
                const checkedBoxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox:checked'));
                const checked = Array.from(checkedBoxes).map((el) => el.value);
                AppState.updateSettings({ glyphsets: checked });
            });
        });

        const extendedLatinGlyphs = this.extendedLatinGlyphs;
        if (extendedLatinGlyphs) {
            extendedLatinGlyphs.addEventListener('change', () => {
                AppState.updateSettings({ extendedLatinGlyphs: extendedLatinGlyphs.checked });
            });
        }

        const categoryHeaders = /** @type {NodeListOf<HTMLElement>} */ (this.modal.querySelectorAll('.settings-category-header'));
        categoryHeaders.forEach((header) => {
            header.addEventListener('click', () => {
                const category = /** @type {HTMLElement | null} */ (header.closest('.settings-category'));
                if (!category) return;
                const isExpanded = category.classList.contains('expanded');

                if (isExpanded) {
                    category.classList.remove('expanded');
                } else {
                    category.classList.add('expanded');
                }
            });
        });
    }

    updateAIKeyVisibility() {
        const provider = AppState.settings.ai_provider || "gemini";
        const providers = /** @type {Array<'gemini' | 'openai' | 'openrouter' | 'minimax' | 'glm'>} */ (Object.keys(this.aiKeyRows));
        providers.forEach((p) => {
            if (this.aiKeyRows[p]) {
                this.aiKeyRows[p].style.display = (p === provider) ? "block" : "none";
            }
        });
    }

    async refreshModelSelect() {
        if (!this.aiModelSelect) return;
        const provider = AppState.settings.ai_provider || "gemini";

        if (!aiService || !aiService.cache) return;

        let models = aiService.cache.models[provider];
        if (!models) {
            models = [];
            const apiKey = AppState.settings[`ai_api_key_${provider}`] || "";
            models = await aiService.fetchModels(provider, apiKey);
            aiService.cache.models[provider] = models;
        }

        this.filterModels();
    }

    filterModels() {
        const aiModelSelect = this.aiModelSelect;
        if (!aiModelSelect) return;
        const provider = AppState.settings.ai_provider || "gemini";
        const filterStr = (AppState.settings.ai_model_filter || "").toLowerCase();

        if (!aiService || !aiService.cache) return;
        const models = /** @type {{ id: string, name: string }[]} */ (aiService.cache.models[provider] || []);

        const filtered = models.filter((m) =>
            m.name.toLowerCase().includes(filterStr) ||
            m.id.toLowerCase().includes(filterStr)
        );

        aiModelSelect.innerHTML = "";
        filtered.forEach((m) => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            aiModelSelect.appendChild(opt);
        });

        const currentModel = AppState.settings[`ai_model_${provider}`];
        if (currentModel) {
            aiModelSelect.value = currentModel;
        }
    }

    /**
     * @param {boolean} isLightMode
     */
    applyEditorTheme(isLightMode) {
        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        try {
            const storage = getWebStorage();
            if (!storage) return;
            storage.setItem('reterminal-editor-theme', isLightMode ? 'light' : 'dark');
        } catch (e) {
            Logger.log('Could not save theme preference:', e);
        }
    }
}
