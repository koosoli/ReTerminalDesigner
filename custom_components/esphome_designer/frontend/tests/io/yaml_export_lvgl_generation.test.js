// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import lvglImgPlugin from '../../features/lvgl_img/plugin.js';
import lvglObjPlugin from '../../features/lvgl_obj/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { generateLVGLSnippet } from '../../js/io/yaml_export_lvgl.js';

describe('yaml_export_lvgl generation details', () => {
    it('emits touchscreens, dim-on-idle hooks, and comment markers for visible widgets', () => {
        registry.register(lvglObjPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [
                    {
                        id: 'obj_visible',
                        type: 'lvgl_obj',
                        x: 10,
                        y: 20,
                        width: 30,
                        height: 40,
                        props: {
                            ...lvglObjPlugin.defaults,
                            border_width: 2
                        }
                    },
                    {
                        id: 'obj_hidden',
                        type: 'lvgl_obj',
                        hidden: true,
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        props: {
                            ...lvglObjPlugin.defaults
                        }
                    },
                    {
                        id: 'group_1',
                        type: 'group',
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        props: {}
                    }
                ]
            }],
            'test_device',
            { features: { lcd: true }, touch: true },
            { darkMode: true, lcdEcoStrategy: 'dim_after_timeout', dimTimeout: 12 }
        );

        const output = lines.join('\n');
        expect(output).toContain('bg_color: "0x000000"');
        expect(output).toContain('    - my_display');
        expect(output).toContain('touchscreens:');
        expect(output).toContain('    - touchscreen_id: my_touchscreen');
        expect(output).toContain('timeout: 12s');
        expect(output).toContain('# widget:lvgl_obj id:obj_visible');
        expect(output).toContain('border_width: 2');
        expect(output).not.toContain('obj_hidden');
        expect(output).not.toContain('group_1');
    });

    it('carries the requested orientation as an lvgl rotation option (#490)', () => {
        const profile = { features: { lcd: true }, resolution: { width: 1280, height: 720 } };

        const portrait = generateLVGLSnippet([], 'test_device', profile, { orientation: 'portrait' }).join('\n');
        expect(portrait).toContain('\n  rotation: 90\n');

        const inverted = generateLVGLSnippet([], 'test_device', profile, { orientation: 'landscape_inverted' }).join('\n');
        expect(inverted).toContain('\n  rotation: 180\n');

        const offset = generateLVGLSnippet([], 'test_device', { ...profile, rotation_offset: 180 }, { orientation: 'landscape' }).join('\n');
        expect(offset).toContain('\n  rotation: 180\n');

        const landscape = generateLVGLSnippet([], 'test_device', profile, { orientation: 'landscape' }).join('\n');
        expect(landscape).not.toContain('rotation:');
    });

    it('falls back to epaper display ids and emits empty page arrays', () => {
        const lines = generateLVGLSnippet(
            [
                { id: 'page_0', widgets: [] },
                {
                    id: 'page_1',
                    widgets: [
                        {
                            id: 'obj_1',
                            type: 'group',
                            props: {}
                        }
                    ]
                }
            ],
            'test_device',
            { features: { lcd: false } },
            {}
        );

        const output = lines.join('\n');
        expect(output).toContain('- epaper_display');
        expect(output.match(/ {8}\[\]/g) || []).toHaveLength(2);
    });

    it('uses profile-defined display and touchscreen ids when available', () => {
        const lines = generateLVGLSnippet(
            [{ id: 'page_0', widgets: [] }],
            'guition_profile',
            {
                features: { lcd: true },
                displayId: 'main_display',
                touch: { platform: 'gt911', id: 'device_touchscreen' }
            },
            {}
        );

        const output = lines.join('\n');
        expect(output).toContain('  displays:\n    - main_display');
        expect(output).toContain('  touchscreens:\n    - touchscreen_id: device_touchscreen');
        expect(output).not.toContain('my_display');
        expect(output).not.toContain('my_touchscreen');
    });

    it('omits empty touchscreen configs and emits ESPHome image widgets', () => {
        registry.register(lvglImgPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [{
                    id: 'logo_image',
                    type: 'lvgl_img',
                    x: 117,
                    y: 199,
                    width: 80,
                    height: 80,
                    props: {
                        src: 'images/logo.png'
                    }
                }]
            }],
            'test_device',
            { features: { lcd: true }, touch: [] },
            {}
        );

        const output = lines.join('\n');
        expect(output).not.toContain('touchscreens:');
        expect(output).not.toContain('touchscreens: []');
        expect(output).toContain('        - image:');
        expect(output).not.toContain('        - img:');
        expect(output).toContain('src: img_images_logo_png_80x80');
    });
});
