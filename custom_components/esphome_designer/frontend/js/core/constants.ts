/**
 * Shared constants for ESPHome Designer.
 */

declare global {
    interface Window {
        ESPHomeDesigner: any;
        COLORS: typeof COLORS;
        UI_DEFAULTS: typeof UI_DEFAULTS;
        ALIGNMENT: typeof ALIGNMENT;
        ORIENTATIONS: typeof ORIENTATIONS;
        DEFAULT_PREFERENCES: typeof DEFAULT_PREFERENCES;
        WIDGET_DEFAULTS: typeof WIDGET_DEFAULTS;
        HISTORY_LIMIT: typeof HISTORY_LIMIT;
        CACHE_TTL: typeof CACHE_TTL;
        ENTITY_LIMIT: typeof ENTITY_LIMIT;
        ESPHOME_COLOR_MAPPING: typeof ESPHOME_COLOR_MAPPING;
        DEFAULT_CANVAS_WIDTH: typeof DEFAULT_CANVAS_WIDTH;
        DEFAULT_CANVAS_HEIGHT: typeof DEFAULT_CANVAS_HEIGHT;
        SNAP_DISTANCE: typeof SNAP_DISTANCE;
        GRID_SIZE: typeof GRID_SIZE;
    }
}

export const COLORS = {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GRAY: "#808080",
    GREY: "#808080",
    RED: "#FF0000",
    GREEN: "#00FF00",
    BLUE: "#0000FF",
    YELLOW: "#FFFF00",
    ORANGE: "#FFA500"
} as const;


export const UI_DEFAULTS = {
    GRID_SIZE: 10,
    SNAP_THRESHOLD: 10,
    SIDEBAR_WIDTH: 300,
    PROPERTIES_WIDTH: 350
} as const;

export const WIDGET_DEFAULTS = {
    X: 40,
    Y: 40,
    WIDTH: 200,
    HEIGHT: 60
} as const;

// Alignment options match ESPHome TextAlign enum
export const ALIGNMENT = {
    TOP_LEFT: "TOP_LEFT",
    TOP_CENTER: "TOP_CENTER",
    TOP_RIGHT: "TOP_RIGHT",
    CENTER_LEFT: "CENTER_LEFT",
    CENTER: "CENTER",
    CENTER_RIGHT: "CENTER_RIGHT",
    BOTTOM_LEFT: "BOTTOM_LEFT",
    BOTTOM_CENTER: "BOTTOM_CENTER",
    BOTTOM_RIGHT: "BOTTOM_RIGHT"
} as const;

export const ORIENTATIONS = {
    LANDSCAPE: "landscape",
    PORTRAIT: "portrait",
    LANDSCAPE_INVERTED: "landscape_inverted",
    PORTRAIT_INVERTED: "portrait_inverted"
} as const;

export const DEFAULT_PREFERENCES = {
    snapEnabled: true,
    showGrid: true,
    showConditionalWidgets: false,
    showDebugGrid: false,
    showRulers: false,
    autoSaveEnabled: true,
    gridOpacity: 8,
    editor_light_mode: false,
    // AI settings are read/written with snake_case keys (ai_provider,
    // ai_model_<provider>); the model ids stay empty so the provider's live
    // model list decides the default instead of a hardcoded (deprecatable) id.
    ai_provider: "gemini",
    ai_model_filter: "",
    ai_model_gemini: "",
    ai_model_openai: "",
    ai_model_openrouter: "",
    ai_model_minimax: "",
    ai_model_glm: "",
    extendedLatinGlyphs: false,
    autoCycleEnabled: false,
    autoCycleIntervalS: 30,
    refreshInterval: 600,
    manualRefreshOnly: false,
    darkMode: false,
    invertedColors: null as boolean | null,
    lcdEcoStrategy: "backlight_off",
    dimTimeout: 10,
    sleepEnabled: false,
    sleepStartHour: 0,
    sleepEndHour: 5,
    deepSleepEnabled: false,
    deepSleepInterval: 600,
    deepSleepStayAwakeSwitch: false,
    deepSleepStayAwakeEntityId: "input_boolean.esphome_stay_awake",
    deepSleepFirmwareGuard: false,
    dailyRefreshEnabled: false,
    dailyRefreshTime: "08:00",
    noRefreshStartHour: null,
    noRefreshEndHour: null,
    renderingMode: "direct" as "direct" | "lvgl" | "c" | "oepl" | "opendisplay",
    c_include_comments: true,
    oeplEntityId: "",
    oeplDither: 2,
    opendisplayDeviceId: "",
    opendisplayEntityId: "",
    opendisplayDither: 2,
    opendisplayTtl: 60,
    glyphsets: ["GF_Latin_Kernel"]
};



export const HISTORY_LIMIT = 50;


export const CACHE_TTL = {
    RSS: 300,
    ENTITIES: 60
} as const;

export const ENTITY_LIMIT = 5000;
export const SNAP_DISTANCE = 10;
export const GRID_SIZE = 10;

export const ESPHOME_COLOR_MAPPING: Record<string, string> = {
    "white": "COLOR_WHITE",
    "black": "COLOR_BLACK",
    "gray": "Color(160, 160, 160)",
    "grey": "Color(160, 160, 160)",
    "red": "COLOR_RED",
    "green": "COLOR_GREEN",
    "blue": "COLOR_BLUE",
    "yellow": "COLOR_YELLOW",
    "orange": "COLOR_ORANGE"
};

export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 480;



// Initialize global namespace
(window as any).ESPHomeDesigner = (window as any).ESPHomeDesigner || {
    version: "1.0.0-rc26",
    constants: {
        COLORS,
        UI_DEFAULTS,
        ALIGNMENT,
        ORIENTATIONS,
        DEFAULT_PREFERENCES,
        WIDGET_DEFAULTS,
        HISTORY_LIMIT,
        CACHE_TTL,
        ENTITY_LIMIT,
        ESPHOME_COLOR_MAPPING,
        DEFAULT_CANVAS_WIDTH,
        DEFAULT_CANVAS_HEIGHT,
        SNAP_DISTANCE,
        GRID_SIZE
    }
};
