## v1.0.0 RC40 - reTerminal D1001, Rotation and Graph Grid Fixes
**Release Date:** August 15, 2026

### Features
- **Seeed Studio reTerminal D1001 Profile (Issue #470):** Added an untested hardware recipe for the 8" reTerminal D1001 (ESP32-P4 with an ESP32-C6 companion, 800x1280 MIPI-DSI). The profile uses ESPHome's built-in `SEEED-RETERMINAL-D1001` display model, the `gsl3670` touchscreen model, and the required XL9535 expander, so it needs ESPHome 2026.7.0 or newer.

### Security
- **AI API Keys Embedded in Exported Layouts:** Layout payloads no longer carry AI provider API keys. Exported layout JSON, layouts saved to Home Assistant, and shared snippets previously embedded every configured key in plaintext, so sharing a layout disclosed the key. Keys now stay in browser local storage only. Importing a layout also ignores any keys it contains, so opening a shared layout can no longer overwrite local credentials. Anyone who has shared a layout file or snippet should rotate their AI provider keys.

### Fixes
- **Rotation Inserted Inside the Display Lambda (Issue #485):** Display rotation is no longer spliced into the middle of the `display:` lambda block scalar. The merger previously located the display entry with a text pattern that stopped at the first blank line inside the generated lambda, which terminated the block scalar early and orphaned the remaining drawing code. Rotation is now placed with the other `display:` keys ahead of `lambda:`, and base rotation detection no longer matches `rotation:` text inside the lambda body.
- **Graph Grid Settings Ignored (Issue #482):** The "1 Week" and "2 Weeks" duration presets emitted `duration: 1w`, which ESPHome rejects because it has no week unit. Presets now emit `7d` and `14d`, and previously saved week values are converted on export. The canvas preview and the LVGL export now draw the configured `x_grid`/`y_grid` instead of a fixed 4x4 grid, the direct/lambda export no longer paints a second grid over the one ESPHome already renders, and a degenerate value range no longer emits `y_grid: 0`.
- **Gemini Model Selection Reverting (Issue #484):** Selecting a Gemini model no longer reverts to the previous default. The model was persisted under an `ai_model_undefined` key whenever the AI provider had never been changed from its default, so the saved value was never read back. The selection now survives closing and reopening settings, a page reload, and an active model filter, and the offline fallback model no longer points at a retired Gemini release.
- **Entity Picker Overwriting Widget Bindings:** The browse buttons for "Trigger Entity" and "Condition Entity" no longer overwrite the widget's own `entity_id` and title when picking an entity for a state trigger or visibility condition.
- **js-yaml Security Update (PR #481):** Upgraded `js-yaml` to 4.3.1 for GHSA-5p4m-2wfm-xmqj, a quadratic CPU consumption issue in `!!omap` resolution that is reachable when parsing imported YAML.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, schema baseline, and rebuilt frontend assets for RC40.

---

## v1.0.0 RC39 - Auth Fix and Unique Touch Area IDs
**Release Date:** August 8, 2026

### Fixes
- **HTTP Ban Warnings on Hardware Fetch (Issue #480):** Fixed a regression from RC37 where hardware profile requests were sent without authentication whenever the detected Home Assistant API base was an absolute URL. The unauthenticated requests triggered repeated `homeassistant.components.http.ban` warnings and could eventually ban the client IP. Hardware package requests now always use the authenticated HA fetch path.
- **Duplicate Touch Area IDs (Issue #477, PR #478):** Touch areas sharing the same Home Assistant entity no longer generate duplicate ESPHome `binary_sensor` IDs that broke compilation. Touch area IDs are now derived from the unique widget ID (thanks @hacsact).
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC39.

---

## v1.0.0 RC38 - Editor Visibility, Drag, Lock, and C++ Output Controls
**Release Date:** August 6, 2026

### Features
- **Conditional Widget Editing (Issue #465):** Editor Preferences now includes “Show conditionally hidden widgets.” Widgets hidden by their current visibility condition can be selected and edited on the canvas with a distinct dashed outline, without changing their runtime condition.
- **Drag Source Outline (Issue #466):** Widgets now retain a visible dashed outline while being dragged, making freeform positioning easier without grid snapping.
- **LVGL Lock Control (Issue #468):** The LVGL Switch control now supports `lock.*` entities. It reflects the current lock state and calls `lock.lock` or `lock.unlock` as appropriate.
- **C/C++ Comment Toggle (Issue #474):** Editor Preferences now includes a C/C++ Output “Include comments” option. Disabling it produces compact C/C++ drawing output without generated comments; ESPHome YAML continues to retain its round-trip metadata by default.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC38.

---

## v1.0.0 RC37 - Home Assistant 2026.8 Panel Layout Fix
**Release Date:** August 6, 2026

### Fixes
- **Home Assistant 2026.8 Panel Height (Issues #472 and #475):** The custom panel host now has an explicit viewport height (`100vh` with a `100dvh` override). This prevents the iframe and designer layout from collapsing when Home Assistant no longer gives custom panels an implicit height.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC37.

---

## v1.0.0 RC36 - Sensor Text and E1003 Hardware Completion
**Release Date:** July 21, 2026

### Fixes and Features
- **Numeric Binary-Sensor Attributes (Issue #464):** Sensor Text now identifies the selected attribute type rather than the parent entity state. Numeric attributes on binary entities generate matching Home Assistant `sensor:` declarations instead of an unused text sensor.
- **Custom Sensor Text Lambdas:** Sensor Text now provides a multiline custom C++ lambda field for Direct and LVGL ESPHome exports. The lambda returns the complete rendered text, enabling custom formatting and conditional output.
- **E1003 Battery and Touch Profile (Issue #449):** The reTerminal E1003 profile now enables its battery divider on GPIO40 and includes the GT911 I2C, address, interrupt, and reset configuration required by the device.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, schema baseline, and rebuilt frontend assets for RC36.

---

## v1.0.0 RC35 - Touch Fixes, Custom Date Format, and Hardware Updates
**Release Date:** July 21, 2026

### Fixes and Features
- **E1003 GT911 Touchscreen (Issue #449):** Added GT911 capacitive touchscreen configuration to the reTerminal E1003 hardware profile and removed the conflicting `home: GPIO2` button that blocked the touch driver initialisation.
- **Duplicate Touch Sensor YAML (Issue #463):** Fixed a regression that emitted a duplicate `binary_sensor` touch registration block when generating YAML for non-package-based configurations.
- **Touch Area Touchscreen ID Resolution:** `touch_area` and `template_nav_bar` plugins now resolve the active touchscreen ID from the device profile via `resolveTouchscreenId` instead of assuming a hardcoded `my_touchscreen` identifier, which fixes export on devices that declare a custom `touchscreenId`.
- **Datetime Custom strftime Format (Issue #20):** Added a "Custom Format (strftime)" option to the Date & Time widget with live preview (supporting `%S`, `%I`, `%p` and standard tokens), direct C++ export, OpenDisplay export, OEPL export, and LVGL lambda support.
- **Sensor Text Time-String Parsing Fix:** The Sensor Text renderer no longer misinterprets time-formatted strings (e.g. `5:44`) as floating-point numbers, preventing a silent value truncation in the canvas preview.
- **M5Stack Referral Links:** Added referral parameters (`?ref=qcwynykf`) for M5Stack hardware products in the README (M5Paper, M5Core Ink, M5Stack Tab5).
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC35.

---

## v1.0.0 RC34 - OpenDisplay Completion and Visibility Preview Fix
**Release Date:** July 21, 2026

### Fixes and Features
- **OpenDisplay Completion:** OpenDisplay exports now use the current persisted device, dither, and TTL settings; correctly resolve page-level dark mode and QR scale/color; expose Weather Forecast; and cover every OpenDisplay-compatible palette widget and supported payload type.
- **OpenDisplay Delivery Reliability:** Rebuilt and committed the complete frontend distribution bundle and build metadata so the shipped Home Assistant package matches the OpenDisplay source changes and passes CI freshness verification.
- **Visibility Condition Preview (Issue #462):** The canvas now evaluates entity-state visibility conditions, including Home Assistant binary-state aliases such as `on`/`off` and `true`/`false`, numeric comparisons, and numeric ranges. It rerenders when entity states load so conditional widgets reflect the current preview state.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC34.

---

## v1.0.0 RC33 - Controls, Hardware, AI, and Sensor Improvements
**Release Date:** July 20, 2026

### Fixes and Features
- **LVGL Switch Feedback (Issue #459):** HA-backed LVGL switches and checkboxes now suppress state-sync events before calling `homeassistant.toggle`, preventing toggle feedback loops.
- **CrowPanel 7 Hardware (Issue #458):** Added the Elecrow CrowPanel 7-inch package profile and prevent sensor bars from referencing a local battery sensor when the hardware has no battery ADC.
- **Sensor Text Colors (Issue #453):** Dynamic color interpolation now uses Oklab and supports an optional midpoint color stop.
- **Datetime Entity Metadata (Issue #460):** Entity responses now include `last_changed` and `last_updated`; Sensor Text adds a datetime format preview field.
- **AI Providers (PR #402):** Added MiniMax and GLM/Z.AI provider selection, model lists, API-key storage, and request support.
- **PNA Header Hardening (PR #457):** PNA response headers are emitted only for requests carrying an Origin header.
- **Issue #442 Verification:** Raspberry Pi Pico W and Pico 2 W Waveshare 2.13-inch V3 presets were already shipped in RC31.
- **GeekMagic Package Fallback (Issue #461):** GeekMagic Mini and Pro profiles now use bundled hardware YAML when the Home Assistant package endpoint cannot serve the profile, preventing 404 generation failures.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC33.

---

## v1.0.0 RC32 - Generated YAML and Color Rendering Fixes
**Release Date:** July 19, 2026

### Fixes
- **LVGL Dynamic Widget Refresh:** Wi-Fi signal, on-device temperature, and on-device humidity widgets now refresh their dynamic child labels instead of their static container, preventing ESPHome refresh errors.
- **LVGL Page Navigation:** Page-change scripts now show the requested LVGL page, and navbar home actions return to the first page when paging is enabled.
- **LVGL Navigation Colors:** Explicit navigation-icon text colors are retained during LVGL export so dark themes remain legible on the navigation bar.
- **Sensor Text Dynamic Colors:** Preview and generated ESPHome color ramps now use gamma-correct sRGB interpolation for perceptually accurate intermediate colors.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC32.

---

## v1.0.0 RC31 - Hardware Profile and Sensor Text Fixes
**Release Date:** July 17, 2026

### Fixes
- **E1002 Deep Sleep Timing (Issue #450):** The color e-paper profile now waits 35 seconds after a display refresh before entering deep sleep, allowing the panel refresh to finish.
- **E1003 ESP-IDF Profile (Issue #449):** Added the Seeedstudio reTerminal E1003 IT8951 profile with its required ESP-IDF configuration and ESPHome 2026.7.0+ requirement.
- **Pico E-Paper Profiles (Issue #442):** Added Raspberry Pi Pico W and Pico 2 W presets for the Waveshare Pico e-Paper 2.13-inch V3, including RP2 setup guidance and no unsupported deep-sleep output.
- **Elecrow P4 V1.2 Profile (Issue #438):** Added the Elecrow ESP32-P4 9-inch HMI V1.2 hardware recipe with the vendor's display, touch, backlight, and ESP32-C6 hosted Wi-Fi wiring.
- **Regression Coverage (Issue #428):** Added coverage confirming the E1001 profile retains its required inverted e-paper palette.
- **E1001 Palette and Dark Mode (Issue #428):** Preserve the E1001 panel's required `7.50inv2p` hardware palette while Dark Mode selects the semantic foreground and background colors.
- **E1003 IT8951 GPIO Conflict (Issue #449):** Removed the GPIO21 battery-enable output, which conflicts with the official IT8951 driver.
- **LVGL Tabview Compile Workaround (Issue #452):** Tabviews now include a hidden label so ESPHome enables LVGL's required label component when a layout contains only tabs.
- **Screen Rotation (Issue #451):** Added 180-degree landscape and 270-degree portrait orientations, including YAML/protocol import preservation and correctly sized canvases.
- **Missing Sensor Values (Issue #446):** Sensor Bars now default to available local SHT and battery sensors; narrow Sensor Text widgets no longer omit values when automatic labels consume their width.
- **Sensor Text Auto Label (Issue #448):** Replacing an entity now refreshes a title previously generated from the old entity's friendly name, without overwriting custom labels.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC31.

---

## v1.0.0 RC29 - GeekMagic Pro Hardware Profile
**Release Date:** July 14, 2026

### Fixes
- **GeekMagic Pro MIPI-SPI Profile (Issue #433):** Added a first-class 240x240 GeekMagic Pro ESP32 hardware recipe using the reporter's verified ST7789V MIPI-SPI configuration. Generated YAML now includes the required named SPI bus, MODE3, 40 MHz data rate, display inversion, LVGL-compatible clearing, and active-low backlight.
- **Issue Verification:** Confirmed the existing fixes for RSS proxy authentication (#446), sensor secondary-entity handling (#439), selection-toolbar stacking (#441), and E1001 explicit inversion output (#428). Issue #436 remains unverified because the report does not include a reproducible layout or generated YAML.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC29.

---

## v1.0.0 RC28 - Sensor Pairing, LVGL Export & Canvas Toolbar Fixes
**Release Date:** July 12, 2026

### Fixes
- **Sensor Widget: Secondary Entity Selection and Export (Issue #439):** Selecting a secondary entity no longer overwrites the primary entity or its unit. Secondary numeric sensors are now included in generated Home Assistant sensor declarations, and each paired value retains its own detected unit.
- **Sensor Widget: Split Unit Vertical Alignment (Issue #445):** Split value/unit rendering now converts TOP/CENTER/BOTTOM anchors into top-left draw positions before printing each fragment, preventing centered or bottom-aligned values from being shifted below their widget.
- **Canvas Grouping Toolbar (Issue #441):** The selection toolbar now stacks above the Add Page target, so Group Selection remains clickable when selected widgets are near the right edge of a page.
- **Custom Hardware LVGL Export (Issue #433):** LVGL exports now remove empty display lambda headers left by custom hardware templates. ESPHome no longer rejects these outputs for combining LVGL with `lambda:`.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for RC28.

---

## v1.0.0 RC27 - RSS Proxy Auth Fix, Sensor Unit Alignment & Preview Fix
**Release Date:** July 11, 2026

This RC27 release resolves three bugs introduced or exposed in recent releases: the RSS quote widget returning 401 errors for unauthenticated ESPHome devices, the sensor unit text being misaligned when center- or right-aligned widgets use a separate unit font size, and the unit font size not updating visually in the canvas preview for label-format sensor widgets.

### Fixes
- **RSS Quote Widget Authentication Fix (Issue #446):** The RSS proxy endpoint (`/api/esphome_designer/rss_proxy`) was rejecting requests from ESPHome devices with a 401 Unauthorized error after RC25. ESPHome devices call this endpoint directly via HTTP without a Home Assistant auth token. The endpoint now correctly opts out of HA authentication (`requires_auth = False`), matching the pattern used by other device-facing endpoints.
- **Sensor Widget Unit Alignment in Generated C++ (Issue #445):** When a Sensor widget used a separate unit font size and was center- or right-aligned, the generated ESPHome C++ display lambda placed the unit text incorrectly — always at `xVal + wv + 2` regardless of alignment mode. The code generator now computes alignment-aware x positions: for LEFT the behaviour is unchanged; for RIGHT the unit is placed flush at the right anchor and the value immediately to its left; for CENTER both value and unit are measured at runtime and the combined block is centred on the widget anchor point.
- **Sensor Unit Font Size Not Updating in Canvas Preview:** When using label-bearing formats (`Label: Value`, `Label [newline] Value`, `Value Label`) with a custom unit font size, the unit text was always rendered inline at the value's font size — the separate unit span with its own `font-size` was only created in the `Value & Unit` (value_only) format path. All label format branches now split the unit into a dedicated styled span when `unit_font_size` is explicitly set, making the canvas preview match the generated output.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for the RC27 release line.


---

## v1.0.0 RC26 - E1004 Profile Activation & Sensor Unit Size/Alignment
**Release Date:** July 9, 2026

This RC26 release activates the Seeed reTerminal E1004 hardware profile with the correct ESPHome driver configuration, and adds independent unit font size and alignment controls to the Sensor widget as requested in Issue #440.

### New Features & Fixes
- **Seeed reTerminal E1004 Profile Activated (hardware):** The E1004 13.3" Spectra 6 hardware profile is now fully active and correctly configured based on a user-tested working YAML. The `isComingSoon` flag has been removed. The profile now uses the correct lowercase display model name (`seeed-reterminal-e1004`), injects the required `external_components` reference to ESPHome PR #16706 (the `epaper_spi` driver), emits `display_config` with `cs1_pin` + `allow_other_uses: true` for the shared GPIO2 pin, and sets the Home button as an object with `allow_other_uses: true` to prevent ESPHome pin-conflict errors.
- **Button Generator `allow_other_uses` Support:** The GPIO binary sensor generator now outputs `allow_other_uses: true/false` in the pin definition when a button configuration object includes the property. This resolves pin-sharing conflicts for devices like the E1004 where a pin is shared between a button and a display CS line.
- **Sensor Widget: Independent Unit Size & Alignment (Issue #440):** The Sensor widget now exposes two new controls in the Appearance panel — **Unit Size** (number input) and **Unit Align** (Top/Center/Bottom). When `Unit Size` differs from `Value Size`, the unit is rendered as a separate element with its own font and vertical alignment both in the canvas preview and in the generated ESPHome C++ display lambda, using `measure()` to position the unit immediately after the value text.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, schema hash, and rebuilt frontend assets for the RC26 release line.

---

## v1.0.0 RC25 - LVGL Import, Calendar, Controls, and E1004 Profile

**Release Date:** July 3, 2026

This RC25 release addresses recent LVGL export/import reports, adds localization and bar-label controls, and refreshes the supported device/profile list.

### Stability & Verification
- **LVGL Button Service Fix (Issue #435):** `input_button.*` controls now emit `input_button.press` instead of `button.press`, and action-only button entities are no longer imported as Home Assistant sensors.
- **LVGL Inline Import Fix (Issue #434):** Native LVGL inline mappings now preserve properties such as `align`, label text, arc ranges, and arc colors during import.
- **Calendar Export Fixes (Issue #432 and Issue #431):** Direct calendar exports no longer use unsupported rounded-fill primitives, and calendar widgets now support localized day/month labels in English, German, French, Dutch, Spanish, and Italian.
- **Editor Splitter Persistence (Issue #437):** YAML, properties, and code panel split sizes now persist across reloads and tab switches.
- **LVGL Bar Enhancements (Discussion #430):** LVGL bars now support optional top and bottom caption text while preserving the previous no-caption export and preview behavior.
- **LVGL Media Slider Robustness (Discussion #420):** Media-player sliders now bind to the `volume_level` attribute for state updates instead of the media player's textual state.
- **Device Profiles (Discussion #254 and E1004):** Confirmed the Guition JC4880P443 profile is already present and registered the Seeedstudio reTerminal E1004 13.3 inch Spectra 6 profile as a visible but disabled coming-soon device until ESPHome driver/model support is upstream.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, schema hash, and rebuilt frontend assets for the RC25 release line.

---

## v1.0.0 RC24.1 - E-Paper Color Inversion Defaults Hotfix
**Release Date:** June 21, 2026

This RC24.1 hotfix addresses default color inversion settings on e-paper screens.

### Stability & Verification
- **E-Paper Color Inversion Fix:** Corrects color inversion defaults on monochrome e-paper devices (such as Seeedstudio reTerminal E1001 and TRMNL) so they default to inverted colors (black background, white text) without manual overrides. Color e-paper screens (such as E1002 and PhotoPainter) do not default to inverted colors.
- **Migration Action Required:** Existing layouts saved under previous versions may have the incorrect default explicitly saved. Users should open the **Device Settings** modal for their layouts once and save to apply the corrected defaults.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC24.1 hotfix line.

---

## v1.0.0 RC24 - Long Entity ID Collision Fix
**Release Date:** June 20, 2026

This RC24 release resolves an issue where extremely long Home Assistant entity IDs sharing a prefix would collide during ESPHome layout generation.

### Stability & Verification
- **Long Entity ID Collision Resolution (Issue #429):** The `makeSafeId` function now uses a deterministic base36 hashing utility `getSimpleHash` to produce unique 63-character safe ESPHome identifiers when entity names exceed the length limit.
- **Consolidated safe ID generator:** Removed all duplicate local implementations of the `makeSafeId` helper across widget plugins (such as `sensor_text`, `weather_icon`, and `quote_rss`) and consolidated them to import the centralized helper from `export_helpers.js`.
- **ESPHome rounded_rectangle compilation fix (Issue #426):** Replaced invalid `rounded_rectangle` calls in the weather forecast widget with a custom `draw_rrect_border` helper lambda to draw non-filled rounded corners, resolving C++ compilation failures during ESPHome builds.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC24 release line.

---

## v1.0.0 RC23 - E-Paper Color Inversion & Widget Import Stability Fixes
**Release Date:** June 20, 2026

This RC23 release resolves default color inversion settings on e-paper screens, parser crashes during YAML imports of dropdown/roller lists, and ensures Home Assistant entity bindings for visibility conditions are correctly declared.

### Stability & Verification
- **Default E-Paper Color Inversion (Issue #428):** Layout default for `invertedColors` is now `null` (representing deferred-to-profile), allowing e-paper screens like `reterminal_e1001` to correctly default to inverted colors (black background, white text) without manual overrides.
- **Dropdown & Roller List YAML Import (Issue #427):** Resolves a parsing crash (`TypeError: replace is not a function`) when importing layout YAML where `options` is formatted as a YAML sequence/array.
- **Visibility Condition Entity Declarations (Issue #426):** Automatically generates the required `binary_sensor` and sensor scaffolding for condition entities when used in visibility expressions.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC23 release line.

---

## v1.0.0 RC22 - Auto-cycle Logic & Visibility Refresh Fix
**Release Date:** June 19, 2026

This RC22 release resolves an auto-cycle timer bug and improves the responsiveness of widget visibility updates.

### Stability & Verification
- **Auto-cycle Interval Logic Fix (Issue #423):** The `auto_cycle_timer` script now includes an `id(auto_cycle_timer).is_running()` check. This prevents the timer from being reset on every loop, allowing the user-configured interval to correctly elapse before switching pages.
- **Widget Visibility Refresh Trigger (Issue #426):** Implemented `collectVisibilityTriggers` in the entity deduplication infrastructure. The generator now automatically attaches refresh triggers to widgets that rely on condition entities, ensuring they appear or disappear instantly when the Home Assistant entity state changes.
- **Image Widget Visibility Export (Issue #426):** The image widget now calls `addVisibilityConditions()` during export, ensuring visibility conditions on image widgets are correctly declared as binary sensors and emitted in the generated YAML — previously they were silently dropped.
- **Weather Widget Corner Radius Export (Issue #426):** The weather forecast widget's OpenDisplay export now correctly uses `it.filled_rounded_rectangle()` and `it.rounded_rectangle()` when a non-zero corner radius is set. Previously, plain `it.filled_rectangle()` / `it.rectangle()` were always used, causing the rounded corner setting to be silently ignored in the generated code.
- **Progress Bar Shape Fix (Issue #426):** Removed a hardcoded `borderRadius: "2px"` from the progress bar renderer that was overriding the widget's configured shape, causing the bar to always appear rounded regardless of user settings.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC22 release line.

---

## v1.0.0-rc.21 - USB CDC Logger Conflict Resolution & Device Settings Fix
**Release Date:** June 17, 2026

This RC21 release fixes a pin conflict on reTerminal E1001/E1002 and other devices using GPIO19/GPIO20 for hardware peripherals, and resolves a Device Settings modal bug where the auto-cycle interval field failed to appear.

### Stability & Verification
- **Avoid USB CDC Logger Conflict (Issue #422):** Detects if the hardware profile uses native USB pins (GPIO19/20) for device peripherals like I2C. If in use, the YAML generator now prints a warning, disables the suggestion to use `USB_CDC` logging, and suggests `UART0` instead to prevent conflicts.
- **Device Settings Auto-Cycle Visibility Fix (Issue #423):** The "Cycle every N seconds" interval field now correctly appears when the "Enable Automatic Page Cycling" checkbox is checked. The `updateDeviceSettingsVisibility()` function was refactored into isolated try-catch sections so that an error in any one visibility group (power modes, dim timeout, rendering mode) no longer prevents subsequent groups (including the auto-cycle toggle) from executing. Defensive null checks and optional chaining were also added to `CustomHardwarePanel.updateVisibility()` and `ProtocolHardwarePanel.updateStrategyDisplay()`.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC21 release line.

---

## v1.0.0-rc20.4 - MIPI/Parallel RGB Display Wizard Support
**Release Date:** June 16, 2026

This RC20.4 hotfix adds support for MIPI and parallel RGB displays in the custom hardware profile wizard, fixing issues where SPI bus and pin options were generated incorrectly.

### Stability & Verification
- **MIPI/Parallel RGB display support in wizard (Issue #416):** Added parallel RGB `rpi_dpi_rgb` platform support in the custom hardware profile wizard dropdown, and updated the YAML generator to correctly identify non-SPI display platforms (including `mipi_dsi`, `mipi_rgb`, and `rpi_dpi_rgb`) to omit SPI configurations.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC20.4 hotfix line.

---

## v1.0.0-rc20.3 - Online Image LVGL Recolor Fix
**Release Date:** June 16, 2026

This RC20.3 hotfix addresses the online image recolor bug in LVGL mode.

### Stability & Verification
- **LVGL Online Image Recolor Fix (Issue #417):** Online images in LVGL mode now use `image_recolor_opa: "transp"` instead of unconditionally forcing `"cover"`, preventing downloaded images from being completely tinted/hidden in the generated layout.
- **Release Metadata Refresh:** Updated package metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC20.3 hotfix line.

---

## v1.0.0-rc20.2 - LVGL Touchscreen & Image Hotfix
**Release Date:** June 10, 2026

This RC20.1 hotfix follows up on [Discussion #420](https://github.com/koosoli/ESPHomeDesigner/discussions/420#discussioncomment-17252247), where ESPHome 2026.5.3 still rejected generated LVGL YAML after the RC20 media-player slider fix.

### Stability & Verification
- **LVGL Touchscreen Schema Fix (Discussion #420):** LVGL export now emits touchscreen references in ESPHome's current object form, `touchscreen_id: ...`, and omits the `touchscreens` block entirely when the profile has no concrete touchscreen component instead of producing `touchscreens: []`.
- **LVGL Image Widget Compatibility (Discussion #420):** LVGL image widgets now export with ESPHome's current `image:` widget key instead of the legacy `img:` key, preventing `Unknown widget type: img` compile failures.
- **LVGL Image Import Compatibility:** Native LVGL import accepts both current `image:` and legacy `img:` widget tags so older snippets can still round-trip into the designer.
- **Weather Hourly Helper YAML Follow-up (Issue #414):** The weather widget's Copy HA YAML action now uses the same robust timestamp matching as the export comments for hourly forecasts, including relative `+Nh` slots and fixed-hour slots that roll forward to tomorrow after the slot has passed.
- **Weather Hourly Temperature Entity Fix (Issue #414):** Hourly forecast temperature helpers and ESPHome Home Assistant sensors now use `sensor.weather_forecast_plus_1h` / `sensor.weather_forecast_hour_0900` without the daily-only `_high` suffix, while the designer preview still accepts existing `_high` entities as a compatibility fallback.
- **OpenDisplay Text Truncation Option (Issue #421):** Text and Sensor Text widgets now expose a `Truncate Overflow` option and emit `truncate: true` for OpenDisplay text exports when enabled, so users can match the clipped editor preview on-device.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC20.1 hotfix line.

---

## v1.0.0 RC20 - Hardware Import, LVGL Images & Font Paths
**Release Date:** June 10, 2026

This RC20 release follows up on the latest reports in issues #417 and #418 plus discussions #419 and #420, while rechecking the recent #416, #414, and #409 feedback against the current generator.

### Stability & Verification
- **Imported Hardware Profile Selection (Issue #418):** Importing a hardware recipe now refreshes the profile registry, selects the imported profile when it can be identified, and loads the custom hardware editor fields immediately instead of leaving users on stale/default custom settings.
- **Saved Custom Profile State Sync (Issue #418 / #416 follow-up):** Selecting an imported or saved custom profile now also refreshes the persisted custom-hardware state from that profile, keeping generated YAML, canvas dimensions, and visible form fields aligned.
- **LVGL Online Image Export Fix (Issue #417):** LVGL online-image exports no longer attach invalid `lvgl.widget.refresh` callbacks to image widgets after download/error events.
- **Local Font File Export (Discussion #420):** Custom font values that point at local `.ttf`, `.otf`, `.pcf`, or `.bdf` files now export as ESPHome local font files instead of being treated as Google Font family names.
- **Media Player Slider Action (Discussion #419):** LVGL sliders bound to `media_player.*` entities now emit a modern `homeassistant.action` volume-set action with a 0-100 slider mapped to Home Assistant's 0.0-1.0 volume level.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC20 release line.

---

## v1.0.0 RC19.3 - Guition P4 LVGL Follow-up Hotfix
**Release Date:** June 6, 2026

This RC19.3 hotfix follows the latest field feedback on [Issue #416](https://github.com/koosoli/ESPHomeDesigner/issues/416) and keeps the Guition ESP32-P4 MIPI-DSI profiles aligned with the generated LVGL YAML.

### Stability & Verification
- **Profile-aware LVGL IDs (Issue #416):** LVGL export now uses hardware profile display and touchscreen IDs instead of always emitting `my_display` and `my_touchscreen`, so Guition P4 package exports reference `main_display` and `device_touchscreen` consistently.
- **Guition P4 Profile Updates (Issue #416):** The JC4880P443 profile now uses the expected component IDs, includes PSRAM speed and ES8311 audio scaffolding, and the new JC8012P4A1C 10.1" 800x1280 MIPI-DSI profile is available as a supported built-in package profile.
- **Snippet Import Robustness (Discussion #254):** Pasted ESPHome snippets wrapped in Markdown backticks are normalized before parsing, and display lambdas using `it.print(...)` are imported as text widgets where possible.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC19.3 hotfix line.

---

## v1.0.0 RC19.2 - Guition JC4880P443 Profile Hotfix
**Release Date:** June 6, 2026

This RC19.2 hotfix follows up on [Issue #416](https://github.com/koosoli/ESPHomeDesigner/issues/416) after field testing on the Guition JC4880P443 ESP32-P4 MIPI-DSI panel.

### Stability & Verification
- **Built-in JC4880P443 Profile:** Added Guition JC4880P443 as a supported built-in hardware package profile with the required ESP32-P4 `esp_ldo`, `esp32_hosted`, `psram`, GT911 touch, MIPI-DSI display, and GPIO23 backlight blocks.
- **Bundled Profile Parsing Fix:** Hardware recipe metadata now reads the display platform/model from the `display:` block instead of the first `platform:` in the file, preventing output or touchscreen sections from being mistaken for the display.
- **Regression Coverage:** Added tests for the new built-in profile metadata and required boot/connect/backlight YAML blocks.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC19.2 hotfix line.

---

## v1.0.0 RC19.1 - Hourly Weather Forecast Hotfix
**Release Date:** June 6, 2026

This RC19.1 hotfix addresses the hourly forecast temperature mismatch reported in [Issue #414](https://github.com/koosoli/ESPHomeDesigner/issues/414).

### Stability & Verification
- **Relative Hourly Temperature Entity Fix:** Generated Home Assistant helper YAML now names relative hourly temperature sensors with the `High` suffix, so Home Assistant's generated entity IDs line up with the ESPHome sensors that the display subscribes to.
- **Regression Coverage:** Added focused weather forecast tests for the corrected relative hourly helper YAML in both export comments and the Copy HA YAML workflow.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC19.1 hotfix line.

---

## v1.0.0 RC19 - Autosave Control & MIPI Custom Hardware
**Release Date:** June 6, 2026

This RC19 release addresses the latest layout-saving and hardware-profile feedback from issues #415 and #416 plus discussion #254, while confirming the native LVGL button import path from issue #409 remains covered.

### Stability & Verification
- **Autosave Preference (Issue #415):** Editor Preferences now includes an **Automatically save layout changes** control. It stays enabled by default for existing behavior, but users can turn it off to prevent background saves while keeping the explicit **Save Layout** button available.
- **MIPI Custom Hardware Editing (Issue #416 / Discussion #254):** Custom hardware profiles now expose MIPI DSI, MIPI SPI/DBI, MIPI RGB, ST7701S, and ST7123 options. Imported MIPI profiles preserve their display platform/model in the edit form, and generated MIPI DSI recipes use display dimensions without SPI-only control-pin output.
- **Issue #409 Regression Check:** Native LVGL button YAML import remains covered for the two-button HA switch case, and export-side entity registration now explicitly verifies one Home Assistant switch definition per imported button entity with no duplicate binary sensor registration.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC19 release line.


---

## v1.0.0 RC18.2 - Sunton Display & Weather Helper Hotfix
**Release Date:** June 4, 2026

This RC18.2 hotfix addresses the Sunton/Guition 2432S028R rendering report from issue #413 and tightens the weather helper YAML discussed in discussion #325.

### Stability & Verification
- **Sunton 2432S028 Landscape Dimensions (Issue #413):** Corrected the Sunton 2432S028 and 2432S028R hardware packages so the ILI9341 `dimensions` match the existing landscape `swap_xy` transform, preventing LVGL output from being initialized with portrait-sized display bounds.
- **Weather Helper Entity IDs (Discussion #325):** Generated Home Assistant weather template helpers now include `default_entity_id` entries that match the ESPHome `sensor.weather_forecast_*` subscriptions, avoiding name-derived entity IDs such as `sensor.weather_forecast_plus_1h` when the unique ID includes `_high`.
- **Regression Coverage Expansion:** Added focused coverage for the Sunton package dimension contract and copied weather helper YAML entity IDs.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for the RC18.2 release line.


---

## v1.0.0 RC18.1 - Undo History Hotfix
**Release Date:** June 3, 2026

This RC18.1 hotfix keeps the undo stack aligned with the loaded layout after the editor reloads.

### Stability & Verification
- **Reload Undo Safety (Issue #412):** Loading a saved layout now replaces the initial startup history baseline, preventing the first undo after reload from restoring the blank default page and dropping loaded pages.
- **Regression Coverage Expansion:** Added focused undo-history coverage for the startup/load/edit/undo sequence that previously exposed the stale blank-page snapshot.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for the RC18.1 release line.


---

## v1.0.0 RC18 - Precision Editing & Hardware Profiles
**Release Date:** June 3, 2026

This RC18 release adds the requested precision-positioning editor improvements and expands bundled display hardware coverage with M5Stack Tab5 and GeekMagic Mini profiles.

### Stability & Verification
- **Precision Widget Nudging (Issue #411):** Selected widgets can now be moved with the arrow keys in 1 px steps, with Shift+Arrow providing a 10 px step for larger adjustments while preserving editable-field arrow navigation.
- **Zoom-Stable Selection Controls (Issue #411):** Resize handles and the multi-selection toolbar now keep a consistent on-screen size when zooming into the canvas, reducing obstruction during detailed placement work.
- **Active Artboard Drag Stability (Issue #411):** The active artboard highlight no longer shifts the artboard upward, so selected widgets keep their visual coordinate plane during precision dragging.
- **M5Stack Tab5 Profile (Issue #397):** Added a bundled ESP32-P4/MIPI DSI hardware recipe for the M5Stack Tab5 using the current M5STACK-TAB5-V2 display model and ST7123 touchscreen platform, with comments for older M5STACK-TAB5/GT911 units.
- **GeekMagic Mini ESP8266 Profile (PR #398):** Added the GeekMagic Mini ESP8266/ST7789V recipe and parser coverage so the profile is available from the bundled hardware list.
- **Regression Coverage Expansion:** Added focused tests for arrow-key nudging, zoom-stable context toolbar scaling, and bundled hardware metadata parsing for both new profiles.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, visible header label, release notes, and rebuilt frontend assets for the RC18 release line.


---

## v1.0.0 RC17 - Minimal YAML Copy & LVGL Import Follow-up
**Release Date:** June 1, 2026

This RC17 release adds a focused copy path for users who want to merge generated display UI into an existing ESPHome file without re-copying the hardware/system scaffold.

### Stability & Verification
- **Minimal UI YAML Copy:** Added a dedicated UI copy action for ESPHome YAML output that removes root hardware/system sections such as `esphome`, board, Wi-Fi, API, OTA, logger, and platform settings while preserving display, LVGL, fonts, sensors, and other UI-related sections.
- **Auto-commented Scaffold Cleanup:** The UI copy action also strips matching auto-commented hardware/system root blocks, so users who already merged the scaffold can copy only the useful layout YAML on later iterations.
- **Issue #409 Follow-up:** Keeps the full YAML copy unchanged while giving issue #409 users a lower-friction way to reuse imported/generated LVGL display content inside their own maintained ESPHome configs.
- **LVGL Switch Sync Export Repair:** Switch, light, fan, and input-boolean backed LVGL button state sync now emits ESPHome `switch:` Home Assistant imports instead of invalid `binary_sensor:` entries for `switch.*` entities.
- **Package Rotation Placement Repair:** Package/custom hardware rotation injection is now scoped to the `display:` block, preventing `rotation:` from being inserted under unrelated platform blocks such as `output.ledc`.
- **Imported LVGL Color Preservation:** Native LVGL button import now normalizes nested checked-state colors alongside base colors, so dark-mode changes do not collapse imported custom button colors back to theme defaults.
- **OpenDisplay Sunrise/Sunset Vertical Alignment (Issue #408):** OpenDisplay sunrise/sunset rows now pair their `lm` middle anchors with middle Y coordinates, matching the editor preview when the widget box is taller than the icon or text.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC17 release line.


---

## v1.0.0 RC16 - OpenDisplay Icon & Astronomy Follow-up
**Release Date:** June 1, 2026

This RC16 release verifies TuTuc0's latest OpenDisplay reports from issues #407 and #408, the follow-up weather condition request in issue #403, and native LVGL import feedback from issue #409.

### Stability & Verification
- **MDI Hex Icon Names (Issue #407):** MDI Icon widgets now resolve manual hex codes against the bundled Material Design Icons font metadata before exporting OpenDisplay/OEPL payloads, so examples such as `F072A` and `F011C` export `washing-machine` and `cellphone` instead of falling back to `information`.
- **Full MDI Icon Browser:** The full icon browser now exposes the complete bundled Pictogrammers Material Design Icons 7.4.47 catalog while keeping the compact property-panel dropdown curated and lazy-loading the larger catalog in its own frontend chunk.
- **Sunrise / Sunset OpenDisplay Alignment (Issue #408):** Sunrise/Sunset OpenDisplay rows now use font-independent left-middle anchors (`lm`) for both icon and text entries, avoiding ascender-baseline differences between the MDI icon font and the text font.
- **Partly Cloudy Night Weather Mapping (Issue #403):** Weather Icon exports now include Home Assistant's `partlycloudy-night` condition and map it to OpenDisplay's `weather-night-partly-cloudy` MDI icon.
- **Native LVGL Button Import (Issue #409):** Importing handwritten LVGL buttons with nested label widgets now restores the label as button text instead of creating extra canvas widgets, recovers Home Assistant service entities from `on_click`, infers checked-state sync from common `state.checked` lambdas, and warns when root hardware/system sections may still be commented in generated YAML.
- **Regression Coverage Expansion:** Added focused tests for custom MDI hex resolution, full-browser MDI filtering, OpenDisplay sunrise/sunset anchors, the new partly-cloudy night weather lookup, and handwritten LVGL button import.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC16 release line.


---

## v1.0.0 RC15 - OpenDisplay Payload Polish
**Release Date:** May 27, 2026

This RC15 release folds in TuTuc0's latest OpenDisplay feedback from issues #401 and #403 through #406, focusing on matching what the editor shows to what OpenDisplay receives.

### Stability & Verification
- **OpenDisplay Top Text Anchors (Issue #401):** Top-aligned text, sensor text, and date/time payloads now use Pillow ascender anchors (`la`, `ma`, `ra`) instead of top bounding-box anchors, which better matches OpenDisplay's rendered baseline while keeping the corrected `x`/`y` anchor coordinates.
- **OpenDisplay Weather Icons Verified (Issue #403):** Rechecked Weather Icon exports and locked the OpenDisplay mapping to MDI names such as `weather-sunny`, `weather-partly-cloudy`, and `weather-cloudy`, while OEPL keeps its shorter aliases.
- **MDI Icon OpenDisplay Anchors (Issue #404):** MDI Icon widgets now export centered `x`/`y` coordinates plus `anchor: mm`, avoiding the OpenDisplay default `la` offset that placed icons away from the editor preview.
- **Date Only Font Size (Issue #405):** Date & Time widgets in Date Only or Weekday Day Month OpenDisplay modes now export `date_font_size`; Time Only and Time & Date continue using `time_font_size`.
- **Sensor Plot Entity Picker (Issue #406):** Sensor Plot now exposes an Entity ID picker in its Data Source section and uses that root entity in OpenDisplay/OEPL plot series export.
- **Regression Coverage Expansion:** Updated focused tests, snapshots, and schema baselines for the OpenDisplay anchor, icon, date/time, weather icon, and Sensor Plot contracts.
- **Release Metadata Refresh:** Updated package metadata, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes, and rebuilt frontend assets for the RC15 release line.


---

## v1.0.0 RC14.1 - OpenDisplay Anchor Follow-up
**Release Date:** May 26, 2026

This RC14.1 follow-up tightens the OpenDisplay anchor compatibility work from RC14 after rechecking the Pillow text-anchor semantics against the OpenDisplay payload contract.

### Stability & Verification
- **OpenDisplay Anchor Semantics:** Confirmed that ESPHome Designer's 9-position alignment model should emit Pillow-compatible visual anchors such as `lt`, `mt`, `mm`, and `rb`, while avoiding baseline-specific anchors such as `ms` for center alignment.
- **Date/Time OpenDisplay Alignment:** Date/time OpenDisplay exports now reuse the shared anchor-position helper, preventing `TOP_CENTER` and related alignments from being interpreted as vertical center positions.
- **Anchor Regression Coverage:** Added focused tests for all 9 designer-to-Pillow anchor mappings and date/time OpenDisplay anchor positioning.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC14.1 release line.


---

## v1.0.0 RC14 - OpenDisplay Icons & C/C++ Export
**Release Date:** May 25, 2026

This RC14 release addresses the new OpenDisplay compatibility reports and adds a raw drawing-code export mode for users who want to reuse ESPHome Designer layouts outside ESPHome projects.

### Stability & Verification
- **OpenDisplay Weather Icon Compatibility (Issue #403):** Weather Icon OpenDisplay exports now use MDI weather icon names such as `weather-sunny`, `weather-partly-cloudy`, and `weather-cloudy`, while preserving the existing OEPL aliases for OEPL exports.
- **OpenDisplay Anchor Normalization (Issue #401):** OpenDisplay payload serialization now normalizes legacy center-first anchors such as `ct`, `cm`, and `cb` into Pillow-style anchors such as `mt`, `mm`, and `mb` before YAML is emitted.
- **OpenDisplay Text Anchor Positioning (Issue #401):** OpenDisplay text and sensor text exports now move the exported `x`/`y` reference point to match the selected Pillow anchor, so `TOP_CENTER` emits `x + width / 2` with `anchor: mt` instead of keeping the top-left coordinate.
- **C/C++ Drawing Mode (Issue #400):** Added a `C/C++ Drawing Code` rendering mode that emits the direct drawing callback body without the ESPHome YAML scaffold, giving non-ESPHome ESP32 projects a practical starting point.
- **Theme-Auto Shape Borders:** Shape borders set to theme auto now stay on the foreground color when the fill is white, so light pages correctly render black borders across canvas, OpenDisplay, LVGL, and C/C++ drawing exports.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC14 release line.


---

## v1.0.0 RC13 - OpenDisplay Anchors & Portrait Rotation
**Release Date:** May 23, 2026

This RC13 release closes the latest OpenDisplay and portrait-orientation regressions reported in [Issue #401](https://github.com/koosoli/ESPHomeDesigner/issues/401) and [Issue #399](https://github.com/koosoli/ESPHomeDesigner/issues/399). OpenDisplay text payloads now use Pillow-compatible anchors, and package-based display templates now receive an explicit display rotation when portrait mode is selected.

### Stability & Verification
- **OpenDisplay Text Anchor Compatibility (Issue #401):** Text, sensor text, and date/time OpenDisplay exports now emit Pillow-style anchors such as `mt`, `mm`, and `mb` instead of unsupported center-first values like `ct`, `cm`, and `cb`.
- **Portrait Rotation for Package Templates (Issue #399):** Package-based hardware snippets now inject a `rotation:` field when the template does not already contain one, fixing portrait export for boards such as the Waveshare ESP32-S3 Touch LCD 4.3.
- **Orientation Round-Trip Repair (Issue #399):** YAML and OpenDisplay imports now infer portrait orientation from display `rotation:` or action `rotate:` values when no generated orientation header is available.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC13 release line.


---

## v1.0.0 RC12.14 - HACS Wrapper Compatibility
**Release Date:** May 12, 2026

This RC12.14 follow-up completes the HACS default submission compatibility fix. The HACS/default PR helper searches for any file matching `*manifest.json`, so the Vite asset map now ships as `vite-assets.json` to avoid being mistaken for a second Home Assistant integration manifest.

### Stability & Verification
- **HACS Default Wrapper Compatibility:** Renamed the Vite dist asset map from `vite-manifest.json` to `vite-assets.json`, avoiding both Hassfest's `manifest.json` scan and HACS/default's broader `*manifest.json` helper.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.14 release line.


---

## v1.0.0 RC12.13 - HACS Submission Compatibility
**Release Date:** May 12, 2026

This RC12.13 release addresses the HACS default review feedback for the ESPHome Designer submission. The shipped frontend bundle no longer contains a nested Vite file named `manifest.json`, which prevented the HACS default Hassfest job from recursively mistaking the frontend build manifest for a Home Assistant integration manifest.

### Stability & Verification
- **HACS Hassfest Compatibility:** Renamed the Vite dist manifest to `vite-manifest.json` and updated the dist freshness metadata tooling so the HACS default Hassfest mount-only validation scans only the real Home Assistant integration manifest.
- **Submission Cleanup:** Removed the duplicate integration-level `hacs.json` and the unused integration-level `icon.png`; HACS reads the root `hacs.json`, and brand assets are served from `home-assistant/brands`.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.13 release line.


---

## v1.0.0 RC12.12 - E1002 Inversion Override Hotfix
**Release Date:** April 28, 2026

This RC12.12 hotfix closes [Issue #394](https://github.com/koosoli/ESPHomeDesigner/issues/394), where the reTerminal E1002 (6-color) could still export inverted black-background YAML even when the user had disabled the **Inverted Colors** device setting. The native generator now treats the layout-level inversion setting as an explicit override instead of always forcing the e-paper/profile default, so regenerated E1002 snippets once again produce the expected white background with black text when inversion is turned off.

### Stability & Verification
- **Explicit Inversion Override (Issue #394):** Native ESPHome display lambda generation now respects an explicit `invertedColors: false` layout setting before falling back to the device profile's e-paper default, preventing unwanted black-background exports on the reTerminal E1002 when users disable inverted colors.
- **Targeted Regression Validation:** Rechecked the native generator behavior against the corrected on-disk source and reran the frontend validation slice plus the full repo validation set (`npm run lint`, `npm test`, `npm run build`, and `npm run python:test`) to confirm the hotfix did not introduce collateral regressions.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, and release notes heading/date for the RC12.12 hotfix line.


---

## v1.0.0 RC12.11 - OpenDisplay Action Compatibility
**Release Date:** April 25, 2026

This RC12.11 follow-up closes [Issue #393](https://github.com/koosoli/ESPHomeDesigner/issues/393), where OpenDisplay exports had fallen behind the current Home Assistant/OpenDisplay service contract. The generated ODP snippet now targets devices the way the upstream integration expects, sends a real structured payload instead of a block-scalar string, and once again preserves the selected target from the settings UI instead of silently dropping it.

### Stability & Verification
- **OpenDisplay drawcustom Contract Alignment (Issue #393):** ODP exports now emit `action: opendisplay.drawcustom` snippets with `target.device_id`, structured `payload` arrays, `dry-run: false`, and the default `refresh_type: "0"`, matching the current OpenDisplay/Home Assistant action schema instead of the older entity-id plus `payload: |-` shape that Home Assistant rejects.
- **ODP Device Selection Persistence Repair (Issue #393):** The OpenDisplay settings field is now explicitly a device-id field end to end, and the shipped modal input IDs once again match the protocol-settings controller, so the selected ODP target actually persists instead of falling back to the placeholder on export.
- **Import/Compatibility Hardening:** OpenDisplay snippet import now accepts both `action:` and legacy `service:` wrappers plus structured `payload:` arrays, while older saved settings keep loading safely when their legacy ODP identifier already looks like a device ID.
- **Regression Coverage Expansion:** Added focused frontend regressions for the new ODP action payload shape, legacy ODP setting compatibility, action-style snippet parsing, and the repaired device-id settings flow.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.11 release line.


---

## v1.0.0 RC12.10 - Round-Trip Repair & Calendar Control
**Release Date:** April 24, 2026

This RC12.10 follow-up rolls together the latest user-reported round-trip bugs and the lowest-risk quality-of-life requests from recent PRs/discussions. OpenDisplay text widgets now round-trip cleanly through export/import with centered anchors and explicit widths intact, snippet regeneration no longer duplicates generated headers when async refreshes race, custom hardware now understands ESP32-P4, and calendar widgets finally gain configurable source prefixes plus optional grouped day labels. The release also adds a one-click HACS badge and documents the existing YAML-import/debug-grid workflow more clearly for users who were missing those entry points.

### Stability & Verification
- **OpenDisplay Width/Alignment Round-Trip (Issue #390, PR #391):** OpenDisplay `text` and `sensor_text` exports now use the correct centered anchor mapping, keep `max_width` instead of forcing unwanted multiline conversion when a width is explicit, and restore both alignment and width when the payload is imported back into the canvas.
- **Snippet Regeneration Hardening (Issue #392):** Snippet merging now strips repeated generated preambles instead of only the first copy, and stale async snippet generations are ignored once a newer refresh has been requested, preventing duplicate YAML headers and old widget output from overwriting current output.
- **ESP32-P4 Custom Hardware Support (PR #378):** Added `ESP32-P4` to the custom hardware chip picker, mapped it onto the right pin datalist, taught hardware import/profile parsing to recognize P4 boards, and generated the expected `board`, `variant`, framework, and PSRAM guidance for exported YAML.
- **Calendar Prefix & Grouping Controls (Discussion #375):** Calendar widgets now expose configurable prefix length and separator settings for the Home Assistant helper flow, the downloaded helper script accepts those parameters while preserving legacy fallback behavior for older setups, and direct/preview event rows can optionally group repeated day numbers for cleaner multi-event lists.
- **Install/Discoverability Docs (PR #389, Discussion #387):** Added the Home Assistant "Open in HACS" badge to the README and documented that YAML can already be imported back into the canvas while the existing **Debug Grid** toggle can be used for coordinate overlays during layout work.
- **Regression Coverage Expansion:** Added focused frontend regressions for OpenDisplay centered-width imports/exports, snippet preamble self-healing and stale-generation races, ESP32-P4 hardware generation/import/UI flows, calendar helper/config rendering, grouped day display, and refreshed calendar export snapshots.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, runtime version string, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.10 release line.


---

## v1.0.0 RC12.9 - Group Reordering Guardrails
**Release Date:** April 21, 2026

This RC12.9 follow-up closes the hierarchy regression reported in [Issue #384](https://github.com/koosoli/ESPHomeDesigner/issues/384). After the earlier persistence fix restored grouped-widget `parentId` data, users found that dragging groups in the hierarchy could still nest one group inside another by accident, and stale nested groups were then awkward to select or pull back out. RC12.9 keeps groups top-level during hierarchy drag/drop, lets older broken layouts recover cleanly, and makes the existing multi-select drag workflow easier to discover from the UI.

### Stability & Verification
- **Top-Level Group Reordering (Issue #384):** Dragging groups in the hierarchy now reorders them without assigning a new `parentId`, so groups no longer get nested accidentally when dropped on other groups or grouped children.
- **Stale Nested Group Recovery (Issue #384):** Hierarchy traversal, hierarchy ordering sync, and canvas selection now treat groups as top-level containers even if older saved data still carries a stale `parentId`, making those layouts recoverable instead of trapping the nested group under its parent.
- **Multi-Select Drag Discoverability:** The hierarchy controls now include a selection tip for `Shift`/`Ctrl` multi-select and box selection, clarifying that multiple widgets can already be moved together by dragging any selected widget on the canvas.
- **Regression Coverage Expansion:** Added focused frontend regressions for top-level-only group traversal, stale nested group recovery through the hierarchy, protected selection behavior for groups with stale `parentId` data, and the new grouping hint copy.


---

## v1.0.0 RC12.8 - LVGL Trigger Routing & Package Merge Hardening
**Release Date:** April 20, 2026

This RC12.8 follow-up is a targeted hardening release for [Issue #385](https://github.com/koosoli/ESPHomeDesigner/issues/385). Real-world feedback on the first YAML round-trip implementation exposed a deeper exporter bug: custom widget state triggers for lights could be merged into LVGL brightness sensor blocks as a second `on_value`, producing invalid ESPHome YAML, and package-based outputs could still end up with repeated mergeable sections in certain regenerated layouts. RC12.8 fixes both paths and adds regression coverage around the exact slider-plus-icon failure pattern reported from the field.

### Stability & Verification
- **Mode-Aware Custom Trigger Routing (Issue #385):** Widget-level custom triggers now keep their resolved `on_state` versus `on_value` mode when queued for export, so binary-domain entities such as `light.*` no longer get misrouted into numeric sensor sections just because the same `entity_id` appears there.
- **Single-Block Trigger Merging (Issue #385):** Sensor export now merges all matching trigger actions for one YAML item into a single trigger block, preventing duplicate `on_value:` keys when a light-backed LVGL slider and a custom widget trigger both reference the same Home Assistant light.
- **Repeated Section Coalescing (Issue #385):** YAML section merging now coalesces repeated `sensor:` and `text_sensor:` blocks that reappear later in package-based output, reducing the chance of regenerated package snippets carrying duplicate mergeable sections after `lvgl:`.
- **Regression Coverage Expansion:** Added focused frontend regressions for the light-slider/custom-trigger collision, mixed trigger-source single-item merging, and repeated mergeable-section coalescing in package-style YAML merges.


---

## v1.0.0 RC12.7 - Persistence & LVGL YAML Round-Trip Fixes
**Release Date:** April 19, 2026

This RC12.7 follow-up extends the earlier storage fix from [Issue #382](https://github.com/koosoli/ESPHomeDesigner/issues/382) with two more persistence-focused corrections: restoring grouped-widget parent references from [Issue #384](https://github.com/koosoli/ESPHomeDesigner/issues/384) and adding a supported LVGL custom state-trigger path for the YAML round-trip gap reported in [Issue #385](https://github.com/koosoli/ESPHomeDesigner/issues/385). The result is a safer save/load path for grouped layouts and a more honest, more durable workflow for custom LVGL automations.

### Stability & Verification
- **Sensor Text Secondary Entity Persistence (Issue #382):** Sensor Text widgets continue to preserve `entity_id_2` through backend save/load, so the secondary Home Assistant entity survives alongside `attribute2` instead of dropping on reload.
- **Grouped Widget Parent Persistence (Issue #384):** The backend widget model now stores and reloads `parentId`, so children remain attached to their group containers after layouts are saved and loaded again.
- **Supported LVGL State Trigger Round-Trip (Issue #385):** LVGL layouts now have a first-class widget-level state-trigger path that stores the trigger entity, trigger mode, and raw `then:` action YAML in widget `props`, then injects those actions back into generated `sensor`, `text_sensor`, or `binary_sensor` sections during export.
- **Import Recovery & Honesty Warnings (Issue #385):** YAML imports now recover the supported marked state-trigger blocks back into widget props when possible, and show a warning when unsupported custom automations remain raw YAML only instead of pretending they are fully editable on the canvas.
- **Regression Coverage Expansion:** Added backend model/storage regressions for grouped-widget parent persistence plus frontend tests that cover the new LVGL state-trigger editor controls, trigger registration/export injection, import recovery, and warning flow.


---

## v1.0.0 RC12.6 - Cookbook-Aligned Light Slider Actions
**Release Date:** April 17, 2026

This RC12.6 follow-up carries the next real-device correction for [Issue #371](https://github.com/koosoli/ESPHomeDesigner/issues/371). After the RC12.5 release restored raw `brightness` tracking and fixed the mixed-type lambda build failure, additional user testing showed that newer ESPHome/Home Assistant combinations behave more reliably when generated LVGL light sliders follow the current cookbook pattern for action dispatch. RC12.6 moves that behavior onto its own release line, refreshes the visible release metadata, and rebuilds the shipped frontend assets for a clean follow-up cut.

### Stability & Verification
- **Cookbook-Aligned Light Slider Actions (Issue #371):** Light-backed LVGL sliders now export `homeassistant.action` with raw `brightness` values and trigger the HA call on `on_release`, matching the current ESPHome LVGL light-brightness cookbook pattern and avoiding the silent no-op behavior reported with the older `homeassistant.service` path on newer Home Assistant installs.
- **Regression Coverage Expansion:** Updated the LVGL slider regression tests to lock the `homeassistant.action` payload shape, the raw integer `brightness` lambda output, and the `on_release` event path for light-backed sliders without changing the existing non-light slider service flow.
- **Release Metadata Refresh:** Updated the package version, package lock metadata, Home Assistant manifest version, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.6 release line.


---

## v1.0.0 RC12.5 - Light Brightness Attribute Compatibility
**Release Date:** April 16, 2026

This RC12.5 follow-up is a narrow post-release correction for [Issue #371](https://github.com/koosoli/ESPHomeDesigner/issues/371). Real-device feedback after the RC12.4 release showed that some Home Assistant lights publish live state through the raw `brightness` attribute instead of `brightness_pct`, and that the generated light-slider lambdas could still fail ESPHome compilation because different branches returned mixed numeric types. RC12.5 fixes both issues, refreshes the visible release metadata, and rebuilds the shipped frontend assets for a clean follow-up cut.

### Stability & Verification
- **Home Assistant Light Attribute Compatibility (Issue #371):** Light-backed LVGL sliders now subscribe to the HA `brightness` attribute for initial state and live updates, which matches the state model shown in Home Assistant Developer Tools for integrations that only expose raw `0..255` brightness values.
- **Compile-Safe Light Slider Lambdas (Issue #371):** Generated light-slider `value`, `lvgl.slider.update`, and `light.turn_on` brightness lambdas now keep a consistent float return type across every branch, eliminating the ESPHome C++ `inconsistent types 'float' and 'int' deduced for lambda return type` build error seen on generated YAML.
- **Regression Coverage Expansion:** Updated the LVGL slider regression tests to lock the raw `brightness` attribute path, the `0..255` scaling behavior, and the new compile-safe lambda output for both default and scaled slider ranges.
- **Release Metadata Refresh:** Updated the npm package version, package lock metadata, Home Assistant manifest version, visible header label, release notes heading/date, and rebuilt frontend assets for the RC12.5 release line.


---

## v1.0.0 RC12.4 - OpenAI GPT-5 Compatibility & Guition 3.5 Support
**Release Date:** April 15, 2026

This RC12.4 follow-up rolls in four concrete post-RC12.3 fixes: restoring OpenAI GPT-5 prompt generation after the token-parameter change reported in [Issue #379](https://github.com/koosoli/ESPHomeDesigner/issues/379), promoting the Guition 3.5" `JC4832W535` board discussed in [Issue #340](https://github.com/koosoli/ESPHomeDesigner/issues/340) to a cleaner built-in package/profile path, finishing the Home Assistant light state-tracking follow-up from [Issue #371](https://github.com/koosoli/ESPHomeDesigner/issues/371), and taking one more small cleanup pass on the generated deep-sleep control flow from [Issue #356](https://github.com/koosoli/ESPHomeDesigner/issues/356). It also synchronizes the visible release metadata and rebuilds the shipped frontend assets for today's RC12.4 cut.

### Stability & Verification
- **OpenAI GPT-5 Request Compatibility (Issue #379):** The OpenAI chat-completions path now sends `max_completion_tokens` for `gpt-5*` models while preserving `max_tokens` for older models, so GPT-5 layout generation works again without regressing the existing GPT-4/OpenAI flow.
- **Guition JC4832W535 v3 Package Alignment (Issue #340):** The bundled 3.5" Guition hardware package now targets the documented `JC4832W535` QSPI display model, includes the linked AXS15231 touchscreen configuration, and captures the working calibration/transform/rotation values needed for the board's v3 pinout.
- **Stable Device ID with Legacy Alias:** Added a supported built-in `guition_esp32_jc4832w535` device profile for new layouts while keeping the older misnamed internal id as a hidden compatibility alias so previously saved layouts continue to resolve the same hardware package.
- **LVGL Light State Tracking Completion (Issue #371):** Light-backed LVGL sliders now push explicit `lvgl.slider.update` actions from the Home Assistant `brightness_pct` attribute, synced LVGL buttons/switches/checkboxes now update their checked state from HA with `trigger_on_initial_state: true`, and scaled slider ranges such as `0..255` now map cleanly to `brightness_pct` in both directions so the widgets track HA, each other, and boot-time state correctly.
- **Deep-Sleep Guard Consolidation (Issue #356):** The generated `deep_sleep_cycle` script now performs the firmware-flash delay and stay-awake retry handling once at the top of the script before branching into the overnight `until:` or normal deep-sleep entry path, which keeps the RC12.3 behavior fix while removing duplicated guard blocks from the generated YAML.
- **Regression Coverage Expansion:** Added focused tests for the GPT-5/OpenAI request payload branch and for surfacing the corrected Guition board id without exposing the legacy alias as a new supported device choice.




---

## v1.0.0 RC12.3 - Deep Sleep Follow-Through
**Release Date:** April 12, 2026

This RC12.3 follow-up takes another pass at the remaining deep-sleep behavior from [Issue #356](https://github.com/koosoli/ESPHomeDesigner/issues/356). RC12.2 was too optimistic here: the overnight `until:` branch still dropped out when users chose `Ultra Eco (Deep Sleep)` and relied on the shared sleep-hours controls. This release fixes that mismatch, trims the misleading deep-sleep refresh bookkeeping in the generated script, and rebuilds the shipped assets for a clean RC12.3 cut.

### Stability & Verification
- **Deep-Sleep Overnight Window Fix (Issue #356)**: Generated `deep_sleep_cycle` now uses the configured shared sleep window in Deep Sleep mode as well as Light Sleep mode, so users who set overnight hours and export `Ultra Eco (Deep Sleep)` once again get the `deep_sleep.enter` `until:` / `time_id: ha_time` branch at night.
- **Deep-Sleep Script Cleanup (Issue #356)**: `manage_run_and_sleep` no longer emits the unused `interval` and `is_sleep_time` bookkeeping in the epaper deep-sleep path, which makes the generated YAML match the real execution flow more closely.
- **Regression Coverage Expansion**: Added focused generator tests for the Deep Sleep plus sleep-hours path and for omitting the unused refresh bookkeeping from the deep-sleep loop.




---

## v1.0.0 RC12.2 - Widget State Accuracy & Release Polish
**Release Date:** April 11, 2026

This RC12.2 follow-up rolls the remaining [Issue #356](https://github.com/koosoli/ESPHomeDesigner/issues/356) polish into a fresh release cut, with a focus on making astronomy and weather widgets fail safely when Home Assistant data is missing or timezone-shifted, while keeping the RC12.x stability fixes and release metadata aligned for deployment.

### Stability & Verification
- **Local-Time Sunrise/Sunset Rendering (Issue #356)**: `sun_times` widgets now convert Home Assistant ISO timestamps into local runtime time before formatting them, so `sensor.sun_next_rising` and `sensor.sun_next_setting` no longer show UTC hours as if they were already local.
- **Explicit Unknown Weather Fallbacks (Issue #356)**: Weather icon and forecast widgets now fall back to a visible unknown icon and `--` text when no valid condition or value is available, instead of implying a real `sunny` or `cloudy` state.
- **Unknown-State Moon Phase Fallback (Issue #356)**: Moon-phase widgets now show an unknown-state icon when the selected entity is missing, invalid, or not a moon-phase source, rather than rendering a misleading real lunar phase.
- **Deep-Sleep Flow Revalidation (Issue #356)**: Rechecked the reported `is_sleep_time`, `interval`, and long-sleep-until-end-hour concerns against the generator output and locked that behavior in with regression coverage; no additional generator change was required because the long-sleep branch was already present.
- **Regression Coverage Expansion**: Added focused tests for astronomy widget local-time handling, weather unknown-state exports/rendering, moon-phase invalid-entity behavior, and the existing deep-sleep overnight branch so the RC12.2 fixes stay pinned.
- **Release Metadata Refresh**: Updated the package version, Home Assistant manifest version, visible header label, release notes heading, and rebuilt frontend assets for the RC12.2 release line.



---

## v1.0.0 RC12.1 - OTA Rollback Diagnostics & LVGL Light Sync
**Release Date:** April 10, 2026

This RC12.1 follow-up tightens the LVGL light-control fix from [Issue #371](https://github.com/koosoli/ESPHomeDesigner/issues/371), adds generated diagnostics that make OTA rollback mismatches much easier to spot in reports like [Issue #372](https://github.com/koosoli/ESPHomeDesigner/issues/372), and folds in two additional YAML-generation fixes from [Issue #376](https://github.com/koosoli/ESPHomeDesigner/issues/376) and [Issue #377](https://github.com/koosoli/ESPHomeDesigner/issues/377).

### Stability & Verification
- **LVGL Light Slider/Button Separation (Issue #371)**: Light-backed LVGL sliders now refresh only from their generated `brightness_pct` Home Assistant sensor instead of also listening to the light's binary on/off updates. This prevents a synced button toggle from forcing the slider back through stale `0/1` brightness values and resolves the button/slider feedback loop seen in the attached `kitchen-display-ui.yaml`.
- **Generated Layout Signatures for OTA Debugging (Issue #372)**: Generated YAML now includes a stable layout signature and summary in the header, and the startup script logs the same signature once per boot. If a user's device log shows a different signature than the YAML they attached, it is now immediately obvious that the device is running an older image or has rolled back after OTA.
- **Rollback Triage Hint in Boot Logs**: The one-time startup diagnostics now include an explicit rollback hint so issue reports can distinguish "widget did not update" from "the new firmware never stayed booted."
- **LVGL Sensor Text Refresh Hooks (Issue #377)**: LVGL-backed `sensor_text` widgets now register their generated `text_sensor` IDs for `on_value` refresh wiring, including weather/text attribute variants, so live labels update when Home Assistant pushes new text values.
- **Generated YAML Header Deduplication (Issue #376)**: Repeated snippet save/update cycles no longer prepend multiple copies of the generated ESPHome header when reconciling manual YAML overrides, so the raw YAML editor stays stable across round trips.
- **Issue #356 Audit Confirmation**: Rechecked the three items listed in [Issue #356](https://github.com/koosoli/ESPHomeDesigner/issues/356) against current generator code and regression tests; the scheduled page auto-switch guard, deep-sleep interval handling, and long-sleep-until-end-hour behavior are all already covered in RC12.1.
- **Issue #356 Follow-Up Widget Fixes**: Sunrise and sunset widgets now convert ISO datetime values into local device/browser time instead of showing the raw UTC hour, weather widgets now fall back to an explicit unknown icon or `--` temperatures when no condition/value is available, and moon-phase widgets now show an unknown-state icon instead of implying a real lunar phase when the entity is missing or invalid.
- **Home Assistant Panel Console Noise Mitigation**: The embedded panel shell now suppresses additional benign Home Assistant transition abort variants and wrapped host-error shapes, which reduces `Transition was skipped` / `invalid state` unhandled rejection noise in the browser console without masking real editor failures.
- **Regression Coverage**: Added focused generator coverage for the new header/log diagnostics, updated the LVGL slider regression coverage so light refresh hooks stay bound to the brightness attribute sensor, and hardened the panel/runtime rejection-filter tests for Home Assistant transition-abort noise.
- **Release Metadata Refresh**: Updated the package metadata, Home Assistant manifest version, runtime GUI version label, release notes heading, and rebuilt frontend assets for the RC12.1 release line.



---

## v1.0.0 RC12 - LVGL Follow-Up & Release Sync
**Release Date:** April 7, 2026

This release is a focused RC12 follow-up that closes the remaining RC11 regressions reported after the RC11 rollout, especially around LVGL live updates and light-slider behavior, and synchronizes the shipped release metadata for the new build.

### Stability & Verification
- **LVGL Light Slider Fix (Issue #371)**: `light.*` entities now use a dedicated Home Assistant brightness sensor for the slider value instead of mirroring binary on/off state, so toggling a light no longer forces the slider back through `1%`, and moving the slider now behaves like a native dimmer by turning the light off at `0` and calling `light.turn_on` with `brightness_pct` otherwise.
- **LVGL Date & Time Refresh Fix (Issue #372)**: Date & Time widgets in LVGL mode now emit an explicit timed refresh loop so their `ha_time`-backed labels update on real devices instead of staying frozen after the initial render. Styled datetime widgets now refresh the actual child label that owns the live lambda instead of the wrapper container.
- **LVGL On-Board Sensor Bar Refresh Fix (Issue #372)**: The LVGL sensor bar now refreshes its live child labels and battery icon/text directly, covers local on-device values as well as Home Assistant-backed sensors, and uses the configured Wi-Fi source consistently in LVGL output instead of always hard-wiring `wifi_signal_dbm`.
- **Interval Section Merge Safety**: Widget-owned `interval:` exports now merge cleanly when multiple features contribute timed updates, preventing duplicate top-level interval sections in generated YAML.
- **Regression Coverage for Issues #371 and #372**: Added focused Vitest coverage for the LVGL light slider path, datetime refresh wiring, sensor-bar child refresh targets, and interval-section coexistence so the RC12 fixes stay locked in.
- **Release Metadata Refresh**: Updated the package metadata, Home Assistant manifest version, runtime GUI version string, visible header label, and release notes heading for the RC12 release.



---

## v1.0.0 RC11 - Shape Cleanup, New Widgets & Verification
**Release Date:** April 6, 2026

This release continues the shape-model cleanup so fills, borders, and lines behave more consistently across the editor and generated output, adds the new astronomy and energy widgets discussed in GitHub [Issue #367](https://github.com/koosoli/ESPHomeDesigner/issues/367), [Issue #368](https://github.com/koosoli/ESPHomeDesigner/issues/368), and https://github.com/koosoli/ESPHomeDesigner/discussions/219#discussioncomment-16442603 and rolls in the supporting stability and verification work for the RC11 line.

### Release Highlights
- **Canonical Shape Color Model**: Rectangle, circle, and rounded rectangle widgets now use explicit `bg_color` and `border_color` as their primary shape colors, while legacy `color` values are still accepted as compatibility fallbacks for existing layouts and imports.
- **Unified Shape Controls**: Rectangle, circle, and rounded rectangle widgets now share the same visible shape-editing model: `Fill`, `Fill Color`, `Border Thickness`, and `Border Color`, plus shape-specific geometry such as `Corner Radius`.
- **Smarter Shape Border Defaults**: When a fillable shape is filled and the border color has not been explicitly chosen, the border now defaults to the same color as the fill until the user overrides it.
- **Unified Default Border & Line Widths**: Rectangle, circle, rounded rectangle, and line widgets now default to a consistent visible border or stroke weight in new layouts, while legacy imports continue to normalize toward the shared shape model.
- **Astronomy Widget Category**: Added a dedicated `Astronomy` section in the widget palette for the new `moon_phase` and `sun_times` widgets, while keeping the existing weather icon in its current core location.
- **Moon Phase Widget (Issue #367)**: Added a dedicated `moon_phase` widget with Home Assistant moon-state icon mapping across editor preview, direct ESPHome export, LVGL export, OEPL export, and OpenDisplay export.
- **Sun Times Widget (Issue #368)**: Added a dedicated `sun_times` widget with independent `Show Sunrise` and `Show Sunset` toggles, native Home Assistant defaults for `sensor.sun_next_rising` / `sensor.sun_next_setting`, and support for `sun.sun` attributes like `next_rising` and `next_setting`.
- **Energy Flow Widget**: Added a new `energy_widget` / `Energy Flow` widget for `direct` and `lvgl` projects with a fixed solar, home, grid, battery, and optional gas topology, sign-aware import/export and charge/discharge arrows, and visible bordered node boxes for the core energy slots. 
- **Advanced Solar Breakdown**: The new energy widget supports optional helper entities for `Solar -> Home`, `Solar -> Grid`, `Solar -> Battery`, and `Autoconsumption %`, while still deriving safe fallbacks for grid export and self-consumption when only the base net sensors are available.

### Stability & Verification
- **Home Assistant Local Image Preview Fix (Issue #366)**: Fixed an HA-specific regression where local image previews could trigger authentication failures after the backend hardening pass. Image previews now load through the authenticated request path again, while common public image locations such as `/local/...` and `/config/www/...` continue to work without reopening arbitrary `/config` file reads.
- **ESPHome Image Transparency & LVGL Background YAML Fix (Issue #369)**: Color image components now emit ESPHome's current `transparency` option instead of the deprecated `use_transparency` flag, honoring the widget's configured transparency mode, and transparent LVGL template bars no longer generate invalid `bg_color: transp` output.
- **M5Paper GT911 ESPHome Compatibility Fix (Issue #370)**: The M5Paper preset no longer exports `GPIO36` as a GT911 `interrupt_pin` on classic ESP32 builds where that pin is input-only and rejected by current ESPHome releases. Affected exports now fall back to polling with `update_interval: 50ms`, restoring successful YAML compilation on ESPHome 2026.3.2 and newer.
- **Scheduled Page Switching & Calendar Width Fixes (Issue #356)**: Scheduled page visibility changes no longer self-trigger the page-switch debounce before `change_page_to` runs, restoring automatic switching between time-windowed pages, and calendar event summaries now expand their on-device text width with wider calendar widgets instead of staying hard-capped at 25 characters.
- **Drop Shadow Fill & Group Border Editing Cleanup**: Adding a drop shadow now preserves existing opaque fills, forces transparent widget infills to white so the shadow remains visible, and grouped shadow selections can edit shared border width, border color, and corner settings without pushing those properties onto the invisible group wrapper.
- **Backward-Compatible Imports**: YAML, C++ drawing, and OEPL parser paths continue to accept older shape definitions while normalizing imported shapes toward the new `bg_color` / `border_color` model.
- **Regression Coverage for Shape Cleanup**: Updated focused tests and snapshots for the shared fillable-shape helpers, shape widgets, line defaults, parser round-trips, and widget-manager shadow behavior.
- **Regression Coverage for Issue #356**: Added focused generator and calendar export tests so scheduled visibility auto-switching and width-scaled calendar summaries stay locked in.
- **Regression Coverage for Issue #369**: Added focused test coverage for modern image component export plus transparent LVGL template-bar export so the invalid YAML patterns stay fixed.
- **Regression Coverage for Issue #370**: Added targeted touchscreen generator coverage so classic ESP32 GT911 profiles with input-only pins keep using the polling fallback instead of emitting invalid output-mode interrupt pins.
- **Astronomy Widget Coverage**: Added targeted tests for the new moon phase and sun times widgets so preview behavior and export wiring stay locked in.
- **Energy Widget Coverage & Round-Trip Support**: Added direct-export, LVGL-export, preview, parser, and round-trip coverage for the new energy widget so its helper entities and derived flow labels stay stable across YAML import/export and frontend builds.
- **Release Metadata Refresh**: Updated the package metadata, Home Assistant manifest version, runtime GUI version string, and visible header label for the RC11 release.



---

## v1.0.0 RC10.1 - Visibility Hotfix & Release Sync
**Release Date:** April 2, 2026

This release is a focused RC10.1 follow-up for the work completed in this session. It fixes a direct-render conditional visibility regression where binary Home Assistant entities such as `input_boolean` could generate invalid `std::string(...)` comparisons and fail ESPHome compilation, and it synchronizes the shipped version metadata and frontend bundle for the RC10.1 package.

### Stability & Verification
- **Conditional Visibility Compilation Fix (Issue #363)**: Direct-render widget visibility checks now treat binary Home Assistant domains such as `input_boolean` as boolean IDs instead of forcing them through string conversion, while text-style entities like `input_select` still use the generated `_txt` sensors for string comparison.
- **Regression Coverage**: Added targeted Vitest coverage for the visibility-condition binary/text branching so the broken `std::string(id(input_boolean...).state)` pattern does not return.
- **Release Metadata Sync**: Updated the package version, Home Assistant manifest version, GUI header label, runtime GUI version string, release notes heading, and committed frontend `dist` bundle so the shipped RC10.1 package stays internally consistent.



---

## v1.0.0 RC10 - Release Prep, Persistence Fixes & Verification
**Release Date:** March 31, 2026

This release rolls the project forward to the RC10 line, includes the remaining persistence and deep-sleep fixes that were still open from GitHub [Issue #356](https://github.com/koosoli/ESPHomeDesigner/issues/356), keeps the raw YAML editor override persistent across save/load, and refreshes the shipped release metadata so package/release automation stays aligned.

### Release Highlights
- **Persistent Manual YAML Override**: YAML edits made directly in the snippet editor now persist with the saved layout as a separate raw override instead of being silently lost on save/load.
- **Page Metadata Persistence**: Per-page schedule and visibility metadata such as `refresh_type`, `refresh_time`, `visible_from`, `visible_to`, and `layout` now survive backend storage round-trips correctly.
- **Deep Sleep Script Cleanup**: The generated deep-sleep flow now uses a single stay-awake guard around `deep_sleep.enter`, avoiding redundant logic while keeping retry behavior intact.
- **Persistent 12-Hour Datetime Mode ([Discussion #359](https://github.com/koosoli/ESPHomeDesigner/discussions/359))**: The datetime widget now exposes a dedicated `Clock Mode` setting with `24 Hour` and `12 Hour (AM/PM)` options. Preview rendering plus OpenDisplay, OEPL, and LVGL exports all honor that saved setting, so users no longer need to manually reapply `%I:%M %p` after each edit or export.
- **Graph Duration Presets**: Graph widgets now include a `Duration Preset` selector with common ranges like minutes, hours, days, and weeks, while still keeping the free-form duration field available for custom lookback windows.
- **Week-Aware Graph History Parsing**: Shared graph duration parsing now supports week-based and decimal durations across canvas preview, direct export, LVGL export hooks, history helper generation, Home Assistant history fetching, grid inference, and smart axis labels. This means values like `1w` and `2w` work consistently without requiring users to translate everything into raw hours.
- **Optional HA State Sync for LVGL Buttons ([Discussion #347](https://github.com/koosoli/ESPHomeDesigner/discussions/347))**: `lvgl_button` now has an explicit `Sync Checked State from HA` option for mirrorable binary entities such as `switch`, `light`, `fan`, and `input_boolean`. When enabled, the button becomes checkable, binds its checked state to the Home Assistant entity, and refreshes automatically when HA state changes, while the existing click action behavior remains intact.
- **Compilation Regression Coverage**: The RC8.3 `is_sleep_time` scoping problem reported in [Issue #339](https://github.com/koosoli/ESPHomeDesigner/issues/339) remains covered by a dedicated generator regression so the broken `return !is_sleep_time;` pattern does not reappear in generated output.
- **Localized Weather Forecast Day Labels**: The weather forecast widget now exposes an explicit day-language selector so editor previews and generated firmware/LVGL output stay aligned instead of mixing localized preview labels with English device labels, covering the reports in [Issue #231](https://github.com/koosoli/ESPHomeDesigner/issues/231) and [Issue #348](https://github.com/koosoli/ESPHomeDesigner/issues/348).
- **Graph History Helper Package**: Advanced graph history mode now includes built-in `Copy HA YAML` and `Download YAML` actions that generate a starter Home Assistant helper package backed by `sql.query`. This makes the previously undocumented template/helper setup far easier to adopt for recorder-backed history graphs.
- **Graph & Sensor Bar Typography Completion (Issue #361)**: The `graph` and `template_sensor_bar` widgets now expose `font_family`, `font_weight`, and `font_size` consistently, and those settings are honored across browser preview, direct ESPHome export, and LVGL export.
- **Single-Page Navigation YAML Fix (Issue #362)**: Single-page projects no longer emit `change_page_to` scripts or dangling debounce references to `last_page_switch_time`, and LVGL nav bars now suppress prev/next actions when paging is unavailable.
- **Issue #356 Follow-Up Fixes**: Direct-render `shape_rect` widgets now scope their rounded-corner helper lambdas per widget so repeated rounded rectangles no longer collide at compile time, the datetime canvas preview now matches device behavior by leaving narrow text visible instead of clipping it, generated startup scripts now include a one-time 5-second post-sync grace period before the first render so Home Assistant-backed sensors have time to populate, and touch-debounce globals are only emitted for layouts that actually use touch widgets.

### Stability & Verification
- **Export Shape Stability**: The new LVGL button sync path only adds `checkable` and `state` output when the feature is enabled, so existing button exports stay unchanged by default.
- **CI Lint Hardening**: Nested workspace `tmp` directories are now ignored consistently by ESLint, preventing generated preview/build artifacts from showing up as false-positive source lint failures during release and pre-push validation.



---

## v1.0.0 RC9.1 - Release Metadata & Deployment Follow-Up
**Release Date:** March 29, 2026

This follow-up release finishes the RC9 packaging and deployment work so Home Assistant, GitHub Releases, and the GitHub Pages editor all point at the same current build.


### Maintenance

- Removed stale debug-overlay test residue from the sidebar suite and kept coverage aligned with the quality gate.
- Rebuilt the committed frontend bundle so the packaged Home Assistant panel assets and GitHub Pages deployment stay on the same RC9.1 output.

---

## v1.0.0 RC9 - Home Assistant Reliability, Security Hardening & Quality Overhaul
**Release Date:** March 28, 2026

The main goals of this version are simple: make the editor behave more reliably inside Home Assistant, make saved layouts and custom hardware profiles load correctly, harden the backend surface, and continue the broader cleanup of the codebase.

### New Features & Enhancements

- **Universal MQTT Integration (Issue #352)**: You can now use `mqtt:your/topic/path` directly in the main Entity field instead of managing a separate MQTT-only input. This makes MQTT widgets easier to set up, easier to understand, and more consistent across the editor.
- **Edit Custom Hardware Profiles (Issue #353)**: Imported custom hardware profiles can now be loaded back into the Custom Hardware form, edited, and saved again without starting from scratch.

### Bug Fixes & Stability

- **Home Assistant Embedded Editor Reliability**: The editor now behaves much more reliably when opened inside Home Assistant. Layouts, entities, saved designs, and hardware templates load more consistently, and the panel boot flow was cleaned up after several HA-specific auth and routing failures.
- **Custom Hardware Profile Loading**: Layouts that reference saved custom hardware profiles now load correctly in Home Assistant. Custom hardware YAML packages are fetched through an authenticated backend route instead of relying on fragile direct static file access.
- **Graph History Preview Reliability**: Graph previews in the editor now use Home Assistant's native history API in embedded mode. This makes layouts with history widgets much less likely to fail because of a custom proxy path.
- **LCD Navigation Debounce Follow-Up (Issue #349)**: Navigation timing was aligned more carefully for touch LCD devices, reducing bounce-back and accidental double-navigation on slower panels such as the Waveshare 7" ESP32-S3.
- **Deep Sleep Stay-Awake YAML Fix (Issue #354)**: Fixed a YAML generation issue that could produce invalid ESPHome output when Deep Sleep and Stay Awake were enabled together on e-paper devices.
- **Missing `change_page_to` Script (Issue #351)**: Fixed a compilation problem where some single-page designs could still reference the page-change script even though that script was only being generated for multi-page layouts.
- **Image Plugin Crash**: Fixed an LVGL image handling problem that could break designs using custom images.
- **Hardware Touch Debounce**: Improved touch debounce handling across interactive widgets to reduce accidental double taps.
- **Log Spam on Display Restart**: Reduced repeated "Waiting for sync..." logging when a display was restarting but already had an active connection.
- **Battery Sensor Reliability**: Improved battery widget handling for imported hardware and Home Assistant battery entities.
- **Image Rendering Optimization**: Color image exports now use a faster rendering path that is more stable on high-resolution RGB displays.
- **Canvas Opacity Preview**: Opacity changes now update correctly on the live design canvas again.
- **Icon Theme-Aware Background Export (Issue #357)**: Direct-render icon widgets now keep `bg_color: theme_auto` and related dynamic color combinations readable on inverted e-paper displays instead of exporting the glyph and filled background with the same effective color.
- **Roboto 600 Weight Support (Issue #358)**: Roboto now accepts and preserves weight `600` across the weight picker, direct export font registry, and browser preview imports.
- **Calendar Helper Script Improvements (Issue #355)**: The shipped Home Assistant helper now respects the widget's `Max Events` value, avoids mutating original calendar events, treats carry-over multi-day events as all-day on the current date, strips unused location parsing, and prefixes summaries when multiple calendars are merged so the event list stays understandable on-device.

Many thanks to **Richhoef** for the practical helper-script improvements and clear issue write-up in [Issue #355](https://github.com/koosoli/ESPHomeDesigner/issues/355)!

### Follow-Up Tracking

- **Narrowed Follow-Up from Issue #356**: The original bundle has been split down to the remaining real gap: direct-render `datetime` and similar narrow text layouts can still diverge from the canvas preview because on-device output uses fixed `strftime(...)` lines rather than width-aware wrapping. The visibility/device-setting round-trip and hourly weather population portions are already covered by the RC8.x fixes.

### Security & Backend Hardening

- **Authenticated Designer API**: The `/api/esphome_designer/*` backend surface is treated as authenticated again, while the minimum panel shell assets stay accessible so Home Assistant can still boot the panel cleanly.
- **Image Proxy Restrictions**: The image proxy was tightened so it only serves approved image locations instead of broad file paths under the Home Assistant config area.
- **RSS Proxy Safeguards**: The RSS proxy now blocks private and internal targets to reduce SSRF risk.
- **Authenticated Hardware Package Serving**: Custom hardware package loading now goes through a dedicated authenticated backend endpoint.

### Architecture & Verification

- **Zero `@ts-nocheck` Suppressions**: All remaining `@ts-nocheck` suppressions were removed from the source tree, so the JavaScript codebase is now type-checked instead of bypassing errors.
- **Strict TypeScript Mode**: Strict TypeScript coverage was expanded for key core modules to catch integration and data-flow problems earlier.
- **Plugin Monolith Splits**: Several oversized plugin files were split into smaller focused modules so rendering, exports, and property handling are easier to maintain.
- **Targeted Regression Coverage**: Added focused regression tests for theme-aware icon background export, Roboto `600` font preservation, and the updated calendar helper/export wiring so the RC9 fixes stay locked in.
- **Expanded Test Coverage**: This branch currently verifies cleanly with `216` frontend test files / `1379` tests, `46` Python tests, and a passing production build.
- **Better Request-Level Coverage**: Backend and panel request paths now have stronger regression coverage, especially around auth boundaries, panel loading, and Home Assistant-specific flows.
- **CI Guardrails & Repository Hygiene**: Quality checks were tightened further and transient generated clutter was removed so the repository stays cleaner over time.

---

## v1.0.0 RC8.5 - Performance & Stability on High-Res LCDs
**Release Date:** March 21, 2026

### 🚀 New Features
- **Dynamic Colors for Sensor Text (Issue #203)**: Sensor Text widgets now support dynamic color interpolation. By defining a value range (Min/Max) and a color range (Low/High), the widget will smoothly interpolate the text color based on the sensor's current value (e.g., transitioning from blue to red as temperature rises).
  - This feature is exclusively available on **color displays** (LCD/OLED and multi-color e-paper).
  - The designer canvas provides a live, real-time preview of the calculated color.
  - Generates highly optimized C++ `Color()` and LVGL `lv_color_make()` lambda functions for fluid on-device rendering.
- **Filename-Based Color Modes (Issue #338)**: Custom imported hardware templates (YAML) can now explicitly declare their color capabilities via the filename. Naming a hardware recipe with a `*bwr.yaml`, `*fullcolor.yaml`, or `*primarycolor.yaml` suffix will automatically unlock the corresponding color palette in the designer (e.g., `myboard_fullcolor.yaml`). Huge thanks to **newhinton** for contributing this elegant solution!

### 🐛 Bug Fixes & Stability
- **LCD Performance & Crashes (Issue #349)**: Fixed a critical race condition that caused `IllegalInstruction` crashes and severe UI lag on the Waveshare 7" ESP32-S3 and other high-resolution LCDs. The script now intelligently detects LCD hardware and suppresses redundant display updates, relying purely on the hardware's native `update_interval`.
- **Navigation Debounce**: Increased touchscreen debounce timing from 500ms to 2000ms for LCD displays. This prevents double-taps and accidental page reverting caused by the longer ~2-second render cycle typical of 800x480 RGB panels.
- **Battery Sensor Reporting**: The `battery_icon` widget now detects when a selected hardware profile lacks the necessary battery ADC pins (e.g., Waveshare 7"). Instead of silently reporting 0%, it outputs a helpful C++ warning comment in the YAML and displays a `battery-alert` fallback icon.
- **LilyGo T-Display-S3 Compilation Fix (Issue #350)**: Fixed a compilation error ("couldn't find remote ref i8080") caused by an obsolete external component reference in the hardware template. The `i80`, `ili9xxx`, and related components are now native in ESPHome core.
- **TRMNL Battery Pin Fix (Issue #291)**: Corrected the battery ADC pin for the official TRMNL (ESP32-C3) from `GPIO0` to `GPIO3`.

---

## v1.0.0 RC8.4 - Enhanced Button Services & Blind Control
**Release Date:** March 20, 2026

### 🚀 New Features
- **WiFi QR Code Helper (Issue #183)**: The QR Code widget now features a dedicated "WiFi Credentials" mode. Enter your SSID, Password, and Security Type, and the designer will automatically generate a standard WiFi QR code format (`WIFI:S:...`) that can be scanned by any smartphone to easily share your network.
- **LVGL Button Service Selection (Issue #345)**: Added a "Service Override" field to LVGL Buttons. Users can now explicitly choose services like `cover.open_cover`, `cover.close_cover`, or `button.press` instead of being limited to automatic toggling.
- **MQTT Data Source Support (Issue #332)**: Implemented per-widget MQTT topic overrides. Widgets can now subscribe directly to MQTT topics (using `mqtt_subscribe`) instead of relying solely on Home Assistant entities.
- **LVGL Export Optimization (Issue #341)**: Significantly reduced YAML verbosity by automatically stripping default property values (colors, opacities, hidden states) from the export.
- **LVGL Grid Mode Fix (Issue #343)**: Fixed a bug where grid-positioned widgets incorrectly exported absolute coordinates instead of row/column indices.
- **Multi-Item RSS Widget (Issue #133)**: The Quote/RSS widget now supports displaying up to 10 items from a feed with customizable separators and individual word-wrap settings.
- **Auto-Detect for Covers**: Blinds and covers are now automatically recognized, defaulting to `cover.toggle` when no override is specified.
- **Sunton CYD 2.8" Display Fix (Issue #344)**: Corrected an error in the hardware templates where the 2.8" Sunton CYD was using the incorrect `TFT 2.4R` model. It now correctly uses `ILI9341` with framework-aware `invert_colors` settings (True for Arduino, False for ESP-IDF), resolving "white block" artifacts and incorrect display offsets.

### 🔧 Maintenance & Stability
- **Test Reliability**: Fixed a flaky unit test in `device_settings.test.js` related to `localStorage` timing.
- **Improved Testing**: Added dedicated integration tests for LVGL button service logic.

### 🐛 Bug Fixes
- **LVGL Action Stripping (Issue #342)**: Resolved compilation errors in non-LVGL projects by implementing a robust stripping mechanism for `lvgl.*` actions in hardware templates. Extended conditional guards to the Antiburn switch and touchscreen wake-up logic to ensure clean YAML generation when LVGL is disabled.

---

## v1.0.0 RC8.3 - Visibility & Deep Sleep Stability
**Release Date:** March 14, 2026

### 🐛 Bug Fixes & Stability
- **Visibility Persistence (Issue #337)**: Fixed several critical issues where visibility windows and device settings were not correctly saved or restored during YAML round-trips.
- **Deep Sleep Orchestration**: Major refactor of the deep sleep logic to ensure reliable operation on boot and stable state preservation.
  - **Boot Logic**: Fixed a regression where `manage_run_and_sleep` was skipped on boot for non-deep-sleep devices (Bug #7).
  - **State Preservation**: Prevented `is_new_flash` from being reset during page transitions (Bug #8).
  - **Night-time Sleep**: The `is_sleep_time` calculation is now actively used to gate display updates and enter deep sleep correctly (Bug #9).
- **Generator Integrity**: Resolved structure corruption in `yaml_generator.js` caused by duplicate method blocks from earlier incremental edits.

Special thanks to **newhinton** for flagging the visibility problems and providing detailed feedback in [Issue #337](https://github.com/koosoli/ESPHomeDesigner/issues/337)!

---

## v1.0.0 RC8.2 - Granular Font Weights
**Release Date:** March 13, 2026

### 🎨 Design & Typography
- **Granular Font Weights (Issue #337)**: Implemented exhaustive font weight controls for all text elements within the Calendar and Datetime widgets.
  - **Calendar**: Added independent weight selectors for Header Date, Header Day, Month, Grid Headers, Grid Dates, and Events.
  - **Datetime**: Replaced simple "Bold" toggles with precise numeric weight dropdowns for Time and Date elements separately.
  - **Consistency**: Aligned all textual widgets with the standard numeric weight system (100-900) used in the Text widget.
- **Improved Preview Parity**: The designer canvas now accurately renders all individual font weights, ensuring your dashboard looks exactly as intended during the design phase.
- **Reference Error Fix**: Resolved a critical YAML generation error where the "Grid Font ID" was incorrectly referenced during export.

Many thanks to **Richhoef** for the suggestions and detailed feedback in [Issue #337](https://github.com/koosoli/ESPHomeDesigner/issues/337)!

---

## v1.0.0 RC8.1 - Hotfix
**Release Date:** March 11, 2026

### Hotfix
- Updated the release version to `1.0.0-rc.8.1` so HACS and release metadata can point to a distinct prerelease instead of reusing the original `rc8` artifact.
- Fixed GitHub workflow drift by aligning the root release and Pages workflows with the current root-level Node project layout.
- Restored `lvgl_chart` to a chart-shaped LVGL export contract and updated the focused chart export test to match that behavior.
- Removed transient frontend artifact files and cleaned up stale nested `.github` workflow duplicates under `custom_components/esphome_designer`.
- Synced the touch-area export behavior, smoke snapshot contract, and schema baseline so the quality gate and CI no longer drift from the validated local state.

---

## v1.0.0 RC8 - Architecture Cleanup & Stability
**Release Date:** February 21, 2026

### 🔧 Architecture & Verification
- **Core Frontend Refactor**: Migrated key state, import/export, and registry paths from legacy `.js` modules to typed `.ts` modules, reducing ambiguity in the RC8 code path and making future maintenance safer.
- **Import/Export Pipeline Split**: Broke ESPHome generation and YAML parsing into dedicated generators and parser modules, improving round-trip reliability and making hardware/package overrides easier to reason about.
- **`js-yaml` Modernization**: Replaced the legacy bundled global script with the maintained NPM `js-yaml` dependency and ES module imports.
- **Plugin Contract Hardening**: Audited and corrected `schema` / `defaults` alignment across the full plugin set so fallback values remain predictable during editing, export, and re-import.
- **Current Verification Status**: The RC8 branch currently passes the automated frontend suite (`62` test files / `716` tests) and produces a successful production build.

### 🌦️ Weather Forecast Upgrade
- **Hourly Forecast Mode**: The `weather_forecast` widget can now switch between daily and hourly rendering.
- **Custom Hour Slots**: Configure exact forecast hours such as `06,09,12,15` to match your Home Assistant forecast source.
- **Start Offset Control**: Skip the first N hourly or daily entries with the new `start_offset` property.
- **Hourly `templow` Guard**: Hourly mode now suppresses `templow` handling automatically, avoiding invalid low-temperature lookups in Home Assistant hourly forecast data.
- **Direct + LVGL Parity**: Hour labels, icon selection, and refresh wiring now scale correctly across both direct rendering and LVGL export paths.


### 🐛 Bug Fixes

- **Graph History Guidance**: Added explicit property hints to the `graph` widget clarifying that native graphs collect data starting from device boot. Documentation for the "HA History" mode was also improved to clearly state it requires a custom HA template sensor for pre-existing data.
- **LVGL Refresh Warning (Issue #255)**: Fixed an ESPHome 2024.12+ compiler warning ("Widget does not have any dynamic properties to refresh"). The `wifi_signal`, `weather_forecast`, `weather_icon`, `ondevice_temperature`, and `ondevice_humidity` plugins were incorrectly registering their static parent wrapper object for UI refreshes instead of the dynamic child labels. The generator now correctly targets the inner child text widgets.
- **YAML Indentation Corruption (Issue #319)**: Fixed a bug where the hardware generator would output "mapping values are not allowed here" when merging touch panel configurations. The regex responsible for swapping `transform:` properties based on rotation was too greedy and incorrectly swallowed trailing `on_release:` event blocks.
- **Vitest Teardown Fix**: Resolved a silent crash during asynchronous Vitest worker teardown by implementing an intelligent fallback target for the global State Proxy.
- **Mock Registry Repair**: Restored broken unit tests in `esphome_adapter.snapshot.test.js` by transitioning to correctly decoupled utility functions.
- **LVGL Line Fix**: Added missing `points` property to the `lvgl_line` plugin's default configuration, resolving a validation failure in the plugin contract tests.

---

## v1.0.0 RC7 - Extended Domains & Deep Attributes
**Release Date:** February 19, 2026

### 🏠 Home Assistant Integration
- **Extended Domain Support**: Added automatic fetching and autocomplete support for `calendar.*`, `person.*`, `device_tracker.*`, `sun.*`, `update.*`, and `scene.*` entities.
- **Native Calendar Support**: The `calendar` widget now supports standard HA `calendar.*` entities, displaying current event summaries directly from entity attributes.

### 🧪 Advanced Attribute Handling
- **Deep Attribute Paths**: Added support for dot and bracket notation (e.g., `entries.days.0.day`) in both `sensor_text` and `weather_icon` widgets to navigate nested JSON structures.
- **Improved Object Preview**: Attributes containing complex objects or arrays (like forecasts or calendar entries) are now beautifully stringified as JSON in the canvas preview instead of showing `[object Object]`.
- **Smart ID Generation**: Standardized `makeSafeId` across all export paths to ensure valid ESPHome IDs even when using long nested attribute paths.
- **Automatic Text Sensor Registration**: Entities from text-heavy domains (`person`, `calendar`, `sun`, etc.) are now automatically registered as `text_sensor` in ESPHome, ensuring correct `%s` formatting.

### 🎨 GUI & Designer Enhancements
- **Pixel-Perfect Text Preview**: Added `overflow: hidden` to both `sensor_text` and standard `text` widgets, ensuring the canvas preview accurately reflects how text is clipped on physical hardware.
- **Smart Widget Auto-Resize**: The `sensor_text` widget now automatically expands its width to fit long labels and values when real Home Assistant data is connected, preventing accidental clipping during design.
- **Secondary Attribute Field**: Added a "Secondary Attribute" field to the `sensor_text` widget properties.
- **Exposed Weather Attributes**: Fixed the `weather_icon` property panel to expose the "Attribute" field.
- **Improved Guidance**: Added explicit hints in the properties panel explaining how to use nested attribute paths.
- **Improved Power Management UI**: The PSRAM checkbox is now automatically disabled and unchecked when a chip that doesn't support it (like ESP32-C3) is selected.
- **Time-based Page Visibility**: Added "Visibility Window" (Start/End) inputs to Page Settings. The generated YAML now includes intelligent C++ orchestration to find the "best" page for the current time, with support for fallback pages and automatic switching between schedules.
- **Graph History Clarification**: Added helpful hints in the properties panel explaining that native graphs collect data from boot.
- **Advanced HA History Warning**: Renamed and documented the "HA History Attribute" feature with an explicit warning that it requires a custom HA template sensor to function.

### 📊 Progress Bar Widget Upgrades
- **Vertical Orientation**: Added support for vertical progress bars. The widget now intelligently adapts its layout and labels when switched to vertical mode.
- **Custom Value Ranges**: Added "Min Value" and "Max Value" properties. This allows the progress bar to accurately represent data from sensors with any range (e.g., 0-3000 Lux, -20 to 50°C), rather than being hardcoded to 0-100%.
- **Text Customization**: Added controls for **Font Size** and **Text Alignment** (Left, Center, Right) for title and percentage labels.
- **Smart Layout**: Automatically positions labels at the top/bottom in vertical mode to maximize bar visibility.
- **Multi-Platform Support**: Enhancements fully implemented for Direct Display, LVGL, OEPL, and OpenDisplay export paths.


### 📱 New Hardware Support
- **Seeed Xiao ESP32C3 - 7.5" E-Paper**: Added a new (untested) profile for the SeeedStudio Xiao with a 7.5-inch e-ink screen, including correct pin mappings for SPI and the display.

### 🔧 Code Quality & Refinements
- **Shared Utility**: Moved `getNestedValue` to a shared location to deduplicate code across plugins.
- **Export Consistency**: Fixed a bug where secondary attributes were not correctly included in the generated ESPHome IDs for text sensors.
- **Adapter Cleanup**: Removed legacy debugging comments from the ESPHome adapter.

### 🐛 Bug Fixes
- **Sensor Bar Registration**: Fixed a bug where custom Home Assistant entities for Temperature, Humidity, and Battery in the Sensor Bar widget were not being registered in the ESPHome YAML, causing them to display as "--".
- **Robust Guarding**: Added sensor-type specific checks (e.g., `temp_is_local`) to prevent spurious Home Assistant sensor registration when hardware sensors are selected.
- **PSRAM Generation Fix**: Added a chip-level guard to prevent generating the `psram:` YAML section for chips that do not support it (ESP32-C3, ESP32-C6, ESP8266), resolving boot loop issues on these devices.
- **Daily Refresh Fix**: Fixed a bug in the interval calculation for daily scheduled wake-ups. The system now correctly handles next-day rollovers and calculates the precise number of seconds until the target time.
- **Round-Trip Meta Consistency**: Added `page:visible_from` and `page:visible_to` markers to ensure visibility settings are preserved during YAML export and re-import.


---

## v1.0.0 RC6.1 - Hotfix & Widget Upgrades
**Release Date:** February 18, 2026

### 🎨 Visual Upgrades

#### Enhanced Border & Shadow System
Added standardized **Border Style** controls (Width, Color, Radius, Drop Shadow) to:
- **Weather Forecast**, **Calendar**, **Date & Time** (`datetime`), **Weather Icon**, **Quote / RSS Feed**

#### Smart Drop Shadows
- **Auto-Sync Radius:** Shadows now inherit the parent widget's corner radius.
- **Multi-Select:** Create shadows for multiple widgets at once.
- **Auto-Grouping:** Shadows are now automatically grouped with their parent widget.

### 📅 Calendar Widget
- Added full support for **Borders**, **Rounded Backgrounds**, and **Drop Shadows**.

### 📱 Hardware Support
- **Waveshare 4.3" (#304):** Added missing `display_backlight` switch (CH422G).

### ✨ Improvements
- **Sensor Attributes:** `text_sensor` and `weather_icon` now support HA attributes.
- **LVGL Auto Color:** Automatic color handling for all LVGL widgets.

### 🐛 Bug Fixes
- **LVGL Dark Mode:** Fixed invalid YAML generation for LVGL widgets.
- **Selection Mode:** Removed the selection-based YAML filtering in the snippet box. Full layout is now always visible.



---

## v1.0.0 RC5 - Graph Precision & Security
**Release Date:** February 16, 2026

### 🎨 Graph & Chart Widget
- **Fixed Invisible Traces**: Resolved an issue where graph lines were invisible (white-on-white) on e-paper displays, particularly when using `theme_auto` or specific color combinations.
- **Improved Color Support**: The "Line Color" setting now correctly supports all named colors (e.g., `gray`, `yellow`, `orange`, `purple`) and hexadecimal values. Previously, many colors silently defaulted to black.
- **Enhanced Dark Mode Contrast**: `theme_auto` now intelligently adapts to the per-page Dark Mode setting, ensuring traces are always visible against the background.

### 🏠 Home Assistant Integration
- **Token Security**: The "Long-Lived Access Token" input field is now **hidden** when the editor is deployed as a Home Assistant Add-on. This prevents accidental configuration errors where users would manually enter a token, breaking the internal authentication flow.

### 📱 Display & Hardware
- **Orientation Fix (Issue #297)**: Fixed a bug where selecting portrait mode on LCD panels incorrectly swapped the `dimensions:` width/height in the generated YAML, conflicting with the `rotation:` setting. The `dimensions:` block now always reflects the physical panel hardware specs — only the `rotation:` value changes to handle orientation.

### 👁️ Widget Visibility
- **Visibility Options**: Fixed various visibility toggles (e.g., for Calendar header/grid/events) that were not correctly updating the generated YAML configuration.

---

## v1.0.0 RC4 - Polishing & Stability
**Release Date:** February 11, 2026

### 🐛 Bug Fixes & Refinements
- **Custom Hardware Orientation**: Custom hardware profiles now correctly respect the defined orientation settings.
- **Dark Mode Restoration**:
  - Global Dark Mode functionality has been restored.
  - **Sensor Bar & Progress Bar**: Fixed rendering issues to ensure these widgets look correct in Dark Mode.
- **Drag & Drop Stability**: Prevented the widget panel from scrolling unintentionally during drag and drop operations.
- **Shape Infill Fixed**: Resolved an issue where the infill color of shapes was not being applied correctly.
- **System Logic**:
  - **Deep Sleep**: Fixed regressions in Deep Sleep behavior.
  - **Auto Cycling**: Resolved issues with the page auto-cycling logic.

---

## v1.0.0 RC3 - Dynamic Sensor Bar & Hardware Clarity
**Release Date:** February 8, 2026

### 🔋 Dynamic Sensor Bar Enhancements
- **Local Sensor Support**: Added "Local" toggles for all Sensor Bar components (WiFi, Temp, Humidity, Battery). This allows using on-device ESPHome sensors instead of Home Assistant entities for a more robust "offline" status display.
- **Live Preview Parity**: The designer's live preview of the Sensor Bar now correctly reflects the actual state of your Home Assistant entities.

### 🎭 Visual Depth & Precision (Drop Shadows)
- **Shape-Accurate Shadows**: The "Create Drop Shadow" feature now dynamically detects the widget geometry. It perfectly matches **Circles**, **Rounded Rectangles** (respecting your radius), and **Rectangles** for pixel-perfect depth.
- **Intelligent Infill & Masking (Device Parity)**: Creating a shadow now automatically applies a solid, opaque background fill to the original widget. This ensures the shadow is correctly masked behind the widget on your physical device without "bleeding through" transparent text or icons.
- **Preserved Content Colors**: For text and sensor widgets, our new logic **preserves your chosen text color** while providing the necessary opaque fill for the shadow effect.
- **Unified Preview**: All content-bearing widgets (Text, Sensors, DateTime, Icons) have been updated to ensure the designer preview exactly matches the on-device rendering for background fills.
- **Multi-Select & Batch Creation**: You can now create shadows for multiple selected widgets simultaneously via the new **"Operations"** section in the properties panel.

###   Seeedstudio SenseCAP Indicator Support
- **Full Model Support**: Added native hardware recipes for SenseCAP Indicator D1, D1S, D1L, and D1Pro models.
- **RGB Display Optimization**: Implemented smart screen clearing using `page_changed` detection. This provides a full clean refresh on page transitions (no black artifacts) while maintaining high-speed updates for sensor data to keep touch input responsive.
- **Home Assistant Control**: Added built-in Home Assistant buttons for remote page navigation and display refresh, achieving full feature parity with the reTerminal.
- **Reliable 480x480 Rendering**: Fixed graph widget trace colors and auto-scaling logic specifically for high-resolution RGB displays.

###  📦 Hardware Profile Clarification
- **Clearer Terminology**: Renamed "Local Profiles" to **"User-Imported / Custom"** to avoid confusion with files shipped with the editor.
- **Bundled vs User**: Files in the `hardware/` folder are now correctly grouped as "Built-in" (Bundled) profiles, even if they aren't in the explicitly "verified" list.
- **Import/User Suffixes**: User-added profiles now display an **"(Imported)"** suffix for better visibility.

### 🧩 UI Terminology Unification
- **Project → Layout**: Standardized all user-facing references from **"Project"** to **"Layout"** to resolve confusion (#272).
- **Consistently Labeled Buttons**: Renamed "Save Project" and "Import Project" to **"Save Layout"** and **"Import Layout"**.
- **Sidebar Synchronicity**: The sidebar now correctly identifies the active configuration as a "LAYOUT".

### 🖱️ Multi-Select Empowerment
- **Multi-Select Property Editing**: You can now edit common properties (X, Y, Width, Height, Colors, Borders, Fonts) for multiple widgets simultaneously. 
- **Mixed Value Detection**: The sidebar now intelligently detects if selected widgets have different values for a property, displaying a "Mixed" state placeholder.
- **Filtered YAML Snippets**: Selecting multiple widgets on the canvas now isolates their YAML in the code panel, hiding all unselected distractions and automatically selecting the text for instant copying.
- **Safety Guards**: Layout updates are automatically disabled when viewing partial snippets to prevent accidental project overwrites.
- **Resize Snapping & Alignment Guides**: Widgets now snap to the grid and other widgets during resize, with real-time alignment guides for pixel-perfect layouts.
- **Natural Page Numbering**: New pages now automatically receive the next unique number (e.g., Page 4) even if intermediate pages (e.g., Page 2) were deleted, preventing duplicate names (#270).

### 🛠️ Widget & YAML Refinement
- **Graph Y-Axis Overrides**: Added "Min (Override)" and "Max (Override)" inputs that remain visible when Auto-scale is enabled. This allows forcing fixed bounds for Y-axis labels while maintaining auto-scale logic.
- **Intelligent Battery Defaults**: Standalone battery widgets now automatically default to `sensor.battery_level` when "Local" is unchecked, ensuring a smoother external sensor setup.
- **Enhanced Sensor Bar Resolution**: The battery icon in the Sensor Bar now uses 10% increments (matching standalone widgets) for much more granular level updates.
- **In-YAML Documentation**: Auto-scaled graphs now include a helpful comment in the generated YAML explaining how to enable Y-axis labels via overrides.

### 🐛 Bug Fixes
- **Image Resize Handles**: Fixed an issue where resize handles were invisible on both `Image` and `LVGL Image` widgets due to `overflow: hidden` clipping.

---

## v1.0.0 RC2 - Navigation & Refinement Update
**Release Date:** February 6, 2026

### 🚀 Improved Navigation & Zoom
- **Zoom to Fit All Pages**: new "Grid View" icon in the view toolbar.
- **Selectable PAGES Header**: Clicking the "PAGES" sidebar header now instantly zooms and pans to see all artboards on the canvas at once.
- **Double-Click to Focus**: Double-clicking an empty area of any artboard now zooms and recenters precisely on that page. Single-clicking selects the page context without jarring camera jumps.
- **Improved Reset View (Ctrl+0)**: The reset view command is now smarter—it will center and fit the currently selected page instead of just resetting to absolute zero.

### 🎨 Canvas & UI Enhancements
- **Dynamic Artboard Headers**: Page headers now automatically adapt their width to match the device profile's width, ensuring a cleaner visual alignment.
- **Better Reframing for Smaller Devices**: Improved `focusPage` algorithm that ensures optimal zooming for mobile and small tablets, preventing artboards from being cropped.
- **Page Renaming**: Pages can now be renamed directly, making multi-page project organization much easier.
- **Duplicate Page**: Added ability to copy/duplicate entire pages including all widgets and their properties.

### 📦 Hardware & Stability
- **Clear Hardware Profiles**: Refreshing hardware profiles now clearly distinguishes between **locally stored** custom profiles and **default** built-in recipes.
- **Better Multi-Widget Drag & Drop**: Multiple widgets can now be dragged between pages smoothly using high-performance drag ghosts. The canvas no longer aggressively zooms during these operations, allowing you to see exactly where you are dropping your widgets.
- **Automatic Recentering**: The canvas now automatically recenters and zooms to fit whenever you change the device profile, orientation, or hardware settings in the Device Settings modal.

### 🐛 Bug Fixes & Refinements
- **Cross-Page Drag Clamping**: Fixed an issue where widgets dropped between artboards could end up in "neverland". Snapping and clamping are now strictly enforced on drop.
- **Header Selection Consistency**: The PAGES header in the sidebar now has visual hover feedback and better title tooltips.

---

## v1.0.0 RC1 - The "Grand Cleanup" & Modular Renaissance
**Release Date:** January 28, 2026

> [!CAUTION]
> **🚨 CRITICAL UPDATE INSTRUCTION (For HACS Users)**
> 
> HACS caches the old repository domain (`reterminal_dashboard`). To install this update correctly, you **MUST** perform a clean reinstall:
> 1. In HACS, go to Integrations → Find **ESPHome Designer** (or reTerminal Dashboard) → Click **Wait** (three dots) → **Remove**.
> 2. Go to **Integrations** → **Three dots** (top right) → **Custom repositories**.
> 3. Find `https://github.com/koosoli/ESPHomeDesigner` and **delete it** (Trash icon).
> 4. **Restart Home Assistant** (This is critical to clear the cache).
> 5. Go back to HACS → **Custom repositories** → Re-add `https://github.com/koosoli/ESPHomeDesigner`.
> 6. Install **ESPHome Designer** fresh.
> 
> *Failing to do this will cause HACS to re-download the old version!*

### 🚀 Major Architectural Revolution
- **Plugin-Based Widget Ecosystem:** A complete shift from a 3,800+ line monolithic exporter to a modular registry with **55+ independent widget plugins**. Every widget is now its own self-contained module, making the system faster, more stable, and easier to extend.
- **Backend Modularization:** Massive backend refactor splitting the monolithic `http_api.py` and `yaml_parser.py` into dedicated `api/` and `yaml_parser/` directories. This improves stability and enables complex parsing logic for new platforms.
- **Multi-Platform Rendering (Experimental):**
  - **OpenEpaperLink (OEPL) Integration:** Full support for generating MQTT-based payloads for AP-flashed e-paper tags. Includes automated parsing of OEPL YAML arrays.
  - **Open Display (ODP) v1 Protocol:** Initial support for the Open Display JSON standard for MQTT/HTTP based controllers.
  - **Parsing Parity:** Both OEPL and ODP platforms support "Round-Trip" editing—import your existing payloads back into the designer canvas seamlessly.
- **World View Canvas:** All project pages are now rendered as distinct artboards on a unified infinite stage. View your entire multi-page project at once for pixel-perfect cross-page consistency.
- **Codebase Sanitization:** Removed 1450+ legacy files and consolidated 80+ redundant versions into a single, clean production-ready branch.

### 🎨 GUI & Designer Enhancements
- **Atomic Grouping Engine:** Groups now behave as unified containers. Draggable, resizable, and layer-persistent. Transporting a group between pages now preserves the entire internal hierarchy perfectly.
- **Hierarchy Panel & Layer Management:** 
  - **Full Synchronization:** Perfect real-time sync between the Canvas, the Hierarchy Tree View, and the YAML property editor.
  - **Visual Layer Sorting:** Easily reorder widgets and groups via drag-and-drop in the hierarchy panel.
  - **Relocated Layer Controls:** Quick-access "Front/Back" and "Up/Down" layer adjustment buttons integrated directly into the Hierarchy section.
- **Interactive Precision Tools:** 
  - **Canvas Rulers:** Pixel-accurate rulers that scale with zoom and highlight widget focal points.
  - **Smart Spacing Guides:** Hold `Ctrl` to see real-time distance markers between widgets.
  - **Batch Alignment:** New contextual toolbar for rapid Left/Center/Right/Top/Middle/Bottom alignment and distribution of multiple widgets.
- **Focus Mode:** Custom panning algorithm (`focusPage`) that instantly centers any artboard in the viewport with a single click.
- **Advanced Properties Accordion:** Semantic organization of widget settings (Transform, Appearance, Data, Events) with a redesigned UI for better readability.
- **Refined Artboard Aesthetics:** High-fidelity triple-elevation drop shadows and active-page "lift" effects for a premium design feel.

### 📦 New Specialist Widgets (ODP/Experimental)
- **ODP Arc & Ellipse:** Native vector-based rendering for experimental platforms.
- **ODP Polygon:** Define custom multi-point shapes with fill and stroke control.
- **ODP Icon Sequence:** Easily create status bar sets or navigation rows.
- **ODP Rectangle Pattern:** Advanced tiling for complex backgrounds.
- **ODP Plot:** High-performance sensor history visualization for JSON-based displays.

### 🐛 Bug Fixes & Refinements
- **Viewport Scrollbar Cleanup:** Disabled conflicting native scrollbars in favor of 100% transform-based panning for smoother navigation.
- **Display Lambda Indentation:** Resolved long-standing YAML validation errors caused by inconsistent indentation in hardware recipes.


> [!WARNING]
> **BREAKING CHANGES**
> - **Project Compatibility:** Saved projects from versions prior to 0.9.0 will **not be automatically imported**. We strongly recommend backing up your old project JSON files or YAML snippets before updating.
> - **Branding Rename:** The legacy `reterminal_dashboard` domain has been retired. The integration is now officially **`esphome_designer`**.



---

---

## v0.8.6.1 - Hotfix: Custom Recipe Caching

**Release Date:** January 1, 2026

### 🐛 Bug Fixes
- **Custom Hardware Recipe Updates**: Fixed a critical issue where updating a custom hardware recipe (YAML file) and re-importing it would not reflect changes in the generated output. The system now bypasses browser caching when fetching hardware packages and templates, ensuring edits are immediately applied.
- **Custom Hardware Profile Generation**: Fixed missing `id: my_display`, `offset_height: 0`, and `offset_width: 0` properties in the generated YAML for ST7789V displays.
- **YAML Color Export**: Fixed an issue where custom colors selected via the RGB picker always exported as `COLOR_BLACK`. The exporter now correctly parses hex color codes and generates the appropriate `Color(r, g, b)` constructors in the C++ lambda.


## v0.8.6 - Experimental: Custom Hardware Profiles

**Release Date:** January 1, 2026

### 🚀 New Features
- **[Experimental] Custom Hardware Profiles**: A major new capability allowing you to define your own hardware characteristics (Chip, Display, Touch, Pins) directly within the designer.
  - **Visual Configuration**: No more manual YAML hacking to get a new display working. Configure your Chip (ESP32-S3/C3/C6), Tech (LCD or E-Ink), Resolution, and Pin assignments via a new UI.
  - **Browser Persistence**: In offline mode, your custom profiles are now automatically saved to your browser's `localStorage`, ensuring they survive page refreshes.
  - **Snippet-First Philosophy**: The generated hardware YAML is intelligently commented out for infrastructure sections (`esphome`, `esp32`, etc.), allowing you to safely paste the hardware definitions into your existing configuration.
  - **Auto-Selection**: Newly created profiles are automatically selected and applied to the current session.

### 🐛 Bug Fixes
- **Pin Input Crash**: Fixed a critical `TypeError` when saving custom profiles caused by a missing Touch Reset pin element in the HTML.
- **Improved Dropdown Stability**: Fixed industrial-strength race conditions where the "Custom Profile..." option would disappear or fail to select after a save. Added a robust retry mechanism for profile loading.
- **Safe Input Retrieval**: Implemented a global helper for safe UI value retrieval to prevent crashes if certain hardware elements are missing from the DOM.

## v0.8.5.1 - Hotfix: Calendar & Build Environment

**Release Date:** January 1, 2026

###   New Features
- **RGB Color Selectors for LCD/OLED**: The designer now intelligently switches between a limited color palette (for E-Ink) and a full RGB color mixer for LCD and OLED devices. This is automatically determined based on the hardware profile features.

###  🐛 Bug Fixes
- **Calendar Widget Compiler Errors**: Fixed C++ compilation errors (`return-statement with a value`) and deprecated warnings (`containsKey`) in the Calendar widget. The generation logic was corrected in both the modular feature file and the main `yaml_export.js`.
- **ESP-IDF Environment Tip**: Added a helpful tip to the generated YAML header recommending `framework: version: 5.4.2` for ESP32-S3 devices. This prevents build failures caused by auto-updates to bleeding-edge ESP-IDF versions (like 5.5.1) which may have broken Python environments.

## v0.8.5 - Round Displays & Hardware Expansion

**Release Date:** December 29, 2025

### 🚀 New Features
- **Round Display Support**: Introduced support for round/circular display canvases, including correct coordinate mapping and visual boundaries in the designer.
- **Improved Hardware Expansion**: Added dedicated support and tested hardware recipes for the **WaveShare Universal ESP32 e-Paper Driver Board** paired with the **7.5" v2 display**.
- **Dynamic Orientation**: Updated import logic to respect `# Orientation: portrait/landscape` tags, automatically rotating the canvas to match the device's physical mounting.
- **Resolution & Shape Metadata**: Imported YAML files with `# Resolution: WxH` or `# Shape: round/rect` comments will now automatically resize and reshape the designer canvas to match the hardware.
- **Premium Default Theme for Bars**: The `template_nav_bar` and `template_sensor_bar` widgets now default to a high-contrast white-on-black theme for better readability and a more premium aesthetic.
- **New Hardware Support**: Added support for the **WaveShare Universal ESP32 epaper driver board** and **7.5" v2 display** via hardware recipes. Many thanks to **EmilyNerdGirl** for contributing this recipe!
- **Hardware Recipe Documentation**: Expanded the [Hardware Recipes Guide](https://github.com/koosoli/ESPHomeDesigner/blob/main/hardware_recipes_guide.md) with comprehensive documentation for all supported metadata tags, including `# Orientation`, `# Dark Mode`, and `# Refresh Interval`.
- **Full Conditional Visibility Support**: All widget types now support conditional rendering based on Home Assistant entity states (binary, numeric, text, and range). The designer automatically generates the required Home Assistant sensors and optimized C++ `if` blocks in the display lambda.
- **Improved Smart Condition Logic**: Enhanced sensor state detection for both binary and numeric sensors. The generator now recognizes expanded Home Assistant states like `open`, `locked`, `home`, and `active` as positive (true) values, and provides intelligent fallbacks for numeric sensors using common string labels.


### 🐛 Bug Fixes
- **Custom Resolution Import Fix**: Resolved a critical issue where custom resolutions from hardware recipes were ignored during import, resetting the canvas to 800x480.
- **Inverted Color Metadata**: Added support for the `# Inverted: true/false` metadata tag in imported YAML files, ensuring correct color mapping from the first load.
- **E-Paper Page Cycling Logic**: Refactored the `auto_cycle_timer` to use a robust delay-based loop and ensured the countdown resets on manual page interaction, resolving issues where cycling would stall or trigger unpredictably.
- **Global Variable YAML Compliance**: Fixed ESPHome validation errors by wrapping numeric and boolean `initial_value` fields in quotes, ensuring compatibility with ESPHome 2024.11+.
- **Playfair Display Glyph Fix**: Resolved an issue where the "Playfair Display" font caused ESPHome compilation errors (#105) due to a missing "µ" (micro) glyph. The designer now automatically filters out this character specifically for this font while preserving it for other font families.
- **Line Object YAML Export Fix**: Fixed a critical issue where line objects generated invalid ESPHome YAML (#106). Points are now correctly formatted with `x` and `y` keys, and style properties (`line_opa`, `line_width`, etc.) are properly nested within a `style` block to comply with ESPHome LVGL requirements.
- **LVGL Button & Opacity Fix**: Resolved ESPHome compilation errors (#104) by converting LVGL opacity values to percentages (e.g., `100%`) and correcting the `homeassistant.service` call structure for buttons (adding the missing `data:` block).
- **Temperature & Humidity Sensor Fix**: Resolved issues (#102) where selecting a custom Home Assistant entity for on-device widgets caused "ID not found" errors. Standardized ID generation across all sensors to ensure hardware definitions and display lambdas always match.
- **Local Sensor Hardware Support**: Fixed a bug where selecting "Local / On-Device Sensor" on DIY devices (like TRMNL DIY) failed to generate the required `sht4x` hardware platform, resulting in compilation failures. The designer now automatically includes the necessary hardware configuration if local widgets are used.
- **Trmnl Device Fixes**: Fixed compilation errors for "Trmnl DIY" devices where local temperature/humidity sensors were incorrectly referenced. The system now safely handles cases where local sensors are requested but not supported by the hardware, and correctly sanitizes custom sensor IDs to prevent "Couldn't find ID" errors.
- **Display Lambda Header Injection**: Fixed a critical bug where the `lambda: |-` header was incorrectly omitted if the string was found anywhere else in the file (e.g. in comments or other components). The generator now strictly checks for the header specifically preceding the lambda placeholder, ensuring valid YAML syntax for all display configurations.
- **Widget Visibility Logic Fix**: Resolved a long-standing issue where conditional visibility rules were ignored during YAML export. The implementation now correctly generates re-import metadata (shorthand keys) and ensures sanitized sensor IDs are used throughout the C++ rendering logic.
- **Waveshare 7" LCD Orientation Fix**: Implemented a dynamic package override mechanism to allow rotating the Waveshare 7" LCD (Landscape, Portrait, Inverted). Also added automatic touchscreen `transform` mapping to ensure touch inputs align with the rotated display.
- **Quote Widget Regression Fix**: Resolved a regression where quotes failed to fetch and display on-device. Restored the missing `interval` and `http_request` fetch logic, updated to use robust `DynamicJsonDocument` parsing for reliability, and ensuring immediate visual feedback via a forced display update.
- **Calendar Widget Fix**: Resolved a critical issue where calendar events were not displayed on-device. Replaced `json::parse_json` with robust manual `deserializeJson` parsing using a heap-allocated `DynamicJsonDocument` (2KB), and introduced a **"Compact Mode"** layout that aggressively reduces header and grid spacing to maximize event visibility on smaller widgets.

---

## v0.8.4 - Weather Icon Sensor Fix

**Release Date:** December 29, 2025

### 🎉 New Features
- **On-Board Sensor Bar Widget**: A unified status bar for local hardware, combining WiFi signal, Temperature, Humidity, and Battery levels into a single, highly customizable widget.
- **Navigation Bar Widget**: A premium, all-in-one navigation control featuring "Previous", "Home/Reload", and "Next" buttons. Automatically generates the complex touch area logic and C++ rendering required for multi-page dashboards.
- **Batch Widget Locking**: Lasso-selected widgets can now be locked or unlocked simultaneously using the "Lock" toggle in the properties panel. 
- **Lock/Unlock Shortcut (Ctrl+L)**: Quickly toggle the lock status of all selected widgets with a new keyboard shortcut.
- **Locked Widget Preservation**: Locked widgets are now protected from accidental deletion via keyboard shortcuts or the "Clear Page" operation.
- **UI Layout Optimization**: Refined the editor interface with a 3-column keyboard shortcut list and a subtle, relocated AI Assistant button next to the YAML editor.
- **AI Assist Onboarding**: Added a configuration hint and direct settings link within the AI Assistant modal for unconfigured users.

### 🐛 Bug Fixes
- **Weather Icon Sensor Fix**: Addressed an issue where `weather_icon` widgets required manual `text_sensor` entries in ESPHome YAML. The designer now automatically generates these sensors for both `weather.*` and `sensor.*` entities.
- **Unified ID Generation**: Standardized the ESPHome ID generation for weather-related sensors, ensuring that `sensor.*` prefixes are correctly stripped to match the internal C++ lambda references, preventing compilation errors.
- **Calendar Display Optimization**: Optimized the calendar widget layout and C++ rendering logic to resolve an issue where only a single event was displayed. Reduced header and grid spacing and increased the default widget height (to 550px) to accommodate more events.
- **Robust Calendar JSON Parsing**: Refactored the ESPHome lambda to use direct JSON object access instead of redundant parsing, significantly reducing memory overhead and improving parsing reliability for multi-event datasets.
- **Calendar Backend Refinement**: Updated the Python helper script to return data in a standard dictionary format, ensuring full compatibility with ESPHome's JSON component.
- **YAML Lambda Indentation**: Fixed a critical bug in package-based hardware recipes where the display lambda was incorrectly indented by 8 spaces instead of 4, causing "Invalid YAML syntax" and compilation errors in ESPHome.
- **YAML Configuration Duplication**: Fixed a bug where custom hardware recipes were prepended twice in the exported YAML under certain conditions.
- **Custom Hardware Resolution**: Fixed an issue where the resolution specified in custom hardware recipe headers (e.g., `# Resolution: 480x320`) was ignored by the backend, causing the designer to default to 800x480.
- **M5 Touch Area Precision**: Fixed a bug in the coordinate transformation logic for M5 devices (specifically M5Paper) that caused touch inputs to be rotated 90° relative to the display. This ensures navigation buttons align correctly with visual elements. *Note: This fix remains untested on physical hardware.*
- **Navigation Widget Height Persistence**: Fixed a critical bug where `template_nav_bar` and navigation touch buttons would reset their height to 10px on page refresh in the deployed Home Assistant version. The Python backend's `clamp_to_canvas()` function was using hardcoded 800x480 landscape dimensions, incorrectly clamping widget heights for portrait layouts or devices with non-standard resolutions (e.g., M5Paper 540x960).
- **Gray Background Rendering**: Fixed an issue where `template_nav_bar` and `template_sensor_bar` widgets rendered their backgrounds as solid black instead of gray. The export logic was incorrectly using the foreground (icon) color for backgrounds and checking the wrong property for dithering.
- **E-Paper Page Cycling Fix**: Fixed a regression in the `auto_cycle_timer` script generation where the missing `mode: restart` attribute prevented recursive execution, causing auto-cycling to stop after the first page change.
- **Global Variable YAML Compliance**: Refactored the generation of numeric and boolean global variables (e.g., `display_page`, `page_refresh_default_s`) to remove redundant single quotes, improving compliance with strict YAML parsers and ensuring correct type inference in ESPHome.
- **Hardware Profile & PSRAM Safety**: Improved analysis and documentation for hardware profiles. Identified that selecting mismatched profiles (e.g., reTerminal E1001 for generic ESP32-S3 boards) can cause boot loops due to incorrect PSRAM mode settings (`octal` vs `quad`). Added recommendations for the `update_interval: never` setting to prevent display update conflicts.
---

## v0.8.3 - Mobile Touch & Hardware Fixes

**Release Date:** December 28, 2025

### 🎉 New Features
- **Widget Position Locking:** Added a "Lock Position" checkbox to widget properties, preventing accidental movement or resizing on the canvas.
- **Full Touch Support**: Added comprehensive support for dragging, resizing, and moving widgets on touch devices (mobile phones/tablets). Pinch-to-zoom and panning are also optimized for mobile browsers.
- **Standardized SHT Sensor Support**: Enhanced support for SHT3x, SHT4x, and SHTC3 sensors with standardized internal IDs, ensuring compatibility across M5 Paper and other hardware.
- **Default Home Assistant Icon**: Set the default MDI icon for the "icon" widget to the Home Assistant icon (`F07D0`).
- **Lasso Selection**: Added ability to select multiple widgets simultaneously by drawing a selection rectangle on the canvas. Supports group movement, bulk deletion, and multi-widget copy/paste.
- **Auto Page Cycling:** Added support for automatic page switching based on a configurable time interval, perfect for kiosk-style displays. Includes logic to reset the timer on manual user interaction.
- **Navigation Touch Widgets:** Introduced "Next Page", "Previous Page", and "Reload Page" widgets in the Inputs category. These are pre-configured touch areas that automatically generate the required ESPHome scripts for seamless multi-page navigation and display refreshing.
- **Global Variable Refresh Interval**: Users can now configure a global default refresh interval for the entire device. This setting intelligently syncs with Deep Sleep intervals and ensures consistent refresh timing across all pages while preserving battery life. Provisions were made to ensure this setting is persistent across page refreshes and exports.
- **Enhanced Quick Widget Search (Shift+Space)**: The Quick Search command is now global! Pressing `Shift+Space` will now open the widget picker even if you are editing text in the YAML box or properties panel, automatically blurring the input and letting you add widgets instantly.
- **Enhanced YAML Copy Feedback**: The "Copy" button in the YAML editor now provides immediate visual feedback ("Copied!") on click, confirming the action without needing to look at toast notifications.

### 🐛 Bug Fixes
- **YAML Syntax Error**: Fixed "mapping values are not allowed here" error by switching widget marker comments from `//` to standard YAML `#` notation. Maintained full backwards compatibility for importing existing local projects.
- **M5 Paper Temp/Humidity Widgets**: Fixed Temperature and Humidity widgets on M5 Paper by implementing `sht3xd` platform support.
- **YAML Cleanup**: Eliminated redundant/duplicate sensor blocks in generated YAML for devices with on-board sensors.
- **Icon Character Escaping**: Fixed a bug where certain unicode icons (like `thermometer-low`) were improperly escaped in the generated C++ code.
- **UI Refinement**: Updated the properties panel to be more sensor-agnostic and refined various labels for better clarity.
- **YAML Duplication**: Fixed a critical bug where hardware recipes (like Xiao ePaper) were duplicated in the output and had incorrect lambda nesting, causing compilation errors.


---


## v0.8.2 - AI Assistant & Secure API

**Release Date:** December 26, 2025

### 🎉 New Features
- **AI-Powered Dashboard Assistant**: A new AI-driven design assistant that can generate entire dashboards or individual widgets from simple text prompts (e.g., "Make a beautiful weather dashboard with large bold text").
- **Multi-Provider AI Support**: Seamlessly switch between Google Gemini, OpenAI, and OpenRouter.
- **Dynamic Model Discovery**: Real-time fetching and filtering of available models from AI providers with custom model filters.
- **Secure Local-Only API Storage**: AI API keys are stored exclusively in your browser's `localStorage`. They are never included in exported JSON files or sent to the Home Assistant backend, ensuring your credentials stay private.
- **Hyper-Strict AI Compliance**: Engineered system prompts with negative constraints and literal-text handling to ensure the AI follows your instructions perfectly.
- **Bespoke Architect Design Rules**: The AI now follows professional design principles, using `rounded_rect` containers and visual hierarchy for premium-looking dashboards.
- **WiFi Signal Strength Widget**: New drag-and-drop widget displaying WiFi signal strength using MDI icons. Shows dynamic icon based on signal level (Excellent ≥-50dB, Good ≥-60dB, Fair ≥-75dB, Weak ≥-100dB) with optional dBm value. Uses ESPHome's built-in `wifi_signal` sensor platform.
- **On Device Sensors Category**: New widget category consolidating device-related widgets:
  - **Battery Widget** (moved from Core Widgets)
  - **WiFi Signal Widget** (moved from Core Widgets)
  - **Temperature Widget (NEW)**: Displays on-device SHT4x temperature sensor or Home Assistant entity with dynamic thermometer icons (Cold/Normal/Hot).
  - **Humidity Widget (NEW)**: Displays on-device SHT4x humidity sensor or Home Assistant entity with dynamic water-drop icons (Low/Normal/High).
- **Live Sensor Preview**: Battery, WiFi, Temperature, and Humidity widgets now show actual sensor values in the canvas preview when configured with a Home Assistant entity.
- **Quick Widget Search (Shift+Space)**: New command palette for rapidly adding widgets. Press Shift+Space to open a searchable list of all widgets with keyboard navigation (↑↓ to select, Enter to add, Escape to close). Dynamically discovers all widgets from the palette.
- **Optional Diacritic Font Support**: Added support for extended Latin characters (ľ, š, č, ť, ž, etc.) via the `GF_Latin_Core` glyphset. This can be enabled per-device in the Device Settings to support international characters while keeping firmware size small for users who don't need them.
- **Inverted Colors Support for Recipes**: Hardware recipes now support an `# Inverted: true` metadata comment to automatically swap black and white colors for e-paper displays with reversed color mapping.
- **Manual Color Inversion Toggle**: Added a new "Inverted Colors" checkbox in the Device Settings modal, allowing users to manually override color mapping for e-paper displays that appear inverted on-device.
- **Improved Hardware Recipe Parser**: The recipe parser now extracts more metadata, including the inverted flag, ensuring better "out-of-the-box" compatibility for new displays.


### 🐛 Bug Fixes
- **LCD YAML Generation**: Fixed critical issues where E-ink specific rendering code (dithering, inverted colors) was incorrectly applied to LCD devices, causing visual artifacts and black screens.
- **Package Standardization**: Standardized YAML output for "untested" package-based devices. Now, imported hardware packages automatically have conflicting system keys (`esphome`, `wifi`, `api`, etc.) commented out, ensuring a clean "partial YAML" that pastes perfectly without duplicate header errors.
- **Battery Widget Sensor Bug**: Fixed issue where the Battery Entity ID field was not generating the required Home Assistant sensor declaration, causing "Couldn't find ID" errors when compiling in ESPHome.
- **Theme Persistence**: Fixed Light Mode not persisting after page refresh; the theme preference now correctly loads from localStorage on startup.
- **Touchpad Gesture Behavior**: Improved canvas interaction for macOS trackpads. Two-finger scroll now pans the canvas, while pinch-to-zoom and Ctrl+scroll zoom in/out, matching standard design tools like draw.io.
- **LVGL Slider & Light Support**: Fixed issue #87 where light entities could not be selected for sliders, buttons, and switches. Expanded the entity picker to include `light`, `fan`, `cover`, and other domains. Updated the slider to generate brightness control and buttons/switches to use `homeassistant.toggle` for seamless light interaction.
- **M5Paper Color Inversion**: Fixed an issue where "Dark Mode" and "Light Mode" were inverted on M5Paper devices by correctly enabling the `inverted_colors` flag in the hardware profile.
- **Icon Browser & Previews**: Fixed critical mismatch in the icon browser where the previewed icon did not match the file name (e.g., "account" showed a completely different icon). Also fixed rendering for extended Material Design Icons by correctly handling 5-digit hex codes.
- **Orientation-Aware Rotation & Touch Calibration**: Fixed issue where devices with native portrait orientation (like M5Paper) ignored the "Orientation" setting in the generated YAML. The Designer now automatically calculates the correct `rotation` value and swaps touchscreen `calibration` coordinates based on whether the device is natively portrait or landscape.

---

## v0.8.1 - Standalone Mode & LVGL Grid

**Release Date:** December 22, 2025

### 🎉 New Features
- **Standalone & Offline Mode**: The Designer can now be used completely offline or deployed to static hosting platforms like GitHub Pages.
- **Externally Hosted HA Connection**: Users can now manually configure a Home Assistant URL and Long-Lived Access Token (LLAT) in Editor Preferences. This enables the GitHub-hosted or externally deployed versions of the editor to connect to local HA instances for fetching entities and managing layouts without needing the integration installed.
- **Import/Export Projects**: Added a visible "Import Project" button to the sidebar to complement the "Save Project" button. This enables a complete offline workflow where you can save and load your dashboard designs as local JSON files.
- **GitHub Pages Deployment**: A standalone version of the designer is now available at [koosoli.github.io/ESPHomeDesigner/](https://koosoli.github.io/ESPHomeDesigner/).
- **LVGL Grid Support (Phase 1)**: Initial support for LVGL grid layouts on a per-page basis using the `layout: NxM` shorthand.
- **Bidirectional Grid Sync**: A seamless workflow where dragging or resizing widgets on the canvas auto-detects their grid cell, row, and column span.
- **Snap-to-Grid**: Widgets now intelligently snap to grid boundaries during drag and drop for pixel-perfect alignment.
- **Auto-Positioning for All Widgets**: Both LVGL and non-LVGL widgets (Text, Icons, Shapes) now support grid-based positioning. For non-LVGL widgets, the Designer automatically calculates the required absolute X/Y coordinates based on their grid cell.
- **Grid Visualization Overlay**: Added a visual dashed grid overlay with cell coordinate labels (`0,0`, `0,1`, etc.) that automatically adapts to dark/light mode for easier layout design.
- **Smart YAML Export**: 
  - Generates clean `layout: NxM` definitions for pages.
  - Includes `grid_cell_*` properties for LVGL widgets.
  - Automatically omits redundant `x:` and `y:` coordinates when native grid positioning is in use.
- **Round-Trip Import**: Full support for importing grid layouts and cell properties from existing YAML files.

### 🐛 Bug Fixes
- **Display Refresh Loop**: Fixed an issue where the display auto-refresh loop would terminate permanently if time synchronization failed momentarily during the update cycle.
- **YAML Generation**: Fixed a bug where the `text_sensor:` key was duplicated in the generated YAML when using both Home Assistant text sensors and complex widgets (Quotes, Weather Forecast, or Calendar).
- **reTerminal Battery Calibration**: Fixed an issue where the `battery_voltage` sensor incorrectly included a calibration filter, causing it to always display 100%. Raw voltage is now correctly reported in Volts with proper Home Assistant metadata.
- **Missing Glyphs**: Fixed missing unit characters (μ, ³, °, etc.) in generated fonts by explicitly including extended glyphs.

---

## v0.8.0 - Enhanced UI & Modular Profiles

**Release Date:** December 20, 2025

### 🎉 New Features
- **Modern Canvas Interaction**: Complete overhaul of canvas navigation. Now you can use the mouse wheel to zoom into the canvas or drag-move the canvas with the middle mouse button.
- **Drag & Drop Workflow**: Widgets in the sidebar can now be dragged directly onto the canvas for intuitive placement, in addition to being clickable.
- **RGB Color Picker**: Added a full RGB color picker for LVGL widgets, allowing for more precise UI design.
- **Interactive Touch Icons**: The `touch_area` widget now supports dual-state icons (Normal/Pressed). This allows for professional-looking buttons on non-LVGL displays that provide visual feedback when touched.
- **Touch Area Migration**: The `touch_area` widget has been migrated to the modern Feature Registry system, fixing console warnings and improving performance.
- **Advanced Icon Pickers**: A completely refactored icon selection UI featuring a quick-search visual dropdown and a full modal browser for the entire Material Design Icons library.
- **High-Fidelity Canvas Feedback**: Added color accuracy to the canvas preview and an interactive hover effect. Hovering over a touch area now simulates the "pressed" state, allowing you to preview interactions instantly.
- **Border Styling**: Added the possibility to apply border colors for squares and circles.
- **Hardware Recipes & Templates**:
    - **Dynamic Discovery**: Drop a YAML file into `frontend/hardware/` and it will automatically appear in the device selector.
    - **Dynamic Import (GUI)**: Click **"Import Recipe"** in the Device Settings to upload a new template directly through the browser.
    - **Offline Manual Import**: Added support for parsing YAML recipes directly in the browser when running offline.
- **Modular Hardware Profiles**: Implemented support for loading hardware profiles from plain YAML files (package-based). This enables seamless profile sharing with the [esphome-modular-lvgl-buttons](https://github.com/agillis/esphome-modular-lvgl-buttons/) project. Big thank you to [agillis](https://github.com/agillis/) for these awesome profiles!

### 🐛 Bug Fixes
- **Date/Time Widget Improvements**:
    - Fixed an issue where the widget would occasionally insert duplicate code into the YAML.
    - Fixed font size property persistence so settings are correctly restored when updating layout from YAML.
- **Fullscreen YAML Editor**: Fixed a bug where one could only click once on the full screen YAML and never again after opening it.
- **Icon Rendering**: Fixed a bug where gray icons would result in solid squares when flashed on device due to dithering logic issues.
- **Alignment Fixes**: Removed the legacy 15px vertical offset for shapes to ensure they render exactly where they appear on the canvas.
- **Calendar Widget**: Various improvements to rendering, performance, and stability.
- **Major Energy Management Overhaul**: Complete logic rewrite for better reliability and clarity.
    - **Silent Hours (No Refresh Window)**: Added ability to disable display updates during specific hours to prevent ghosting or noise at night. Integrated with both Standard and Ultra Eco modes.
    - **Global Interval Fix**: Fixed a bug where the refresh interval was incorrectly exported to YAML.
- **M5Stack CoreInk Refinements**:
    - Fixed **Dark Mode** rendering issues where the background remained white instead of black.
    - Improved battery calibration and button logic responsiveness.
- **Rounded Rectangles**: Improved the rendering of rounded rectangles to look much nicer when flashed to a physical device.
- **TRMNL DIY Battery**: Fixed incorrect battery level and voltage readings for the TRMNL DIY (ESP32-S3) hardware by implementing a proper 12-point calibration curve.

### 🔧 Architectural Changes
- **Live YAML Generation**: Removed the "Generate YAML" button as it has become redundant; YAML is now generated on the fly as you design.
- **Optimized Device List**: Cleaned up the device list, regrouped by manufacturer with clearer device names.
- **Efficient YAML Output**: Improved the gray dither logic to produce significantly less YAML code by using C++ `for` loops.
- **Mobile Support**: Added support for smaller screens like mobile phones, with a more responsive UI (Note: drag and drop behavior on touch devices is not yet fully tested).
- **Hybrid Profile Solution**: Implemented a hybrid loading system. While new LCD profiles are fetched as YAML packages, legacy E-Ink profiles (M5Paper, CoreInk, TRMNL) are still served via built-in JS definitions.
- **Online/Standalone Warning**: Note that due to browser security restrictions, package-based profiles require the application to be served via a web server (like Home Assistant) and will show a warning in the standalone offline version (`file://`).

---

## v0.7.4 - Trmnl DIY Support

**Release Date:** December 17, 2025

### 🚀 New Hardware Support
- **Seeed Studio Trmnl DIY Kit (ESP32-S3)**: Added full support for the Trmnl DIY Kit, including:
  - Correct pin mappings for display, buttons, battery, and SPI.
  - Support for `7.50inv2p` display model with partial update capabilities.
  - Automatic `inverted` color handling to fix "Dark Mode" logic (Hardware White is treated as logical White).

### 🐛 Bug Fixes
- **QR Code Widget**: Fixed a regression where the `qr_code` component definition was missing from the generated YAML, causing "Couldn't find ID" errors.

---

## v0.7.3 - Hotfix

**Release Date:** December 17, 2025

### 🐛 Bug Fixes
- **Duplicate Weather Entity**: Fixed a bug where using a weather entity in both a generic widget (like `sensor_text`) and a dedicated weather widget caused duplicate entity definitions in the generated YAML, leading to compilation errors.
- **Input Text Filtering**: Fixed entity picker filtering to allow selecting `input_text` entities in widgets like Sensor Text. Also improved the entity picker to search across all supported domains including `input_select`, `switch`, `input_boolean`, etc.

---

## v0.7.2 - Hotfix

**Release Date:** December 15, 2025

### 🐛 Bug Fixes
- **ESP32-S3 PSRAM Mode**: Fixed compilation Error "ESP32S3 requires PSRAM mode selection" by explicitly setting `psram_mode: octal` for reTerminal E1001/E1002.
- **Graph Sensor ID Mismatch**: Fixed "Couldn't find ID" error for graph widgets by ensuring the graph's internal sensor reference matches the correctly sanitized sensor ID (e.g. `sensor_my_entity`).
- **OOM Compilation Support**: Added a helpful tip in the generated YAML setup instructions suggesting `compile_process_limit: 1` if users encounter Out-of-Memory (OOM) errors during compilation on ESP32-S3.

---

## v0.7.1 - Hotfix

**Release Date:** December 15, 2025

### 🐛 Bug Fixes
- **Inverted Options**: Fixed an issue where the `COLOR_WHITE` and `COLOR_BLACK` definitions were inverted for the `reTerminal E1001` device.
- **Ghost Code**: Cleaned up the generated YAML to remove unused helper functions (like `get_calendar_matrix` and `apply_grey_dither_mask`) when they are not needed.
- **Glyph Tracker Regression**: Fixed a critical regression in the glyph tracker.
- **Hide Unit Persistence**: Fixed a bug where "Hide Default Units" was not persistent when using "Update Layout from YAML".

### 📱 Experimental Hardware
- **M5Paper & M5Stack CoreInk**: This build includes experimental support for M5Paper and M5Stack CoreInk. These features are from the development branch and require testing.
- **reTerminal E1001 Model Update**: Default model updated from `7.50inv2` to `7.50inv2p`. This change is untested. If it does not work, please manually revert the model in your YAML back to `7.50inv2`.

---

## v0.7.0 - Experimental LVGL & Enhancements

**Release Date:** December 14, 2025

### 🔧 Architecture Changes
- **Decoupled Hardware Profile**: Hardware definition logic has been moved out of `yaml_export.js` into dedicated `hardware_generators.js` and `devices.js` files, significantly improving code maintainability and safety.

### 🚀 Rebranding & Scope Expansion
- **Project Renamed to ESPHome Designer**: Refleting our broader mission to support all display types.
- **Support for More Displays**: We are moving beyond just e-ink to support OLED, LCD, and Touch displays.
- **New Repository**: `https://github.com/koosoli/ESPHomeDesigner`

### 🎉 New Features
- **Dark Mode Option**: Added a toggle in Device Settings to enable global "Dark Mode" (black background with white widgets). Individual pages can override this setting via Page Settings with options: "Use Global Setting", "Light Mode", or "Dark Mode".
- **Gray Color Support**: Full support for "Gray" color has been implemented for icons, text, and all other widgets.
- **Sensor Text Intelligence**:
  - **Smart Type Handling**: Decoupled text vs. numeric sensor registration. "Is Text Sensor" now forces a unique text-based internal ID, fixing "NaN" issues when an entity is previously registered as a number (e.g. in a graph).
  - **Default Precision**: Sensor text widgets now default to 2 decimal places (e.g. `23.50`) instead of raw float output, improving default legibility. Precision can still be set to `-1` for raw output.

- **Experimental LVGL Widgets**: Added experimental support for LVGL `button`, `arc`, `chart` (Line/Bar), `slider`, `bar`, `image`, and `qrcode` widgets.
- **Text Sensor Enhancements**:
  - **Dual Sensor Support**: Now supports displaying two sensors in one widget.
  - **Prefix & Suffix**: Added settings for custom prefix and suffix text.
  - **Hide Default Unit**: Added checkbox to suppress the default unit, allowing for cleaner custom formatting with Postfix.
- **Time & Date Widget**: Added more formatting options for date display.

#### Calendar Widget
- **Rendering Improvements**: Significant improvements to calendar widget rendering and reliability.
- **Full-Featured Calendar**: Monthly view with upcoming events list
- **Customizable**: Configurable font sizes for all elements (Date, Day, Grid, Events), plus colors and border settings
- **Smart Setup**: Built-in Python helper script downloader simplifies Home Assistant integration
- **Accurate Preview**: What you see is what you get - preview reflects real dates and layout

### 📱 New Hardware Support
- **Waveshare PhotoPainter (ESP32-S3)**: Full support for the Waveshare ESP32-S3 PhotoPainter (7-Color E-Ink).
- **Experimental Support**: Added support for more devices. Note that devices not yet fully verified are explicitly marked as "untested" in the device selector.


### 🐛 Bug Fixes
- **Feature Forecast**: Resolved bug fixes for the weather forecast feature; it should now work correctly.
- **Graph Widget**: Fixed issue where graphs would intersect/overlap incorrectly.
- **Date/Time Alignment Persistence**: Fixed an issue where alignment settings were lost when updating layout from YAML.
- **Duplicate Config Fields**: Resolved an issue where duplicate "Postfix" fields appeared in the Sensor Text widget properties.
- **Disappearing Sensor**: Addressed a root cause where manual YAML editing (required due to UI issues) caused sensor configuration loss.


---

## v0.6.3 - Entity Handling Improvements

**Release Date:** December 7, 2025

### 🐛 Bug Fixes

#### Sensor Text Widget
- **Graceful Empty Entity Handling**: Fixed compilation error when user creates a sensor_text widget without selecting an entity. Now displays "--" placeholder instead of generating invalid `id().state` code
- **Auto Sensor Import**: Sensor text and progress bar widgets using Home Assistant entities (`sensor.*`, `text_sensor.*`) now automatically generate the required `platform: homeassistant` sensor imports in YAML

#### Duplicate Sensor Prevention
- **Shared Sensor Deduplication**: Fixed potential duplicate sensor definitions when the same entity is used across multiple widget types (e.g., using the same sensor in both a graph and sensor_text widget). All numeric sensors now share a single tracking set to prevent duplicates

---


## v0.6.2 - Rendering Fixes

**Release Date:** December 6, 2025

### 🐛 Bug Fixes

#### Rectangle Widget
- **Y Offset Alignment**: Added `RECT_Y_OFFSET` constant (-15px) to align rectangle widget rendering on e-ink display with canvas preview

#### Graph Widget
- **Min/Max Value Regression**: Fixed regression where `min_value` and `max_value` were not being output to the graph component YAML declaration, causing graphs to display empty

---

## v0.6.1

### 🐛 Bug Fixes

#### Quote/RSS Widget
- **Quote & Author Swapped**: Fixed RSS parsing where quote text and author name were incorrectly swapped for BrainyQuote feeds
- **Auto Text Scaling**: Added automatic font scaling for quotes - text now shrinks (100% → 75% → 50%) to fit within widget bounds

#### YAML Generation
- **Duplicate Layouts**: Fixed "Update Layout from YAML" creating duplicate layouts and resetting device model to E1001
- **Cleaned Up HTTP Comments**: Removed confusing duplicate `http_request` comment block from generated YAML

#### Display Rendering
- **Text Vertical Alignment**: Added 11px vertical offset for text widgets to better match canvas preview with actual e-ink display positioning
  - *Note: This adjustment compensates for font baseline differences between browser and ESPHome rendering*

#### Graph Widget
- **Grid Lines**: Fixed X and Y grid lines not generating correctly in YAML output

### ✨ Improvements

#### Online Image Widget
- **Binary Mode for Monochrome**: Remote images now default to BINARY type for monochrome displays (E1001, TRMNL) for sharper rendering
- **Auto Type Detection**: Image type automatically selected based on device (BINARY for monochrome, RGB565 for color E1002)

#### Rounded Rectangle Widget
- **New Widget**: Full support for rounded rectangles with configurable corner radius
- **Border Support**: Optional border with customizable thickness

---

## v0.6.0
> [!NOTE]
> This is a **major release** with significant architectural improvements, new widgets, and hardware support.

### 🎉 Major Features

#### Layout Manager
- **Multi-Device Support**: Manage multiple e-ink devices from a single interface
- **Export/Import Layouts**: Save and share your dashboard designs as files
- Switch between devices seamlessly with persistent configurations

#### Completely Redesigned UI
- **Fresh Modern Interface**: Complete visual overhaul - easier on the eyes
- **Light Mode**: New light theme for users who prefer a brighter workspace
- **Canvas Controls**: Zoom in/out and recenter the canvas for precise editing

#### Template-Free Workflow
- **No More Templates Required**: The generator now produces a complete, standalone configuration
- Simply paste the generated YAML below ESPHome's auto-generated sections
- Makes setup child's play - no manual template merging needed

#### New Widgets
- **Quote / RSS Feed Widget**: Display inspirational quotes or RSS feed content
  - RSS feed URL configuration with popular default (BrainyQuote)
  - Optional author display, random quote selection
  - Configurable refresh interval (15min to 24h)
  - Word wrap, italic styling, full font customization
  - **Zero configuration**: No `configuration.yaml` entries or Home Assistant sensors needed
  - *Note: Functional but formatting not fully respected - unfinished feature*

- **QR Code Widget**: Generate QR codes directly on your e-ink display
  - Configurable content string (URLs, text, etc.)
  - Four error correction levels (LOW, MEDIUM, QUARTILE, HIGH)
  - Auto-scaling to fit widget dimensions

- **Weather Forecast Widget**: Multi-day weather forecast display
  - Shows upcoming weather conditions with dynamic icons
  - Integrates with Home Assistant weather entities
  - *Note: Requires a weather entity configured in Home Assistant*

- **Vertical Lines**: Draw vertical lines (untested)

### 📱 New Hardware Support

#### reTerminal E1002 - Color E-Ink Display
- **Full color e-paper support** for the Seeed Studio reTerminal E1002
- Color rendering for all widgets and shapes
- Same easy workflow as E1001 - just select your device type


#### trmnl (ESP32-C3)
- **New device support**: TRMNL e-paper hardware now fully supported
- Dedicated hardware template (`trmnl_lambda.yaml`)
- Correct SPI and battery sensor configurations
- Proper busy_pin logic

> [!WARNING]
> **Experimental Feature**: Online Image (remote URLs) widget is an initial implementation and may be buggy or broken. Use at your own discretion.

### 🔧 Architecture Overhaul
- **Modular Frontend Architecture**: Complete refactor of the monolithic `editor.js` (276KB) into a modular system:
  - `yaml_export.js` - Clean YAML generation with per-widget handling
  - `yaml_import.js` - Robust YAML parsing and import
  - `canvas.js` - Canvas rendering and interaction
  - `state.js` - Centralized application state management
  - `properties.js` - Widget property panel generation
  - `widget_factory.js` - Standardized widget creation
  - `keyboard.js` - Keyboard shortcuts handling
  - Improved maintainability and extensibility

- **Feature-Based Widget System**: Backend now uses a `features/` directory with:
  - Per-widget `schema.json` for property definitions
  - Per-widget `render.js` for canvas preview rendering
  - Standardized widget registration and discovery

### 🐛 Bug Fixes

#### Widget Rendering
- **Line Widget**: Fixed length synchronization between canvas preview and e-ink display
- **Line Widget**: Fixed drag resize functionality
- **Rectangle Border**: Corrected `border-box` positioning discrepancy between canvas and e-ink
- **Weather Forecast**: Fixed positioning at correct X/Y coordinates
- **Graph Grid Lines**: Fixed `x_grid` values not generating correctly in YAML

#### Sensor & Entity Handling
- **Sensor ID Generation**: Fixed sensor ID stripping for `battery_icon`, `sensor_text`, `progress_bar`, and `weather_icon` widgets
  - Correctly strips `sensor.` and `weather.` prefixes when generating ESPHome `id()` references
- **Quote/RSS Widget**: Added WiFi connection check and startup delay for reliable fetching

#### Font System
- **Italic Font Support**: Fixed italic fonts not being correctly referenced in lambda code
  - Text widgets now use `_italic` suffix (e.g., `font_roboto_900_100_italic`) when italic is enabled
  - Quote RSS widget correctly references italic font IDs
- **Font Validation**: Fixed `font_roboto_400_24` validation warning in battery_icon widget
- **Italic Persistence**: Fixed `italic` property not persisting for `sensor_text` and `datetime` widgets after YAML update

#### Device Settings & Persistence
- **Device Name Sync**: Fixed device name changes not persisting in Device Settings modal and Manage Layouts list
- **Device Settings Modal**: Fixed settings reverting upon re-opening

#### YAML Generation
- **Duplicate SPI Removal**: Fixed duplicate SPI configuration in generated YAML
- **YAML Duplicate Fixes**: Various fixes for duplicate section generation

### 🔄 Technical Improvements
- **Frontend Feature Registry**: Dynamic widget type discovery and registration
- **Schema-Driven Properties**: Widget properties now defined in JSON schemas
- **Improved Error Handling**: Better error messages and AppState.notify integration
- **Code Organization**: Clear separation between core, UI, IO, and utility modules

---

## v0.5.0

> [!WARNING]
> **BREAKING CHANGE**: This version requires the **latest hardware template**.
> Global settings have been moved to the template.
> You **MUST** update your `reterminal_e1001_lambda.yaml` (or equivalent) to the latest version for these features to work.
> Old templates will cause compilation errors or ignore your power settings.

### 🎉 Major Features
- **Page Management**:
  - **Drag & Drop Reordering**: You can now reorder pages in the sidebar by dragging them.
  - **Persistent Page Names**: Custom page names are now saved in the YAML and restored upon import.
- **New Power Management UI**: Complete redesign with radio buttons for clear, mutually exclusive power modes:
  - **Standard (Always On)** - Auto-refresh based on page intervals
  - **Night Mode** - Screen off during specified hours for energy savings
  - **Manual Refresh Only** - Updates only via button or Home Assistant trigger
  - **Deep Sleep (Battery Saver)** - Device offline between updates for maximum power savings
- **Deep Sleep Support**: Full ESPHome deep sleep implementation with configurable intervals (default: 600s)
- **Smart Text Optimization**: Automatically strips unused characters from large static fonts to save massive amounts of RAM, preventing compilation crashes. Dynamic text (sensors) remains untouched.

### 🐛 Bug Fixes
#### Settings & Persistence
- **Device Settings Persistence**: Fixed all device settings (power mode, sleep times, deep sleep interval) not saving and jumping back to defaults on restart.
- **Page Refresh Rates**: Fixed page refresh intervals not persisting and resetting when updating layout from YAML.
- **Power Management Settings**: Fixed settings resetting to "Standard" mode when updating layout from YAML.

#### YAML Generation
- **Script Generation**: Fixed wrong script generated for deep sleep mode (was using auto-refresh loop instead of simple sleep).
- **Display Lambda**: Fixed missing COLOR_ON/COLOR_OFF definitions causing compilation errors.
- **Sensor Text Widget**: Fixed value-only mode (no label) missing critical YAML sections (button:, font:, script:, globals:).
- **Refresh Intervals**: Fixed page refresh intervals < 60 seconds being filtered out.
- **No-Refresh Window**: Fixed invalid conditions generated when window not configured (0-0 case).
- **Manual Refresh Mode**: Fixed manual refresh showing unnecessary page interval logic (now minimal script only).

#### Widget Improvements
- **Line Widget**: Fixed lines not rendering straight on e-paper (right side was ~10px lower).
- **Image Widget**: Fixed missing path property in UI and drag functionality not working.
- **Battery Icon**: Fixed percentage text not centering underneath battery symbol when icon is enlarged.
- **Sensor Text Alignment**: Added separate alignment options for label and value (e.g., label left, value right) with WYSIWYG canvas preview.
- **DateTime Widget**: Verified alignment options working correctly.
- **Progress Bar Widget**: Verified alignment options working correctly.

#### Font System
- **Google Fonts**: Fonts now work correctly - all fonts pre-defined in template (Template-Only approach).
- **Font Selection**: Verified font dropdown shows all 15 supported families.
- **Font Persistence**: Fixed font selections (Family, Weight, Size) for Sensor Text widgets not persisting through YAML updates.


### 🔧 Technical Improvements
- **Frontend/Backend Parity**: Both generators now produce identical output.
- **Robust Import**: `applyImportedLayout()` now merges settings instead of overwriting, preserving user preferences.
- **Smart Parsing**: The YAML parser now intelligently extracts page names and refresh rates from comments and code logic.
- **YAML Highlighting**: Selecting a widget on the canvas now automatically highlights its corresponding YAML definition in the snippet box.


## v0.4.6.1
- **Critical Bug Fix**: Fixed JavaScript error `ReferenceError: isTextSensor is not defined` in snippet generator that prevented YAML generation and caused compilation errors.


## v0.4.6
- **Number Sensor Fix**: Fixed a bug where number sensors were interpreted as text sensors, causing them to show gibberish or fail to compile.
- **Graph Improvements**: X and Y information are now automatically added if the user adds min/max information or time information in the widget settings.
- **Graph Persistence**: Fixed a bug where graph minimum/maximum values and duration were not saving to YAML. These values would reset when "Update Layout from YAML" was pressed.
- **Known Bugs**:
    - Puppet widget is still unstable.
    - Straight lines are not perfectly straight.
    - Visible conditions are not fully tested and might fail to compile.


## v0.4.5
- **Min/Max Visibility**: Added support for numeric range conditions (Min/Max) with AND/OR logic for widget visibility. Perfect for progress bars (e.g., `0 < value < 100`).
- **Boot Stability**: Updated the default hardware template (`reterminal_e1001_lambda.yaml`) to remove the immediate display update from `on_boot`, preventing boot loops on heavy layouts.
- **WiFi Sensor**: Added `wifi_signal_db` to the default hardware template (diagnostic entity).
- **GUI Updates**: Added "Update Layout from YAML" button to the editor for easier round-trip editing.
- **Graph Widget Fixes**: Fixed persistence of `min_value`, `max_value`, `min_range`, and `max_range` properties.
- **Editor Fixes**: Fixed CSS regression and ensured fullscreen editing works correctly.
- **Text Sensor Persistence**: Fixed "Is Text Sensor?" checkbox state not saving to backend.
- **Puppet Widget Fixes**: Fixed Puppet/Online Image widgets not saving to backend, added automatic `http_request` dependency, and fixed URL corruption in parser.
- **Puppet Stability**: Added `on_error` handler and conditional page updates to prevent crashes and unnecessary refreshes.
- **Conditional Visibility**: Fixed C++ compilation error when using conditional visibility with numeric sensors (removed invalid `atof` check).

## v0.4.4
- **Text Sensor Support**: Added "Is Text Sensor?" checkbox to `sensor_text` widget to correctly format string states (fixes `NaN` issue).
- **Entity Picker Limit**: Increased the entity fetch limit from 1000 to 5000 to support larger Home Assistant installations.
- **Default Template Fixes**: Updated `reterminal_e1001_lambda.yaml` to match default dashboard entity IDs (`sensor_reterminal_e1001_...`) and device name.
- **Canvas Responsiveness**: Improved canvas scaling and centering on smaller screens.

## v0.4.3
### New Features
-   **Copy/Paste**: Added support for copying and pasting widgets using `Ctrl+C` and `Ctrl+V`. Pasted widgets are automatically offset for visibility.
-   **Undo/Redo**: Implemented Undo (`Ctrl+Z`) and Redo (`Ctrl+Y` or `Ctrl+Shift+Z`) functionality for widget operations (move, resize, add, delete, property changes).
-   **Fullscreen YAML Editing**: The fullscreen YAML view is now editable and includes an "Update Layout from YAML" button to apply changes directly.
-   **Sidebar Visibility Control**: Added a configuration option to show or hide the integration in the Home Assistant sidebar.
-   **Canvas Responsiveness**: The editor canvas now dynamically scales and centers to fit smaller screens, ensuring the entire layout is visible without scrolling.

### Bug Fixes
-   **Ghost Pages**: Fixed an issue where deleted pages would persist in the generated YAML snippet.
-   **Undo/Redo Stability**: Fixed issues where Undo would jump back multiple steps or become unresponsive due to duplicate history states or missing drag state capture.
-   **Graph Persistence**: Fixed `Continuous: true` setting not saving correctly.
-   **Page Jump**: Fixed editor jumping to the first page after layout updates.
-   **Weather Text Color**: Fixed weather widget text color reverting to black.

## v0.4.2
-   **Graph Widget**: Added automated sensor info (min/max) based on Home Assistant entity attributes.
-   **Circle Widget**: Enforced 1:1 aspect ratio during resize to prevent distortion.
-   **Manifest**: Version bump.
