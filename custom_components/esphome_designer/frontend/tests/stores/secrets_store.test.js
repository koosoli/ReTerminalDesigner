import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

describe('SecretsStore', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.resetModules();
    });

    it('loads persisted AI keys from storage on construction', async () => {
        localStorage.setItem('esphome-designer-ai-keys', JSON.stringify({
            ai_api_key_gemini: 'gemini-key',
            ai_api_key_openai: 'openai-key'
        }));

        const { SecretsStore } = await import('../../js/core/stores/secrets_store.js');
        const store = new SecretsStore();

        expect(store.get('ai_api_key_gemini')).toBe('gemini-key');
        expect(store.get('ai_api_key_openai')).toBe('openai-key');
        expect(mockLogger.log).toHaveBeenCalled();
    });

    it('persists only supported keys and ignores unknown keys', async () => {
        const { SecretsStore } = await import('../../js/core/stores/secrets_store.js');
        const store = new SecretsStore();

        store.set('ai_api_key_openrouter', 'router-key');
        store.set('unknown_key', 'ignored');

        expect(store.get('ai_api_key_openrouter')).toBe('router-key');
        expect(store.get('unknown_key')).toBe('');
        expect(JSON.parse(localStorage.getItem('esphome-designer-ai-keys') || '{}')).toEqual({
            ai_api_key_gemini: '',
            ai_api_key_openai: '',
            ai_api_key_openrouter: 'router-key',
            ai_api_key_minimax: '',
            ai_api_key_glm: ''
        });
    });

    it('warns and falls back safely when persisted JSON is invalid', async () => {
        localStorage.setItem('esphome-designer-ai-keys', '{broken-json');

        const { SecretsStore } = await import('../../js/core/stores/secrets_store.js');
        const store = new SecretsStore();

        expect(store.get('ai_api_key_gemini')).toBe('');
        expect(mockLogger.warn).toHaveBeenCalled();
    });

    it('warns instead of throwing when saving to storage fails', async () => {
        const originalStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
        Object.defineProperty(globalThis, 'localStorage', {
            configurable: true,
            value: {
                getItem: vi.fn(() => null),
                setItem: vi.fn(() => {
                    throw new Error('quota');
                }),
                removeItem: vi.fn(),
                clear: vi.fn(),
                key: vi.fn(() => null),
                length: 0
            }
        });

        const { SecretsStore } = await import('../../js/core/stores/secrets_store.js');
        const store = new SecretsStore();

        expect(() => store.set('ai_api_key_gemini', 'new-key')).not.toThrow();
        expect(mockLogger.warn).toHaveBeenCalled();
        if (originalStorageDescriptor) {
            Object.defineProperty(globalThis, 'localStorage', originalStorageDescriptor);
        }
    });
});

describe('omitSecretSettings', () => {
    it('strips credential keys and keeps everything else', async () => {
        const { omitSecretSettings, isSecretSettingKey } = await import('../../js/core/stores/secrets_store.js');

        const result = omitSecretSettings({
            orientation: 'landscape',
            ai_provider: 'gemini',
            ai_model_gemini: 'gemini-3.6-flash',
            ai_api_key_gemini: 'secret-key',
            ai_api_key_openai: 'another-secret',
            ai_api_key_openrouter: '',
            ai_api_key_minimax: '',
            ai_api_key_glm: ''
        });

        expect(result).toEqual({
            orientation: 'landscape',
            ai_provider: 'gemini',
            ai_model_gemini: 'gemini-3.6-flash'
        });
        expect(Object.keys(result).some(isSecretSettingKey)).toBe(false);
    });

    it('does not mutate the source object', async () => {
        const { omitSecretSettings } = await import('../../js/core/stores/secrets_store.js');

        const source = { ai_api_key_gemini: 'secret-key', orientation: 'portrait' };
        omitSecretSettings(source);

        expect(source.ai_api_key_gemini).toBe('secret-key');
    });
});
