import { describe, it, expect, vi } from 'vitest';
import { mergeYamlSections, applyPackageOverrides } from '../../js/io/generators/yaml_merger.js';

vi.mock('../../js/utils/logger.js', () => ({
  Logger: { log: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() }
}));

describe('ESPHomeAdapter Legacy Functions Snapshot', () => {

  describe('mergeYamlSections', () => {
    it('should merge baseYaml and extraYaml exactly as before', () => {
      const baseYaml = `
# This is a base file
esphome:
  name: test_device

sensor:
  - platform: template
    name: "Base Sensor"
    id: base_sensor

font:
  - file: "g0v4.ttf"
    id: font1
`;
      const extraYaml = `
sensor:
  - platform: wifi_signal
    name: "WiFi"
    
font:
  - file: "arial.ttf"
    id: font2
    
binary_sensor:
  - platform: status
    name: "Status"

esphome:
  build_path: build/test
`;

      const merged = mergeYamlSections(baseYaml, extraYaml);
      expect(merged).toContain('test_device');
      expect(merged).toContain('base_sensor');
      expect(merged).toContain('WiFi');
      expect(merged).toContain('font1');
      expect(merged).toContain('font2');
      expect(merged).toContain('Status');
      expect(merged).toContain('build_path: build/test');
      const sensorMatches = merged.match(/^sensor:$/gm);
      expect(sensorMatches).toHaveLength(1);
    });
  });

  describe('applyPackageOverrides', () => {
    it('should apply rotation and transform overrides correctly', () => {
      const yaml = `
display:
  - platform: st7789v
    rotation: 0

touchscreen:
  - platform: gt911
    id: my_touchscreen
    interrupt_pin: 4
`;
      const profile = {
        name: "Waveshare Touch LCD 7",
        resolution: { width: 800, height: 480 } // native landscape
      };

      // portrait orientation means width < height, so we request swapping
      const result1 = applyPackageOverrides(yaml, profile, 'portrait', false, {});
      expect(result1).toContain('rotation: 90');
      expect(result1).toContain('transform:');
      expect(result1).toContain('swap_xy: true');
      expect(result1).toContain('mirror_y: true');

      const result2 = applyPackageOverrides(yaml, profile, 'landscape_inverted', false, {});
      expect(result2).toContain('rotation: 180');
    });

    it('should preserve sibling on_release block when replacing touchscreen transform', () => {
      const yaml = `
display:
  - platform: st7789v
    rotation: 0

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    transform:
      swap_xy: false
      mirror_x: false
      mirror_y: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight
`;
      const profile = {
        name: 'Waveshare Touch LCD 7',
        resolution: { width: 800, height: 480 }
      };

      const result = applyPackageOverrides(yaml, profile, 'portrait', true, { lcdEcoStrategy: 'dim_after_timeout' });

      // Issue #490: LVGL mode must not inject a display-level rotation.
      expect(result).not.toContain('rotation: 90');
      expect(result).toContain('transform:');
      expect(result).toContain('swap_xy: true');
      expect(result).toContain('mirror_x: false');
      expect(result).toContain('mirror_y: true');
      expect(result).toContain('on_release:');
      expect(result).toContain('- if:');
      expect(result).not.toContain('mirror_y: true\n      - if:');
    });

    it('injects display rotation when package templates omit a rotation field', () => {
      const yaml = `
display:
  - platform: rpi_dpi_rgb
    id: my_display
    update_interval: 1s
    dimensions:
      width: 800
      height: 480
`;
      const profile = {
        name: 'Waveshare Touch LCD 4.3',
        resolution: { width: 800, height: 480 }
      };

      const result = applyPackageOverrides(yaml, profile, 'portrait', false, {});

      expect(result).toContain('    rotation: 90');
      expect(result.indexOf('    rotation: 90')).toBeGreaterThan(result.indexOf('    dimensions:'));
    });

    it('should modify lvgl auto_clear_enabled', () => {
      const yaml = `
lvgl:
  auto_clear_enabled: true
`;
      const result = applyPackageOverrides(yaml, {}, 'landscape', true, {});
      expect(result).toContain('auto_clear_enabled: false');
      expect(result).not.toContain('auto_clear_enabled: true');
    });

    it('should strip LVGL actions when isLvgl is false (Issue #342)', () => {
      const yaml = `
touchscreen:
  platform: gt911
  id: my_touchscreen
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight
`;
      const profile = { name: "Waveshare 7", resolution: { width: 800, height: 480 } };
      const result = applyPackageOverrides(yaml, profile, 'landscape', false, {});

      expect(result).not.toContain('lvgl.resume');
      expect(result).not.toContain('lvgl.is_paused');
      expect(result).not.toContain('on_release:');
    });

    it('should keep LVGL actions when isLvgl is true', () => {
      const yaml = `
touchscreen:
  platform: gt911
  id: my_touchscreen
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
`;
      const profile = { name: "Waveshare 7", resolution: { width: 800, height: 480 } };
      const result = applyPackageOverrides(yaml, profile, 'landscape', true, { lcdEcoStrategy: 'dim_after_timeout' });

      expect(result).toContain('lvgl.resume');
      expect(result).toContain('lvgl.is_paused');
    });
  });
});
