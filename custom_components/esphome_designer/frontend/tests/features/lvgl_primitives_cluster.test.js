import { beforeEach, describe, expect, it } from 'vitest';

import lvglBar from '../../features/lvgl_bar/plugin.js';
import lvglCheckbox from '../../features/lvgl_checkbox/plugin.js';
import lvglSpinbox from '../../features/lvgl_spinbox/plugin.js';
import lvglSwitch from '../../features/lvgl_switch/plugin.js';
import lvglTileview from '../../features/lvgl_tileview/plugin.js';

describe('LVGL primitive plugin cluster', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders and exports spinboxes with numeric refresh hooks', () => {
        const host = document.createElement('div');
        lvglSpinbox.render(host, {
            id: 'spin_1',
            width: 100,
            height: 40,
            props: {
                value: 12,
                digit_count: 5
            }
        }, {
            _getColorStyle: () => '#000'
        });

        expect(host.textContent).toContain('00012');

        const exported = lvglSpinbox.exportLVGL({
            id: 'spin_1',
            entity_id: 'sensor.count',
            props: {
                digit_count: 6
            }
        }, {
            common: { id: 'base' }
        });
        expect(exported.spinbox).toEqual({
            id: 'base',
            value: '!lambda "return (int)id(sensor_count).state;"',
            digits: 6
        });

        const pendingTriggers = new Map();
        lvglSpinbox.onExportNumericSensors({
            widgets: [{ id: 'spin_1', type: 'lvgl_spinbox', entity_id: 'sensor.count', props: {} }],
            isLvgl: true,
            pendingTriggers
        });
        expect([...pendingTriggers.get('sensor.count')]).toEqual(['- lvgl.widget.refresh: spin_1']);
    });

    it('renders and exports tileviews using configured tile metadata', () => {
        const host = document.createElement('div');
        lvglTileview.render(host, {
            id: 'tile_1',
            width: 120,
            height: 80,
            props: {
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.children).toHaveLength(4);
        expect(host.style.backgroundColor).toBe('white');

        const exported = lvglTileview.exportLVGL({
            id: 'tile_1',
            props: {
                tiles: [
                    { row: 0, column: 0, widgets: [] },
                    { row: 0, column: 1, widgets: [{ label: { text: '"A"' } }] }
                ]
            }
        }, {
            common: { id: 'base' }
        });

        expect(exported.tileview.tiles).toHaveLength(2);
        expect(exported.tileview.tiles[1].column).toBe(1);
    });

    it('renders and exports checkboxes with toggle actions and binary refresh hooks', () => {
        const host = document.createElement('div');
        lvglCheckbox.render(host, {
            id: 'checkbox_1',
            width: 120,
            height: 30,
            props: {
                checked: true,
                text: 'Enabled',
                color: 'green'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.textContent).toContain('Enabled');
        expect(host.textContent).toContain('✓');

        const exported = lvglCheckbox.exportLVGL({
            id: 'checkbox_1',
            entity_id: 'switch.kitchen',
            props: {
                text: 'Kitchen',
                color: 'green',
                opa: 100
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`,
            _profile: {}
        });

        expect(exported.checkbox).toMatchObject({
            id: 'base',
            text: '"Kitchen"',
            indicator: { bg_color: 'Color(green)' },
            opa: 'opa(100)'
        });
        expect(exported.checkbox.state.checked).toContain('id(switch_kitchen).state');
        expect(exported.checkbox.on_value[0].if.then[0]['homeassistant.action'].data.entity_id).toBe('switch.kitchen');

        const pendingTriggers = new Map();
        lvglCheckbox.onExportBinarySensors({
            widgets: [{ id: 'checkbox_1', type: 'lvgl_checkbox', entity_id: 'switch.kitchen', props: {} }],
            isLvgl: true,
            pendingTriggers
        });
        expect([...pendingTriggers.get('switch.kitchen')]).toEqual([
            `- lvgl.widget.update:
    id: checkbox_1
    state:
      checked: !lambda return x;`
        ]);
    });

    it('renders and exports bars and switches with sensor hooks', () => {
        const barHost = document.createElement('div');
        lvglBar.render(barHost, {
            id: 'bar_1',
            width: 100,
            height: 12,
            props: {
                min: 0,
                max: 200,
                value: 50,
                color: 'blue',
                bg_color: 'gray'
            }
        }, {
            getColorStyle: (value) => value
        });
        expect(barHost.firstElementChild?.style.width).toBe('25%');

        const barExport = lvglBar.exportLVGL({
            id: 'bar_1',
            entity_id: 'sensor.power',
            props: {
                min: 0,
                max: 100,
                color: 'blue',
                bg_color: 'gray',
                mode: 'range',
                start_value: 10
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`
        });
        expect(barExport.bar).toMatchObject({
            id: 'base',
            bg_color: 'Color(gray)',
            indicator: { bg_color: 'Color(blue)' },
            start_value: 10,
            mode: 'range'
        });

        const barTriggers = new Map();
        lvglBar.onExportNumericSensors({
            widgets: [{ id: 'bar_1', type: 'lvgl_bar', entity_id: 'sensor.power', props: {} }],
            isLvgl: true,
            pendingTriggers: barTriggers
        });
        expect([...barTriggers.get('sensor.power')]).toEqual(['- lvgl.widget.refresh: bar_1']);

        const switchHost = document.createElement('div');
        lvglSwitch.render(switchHost, {
            id: 'switch_1',
            width: 60,
            height: 30,
            props: {
                checked: true,
                bg_color: 'gray',
                color: 'green',
                knob_color: 'white'
            }
        }, {
            getColorStyle: (value) => value
        });
        expect(switchHost.firstElementChild?.style.backgroundColor).toBe('green');

        const switchExport = lvglSwitch.exportLVGL({
            id: 'switch_1',
            entity_id: 'switch.fan',
            props: {
                bg_color: 'gray',
                color: 'green',
                knob_color: 'white',
                opa: 180
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`,
            _profile: {}
        });
        expect(switchExport.switch).toMatchObject({
            id: 'base',
            bg_color: 'Color(gray)',
            indicator: { bg_color: 'Color(green)' },
            knob: { bg_color: 'Color(white)' },
            opa: 'opa(180)'
        });
        expect(switchExport.switch.state.checked).toContain('id(switch_fan).state');
        expect(switchExport.switch.on_value[0].if.then[0]['homeassistant.action'].data.entity_id).toBe('switch.fan');

        const switchTriggers = new Map();
        lvglSwitch.onExportBinarySensors({
            widgets: [{ id: 'switch_1', type: 'lvgl_switch', entity_id: 'switch.fan', props: {} }],
            isLvgl: true,
            pendingTriggers: switchTriggers
        });
        expect([...switchTriggers.get('switch.fan')]).toEqual([
            `- lvgl.widget.update:
    id: switch_1
    state:
      checked: !lambda return x;`
        ]);
    });
});
