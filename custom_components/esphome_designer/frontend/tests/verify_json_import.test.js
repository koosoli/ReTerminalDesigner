
import { AppState } from '../js/core/state';
import { loadLayoutIntoState } from '../js/io/yaml_import';
import { Logger } from '../js/utils/logger.js';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock Logger to prevent console spam
Logger.log = () => { };
Logger.warn = () => { };
Logger.error = () => { };

describe('JSON Import Verification', () => {

    beforeEach(() => {
        AppState.reset();
    });

    it('should correctly import legacy JSON format', () => {
        const legacyLayout = {
            pages: [],
            name: "Legacy Device",
            device_model: "reterminal_e1001",
            device_id: "legacy_id_123"
        };

        loadLayoutIntoState(legacyLayout);

        expect(AppState.deviceName).toBe("Legacy Device");
        expect(AppState.deviceModel).toBe("reterminal_e1001");
        expect(AppState.currentLayoutId).toBe("legacy_id_123");
    });

    it('should correctly import modern JSON format with custom hardware', () => {
        const modernLayout = {
            pages: [],
            deviceName: "Modern Device",
            deviceModel: "custom",
            currentLayoutId: "modern_id_456",
            manualYamlOverride: "# persisted manual yaml",
            renderingMode: "lvgl",
            customHardware: {
                resWidth: 800,
                resHeight: 600,
                shape: "round"
            }
        };

        loadLayoutIntoState(modernLayout);

        expect(AppState.deviceName).toBe("Modern Device");
        expect(AppState.deviceModel).toBe("custom");
        expect(AppState.currentLayoutId).toBe("modern_id_456");
        expect(AppState.settings.renderingMode).toBe("lvgl");
        expect(AppState.getManualYamlOverride?.()).toBe("# persisted manual yaml");

        const customHw = AppState.project.state.customHardware;
        expect(customHw.resWidth).toBe(800);
        expect(customHw.resHeight).toBe(600);
        expect(customHw.shape).toBe("round");
    });

    it('should restore rendering mode from snake_case layout payloads', () => {
        const layout = {
            pages: [],
            device_model: "waveshare_esp32_s3_touch_lcd_7",
            rendering_mode: "lvgl"
        };

        loadLayoutIntoState(layout);

        expect(AppState.deviceModel).toBe("waveshare_esp32_s3_touch_lcd_7");
        expect(AppState.settings.renderingMode).toBe("lvgl");
    });

    it('should restore snake_case HA settings and hardware payloads from backend layouts', () => {
        const layout = {
            pages: [],
            device_model: "custom",
            sleep_enabled: true,
            sleep_start_hour: 23,
            sleep_end_hour: 6,
            deep_sleep_enabled: true,
            deep_sleep_interval: 900,
            deep_sleep_stay_awake_switch: true,
            deep_sleep_stay_awake_entity_id: "input_boolean.office_panel_awake",
            deep_sleep_firmware_guard: true,
            manual_refresh_only: false,
            refresh_interval: 1200,
            auto_cycle_enabled: true,
            auto_cycle_interval_s: 45,
            lcd_eco_strategy: "dim_after_timeout",
            oepl_entity_id: "open_epaper_link.office",
            oepl_dither: 4,
            custom_hardware: {
                resWidth: 800,
                resHeight: 480,
                shape: "round"
            },
            protocol_hardware: {
                width: 400,
                height: 300,
                colorMode: "tri"
            }
        };

        loadLayoutIntoState(layout);

        expect(AppState.settings.sleepEnabled).toBe(true);
        expect(AppState.settings.sleepStartHour).toBe(23);
        expect(AppState.settings.sleepEndHour).toBe(6);
        expect(AppState.settings.deepSleepEnabled).toBe(true);
        expect(AppState.settings.deepSleepInterval).toBe(900);
        expect(AppState.settings.deepSleepStayAwakeSwitch).toBe(true);
        expect(AppState.settings.deepSleepStayAwakeEntityId).toBe("input_boolean.office_panel_awake");
        expect(AppState.settings.deepSleepFirmwareGuard).toBe(true);
        expect(AppState.settings.refreshInterval).toBe(1200);
        expect(AppState.settings.autoCycleEnabled).toBe(true);
        expect(AppState.settings.autoCycleIntervalS).toBe(45);
        expect(AppState.settings.lcdEcoStrategy).toBe("dim_after_timeout");
        expect(AppState.settings.oeplEntityId).toBe("open_epaper_link.office");
        expect(AppState.settings.oeplDither).toBe(4);

        expect(AppState.project.state.customHardware).toMatchObject({
            resWidth: 800,
            resHeight: 480,
            shape: "round"
        });
        expect(AppState.project.state.protocolHardware).toMatchObject({
            width: 400,
            height: 300,
            colorMode: "tri"
        });
    });

    it('should restore the saved AI provider and model selection', () => {
        // Regression (#484): the AI model was written into the saved payload but
        // dropped on load, so the dropdown fell back to an auto-detected model.
        const layout = {
            pages: [],
            device_id: "ai_settings_test",
            ai_provider: "gemini",
            ai_model_gemini: "gemini-3.5-pro",
            ai_model_openai: "gpt-5",
            ai_model_filter: "pro"
        };

        loadLayoutIntoState(layout);

        expect(AppState.settings.ai_provider).toBe("gemini");
        expect(AppState.settings.ai_model_gemini).toBe("gemini-3.5-pro");
        expect(AppState.settings.ai_model_openai).toBe("gpt-5");
        expect(AppState.settings.ai_model_filter).toBe("pro");
    });

    it('should prioritize device_id from layout over current state', () => {
        AppState.setCurrentLayoutId("original_id");

        const layout = {
            pages: [],
            currentLayoutId: "new_imported_id"
        };

        loadLayoutIntoState(layout);

        expect(AppState.currentLayoutId).toBe("new_imported_id");
    });

    it('should correctly import legacy HA storage dump format', () => {
        const haStorageDump = {
            "version": 1,
            "key": "reterminal_dashboard",
            "data": {
                "devices": {
                    "reterminal_e1001": {
                        "device_id": "ha_storage_id",
                        "name": "HA Storage Device",
                        "pages": [],
                        "device_model": "reterminal_e1001"
                    }
                }
            }
        };

        loadLayoutIntoState(haStorageDump);

        expect(AppState.deviceName).toBe("HA Storage Device");
        expect(AppState.currentLayoutId).toBe("ha_storage_id");
        expect(AppState.deviceModel).toBe("reterminal_e1001");
    });

    it('should restore the active page index from imported layouts', () => {
        const layout = {
            pages: [
                { id: "page_0", name: "Page 1", widgets: [] },
                { id: "page_1", name: "Page 2", widgets: [] }
            ],
            current_page: 1,
            device_id: "page_restore_test"
        };

        loadLayoutIntoState(layout);

        expect(AppState.currentLayoutId).toBe("page_restore_test");
        expect(AppState.currentPageIndex).toBe(1);
    });

    it('should preserve backend page metadata like visibility windows and grid layout', () => {
        const layout = {
            device_id: "page_metadata_test",
            pages: [{
                id: "page_0",
                name: "Scheduled",
                refresh_type: "daily",
                refresh_time: "08:45",
                visible_from: "06:00",
                visible_to: "22:00",
                layout: "4x4",
                widgets: []
            }]
        };

        loadLayoutIntoState(layout);

        expect(AppState.currentLayoutId).toBe("page_metadata_test");
        expect(AppState.pages[0]).toEqual(expect.objectContaining({
            refresh_type: "daily",
            refresh_time: "08:45",
            visible_from: "06:00",
            visible_to: "22:00",
            layout: "4x4"
        }));
    });

    it('never serializes AI API keys into the exported layout payload', () => {
        AppState.updateSettings({
            ai_provider: 'gemini',
            ai_model_gemini: 'gemini-3.6-flash',
            ai_api_key_gemini: 'super-secret-key',
            ai_api_key_openai: 'another-secret-key'
        });

        // The keys are still available to the running app...
        expect(AppState.settings.ai_api_key_gemini).toBe('super-secret-key');

        // ...but must not leave via the payload used for file export,
        // Home Assistant storage and shared snippets.
        const payload = AppState.getPagesPayload();

        expect(Object.keys(payload).filter((key) => key.startsWith('ai_api_key_'))).toEqual([]);
        expect(JSON.stringify(payload)).not.toContain('super-secret-key');
        expect(JSON.stringify(payload)).not.toContain('another-secret-key');

        // Non-secret AI preferences still round-trip.
        expect(payload.ai_provider).toBe('gemini');
        expect(payload.ai_model_gemini).toBe('gemini-3.6-flash');
    });

    it('ignores AI API keys embedded in an imported layout', () => {
        AppState.updateSettings({
            ai_api_key_gemini: 'my-own-key',
            ai_api_key_openai: 'my-own-openai-key'
        });

        loadLayoutIntoState({
            pages: [],
            ai_api_key_gemini: 'someone-elses-key',
            settings: {
                ai_api_key_gemini: 'someone-elses-key',
                ai_api_key_openai: 'someone-elses-openai-key',
                ai_provider: 'openai'
            }
        });

        expect(AppState.settings.ai_api_key_gemini).toBe('my-own-key');
        expect(AppState.settings.ai_api_key_openai).toBe('my-own-openai-key');
        // Non-secret settings from the imported layout still apply.
        expect(AppState.settings.ai_provider).toBe('openai');
    });
});
