import { ProjectStore } from './project_store.js';
import { EditorStore } from './editor_store';
import { PreferencesStore } from './preferences_store.js';
import { SecretsStore, isSecretSettingKey, omitSecretSettings } from './secrets_store.js';

import { SelectionManager } from './app_state/selection_manager.js';
import { HistoryManager } from './app_state/history_manager.js';
import { WidgetManager } from './app_state/widget_manager.js';
import { PageManager } from './app_state/page_manager.js';

import { emit, EVENTS, on } from '../events.js';
import { Logger } from '../../utils/logger.js';
import { hasHaBackend } from '../../utils/env.js';
import { DEVICE_PROFILES } from '../../io/devices.js';

type UnknownRecord = Record<string, any>;
type WidgetUpdate = Partial<Widget> & { props?: Record<string, any> };
type AppSettingsSnapshot = UnknownRecord & {
    device_name?: string | null;
    deviceName?: string | null;
    device_model?: string | null;
    deviceModel?: string | null;
    customHardware?: HardwareSettings | null;
    custom_hardware?: HardwareSettings | null;
    protocolHardware?: Record<string, any> | null;
    protocol_hardware?: Record<string, any> | null;
    renderingMode?: string | null;
    orientation?: string | null;
    oeplEntityId?: string;
    oeplDither?: number;
    opendisplayDeviceId?: string;
    opendisplayEntityId?: string;
    opendisplayDither?: number;
    opendisplayTtl?: number;
};
type ManualYamlOverrideOptions = {
    emitStateChange?: boolean;
};
type PageChangeOptions = {
    forceFocus?: boolean;
    [key: string]: unknown;
};
type PageClearResult = {
    deleted: number;
    preserved: number;
};
type DeviceProfilesMap = Record<string, Partial<DeviceProfile> & Record<string, any>>;

export class AppStateFacade {
    project: ProjectStore;
    editor: EditorStore;
    preferences: PreferencesStore;
    secrets: SecretsStore;

    selectionManager: SelectionManager;
    historyManager: HistoryManager;
    widgetManager: WidgetManager;
    pageManager: PageManager;

    _isRestoringHistory: boolean;
    isUndoRedoInProgress: boolean;
    entityStates: Record<string, any>;
    $raw?: AppStateFacade;

    constructor() {
        this.project = new ProjectStore();
        this.editor = new EditorStore();
        this.preferences = new PreferencesStore();
        this.secrets = new SecretsStore();

        this.selectionManager = new SelectionManager(this);
        this.historyManager = new HistoryManager(this);
        this.widgetManager = new WidgetManager(this);
        this.pageManager = new PageManager(this);

        this._isRestoringHistory = false;
        this.isUndoRedoInProgress = false;
        this.entityStates = {};

        this.recordHistory();

        on(EVENTS.SETTINGS_CHANGED, (settings: AppSettingsSnapshot | undefined) => {
            if (settings && settings.renderingMode !== undefined) {
                this.syncWidgetVisibilityWithMode();
            }
        });
    }

    reset(): void {
        this.project.reset();
        this.editor.state.selectedWidgetIds = [];
        this.recordHistory();
    }

    get pages(): Page[] {
        return this.project.pages as Page[];
    }

    get state() {
        return this.project.state;
    }

    get currentPageIndex(): number {
        return this.project.currentPageIndex;
    }

    get selectedWidgetId(): string | null {
        return this.editor.selectedWidgetIds[0] || null;
    }

    get selectedWidgetIds(): string[] {
        return this.editor.selectedWidgetIds;
    }

    get settings(): AppSettingsSnapshot {
        return {
            ...this.preferences.state,
            device_name: this.project.deviceName,
            deviceName: this.project.deviceName,
            device_model: this.project.deviceModel,
            deviceModel: this.project.deviceModel,
            customHardware: this.project.customHardware as HardwareSettings | null,
            custom_hardware: this.project.customHardware as HardwareSettings | null,
            protocolHardware: this.project.protocolHardware as Record<string, any> | null,
            protocol_hardware: this.project.protocolHardware as Record<string, any> | null,
            ...this.secrets.keys
        };
    }

