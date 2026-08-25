/**
 * @file yaml_merger.js
 * @description Pure utility functions for merging ESPHome YAML sections and applying hardware overrides.
 */

import { Logger } from '../../utils/logger.js';

// Matches a YAML block scalar header value (|, |-, >, >2+, ...). Keys carrying
// one own every following deeper-indented line, including blank lines and lines
// that look like YAML keys, so they must never be treated as insertion anchors.
const BLOCK_SCALAR_VALUE = /^[|>][0-9+-]*$/;

/**
 * @param {string} line
 * @returns {number}
 */
function indentWidth(line) {
    return (line.match(/^[ \t]*/) || [""])[0].length;
}

/**
 * Fix #485: Locates the first `display:` list item structurally instead of by
 * text matching. Regex anchors used to stop at the first blank line, which lands
 * inside the `lambda: |-` block scalar and breaks the generated YAML.
 * @param {string[]} lines
 * @returns {{ propIndent: string, rotationLine: number, insertLine: number } | null}
 */
function locateDisplayItem(lines) {
    const sectionStart = lines.findIndex((l) => /^display:[ \t]*(#.*)?\r?$/.test(l));
    if (sectionStart === -1) return null;

    // The section ends at the next non-blank line back at column 0.
    let sectionEnd = lines.length;
    for (let i = sectionStart + 1; i < lines.length; i++) {
        if (lines[i].trim() === "") continue;
        if (indentWidth(lines[i]) === 0) { sectionEnd = i; break; }
    }

    let itemStart = -1;
    let itemIndent = 0;
    for (let i = sectionStart + 1; i < sectionEnd; i++) {
        const itemMatch = lines[i].match(/^([ \t]+)-[ \t]+\S/);
        if (itemMatch) { itemStart = i; itemIndent = itemMatch[1].length; break; }
    }
    if (itemStart === -1) return null;

    // Properties of the item are the lines indented deeper than the dash.
    let propWidth = -1;
    for (let i = itemStart + 1; i < sectionEnd; i++) {
        if (lines[i].trim() === "") continue;
        if (indentWidth(lines[i]) <= itemIndent) break;
        propWidth = indentWidth(lines[i]);
        break;
    }
    if (propWidth === -1) propWidth = itemIndent + 2;

    let rotationLine = -1;
    let insertLine = -1;
    let lastPropLine = itemStart;

    for (let i = itemStart + 1; i < sectionEnd; i++) {
        const line = lines[i];
        if (line.trim() === "") continue;
        if (indentWidth(line) <= itemIndent) break;
        if (indentWidth(line) !== propWidth) { lastPropLine = i; continue; }

        const keyMatch = line.match(/^[ \t]*([A-Za-z0-9_]+):[ \t]*(.*)$/);
        if (!keyMatch) { lastPropLine = i; continue; }

        if (keyMatch[1] === "rotation") { rotationLine = i; break; }

        if (BLOCK_SCALAR_VALUE.test(keyMatch[2].trim())) {
            // Keep rotation above the block scalar and skip its body entirely.
            if (insertLine === -1) insertLine = i;
            let bodyEnd = i + 1;
            while (bodyEnd < sectionEnd && (lines[bodyEnd].trim() === "" || indentWidth(lines[bodyEnd]) > propWidth)) {
                bodyEnd += 1;
            }
            lastPropLine = bodyEnd - 1;
            i = bodyEnd - 1;
            continue;
        }

        lastPropLine = i;
    }

    return {
        propIndent: " ".repeat(propWidth),
        rotationLine,
        insertLine: insertLine === -1 ? lastPropLine + 1 : insertLine
    };
}

/**
 * Reads the rotation already declared by the hardware recipe, ignoring any
 * `rotation:` text that merely appears inside a lambda body.
 * @param {string} yaml
 * @returns {number}
 */
function getDisplayRotation(yaml) {
    const lines = yaml.split(/\r?\n/);
    const item = locateDisplayItem(lines);
    if (!item || item.rotationLine === -1) return 0;
    const valueMatch = lines[item.rotationLine].match(/:[ \t]*(\d+)/);
    return valueMatch ? parseInt(valueMatch[1], 10) : 0;
}

/**
 * @param {string} yaml
 * @param {number} rotation
 * @returns {string}
 */
function setDisplayRotation(yaml, rotation) {
    const eol = yaml.includes("\r\n") ? "\r\n" : "\n";
    const lines = yaml.split(/\r?\n/);
    const item = locateDisplayItem(lines);
    if (!item) return yaml;

    if (item.rotationLine !== -1) {
        // Keep any unit suffix the recipe uses (e.g. `rotation: 0°`).
        lines[item.rotationLine] = lines[item.rotationLine].replace(/^([ \t]*rotation:[ \t]*)\d+/, `$1${rotation}`);
    } else {
        lines.splice(item.insertLine, 0, `${item.propIndent}rotation: ${rotation}`);
    }

    return lines.join(eol);
}

/**
 * @param {string} yaml
 * @param {Record<string, any>} profile
 * @param {string} orientation
 * @param {boolean} [isLvgl=false]
 * @param {Record<string, any>} [layout={}]
 * @returns {string}
 */
export function applyPackageOverrides(yaml, profile, orientation, isLvgl = false, layout = {}) {
    if (isLvgl) {
        // Fix: ESPHome 2025.12.7 compatibility - LVGL cannot have auto_clear_enabled: true
        yaml = yaml.replace(/auto_clear_enabled:\s*true/g, "auto_clear_enabled: false");
    } else {
        // Fix #342: Strip LVGL-specific actions from non-LVGL projects.
        // Some hardware templates hardcode these in on_release: or similar triggers.

        // 1. Remove entire if: blocks that contain lvgl statements (more robust multiline matching)
        // Matches `- if:` followed by any lines indented more than the `- if:`, containing an lvgl action
        const lvglIfBlockRegex = /^(\s*)- if:\s*\n(?:\1 {2}.*\n)*?(?:\1 {2}.*lvgl\.(resume|is_paused|pause|widget\.redraw).*\n)(?:\1 {2}.*\n)*/gm;
        yaml = yaml.replace(lvglIfBlockRegex, "");

        // 2. Remove standalone lvgl statements (one-liners)
        const lvglStatementRegex = /^(\s*)- lvgl\.(resume|is_paused|pause|widget\.redraw):.*(?:\n\s+.*)*\n/gm;
        yaml = yaml.replace(lvglStatementRegex, "");

        // 3. Clean up empty on_release: blocks that might remain
        yaml = yaml.replace(/^\s*on_release:\s*\n(?=\s*(?:[a-z0-9_]+:|- [a-z]|$))/gm, "");
    }

    // Generic Rotation Logic for all package-based hardware
    if (profile.resolution) {
        const res = profile.resolution;
        const isNativePortrait = res.height > res.width;
        const isRequestedPortrait = orientation === 'portrait' || orientation === 'portrait_inverted';
        const isRequestedInverted = orientation === 'landscape_inverted' || orientation === 'portrait_inverted';
        const needsOrientationSwap = isNativePortrait !== isRequestedPortrait;

        // Detect the base rotation already present in the hardware YAML
        const baseRotation = getDisplayRotation(yaml);

        // Calculate the additional rotation needed on top of the base
        // Base rotation is the hardware's default (e.g. 180 for Guition jc4827w543)
        // We only need to add an offset when switching orientation or requesting inverted
        let rotationOffset = 0;
        if (needsOrientationSwap) rotationOffset += 90;
        if (isRequestedInverted) rotationOffset += 180;

        const rotation = (baseRotation + rotationOffset) % 360;

        Logger.log(`[Adapter] Orientation: ${orientation}, base rotation: ${baseRotation}, offset: ${rotationOffset}, final: ${rotation}`);

        // Issue #490: Since ESPHome 2026.4, a `rotation:` key in the display
        // section is rejected when LVGL is enabled ("not compatible with LVGL").
        // In LVGL mode orientation is applied through the lvgl: rotation option
        // instead, which also corrects touchscreen coordinates automatically.
        if (isLvgl) {
            Logger.log("[Adapter] LVGL rendering active: skipping display-level 'rotation:' injection");
        } else {
            // Apply rotation to YAML, including package templates that omit it by default.
            yaml = setDisplayRotation(yaml, rotation);
        }

        // Note: Do NOT swap width/height in the dimensions block.
        // The dimensions: block describes the physical panel hardware specs.
        // ESPHome's rotation: property handles logical canvas orientation.
        // Swapping dimensions conflicts with rotation (see GitHub issue #297).

        // Specific Fix for Waveshare 7" Hotspot Name
        if (profile.name && profile.name.toLowerCase().includes("waveshare touch lcd 7")) {
            const deviceName = (profile.name || "ESPHome-Device").replace(/["\\]/g, "").split(" ")[0];
            yaml = yaml.replace(/"Waveshare-7-Inch"/g, `"${deviceName}-Hotspot"`);
        }

        // Fix #129: Indentation-aware GT911 transform logic
        // Match any whitespace before id: my_touchscreen
        const idMatch = yaml.match(/^(\s*)id:\s*my_touchscreen/m);
        if (idMatch) {
            const indent = idMatch[1];
            let transform = "";
            // Note: GT911 on this panel often needs specific calibration/swaps matching the display rotation
            if (rotation === 0) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: false\n${indent}  mirror_y: false`;
            else if (rotation === 90) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: false\n${indent}  mirror_y: true`;
            else if (rotation === 180) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: true\n${indent}  mirror_y: true`;
            else if (rotation === 270) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: true\n${indent}  mirror_y: false`;

            if (transform) {
                // Remove existing transform if present to avoid duplication
                const hasTransform = new RegExp(`^${indent}transform:`, 'm').test(yaml);
                if (hasTransform) {
                    // Fix #319: Regex was too greedy and swallowed siblings like on_release if they shared the same indentation.
                    // We now strictly match only known transform sub-keys to prevent it from eating other blocks.
                    const oldTransformRegex = new RegExp(
                        `^${indent}transform:\\n(${indent}  (swap_xy|mirror_x|mirror_y):.*\\n?)+`, 'm'
                    );
                    if (oldTransformRegex.test(yaml)) {
                        yaml = yaml.replace(oldTransformRegex, `${indent}${transform}\n`);
                    }
                } else {
                    // Inject after ID
                    yaml = yaml.replace(idMatch[0], `${idMatch[0]}\n${indent}${transform}`);
                }
            }

            // Inject LVGL Dimming Wakeup Trigger
            if (isLvgl && layout.lcdEcoStrategy === 'dim_after_timeout') {
                // Check if on_release already exists to avoid duplication
                if (!yaml.includes("on_release:")) {
                    const wakeupTrigger = `\n${indent}on_release:\n${indent}  - if:\n${indent}      condition: lvgl.is_paused\n${indent}      then:\n${indent}        - lvgl.resume:\n${indent}        - lvgl.widget.redraw:\n${indent}        - light.turn_on: display_backlight`;

                    const tsBlockStart = yaml.search(/^touchscreen:/m);
                    if (tsBlockStart !== -1) {
                        const afterTsBlock = yaml.slice(tsBlockStart);
                        const nextKeyMatch = afterTsBlock.slice(12).match(/^\w/m);

                        if (nextKeyMatch) {
                            const nextKeyIndex = typeof nextKeyMatch.index === 'number' ? nextKeyMatch.index : 0;
                            const insertIdx = tsBlockStart + 12 + nextKeyIndex;
                            yaml = yaml.slice(0, insertIdx) + wakeupTrigger + "\n\n" + yaml.slice(insertIdx);
                        } else {
                            yaml = yaml.trimEnd() + wakeupTrigger + "\n";
                        }
                    }
                }
            }
        }
    }
    return yaml;
}

/**
 * Fix #218: Merges YAML sections to avoid duplicates like double sensor: blocks.
 * Sections like sensor:, binary_sensor:, text_sensor:, font:, etc. will be merged
 * if they appear in both the base YAML and the extra YAML.
 * @param {string} baseYaml - The base YAML content (e.g., hardware package)
 * @param {string} extraYaml - Additional YAML content to merge
 * @returns {string} Merged YAML content
 */
export function mergeYamlSections(baseYaml, extraYaml) {
    if (!extraYaml || extraYaml.trim() === '') return baseYaml;
    if (!baseYaml || baseYaml.trim() === '') return extraYaml;

    // Sections that should be merged (list entries under these keys)
    const mergeableSections = [
        'sensor:', 'binary_sensor:', 'text_sensor:', 'font:', 'image:',
        'output:', 'light:', 'switch:', 'button:', 'script:', 'globals:',
        'i2c:', 'spi:', 'external_components:', 'time:', 'interval:',
        // New sections added to prevent duplicates
        'fan:', 'cover:', 'climate:', 'number:', 'select:', 'datetime:',
        'lock:', 'alarm_control_panel:', 'siren:', 'media_player:'
    ];

    // Parse YAML into sections
    /**
     * @param {string} yaml
     * @returns {{ sections: Map<string, string[]>, nonSectionLines: string[] }}
     */
    const parseYamlSections = (yaml) => {
        /** @type {Map<string, string[]>} */
        const sections = new Map();
        const lines = yaml.split('\n');
        /** @type {string | null} */
        let currentSection = null;
        /** @type {string[]} */
        let currentContent = [];
        /** @type {string[]} */
        let nonSectionLines = [];
        /**
         * @param {string | null} sectionKey
         * @param {string[]} content
         */
        const storeSection = (sectionKey, content) => {
            if (!sectionKey) return;
            const existingContent = sections.get(sectionKey) || [];
            sections.set(sectionKey, [...existingContent, ...content]);
        };

        for (const line of lines) {
            const trimmed = line.trim();
            // Check if this is a top-level section header (no leading whitespace, ends with :)
            // Fix: Ignore comments when checking for header match (e.g. "sensor: # My Sensor" -> "sensor:")
            const headerMatch = line.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
            const isTopLevelHeader = headerMatch && !line.startsWith(' ') && !line.startsWith('\t');

            const cleanHeader = isTopLevelHeader ? headerMatch[1] : trimmed;

            if (isTopLevelHeader && mergeableSections.includes(cleanHeader)) {
                // Save previous section
                if (currentSection) {
                    storeSection(currentSection, currentContent);
                }
                currentSection = cleanHeader;
                currentContent = [];
            } else if (isTopLevelHeader && !mergeableSections.includes(cleanHeader)) {
                // Non-mergeable top-level section - save to non-section lines
                if (currentSection) {
                    storeSection(currentSection, currentContent);
                    currentSection = null;
                    currentContent = [];
                }
                nonSectionLines.push(line);
            } else if (currentSection) {
                // Content belonging to current mergeable section
                currentContent.push(line);
            } else {
                // Content not belonging to any mergeable section
                nonSectionLines.push(line);
            }
        }

        // Save last section
        if (currentSection) {
            storeSection(currentSection, currentContent);
        }

        return { sections, nonSectionLines };
    };

    const baseParsed = parseYamlSections(baseYaml);
    const extraParsed = parseYamlSections(extraYaml);

    // Merge sections
    const mergedSections = new Map(baseParsed.sections);

    for (const [sectionKey, extraContent] of extraParsed.sections) {
        if (mergedSections.has(sectionKey)) {
            // Merge: append extra content to existing section
            const existingContent = mergedSections.get(sectionKey) || [];
            mergedSections.set(sectionKey, [...existingContent, ...extraContent]);
        } else {
            // New section from extra
            mergedSections.set(sectionKey, extraContent);
        }
    }

    // Reconstruct YAML
    const result = [];

    // First, add base non-section lines (comments, headers, non-mergeable sections)
    result.push(...baseParsed.nonSectionLines);

    // Add merged sections
    for (const [sectionKey, content] of mergedSections) {
        // Add blank line before section if result isn't empty
        if (result.length > 0 && result[result.length - 1].trim() !== '') {
            result.push('');
        }
        result.push(sectionKey);
        result.push(...content);
    }

    // Add extra non-section lines that aren't in base
    for (const line of extraParsed.nonSectionLines) {
        const trimmed = line.trim();
        // Skip if empty or already present
        if (trimmed === '' || trimmed.startsWith('#')) continue;

        // Fix: Check for header duplication using clean headers
        let isDuplicateHeader = false;
        const headerMatch = line.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
        if (headerMatch && !line.startsWith(' ')) {
            const cleanHeader = headerMatch[1];
            // Check if this header exists in base non-section lines (ignoring comments)
            isDuplicateHeader = baseParsed.nonSectionLines.some(bl => {
                const blMatch = bl.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
                return blMatch && blMatch[1] === cleanHeader;
            });
        }

        if (isDuplicateHeader) continue;
        result.push(line);
    }

    // Fix: Sanitize all lines to remove trailing whitespace
    return result.map(l => l.trimEnd()).join('\n');
}
