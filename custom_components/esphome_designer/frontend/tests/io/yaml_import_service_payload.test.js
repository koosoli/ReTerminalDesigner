import { describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

import { parseSnippetYamlOffline, recoverDesignerStateTriggers } from '../../js/io/yaml_import.ts';

describe('yaml_import service payload parsing', () => {
    it('recovers ODP payload blocks from malformed outer YAML', () => {
        const yamlText = `action: opendisplay.drawcustom
bad: [oops
data:
  payload:
    - type: text
      value: "Temp: {{ states('sensor.office_temp') }} F"
      x: 10
      y: 20
      size: 18
    - type: debug_grid
      spacing: 32`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'sensor_text',
            entity_id: 'sensor.office_temp',
            props: {
                prefix: 'Temp: ',
                postfix: ' F',
                hide_unit: true
            }
        });
        expect(layout?.pages[0].widgets[1]).toMatchObject({
            type: 'odp_debug_grid',
            props: {
                spacing: 32
            }
        });
    });

    it('re-parses full service payload strings into widget layouts', () => {
        const yamlText = `service: open_epaper_link.drawcustom
data:
  payload: |-
    - type: circle
      x: 60
      y: 70
      radius: 15
      fill: black`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'shape_circle',
            x: 45,
            y: 55,
            width: 30,
            height: 30
        });
    });

    it('imports GitHub discussion YAML wrapped in single Markdown backticks and restores print text widgets', () => {
        const yamlText = `\`esphome:
  name: "dp-gast-og"
  friendly_name: dp-gast-og

logger:
  level: DEBUG

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

font:
  - file: "gfonts://Montserrat"
    id: montserrat_28
    size: 28

display:
  - platform: mipi_dsi
    id: device_display
    model: JC4880P443
    byte_order: little_endian
    rotation: 0
    lambda: |-
      it.fill(Color::BLACK);
      it.print(100, 140, id(montserrat_28), Color(0,255,0), TextAlign::LEFT, "Hello World1");
      it.print(100, 240, id(montserrat_28), Color::WHITE, TextAlign::LEFT, "Hello World2");
      it.print(100, 340, id(montserrat_28), Color(255,0,0), TextAlign::LEFT, "Hello World3");

touchscreen:
  platform: gt911
  i2c_id: i2c_bus
  id: device_touchscreen

esp_ldo:
  - channel: 3
    voltage: 2.5V

psram:
  mode: hex
  speed: 200MHz

esp32:
  board: esp32-p4-evboard
  framework:
    type: esp-idf

i2c:
  id: i2c_bus
  sda: 7
  scl: 8
  scan: false\``;

        const layout = parseSnippetYamlOffline(yamlText);
        const widgets = layout?.pages?.[0]?.widgets || [];

        expect(widgets).toHaveLength(3);
        expect(widgets.map((widget) => widget.props?.text)).toEqual([
            'Hello World1',
            'Hello World2',
            'Hello World3'
        ]);
        expect(widgets[0]).toMatchObject({
            type: 'text',
            x: 100,
            y: 140,
            props: {
                font_family: 'Montserrat',
                font_size: 28,
                color: '#00FF00'
            }
        });
        expect(widgets[1].props.color).toBe('white');
        expect(widgets[2].props.color).toBe('#FF0000');
        expect(layout?.importWarnings).toContain(
            'Imported root hardware/system YAML for context; generated output may still comment those sections to avoid duplicate ESPHome definitions.'
        );
    });

    it('recovers marked state-trigger imports and flags unsupported custom automations', () => {
        const layout = {
            pages: [{
                id: 'page_0',
                name: 'Main',
                widgets: [
                    { id: 'status_label', type: 'lvgl_label', props: {} },
                    { id: 'switch_1', type: 'lvgl_switch', props: {} }
                ]
            }]
        };

        const rawLines = [
            'binary_sensor:',
            '  - platform: homeassistant',
            '    id: binary_sensor_front_door',
            '    entity_id: binary_sensor.front_door',
            '    on_state:',
            '      then:',
            '        # esphome-designer-state-trigger: status_label',
            '        - lvgl.label.update:',
            '            id: status_label',
            '            text: "Door changed"',
            'sensor:',
            '  - platform: homeassistant',
            '    id: sensor_power_usage',
            '    entity_id: sensor.power_usage',
            '    on_value:',
            '      then:',
            '        - script.execute: refresh_power'
        ];

        const recovered = recoverDesignerStateTriggers(layout, rawLines);

        expect(recovered?.pages?.[0]?.widgets?.[0]?.props).toMatchObject({
            state_trigger_entity: 'binary_sensor.front_door',
            state_trigger_mode: 'on_state',
            state_trigger_actions: '- lvgl.label.update:\n    id: status_label\n    text: "Door changed"'
        });
        expect(recovered?.importWarnings).toEqual([
            'Imported visual layout; unsupported custom automations remain raw YAML only.'
        ]);
    });

    it('imports native LVGL buttons as single widgets with label text and action entities restored', () => {
        const yamlText = `esphome:
  name: esp32-4inch-display-01

esp32:
  variant: esp32s3

lvgl:
  id: my_lvgl
  pages:
    - id: page_0
      widgets:
        - button:
            id: w_water_koud_btn
            bg_color: "0xADD8E6"
            checked:
              bg_color: "0x0000FF"
            checkable: true
            height: 55
            on_click:
              - if:
                  condition:
                    lambda: 'return id(switch_overkapping_water_koud_1057).state;'
                  then:
                    - homeassistant.service:
                        service: switch.turn_off
                        data:
                          entity_id: switch.overkapping_water_koud_1057
                  else:
                    - homeassistant.service:
                        service: switch.turn_on
                        data:
                          entity_id: switch.overkapping_water_koud_1057
            state:
              checked: !lambda return id(switch_overkapping_water_koud_1057).state;
            widgets:
              - label:
                  align: center
                  text: "Water Koud"
                  text_font: font_roboto_400_20
            width: 103
            x: 356
            y: 22
        - button:
            id: w_water_warm_btn
            bg_color: "0xFFCCCC"
            checked:
              bg_color: "0xFF0000"
            checkable: true
            height: 56
            on_click:
              - homeassistant.service:
                  service: switch.toggle
                  data:
                    entity_id: switch.overkapping_water_warm_1058
            state:
              checked: !lambda return id(switch_overkapping_water_warm_1058).state;
            widgets:
              - label:
                  align: center
                  text: "Water Warm"
                  text_font: font_roboto_400_20
            width: 103
            x: 356
            y: 117`;

        const layout = parseSnippetYamlOffline(yamlText);
        const widgets = layout?.pages?.[0]?.widgets || [];

        expect(widgets).toHaveLength(2);
        expect(widgets[0]).toMatchObject({
            id: 'w_water_koud_btn',
            type: 'lvgl_button',
            x: 356,
            y: 22,
            width: 103,
            height: 55,
            entity_id: 'switch.overkapping_water_koud_1057',
            props: {
                text: 'Water Koud',
                entity_id: 'switch.overkapping_water_koud_1057',
                bg_color: '#add8e6',
                checked: {
                    bg_color: '#0000ff'
                },
                checkable: true,
                sync_state: true,
                service: 'auto'
            }
        });
        expect(widgets[1]).toMatchObject({
            id: 'w_water_warm_btn',
            type: 'lvgl_button',
            entity_id: 'switch.overkapping_water_warm_1058',
            props: {
                text: 'Water Warm',
                entity_id: 'switch.overkapping_water_warm_1058',
                bg_color: '#ffcccc',
                checked: {
                    bg_color: '#ff0000'
                },
                checkable: true,
                sync_state: true,
                service: 'switch.toggle'
            }
        });
        expect(layout?.importWarnings).toContain(
            'Imported root hardware/system YAML for context; generated output may still comment those sections to avoid duplicate ESPHome definitions.'
        );
    });

    it('imports homeassistant.action payloads from current ESPHome exports', () => {
        const yamlText = `esphome:
  name: esp32-4inch-display-01

esp32:
  variant: esp32s3

lvgl:
  id: my_lvgl
  pages:
    - id: page_0
      widgets:
        - button:
            id: w_light_btn
            bg_color: "0xADD8E6"
            height: 55
            on_click:
              - homeassistant.action:
                  action: light.toggle
                  data:
                    entity_id: light.kitchen
            widgets:
              - label:
                  align: center
                  text: "Kitchen"
                  text_font: font_roboto_400_20
            width: 103
            x: 356
            y: 22`;

        const layout = parseSnippetYamlOffline(yamlText);
        const widgets = layout?.pages?.[0]?.widgets || [];

        expect(widgets).toHaveLength(1);
        expect(widgets[0]).toMatchObject({
            id: 'w_light_btn',
            type: 'lvgl_button',
            entity_id: 'light.kitchen',
            props: {
                text: 'Kitchen',
                entity_id: 'light.kitchen'
            }
        });
    });
});
