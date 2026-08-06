import { describe, expect, it } from 'vitest';

import buttonPlugin from '../../features/lvgl_button/plugin.js';
import checkboxPlugin from '../../features/lvgl_checkbox/plugin.js';
import sliderPlugin from '../../features/lvgl_slider/plugin.js';
import switchPlugin from '../../features/lvgl_switch/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { generateLVGLSnippet } from '../../js/io/yaml_export_lvgl.js';
import { buildSensorSections, processPendingTriggers } from '../../js/io/adapters/esphome_adapter_sections.ts';
import { collectCustomStateTriggerActions } from '../../js/io/adapters/entity_dedup.js';

const lvglContext = {
    common: { id: 'w_test', x: 0, y: 0, width: 100, height: 40 },
    convertColor: (value) => `Color(${value})`,
    formatOpacity: (value) => value
};

describe('LVGL binary state sync export', () => {
    it('exports Home Assistant switch state as a refreshable lambda', () => {
        const output = switchPlugin.exportLVGL({
            id: 'sw_1',
            type: 'lvgl_switch',
            entity_id: 'switch.kitchen_light',
            props: { ...switchPlugin.defaults }
        }, lvglContext);

        expect(output.switch.state.checked).toBe('!lambda return id(switch_kitchen_light).state;');
    });

    it('exports Home Assistant checkbox state as a refreshable lambda', () => {
        const output = checkboxPlugin.exportLVGL({
            id: 'cb_1',
            type: 'lvgl_checkbox',
            entity_id: 'input_boolean.night_mode',
            props: { ...checkboxPlugin.defaults }
        }, lvglContext);

        expect(output.checkbox.state.checked).toBe('!lambda return id(input_boolean_night_mode).state;');
    });

    it('exports Home Assistant button state for checkable LVGL buttons when sync is enabled', () => {
        const output = buttonPlugin.exportLVGL({
            id: 'btn_1',
            type: 'lvgl_button',
            entity_id: 'switch.kitchen_light',
            props: { ...buttonPlugin.defaults, sync_state: true }
        }, lvglContext);

        expect(output.button.state.checked).toBe('!lambda return id(switch_kitchen_light).state;');
        expect(output.button.checkable).toBe(true);
    });

    it('guards the switch toggle against state-sync feedback loops', () => {
        const output = switchPlugin.exportLVGL({
            id: 'sw_1',
            type: 'lvgl_switch',
            entity_id: 'switch.kitchen_light',
            props: { ...switchPlugin.defaults }
        }, lvglContext);

        expect(output.switch.on_value).toEqual([{
            if: {
                condition: { lambda: 'return x != id(switch_kitchen_light).state;' },
                then: [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: 'switch.kitchen_light' } } }]
            }
        }]);
    });

    it('uses lock and unlock services for lock entities', () => {
        const output = switchPlugin.exportLVGL({
            id: 'lock_1',
            type: 'lvgl_switch',
            entity_id: 'lock.front_door',
            props: { ...switchPlugin.defaults }
        }, lvglContext);

        const action = output.switch.on_value[0].if.then[0].if;
        expect(action.then[0]['homeassistant.service'].service).toBe('lock.lock');
        expect(action.else[0]['homeassistant.service'].service).toBe('lock.unlock');
    });

    it('guards the checkbox toggle against state-sync feedback loops', () => {
        const output = checkboxPlugin.exportLVGL({
            id: 'cb_1',
            type: 'lvgl_checkbox',
            entity_id: 'input_boolean.night_mode',
            props: { ...checkboxPlugin.defaults }
        }, lvglContext);

        expect(output.checkbox.on_value).toEqual([{
            if: {
                condition: { lambda: 'return x != id(input_boolean_night_mode).state;' },
                then: [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: 'input_boolean.night_mode' } } }]
            }
        }]);
    });

    it('serializes the lambda without quoting it in generated YAML', () => {
        registry.register(switchPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [{
                    id: 'sw_1',
                    type: 'lvgl_switch',
                    entity_id: 'switch.kitchen_light',
                    x: 10,
                    y: 20,
                    width: 60,
                    height: 30,
                    props: { ...switchPlugin.defaults }
                }]
            }],
            'test_device',
            { features: { lcd: true } },
            {}
        );

        expect(lines.join('\n')).toContain('checked: !lambda return id(switch_kitchen_light).state;');
    });

    it('adds state update triggers for HA-backed LVGL binary widgets', () => {
        const pendingTriggers = new Map();
        switchPlugin.onExportBinarySensors({
            widgets: [{ id: 'sw_1', type: 'lvgl_switch', entity_id: 'switch.kitchen_light', props: {} }],
            isLvgl: true,
            pendingTriggers
        });
        checkboxPlugin.onExportBinarySensors({
            widgets: [{ id: 'cb_1', type: 'lvgl_checkbox', entity_id: 'input_boolean.night_mode', props: {} }],
            isLvgl: true,
            pendingTriggers
        });
        buttonPlugin.onExportBinarySensors({
            widgets: [{ id: 'btn_1', type: 'lvgl_button', entity_id: 'switch.kitchen_light', props: { sync_state: true } }],
            isLvgl: true,
            pendingTriggers
        });

        expect(Array.from(pendingTriggers.get('switch.kitchen_light') || [])).toContain(`- lvgl.widget.update:
    id: sw_1
    state:
      checked: !lambda return x;`);
        expect(Array.from(pendingTriggers.get('switch.kitchen_light') || [])).toContain(`- lvgl.widget.update:
    id: btn_1
    state:
      checked: !lambda return x;`);
        expect(Array.from(pendingTriggers.get('input_boolean.night_mode') || [])).toContain(`- lvgl.widget.update:
    id: cb_1
    state:
      checked: !lambda return x;`);
    });

    it('creates a pending trigger bucket when a synced button is the first widget for that entity', () => {
        const pendingTriggers = new Map();

        buttonPlugin.onExportBinarySensors({
            widgets: [{ id: 'btn_first', type: 'lvgl_button', entity_id: 'fan.office', props: { sync_state: true } }],
            isLvgl: true,
            pendingTriggers
        });

        expect(Array.from(pendingTriggers.get('fan.office') || [])).toEqual([
            `- lvgl.widget.update:
    id: btn_first
    state:
      checked: !lambda return x;`
        ]);
    });

    it('adds trigger_on_initial_state for HA-backed binary sync triggers', () => {
        const result = processPendingTriggers([
            '- platform: homeassistant',
            '  id: light_kitchen',
            '  entity_id: light.kitchen',
            '  internal: true'
        ], new Map([
            ['light.kitchen', new Set([
                `- lvgl.widget.update:
    id: btn_1
    state:
      checked: !lambda return x;`
            ])]
        ]), true, 'on_state');

        expect(result).toEqual([
            '- platform: homeassistant',
            '  id: light_kitchen',
            '  entity_id: light.kitchen',
            '  trigger_on_initial_state: true',
            '  on_state:',
            '    then:',
            '      - lvgl.widget.update:',
            '          id: btn_1',
            '          state:',
            '            checked: !lambda return x;',
            '  internal: true'
        ]);
    });

    it('routes switch-backed LVGL button sync through ESPHome switch imports', () => {
        registry.register(buttonPlugin);
        const lines = [];
        const pendingTriggers = new Map();
        const context = {
            widgets: [{
                id: 'w_water_koud_btn',
                type: 'lvgl_button',
                entity_id: 'switch.overkapping_water_koud_1057',
                props: { sync_state: true }
            }],
            layout: {
                pages: [{
                    widgets: [{
                        id: 'w_water_koud_btn',
                        type: 'lvgl_button',
                        entity_id: 'switch.overkapping_water_koud_1057',
                        props: { sync_state: true }
                    }]
                }]
            },
            profile: { isPackageBased: false, features: {} },
            isLvgl: true,
            displayId: 'my_display',
            pendingTriggers,
            seenEntityIds: new Set(),
            seenSensorIds: new Set()
        };

        buildSensorSections({
            context,
            lines,
            yaml: {
                generateStayAwakeSection: () => []
            },
            setPendingTouchSensors: () => {}
        });

        const output = lines.join('\n');
        expect(output).toContain('switch:\n  - platform: homeassistant');
        expect(output).toContain('entity_id: switch.overkapping_water_koud_1057');
        expect(output).toContain('on_state:');
        expect(output).toContain('checked: !lambda return x;');
        expect(output).not.toContain('binary_sensor:\n  - platform: homeassistant\n    id: switch_overkapping_water_koud_1057');
        expect(output).not.toContain('trigger_on_initial_state: true');
    });

    it('injects marked custom state-trigger actions into binary_sensor on_state blocks', () => {
        const pendingTriggers = new Map();
        collectCustomStateTriggerActions([{
            id: 'status_label',
            props: {
                state_trigger_entity: 'binary_sensor.front_door',
                state_trigger_mode: 'on_state',
                state_trigger_actions: '- lvgl.label.update:\n    id: status_label\n    text: "Door changed"'
            }
        }], pendingTriggers);

        const result = processPendingTriggers([
            '- platform: homeassistant',
            '  id: binary_sensor_front_door',
            '  entity_id: binary_sensor.front_door',
            '  internal: true'
        ], pendingTriggers, true, 'on_state');

        expect(result.some((line) => line.includes('# esphome-designer-state-trigger: status_label'))).toBe(true);
        expect(result.some((line) => line.includes('- lvgl.label.update:'))).toBe(true);
        expect(result.some((line) => line.includes('id: status_label'))).toBe(true);
        expect(result.some((line) => line.includes('text: "Door changed"'))).toBe(true);
    });

    it('keeps light-slider sync triggers in one on_value block and routes custom light triggers to on_state', () => {
        const pendingTriggers = new Map();
        const numericLines = [];

        sliderPlugin.onExportNumericSensors({
            widgets: [{
                id: 'slider_light',
                type: 'lvgl_slider',
                entity_id: 'light.kitchen_counter',
                props: { min: 0, max: 100 }
            }],
            isLvgl: true,
            pendingTriggers,
            lines: numericLines,
            seenEntityIds: new Set(),
            seenSensorIds: new Set()
        });

        collectCustomStateTriggerActions([{
            id: 'status_icon',
            props: {
                state_trigger_entity: 'light.kitchen_counter',
                state_trigger_actions: '- lvgl.label.update:\n    id: status_icon\n    text: "Kitchen changed"'
            }
        }], pendingTriggers);

        const numericResult = processPendingTriggers(numericLines, pendingTriggers, true, 'on_value');
        const binaryResult = processPendingTriggers([
            '- platform: homeassistant',
            '  id: light_kitchen_counter',
            '  entity_id: light.kitchen_counter',
            '  internal: true'
        ], pendingTriggers, true, 'on_state');

        expect(numericResult.filter((line) => line.trim() === 'on_value:')).toHaveLength(1);
        expect(numericResult.some((line) => line.includes('lvgl.slider.update'))).toBe(true);
        expect(numericResult.some((line) => line.includes('# esphome-designer-state-trigger: status_icon'))).toBe(false);

        expect(binaryResult.filter((line) => line.trim() === 'on_state:')).toHaveLength(1);
        expect(binaryResult.some((line) => line.includes('# esphome-designer-state-trigger: status_icon'))).toBe(true);
        expect(binaryResult.some((line) => line.includes('text: "Kitchen changed"'))).toBe(true);
    });

    it('merges multiple on_value trigger sources into a single sensor block', () => {
        const pendingTriggers = new Map([
            ['sensor_room_temp', new Set(['- lvgl.widget.refresh: temp_slider'])],
            ['on_value::sensor.room_temp', new Set(['- script.execute: refresh_temp'])]
        ]);

        const result = processPendingTriggers([
            '- platform: homeassistant',
            '  id: sensor_room_temp',
            '  entity_id: sensor.room_temp',
            '  internal: true'
        ], pendingTriggers, true, 'on_value');

        expect(result.filter((line) => line.trim() === 'on_value:')).toHaveLength(1);
        expect(result.some((line) => line.includes('lvgl.widget.refresh: temp_slider'))).toBe(true);
        expect(result.some((line) => line.includes('script.execute: refresh_temp'))).toBe(true);
    });
});
