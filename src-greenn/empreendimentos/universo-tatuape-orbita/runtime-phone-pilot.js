(() => {
  "use strict";

  const LIVE_HOST = "www.moretegra.com.br";
  const FORM_SELECTOR = "[data-moretegra-lead-form]";
  const FORM_ENDPOINT = "https://back.gdigital.com.br/form/register";
  const TENANT_ID = "313";
  const FORM_ID = "46";
  // Wagner 2026-11-10: canais separados. Form 46 = São Paulo (padrão); form 47 = Rio de Janeiro, só quando a
  // página declara data-form-id="47". Qualquer outro valor cai no 46. Contrato: scripts/lib/commercial-channels.mjs.
  const FORM_IDS = Object.freeze(["46", "47"]);
  function formIdOf(form) {
    const declared = String(form?.dataset?.formId || "");
    return FORM_IDS.includes(declared) ? declared : FORM_ID;
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

  // Country calling codes from Google libphonenumber metadata (Apache-2.0), blob 3136b0c2c76b4d974102d22ab018e4d97b7f50e4.
  const PHONE_COUNTRIES = {"AF":["93","0"],"ZA":["27","0"],"AL":["355","0"],"DE":["49","0"],"AD":["376",""],"AO":["244",""],"AI":["1","1"],"AG":["1","1"],"SA":["966","0"],"DZ":["213","0"],"AR":["54","0"],"AM":["374","0"],"AW":["297",""],"AU":["61","0"],"AT":["43","0"],"AZ":["994","0"],"BS":["1","1"],"BD":["880","0"],"BB":["1","1"],"BH":["973",""],"BE":["32","0"],"BZ":["501",""],"BJ":["229",""],"BM":["1","1"],"BY":["375","8"],"BO":["591","0"],"BA":["387","0"],"BW":["267",""],"BR":["55","0"],"BN":["673",""],"BG":["359","0"],"BF":["226",""],"BI":["257",""],"BT":["975",""],"CV":["238",""],"CM":["237",""],"KH":["855","0"],"CA":["1","1"],"QA":["974",""],"KZ":["7","8"],"TD":["235",""],"CL":["56",""],"CN":["86","0"],"CY":["357",""],"VA":["39",""],"CO":["57","0"],"KM":["269",""],"CD":["243","0"],"KP":["850","0"],"KR":["82","0"],"CI":["225",""],"CR":["506",""],"HR":["385","0"],"CU":["53","0"],"CW":["599",""],"DK":["45",""],"DJ":["253",""],"DM":["1","1"],"EG":["20","0"],"SV":["503",""],"AE":["971","0"],"EC":["593","0"],"ER":["291","0"],"SK":["421","0"],"SI":["386","0"],"ES":["34",""],"SZ":["268",""],"US":["1","1"],"EE":["372",""],"ET":["251","0"],"FJ":["679",""],"PH":["63","0"],"FI":["358","0"],"FR":["33","0"],"GA":["241",""],"GM":["220",""],"GH":["233","0"],"GE":["995","0"],"GI":["350",""],"GD":["1","1"],"GR":["30",""],"GL":["299",""],"GP":["590","0"],"GU":["1","1"],"GT":["502",""],"GG":["44","0"],"GY":["592",""],"GF":["594","0"],"GN":["224",""],"GQ":["240",""],"GW":["245",""],"HT":["509",""],"HN":["504",""],"HK":["852",""],"HU":["36","06"],"YE":["967","0"],"CX":["61","0"],"AC":["247",""],"IM":["44","0"],"NF":["672",""],"AX":["358","0"],"KY":["1","1"],"CC":["61","0"],"CK":["682",""],"FO":["298",""],"FK":["500",""],"MP":["1","1"],"MH":["692","1"],"SB":["677",""],"TC":["1","1"],"VI":["1","1"],"VG":["1","1"],"IN":["91","0"],"ID":["62","0"],"IR":["98","0"],"IQ":["964","0"],"IE":["353","0"],"IS":["354",""],"IL":["972","0"],"IT":["39",""],"JM":["1","1"],"JP":["81","0"],"JE":["44","0"],"JO":["962","0"],"XK":["383","0"],"KW":["965",""],"LA":["856","0"],"LS":["266",""],"LV":["371",""],"LB":["961","0"],"LR":["231","0"],"LY":["218","0"],"LI":["423","0"],"LT":["370","0"],"LU":["352",""],"MO":["853",""],"MK":["389","0"],"MG":["261","0"],"MY":["60","0"],"MW":["265","0"],"MV":["960",""],"ML":["223",""],"MT":["356",""],"MA":["212","0"],"MQ":["596","0"],"MU":["230",""],"MR":["222",""],"YT":["262","0"],"MX":["52",""],"MM":["95","0"],"FM":["691",""],"MZ":["258",""],"MD":["373","0"],"MC":["377","0"],"MN":["976","0"],"ME":["382","0"],"MS":["1","1"],"NA":["264","0"],"NR":["674",""],"NP":["977","0"],"NI":["505",""],"NE":["227",""],"NG":["234","0"],"NU":["683",""],"NO":["47",""],"NC":["687",""],"NZ":["64","0"],"OM":["968",""],"NL":["31","0"],"BQ":["599",""],"PW":["680",""],"PS":["970","0"],"PA":["507",""],"PG":["675",""],"PK":["92","0"],"PY":["595","0"],"PE":["51","0"],"PF":["689",""],"PL":["48",""],"PR":["1","1"],"PT":["351",""],"KE":["254","0"],"KG":["996","0"],"KI":["686","0"],"GB":["44","0"],"CF":["236",""],"CG":["242",""],"DO":["1","1"],"RE":["262","0"],"RO":["40","0"],"RW":["250","0"],"RU":["7","8"],"EH":["212","0"],"WS":["685",""],"AS":["1","1"],"SM":["378",""],"SH":["290",""],"LC":["1","1"],"BL":["590","0"],"KN":["1","1"],"MF":["590","0"],"PM":["508","0"],"ST":["239",""],"VC":["1","1"],"SC":["248",""],"SN":["221",""],"SL":["232","0"],"RS":["381","0"],"SG":["65",""],"SX":["1","1"],"SY":["963","0"],"SO":["252","0"],"LK":["94","0"],"SD":["249","0"],"SS":["211","0"],"SE":["46","0"],"CH":["41","0"],"SR":["597",""],"SJ":["47",""],"TJ":["992",""],"TH":["66","0"],"TW":["886","0"],"TZ":["255","0"],"CZ":["420",""],"IO":["246",""],"TL":["670",""],"TG":["228",""],"TK":["690",""],"TO":["676",""],"TT":["1","1"],"TA":["290",""],"TN":["216",""],"TM":["993","8"],"TR":["90","0"],"TV":["688",""],"UA":["380","0"],"UG":["256","0"],"UY":["598","0"],"UZ":["998",""],"VU":["678",""],"VE":["58","0"],"VN":["84","0"],"WF":["681",""],"ZM":["260","0"],"ZW":["263","0"]};
  function normalizeE164(rawValue, code) {
    const raw = String(rawValue || "").trim();
    if (!raw || !/^\+?[\d\s().-]+$/.test(raw)) return "";
    let n = digits(raw);
    if (raw.startsWith("+") || raw.startsWith("00")) {
      if (raw.startsWith("00")) n=n.slice(2);
      return /^[1-9]\d{6,14}$/.test(n) ? "+"+n : "";
    }
    const meta=PHONE_COUNTRIES[code]; if(!meta)return "";
    const [ddi,prefix]=meta;
    if(code==="BR") {if(n.length===13&&n.startsWith("55"))n=n.slice(2);if(![10,11].includes(n.length))return "";}
    else if(prefix && /^\d+$/.test(prefix) && n.startsWith(prefix)) n=n.slice(prefix.length);
    const full=ddi+n;
    return /^[1-9]\d{6,14}$/.test(full) ? "+"+full : "";
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
      errors.push(code === "BR" ? "Informe um telefone brasileiro válido com DDD." : "Informe um telefone internacional válido.");
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

    const syncCountry = () => { phone.placeholder = country.value === "BR" ? "(11) 99999-9999" : country.value === "OTHER" ? "+ código do país e telefone" : "Telefone com código local"; };
    country.addEventListener("change", syncCountry);

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
        if (!response.ok) throw new Error(`Green Form 46 respondeu HTTP ${response.status}`);
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