    get deviceName(): string | null {
        return this.project.deviceName;
    }

    get deviceModel(): string | null {
        return this.project.deviceModel;
    }

    get currentLayoutId(): string | null {
        return this.project.currentLayoutId;
    }

    get manualYamlOverride(): string {
        return this.project.manualYamlOverride;
    }

    get snapEnabled(): boolean {
        return this.preferences.snapEnabled;
    }

    get showGrid(): boolean {
        return this.preferences.showGrid;
    }

    get showDebugGrid(): boolean {
        return this.preferences.showDebugGrid;
    }

    get showRulers(): boolean {
        return this.preferences.showRulers;
    }

    get zoomLevel(): number {
        return this.editor.zoomLevel;
    }

    getCurrentPage(): Page | null {
        return this.project.getCurrentPage() as Page | null;
    }

    getWidgetById(id: string): Widget | undefined {
        return this.project.getWidgetById(id) as Widget | undefined;
    }

    getSelectedWidget(): Widget | undefined {
        return this.project.getWidgetById(this.editor.selectedWidgetIds[0]) as Widget | undefined;
    }

    getSelectedWidgets(): Widget[] {
        return this.editor.selectedWidgetIds
            .map((id) => this.getWidgetById(id))
            .filter((widget): widget is Widget => !!widget);
    }

    getSelectedProfile(): DeviceProfile | null {
        const profiles = DEVICE_PROFILES as unknown as DeviceProfilesMap;
        return this.project.deviceModel ? (profiles[this.project.deviceModel] as DeviceProfile | undefined) || null : null;
    }

    getCanvasDimensions(): { width: number; height: number } {
        const mode = this.preferences.state.renderingMode || 'direct';
        if (mode === 'oepl' || mode === 'opendisplay') {
            const protocolHardware = this.project.protocolHardware as { width: number; height: number };
            const orientation = this.preferences.state.orientation;
            if (orientation === 'portrait' || orientation === 'portrait_inverted') {
                return {
                    width: Math.min(protocolHardware.width, protocolHardware.height),
                    height: Math.max(protocolHardware.width, protocolHardware.height)
                };
            }
            return {
                width: Math.max(protocolHardware.width, protocolHardware.height),
                height: Math.min(protocolHardware.width, protocolHardware.height)
            };
        }

        return this.project.getCanvasDimensions(this.preferences.state.orientation || 'landscape');
    }

    getCanvasShape(): string {
        return this.project.getCanvasShape();
    }

    getPagesPayload(): ProjectPayload {
        const payload = {
            ...(this.project.getPagesPayload() as ProjectPayload),
            currentPageIndex: this.currentPageIndex,
            ...omitSecretSettings(this.settings)
        } as ProjectPayload;

        payload.deviceModel = this.project.deviceModel || undefined;
        payload.customHardware = this.project.customHardware as HardwareSettings | undefined;
        payload.protocolHardware = this.project.protocolHardware as Record<string, any> | undefined;

        payload.device_model = this.project.deviceModel || undefined;
        payload.custom_hardware = this.project.customHardware as HardwareSettings | undefined;
        payload.protocol_hardware = this.project.protocolHardware as Record<string, any> | undefined;
        return payload;
    }

    getSettings(): AppSettingsSnapshot {
        return this.settings;
    }

    getManualYamlOverride(): string {
        return this.project.manualYamlOverride;
    }

    setSettings(settings: AppSettingsSnapshot): void {
        this.updateSettings(settings);
    }

