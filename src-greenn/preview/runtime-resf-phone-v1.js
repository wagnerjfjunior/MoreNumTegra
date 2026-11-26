(() => {
  "use strict";

  const LIVE_HOST = "www.moretegra.com.br";
  const FORM_SELECTOR = "[data-moretegra-lead-form]";
  const FORM_ENDPOINT = "https://back.gdigital.com.br/form/register";
  const TENANT_ID = "313";
  const FORM_ID = "46";
  // RESF G01: canal explícito SP/46 ou RJ/47; configuração inválida bloqueia envio.
  const FORM_IDS = Object.freeze(["46", "47"]);
  function formIdOf(form) {
    const declared = String(form?.dataset?.formId || "");
    const expected = form?.dataset?.resfRegion === "RJ" ? "47" : form?.dataset?.resfRegion === "SP" ? "46" : "";
    const hidden = form?.querySelector('input[name="form_id"]')?.value;
    return FORM_IDS.includes(declared) && declared === expected && hidden === declared ? declared : "";
  }
  const FORM_TITLE = "MoreEmUmTegra";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v2";
  const LEGACY_LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const CONSENT_KEY = "mnt.consent.v2";
  const REQUEST_TIMEOUT_MS = 15000;
  const CAPIITOLO_WHATSAPP = "5511960779328";
  const WHATSAPP_ICON = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/whatsapp-removebg.webp";
  const LOCATION_MESSAGE = "Por favor me envie a localização exata do Tegra CAPIITOLO by Piero Lissoni.";
  const CAPIITOLO_ROUTE = "/empreendimentos/capiitolo-piero-lissoni/";
  const FORM_INTENT_VALUES = Object.freeze({
    conditions: "Condições e disponibilidade",
    schedule_visit: "Agendar visita",
    payment_simulation: "Simular forma de pagamento",
    specialist: "Falar com especialista",
    negotiate_scenario: "Negociar meu cenário"
  });
  const PROJECT_NAME_OVERRIDES = Object.freeze({
    "Nova Vivere | 72 m²": "Nova Vivere",
    "Nova Vivere | 105 m²": "Nova Vivere",
    "CAPIITOLO by Piero Lissoni | à vista": "CAPIITOLO by Piero Lissoni"
  });
  const NO_PROJECT_CONTEXT = "Página principal | Nenhum empreendimento selecionado";

  function isLiveHost() {
    return window.location.hostname === LIVE_HOST;
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  // RESF_PHONE_V1_BEGIN
  // Derived from Google libphonenumber metadata (Apache-2.0), blob 3136b0c2c76b4d974102d22ab018e4d97b7f50e4.
  const RESF_PHONE_DATA = {"BR":["55","[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}","(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"AR":["54","(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}","0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],"UY":["598","0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}","0",""],"PY":["595","[36-8]\\d{5,8}|4\\d{6,8}|59\\d{6}|9\\d{5,10}|(?:2\\d|5[0-8])\\d{6,7}","0",""],"CL":["56","12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}","",""],"CO":["57","(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}","0([3579]|4(?:[14]4|56))?",""],"PE":["51","(?:[14-8]|9\\d)\\d{7}","0",""],"MX":["52","[2-9]\\d{9}","",""],"US":["1","[2-9]\\d{9}|3\\d{6}","1",""],"CA":["1","[2-9]\\d{9}|3\\d{6}","1",""],"PT":["351","1693\\d{5}|(?:[26-9]\\d|30)\\d{7}","",""],"ES":["34","400\\d{6}|(?:51|[6-9]\\d)\\d{7}","",""],"FR":["33","[1-9]\\d{8}","0",""],"IT":["39","0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?","",""],"DE":["49","[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}","0",""],"GB":["44","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}","0|180020",""],"IE":["353","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}","0",""],"CH":["41","8\\d{11}|[2-9]\\d{8}","0",""],"NL":["31","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}","0",""],"BE":["32","4\\d{8}|[1-9]\\d{7}","0",""],"AE":["971","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}","0",""],"IL":["972","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}","0",""],"JP":["81","00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}","(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0","$1"],"KR":["82","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}","0(8(?:[1-46-8]|5\\d\\d))?",""],"CN":["86","(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}","(1(?:[12]\\d|79)\\d\\d)|0",""],"AU":["61","1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}","(183[12])|0",""],"NZ":["64","11\\d{8,12}|[29]\\d{7,9}|(?:[34]\\d|6[0-35-9])\\d{6}|50\\d{5}(?:\\d{2,3})?|7\\d{7,8}|8\\d{4,9}","0",""],"ZA":["27","[1-79]\\d{8}|8\\d{4,9}","0",""]};
  const RESF_INTERNATIONAL_DDI = ["247","376","971","93","1","355","374","244","54","43","61","297","358","994","387","880","32","226","359","973","257","229","590","673","591","599","55","975","267","375","501","243","236","242","41","225","682","56","237","86","57","506","53","238","357","420","49","253","45","213","593","372","20","212","291","34","251","679","500","691","298","33","241","44","995","594","233","350","299","220","224","240","30","502","245","592","852","504","385","509","36","62","353","972","91","246","964","98","354","39","962","81","254","996","855","686","269","850","82","965","7","856","961","423","94","231","266","370","352","371","218","377","373","382","261","692","389","223","95","976","853","596","222","356","230","960","265","52","60","258","264","687","227","672","234","505","31","47","977","674","683","64","968","507","51","689","675","63","92","48","508","970","351","680","595","974","262","40","381","250","966","677","248","249","46","65","290","386","421","232","378","221","252","597","211","239","503","963","268","235","228","66","992","690","670","993","216","676","90","688","886","255","380","256","598","998","58","84","678","681","685","383","967","27","260","263","800","808","870","878","881","882","883","888","979"];
  function normalizePhone(rawValue,iso,data){
 const raw=String(rawValue||"").trim();
 if(!raw||!/^\+?[\d\s().-]+$/.test(raw))return "";
 const digits=raw.replace(/\D/g,"");
 const explicit=raw.startsWith("+")||raw.startsWith("00");
 const full=raw.startsWith("00")?digits.slice(2):digits;
 const valid=(n,region,record)=>!!n&&n.length+record[0].length<=15&&n.length+record[0].length>=7&&(!(region==="BR")||[10,11].includes(n.length))&&(!["US","CA"].includes(region)||n.length===10)&&new RegExp("^(?:"+record[1]+")$").test(n);
 if(explicit){
  if(!/^[1-9]\d{6,14}$/.test(full))return "";
  if(iso==="OTHER")return RESF_INTERNATIONAL_DDI.some(ddi=>full.startsWith(ddi)&&full.length-ddi.length>=4)?"+"+full:"";
  const rec=data[iso];return rec&&full.startsWith(rec[0])&&valid(full.slice(rec[0].length),iso,rec)?"+"+full:"";
 }
 if(iso==="OTHER"||!data[iso])return "";
 const rec=data[iso];if(valid(digits,iso,rec))return "+"+rec[0]+digits;
 if(rec[2]){
  const re=new RegExp("^(?:"+rec[2]+")"),match=digits.match(re);
  if(match&&match[0].length){
   const transformed=rec[3]&&match.slice(1).some(Boolean)?digits.replace(re,rec[3]):digits.slice(match[0].length);
   if(valid(transformed,iso,rec))return "+"+rec[0]+transformed;
  }
 }
 return "";
}
  function normalizeE164(rawValue, iso) { return normalizePhone(rawValue, iso, RESF_PHONE_DATA); }
  // RESF_PHONE_V1_END

  function formatBrazilPhone(rawValue) {
    const value = digits(rawValue);
    if (value.length > 11) return rawValue;
    if (value.length <= 2) return value;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length <= 10) return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }

  function safeProviderQuery(rawQuery) {
    if (!rawQuery || typeof rawQuery !== "string") return "";
    const source = new URLSearchParams(rawQuery.startsWith("?") ? rawQuery.slice(1) : rawQuery);
    const safe = new URLSearchParams();
    ["l_", "p_id"].forEach((key) => {
      const value = source.get(key);
      if (value && /^\d+$/.test(value)) safe.set(key, value);
    });
    const serialized = safe.toString();
    return serialized ? `?${serialized}` : "";
  }

  function setPendingLead(form) {
    try {
      const marker = {
        version: 2,
        submitted_at: Date.now(),
        form_id: formIdOf(form),
        ...measurementProjectContext(form)
      };
      window.sessionStorage.setItem(LEAD_PENDING_KEY, JSON.stringify(marker));
      window.sessionStorage.removeItem(LEGACY_LEAD_PENDING_KEY);
    } catch {
      // Lead conversion may be undercounted if storage is unavailable; PII is never stored.
    }
  }

  function selectedInterest() {
    return String(document.documentElement.dataset.moretegraInterest || "").trim();
  }

  function showMessage(node, text) {
    if (!node) return;
    node.textContent = text;
    node.hidden = !text;
  }

  function leadProjectContext(form) {
    return String(
      form.dataset.selectedProject ||
      form.dataset.projectName ||
      selectedInterest() ||
      form.dataset.regionContext ||
      NO_PROJECT_CONTEXT
    ).trim();
  }

  function measurementProjectContext(form) {
    if (form.dataset.regionContext && !form.dataset.selectedProject && !selectedInterest()) return {};
    const offerName = leadProjectContext(form);
    if (!offerName || offerName === NO_PROJECT_CONTEXT) return {};
    return {
      project_name: PROJECT_NAME_OVERRIDES[offerName] || offerName,
      offer_name: offerName
    };
  }

  // Form46/SP: preserva o interesse FGTS explicitado na navegação sem alterar o vocabulário
  // de intenção, o contrato Green, o Form47/RJ ou os eventos de Measurement.
  function isFgtsJourney(form) {
    if (formIdOf(form) !== "46") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("origem") === "fgts" || params.get("interesse") === "FGTS para comprar apartamento";
  }

  function composeLeadContext(form) {
    const selectedProject = leadProjectContext(form);
    // Sem projeto escolhido, registra a finalidade da consulta sem inventar um empreendimento.
    // Esta etiqueta pertence só ao payload Green e não substitui project_name no Measurement.
    const project = isFgtsJourney(form) && selectedProject === NO_PROJECT_CONTEXT
      ? "Orientação FGTS na compra de apartamento"
      : selectedProject;
    const intent = String(form.elements["texto-livre"]?.value || "").trim();
    // The CAPIITOLO selector names the project for the visitor, but the CRM context
    // already prefixes the full project name. Keep unit/payment detail without duplication.
    const crmIntent = project === "CAPIITOLO by Piero Lissoni"
      ? intent.replace(/^Condições e disponibilidade — CAPIITOLO, unidade 33, (promocional|à vista)$/, "Condições e disponibilidade — unidade 33, $1")
      : intent;
    const context = crmIntent ? `${project} | ${crmIntent}` : project;
    return isFgtsJourney(form) ? `${context} | Interesse: FGTS` : context;
  }

  function validate(form, countrySelect) {
    const name = form.elements.nome;
    const email = form.elements.email;
    const phone = form.elements.telefone_display;
    const intent = form.elements["texto-livre"];
    const code = String(countrySelect.value || "");
    const normalizedPhone = normalizeE164(phone.value, code);
    const errors = [];
    if (!formIdOf(form)) errors.push("Configuração de atendimento indisponível. Atualize a página e tente novamente.");
    [name, email, phone, countrySelect, intent].forEach((field) => field?.removeAttribute("aria-invalid"));
    if (!String(intent?.value || "").trim()) {
      errors.push("Selecione o que você deseja.");
      intent?.setAttribute("aria-invalid", "true");
    }
    if (!String(name.value || "").trim()) {
      errors.push("Informe seu nome.");
      name.setAttribute("aria-invalid", "true");
    }
    if (!email.validity.valid || !String(email.value || "").trim()) {
      errors.push("Informe um e-mail válido.");
      email.setAttribute("aria-invalid", "true");
    }
    if (!code) {
      errors.push("Selecione o país do telefone.");
      countrySelect.setAttribute("aria-invalid", "true");
    }
    if (!normalizedPhone) {
      errors.push(code === "BR" ? "Informe um telefone brasileiro válido com DDD ou selecione o país correto." : code === "OTHER" ? "Informe o número internacional completo com + ou 00 e DDI." : "Informe um telefone válido para o país selecionado.");
      phone.setAttribute("aria-invalid", "true");
    }
    return {
      valid: errors.length === 0,
      message: errors[0] || "",
      phone: normalizedPhone,
      name: String(name.value || "").trim(),
      email: String(email.value || "").trim(),
      leadContext: composeLeadContext(form)
    };
  }

  function ensureConsentStyle() {
    if (document.getElementById("mnt-runtime-consent-style")) return;
    const style = document.createElement("style");
    style.id = "mnt-runtime-consent-style";
    style.textContent = `
      .mnt-runtime-consent{position:fixed;z-index:9999;left:14px;right:14px;bottom:14px;max-width:780px;margin:0 auto;padding:16px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:#1b1c18;color:#fff;box-shadow:0 16px 50px rgba(0,0,0,.34);font-family:system-ui,sans-serif;display:grid;gap:14px}
      .mnt-runtime-consent[hidden]{display:none!important}
      .mnt-runtime-consent strong{color:#fff}.mnt-runtime-consent p{margin:4px 0 0;color:#ccc8bd;font-size:12px}
      .mnt-runtime-consent-actions{display:flex;flex-wrap:wrap;gap:8px}
      .mnt-runtime-consent button{min-height:46px;border-radius:999px;border:1px solid #777267;background:transparent;color:#fff;padding:9px 14px;font-weight:800;cursor:pointer}
      .mnt-runtime-consent button.is-primary{background:#EBB92E;color:#171813;border-color:#EBB92E}
      .mnt-runtime-consent button:focus-visible{outline:3px solid #EBB92E;outline-offset:3px}
      .mnt-consent-manage{display:inline-flex;align-items:center;justify-content:center;min-height:40px;margin-top:10px;padding:8px 12px;border:1px solid currentColor;border-radius:999px;background:transparent;color:inherit;font:700 12px/1 system-ui,sans-serif;cursor:pointer}
      .mnt-consent-manage[hidden]{display:none!important}
      .mnt-consent-manage:focus-visible{outline:3px solid #EBB92E;outline-offset:3px}
      @media(min-width:720px){.mnt-runtime-consent{left:auto;right:20px;max-width:520px;grid-template-columns:1fr auto;align-items:center}}
    `;
    document.head.append(style);
  }

  function ensureConsentBanner() {
    ensureConsentStyle();
    const existing = document.querySelector("[data-mnt-consent]");
    if (existing) return existing;

    const banner = document.createElement("aside");
    banner.className = "mnt-runtime-consent";
    banner.dataset.mntConsent = "";
    banner.hidden = true;
    banner.setAttribute("aria-label", "Preferências de privacidade");
    banner.innerHTML = `<div><strong>Privacidade</strong><p>Você pode aceitar ou recusar cookies de medição.</p></div><div class="mnt-runtime-consent-actions"><button type="button" data-consent-reject>Recusar</button><button type="button" class="is-primary" data-consent-accept>Aceitar</button></div>`;
    document.body.append(banner);
    return banner;
  }

  function ensureConsentManageControl() {
    ensureConsentStyle();
    const existing = document.querySelector("[data-consent-manage]");
    if (existing) return existing;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mnt-consent-manage";
    button.dataset.consentManage = "";
    button.textContent = "Preferências de privacidade";
    button.hidden = true;
    button.setAttribute("aria-haspopup", "dialog");
    const footer = document.querySelector("[data-mnt-commercial-footer] .mt-footer-standard, [data-mnt-commercial-footer] .footer-standard, [data-mnt-commercial-footer]");
    (footer || document.body).append(button);
    return button;
  }

  function releaseConsentFocus(banner) {
    if (!banner.contains(document.activeElement)) return;

    const candidates = [
      ".mnt-contact-float",
      ".mt-quick-lead",
      "#mt-floating-dock .mt-floating-lead",
      "[data-consent-manage]",
      "main a[href='#formulario']"
    ];
    const target = candidates
      .map((selector) => document.querySelector(selector))
      .find((node) => node instanceof HTMLElement && node.getClientRects().length > 0);

    if (!target) return;

    const transferFocus = () => {
      target.focus({preventScroll: true});
    };

    transferFocus();
    window.requestAnimationFrame(() => {
      if (banner.contains(document.activeElement)) transferFocus();
    });
  }

  function initConsent() {
    if (window.MNTConsent) return; // V3 is the one source of truth on the canonical origin.
    const banner = ensureConsentBanner();
    const manage = ensureConsentManageControl();
    const syncOffset = () => {
      const open = !banner.hidden;
      const offset = open ? Math.ceil(banner.getBoundingClientRect().height + 28) : 14;
      document.documentElement.style.setProperty("--mt-consent-offset", `${offset}px`);
      manage.setAttribute("aria-expanded", String(open));
    };
    const showBanner = () => {
      banner.hidden = false;
      syncOffset();
      banner.querySelector("[data-consent-accept]")?.focus({preventScroll:true});
    };
    const hideBanner = () => {
      banner.hidden = true;
      syncOffset();
    };
    new MutationObserver(syncOffset).observe(banner, {attributes:true, attributeFilter:["hidden"]});
    if ("ResizeObserver" in window) new ResizeObserver(syncOffset).observe(banner);
    window.addEventListener("resize", syncOffset, {passive:true});
    if (!isLiveHost()) {
      banner.hidden = true;
      manage.hidden = true;
      syncOffset();
      return;
    }
    manage.hidden = false;
    if (window.MNTConsent) {
      banner.innerHTML = '<div><strong>Privacidade e cookies</strong><p>Cookies essenciais mantêm o site funcionando. Com sua autorização, usamos Google Analytics e Clarity para análise de navegação e Google Ads para medição e personalização de anúncios. Escolha ou altere suas preferências.</p></div><div class="mnt-runtime-consent-actions"><button type="button" data-v3-reject>Recusar todos</button><button type="button" data-v3-accept>Aceitar todos</button><button type="button" data-v3-custom>Personalizar preferências</button></div><div data-v3-options hidden><label><input type="checkbox" data-v3-analytics> Análise e desempenho</label><br><label><input type="checkbox" data-v3-marketing> Publicidade e marketing</label><br><button type="button" data-v3-save>Salvar preferências</button></div>';
      const q = (s) => banner.querySelector(s);
      const options = q("[data-v3-options]");
      const open = () => { const p=window.MNTConsent.get(); q("[data-v3-analytics]").checked=!!p?.analytics; q("[data-v3-marketing]").checked=!!p?.marketing; options.hidden=true; showBanner(); };
      const save = (a,m) => { if(window.MNTConsent.save(a,m)){hideBanner();releaseConsentFocus(banner);} };
      q("[data-v3-accept]").addEventListener("click",()=>save(true,true));
      q("[data-v3-reject]").addEventListener("click",()=>save(false,false));
      q("[data-v3-custom]").addEventListener("click",()=>{options.hidden=!options.hidden;syncOffset();});
      q("[data-v3-save]").addEventListener("click",()=>save(q("[data-v3-analytics]").checked,q("[data-v3-marketing]").checked));
      manage.textContent="Gerenciar cookies";
      manage.addEventListener("click",open);
      if(window.MNTConsent.get())hideBanner();else open();
      return;
    }
    const emitChoice = (choice) => {
      window.dataLayer = window.dataLayer || [];
      if (window.__mntGtmPilot) {
        window.dataLayer.push({event: choice === "granted" ? "mnt_pilot_analytics_accept" : "mnt_consent_reject"});
        document.dispatchEvent(new Event("mnt:consent-changed"));
      } else {
        window.dataLayer.push({event: choice === "granted" ? "mnt_consent_accept" : "mnt_consent_reject"});
      }
    };
    if (banner.dataset.consentBound !== "true") {
      banner.dataset.consentBound = "true";
      banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
        try { window.localStorage.setItem(CONSENT_KEY, "granted"); } catch {}
        emitChoice("granted");
        hideBanner();
        releaseConsentFocus(banner);
      });
      banner.querySelector("[data-consent-reject]")?.addEventListener("click", () => {
        try { window.localStorage.setItem(CONSENT_KEY, "denied"); } catch {}
        emitChoice("denied");
        hideBanner();
        releaseConsentFocus(banner);
      });
    }
    if (manage.dataset.consentBound !== "true") {
      manage.dataset.consentBound = "true";
      manage.addEventListener("click", showBanner);
    }
    let saved = "";
    try {
      saved = window.localStorage.getItem(CONSENT_KEY) || "";
    } catch {
      saved = "";
    }
    if (saved === "granted" || saved === "denied") {
      hideBanner();
      emitChoice(saved);
      return;
    }
    showBanner();
  }

  function whatsappUrl(message = "") {
    const base = `https://wa.me/${CAPIITOLO_WHATSAPP}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function injectCapiitoloStyles() {
    if (document.querySelector("#mnt-capiitolo-runtime-style")) return;
    const style = document.createElement("style");
    style.id = "mnt-capiitolo-runtime-style";
    style.textContent = `
      .mnt-price-section{background:#0a0a09;color:#fff;padding:clamp(56px,7vw,82px) 0}
      .mnt-price-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,72px);align-items:end}
      .mnt-price-grid>*{min-width:0}
      .mnt-price-label{margin:0 0 12px;font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#EBB92E}
      .mnt-price-amount,.mnt-price-value{font:400 clamp(2.35rem,4.4vw,4.8rem)/1 Georgia,serif;letter-spacing:-.04em;margin:0;overflow-wrap:anywhere}
      .mnt-price-reference{margin:0;font-size:clamp(1rem,1.55vw,1.3rem);line-height:1.45;font-weight:750;letter-spacing:-.01em;overflow-wrap:anywhere}
      .mnt-price-note{max-width:620px;color:#bdb8af;margin:18px 0 0;line-height:1.6}
      .mnt-map-card{overflow:hidden;margin-top:26px;border:1px solid rgba(10,10,9,.18);border-radius:20px;background:#fff}
      .mnt-map-visual{position:relative;height:310px;background:#ddd}
      .mnt-map-frame{display:block;width:100%;height:100%;border:0;pointer-events:none}
      .mnt-map-hit{position:absolute;inset:0;z-index:2;display:block;cursor:pointer}
      .mnt-map-hit:focus-visible{outline:4px solid #EBB92E;outline-offset:-4px}
      .mnt-map-actions{display:grid;gap:10px;padding:14px;background:#171813;color:#fff}
      .mnt-map-copy strong{display:block}.mnt-map-copy small{display:block;margin-top:3px;color:#aaa69b}
      .mnt-map-buttons{display:grid;grid-template-columns:1fr;gap:8px}
      .mnt-map-buttons a{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;padding:0 16px;text-decoration:none;font-size:13px;font-weight:900;text-align:center}
      .mnt-map-whatsapp{background:#EBB92E;color:#171813}
      @media(min-width:620px){.mnt-map-actions{grid-template-columns:minmax(0,1fr) auto;align-items:center}.mnt-map-buttons{grid-template-columns:auto}}
      .mnt-whatsapp-float{position:fixed;right:18px;bottom:var(--mt-consent-offset,18px);z-index:60;width:56px;height:56px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#25d366;text-decoration:none;box-shadow:0 12px 34px rgba(0,0,0,.25)}
      .mnt-whatsapp-float img{width:32px;height:32px;object-fit:contain}
      .mnt-contact-float{position:fixed;right:86px;bottom:var(--mt-consent-offset,18px);z-index:60;min-height:56px;display:flex;align-items:center;justify-content:center;padding:0 18px;border-radius:999px;background:#EBB92E;color:#171813;text-decoration:none;font-size:.8rem;font-weight:850;line-height:1.15;box-shadow:0 12px 34px rgba(0,0,0,.22)}
      .mnt-location-link{font-weight:800;color:inherit;text-decoration:underline;text-underline-offset:3px}
      @media(max-width:900px){.mnt-price-grid{grid-template-columns:1fr;gap:28px}.mnt-map-visual{height:280px}.mnt-whatsapp-float{right:12px;width:54px;height:54px}.mnt-contact-float{left:12px;right:76px;min-height:54px}}
      @media(max-height:400px){.mnt-whatsapp-float,.mnt-contact-float{display:none}}
    `;
    document.head.append(style);
  }

  function initCapiitoloExperience() {
    if (document.documentElement.dataset.mntPageIdentity !== "capiitolo_piero_lissoni") return;

    injectCapiitoloStyles();
    const locationWhatsapp = whatsappUrl(LOCATION_MESSAGE);

    const pilot = document.querySelector(".pilot");
    if (pilot) pilot.textContent = "CAPIITOLO · Chácara Klabin";
    const locationImage = document.querySelector(".location > img");
    if (locationImage instanceof HTMLImageElement) {
      locationImage.src = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Chacara_Klabin.webp";
      locationImage.alt = "Chácara Klabin em São Paulo";
      locationImage.removeAttribute("srcset");
    }

    const locationCard = document.querySelector(".location-card");
    if (locationCard instanceof HTMLElement) {
      locationCard.innerHTML = `
        <p class="eyebrow">Apartamento na Chácara Klabin · localização</p>
        <h2 id="location-title">Viver na Chácara Klabin faz parte do projeto.</h2>
        <p>Veja o ponto do CAPIITOLO na Chácara Klabin. Para receber a localização e organizar a visita, solicite o atendimento pelo WhatsApp.</p>
        <div class="mnt-map-card">
          <div class="mnt-map-visual">
            <iframe class="mnt-map-frame" title="Mapa do CAPIITOLO na Chácara Klabin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" aria-hidden="true" src="https://www.google.com/maps?q=Ch%C3%A1cara%20Klabin%2C%20S%C3%A3o%20Paulo%2C%20SP&z=15&output=embed"></iframe>
            <a class="mnt-map-hit" href="${locationWhatsapp}" target="_blank" rel="noopener" aria-label="Solicitar a localização do CAPIITOLO pelo WhatsApp"></a>
          </div>
          <div class="mnt-map-actions">
            <span class="mnt-map-copy"><strong>Localização do CAPIITOLO</strong><small>Clique no mapa ou use o botão para solicitar a localização e organizar a visita pelo WhatsApp.</small></span>
            <span class="mnt-map-buttons">
              <a class="mnt-map-whatsapp" href="${locationWhatsapp}" target="_blank" rel="noopener">Solicitar localização</a>
            </span>
          </div>
        </div>`;
    }

    const faqFirst = document.querySelector("#faq details:first-of-type p");
    if (faqFirst instanceof HTMLElement) {
      faqFirst.innerHTML = `O CAPIITOLO fica na Chácara Klabin, em São Paulo. <a class="mnt-location-link" href="${locationWhatsapp}" target="_blank" rel="noopener">Solicitar localização e agendar visita</a>.`;
    }

    if (!document.querySelector(".mnt-price-section")) {
      const media = document.querySelector(".media-row");
      if (media) {
        const section = document.createElement("section");
        section.className = "mnt-price-section";
        section.setAttribute("aria-labelledby", "mnt-price-title");
        section.innerHTML = `
          <div class="wrap mnt-price-grid">
            <div>
              <p class="mnt-price-label">A partir de</p>
              <h2 id="mnt-price-title" class="mnt-price-amount" data-commercial-value aria-live="polite">R$ 3.539.900</h2>
            </div>
            <div data-commercial-key="capiitolo">
              <p class="mnt-price-label">Referência comercial</p>
              <p class="mnt-price-reference">Ref. 210 m² · unidade 33 · Ago/26 · pagamento à vista</p>
              <p class="mnt-price-note">Unidade disponível na data de referência. Valor e condições podem mudar; confirme as condições vigentes antes da proposta.</p>
              <a class="btn yellow" href="#formulario">Receber condições <span>↓</span></a>
            </div>
          </div>`;
        media.before(section);
      }
    }

    if (!document.querySelector(".mnt-whatsapp-float")) {
      const badge = document.createElement("a");
      badge.className = "mnt-whatsapp-float";
      badge.href = whatsappUrl();
      badge.target = "_blank";
      badge.rel = "noopener";
      badge.setAttribute("aria-label", "Falar pelo WhatsApp sobre o CAPIITOLO");
      badge.innerHTML = `<img src="${WHATSAPP_ICON}" alt="" width="32" height="32" aria-hidden="true">`;
      document.body.append(badge);
    }

    if (!document.querySelector(".mnt-contact-float")) {
      const contact = document.createElement("a");
      contact.className = "mnt-contact-float";
      contact.href = "#formulario";
      contact.dataset.formIntent = "conditions";
      contact.textContent = "Receber condições";
      contact.setAttribute("aria-label", "Receber condições do CAPIITOLO");
      document.body.append(contact);
    }

    const filmLink = document.querySelector('.film-card a[href*="youtube.com/watch?v=iq50ei83B8U"]');
    if (filmLink instanceof HTMLAnchorElement) {
      filmLink.removeAttribute("target");
      filmLink.removeAttribute("rel");
      filmLink.innerHTML = "Assistir aqui <span>▶</span>";
      filmLink.addEventListener("click", (event) => {
        event.preventDefault();
        const card = filmLink.closest(".film-card");
        if (!(card instanceof HTMLElement) || card.querySelector("iframe[data-capiitolo-film]")) return;
        const poster = card.querySelector("img");
        const copy = card.querySelector(".media-copy");
        if (poster instanceof HTMLElement) poster.hidden = true;
        if (copy instanceof HTMLElement) copy.hidden = true;
        const frame = document.createElement("iframe");
        frame.dataset.capiitoloFilm = "true";
        frame.title = "Filme oficial CAPIITOLO by Piero Lissoni";
        frame.src = "https://www.youtube-nocookie.com/embed/iq50ei83B8U?autoplay=1&playsinline=1&rel=0&modestbranding=1";
        frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        Object.assign(frame.style, {position:"absolute",inset:"0",width:"100%",height:"100%",border:"0",zIndex:"4",background:"#000"});
        card.append(frame);
      }, {once:true});
    }
  }

  function initForm() {
    const form = document.querySelector(FORM_SELECTOR);
    if (!(form instanceof HTMLFormElement)) return;
    const country = form.querySelector("#mt-phone-country");
    const phone = form.querySelector("#mt-lead-phone");
    const contextNode = form.querySelector("[data-lead-context]");
    const honeypot = form.querySelector("#mt-company-website");
    const submit = form.querySelector("[data-moretegra-form-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const idleSubmitLabel = submitLabel?.textContent || "Receber condições";
    const error = form.querySelector("#mt-lead-error");
    const status = form.querySelector("#mt-lead-status");
    let sending = false;

    const syncCountry = () => {
      phone.placeholder = country.value === "BR" ? "(11) 99999-9999" : country.value === "OTHER" ? "+ Código do país e telefone" : "Telefone com código local";
      phone.autocomplete = country.value === "OTHER" ? "tel" : "tel-national";
    };
    country.addEventListener("change", syncCountry);
    phone.addEventListener("input", () => {
      const raw = String(phone.value || "").trim();
      if (raw.startsWith("+") || raw.startsWith("00")) {
        const full = raw.replace(/\D/g, "").slice(raw.startsWith("00") ? 2 : 0);
        const selected = RESF_PHONE_DATA[country.value];
        if (country.value !== "OTHER" && (!selected || !full.startsWith(selected[0]))) {
          const matches = Object.entries(RESF_PHONE_DATA).filter(([key, rec]) => /^[A-Z]{2}$/.test(key) && full.startsWith(rec[0]) && normalizeE164(raw,key));
          if (matches.length === 1) country.value = matches[0][0];
          else if (normalizeE164(raw,"OTHER")) country.value = "OTHER";
          syncCountry();
        }
        return;
      }
      if (country.value === "BR" && /^[\d\s().-]+$/.test(raw) && !raw.startsWith("0") && digits(raw).length <= 11) phone.value = formatBrazilPhone(raw);
    });

    const syncLeadContext = () => {
      if (!contextNode) return;
      const project = leadProjectContext(form);
      const noProject = project === "Página principal | Nenhum empreendimento selecionado";
      contextNode.hidden = !noProject;
      contextNode.textContent = noProject
        ? (formIdOf(form) === "47"
          ? "Nenhum empreendimento selecionado. A central de atendimento RJ ajuda você a comparar as opções."
          : "Nenhum empreendimento selecionado. Sabrina pode ajudar você a comparar as opções.")
        : "";
    };

    const applyFormIntent = (intentKey) => {
      const key = String(intentKey || "").trim();
      const value = FORM_INTENT_VALUES[key];
      const intent = form.elements["texto-livre"];
      if (!value || !(intent instanceof HTMLSelectElement)) return false;
      if (![...intent.options].some((option) => option.value === value)) return false;
      intent.value = value;
      return true;
    };

    document.addEventListener("click", (event) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!element) return;

      const formIntentTarget = element.closest("[data-form-intent]");
      if (formIntentTarget) applyFormIntent(formIntentTarget.dataset.formIntent);

      const interestTarget = element.closest("[data-interest]");
      if (interestTarget) {
        const project = String(interestTarget.dataset.interest || "").trim();
        if (project) {
          form.dataset.selectedProject = project;
          document.documentElement.dataset.moretegraInterest = project;
        }
        window.setTimeout(syncLeadContext, 0);
        return;
      }

      const changeTarget = element.closest("[data-change-interest]");
      if (changeTarget) {
        delete form.dataset.selectedProject;
        document.documentElement.removeAttribute("data-moretegra-interest");
        window.setTimeout(syncLeadContext, 0);
      }
    }, true);

    form.addEventListener("focusin", syncLeadContext, {once:true});

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (sending) return;
      showMessage(error, "");
      showMessage(status, "");
      if (honeypot?.value) {
        showMessage(error, "Não foi possível enviar. Atualize a página e tente novamente.");
        return;
      }
      const result = validate(form, country);
      if (!result.valid) {
        showMessage(error, result.message);
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      if (!isLiveHost()) {
        showMessage(status, "Formulário validado. O envio real fica habilitado somente em www.moretegra.com.br após merge em main.");
        return;
      }

      sending = true;
      submit.disabled = true;
      submitLabel.textContent = "Enviando...";
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const payload = new FormData();
      payload.append("tenant_id", TENANT_ID);
      payload.append("form_id", formIdOf(form));
      payload.append("title", FORM_TITLE);
      payload.append("nome", result.name);
      payload.append("email", result.email);
      payload.append("telefone", result.phone);
      if (result.leadContext) payload.append("texto-livre", result.leadContext);

      try {
        const response = await fetch(FORM_ENDPOINT, {method:"POST",body:payload,mode:"cors",credentials:"omit",signal:controller.signal});
        if (!response.ok) throw new Error(`Green Form respondeu HTTP ${response.status}`);
        let body = {};
        try { body = await response.json(); } catch { body = {}; }
        setPendingLead(form);
        showMessage(status, "Solicitação recebida. Redirecionando...");
        const query = safeProviderQuery(body?.query_params || "");
        window.location.assign(`/obrigado/${query}`);
      } catch (cause) {
        const timedOut = cause?.name === "AbortError";
        showMessage(error, timedOut ? "O envio demorou além do esperado. Tente novamente." : "Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
      } finally {
        window.clearTimeout(timeout);
        sending = false;
        submit.disabled = false;
        submitLabel.textContent = idleSubmitLabel;
      }
    });

    syncCountry();
    syncLeadContext();
  }

  function start() {
    initConsent();
    initCapiitoloExperience();
    initForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();