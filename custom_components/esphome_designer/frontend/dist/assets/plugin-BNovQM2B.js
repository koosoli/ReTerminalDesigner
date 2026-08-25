const p=t=>String(t||"").trim().toLowerCase().startsWith("light."),h=t=>String(t||"").trim().toLowerCase().startsWith("media_player."),v=t=>String(t||"").trim().replace(/[^a-zA-Z0-9_]/g,"_"),g=t=>`${v(t)}_brightness`,x=t=>`${v(t)}_volume_level`,$=(t,i)=>{const s=Number(t);return Number.isFinite(s)?s:i},w=(t={})=>({min:$(t.min,0),max:$(t.max,100)}),k=(t,i,s)=>`!lambda |-
      if (!id(${t}).has_state()) return static_cast<float>(${i});
      const float slider_min = static_cast<float>(${i});
      const float slider_max = static_cast<float>(${s});
      const float brightness = id(${t}).state;
      if (slider_max <= slider_min) return brightness;
      return slider_min + ((brightness / 255.0f) * (slider_max - slider_min));`,S=(t,i)=>t===0&&i===255?"!lambda 'return int(x);'":`!lambda |-
      const float raw_x = static_cast<float>(x);
      const float slider_min = static_cast<float>(${t});
      const float slider_max = static_cast<float>(${i});
      if (slider_max <= slider_min) return int(raw_x);
      const float clamped = raw_x < slider_min ? slider_min : (raw_x > slider_max ? slider_max : raw_x);
      return int(((clamped - slider_min) * 255.0f) / (slider_max - slider_min));`,L=(t,i,s)=>i===0&&s===255?`- lvgl.slider.update:
    id: ${t}
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x);`:`- lvgl.slider.update:
    id: ${t}
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(${i});
      const float raw_x = static_cast<float>(x);
      const float slider_min = static_cast<float>(${i});
      const float slider_max = static_cast<float>(${s});
      if (slider_max <= slider_min) return raw_x;
      return slider_min + ((raw_x / 255.0f) * (slider_max - slider_min));`,C=(t,i,s)=>`!lambda |-
      if (!id(${t}).has_state()) return static_cast<float>(${i});
      const float slider_min = static_cast<float>(${i});
      const float slider_max = static_cast<float>(${s});
      const float volume = id(${t}).state * 100.0f;
      if (slider_max <= slider_min) return volume;
      return slider_min + ((volume / 100.0f) * (slider_max - slider_min));`,M=(t,i,s)=>i===0&&s===100?`- lvgl.slider.update:
    id: ${t}
    value: !lambda |-
      return isnan(x) ? 0.0f : static_cast<float>(x * 100.0f);`:`- lvgl.slider.update:
    id: ${t}
    value: !lambda |-
      if (isnan(x)) return static_cast<float>(${i});
      const float slider_min = static_cast<float>(${i});
      const float slider_max = static_cast<float>(${s});
      const float volume = static_cast<float>(x * 100.0f);
      if (slider_max <= slider_min) return volume;
      return slider_min + ((volume / 100.0f) * (slider_max - slider_min));`,E=(t,i,{getColorStyle:s})=>{const r=i.props||{},n=s(r.color||"black"),o=s(r.bg_color||"gray"),d=r.border_width||2,l=r.vertical||!1;t.innerHTML="",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center";const e=r.min||0,f=r.max||100,y=r.value!==void 0?r.value:30,a=f-e,c=Math.max(0,Math.min(100,(y-e)/(a||1)*100)),_=document.createElement("div");_.style.position="relative",_.style.backgroundColor=o,_.style.borderRadius="10px",l?(_.style.width="30%",_.style.height="100%",t.style.flexDirection="column"):(_.style.width="100%",_.style.height="30%"),t.appendChild(_);const m=document.createElement("div");m.style.position="absolute",m.style.backgroundColor=n,m.style.borderRadius="10px",l?(m.style.left="0",m.style.bottom="0",m.style.width="100%",m.style.height=`${c}%`):(m.style.left="0",m.style.top="0",m.style.height="100%",m.style.width=`${c}%`),_.appendChild(m);const u=document.createElement("div"),b=l?i.width*.8:i.height*.8;u.style.width=`${b}px`,u.style.height=`${b}px`,u.style.backgroundColor=n,u.style.border=`${d}px solid white`,u.style.borderRadius="50%",u.style.position="absolute",l?(u.style.left=`calc(50% - ${b/2}px)`,u.style.bottom=`calc(${c}% - ${b/2}px)`):(u.style.left=`calc(${c}% - ${b/2}px)`,u.style.top=`calc(50% - ${b/2}px)`),_.appendChild(u)},I=(t,{common:i,convertColor:s,profile:r})=>{const n=t.props||{};r?.touch;const{min:o,max:d}=w(n);let l=n.value||30;const e=(t.entity_id||n.entity_id||n.entity||"").trim(),f=e.toLowerCase();if(e)if(p(e)){const a=g(e);l=k(a,o,d)}else if(h(e)){const a=x(e);l=C(a,o,d)}else l=`!lambda "return id(${v(e)}).state;"`;const y={slider:{...i,min_value:o,max_value:d,value:l,border_width:n.border_width||2,bg_color:s(n.bg_color||"gray"),indicator:{bg_color:s(n.color)},knob:{bg_color:s(n.color),border_width:2,border_color:"0xFFFFFF"},mode:n.mode||"normal",on_value:void 0}};if(e){let a;if(p(e)){const c=S(o,d);a={if:{condition:{lambda:"return x <= 0;"},then:[{"homeassistant.action":{action:"light.turn_off",data:{entity_id:e}}}],else:[{"homeassistant.action":{action:"light.turn_on",data:{entity_id:e,brightness:c}}}]}}}else f.startsWith("fan.")?a={"homeassistant.action":{action:"fan.set_percentage",data:{entity_id:e,percentage:"!lambda 'return x;'"}}}:f.startsWith("cover.")?a={"homeassistant.action":{action:"cover.set_cover_position",data:{entity_id:e,position:"!lambda 'return x;'"}}}:f.startsWith("media_player.")?a={"homeassistant.action":{action:"media_player.volume_set",data:{entity_id:e,volume_level:"!lambda 'return x / 100.0;'"}}}:f.startsWith("climate.")?a={"homeassistant.action":{action:"climate.set_temperature",data:{entity_id:e,temperature:"!lambda 'return x;'"}}}:a={"homeassistant.action":{action:"number.set_value",data:{entity_id:e,value:"!lambda 'return x;'"}}};p(e)?(y.slider.on_release=[a],delete y.slider.on_value):y.slider.on_value=[a]}return y},V=t=>{const{widgets:i,isLvgl:s,pendingTriggers:r,lines:n,seenEntityIds:o,seenSensorIds:d}=t;if(i)for(const l of i){if(l.type!=="lvgl_slider")continue;const e=(l.entity_id||l.props?.entity_id||l.props?.entity||"").trim();if(!e)continue;const{min:f,max:y}=w(l.props||{});if(p(e)){const a=g(e),c=`${e}__attr__brightness`;o&&!o.has(c)&&(o.add(c),d&&!d.has(a)&&(d.add(a),n.push("- platform: homeassistant",`  id: ${a}`,`  entity_id: ${e}`,"  attribute: brightness","  internal: true")))}else if(h(e)){const a=x(e),c=`${e}__attr__volume_level`;o&&!o.has(c)&&(o.add(c),d&&!d.has(a)&&(d.add(a),n.push("- platform: homeassistant",`  id: ${a}`,`  entity_id: ${e}`,"  attribute: volume_level","  internal: true")))}if(s&&r){const a=p(e)?g(e):h(e)?x(e):e;r.has(a)||r.set(a,new Set),r.get(a).add(p(e)?L(l.id,f,y):h(e)?M(l.id,f,y):`- lvgl.widget.refresh: ${l.id}`)}}},F={id:"lvgl_slider",name:"Slider",category:"LVGL",supportedModes:["lvgl"],defaults:{value:30,min:0,max:100,color:"blue",bg_color:"gray",border_width:2,mode:"normal",vertical:!1,opa:255,entity_id:"",opacity:255},schema:[{section:"Content",fields:[{key:"entity_id",target:"root",label:"Control Entity ID",type:"entity_picker",default:""}]},{section:"Range",fields:[{key:"value",label:"Value",type:"number",default:30},{key:"min",label:"Min Value",type:"number",default:0},{key:"max",label:"Max Value",type:"number",default:100},{key:"mode",label:"Mode",type:"select",options:["normal","symmetrical","range"],default:"normal"}]},{section:"Appearance",fields:[{key:"color",label:"Main Color",type:"color",default:"blue"},{key:"bg_color",label:"Track Color",type:"color",default:"gray"},{key:"border_width",label:"Knob Border",type:"number",default:2},{key:"vertical",label:"Vertical Orientation",type:"checkbox",default:!1},{key:"opa",label:"Opacity (0 - 255)",type:"number",default:255},{key:"opacity",label:"Opacity (0 - 255)",type:"number",default:255}]}],render:E,exportLVGL:I,onExportNumericSensors:V};export{F as default};
