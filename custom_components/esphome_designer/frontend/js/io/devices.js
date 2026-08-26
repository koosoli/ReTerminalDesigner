import { Logger } from '../utils/logger.js';
import { fetchDynamicHardwareProfiles, getOfflineProfilesFromStorage } from './hardware_profile_sources.js';
import { emit, EVENTS } from '../core/events.js';

// ============================================================================
// DEVICE HARDWARE PROFILES
// ============================================================================
// Complete hardware configuration for each supported device.
// Used to generate all hardware-related YAML sections (sensors, buttons, etc.)
// ============================================================================



export const DEVICE_PROFILES = {
  // ========================================================================
  // SEEED STUDIO DEVICES
  // ========================================================================
  reterminal_e1001: {
    name: "Seeedstudio reTerminal E1001 (Monochrome)",
    displayType: "binary",
    chip: "esp32-s3",
    board: "esp32-s3-devkitc-1",
    displayModel: "7.50inv2p",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
    pins: {
      display: { cs: "GPIO10", dc: "GPIO11", reset: { number: "GPIO12", inverted: false }, busy: { number: "GPIO13", inverted: true } },
      i2c: { sda: "GPIO19", scl: "GPIO20" },
      spi: { clk: "GPIO7", mosi: "GPIO9" },
      batteryEnable: "GPIO21",
      batteryAdc: "GPIO1",
      buzzer: "GPIO45",
      buttons: { left: "GPIO5", right: "GPIO4", refresh: "GPIO3", home: "GPIO2" }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 }
    },
    features: {
      psram: true,
      buzzer: true,
      buttons: true,
      sht4x: true,
      epaper: true,
      inverted_colors: true
    }
  },
  reterminal_e1002: {
    name: "Seeedstudio reTerminal E1002 (6-Color)",
    displayType: "color",
    displayModel: "Seeed-reTerminal-E1002",
    displayPlatform: "epaper_spi",
    deepSleepDisplayRefreshDelay: "35s",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
    pins: {
      display: { cs: null, dc: null, reset: null, busy: null },
      i2c: { sda: "GPIO19", scl: "GPIO20" },
      spi: { clk: "GPIO7", mosi: "GPIO9" },
      batteryEnable: "GPIO21",
      batteryAdc: "GPIO1",
      buzzer: "GPIO45",
      buttons: { left: "GPIO5", right: "GPIO4", refresh: "GPIO3", home: "GPIO2" }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 }
    },
    features: {
      psram: true,
      buzzer: true,
      buttons: true,
      sht4x: true,
      epaper: true
    }
  },
  reterminal_e1003: {
    name: "Seeedstudio reTerminal E1003 (Monochrome)",
    displayType: "grayscale",
    chip: "esp32-s3",
    board: "esp32-s3-devkitc-1",
    displayModel: "Seeed-reTerminal-E1003",
    displayPlatform: "it8951",
    resolution: { width: 1872, height: 1404 },
    shape: "rect",
    psram_mode: "octal",
    frameworkHint: "ESP-IDF (Required; ESPHome 2026.7.0+)",
    system_section_overrides: {
      esp32: [
        "  framework:",
        "    type: esp-idf",
        "    sdkconfig_options:",
        "      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y",
        "      CONFIG_ESP32S3_DATA_CACHE_64KB: y"
      ]
    },
    pins: {
      i2c: { sda: "GPIO19", scl: "GPIO20" },
      spi: { clk: "GPIO7", mosi: "GPIO9", miso: "GPIO8" },
      batteryEnable: "GPIO40",
      batteryAdc: "GPIO1",
      buzzer: "GPIO45",
      buttons: { left: "GPIO5", right: "GPIO4", refresh: "GPIO3" }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 }
    },
    batteryEnableAlwaysOn: true,
    features: {
      psram: true,
      buzzer: true,
      buttons: true,
      sht4x: true,
      epaper: true,
      touch: true,
      inverted_colors: false
    },
    touch: {
      platform: "gt911",
      i2c_id: "bus_a",
      address: "0x5D",
      interrupt_pin: "GPIO2",
      reset_pin: "GPIO48"
    }
  },
  reterminal_e1004: {
    name: "Seeedstudio reTerminal E1004 13.3\" (Spectra 6)",
    displayType: "color",
    chip: "esp32-s3",
    board: "esp32-s3-devkitc-1",
    displayModel: "seeed-reterminal-e1004",
    displayPlatform: "epaper_spi",
    resolution: { width: 1200, height: 1600 },
    shape: "rect",
    psram_mode: "octal",
    // GPIO2 is shared between the display cs1_pin and the Home button (allow_other_uses required on both)
    display_config: [
      "  - platform: epaper_spi",
      "    model: seeed-reterminal-e1004",
      "    cs1_pin:",
      "      number: GPIO2",
      "      allow_other_uses: true",
      "    update_interval: never"
    ],
    external_components: [
      "  - source:",
      "      type: git",
      "      url: https://github.com/esphome/esphome",
      "      ref: pull/16706/head",
      "    components: [ epaper_spi ]"
    ],
    system_section_overrides: {
      esp32: [
        "  framework:",
        "    type: esp-idf",
        "    sdkconfig_options:",
        "      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y",
        "      CONFIG_ESP32S3_DATA_CACHE_64KB: y",
        "      CONFIG_SPIRAM_MODE_OCT: y"
      ]
    },
    pins: {
      display: { cs: null, dc: null, reset: null, busy: null },
      i2c: { sda: "GPIO19", scl: "GPIO20" },
      spi: { clk: "GPIO7", mosi: "GPIO9" },
      batteryEnable: "GPIO21",
      batteryAdc: "GPIO1",
      buzzer: "GPIO45",
      buttons: {
        left: "GPIO5",
        right: "GPIO4",
        refresh: "GPIO3",
        home: { number: "GPIO2", mode: "INPUT_PULLUP", inverted: true, allow_other_uses: true }
      }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 }
    },
    features: {
      psram: true,
      buzzer: true,
      buttons: true,
      sht4x: true,
      epaper: true
    }
  },
  trmnl_diy_esp32s3: {
    name: "Seeed Studio Trmnl DIY Kit (ESP32-S3)",
    displayType: "binary",
    displayModel: "7.50inv2p",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
    pins: {
      display: { cs: "GPIO44", dc: "GPIO10", reset: "GPIO38", busy: { number: "GPIO4", inverted: true } },
      i2c: { sda: "GPIO17", scl: "GPIO18" }, // Generic S3 defaults, user didn't specify I2C but it's good to have placeholder
      spi: { clk: "GPIO7", mosi: "GPIO9" },
      batteryEnable: "GPIO6",
      batteryAdc: "GPIO1",
      buzzer: null,
      buttons: { left: "GPIO2", refresh: "GPIO5" } // Key1=Wake/Left, Key3=Refresh
    },
    battery: {
      attenuation: "12db", // As per user yaml
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 },
      curve: [
        { from: 4.15, to: 100.0 },
        { from: 3.96, to: 90.0 },
        { from: 3.91, to: 80.0 },
        { from: 3.85, to: 70.0 },
        { from: 3.80, to: 60.0 },
        { from: 3.75, to: 50.0 },
        { from: 3.68, to: 40.0 },
        { from: 3.58, to: 30.0 },
        { from: 3.49, to: 20.0 },
        { from: 3.41, to: 10.0 },
        { from: 3.30, to: 5.0 },
        { from: 3.27, to: 0.0 }
      ]
    },
    features: {
      psram: true,
      buzzer: false,
      buttons: true,
      sht4x: false,
      epaper: true,
      inverted_colors: true
    }
  },
  trmnl: {
    name: "TRMNL (ESP32-C3)",
    displayType: "binary",
    displayModel: "7.50inv2",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    pins: {
      display: { cs: "GPIO6", dc: "GPIO5", reset: { number: "GPIO10", inverted: false }, busy: { number: "GPIO4", inverted: true } },
      i2c: { sda: "GPIO1", scl: "GPIO2" },
      spi: { clk: "GPIO7", mosi: "GPIO8" },
      batteryEnable: null,
      batteryAdc: "GPIO3",
      buzzer: null,
      buttons: null
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.30, max: 4.15 }
    },
    features: {
      psram: false,
      buzzer: false,
      buttons: false,
      sht4x: false,
      epaper: true,
      inverted_colors: true
    },
    chip: "esp32-c3",
    board: "esp32-c3-devkitm-1"
  },
  seeed_xiao_epaper_75: {
    name: "Seeed Xiao ESP32C3 - 7.5\" E-Paper",
    displayType: "binary",
    chip: "esp32-c3",
    board: "seeed_xiao_esp32c3",
    displayModel: "7.50inv2p",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    pins: {
      display: { cs: "GPIO3", dc: "GPIO5", reset: "GPIO2", busy: { number: "GPIO4", inverted: true } },
      spi: { clk: "GPIO8", mosi: "GPIO10" }
    },
    features: {
      psram: false,
      buzzer: false,
      buttons: false,
      epaper: true,
      inverted_colors: true
    }
  },

  raspberry_pi_pico_w_waveshare_2_13_v3: {
    name: "Raspberry Pi Pico W + Waveshare 2.13\" V3",
    displayType: "binary",
    chip: "rp2040",
    board: "rpipicow",
    displayModel: "2.13inv3",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 250, height: 122 },
    rotation_offset: 90,
    shape: "rect",
    supportsDeepSleep: false,
    frameworkHint: "ESPHome RP2",
    pins: {
      display: { cs: "GPIO9", dc: "GPIO8", reset: "GPIO12", busy: "GPIO13" },
      spi: { clk: "GPIO10", mosi: "GPIO11" }
    },
    features: {
      psram: false,
      buzzer: false,
      buttons: false,
      epaper: true,
      inverted_colors: true
    }
  },
  raspberry_pi_pico_2_w_waveshare_2_13_v3: {
    name: "Raspberry Pi Pico 2 W + Waveshare 2.13\" V3",
    displayType: "binary",
    chip: "rp2350",
    board: "rpipico2w",
    displayModel: "2.13inv3",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 250, height: 122 },
    rotation_offset: 90,
    shape: "rect",
    supportsDeepSleep: false,
    frameworkHint: "ESPHome RP2",
    pins: {
      display: { cs: "GPIO9", dc: "GPIO8", reset: "GPIO12", busy: "GPIO13" },
      spi: { clk: "GPIO10", mosi: "GPIO11" }
    },
    features: {
      psram: false,
      buzzer: false,
      buttons: false,
      epaper: true,
      inverted_colors: true
    }
  },

  // ========================================================================
  // WAVESHARE DEVICES
  // ========================================================================
  esp32_s3_photopainter: {
    id: "esp32_s3_photopainter",
    name: "Waveshare PhotoPainter (6-Color)",
    displayType: "color",
    displayModel: "7.30in-f",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
    pins: {
      display: { cs: "GPIO9", dc: "GPIO8", reset: "GPIO12", busy: { number: "GPIO13", inverted: true } },
      i2c: { sda: "GPIO47", scl: "GPIO48" },
      spi: { clk: "GPIO10", mosi: "GPIO11" },
      batteryEnable: null,
      batteryAdc: null,
      buzzer: null,
      buttons: { left: "GPIO0", right: "GPIO4", refresh: null }
    },
    battery: {
      attenuation: "0db",
      multiplier: 1.0,
      calibration: { min: 3.30, max: 4.20 }
    },
    features: {
      psram: true,
      buzzer: false,
      buttons: true,
      sht4x: false,
      axp2101: true,
      manual_pmic: true,
      shtc3: true,
      epaper: true
    },
    i2c_config: {
      scan: false,
      frequency: "10kHz"
    }
  },
  waveshare_esp32_s3_touch_lcd_7: {
    name: "Waveshare Touch LCD 7 7.0\" 800x480",
    displayType: "color",
    isPackageBased: true,
    hardwarePackage: "hardware/waveshare-esp32-s3-touch-lcd-7.yaml",
    resolution: { width: 800, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: {
      platform: "gt911",
      transformed: true,
      transform: { swap_xy: true }
    }
  },
  waveshare_esp32_s3_touch_lcd_4_3: {
    name: "Waveshare Touch LCD 4.3 4.3\" 800x480",
    displayType: "color",
    isPackageBased: true,
    hardwarePackage: "hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",
    resolution: { width: 800, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, touch: true },
    touch: {
      platform: "gt911",
      transformed: true,
      transform: { swap_xy: true }
    }
  },
  guition_esp32_jc4832w535: {
    name: "Guition JC4832W535 v3 3.5\" 480x320",
    displayType: "color",
    chip: "esp32-s3",
    displayPlatform: "qspi_dbi",
    displayModel: "JC4832W535",
    isPackageBased: true,
    hardwarePackage: "hardware/guition-esp32-jc8048w535.yaml",
    resolution: { width: 320, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: {
      platform: "axs15231",
      transformed: true,
      transform: { mirror_x: true, swap_xy: true },
      calibration: { x_min: 14, x_max: 461, y_min: 12, y_max: 310 }
    }
  },
  // Legacy compatibility alias for layouts saved before the corrected board id existed.
  guition_esp32_jc8048w535: {
    name: "Guition JC4832W535 v3 3.5\" 480x320 (Legacy ID)",
    displayType: "color",
    chip: "esp32-s3",
    displayPlatform: "qspi_dbi",
    displayModel: "JC4832W535",
    isPackageBased: true,
    isUntestedProfile: true,
    hardwarePackage: "hardware/guition-esp32-jc8048w535.yaml",
    resolution: { width: 320, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true }
  },
  m5stack_tab5: {
    name: "M5Stack Tab5",
    displayType: "color",
    chip: "esp32-p4",
    board: "esp32-p4-evboard",
    displayPlatform: "mipi_dsi",
    displayModel: "M5STACK-TAB5-V2",
    isPackageBased: true,
    hardwarePackage: "hardware/m5stack-tab5.yaml",
    resolution: { width: 1280, height: 720 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "st7123" }
  },
  guition_esp32_p4_jc4880p443: {
    name: "Guition JC4880P443 4.3\" 480x800",
    displayType: "color",
    chip: "esp32-p4",
    board: "esp32-p4-evboard",
    displayPlatform: "mipi_dsi",
    displayModel: "JC4880P443",
    displayId: "main_display",
    touchscreenId: "device_touchscreen",
    isPackageBased: true,
    hardwarePackage: "hardware/guition-esp32-p4-jc4880p443.yaml",
    resolution: { width: 480, height: 800 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "gt911", id: "device_touchscreen" }
  },
  guition_esp32_p4_jc8012p4a1c: {
    name: "Guition JC8012P4A1C 10.1\" 800x1280",
    displayType: "color",
    chip: "esp32-p4",
    board: "esp32-p4-evboard",
    displayPlatform: "mipi_dsi",
    displayModel: "JC8012P4A1",
    displayId: "main_display",
    touchscreenId: "device_touchscreen",
    isPackageBased: true,
    hardwarePackage: "hardware/guition-esp32-p4-jc8012p4a1c.yaml",
    resolution: { width: 800, height: 1280 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "gt911", id: "device_touchscreen" }
  },
  seeedstudio_reterminal_d1001: {
    name: "Seeed Studio reTerminal D1001 8\" 800x1280",
    displayType: "color",
    chip: "esp32-p4",
    board: "esp32-p4-evboard",
    displayPlatform: "mipi_dsi",
    displayModel: "SEEED-RETERMINAL-D1001",
    displayId: "main_display",
    touchscreenId: "device_touchscreen",
    isPackageBased: true,
    isUntestedProfile: true,
    hardwarePackage: "hardware/seeedstudio-reterminal-d1001.yaml",
    resolution: { width: 800, height: 1280 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "gsl3670", id: "device_touchscreen" }
  },
  elecrow_esp32_p4_9inch_v1_2: {
    name: "Elecrow ESP32-P4 9\" HMI 1024x600 (V1.2)",
    displayType: "color",
    chip: "esp32-p4",
    board: "esp32-p4-evboard",
    displayPlatform: "mipi_dsi",
    displayModel: "WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B",
    isPackageBased: true,
    hardwarePackage: "hardware/elecrow-esp32-p4-9inch-v1.2.yaml",
    resolution: { width: 1024, height: 600 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "gt911" }
  },
  elecrow_esp32_7inch: {
    name: "Elecrow CrowPanel 7\" HMI 800x480",
    displayType: "color",
    chip: "esp32-s3",
    board: "esp32-s3-devkitc-1",
    displayPlatform: "rpi_dpi_rgb",
    displayModel: "ELECROW-ESP32-7INCH",
    displayId: "my_display",
    touchscreenId: "my_touchscreen",
    isPackageBased: true,
    hardwarePackage: "hardware/elecrow-esp32-7inch.yaml",
    resolution: { width: 800, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: true },
    touch: { platform: "gt911", id: "my_touchscreen" }
  },
  geekmagic_mini_esp8266: {
    name: "GeekMagic Mini (ESP8266)",
    displayType: "color",
    chip: "esp8266",
    board: "esp01_1m",
    displayPlatform: "mipi_spi",
    displayModel: "ST7789V",
    isPackageBased: true,
    hardwarePackage: "hardware/geekmagic-mini-esp8266.yaml",
    resolution: { width: 240, height: 240 },
    features: { psram: false, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: false, inverted_colors: false }
  },
  geekmagic_pro_esp32: {
    name: "GeekMagic Pro (ESP32)",
    displayType: "color",
    chip: "esp32",
    board: "esp32dev",
    displayPlatform: "mipi_spi",
    displayModel: "st7789v",
    isPackageBased: true,
    hardwarePackage: "hardware/geekmagic-pro-esp32.yaml",
    resolution: { width: 240, height: 240 },
    features: { psram: false, buzzer: false, buttons: false, lcd: true, lvgl: true, touch: false, inverted_colors: false }
  },

  // ========================================================================
  // OTHER DEVICES
  // ========================================================================
  m5stack_coreink: {
    name: "M5Stack M5Core Ink (200x200)",
    displayType: "binary",
    displayModel: "1.54inv2",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 200, height: 200 },
    shape: "rect",
    features: {
      psram: false,
      buzzer: true,
      buttons: true,
      lcd: false,
      epaper: true,
      inverted_colors: true
    },
    chip: "esp32",
    board: "m5stack-coreink",
    pins: {
      // BUSY PIN REMOVED: Causes timeout on some devices (Blind Mode)
      display: { cs: "GPIO9", dc: "GPIO15", reset: "GPIO0", busy: null },
      i2c: { sda: "GPIO21", scl: "GPIO22" },
      spi: { clk: "GPIO18", mosi: "GPIO23" },
      batteryEnable: { number: "GPIO12", ignore_strapping_warning: true }, // Power Hold Pin
      batteryAdc: "GPIO35",
      buzzer: "GPIO2",
      buttons: {
        left: { number: "GPIO39", mode: "INPUT" },
        right: { number: "GPIO37", mode: "INPUT" },
        refresh: { number: "GPIO38", mode: "INPUT" }
      }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 }
    },
    i2c_config: { scan: true }, // Internal I2C for RTC
  },
  m5stack_paper: {
    name: "M5Paper (540x960)",
    displayType: "grayscale",
    displayModel: "M5Paper",
    displayPlatform: "it8951e",
    // NOTE: The IT8951E external component (Passific/m5paper_esphome) 
    // internally uses 960x540 as its panel dimensions, treating the device
    // as landscape-native. We match this here so rotation calculations work correctly.
    resolution: { width: 960, height: 540 },
    shape: "rect",
    chip: "esp32",
    board: "m5stack-paper",
    features: {
      psram: true,
      buzzer: false,
      buttons: true, // Has multifunction button
      lcd: false,
      epaper: true,
      touch: true, // Has GT911
      inverted_colors: true,
      sht3xd: true
    },
    pins: {
      display: { cs: "GPIO15", dc: null, reset: "GPIO23", busy: "GPIO27" }, // DC not used for IT8951E
      i2c: { sda: "GPIO21", scl: "GPIO22" }, // For GT911 and others
      spi: { clk: "GPIO14", mosi: "GPIO12", miso: "GPIO13" }, // M5Paper SPI
      batteryEnable: null,
      batteryAdc: "GPIO35",
      buzzer: null,
      buttons: {
        left: { number: "GPIO39", mode: "INPUT" },
        right: { number: "GPIO37", mode: "INPUT" },
        refresh: { number: "GPIO38", mode: "INPUT" }
      }
    },
    m5paper: {
      battery_power_pin: "GPIO5",
      main_power_pin: "GPIO2"
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 } // Standard LiPo
    },
    // rotation_offset: 180 flips the display upside down to correct mounting.
    rotation_offset: 180,
    touch: {
      platform: "gt911",
      i2c_id: "bus_a",
      address: 0x5D,
      interrupt_pin: "GPIO36",
      update_interval: "never", // Interrupt used
      // NOTE: User feedback indicates mirror_y: false and address 0x5D for M5Paper.
      transform: { mirror_x: false, mirror_y: false, swap_xy: true },
      // Calibration matches the IT8951E component's 960x540 coordinate space
      calibration: { x_min: 0, x_max: 960, y_min: 0, y_max: 540 }
    },
    external_components: [
      "  - source: github://Passific/m5paper_esphome"
    ]
  },
  m5stack_paper_mono: {
    id: "m5stack_paper_mono",
    name: "M5Stack PaperMono",
    isUntestedProfile: true,
    // 3.97" 480x800 monochrome e-paper (SSD1677), launched Aug 2026.
    // Display reset and power rail are NOT direct GPIOs: they hang off the
    // M5IOE1 IO expander (@0x4F) and must be configured through the m5stack
    // external component below. Battery %, frontlight, and deep sleep run
    // through the M5PM1 PMIC which has no ESPHome component yet.
    displayType: "grayscale",
    displayModel: "ssd1677",
    displayPlatform: "epaper_spi",
    resolution: { width: 480, height: 800 },
    shape: "rect",
    chip: "esp32-s3",
    board: "esp32-s3-devkitc-1",
    psram_mode: "octal",
    frameworkHint: "ESP-IDF (Required)",
    display_config: [
      "  - platform: epaper_spi",
      "    model: ssd1677",
      "    cs_pin: GPIO16",
      "    dc_pin: GPIO17",
      "    busy_pin: GPIO18",
      "    reset_pin:",
      "      m5ioe1_id: m5ioe1_hub",
      "      number: 4",
      "      mode:",
      "        output: true",
      "    dimensions:",
      "      width: 480",
      "      height: 800",
      "    update_interval: never"
    ],
    external_components: [
      "  - source:",
      "      type: git",
      "      url: https://github.com/m5stack/esphome-yaml",
      "    components: [ m5ioe1 ]"
    ],
    extra_components: [
      "m5ioe1:",
      "  id: m5ioe1_hub",
      "  address: 0x4F",
      "",
      "# EPD 3.3V rail enable (M5IOE1 PYG3). Must be ON before the panel initializes.",
      "switch:",
      "  - platform: gpio",
      "    id: epd_power_enable",
      "    name: \"EPD Power\"",
      "    internal: true",
      "    restore_mode: ALWAYS_ON",
      "    pin:",
      "      m5ioe1_id: m5ioe1_hub",
      "      number: 2",
      "      mode:",
      "        output: true"
    ],
    pins: {
      display: { cs: null, dc: null, reset: null, busy: null },
      i2c: { sda: "GPIO47", scl: "GPIO48" }, // Shared with M5PM1/M5IOE1/RX8130/FT6336
      spi: { clk: "GPIO15", mosi: "GPIO14" },
      batteryEnable: null,
      batteryAdc: null, // Battery sensing is inside the M5PM1 PMIC (no public component yet)
      buzzer: "GPIO42",
      buttons: { left: "GPIO2", right: "GPIO3" } // KEY1/KEY2, active-low
    },
    features: {
      psram: true,
      buzzer: true,
      buttons: true,
      lcd: false,
      epaper: true,
      touch: true
    },
    touch: {
      platform: "ft6336u", // FT6336G @ 0x38 (component default)
      i2c_id: "bus_a",
      interrupt_pin: "GPIO4"
    }
  },
  lilygo_t5_47: {
    id: "lilygo_t5_47",
    name: "Lilygo T5 4.7\" E-Paper",
    isUntestedProfile: true,
    displayType: "binary",
    chip: "esp32",
    board: "esp-wrover-kit",
    displayPlatform: "t547",
    resolution: { width: 960, height: 540 },
    shape: "rect",
    psram_speed: "80MHz",
    pins: {
      batteryEnable: null,
      batteryAdc: "GPIO36",
      buttons: {
        left: { number: "GPIO39", inverted: true, mode: "INPUT" },
        right: { number: "GPIO34", inverted: true, mode: "INPUT" },
        refresh: { number: "GPIO35", inverted: true, mode: "INPUT" }
      }
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0
    },
    features: {
      psram: true,
      buzzer: false,
      buttons: true,
      epaper: true,
      inverted_colors: true
    },
    frameworkHint: "Arduino 3.x (required by the t547 component)",
    system_section_overrides: {
      esphome: [
        "  platformio_options:",
        "    lib_deps:",
        "      - https://github.com/Xinyuan-LilyGO/LilyGo-EPD47.git"
      ],
      esp32: [
        "  framework:",
        "    type: arduino",
        "    version: 3.3.2",
        "  flash_size: 16MB"
      ]
    },
    external_components: [
      "  - source:",
      "      type: git",
      "      url: https://github.com/cjb0001/esphome-components",
      "      ref: idf5-arduino3",
      "    components: [\"t547\"]"
    ]
  }
};

