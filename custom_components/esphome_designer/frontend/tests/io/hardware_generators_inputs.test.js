import { describe, expect, it } from 'vitest';

import {
    generateBinarySensorSection,
    generateButtonSection
} from '../../js/io/hardware_generators_inputs.js';

describe('hardware_generators_inputs', () => {
    it('generates gpio buttons plus touchscreen handlers for nav bars and touch areas', () => {
        const lines = generateBinarySensorSection({
            name: 'CoreInk',
            features: { buttons: true, lcd: true },
            pins: {
                buttons: {
                    left: 'GPIO1',
                    right: { number: 'GPIO2', inverted: false },
                    refresh: 'GPIO3',
                    home: 'GPIO4'
                }
            },
            touch: { platform: 'gt911', id: 'device_touchscreen' }
        }, 3, 'my_display', [
            {
                id: 'nav_main',
                type: 'template_nav_bar',
                x: 10,
                y: 20,
                width: 90,
                height: 24,
                _pageIndex: 1,
                props: {}
            },
            {
                id: 'reload_touch',
                type: 'touch_area',
                x: 110,
                y: 20,
                width: 24,
                height: 24,
                _pageIndex: 1,
                props: {
                    nav_action: 'reload_page'
                }
            },
            {
                id: 'toggle_touch',
                type: 'touch_area',
                entity_id: 'light.kitchen',
                x: 150,
                y: 20,
                width: 20,
                height: 20,
                _pageIndex: 1,
                props: {
                    icon_size: 40
                }
            },
            {
                id: 'toggle_touch_duplicate',
                type: 'touch_area',
                entity_id: 'light.kitchen',
                x: 180,
                y: 20,
                width: 20,
                height: 20,
                _pageIndex: 1,
                props: {}
            }
        ]);

        const joined = lines.join('\n');

        expect(joined).toContain('id: button_left');
        expect(joined).toContain('id: button_right');
        expect(joined).toContain('id: touch_area_toggle_touch');
        expect(joined).toContain('id: touch_area_toggle_touch_duplicate');
        expect(joined.match(/entity_id: light\.kitchen/g)).toHaveLength(2);
        expect(joined).toContain('id: button_enter');
        expect(joined).toContain('id: button_home');
        expect(joined).toContain('id: nav_prev_nav_main');
        expect(joined).toContain('touchscreen_id: device_touchscreen');
        expect(joined).not.toContain('touchscreen_id: my_touchscreen');
        expect(joined).toContain('id: nav_home_nav_main');
        expect(joined).toContain('id: nav_next_nav_main');
        expect(joined).toContain("lambda: 'return id(display_page) == 1 && (millis() - id(last_touch_time) > 2000);'");
        expect(joined).toContain('script.execute: manage_run_and_sleep');
        expect(joined).toContain('service: homeassistant.toggle');
        expect(joined).toContain('entity_id: light.kitchen');
    });

    it('emits allow_other_uses in the pin block when the button config object has it set', () => {
        // This models the E1004 home button which shares GPIO2 with the display cs1_pin
        const lines = generateBinarySensorSection({
            name: 'reTerminal E1004',
            features: { buttons: true },
            pins: {
                buttons: {
                    home: { number: 'GPIO2', mode: 'INPUT_PULLUP', inverted: true, allow_other_uses: true }
                }
            }
        }, 1, 'epaper_display', []);

        const joined = lines.join('\n');
        expect(joined).toContain('number: GPIO2');
        expect(joined).toContain('allow_other_uses: true');
        expect(joined).toContain('id: button_home');
    });

    it('does not emit allow_other_uses when the property is absent from the button config', () => {
        const lines = generateBinarySensorSection({
            name: 'reTerminal E1001',
            features: { buttons: true },
            pins: {
                buttons: {
                    home: { number: 'GPIO2', mode: 'INPUT_PULLUP', inverted: true }
                }
            }
        }, 1, 'epaper_display', []);

        const joined = lines.join('\n');
        expect(joined).toContain('number: GPIO2');
        expect(joined).not.toContain('allow_other_uses');
    });

    it('adds template page buttons and buzzer helpers when multiple pages exist', () => {
        const lines = generateButtonSection({
            features: { buzzer: true }
        }, 2);

        const joined = lines.join('\n');

        expect(joined).toContain('name: "Next Page"');
        expect(joined).toContain('name: "Previous Page"');
        expect(joined).toContain('name: "Go to Page 2"');
        expect(joined).toContain('name: "Refresh Display"');
        expect(joined).toContain('name: "Play Beep Short"');
        expect(joined).toContain('name: "Play Star Wars"');
        expect(joined).toContain("target_page: !lambda 'return id(display_page) + 1;'");
    });
});
