const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-CuF-2TGN.js","./vendor-Bi4LEBGV.js","./yaml-engine-CGUC5Wd0.js","./plugin-DZSA38wM.js","./plugin-D_a3SahX.js","./plugin-CcWtg1s3.js","./plugin-VOFHO5qc.js","./plugin-DI7qDwtN.js","./mdi-icons-CTSt1Fdj.js","./text_utils-DPZlj6Oi.js","./plugin-OTguXQgp.js","./plugin-CVtGMiKB.js","./plugin-B0tzpdy_.js","./plugin-DnL6isCF.js","./plugin-Bw3Kp9Ko.js","./plugin-BJVq3IMw.js","./plugin-Bjp1QNnb.js","./plugin-CU25jc-Y.js","./plugin-C49rM4t8.js","./plugin-CfUtBhFd.js","./plugin-cwUA5xgp.js","./template_converter-xh6TZI7e.js","./plugin-BCfq0qIz.js","./plugin-CmNtFR9k.js","./plugin-maqIhbwJ.js","./fillable_shape-CD6K-mx3.js","./plugin-CZQXjrwM.js","./plugin-BYh0E2GG.js","./plugin-BW_MX0VX.js","./plugin-o6wllm78.js","./plugin-Cv1cYtew.js","./plugin-zdVMq9Jc.js","./plugin-Cdp0Fd4b.js","./plugin-DAoRjksi.js","./plugin-BzVKFj2X.js","./shared-CG-Iex5A.js","./plugin-6pLmecb7.js","./plugin-Bc_LdHoy.js"])))=>i.map(i=>d[i]);
import"./vendor-Bi4LEBGV.js";import{l as ue,H as ai,p as an,h as Oe}from"./yaml-engine-CGUC5Wd0.js";const si="modulepreload",li=function(t,e){return new URL(t,e).href},At={},T=function(e,n,i){let o=Promise.resolve();if(n&&n.length>0){const a=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");o=Promise.allSettled(n.map(c=>{if(c=li(c,i),c in At)return;At[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!i)for(let m=a.length-1;m>=0;m--){const f=a[m];if(f.href===c&&(!d||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":si,d||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),d)return new Promise((m,f)=>{h.addEventListener("load",m),h.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&r(s.reason);return e().catch(r)})},sn=new EventTarget,P={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",WIDGET_UPDATED:"widget:updated",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed",DEVICE_PROFILES_UPDATED:"device-profiles-updated"};function I(t,e={}){sn.dispatchEvent(new CustomEvent(t,{detail:e}))}function B(t,e){sn.addEventListener(t,n=>e(n.detail))}const di={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},ci={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},pi={X:40,Y:40,WIDTH:200,HEIGHT:60},ui={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Fe={LANDSCAPE:"landscape",PORTRAIT:"portrait",LANDSCAPE_INVERTED:"landscape_inverted",PORTRAIT_INVERTED:"portrait_inverted"},ln={snapEnabled:!0,showGrid:!0,showConditionalWidgets:!1,showDebugGrid:!1,showRulers:!1,autoSaveEnabled:!0,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:null,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,deepSleepStayAwakeSwitch:!1,deepSleepStayAwakeEntityId:"input_boolean.esphome_stay_awake",deepSleepFirmwareGuard:!1,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",c_include_comments:!0,oeplEntityId:"",oeplDither:2,opendisplayDeviceId:"",opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},dn=50,hi={RSS:300,ENTITIES:60},gi=5e3,le=10,mi=10,cn={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},pn=800,un=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"1.0.0-rc26",constants:{COLORS:di,UI_DEFAULTS:ci,ALIGNMENT:ui,ORIENTATIONS:Fe,DEFAULT_PREFERENCES:ln,WIDGET_DEFAULTS:pi,HISTORY_LIMIT:dn,CACHE_TTL:hi,ENTITY_LIMIT:gi,ESPHOME_COLOR_MAPPING:cn,DEFAULT_CANVAS_WIDTH:pn,DEFAULT_CANVAS_HEIGHT:un,SNAP_DISTANCE:le,GRID_SIZE:mi}};function ae(){try{const t=globalThis;return typeof t.addEventListener=="function"&&typeof t.removeEventListener=="function"?t:null}catch{return null}}function H(t,e,n){const i=ae();return i?(n===void 0?i.addEventListener(t,e):i.addEventListener(t,e,n),!0):!1}function $(t,e,n){const i=ae();return i?(i.removeEventListener(t,e),!0):!1}function vt(t){const e=ae();return e?e.dispatchEvent(t):!1}function fi(){return!!ae()?.isSecureContext}function yi(){const t=ae();return{x:t?.scrollX||0,y:t?.scrollY||0}}function Dt(){return ae()?.devicePixelRatio||1}function _i(t){const e=ae();return e?e.getComputedStyle(t):null}const vi=globalThis,bi=vi.process,Gt=ae(),xi=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):bi?.env?.DEBUG||"")==="true"||!!Gt&&new URLSearchParams(Gt.location.search).get("debug")==="true",v={log:(...t)=>xi&&console.log("[ESPHomeDesigner]",...t),warn:(...t)=>console.warn("[ESPHomeDesigner]",...t),error:(...t)=>console.error("[ESPHomeDesigner]",...t)},Si=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Elecrow 7.0" HMI 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    transform:
      mirror_x: false
      mirror_y: false
    update_interval: 50ms
    address: 0x5D
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    data_pins:
      red:
        - 14
        - 21
        - 47
        - 48
        - 45
      green:
        - 9
        - 46
        - 3
        - 8
        - 16
        - 1
      blue:
        - 15
        - 7
        - 6
        - 5
        - 4
    de_pin: GPIO41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 0
    hsync_front_porch: 40
    hsync_pulse_width: 48
    hsync_back_porch: 13
    vsync_front_porch: 1
    vsync_pulse_width: 31
    vsync_back_porch: 13
    pclk_inverted: true
    color_order: RGB
    auto_clear_enabled: false
    update_interval: never
    dimensions:
      width: 800
      height: 480
    # __LAMBDA_PLACEHOLDER__
`,wi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Elecrow ESP32-P4 9" HMI 1024x600 (V1.2)
# Name: Elecrow ESP32-P4 9" HMI 1024x600 (V1.2)
# Resolution: 1024x600
# Shape: rect
# Chip: esp32-p4
# Board: esp32-p4-evboard
# ============================================================================
#
# Based on Elecrow's V1.2 ESPHome configuration. Earlier hardware revisions
# use different ESP32-C6 SDIO wiring and must not use this profile.
#

esphome:
  min_version: 2026.7.0
  on_boot:
    priority: 800
    then:
      - output.turn_on: backlight_pwm
      - delay: 200ms
      - output.turn_off: power_light
      - delay: 500ms
      - light.turn_on:
          id: back_light
          brightness: 1

esp32:
  board: esp32-p4-evboard
  variant: esp32p4
  engineering_sample: true
  cpu_frequency: 360MHz
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      execute_from_psram: true
      enable_idf_experimental_features: true

psram:
  speed: 200MHz

esp_ldo:
  - channel: 3
    voltage: 2.5V
  - channel: 4
    voltage: 2.5V

esp32_hosted:
  variant: esp32c6
  active_high: true
  reset_pin: GPIO32
  cmd_pin: GPIO19
  clk_pin: GPIO18
  d0_pin: GPIO17
  d1_pin: GPIO16
  d2_pin: GPIO15
  d3_pin: GPIO14

i2c:
  - id: bus_a
    sda: GPIO45
    scl: GPIO46
    frequency: 400kHz

output:
  - platform: ledc
    pin: GPIO31
    id: backlight_pwm
  - platform: gpio
    id: power_light
    pin: GPIO29
    inverted: true

light:
  - platform: monochromatic
    name: "Backlight"
    output: backlight_pwm
    id: back_light
    restore_mode: ALWAYS_ON
    internal: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    reset_pin: GPIO40
    interrupt_pin: GPIO42
    update_interval: 50ms
    transform:
      swap_xy: false
      mirror_x: false
      mirror_y: false

display:
  - platform: mipi_dsi
    id: my_display
    model: WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B
    reset_pin: GPIO41
    update_interval: never
    auto_clear_enabled: false
    dimensions:
      width: 1024
      height: 600
    color_order: RGB
    color_depth: 16
    # __LAMBDA_PLACEHOLDER__
`,Ei=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: GeekMagic Mini (ESP8266)
#         - Display Platform: mipi_spi
#         - Touchscreen: No
#         - PSRAM: No
#         - Framework: Arduino (ESP8266)
# Name: GeekMagic Mini (ESP8266)
# Resolution: 240x240
# Shape: rect
# Inverted: false
# Board: esp01_1m
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Create a new device in ESPHome
#         - Click "New Device"
#         - Select: ESP8266
#         - Board: esp01_1m
#         - Framework: Arduino (Default)
#
# STEP 2: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp8266) are auto-commented
#           to avoid conflicts with your existing base setup.
#
# HARDWARE NOTES:
#         - ST7789V 240x240 SPI display.
#         - Backlight is PWM on GPIO05 and active-low.
#
# CAPTIVE PORTAL:
#         - If WiFi connection fails, the device will create a hotspot.
#         - Search for its name in your WiFi settings.
#         - Connect and go to http://192.168.4.1 to configure WiFi.
#
# ============================================================================

esphome: {min_version: 2025.5.0}

esp8266: {board: esp01_1m}

spi: {clk_pin: GPIO14, mosi_pin: GPIO13, interface: hardware, id: spihwd}

display:
  - platform: mipi_spi
    id: my_display
    model: ST7789V
    spi_id: spihwd
    dimensions: {height: 240, width: 240, offset_height: 0, offset_width: 0}
    buffer_size: 12.5%
    color_depth: 16
    invert_colors: true
    dc_pin: GPIO00
    reset_pin: GPIO02
    spi_mode: mode3
    data_rate: 40000000
    auto_clear_enabled: false
    update_interval: 60s
    # __LAMBDA_PLACEHOLDER__

output:
  - platform: esp8266_pwm
    pin: GPIO05
    frequency: 1000Hz
    id: backlight_pwm
    inverted: true

light:
  - platform: monochromatic
    output: backlight_pwm
    name: "Backlight"
    id: backlight
    restore_mode: ALWAYS_ON
`,Ci=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: GeekMagic Pro (ESP32)
# Name: GeekMagic Pro (ESP32)
#         - Display Platform: mipi_spi (ST7789V)
# Resolution: 240x240
#         - Framework: Arduino
# ============================================================================

esphome:
  min_version: 2025.5.0

esp32:
  board: esp32dev
  framework:
    type: arduino

spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  interface: hardware
  id: spihwd

display:
  - platform: mipi_spi
    id: my_display
    model: st7789v
    spi_id: spihwd
    data_rate: 40MHz
    dc_pin: GPIO2
    reset_pin: GPIO4
    spi_mode: MODE3
    dimensions:
      width: 240
      height: 240
    invert_colors: true
    auto_clear_enabled: false
    update_interval: never
    # __LAMBDA_PLACEHOLDER__

output:
  - platform: ledc
    pin: GPIO25
    inverted: true
    id: backlight_pwm

light:
  - platform: monochromatic
    output: backlight_pwm
    name: "Backlight"
    id: display_backlight
    restore_mode: ALWAYS_ON
`,Pi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4827w543 4.3" IPS 480x272
#         - Display Platform: qspi_dbi (NV3041A)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc4827w543"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 4MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm
    frequency: 1000Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO4
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin:
      number: 3
      ignore_strapping_warning: true
    reset_pin: GPIO38
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  id: quad_spi
  type: quad
  clk_pin: GPIO47
  data_pins: [21,48,40,39]

display:
  - platform: qspi_dbi
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    model: CUSTOM
    data_rate: 20MHz
    dimensions:
      width: 480
      height: 272
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    invert_colors: true
    rotation: 180
    init_sequence:
      - [0xff,0xa5]
      - [0x36,0xc0]
      - [0x3A,0x01]
      - [0x41,0x03]
      - [0x44,0x15]
      - [0x45,0x15]
      - [0x7d,0x03]
      - [0xc1,0xbb]
      - [0xc2,0x05]
      - [0xc3,0x10]
      - [0xc6,0x3e]
      - [0xc7,0x25]
      - [0xc8,0x11]
      - [0x7a,0x5f]
      - [0x6f,0x44]
      - [0x78,0x70]
      - [0xc9,0x00]
      - [0x67,0x21]
      - [0x51,0x0a]
      - [0x52,0x76]
      - [0x53,0x0a]
      - [0x54,0x76]
      - [0x46,0x0a]
      - [0x47,0x2a]
      - [0x48,0x0a]
      - [0x49,0x1a]
      - [0x56,0x43]
      - [0x57,0x42]
      - [0x58,0x3c]
      - [0x59,0x64]
      - [0x5a,0x41]
      - [0x5b,0x3c]
      - [0x5c,0x02]
      - [0x5d,0x3c]
      - [0x5e,0x1f]
      - [0x60,0x80]
      - [0x61,0x3f]
      - [0x62,0x21]
      - [0x63,0x07]
      - [0x64,0xe0]
      - [0x65,0x02]
      - [0xca,0x20]
      - [0xcb,0x52]
      - [0xcc,0x10]
      - [0xcd,0x42]
      - [0xd0,0x20]
      - [0xd1,0x52]
      - [0xd2,0x10]
      - [0xd3,0x42]
      - [0xd4,0x0a]
      - [0xd5,0x32]
      - [0x80,0x00]
      - [0xa0,0x00]
      - [0x81,0x07]
      - [0xa1,0x06]
      - [0x82,0x02]
      - [0xa2,0x01]
      - [0x86,0x11]
      - [0xa6,0x10]
      - [0x87,0x27]
      - [0xa7,0x27]
      - [0x83,0x37]
      - [0xa3,0x37]
      - [0x84,0x35]
      - [0xa4,0x35]
      - [0x85,0x3f]
      - [0xa5,0x3f]
      - [0x88,0x0b]
      - [0xa8,0x0b]
      - [0x89,0x14]
      - [0xa9,0x14]
      - [0x8a,0x1a]
      - [0xaa,0x1a]
      - [0x8b,0x0a]
      - [0xab,0x0a]
      - [0x8c,0x14]
      - [0xac,0x08]
      - [0x8d,0x17]
      - [0xad,0x07]
      - [0x8e,0x16]
      - [0xae,0x06]
      - [0x8f,0x1B]
      - [0xaf,0x07]
      - [0x90,0x04]
      - [0xb0,0x04]
      - [0x91,0x0a]
      - [0xb1,0x0a]
      - [0x92,0x16]
      - [0xb2,0x15]
      - [0xff,0x00]
      - [0x11,0x00]
      - [0x29,0x00]
    # __LAMBDA_PLACEHOLDER__
`,Ii=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition JC4832W535 v3 3.5" IPS 480x320
#         - Display Platform: qspi_dbi
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: AXS15231 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc4832w535-v3"
    version: "1.0"
  platformio_options:
    upload_speed: 921600
    board_build.flash_mode: dio
    board_build.f_flash: 80000000L
    board_build.f_cpu: 240000000L
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO4
    scl: GPIO8
    scan: true

touchscreen:
  - platform: axs15231
    id: my_touchscreen
    display: my_display
    i2c_id: bus_a
    update_interval: 30ms
    calibration:
      x_min: 14
      x_max: 461
      y_min: 12
      y_max: 310
    transform:
      mirror_x: true
      mirror_y: false
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - id: qspi_display
    type: quad
    clk_pin: GPIO47
    data_pins: [21, 48, 40, 39]
    
display:
  - id: my_display
    platform: qspi_dbi
    spi_id: qspi_display
    dimensions:
      height: 480
      width: 320
    model: JC4832W535
    data_rate: 40MHz
    rotation: 270
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    draw_from_origin: true
    update_interval: never
    auto_clear_enabled: false
    show_test_card: false
    # __LAMBDA_PLACEHOLDER__
`,ki=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition JC8048W550 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB 565)
#         - PSRAM: Yes (Octal)
#         - Touch: GT911 (I2C)
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc8048w550"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

# -------------------------------------------
# Internal outputs
# -------------------------------------------
output:
  # Backlight LED
  - platform: ledc
    pin:
      number: GPIO02
    id: gpio_backlight_pwm
    frequency: 1220Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

#-------------------------------------------
# Touchscreen gt911 i2c
#-------------------------------------------
i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

#-------------------------------------------
# Display
#-------------------------------------------
display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false # takes 2.8 seconds to clear the display
    dimensions:
      width: 800
      height: 480
    de_pin: GPIO40
    hsync_pin: GPIO39
    vsync_pin: GPIO41
    pclk_pin: GPIO42
    pclk_frequency: 16MHz
    data_pins:
      red:
        - 45
        - 48
        - 47
        - 21
        - 14
      green:
        - 5
        - 6
        - 7
        - 15
        - 16
        - 4
      blue:
        - 8
        - 3
        - 46
        - 9
        - 1


    # __LAMBDA_PLACEHOLDER__`,Li=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition ESP32-P4 JC4880P443
#         - Display Platform: mipi_dsi
#         - Touchscreen: GT911
#         - PSRAM: Yes (Hex)
#         - Framework: ESP-IDF with experimental ESP32-P4 features
# Name: Guition ESP32-P4 JC4880P443
# Resolution: 480x800
# Shape: rect
# Chip: esp32-p4
# Board: esp32-p4-evboard
# ============================================================================
#
# HARDWARE NOTES:
#         - ESP32-P4 boards do not have built-in WiFi. This board uses an
#           ESP32-C6 companion over SDIO, configured below via esp32_hosted.
#         - esp_ldo channel 3 powers the MIPI display rail.
#         - GPIO23 drives the display backlight PWM.
#         - ES8311 audio codec is wired on the shared I2C bus and I2S pins.
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Create a new device in ESPHome
#         - Click "New Device"
#         - Select: ESP32-P4
#         - Board: esp32-p4-evboard
#         - Framework: ESP-IDF (Required)
#
# STEP 2: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, esp32_hosted, psram, esp_ldo)
#           are included because they are required for this board to boot,
#           connect to WiFi, and power the display.
#
# ============================================================================

esphome:
  min_version: 2025.12.0
  project:
    name: "Guition.ESP32-P4-JC4880P443"
    version: "1.0"

esp32:
  board: esp32-p4-evboard
  variant: esp32p4
  cpu_frequency: 360MHz
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      enable_idf_experimental_features: true

esp_ldo:
  - channel: 3
    voltage: 2.5V

psram:
  mode: hex
  speed: 200MHz

preferences:
  flash_write_interval: 5min

esp32_hosted:
  variant: ESP32C6
  reset_pin: GPIO54
  cmd_pin: GPIO19
  clk_pin: GPIO18
  d0_pin: GPIO14
  d1_pin: GPIO15
  d2_pin: GPIO16
  d3_pin: GPIO17
  active_high: true

i2c:
  - id: i2c_bus
    sda: GPIO7
    scl: GPIO8
    scan: false
    frequency: 400kHz

output:
  - platform: ledc
    pin: GPIO23
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    id: display_backlight
    name: Backlight
    output: gpio_backlight_pwm
    restore_mode: ALWAYS_ON

touchscreen:
  - platform: gt911
    id: device_touchscreen
    i2c_id: i2c_bus
    reset_pin: GPIO3
    update_interval: 16ms
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: mipi_dsi
    id: main_display
    model: JC4880P443
    reset_pin: GPIO27
    byte_order: little_endian
    rotation: 0
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__

audio_dac:
  - platform: es8311
    id: es8311_dac
    address: 0x18
    i2c_id: i2c_bus

i2s_audio:
  - id: i2s_bus
    i2s_lrclk_pin: GPIO10
    i2s_bclk_pin: GPIO12
    i2s_mclk_pin: GPIO13

microphone:
  - platform: i2s_audio
    id: es8311_mic
    i2s_audio_id: i2s_bus
    i2s_din_pin: GPIO48
    adc_type: external
    pdm: false
    channel: left

speaker:
  - platform: i2s_audio
    id: es8311_hardware_out
    i2s_audio_id: i2s_bus
    i2s_dout_pin: GPIO9
    dac_type: external
    audio_dac: es8311_dac
`,Ti=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition ESP32-P4 JC8012P4A1C
#         - Display Platform: mipi_dsi
#         - Touchscreen: GT911
#         - PSRAM: Yes (Hex, 32MB module)
#         - Framework: ESP-IDF with experimental ESP32-P4 features
# Name: Guition ESP32-P4 JC8012P4A1C
# Resolution: 800x1280
# Shape: rect
# Chip: esp32-p4
# Board: esp32-p4-evboard
# ============================================================================
#
# HARDWARE NOTES:
#         - ESP32-P4 boards do not have built-in WiFi. This board uses an
#           ESP32-C6 companion over SDIO, configured below via esp32_hosted.
#         - esp_ldo channel 3 powers the MIPI display rail.
#         - GPIO23 drives the display backlight PWM.
#         - ES8311 audio codec is wired on the shared I2C bus and I2S pins.
#         - Camera, TF card, and RTC peripherals are left for manual extension.
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Create a new device in ESPHome
#         - Click "New Device"
#         - Select: ESP32-P4
#         - Board: esp32-p4-evboard
#         - Framework: ESP-IDF (Required)
#
# STEP 2: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, esp32_hosted, psram, esp_ldo)
#           are included because they are required for this board to boot,
#           connect to WiFi, and power the display.
#
# ============================================================================

esphome:
  min_version: 2025.12.0
  project:
    name: "Guition.ESP32-P4-JC8012P4A1C"
    version: "1.0"

esp32:
  board: esp32-p4-evboard
  variant: esp32p4
  cpu_frequency: 360MHz
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      enable_idf_experimental_features: true

esp_ldo:
  - channel: 3
    voltage: 2.5V

psram:
  mode: hex
  speed: 200MHz

preferences:
  flash_write_interval: 5min

esp32_hosted:
  variant: ESP32C6
  reset_pin: GPIO54
  cmd_pin: GPIO19
  clk_pin: GPIO18
  d0_pin: GPIO14
  d1_pin: GPIO15
  d2_pin: GPIO16
  d3_pin: GPIO17
  active_high: true

i2c:
  - id: i2c_bus
    sda: GPIO7
    scl: GPIO8
    scan: false
    frequency: 400kHz

output:
  - platform: ledc
    pin: GPIO23
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    id: display_backlight
    name: Backlight
    output: gpio_backlight_pwm
    restore_mode: ALWAYS_ON

touchscreen:
  - platform: gt911
    id: device_touchscreen
    i2c_id: i2c_bus
    reset_pin: GPIO3
    update_interval: 16ms
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: mipi_dsi
    id: main_display
    model: JC8012P4A1
    byte_order: little_endian
    rotation: 90
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__

audio_dac:
  - platform: es8311
    id: es8311_dac
    address: 0x18
    i2c_id: i2c_bus

i2s_audio:
  - id: i2s_bus
    i2s_lrclk_pin: GPIO10
    i2s_bclk_pin: GPIO12
    i2s_mclk_pin: GPIO13

microphone:
  - platform: i2s_audio
    id: es8311_mic
    i2s_audio_id: i2s_bus
    i2s_din_pin: GPIO48
    adc_type: external
    pdm: false
    channel: left

speaker:
  - platform: i2s_audio
    id: es8311_hardware_out
    i2s_audio_id: i2s_bus
    i2s_dout_pin: GPIO9
    dac_type: external
    audio_dac: es8311_dac
`,Mi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4848s040 4.0" IPS 480x480
#         - Display Platform: st7701s (SPI/RGB)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-S3-4848S040"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO38  
    id: gpio_backlight_pwm
    frequency: 100Hz
  - id: internal_relay_1
    platform: gpio
    pin: GPIO40
  - id: internal_relay_2
    platform: gpio
    pin: GPIO02
  - id: internal_relay_3
    platform: gpio
    pin: GPIO01

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO45
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - id: lcd_spi
    clk_pin: GPIO48
    mosi_pin: GPIO47

display:
  - platform: st7701s
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    spi_mode: MODE3
    data_rate: 2MHz
    color_order: RGB
    invert_colors: False
    dimensions:
      width: 480
      height: 480
    cs_pin: GPIO39
    de_pin: GPIO18
    hsync_pin: GPIO16
    vsync_pin: GPIO17
    pclk_pin: GPIO21
    pclk_frequency: 12MHz
    pclk_inverted: False
    hsync_pulse_width: 8
    hsync_front_porch: 10
    hsync_back_porch: 20
    vsync_pulse_width: 8
    vsync_front_porch: 10
    vsync_back_porch: 10
    init_sequence:
      - 1
      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x10 ]
      - [ 0xCD, 0x00 ]
    data_pins:
      red: [11, 12, 13, 14, 0]
      green: [8, 20, 3, 46, 9, 10]
      blue: [4, 5, 6, 7, 15]
    # __LAMBDA_PLACEHOLDER__
`,Oi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: LilyGo T-Display S3 170x320
#         - Display Platform: ili9xxx (ST7789V via I80)
#         - PSRAM: Yes (Octal)
#         - Buttons: GPIO0, GPIO14
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_unflags: -Werror=all
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep


esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  framework:
    type: esp-idf

psram:
  speed: 80MHz
  mode: octal

preferences:
  flash_write_interval: 5min

power_supply:
  - id: lcd_pwr
    enable_on_boot: true
    pin: GPIO15

i80:
  dc_pin: 7
  wr_pin: 8
  rd_pin: 9
  data_pins:
    - 39
    - 40
    - 41
    - 42
    -
      ignore_strapping_warning: true
      number: 45
    -
      ignore_strapping_warning: true
      number: 46
    - 47
    - 48

i2c:
  - id: bus_a
    sda: 17
    scl: 18

display:
  - platform: ili9xxx
    id: my_display
    rotation: 270
    bus_type: i80
    cs_pin: 6
    reset_pin: 5
    model: st7789v
    data_rate: 2MHz
    dimensions:
      height: 320
      width: 170
      offset_width: 35
      offset_height: 0
    color_order: bgr
    invert_colors: true
    auto_clear_enabled: false
    update_interval: never
    # __LAMBDA_PLACEHOLDER__

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO0
      inverted: true
    name: "Button 1"
  - platform: gpio
    pin:
      number: GPIO14
      inverted: true
    name: "Button 2"

output:
  - platform: ledc
    pin: GPIO38
    id: GPIO38
    frequency: 2000

light:
  - platform: monochromatic
    output: GPIO38
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
`,Ai=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: M5Stack Tab5
#         - Display Platform: mipi_dsi
#         - Touchscreen: ST7123
#         - PSRAM: Yes
#         - Framework: ESP-IDF
# Name: M5Stack Tab5
# Resolution: 1280x720
# Shape: rect
# Chip: esp32-p4
# Board: esp32-p4-evboard
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Create a new device in ESPHome
#         - Click "New Device"
#         - Select: ESP32-P4
#         - Framework: ESP-IDF (Required)
#
# STEP 2: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, esp32_hosted, psram) are auto-commented
#           to avoid conflicts with your existing base setup.
#
# HARDWARE NOTES:
#         - Newer Tab5 units use model: M5STACK-TAB5-V2 with ST7123 touch.
#         - Older Tab5 units may need model: M5STACK-TAB5 and a matching touch config.
#
# CAPTIVE PORTAL:
#         - If WiFi connection fails, the device will create a hotspot.
#         - Search for its name in your WiFi settings.
#         - Connect and go to http://192.168.4.1 to configure WiFi.
#
# ============================================================================

esphome:
  min_version: 2026.2.0

esp32:
  board: esp32-p4-evboard
  variant: esp32p4
  flash_size: 16MB
  framework: {type: esp-idf, advanced: {enable_idf_experimental_features: true}}

esp32_hosted:
  variant: esp32c6
  clk_pin: GPIO12
  cmd_pin: GPIO13
  d0_pin: GPIO11
  d1_pin: GPIO10
  d2_pin: GPIO9
  d3_pin: GPIO8
  reset_pin: GPIO15
  slot: 1

psram: {mode: hex, speed: 200MHz}

i2c:
  - {id: bsp_bus, sda: GPIO31, scl: GPIO32, frequency: 400kHz}

pi4ioe5v6408:
  - {id: pi4ioe1, address: 0x43}

display:
  - platform: mipi_dsi
    id: my_display
    model: M5STACK-TAB5-V2
    # Older Tab5 units use:
    # model: M5STACK-TAB5
    dimensions: {width: 1280, height: 720}
    reset_pin: {pi4ioe5v6408: pi4ioe1, number: 4}
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__

touchscreen:
  - platform: st7123
    id: my_touchscreen
    i2c_id: bsp_bus
    interrupt_pin: GPIO23
    reset_pin: {pi4ioe5v6408: pi4ioe1, number: 5}
`,Di=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Seeedstudio SenseCAP Indicator
# Name: Seeedstudio SenseCAP Indicator
# Resolution: 480x480
# Shape: rect
# Orientation: landscape
# Inverted: false
# Dark Mode: enabled
# Refresh Interval: 300
#
# Hardware Details:
# - MCU: ESP32-S3 (WIFI/BLE/Display/Touch) + RP2040 (Sensors/Audio/LoRa)
# - Display: ST7701 4.0" 480x480 IPS (3-wire SPI + RGB)
# - Touch: FT5x06 (I2C) - FT6336
# - IO Expander: PCA9535 (I2C-0x20)
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE everything below into your device YAML
#
# ============================================================================

esphome:
  name: seeedstudio-sensecap-indicator
  friendly_name: Seeedstudio SenseCAP Indicator
  min_version: 2024.11.0

esp32:
  variant: esp32s3
  flash_size: 8MB
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESPTOOLPY_FLASHSIZE_8MB: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

logger:
  hardware_uart: UART0
  level: DEBUG

# I2C Bus for IO Expander and Touchscreen
i2c:
  - id: bus_a
    sda: GPIO39
    scl: GPIO40
    scan: false

# SPI Bus for Display and LoRa (if present)
spi:
  - id: lcd_spi
    clk_pin: GPIO41
    mosi_pin: GPIO48
    miso_pin: GPIO47

# IO Expander (16-bit PCA9535)
pca9554:
  - id: pca9554a_device
    address: 0x20
    pin_count: 16

# Display Backlight
output:
  - platform: ledc
    pin:
      number: GPIO45
      ignore_strapping_warning: true
    id: ledc_gpio45
    frequency: 100Hz

light:
  - platform: monochromatic
    name: "Backlight"
    id: backlight
    output: ledc_gpio45
    restore_mode: ALWAYS_ON

# User Button
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO38
      inverted: true
    name: "User Button"
  # __TOUCH_SENSORS_PLACEHOLDER__

# Display - Using mipi_rgb platform (recommended, pre-configured)
display:
  - platform: mipi_rgb
    model: SEEED-INDICATOR-D1
    id: my_display
    auto_clear_enabled: true
    lambda: |-
      # __LAMBDA_PLACEHOLDER__

# Touchscreen
touchscreen:
  platform: ft5x06
  id: my_touchscreen
  transform:
    mirror_x: true
    mirror_y: true

# Enable Home Assistant API
api:

# HA Control Buttons for page navigation
button:
  - platform: template
    name: "Next Page"
    icon: "mdi:arrow-right"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) + 1;'
  - platform: template
    name: "Previous Page"
    icon: "mdi:arrow-left"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) - 1;'
  - platform: template
    name: "Refresh Display"
    icon: "mdi:refresh"
    on_press:
      then:
        - component.update: my_display
  - platform: template
    name: "Go to Page 1"
    icon: "mdi:home"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: 0
`,Gi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028 2.8" 240x320
#         - Display Platform: ili9xxx (ILI9341)
#         - Touchscreen: XPT2046 (SPI)
#         - RGB LED: Yes
#         - Framework: Arduino
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: Arduino
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: arduino

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: false
      mirror_y: true
      swap_xy: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: ILI9341
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: true
    color_palette: 8BIT
    update_interval: never
    auto_clear_enabled: false
    transform:
      swap_xy: true
      mirror_x: false
    dimensions:
      height: 240
      width: 320
    # __LAMBDA_PLACEHOLDER__
`,Hi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028R 2.8" 240x320 (Resistive)
#         - Display Platform: ili9xxx (ILI9341)
#         - Touchscreen: XPT2046 (SPI Resistive)
#         - RGB LED: Yes
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: esp-idf

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    frequency: 1000hz
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on    
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: ILI9341
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: false
    update_interval: never
    auto_clear_enabled: false
    transform:
      swap_xy: true
      mirror_x: false
    dimensions:
      height: 240
      width: 320
    # __LAMBDA_PLACEHOLDER__
`,Ri=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 4827s032R 4.3" 480x272 (Resistive)
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: XPT2046 (SPI)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      COMPILER_OPTIMIZATION_SIZE: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_ESP32S3_DATA_CACHE_LINE_64B: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y
      CONFIG_ESPTOOLPY_FLASHSIZE_16MB: y 
      
preferences:
  flash_write_interval: 5min      

psram:
  mode: octal
  speed: 80MHz

i2c:
  - id: bus_a
    sda: 19
    scl: 20

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic 
    output: gpio_backlight_pwm
    name: Display Backlight
    id: display_backlight
    restore_mode: ALWAYS_ON
    
spi:
  - id: spi_touch
    clk_pin: 12
    mosi_pin: 11
    miso_pin: 13 

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: spi_touch
    cs_pin: 38
    interrupt_pin: 18
    update_interval: 100ms
    threshold: 400
    calibration:
      x_min: 300 
      x_max: 3700
      y_min: 300 
      y_max: 3700 
    transform:
      swap_xy: true 
      mirror_x: false
      mirror_y: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: rpi_dpi_rgb
    dimensions:
      width: 480 
      height: 280
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz 
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 43
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 12
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,Bi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s050 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S050"
    version: "1.0"
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

preferences:
  flash_write_interval: 5min

psram:
  mode: octal
  speed: 80MHz

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    transform:
      mirror_x: true
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    dimensions:
      width: 800
      height: 480
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 8
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,Ni=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s070 7.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Audio: I2S Speaker
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S070"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

i2s_audio:
    i2s_lrclk_pin: 18
    i2s_bclk_pin:
      number: 0
      ignore_strapping_warning: true

output:
  - platform: ledc
    id: gpio_backlight_pwm
    pin: GPIO02
    frequency: 1220

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    mirror_y: false
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false
    dimensions:
      width: 800
      height: 480
    de_pin: 41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 42
    pclk_frequency: 16MHz
    pclk_inverted: True
    hsync_pulse_width: 30
    hsync_front_porch: 210
    hsync_back_porch: 16
    vsync_pulse_width: 13
    vsync_front_porch: 22
    vsync_back_porch: 10
    data_pins:
      red: [14, 21, 47, 48, 45]
      green: [9, 46, 3, 8, 16, 1]
      blue: [15, 7, 6, 5, 4]
    # __LAMBDA_PLACEHOLDER__
`,Wi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET
#         - Display Platform: st7701s (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: CST816
#         - Framework: ESP-IDF
# Name: ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET
# Resolution: 480x480
# Shape: round
# ============================================================================
#
# BASED ON:
# - https://viewedisplay.com/product/esp32-2-1-inch-480x480-round-tft-knob-display-rotary-encoder-arduino-lvgl/
# - https://github.com/VIEWESMART/UEDX48480021-MD80ESP32-2.1inch-Touch-Knob-Display
# - https://github.com/esphome/feature-requests/issues/3254
#
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "ViewDisplay.ESP32-S3-UEDX48480021"
    version: "1.0"

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

logger:
  level: DEBUG

spi:
  - id: lcd_spi
    clk_pin:
      number: GPIO13
      allow_other_uses: true
    mosi_pin:
      number: GPIO12
      allow_other_uses: true

output:
  - platform: ledc
    pin: GPIO7
    id: gpio_backlight_pwm
    frequency: 1000Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO16
    scl: GPIO15
    scan: true

display:
  - platform: st7701s
    id: my_display
    rotation: 0
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    dimensions:
      width: 480
      height: 480
    cs_pin: GPIO18
    reset_pin:
      number: GPIO8
      allow_other_uses: true
    de_pin: GPIO17
    hsync_pin: GPIO46
    vsync_pin: GPIO3
    pclk_pin: GPIO9
    pclk_frequency: 12MHz
    hsync_pulse_width: 255
    hsync_front_porch: 1
    hsync_back_porch: 255
    vsync_pulse_width: 254
    vsync_front_porch: 2
    vsync_back_porch: 254
    data_pins:
      red: [40, 41, 42, 2, 1]
      green: [21, 47, 48, 45, 38, 39]
      blue:
        - 10
        - 11
        - number: 12
          allow_other_uses: true
        - number: 13
          allow_other_uses: true
        - 14
    # __LAMBDA_PLACEHOLDER__

touchscreen:
  - platform: cst816
    id: my_touchscreen
    reset_pin:
      number: GPIO8
      allow_other_uses: true
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

sensor:
  - platform: rotary_encoder
    name: Rotary Encoder
    id: knob_encoder
    pin_a: GPIO6
    pin_b: GPIO5
    resolution: 2
    internal: true

binary_sensor:
  # __TOUCH_SENSORS_PLACEHOLDER__
  - platform: gpio
    name: Encoder Button
    id: encoder_button
    pin:
      number: GPIO0
      inverted: true
      ignore_strapping_warning: true
    internal: true`,Fi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 4.3 4.3" 800x480
#         - Display Platform: rpi_dpi_rgb
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
      CONFIG_ESP32S3_DATA_CACHE_64KB: "y"
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: 8
    scl: 9

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin: 4
    reset_pin:
      ch422g: ch422g_hub
      number: 1
    transform:
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHz
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    enable_pin:
      ch422g: ch422g_hub
      number: 2
    de_pin:
      number: 5
    hsync_pin:
      number: 46
      ignore_strapping_warning: true
    vsync_pin:
      number: 3
      ignore_strapping_warning: true
    pclk_pin: 7
    hsync_back_porch: 30
    hsync_front_porch: 210
    hsync_pulse_width: 30
    vsync_back_porch: 4
    vsync_front_porch: 4
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,zi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 7 7.0" 800x480
#         - Display Platform: mipi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# CAPTIVE PORTAL:
#         - If WiFi connection fails, look for a hotspot named:
#           "Waveshare-7-Inch"
#         - Connect and go to http://192.168.4.1 to configure WiFi.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-S3-touch-lcd-7"
    version: "1.0"
  platformio_options:
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80Mhz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO9
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  interrupt_pin: GPIO4
  reset_pin:
    ch422g: ch422g_hub
    number: 1
    mode: OUTPUT
  transform:
    swap_xy: true
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: mipi_rgb
    model: ESP32-S3-TOUCH-LCD-7-800X480
    id: my_display
    rotation: 0
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHZ
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    de_pin:
      number: GPIO5
    hsync_pin:
      number: GPIO46
      ignore_strapping_warning: true
    vsync_pin:
      number: GPIO3
      ignore_strapping_warning: true
    pclk_pin: GPIO7
    pclk_inverted: true
    hsync_back_porch: 8
    hsync_front_porch: 8
    hsync_pulse_width: 4
    vsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,Yi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Universal e-Paper Raw Panel Driver Board
# Display: 7.5" e-Paper (V2)
# Resolution: 800x480
# Shape: rect
# Orientation: landscape
# Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-Universal-epaper-7.5v2"
    version: "1.0"

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO13
  mosi_pin: GPIO14

display:
  - platform: waveshare_epaper
    cs_pin: GPIO15
    dc_pin: GPIO27
    busy_pin: 
      number: GPIO25
      inverted: true
    reset_pin: GPIO26
    reset_duration: 10ms
    model: 7.50inv2p
    rotation: 0°
    update_interval: 5min
    id: my_display

    # __LAMBDA_PLACEHOLDER__
`,hn="esphome-designer-ha-auth";let gn=null;function bt(){try{const t=globalThis.location;return t||null}catch{return null}}function Je(){try{return globalThis.localStorage??null}catch{return null}}function mn(t){if(typeof t!="string")return;const e=t.trim();!e||e==="null"||(gn=e)}function $i(){try{const t=globalThis.name;if(!t)return;const e=JSON.parse(t);e?.type===hn&&mn(e.accessToken)}catch{}}function Ui(){$i();try{globalThis.addEventListener?.("message",t=>{const e=bt();if(e&&t.origin!==e.origin)return;const n=t.data;n?.type===hn&&mn(n.accessToken)})}catch{}}function fn(t){if(!t)return null;let e=t.trim();if(!e)return null;try{const n=new URL(e);return n.protocol!=="http:"&&n.protocol!=="https:"?null:(e=`${n.origin}${n.pathname}`,n.search&&(e+=n.search),e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("reterminal_dashboard")&&(e=e.replace("reterminal_dashboard","esphome_designer")),e.includes("/api/")||(e+="/api/esphome_designer"),e)}catch{return null}}function yn(){const t=_n();if(t){const e=fn(t);return e?(e!==t.trim()&&(v.log("[Env] Normalizing stored manual HA URL"),vn(e)),e):(v.warn("[Env] Ignoring invalid manually configured HA URL"),null)}try{const e=bt();return!e||e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function _n(){try{const t=Je();return t?t.getItem("ha_manual_url"):null}catch{return null}}function vn(t){try{const e=Je();if(!e)return;if(t){const n=fn(t);if(!n){v.warn("[Env] Refusing to store invalid HA URL");return}e.setItem("ha_manual_url",n)}else e.removeItem("ha_manual_url")}catch(e){v.error("Failed to save HA URL:",e)}}function bn(){try{const t=Je();return t?t.getItem("ha_llat_token"):null}catch{return null}}function xn(){return gn||bn()}function ji(t){try{const e=Je();if(!e)return;t?e.setItem("ha_llat_token",t):e.removeItem("ha_llat_token")}catch(e){v.error("Failed to save HA Token:",e)}}let F=yn();Ui();function Ht(){F=yn()}function W(){return!!F}function st(){try{const t=bt();return!t||t.protocol==="file:"?!1:t.hostname==="homeassistant"||t.hostname==="hassio"||t.pathname.includes("/api/esphome_designer")||t.pathname.includes("/esphome-designer")}catch{return!1}}const Vi="data-esphome-designer-panel-root",qi="data-esphome-designer-overlay-root";function Xi(){return document.querySelector(`[${Vi}]`)||document.body}function Ki(){return document.querySelector(`[${qi}]`)||Xi()}function X(t){return Ki().appendChild(t),t}function Ji(){try{const t=globalThis.parent;return!t||t===globalThis?null:t}catch{return null}}function Zi(){const t=Ji();if(!t)return null;try{const e=t.__ESPHOME_DESIGNER_HASS__;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("esphome-designer-panel")?._hass;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("home-assistant")?.hass;if(e&&typeof e.callApi=="function")return e}catch{}return null}function Qi(t){if(!t)return null;try{decodeURI(t);const e=new URL(t,globalThis.location?.origin||"http://localhost");let n=e.pathname;return n.startsWith("/api/")?n=n.slice(5):n=n.replace(/^\/+/,""),`${n}${e.search}`}catch{return null}}function eo(t){if(!t)return{};if(t instanceof Headers){const e={};return t.forEach((n,i)=>{e[i]=n}),e}return Array.isArray(t)?Object.fromEntries(t):{...t}}function to(t,e){if(t==null)return;if(typeof t!="string")return t;const n=eo(e),i=n["Content-Type"]||n["content-type"]||"",o=t.trim();if(o){if(i.includes("application/json")||i.includes("text/plain")||o.startsWith("{")||o.startsWith("["))try{return JSON.parse(o)}catch{return t}return t}}function Rt(t,e=200){const n=typeof t=="string"?t:JSON.stringify(t);return{ok:e>=200&&e<300,status:e,json:async()=>t,text:async()=>n,blob:async()=>new Blob([n],{type:"application/json"})}}function no(t){const e=Number(t?.statusCode??t?.status_code??t?.status);return Number.isFinite(e)&&e>0?e:500}function io(t){const e=t,n=e?.message||"Request failed",i=e?.body;if(i&&typeof i=="object")return{message:n,...i};if(typeof i=="string")try{const o=JSON.parse(i);return{message:n,...o}}catch{return{error:i,message:n}}return{error:n,message:n}}async function oo(t,e={}){const n=Zi(),i=Qi(t);if(!n||!i||typeof n.callApi!="function")return null;if(e.signal?.aborted)throw new DOMException("The operation was aborted.","AbortError");try{const o=await n.callApi((e.method||"GET").toLowerCase(),i,to(e.body,e.headers));return Rt(o,200)}catch(o){return Rt(io(o),no(o))}}function O(t,e="info",n=3e3){let i=document.getElementById("toast-container");i||(i=document.createElement("div"),i.id="toast-container",i.style.position="fixed",i.style.bottom="20px",i.style.right="20px",i.style.zIndex="9999",X(i));const o=document.createElement("div");o.className="toast";const r=o.style;e==="error"?r.background="rgba(255, 0, 0, 0.8)":e==="success"?r.background="rgba(0, 128, 0, 0.8)":r.background="rgba(0,0,0,0.8)",o.textContent=t,r.color="white",r.padding="10px 20px",r.borderRadius="4px",r.marginTop="10px",r.opacity="0",r.transition="opacity 0.3s",i.appendChild(o),requestAnimationFrame(()=>{r.opacity="1"}),setTimeout(()=>{r.opacity="0",setTimeout(()=>{o.remove()},300)},n)}async function ro(){if(!W()){v.warn("Cannot load layout from backend: No HA backend detected.");return}try{let t=null;try{const i=await Y(`${F}/layouts`,{headers:z()});if(i.ok){const o=await i.json();v.log("[loadLayoutFromBackend] Available layouts:",o.layouts?.map(r=>r.id)),v.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${o.last_active_layout_id}`),o.last_active_layout_id&&(o.layouts?.some(a=>a.id===o.last_active_layout_id)?(t=o.last_active_layout_id,v.log(`[loadLayoutFromBackend] Loading last active layout: ${t}`)):v.warn(`[loadLayoutFromBackend] Last active layout '${o.last_active_layout_id}' no longer exists`)),!t&&o.layouts&&o.layouts.length>0&&(t=o.layouts[0].id,v.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${t}`))}}catch(i){v.warn("[loadLayoutFromBackend] Could not fetch layouts list:",i)}let e;if(t?e=await Y(`${F}/layouts/${t}`,{headers:z()}):e=await Y(`${F}/layout`,{headers:z()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const n=await e.json();!n.device_id&&t&&(n.device_id=t),v.log(`[loadLayoutFromBackend] Loaded layout '${n.device_id||t||"default"}':`,{name:n.name,device_model:n.device_model,pages:n.pages?.length,widgets:n.pages?.reduce((i,o)=>i+(o.widgets?.length||0),0),renderingMode:n.renderingMode||n.rendering_mode}),p&&(n.device_id||t)&&p.setCurrentLayoutId(n.device_id||t),typeof ue=="function"?ue(n):v.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),I(P.LAYOUT_IMPORTED,n)}catch(t){v.error("Error loading layout from backend:",t),O("Error loading layout from backend","error",5e3)}}let et=!1,tt=!1;async function Sn(){if(!W())return!1;if(et)return tt=!0,v.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!p)throw new Error("AppState not available");const t=p.currentLayoutId||"reterminal_e1001",e=p.settings.device_model||p.deviceModel||"reterminal_e1001",i={...p.getPagesPayload(),device_id:t,name:p.deviceName||"Layout 1",device_model:e,deviceName:p.deviceName||"Layout 1"};et=!0,tt=!1;try{v.log(`[saveLayoutToBackend] Saving to layout '${t}':`,{device_model:e,pages:i.pages?.length,widgets:i.pages?.reduce((s,l)=>s+(l.widgets?.length||0),0),renderingMode:i.renderingMode});const o=new AbortController,r=setTimeout(()=>o.abort(),1e4),a=await Y(`${F}/layouts/${t}`,{method:"POST",headers:z(),body:JSON.stringify(i),signal:o.signal});if(clearTimeout(r),!a.ok){const s=await a.json().catch(()=>({}));throw new Error(s.message||s.error||`Save failed: ${a.status}`)}return v.log(`[saveLayoutToBackend] Layout '${t}' saved successfully`),!0}catch(o){const r=o instanceof Error?o:new Error(String(o));if(r.name==="AbortError")return!0;if(r.message.includes("Failed to fetch")||r.message.includes("NetworkError")||r.message.includes("net::ERR_")||r.message.includes("ERR_EMPTY_RESPONSE")||r.message.includes("Load failed"))return!1;throw v.error("Failed to save layout to backend:",r),r}finally{et=!1,tt&&setTimeout(()=>{Sn().catch(()=>{})},500)}}async function ao(t){if(!W())throw new Error("No backend");const e=await Y(`${F}/import_snippet`,{method:"POST",headers:z(),body:JSON.stringify({yaml:t})});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||n.error||`Import failed with status ${e.status}`)}return await e.json()}let Q=[],nt=!1;function z(){const t={"Content-Type":"application/json"},e=xn();return e&&e.trim()!==""&&e!=="null"&&(t.Authorization=`Bearer ${e}`),t}async function Y(t,e={}){const n=await oo(t,e);return n||fetch(t,e)}const lt="entity-datalist-global";let se=null;function wn(){return se||(se=document.getElementById(lt),se||(se=document.createElement("datalist"),se.id=lt,X(se))),se}function so(t){const e=wn();e.innerHTML="",!(!t||t.length===0)&&(t.forEach(n=>{const i=document.createElement("option");i.value=n.entity_id,i.label=n.name||n.entity_id,e.appendChild(i)}),v.log(`[EntityDatalist] Updated with ${t.length} entities`))}async function pe(){if(!W()||!F)return[];if(nt)return Q;nt=!0;try{const t=new AbortController,e=setTimeout(()=>t.abort(),1e4);let n,i=!1;const o=xn();n=`${F}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,v.log("[EntityStates] Fetching from:",n);let r;try{r=await Y(n,{headers:z(),signal:t.signal})}catch(s){if(o&&F)n=`${F.replace("/api/esphome_designer","")}/api/states`,v.log("[EntityStates] Custom endpoint failed, trying native HA API:",n),i=!0,r=await Y(n,{headers:z(),signal:t.signal});else throw s}if(clearTimeout(e),!r.ok)return v.warn("[EntityStates] Failed to fetch:",r.status),[];let a=await r.json();if(i&&Array.isArray(a)){const s=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];a=a.filter(l=>{const c=l.entity_id?.split(".")[0];return s.includes(c)}).map(l=>({entity_id:l.entity_id,name:l.attributes?.friendly_name||l.entity_id,state:l.state,unit:l.attributes?.unit_of_measurement,attributes:l.attributes||{}}))}return Array.isArray(a)?(v.log(`[EntityStates] Received ${a.length} entities`),Q=a.map(s=>{const l=s.unit?`${s.state} ${s.unit}`:s.state;return{entity_id:s.entity_id,domain:s.entity_id?.split(".")?.[0]||"",name:s.name||s.entity_id,state:s.state,unit:s.unit,attributes:s.attributes||{},formatted:l}}),v.log(`[EntityStates] Cached ${Q.length} entity states`),p&&(p.entityStates={},Q.forEach(s=>{p.entityStates[s.entity_id]=s}),v.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(p.entityStates).length} entries`)),so(Q),I(P.ENTITIES_LOADED,Q),Q):(v.warn("[EntityStates] Invalid response format"),[])}catch(t){return t instanceof Error&&t.name==="AbortError"?v.warn("[EntityStates] Request timed out after 10 seconds"):v.warn("[EntityStates] Error fetching:",t),[]}finally{nt=!1}}function Cs(t){const e=Q.find(n=>n.entity_id===t);return e?e.attributes??null:null}function lo(t){if(t==null||t==="")return 24*60*60*1e3;if(typeof t=="number")return Math.max(t,0)*1e3;const e=String(t).trim();if(!e)return 24*60*60*1e3;if(/^\d+(?:\.\d+)?$/.test(e))return parseFloat(e)*1e3;const n=e.match(/^(\d+(?:\.\d+)?)([a-z]+)$/i);if(!n)return 24*60*60*1e3;const i=parseFloat(n[1]),o=n[2].toLowerCase();return o.startsWith("s")?i*1e3:o.startsWith("m")?i*60*1e3:o.startsWith("h")?i*60*60*1e3:o.startsWith("d")?i*24*60*60*1e3:o.startsWith("w")?i*7*24*60*60*1e3:i*1e3}function co(){return(F||"").replace(/\/api\/esphome_designer$/,"")}function po(t){return!Array.isArray(t)||t.length===0?[]:(Array.isArray(t[0])?t[0]:t).filter(n=>n&&typeof n=="object").map(n=>({state:n.state,last_changed:n.last_changed??n.last_updated??null,last_updated:n.last_updated??n.last_changed??null})).filter(n=>n.state!==void 0&&n.state!==null)}let Bt=!1;async function Ps(t,e="24h"){if(!W()||!F||!t)return[];const n=co(),i=new Date,o=new Date(i.getTime()-lo(e)),r=n?`${n}/api/history/period/${encodeURIComponent(o.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(i.toISOString())}&minimal_response&no_attributes&significant_changes_only=0`:null;try{if(!r)return[];const a=await Y(r,{headers:z()});if(!a.ok){const s=await a.text().catch(()=>"Unknown error");return Bt||(v.log(`[EntityHistory] History fetch failed for ${t}: ${s}`),Bt=!0),[]}return po(await a.json())}catch{return[]}}let En;try{En=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":Si,"../../hardware/elecrow-esp32-p4-9inch-v1.2.yaml":wi,"../../hardware/geekmagic-mini-esp8266.yaml":Ei,"../../hardware/geekmagic-pro-esp32.yaml":Ci,"../../hardware/guition-esp32-jc4827w543.yaml":Pi,"../../hardware/guition-esp32-jc8048w535.yaml":Ii,"../../hardware/guition-esp32-jc8048w550.yaml":ki,"../../hardware/guition-esp32-p4-jc4880p443.yaml":Li,"../../hardware/guition-esp32-p4-jc8012p4a1c.yaml":Ti,"../../hardware/guition-esp32-s3-4848s040.yaml":Mi,"../../hardware/lilygo-tdisplays3.yaml":Oi,"../../hardware/m5stack-tab5.yaml":Ai,"../../hardware/seeedstudio-sensecap-indicator.yaml":Di,"../../hardware/sunton-esp32-2432s028.yaml":Gi,"../../hardware/sunton-esp32-2432s028R.yaml":Hi,"../../hardware/sunton-esp32-4827s032R.yaml":Ri,"../../hardware/sunton-esp32-8048s050.yaml":Bi,"../../hardware/sunton-esp32-8048s070.yaml":Ni,"../../hardware/viewdisplay-esp32-s3-uedx48480021.yaml":Wi,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":Fi,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":zi,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":Yi})}catch{}function uo(t,e){const i=new RegExp(`^${e}:\\s*$`,"m").exec(t);if(!i)return"";const o=i.index,r=t.indexOf(`
`,o),a=r===-1?t.length:r+1,s=t.slice(a).search(/^(?!\s)([A-Za-z0-9_]+):/m),l=s===-1?t.length:a+s;return t.slice(o,l)}const xt={getGlob(){const t=En;return t?()=>t:void 0},getStorage(){try{return globalThis.localStorage??null}catch{return null}}};async function ho(){if(W())try{const i=`${F}/hardware/templates`;v.log("[HardwareDiscovery] Fetching from:",i);const o=await Y(i,{headers:z(),cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json()).templates||[]}catch(i){v.error("Failed to fetch dynamic hardware templates from HA:",i)}v.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const t=[],e=xt.getGlob();if(typeof e!="function")return v.log("[HardwareDiscovery] Bundled profile glob is unavailable in this runtime; relying on backend/localStorage profiles only."),[];const n=e("../../hardware/*.yaml",{query:"?raw",import:"default",eager:!0});for(const i in n)try{const o=n[i],r=i.split("/").pop()||"hardware.yaml",a=Cn(o,r);a.id=r.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),a.isPackageBased=!0,a.hardwarePackage=`hardware/${r}`,a.isOfflineImport=!1,t.push(a)}catch(o){v.warn(`[HardwareDiscovery] Failed to parse bundled file ${i}:`,o)}return v.log(`[HardwareDiscovery] Loaded ${t.length} bundled fallback profiles.`),t}function Cn(t,e){const n="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let i=e.replace(/\.yaml$/i,""),o=800,r=480,a="rect";const s=t.match(/#\s*Name:\s*(.*)/i);s&&(i=s[1].trim());const l=t.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(o=parseInt(l[1]),r=parseInt(l[2]));const c=t.match(/#\s*Shape:\s*(rect|round)/i);c&&(a=c[1].toLowerCase());const u=!!t.match(/#\s*Inverted:\s*(true|yes|1)/i),g=uo(t,"display")||t,h=g.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||g.match(/^\s*platform:\s*([a-z0-9_]+)/m),m=h?h[1].trim():void 0,f=g.match(/^\s*model:\s*"?([^"\n]+)"?/m),_=f?f[1].trim():void 0;let y="esp32-s3",b;const S=t.match(/^\s*esp8266:/m),w=t.match(/^\s*rp2:/m);S?y="esp8266":w?y="rp2040":t.match(/^\s*esp32:/m)&&(t.toLowerCase().includes("esp32-s3")?y="esp32-s3":t.toLowerCase().includes("esp32-c3")?y="esp32-c3":t.toLowerCase().includes("esp32-c6")?y="esp32-c6":t.toLowerCase().includes("esp32p4")||t.toLowerCase().includes("esp32-p4")?y="esp32-p4":y="esp32");const E=t.match(/^\s*board:\s*([^\n]+)/m);E&&(b=E[1].trim(),w?y=b.toLowerCase().includes("pico2")||b.toLowerCase().includes("rp2350")?"rp2350":"rp2040":S||(b.toLowerCase().includes("s3")?y="esp32-s3":b.toLowerCase().includes("c3")?y="esp32-c3":b.toLowerCase().includes("c6")?y="esp32-c6":b.toLowerCase().includes("p4")&&(y="esp32-p4")));const C=t.match(/#\s*Chip:\s*(.*)/i);C&&(y=C[1].trim());const x=t.match(/#\s*Board:\s*(.*)/i);x&&(b=x[1].trim());const k=g.match(/^\s*color_palette:\s*(\S+)/m),L=k?k[1].trim():void 0,A=g.match(/^\s*color_order:\s*(\S+)/m),M=A?A[1].trim():void 0,D=g.match(/^\s*update_interval:\s*(\S+)/m),N=D?D[1].trim():void 0,J=g.match(/^\s*invert_colors:\s*(true|false)/mi),he=J?J[1].toLowerCase()==="true":void 0;return{id:n,name:i,resolution:{width:o,height:r},shape:a,chip:y,board:b,displayPlatform:m,displayModel:_,colorPalette:L,colorOrder:M,updateInterval:N,invertColors:he,isPackageBased:!0,isOfflineImport:!0,content:t,features:{psram:t.includes("psram:"),lcd:!t.includes("waveshare_epaper")&&!t.includes("epaper_spi")&&!t.includes("it8951"),lvgl:t.includes("lvgl:")||!t.includes("waveshare_epaper")&&!t.includes("epaper_spi")&&!t.includes("it8951"),epaper:t.includes("waveshare_epaper")||t.includes("epaper_spi")||t.includes("it8951"),touch:t.includes("touchscreen:"),inverted_colors:u}}}function go(t){const e=xt.getStorage();if(!e){v.warn("No localStorage available for offline profiles.");return}try{const n=JSON.parse(e.getItem("esphome-offline-profiles")||"{}");n[t.id]=t,e.setItem("esphome-offline-profiles",JSON.stringify(n)),v.log("[HardwarePersistence] Saved offline profile to localStorage:",t.id)}catch(n){v.error("Failed to save profile to localStorage:",n)}}function mo(){const t=xt.getStorage();if(!t)return{};try{return JSON.parse(t.getItem("esphome-offline-profiles")||"{}")}catch(e){return v.warn("Could not load offline profiles from storage:",e),{}}}const G={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",deepSleepDisplayRefreshDelay:"35s",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},reterminal_e1003:{name:"Seeedstudio reTerminal E1003 (Monochrome)",displayType:"grayscale",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"Seeed-reTerminal-E1003",displayPlatform:"it8951",resolution:{width:1872,height:1404},shape:"rect",psram_mode:"octal",frameworkHint:"ESP-IDF (Required; ESPHome 2026.7.0+)",system_section_overrides:{esp32:["  framework:","    type: esp-idf","    sdkconfig_options:","      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y","      CONFIG_ESP32S3_DATA_CACHE_64KB: y"]},pins:{i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9",miso:"GPIO8"},batteryEnable:"GPIO40",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},batteryEnableAlwaysOn:!0,features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,touch:!0,inverted_colors:!1},touch:{platform:"gt911",i2c_id:"bus_a",address:"0x5D",interrupt_pin:"GPIO2",reset_pin:"GPIO48"}},reterminal_e1004:{name:'Seeedstudio reTerminal E1004 13.3" (Spectra 6)',displayType:"color",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"seeed-reterminal-e1004",displayPlatform:"epaper_spi",resolution:{width:1200,height:1600},shape:"rect",psram_mode:"octal",display_config:["  - platform: epaper_spi","    model: seeed-reterminal-e1004","    cs1_pin:","      number: GPIO2","      allow_other_uses: true","    update_interval: never"],external_components:["  - source:","      type: git","      url: https://github.com/esphome/esphome","      ref: pull/16706/head","    components: [ epaper_spi ]"],system_section_overrides:{esp32:["  framework:","    type: esp-idf","    sdkconfig_options:","      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y","      CONFIG_ESP32S3_DATA_CACHE_64KB: y","      CONFIG_SPIRAM_MODE_OCT: y"]},pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:{number:"GPIO2",mode:"INPUT_PULLUP",inverted:!0,allow_other_uses:!0}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO3",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},raspberry_pi_pico_w_waveshare_2_13_v3:{name:'Raspberry Pi Pico W + Waveshare 2.13" V3',displayType:"binary",chip:"rp2040",board:"rpipicow",displayModel:"2.13inv3",displayPlatform:"waveshare_epaper",resolution:{width:250,height:122},rotation_offset:90,shape:"rect",supportsDeepSleep:!1,frameworkHint:"ESPHome RP2",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:"GPIO13"},spi:{clk:"GPIO10",mosi:"GPIO11"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},raspberry_pi_pico_2_w_waveshare_2_13_v3:{name:'Raspberry Pi Pico 2 W + Waveshare 2.13" V3',displayType:"binary",chip:"rp2350",board:"rpipico2w",displayModel:"2.13inv3",displayPlatform:"waveshare_epaper",resolution:{width:250,height:122},rotation_offset:90,shape:"rect",supportsDeepSleep:!1,frameworkHint:"ESPHome RP2",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:"GPIO13"},spi:{clk:"GPIO10",mosi:"GPIO11"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},guition_esp32_jc4832w535:{name:'Guition JC4832W535 v3 3.5" 480x320',displayType:"color",chip:"esp32-s3",displayPlatform:"qspi_dbi",displayModel:"JC4832W535",isPackageBased:!0,hardwarePackage:"hardware/guition-esp32-jc8048w535.yaml",resolution:{width:320,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"axs15231",transformed:!0,transform:{mirror_x:!0,swap_xy:!0},calibration:{x_min:14,x_max:461,y_min:12,y_max:310}}},guition_esp32_jc8048w535:{name:'Guition JC4832W535 v3 3.5" 480x320 (Legacy ID)',displayType:"color",chip:"esp32-s3",displayPlatform:"qspi_dbi",displayModel:"JC4832W535",isPackageBased:!0,isUntestedProfile:!0,hardwarePackage:"hardware/guition-esp32-jc8048w535.yaml",resolution:{width:320,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0}},m5stack_tab5:{name:"M5Stack Tab5",displayType:"color",chip:"esp32-p4",board:"esp32-p4-evboard",displayPlatform:"mipi_dsi",displayModel:"M5STACK-TAB5-V2",isPackageBased:!0,hardwarePackage:"hardware/m5stack-tab5.yaml",resolution:{width:1280,height:720},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"st7123"}},guition_esp32_p4_jc4880p443:{name:'Guition JC4880P443 4.3" 480x800',displayType:"color",chip:"esp32-p4",board:"esp32-p4-evboard",displayPlatform:"mipi_dsi",displayModel:"JC4880P443",displayId:"main_display",touchscreenId:"device_touchscreen",isPackageBased:!0,hardwarePackage:"hardware/guition-esp32-p4-jc4880p443.yaml",resolution:{width:480,height:800},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",id:"device_touchscreen"}},guition_esp32_p4_jc8012p4a1c:{name:'Guition JC8012P4A1C 10.1" 800x1280',displayType:"color",chip:"esp32-p4",board:"esp32-p4-evboard",displayPlatform:"mipi_dsi",displayModel:"JC8012P4A1",displayId:"main_display",touchscreenId:"device_touchscreen",isPackageBased:!0,hardwarePackage:"hardware/guition-esp32-p4-jc8012p4a1c.yaml",resolution:{width:800,height:1280},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",id:"device_touchscreen"}},elecrow_esp32_p4_9inch_v1_2:{name:'Elecrow ESP32-P4 9" HMI 1024x600 (V1.2)',displayType:"color",chip:"esp32-p4",board:"esp32-p4-evboard",displayPlatform:"mipi_dsi",displayModel:"WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B",isPackageBased:!0,hardwarePackage:"hardware/elecrow-esp32-p4-9inch-v1.2.yaml",resolution:{width:1024,height:600},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911"}},elecrow_esp32_7inch:{name:'Elecrow CrowPanel 7" HMI 800x480',displayType:"color",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayPlatform:"rpi_dpi_rgb",displayModel:"ELECROW-ESP32-7INCH",displayId:"my_display",touchscreenId:"my_touchscreen",isPackageBased:!0,hardwarePackage:"hardware/elecrow-esp32-7inch.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",id:"my_touchscreen"}},geekmagic_mini_esp8266:{name:"GeekMagic Mini (ESP8266)",displayType:"color",chip:"esp8266",board:"esp01_1m",displayPlatform:"mipi_spi",displayModel:"ST7789V",isPackageBased:!0,hardwarePackage:"hardware/geekmagic-mini-esp8266.yaml",resolution:{width:240,height:240},features:{psram:!1,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!1,inverted_colors:!1}},geekmagic_pro_esp32:{name:"GeekMagic Pro (ESP32)",displayType:"color",chip:"esp32",board:"esp32dev",displayPlatform:"mipi_spi",displayModel:"st7789v",isPackageBased:!0,hardwarePackage:"hardware/geekmagic-pro-esp32.yaml",resolution:{width:240,height:240},features:{psram:!1,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!1,inverted_colors:!1}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]},lilygo_t5_47:{id:"lilygo_t5_47",name:'Lilygo T5 4.7" E-Paper',isUntestedProfile:!0,displayType:"binary",chip:"esp32",board:"esp-wrover-kit",displayPlatform:"t547",resolution:{width:960,height:540},shape:"rect",psram_speed:"80MHz",pins:{batteryEnable:null,batteryAdc:"GPIO36",buttons:{left:{number:"GPIO39",inverted:!0,mode:"INPUT"},right:{number:"GPIO34",inverted:!0,mode:"INPUT"},refresh:{number:"GPIO35",inverted:!0,mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2},features:{psram:!0,buzzer:!1,buttons:!0,epaper:!0,inverted_colors:!0},frameworkHint:"Arduino 3.x (required by the t547 component)",system_section_overrides:{esphome:["  platformio_options:","    lib_deps:","      - https://github.com/Xinyuan-LilyGO/LilyGo-EPD47.git"],esp32:["  framework:","    type: arduino","    version: 3.3.2","  flash_size: 16MB"]},external_components:["  - source:","      type: git","      url: https://github.com/cjb0001/esphome-components","      ref: idf5-arduino3",'    components: ["t547"]']}};function Pn(t=G){return Object.entries(t).filter(([,e])=>!e.isUntestedProfile&&!e.isComingSoon&&!e.isUnavailable).map(([e])=>e)}function fo(t,e){return t?{...t,...e,features:{...t.features||{},...e.features||{}}}:e}function yo(t,e){e.forEach(n=>{t[n.id]=fo(t[n.id],n)})}function _o(t,e){Object.entries(e).forEach(([n,i])=>{t[n]=i})}let St=Pn(G);async function Ae(){try{const t=await ho();v.log(`[Devices] Loaded ${t.length} hardware profiles from backend/bundle.`),yo(G,t);const e=mo(),n=Object.keys(e);n.length>0&&(v.log(`[Devices] Restoring ${n.length} offline profiles from localStorage.`),_o(G,e)),St=Pn(G),I(P.DEVICE_PROFILES_UPDATED)}catch(t){v.error("Failed to load external hardware profiles:",t)}}function be(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substring(2,7)}const ge=globalThis;typeof ge.crypto<"u"&&!ge.crypto.randomUUID?Object.defineProperty(ge.crypto,"randomUUID",{value:function(){return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>{const n=Number(e),i=ge.crypto?.getRandomValues(new Uint8Array(1))[0]??0;return(n^(i&15)>>n/4).toString(16)})}}):typeof ge.crypto>"u"&&(ge.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),getRandomValues:t=>{for(let e=0;e<t.length;e+=1)t[e]=Math.floor(Math.random()*256);return t}});function vo(t,e){let n;return function(...o){const r=()=>{clearTimeout(n),t(...o)};clearTimeout(n),n=setTimeout(r,e)}}function ze(t){if(t!==void 0)return JSON.parse(JSON.stringify(t))}const Is=(t,e)=>{if(!t||!e)return;const n=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let i=t;for(const o of n){if(i==null)return;i=i[o]}return i};function dt(){return{id:"page_0",name:"Overview",layout:null,widgets:[]}}function bo(t){return Array.isArray(t)&&t.length>0?t:[dt()]}function Nt(t,e){return e<=0?0:Math.max(0,Math.min(t,e-1))}function xo(t){const e=t.length;let n=0;return t.forEach(i=>{const o=i.name.match(/^Page (\d+)$/);if(o){const r=parseInt(o[1],10);r>n&&(n=r)}}),{id:`page_${Date.now()}_${e}`,name:`Page ${n+1}`,widgets:[]}}function So(t,e){const n=ze(t);n.id=`page_${Date.now()}_${e}`,n.name=`${t.name} (Copy)`;const i=new Map;return n.widgets.forEach(o=>{const r=o.id,a=be();o.id=a,i.set(r,a)}),n.widgets.forEach(o=>{o.parentId&&i.has(o.parentId)&&(o.parentId=i.get(o.parentId)||null)}),n}function wo(t,e,n,i=null,o=null,r){if(n<0||n>=t.pages.length)return!1;const a=t.pages[n],s=new Set,l=[];let c=e;const d=t.widgetsById.get(e);if(d&&d.parentId){let h=d;for(;h.parentId;){const m=t.widgetsById.get(h.parentId);if(!m)break;h=m}c=h.id}const u=h=>{if(s.has(h))return;let m=null,f=null;for(const y of t.pages)if(m=y.widgets.find(b=>b.id===h)||null,m){f=y;break}if(!m||!f||f===a)return;s.add(h),l.push({widget:m,sourcePage:f}),f.widgets.filter(y=>y.parentId===h).forEach(y=>u(y.id))};if(u(c),l.length===0)return!1;l.forEach((h,m)=>{const{widget:f,sourcePage:_}=h,y=_.widgets.indexOf(f);if(y!==-1&&_.widgets.splice(y,1),m===0&&f.parentId&&!s.has(f.parentId)&&(f.parentId=null),m===0){let b=0,S=0;if(i!==null&&o!==null&&(b=i-f.x,S=o-f.y,f.x=i,f.y=o),b!==0||S!==0)for(let w=1;w<l.length;w++){const E=l[w].widget;E.x+=b,E.y+=S}}a.widgets.push(f)});const g=r(t.protocolHardware?.orientation);for(const h of s){const m=t.widgetsById.get(h);if(!m||m.parentId&&s.has(m.parentId))continue;const f=m.x,_=m.y;m.x=Math.max(0,Math.min(g.width-(m.width||50),m.x)),m.y=Math.max(0,Math.min(g.height-(m.height||50),m.y));const y=m.x-f,b=m.y-_;if(y!==0||b!==0)for(const S of s){const w=t.widgetsById.get(S);w&&w.parentId===m.id&&(w.x+=y,w.y+=b)}}return!0}class Eo{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",manualYamlOverride:"",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[dt()],this.state.currentPageIndex=0,this.state.manualYamlOverride="",this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get manualYamlOverride(){return this.state.manualYamlOverride||""}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages.length===0&&(this.state.pages=[dt()],this.state.currentPageIndex=0),this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const n of e.widgets)this.state.widgetsById.set(n.id,n)}setPages(e){this.state.pages=bo(e),this.state.currentPageIndex=Nt(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),I(P.STATE_CHANGED)}setCurrentPageIndex(e,n={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,I(P.PAGE_CHANGED,{index:e,...n}))}reorderPage(e,n){if(e<0||e>=this.state.pages.length||n<0||n>=this.state.pages.length)return;const[i]=this.state.pages.splice(e,1);this.state.pages.splice(n,0,i),this.state.currentPageIndex===e?this.state.currentPageIndex=n:e<this.state.currentPageIndex&&n>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&n<=this.state.currentPageIndex&&this.state.currentPageIndex++,I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const n=xo(this.state.pages),i=e!==null?e:this.state.pages.length;return this.state.pages.splice(i,0,n),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),n}deletePage(e){e<0||e>=this.state.pages.length||this.state.pages.length!==1&&(this.state.pages.splice(e,1),this.state.currentPageIndex=Nt(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const n=this.state.pages[e],i=So(n,this.state.pages.length),o=e+1;return this.state.pages.splice(o,0,i),this.state.currentPageIndex=o,this.rebuildWidgetsIndex(),I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),i}renamePage(e,n){e<0||e>=this.state.pages.length||!n||n.trim()===""||(this.state.pages[e].name=n.trim(),I(P.STATE_CHANGED))}addWidget(e,n=null){const i=n!==null?n:this.state.currentPageIndex;(this.state.pages[i]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),I(P.STATE_CHANGED)}updateWidget(e,n){const i=this.getWidgetById(e);i&&(Object.assign(i,n),I(P.STATE_CHANGED))}deleteWidgets(e){const n=this.getCurrentPage();let i=!1;for(const o of e){const r=n.widgets.findIndex(a=>a.id===o);r!==-1&&(n.widgets.splice(r,1),this.state.widgetsById.delete(o),i=!0)}i&&I(P.STATE_CHANGED)}moveWidgetToPage(e,n,i=null,o=null){const r=s=>this.getCanvasDimensions(s);return wo(this.state,e,n,i,o,r)?(this.rebuildWidgetsIndex(),I(P.STATE_CHANGED),!0):!1}reorderWidget(e,n,i){const o=this.state.pages[e];if(!o)return;const r=o.widgets;if(n<0||n>=r.length||i<0||i>=r.length)return;const[a]=r.splice(n,1);r.splice(i,0,a),I(P.STATE_CHANGED)}clearCurrentPage(e=!1){const n=this.getCurrentPage();if(!n)return{deleted:0,preserved:0};const i=[],o=[];return n.widgets.forEach(r=>{e&&r.locked?o.push(r):i.push(r)}),n.widgets=o,i.forEach(r=>this.state.widgetsById.delete(r.id)),i.length>0&&I(P.STATE_CHANGED),{deleted:i.length,preserved:o.length}}setDeviceSettings(e,n){e&&(this.state.deviceName=e),n&&(this.state.deviceModel=n),I(P.SETTINGS_CHANGED)}setManualYamlOverride(e,n={}){const i=typeof e=="string"?e:"";return this.state.manualYamlOverride===i?!1:(this.state.manualYamlOverride=i,n.emitStateChange!==!1&&I(P.STATE_CHANGED),!0)}clearManualYamlOverride(e={}){return this.setManualYamlOverride("",e)}getCanvasDimensions(e=Fe.LANDSCAPE){const n=this.state.deviceModel||"reterminal_e1001",i=G,o=i&&i[n]?i[n]:null;let r=pn,a=un;if(o)o.resolution&&(r=o.resolution.width,a=o.resolution.height);else if(n==="custom"&&this.state.customHardware){const s=this.state.customHardware;s.resWidth&&s.resHeight&&(r=s.resWidth,a=s.resHeight)}return e===Fe.PORTRAIT||e===Fe.PORTRAIT_INVERTED?{width:Math.min(r,a),height:Math.max(r,a)}:{width:Math.max(r,a),height:Math.min(r,a)}}getPagesPayload(){return{name:this.state.deviceName,pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,manualYamlOverride:this.state.manualYamlOverride||"",manual_yaml_override:this.state.manualYamlOverride||"",customHardware:this.state.customHardware}}getCanvasShape(){const n=G[this.state.deviceModel];return n&&n.shape?n.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class Co{state;historyStack;historyIndex;constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),I(P.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],I(P.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,n=!1){if(n){const i=e?this.state.selectedWidgetIds.indexOf(e):-1;i===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(i,1)}else this.state.selectedWidgetIds=e?[e]:[];I(P.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(n=>ze(n)),v.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const n=ze(e);if(this.historyIndex>=0){const i=this.historyStack[this.historyIndex];if(JSON.stringify(i)===JSON.stringify(n))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(n),this.historyIndex++,this.historyStack.length>dn&&(this.historyStack.shift(),this.historyIndex--),I(P.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}replaceHistory(e){this.historyStack=[ze(e)],this.historyIndex=0,I(P.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class Po{constructor(){this.state={...ln}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return!!this.state.showDebugGrid}get showRulers(){return!!this.state.showRulers}get autoSaveEnabled(){return this.state.autoSaveEnabled!==!1}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},I(P.SETTINGS_CHANGED,this.state),v.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,I(P.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,I(P.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,I(P.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,I(P.SETTINGS_CHANGED,{showRulers:e})}setAutoSaveEnabled(e){this.state.autoSaveEnabled=e,I(P.SETTINGS_CHANGED,{autoSaveEnabled:e})}}function Wt(){try{return globalThis.localStorage??null}catch{return null}}class Io{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:"",ai_api_key_minimax:"",ai_api_key_glm:""},this.loadFromLocalStorage()}get(e){return this.keys[e]||""}set(e,n){if(e in this.keys){const i=this.keys;i[e]=n,this.saveToLocalStorage()}}saveToLocalStorage(){try{const e=Wt();if(!e)return;const n={};Object.keys(this.keys).forEach(i=>{i.startsWith("ai_api_key_")&&(n[i]=this.keys[i])}),e.setItem("esphome-designer-ai-keys",JSON.stringify(n))}catch(e){v.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=Wt();if(!e)return;const n=e.getItem("esphome-designer-ai-keys");if(n){const i=JSON.parse(n);i&&typeof i=="object"&&(this.keys={...this.keys,...i},v.log("[SecretsStore] AI keys loaded from local storage"))}}catch(e){v.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}class ko{constructor(e){this.app=e}selectWidget(e,n=!1){if(!e){this.app.editor.selectWidget(null,n);return}const i=this.app.getWidgetById(e);if(i)if(i.type==="group"){const s=(this.app.getCurrentPage().widgets||[]).filter(c=>c.parentId===e).map(c=>c.id),l=[e,...s];if(n)if(l.some(d=>this.app.editor.selectedWidgetIds.includes(d))){const d=new Set(l),u=this.app.editor.selectedWidgetIds.filter(g=>!d.has(g));this.app.editor.setSelectedWidgetIds(u)}else this.app.editor.setSelectedWidgetIds([...new Set([...this.app.editor.selectedWidgetIds,...l])]);else this.app.editor.setSelectedWidgetIds(l)}else this.app.editor.selectWidget(e,n)}selectWidgets(e){this.app.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const i=e.widgets.map(o=>o.id);this.selectWidgets(i)}deselectAll(){this.app.editor.setSelectedWidgetIds([])}toggleSelection(e){this.selectWidget(e,!0)}isWidgetSelected(e){return this.app.editor.selectedWidgetIds.includes(e)}groupSelection(){const e=this.app.editor.selectedWidgetIds,n=this.app.getSelectedWidgets(),i=n.some(d=>d.type==="group"||d.parentId);if(e.length<2||i)return;let o=1/0,r=1/0,a=-1/0,s=-1/0;n.forEach(d=>{o=Math.min(o,d.x),r=Math.min(r,d.y),a=Math.max(a,d.x+(d.width||0)),s=Math.max(s,d.y+(d.height||0))});const l="group_"+be(),c={id:l,type:"group",title:"Group",x:o,y:r,width:a-o,height:s-r,props:{},expanded:!0};this.app.project.addWidget(c),n.forEach(d=>{this.app.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.app.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),I(P.STATE_CHANGED)}ungroupSelection(e=null){const n=this.app;let i=[];if(e)i=Array.isArray(e)?e:[e];else{const l=n.getSelectedWidgets(),c=new Set;l.forEach(d=>{d.type==="group"?c.add(d.id):d.parentId&&c.add(d.parentId)}),i=[...c]}const o=new Set;i.forEach(l=>{const c=n.getWidgetById(l);c&&(c.type==="group"?o.add(c.id):c.parentId&&o.add(c.parentId))});const r=[...o];if(r.length===0)return;const a=[];r.forEach(l=>{const c=n.getWidgetById(l);if(!c||c.type!=="group")return;(n.getCurrentPage().widgets||[]).filter(h=>h.parentId===l).forEach(h=>{this.app.project.updateWidget(h.id,{parentId:null}),a.push(h.id)})}),this.app.project.deleteWidgets(r);const s=n.getCurrentPage();if(s&&s.widgets){const l=s.widgets;s.widgets=l.filter(c=>!r.includes(c.id))}a.length>0&&this.selectWidgets(a),n.syncWidgetOrderWithHierarchy(),n.recordHistory(),I(P.STATE_CHANGED)}alignSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(n.length<2)return;let i;switch(e){case"left":i=Math.min(...n.map(o=>o.x)),n.forEach(o=>this.app.project.updateWidget(o.id,{x:i}));break;case"center":{const o=Math.min(...n.map(a=>a.x)),r=Math.max(...n.map(a=>a.x+(a.width||0)));i=o+(r-o)/2,n.forEach(a=>this.app.project.updateWidget(a.id,{x:i-(a.width||0)/2}));break}case"right":i=Math.max(...n.map(o=>o.x+(o.width||0))),n.forEach(o=>this.app.project.updateWidget(o.id,{x:i-(o.width||0)}));break;case"top":i=Math.min(...n.map(o=>o.y)),n.forEach(o=>this.app.project.updateWidget(o.id,{y:i}));break;case"middle":{const o=Math.min(...n.map(a=>a.y)),r=Math.max(...n.map(a=>a.y+(a.height||0)));i=o+(r-o)/2,n.forEach(a=>this.app.project.updateWidget(a.id,{y:i-(a.height||0)/2}));break}case"bottom":i=Math.max(...n.map(o=>o.y+(o.height||0))),n.forEach(o=>this.app.project.updateWidget(o.id,{y:i-(o.height||0)}));break}this.app.recordHistory(),I(P.STATE_CHANGED)}distributeSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(!(n.length<3)){if(e==="horizontal"){const i=[...n].sort((d,u)=>d.x-u.x),o=i[0],a=i[i.length-1].x-(o.x+(o.width||0)),s=i.slice(1,-1).reduce((d,u)=>d+(u.width||0),0),l=(a-s)/(i.length-1);let c=o.x+(o.width||0)+l;for(let d=1;d<i.length-1;d++)this.app.project.updateWidget(i[d].id,{x:c}),c+=(i[d].width||0)+l}else{const i=[...n].sort((d,u)=>d.y-u.y),o=i[0],a=i[i.length-1].y-(o.y+(o.height||0)),s=i.slice(1,-1).reduce((d,u)=>d+(u.height||0),0),l=(a-s)/(i.length-1);let c=o.y+(o.height||0)+l;for(let d=1;d<i.length-1;d++)this.app.project.updateWidget(i[d].id,{y:c}),c+=(i[d].height||0)+l}this.app.recordHistory(),I(P.STATE_CHANGED)}}}class Lo{constructor(e){this.app=e}recordHistory(){this.app._isRestoringHistory||this.app.editor.recordHistory({pages:this.app.project.pages,deviceName:this.app.project.deviceName})}replaceHistoryBaseline(){this.app.editor.replaceHistory({pages:this.app.project.pages,deviceName:this.app.project.deviceName})}undo(){const e=this.app.editor.undo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.app.editor.redo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}restoreSnapshot(e){this.app.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.app.project.state.deviceName=e.deviceName,this.app.project.rebuildWidgetsIndex(),I(P.STATE_CHANGED)}canUndo(){return this.app.editor.canUndo()}canRedo(){return this.app.editor.canRedo()}}let ct={};try{ct=Object.assign({"../../features/battery_icon/plugin.js":()=>T(()=>import("./plugin-CuF-2TGN.js"),__vite__mapDeps([0,1,2]),import.meta.url),"../../features/calendar/plugin.js":()=>T(()=>import("./plugin-DZSA38wM.js"),__vite__mapDeps([3,1,2]),import.meta.url),"../../features/datetime/plugin.js":()=>T(()=>import("./plugin-D_a3SahX.js"),__vite__mapDeps([4,2,1]),import.meta.url),"../../features/debug_grid/plugin.js":()=>T(()=>import("./plugin-Bz96grI8.js"),[],import.meta.url),"../../features/energy_widget/plugin.js":()=>T(()=>import("./plugin-CcWtg1s3.js"),__vite__mapDeps([5,1,2]),import.meta.url),"../../features/graph/plugin.js":()=>T(()=>import("./plugin-VOFHO5qc.js"),__vite__mapDeps([6,2,1]),import.meta.url),"../../features/icon/plugin.js":()=>T(()=>import("./plugin-DI7qDwtN.js"),__vite__mapDeps([7,8,9,1,2]),import.meta.url),"../../features/image/plugin.js":()=>T(()=>import("./plugin-OTguXQgp.js"),__vite__mapDeps([10,1,2]),import.meta.url),"../../features/line/plugin.js":()=>T(()=>import("./plugin-DPpv4k9S.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>T(()=>import("./plugin-CVtGMiKB.js"),__vite__mapDeps([11,1,2]),import.meta.url),"../../features/lvgl_bar/plugin.js":()=>T(()=>import("./plugin-C3TaJghq.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>T(()=>import("./plugin-B0tzpdy_.js"),__vite__mapDeps([12,2,1]),import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>T(()=>import("./plugin-BYUEJW46.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>T(()=>import("./plugin-uULqxqmr.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>T(()=>import("./plugin-DnL6isCF.js"),__vite__mapDeps([13,2,1]),import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>T(()=>import("./plugin-DKvu6nsr.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>T(()=>import("./plugin-CJupQF3Y.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>T(()=>import("./plugin-5CX7J5Ir.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>T(()=>import("./plugin-Bw3Kp9Ko.js"),__vite__mapDeps([14,1,2]),import.meta.url),"../../features/lvgl_led/plugin.js":()=>T(()=>import("./plugin-CvW9GRcJ.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>T(()=>import("./plugin-DavNvZJ0.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>T(()=>import("./plugin-03wdAHv5.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>T(()=>import("./plugin-Cvfrg4uG.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>T(()=>import("./plugin-BZNoAt0h.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>T(()=>import("./plugin-H8_Cedxq.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>T(()=>import("./plugin-BPIBweRx.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>T(()=>import("./plugin-CCSLU7VJ.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>T(()=>import("./plugin-yr1brk0v.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>T(()=>import("./plugin-BJVq3IMw.js"),__vite__mapDeps([15,2,1]),import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>T(()=>import("./plugin-fSaSlNq3.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>T(()=>import("./plugin-Dft6HFQs.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>T(()=>import("./plugin-CIe8d1NL.js"),[],import.meta.url),"../../features/moon_phase/plugin.js":()=>T(()=>import("./plugin-Bjp1QNnb.js"),__vite__mapDeps([16,2,1]),import.meta.url),"../../features/odp_arc/plugin.js":()=>T(()=>import("./plugin-fLOMRvii.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>T(()=>import("./plugin-FRwyy2yN.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>T(()=>import("./plugin-CciJdC0y.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>T(()=>import("./plugin-C4VhGPFM.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>T(()=>import("./plugin-B97TN5cD.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>T(()=>import("./plugin-C_hkq-qm.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>T(()=>import("./plugin-BMFaRNdP.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>T(()=>import("./plugin-CU25jc-Y.js"),__vite__mapDeps([17,1,2]),import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>T(()=>import("./plugin-C49rM4t8.js"),__vite__mapDeps([18,1,2]),import.meta.url),"../../features/online_image/plugin.js":()=>T(()=>import("./plugin-CfUtBhFd.js"),__vite__mapDeps([19,1,2]),import.meta.url),"../../features/progress_bar/plugin.js":()=>T(()=>import("./plugin-cwUA5xgp.js"),__vite__mapDeps([20,21,1,2]),import.meta.url),"../../features/qr_code/plugin.js":()=>T(()=>import("./plugin-BCfq0qIz.js"),__vite__mapDeps([22,1,2]),import.meta.url),"../../features/quote_rss/plugin.js":()=>T(()=>import("./plugin-CmNtFR9k.js"),__vite__mapDeps([23,2,1]),import.meta.url),"../../features/rounded_rect/plugin.js":()=>T(()=>import("./plugin-maqIhbwJ.js"),__vite__mapDeps([24,25,1,2]),import.meta.url),"../../features/sensor_text/plugin.js":()=>T(()=>import("./plugin-CZQXjrwM.js"),__vite__mapDeps([26,9,21,2,1]),import.meta.url),"../../features/shape_circle/plugin.js":()=>T(()=>import("./plugin-BYh0E2GG.js"),__vite__mapDeps([27,25,1,2]),import.meta.url),"../../features/shape_rect/plugin.js":()=>T(()=>import("./plugin-BW_MX0VX.js"),__vite__mapDeps([28,25,1,2]),import.meta.url),"../../features/sun_times/plugin.js":()=>T(()=>import("./plugin-o6wllm78.js"),__vite__mapDeps([29,2,1]),import.meta.url),"../../features/template_nav_bar/plugin.js":()=>T(()=>import("./plugin-Cv1cYtew.js"),__vite__mapDeps([30,2,1]),import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>T(()=>import("./plugin-zdVMq9Jc.js"),__vite__mapDeps([31,1,2]),import.meta.url),"../../features/text/plugin.js":()=>T(()=>import("./plugin-Cdp0Fd4b.js"),__vite__mapDeps([32,9,2,1]),import.meta.url),"../../features/touch_area/plugin.js":()=>T(()=>import("./plugin-DAoRjksi.js"),__vite__mapDeps([33,2,1,8]),import.meta.url),"../../features/weather_forecast/plugin.js":()=>T(()=>import("./plugin-BzVKFj2X.js"),__vite__mapDeps([34,35,1,2]),import.meta.url),"../../features/weather_icon/plugin.js":()=>T(()=>import("./plugin-6pLmecb7.js"),__vite__mapDeps([36,2,1,35]),import.meta.url),"../../features/wifi_signal/plugin.js":()=>T(()=>import("./plugin-Bc_LdHoy.js"),__vite__mapDeps([37,1,2]),import.meta.url)})}catch{}class To{constructor(){this.plugins=new Map,this.loading=new Map,this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid",lv_chart:"lvgl_chart"}}register(e){if(!e?.id){v.warn("[Registry] Invalid plugin registration attempt:",e);return}const n=e.id,i=this.plugins.get(n);this.plugins.set(n,{...i||{},...e}),v.log(`[Registry] Registered: ${n}`)}get(e){const n=this.aliases[e]||e;return this.plugins.get(n)}getAll(){return Array.from(this.plugins.values())}async load(e){const n=this.aliases[e]||e;if(n==="group")return null;const i=this.plugins.get(n);if(i)return i;const o=this.loading.get(n);if(o)return o;const r=(async()=>{try{const a=`../../features/${n}/plugin.js`,s=ct[a]?await ct[a]():await import(a);let l;return s.default?l=s.default:l={id:n,...s},this.register(l),this.plugins.get(n)??null}catch(a){return v.error(`[Registry] Failed to load plugin "${n}" from ESM:`,a),null}finally{this.loading.delete(n)}})();return this.loading.set(n,r),r}runHook(e,n){this.getAll().forEach(i=>{const o=e==="onCollectRequirements"?i.collectRequirements:i[e];typeof o=="function"&&o.call(i,n)})}onExportGlobals(e){this.runHook("onExportGlobals",e)}onExportEsphome(e){this.runHook("onExportEsphome",e)}onExportNumericSensors(e){this.runHook("onExportNumericSensors",e)}onExportTextSensors(e){this.runHook("onExportTextSensors",e)}onExportBinarySensors(e){this.runHook("onExportBinarySensors",e)}onExportHelpers(e){this.runHook("onExportHelpers",e)}onExportComponents(e){this.runHook("onExportComponents",e)}onCollectRequirements(e){this.runHook("onCollectRequirements",e)}}const q=new To;v.log("[Registry] Modular system ready.");class Mo{constructor(e){this.app=e}normalizeWidgetIds(e){return e?Array.isArray(e)?e:[...e]:[]}setCustomHardware(e){this.app.project.state.customHardware=e,I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.app.currentPageIndex,forceFocus:!0})}addWidget(e,n=null){this.checkRenderingModeForWidget(e),this.app.project.addWidget(e,n),this.app.recordHistory(),this.app.selectWidget(e.id),I(P.STATE_CHANGED)}updateWidget(e,n){const i=this.app,o=i.getWidgetById(e),r=this.sanitizeParentUpdate(o,n);if(this.app.project.updateWidget(e,r),o&&o.type==="group"){const a=["locked","hidden"],s={},l=r||{};if(a.forEach(c=>{l[c]!==void 0&&(s[c]=l[c])}),Object.keys(s).length>0){const c=i.pages[i.currentPageIndex];c&&c.widgets&&c.widgets.filter(u=>u.parentId===e).forEach(u=>this.updateWidget(u.id,s))}}r.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),I(P.STATE_CHANGED)}sanitizeParentUpdate(e,n){if(!n||n.parentId===void 0||!e)return n;let i=n.parentId||null;if(e.type==="group"||i===e.id)i=null;else if(i){const o=this.app.getWidgetById(i);(!o||o.type!=="group")&&(i=null)}return i===n.parentId?n:{...n,parentId:i}}updateWidgets(e,n){e.forEach(i=>this.app.project.updateWidget(i,n)),I(P.STATE_CHANGED)}updateWidgetsProps(e,n){const i=[],o=n.radius??n.border_radius??n.corner_radius;e.forEach(r=>{const a=this.app.getWidgetById(r);if(a){const s={...a.props||{},...n};if(this.app.project.updateWidget(r,{props:s}),o!==void 0&&a.parentId){const l=this.app.getWidgetById(a.parentId);if(l&&l.type==="group"&&l.title&&l.title.endsWith("Group")){const d=(this.app.getCurrentPage()?.widgets.filter(u=>u.parentId===l.id)||[]).find(u=>u.id!==a.id&&u.props?.name&&u.props.name.endsWith("Shadow"));d&&i.push({id:d.id,props:{...d.props||{},radius:o}})}}}}),i.forEach(r=>{this.app.project.updateWidget(r.id,{props:r.props})}),I(P.STATE_CHANGED)}deleteWidget(e){const n=e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds),i=[...n];n.forEach(o=>{const r=this.app.getWidgetById(o);r&&r.type==="group"&&this.app.pages[this.app.currentPageIndex].widgets.filter(s=>s.parentId===o).forEach(s=>i.push(s.id))}),this.app.project.deleteWidgets([...new Set(i)]),this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),I(P.STATE_CHANGED)}moveWidgetToPage(e,n,i=null,o=null){const r=this.app.getWidgetById(e);if(!r)return!1;const a=this.app.getCurrentPage(),s=this.app.pages[n];if(!a||!s)return!1;const l=[r];if(r.type==="group"){const g=a.widgets.filter(h=>h.parentId===e);l.push(...g)}const c=i!==null?i-r.x:0,d=o!==null?o-r.y:0,u=new Set(l.map(g=>g.id));return a.widgets=a.widgets.filter(g=>!u.has(g.id)),l.forEach(g=>{const h=JSON.parse(JSON.stringify(g));g.id===e?(i!==null&&(h.x=i),o!==null&&(h.y=o)):(h.x+=c,h.y+=d),s.widgets.push(h)}),this.app.project.rebuildWidgetsIndex(),this.app.recordHistory(),I(P.STATE_CHANGED),!0}copyWidget(e){const i=(e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds)).map(o=>this.app.getWidgetById(o)).filter(o=>!!o);i.length>0&&this.app.editor.copyWidgets(i)}pasteWidget(){const e=this.app.editor,n=e.clipboardWidgets;if(!n||n.length===0)return;const i=n.map(o=>{const r=JSON.parse(JSON.stringify(o));return r.id=be(),r.x+=10,r.y+=10,r});i.forEach(o=>{this.checkRenderingModeForWidget(o),this.app.project.addWidget(o)}),e.setSelectedWidgetIds(i.map(o=>o.id)),this.app.recordHistory(),I(P.STATE_CHANGED)}createDropShadow(e){const n=Array.isArray(e)?e:[e];if(n.length===0)return;const i=this.app.project.getCurrentPage();if(!i||!i.widgets)return;const o=i?i.dark_mode:void 0;let r=!1;o==="dark"?r=!0:o==="light"?r=!1:r=!!this.app.settings.dark_mode;const a=u=>{if(typeof u!="string")return!1;const g=u.trim().toLowerCase();return g===""||g==="transparent"||g==="transp"},s=(...u)=>u.find(g=>typeof g=="string"&&!a(g)),l=r?"white":"black",c="white",d=[];n.forEach(u=>{const g=this.app.getWidgetById(u);if(!g)return;const h=parseInt(g.props?.border_radius||g.props?.radius||g.props?.corner_radius||0,10);let m="shape_rect";g.type==="shape_circle"||g.type==="circle"?m="shape_circle":h>0&&(m="rounded_rect");const f={id:be(),type:m,x:(g.x||0)+5,y:(g.y||0)+5,width:g.width,height:g.height,props:{name:(g.props?.name||g.type)+" Shadow",bg_color:l,border_color:l}};m==="rounded_rect"&&(f.props.radius=h),this.app.project.addWidget(f),g.props||(g.props={});const _=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(g.type),S=(_&&(s(g.props.bg_color,g.props.color)||g.props.fill)?s(g.props.bg_color,g.props.color):null)??s(g.props.bg_color,g.props.background_color)??c;_?(g.props.bg_color=S,delete g.props.background_color,delete g.props.fill):(g.props.fill=!0,(g.props.bg_color!==void 0||g.props.background_color===void 0)&&(g.props.bg_color=S),g.props.background_color!==void 0&&(g.props.background_color=S)),this.app.project.updateWidget(u,{props:{...g.props}});const w=i.widgets.findIndex(D=>D.id===u),E=i.widgets.findIndex(D=>D.id===f.id);w!==-1&&E!==-1&&this.app.project.reorderWidget(this.app.project.currentPageIndex,E,w);const C="group_"+be(),x=Math.min(g.x,f.x),k=Math.min(g.y,f.y),L=Math.max(g.x+g.width,f.x+f.width),A=Math.max(g.y+g.height,f.y+f.height),M={id:C,type:"group",title:g.props?.name?`${g.props.name} Group`:"Shadow Group",x,y:k,width:L-x,height:A-k,props:{},expanded:!0};this.app.project.addWidget(M),this.app.project.updateWidget(f.id,{parentId:C}),this.app.project.updateWidget(g.id,{parentId:C}),d.push(C)}),d.length>0&&this.app.selectWidgets(d),this.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),I(P.STATE_CHANGED)}syncWidgetOrderWithHierarchy(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const n=[...e.widgets],i=n.filter(s=>s.type==="group"||!s.parentId),o=new Map;n.forEach(s=>{if(s.parentId&&s.type!=="group"){o.has(s.parentId)||o.set(s.parentId,[]);const l=o.get(s.parentId);l&&l.push(s)}});const r=[],a=s=>{r.push(s);const l=o.get(s.id);l&&(l.sort((c,d)=>n.indexOf(c)-n.indexOf(d)),l.forEach(a))};i.forEach(a),e.widgets=r,this.app.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.app.preferences.state.renderingMode||"direct";v.log(`[AppState] Syncing widget visibility for mode: ${e}`);let n=0;this.app.project.pages.forEach(i=>{i.widgets.forEach(o=>{const r=this.isWidgetCompatibleWithMode(o,e);!r&&!o.hidden?(o.hidden=!0,n++):r&&o.hidden&&(o.hidden=!1,n++)})}),n>0&&(v.log(`[AppState] Updated ${n} widgets due to mode switch.`),this.app.project.rebuildWidgetsIndex(),I(P.STATE_CHANGED))}isWidgetCompatibleWithMode(e,n){const i=q.get(e.type);if(!i)return!0;if(n==="oepl")return!!i.exportOEPL;if(n==="opendisplay")return!!i.exportOpenDisplay;if(n==="lvgl"){const o=e.type&&e.type.startsWith("lvgl_"),r=typeof i.exportLVGL=="function";return o||r}if(n==="direct"||n==="c"){const o=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!i.export&&!o}return!0}checkRenderingModeForWidget(e){if(!e||!e.type)return;const n=this.app.preferences.state.renderingMode||"direct",i=e.type.startsWith("lvgl_"),o=e.type.startsWith("oepl_"),r=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");i&&n==="direct"?(this.app.updateSettings({renderingMode:"lvgl"}),v.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),O("Auto-switched to LVGL rendering mode","info")):o&&n!=="oepl"?(this.app.updateSettings({renderingMode:"oepl"}),v.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),O("Auto-switched to OEPL mode","info")):r&&n!=="opendisplay"&&(this.app.updateSettings({renderingMode:"opendisplay"}),v.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),O("Auto-switched to ODP mode","info"))}}class Oo{constructor(e){this.app=e}reorderWidget(e,n,i){this.app.project.reorderWidget(e,n,i),this.app.widgetManager.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),I(P.STATE_CHANGED)}setCurrentPageIndex(e,n={}){this.app.project.setCurrentPageIndex(e,n),this.app.editor.setSelectedWidgetIds([]),I(P.STATE_CHANGED)}reorderPage(e,n){this.app.project.reorderPage(e,n),this.app.recordHistory()}addPage(e=null){const n=this.app.project.addPage(e);return this.app.recordHistory(),n}deletePage(e){this.app.project.deletePage(e),this.app.recordHistory()}duplicatePage(e){const n=this.app.project.duplicatePage(e);return this.app.recordHistory(),n}renamePage(e,n){this.app.project.renamePage(e,n),this.app.recordHistory()}clearCurrentPage(e=!1){const n=this.app.project.clearCurrentPage(e);return n.deleted>0&&(this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),I(P.STATE_CHANGED)),n}}class Ao{project;editor;preferences;secrets;selectionManager;historyManager;widgetManager;pageManager;_isRestoringHistory;isUndoRedoInProgress;entityStates;$raw;constructor(){this.project=new Eo,this.editor=new Co,this.preferences=new Po,this.secrets=new Io,this.selectionManager=new ko(this),this.historyManager=new Lo(this),this.widgetManager=new Mo(this),this.pageManager=new Oo(this),this._isRestoringHistory=!1,this.isUndoRedoInProgress=!1,this.entityStates={},this.recordHistory(),B(P.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get state(){return this.project.state}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get manualYamlOverride(){return this.project.manualYamlOverride}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){const e=G;return this.project.deviceModel&&e[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const n=this.project.protocolHardware,i=this.preferences.state.orientation;return i==="portrait"||i==="portrait_inverted"?{width:Math.min(n.width,n.height),height:Math.max(n.width,n.height)}:{width:Math.max(n.width,n.height),height:Math.min(n.width,n.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation||"landscape")}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel||void 0,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel||void 0,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}getManualYamlOverride(){return this.project.manualYamlOverride}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),I(P.SETTINGS_CHANGED),I(P.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!W()){const e=this.getPagesPayload();localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout");return e?JSON.parse(e):null}catch(e){return v.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),I(P.STATE_CHANGED)}reorderWidget(e,n,i){this.pageManager.reorderWidget(e,n,i)}setCurrentPageIndex(e,n={}){this.pageManager.setCurrentPageIndex(e,n)}reorderPage(e,n){this.pageManager.reorderPage(e,n)}addPage(e=null){return this.pageManager.addPage(e)}deletePage(e){this.pageManager.deletePage(e)}duplicatePage(e){return this.pageManager.duplicatePage(e)}renamePage(e,n){this.pageManager.renamePage(e,n)}selectWidget(e,n=!1){this.selectionManager.selectWidget(e,n)}selectWidgets(e){this.selectionManager.selectWidgets(e)}selectAllWidgets(){this.selectionManager.selectAllWidgets()}deselectAll(){this.selectionManager.deselectAll()}toggleSelection(e){this.selectionManager.toggleSelection(e)}isWidgetSelected(e){return this.selectionManager.isWidgetSelected(e)}groupSelection(){this.selectionManager.groupSelection()}ungroupSelection(e=null){this.selectionManager.ungroupSelection(e)}alignSelectedWidgets(e){this.selectionManager.alignSelectedWidgets(e)}distributeSelectedWidgets(e){this.selectionManager.distributeSelectedWidgets(e)}updateSettings(e){const n={},i={};Object.keys(e).forEach(o=>{o.startsWith("ai_api_key_")?n[o]=e[o]:i[o]=e[o]}),Object.keys(n).length&&Object.entries(n).forEach(([o,r])=>this.secrets.set(o,String(r??""))),this.preferences.update(i),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),I(P.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&I(P.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),I(P.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),I(P.STATE_CHANGED),I(P.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),I(P.STATE_CHANGED)}setManualYamlOverride(e,n={}){this.project.setManualYamlOverride(e,n)}clearManualYamlOverride(e={}){this.project.clearManualYamlOverride(e)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.widgetManager.setCustomHardware(e)}addWidget(e,n=null){this.widgetManager.addWidget(e,n)}updateWidget(e,n){this.widgetManager.updateWidget(e,n)}updateWidgets(e,n){this.widgetManager.updateWidgets(e,n)}updateWidgetsProps(e,n){this.widgetManager.updateWidgetsProps(e,n)}deleteWidget(e=null){this.widgetManager.deleteWidget(e)}moveWidgetToPage(e,n,i=null,o=null){return this.widgetManager.moveWidgetToPage(e,n,i,o)}copyWidget(e=null){this.widgetManager.copyWidget(e)}pasteWidget(){this.widgetManager.pasteWidget()}createDropShadow(e){this.widgetManager.createDropShadow(e)}clearCurrentPage(e=!1){return this.pageManager.clearCurrentPage(e)}recordHistory(){this.historyManager.recordHistory()}replaceHistoryBaseline(){this.historyManager.replaceHistoryBaseline()}undo(){this.historyManager.undo()}redo(){this.historyManager.redo()}setInternalFlag(e,n){const i=this.$raw||this;i[String(e)]=n}restoreSnapshot(e){this.historyManager.restoreSnapshot(e)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}syncWidgetOrderWithHierarchy(){this.widgetManager.syncWidgetOrderWithHierarchy()}syncWidgetVisibilityWithMode(){this.widgetManager.syncWidgetVisibilityWithMode()}_isWidgetCompatibleWithMode(e,n){return this.widgetManager.isWidgetCompatibleWithMode(e,n)}_checkRenderingModeForWidget(e){this.widgetManager.checkRenderingModeForWidget(e)}}const Do=new Ao,Go={set(t,e,n,i){return e==="snapEnabled"?(v.warn(`[StateProxy] Intercepted illegal write to '${String(e)}'. Automatically rerouting to setSnapEnabled().`),typeof t.setSnapEnabled=="function"&&t.setSnapEnabled(!!n),!0):(typeof e=="string"&&!["entityStates","_isRestoringHistory","isUndoRedoInProgress"].includes(e)&&typeof t[e]!="function"&&(v.warn(`[StateProxy] Illegal state mutation detected: AppState.${e} = ${String(n)}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(t,e,n,i))}},p=new Proxy(Do,Go);class U{static getEffectiveDarkMode(){const n=p?.getCurrentPage?.()?.dark_mode;return n==="dark"?!0:n==="light"?!1:!!(p&&p.settings&&p.settings.dark_mode)}static getDefaultColor(){return U.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return U.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return!!(e&&e.startsWith("lvgl_"))}static createWidget(e){const n=be(),i=U.getDefaultBgColor(),o=U.getDefaultColor();let r={id:n,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return r.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},r.width=80,r.height=80,r;case"nav_previous_page":return r.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},r.width=80,r.height=80,r;case"nav_reload_page":return r.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},r.width=80,r.height=80,r}const a=q.get(e);return a&&a.defaults&&(r.props={...a.defaults},(r.props.color==="black"||r.props.color==="white")&&(r.props.color="theme_auto"),(r.props.text_color==="black"||r.props.text_color==="white")&&(r.props.text_color="theme_auto"),(r.props.bg_color==="black"||r.props.bg_color==="white")&&(r.props.bg_color=i),(r.props.background_color==="black"||r.props.background_color==="white")&&(r.props.background_color=i),(r.props.border_color==="black"||r.props.border_color==="white")&&(r.props.border_color=o),a.width&&(r.width=a.width),a.height&&(r.height=a.height),a.defaults.width&&(r.width=a.defaults.width),a.defaults.height&&(r.height=a.defaults.height),a.defaults.w&&(r.width=a.defaults.w),a.defaults.h&&(r.height=a.defaults.h)),U.isLvglWidget(e)&&(r.props={...U.getGridCellDefaults(),...r.props}),r}}let ke=null;class ks{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,ke=this,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){v.warn("[QuickSearch] No widgets found in palette");return}e.forEach(n=>{const i=n.getAttribute("data-widget-type"),o=n.querySelector(".label"),r=o?o.textContent.trim():i,a=n.closest(".widget-category"),s=a?a.querySelector(".category-name"):null,l=s?s.textContent.trim():"Widgets";this.allWidgets.push({type:i,label:r,category:l,searchText:`${r} ${i} ${l}`.toLowerCase()})}),v.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
            <div class="quick-search-backdrop"></div>
            <div class="quick-search-container">
                <div class="quick-search-header">
                    <span class="quick-search-icon">🔍</span>
                    <input type="text" class="quick-search-input" placeholder="Search widgets..." autocomplete="off" />
                </div>
                <div class="quick-search-results"></div>
                <div class="quick-search-hint">
                    <span>↑↓ Navigate</span>
                    <span>↵ Add Widget</span>
                    <span>Esc Close</span>
                </div>
            </div>
        `,X(this.modal),this.input=this.modal.querySelector(".quick-search-input"),this.resultsContainer=this.modal.querySelector(".quick-search-results")}bindEvents(){this.modal.querySelector(".quick-search-backdrop").addEventListener("click",()=>this.close()),this.input.addEventListener("input",()=>this.handleSearch()),this.input.addEventListener("keydown",e=>this.handleKeyDown(e))}open(){this.discoverWidgets(),this.isOpen=!0,this.modal.classList.remove("hidden"),this.input.value="",this.selectedIndex=0,this.handleSearch(),setTimeout(()=>this.input.focus(),50)}close(){this.isOpen=!1,this.modal.classList.add("hidden"),this.input.blur()}handleSearch(){const e=this.input.value.toLowerCase().trim();e===""?this.filteredWidgets=[...this.allWidgets]:this.filteredWidgets=this.allWidgets.filter(n=>n.searchText.includes(e)),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.filteredWidgets.length===0){this.resultsContainer.innerHTML=`
                <div class="quick-search-empty">No widgets found</div>
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((n,i)=>`
            <div class="quick-search-item ${i===this.selectedIndex?"selected":""}" 
                 data-index="${i}" data-type="${n.type}">
                <span class="quick-search-item-label">${n.label}</span>
                <span class="quick-search-item-category">${n.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.getAttribute("data-index"),10);this.selectedIndex=i,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const n=U.createWidget(e.type);p.addWidget(n),v.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(n){v.error("[QuickSearch] Error adding widget:",n),O("Failed to add widget: "+n.message,"error")}}}function Ft(){return typeof globalThis.innerWidth=="number"?globalThis.innerWidth:0}function Ho(t,e){const n=document.createElement("div");n.className="modal-backdrop",n.style.display="flex",n.innerHTML=`
        <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Delete Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                    Are you sure you want to delete the page <b>"${e.name}"</b>?
                    <br><br>
                    This action cannot be undone.
                </p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
            </div>
        </div>
    `,X(n);const i=()=>n.remove(),o=()=>{i();try{typeof p.deletePage=="function"?p.deletePage(t):typeof O=="function"&&O("Error: AppState.deletePage not found","error")}catch(s){if(typeof O=="function"){const l=s instanceof Error?s.message:String(s);O(`Error deleting page: ${l}`,"error")}}};n.querySelectorAll(".close-btn").forEach(s=>s.onclick=i);const a=n.querySelector(".confirm-btn");a&&(a.onclick=o),n.onclick=s=>{s.target===n&&i()}}function Ro(){if(!p){typeof O=="function"&&O("Error: Application State is not ready.","error");return}const e=document.createElement("div");e.className="modal-backdrop",e.style.display="flex",e.innerHTML=`
        <div class="modal" style="width: 320px; height: auto; min-height: 180px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Clear Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">Are you sure you want to clear all widgets? <b>Locked</b> widgets will stay.</p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Clear All</button>
            </div>
        </div>
    `,X(e);const n=()=>e.remove(),i=()=>{n();try{const a=p.clearCurrentPage(!0);a.preserved>0&&typeof O=="function"?O(`Cleared ${a.deleted} widgets. ${a.preserved} locked widget(s) were preserved.`,"info"):a.deleted>0?O(`Cleared all ${a.deleted} widgets.`,"success"):a.preserved>0?O(`No widgets cleared. ${a.preserved} locked widget(s) preserved.`,"info"):O("Page is already empty.","info"),v.log("Cleared widgets from current page via AppState")}catch(a){if(typeof O=="function"){const s=a instanceof Error?a.message:String(a);O(`Error clearing page: ${s}`,"error")}}};e.querySelectorAll(".close-btn").forEach(a=>a.onclick=n);const r=e.querySelector(".confirm-btn");r&&(r.onclick=i),e.onclick=a=>{a.target===e&&n()}}function Bo(t){const e=document.getElementById("mobileWidgetsBtn"),n=document.getElementById("mobilePropsBtn"),i=document.getElementById("mobileDeviceBtn"),o=document.getElementById("mobileBackdrop"),r=document.querySelector(".sidebar"),a=document.querySelector(".right-panel"),s=()=>{r?.classList.remove("mobile-active"),a?.classList.remove("mobile-active"),o?.classList.remove("active")};e?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");s(),d||(r?.classList.add("mobile-active"),o?.classList.add("active"))}),n?.addEventListener("click",()=>{const d=a?.classList.contains("mobile-active");s(),d||(a?.classList.add("mobile-active"),o?.classList.add("active"))}),i?.addEventListener("click",()=>{s(),t.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{s(),t.app?.editorSettings?.open()}),o?.addEventListener("click",s),B(P.SELECTION_CHANGED,()=>{Ft()<=768&&(r?.classList.remove("mobile-active"),!a?.classList.contains("mobile-active")&&!r?.classList.contains("mobile-active")&&o?.classList.remove("active"))});const c=t.handlePaletteClick.bind(t);t.handlePaletteClick=d=>{c(d),Ft()<=768&&s()}}class Ls{constructor(e=null){v.log("Sidebar: Constructor called"),this.app=e,this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),v.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||v.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){v.log("Sidebar: init called"),B(P.STATE_CHANGED,()=>this.render()),B(P.PAGE_CHANGED,()=>this.render());const e=this.pagesHeader,n=this.pagesContent;e&&n&&e.addEventListener("click",()=>{const r=n.classList.toggle("hidden"),a=e.querySelector(".chevron");a&&(a.style.transform=r?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",r=>this.handlePaletteClick(r)),this.widgetPaletteEl.addEventListener("dragstart",r=>{const a=r.target.closest(".item[data-widget-type]");if(a){const s=a.getAttribute("data-widget-type");v.log("[Sidebar] Drag start:",s),r.dataTransfer&&(r.dataTransfer.setData("application/widget-type",s||""),r.dataTransfer.effectAllowed="copy")}}));const i=document.getElementById("clearAllBtn");i&&i.addEventListener("click",()=>this.handleClearPage());const o=document.getElementById("quickSearchBtn");o&&o.addEventListener("click",r=>{r.stopPropagation(),ke?ke.open():v.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){const e=this.pageListEl;if(!e)return;const n=document.createDocumentFragment();e.innerHTML="";const i=p.pages,o=p.currentPageIndex;if(i.forEach((r,a)=>{const s=document.createElement("div");s.className="item"+(a===o?" active":""),s.draggable=!0,s.ondragstart=h=>{h.dataTransfer&&(h.dataTransfer.setData("text/plain",String(a)),h.dataTransfer.effectAllowed="move"),s.style.opacity="0.5"},s.ondragend=()=>{s.style.opacity="1",Array.from(e.children).forEach(h=>{h.style.borderTop="",h.style.borderBottom=""})},s.ondragover=h=>{if(h.preventDefault(),!h.dataTransfer)return;const m=h.dataTransfer.types.includes("application/widget-id"),f=h.dataTransfer.types.includes("application/widget-type");if(m||f){h.dataTransfer&&(h.dataTransfer.dropEffect=m?"move":"copy"),s.style.backgroundColor="var(--primary-subtle)",p.currentPageIndex!==a&&p.setCurrentPageIndex(a);return}const _=s.getBoundingClientRect(),y=_.top+_.height/2;h.clientY<y?(s.style.borderTop="2px solid var(--primary)",s.style.borderBottom=""):(s.style.borderTop="",s.style.borderBottom="2px solid var(--primary)")},s.ondragleave=h=>{const m=h.relatedTarget;(!(m instanceof Node)||!s.contains(m))&&this.hoveredPageIndex===a&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor=""},s.ondrop=h=>{if(h.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor="",!h.dataTransfer)return;const m=h.dataTransfer.getData("application/widget-id"),f=h.dataTransfer.getData("application/widget-type");if(m){v.log(`[Sidebar] Drop detected on page ${a}. Widget ID:`,m);const b=a;b!==p.currentPageIndex&&(p.moveWidgetToPage(m,b),v.log(`[Sidebar] Moved widget ${m} to page ${b}`));return}if(f){v.log(`[Sidebar] Drop detected on page ${a}. Widget Type:`,f);const b=a;try{const S=U.createWidget(f);S.x=40,S.y=40,p.addWidget(S,b),p.setCurrentPageIndex(b),p.selectWidget(S.id,!1),v.log(`[Sidebar] Added new ${f} to page ${b}`)}catch(S){v.error("[Sidebar] Error creating widget from drop:",S)}return}const _=parseInt(h.dataTransfer.getData("text/plain"),10),y=a;this.handlePageReorder(_,y,h.clientY,s)},s.onclick=()=>{p.setCurrentPageIndex(a,{forceFocus:!0})},s.ondblclick=h=>{h.stopPropagation();const m=r.name||"",f=prompt("Rename Page:",m);f!==null&&f.trim()!==""&&f!==m&&p.renamePage(a,f)};const l=document.createElement("span");l.className="item-icon",l.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,s.appendChild(l);const c=document.createElement("span");c.className="label",c.textContent=r.name,s.appendChild(c);const d=document.createElement("div");d.style.marginLeft="auto",d.style.display="flex",d.style.gap="2px";const u=document.createElement("button");u.textContent="⚙",u.className="btn btn-secondary",u.style.padding="1px 4px",u.style.fontSize="8px",u.onclick=h=>{h.stopPropagation(),this.openPageSettings(a)},d.appendChild(u);const g=document.createElement("button");if(g.textContent="⧉",g.className="btn btn-secondary",g.style.padding="1px 4px",g.style.fontSize="8px",g.title="Duplicate Page",g.onclick=h=>{h.stopPropagation(),p.duplicatePage(a)},d.appendChild(g),i.length>1){const h=document.createElement("button");h.textContent="✕",h.className="btn btn-secondary",h.style.padding="1px 4px",h.style.fontSize="8px",h.style.color="var(--danger)",h.onclick=m=>{m.stopPropagation(),this.handlePageDelete(a,r)},d.appendChild(h)}s.appendChild(d),n.appendChild(s)}),e.appendChild(n),this.currentPageNameEl){const r=p.getCurrentPage();this.currentPageNameEl.textContent=r?r.name:"None"}}handleAddPage(){p.addPage()}handlePageReorder(e,n,i,o){if(e===n)return;const r=o.getBoundingClientRect(),a=r.top+r.height/2;let s=n;i>=a&&s++,e<s&&s--,e!==s&&p.reorderPage(e,s)}handlePaletteClick(e){v.log("Sidebar: handlePaletteClick",e.target);const n=e.target.closest(".item[data-widget-type]");if(!n){v.log("Sidebar: No item found");return}const i=n.getAttribute("data-widget-type");v.log("Sidebar: Creating widget of type",i);try{const o=U.createWidget(i);v.log("Sidebar: Widget created",o),p.addWidget(o),v.log("Sidebar: Widget added to state"),this.app&&this.app.canvas&&(this.app.canvas.suppressNextFocus=!0)}catch(o){v.error("Sidebar: Error creating/adding widget",o)}}openPageSettings(e){if(this.app&&this.app.pageSettings)this.app.pageSettings.open(e);else{v.error("Sidebar: PageSettings instance not found on injected app reference");const n=document.getElementById("pageSettingsModal");n&&(n.classList.remove("hidden"),n.style.display="flex")}}handlePageDelete(e,n){Ho(e,n)}handleClearPage(){Ro()}setupMobileToggles(){Bo(this)}}const Ee=G,Ie=p;function $e(){return Ie&&Ie.deviceModel?Ie.deviceModel:"reterminal_e1001"}function In(){const t=$e();return!!(Ee&&Ee[t]&&(Ee[t].features?.lcd||Ee[t].features?.oled))}function Le(){const t=Ie?.settings?.renderingMode||"direct",e=["black","white","red","yellow","gray"],n=["theme_auto","black","white","gray"],i=["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"],o=["theme_auto","black","white","gray","red","green","blue","yellow"];if(t==="oepl"||t==="opendisplay"){const l=(Ie?.project?.protocolHardware||{}).colorMode||"bw";return l==="full_color"?i:l==="color_3"?e:n}if(In())return i;const r=$e(),a=Ee?.[r];return a?.displayType==="color"&&a?.features?.epaper?o:r.endsWith("bwr_yaml")?e:r.endsWith("fullcolor_yaml")?i:r.endsWith("primarycolor_yaml")?o:n}function kn(t){if(!t)return"#000000";if(t.startsWith("#"))return t;if(t.startsWith("0x"))return"#"+t.substring(2);switch(t.toLowerCase()){case"theme_auto":return U.getEffectiveDarkMode()?"#ffffff":"#000000";case"theme_auto_inverse":return U.getEffectiveDarkMode()?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}function No(t,e,n,i){const o=e.match(/^(\d+)x(\d+)$/);if(!o)return;const r=parseInt(o[1],10),a=parseInt(o[2],10),s=document.createElement("div");s.className="lvgl-grid-overlay",s.style.cssText=`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${r}, 1fr);
    grid-template-columns: repeat(${a}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;const l=i?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=i?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<r;d++)for(let u=0;u<a;u++){const g=document.createElement("div");g.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const h=document.createElement("span");h.textContent=`${d},${u}`,h.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,g.appendChild(h),s.appendChild(g)}t.appendChild(s)}function Wo(t){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(n=>{const i=document.createElement("div");i.className=`widget-resize-handle handle-${n}`,i.dataset.handle=n,t.appendChild(i)})}function Ln(t){const e=p.selectedWidgetIds,n=t.canvas.querySelector(`.artboard-wrapper[data-index="${p.currentPageIndex}"]`),i=n?n.querySelector(".artboard"):null;let o=t.canvas.querySelector(".context-toolbar");if(e.length===0||t.dragState||t.lassoState||!i){o&&o.remove();return}const r=p.getSelectedWidgets();if(r.length===0||!n||!i){o&&o.remove();return}let a=1/0,s=1/0,l=-1/0,c=-1/0;r.forEach(f=>{a=Math.min(a,f.x),s=Math.min(s,f.y),l=Math.max(l,f.x+(f.width||0)),c=Math.max(c,f.y+(f.height||0))});const d=a,g=i.offsetTop+s-45;o?o.parentElement!==n&&n.appendChild(o):(o=document.createElement("div"),o.className="context-toolbar",n.appendChild(o)),o.style.left=d+"px",o.style.top=g+"px";const h=Number(p.zoomLevel)||1;o.style.transform=`scale(${h>0?1/h:1})`,o.style.transformOrigin="top left",o.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(_=>{if(_.separator){De(o);return}Se(o,_.icon||"",_.title||"",()=>p.alignSelectedWidgets(_.action||""))}),e.length>=3&&(De(o),Se(o,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>p.distributeSelectedWidgets("horizontal")),Se(o,"mdi-distribute-vertical-center","Distribute Vertically",()=>p.distributeSelectedWidgets("vertical")))),r.some(f=>f.type==="group"||f.parentId)?(o.children.length>0&&De(o),Se(o,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>p.ungroupSelection())):e.length>1&&(o.children.length>0&&De(o),Se(o,"mdi-group","Group Selection (Ctrl+G)",()=>p.groupSelection())),o.children.length===0&&o.remove()}function Se(t,e,n,i){const o=document.createElement("button");o.className="btn-icon",o.title=n,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=r=>{r.stopPropagation(),i()},t.appendChild(o)}function De(t){if(!t.lastElementChild||t.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",t.appendChild(e)}function me(t,e,n){const i=document.createElement("button");return i.className="artboard-btn",i.title=e,i.innerHTML=`<i class="mdi ${t}"></i>`,i.onclick=o=>{o.stopPropagation(),n()},i}function zt({title:t,message:e,confirmLabel:n,confirmClass:i,onConfirm:o}){const r=document.createElement("div");r.className="modal-backdrop",r.style.display="flex",r.innerHTML=`
    <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
        <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
            <div>${t}</div>
        </div>
        <div class="modal-body" style="padding: var(--space-4) 0;">
            <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                ${e}
            </p>
        </div>
        <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
            <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
            <button class="btn ${i} confirm-btn btn-xs" style="border-radius: 6px;">${n||"Confirm"}</button>
        </div>
    </div>
    `,X(r);const a=r.querySelector(".close-btn"),s=r.querySelector(".confirm-btn"),l=a,c=s;l.onclick=()=>r.remove(),c.onclick=()=>{o(),r.remove()}}function Fo(t,e,n){const i=document.createElement("div");i.className="debug-grid-overlay",t.appendChild(i)}function Tn(t,e,n){if(!t||typeof n!="function")return;const i=t[e];i&&cancelAnimationFrame(i),t[e]=requestAnimationFrame(()=>{t[e]=0,n()})}function Mn(t){const e=t?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!p.settings.darkMode}function Ce(){const t=p.getCurrentPage();return t?Mn(t):!1}function ie(t){const e=p.zoomLevel,n=p.settings;t.canvasContainer&&(t.canvasContainer.style.transform=`translate(${t.panX}px, ${t.panY}px) scale(${e})`,t.canvasContainer.style.transformOrigin="0 0",t.canvasContainer.style.setProperty("--canvas-ui-scale",String(e>0?1/e:1)));const i=(n.grid_opacity!==void 0?Number(n.grid_opacity):8)/100;document.documentElement.style.setProperty("--grid-opacity",i.toString());const o=document.getElementById("zoomLevel");o&&(o.textContent=Math.round(e*100)+"%")}function Ze(t,e,n=!0,i=!1){Tn(t,"_focusPageRaf",()=>{const r=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!r)return;const a=t.viewport.getBoundingClientRect(),s=a.width,l=a.height;if(s===0||l===0){Ze(t,e,n,i);return}if(i){const h=Yo(t,e);p.setZoomLevel(h)}const c=p.zoomLevel,d=r,u=d.offsetLeft+d.offsetWidth/2,g=d.offsetTop+d.offsetHeight/2;t.panX=s/2-u*c,t.panY=l/2-g*c,ie(t)})}function zo(t,e=!0){Tn(t,"_zoomToFitAllRaf",()=>{const n=t.canvas.querySelectorAll(".artboard-wrapper");if(n.length===0)return;let i=1/0,o=1/0,r=-1/0,a=-1/0;n.forEach(b=>{const S=b,w=S.offsetLeft,E=S.offsetTop,C=S.offsetWidth,x=S.offsetHeight;i=Math.min(i,w),o=Math.min(o,E),r=Math.max(r,w+C),a=Math.max(a,E+x)});const s=t.viewport.getBoundingClientRect(),l=s.width,c=s.height;if(l===0||c===0)return;const d=80,u=r-i+d,g=a-o+d,h=l/u,m=c/g;let f=Math.min(h,m);f=Math.max(.05,Math.min(2,f)),p.setZoomLevel(f);const _=i+(r-i)/2,y=o+(a-o)/2;t.panX=l/2-_*f,t.panY=c/2-y*f,ie(t)})}function Yo(t,e=p.currentPageIndex){const i=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!i)return 1;const o=t.viewport.getBoundingClientRect(),r=64,a=i,s=a.offsetWidth+r,l=a.offsetHeight+r,c=o.width/s,d=o.height/l,u=Math.min(c,d),g=Math.min(o.width,o.height),h=Math.max(.15,Math.min(1,g/800));return Math.max(h,Math.min(4,u))}function $o(t,e,n=!1){if(!e||!e.id)return;const i=t.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(i){const o=i;o.style.left=e.x+"px",o.style.top=e.y+"px",o.style.width=e.width+"px",o.style.height=e.height+"px";const r=(e.type||"").toLowerCase(),a=q?q.get(r):null;if(r==="group")i.classList.add("widget-group");else if(!n&&a&&a.render)try{const s=h=>h==="theme_auto"?Ce()?"#ffffff":"#000000":h==="theme_auto_inverse"?Ce()?"#000000":"#ffffff":h?kn(h):Ce()?"#ffffff":"#000000",l=p.selectedWidgetIds.includes(e.id),c=p.settings.device_model||"reterminal_e1001",d=G,u=d?d[c]:null;a.render(i,e,{getColorStyle:s,selected:l,profile:u,isDark:Ce()});const g=e.props?.opacity;g!==void 0&&g<100?i.style.opacity=String(g/100):i.style.opacity=""}catch{}}}const Uo=new Set(["1","true","on","open","locked","home","active","occupied","detected","online"]),jo=new Set(["0","false","off","closed","unlocked","not_home","inactive","clear","offline"]);function Yt(t){const e=String(t??"").trim().toLowerCase();return Uo.has(e)?"true":jo.has(e)?"false":e}function Vo(t,e){const n=String(t.condition_entity||"").trim();if(!n)return!0;const i=e?.[n];if(i==null||i.state==null)return!0;const o=ai.some(f=>n.startsWith(f)),r=o?Yt(i.state):String(i.state),a=Number(t.condition_min),s=Number(t.condition_max),l=String(t.condition_min||"").trim()!==""&&Number.isFinite(a),c=String(t.condition_max||"").trim()!==""&&Number.isFinite(s);if(l||c){const f=Number(r);return Number.isFinite(f)&&(!l||f>=a)&&(!c||f<=s)}let d=t.condition_state??t.condition_value;if(d==null||String(d).trim()==="")return!0;o&&(d=Yt(d),t.condition_invert&&(d=d==="true"?"false":"true"));const u=t.condition_operator||"==",g=Number(r),h=Number(d),m=Number.isFinite(g)&&Number.isFinite(h);return u==="=="?m?g===h:r===String(d):u==="!="?m?g!==h:r!==String(d):m?u==="<"?g<h:u===">"?g>h:u==="<="?g<=h:u===">="?g>=h:!0:!1}function de(t){if(!t.canvas)return;const e=t.app,n=p.pages,i=p.getCanvasDimensions();t.canvas.querySelectorAll(".snap-guide");const o=t.canvas.querySelector(".lasso-selection"),r=document.createDocumentFragment();t.canvas.innerHTML="",p.settings.editor_light_mode?t.canvas.classList.add("light-mode"):t.canvas.classList.remove("light-mode"),Ce()?t.viewport&&t.viewport.classList.add("device-dark-mode"):t.viewport&&t.viewport.classList.remove("device-dark-mode"),n.forEach((c,d)=>{const u=i.width,g=i.height,h=document.createElement("div");h.className="artboard-wrapper",h.dataset.index=String(d),d===p.currentPageIndex&&h.classList.add("active-page");const m=document.createElement("div");m.className="artboard-header",m.appendChild(me("mdi-cog-outline","Page Settings",()=>{e&&e.pageSettings&&e.pageSettings.open(d)}));const f=document.createElement("span");f.className="artboard-name",f.textContent=c.name||`Page ${d+1} `,m.appendChild(f);const _=document.createElement("div");_.className="artboard-actions",d>0&&_.appendChild(me("mdi-chevron-left","Move Left",()=>{p.reorderPage(d,d-1)})),d<n.length-1&&_.appendChild(me("mdi-chevron-right","Move Right",()=>{p.reorderPage(d,d+1)})),_.appendChild(me("mdi-plus","Add Page After",()=>{p.addPage(d+1)})),_.appendChild(me("mdi-eraser","Clear Current Page",()=>{zt({title:"Clear Page",message:`Are you sure you want to clear all widgets from < b > "${c.name||`Page ${d+1}`}"</b >? <br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{p.setCurrentPageIndex(d),p.clearCurrentPage()}})})),_.appendChild(me("mdi-delete-outline","Delete Page",()=>{zt({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${c.name||`Page ${d+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{p.deletePage(d)}})})),m.appendChild(_);const y=document.createElement("div");y.className="artboard-header-container",y.style.width=u+"px",y.appendChild(m);const b=320;if(u<b){const x=u/b;m.style.width=b+"px",m.style.transform=`scale(${x})`,m.style.transformOrigin="top left",y.style.height=40*x+"px"}else m.style.width="100%",m.style.transform="none",y.style.height="auto";h.appendChild(y);const S=p.getCanvasShape(),w=S==="round"||S==="circle",E=document.createElement("div");E.className="artboard",E.dataset.index=String(d),E.style.width=`${u}px`,E.style.height=`${g}px`;const C=Mn(c);if(E.classList.toggle("dark",C),E.classList.toggle("round-display",w),p.showGrid){const x=document.createElement("div");x.className="canvas-grid",E.appendChild(x)}p.showDebugGrid&&Fo(E),c.layout&&/^\d+x\d+$/.test(c.layout)&&No(E,c.layout,i,C);for(const x of c.widgets){const k=!Vo(x,p.entityStates||{});if(k&&!p.settings.showConditionalWidgets)continue;const L=document.createElement("div");L.className="widget",L.style.left=String(x.x)+"px",L.style.top=String(x.y)+"px",L.style.width=String(x.width)+"px",L.style.height=String(x.height)+"px",L.dataset.id=x.id,L.dataset.pageIndex=String(d),p.selectedWidgetIds.includes(x.id)&&L.classList.add("active"),x.locked&&L.classList.add("locked"),x.hidden&&L.classList.add("hidden-widget"),k&&L.classList.add("conditional-hidden-widget");const A=(x.type||"").toLowerCase(),M=q.get(A);if(A==="group")L.classList.add("widget-group"),L.innerHTML="";else if(M&&M.render)try{const D=Qe=>{if(Qe==="theme_auto")return C?"#ffffff":"#000000";if(Qe==="theme_auto_inverse")return C?"#000000":"#ffffff";const Ot=Qe;return Ot?kn(Ot):C?"#ffffff":"#000000"},N=p.selectedWidgetIds.includes(x.id),J=p.settings.device_model||"reterminal_e1001",he=G&&J in G?G[J]:null;M.render(L,x,{getColorStyle:D,selected:N,profile:he,isDark:C});const Me=x.props?.opacity;Me!==void 0&&Me<100&&(L.style.opacity=String(Me/100))}catch{L.textContent=`Error: ${A}`,L.style.border="2px solid red"}else L.innerText=`Missing: ${A}`,L.style.color="red",L.style.border="1px dashed red";A!=="group"&&Wo(L),E.appendChild(L)}h.appendChild(E),r.appendChild(h)});const a=document.createElement("div");a.className="add-page-placeholder",a.title="Click to add a new page",a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,a.style.marginTop="32px",a.style.position="relative",a.style.zIndex="2000",a.style.pointerEvents="auto",a.innerHTML=`
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;const s=p.getCanvasShape();(s==="round"||s==="circle")&&a.classList.add("round-display");const l=c=>{if(v.log("[Canvas] Add Page placeholder clicked"),c.stopPropagation(),c.preventDefault(),p.addPage()){const u=p.pages.length-1;e&&e.canvas&&(e.canvas.suppressNextFocus=!0),p.setCurrentPageIndex(u)}};a.addEventListener("mousedown",c=>c.stopPropagation()),a.addEventListener("click",l),r.appendChild(a),o&&r.appendChild(o),t.canvas.appendChild(r),Ln(t)}class qo{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.topCtx=null,this.leftCtx=null,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const n=document.createElement("canvas");return e.appendChild(n),n.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!p.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e||!this.topRuler||!this.leftRuler)return;const n=this.topRuler.getBoundingClientRect(),i=this.leftRuler.getBoundingClientRect(),o=e.getBoundingClientRect(),r=p.zoomLevel;this.drawHorizontal(n,o,r),this.drawVertical(i,o,r)}drawHorizontal(e,n,i){const o=this.topCtx;if(!o)return;const r=o.canvas,a=Dt();(r.width!==e.width*a||r.height!==e.height*a)&&(r.width=e.width*a,r.height=e.height*a,o.scale(a,a),r.style.width=e.width+"px",r.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const s=n.left-e.left;if(this.indicators){const d=s+this.indicators.x*i,u=(this.indicators.w||0)*i;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(d,0,u,e.height),o.fillStyle="var(--accent)",o.fillRect(d,e.height-2,u,2)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-s/i/10)*10,c=Math.ceil((e.width-s)/i/10)*10;for(let d=l;d<=c;d+=10){const u=s+d*i;if(u<0||u>e.width)continue;const g=d%100===0,h=d%50===0,m=g?12:h?8:4;o.beginPath(),o.moveTo(u,e.height),o.lineTo(u,e.height-m),o.stroke(),g&&o.fillText(d.toString(),u+2,10)}}drawVertical(e,n,i){const o=this.leftCtx;if(!o)return;const r=o.canvas,a=Dt();(r.width!==e.width*a||r.height!==e.height*a)&&(r.width=e.width*a,r.height=e.height*a,o.scale(a,a),r.style.width=e.width+"px",r.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const s=n.top-e.top;if(this.indicators){const d=s+this.indicators.y*i,u=(this.indicators.h||0)*i;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(0,d,e.width,u),o.fillStyle="var(--accent)",o.fillRect(e.width-2,d,2,u)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-s/i/10)*10,c=Math.ceil((e.height-s)/i/10)*10;for(let d=l;d<=c;d+=10){const u=s+d*i;if(u<0||u>e.height)continue;const g=d%100===0,h=d%50===0,m=g?12:h?8:4;o.beginPath(),o.moveTo(e.width,u),o.lineTo(e.width-m,u),o.stroke(),g&&(o.save(),o.translate(10,u+2),o.rotate(-Math.PI/2),o.fillText(d.toString(),0,0),o.restore())}}}function Xo(t){t.viewport&&(t.viewport.addEventListener("dragenter",e=>{t.dragState||(t.isExternalDragging=!0)}),t.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),t.dragState||(t.isExternalDragging=!0);const i=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(r=>{r!==i&&r.classList.remove("drag-over")}),i&&i.classList.add("drag-over");const o=e.target.closest(".add-page-placeholder");if(o)o.classList.add("drag-over");else{const r=document.querySelector(".add-page-placeholder.drag-over");r&&r.classList.remove("drag-over")}}),t.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!t.viewport.contains(e.relatedTarget))&&(t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(n=>{n.classList.remove("drag-over")}))}),t.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(u=>{u.classList.remove("drag-over")});const n=e.dataTransfer;if(!n)return;const i=n.getData("application/widget-type")||n.getData("text/plain");if(!i)return;const o=e.clientX,r=e.clientY;let a=e.target;a===t.viewport&&(a=document.elementFromPoint(o,r));const s=a instanceof HTMLElement?a.closest(".artboard-wrapper"):null,l=a instanceof HTMLElement?a.closest(".add-page-placeholder"):null;let c=-1,d=null;if(s instanceof HTMLElement){c=parseInt(s.dataset.index||"-1",10);const u=s.querySelector(".artboard");u&&(d=u.getBoundingClientRect())}else if(l instanceof HTMLElement)c=p.pages.length;else{c=p.currentPageIndex;const u=t.canvas.querySelector(`.artboard[data-index="${c}"]`);u&&(d=u.getBoundingClientRect())}v.log("[Canvas] Atomic drop capture - type:",i,"page:",c);try{const u=q.load(i);if(l){if(!p.addPage())return;c=p.pages.length-1,await new Promise(y=>setTimeout(y,50));const _=t.canvas.querySelector(`.artboard[data-index="${c}"]`);_&&(d=_.getBoundingClientRect())}await u;const g=U.createWidget(i);if(!g){v.error("[Canvas] WidgetFactory.createWidget returned null for type:",i);return}const h=p.zoomLevel,m=p.getCanvasDimensions();if(d){const f=(o-d.left)/h,_=(r-d.top)/h;g.x=Math.round(f-g.width/2),g.y=Math.round(_-g.height/2)}else v.warn("[Canvas] No targetRect, using fallback position"),g.x=40,g.y=40;g.x=Math.max(0,Math.min(m.width-g.width,g.x)),g.y=Math.max(0,Math.min(m.height-g.height,g.y)),t.suppressNextFocus=!0,p.addWidget(g,c),p.currentPageIndex!==c&&p.setCurrentPageIndex(c),p.selectWidget(g.id,!1),v.log(`[Canvas] Successfully added ${i} at (${g.x}, ${g.y})`)}catch(u){v.error("[Canvas] error creating widget from drop:",u)}}))}function Ko(t){t.viewport&&t.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),t.panState={startX:e.clientX,startY:e.clientY,startPanX:t.panX,startPanY:t.panY},t.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const n=o=>{if(t.panState){const r=o.clientX-t.panState.startX,a=o.clientY-t.panState.startY;t.panX=t.panState.startPanX+r,t.panY=t.panState.startPanY+a,ie(t)}},i=()=>{t.panState=null,t.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),$("mousemove",n),$("mouseup",i)};H("mousemove",n),H("mouseup",i)}})}function Jo(t){const e=document.getElementById("zoomInBtn"),n=document.getElementById("zoomOutBtn"),i=document.getElementById("zoomResetBtn"),o=document.getElementById("gridToggleBtn"),r=document.getElementById("debugGridToggleBtn"),a=document.getElementById("rulersToggleBtn"),s=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>pt(t)),n&&n.addEventListener("click",()=>ut(t)),i&&i.addEventListener("click",()=>Ye(t)),o&&(o.classList.toggle("active",!!p.showGrid),o.addEventListener("click",()=>{const l=!p.showGrid;p.setShowGrid(l),l&&(p.setShowDebugGrid(!1),r&&r.classList.remove("active")),o.classList.toggle("active",l),I(P.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!p.showDebugGrid),r.addEventListener("click",()=>{const l=!p.showDebugGrid;p.setShowDebugGrid(l),l&&(p.setShowGrid(!1),o&&o.classList.remove("active")),r.classList.toggle("active",l),I(P.STATE_CHANGED)})),a&&(a.classList.toggle("active",!!p.showRulers),a.addEventListener("click",()=>{const l=!p.showRulers;p.setShowRulers(l),a.classList.toggle("active",l),v.log(`[Canvas] Rulers toggled: ${l}`)})),s&&s.addEventListener("input",l=>{const c=l.target;p.updateSettings({grid_opacity:parseInt(c.value,10)})}),t.canvasContainer&&t.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),$t(l,t)},{passive:!1}),t.viewport&&t.viewport.addEventListener("wheel",l=>{l.preventDefault(),$t(l,t)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),pt(t)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),ut(t)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),Ye(t)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?p.ungroupSelection():p.groupSelection())})}function $t(t,e){const n=p.zoomLevel;let i=0;if(t.ctrlKey)i=t.deltaY>0?-.02:.02;else if(t.deltaMode===0&&t.deltaX===0&&Math.abs(t.deltaY)>=50)i=t.deltaY>0?-.05:.05;else{e.panX-=t.deltaX,e.panY-=t.deltaY,ie(e);return}if(i===0)return;const o=Math.min(Math.max(n+i,.1),5);if(o===n)return;const r=e.viewport.getBoundingClientRect(),a=t.clientX-r.left,s=t.clientY-r.top,l=(a-e.panX)/n,c=(s-e.panY)/n;e.panX=a-l*o,e.panY=s-c*o,p.setZoomLevel(o),ie(e)}function pt(t){On(.05,t)}function ut(t){On(-.05,t)}function On(t,e){const n=p.zoomLevel,i=Math.min(Math.max(n+t,.1),5);if(i!==n){if(e&&e.viewport){const o=e.viewport.getBoundingClientRect(),r=o.width/2,a=o.height/2,s=(r-e.panX)/n,l=(a-e.panY)/n;e.panX=r-s*i,e.panY=a-l*i}p.setZoomLevel(i),e&&ie(e)}}function Ye(t){p.setZoomLevel(1),t.focusPage(p.currentPageIndex,!0)}function ne(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function An(t,e,n){const i=n||(t?t.canvas:null);if(!i||typeof i.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-vertical",o.style.left=`${Math.round(e)}px`,i.appendChild(o)}function Dn(t,e,n){const i=n||(t?t.canvas:null);if(!i||typeof i.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-horizontal",o.style.top=`${Math.round(e)}px`,i.appendChild(o)}function Gn(t,e){const n=p.getCurrentPage(),i=[],o=[];if(i.push(0,e.width/2,e.width),o.push(0,e.height/2,e.height),n&&Array.isArray(n.widgets))for(const r of n.widgets){if(!r||r.id===t)continue;const a=r.x,s=r.x+(r.width||0),l=r.y,c=r.y+(r.height||0),d=a+(r.width||0)/2,u=l+(r.height||0)/2;i.push(a,d,s),o.push(l,u,c)}return{vertical:i,horizontal:o}}function Ut(t,e,n,i,o){const r=o||(t?t.canvas:null);if(!r)return;const a=document.createElement("div");a.className=`snap-guide distance-marker distance-marker-${i}`;let s,l,c,d,u;if(i==="h"){const h=e.x<n.x?e.x+e.w:n.x+n.w,m=e.x<n.x?n.x:e.x;if(s=h,l=Math.min(e.y+e.h/2,n.y+n.h/2),c=m-h,c<=0)return;u=Math.round(c),a.style.left=`${s}px`,a.style.top=`${l}px`,a.style.width=`${c}px`,a.style.height="1px";const f=document.createElement("div");f.className="distance-marker-h-tick-start";const _=document.createElement("div");_.className="distance-marker-h-tick-end",a.appendChild(f),a.appendChild(_)}else{const h=e.y<n.y?e.y+e.h:n.y+n.h,m=e.y<n.y?n.y:e.y;if(l=h,s=Math.min(e.x+e.w/2,n.x+n.w/2),d=m-h,d<=0)return;u=Math.round(d),a.style.left=`${s}px`,a.style.top=`${l}px`,a.style.width="1px",a.style.height=`${d}px`;const f=document.createElement("div");f.className="distance-marker-v-tick-start";const _=document.createElement("div");_.className="distance-marker-v-tick-end",a.appendChild(f),a.appendChild(_)}const g=document.createElement("div");g.className="distance-marker-label",g.textContent=String(u),a.appendChild(g),r.appendChild(a)}function wt(t,e,n,i,o,r,a,s=!1){if(!p.snapEnabled||o)return ne(),{x:Math.round(n),y:Math.round(i)};const d=(p.getCurrentPage()?.widgets||[]).filter(x=>x.id!==e.id&&!x.hidden),u=Gn(e.id,r),g=e.width||0,h=e.height||0;let m=n,f=i,_=null,y=null;const b=[{val:n,apply:x=>m=x},{val:n+g/2,apply:x=>m=x-g/2},{val:n+g,apply:x=>m=x-g}];let S=le+1;for(const x of b)for(const k of u.vertical){const L=Math.abs(x.val-k);L<=le&&L<S&&(S=L,_=k,x.apply(k))}const w=[{val:i,apply:x=>f=x},{val:i+h/2,apply:x=>f=x-h/2},{val:i+h,apply:x=>f=x-h}];let E=le+1;for(const x of w)for(const k of u.horizontal){const L=Math.abs(x.val-k);L<=le&&L<E&&(E=L,y=k,x.apply(k))}const C={x:m,y:f,w:g,h};return ne(),_!=null&&An(t,_,a),y!=null&&Dn(t,y,a),s&&d.forEach(x=>{const k={x:x.x,y:x.y,w:x.width,h:x.height};if(C.y<k.y+k.h&&C.y+C.h>k.y){const M=C.x<k.x?k.x-(C.x+C.w):C.x-(k.x+k.w);M>0&&M<150&&Ut(t,C,k,"h",a)}if(C.x<k.x+k.w&&C.x+C.w>k.x){const M=C.y<k.y?k.y-(C.y+C.h):C.y-(k.y+k.h);M>0&&M<150&&Ut(t,C,k,"v",a)}}),{x:Math.round(m),y:Math.round(f)}}function Et(t,e,n,i,o,r){const a=o.match(/^(\d+)x(\d+)$/);if(!a)return{x:t,y:e};const s=parseInt(a[1],10),l=parseInt(a[2],10),c=r.width/l,d=r.height/s,u=t+n/2,g=e+i/2,h=Math.round(u/c-.5),m=Math.round(g/d-.5),f=Math.max(0,Math.min(l-1,h)),_=Math.max(0,Math.min(s-1,m));return{x:Math.round(f*c),y:Math.round(_*d)}}function Hn(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const i=p.getWidgetById(t);if(!i)return;const o=parseInt(n[1],10),r=parseInt(n[2],10),a=p.getCanvasDimensions(),s=a.width/r,l=a.height/o,c=i.x+i.width/2,d=i.y+i.height/2,u=Math.floor(c/s),g=Math.floor(d/l),h=Math.max(0,Math.min(o-1,g)),m=Math.max(0,Math.min(r-1,u)),f={...i.props,grid_cell_row_pos:h,grid_cell_column_pos:m},_=Math.max(1,Math.round(i.height/l)),y=Math.max(1,Math.round(i.width/s));f.grid_cell_row_span=_,f.grid_cell_column_span=y,p.updateWidget(t,{props:f})}function Zo(t){const e=p.getWidgetById(t);if(!e)return;const n=p.getCanvasDimensions(),i=p.getCurrentPage();let o;if(i?.layout)o=Et(e.x,e.y,e.width,e.height,i.layout,n);else{const r=p.snapEnabled;typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(!0),o=wt({canvas:{querySelectorAll:()=>[]},canvasContainer:document.createElement("div")},e,e.x,e.y,!1,n),typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(r)}o&&(p.updateWidget(t,{x:o.x,y:o.y}),Hn(t),p.recordHistory())}function Ge(t,e,n,i,o,r){if(!p.snapEnabled||i)return t;const a=Gn(n,o),s=e==="v"?a.vertical:a.horizontal;let l=le+1,c=t,d=null;for(const u of s){const g=Math.abs(t-u);g<=le&&g<l&&(l=g,c=u,d=u)}return d!==null&&(e==="v"?An({canvas:r},d,r):Dn({canvas:r},d,r)),c}class Qo{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,X(this.element),H("mousedown",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),H("touchstart",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),document.addEventListener("contextmenu",e=>{!this.active||!(e.target instanceof HTMLElement)||this.element.contains(e.target)||e.target.closest("#canvas")||this.hide()},!0),H("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,n,i=null){this.targetWidgetId=i,this.position={x:e,y:n},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${n}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const n=this.getAvailableActions(),i=2*Math.PI/n.length,o=70;n.forEach((r,a)=>{const s=a*i-Math.PI/2,l=Math.cos(s)*o,c=Math.sin(s)*o,d=document.createElement("div");d.className=`radial-menu-item ${r.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=r.label,d.innerHTML=`<i class="mdi ${r.icon}"></i>`,d.addEventListener("click",u=>{u.stopPropagation(),r.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=p,n=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,i=[];if(n){i.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const o=e.selectedWidgetIds,r=o.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});o.length>1&&!r&&i.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(n.type==="group"||n.parentId)&&i.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),i.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),i.push({label:n.locked?"Unlock":"Lock",icon:n.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!n.locked})}}),i.push({label:"Snap",icon:"mdi-magnet",callback:()=>{Zo(this.targetWidgetId)}}),i.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const a=e.getCurrentPage(),s=a?.widgets.findIndex(l=>l.id===this.targetWidgetId);s!==-1&&(i.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,s,a.widgets.length-1)}}),i.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,s,0)}}))}else i.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return i}}const ee=new Qo;function er(t,e,n,i,o,r){ht(t);const a=document.createElement("div");a.className="drag-ghost-container",a.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${o});
        transition: none;
    `;const s=t.dragState?.id,l=r.find(m=>m.id===s)||r[0],c=e.find(m=>m.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const u=[],g=p.getCurrentPage();e.forEach(m=>{if(u.push(m),m.type==="group"){const _=(g?.widgets||[]).filter(y=>y.parentId===m.id);u.push(..._)}}),u.map(m=>{const f=document.querySelector(`.widget[data-id="${m.id}"]`);if(!f)return null;const _=f.closest(".artboard"),y=_i(f);return y?{widget:m,className:(_?_.className:"artboard")+" ghost-context-sim",attrs:Array.from(f.attributes).map(b=>({name:b.name,value:b.value})),styleCssText:f.style.cssText,innerHTML:f.innerHTML,background:y.background,backgroundColor:y.backgroundColor,border:y.border,borderRadius:y.borderRadius}:null}).filter(m=>m!==null).forEach(m=>{const f=document.createElement("div");f.className=m.className,f.style.cssText=`
                position: absolute;
                left: ${m.widget.x-c.x}px;
                top: ${m.widget.y-c.y}px;
                width: ${m.widget.width}px;
                height: ${m.widget.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;const _=document.createElement("div");m.attrs.forEach(y=>{_.setAttribute(y.name,y.value)}),_.classList.remove("active","dragging-source","locked"),_.classList.add("drag-ghost-widget"),_.style.cssText=m.styleCssText,_.style.position="absolute",_.style.top="0",_.style.left="0",_.style.margin="0",_.style.transform="none",_.style.setProperty("background",m.background,"important"),_.style.setProperty("background-color",m.backgroundColor,"important"),_.style.setProperty("border",m.border,"important"),_.style.setProperty("border-radius",m.borderRadius,"important"),_.innerHTML=m.innerHTML,f.appendChild(_),a.appendChild(f)}),l&&(t.dragGhostOffset={x:l.clickOffsetX*o,y:l.clickOffsetY*o}),X(a),t.dragGhostEl=a,tr(t,n,i),e.forEach(m=>{const f=document.querySelector(`.widget[data-id="${m.id}"]`);f&&f.classList.add("dragging-source")})}function tr(t,e,n){if(!t.dragGhostEl||!t.dragGhostOffset)return;const i=t.dragGhostOffset,o=e-i.x,r=n-i.y;t.dragGhostEl.style.left=o+"px",t.dragGhostEl.style.top=r+"px"}function nr(t,e,n){t.dragGhostEl&&(t.dragGhostEl.style.left=e+"px",t.dragGhostEl.style.top=n+"px")}function ht(t){t.dragGhostEl&&(t.dragGhostEl.remove(),t.dragGhostEl=null,t.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function ir(t,e,n,i){const o=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!o)return;const r=o.querySelector(".artboard-header");if(!r)return;const a=r.cloneNode(!0);a.classList.add("page-drag-ghost");const s=r.getBoundingClientRect(),l=n-s.left,c=i-s.top;a.style.cssText=`
        position: fixed;
        left: ${n}px;
        top: ${i}px;
        width: ${s.width}px;
        pointer-events: none;
        z-index: 100000;
        opacity: 0.9;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        border: 2px solid var(--accent);
        border-radius: 10px;
        background: var(--bg-surface);
        transform: translate(-${l}px, -${c}px) scale(1.05);
        transition: none;
    `,X(a),t.pageDragGhost=a,t.pageDragOffset={x:l,y:c},o.classList.add("reordering")}function or(t,e,n){t.pageDragGhost&&(t.pageDragGhost.style.left=e+"px",t.pageDragGhost.style.top=n+"px")}function rr(t,e){t.pageDragGhost&&(t.pageDragGhost.remove(),t.pageDragGhost=null);const n=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);n&&n.classList.remove("reordering")}function ar(t,e){const n=p.getWidgetById(e);if(!n)return;const i=(n.type||"").toLowerCase();if(i!=="text"&&i!=="label")return;const o=t.canvas.querySelector(`.widget[data-id="${e}"]`);if(!o)return;const r=p.zoomLevel,a=o.getBoundingClientRect(),s=yi(),l=document.createElement("textarea");l.value=n.props.text||n.title||"",l.style.position="absolute",l.style.left=a.left+s.x+"px",l.style.top=a.top+s.y+"px",l.style.width=Math.max(50,a.width)+"px",l.style.height=Math.max(30,a.height)+"px",l.style.zIndex="99999";const c=n.props||{},d=(c.font_size||20)*r;l.style.fontSize=d+"px",l.style.fontFamily=(c.font_family||"Roboto")+", sans-serif",l.style.fontWeight=c.font_weight||400,l.style.fontStyle=c.italic?"italic":"normal",l.style.textAlign=(c.text_align||"LEFT").split("_").pop().toLowerCase(),l.style.color=c.color||"black",l.style.background="rgba(255, 255, 255, 0.9)",l.style.border="1px solid #1a73e8",l.style.padding="0px",l.style.resize="both",l.style.outline="none",l.style.overflow="hidden",l.style.lineHeight="1.2",document.body.appendChild(l),l.focus(),l.select();const u=()=>{if(!l.isConnected&&!l.parentElement)return;l.removeEventListener("blur",g),l.removeEventListener("keydown",h);const m=l.value;m!==(n.props.text||n.title)&&p.updateWidget(e,{props:{...n.props,text:m}}),l.remove()};function g(){u()}function h(m){m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),u()),m.key==="Escape"&&l.remove(),l.style.height=l.scrollHeight+"px"}l.addEventListener("blur",g),l.addEventListener("keydown",h)}function sr(t,e){const n=p.zoomLevel,i=p.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const o=document.querySelector(`.artboard[data-index="${p.currentPageIndex}"]`);if(!o)return;const r=(t.clientX-e.dragState.dragStartX)/n+(e.dragState.dragStartPanX-e.panX)/n,a=(t.clientY-e.dragState.dragStartY)/n+(e.dragState.dragStartPanY-e.panY)/n,s=p.getWidgetById(e.dragState.id);if(!s)return;const l=e.dragState.widgets,c=l.find(b=>b.id===e.dragState.id);if(!c)return;let d=c.startX+r,u=c.startY+a;const g=p.getCurrentPage();if(g?.layout&&!t.altKey){ne();const b=Et(d,u,s.width,s.height,g.layout,i);d=b.x,u=b.y}else if(p.snapEnabled&&!t.altKey){const b=wt(e,s,d,u,t.altKey,i,o,t.ctrlKey);d=b.x,u=b.y}else ne();const h=o.getBoundingClientRect(),m=h.left+d*n,f=h.top+u*n;nr(e,m,f);const _=d-c.startX,y=u-c.startY;for(const b of l){const S=p.getWidgetById(b.id);S&&!S.locked&&(S.x=b.startX+_,S.y=b.startY+y,S.type==="group"&&(g.widgets||[]).filter(C=>C.parentId===S.id).forEach(C=>{l.find(x=>x.id===C.id)||(C.x+=_-(e.dragState.lastDx||0),C.y+=y-(e.dragState.lastDy||0))}))}e.dragState.lastDx=_,e.dragState.lastDy=y,e.rulers&&e.rulers.setIndicators({x:d,y:u,w:s.width,h:s.height})}else if(e.dragState.mode==="resize"){const o=p.getWidgetById(e.dragState.id);if(!o)return;ne();const r=e.dragState,a=r.handle,s=(r.dragStartPanX-e.panX)/n,l=(r.dragStartPanY-e.panY)/n,c=(t.clientX-r.startX)/n+s,d=(t.clientY-r.startY)/n+l;let u=r.startWidgetX,g=r.startWidgetY,h=r.startW,m=r.startH;if(a.includes("l")){const y=r.startWidgetX+c;u=Ge(y,"v",o.id,t.altKey,i,r.artboardEl),h=r.startWidgetX+r.startW-u}else if(a.includes("r")){const y=r.startWidgetX+r.startW+c;h=Ge(y,"v",o.id,t.altKey,i,r.artboardEl)-r.startWidgetX}if(a.includes("t")){const y=r.startWidgetY+d;g=Ge(y,"h",o.id,t.altKey,i,r.artboardEl),m=r.startWidgetY+r.startH-g}else if(a.includes("b")){const y=r.startWidgetY+r.startH+d;m=Ge(y,"h",o.id,t.altKey,i,r.artboardEl)-r.startWidgetY}const f=4;isNaN(h)&&(h=r.startW),isNaN(m)&&(m=r.startH),h<f&&(a.includes("l")&&(u=r.startWidgetX+r.startW-f),h=f),m<f&&(a.includes("t")&&(g=r.startWidgetY+r.startH-f),m=f);const _=(o.type||"").toLowerCase();if(_==="line"||_==="lvgl_line"){const y=o.props||{},b=y.orientation||"horizontal",S=parseInt(y.stroke_width||y.line_width||3,10);b==="vertical"?(h=S,m=Math.max(10,m)):(m=S,h=Math.max(10,h))}if(u=Math.max(0,Math.min(i.width-h,u)),g=Math.max(0,Math.min(i.height-m,g)),o.x=Math.round(u),o.y=Math.round(g),o.width=Math.round(h),o.height=Math.round(m),_==="icon"||_==="weather_icon"||_==="battery_icon"||_==="wifi_signal"||_==="ondevice_temperature"||_==="ondevice_humidity"){const y=o.props||{};if(y.fit_icon_to_frame){const S=Math.max(8,Math.min(o.width-8,o.height-8));y.size=Math.round(S)}else{const b=Math.max(8,Math.min(o.width,o.height));y.size=Math.round(b)}}else if(_==="shape_circle"){const y=Math.max(o.width,o.height);o.width=y,o.height=y}$o(e,o),e.rulers&&e.rulers.setIndicators({x:o.x,y:o.y,w:o.width,h:o.height})}else if(e.dragState.mode==="reorder-page"){or(e,t.clientX,t.clientY),document.querySelectorAll(".artboard-wrapper").forEach(a=>a.classList.remove("drag-over"));const o=document.elementFromPoint(t.clientX,t.clientY),r=o instanceof HTMLElement?o.closest(".artboard-wrapper"):null;r instanceof HTMLElement&&parseInt(r.dataset.index||"-1",10)!==e.dragState.pageIndex&&r.classList.add("drag-over")}}else if(e.lassoState){const o=e.lassoState.artboardEl;if(!o)return;const r=o.getBoundingClientRect(),a=(t.clientX-r.left)/n,s=(t.clientY-r.top)/n,l=Math.min(e.lassoState.startX,a),c=Math.min(e.lassoState.startY,s),d=Math.abs(a-e.lassoState.startX),u=Math.abs(s-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:u},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=u+"px");const g=p.getCurrentPage();if(g){const h=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const m={x1:l,y1:c,x2:l+d,y2:c+u};for(const f of g.widgets){const _={x1:f.x,y1:f.y,x2:f.x+f.width,y2:f.y+f.height},y=!(_.x2<m.x1||_.x1>m.x2||_.y2<m.y1||_.y1>m.y2),b=e.canvas.querySelector(`.widget[data-id="${f.id}"]`);b&&(y?(b.classList.add("active"),h.add(f.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(f.id)?b.classList.add("active"):b.classList.remove("active"))}e.lassoState.currentSelection=Array.from(h),p.selectWidgets(e.lassoState.currentSelection)}t.preventDefault(),t.stopPropagation()}}function lr(t,e){if(e.dragState){const n=e.dragState.id,i=e.dragState.mode;if(i==="move"){const a=e.canvas.querySelector(`.widget[data-id="${n}"]`),s=a?a.style.pointerEvents:"";a&&(a.style.pointerEvents="none");const l=document.elementFromPoint(t.clientX,t.clientY);a&&(a.style.pointerEvents=s);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),u=p.currentPageIndex;let g=-1;if(c)g=parseInt(c.dataset.index||"0",10);else if(d){e.suppressNextFocus=!0;const h=p.pages.length;p.addPage(h)&&(g=h)}else{const h=l?.closest("#pageList .item");if(h){const m=document.getElementById("pageList");if(!m)return;g=Array.from(m.querySelectorAll(".item")).indexOf(h)}}if(g!==-1&&g!==u){const h=e.dragState.widgets;d&&de(e);const m=e.canvas.querySelector(`.artboard[data-index="${g}"]`);let f=0;$("mousemove",e._boundMouseMove),$("mouseup",e._boundMouseUp),ht(e),e.dragState=null,ne();const _=m?m.getBoundingClientRect():null,y=p.zoomLevel,b=p.getCanvasDimensions(),S=new Set(h.map(E=>E.id));if(h.filter(E=>{const C=p.getWidgetById(E.id);return!C.parentId||!S.has(C.parentId)}).forEach(E=>{let C=E.startX,x=E.startY;if(_){const k=p.getWidgetById(E.id);C=Math.round((t.clientX-_.left)/y-E.clickOffsetX),x=Math.round((t.clientY-_.top)/y-E.clickOffsetY);const L=k?.width||50,A=k?.height||50;C=Math.max(0,Math.min(b.width-L,C)),x=Math.max(0,Math.min(b.height-A,x))}else d&&(C=40,x=40);p.moveWidgetToPage(E.id,g,C,x)&&f++}),f>0){const E=!c&&!d;p.setCurrentPageIndex(g,{suppressFocus:!E}),de(e);return}}}else if(i==="reorder-page"){const a=e.dragState.pageIndex,l=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");if(rr(e,a),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index||"0",10);c!==a&&p.reorderPage(a,c)}}$("mousemove",e._boundMouseMove),$("mouseup",e._boundMouseUp),ht(e);const o=p.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(a=>{const s=p.getWidgetById(a.id);s&&!s.locked&&(s.x=Math.max(0,Math.min(o.width-s.width,s.x)),s.y=Math.max(0,Math.min(o.height-s.height,s.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),ne(),Hn(n),p.recordHistory(),I(P.STATE_CHANGED),de(e)}else if(e.lassoState){$("mousemove",e._boundMouseMove),$("mouseup",e._boundMouseUp);const n=e.lassoState;if(e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),e.lassoState=null,n.rect){const i=n.currentSelection||[];p.selectWidgets(i)}else n.isAdditive||p.selectWidgets([]),n.focusParams?.fitZoom&&Ze(e,p.currentPageIndex,!0,!0);de(e),t.preventDefault(),t.stopPropagation()}}let it=0,ot=null,jt=0,Vt=null;function dr(t){if(!(t instanceof HTMLElement)||t.closest("input, textarea, select, option, button, [contenteditable='true']"))return;const e=document.activeElement;!(e instanceof HTMLElement)||e===document.body||e.blur()}function cr(t){if(!(t instanceof HTMLElement)||t.closest("input, textarea, select, option, button, [contenteditable='true']"))return;const e=t.closest("#canvas")||document.getElementById("canvas");if(e instanceof HTMLElement){e.hasAttribute("tabindex")||(e.tabIndex=-1);try{e.focus({preventScroll:!0})}catch{e.focus()}}}function pr(t){return!!(t.pinchState||t.touchState?.hasMoved||t.dragState?.mode==="resize"||t.lassoState?.rect)}function ur(t){const e=t instanceof HTMLElement?t:null;if(!e)return{shouldShow:!1,widgetId:null};if(e.closest("input, textarea, select, option, button, [contenteditable='true']"))return{shouldShow:!1,widgetId:null};if(!e.closest(".artboard, .widget"))return{shouldShow:!1,widgetId:null};const i=e.closest(".widget");return{shouldShow:!0,widgetId:i instanceof HTMLElement&&i.dataset.id||null}}function hr(t){t.canvas.addEventListener("mousedown",n=>{if(n.button!==0)return;ne();const i=n.target;dr(i),cr(i);const o=i.closest(".artboard-wrapper");if(!o||i.closest(".artboard-btn")||i.closest("button")){!i.closest("button")&&!i.closest(".artboard-btn")&&(p.selectWidgets([]),de(t));return}const r=parseInt(o.dataset.index||"0",10),a=o.querySelector(".artboard");let s=a;const l=i.closest(".widget");let c=l instanceof HTMLElement?l.dataset.id:void 0;const d=p.currentPageIndex!==r,u=!!i.closest(".artboard-header");if(i.closest(".artboard"),d){const m=[...p.selectedWidgetIds];p.setCurrentPageIndex(r,{suppressFocus:!0}),c&&p.selectWidgets(m.includes(c)?m:[c]);const f=t.canvas.querySelector(`.artboard[data-index="${r}"]`);f&&(s=f)}else if(u){t.dragState={mode:"reorder-page",pageIndex:r,startX:n.clientX,startY:n.clientY},ir(t,r,n.clientX,n.clientY),H("mousemove",t._boundMouseMove),H("mouseup",t._boundMouseUp),n.preventDefault();return}if(!s)return;const g=s.getBoundingClientRect(),h=p.zoomLevel;if(l instanceof HTMLElement){const m=l.dataset.id;if(!m)return;const f=n.shiftKey||n.ctrlKey,_=Date.now();if(m===ot&&_-it<300){ar(t,m),it=0,ot=null,n.preventDefault(),n.stopPropagation();return}it=_,ot=m,f?p.selectWidget(m,!0):p.selectedWidgetIds.includes(m)||p.selectWidget(m,!1);const y=p.getWidgetById(m);if(!y)return;let b=y,S=m;if(y.parentId&&y.type!=="group"){const E=p.getWidgetById(y.parentId);E&&(b=E,S=E.id,p.selectWidget(S,f))}if(i.classList.contains("widget-resize-handle")){if(y.parentId&&y.type!=="group"||b.locked)return;t.dragState={mode:"resize",handle:i.dataset.handle||"br",id:S,startX:n.clientX,startY:n.clientY,startW:b.width,startH:b.height,startWidgetX:b.x,startWidgetY:b.y,artboardEl:s,dragStartPanX:t.panX,dragStartPanY:t.panY}}else{if(b.locked)return;const E=p.getSelectedWidgets(),C=E.map(x=>({id:x.id,startX:x.x,startY:x.y,clickOffsetX:(n.clientX-g.left)/h-x.x,clickOffsetY:(n.clientY-g.top)/h-x.y}));t.dragState={mode:"move",id:S,widgets:C,artboardEl:s,dragStartX:n.clientX,dragStartY:n.clientY,dragStartPanX:t.panX,dragStartPanY:t.panY},er(t,E,n.clientX,n.clientY,h,C),t.rulers&&t.rulers.setIndicators({x:b.x,y:b.y,w:b.width,h:b.height})}H("mousemove",t._boundMouseMove),H("mouseup",t._boundMouseUp),n.preventDefault()}else{const m=(n.clientX-g.left)/h,f=(n.clientY-g.top)/h,_=Date.now(),y=r===Vt&&_-jt<300;jt=_,Vt=r,t.lassoState={startTime:_,isDoubleClick:y,focusParams:y||d&&!c?{index:r,fitZoom:y}:null,startX:m,startY:f,rect:null,isAdditive:n.shiftKey||n.ctrlKey,initialSelection:[...p.selectedWidgetIds],artboardEl:s},t.lassoEl=document.createElement("div"),t.lassoEl.className="lasso-selection",a&&a.appendChild(t.lassoEl),H("mousemove",t._boundMouseMove),H("mouseup",t._boundMouseUp),n.preventDefault()}}),t.canvas.addEventListener("contextmenu",n=>{if(pr(t)){n.preventDefault(),ee?.active&&ee.hide();return}const{shouldShow:i,widgetId:o}=ur(n.target);if(!i){ee?.active&&ee.hide();return}ee&&(n.preventDefault(),n.stopPropagation(),ee.show(n.clientX,n.clientY,o||void 0))});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",X(e)),t.canvas.addEventListener("mousemove",n=>{if(!p.showDebugGrid){e&&(e.style.display="none");return}const i=n.target.closest(".artboard");if(!i){e&&(e.style.display="none");return}const o=i.getBoundingClientRect(),r=p.zoomLevel,a=Math.round((n.clientX-o.left)/r),s=Math.round((n.clientY-o.top)/r);e&&(e.style.display="block",e.style.left=n.clientX+"px",e.style.top=n.clientY+"px",e.innerHTML=`<span>X:</span>${a} <span>Y:</span>${s}`)}),t.canvas.addEventListener("mouseleave",()=>{e&&(e.style.display="none")})}function gr(t){!t.canvas||!t.canvasContainer||(t._boundTouchMove=e=>mr(e,t),t._boundTouchEnd=e=>fr(e,t),t.canvas.addEventListener("touchstart",e=>{const n=e.touches,i=t.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),n.length===2){e.preventDefault();const o=(n[0].clientX+n[1].clientX)/2,r=(n[0].clientY+n[1].clientY)/2;t.pinchState={startDistance:Rn(n[0],n[1]),startZoom:p.zoomLevel,startPanX:t.panX,startPanY:t.panY,startCenterX:o-i.left,startCenterY:r-i.top},t.touchState=null,H("touchmove",t._boundTouchMove,{passive:!1}),H("touchend",t._boundTouchEnd),H("touchcancel",t._boundTouchEnd);return}if(n.length===1){const o=n[0],a=o.target.closest(".widget"),s=a instanceof HTMLElement?a.dataset.id:null;if(t.longPressTimer&&clearTimeout(t.longPressTimer),t.longPressTimer=setTimeout(()=>{ee&&ee.show(o.clientX,o.clientY,s),t.touchState=null},500),!(e.target instanceof HTMLElement&&e.target.classList.contains("canvas-viewport"))){if(e.target instanceof HTMLElement){const l=e.target.closest(".item[data-widget-type]");if(l){const c=l.getAttribute("data-widget-type");v.log("[CanvasTouch] Touch start on palette item:",c);return}}}if(a){e.preventDefault();const l=p.getWidgetById(s);if(!l)return;o.target.classList.contains("widget-resize-handle")?t.touchState={mode:"resize",id:s,startX:o.clientX,startY:o.clientY,startW:l.width,startH:l.height,el:a}:t.touchState={mode:"move",id:s,startTouchX:o.clientX,startTouchY:o.clientY,startWidgetX:l.x,startWidgetY:l.y,hasMoved:!1,el:a}}else e.preventDefault(),t.touchState={mode:"pan",startTouchX:o.clientX,startTouchY:o.clientY,startX:o.clientX,startY:o.clientY,startPanX:t.panX,startPanY:t.panY};H("touchmove",t._boundTouchMove,{passive:!1}),H("touchend",t._boundTouchEnd),H("touchcancel",t._boundTouchEnd)}},{passive:!1}))}function mr(t,e){const n=t.touches,i=e.viewport.getBoundingClientRect();if(e.pinchState&&n.length===2){t.preventDefault();const r=Rn(n[0],n[1])/e.pinchState.startDistance,a=Math.max(.1,Math.min(10,e.pinchState.startZoom*r)),s=(n[0].clientX+n[1].clientX)/2-i.left,l=(n[0].clientY+n[1].clientY)/2-i.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=s-c*a,e.panY=l-d*a,p.setZoomLevel(a),ie(e);return}if(n.length===1&&e.longPressTimer){const o=n[0],r=e.touchState,a=r?.startTouchX??r?.startX??o.clientX,s=r?.startTouchY??r?.startY??o.clientY;Math.hypot(o.clientX-a,o.clientY-s)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&n.length===1){t.preventDefault();const o=n[0];if(e.touchState.mode==="pan"){const r=o.clientX-e.touchState.startTouchX,a=o.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+r,e.panY=e.touchState.startPanY+a,ie(e)}else if(e.touchState.mode==="move"){const r=o.clientX-e.touchState.startTouchX,a=o.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(r,a)<5)return;e.touchState.hasMoved=!0;const s=p.getWidgetById(e.touchState.id);if(!s)return;const l=p.getCanvasDimensions(),c=p.zoomLevel;let d=e.touchState.startWidgetX+r/c,u=e.touchState.startWidgetY+a/c;d=Math.max(0,Math.min(l.width-s.width,d)),u=Math.max(0,Math.min(l.height-s.height,u)),s.x=d,s.y=u,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=u+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const r=p.getWidgetById(e.touchState.id);if(!r)return;const a=p.getCanvasDimensions(),s=p.zoomLevel;let l=e.touchState.startW+(o.clientX-e.touchState.startX)/s,c=e.touchState.startH+(o.clientY-e.touchState.startY)/s;const d=20;l=Math.max(d,Math.min(a.width-r.x,l)),c=Math.max(d,Math.min(a.height-r.y,c)),r.width=l,r.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function fr(t,e){const n=e.touchState,i=Date.now();if(n&&t.changedTouches.length>0){const o=t.changedTouches[0].clientX,r=t.changedTouches[0].clientY;if(Math.hypot(o-(n.startTouchX||n.startX),r-(n.startTouchY||n.startY))>10)i-e.lastCanvasTapTime<350?(p.setZoomLevel(1),Ze(e,p.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=i,p.selectWidgets([]));else{if(!(t.target instanceof HTMLElement))return;const s=t.target,l=s.closest(".item[data-widget-type]");if(l){const u=l.getAttribute("data-widget-type");v.log("[CanvasTouch] Touch end on palette item:",u);return}const c=s.closest(".widget"),d=c instanceof HTMLElement?c.dataset.id:null;d===e.lastWidgetTapId&&i-e.lastWidgetTapTime<350?(ee&&ee.show(o,r,d),e.lastWidgetTapTime=0):(e.lastWidgetTapId=d??null,e.lastWidgetTapTime=i,p.selectWidget(d??null))}}if(n?.id&&n.hasMoved){const o=p.getWidgetById(n.id);if(o){if(n.mode==="move"){const r=p.getCanvasDimensions(),a=p.getCurrentPage();if(a?.layout){const s=Et(o.x,o.y,o.width,o.height,a.layout,r);o.x=s.x,o.y=s.y}else{const s=wt(e,o,o.x,o.y,!1,r);o.x=s.x,o.y=s.y}}yr(n.id),p.recordHistory(),I(P.STATE_CHANGED)}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),$("touchmove",e._boundTouchMove),$("touchend",e._boundTouchEnd),$("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),de(e),ne()}function Rn(t,e){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}function yr(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const i=p.getWidgetById(t);if(!i)return;const o=parseInt(n[1],10),r=parseInt(n[2],10),a=p.getCanvasDimensions(),s=a.width/r,l=a.height/o,c=i.x+i.width/2,d=i.y+i.height/2,u=Math.floor(c/s),g=Math.floor(d/l),h=Math.max(0,Math.min(o-1,g)),m=Math.max(0,Math.min(r-1,u)),f={...i.props,grid_cell_row_pos:h,grid_cell_column_pos:m,grid_cell_row_span:Math.max(1,Math.round(i.height/l)),grid_cell_column_span:Math.max(1,Math.round(i.width/s))};p.updateWidget(t,{props:f})}let gt=null;class Ts{constructor(e=null){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.canvas&&!this.canvas.hasAttribute("tabindex")&&(this.canvas.tabIndex=-1),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._lastFocusedIndex=-1,this._boundMouseMove=n=>sr(n,this),this._boundMouseUp=n=>lr(n,this),this.longPressTimer=null,this.lastWidgetTapId=null,this.lastWidgetTapTime=0,this.lastCanvasTapTime=0,this._boundTouchMove=null,this._boundTouchEnd=null,this.panState=null,this.lassoState=null,this.rulers=new qo(this),this.updateInterval=null,this.app=e,gt=this,this.init()}init(){B(P.STATE_CHANGED,()=>this.render()),B(P.ENTITIES_LOADED,()=>this.render()),B(P.PAGE_CHANGED,n=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=n.index;return}n.forceFocus&&this.focusPage(n.index,!0,!0),this._lastFocusedIndex=n.index}),B(P.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),B(P.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers&&this.rulers.update()}),B(P.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers&&this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",n=>{n.target instanceof HTMLElement&&n.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!1,!0)},H("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if((this.canvas?.ownerDocument||document).visibilityState==="hidden"||!this.canvas?.isConnected||this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const i=p.getCurrentPage();i&&i.widgets.some(o=>o.type==="datetime")&&this.render()},1e3)}render(){de(this)}applyZoom(){ie(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=p.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(i=>{const o=i.dataset.id;o&&e.includes(o)?i.classList.add("active"):i.classList.remove("active")}),Ln(this)}setupInteractions(){Ko(this),hr(this),Jo(this),Xo(this),gr(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){pt(this)}zoomOut(){ut(this)}zoomReset(){Ye(this)}zoomToFit(){p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){zo(this,e)}focusPage(e,n=!0,i=!1){Ze(this,e,n,i)}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&$("resize",this._boundResize)}}const j="__mixed__";function _r(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};if(!t)return"#000000";const n=t.toLowerCase();return e[n]?e[n]:t.startsWith("0x")?"#"+t.substring(2):t.startsWith("#")?t:"#000000"}function qt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function vr(t,e,n){const i=o=>{const r=Math.max(0,Math.min(255,o)).toString(16);return r.length===1?"0"+r:r};return"#"+i(t)+i(e)+i(n)}function br(t,e,n,i){const o=t.getContainer();if(!o)return;const r=document.createElement("div");r.className="field",r.style.marginBottom="10px";const a=document.createElement("div");a.className="prop-label",a.textContent=e,r.appendChild(a);let s=n===j?"":_r(n);const l=qt(n===j?"#000000":s);let c=l.r,d=l.g,u=l.b;const g=document.createElement("div");g.style.background="var(--bg)",g.style.padding="8px",g.style.borderRadius="6px",g.style.border="1px solid var(--border-subtle)";const h=document.createElement("div");h.style.display="flex",h.style.alignItems="center",h.style.marginBottom="8px",h.style.gap="8px";const m=document.createElement("div");m.style.width="24px",m.style.height="24px",m.style.borderRadius="4px",m.style.border="1px solid #ccc",n===j?(m.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",m.style.backgroundSize="8px 8px",m.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",m.style.backgroundColor="white"):m.style.backgroundColor=s;const f=document.createElement("input");f.type="text",f.className="prop-input",f.style.flex="1",f.style.textTransform="uppercase",f.value=n===j?"":s,n===j&&(f.placeholder="Mixed Colors"),h.appendChild(m),h.appendChild(f),g.appendChild(h);const _=(C,x,k)=>{const L=document.createElement("div");L.style.display="flex",L.style.alignItems="center",L.style.marginBottom="4px",L.style.fontSize="11px";const A=document.createElement("span");A.textContent=C,A.style.width="15px",A.style.fontWeight="bold";const M=document.createElement("input");M.type="range",M.min="0",M.max="255",M.value=x,M.style.flex="1",M.style.marginLeft="4px",M.style.accentColor=k;const D=document.createElement("span");return D.textContent=x,D.style.width="25px",D.style.textAlign="right",D.style.marginLeft="4px",L.appendChild(A),L.appendChild(M),L.appendChild(D),{row:L,slider:M,valLbl:D}},y=_("R",String(c),"red"),b=_("G",String(d),"green"),S=_("B",String(u),"blue");g.appendChild(y.row),g.appendChild(b.row),g.appendChild(S.row),r.appendChild(g),o.appendChild(r);const w=()=>{c=parseInt(y.slider.value,10),d=parseInt(b.slider.value,10),u=parseInt(S.slider.value,10),y.valLbl.textContent=String(c),b.valLbl.textContent=String(d),S.valLbl.textContent=String(u);const C=vr(c,d,u).toUpperCase();f.value=C,m.style.backgroundColor=C,i(C)},E=()=>{let C=f.value.trim();if(C.startsWith("#")||(C="#"+C),/^#[0-9A-F]{6}$/i.test(C)){const x=qt(C);c=x.r,d=x.g,u=x.b,y.slider.value=String(c),y.valLbl.textContent=String(c),b.slider.value=String(d),b.valLbl.textContent=String(d),S.slider.value=String(u),S.valLbl.textContent=String(u),m.style.backgroundColor=C,i(C)}};y.slider.addEventListener("input",w),b.slider.addEventListener("input",w),S.slider.addEventListener("input",w),f.addEventListener("input",E),f.addEventListener("change",E)}function xr(t,e,n,i,o){const r=t.getContainer();if(!r)return;const a=document.createElement("div");a.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const l=document.createElement("div");l.className="segmented-control",n.forEach(c=>{const d=document.createElement("div");d.className="segment-item"+(c.value===i?" active":""),d.title=c.label||c.value,c.icon?d.innerHTML=`<i class="mdi ${c.icon}"></i>`:d.textContent=c.label||c.value,d.onclick=()=>{l.querySelectorAll(".segment-item").forEach(u=>u.classList.remove("active")),d.classList.add("active"),o(c.value)},l.appendChild(d)}),a.appendChild(s),a.appendChild(l),r.appendChild(a)}function Sr(t,e,n,i,o,r){const a=t.getContainer();if(!a)return;const s=document.createElement("div");s.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.className="slider-hybrid";const d=n===j,u=document.createElement("input");u.type="range",u.min=String(i),u.max=String(o),u.value=String(d?i:n);const g=document.createElement("input");g.className="prop-input",g.type="number",g.value=d?"":String(n),g.min=String(i),g.max=String(o),d&&(g.placeholder="Mixed"),u.addEventListener("input",()=>{d&&(g.placeholder=""),g.value=u.value,r(parseInt(u.value,10))}),g.addEventListener("input",()=>{u.value=g.value,r(parseInt(g.value,10))}),c.appendChild(u),c.appendChild(g),s.appendChild(l),s.appendChild(c),a.appendChild(s)}function wr(t,e){const n=t.getContainer();if(!n)return;const i=document.createElement("div");i.className="prop-grid-2",n.appendChild(i),t.panel.containerStack.push(i),e(),t.panel.containerStack.pop()}function Er(t,e,n,i){const o=p.project?.pages||[],r=[{value:"relative_prev",label:"Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic)"},{value:"home",label:"Home / Dashboard"}];o.forEach((a,s)=>{r.push({value:s.toString(),label:`Page ${s+1}: ${a.name||"Untitled"}`})}),t.addSelect(e,n,r,i)}function Cr(t,e,n){const i=e||t.getContainer();if(!i)return;const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full btn-xs",r.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',r.onclick=()=>{const a=p.selectedWidgetIds||[];a.includes(n)?p.createDropShadow(a):p.createDropShadow(n)},o.appendChild(r),i.appendChild(o)}function Pr(t,e){const n=t.getContainer();if(!n)return;const i=document.createElement("div");i.className="sidebar-section-label",i.textContent=e,n.appendChild(i)}function Ir(t,e,n,i={}){if(!W()){v.warn("Entity Picker: No HA backend detected.");return}const o=document.getElementById("propertiesPanel")||document.body,r=document.querySelector(".entity-picker-overlay");r&&r.remove();const a=document.createElement("div");a.className="entity-picker-overlay";const s=document.createElement("div");s.className="entity-picker-header",s.textContent="Pick Home Assistant entity";const l=document.createElement("button");l.className="btn btn-secondary",l.textContent="×",l.style.padding="0 4px",l.style.fontSize="9px",l.type="button",l.addEventListener("click",()=>{a.remove()});const c=document.createElement("div");c.style.display="flex",c.style.alignItems="center",c.style.gap="4px",c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center",d.style.gap="4px",d.appendChild(s),d.appendChild(c);const u=document.createElement("div");u.style.display="flex",u.style.gap="4px",u.style.alignItems="center";const g=document.createElement("input");g.type="text",g.className="prop-input",g.placeholder="Search name or entity_id",g.style.flex="1";const h=document.createElement("select");h.className="prop-input",h.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(_=>{const y=document.createElement("option");y.value=_,y.textContent=_,h.appendChild(y)}),u.appendChild(g),u.appendChild(h);const m=document.createElement("div");m.className="entity-picker-list",a.appendChild(d),a.appendChild(u),a.appendChild(m),o.appendChild(a);function f(_){if(m.innerHTML="",!_||_.length===0){const y=document.createElement("div");y.style.color="var(--muted)",y.style.fontSize="var(--fs-xs)",y.textContent="No entities match.",m.appendChild(y);return}_.forEach(y=>{const b=document.createElement("div");b.className="entity-picker-row";const S=document.createElement("div");S.className="entity-picker-name",S.textContent=y.name||y.entity_id;const w=document.createElement("div");w.className="entity-picker-meta",w.textContent=`${y.entity_id} · ${y.domain||y.entity_id.split(".")[0]}`,b.appendChild(S),b.appendChild(w),b.addEventListener("click",()=>{if(n&&n(y.entity_id),e&&(e.value=y.entity_id),t&&p&&!i.skipAutoUpdate){if(p.updateWidget(t.id,{entity_id:y.entity_id,title:y.name||y.entity_id||""}),t.type==="graph"&&y.attributes){const E=y.attributes,C={};if(E.unit_of_measurement==="%"&&(t.props.min_value||(C.min_value="0"),t.props.max_value||(C.max_value="100")),E.min!==void 0&&!t.props.min_value&&(C.min_value=String(E.min)),E.max!==void 0&&!t.props.max_value&&(C.max_value=String(E.max)),Object.keys(C).length>0){const x={...t.props,...C};p.updateWidget(t.id,{props:x})}}if(t.type==="sensor_text"){const E={...t.props};y.attributes&&y.attributes.unit_of_measurement?E.unit=y.attributes.unit_of_measurement:y.unit&&(E.unit=y.unit);const C=y.state;if(y.entity_id.startsWith("weather.")||y.entity_id.startsWith("text_sensor."))E.is_text_sensor=!0;else if(C!=null&&C!==""){const k=parseFloat(C);isNaN(k)?E.is_text_sensor=!0:E.is_text_sensor=!1}p.updateWidget(t.id,{props:E})}}a.remove()}),m.appendChild(b)})}pe().then(_=>{if(!_||_.length===0){f([]);return}function y(){const b=(g.value||"").toLowerCase(),S=h.value,w=_.filter(E=>{const C=E.domain||E.entity_id.split(".")[0];return S!=="all"&&C!==S?!1:b?`${E.entity_id} ${E.name||""}`.toLowerCase().includes(b):!0});f(w)}g.addEventListener("input",y),h.addEventListener("change",y),y()})}let R=null,ce=null,ye=null,He=null,oe=null,_e=null,Pe=null,rt=null,mt="";function Bn(){return Pe?Promise.resolve(Pe):(rt||(rt=T(()=>import("./mdi-icons-CTSt1Fdj.js").then(t=>t.b),[],import.meta.url).then(t=>(Pe=t.mdiIconCatalog||[],Pe))),rt)}function kr(){R||(R=document.getElementById("iconPickerModal"),ce=document.getElementById("iconPickerFilter"),ye=document.getElementById("iconPickerList"),He=document.getElementById("iconPickerClose"),R||(R=document.createElement("div"),R.id="iconPickerModal",R.className="modal-backdrop hidden",R.style.zIndex="2000",R.innerHTML=`
            <div class="modal" style="max-width: 560px; height: 80vh; display: flex; flex-direction: column;">
                <div class="modal-header">
                    <div>Select Icon</div>
                    <button id="iconPickerClose" class="btn btn-secondary">&times;</button>
                </div>
                <div class="modal-body" style="flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 15px;">
                    <input type="text" id="iconPickerFilter" class="prop-input" placeholder="Filter icons..." style="width: 100%; margin-bottom: 12px;">
                    <div id="iconPickerList" style="flex: 1; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; padding: 10px; background: var(--bg-canvas);"></div>
                </div>
            </div>
        `,X(R),ce=document.getElementById("iconPickerFilter"),ye=document.getElementById("iconPickerList"),He=document.getElementById("iconPickerClose")),He&&(He.onclick=ft),ce&&(ce.oninput=t=>{const e=t.target;Nn(e.value)}),R&&(R.onclick=t=>{t.target===R&&ft()}))}function Ct(t,e){kr(),oe=t,_e=e,R&&(R.classList.remove("hidden"),R.style.display="flex",ce&&(ce.value="",ce.focus()),mt="",Ue([]),Bn().then(n=>{R&&!R.classList.contains("hidden")&&Ue(n)}))}function ft(){R&&(R.classList.add("hidden"),R.style.display="none"),oe=null,_e=null}function Ue(t){if(!ye)return;if(ye.innerHTML="",!t||t.length===0){ye.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();t.forEach(n=>{const i=document.createElement("div");i.className="icon-item",i.style.padding="8px",i.style.border="1px solid var(--border-subtle)",i.style.borderRadius="4px",i.style.cursor="pointer",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.justifyContent="center",i.style.textAlign="center",i.style.background="var(--bg)",i.style.contentVisibility="auto",i.style.containIntrinsicSize="64px 64px",i.title=n.name;const o=document.createElement("div");o.className="mdi",o.style.fontSize="24px",o.style.color="var(--accent)";const r=parseInt(n.code,16);o.textContent=String.fromCodePoint(r);const a=document.createElement("div");a.style.fontSize="9px",a.style.marginTop="4px",a.style.overflow="hidden",a.style.textOverflow="ellipsis",a.style.whiteSpace="nowrap",a.style.width="100%",a.style.color="var(--muted)",a.textContent=n.name,i.appendChild(o),i.appendChild(a),i.onclick=()=>Lr(n),i.onmouseenter=()=>{i.style.borderColor="var(--accent)",i.style.background="rgba(110, 68, 255, 0.05)"},i.onmouseleave=()=>{i.style.borderColor="var(--border-subtle)",i.style.background="var(--bg)"},e.appendChild(i)}),ye.appendChild(e)}function Nn(t){mt=t;const e=Pe;if(!e){Bn().then(()=>Nn(mt));return}if(!t){Ue(e);return}const n=t.toLowerCase(),i=e.filter(o=>o.name.toLowerCase().includes(n)||(o.aliases||[]).some(r=>r.toLowerCase().includes(n))||o.code.toLowerCase().includes(n));Ue(i)}function Lr(t){oe&&(_e?(_e.value=t.code,_e.dispatchEvent(new Event("input")),_e.dispatchEvent(new Event("change"))):(oe.props||(oe.props={}),oe.props.code=t.code,p&&p.updateWidget(oe.id,oe))),ft()}const yt=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];function Tr(t,e,n,i,o,r,a={}){const s=t.getContainer();if(!s)return;const l=document.createElement("div");l.className="field";const c=document.createElement("div");c.className="prop-label",c.textContent=e;const d=document.createElement("div");d.style.display="flex",d.style.gap="4px";const u=document.createElement("input");u.className="prop-input",u.type=n,u.value=i,u.style.flex="1";const g=e.toLowerCase().includes("entity");u.placeholder=g?"Pick entity or type mqtt:topic...":"Start typing or browse...",u.autocomplete="off",u.setAttribute("list",lt),wn(),u.addEventListener("input",()=>o(u.value));const h=document.createElement("button");if(h.className="btn btn-secondary",h.textContent="v",h.style.padding="4px 8px",h.style.fontSize="10px",h.style.minWidth="32px",h.type="button",h.title="Browse all entities",h.addEventListener("click",()=>{Ir(r,u,m=>{u.value=m,o(m)},a)}),d.appendChild(u),d.appendChild(h),l.appendChild(c),l.appendChild(d),g&&!i){const m=document.createElement("div");m.style.fontSize="11px",m.style.color="#666",m.style.marginTop="4px",m.style.lineHeight="1.4",m.textContent="Tip: Use mqtt:topic/path for MQTT sources",l.appendChild(m)}s.appendChild(l)}function Mr(t,e,n,i,o){const r=t.getContainer();if(!r)return;const a=document.createElement("div");a.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e,a.appendChild(s);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(n||"").replace("mdi:","").toUpperCase();yt.forEach(f=>{const _=document.createElement("option");_.value=f.code;const y=983040+parseInt(f.code.slice(1),16),b=String.fromCodePoint(y);_.textContent=b+"  "+f.code+(f.name?` (${f.name})`:""),_.style.fontFamily="MDI, monospace, system-ui",f.code===d&&(_.selected=!0),l.appendChild(_)}),l.addEventListener("change",()=>{l.value&&i(l.value)}),a.appendChild(l);const u=document.createElement("div");u.style.display="flex",u.style.gap="4px";const g=document.createElement("input");g.className="prop-input",g.type="text",g.placeholder="MDI Hex (Fxxxx)",g.value=d,g.style.flex="1",g.style.fontFamily="monospace",g.addEventListener("input",()=>{const f=(g.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");if(/^F[0-9A-F]{4}$/i.test(f)){i(f);const _=Array.from(l.options).find(y=>y.value===f);l.value=_?f:""}else f===""&&(i(""),l.value="")}),u.appendChild(g);const h=document.createElement("button");h.className="btn btn-secondary",h.textContent="*",h.style.padding="4px 8px",h.style.fontSize="14px",h.type="button",h.title="Open full icon browser",h.addEventListener("click",()=>{Ct(o,g)}),u.appendChild(h),a.appendChild(u);const m=document.createElement("div");m.className="prop-hint",m.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',a.appendChild(m),r.appendChild(a)}function Or(t,e,n,i,o){const r=t.getContainer();if(!r)return;const a=document.createElement("div");a.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type="text",c.value=n,c.style.flex="1",c.addEventListener("input",()=>i(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.textContent="*",d.style.padding="4px 8px",d.style.fontSize="14px",d.type="button",d.addEventListener("click",()=>{Ct(o,c)}),l.appendChild(c),l.appendChild(d),a.appendChild(s),a.appendChild(l),r.appendChild(a)}function Ar(t,e,n,i,o,r){const a=t.getContainer();if(!a)return;const s=document.createElement("div");s.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.style.display="flex",c.style.gap="4px",c.style.flex="1";const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=i,d.style.flex="1",d.onchange=g=>o(g.target.value),d.oninput=g=>o(g.target.value);const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',u.title="Pick MDI Icon",u.style.minWidth="32px",u.style.padding="0 8px",u.onclick=()=>{Ct(r,d)},c.appendChild(d),c.appendChild(u),s.appendChild(l),s.appendChild(c),a.appendChild(s)}function Dr(t,e,n,i,o,r){const a=t.getContainer();if(!a)return;const s=document.createElement("div");s.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c="datalist_"+Math.random().toString(36).substr(2,9),d=document.createElement("datalist");d.id=c,o.forEach(g=>{const h=document.createElement("option");h.value=g,d.appendChild(h)});const u=document.createElement("input");u.className="prop-input",u.type=n,u.value=i,u.setAttribute("list",c),u.addEventListener("input",()=>r(u.value)),u.addEventListener("change",()=>r(u.value)),s.appendChild(l),s.appendChild(u),s.appendChild(d),a.appendChild(s)}function Gr(t,e,n){const i=(a,s)=>{const l={...e.props,[a]:s};p.updateWidget(e.id,{props:l})};t.panel.createSection("Common LVGL",!1);const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="1fr 1fr",o.style.gap="4px",t.getContainer().appendChild(o);const r=(a,s,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=n[s]!==void 0?n[s]:l,d.addEventListener("change",()=>i(s,d.checked));const u=document.createElement("span");u.textContent=" "+a,u.style.fontSize="10px",c.appendChild(d),c.appendChild(u),o.appendChild(c)};r("Hidden","hidden",!1),r("Clickable","clickable",!0),r("Checkable","checkable",!1),r("Scrollable","scrollable",!0),r("Floating","floating",!1),r("Ignore Layout","ignore_layout",!1),t.addSelect("Scrollbar Mode",n.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],a=>i("scrollbar_mode",a)),t.panel.endSection()}function Hr(t,e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const n=document.createElement("div");n.className="field",n.style.fontSize="9px",n.style.color="#9499a6",n.style.marginBottom="6px",n.innerHTML="Show/hide this widget based on an entity's state.",t.getContainer().appendChild(n),t.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,s=>{p.updateWidget(e.id,{condition_entity:s})},e);const i=["==","!=","<",">","<=",">="];t.addSelect("Operator",e.condition_operator,i,s=>{p.updateWidget(e.id,{condition_operator:s})});const o=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];t.addLabeledInputWithDataList("Condition State","text",e.condition_state,o,s=>{p.updateWidget(e.id,{condition_state:s})}),t.addLabeledInput("Min Value (Range)","text",e.condition_min,s=>{p.updateWidget(e.id,{condition_min:s})}),t.addLabeledInput("Max Value (Range)","text",e.condition_max,s=>{p.updateWidget(e.id,{condition_max:s})});const r=document.createElement("div");r.className="field",r.style.marginTop="8px";const a=document.createElement("button");a.className="btn btn-secondary btn-full",a.textContent="Clear Condition",a.type="button",a.addEventListener("click",()=>{p.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),r.appendChild(a),t.getContainer().appendChild(r)}function Rr(t,e){const n=e.props||{},i=(s,l)=>{const c={...e.props,[s]:l};p.updateWidget(e.id,{props:c})};t.panel.createSection("State Trigger",!1);const o=document.createElement("div");o.className="field",o.style.fontSize="9px",o.style.color="#9499a6",o.style.marginBottom="6px",o.innerHTML="Add a supported Home Assistant trigger that round-trips with the canvas. Paste the YAML actions exactly as they belong under <code>then:</code>.",t.getContainer().appendChild(o),t.addLabeledInputWithPicker("Trigger Entity","text",n.state_trigger_entity||"",s=>{i("state_trigger_entity",s)},e),t.addSelect("Trigger Type",n.state_trigger_mode||"auto",[{value:"auto",label:"Auto (binary uses on_state)"},{value:"on_state",label:"State Change (binary)"},{value:"on_value",label:"Value Change"}],s=>{i("state_trigger_mode",s)}),t.addLabeledInput("Actions YAML","textarea",n.state_trigger_actions||"",s=>{i("state_trigger_actions",s)});const r=document.createElement("div");r.className="field",r.style.marginTop="8px";const a=document.createElement("button");a.className="btn btn-secondary btn-full",a.textContent="Clear State Trigger",a.type="button",a.addEventListener("click",()=>{p.updateWidget(e.id,{props:{...e.props,state_trigger_entity:"",state_trigger_mode:"auto",state_trigger_actions:""}})}),r.appendChild(a),t.getContainer().appendChild(r),t.panel.endSection()}class Br{constructor(e){this.panel=e}getContainer(){return this.panel.getContainer()}addLabeledInput(e,n,i,o){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const s=i===j;let l;n==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=s?"":i||"",s&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=n,l.value=s?"":String(i??""),s&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888"));const c=n==="number"||n==="range"?o:vo(o,50);l.addEventListener("input",()=>{s&&(l.style.fontStyle="normal",l.style.color="inherit"),c(l.value)}),l.addEventListener("change",()=>{o(l.value)}),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addSelect(e,n,i,o){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const s=document.createElement("select");s.className="prop-input";const l=n===j;if(l){const c=document.createElement("option");c.value=j,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,s.appendChild(c)}(i||[]).forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(n)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(n)&&(d.selected=!0)),s.appendChild(d)}),s.addEventListener("change",()=>{o(s.value)}),r.appendChild(a),r.appendChild(s),this.getContainer().appendChild(r)}addCheckbox(e,n,i){const o=document.createElement("div");o.className="field",o.style.marginBottom="8px";const r=document.createElement("label");r.style.display="flex",r.style.alignItems="center",r.style.gap="8px",r.style.fontSize="13px",r.style.cursor="pointer";const a=document.createElement("input");a.type="checkbox",n===j?a.indeterminate=!0:a.checked=!!n,a.style.width="16px",a.style.height="16px",a.style.margin="0",a.style.cursor="pointer",a.addEventListener("change",()=>{const l=a;l.indeterminate=!1,i(l.checked)});const s=document.createElement("span");s.textContent=e,r.appendChild(a),r.appendChild(s),o.appendChild(r),this.getContainer().appendChild(o)}addHint(e){const n=document.createElement("div");n.style.fontSize="11px",n.style.color="#666",n.style.marginTop="4px",n.style.marginBottom="12px",n.style.lineHeight="1.4",n.innerHTML=e,this.getContainer().appendChild(n)}addLabeledInputWithPicker(e,n,i,o,r,a={}){Tr(this,e,n,i,o,r,a)}addIconPicker(e,n,i,o){Mr(this,e,n,i,o)}addColorMixer(e,n,i){br(this,e,n,i)}addColorSelector(e,n,i,o){const r=i||Le();In()?this.addColorMixer(e,n,o):this.addSelect(e,n,r,o)}addSegmentedControl(e,n,i,o){xr(this,e,n,i,o)}addNumberWithSlider(e,n,i,o,r){Sr(this,e,n,i,o,r)}addCompactPropertyRow(e){wr(this,e)}addCommonLVGLProperties(e,n){Gr(this,e,n)}addVisibilityConditions(e){Hr(this,e)}addLVGLStateTriggerControls(e){Rr(this,e)}addPageSelector(e,n,i){Er(this,e,n,i)}addDropShadowButton(e,n){Cr(this,e,n)}addIconInput(e,n,i,o){Or(this,e,n,i,o)}addLabeledInputWithIconPicker(e,n,i,o,r){Ar(this,e,n,i,o,r)}addLabeledInputWithDataList(e,n,i,o,r){Dr(this,e,n,i,o,r)}addSectionLabel(e){Pr(this,e)}}class Nr{static render(e,n,i){const o=Le(),r=n.props||{},a=(s,l)=>{const c={...n.props,[s]:l};if(p.updateWidget(n.id,{props:c}),s==="border_radius"||s==="radius"||s==="corner_radius"){const d=p.getCurrentPage();if(d&&d.widgets){const u=parseInt(l,10)||0,g=(n.props?.name||n.type)+" Shadow",h=d.widgets.find(m=>m.props&&m.props.name===g||m.x===(n.x||0)+5&&m.y===(n.y||0)+5&&m.width===n.width&&m.height===n.height);h&&(h.type==="shape_rect"&&u>0?p.updateWidget(h.id,{type:"rounded_rect",props:{...h.props,radius:u}}):h.type==="rounded_rect"&&p.updateWidget(h.id,{props:{...h.props,radius:u}}))}}};i.forEach(s=>{e.createSection(s.section,s.defaultExpanded!==!1),s.fields.forEach(l=>{if(l.hidden)return;const c=l.target==="root",d=c?n[l.key]!==void 0?n[l.key]:l.default:r[l.key]!==void 0?r[l.key]:l.default,u=g=>{let h=g;l.type==="number"&&(h=g===""?null:parseFloat(g),isNaN(h)&&(h=l.default!==void 0?l.default:0)),c?p.updateWidget(n.id,{[l.key]:h}):a(l.key,h)};switch(l.type){case"text":case"textarea":case"number":e.addLabeledInput(l.label,l.type,d,u);break;case"color":e.addColorSelector(l.label,d,o,u);break;case"select":{const g=typeof l.dynamicOptions=="function"?l.dynamicOptions(r):l.options;e.addSelect(l.label,d,g,u);break}case"checkbox":e.addCheckbox(l.label,d,u);break;case"icon_picker":e.addLabeledInputWithIconPicker(l.label,"text",d,u,n);break;case"entity_picker":e.addLabeledInputWithPicker(l.label,"text",d,u,n);break;case"hint":e.addHint(l.label);break;case"drop_shadow_button":e.addDropShadowButton(e.getContainer(),n.id);break}}),e.endSection()})}}class Wr{static render(e,n){const i=n.map(b=>p.getWidgetById(b)).filter(b=>!!b);if(i.length===0)return;const o=new Set(["border_width","border_color","border_radius","radius"]),r=b=>typeof b?.props?.name=="string"&&b.props.name.trim().endsWith("Shadow"),a=(b,S)=>{if(!b||b.type==="group"||r(b))return!1;const w=b.props||{};if(w[S]!==void 0||S==="radius"&&w.corner_radius!==void 0||S==="border_radius"&&w.corner_radius!==void 0)return!0;const E=q.get(b.type)?.defaults||{};return E[S]!==void 0||S==="radius"&&E.corner_radius!==void 0||S==="border_radius"&&E.corner_radius!==void 0},s=b=>o.has(b)?i.filter(S=>a(S,b)):i;v.log(`[MultiSelectRenderer] Rendering ${i.length} widgets. Display keys detection starting...`),e.panel.innerHTML="",e.createSection(`${i.length} Widgets Selected`,!0),e.createSection("Transform",!0);const l=b=>{const S=i[0][b];return i.every(w=>w[b]===S)?S:j},c=(b,S)=>{p.updateWidgets(n,{[b]:S})};e.addCompactPropertyRow(()=>{const b=w=>c("x",parseInt(w,10)),S=w=>c("y",parseInt(w,10));e.addLabeledInput("X","number",l("x"),b),e.addLabeledInput("Y","number",l("y"),S)}),e.addCompactPropertyRow(()=>{const b=w=>c("width",parseInt(w,10)),S=w=>c("height",parseInt(w,10));e.addLabeledInput("Width","number",l("width"),b),e.addLabeledInput("Height","number",l("height"),S)}),e.endSection();const d=["color","bg_color","background_color","border_width","border_color","border_radius","radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],u=new Set;i.forEach(b=>Object.keys(b.props||{}).forEach(S=>u.add(S)));const h=i.map(b=>Object.keys(b.props||{})).reduce((b,S)=>b.filter(w=>S.includes(w))),m=new Set([...h,...d]),f=Array.from(m).filter(b=>{if(o.has(b))return s(b).length>0;if(d.includes(b)){if(i.some(w=>w.props&&w.props[b]!==void 0))return!0;if(b.includes("font")||b==="text_align"||b==="italic"){const w=["text","label","sensor_text","lvgl_label","lvgl_button","datetime"];return i.every(E=>w.includes(E.type)||E.type&&E.type.startsWith("lvgl_"))}if(b==="color"||b==="opacity"){const w=["text","label","sensor_text","lvgl_label","lvgl_button","shape_rect","rounded_rect","shape_circle","datetime","icon"];return i.every(E=>w.includes(E.type)||E.type&&E.type.startsWith("lvgl_"))}}return h.includes(b)});if(f.length>0){e.createSection("Shared Appearance",!0);const b=x=>{const k=s(x);if(k.length===0)return j;const L=k[0].props?k[0].props[x]:void 0;return k.every(A=>(A.props?A.props[x]:void 0)===L)?L:j},S=(x,k)=>{const L=s(x).map(A=>A.id);L.length!==0&&p.updateWidgetsProps(L,{[x]:k})},w=f.filter(x=>{const k=i.find(A=>A.props&&A.props[x]!==void 0)?.props?.[x],L=k!==void 0?k:"";return typeof L=="number"||typeof L=="string"||typeof L=="boolean"||L===""}),E=w.includes("bg_color")&&w.includes("background_color")&&i.every(x=>x.props?.background_color===void 0||x.props?.bg_color!==void 0),C=w.filter(x=>!(E&&x==="background_color"));C.sort((x,k)=>x.includes("color")&&!k.includes("color")?-1:k.includes("color")&&!x.includes("color")?1:x.localeCompare(k)),C.forEach(x=>{const k=x==="bg_color"&&!C.includes("background_color")?"Background Color":x.split("_").map(N=>N.charAt(0).toUpperCase()+N.slice(1)).join(" "),L=b(x),A=s(x),M=A.find(N=>N.props&&N.props[x]!==void 0)||A[0]||i[0],D=M.props&&M.props[x]!==void 0?typeof M.props[x]:"string";if(x.includes("color")||x==="bg"||x==="fg"){const N=J=>S(x,J);e.addColorSelector(k,L,Le(),N)}else if(D==="boolean"||["italic","locked","hidden"].includes(x)){const N=J=>S(x,J);e.addCheckbox(k,L===j?!1:L,N)}else{const N=D==="number"||x.includes("width")||x.includes("size")||x.includes("radius")?"number":"text",J=he=>{S(x,N==="number"?parseInt(he,10):he)};e.addLabeledInput(k,N,L,J)}}),e.endSection()}e.createSection("Operations",!0);const _=document.createElement("button");_.className="btn btn-secondary btn-full btn-xs",_.style.width="100%",_.style.marginTop="8px",_.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',_.onclick=()=>p.createDropShadow(n),e.getContainer().appendChild(_);const y=document.createElement("button");y.className="btn btn-secondary btn-xs",y.style.background="var(--danger)",y.style.color="white",y.style.border="none",y.style.width="100%",y.style.marginTop="8px",y.innerHTML="🗑 Delete Selected Widgets",y.onclick=()=>{confirm(`Delete ${n.length} widgets?`)&&p.deleteWidget()},e.getContainer().appendChild(y),e.endSection(),e.endSection()}}class Fr{static render(e,n,i,o){const r=p.getCurrentPage(),s=(r?.layout||"absolute")!=="absolute";if(!r)return;if(!s){const h=e.getContainer(),m=document.createElement("div");m.style.padding="8px 0",m.style.fontSize="11px",m.style.color="var(--muted)",m.textContent="Page is currently in Absolute Positioning mode.",h.appendChild(m);const f=document.createElement("button");f.className="btn btn-secondary btn-xs",f.style.width="100%",f.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',f.onclick=()=>{o&&o.open(p.currentPageIndex)},h.appendChild(f);return}const l=U.isLvglWidget(i),c=n.props||{},d=(h,m)=>{const f={...n.props,[h]:m};p.updateWidget(n.id,{props:f})},u=(h,m,f,_)=>{const y=r.layout.match(/^(\d+)x(\d+)$/);if(!y)return null;const b=parseInt(y[1],10),S=parseInt(y[2],10),w=p.getCanvasDimensions(),E=w.width/S,C=w.height/b;return{x:Math.round(m*E),y:Math.round(h*C),width:Math.round(E*_),height:Math.round(C*f)}};if(e.addLabeledInput("Row (0-indexed)","number",c.grid_cell_row_pos??"",h=>{const m=h===""?null:parseInt(h,10);d("grid_cell_row_pos",isNaN(m)?null:m);const _=p.getWidgetById(n.id)?.props||{};if(m!=null&&_.grid_cell_column_pos!=null){const y=u(m,_.grid_cell_column_pos,_.grid_cell_row_span||1,_.grid_cell_column_span||1);y&&p.updateWidget(n.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),e.addLabeledInput("Column (0-indexed)","number",c.grid_cell_column_pos??"",h=>{const m=h===""?null:parseInt(h,10);d("grid_cell_column_pos",isNaN(m)?null:m);const _=p.getWidgetById(n.id)?.props||{};if(m!=null&&_.grid_cell_row_pos!=null){const y=u(_.grid_cell_row_pos,m,_.grid_cell_row_span||1,_.grid_cell_column_span||1);y&&p.updateWidget(n.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),e.addLabeledInput("Row Span","number",c.grid_cell_row_span||1,h=>{const m=Math.max(1,parseInt(h,10)||1);d("grid_cell_row_span",m);const _=p.getWidgetById(n.id)?.props||{};if(_.grid_cell_row_pos!=null&&_.grid_cell_column_pos!=null){const y=u(_.grid_cell_row_pos,_.grid_cell_column_pos,m,_.grid_cell_column_span||1);y&&p.updateWidget(n.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),e.addLabeledInput("Column Span","number",c.grid_cell_column_span||1,h=>{const m=Math.max(1,parseInt(h,10)||1);d("grid_cell_column_span",m);const _=p.getWidgetById(n.id)?.props||{};if(_.grid_cell_row_pos!=null&&_.grid_cell_column_pos!=null){const y=u(_.grid_cell_row_pos,_.grid_cell_column_pos,_.grid_cell_row_span||1,m);y&&p.updateWidget(n.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),l){const h=["START","END","CENTER","STRETCH"];e.addSelect("X Align",c.grid_cell_x_align||"STRETCH",h,m=>{d("grid_cell_x_align",m)}),e.addSelect("Y Align",c.grid_cell_y_align||"STRETCH",h,m=>{d("grid_cell_y_align",m)})}const g=document.createElement("button");g.className="btn btn-secondary btn-xs",g.style.marginTop="8px",g.style.width="100%",g.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',g.onclick=()=>{const h=p.currentPageIndex;o&&o.open(h)},e.getContainer().appendChild(g)}}function Wn(t,e){!e||!p||typeof pe=="function"&&pe().then(n=>{if(!n||n.length===0)return;const i=n.find(o=>o.entity_id===e);if(i&&i.name){const o=p.getSelectedWidget();o&&o.id===t&&!o.title&&p.updateWidget(t,{title:i.name})}}).catch(()=>{})}function zr(t,e,n){const i=Le(),o=e.props||{},r=(a,s)=>{const l={...e.props,[a]:s};p.updateWidget(e.id,{props:l})};n==="image"||n==="online_image"?(t.createSection("Image Source",!0),n==="image"?t.addLabeledInput("Asset Path","text",o.path||"",a=>r("path",a)):(t.addLabeledInput("Image URL","text",o.url||"",a=>r("url",a)),t.addLabeledInput("Refresh (s)","number",o.interval_s||300,a=>r("interval_s",parseInt(a,10)))),t.addCheckbox("Invert Colors",!!o.invert,a=>r("invert",a)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Background",o.bg_color||"transparent",i,a=>r("bg_color",a)),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n.startsWith("shape_")||n==="line"||n==="rounded_rect"?(t.createSection("Shape Style",!0),t.addColorSelector("Fill/Line Color",o.color||"black",i,a=>r("color",a)),n!=="line"?(t.addCheckbox("Fill",o.fill!==!1,a=>r("fill",a)),t.addColorSelector("Background",o.bg_color||"transparent",i,a=>r("bg_color",a)),t.addLabeledInput("Border Width","number",o.border_width||0,a=>r("border_width",parseInt(a,10)))):t.addLabeledInput("Thickness","number",o.thickness||2,a=>r("thickness",parseInt(a,10))),(n==="rounded_rect"||n==="shape_rect"||o.radius!==void 0)&&t.addLabeledInput("Corner Radius","number",o.radius||0,a=>r("radius",parseInt(a,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n==="odp_ellipse"||n==="odp_polygon"||n==="odp_rectangle_pattern"||n==="odp_arc"||n==="odp_icon_sequence"?(t.createSection("ODP Style",!0),n!=="odp_icon_sequence"?(t.addColorSelector("Outline",o.outline||"black",i,a=>r("outline",a)),t.addColorSelector("Fill",o.fill||"transparent",i,a=>r("fill",a)),t.addLabeledInput("Border Width","number",o.border_width||1,a=>r("border_width",parseInt(a,10)))):(t.addColorSelector("Color",o.fill||"black",i,a=>r("fill",a)),t.addLabeledInput("Icon Size","number",o.size||24,a=>r("size",parseInt(a,10))),t.addSelect("Direction",o.direction||"right",["right","down"],a=>r("direction",a)),t.addLabeledInput("Spacing","number",o.spacing||6,a=>r("spacing",parseInt(a,10))),t.addLabeledInput("Icons (comma sep)","text",Array.isArray(o.icons)?o.icons.join(", "):o.icons||"",a=>r("icons",a))),n==="odp_rectangle_pattern"&&(t.addLabeledInput("Repeat X","number",o.x_repeat||3,a=>r("x_repeat",parseInt(a,10))),t.addLabeledInput("Repeat Y","number",o.y_repeat||2,a=>r("y_repeat",parseInt(a,10))),t.addLabeledInput("Size X","number",o.x_size||30,a=>r("x_size",parseInt(a,10))),t.addLabeledInput("Size Y","number",o.y_size||15,a=>r("y_size",parseInt(a,10)))),n==="odp_arc"&&(t.addLabeledInput("Start Angle","number",o.start_angle||0,a=>r("start_angle",parseInt(a,10))),t.addLabeledInput("End Angle","number",o.end_angle||90,a=>r("end_angle",parseInt(a,10)))),t.endSection()):n==="odp_plot"?(t.createSection("Plot Config",!0),t.addLabeledInput("Duration (sec)","number",o.duration||36400,a=>r("duration",parseInt(a,10))),t.addColorSelector("Background",o.background||"white",i,a=>r("background",a)),t.addColorSelector("Outline",o.outline||"#ccc",i,a=>r("outline",a)),t.endSection()):n==="odp_multiline"?(t.createSection("Multiline Content",!0),t.addLabeledInput("Text","textarea",o.text||"Line 1|Line 2",a=>r("text",a)),t.addLabeledInput("Delimiter","text",o.delimiter||"|",a=>r("delimiter",a)),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Font Size","number",o.font_size||16,a=>r("font_size",parseInt(a,10))),t.addLabeledInput("Line Spacing","number",o.line_spacing||4,a=>r("line_spacing",parseInt(a,10))),t.addColorSelector("Color",o.color||"black",i,a=>r("color",a)),t.addSelect("Font",o.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],a=>r("font_family",a)),t.endSection()):((e.entity_id!==void 0||o.weather_entity!==void 0||n.includes("sensor")||n.includes("icon"))&&(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||o.weather_entity||"",s=>{o.weather_entity!==void 0?r("weather_entity",s):p.updateWidget(e.id,{entity_id:s})},e),e.title!==void 0&&t.addLabeledInput("Title/Label","text",e.title||"",s=>{p.updateWidget(e.id,{title:s})}),t.endSection()),t.createSection("Appearance",!0),t.addColorSelector("Color",o.color||"black",i,s=>r("color",s)),o.bg_color!==void 0&&t.addColorSelector("Background",o.bg_color||"transparent",i,s=>r("bg_color",s)),o.size!==void 0&&t.addLabeledInput("Size","number",o.size||24,s=>r("size",parseInt(s,10))),t.endSection())}const Yr={Roboto:[100,300,400,500,600,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function Pt(t){return Yr[t]||[100,200,300,400,500,600,700,800,900]}function Fn(t,e){const n=Math.trunc(e),i=Pt(t);return i.includes(n)?n:i.reduce((o,r)=>Math.abs(r-n)<Math.abs(o-n)?r:o)}const je=Object.freeze(["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."]);function zn(t,e,n,i={}){const o=i.defaultFont||"Roboto",r=i.alignDefault||"TOP_LEFT",a=e.font_family||o,s=!je.slice(0,-1).includes(a);t.addSelect("Font",s?"Custom...":a,je,u=>{u!=="Custom..."?(n("font_family",u),n("custom_font_family","")):n("font_family","Custom...")}),(s||e.font_family==="Custom...")&&t.addLabeledInput("Custom Font Name","text",e.custom_font_family||(s?a:""),u=>{n("font_family",u||o),n("custom_font_family",u)});const l=Pt(a);let c=e.font_weight||400;l.includes(c)||(c=Fn(a,c),setTimeout(()=>n("font_weight",c),0)),t.addSelect("Weight",c,l,u=>n("font_weight",parseInt(u,10))),t.addCheckbox("Italic",e.italic||!1,u=>n("italic",u));const d=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];t.addSelect("Align",e.text_align||r,d,u=>n("text_align",u))}const Xt=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],$r=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];function Ur(t,e,n,i={}){const o=i.defaultFont||"Roboto",r=i.customFontProp===void 0?"custom_font_family":i.customFontProp,a=e.font_family||o,s=!Xt.slice(0,-1).includes(a);if(t.addSelect("Font",s?"Custom...":a,Xt,l=>{l!=="Custom..."?(n("font_family",l),r&&n(r,"")):n("font_family","Custom...")}),s||e.font_family==="Custom..."){const l=r&&e[r]||(s?a:"");t.addLabeledInput("Custom Font Name","text",l,c=>{n("font_family",c||o),r&&n(r,c)}),i.customFontHint&&t.addHint(i.customFontHint)}return a}function jr(t,e,n,i){const o=Pt(e);let r=n.font_weight||400;o.includes(r)||(r=Fn(e,r),setTimeout(()=>i("font_weight",r),0)),t.addSelect("Weight",r,o,a=>i("font_weight",parseInt(a,10)))}function Vr(t,e,n,i="TOP_LEFT"){t.addSelect("Align",e.text_align||i,$r,o=>n("text_align",o))}function Kt(t,e,n,i){const o=document.createElement("div");o.className="field",o.style.marginTop="12px";const r=e.x===0&&e.y===0&&e.width===800&&e.height===480,a=document.createElement("button");a.className="btn "+(r?"btn-primary":"btn-secondary")+" btn-full",a.textContent=r?"âœ“ Full Screen (click to restore)":"â›¶ Fill Screen",a.type="button",a.addEventListener("click",()=>{r?n():i()}),o.appendChild(a),t.getContainer().appendChild(o)}function qr(t,e,n,i,o){return n==="image"?(t.createSection("Content",!0),t.addHint("ðŸ–¼ï¸ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),t.addLabeledInput("Image Path","text",i.path||"",r=>o("path",r)),t.endSection(),t.createSection("Appearance",!0),i.invert===void 0&&o("invert",$e()==="reterminal_e1001"),t.addCheckbox("Invert colors",i.invert||!1,r=>o("invert",r)),t.addSelect("Render Mode",i.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>o("render_mode",r)),Kt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="online_image"?(t.createSection("Content",!0),t.addHint("ðŸ’¡ Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>â„¹ï¸ Images are downloaded at specified intervals</span>"),t.addLabeledInput("Remote URL","text",i.url||"",r=>o("url",r)),t.addLabeledInput("Update interval (seconds)","number",i.interval_s||300,r=>o("interval_s",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!0),i.invert===void 0&&o("invert",$e()==="reterminal_e1001"),t.addCheckbox("Invert colors",i.invert||!1,r=>o("invert",r)),t.addSelect("Render Mode",i.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>o("render_mode",r)),Kt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="qr_code"?(t.createSection("Content",!0),t.addHint("ðŸ“± Generate QR codes that can be scanned by phones/tablets"),t.addLabeledInput("QR Content","text",i.value||"https://esphome.io",r=>o("value",r)),t.addHint("Enter a URL, text, or any string to encode"),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Scale","number",i.scale||2,r=>{let a=parseInt(r||"2",10);(Number.isNaN(a)||a<1)&&(a=1),a>10&&(a=10),o("scale",a)}),t.addHint("Size multiplier (1-10). Larger = bigger QR code"),t.addSelect("Error Correction",i.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],r=>o("ecc",r)),t.addHint("Higher = more redundancy, can recover from damage"),t.addSelect("Color",i.color||"black",["black","white"],r=>o("color",r)),t.endSection(),!0):n==="puppet"?(t.createSection("Content",!0),t.addLabeledInput("File path / URL","text",i.image_url||"",r=>o("image_url",r)),t.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),t.endSection(),t.createSection("Appearance",!0),t.addSelect("Image type",i.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],r=>o("image_type",r)),t.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),t.addSelect("Transparency",i.transparency||"opaque",["opaque","chroma_key","alpha_channel"],r=>o("transparency",r)),t.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),t.endSection(),!0):!1}const Xr=`# Dictionary to map calendar keys to their corresponding names
# One word calandars don't need to be added calendar.jobs would map to Jobs by default without adding it here
# calendar.hello_world should be added on the other hand
CALENDAR_NAMES = {"calendar.x": "X", "calendar.Y": "Y"}
# Day names (which are displayed in the calendar event list) can be translated here if required
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
# Default number of entries to send to the ESPHome device
MAX_ENTRIES = 8
# Optional default separator used when generated YAML passes a configurable prefix length
DEFAULT_PREFIX_SEPARATOR = ": "

def build_calendar_prefix(calendar_name, prefix_length, prefix_separator):
    if not calendar_name or prefix_length <= 0:
        return ""

    normalized = "".join(ch for ch in calendar_name if ch.isalnum())
    if not normalized:
        normalized = calendar_name.replace(" ", "")

    if not normalized:
        return ""

    prefix = normalized[:prefix_length].upper()
    return f"{prefix}{prefix_separator}"

def convert_calendar_format(data, today, prefix_length=None, prefix_separator=DEFAULT_PREFIX_SEPARATOR):
    # Initialize a dictionary to store events grouped by date
    events_by_date = {}
    entrie_count = 0
    multiple_calendars = len(data) > 1
    
    # Variable to store the end time of the closest event that will end
    closest_end_time = None
    
    # Iterate through calendar keys and events
    for calendar_key, events_list in data.items():
        for original_event in events_list['events']:
            event = original_event.copy()
            if 'description' in event:
                event.pop('description')
                
            # Attempt to split the 'event[start]' into date and time parts
            parts = event['start'].split("T")
            event_date = parts[0]
            
            # Compare the event_date with today's date
            if event_date < today:
                # If the event's date is before today, update it to today's date (in case of multi day event starting before today)
                event['start'] = today
                event_date = today
            
            # Add calendar name to event
            # If calendar key exists in CALENDAR_NAMES, use its value, otherwise capitalize the second part of the key
            event['calendar_name'] = CALENDAR_NAMES.get(calendar_key, calendar_key.split(".")[1].capitalize())

            if multiple_calendars and event['calendar_name']:
                if prefix_length is None:
                    first_letter = event['calendar_name'][0].upper()
                    prefix = f"[{first_letter}] "
                else:
                    prefix = build_calendar_prefix(event['calendar_name'], prefix_length, prefix_separator)
                if prefix:
                    event['summary'] = prefix + event.get('summary', '')
            
            if 'location' in event:
                event.pop('location')
                    
            # Add event to events_by_date dictionary
            if event_date in events_by_date:
                events_by_date[event_date].append(event)
            else:
                events_by_date[event_date] = [event]
                
    # Sort events by date
    sorted_dates = sorted(events_by_date.keys())
    
    # Initialize a list to store the final date objects
    result = []
    
    # Iterate through sorted dates
    for date in sorted_dates:
        all_day_events = []
        other_events = []
        for event in events_by_date[date]:
            if entrie_count == MAX_ENTRIES:
                break
            
            # Check if the event lasts for the whole day
            start_date = event['start']
            end_date = event['end']
            if 'T' not in event['start']:
                all_day_events.append(event)
            else:
                other_events.append(event)
                
            entrie_count = entrie_count + 1
        
        if other_events and date == today:
            closest_end_time = sorted(other_events, key=lambda item:dt_util.parse_datetime(item['end']), reverse=False)[0]["end"]
        
        if all_day_events or other_events:
            # Sort other_events by start time
            other_events.sort(key=lambda item:dt_util.parse_datetime(item['start']), reverse=False)
            
            # Construct dictionary for the date
            # is_today cast to int because a bool somehow crashes my esphome config
            day_item = {
                'date': date,
                'day': dt_util.parse_datetime(date).day,
                'is_today': int(date == dt_util.now().isoformat().split("T")[0]),
                'day_name': DAY_NAMES[dt_util.parse_datetime(date).weekday()],
                'all_day': all_day_events,
                'other': other_events
            }
            result.append(day_item)
        
    return (result, closest_end_time)

# Access the data received from the Home Assistant service call
input_data = data["calendar"]
today = data["now"]
MAX_ENTRIES = int(data.get("nr_entries", MAX_ENTRIES))
raw_prefix_length = data.get("prefix_length", None)
PREFIX_LENGTH = None if raw_prefix_length in (None, "") else max(0, int(raw_prefix_length))
PREFIX_SEPARATOR = str(data.get("prefix_separator", DEFAULT_PREFIX_SEPARATOR))

# Convert the received data into the format expected by the epaper display
converted_data = convert_calendar_format(input_data, today, prefix_length=PREFIX_LENGTH, prefix_separator=PREFIX_SEPARATOR)

# Pass the output back to Home Assistant
output["entries"] = {"days": converted_data[0]}
output["closest_end_time"] = converted_data[1]
`;function Kr(t,e,n,i,o,r){if(n==="quote_rss"){t.createSection("Feed Settings",!0),t.addHint("ðŸ“° Display quotes from an RSS feed (Quote of the Day)"),t.addLabeledInput("Feed URL","text",i.feed_url||"https://www.brainyquote.com/link/quotebr.rss",l=>r("feed_url",l)),t.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),t.addCheckbox("Show Author",i.show_author!==!1,l=>r("show_author",l)),t.addCheckbox("Random Quote",i.random!==!1,l=>r("random",l)),t.addHint("Pick a random quote from the feed, or use the first one");const a=["15min","30min","1h","2h","4h","8h","12h","24h"];t.addSelect("Refresh Interval",i.refresh_interval||"24h",a,l=>r("refresh_interval",l)),t.addLabeledInput("Home Assistant URL","text",i.ha_url||"http://homeassistant.local:8123",l=>r("ha_url",l)),t.addHint("Address of your Home Assistant instance (for Proxy)"),t.endSection(),t.createSection("Typography",!1),t.addLabeledInput("Quote Text Size (Line 1)","number",i.quote_font_size||18,l=>r("quote_font_size",parseInt(l,10))),t.addLabeledInput("Author Size (Line 2)","number",i.author_font_size||14,l=>r("author_font_size",parseInt(l,10)));const s=Ur(t,i,r,{customFontHint:'Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'});return jr(t,s,i,r),Vr(t,i,r,"TOP_LEFT"),t.addColorSelector("Color",i.color||"black",o,l=>r("color",l)),t.endSection(),t.createSection("Display Options",!1),t.addCheckbox("Word Wrap",i.word_wrap!==!1,l=>r("word_wrap",l)),t.addCheckbox("Auto Scale Text",i.auto_scale||!1,l=>r("auto_scale",l)),t.addHint("Automatically reduce font size if text is too long"),t.addCheckbox("Italic Quote",i.italic_quote!==!1,l=>r("italic_quote",l)),t.endSection(),!0}if(n==="calendar"){t.createSection("Appearance",!0),t.addColorSelector("Text Color",i.text_color||"black",o,l=>r("text_color",l)),t.addColorSelector("Background",i.background_color||"white",o,l=>r("background_color",l)),t.endSection(),t.createSection("Border Style",!1),t.addLabeledInput("Border Width","number",i.border_width||0,l=>r("border_width",parseInt(l,10))),t.addColorSelector("Border Color",i.border_color||"theme_auto",o,l=>r("border_color",l)),t.addLabeledInput("Corner Radius","number",i.border_radius||0,l=>r("border_radius",parseInt(l,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection(),t.createSection("Font Sizes",!1),t.addLabeledInput("Big Date Size","number",i.font_size_date||100,l=>r("font_size_date",parseInt(l,10))),t.addLabeledInput("Day Name Size","number",i.font_size_day||24,l=>r("font_size_day",parseInt(l,10))),t.addLabeledInput("Grid Text Size","number",i.font_size_grid||14,l=>r("font_size_grid",parseInt(l,10))),t.addLabeledInput("Event Text Size","number",i.font_size_event||18,l=>r("font_size_event",parseInt(l,10))),t.endSection(),t.createSection("Visibility",!0),t.addCheckbox("Show Header",i.show_header!==!1,l=>r("show_header",l)),t.addCheckbox("Show Grid",i.show_grid!==!1,l=>r("show_grid",l)),t.addCheckbox("Show Events",i.show_events!==!1,l=>r("show_events",l)),t.endSection(),t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"sensor.esp_calendar_data",l=>{p.updateWidget(e.id,{entity_id:l})},e),t.addLabeledInput("Max Events","number",i.max_events||8,l=>r("max_events",parseInt(l,10))),t.addHint("Must be a sensor with attribute 'entries'");const a=document.createElement("button");a.className="btn btn-secondary btn-full btn-xs",a.textContent="Download Helper Script",a.style.marginTop="10px",a.addEventListener("click",()=>{const l=document.createElement("a");l.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(Xr)),l.setAttribute("download","esp_calendar_data_conversion.py"),l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)}),t.getContainer().appendChild(a),t.addHint("Place in /config/python_scripts/");const s=document.createElement("div");return s.style.marginTop="5px",s.style.fontSize="10px",s.style.color="#888",s.style.textAlign="center",s.innerText="Check widget instructions for HA setup.",t.getContainer().appendChild(s),t.endSection(),!0}return!1}function Jr(t,e,n,i,o,r){return n==="weather"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Weather Entity","text",i.weather_entity||"weather.forecast",a=>r("weather_entity",a),e),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Icon Size","number",i.icon_size||48,a=>r("icon_size",parseInt(a,10))),t.addColorSelector("Icon Color",i.icon_color||"black",o,a=>r("icon_color",a)),t.addCheckbox("Show Temperature",i.show_temp!==!1,a=>r("show_temp",a)),t.addCheckbox("Show Condition",i.show_cond!==!1,a=>r("show_cond",a)),t.endSection(),!0):n==="chart"||n==="state_history"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",a=>p.updateWidget(e.id,{entity_id:a}),e),t.addLabeledInput("Time Period (hours)","number",i.hours||24,a=>r("hours",parseInt(a,10))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Line Color",i.color||"blue",o,a=>r("color",a)),t.addColorSelector("Fill Color",i.fill_color||"transparent",o,a=>r("fill_color",a)),t.addLabeledInput("Line Width","number",i.line_width||2,a=>r("line_width",parseInt(a,10))),t.addCheckbox("Show Axes",i.show_axes!==!1,a=>r("show_axes",a)),t.endSection(),!0):n==="gauge"||n==="progress"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",a=>p.updateWidget(e.id,{entity_id:a}),e),t.addLabeledInput("Min Value","number",i.min||0,a=>r("min",parseFloat(a))),t.addLabeledInput("Max Value","number",i.max||100,a=>r("max",parseFloat(a))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Bar Color",i.color||"blue",o,a=>r("color",a)),t.addColorSelector("Background Color",i.bg_color||"#eee",o,a=>r("bg_color",a)),n==="gauge"&&t.addLabeledInput("Thickness","number",i.thickness||10,a=>r("thickness",parseInt(a,10))),t.endSection(),!0):n==="switch"||n==="button"?(t.createSection("Action",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",a=>p.updateWidget(e.id,{entity_id:a}),e),t.addLabeledInput("Label","text",i.text||(n==="button"?"Button":"Switch"),a=>r("text",a)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Color",i.color||"blue",o,a=>r("color",a)),t.addColorSelector("Text Color",i.text_color||"white",o,a=>r("text_color",a)),t.endSection(),!0):n==="group"||n==="rectangle"||n==="circle"||n==="line"?(t.createSection("Appearance",!0),t.addColorSelector("Color",i.color||(n==="group"?"transparent":"black"),o,a=>r("color",a)),n!=="group"&&(t.addLabeledInput("Border Width","number",i.border_width||1,a=>r("border_width",parseInt(a,10))),t.addColorSelector("Border Color",i.border_color||"black",o,a=>r("border_color",a))),n==="rectangle"&&t.addLabeledInput("Corner Radius","number",i.border_radius||0,a=>r("border_radius",parseInt(a,10))),t.endSection(),!0):!1}const Zr="CENTER";function Qr(t){const e=t||"Roboto";return e==="Custom..."||!je.slice(0,-1).includes(e)}function ea(t,e,n){t.addLabeledInput("Text","text",e.text||"Label",i=>n("text",i)),t.addLabeledInput("Font Size","number",e.font_size||20,i=>n("font_size",parseInt(i,10))),t.addColorMixer("Text Color",e.color||"black",i=>n("color",i)),t.addColorMixer("Background Color",e.bg_color||"transparent",i=>n("bg_color",i)),zn(t,e,n,{alignDefault:Zr}),Qr(e.font_family)&&t.addHint("Browse fonts.google.com")}function ta(t,e,n,i){const o=p.getCanvasDimensions(),r=o.width,a=o.height;t.addSelect("Orientation",n.orientation||"horizontal",["horizontal","vertical"],d=>{const u=e.width,g=e.height;p.updateWidget(e.id,{props:{...n,orientation:d},width:g,height:u})}),t.addLabeledInput("Line Width","number",n.line_width||3,d=>i("line_width",parseInt(d,10))),t.addColorMixer("Line Color",n.line_color||n.color||"black",d=>i("line_color",d)),t.addCheckbox("Rounded Ends",n.line_rounded!==!1,d=>i("line_rounded",d)),t.addLabeledInput("Opacity (0-255)","number",n.opa||255,d=>i("opa",parseInt(d,10))),t.createSection("Quick Size",!1);const s=document.createElement("div");s.style.display="flex",s.style.gap="8px",s.style.marginBottom="8px";const l=document.createElement("button");l.className="btn btn-secondary",l.style.flex="1",l.textContent="Fill Horizontal",l.addEventListener("click",()=>{p.updateWidget(e.id,{x:0,y:e.y,width:r,height:n.line_width||3,props:{...n,orientation:"horizontal"}})});const c=document.createElement("button");c.className="btn btn-secondary",c.style.flex="1",c.textContent="Fill Vertical",c.addEventListener("click",()=>{p.updateWidget(e.id,{x:e.x,y:0,width:n.line_width||3,height:a,props:{...n,orientation:"vertical"}})}),s.appendChild(l),s.appendChild(c),t.getContainer().appendChild(s),t.endSection()}function na(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.createSection("Size",!1);const o=Math.max(e.width,e.height);t.addLabeledInput("Size (px)","number",o,r=>{const a=parseInt(r,10)||100;p.updateWidget(e.id,{width:a,height:a})}),t.addHint("Meter widgets must be square. Width and height are locked together."),t.endSection(),t.createSection("Scale",!1),t.addLabeledInput("Min Value","number",n.min||0,r=>i("min",parseInt(r,10))),t.addLabeledInput("Max Value","number",n.max||100,r=>i("max",parseInt(r,10))),t.endSection(),t.createSection("Preview",!1),t.addLabeledInput("Value (Preview)","number",n.value!==void 0?n.value:60,r=>i("value",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!1),t.addColorMixer("Scale Color",n.color||"black",r=>i("color",r)),t.addColorMixer("Needle Color",n.indicator_color||"red",r=>i("indicator_color",r)),t.addLabeledInput("Scale Width","number",n.scale_width||10,r=>i("scale_width",parseInt(r,10))),t.addLabeledInput("Needle Width","number",n.indicator_width||4,r=>i("indicator_width",parseInt(r,10))),t.addLabeledInput("Ticks","number",n.tick_count||11,r=>i("tick_count",parseInt(r,10))),t.addLabeledInput("Tick Length","number",n.tick_length||10,r=>i("tick_length",parseInt(r,10))),t.addLabeledInput("Label Gap","number",n.label_gap||10,r=>i("label_gap",parseInt(r,10))),t.endSection()}function ia(t,e,n,i){t.addLabeledInputWithPicker("Action Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addHint("Entity to toggle or trigger when clicked"),t.addLabeledInput("Text","text",n.text||"BTN",o=>i("text",o)),t.addColorMixer("Background Color",n.bg_color||"white",o=>i("bg_color",o)),t.addColorMixer("Text Color",n.color||"black",o=>i("color",o)),t.addLabeledInput("Border Width","number",n.border_width||2,o=>i("border_width",parseInt(o,10))),t.addLabeledInput("Corner Radius","number",n.radius||5,o=>i("radius",parseInt(o,10))),t.addCheckbox("Checkable (Toggle)",n.checkable||!1,o=>i("checkable",o))}function oa(t,e,n,i){t.addLabeledInputWithPicker("Sensor Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addHint("Sensor to bind to arc value"),t.addLabeledInput("Title / Label","text",n.title||"",o=>i("title",o)),t.addLabeledInput("Min Value","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max Value","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Default/Preview Value","number",n.value||0,o=>i("value",parseInt(o,10))),t.addLabeledInput("Thickness","number",n.thickness||10,o=>i("thickness",parseInt(o,10))),t.addLabeledInput("Start Angle","number",n.start_angle||135,o=>i("start_angle",parseInt(o,10))),t.addLabeledInput("End Angle","number",n.end_angle||45,o=>i("end_angle",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o)),t.addColorMixer("Color",n.color||"blue",o=>i("color",o))}function ra(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Title","text",n.title||"",o=>i("title",o)),t.addSelect("Type",n.type||"LINE",["LINE","SCATTER","BAR"],o=>i("type",o)),t.addLabeledInput("Min Value","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max Value","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Point Count","number",n.point_count||10,o=>i("point_count",parseInt(o,10))),t.addLabeledInput("X Div Lines","number",n.x_div_lines||3,o=>i("x_div_lines",parseInt(o,10))),t.addLabeledInput("Y Div Lines","number",n.y_div_lines||3,o=>i("y_div_lines",parseInt(o,10))),t.addColorMixer("Color",n.color||"black",o=>i("color",o))}function aa(t,e,n){t.addLabeledInput("Source (Image/Symbol)","text",e.src||"",i=>n("src",i)),t.addHint("e.g. symbol_ok, symbol_home, or /image.png"),t.addLabeledInput("Rotation (0.1 deg)","number",e.rotation||0,i=>n("rotation",parseInt(i,10))),t.addLabeledInput("Scale (256 = 1x)","number",e.scale||256,i=>n("scale",parseInt(i,10))),t.addColorMixer("Color (Tint)",e.color||"black",i=>n("color",i))}function sa(t,e,n){t.addLabeledInput("Content / URL","text",e.text||"",i=>n("text",i)),t.addLabeledInput("Size (px)","number",e.size||100,i=>n("size",parseInt(i,10))),t.addColorMixer("Color",e.color||"black",i=>n("color",i)),t.addColorMixer("Background Color",e.bg_color||"white",i=>n("bg_color",i))}function la(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Min","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Value","number",n.value||50,o=>i("value",parseInt(o,10))),t.addColorMixer("Bar Color",n.color||"black",o=>i("color",o)),t.addColorMixer("Background Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addLabeledInput("Start Value","number",n.start_value||0,o=>i("start_value",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o)),t.addCheckbox("Range Mode",n.range_mode||!1,o=>i("range_mode",o))}function da(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],n.vertical?"Vertical":"Horizontal",o=>{const r=o==="Vertical",a=e.width,s=e.height;p.updateWidget(e.id,{props:{...n,vertical:r},width:s,height:a})}),t.addCompactPropertyRow(()=>{t.addLabeledInput("Min","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max","number",n.max||100,o=>i("max",parseInt(o,10)))}),t.addNumberWithSlider("Value",n.value||30,n.min||0,n.max||100,o=>i("value",o)),t.addColorMixer("Knob/Bar Color",n.color||"black",o=>i("color",o)),t.addColorMixer("Track Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addLabeledInput("Border Width","number",n.border_width||2,o=>i("border_width",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o))}function ca(t,e,n){t.addLabeledInput("Tabs (comma separated)","text",(e.tabs||[]).join(", "),i=>{const o=i.split(",").map(r=>r.trim()).filter(r=>r);n("tabs",o)}),t.addColorMixer("Background Color",e.bg_color||"white",i=>n("bg_color",i))}function pa(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Label","text",n.text||"Checkbox",o=>i("text",o)),t.addCheckbox("Checked",n.checked||!1,o=>i("checked",o)),t.addColorMixer("Color",n.color||"blue",o=>i("color",o))}function ua(t,e,n){t.addLabeledInput("Options (one per line)","textarea",e.options||"",i=>n("options",i)),t.addCompactPropertyRow(()=>{t.addLabeledInput("Index","number",e.selected_index||0,i=>n("selected_index",parseInt(i,10))),t.addLabeledInput("Max H","number",e.max_height||200,i=>n("max_height",parseInt(i,10)))}),t.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],e.direction||"DOWN",i=>n("direction",i)),t.addColorMixer("Color",e.color||"white",i=>n("color",i))}function ha(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addCheckbox("Checked",n.checked||!1,o=>i("checked",o)),t.addColorMixer("Indicator Color",n.color||"blue",o=>i("color",o)),t.addColorMixer("Background Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addColorMixer("Knob Color",n.knob_color||"white",o=>i("knob_color",o))}function ga(t,e,n){t.addLabeledInput("Placeholder","text",e.placeholder||"",i=>n("placeholder",i)),t.addLabeledInput("Text","text",e.text||"",i=>n("text",i)),t.addCheckbox("One Line",e.one_line||!1,i=>n("one_line",i)),t.addCheckbox("Password Mode",e.password_mode||!1,i=>n("password_mode",i)),t.addLabeledInput("Accepted Chars","text",e.accepted_chars||"",i=>n("accepted_chars",i)),t.addLabeledInput("Max Length","number",e.max_length||0,i=>n("max_length",parseInt(i,10)))}function ma(t,e,n,i,o){return n==="lvgl_label"||n.startsWith("lvgl_")?(t.addCommonLVGLProperties(e,i),t.createSection("Widget Settings",!0),n==="lvgl_label"?ea(t,i,o):n==="lvgl_line"?ta(t,e,i,o):n==="lvgl_meter"?na(t,e,i,o):n==="lvgl_button"?ia(t,e,i,o):n==="lvgl_arc"?oa(t,e,i,o):n==="lvgl_chart"?ra(t,e,i,o):n==="lvgl_img"?aa(t,i,o):n==="lvgl_qrcode"?sa(t,i,o):n==="lvgl_bar"?la(t,e,i,o):n==="lvgl_slider"?da(t,e,i,o):n==="lvgl_tabview"?ca(t,i,o):n==="lvgl_checkbox"?pa(t,e,i,o):n==="lvgl_dropdown"?ua(t,i,o):n==="lvgl_switch"?ha(t,e,i,o):n==="lvgl_textarea"&&ga(t,i,o),t.endSection(),!0):!1}const fa="Browse fonts.google.com";function ya(t){const e=t||"Roboto";return e==="Custom..."||!je.slice(0,-1).includes(e)}function _a(t,e,n,i,o){t.createSection("Content",!0),n==="sensor_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{p.updateWidget(e.id,{entity_id:r}),Wn(e.id,r)},e),t.addLabeledInput("Attribute (optional)","text",i.attribute||"",r=>o("attribute",r)),t.addLabeledInput("Prefix","text",i.prefix||"",r=>o("prefix",r)),t.addLabeledInput("Suffix","text",i.suffix||"",r=>o("suffix",r)),t.addLabeledInput("Decimals","number",i.decimals??1,r=>o("decimals",parseInt(r,10)))):n==="entity_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.addLabeledInput("Attribute","text",i.attribute||"",r=>o("attribute",r))):n==="datetime"?(t.addLabeledInput("Format","text",i.format||"%H:%M",r=>o("format",r)),t.addHint("e.g. %H:%M or %A, %B %d")):t.addLabeledInput("Text","text",i.text||"Text",r=>o("text",r)),t.endSection()}function va(t,e,n,i,o){t.createSection("Typography",!0),t.addLabeledInput("Font Size","number",e.font_size||20,r=>n("font_size",parseInt(r,10))),zn(t,e,n,{alignDefault:i==="datetime"?"CENTER":"TOP_LEFT"}),ya(e.font_family)&&t.addHint(fa),t.addColorSelector("Color",e.color||"black",o,r=>n("color",r)),t.endSection(),t.createSection("Appearance",!1),t.addColorSelector("Background",e.bg_color||"transparent",o,r=>n("bg_color",r)),t.addLabeledInput("Opacity (0.0 - 1.0)","number",e.opacity??1,r=>n("opacity",parseFloat(r))),t.addCheckbox("Word Wrap",e.word_wrap!==!1,r=>n("word_wrap",r)),i==="sensor_text"&&t.addCheckbox("Show Unit",e.show_unit!==!1,r=>n("show_unit",r)),t.endSection()}function ba(t,e,n){const i=Le(),o=e.props||{},r=(a,s)=>{const l={...e.props,[a]:s};p.updateWidget(e.id,{props:l})};if(n==="text"||n==="label"||n==="datetime"||n==="sensor_text"||n==="entity_text")_a(t,e,n,o,r),va(t,o,r,n,i);else{if(Jr(t,e,n,o,i,r))return;if(qr(t,e,n,o,r))return;if(Kr(t,e,n,o,i,r))return;if(ma(t,e,n,o,r))return}}class Jt{static autoPopulateTitleFromEntity(e,n){Wn(e,n)}static renderProtocolProperties(e,n,i){zr(e,n,i)}static renderLegacyProperties(e,n,i){ba(e,n,i)}}class Ms{constructor(e=null){this.app=e,this.panel=document.getElementById("propertiesPanel"),this.controls=new Br(this),this.lastRenderedWidgetId=null,this.lastRenderedSelectionKey="",this.activeWidget=null,this.containerStack=[],this.sectionStates={}}init(){B(P.SELECTION_CHANGED,()=>this.render()),B(P.STATE_CHANGED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=p.snapEnabled,e.addEventListener("change",i=>{p.setSnapEnabled(i.target.checked)}),B(P.SETTINGS_CHANGED,i=>{i.snapEnabled!==void 0&&(e.checked=i.snapEnabled)}));const n=document.getElementById("lockPositionToggle");n&&n.addEventListener("change",i=>{const o=p.selectedWidgetIds;o.length>0&&p.updateWidgets(o,{locked:i.target.checked})}),this.render()}render(){if(!this.panel||gt&&gt.lassoState)return;const e=p.selectedWidgetIds||(p.selectedWidgetId?[p.selectedWidgetId]:[]),n=e.join("|"),i=p.selectedWidgetId,o=this.lastRenderedWidgetId!==i,r=this.lastRenderedSelectionKey!==n;if(e.length>1&&v.log(`[PropertiesPanel] Multi-select detected: ${e.length} widgets. Selection key: ${n}`),!o&&!r&&this.panel&&this.panel.isConnected){const f=document.activeElement;if(f&&this.panel.contains(f)){const _=f.tagName.toLowerCase(),y=f.type?f.type.toLowerCase():"";if(!(_==="input"&&["checkbox","radio","button"].includes(y)||_==="select")&&(_==="input"||_==="textarea"||f.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=i,this.lastRenderedSelectionKey=n,this.containerStack=[],this.panel.innerHTML="";const a=document.getElementById("lockPositionToggle");if(a){const f=p.getSelectedWidgets(),_=f.length>0&&f.every(S=>S.locked),y=f.some(S=>S.locked),b=a;b.checked=_,b.indeterminate=y&&!_,b.disabled=f.length===0}if(e.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(e.length>1){Wr.render(this,e);return}const s=p.getSelectedWidget();if(!s)return;const l=s.type,c=q.get(l);let d=l;l==="nav_next_page"?d="next page":l==="nav_previous_page"?d="previous page":l==="nav_reload_page"?d="reload page":d=l.replace(/_/g," ");const u=document.createElement("div");if(u.className="sidebar-section-label",u.style.marginTop="0",u.style.textTransform="capitalize",u.textContent=`${d} Properties`,this.panel.appendChild(u),(p.getCurrentPage()?.layout||"absolute")==="absolute"){this.createSection("Transform",!1);const f=S=>{p.updateWidget(s.id,{x:parseInt(S,10)||0})},_=S=>{p.updateWidget(s.id,{y:parseInt(S,10)||0})},y=S=>{p.updateWidget(s.id,{width:parseInt(S,10)||10})},b=S=>{p.updateWidget(s.id,{height:parseInt(S,10)||10})};this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",s.x,f),this.addLabeledInput("Pos Y","number",s.y,_)}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",s.width,y),this.addLabeledInput("Height","number",s.height,b)}),this.endSection()}Fr.render(this,s,l,this.app?.pageSettings);const m=p.settings?.renderingMode||"direct";c&&c.schema?(l.startsWith("lvgl_")&&this.addCommonLVGLProperties(s,s.props||{}),Nr.render(this,s,c.schema)):c&&c.renderProperties?c.renderProperties(this,s):m==="oepl"||m==="opendisplay"?Jt.renderProtocolProperties(this,s,l):Jt.renderLegacyProperties(this,s,l),m==="lvgl"&&this.addLVGLStateTriggerControls(s),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(s),this.endSection()}createSection(e,n=!0){const i=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!n,o=document.createElement("div");o.className="properties-section"+(i?" collapsed":"");const r=document.createElement("div");r.className="properties-section-header",r.innerHTML=`<span>${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,r.onclick=l=>{l.stopPropagation();const c=o.classList.toggle("collapsed");this.sectionStates[e]=!c};const a=document.createElement("div");a.className="properties-section-content",o.appendChild(r),o.appendChild(a),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!i);const s=this.getContainer();return s&&(s.appendChild(o),this.containerStack.push(a)),a}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}autoPopulateTitleFromEntity(e,n){if(!n||!p||!p.entityStates)return;const i=p.entityStates[n];i&&i.attributes&&i.attributes.friendly_name&&p.updateWidget(e,{title:i.attributes.friendly_name})}addLabeledInput(...e){return this.controls.addLabeledInput.apply(this.controls,e)}addSelect(...e){return this.controls.addSelect.apply(this.controls,e)}addCheckbox(...e){return this.controls.addCheckbox.apply(this.controls,e)}addHint(...e){return this.controls.addHint.apply(this.controls,e)}addLabeledInputWithPicker(...e){return this.controls.addLabeledInputWithPicker.apply(this.controls,e)}addColorSelector(...e){return this.controls.addColorSelector.apply(this.controls,e)}addColorMixer(...e){return this.controls.addColorMixer.apply(this.controls,e)}addSegmentedControl(...e){return this.controls.addSegmentedControl.apply(this.controls,e)}addIconPicker(...e){return this.controls.addIconPicker?this.controls.addIconPicker.apply(this.controls,e):null}addNumberWithSlider(...e){return this.controls.addNumberWithSlider.apply(this.controls,e)}addCompactPropertyRow(...e){return this.controls.addCompactPropertyRow.apply(this.controls,e)}addCommonLVGLProperties(...e){return this.controls.addCommonLVGLProperties.apply(this.controls,e)}addLVGLStateTriggerControls(...e){return this.controls.addLVGLStateTriggerControls.apply(this.controls,e)}addVisibilityConditions(...e){return this.controls.addVisibilityConditions.apply(this.controls,e)}addPageSelector(...e){return this.controls.addPageSelector.apply(this.controls,e)}addIconInput(...e){return this.controls.addIconInput?this.controls.addIconInput.apply(this.controls,e):null}addLabeledInputWithIconPicker(...e){return this.controls.addLabeledInputWithIconPicker?this.controls.addLabeledInputWithIconPicker.apply(this.controls,e):null}addDropShadowButton(e,n){const i=document.createElement("div");i.className="field",i.style.marginTop="8px";const o=document.createElement("button");o.className="btn btn-secondary btn-full btn-xs",o.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',o.onclick=()=>{const r=p.selectedWidgetIds||[];r.includes(n)?p.createDropShadow(r):p.createDropShadow(n)},i.appendChild(o),e.appendChild(i)}addLabeledInputWithDataList(...e){return this.controls.addLabeledInputWithDataList(...e)}addSectionLabel(...e){return this.controls.addSectionLabel(...e)}}class Zt{static validateWidget(e){const n=[];if(!e||typeof e!="object")return{valid:!1,errors:["Widget must be an object"],sanitized:null};if(!e.type)return{valid:!1,errors:['Widget missing "type" field'],sanitized:null};const i=q.get(e.type);if(!i)return{valid:!1,errors:[`Unknown widget type: "${e.type}"`],sanitized:null};const o={...e},r=new Set(["id","type","x","y","width","height","z_index",...Object.keys(i.defaults||{})]);for(const s of Object.keys(e))r.has(s)||(n.push(`Hallucinated property "${s}" in widget type "${e.type}"`),delete o[s]);const a=["id","x","y","width","height"];for(const s of a)(e[s]===void 0||e[s]===null)&&n.push(`Missing required property "${s}" in widget "${e.id||"unknown"}"`);return{valid:n.length===0,errors:n,sanitized:o}}static validateResponse(e){const n=[],i=[];let o=[];if(Array.isArray(e))o=e;else if(e&&typeof e=="object"&&Array.isArray(e.widgets))o=e.widgets;else return{valid:!1,errors:['AI response must be an array of widgets or an object with a "widgets" array'],sanitized:[]};for(const r of o){const a=this.validateWidget(r);a.valid||n.push(...a.errors),a.sanitized&&i.push(a.sanitized)}return{valid:n.length===0,errors:n,sanitized:i}}static sandbox(e,n){const i=JSON.parse(JSON.stringify(e)),o=new Set(i.map(c=>c.id)),r=new Set(n.map(c=>c.id)),a=n.filter(c=>!o.has(c.id)),s=i.filter(c=>!r.has(c.id)).map(c=>c.id),l=n.filter(c=>{if(!o.has(c.id))return!1;const d=i.find(u=>u.id===c.id);return JSON.stringify(d)!==JSON.stringify(c)});return{cloned:i,added:a,modified:l,removed:s}}}class Ve{constructor(){this.cache={models:{}}}static get STATIC_MODELS(){return{minimax:[{id:"MiniMax-M2.7-highspeed",name:"MiniMax M2.7 Highspeed (204K, fast)"},{id:"MiniMax-M2.7",name:"MiniMax M2.7 (204K, full quality)"}],glm:[{id:"glm-4.6",name:"GLM-4.6 (128K)"},{id:"glm-5.1",name:"GLM-5.1 (coding optimized)"},{id:"glm-5-turbo",name:"GLM-5 Turbo (fast)"}]}}getSettings(){return p.settings}async fetchModels(e,n){if(e==="minimax"||e==="glm")return Ve.STATIC_MODELS[e]||[];if(!n)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.map(r=>({id:r.id,name:r.name,context:r.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.filter(r=>r.id.startsWith("gpt-")).map(r=>({id:r.id,name:r.id}));if(e==="gemini"){try{const o=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`)).json();if(o.models&&Array.isArray(o.models))return o.models.filter(r=>r.supportedGenerationMethods.includes("generateContent")).map(r=>({id:r.name.replace("models/",""),name:r.displayName||r.name.replace("models/",""),description:r.description}))}catch(i){throw v.warn("Dynamic Gemini model fetch failed:",i),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(i){throw v.error(`Error fetching models for ${e}:`,i),i}return[]}async processPrompt(e,n){const i=this.getSettings(),o=i.ai_provider||"gemini",r=i[`ai_api_key_${o}`];let a=i[`ai_model_${o}`];if(!a&&(o==="minimax"||o==="glm")){const d=Ve.STATIC_MODELS[o]||[];d.length>0&&(a=d[0].id,p.updateSettings({[`ai_model_${o}`]:a}))}if(!a&&o==="gemini"){v.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(o,r);if(d.length>0)a=(d.find(g=>g.id.includes("flash"))||d.find(g=>g.id.includes("1.5-pro"))||d.find(g=>g.id.includes("gemini-pro"))||d[0]).id,v.log(`Auto-detected model: ${a}`),p.updateSettings({[`ai_model_${o}`]:a});else throw new Error("No models found for this API Key.")}catch(d){v.error("Auto-detection failed:",d),a="gemini-2.0-flash"}}if(!r)throw new Error(`Missing API Key for ${o}. Configure it in Editor Settings → AI.`);if(!a)throw new Error(`No model selected for ${o}. Please pick one in Editor Settings → AI.`);const s=this.getSystemPrompt(),l={...n,widgets:n.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";o==="gemini"?d=await this.callGemini(r,a,s,c):o==="openai"?d=await this.callOpenAI(r,a,s,c):o==="openrouter"?d=await this.callOpenRouter(r,a,s,c):o==="minimax"?d=await this.callMiniMax(r,a,s,c):o==="glm"&&(d=await this.callGLM(r,a,s,c));let u=d.trim();if(u.includes("```")){const _=u.match(/```(?:json)?\s*([\s\S]*?)\s*```/);_&&_[1]&&(u=_[1].trim())}const g=u.indexOf("["),h=u.indexOf("{");let m=-1,f=-1;g!==-1&&(h===-1||g<h)?(m=g,f=u.lastIndexOf("]")):h!==-1&&(m=h,f=u.lastIndexOf("}")),m!==-1&&f!==-1&&f>m&&(u=u.substring(m,f+1));try{const _=JSON.parse(u),y=Zt.validateResponse(_);if(!y.valid&&(v.warn("[AI] Validation failed:",y.errors),y.sanitized.length===0))throw new Error("AI returned invalid widget data: "+y.errors.join(", "));return y.sanitized}catch(_){v.warn("Fast JSON parse failed, trying repair...",_);try{const y=this.repairJson(u),b=JSON.parse(y),S=Zt.validateResponse(b);return S.valid||v.warn("[AI] Validation failed after repair:",S.errors),S.sanitized}catch(y){throw v.error("JSON repair failed:",y),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw v.error("AI processing failed:",d),d}}async callGemini(e,n,i,o){const r=`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${e}`,a={contents:[{role:"user",parts:[{text:i+`

`+o}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),l=await s.json();if(s.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,n,i,o){const r=n&&n.toLowerCase().includes("gpt-5"),s={model:n,messages:[{role:"system",content:i},{role:"user",content:o}],temperature:.1,response_format:r?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"}};r?s.max_completion_tokens=8192:s.max_tokens=8192;const c=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(s)})).json();if(c.error)throw new Error(c.error.message);return c.choices[0].message.content}async callOpenRouter(e,n,i,o){const a=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:i},{role:"user",content:o}],temperature:.1,max_tokens:4096})})).json();if(a.error)throw new Error(a.error.message);return a.choices[0].message.content}async callOpenAICompatible(e,n,i,o,r){const s=await(await fetch(e,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({model:i,messages:[{role:"system",content:o},{role:"user",content:r}],temperature:.1,max_tokens:8192})})).json();if(s.error)throw new Error(s.error.message||JSON.stringify(s.error));if(s.base_resp&&s.base_resp.status_code!==0)throw new Error(s.base_resp.status_msg||"MiniMax API error");return s.choices[0].message.content}async callMiniMax(e,n,i,o){const r=await this.callOpenAICompatible("https://api.minimax.io/v1/chat/completions",e,n,i,o);return typeof r=="string"?r.replace(/<think>[\s\S]*?(<\/think>|$)/g,"").trim():r}async callGLM(e,n,i,o){return this.callOpenAICompatible("https://api.z.ai/api/paas/v4/chat/completions",e,n,i,o)}getSystemPrompt(){return`
You are an expert UI designer and developer for ESPHome devices. 
Your task is to modify or create a widget list based on user instructions.

WIDGET TYPES & PROPS:
- text: { x, y, width, height, text, font_size, font_family, font_weight (400 or 700), color, align }
- sensor_text: { x, y, width, height, entity, prefix, suffix, font_size, color }
- datetime: { x, y, width, height, format, time_font_size, date_font_size, color }
- weather_forecast: { x, y, width, height, entity, layout ("horizontal"/"vertical"), icon_size, temp_font_size, day_font_size }
- weather_icon: { x, y, width, height, entity, size, color }
- icon: { x, y, width, height, icon, icon_size, color }
- battery_icon: { x, y, width, height, entity, color }
- progress_bar: { x, y, width, height, color, bar_height }
- graph: { x, y, width, height, entity, color, duration }
- shape_rect / rounded_rect / shape_circle: { x, y, width, height, bg_color, border_color, border_width, opacity }
- lvgl_*: Advanced widgets (lvgl_button, lvgl_switch, lvgl_slider, lvgl_arc, etc).

STRICT OPERATIONAL RULES:
1. CONTENT ACCURACY: If the user says "reads 'X'", the 'text' property MUST BE "X". NEVER use generic placeholders like "Text".
2. TYPOGRAPHY: "Bold" = font_weight: 700. "Normal/Regular" = font_weight: 400. "Large" = font_size: 28+.
3. VISUAL HIERARCHY: Use 'shape_rect' or 'rounded_rect' to create headers, footers, or background cards for groups of widgets. Use small thin shapes as dividers.
4. UNIQUE IDS: Every new widget MUST have a unique ID like "w_" + timestamp or a short descriptive string. Never leave ID as null or undefined.
5. CANVAS BOUNDS: Stay within ${JSON.stringify(p.getCanvasDimensions())}.
6. COLOR USAGE: Check "display_type" in context:
   - "monochrome": Use ONLY "black" or "white". No grays, no colors.
   - "color_epaper": Use limited palette: black, white, red, green, blue, yellow, orange. No gradients.
   - "color_lcd": Full RGB colors allowed. Use hex codes like "#FF5722" or CSS names.
7. LVGL WIDGETS: If "display_type" is "monochrome" or "color_epaper", do NOT use lvgl_* widgets unless the user explicitly requests LVGL. Use standard widgets (text, shape_rect, icon, etc.) instead. LVGL is designed for LCDs with fast refresh.

FEW-SHOT EXAMPLE:
User: "Add a large bold title that reads 'Home Status' at the top with a separator line."
Response: [
  {"id": "w_title", "type": "text", "x": 20, "y": 10, "width": 760, "height": 50, "text": "Home Status", "font_size": 32, "font_weight": 700, "align": "CENTER"},
  {"id": "w_sep", "type": "shape_rect", "x": 20, "y": 65, "width": 760, "height": 2, "bg_color": "black", "border_color": "black"}
]

8. DROP SHADOWS: For LCD displays ("color_lcd"), add subtle drop shadows to shapes and cards.
   HOW TO: Create a DUPLICATE of the widget to be shadowed.
           - ID: [original_id]_shadow
           - X/Y: original.x + 4, original.y + 4
           - Color: "black" (or "white" if background is dark)
           - Z-Order: Place the shadow widget BEFORE the main widget in the list so it renders behind.
           - Opacity: If supported by the widget type ('shape_rect'), set opacity to 0.4. If not, use a gray color like "#333333".

DESIGN GOAL: Create "Beautiful" layouts. Use whitespace, professional alignment, and decorative shapes to make the UI look premium.
`.trim()}repairJson(e){let n=[],i=!1,o=!1;for(let a=0;a<e.length;a++){const s=e[a];if(o){o=!1;continue}if(s==="\\"){o=!0;continue}if(s==='"'){i=!i;continue}i||(s==="["||s==="{"?n.push(s==="["?"]":"}"):(s==="]"||s==="}")&&n.length>0&&n[n.length-1]===s&&n.pop())}let r=e;for(i&&(r+='"'),r=r.trim().replace(/,\s*$/,"");n.length>0;)r+=n.pop();return r}minifyWidget(e){const{id:n,type:i,x:o,y:r,width:a,height:s,...l}=e;return{id:n,type:i,x:o,y:r,width:a,height:s,...l}}}const Z=new Ve;function xa(){try{return globalThis.localStorage??null}catch{return null}}function Sa(){try{return globalThis.location?.origin||""}catch{return""}}function wa(t){return t?Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:0:0}class Os{constructor(){const e=r=>document.getElementById(r),n=r=>document.getElementById(r),i=r=>document.getElementById(r),o=r=>document.getElementById(r);this.modal=e("editorSettingsModal"),this.closeBtn=e("editorSettingsClose"),this.doneBtn=e("editorSettingsDone"),this.snapToGrid=n("editorSnapToGrid"),this.showGrid=n("editorShowGrid"),this.showConditionalWidgets=n("editorShowConditionalWidgets"),this.lightMode=n("editorLightMode"),this.cIncludeComments=n("editorCIncludeComments"),this.autoSave=n("editorAutoSave"),this.refreshEntitiesBtn=o("editorRefreshEntities"),this.entityCountLabel=e("editorEntityCount"),this.gridOpacity=n("editorGridOpacity"),this.extendedLatinGlyphs=n("editorExtendedLatinGlyphs"),this.haManualUrl=n("haManualUrl"),this.haLlatToken=n("haLlatToken"),this.testHaBtn=o("editorTestHaBtn"),this.haTestResult=e("haTestResult"),this.haDeployedWarning=e("haDeployedWarning"),this.haCorsTip=e("haCorsTip"),this.aiProvider=i("aiProvider"),this.aiApiKeyGemini=n("aiApiKeyGemini"),this.aiApiKeyOpenai=n("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=n("aiApiKeyOpenrouter"),this.aiApiKeyMinimax=n("aiApiKeyMinimax"),this.aiApiKeyGlm=n("aiApiKeyGlm"),this.aiModelFilter=n("aiModelFilter"),this.aiModelSelect=i("aiModelSelect"),this.aiRefreshModelsBtn=o("aiRefreshModelsBtn"),this.aiTestResult=e("aiTestResult"),this.aiKeyRows={gemini:e("aiKeyGeminiRow"),openai:e("aiKeyOpenaiRow"),openrouter:e("aiKeyOpenrouterRow"),minimax:e("aiKeyMinimaxRow"),glm:e("aiKeyGlmRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=p.settings;this.snapToGrid&&(this.snapToGrid.checked=p.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=p.showGrid!==!1),this.showConditionalWidgets&&(this.showConditionalWidgets.checked=!!e.showConditionalWidgets),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.cIncludeComments&&(this.cIncludeComments.checked=e.c_include_comments!==!1),this.autoSave&&(this.autoSave.checked=e.autoSaveEnabled!==!1),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiApiKeyMinimax&&(this.aiApiKeyMinimax.value=e.ai_api_key_minimax||""),this.aiApiKeyGlm&&(this.aiApiKeyGlm.value=e.ai_api_key_glm||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=String(e.grid_opacity!==void 0?e.grid_opacity:20));const n=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(a=>{a.checked=n.includes(a.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const o=st();this.haManualUrl&&(this.haManualUrl.value=_n()||"",this.haManualUrl.disabled=o,this.haManualUrl.style.opacity=o?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=bn()||"",this.haLlatToken.disabled=o,this.haLlatToken.style.opacity=o?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!o),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",o),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const r=document.getElementById("haOriginPlaceholder");r&&(r.textContent=Sa()),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&Q){const e=wa(Q);this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){if(!this.modal)return;const e=this.snapToGrid;e&&e.addEventListener("change",()=>{p.setSnapEnabled(e.checked)});const n=this.showGrid;n&&n.addEventListener("change",()=>{p.setShowGrid(n.checked);const w=document.querySelector(".canvas-grid");w&&(w.style.display=n.checked?"block":"none")});const i=this.showConditionalWidgets;i&&i.addEventListener("change",()=>{p.updateSettings({showConditionalWidgets:i.checked}),I(P.STATE_CHANGED)});const o=this.lightMode;o&&o.addEventListener("change",()=>{const w=o.checked;p.updateSettings({editor_light_mode:w}),this.applyEditorTheme(w),I(P.STATE_CHANGED)});const r=this.cIncludeComments;r&&r.addEventListener("change",()=>{p.updateSettings({c_include_comments:r.checked})});const a=this.autoSave;a&&a.addEventListener("change",()=>{p.updateSettings({autoSaveEnabled:a.checked})});const s=this.gridOpacity;s&&s.addEventListener("input",()=>{const w=parseInt(s.value,10);p.updateSettings({grid_opacity:w})});const l=this.refreshEntitiesBtn;l&&l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Refreshing...",pe&&await pe(),this.updateEntityCount(),l.disabled=!1,l.textContent="â†» Refresh Entity List"});const c=this.haManualUrl;c&&c.addEventListener("change",()=>{vn(c.value.trim()),Ht()});const d=this.haLlatToken;d&&d.addEventListener("change",()=>{ji(d.value.trim())});const u=this.testHaBtn;u&&u.addEventListener("click",async()=>{const w=this.haTestResult;u.disabled=!0,w&&(w.textContent="Testing...",w.style.color="var(--muted)");try{Ht();const E=await pe();E&&E.length>0?(w&&(w.textContent="âœ… Success!",w.style.color="var(--success)"),this.updateEntityCount()):w&&(w.innerHTML="âŒ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",w.style.color="var(--danger)")}catch{w&&(w.innerHTML="âŒ Connection Error.<br>Check browser console.",w.style.color="var(--danger)")}finally{u.disabled=!1}});const g=this.aiProvider;g&&g.addEventListener("change",()=>{p.updateSettings({ai_provider:g.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const h=(w,E)=>{const C=document.getElementById(w);C&&C.addEventListener("input",()=>p.updateSettings({[E]:C.value.trim()}))};h("aiApiKeyGemini","ai_api_key_gemini"),h("aiApiKeyOpenai","ai_api_key_openai"),h("aiApiKeyOpenrouter","ai_api_key_openrouter"),h("aiApiKeyMinimax","ai_api_key_minimax"),h("aiApiKeyGlm","ai_api_key_glm");const m=this.aiModelFilter;m&&m.addEventListener("input",()=>{p.updateSettings({ai_model_filter:m.value}),this.filterModels()});const f=this.aiModelSelect;f&&f.addEventListener("change",()=>{const w=p.settings.ai_provider;p.updateSettings({[`ai_model_${w}`]:f.value})});const _=this.aiRefreshModelsBtn;_&&_.addEventListener("click",async()=>{const w=p.settings.ai_provider||"gemini";let E=p.settings[`ai_api_key_${w}`];const C=`aiApiKey${w.charAt(0).toUpperCase()+w.slice(1)}`,x=document.getElementById(C);if(x&&(E=x.value.trim(),p.updateSettings({[`ai_api_key_${w}`]:E})),!E){O("Please enter an API key first","error",3e3);return}_.disabled=!0,_.textContent="...";const k=this.aiTestResult;k&&(k.textContent="Testing...",k.style.color="var(--muted)");try{const L=await Z.fetchModels(w,E);Z.cache.models[w]=L,this.refreshModelSelect(),k&&(k.textContent=`âœ… Success! Found ${L.length} models.`,k.style.color="var(--success)")}catch{k&&(k.textContent="âŒ Failed. Check key/console.",k.style.color="var(--danger)")}finally{_.disabled=!1,_.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(w=>{w.addEventListener("change",()=>{const E=document.querySelectorAll(".glyphset-checkbox:checked"),C=Array.from(E).map(x=>x.value);p.updateSettings({glyphsets:C})})});const b=this.extendedLatinGlyphs;b&&b.addEventListener("change",()=>{p.updateSettings({extendedLatinGlyphs:b.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(w=>{w.addEventListener("click",()=>{const E=w.closest(".settings-category");if(!E)return;E.classList.contains("expanded")?E.classList.remove("expanded"):E.classList.add("expanded")})})}updateAIKeyVisibility(){const e=p.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(i=>{this.aiKeyRows[i]&&(this.aiKeyRows[i].style.display=i===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=p.settings.ai_provider||"gemini";if(!Z||!Z.cache)return;let n=Z.cache.models[e];if(!n){n=[];const i=p.settings[`ai_api_key_${e}`]||"";n=await Z.fetchModels(e,i),Z.cache.models[e]=n}this.filterModels()}filterModels(){const e=this.aiModelSelect;if(!e)return;const n=p.settings.ai_provider||"gemini",i=(p.settings.ai_model_filter||"").toLowerCase();if(!Z||!Z.cache)return;const r=(Z.cache.models[n]||[]).filter(s=>s.name.toLowerCase().includes(i)||s.id.toLowerCase().includes(i));e.innerHTML="",r.forEach(s=>{const l=document.createElement("option");l.value=s.id,l.textContent=s.name,e.appendChild(l)});const a=p.settings[`ai_model_${n}`];a&&(e.value=a)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{const n=xa();if(!n)return;n.setItem("reterminal-editor-theme",e?"light":"dark")}catch(n){v.log("Could not save theme preference:",n)}}}const Yn="snippet-selection-state-changed";let $n=null,It=!1;function kt(){vt(new CustomEvent(Yn))}function qe(){return $n}function As(t){$n=t,kt()}function Xe(){return It}function Ds(t){It=t,kt()}function Gs(){It=!1,kt()}class Ea{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e,n=null){if(!e)return"";const i=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm,o=[];let r=0;for(const l of e.matchAll(i)){const c=l.index??0;c>r&&o.push({text:e.slice(r,c),className:null});const[,d,u,g,h,m,f,_,y,b]=l;d!==void 0?(o.push({text:d,className:null}),o.push({text:u,className:"hl-key"}),o.push({text:g,className:"hl-punc"})):h!==void 0?o.push({text:h,className:"hl-comment"}):m!==void 0?o.push({text:m,className:"hl-string"}):f!==void 0?o.push({text:f,className:"hl-tag"}):b!==void 0?o.push({text:b,className:"hl-punc"}):_!==void 0?o.push({text:_,className:"hl-keyword"}):y!==void 0&&o.push({text:y,className:"hl-value"}),r=c+l[0].length}r<e.length&&o.push({text:e.slice(r),className:null});let a=0;const s=n&&n.end>n.start?n:null;return o.map(l=>{const c=a,d=a+l.text.length;return a=d,this.renderSegment(l,c,d,s)}).join("")}renderSegment(e,n,i,o){if(!e.text)return"";if(!o||o.end<=n||o.start>=i)return this.wrapSegmentText(e.text,e.className,!1);const r=Math.max(o.start,n)-n,a=Math.min(o.end,i)-n;return[{text:e.text.slice(0,r),selected:!1},{text:e.text.slice(r,a),selected:!0},{text:e.text.slice(a),selected:!1}].map(l=>this.wrapSegmentText(l.text,e.className,l.selected)).join("")}wrapSegmentText(e,n,i){if(!e)return"";const o=this.escapeHtml(e),r=n?`<span class="${n}">${o}</span>`:o;return i?`<span class="hl-selected">${r}</span>`:r}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}const Ca=new Set(["esphome","esp32","esp8266","psram","wifi","api","ota","logger","web_server","captive_portal","preferences","platformio_options","deep_sleep","substitutions"]);async function Re(t){if(navigator.clipboard&&fi())try{await navigator.clipboard.writeText(t);return}catch{}const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();try{if(!document.execCommand("copy"))throw new Error("Copy command was rejected")}finally{document.body.removeChild(e)}}function Be(t,e,n=2e3){const i=t.innerHTML,o=t.style.minWidth;t.style.minWidth=t.offsetWidth+"px",t.textContent=e,globalThis.setTimeout(()=>{t.innerHTML=i,t.style.minWidth=o},n)}function Pa(t){const e=t.search(/^display:\s*$/m);if(e===-1)throw new Error("No display section found in output");const n=t.substring(e),i=n.match(/\n[a-z_]+:\s*(?:\n|$)/),r=(i?n.substring(0,i.index):n).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!r)throw new Error("No display lambda found in output");const s=r[1].split(`
`),l=s.filter(d=>d.trim().length>0);if(l.length===0)throw new Error("Lambda appears to be empty");const c=Math.min(...l.map(d=>{const u=d.match(/^(\s*)/);return u?u[1].length:0}));return s.map(d=>d.length>=c?d.substring(c):d).join(`
`).trim()}function Ia(t){const e=t.match(/^(?:# ?)?([A-Za-z0-9_]+):(?:\s+#.*)?\s*$/);return e?e[1]:null}function ka(t){const e=String(t||"").replace(/\r\n/g,`
`).split(`
`),n=[];let i=!1;for(const r of e){const a=Ia(r);a&&(i=Ca.has(a),i)||i||n.push(r)}const o=n.join(`
`).replace(/\n{3,}/g,`

`).trim();if(!o)throw new Error("No UI YAML remains after removing hardware/system sections");return o}function La(t,e={}){const n=e.oeplEntityId||"open_epaper_link.0000000000000000",i=e.oeplDither??2;t.target.entity_id=n,t.data.dither=i;let o=`service: ${t.service}
`;return o+=`target:
  entity_id: ${t.target.entity_id}
`,o+=`data:
`,o+=`  background: ${t.data.background}
`,o+=`  rotate: ${t.data.rotate}
`,o+=`  dither: ${t.data.dither}
`,o+=`  ttl: ${t.data.ttl}
`,o+=`  payload: >
`,o+=`    ${JSON.stringify(t.data.payload)}`,o}function Ta(t){const e=t==="OEPLAdapter",n=t==="OpenDisplayAdapter",i=t==="CAdapter",o=document.getElementById("oeplNotice");o&&o.classList.toggle("hidden",!e);const r=document.getElementById("odpNotice");if(r&&(r.classList.toggle("hidden",!n),n)){const g=r.querySelector("div");g&&(g.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant > Developer Tools > Actions > <code>opendisplay.drawcustom</code>")}const a=document.querySelector(".code-panel-title");if(a){const g=a.querySelector("button");a.innerHTML="",g&&a.appendChild(g);let h=" ESPHome YAML";e&&(h=" OpenEpaperLink JSON"),n&&(h=" OpenDisplay YAML (ODP)"),i&&(h=" C/C++ Drawing Code"),a.appendChild(document.createTextNode(h))}const s=document.getElementById("copyOEPLServiceBtn");s&&(s.style.display=e?"inline-block":"none");const l=document.getElementById("copyODPServiceBtn");l&&(l.style.display=n?"inline-block":"none");const c=document.getElementById("copyUiYamlBtn");c&&(c.style.display=e||n||i?"none":"inline-block");const d=document.getElementById("copyLambdaBtn");d&&(d.style.display=e||n||i?"none":"inline-block");const u=document.getElementById("updateLayoutBtn");return u&&(u.style.display="inline-block"),{isOEPL:e,isODP:n,isC:i}}function Ma(t){return document.getElementById(t)}function Lt(t){return document.getElementById(t)}function ve(t){return document.getElementById(t)}function Un(t){return t instanceof Error?t.message:String(t)}function jn(t){(Array.isArray(t?.importWarnings)?t.importWarnings:[]).forEach((n,i)=>{setTimeout(()=>O(n,"warning",4500),i*200)})}function Oa(t){const e=ve("snippetFullscreenModal"),n=ve("snippetFullscreenContainer"),i=ve("snippetFullscreenContent"),o=ve("snippetFullscreenHighlight"),r=Lt("snippetBox"),a=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!n||!i||!o||!r)return;n.classList.toggle("highlighted",t.isHighlighted),a&&a.classList.toggle("active",t.isHighlighted),a&&!a.hasListener&&(a.addEventListener("click",()=>{t.isHighlighted=!t.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(t.isHighlighted));const c=document.querySelector(".snippet-container"),d=Ma("toggleHighlightBtn");if(c&&c.classList.toggle("highlighted",t.isHighlighted),d&&d.classList.toggle("active",t.isHighlighted),n.classList.toggle("highlighted",t.isHighlighted),a.classList.toggle("active",t.isHighlighted),t.isHighlighted){const u=Xe()?qe():null;o.innerHTML=t.highlighter.highlight(s.value,u),t.updateHighlightLayer()}}),a.hasListener=!0);let s=i.querySelector("textarea");if(!s){i.innerHTML="",s=document.createElement("textarea"),s.className="snippet-box",s.style.width="100%",s.style.height="100%",s.style.background="transparent",s.spellcheck=!1,i.appendChild(s),s.addEventListener("scroll",()=>{o.scrollTop=s.scrollTop,o.scrollLeft=s.scrollLeft}),s.addEventListener("input",()=>{const d=s.value;r&&(r.value=d),typeof t.handleSnippetTextInput=="function"&&t.handleSnippetTextInput(d),t.isHighlighted&&(o.innerHTML=t.highlighter.highlight(d))});let c=e.querySelector(".modal-actions");if(c&&!c.querySelector("#fullscreenUpdateBtn")){const d=document.createElement("button");d.id="fullscreenUpdateBtn",d.className="btn btn-primary",d.textContent="Update Layout from YAML",d.onclick=()=>{const u=s.value;r.value=u,typeof t.handleSnippetTextInput=="function"&&t.handleSnippetTextInput(u),t.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},c.insertBefore(d,c.firstChild)}}const l=s;if(l){if(l.value=r.value||"",t.isHighlighted){const c=Xe()?qe():null;o.innerHTML=t.highlighter.highlight(l.value,c),setTimeout(()=>{o.scrollTop=l.scrollTop,o.scrollLeft=l.scrollLeft},50)}e.style.display="",e.classList.remove("hidden")}}async function Aa(t){const e=Lt("importSnippetTextarea"),n=ve("importSnippetError");if(!e)return;const i=e.value;if(i.trim())try{n&&(n.textContent="");let o;try{o=an(i),v.log("[handleImportSnippet] Successfully used offline parser.")}catch(a){if(v.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",a),W())o=await ao(i);else throw a}ue(o);const r=ve("importSnippetModal");r&&(r.classList.add("hidden"),r.style.display="none"),O("Layout imported successfully","success"),jn(o)}catch(o){v.error("Import failed:",o),n&&(n.textContent=`Error: ${Un(o)}`)}}async function Da(t){const e=Lt("snippetBox");if(!e)return;const n=e.value;if(n.trim()){if(t.lastGeneratedYaml&&n.trim()===t.lastGeneratedYaml.trim()){v.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const i=p?.currentLayoutId||"reterminal_e1001",o=p?.deviceName||"Layout 1",r=p?.deviceModel||p?.settings?.device_model||"reterminal_e1001";v.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${i}, Name: ${o}`);const a=an(n);if(!a)throw new Error("Could not parse layout from YAML");a.device_id=i,a.name=o,a.device_model=r,a.settings||(a.settings={}),a.settings.device_model=r,a.settings.device_name=o;const s=p?.settings?.dark_mode||!1;a.settings.dark_mode=s,t.suppressSnippetUpdate=!0,t.snippetDebounceTimer&&(clearTimeout(t.snippetDebounceTimer),t.snippetDebounceTimer=null),t.hasPendingManualSnippetChanges=!1,ue(a),typeof t.syncGeneratedSnippetBaseline=="function"&&await t.syncGeneratedSnippetBaseline(),typeof t.persistManualYamlOverride=="function"&&t.persistManualYamlOverride(n),t.suppressSnippetUpdate=!1,O("Layout updated from YAML","success"),jn(a),(n.includes("lambda:")||n.includes("script:"))&&setTimeout(()=>{O("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(i){v.error("Update layout failed:",i),O(`Update failed: ${Un(i)}`,"error"),t.suppressSnippetUpdate=!1}}}function V(t){return document.getElementById(t)}function te(t){return document.getElementById(t)}function fe(t){return document.getElementById(t)}function Ne(t){return t instanceof Error?t.message:String(t)}class Hs{constructor(e){this.adapter=e,this.highlighter=new Ea,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.generationCounter=0,this.lastGeneratedYaml="",this.hasPendingManualSnippetChanges=!1,this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}getPersistedManualYamlOverride(){return typeof p?.getManualYamlOverride=="function"?p.getManualYamlOverride()||"":p?.project?.state?.manualYamlOverride||""}refreshManualOverrideUi(e){const n=V("clearYamlOverrideBtn");n&&(n.style.display=e?"inline-block":"none")}setSnippetText(e){const n=te("snippetBox");n&&n.value!==e&&(n.value=e);const o=fe("snippetFullscreenContent")?.querySelector("textarea");o&&o.value!==e&&(o.value=e)}normalizeSnippetText(e){return String(e||"").replace(/\r\n/g,`
`)}clonePagesPayload(){const e=p?p.getPagesPayload():{pages:[]};return JSON.parse(JSON.stringify(e))}async generateCurrentSnippetYaml(){const e=this.clonePagesPayload(),n=await this.adapter.generate(e);return this.normalizeSnippetText(n)}async syncGeneratedSnippetBaseline(){const e=++this.generationCounter;try{const n=await this.generateCurrentSnippetYaml();if(e!==this.generationCounter)return;this.lastGeneratedYaml=n}catch(n){if(e!==this.generationCounter)return;v.warn("[SnippetManager] Failed to rebuild generated YAML baseline after import.",n)}}parseTopLevelSnippetBlocks(e){const n=this.normalizeSnippetText(e);if(!n.trim())return[];const i=[],o=n.split(`
`);let r=null;const a=()=>{if(!r||r.lines.length===0){r=null;return}const s=r.lines.join(`
`).replace(/\n+$/g,"").trimEnd();s.trim()&&i.push({type:r.type,key:r.key,text:s}),r=null};return o.forEach(s=>{const c=!s.startsWith(" ")&&!s.startsWith("	")?s.match(/^([A-Za-z0-9_]+:)(?:\s+#.*)?\s*$/):null;if(c){a(),r={type:"section",key:c[1],lines:[s]};return}r||(r={type:"preamble",key:null,lines:[]}),r.lines.push(s)}),a(),i}getLeadingSnippetPreamble(e){const[n]=this.parseTopLevelSnippetBlocks(e);return!n||n.type!=="preamble"?"":this.normalizeSnippetText(n.text).trimEnd()}stripGeneratedPreamble(e,n){const i=this.normalizeSnippetText(e).trimEnd(),o=this.normalizeSnippetText(n).trimEnd();if(!o.trim())return i;if(i.includes(o)){let r=i;for(;r.includes(o);)r=r.replace(o,"");return r.replace(/^\n+|\n+$/g,"").trimEnd()}return i.trim()===o.trim()?"":i}getManagedSnippetSectionKeys(...e){const n=new Set;return e.forEach(i=>{this.parseTopLevelSnippetBlocks(i).forEach(o=>{o.type==="section"&&o.key&&n.add(o.key)})}),n}reconcileManualSnippetOverrideBySections(e,n,i){const o=this.getManagedSnippetSectionKeys(e,i);if(o.size===0)return null;const r=this.getLeadingSnippetPreamble(i),a=this.parseTopLevelSnippetBlocks(n);if(!a.some(h=>h.type==="section"&&h.key&&o.has(h.key)))return null;const l=[],c=[];let d=!1;a.forEach(h=>{const m=h.type==="section"&&h.key&&o.has(h.key);if(!m){let f=h.text;if(!d&&h.type==="preamble"&&(f=this.stripGeneratedPreamble(h.text,r)),!f.trim())return;d?c.push(f):l.push(f)}m&&(d=!0)});const u=[...l,e,...c].map(h=>this.normalizeSnippetText(h).replace(/^\n+|\n+$/g,"").trimEnd()).filter(h=>h.trim());if(u.length===0)return null;const g=u.join(`

`);return{text:g,usesManualOverride:g.trim()!==e.trim()}}reconcileManualSnippetOverride(e,n){const i=this.normalizeSnippetText(e),o=this.normalizeSnippetText(n),r=this.normalizeSnippetText(this.lastGeneratedYaml);if(!o.trim())return{text:i,usesManualOverride:!1};if(!r.trim())return{text:o,usesManualOverride:!0};if(o.includes(r)){const s=o.replace(r,i);return{text:s,usesManualOverride:s.trim()!==i.trim()}}const a=this.reconcileManualSnippetOverrideBySections(i,o,r);return a?(v.log("[SnippetManager] Falling back to section-based YAML merge after manual edits changed the generated block."),a):o.trim()===i.trim()?{text:i,usesManualOverride:!1}:(v.warn("[SnippetManager] Unable to merge manual YAML override with regenerated snippet; preserving manual YAML verbatim."),{text:o,usesManualOverride:!0})}persistManualYamlOverride(e){if(typeof p?.setManualYamlOverride=="function"){p.setManualYamlOverride(e,{emitStateChange:!1});return}p?.project?.state&&(p.project.state.manualYamlOverride=e)}clearManualYamlOverride(){typeof p?.clearManualYamlOverride=="function"?p.clearManualYamlOverride():p?.project?.state&&(p.project.state.manualYamlOverride=""),this.refreshManualOverrideUi(!1),this.updateSnippetBox()}handleSnippetTextInput(e){this.setSnippetText(e),this.hasPendingManualSnippetChanges=e.trim()!==this.lastGeneratedYaml.trim(),this.hasPendingManualSnippetChanges?this.persistManualYamlOverride(e):this.clearManualYamlOverride(),this.refreshManualOverrideUi(!!this.getPersistedManualYamlOverride()||this.hasPendingManualSnippetChanges),this.isHighlighted&&this.updateHighlightLayer()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=V("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const n=V("snippetFullscreenClose");n&&n.addEventListener("click",()=>{const f=fe("snippetFullscreenModal");f&&f.classList.add("hidden")});const i=V("importSnippetConfirm");i&&i.addEventListener("click",async()=>{await this.handleImportSnippet()});const o=V("updateLayoutBtn");o&&o.addEventListener("click",async()=>{const f=o.querySelector(".mdi"),_=f?.className||"";f&&(f.className="mdi mdi-loading mdi-spin"),o.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),f&&(f.className="mdi mdi-check",setTimeout(()=>{f.className=_},1500))}catch{f&&(f.className="mdi mdi-alert-circle-outline",setTimeout(()=>{f.className=_},1500))}finally{o.disabled=!1}});const r=V("copySnippetBtn");r&&r.addEventListener("click",async()=>{this.copySnippetToClipboard(r)});const a=V("copyUiYamlBtn");a&&a.addEventListener("click",async()=>{this.copyUiYamlToClipboard(a)});const s=V("copyLambdaBtn");s&&s.addEventListener("click",async()=>{this.copyLambdaToClipboard(s)});const l=V("copyOEPLServiceBtn");l&&l.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(l)});const c=V("copyODPServiceBtn");c&&c.addEventListener("click",()=>{this.copySnippetToClipboard(c)});const d=V("toggleYamlBtn"),u=document.querySelector(".code-panel");d&&u&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&u.classList.add("collapsed"),d.addEventListener("click",()=>{const _=u.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",String(_)),vt(new Event("resize"))}));const g=V("clearYamlOverrideBtn");g&&g.addEventListener("click",()=>{this.hasPendingManualSnippetChanges=!1,this.clearManualYamlOverride()});const h=V("toggleHighlightBtn");document.querySelector(".snippet-container"),h&&(document.querySelectorAll(".snippet-container").forEach(f=>{f.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(f=>{f.classList.toggle("active",this.isHighlighted)}),h.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(this.isHighlighted)),document.querySelectorAll(".snippet-container").forEach(f=>{f.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(f=>{f.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const m=te("snippetBox");m&&m.addEventListener("input",()=>{this.handleSnippetTextInput(m.value)}),H(Yn,()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=te("snippetBox"),n=fe("highlightLayer");e&&n&&e.addEventListener("scroll",()=>{n.scrollTop=e.scrollTop,n.scrollLeft=e.scrollLeft})}setupAutoUpdate(){B(P.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),B(P.SELECTION_CHANGED,e=>{const n=e&&e.widgetIds?e.widgetIds:[];typeof Oe=="function"&&Oe(n)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=te("snippetBox"),n=fe("highlightLayer");if(e&&n){const r=Xe()?qe():null;n.innerHTML=this.highlighter.highlight(e.value,r)}const i=fe("snippetFullscreenHighlight"),o=fe("snippetFullscreenContent");if(i&&o){const r=o.querySelector("textarea");if(r){const a=Xe()?qe():null;i.innerHTML=this.highlighter.highlight(r.value,a)}}}updateSnippetBox(){if(te("snippetBox")){this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer);const n=++this.generationCounter;this.snippetDebounceTimer=setTimeout(()=>{if(n!==this.generationCounter||this.suppressSnippetUpdate)return;const i=this.adapter?.constructor?.name||"";Ta(i);const o=this.getPersistedManualYamlOverride();if(this.hasPendingManualSnippetChanges&&!o){v.log("[SnippetManager] Preserving pending YAML edits; skipping auto-regeneration.");return}try{const a=(p?p.selectedWidgetIds:[]).length>1;this.generateCurrentSnippetYaml().then(s=>{if(n!==this.generationCounter)return;const l=this.reconcileManualSnippetOverride(s,o);this.lastGeneratedYaml=s,this.hasPendingManualSnippetChanges=!1,this.setSnippetText(l.text),l.usesManualOverride?this.persistManualYamlOverride(l.text):this.persistManualYamlOverride(""),this.refreshManualOverrideUi(l.usesManualOverride),this.isHighlighted&&this.updateHighlightLayer();const c=p?p.selectedWidgetIds:[];typeof Oe=="function"&&Oe(c)}).catch(s=>{n===this.generationCounter&&(v.error("Error generating snippet via adapter:",s),this.setSnippetText("# Error generating YAML (adapter): "+Ne(s)),this.isHighlighted&&this.updateHighlightLayer())})}catch(r){v.error("Error generating snippet:",r),this.setSnippetText("# Error generating YAML: "+Ne(r)),this.isHighlighted&&this.updateHighlightLayer()}},50)}}openSnippetModal(){return Oa(this)}async handleImportSnippet(){return Aa()}async handleUpdateLayoutFromSnippetBox(){return Da(this)}async copySnippetToClipboard(e){const n=te("snippetBox");if(!n)return;const i=n.value||"";try{await Re(i),O("Snippet copied to clipboard","success"),Be(e,"Copied!")}catch(o){v.error("Copy failed:",o),O("Unable to copy snippet","error")}}async copyUiYamlToClipboard(e){const n=te("snippetBox");if(n)try{const i=ka(n.value||"");await Re(i),O("UI YAML copied to clipboard","success"),Be(e,"Copied!")}catch(i){v.error("Copy UI YAML failed:",i),O(Ne(i)||"Unable to copy UI YAML","error")}}async copyLambdaToClipboard(e){const n=te("snippetBox");if(!n)return;const i=n.value||"";try{const o=Pa(i);await Re(o),O("Display lambda copied to clipboard","success"),Be(e,"Copied!")}catch(o){v.error("Copy lambda failed:",o),O(Ne(o)||"Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const n=te("snippetBox");if(!n)return;const i=n.value||"";try{const o=JSON.parse(i),r=La(o,p.settings);await Re(r),O("HA Service call copied!","success"),Be(e,"Copied!",2e3)}catch(o){v.error("Failed to format/copy OEPL service:",o),O("Failed to format service call","error")}}}class K{static _activeHandler=null;static _listenersAttached=!1;static _boundKeyDown=null;constructor(){this._seenKeyEvents=new WeakSet,K._activeHandler=this,this.init()}init(){K._listenersAttached||(K._boundKeyDown=e=>{const n=K._activeHandler;n&&(n._seenKeyEvents.has(e)||(n._seenKeyEvents.add(e),n.handleKeyDown(e)))},typeof document?.addEventListener=="function"&&document.addEventListener("keydown",K._boundKeyDown),H("keydown",K._boundKeyDown),K._listenersAttached=!0)}handleKeyDown(e){const n=p;if(!n){v.error("KeyboardHandler: AppState not found!");return}const i=n.selectedWidgetIds.length>0,o=e.target instanceof HTMLElement?e.target:null,r=K.isInput(o),a=K.hasNativeTextSelection(o);if(e.shiftKey&&e.code==="Space"){o&&K.isInput(o)&&o.blur(),e.preventDefault(),ke&&ke.open();return}if((e.key==="Delete"||e.key==="Backspace")&&i){if(r)return;e.preventDefault(),this.deleteWidget(null);return}const s={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(s&&i&&!e.ctrlKey&&!e.metaKey&&!e.altKey){if(r)return;const l=e.shiftKey?10:1;e.preventDefault(),this.nudgeSelectedWidgets(s[0]*l,s[1]*l);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(r||a)return;e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(r)return;e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.undo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.redo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&i){e.preventDefault();const c=n.getSelectedWidgets().every(d=>d.locked);n.updateWidgets(n.selectedWidgetIds,{locked:!c})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"&&e.target instanceof HTMLElement&&!K.isInput(e.target)&&!a){e.preventDefault(),n.selectAllWidgets();return}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const l=!n.showGrid;if(n.setShowGrid(l),l){n.setShowDebugGrid(!1);const d=document.getElementById("debugGridToggleBtn");d&&d.classList.remove("active")}const c=document.getElementById("gridToggleBtn");c&&c.classList.toggle("active",l),I(P.STATE_CHANGED),v.log(`[Keyboard] Grid toggled: ${l}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const l=!n.showDebugGrid;if(n.setShowDebugGrid(l),l){n.setShowGrid(!1);const d=document.getElementById("gridToggleBtn");d&&d.classList.remove("active")}const c=document.getElementById("debugGridToggleBtn");c&&c.classList.toggle("active",l),I(P.STATE_CHANGED),v.log(`[Keyboard] Debug mode toggled: ${l}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const l=!n.showRulers;n.setShowRulers(l);const c=document.getElementById("rulersToggleBtn");c&&c.classList.toggle("active",l),v.log(`[Keyboard] Rulers toggled: ${l}`);return}e.key==="Escape"&&(document.activeElement instanceof HTMLElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),n.selectedWidgetIds.length>0&&(n.selectWidgets([]),I(P.STATE_CHANGED)))}static isInput(e){return!!(e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}static hasNativeTextSelection(e){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const n=e.selectionStart??0;return(e.selectionEnd??0)>n}try{const n=globalThis.getSelection?.();return!!n&&!n.isCollapsed&&n.toString().trim().length>0}catch{return!1}}nudgeSelectedWidgets(e,n){const i=p,o=i.getCurrentPage?.(),r=new Set(i.selectedWidgetIds),a=i.getSelectedWidgets(),s=[];for(const g of a)!g||g.locked||(s.push(g),g.type==="group"&&o?.widgets&&s.push(...o.widgets.filter(h=>h.parentId===g.id&&!h.locked&&!r.has(h.id))));if(!s.length)return!1;const l=i.getCanvasDimensions?.()||{},c=Number(l.width)||1/0,d=Number(l.height)||1/0;let u=!1;for(const g of s){const h=Number(g.width)||0,m=Number(g.height)||0,f=Number.isFinite(c)?Math.max(0,c-h):1/0,_=Number.isFinite(d)?Math.max(0,d-m):1/0,y=Number(g.x)||0,b=Number(g.y)||0,S=Math.min(f,Math.max(0,y+e)),w=Math.min(_,Math.max(0,b+n));(S!==g.x||w!==g.y)&&(g.x=S,g.y=w,u=!0)}return u?(typeof i.recordHistory=="function"&&i.recordHistory(),I(P.STATE_CHANGED),!0):!1}deleteWidget(e){const n=p;n&&n.deleteWidget(e)}copyWidget(){const e=p;e&&e.copyWidget()}pasteWidget(){const e=p;e&&e.pasteWidget()}}const Ga=`<header class="main-header" role="banner">
  <div class="main-header-title">
    <img src="assets/logo_header.png" alt="ESPHome Designer" class="logo-image">
    <span><small style="opacity: 0.5; margin-left: 8px;">v1.0.0 RC39</small> <span id="currentLayoutDevice"
        style="margin-left:8px; color:var(--accent);"></span></span>
  </div>
  <div class="main-header-actions desktop-only">
    <a href="https://github.com/koosoli/ESPHomeDesigner/" target="_blank" class="btn btn-secondary"
      style="font-size: 11px;">
      <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor"
        style="vertical-align: middle; margin-right: 4px;">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
        </path>
      </svg>
      GitHub
    </a>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 16px;"></span>
    </a>
    <button id="deviceSettingsBtn" class="btn btn-secondary">📱 Device Settings</button>
    <button id="editorSettingsBtn" class="btn btn-secondary">⚙ Editor Settings</button>
  </div>
  <div class="main-header-actions mobile-only">
    <button id="mobileWidgetsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg></button>
    <button id="mobileDeviceBtn" class="btn btn-secondary">📱</button>
    <button id="mobileEditorSettingsBtn" class="btn btn-secondary">⚙</button>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 18px;"></span>
    </a>
    <button id="mobilePropsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg></button>
  </div>
</header>
`,Ha=`    <aside class="sidebar" role="complementary" aria-label="Editor Sidebar">
      <div id="pagesSection" class="sidebar-section collapsible expanded">
        <div class="sidebar-section-label" id="pagesHeader"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; border-radius: 4px;"
          title="Click to view all pages">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span style="font-weight: 600;">PAGES</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div id="pagesContent" class="collapsible-content" style="padding: 0 16px 12px;">
          <div id="pageList" class="page-list"></div>
          <button id="addPageBtn" class="btn btn-secondary btn-full" style="margin-top: 8px;">+ Add page</button>
          <button id="clearAllBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;"
            title="Remove all widgets from current page">Clear Current Page</button>
        </div>
      </div>

      <div class="sidebar-section" style="flex: 1; overflow-y: auto;">
        <div class="sidebar-section-label" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>Widgets</span>
          </div>
          <button id="quickSearchBtn" class="btn-icon btn-xs" title="Quick Search (Shift+Space)" style="opacity: 0.6;">
            <span class="mdi mdi-magnify" style="font-size: 14px;"></span>
          </button>
        </div>
        <div id="widgetPalette" class="widget-list"></div>
      </div>

      <div class="sidebar-section">
        <div id="currentLayoutIndicator"
          style="background: rgba(255,255,255,0.03); padding: 6px 10px; border-radius: 6px; margin-bottom: 6px; font-size: 10px;">
          <div style="color: var(--muted); margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>LAYOUT</span>
            <span id="sidebarStatus" style="font-size: 10px; opacity: 0.6;">Ready</span>
          </div>
          <strong id="currentLayoutName">Loading...</strong>
        </div>
        <div style="display: flex; gap: 4px;">
          <button id="saveLayoutBtn" class="btn btn-secondary" style="flex: 1;">Save Layout</button>
          <button id="importLayoutBtn" class="btn btn-secondary" style="flex: 1;">Import Layout</button>
        </div>
        <input type="file" id="loadLayoutBtn" accept=".json" style="display:none;" />
        <button id="manageLayoutsBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;">📁 Layout
          Manager</button>
      </div>
    </aside>`,Ra=`      <div class="code-panel">
        <div class="code-panel-header">
          <div class="code-panel-title">
            <button id="toggleYamlBtn" class="btn-icon btn-xs code-toggle-btn" title="Toggle YAML Panel">
              <svg class="chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                stroke-width="3">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            ESPHome YAML
          </div>
          <div class="code-panel-actions">
            <button id="toggleHighlightBtn" class="btn btn-secondary btn-xs btn-icon" title="Toggle Syntax Highlighting"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
            </button>
            <button id="aiPromptBtn" class="btn btn-secondary btn-xs btn-icon" title="AI Assistant"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-robot-outline" style="font-size: 14px;"></span>
            </button>
            <button id="copySnippetBtn" class="btn btn-secondary btn-xs" title="Copy full YAML output">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>All
            </button>
            <button id="copyUiYamlBtn" class="btn btn-secondary btn-xs"
              title="Copy UI YAML without hardware/system sections">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>UI
            </button>
            <button id="copyLambdaBtn" class="btn btn-secondary btn-xs" title="Copy display lambda only (C++ code)">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>λ
            </button>
            <button id="copyOEPLServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>OEPL
            </button>
            <button id="copyODPServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>ODP
            </button>
            <button id="fullscreenSnippetBtn" class="btn btn-secondary btn-xs btn-icon" title="Expand code panel"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-fullscreen" style="font-size: 14px;"></span>
            </button>
            <button id="clearYamlOverrideBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Return to the generated YAML for this layout">
              Auto
            </button>
            <button id="updateLayoutBtn" class="btn btn-secondary btn-xs btn-icon" title="Import YAML back to canvas"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-import" style="font-size: 14px;"></span>
            </button>
          </div>
        </div>
        <div id="oeplNotice" class="oepl-notice hidden"
          style="background: rgba(255, 159, 67, 0.1); border-bottom: 1px solid rgba(255, 159, 67, 0.2); padding: 8px 12px; font-size: 10px; color: #ff9f43; display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-alert-circle-outline" style="font-size: 14px;"></span>
          <div>
            <strong>OpenEpaperLink JSON (Beta)</strong> - Copy this to Home Assistant → Developer Tools → Services →
            <code>open_epaper_link.drawcustom</code>
          </div>
        </div>
        <div id="odpNotice" class="odp-notice hidden"
          style="background: rgba(82, 199, 234, 0.1); border-bottom: 1px solid rgba(82, 199, 234, 0.2); padding: 8px 12px; font-size: 10px; color: var(--accent); display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-informational" style="font-size: 14px;"></span>
          <div>
            <strong>OpenDisplay JSON (ODP)</strong> - Compatible with ODP v1 primitives.
          </div>
        </div>
        <div class="snippet-container">
          <pre id="highlightLayer" class="highlight-layer" aria-hidden="true"></pre>
          <textarea id="snippetBox" class="snippet-box" spellcheck="false"
            placeholder="# Click 'Generate' to see the ESPHome configuration..."></textarea>
        </div>
      </div>
`,Ba=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
      <!-- Hierarchy Panel -->
      <div class="sidebar-section" style="border-bottom: 1px solid var(--border-subtle);">
        <div class="sidebar-section-label"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;"
          id="hierarchyHeader">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="2" width="18" height="18" rx="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="17" y2="16"></line>
            </svg>
            <span>Hierarchy</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div id="hierarchyPanel" class="hierarchy-content"
          style="max-height: 250px; overflow-y: auto; padding: 0 8px 8px;">
          <div id="hierarchyList" class="hierarchy-list"></div>
        </div>
      </div>

      <div class="sidebar-section-label"
        style="padding: 12px 16px 0; display: flex; justify-content: space-between; align-items: center;">
        <span>Properties</span>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;" title="Snap to grid">
          <input id="snapToggle" type="checkbox" checked style="width:12px; height:12px;" />
          <span>Snap</span>
        </label>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;"
          title="Lock position (Ctrl+L)">
          <input id="lockPositionToggle" type="checkbox" style="width:12px; height:12px;" />
          <span>Lock</span>
        </label>
      </div>
      <div id="propertiesPanel" class="properties-content">
        <div class="empty-state">
          Select a widget on the canvas to edit its properties.
        </div>
      </div>
    </aside>`,Na=`<!-- Modals -->
<!-- Fullscreen Modal -->
<div id="snippetFullscreenModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        ESPHome YAML (Fullscreen)
        <button id="toggleFullscreenHighlightBtn" class="btn btn-secondary btn-xs btn-icon"
          title="Toggle Syntax Highlighting" style="width: auto; padding: 0 6px; border-radius: 4px;">
          <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
        </button>
      </div>
      <button id="snippetFullscreenClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="snippet-container" id="snippetFullscreenContainer" style="height: 100%;">
        <pre id="snippetFullscreenHighlight" class="highlight-layer" aria-hidden="true"></pre>
        <div id="snippetFullscreenContent" style="width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>
</div>

<!-- Import Modal -->
<div id="importSnippetModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Import Layout from YAML</div>
      <button id="importSnippetCancel" class="btn btn-secondary">Cancel</button>
    </div>
    <div class="modal-body">
      <textarea id="importSnippetTextarea" class="prop-input" style="height:400px; font-family:monospace;"
        placeholder="# Paste ESPHome YAML here..."></textarea>
      <div id="importSnippetError" style="color:var(--danger); font-size:11px; margin-top:8px;"></div>
    </div>
    <div class="modal-actions">
      <button id="importSnippetConfirm" class="btn btn-secondary">Import</button>
    </div>
  </div>
</div>

<!-- Page Settings Modal -->
<div id="pageSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Page Settings</div>
      <button id="pageSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <div class="prop-label">Page Name</div>
        <input id="pageSettingsName" class="prop-input" type="text" />
      </div>
      <div class="field">
        <div class="prop-label">Refresh Mode</div>
        <select id="pageSettingsRefreshMode" class="prop-input">
          <option value="interval">Periodic Interval</option>
          <option value="daily">Daily at specific time</option>
        </select>
      </div>
      <div class="field" id="field-refresh-interval">
        <div class="prop-label">Interval (seconds)</div>
        <input id="pageSettingsRefresh" class="prop-input" type="number" min="0" placeholder="60" />
      </div>
      <div class="field" id="field-refresh-time" style="display:none;">
        <div class="prop-label">Wake-up Time (HH:MM)</div>
        <input id="pageSettingsRefreshTime" class="prop-input" type="time" />
      </div>
      <div class="field">
        <div class="prop-label">Visibility Window</div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1;">
            <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">Start (Optional)</div>
            <input id="pageSettingsVisibleFrom" class="prop-input" type="time" />
          </div>
          <div style="flex: 1;">
            <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">End (Optional)</div>
            <input id="pageSettingsVisibleTo" class="prop-input" type="time" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="prop-label">Visual Style</div>
        <select id="pageSettingsDarkMode" class="prop-input">
          <option value="inherit">Inherit Global</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </div>
      <div class="field">
        <div class="prop-label">Layout Mode (LVGL)</div>
        <select id="pageSettingsLayoutMode" class="prop-input">
          <option value="absolute">Absolute Positioning</option>
          <option value="grid">Grid Layout</option>
        </select>
        <div id="field-grid-size" style="display:none; margin-top:8px;">
          <div class="prop-label">Grid Size (RxC)</div>
          <input id="pageSettingsGridSize" class="prop-input" type="text" placeholder="4x4" pattern="[0-9]+x[0-9]+" />
          <div style="font-size:10px; color:var(--muted); margin-top:4px;">Format: rows×columns, e.g. 2x3, 4x4</div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="pageSettingsSave" class="btn btn-secondary">Save Changes</button>
    </div>
  </div>
</div>

<!-- Device Settings Modal -->
<div id="deviceSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Device Settings</div>
      <button id="deviceSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="settings-grid">
        <!-- PRIMARY SETTINGS (Top 2x2 Grid) -->
        <div class="primary-settings-grid">
          <div class="field">
            <div class="prop-label">Friendly Name</div>
            <input id="deviceName" class="prop-input" type="text" placeholder="My E-Ink Device" />
          </div>

          <div class="field" id="renderingModeField">
            <div class="prop-label">Rendering Mode</div>
            <select id="renderingMode" class="prop-input">
              <option value="direct">Direct (Display Lambda)</option>
              <option value="lvgl">LVGL (Recommended for LCD)</option>
              <option value="c">C/C++ Drawing Code</option>
              <option value="oepl">OpenEpaperLink JSON (Drawing Protocol)</option>
              <option value="opendisplay">OpenDisplay JSON (ODP)</option>
            </select>
          </div>

          <div class="field">
            <div class="prop-label">Screen Orientation</div>
            <select id="deviceOrientation" class="prop-input">
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="landscape_inverted">Landscape (180 degrees)</option>
              <option value="portrait_inverted">Portrait (270 degrees)</option>
            </select>
          </div>
        </div>

        <!-- SECONDARY SETTINGS (Left Column) -->
        <div class="settings-column">
          <!-- Dynamic Hardware Profile Section (ESPHome Only) -->
          <div class="field" id="deviceModelField"
            style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 8px;">
            <div class="prop-label" style="display:flex; justify-content:space-between; align-items:center;">
              <span>Hardware Profile</span>
              <div style="display: flex; gap: 4px;">
                <button id="reloadHardwareBtn" class="btn btn-secondary btn-xs"
                  style="font-size: 10px; padding: 2px 6px;" title="Reload hardware profiles from server">⟳
                  Reload</button>
                <button id="importHardwareBtn" class="btn btn-secondary btn-xs"
                  style="font-size: 10px; padding: 2px 6px;">Import Recipe</button>
              </div>
            </div>
            <select id="deviceModel" class="prop-input">
              <option value="custom">Custom Profile...</option>
            </select>
            <input type="file" id="hardwareFileInput" accept=".yaml" style="display:none;" />
          </div>

          <!-- OpenEpaperLink Settings -->
          <div id="oeplSettingsSection" style="display:none;">
            <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
              OpenEpaperLink Configuration</div>
            <div class="field">
              <div class="prop-label">OEPL Tag Entity ID</div>
              <input id="oeplEntityId" class="prop-input" type="text" placeholder="open_epaper_link.0000000000000000" />
            </div>
            <div class="field">
              <div class="prop-label">Dithering Algorithm</div>
              <select id="oeplDither" class="prop-input">
                <option value="0">None (Faster)</option>
                <option value="1">Ordered</option>
                <option value="2" selected>Burkes (Recommended)</option>
                <option value="3">Atkinson</option>
                <option value="4">Floyd-Steinberg</option>
                <option value="5">Jarvis-Judice-Ninke</option>
                <option value="6">Stucki</option>
                <option value="7">Sierra</option>
              </select>
            </div>
          </div>

          <!-- OpenDisplay Settings -->
          <div id="odpSettingsSection" style="display:none;">
            <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
              OpenDisplay Configuration (ODP)</div>
            <div class="field">
              <div class="prop-label">ODP Device ID</div>
              <input id="odpDeviceId" class="prop-input" type="text"
                placeholder="95b2d0433f2c26d08088d6296a00a70d" />
            </div>
            <div class="field">
              <div class="prop-label">Dithering Algorithm</div>
              <select id="odpDither" class="prop-input">
                <option value="0">None (Faster)</option>
                <option value="1">Ordered</option>
                <option value="2" selected>Burkes (Recommended)</option>
                <option value="3">Atkinson</option>
                <option value="4">Floyd-Steinberg</option>
                <option value="5">Jarvis-Judice-Ninke</option>
                <option value="6">Stucki</option>
                <option value="7">Sierra</option>
              </select>
            </div>
            <div class="field">
              <div class="prop-label">Update Interval (TTL)</div>
              <input id="odpTtl" class="prop-input" type="number" min="0" placeholder="60" />
              <div style="font-size:9px; color:var(--muted); margin-top:4px;">In seconds. 0 = never expires.</div>
            </div>
          </div>

          <!-- Custom Hardware Section -->
          <div id="customHardwareSection"
            style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
            <div
              style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                </path>
              </svg>
              Custom Hardware Pinout
            </div>

            <div class="hardware-group" style="border:none; margin:0; padding:0;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Chip Type</div>
                  <select id="customChip" class="prop-input-sm">
                    <option value="esp32-s3">ESP32-S3</option>
                    <option value="esp32-p4">ESP32-P4</option>
                    <option value="esp32">ESP32</option>
                    <option value="esp32-c3">ESP32-C3</option>
                    <option value="esp32-c6">ESP32-C6</option>
                    <option value="rp2040">RP2040</option>
                    <option value="rp2350">RP2350</option>
                    <option value="esp8266">ESP8266 (Experimental)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Tech</div>
                  <select id="customTech" class="prop-input-sm">
                    <option value="lcd">LCD / OLED</option>
                    <option value="epaper">E-Paper</option>
                  </select>
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Resolution Preset</div>
                  <select id="customResPreset" class="prop-input-sm">
                    <option value="custom">Manual...</option>
                    <!-- LCD / OLED -->
                    <optgroup label="LCD / OLED">
                      <option value="128x64">128x64 (0.96")</option>
                      <option value="128x128">128x128 (1.44")</option>
                      <option value="240x240">240x240 (1.3/1.54")</option>
                      <option value="320x240">320x240 (2.4/2.8")</option>
                      <option value="320x480">320x480 (3.5")</option>
                      <option value="480x320">480x320 (3.5" alt)</option>
                      <option value="480x480">480x480 (Round/Square)</option>
                      <option value="800x480">800x480 (4-7")</option>
                      <option value="1024x600">1024x600 (7-10")</option>
                    </optgroup>
                    <!-- E-Paper -->
                    <optgroup label="E-Paper">
                      <option value="250x122">2.13" (250x122)</option>
                      <option value="296x128">2.9" (296x128)</option>
                      <option value="400x300">4.2" (400x300)</option>
                      <option value="600x448">5.65" (600x448 7-Color)</option>
                      <option value="640x384">5.83" (640x384)</option>
                      <option value="800x480">7.5" (800x480)</option>
                      <option value="880x528">7.5" HD (880x528)</option>
                    </optgroup>
                  </select>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Shape</div>
                  <select id="customShape" class="prop-input-sm">
                    <option value="rect">Rectangle</option>
                    <option value="round">Round</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <div class="prop-label" style="font-size:10px;">Manual Resolution</div>
                <input id="customRes" class="prop-input-sm" type="text" placeholder="800x480" value="800x480" />
              </div>
              <div style="display:flex; gap:16px; margin-top:8px;">
                <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                  <input id="customPsram" type="checkbox" checked />
                  <span>PSRAM</span>
                </label>
                <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                  <input id="customAntiburn" type="checkbox" />
                  <span>Anti-burn (LCD)</span>
                </label>
              </div>
            </div>

            <!-- GPIO Pin Datalists (allows dropdown + free text) -->
            <datalist id="gpio-pins-esp32">
              <option value="">— None —</option>
              <option value="GPIO0">GPIO0 (boot)</option>
              <option value="GPIO1">GPIO1 (TX)</option>
              <option value="GPIO2">GPIO2</option>
              <option value="GPIO3">GPIO3 (RX)</option>
              <option value="GPIO4">GPIO4</option>
              <option value="GPIO5">GPIO5</option>
              <option value="GPIO12">GPIO12</option>
              <option value="GPIO13">GPIO13</option>
              <option value="GPIO14">GPIO14</option>
              <option value="GPIO15">GPIO15</option>
              <option value="GPIO16">GPIO16</option>
              <option value="GPIO17">GPIO17</option>
              <option value="GPIO18">GPIO18 (VSPI CLK)</option>
              <option value="GPIO19">GPIO19 (VSPI MISO)</option>
              <option value="GPIO21">GPIO21 (I2C SDA)</option>
              <option value="GPIO22">GPIO22 (I2C SCL)</option>
              <option value="GPIO23">GPIO23 (VSPI MOSI)</option>
              <option value="GPIO25">GPIO25</option>
              <option value="GPIO26">GPIO26</option>
              <option value="GPIO27">GPIO27</option>
              <option value="GPIO32">GPIO32</option>
              <option value="GPIO33">GPIO33</option>
              <option value="GPIO34">GPIO34 (input only)</option>
              <option value="GPIO35">GPIO35 (input only)</option>
              <option value="GPIO36">GPIO36 (input only)</option>
              <option value="GPIO39">GPIO39 (input only)</option>
            </datalist>
            <datalist id="gpio-pins-esp32s3">
              <option value="">— None —</option>
              <option value="GPIO0">GPIO0</option>
              <option value="GPIO1">GPIO1</option>
              <option value="GPIO2">GPIO2</option>
              <option value="GPIO3">GPIO3</option>
              <option value="GPIO4">GPIO4</option>
              <option value="GPIO5">GPIO5</option>
              <option value="GPIO6">GPIO6</option>
              <option value="GPIO7">GPIO7</option>
              <option value="GPIO8">GPIO8</option>
              <option value="GPIO9">GPIO9</option>
              <option value="GPIO10">GPIO10</option>
              <option value="GPIO11">GPIO11</option>
              <option value="GPIO12">GPIO12</option>
              <option value="GPIO13">GPIO13</option>
              <option value="GPIO14">GPIO14</option>
              <option value="GPIO15">GPIO15</option>
              <option value="GPIO16">GPIO16</option>
              <option value="GPIO17">GPIO17</option>
              <option value="GPIO18">GPIO18</option>
              <option value="GPIO19">GPIO19</option>
              <option value="GPIO20">GPIO20</option>
              <option value="GPIO21">GPIO21</option>
              <option value="GPIO38">GPIO38</option>
              <option value="GPIO39">GPIO39</option>
              <option value="GPIO40">GPIO40</option>
              <option value="GPIO41">GPIO41</option>
              <option value="GPIO42">GPIO42</option>
              <option value="GPIO45">GPIO45</option>
              <option value="GPIO46">GPIO46</option>
              <option value="GPIO47">GPIO47</option>
              <option value="GPIO48">GPIO48</option>
            </datalist>
            <datalist id="gpio-pins-esp8266">
              <option value="">— None —</option>
              <option value="GPIO16">GPIO16 (D0 - Wake)</option>
              <option value="GPIO5">GPIO5 (D1 - SCL)</option>
              <option value="GPIO4">GPIO4 (D2 - SDA)</option>
              <option value="GPIO0">GPIO0 (D3 - Flash)</option>
              <option value="GPIO2">GPIO2 (D4 - LED)</option>
              <option value="GPIO14">GPIO14 (D5 - SCK)</option>
              <option value="GPIO12">GPIO12 (D6 - MISO)</option>
              <option value="GPIO13">GPIO13 (D7 - MOSI)</option>
              <option value="GPIO15">GPIO15 (D8 - CS)</option>
              <option value="GPIO3">GPIO3 (RX)</option>
              <option value="GPIO1">GPIO1 (TX)</option>
              <option value="GPIO10">GPIO10 (SD3 - Flash)</option>
              <option value="GPIO9">GPIO9 (SD2 - Flash)</option>
            </datalist>
            <datalist id="gpio-pins-rp2">
              <option value="">— None —</option>
              <option value="GPIO0">GPIO0</option>
              <option value="GPIO1">GPIO1</option>
              <option value="GPIO2">GPIO2</option>
              <option value="GPIO3">GPIO3</option>
              <option value="GPIO4">GPIO4</option>
              <option value="GPIO5">GPIO5</option>
              <option value="GPIO6">GPIO6</option>
              <option value="GPIO7">GPIO7</option>
              <option value="GPIO8">GPIO8</option>
              <option value="GPIO9">GPIO9</option>
              <option value="GPIO10">GPIO10</option>
              <option value="GPIO11">GPIO11</option>
              <option value="GPIO12">GPIO12</option>
              <option value="GPIO13">GPIO13</option>
              <option value="GPIO14">GPIO14</option>
              <option value="GPIO15">GPIO15</option>
              <option value="GPIO16">GPIO16</option>
              <option value="GPIO17">GPIO17</option>
              <option value="GPIO18">GPIO18</option>
              <option value="GPIO19">GPIO19</option>
              <option value="GPIO20">GPIO20</option>
              <option value="GPIO21">GPIO21</option>
              <option value="GPIO22">GPIO22</option>
              <option value="GPIO23">GPIO23</option>
              <option value="GPIO24">GPIO24</option>
              <option value="GPIO25">GPIO25</option>
              <option value="GPIO26">GPIO26</option>
              <option value="GPIO27">GPIO27</option>
              <option value="GPIO28">GPIO28</option>
              <option value="GPIO29">GPIO29</option>
            </datalist>

            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Display Interface</div>
              <select id="customDisplayDriver" class="prop-input-sm" style="margin-bottom:8px;">
                <option value="mipi_dsi">MIPI DSI (ESP32-P4)</option>
                <option value="mipi_spi">MIPI SPI / DBI</option>
                <option value="mipi_rgb">MIPI RGB</option>
                <option value="rpi_dpi_rgb">MIPI RGB / Parallel RGB (rpi_dpi_rgb)</option>
                <option value="st7701s">ST7701S (RGB/SPI init)</option>
                <option value="st7789v">ST7789 (LCD)</option>
                <option value="ili9341">ILI9341 (LCD)</option>
                <option value="ili9342">ILI9342 (LCD)</option>
                <option value="ili9488">ILI9488 (LCD)</option>
                <option value="waveshare_epaper">Waveshare E-Paper</option>
                <option value="epaper_spi">Generic SPI E-Paper</option>
                <option value="custom">Other (Custom YAML)</option>
              </select>

              <div id="customDisplayModelField" class="field" style="display:none; margin-bottom:8px;">
                <div class="prop-label" style="font-size:10px;">Display Model</div>
                <input id="customDisplayModel" class="prop-input-sm" type="text" placeholder="e.g. 7.50inV2"
                  list="waveshare_models" />
                <div style="font-size:9px; color:var(--muted);">Required for many e-paper and MIPI panels</div>

                <datalist id="waveshare_models">
                  <option value="1.54in">1.54"</option>
                  <option value="1.54inv2">1.54" V2</option>
                  <option value="2.13in">2.13"</option>
                  <option value="2.13inv2">2.13" V2</option>
                  <option value="2.13inv3">2.13" V3</option>
                  <option value="2.13in-ttgo">2.13" TTGO</option>
                  <option value="2.66in">2.66"</option>
                  <option value="2.70in">2.70"</option>
                  <option value="2.90in">2.90"</option>
                  <option value="2.90inv2">2.90" V2</option>
                  <option value="2.90in-dke">2.90" DKE</option>
                  <option value="3.52in">3.52"</option>
                  <option value="3.70in">3.70"</option>
                  <option value="4.20in">4.20"</option>
                  <option value="4.20inv2">4.20" V2</option>
                  <option value="5.65in">5.65" (Color)</option>
                  <option value="5.83in">5.83"</option>
                  <option value="5.83inv2">5.83" V2</option>
                  <option value="7.50in">7.50"</option>
                  <option value="7.50inv2">7.50" V2</option>
                  <option value="7.50inv2p">7.50" V2 (Partial Refresh)</option>
                  <option value="7.50hd">7.50" HD</option>
                </datalist>
              </div>

              <div id="spiPinsGrid" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">CS</div>
                  <input id="pin_cs" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO10" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">DC</div>
                  <input id="pin_dc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO11" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">RST <span style="opacity:0.5">(opt)</span></div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="(optional)" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_rst" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">BUSY <span style="opacity:0.5">(opt)</span></div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_busy" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="(optional)" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_busy" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">CLK</div>
                  <input id="pin_clk" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO18" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">MOSI</div>
                  <input id="pin_mosi" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO23" />
                </div>
              </div>
            </div>

            <!-- Backlight & I2C Pins -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Backlight & I2C</div>
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Backlight</div>
                  <input id="pin_backlight" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO45" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">I2C SDA</div>
                  <input id="pin_sda" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO21" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">I2C SCL</div>
                  <input id="pin_scl" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO22" />
                </div>
              </div>
            </div>

            <!-- Touch Controller -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Touch Controller</div>
              <select id="customTouchTech" class="prop-input-sm" style="margin-bottom:8px;">
                <option value="none">None</option>
                <option value="gt911">GT911 (I2C)</option>
                <option value="cst816">CST816 (I2C)</option>
                <option value="ft5x06">FT5x06 (I2C)</option>
                <option value="st7123">ST7123 (I2C)</option>
                <option value="xpt2046">XPT2046 (SPI)</option>
              </select>
              <div id="touchPinsGrid" style="display:none; grid-template-columns:1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Touch INT</div>
                  <input id="pin_touch_int" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO4" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Touch RST</div>
                  <input id="pin_touch_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO5" />
                </div>
              </div>
            </div>

            <!-- Power / Battery -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Power / Battery</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Battery ADC <span style="opacity:0.5">(opt)</span>
                  </div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_battery_adc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="e.g. GPIO1" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_battery_adc" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Battery Enable <span style="opacity:0.5">(opt)</span>
                  </div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_battery_enable" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="e.g. GPIO21" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_battery_enable" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
              </div>
              <div style="font-size:9px; color:var(--muted); margin-top:4px;">ADC pin reads battery voltage. Enable
                pin powers battery circuit (optional).</div>
            </div>

            <div class="field" style="margin-top:12px; border-top:1px solid var(--border-subtle); padding-top:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:0;">Recipe Name</div>
                <div id="customProfileEditIndicator"
                  style="display:none; font-size:9px; color:var(--warning); font-weight:bold; background:rgba(255,165,0,0.1); padding:2px 6px; border-radius:4px;">
                  Editing
                </div>
              </div>
              <input id="customProfileName" class="prop-input-sm" type="text" placeholder="e.g. My Custom S3" />
            </div>

            <button id="saveCustomProfileBtn" class="btn btn-primary btn-full" type="button" style="margin-top:12px;">
              🚀 Save Profile
            </button>
          </div>

          <!-- Protocol Hardware Section (OEPL / ODP) -->
          <div id="protocolHardwareSection"
            style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
            <div
              style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Protocol Hardware Specs
            </div>

            <div class="field">
              <div class="prop-label">Resolution Preset</div>
              <select id="protocolResPreset" class="prop-input">
                <option value="custom">Manual...</option>
                <option value="296x128">2.9" (296x128)</option>
                <option value="400x300">4.2" (400x300)</option>
                <option value="800x480">7.5" (800x480)</option>
                <option value="640x384">5.83" (640x384)</option>
                <option value="250x122">2.13" (250x122)</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div class="field">
                <div class="prop-label">Width</div>
                <input id="protocolWidth" class="prop-input" type="number" value="400" />
              </div>
              <div class="field">
                <div class="prop-label">Height</div>
                <input id="protocolHeight" class="prop-input" type="number" value="300" />
              </div>
            </div>

            <div class="field">
              <div class="prop-label">Color Mode</div>
              <select id="protocolColorMode" class="prop-input">
                <option value="bw">Monochrome (B/W)</option>
                <option value="grayscale">Grayscale</option>
                <option value="color_3">3-Color (BWR / BWY)</option>
                <option value="full_color">Full Color</option>
              </select>
            </div>
          </div>

          <!-- Global Preferences -->
          <div class="field" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="deviceDarkMode" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:600;">Dark Mode</span>
            </label>
          </div>

          <div class="field" id="deviceInvertedColorsField">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="deviceInvertedColors" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:600;">Inverted Colors (E-Paper)</span>
            </label>
          </div>
        </div>
      </div>

      <div id="powerStrategySection"
        style="border-top:1px solid var(--border-subtle); margin-top:16px; padding-top:16px;">
        <div class="prop-label">Power & Refresh Strategy</div>

        <div id="global-refresh-row"
          style="margin-top: 12px; margin-bottom: 16px; background: rgba(82, 199, 234, 0.05); padding: 10px; border-radius: 6px; border-left: 3px solid var(--accent);">
          <div class="prop-label" style="font-size: 11px; margin-bottom: 4px;">Global Refresh Interval</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="number" id="setting-refresh-interval" class="prop-input" placeholder="600" style="width: 80px;"
              min="5">
            <span style="font-size: 11px; opacity: 0.7;">seconds</span>
          </div>
          <div style="font-size: 10px; opacity: 0.6; margin-top: 4px;">Default time between updates. Can be overridden
            on individual pages.</div>
        </div>

        <!-- E-Paper Specific Strategies -->
        <div id="strategy-epaper-group" style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
          <div
            style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
            E-Paper Options</div>

          <!-- Standard -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="mode-standard" name="powerStrategy" value="standard">
              Full Power (Always On)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Device stays connected to Wi-Fi. Fast
              response, but high battery drain.</div>
          </div>

          <!-- Night Mode -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-sleep-enabled" name="powerStrategy" value="night">
              Eco (Scheduled Night Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Stops refreshing during
              these hours to save energy.</div>
          </div>

          <!-- Daily Refresh -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-daily-refresh-enabled" name="powerStrategy" value="daily">
              Daily Scheduled Refresh
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Wakes up once per day at a
              specific time.</div>
          </div>

          <!-- Manual Only -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-manual-refresh" name="powerStrategy" value="manual">
              Manual Refresh Only
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Never updates automatically. Only refreshes
              when a button is pressed.</div>
          </div>

          <!-- Deep Sleep -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-deep-sleep-enabled" name="powerStrategy" value="deepsleep">
              Ultra Eco (Deep Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Shuts down completely
              between updates. Best for battery life.</div>
          </div>
        </div>

        <div id="strategy-lcd-group" style="display:none; flex-direction:column; gap:12px; margin-top:8px;">
          <div
            style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
            LCD / OLED Options</div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="always_on">
              Always On (Full Brightness)
            </label>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="backlight_off">
              Eco (Backlight Off Schedule)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight during sleep hours
              (recommended for LCD).</div>
          </div>

          <div id="lcd-strategy-dim-row">
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="dim_after_timeout">
              Eco (Dim after timeout)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight and pauses LVGL after
              period of inactivity. Resume on touch.</div>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="halt_updates">
              Eco (Halt Loop)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Stops update cycle but leaves screen powered.
            </div>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="deep_sleep">
              Ultra Eco (Deep Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Power down between updates.</div>
          </div>
        </div>

        <!-- Dim Timeout (Used by LCD Dim after timeout) -->
        <div id="dim-timeout-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Dim after</span>
          <input type="number" id="setting-dim-timeout" class="prop-input" placeholder="10" style="width:80px;" min="1"
            value="10">
          <span style="font-size: 11px; opacity: 0.7;">seconds</span>
        </div>

        <!-- Common Sleep Times (Used by both) -->
        <div id="sleep-times-row"
          style="display:none; flex-direction:column; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 8px; border-radius: 4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 11px; opacity: 0.7;">Sleep from</span>
            <select id="setting-sleep-start" class="prop-input" style="width:70px;">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
            <span style="font-size: 11px; opacity: 0.7;">to</span>
            <select id="setting-sleep-end" class="prop-input" style="width:70px;">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
          </div>
        </div>

        <div id="daily-refresh-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Refresh at</span>
          <input type="time" id="setting-daily-refresh-time" class="prop-input" value="08:00" style="width:100px;">
        </div>

        <div id="deep-sleep-interval-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Update every</span>
          <input type="number" id="setting-deep-sleep-interval" class="prop-input" placeholder="Seconds"
            style="width:80px;">
          <span style="font-size: 11px; opacity: 0.7;">sec</span>
        </div>

        <div id="deep-sleep-options-row"
          style="display:none; flex-direction:column; gap:6px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 8px 10px; border-radius: 4px;">
          <div style="font-size:10px; font-weight:600; opacity:0.5; text-transform:uppercase; margin-bottom:2px;">Deep
            Sleep Options</div>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:11px;">
            <input type="checkbox" id="setting-deep-sleep-stay-awake">
            <span>HA Stay-Awake Switch</span>
          </label>
          <div style="font-size:9px; opacity:0.5; margin-left:22px; margin-top:-2px;">Adds a Home Assistant switch to
            prevent deep sleep remotely.</div>
          <label id="deep-sleep-stay-awake-entity-row"
            style="display:flex; flex-direction:column; gap:4px; margin-left:22px; font-size:10px;">
            <span style="opacity:0.7;">Home Assistant entity ID</span>
            <input type="text" id="setting-deep-sleep-stay-awake-entity" class="prop-input"
              placeholder="input_boolean.esphome_stay_awake">
          </label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:11px;">
            <input type="checkbox" id="setting-deep-sleep-firmware-guard">
            <span>Firmware Flash Guard</span>
          </label>
          <div style="font-size:9px; opacity:0.5; margin-left:22px; margin-top:-2px;">Keeps device awake 90s after new
            firmware to prevent rollback.</div>
        </div>

        <!-- Silent Hours -->
        <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
          <div
            style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 500; color: var(--accent);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M17.22 17.22L2 2M12 2v2M4.93 4.93l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41M12 22v-2m7.07-2.93l-1.41-1.41M22 12h-2m-3.34-5.66l1.41-1.41M12 7a5 5 0 015 5 4.94 4.94 0 01-.46 2.06M12 17a5 5 0 01-5-5 4.94 4.94 0 01.46-2.06">
              </path>
            </svg>
            Silent Hours (No Refresh Window)
          </div>
          <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Prevent all display
            updates
            during this time window. Used to avoid night-time ghosts/noise.</div>
          <div
            style="display:flex; align-items:center; gap:8px; margin-left:24px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
            <span style="font-size: 11px; opacity: 0.7;">Disable updates from</span>
            <select id="setting-no-refresh-start" class="prop-input" style="width:70px;">
              <option value="">None</option>
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
            <span style="font-size: 11px; opacity: 0.7;">to</span>
            <select id="setting-no-refresh-end" class="prop-input" style="width:70px;">
              <option value="">None</option>
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
          </div>
        </div>

        <!-- Page Auto-Cycling -->
        <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
          <div
            style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 600; color: var(--accent);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Page Auto-Cycling
          </div>
          <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Automatically cycle
            through
            pages on a timer.</div>
          <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="setting-auto-cycle" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:500;">Enable Automatic Page Cycling</span>
            </label>
            <div id="field-auto-cycle-interval"
              style="display:none; align-items:center; gap:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
              <span style="font-size: 11px; opacity: 0.7;">Cycle every</span>
              <input type="number" id="setting-auto-cycle-interval" class="prop-input" min="5" placeholder="30"
                style="width:80px;">
              <span style="font-size: 11px; opacity: 0.7;">seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="deviceSettingsSave" class="btn btn-secondary">Apply Settings</button>
    </div>
  </div>
</div>

<!-- Save Profile Modal -->
<div id="saveProfileModal" class="modal-backdrop hidden" style="z-index: 2000;">
  <div class="modal" style="max-width: 400px;">
    <div class="modal-header">
      <div>Save Hardware Profile</div>
      <button id="saveProfileClose" class="btn btn-secondary">Cancel</button>
    </div>
    <div class="modal-body">
      <div style="font-size: 11px; opacity: 0.7; margin-bottom: 12px;">
        Give your custom hardware configuration a unique name. It will be saved as a reusable recipe.
      </div>
      <div class="field">
        <div class="prop-label">Profile Name</div>
        <input id="saveProfileName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
      </div>
    </div>
    <div class="modal-actions">
      <button id="saveProfileConfirm" class="btn btn-secondary"
        style="background: var(--accent); color: white; border: none;">Save Profile</button>
    </div>
  </div>
</div>

<!-- Editor Settings Modal -->
<div id="editorSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Editor Preferences</div>
      <button id="editorSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <!-- CATEGORY: VIEW & THEME -->
      <div class="settings-category collapsible expanded" data-category="view">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-eye-outline"></span>
            <span>View & Theme</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorShowGrid" checked> <span>Show Grid</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorSnapToGrid" checked> <span>Enable Snapping</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorShowConditionalWidgets"> <span>Show conditionally hidden widgets</span>
            </label>
            <div style="margin-top:12px;">
              <div class="prop-label">Grid Opacity</div>
              <input type="range" id="editorGridOpacity" min="0" max="100" step="1" value="8" style="width:100%;">
            </div>
          </div>
          <div class="field">
            <div class="prop-label">C/C++ Output</div>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorCIncludeComments" checked> <span>Include comments</span>
            </label>
          </div>
          <div class="field">
            <div class="prop-label">Interface Theme</div>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorLightMode"> <span>Use Light Mode interface</span>
            </label>
          </div>
          <div class="field">
            <div class="prop-label">Saving</div>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorAutoSave" checked> <span>Automatically save layout changes</span>
            </label>
          </div>
        </div>
      </div>

      <!-- CATEGORY: FONT SETTINGS -->
      <div class="settings-category collapsible" data-category="fonts">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-format-font"></span>
            <span>Font Settings</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <div class="prop-label">Global Glyphsets</div>
            <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Select glyphsets to include language specific
              characters (like å, ö, ä) in the generated YAML for all fonts.</div>
            <div id="editorGlyphsets"
              style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Kernel"> <span>Latin Kernel <small
                    style="opacity:0.6">(Basic A-Z, 0-9)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Core"> <span>Latin Core <small
                    style="opacity:0.6">(å, ö, ä, é, ß...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Arabic_Core"> <span>Arabic Core <small
                    style="opacity:0.6">(ا, ب, ت...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Cyrillic_Core"> <span>Cyrillic <small
                    style="opacity:0.6">(А, Б, В...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Greek_Core"> <span>Greek <small
                    style="opacity:0.6">(α, β, γ...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_African"> <span>Latin African</span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_PriAfrican"> <span>Latin
                  PriAfrican</span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Vietnamese"> <span>Vietnamese <small
                    style="opacity:0.6">(à, á, ả...)</small></span>
              </label>
            </div>
            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.08);">
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" id="editorExtendedLatinGlyphs">
                <span>Extended Latin Glyphs <small style="opacity:0.6">(Manual fallback: €, µ, Ω, ™ + full
                    Latin-1)</small></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- CATEGORY: CONNECTIVITY -->
      <div class="settings-category collapsible" data-category="ha">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-home-assistant"></span>
            <span>Home Assistant</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <div class="prop-label">Resources</div>
            <button id="editorRefreshEntities" class="btn btn-secondary btn-xs">Refresh Entity List</button>
            <span id="editorEntityCount" style="font-size:var(--fs-xs); opacity:0.6; margin-left:8px;"></span>
          </div>
          <div class="field">
            <div class="prop-label">Connection Settings</div>
            <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure this if you are using the
              GitHub-hosted version or an external URL.</div>
            <form id="editorHaSettingsForm" style="display:flex; flex-direction:column; gap:8px;" onsubmit="return false;">
              <input type="text" name="haRuntimeUser" autocomplete="username" tabindex="-1" aria-hidden="true"
                style="position:absolute; left:-10000px; width:1px; height:1px; opacity:0; pointer-events:none;" />
              <div id="haCorsTip"
                style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4;">
                <strong>💡 Connection Tip:</strong><br>
                If requests are blocked, you may need to add <code id="haOriginPlaceholder">http://localhost:8000</code>
                to <code>cors_allowed_origins</code> and
                <strong>restart HA</strong>.
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Base URL</div>
                <input type="text" id="haManualUrl" class="prop-input" placeholder="https://your-ha.duckdns.org:8123" autocomplete="url" />
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Long-Lived Access Token</div>
                <input type="password" id="haLlatToken" class="prop-input" placeholder="Paste your token here..." autocomplete="current-password" />
              </div>
              <!-- Warning shown only when deployed within HA -->
              <div id="haDeployedWarning" class="hidden"
                style="background: rgba(46, 204, 113, 0.1); border-left: 3px solid #2ecc71; padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4; color: #2ecc71;">
                <strong>✅ Deployed in Home Assistant:</strong><br>
                Connection is handled automatically. These settings are locked to prevent configuration errors.
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="editorTestHaBtn" class="btn btn-secondary btn-xs" style="flex:1;">Test Connection</button>
                <div id="haTestResult" style="font-size:10px; line-height: 1.2;"></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- CATEGORY: AI ASSISTANT -->
      <div class="settings-category collapsible" data-category="ai">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-robot-outline"></span>
            <span>AI Integration (LLM)</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure Gemini, OpenAI or OpenRouter to use
            natural language prompts.</div>
          <form id="editorAiSettingsForm" class="field" style="display:flex; flex-direction:column; gap:8px;" onsubmit="return false;">
            <input type="text" name="aiProviderUser" autocomplete="username" tabindex="-1" aria-hidden="true"
              style="position:absolute; left:-10000px; width:1px; height:1px; opacity:0; pointer-events:none;" />
            <div>
              <div class="prop-label" style="font-size: 10px;">Provider</div>
              <select id="aiProvider" class="prop-input">
                <option value="gemini">Google Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="openrouter">OpenRouter</option>
                <option value="minimax">MiniMax</option>
                <option value="glm">GLM (Z.AI / Zhipu)</option>
              </select>
            </div>
            <div id="aiKeyGeminiRow">
              <div class="prop-label" style="font-size: 10px;">Gemini API Key</div>
              <input type="password" id="aiApiKeyGemini" class="prop-input" placeholder="Paste Gemini key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyOpenaiRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">OpenAI API Key</div>
              <input type="password" id="aiApiKeyOpenai" class="prop-input" placeholder="Paste OpenAI key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyOpenrouterRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">OpenRouter API Key</div>
              <input type="password" id="aiApiKeyOpenrouter" class="prop-input" placeholder="Paste OpenRouter key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyMinimaxRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">MiniMax API Key</div>
              <input type="password" id="aiApiKeyMinimax" class="prop-input" placeholder="Paste MiniMax key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyGlmRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">GLM (Z.AI) API Key</div>
              <input type="password" id="aiApiKeyGlm" class="prop-input" placeholder="Paste GLM / Z.AI key..." autocomplete="new-password" />
            </div>
            <div>
              <div class="prop-label" style="font-size: 10px;">Model Filter (e.g. "free", "flash", "gpt-4")</div>
              <div style="display:flex; gap:4px; align-items: center;">
                <input type="text" id="aiModelFilter" class="prop-input" placeholder="Filter models..."
                  style="flex:1;" autocomplete="off" />
                <button id="aiRefreshModelsBtn" class="btn btn-secondary btn-xs">Test & Load Models</button>
                <div id="aiTestResult" style="font-size:10px; line-height: 1.2;"></div>
              </div>
            </div>
            <div>
              <div class="prop-label" style="font-size: 10px;">Selected Model</div>
              <select id="aiModelSelect" class="prop-input"></select>
            </div>
          </form>
        </div>
      </div>

      <!-- CATEGORY: SHORTCUTS -->
      <div class="settings-category collapsible" data-category="shortcuts">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-keyboard-outline"></span>
            <span>Keyboard Shortcuts</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="shortcuts-grid">
            <div class="shortcut-item"><span class="shortcut-label">Undo</span><span
                class="shortcut-key"><kbd>Ctrl+Z</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Redo</span><span
                class="shortcut-key"><kbd>Ctrl+Y</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Copy</span><span
                class="shortcut-key"><kbd>Ctrl+C</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Paste</span><span
                class="shortcut-key"><kbd>Ctrl+V</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Delete</span><span
                class="shortcut-key"><kbd>DEL</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Lock/Unlock</span><span
                class="shortcut-key"><kbd>Ctrl+L</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Search</span><span
                class="shortcut-key"><kbd>Shift+Space</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Debug Mode</span><span
                class="shortcut-key"><kbd>D</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Design Grid</span><span
                class="shortcut-key"><kbd>G</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Rulers</span><span
                class="shortcut-key"><kbd>R</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Zoom Reset</span><span
                class="shortcut-key"><kbd>Ctrl+R</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Snap Off</span><span
                class="shortcut-key"><kbd>ALT</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Distances</span><span class="shortcut-key"><kbd>CTRL
                  Drag</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Group</span><span
                class="shortcut-key"><kbd>Ctrl+G</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Ungroup</span><span
                class="shortcut-key"><kbd>Ctrl+Shift+G</kbd></span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="editorSettingsDone" class="btn btn-secondary">Done</button>
    </div>
  </div>
</div>

<!-- AI Prompt Modal -->
<div id="aiPromptModal" class="modal-backdrop hidden">
  <div class="modal" style="max-width: 600px;">
    <div class="modal-header">
      <div>AI Design Assistant</div>
      <button id="aiPromptClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div id="aiConfigWarning"
        style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 11px; margin-bottom: 12px; line-height: 1.4;">
        <strong>💡 Configuration Required:</strong><br>
        An API provider and key must be configured in <strong>Editor Settings</strong> before using the AI
        Assistant.
        <button id="aiOpenEditorSettingsBtn" class="btn btn-secondary btn-xs" style="margin-top:8px; display:block;">⚙
          Open Editor
          Settings</button>
      </div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 12px;">
        Describe what you want to change. Example: "Move the selected widget 50px right" or "Make a nice weather
        layout with 4 days forecast".
      </div>
      <textarea id="aiPromptInput" class="prop-input"
        style="height: 120px; font-size: 14px; line-height: 1.5; padding: 12px;" placeholder="I want to..."></textarea>

      <div id="aiPromptStatus" style="margin-top: 12px; font-size: 11px; min-height: 1.2em;"></div>

      <div id="aiPreviewDiff"
        style="display:none; margin-top:16px; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden;">
        <div
          style="background: rgba(255,255,255,0.03); padding: 8px 12px; font-size: 10px; font-weight: 600; border-bottom: 1px solid var(--border-subtle);">
          PREVIEW CHANGES</div>
        <div id="aiDiffContent"
          style="padding: 12px; font-family: monospace; font-size: 11px; max-height: 200px; overflow-y: auto; white-space: pre-wrap; background: var(--bg-input);">
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="aiPromptSubmit" class="btn btn-primary"
        style="background: var(--accent); color: white; border: none;">Generate</button>
      <button id="aiPromptApply" class="btn btn-success" style="display:none;">Apply</button>
    </div>
  </div>
</div>
`,Wa=""+new URL("logo_header-CUGdaeC6.png",import.meta.url).href,Fa=["header-placeholder","sidebar-placeholder","code-panel-placeholder","properties-panel-placeholder","modals-placeholder"],za=[".header-shell",".sidebar-shell",".code-shell",".properties-shell",".modal-shell"];function we(t,e){const n=document.getElementById(t);n?n.outerHTML=e:console.warn(`[UI Injection] Placeholder #${t} not found in index.html.`)}function Vn(){return Fa.some(t=>document.getElementById(t))}function Ya(){return za.some(t=>document.querySelector(t))}function $a(){if(v.log("[UI Injection] Loading modular UI components..."),!Vn()&&Ya()){v.log("[UI Injection] Construction complete.");return}let t=Ga.replace("assets/logo_header.png",Wa);we("header-placeholder",t),we("sidebar-placeholder",Ha),we("code-panel-placeholder",Ra),we("properties-panel-placeholder",Ba),we("modals-placeholder",Na),v.log("[UI Injection] Construction complete.")}Vn()&&$a();const Tt="__ESPHOME_DESIGNER_BOOT_PROMISE__";function qn(t=globalThis){return t.ESPHomeDesigner=t.ESPHomeDesigner||{},t.ESPHomeDesigner}function Rs(t=document){return!!(t.getElementById("header-placeholder")||t.querySelector(".app-content")||t.getElementById("widgetPalette")||t.getElementById("canvas")||t.querySelector("[data-esphome-designer-panel-root]"))}function Bs(t=document){return!!(t.getElementById("header-placeholder")||t.getElementById("sidebar-placeholder")||t.getElementById("code-panel-placeholder")||t.getElementById("properties-panel-placeholder")||t.getElementById("modals-placeholder"))}function Ns(t,e=globalThis){const n=qn(e);n.app=t,n.ui={sidebar:t.sidebar,canvas:t.canvas,properties:t.propertiesPanel}}function Ws(t,e=globalThis){const n=qn(e);n.state=t}function Fs(t=globalThis){return t[Tt]||null}function zs(t,e=globalThis){return e[Tt]=t,t}function Ys(t=globalThis){delete t[Tt]}function $s({label:t,load:e,create:n}){let i=null,o=null;return async()=>{if(i)return i;o||(o=Promise.resolve(e()).then(async a=>{const s=await n(a);return i=s,v.log(`[App] ${t} lazy-loaded`),s}).catch(a=>{throw o=null,a}));const r=await o;return i=r,r}}const Xn={getColorConst:t=>{if(!t)return"COLOR_BLACK";const e=t.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="theme_auto_inverse"||e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),i=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);return`Color(${n}, ${i}, ${o})`}return cn[e]||"COLOR_BLACK"},getAlignX:(t,e,n)=>t.includes("LEFT")?`${e}`:t.includes("RIGHT")?`${e} + ${n}`:`${e} + ${n}/2`,getAlignY:(t,e,n)=>t.includes("TOP")?`${e}`:t.includes("BOTTOM")?`${e} + ${n}`:`${e} + ${n}/2`,sanitize:t=>t?t.replace(/"/g,'\\"'):"",addDitherMask:(t,e,n,i,o,r,a,s=0)=>{if(!n||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),u=parseInt(l.substring(3,5),16),g=parseInt(l.substring(5,7),16);Math.abs(d-u)<15&&Math.abs(u-g)<15&&d>40&&d<210&&(c=!0)}c&&t.push(`          apply_grey_dither_mask(${Math.round(i)}, ${Math.round(o)}, ${Math.round(r)}, ${Math.round(a)});`)},isGrayColor:t=>{if(!t)return!1;const e=t.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),i=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);if(Math.abs(n-i)<15&&Math.abs(i-o)<15&&n>40&&n<210)return!0}return!1},addDitherMaskForText:(t,e,n,i,o,r,a)=>!n||!Xn.isGrayColor(e)?!1:(t.push(`        apply_grey_dither_to_text(${Math.round(i)}, ${Math.round(o)}, ${Math.round(r)}, ${Math.round(a)});`),!0),getIconCode:t=>{if(!t||!yt)return null;const e=yt.find(n=>n.name===t);return e?e.code:null}},_t=globalThis;_t.ESPHomeDesigner=_t.ESPHomeDesigner||{};_t.ESPHomeDesigner.utils=Xn;function Ua(){const t=p.getPagesPayload(),e=JSON.stringify(t,null,2),n=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)}function ja(t){if(!t)return;const e=new FileReader;e.onload=n=>{try{const i=n.target,o=i?i.result:null;if(typeof o!="string")throw new Error("Invalid file content");const r=JSON.parse(o);ue(r)}catch(i){v.error("Failed to parse layout file:",i),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(t)}function Va(t){const e=t.target,n=e?.files?e.files[0]:null;n&&ja(n),e&&(e.value="")}function Us(t,e){if(e)try{if(localStorage.getItem("reterminal-editor-theme")==="light"){t.updateSettings({editor_light_mode:!0}),e.applyEditorTheme(!0);return}e.applyEditorTheme(!1)}catch(n){v.log("Could not load theme preference:",n)}}async function js({loadFromLocalStorage:t,refreshAdapter:e}){try{W()?(v.log("HA Backend detected attempt. Loading layout..."),await ro(),await pe()):(v.log("Running in standalone/offline mode."),t()),e()}catch(n){v.error("[App] Failed to load from backend, falling back to local storage:",n),t(),e()}}function Vs({editorSettings:t,openDeviceSettings:e,openAiPrompt:n,openLayoutManager:i}){const o=document.getElementById("saveLayoutBtn");o&&o.addEventListener("click",async()=>{const u=g=>{Ua(),O(g,"info")};if(!W()){u("Layout downloaded locally");return}try{if(await Sn()){O("Layout saved to Home Assistant","success");return}if(!st()){u("Home Assistant save unavailable; layout downloaded locally instead");return}O("Save failed: Home Assistant backend unavailable","error")}catch(g){if(!st()){u("Home Assistant save failed; layout downloaded locally instead");return}O(`Save failed: ${g.message}`,"error")}});const r=document.getElementById("loadLayoutBtn");r&&r.addEventListener("change",Va);const a=document.getElementById("importLayoutBtn");a&&r&&a.addEventListener("click",()=>{r.click()});const s=document.getElementById("deviceSettingsBtn");s?(v.log("Device Settings button found, binding click listener."),s.addEventListener("click",async()=>{v.log("Device Settings button clicked."),await e()})):v.error("Device Settings button NOT found in DOM.");const l=document.getElementById("editorSettingsBtn");l&&t&&l.addEventListener("click",()=>{t.open()});const c=document.getElementById("aiPromptBtn");c&&c.addEventListener("click",async()=>{await n()});const d=document.getElementById("manageLayoutsBtn");d&&d.addEventListener("click",async()=>{await i()})}function qs(t,e){setTimeout(()=>{t&&(v.log("[App] Forcing initial canvas centering..."),t.focusPage(e,!1))},100)}const Qt=3600,qa=/^(\d+(?:\.\d+)?)([a-z]+)$/i;function Kn(t){if(t==null||t==="")return null;if(typeof t=="number")return Number.isFinite(t)?{value:t,unit:"s"}:null;const e=String(t).trim();if(!e)return null;if(/^\d+(?:\.\d+)?$/.test(e))return{value:parseFloat(e),unit:"s"};const n=e.match(qa);return n?{value:parseFloat(n[1]),unit:n[2].toLowerCase()}:null}function Jn(t){if(!t||!Number.isFinite(t.value))return null;const{value:e,unit:n}=t;return n.startsWith("s")?e:n.startsWith("m")?e*60:n.startsWith("h")?e*3600:n.startsWith("d")?e*86400:n.startsWith("w")?e*604800:null}function Zn(t){if(!t)return Qt;const e=Jn(Kn(t));return Number.isFinite(e)?e:Qt}function Xs(t){const e=Kn(t),n=Jn(e);if(!Number.isFinite(n)||n<=0)return"1h";const i=n/4;return i>=604800?`${Math.max(1,Math.round(i/604800))}w`:i>=86400?`${Math.max(1,Math.round(i/86400))}d`:i>=3600?`${Math.max(1,Math.round(i/3600))}h`:i>=60?`${Math.max(1,Math.round(i/60))}min`:`${Math.max(1,Math.round(i))}s`}function Xa(t){const e=Math.max(0,Number(t)||0);return e>=604800?`-${(e/604800).toFixed(1)}w`:e>=86400?`-${(e/86400).toFixed(1)}d`:e>=3600?`-${(e/3600).toFixed(1)}h`:e>=60?`-${(e/60).toFixed(0)}m`:`-${e.toFixed(0)}s`}function en(t,e,n,i){const o=[];for(let a=0;a<50;a++){const s=a/49*t,l=a/50,c=Math.sin(l*Math.PI*2),d=(Math.random()-.5)*.2;let u=.5+c*.3+d;u=Math.max(.1,Math.min(.9,u));const g=e-u*e;o.push({x:s,y:g})}return o}function Ks(t,e,n,i,o,r){if(!o||o.length===0)return en(t,e);const a=[],s=Zn(r),c=Date.now()-s*1e3,d=o.map(y=>({time:new Date(y.last_changed||y.when||Date.now()).getTime(),value:parseFloat(y.state)})).filter(y=>!isNaN(y.value));if(d.length===0)return en(t,e);d.sort((y,b)=>y.time-b.time);let u=n,g=i;const h=d.map(y=>y.value),m=Math.min(...h),f=Math.max(...h);if(n===i||isNaN(n)&&isNaN(i)||n===0&&i===100&&(m>100||f<0)){u=m,g=f;const y=(g-u)*.1||1;u-=y,g+=y}const _=g-u||1;return d.forEach(y=>{const b=(y.time-c)/(s*1e3)*t;let S=(y.value-u)/_;S=Math.max(-.1,Math.min(1.1,S));const w=e-S*e;b>=-10&&b<=t+10&&a.push({x:b,y:w})}),a.length>0&&a[a.length-1].x<t-1&&a.push({x:t,y:a[a.length-1].y}),a}function Js(t,e,n,i,o,r="rgba(0,0,0,0.1)"){const a=document.createElementNS("http://www.w3.org/2000/svg","g");a.setAttribute("stroke",r),a.setAttribute("stroke-dasharray","2,2"),a.setAttribute("stroke-width","1");const s=4,l=4;for(let c=1;c<s;c++){const d=c/s*e,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1",String(d)),u.setAttribute("y1","0"),u.setAttribute("x2",String(d)),u.setAttribute("y2",String(n)),a.appendChild(u)}for(let c=1;c<l;c++){const d=c/l*n,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1","0"),u.setAttribute("y1",String(d)),u.setAttribute("x2",String(e)),u.setAttribute("y2",String(d)),a.appendChild(u)}t.appendChild(a)}function Zs(t,e,n,i,o,r,a,s,l,c="#666",d={}){if(!t)return;t.querySelectorAll(`.graph-axis-label[data-widget-id="${l}"]`).forEach(x=>x.remove());const g=a-r,h=4,m=parseInt(t.style.width,10)||800,f=parseInt(t.style.height,10)||480,_=d.fontFamily||"Roboto",y=Math.max(8,parseInt(String(d.fontSize||10),10)||10),b=String(parseInt(String(d.fontWeight||400),10)||400),S=e<40,w=n+o+20>f;for(let x=0;x<=h;x++){const k=r+g*(x/h),L=n+o-x/h*o,A=document.createElement("div");A.className="graph-axis-label",A.dataset.widgetId=l;const M=A.style;M.position="absolute",S?(M.left=`${e+4}px`,M.textAlign="left"):(M.left=`${e-4}px`,M.transform="translateX(-100%)",M.textAlign="right"),M.top=`${L-6}px`,M.fontSize=`${y}px`,M.fontFamily=`${_}, system-ui, sans-serif`,M.fontWeight=b,M.color=c,M.opacity=S?"0.7":"1.0",M.pointerEvents="none",M.zIndex="10",A.textContent=k.toFixed(1),t.appendChild(A)}const E=Zn(s),C=2;for(let x=0;x<=C;x++){const k=x/C,L=e+i*k;let A="";if(x===C)A="Now";else{const N=E*(1-k);A=Xa(N)}const M=document.createElement("div");M.className="graph-axis-label",M.dataset.widgetId=l;const D=M.style;D.position="absolute",D.left=`${L}px`,w?D.top=`${n+o-14}px`:D.top=`${n+o+4}px`,D.fontSize=`${y}px`,D.fontFamily=`${_}, system-ui, sans-serif`,D.fontWeight=b,D.color=c,D.opacity=w?"0.7":"1.0",D.pointerEvents="none",D.zIndex="10",L<20?(D.transform="none",D.textAlign="left"):L>m-20?(D.transform="translateX(-100%)",D.textAlign="right"):(D.transform="translateX(-50%)",D.textAlign="center"),M.textContent=A,t.appendChild(M)}}const Qn=window;Qn.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(Qn.LAYOUT);const ei="esphome-designer-splitter-sizes";function ti(){try{const t=window.localStorage?.getItem(ei);if(!t)return{};const e=JSON.parse(t);return e&&typeof e=="object"?e:{}}catch{return{}}}function tn(t,e){const n=parseInt(String(e),10);if(Number.isFinite(n))try{const i={...ti(),[t]:n};window.localStorage?.setItem(ei,JSON.stringify(i))}catch{}}function Ka(t,e,n){const i=parseInt(String(n),10);if(!Number.isFinite(i))return null;const o=getComputedStyle(t),r=parseInt(e==="vertical"?o.minWidth:o.minHeight)||0,a=parseInt(e==="vertical"?o.maxWidth:o.maxHeight)||Number.MAX_SAFE_INTEGER;return Math.max(r,Math.min(a,i))}function at(t,e,n,i){const o=Ka(t,e,i[n]);o!==null&&(e==="vertical"?t.style.width=o+"px":t.style.height=o+"px")}function Ke(){const t=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),n=document.querySelector(".sidebar"),i=document.querySelector(".right-panel");if(!document.querySelector(".app-content")){setTimeout(Ke,100);return}if(!t||!e||!n||!i){v.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(Ke,500);return}v.log("[Splitters] Initializing draggable panels...");const r=ti();at(n,"vertical","left",r),at(i,"vertical","right",r);function a(c,d,u,g){let h=0,m=0;c.addEventListener("mousedown",function(f){u==="vertical"?(h=f.clientX,m=d.offsetWidth,document.body.style.cursor="col-resize"):(h=f.clientY,m=d.offsetHeight,document.body.style.cursor="row-resize"),c.classList.add("dragging"),document.body.style.userSelect="none";function _(b){let S;if(u==="vertical"){S=b.clientX-h,c.id==="resizer-right"&&(S=-S);const w=m+S,E=parseInt(getComputedStyle(d).minWidth)||100,C=parseInt(getComputedStyle(d).maxWidth)||800;w>=E&&w<=C&&(d.style.width=w+"px",tn(g,w))}else{S=h-b.clientY;const w=m+S,E=parseInt(getComputedStyle(d).minHeight)||50,C=parseInt(getComputedStyle(d).maxHeight)||800;w>=E&&w<=C&&(d.style.height=w+"px",tn(g,w))}vt(new Event("resize"))}function y(){c.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",$("mousemove",_),$("mouseup",y)}H("mousemove",_),H("mouseup",y)})}const s=document.getElementById("resizer-bottom"),l=document.querySelector(".code-panel");a(t,n,"vertical","left"),a(e,i,"vertical","right"),s&&l&&(at(l,"horizontal","bottom",r),a(s,l,"horizontal","bottom"))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ke):Ke();async function Qs(t){if(!W())return v.log("[HardwareImport] Offline mode detected. Parsing locally..."),await Ja(t);try{const e=await t.text(),n=`${F}/hardware/upload`,i={filename:t.name,content:e};v.log("[HardwareImport] Uploading via JSON:",t.name);const o=await Y(n,{method:"POST",headers:z(),body:JSON.stringify(i)});if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.message||a.error||`Upload failed: ${o.status}`)}const r=await o.json();return O("Hardware template uploaded successfully!","success"),Ae&&await Ae(),r}catch(e){const n=e instanceof Error?e.message:String(e||"");if(n.includes("Failed to fetch")||n.includes("NetworkError")){v.warn("[HardwareImport] Network error during upload (likely benign):",n),O("Generating profile, refreshing list...","info");try{Ae&&await Ae()}catch(i){v.warn("[HardwareImport] Profile refresh also failed:",i)}return{success:!0,filename:t.name,note:"network_error_suppressed"}}else throw v.error("Hardware upload failed:",e),O(`Upload failed: ${n}`,"error"),e}}async function Ja(t){return new Promise((e,n)=>{const i=new FileReader;i.onload=async o=>{const r=o.target?.result;if(typeof r!="string"){n(new Error("Failed to read file content"));return}try{if(!r.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");const a=Cn(r,t.name);v.log("[HardwareImport] Parsed offline profile:",a),G&&(G[a.id]=a),O(`Imported ${a.name} (Offline Mode)`,"success"),go(a),I(P.DEVICE_PROFILES_UPDATED),e(a)}catch(a){const s=a instanceof Error?a.message:String(a);O(s,"error"),n(a)}},i.onerror=()=>n(new Error("File read failed")),i.readAsText(t)})}const ni=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"energy_widget",label:"Energy Flow",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="15" y="10" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="9" y="17" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v3M9 12h-3M15 12h-3M12 14v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"astronomy",name:"Astronomy",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M15.5 3.5a8.5 8.5 0 107 13A9 9 0 0115.5 3.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"moon_phase",label:"Moon phase",tag:"Moon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M15.5 3.5a8.5 8.5 0 107 13A9 9 0 0115.5 3.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"sun_times",label:"Sunrise / Sunset",tag:"Sun",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14a5 5 0 0110 0" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 4v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M9.5 7.5L12 5l2.5 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];function Za(t=ni){const e=[];return t.forEach(n=>{n.widgets.forEach(i=>{e.includes(i.type)||e.push(i.type)})}),e}function Qa(t,e){return e==="lvgl"?t.id==="lvgl":e==="oepl"||e==="opendisplay"?t.id==="opendisplay"||t.id==="core"||t.id==="shapes":!!t.expanded}function es(t,e,n,i){let o=!0,r="";const a=i==="c"?"direct":i;if(n?.supportedModes)return{isCompatible:n.supportedModes.includes(a),explanation:`Not supported in ${i} mode`};if(i==="oepl"||i==="opendisplay"){const s=i==="oepl"?!!n?.exportOEPL:!!n?.exportOpenDisplay,l=e.id==="ondevice"||e.id==="lvgl",c=t.type==="calendar"||t.type==="weather_forecast"||t.type==="graph"||t.type==="quote_rss";o=s&&!l&&!c,r=`Not supported in ${i==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(i==="lvgl"){const s=t.type.startsWith("lvgl_"),l=e.id==="inputs",c=typeof n?.exportLVGL=="function";o=s||l||c,r="Widget not compatible with LVGL mode"}else if(i==="direct"||i==="c"){const s=t.type.startsWith("lvgl_")||t.type.startsWith("oepl_");n?o=!!n.export&&!s:o=!s,r=`Not supported in ${i==="c"?"C/C++ drawing":"Direct rendering"} mode`}return{isCompatible:o,explanation:r}}function ts(t,e){const n=document.createElement("div");n.className="widget-category-header";let i='<span class="category-icon">&#8250;</span>';return t.icon&&(i+=t.icon),n.innerHTML=`
        ${i}
        <span class="category-name">${t.name}</span>
        ${t.widgets.length>0&&!e?`<span class="category-count">${t.widgets.length}</span>`:""}
    `,n}function ns(t,e,n,i,o){const r=document.createElement("div"),a=i.get(t.type),{isCompatible:s,explanation:l}=es(t,e,a,n);r.className="item"+(s?"":" incompatible"),r.draggable=s,r.dataset.widgetType=t.type;const c=t.label||a?.name,d=t.tag?`<span class="tag">${t.tag}</span>`:"";return r.innerHTML=`
        ${t.icon}
        <span class="label">${c}</span>
        ${d}
    `,r.title=s?`Add ${c} to canvas`:l,s?r.addEventListener("dragstart",u=>{u.dataTransfer&&(u.dataTransfer.setData("application/widget-type",t.type),u.dataTransfer.setData("text/plain",t.type),u.dataTransfer.effectAllowed="copy")}):r.addEventListener("click",u=>{u.stopPropagation(),o(l,"warning")}),r}function is(t){const{container:e,categories:n,currentMode:i,registry:o,showToast:r}=t;e.innerHTML="",n.forEach(a=>{const s=Qa(a,i),l=document.createElement("div");l.className=`widget-category ${s?"expanded":""}`,l.dataset.category=a.id;const c=ts(a,s);c.addEventListener("click",()=>{l.classList.toggle("expanded")});const d=document.createElement("div");d.className="widget-category-items",a.widgets.forEach(u=>{d.appendChild(ns(u,a,i,o,r))}),l.appendChild(c),l.appendChild(d),e.appendChild(l)})}const nn=Za();async function os(t){const e=document.getElementById(t);if(!e)return;const n=p?.settings?.renderingMode||"direct";v.log(`[Palette] Rendering palette for mode: ${n}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>',v.log(`[Palette] Pre-loading ${nn.length} widget plugins...`),await Promise.all(nn.map(i=>q.load(i))).catch(i=>v.error("[Palette] Failed to load some plugins:",i)),is({container:e,categories:ni,currentMode:n,registry:q,showToast:O})}B(P.SETTINGS_CHANGED,t=>{t&&t.renderingMode!==void 0&&(v.log(`[Palette] Settings changed, refreshing palette for mode: ${t.renderingMode}`),os("widgetPalette"))});function on(t,e){const n=document.createElement("div");n.style.fontSize="10px",n.style.color="var(--muted)",n.style.marginBottom="6px",n.style.fontWeight="600",n.style.marginTop="8px",n.textContent=e,t.appendChild(n)}function rn(t){const e=document.createElement("div");return e.style.display="flex",e.style.gap="4px",t.appendChild(e),e}function rs(t,e){const n=document.createElement("div");n.style.fontSize="10px",n.style.color="var(--muted)",n.style.lineHeight="1.4",n.style.marginTop="6px",n.textContent=e,t.appendChild(n)}function as(t,e){if(!e)return;const n=p.getSelectedWidgets();if(n.length===0){e.style.display="none";return}e.style.display="block",e.innerHTML="",on(e,"GROUPING");const i=rn(e),o=n.some(d=>d.type==="group"||d.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=n.length<2||o,r.onclick=()=>p.groupSelection(),i.appendChild(r);const a=document.createElement("button");if(a.className="btn btn-secondary",a.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',a.style.flex="1",a.style.fontSize="10px",a.disabled=!o,a.onclick=()=>p.ungroupSelection(),i.appendChild(a),rs(e,"Tip: Shift/Ctrl-click or drag an empty canvas area to multi-select, then drag one selected widget to move the whole selection."),n.length!==1)return;const s=n[0];on(e,"LAYER ORDER");const l=rn(e);[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>t.moveToFront(s)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>t.moveToBack(s)},{label:"Up",icon:"mdi-arrow-up",action:()=>t.moveUp(s)},{label:"Down",icon:"mdi-arrow-down",action:()=>t.moveDown(s)}].forEach(d=>{const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML=`<i class="mdi ${d.icon}"></i>`,u.title=d.label,u.style.flex="1",u.style.fontSize="12px",u.style.padding="4px",u.onclick=()=>d.action(),l.appendChild(u)})}function ss(t){let e=t.props?.name||t.props?.title||t.props?.text||t.title;if(!e||e===""){const i=q.get(t.type);e=i?i.name:t.type}const n=q.get(t.type)?.name;if(e===t.type||n&&e===n){const i=t.id.split("_").pop();e=`${e} (${i})`}return e}function ls(t){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",weather_icon:"mdi-weather-partly-cloudy",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[t]||"mdi-widgets-outline"}"></i>`}function ds(t,e,n,i=0){const o=document.createElement("div");o.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,i>0&&o.classList.add("child-item"),(p.selectedWidgetIds||[]).includes(e.id)&&o.classList.add("selected"),o.dataset.id=e.id,o.dataset.index=String(n),o.draggable=!e.locked,e.locked&&o.classList.add("locked"),o.style.paddingLeft=`${12+i*20}px`;const a=ls(e.type),s=ss(e),l=e.type==="group";if(o.innerHTML=`
        <div class="hierarchy-item-drag-handle" style="${e.locked?"display:none":""}">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                <circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
            </svg>
        </div>
        ${l?`
        <div class="hierarchy-group-toggle ${e.expanded!==!1?"expanded":""}">
            <i class="mdi mdi-chevron-down"></i>
        </div>
        `:'<div style="width: 16px;"></div>'}
        <div class="hierarchy-item-icon">${a}</div>
        <div class="hierarchy-item-label">${s}</div>
        <div class="hierarchy-item-actions">
            <div class="hierarchy-item-action toggle-lock" title="${e.locked?"Unlock":"Lock"}">
                <i class="mdi ${e.locked?"mdi-lock-outline":"mdi-lock-open-outline"}"></i>
            </div>
            <div class="hierarchy-item-action toggle-visibility" title="Toggle Visibility">
                <i class="mdi ${e.hidden?"mdi-eye-off-outline":"mdi-eye-outline"}"></i>
            </div>
            <div class="hierarchy-item-action delete-widget danger" title="Delete Widget">
                <i class="mdi mdi-delete-outline"></i>
            </div>
        </div>
    `,l){const h=o.querySelector(".hierarchy-group-toggle");h&&h.addEventListener("click",m=>{p.updateWidget(e.id,{expanded:e.expanded===!1}),m.stopPropagation()})}const c=o.querySelector(".hierarchy-item-label");c&&c.addEventListener("click",h=>{if((p.selectedWidgetIds||[]).includes(e.id)){const m=prompt("Rename:",s);m!==null&&m!==""&&m!==s&&p.updateWidget(e.id,{title:m}),h.stopPropagation()}}),o.addEventListener("click",h=>{const m=h.ctrlKey||h.shiftKey;p.selectWidget(e.id,m),h.stopPropagation()});const d=o.querySelector(".toggle-lock");d&&d.addEventListener("click",h=>{p.updateWidget(e.id,{locked:!e.locked}),h.stopPropagation()});const u=o.querySelector(".toggle-visibility");u&&u.addEventListener("click",h=>{p.updateWidget(e.id,{hidden:!e.hidden}),h.stopPropagation()});const g=o.querySelector(".delete-widget");return g&&g.addEventListener("click",h=>{confirm(`Delete widget "${s}"?`)&&p.deleteWidget(e.id),h.stopPropagation()}),o.addEventListener("dragstart",h=>{h.dataTransfer&&(t.draggedIndex=n,o.classList.add("dragging"),h.dataTransfer.setData("application/widget-id",e.id),h.dataTransfer.effectAllowed="move")}),o.addEventListener("dragend",()=>{if(o.classList.remove("dragging"),t.draggedIndex=null,!t.listContainer)return;t.listContainer.querySelectorAll(".hierarchy-item").forEach(m=>m.classList.remove("drag-over"))}),o.addEventListener("dragover",h=>{h.dataTransfer&&(h.preventDefault(),h.dataTransfer.dropEffect="move",o.classList.add("drag-over"))}),o.addEventListener("dragleave",()=>{o.classList.remove("drag-over")}),o.addEventListener("drop",h=>{if(!h.dataTransfer)return;h.preventDefault();const m=h.dataTransfer.getData("application/widget-id"),f=o.dataset.id;if(m===f)return;const _=p.getWidgetById(m),y=p.getWidgetById(f);if(!_||!y)return;const b=_.type==="group"?null:y.type==="group"?f:y.parentId||null;if(_.parentId!==b){const w={parentId:b};b&&y.type==="group"?p.updateWidget(m,{...w,expanded:!0}):p.updateWidget(m,w)}const S=parseInt(o.dataset.index||"-1",10);t.draggedIndex!==null&&p.reorderWidget(p.currentPageIndex,t.draggedIndex,S)}),o}function cs(t){const e=t.filter(i=>i.type==="group"||!i.parentId).reverse(),n=new Map;return t.forEach(i=>{!i.parentId||i.type==="group"||(n.has(i.parentId)||n.set(i.parentId,[]),n.get(i.parentId).push(i))}),{topLevel:e,childrenMap:n}}function ps(t,e,n){const i=t.findIndex(o=>o.id===e);if(i===-1)return!1;if(n==="front"){if(i>=t.length-1)return!1;const[o]=t.splice(i,1);return t.push(o),!0}if(n==="back"){if(i===0)return!1;const[o]=t.splice(i,1);return t.unshift(o),!0}return n==="up"?i>=t.length-1?!1:([t[i],t[i+1]]=[t[i+1],t[i]],!0):n==="down"?i===0?!1:([t[i],t[i-1]]=[t[i-1],t[i]],!0):!1}class el{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.controlsContainer=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){v.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),v.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const n=this.header.querySelector(".chevron");this.header.insertBefore(e,n||null);const i=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const r=p.getCurrentPage()?.widgets||[],a=r.every(s=>s.locked);r.forEach(s=>p.updateWidget(s.id,{locked:!a}))}),o=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const r=p.getCurrentPage()?.widgets||[],a=r.every(s=>s.hidden);r.forEach(s=>p.updateWidget(s.id,{hidden:!a}))});e.appendChild(i),e.appendChild(o)}}createHeaderToggle(e,n,i){const o=document.createElement("div");return o.className="h-toggle",o.title=n,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=r=>{r.stopPropagation(),i()},o}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),B(P.STATE_CHANGED,this.render),B(P.PAGE_CHANGED,this.render),B(P.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){if(!this.panel||!this.header)return;const e=this.panel.classList.toggle("hidden"),n=this.header.querySelector(".chevron");n&&(n.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){if(!this.listContainer)return;const e=p.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(i=>{e.includes(i.dataset.id)?i.classList.add("selected"):i.classList.remove("selected")}),this.renderControls()}render(){if(!this.listContainer||!this.controlsContainer)return;const e=p.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const{topLevel:n,childrenMap:i}=cs(e.widgets),o=(r,a=0)=>{const s=e.widgets.indexOf(r),l=this.createItem(r,s,a);this.listContainer.appendChild(l);const c=i.get(r.id);c&&r.expanded!==!1&&[...c].reverse().forEach(d=>o(d,a+1))};n.forEach(r=>o(r)),this.highlightSelected(),this.renderControls()}createItem(e,n,i=0){return ds(this,e,n,i)}renderControls(){as(this,this.controlsContainer)}moveLayerOrder(e,n){const i=p.getCurrentPage();i&&ps(i.widgets,e.id,n)&&p.setPages(p.pages)}moveToFront(e){this.moveLayerOrder(e,"front")}moveToBack(e){this.moveLayerOrder(e,"back")}moveUp(e){this.moveLayerOrder(e,"up")}moveDown(e){this.moveLayerOrder(e,"down")}}function We(t){return!!(t?.isComingSoon||t?.isUnavailable)}function tl(t){if(!t.modelInput||!G)return;const e=t.modelInput.value;v.log("[DeviceSettings] Populating dropdown with",Object.keys(G).length,"profiles"),t.modelInput.innerHTML="";const n=St||[],i=[],o=[];Object.entries(G).forEach(([l,c])=>{c.isCustomProfile||c.isOfflineImport?o.push([l,c]):i.push([l,c])});const r=(l,c)=>{const d=document.createElement("option");d.value=l;let u=c.name||l;u=u.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").replace(/\s*\(coming soon\)\s*/gi,"").trim();const g=[];return(c.isCustomProfile||c.isOfflineImport)&&g.push("Imported"),We(c)?g.push("coming soon"):n.includes(l)||g.push("untested"),g.length>0&&(u+=` (${g.join(", ")})`),d.textContent=u,We(c)&&(d.disabled=!0,d.title=c.unavailableReason||"Coming soon",d.style.color="var(--text-dim)"),d};if(i.forEach(([l,c])=>t.modelInput.appendChild(r(l,c))),o.length>0&&i.length>0){const l=document.createElement("option");l.disabled=!0,l.textContent="?????? User-Imported / Custom ??????",l.style.fontWeight="bold",l.style.color="var(--text-dim)",t.modelInput.appendChild(l)}o.forEach(([l,c])=>t.modelInput.appendChild(r(l,c)));const a=document.createElement("option");a.value="custom",a.textContent="Custom Profile...",a.style.fontWeight="bold",a.style.color="var(--accent)",t.modelInput.appendChild(a);const s=G[e];if(e==="custom"||s&&!We(s))t.modelInput.value=e;else if(s&&We(s)||!t.modelInput.value||t.modelInput.selectedOptions[0]?.disabled){const l=Array.from(t.modelInput.options).find(c=>!c.disabled);t.modelInput.value=l?.value||"reterminal_e1001"}try{t.customHardwarePanel&&typeof t.customHardwarePanel.updateVisibility=="function"&&t.customHardwarePanel.updateVisibility()}catch(l){v.error("[DeviceSettingsView] Error in customHardwarePanel.updateVisibility:",l)}}function nl(t){if(t){try{const e=t.modeSleep?.checked,n=t.modeDaily?.checked,i=t.modeDeepSleep?.checked;t.sleepRow&&(t.sleepRow.style.display=e||i?"flex":"none"),t.dailyRefreshRow&&(t.dailyRefreshRow.style.display=n?"flex":"none"),t.deepSleepRow&&(t.deepSleepRow.style.display=i?"block":"none"),t.deepSleepOptionsRow&&(t.deepSleepOptionsRow.style.display=i?"flex":"none")}catch(e){v.error("[DeviceSettingsView] Error in power mode visibility:",e)}try{const e=p?.settings?.lcdEcoStrategy||"backlight_off";t.dimTimeoutRow&&(t.dimTimeoutRow.style.display=e==="dim_after_timeout"?"flex":"none")}catch(e){v.error("[DeviceSettingsView] Error in dim timeout visibility:",e)}try{const e=t.renderingModeInput?.value||p?.settings?.renderingMode||"direct",n=e==="lvgl"||e==="direct"||e==="c",i=e==="oepl"||e==="opendisplay";t.powerStrategySection&&(t.powerStrategySection.style.display=n?"block":"none"),t.protocolHardwareSection&&(t.protocolHardwareSection.style.display=i?"block":"none"),t.deviceModelField&&(t.deviceModelField.style.display=i?"none":"block")}catch(e){v.error("[DeviceSettingsView] Error in section visibility:",e)}try{const e=t.modeDaily?.checked,n=t.modeManual?.checked,i=!e&&!n;t.refreshIntervalRow&&(t.refreshIntervalRow.style.display=i?"block":"none"),t.autoCycleRow&&(t.autoCycleRow.style.display=t.autoCycleEnabled?.checked?"flex":"none")}catch(e){v.error("[DeviceSettingsView] Error in refresh/cycle visibility:",e)}try{if(t.deepSleepStayAwakeEntityRow){const e=document.getElementById("setting-deep-sleep-stay-awake");t.deepSleepStayAwakeEntityRow.style.display=e?.checked?"flex":"none"}}catch(e){v.error("[DeviceSettingsView] Error in deep sleep stay awake visibility:",e)}try{t.customHardwarePanel&&typeof t.customHardwarePanel.updateVisibility=="function"&&t.customHardwarePanel.updateVisibility()}catch(e){v.error("[DeviceSettingsView] Error in customHardwarePanel.updateVisibility:",e)}try{t.protocolHardwarePanel&&typeof t.protocolHardwarePanel.updateStrategyDisplay=="function"&&t.protocolHardwarePanel.updateStrategyDisplay()}catch(e){v.error("[DeviceSettingsView] Error in protocolHardwarePanel.updateStrategyDisplay:",e)}}}function xe(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function ii(t){return!!(t?.isComingSoon||t?.isUnavailable)}function us(t,e,n){if(t&&e&&e[t]){let o=e[t].name||t||"Unknown";return ii(e[t])?o+=" (coming soon)":n.includes(t)||(o+=" (untested)"),o}const i={reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"};return t&&(i[t]||t)||"Unknown"}function il(t,e,n,i){return t.map(o=>{const r=o.id===e,a=t.filter(s=>s.name===o.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${r?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${xe(o.name)}</span>
                        ${r?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${a?'<br><span style="font-size: 9px; color: var(--muted);">'+xe(o.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${us(o.device_model||o.device_type,n,i)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${o.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${r?"":`<button type="button" class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" data-action="load" data-id="${o.id}">Load</button>`}
                            <button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" data-action="export" data-id="${o.id}">Export</button>
                            ${!r&&t.length>1?`<button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" data-action="delete" data-id="${o.id}" data-name="${xe(o.name)}">Delete</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}function hs(){return`
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <div>Manage Layouts</div>
                    <button type="button" id="layoutManagerClose" class="btn btn-secondary">x</button>
                </div>
                <div class="modal-body">
                    <div class="layout-manager-current" style="margin-bottom: 12px; padding: 8px; background: var(--bg-subtle); border-radius: 4px;">
                        <span class="prop-label" style="font-size: 11px; color: var(--muted);">Current Layout:</span>
                        <span id="layoutManagerCurrentName" style="font-weight: 500; margin-left: 8px;">Loading...</span>
                    </div>

                    <div class="layout-manager-list-container" style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                        <table class="layout-manager-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Name</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Device</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Pages</th>
                                    <th style="text-align: right; padding: 8px 4px; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="layoutManagerTableBody">
                                <tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="layout-manager-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" id="layoutManagerNew" class="btn btn-primary" style="flex: 1;">+ New Layout</button>
                        <button type="button" id="layoutManagerImport" class="btn btn-secondary" style="flex: 1;">Import from File</button>
                        <input type="file" id="layoutManagerFileInput" accept=".json" style="display: none;">
                    </div>

                    <div id="layoutManagerStatus" class="layout-manager-status" style="margin-top: 8px; font-size: 11px; min-height: 20px;"></div>
                </div>
            </div>
        `}function gs(t,e){return t?Object.entries(t).map(([n,i])=>{let o=i.name||n;const r=ii(i);r?o+=" (coming soon)":e.includes(n)||(o+=" (untested)");const a=r?` disabled title="${xe(i.unavailableReason||"Coming soon")}"`:"";return`<option value="${xe(n)}"${a}>${xe(o)}</option>`}).join(""):'<option value="reterminal_e1001">reTerminal E1001</option>'}function ms(t){return`
                <div class="modal" style="max-width: 400px;">
                    <div class="modal-header">
                        <div>Create New Layout</div>
                        <button type="button" id="newLayoutClose" class="btn btn-secondary">x</button>
                    </div>
                    <div class="modal-body">
                        <div class="field" style="margin-bottom: 12px;">
                            <div class="prop-label">Layout Name</div>
                            <input id="newLayoutName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
                        </div>
                        <div class="field">
                            <div class="prop-label">Device Type</div>
                            <select id="newLayoutDeviceType" class="prop-input">
                                ${t}
                            </select>
                            <p class="hint" style="color: var(--muted); font-size: 11px; margin-top: 4px;">Select the device that will display this layout.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" id="newLayoutCancel" class="btn btn-secondary">Cancel</button>
                        <button type="button" id="newLayoutConfirm" class="btn btn-primary">Create Layout</button>
                    </div>
                </div>
            `}function Mt(t){return document.getElementById(t)}function oi(t){return document.getElementById(t)}function re(t){const e=document.getElementById(t);if(!e)throw new Error(`Missing element: ${t}`);return e}function ol(){return gs(G,St||[])}function rl(t){const e=document.getElementById("layoutManagerModal");if(e)return t.modal=e,e;const n=document.createElement("div");n.id="layoutManagerModal",n.className="modal-backdrop hidden",n.innerHTML=hs(),X(n),t.modal=n;const i=re("layoutManagerClose"),o=re("layoutManagerNew"),r=re("layoutManagerImport"),a=re("layoutManagerFileInput");i.addEventListener("click",()=>t.close()),o.addEventListener("click",()=>t.showNewLayoutDialog()),r.addEventListener("click",()=>{a.click()}),a.addEventListener("change",l=>t.handleFileImport(l)),n.addEventListener("click",l=>{l.target===n&&t.close()});const s=document.getElementById("layoutManagerTableBody");return s&&s.addEventListener("click",l=>{const c=l.target instanceof HTMLElement?l.target.closest("button"):null;if(!c)return;const{action:d,id:u,name:g}=c.dataset;d==="load"&&u&&t.loadLayout(u),d==="export"&&u&&t.exportLayout(u),d==="delete"&&u&&g&&t.deleteLayout(u,g)}),n}function fs(t){const e=document.getElementById("newLayoutModal");if(e)return e;const n=document.createElement("div");return n.id="newLayoutModal",n.className="modal-backdrop hidden",n.innerHTML=ms(t.generateDeviceOptions()),X(n),re("newLayoutClose").addEventListener("click",()=>{n.classList.add("hidden")}),re("newLayoutCancel").addEventListener("click",()=>{n.classList.add("hidden")}),re("newLayoutConfirm").addEventListener("click",()=>{t.handleCreateLayoutConfirm()}),re("newLayoutName").addEventListener("keydown",i=>{i.key==="Enter"?(i.preventDefault(),t.handleCreateLayoutConfirm()):i.key==="Escape"&&n.classList.add("hidden"),i.stopPropagation()}),n.addEventListener("click",i=>{if(i.target===n){const o=Mt("newLayoutName");document.activeElement!==o&&n.classList.add("hidden")}}),n}function al(t){const e=fs(t),n=Mt("newLayoutName");if(!n)return;const i=t.layouts.length;n.value=`Layout ${i+1}`;const o=G?Object.keys(G)[0]:"reterminal_e1001",r=oi("newLayoutDeviceType");r&&(r.value=o),e.classList.remove("hidden"),setTimeout(()=>n.focus(),100)}function sl(t){const e=Mt("newLayoutName"),n=oi("newLayoutDeviceType"),i=e?.value.trim()||"",o=n?.value||"reterminal_e1001";if(!i){alert("Please enter a layout name.");return}const r=document.getElementById("newLayoutModal");r&&r.classList.add("hidden"),t.createLayout(i,o)}const ri=t=>new Promise(e=>setTimeout(e,t));async function ys(t){const e=await Y(`${t}/layouts`,{headers:z()});if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);return e.json()}async function _s(t,e){const n=await Y(`${t}/layouts/${e}`,{headers:z()});if(!n.ok)throw new Error(`Failed to load layout: ${n.status}`);return n.json()}async function vs(t,e){return Y(`${t}/layouts/${e}`,{method:"POST",headers:{...z(),"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})})}async function bs(t,e){return Y(`${t}/layouts`,{method:"POST",headers:{...z(),"Content-Type":"text/plain"},body:JSON.stringify(e)})}async function xs(t,e,n,i){const o=`${t}/import${n?"?overwrite=true":""}`;return Y(o,{method:"POST",headers:i(),body:JSON.stringify(e)})}function Ss(t){return t instanceof Error?t.message:String(t)}function Te(){return F||""}async function ll(t){if(!W()){t.setStatus("Not connected to Home Assistant","error");return}try{const e=await ys(Te());t.layouts=e.layouts||[],e.last_active_layout_id&&t.layouts.some(n=>n.id===e.last_active_layout_id)&&(!p?.currentLayoutId||p.currentLayoutId==="reterminal_e1001")&&t.layouts.find(i=>i.id===e.last_active_layout_id)&&e.last_active_layout_id!==p?.currentLayoutId&&(v.log(`[LayoutManager] Syncing to last active layout: ${e.last_active_layout_id}`),t.currentLayoutId=e.last_active_layout_id,p&&typeof p.setCurrentLayoutId=="function"&&p.setCurrentLayoutId(e.last_active_layout_id)),t.renderLayoutList()}catch(e){v.error("[LayoutManager] Error loading layouts:",e),t.setStatus("Failed to load layouts","error")}}async function dl(t,e){if(W())try{t.setStatus("Loading layout...","info");const n=await _s(Te(),e);n.device_id||(n.device_id=e),t.currentLayoutId=e,p&&typeof p.setCurrentLayoutId=="function"&&(p.setCurrentLayoutId(e),v.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const i=document.getElementById("canvas");if(i){const o=i.querySelector(".canvas-grid");i.innerHTML="",o&&i.appendChild(o),v.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(o=>o.remove()),typeof ue=="function"&&ue(n),p&&p.currentLayoutId!==e&&(p.setCurrentLayoutId(e),v.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof I=="function"&&typeof P<"u"&&I(P.LAYOUT_IMPORTED,n),t.setStatus(`Loaded: ${n.name||e}`,"success"),t.renderLayoutList(),setTimeout(()=>t.close(),500)}catch(n){v.error("[LayoutManager] Error loading layout:",n),t.setStatus("Failed to load layout","error")}}async function cl(t,e){if(!W())return;let n=null;try{const i=`${F}/export?id=${e}`,o=await Y(i,{headers:z()});if(!o.ok){const l=await o.json().catch(()=>({}));throw new Error(l.error||`Export failed: ${o.status}`)}const r=await o.json(),a=new Blob([JSON.stringify(r,null,2)],{type:"application/json"});n=URL.createObjectURL(a);const s=document.createElement("a");s.href=n,s.download=`${e}_layout.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),t.setStatus("Export started...","success")}catch(i){v.error("[LayoutManager] Error exporting layout:",i),t.setStatus("Failed to export layout","error")}finally{n&&URL.revokeObjectURL(n)}}async function pl(t,e,n){if(W()&&confirm(`Are you sure you want to delete "${n}"?

This cannot be undone.`)){t.setStatus("Deleting layout...","info");try{const i=await vs(Te(),e);if(!i.ok){const o=await i.json().catch(()=>({}));if(o.error==="cannot_delete_last_layout"){t.setStatus("Cannot delete the last layout","error");return}throw new Error(o.error||`Delete failed: ${i.status}`)}t.setStatus(`Deleted: ${n}`,"success"),await t.loadLayouts()}catch(i){v.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await ri(1500),await t.loadLayouts(),t.layouts.some(r=>r.id===e)?(v.error("[LayoutManager] Error deleting layout:",i),t.setStatus("Failed to delete layout","error")):(v.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),t.setStatus(`Deleted: ${n}`,"success"))}}}async function ul(t,e,n="reterminal_e1001"){if(!W())return;let i=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");i||(i="layout");const o=`${i}_${Date.now()}`;t.setStatus("Creating layout...","info");let r=!1;try{const d=await bs(Te(),{id:o,name:e,device_type:n,device_model:n});if(!d.ok){const u=await d.json().catch(()=>({}));throw new Error(u.error||`Create failed: ${d.status}`)}r=!0}catch(d){if(v.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await ri(1500),await t.loadLayouts(),t.layouts.some(g=>g.id===o))v.log("[LayoutManager] Layout was successfully created (verified after refresh)"),r=!0;else{v.error("[LayoutManager] Error creating layout:",d),t.setStatus("Failed to create layout","error");return}}if(!r)return;t.setStatus(`Created: ${e}`,"success"),await t.loadLayouts();const a=G[n],s=a&&a.features&&a.features.epaper,l=a&&a.features&&a.features.lvgl,c=s&&!l?"direct":"lvgl";v.log(`[LayoutManager] New layout ${o} detected device type. isEpaper=${s}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),p&&(p.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),p.setCurrentPageIndex(0),p.updateSettings({renderingMode:c,device_model:n}),v.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await t.loadLayout(o),p&&(p.setDeviceModel(n),typeof I=="function"&&typeof P<"u"&&I(P.STATE_CHANGED),v.log(`[LayoutManager] Created layout '${o}' with device_model: ${n}, pages: ${p.pages?.length}, widgets: ${p.getCurrentPage()?.widgets?.length||0}`))}async function hl(t,e){const n=e.target instanceof HTMLInputElement?e.target:null,i=n?.files?.[0];if(i){try{const o=await i.text(),r=JSON.parse(o);if(!r.pages&&!r.device_id){t.setStatus("Invalid layout file","error");return}await t.importLayout(r)}catch(o){v.error("[LayoutManager] Error importing file:",o),t.setStatus(`Failed to import file: ${Ss(o)}`,"error")}n&&(n.value="")}}async function gl(t,e,n=!1){if(W())try{const i=await xs(Te(),e,n,z),o=await i.json();if(!i.ok){if(o.error==="layout_exists"){confirm(`A layout with ID "${o.existing_id}" already exists.

Do you want to overwrite it?`)&&await t.importLayout(e,!0);return}throw new Error(o.error||`Import failed: ${i.status}`)}t.setStatus(`Imported: ${o.name||o.id}`,"success"),await t.loadLayouts()}catch(i){v.error("[LayoutManager] Error importing layout:",i),t.setStatus("Failed to import layout","error")}}export{$s as $,p as A,As as B,gt as C,G as D,P as E,Ds as F,Xe as G,Gs as H,q as I,Fn as J,ui as K,v as L,di as M,F as N,Y as O,z as P,xt as Q,Rs as R,St as S,Fs as T,Xn as U,Ws as V,Ns as W,Bs as X,$a as Y,Ys as Z,zs as _,Sn as a,Ls as a0,Ts as a1,Ms as a2,el as a3,Os as a4,K as a5,ks as a6,Hs as a7,os as a8,js as a9,Us as aa,qs as ab,Vs as ac,T as ad,U as ae,Xr as af,Pt as ag,Xt as ah,Zn as ai,Js as aj,Cs as ak,Ps as al,Ks as am,Zs as an,Xs as ao,Xa as ap,Is as aq,nl as b,H as c,Z as d,I as e,rl as f,ll as g,W as h,xe as i,us as j,dl as k,Ae as l,cl as m,pl as n,B as o,tl as p,fs as q,il as r,O as s,al as t,Qs as u,sl as v,ol as w,ul as x,hl as y,gl as z};
