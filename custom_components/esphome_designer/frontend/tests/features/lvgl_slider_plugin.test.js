import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_slider/plugin.js';

describe('lvgl slider plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders horizontal and vertical slider previews with indicator and knob placement', () => {
        const horizontalHost = document.createElement('div');
        plugin.render(horizontalHost, {
            id: 'slider_h',
            type: 'lvgl_slider',
            width: 100,
            height: 40,
            props: {
                min: 0,
                max: 100,
                value: 25,
                color: 'blue',
                bg_color: 'gray',
                border_width: 3,
                vertical: false
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const horizontalTrack = horizontalHost.firstElementChild;
        const horizontalIndicator = horizontalTrack?.children[0];
        const horizontalKnob = horizontalTrack?.children[1];

        expect(horizontalTrack?.style.width).toBe('100%');
        expect(horizontalIndicator?.style.width).toBe('25%');
        expect(horizontalKnob?.style.left).toContain('25%');
        expect(horizontalKnob?.style.border).toBe('3px solid white');

        const verticalHost = document.createElement('div');
        plugin.render(verticalHost, {
            id: 'slider_v',
            type: 'lvgl_slider',
            width: 40,
            height: 120,
            props: {
                min: 0,
                max: 200,
                value: 100,
                color: 'red',
                bg_color: 'black',
                vertical: true
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const verticalTrack = verticalHost.firstElementChild;
        const verticalIndicator = verticalTrack?.children[0];
        const verticalKnob = verticalTrack?.children[1];

        expect(verticalHost.style.flexDirection).toBe('column');
        expect(verticalTrack?.style.height).toBe('100%');
        expect(verticalIndicator?.style.height).toBe('50%');
        expect(verticalKnob?.style.bottom).toContain('50%');
    });

    it('exports domain-specific Home Assistant service hooks and numeric refresh triggers', () => {
        const domains = {
            'fan.ceiling': 'fan.set_percentage',
            'cover.shade': 'cover.set_cover_position',
            'climate.room': 'climate.set_temperature',
            'number.manual': 'number.set_value'
        };

        for (const [entityId, service] of Object.entries(domains)) {
            const exported = plugin.exportLVGL({
                id: `slider_${entityId.replace('.', '_')}`,
                type: 'lvgl_slider',
                entity_id: entityId,
                props: {
                    min: 10,
                    max: 90,
                    value: 15,
                    color: 'green',
                    bg_color: 'gray',
                    border_width: 4,
                    mode: 'symmetrical'
                }
            }, {
                common: { id: 'base' },
                convertColor: (value) => `0x${String(value).toUpperCase()}`,
                profile: { touch: true }
            });

            expect(exported.slider.value).toContain(`id(${entityId.replace(/[^a-zA-Z0-9_]/g, '_')}).state`);
            expect(exported.slider.min_value).toBe(10);
            expect(exported.slider.max_value).toBe(90);
            expect(exported.slider.indicator.bg_color).toBe('0xGREEN');
            expect(exported.slider.knob.bg_color).toBe('0xGREEN');
            expect(exported.slider.on_value[0]['homeassistant.action'].action).toBe(service);
        }

        const mediaPlayer = plugin.exportLVGL({
            id: 'slider_media_player_speaker',
            type: 'lvgl_slider',
            entity_id: 'media_player.speaker',
            props: {
                min: 0,
                max: 100,
                value: 30,
                color: 'green',
                bg_color: 'gray'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            profile: { touch: true }
        });

        expect(mediaPlayer.slider.on_value[0]['homeassistant.action'].action).toBe('media_player.volume_set');
        expect(mediaPlayer.slider.on_value[0]['homeassistant.action'].data).toEqual({
            entity_id: 'media_player.speaker',
            volume_level: "!lambda 'return x / 100.0;'"
        });
        expect(mediaPlayer.slider.value).toContain('id(media_player_speaker_volume_level).state * 100.0f');

        const defaultLight = plugin.exportLVGL({
            id: 'slider_light_default',
            type: 'lvgl_slider',
            entity_id: 'light.kitchen',
            props: {
                min: 0,
                max: 100,
                value: 15,
                color: 'green',
                bg_color: 'gray',
                border_width: 4,
                mode: 'symmetrical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            profile: { touch: true }
        });

        expect(defaultLight.slider.value).toContain('if (!id(light_kitchen_brightness).has_state()) return static_cast<float>(0);');
        expect(defaultLight.slider.value).toContain('const float brightness = id(light_kitchen_brightness).state;');
        expect(defaultLight.slider.value).toContain('return slider_min + ((brightness / 255.0f) * (slider_max - slider_min));');
        expect(defaultLight.slider.on_value).toBeUndefined();
        expect(defaultLight.slider.on_release[0]['if'].condition.lambda).toBe('return x <= 0;');
        expect(defaultLight.slider.on_release[0]['if'].then[0]['homeassistant.action'].action).toBe('light.turn_off');
        expect(defaultLight.slider.on_release[0]['if'].else[0]['homeassistant.action'].action).toBe('light.turn_on');
        expect(defaultLight.slider.on_release[0]['if'].else[0]['homeassistant.action'].data.brightness).toContain('const float raw_x = static_cast<float>(x);');
        expect(defaultLight.slider.on_release[0]['if'].else[0]['homeassistant.action'].data.brightness).toContain('return int(((clamped - slider_min) * 255.0f) / (slider_max - slider_min));');

        const scaledLight = plugin.exportLVGL({
            id: 'slider_light_scaled',
            type: 'lvgl_slider',
            entity_id: 'light.kitchen',
            props: {
                min: 0,
                max: 255,
                value: 15,
                color: 'green',
                bg_color: 'gray',
                border_width: 4,
                mode: 'symmetrical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            profile: { touch: true }
        });

        expect(scaledLight.slider.value).toContain('const float brightness = id(light_kitchen_brightness).state;');
        expect(scaledLight.slider.value).toContain('if (slider_max <= slider_min) return brightness;');
        expect(scaledLight.slider.value).not.toContain('(int)');
        expect(scaledLight.slider.value).toContain('return slider_min + ((brightness / 255.0f) * (slider_max - slider_min));');
        expect(scaledLight.slider.on_value).toBeUndefined();
        expect(scaledLight.slider.on_release[0]['if'].else[0]['homeassistant.action'].data.brightness).toBe("!lambda 'return int(x);'");

        const pendingTriggers = new Map();
        const lines = [];
        const seenEntityIds = new Set();
        const seenSensorIds = new Set();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'slider_light', type: 'lvgl_slider', entity_id: 'light.kitchen', props: { min: 0, max: 255 } },
                { id: 'slider_light_default', type: 'lvgl_slider', entity_id: 'light.desk', props: { min: 0, max: 100 } },
                { id: 'slider_media', type: 'lvgl_slider', entity_id: 'media_player.speaker', props: { min: 0, max: 100 } },
                { id: 'slider_1', type: 'lvgl_slider', entity_id: ' number.manual ' },
                { id: 'ignore', type: 'lvgl_arc', entity_id: 'sensor.ignored' }
            ],
            isLvgl: true,
            pendingTriggers,
            lines,
            seenEntityIds,
            seenSensorIds
        });

        expect(lines).toEqual([
            '- platform: homeassistant',
            '  id: light_kitchen_brightness',
            '  entity_id: light.kitchen',
            '  attribute: brightness',
            '  internal: true',
            '- platform: homeassistant',
            '  id: light_desk_brightness',
            '  entity_id: light.desk',
            '  attribute: brightness',
            '  internal: true',
            '- platform: homeassistant',
            '  id: media_player_speaker_volume_level',
            '  entity_id: media_player.speaker',
            '  attribute: volume_level',
            '  internal: true'
        ]);
        expect([...pendingTriggers.get('light_kitchen_brightness')]).toEqual([
            `- lvgl.slider.update:
    id: slider_light
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x);`
        ]);
        expect([...pendingTriggers.get('light_desk_brightness')]).toEqual([
            `- lvgl.slider.update:
    id: slider_light_default
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(0);
      const float raw_x = static_cast<float>(x);
      const float slider_min = static_cast<float>(0);
      const float slider_max = static_cast<float>(100);
      if (slider_max <= slider_min) return raw_x;
      return slider_min + ((raw_x / 255.0f) * (slider_max - slider_min));`
        ]);
        expect([...pendingTriggers.get('media_player_speaker_volume_level')]).toEqual([
            `- lvgl.slider.update:
    id: slider_media
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x * 100.0f);`
        ]);
        expect(pendingTriggers.has('light.kitchen')).toBe(false);
        expect(pendingTriggers.has('media_player.speaker')).toBe(false);
        expect([...pendingTriggers.get('number.manual')]).toEqual(['- lvgl.widget.refresh: slider_1']);
    });

    it('scales media player volume updates when the slider range is customized', () => {
        const pendingTriggers = new Map();

        plugin.onExportNumericSensors({
            widgets: [
                {
                    id: 'slider_media_scaled',
                    type: 'lvgl_slider',
                    entity_id: 'media_player.office',
                    props: { min: 20, max: 80 }
                }
            ],
            isLvgl: true,
            pendingTriggers,
            lines: [],
            seenEntityIds: new Set(),
            seenSensorIds: new Set()
        });

        expect([...pendingTriggers.get('media_player_office_volume_level')]).toEqual([
            `- lvgl.slider.update:
    id: slider_media_scaled
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(20);
      const float slider_min = static_cast<float>(20);
      const float slider_max = static_cast<float>(80);
      const float volume = static_cast<float>(x * 100.0f);
      if (slider_max <= slider_min) return volume;
      return slider_min + ((volume / 100.0f) * (slider_max - slider_min));`
        ]);
    });
});