/**
 * Returns the currently supported, selectable device profile IDs.
 * Dynamic profile loads reuse this to keep the exported list in sync.
 *
 * @param {Record<string, any>} profiles
 * @returns {string[]}
 */
export function buildSupportedDeviceIds(profiles = DEVICE_PROFILES) {
  return Object.entries(profiles)
    .filter(([, profile]) => !profile.isUntestedProfile && !profile.isComingSoon && !profile.isUnavailable)
    .map(([id]) => id);
}

/**
 * Merges a dynamic profile into an existing static profile while preserving
 * static metadata that the YAML source may not carry.
 *
 * @param {Record<string, any> | undefined} existing
 * @param {Record<string, any>} incoming
 * @returns {Record<string, any>}
 */
export function mergeDeviceProfile(existing, incoming) {
  if (!existing) {
    return incoming;
  }

  return {
    ...existing,
    ...incoming,
    features: {
      ...(existing.features || {}),
      ...(incoming.features || {})
    }
  };
}

/**
 * Applies dynamic hardware templates into the device profile registry.
 *
 * @param {Record<string, any>} profiles
 * @param {Array<Record<string, any>>} dynamicTemplates
 */
export function applyDynamicProfiles(profiles, dynamicTemplates) {
  dynamicTemplates.forEach((template) => {
    profiles[template.id] = mergeDeviceProfile(profiles[template.id], template);
  });
}