    updateProtocolHardware(updates: Record<string, any>): void {
        Object.assign(this.project.state.protocolHardware, updates);
        emit(EVENTS.SETTINGS_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }

    saveToLocalStorage(): void {
        if (!hasHaBackend()) {
            const payload = this.getPagesPayload();
            localStorage.setItem('esphome-designer-layout', JSON.stringify(payload));
        }
    }

    loadFromLocalStorage(): ProjectPayload | null {
        try {
            const data = localStorage.getItem('esphome-designer-layout');
            return data ? JSON.parse(data) as ProjectPayload : null;
        } catch (error) {
            Logger.error('[loadFromLocalStorage] Parse error:', error);
            return null;
        }
    }

    setPages(pages: Page[]): void {
        this.project.setPages(pages);
        emit(EVENTS.STATE_CHANGED);
    }

    reorderWidget(pageIndex: number, fromIndex: number, toIndex: number): void {
        this.pageManager.reorderWidget(pageIndex, fromIndex, toIndex);
    }

    setCurrentPageIndex(index: number, options: PageChangeOptions = {}): void {
        this.pageManager.setCurrentPageIndex(index, options);
    }

    reorderPage(fromIndex: number, toIndex: number): void {
        this.pageManager.reorderPage(fromIndex, toIndex);
    }

    addPage(atIndex: number | null | undefined = null): Page | null {
        return this.pageManager.addPage(atIndex) as Page | null;
    }

    deletePage(index: number): void {
        this.pageManager.deletePage(index);
    }

    duplicatePage(index: number): Page | null {
        return this.pageManager.duplicatePage(index) as Page | null;
    }

    renamePage(index: number, newName: string): void {
        this.pageManager.renamePage(index, newName);
    }

    selectWidget(id: string | null | undefined, multi = false): void {
        this.selectionManager.selectWidget(id, multi);
    }

    selectWidgets(ids: string[]): void {
        this.selectionManager.selectWidgets(ids);
    }

    selectAllWidgets(): void {
        this.selectionManager.selectAllWidgets();
    }

    deselectAll(): void {
        this.selectionManager.deselectAll();
    }

    toggleSelection(id: string): void {
        this.selectionManager.toggleSelection(id);
    }

    isWidgetSelected(id: string): boolean {
        return this.selectionManager.isWidgetSelected(id);
    }

    groupSelection(): void {
        this.selectionManager.groupSelection();
    }

    ungroupSelection(idOrIds: string | string[] | null | undefined = null): void {
        this.selectionManager.ungroupSelection(idOrIds);
    }

    alignSelectedWidgets(direction: string): void {
        this.selectionManager.alignSelectedWidgets(direction);
    }

    distributeSelectedWidgets(axis: string): void {
        this.selectionManager.distributeSelectedWidgets(axis);
    }

    updateSettings(newSettings: AppSettingsSnapshot): void {
        const secretUpdates: Record<string, any> = {};
        const prefUpdates: Record<string, any> = {};

        Object.keys(newSettings).forEach((key) => {
            if (isSecretSettingKey(key)) {
                secretUpdates[key] = newSettings[key];
            } else {
                prefUpdates[key] = newSettings[key];
            }
        });

        if (Object.keys(secretUpdates).length) {
            Object.entries(secretUpdates).forEach(([key, value]) => this.secrets.set(key, String(value ?? '')));
        }

        this.preferences.update(prefUpdates);

        if (newSettings.device_name) {
            this.project.state.deviceName = newSettings.device_name;
        }
        if (newSettings.device_model) {
            this.project.state.deviceModel = newSettings.device_model;
        }

        emit(EVENTS.STATE_CHANGED);

        if (newSettings.device_model || newSettings.orientation || newSettings.custom_hardware) {
            emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
        }
    }

    setDeviceName(name: string): void {
        this.project.state.deviceName = name;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }

    setDeviceModel(model: string): void {
        this.project.state.deviceModel = model;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }

    setCurrentLayoutId(id: string): void {
        this.project.state.currentLayoutId = id;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }

    setManualYamlOverride(value: string, options: ManualYamlOverrideOptions = {}): void {
        this.project.setManualYamlOverride(value, options);
    }

    clearManualYamlOverride(options: ManualYamlOverrideOptions = {}): void {
        this.project.clearManualYamlOverride(options);
    }

    updateLayoutIndicator(): void {
        const nameElement = document.getElementById('currentLayoutName');
        if (nameElement) {
            nameElement.textContent = this.project.deviceName || this.project.currentLayoutId || 'Unknown';
        }
    }

    setSnapEnabled(enabled: boolean): void {
        this.preferences.setSnapEnabled(enabled);
    }

    setShowGrid(enabled: boolean): void {
        this.preferences.setShowGrid(enabled);
    }

    setShowDebugGrid(enabled: boolean): void {
        this.preferences.setShowDebugGrid(enabled);
    }

    setShowRulers(enabled: boolean): void {
        this.preferences.setShowRulers(enabled);
    }

    setZoomLevel(level: number): void {
        this.editor.setZoomLevel(level);
    }

    setCustomHardware(config: Record<string, any>): void {
        this.widgetManager.setCustomHardware(config);
    }

    addWidget(widget: Widget, pageIndex: number | null = null): void {
        this.widgetManager.addWidget(widget, pageIndex);
    }

    updateWidget(id: string, updates: WidgetUpdate): void {
        this.widgetManager.updateWidget(id, updates);
    }

    updateWidgets(ids: string[], updates: WidgetUpdate): void {
        this.widgetManager.updateWidgets(ids, updates);
    }

    updateWidgetsProps(ids: string[], propUpdates: Record<string, any>): void {
        this.widgetManager.updateWidgetsProps(ids, propUpdates);
    }

    deleteWidget(id: string | null = null): void {
        this.widgetManager.deleteWidget(id);
    }

    moveWidgetToPage(widgetId: string, targetPageIndex: number, x: number | null = null, y: number | null = null): boolean {
        return this.widgetManager.moveWidgetToPage(widgetId, targetPageIndex, x, y);
    }

    copyWidget(id: string | null = null): void {
        this.widgetManager.copyWidget(id);
    }

    pasteWidget(): void {
        this.widgetManager.pasteWidget();
    }

    createDropShadow(widgetIdOrIds: string | string[]): void {
        this.widgetManager.createDropShadow(widgetIdOrIds);
    }

    clearCurrentPage(preserveLocked = false): PageClearResult {
        return this.pageManager.clearCurrentPage(preserveLocked) as PageClearResult;
    }

    recordHistory(): void {
        this.historyManager.recordHistory();
    }

    replaceHistoryBaseline(): void {
        this.historyManager.replaceHistoryBaseline();
    }

    undo(): void {
        this.historyManager.undo();
    }

    redo(): void {
        this.historyManager.redo();
    }

    setInternalFlag(key: keyof AppStateFacade | string, value: unknown): void {
        const target = this.$raw || this;
        (target as AppStateFacade & Record<string, unknown>)[String(key)] = value;
    }

    restoreSnapshot(snapshot: ProjectPayload | UnknownRecord): void {
        this.historyManager.restoreSnapshot(snapshot);
    }

    canUndo(): boolean {
        return this.historyManager.canUndo();
    }

    canRedo(): boolean {
        return this.historyManager.canRedo();
    }

    syncWidgetOrderWithHierarchy(): void {
        this.widgetManager.syncWidgetOrderWithHierarchy();
    }

    syncWidgetVisibilityWithMode(): void {
        this.widgetManager.syncWidgetVisibilityWithMode();
    }

    _isWidgetCompatibleWithMode(widget: Widget, mode: string): boolean {
        return this.widgetManager.isWidgetCompatibleWithMode(widget, mode);
    }

    _checkRenderingModeForWidget(widget: Widget): void {
        this.widgetManager.checkRenderingModeForWidget(widget);
    }
}

const AppStateInstance = new AppStateFacade();

const handler: ProxyHandler<AppStateFacade> = {
    set(target, prop, value, receiver) {
        if (prop === 'snapEnabled') {
            Logger.warn(`[StateProxy] Intercepted illegal write to '${String(prop)}'. Automatically rerouting to setSnapEnabled().`);
            if (typeof target.setSnapEnabled === 'function') {
                target.setSnapEnabled(Boolean(value));
            }
            return true;
        }

        const allowedInternalProps = ['entityStates', '_isRestoringHistory', 'isUndoRedoInProgress'];

        if (typeof prop === 'string' && !allowedInternalProps.includes(prop) && typeof target[prop as keyof AppStateFacade] !== 'function') {
            Logger.warn(`[StateProxy] Illegal state mutation detected: AppState.${prop} = ${String(value)}`);
            console.trace(`[StateProxy] Trace for illegal mutation of AppState.${prop}`);
        }

        return Reflect.set(target, prop, value, receiver);
    }
};

export const AppState = new Proxy(AppStateInstance, handler);