/**
 * Restores offline-persisted profiles into the registry.
 *
 * @param {Record<string, any>} profiles
 * @param {Record<string, any>} offlineProfiles
 */
export function applyOfflineProfiles(profiles, offlineProfiles) {
  Object.entries(offlineProfiles).forEach(([id, profile]) => {
    profiles[id] = profile;
  });
}

// Expose generically for other modules (Adapter, etc.)
// window.DEVICE_PROFILES = DEVICE_PROFILES; // REFACTOR: Removed in favor of strict imports
export let SUPPORTED_DEVICE_IDS = buildSupportedDeviceIds(DEVICE_PROFILES);

/**
 * Dynamically loads external hardware profiles from the backend
 * and merges them into DEVICE_PROFILES.
 */
export async function loadExternalProfiles() {
  try {
    const dynamicTemplates = await fetchDynamicHardwareProfiles();
    Logger.log(`[Devices] Loaded ${dynamicTemplates.length} hardware profiles from backend/bundle.`);
    applyDynamicProfiles(DEVICE_PROFILES, dynamicTemplates);

    // Handle offline persistence
    const offlineProfiles = getOfflineProfilesFromStorage();
    const offlineIds = Object.keys(offlineProfiles);
    if (offlineIds.length > 0) {
      Logger.log(`[Devices] Restoring ${offlineIds.length} offline profiles from localStorage.`);
      applyOfflineProfiles(DEVICE_PROFILES, offlineProfiles);
    }

    SUPPORTED_DEVICE_IDS = buildSupportedDeviceIds(DEVICE_PROFILES);

    emit(EVENTS.DEVICE_PROFILES_UPDATED);
  } catch (e) {
    Logger.error("Failed to load external hardware profiles:", e);
  }
}
