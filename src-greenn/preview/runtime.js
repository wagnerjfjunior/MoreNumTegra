(() => {
  "use strict";

  const LIVE_HOST = "www.moretegra.com.br";
  const FORM_SELECTOR = "[data-moretegra-lead-form]";
  const FORM_ENDPOINT = "https://back.gdigital.com.br/form/register";
  const TENANT_ID = "313";
  const FORM_ID = "46";
  const FORM_TITLE = "MoreEmUmTegra";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const CONSENT_KEY = "mnt.consent.v1";
  const REQUEST_TIMEOUT_MS = 15000;
  const CAPIITOLO_WHATSAPP = "5511960779328";
  const LOCATION_MESSAGE = "Solicito agendamento de visita, passe a localização.";
  const CAPIITOLO_ROUTE = "/empreendimentos/capiitolo-piero-lissoni/";

  function isLiveHost() {
    return window.location.hostname === LIVE_HOST;
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function normalizeE164(rawValue, code) {
    const raw = String(rawValue || "").trim();
    if (!raw) return "";
    if (raw.startsWith("+")) {
      const international = digits(raw);
      return international.length >= 7 && international.length <= 15 ? `+${international}` : "";
    }
    const countryDigits = digits(code);
    let national = digits(raw).replace(/^0+/, "");
    if (!countryDigits || !national) return "";
    if (national.startsWith(countryDigits) && national.length > countryDigits.length + 6) {
      const full = national;
      return full.length <= 15 ? `+${full}` : "";
    }
    if (countryDigits === "55" && ![10, 11].includes(national.length)) return "";
    const full = `${countryDigits}${national}`;
    return full.length >= 7 && full.length <= 15 ? `+${full}` : "";
  }

  function formatBrazilPhone(rawValue) {
    const value = digits(rawValue).slice(0, 11);
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

  function setPendingLead() {
    try {
      window.sessionStorage.setItem(LEAD_PENDING_KEY, String(Date.now()));
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

  function validate(form, countrySelect) {
    const name = form.elements.nome;
    const email = form.elements.email;
    const phone = form.elements.telefone_display;
    const code = String(countrySelect.value || "");
    const normalizedPhone = normalizeE164(phone.value, code);
    const errors = [];
    [name, email, phone, countrySelect].forEach((field) => field?.removeAttribute("aria-invalid"));
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
      errors.push(code === "+55" ? "Informe um telefone brasileiro válido com DDD." : "Informe um telefone internacional válido.");
      phone.setAttribute("aria-invalid", "true");
    }
    return {
      valid: errors.length === 0,
      message: errors[0] || "",
      phone: normalizedPhone,
      name: String(name.value || "").trim(),
      email: String(email.value || "").trim(),
      project: String(form.elements["texto-livre"]?.value || "").trim()
    };
  }

  function initConsent() {
    const banner = document.querySelector("[data-mnt-consent]");
    if (!banner) return;
    if (!isLiveHost()) {
      banner.hidden = true;
      return;
    }
    const emitChoice = (choice) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: choice === "granted" ? "mnt_consent_accept" : "mnt_consent_reject"});
    };
    let saved = "";
    try {
      saved = window.localStorage.getItem(CONSENT_KEY) || "";
    } catch {
      saved = "";
    }
    if (saved === "granted" || saved === "denied") {
      banner.hidden = true;
      emitChoice(saved);
      return;
    }
    banner.hidden = false;
    banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
      try { window.localStorage.setItem(CONSENT_KEY, "granted"); } catch {}
      emitChoice("granted");
      banner.hidden = true;
    });
    banner.querySelector("[data-consent-reject]")?.addEventListener("click", () => {
      try { window.localStorage.setItem(CONSENT_KEY, "denied"); } catch {}
      emitChoice("denied");
      banner.hidden = true;
    });
  }

  function whatsappUrl(message = "") {
    const base = `https://wa.me/${CAPIITOLO_WHATSAPP}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function initCapiitoloPortalLink() {
    if (document.documentElement.dataset.mntPageIdentity === "capiitolo_piero_lissoni") return;
    if (!document.getElementById("mnt-capiitolo-card-link-style")) {
      const style = document.createElement("style");
      style.id = "mnt-capiitolo-card-link-style";
      style.textContent = `.mnt-capiitolo-details{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:2px 8px;color:#171813;text-decoration:none;font-size:12px;font-weight:800;letter-spacing:.01em}.mnt-capiitolo-details:hover,.mnt-capiitolo-details:focus-visible{text-decoration:underline;text-underline-offset:3px}`;
      document.head.append(style);
    }
    const enhance = () => {
      document.querySelectorAll(".mt-project-card").forEach((card) => {
        const title = card.querySelector("h3")?.textContent?.trim();
        if (title !== "CAPIITOLO by Piero Lissoni") return;
        const actions = card.querySelector(".mt-project-actions");
        if (!actions || actions.querySelector("[data-capiitolo-project-link]")) return;
        actions.style.gridTemplateColumns = "1fr";
        actions.style.gap = "8px";
        const link = document.createElement("a");
        link.className = "mnt-capiitolo-details";
        link.href = CAPIITOLO_ROUTE;
        link.dataset.capiitoloProjectLink = "true";
        link.textContent = "Ver empreendimento →";
        actions.append(link);
      });
    };
    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.documentElement, {subtree:true, childList:true});
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  function injectCapiitoloStyles() {
    if (document.querySelector("#mnt-capiitolo-runtime-style")) return;
    const style = document.createElement("style");
    style.id = "mnt-capiitolo-runtime-style";
    style.textContent = `
      .mnt-price-section{background:#0a0a09;color:#fff;padding:82px 0}
      .mnt-price-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:8vw;align-items:end}
      .mnt-price-label{margin:0 0 12px;font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#EBB92E}
      .mnt-price-value{font:400 clamp(3rem,7vw,6.5rem)/.95 Georgia,serif;letter-spacing:-.045em;margin:0}
      .mnt-price-note{max-width:620px;color:#bdb8af;margin:18px 0 0}
      .mnt-map-link{display:block;position:relative;margin-top:26px;border:1px solid rgba(10,10,9,.18);background:#ddd;text-decoration:none;color:inherit;overflow:hidden}
      .mnt-map-frame{width:100%;height:310px;border:0;pointer-events:none}
      .mnt-map-cta{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:15px 18px;background:#EBB92E;color:#111;font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      .mnt-whatsapp-float{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:10px;padding:14px 16px;border-radius:999px;background:#25D366;color:#071b0e;text-decoration:none;font-weight:800;box-shadow:0 12px 34px rgba(0,0,0,.25)}
      .mnt-whatsapp-dot{width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 3px #25D366}
      .mnt-whatsapp-float span{font-size:.78rem}
      .mnt-location-link{font-weight:800;color:inherit;text-decoration:underline;text-underline-offset:3px}
      @media(max-width:900px){.mnt-price-grid{grid-template-columns:1fr;gap:28px}.mnt-map-frame{height:260px}.mnt-whatsapp-float{right:12px;bottom:12px;padding:13px 14px}.mnt-whatsapp-float span{display:none}}
    `;
    document.head.append(style);
  }

  function initCapiitoloExperience() {
    if (document.documentElement.dataset.mntPageIdentity !== "capiitolo_piero_lissoni") return;

    injectCapiitoloStyles();
    const locationWhatsapp = whatsappUrl(LOCATION_MESSAGE);

    const pilot = document.querySelector(".pilot");
    if (pilot) pilot.textContent = "CAPIITOLO · Chácara Klabin";
    const footerText = document.querySelector(".footer .footer-in span");
    if (footerText) footerText.textContent = "MoreTegra · More em um Tegra · CAPIITOLO";

    const facts = document.querySelectorAll(".facts .fact");
    const locationFact = facts[3];
    if (locationFact) {
      const value = locationFact.querySelector("b");
      const label = locationFact.querySelector("span");
      if (value) value.textContent = "Chácara Klabin";
      if (label) label.textContent = "São Paulo";
    }

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
        <p>Veja a localização do CAPIITOLO no mapa. Ao tocar, você abre o WhatsApp para solicitar a localização e agendar sua visita.</p>
        <a class="mnt-map-link" href="${locationWhatsapp}" target="_blank" rel="noopener" aria-label="Solicitar localização do CAPIITOLO pelo WhatsApp">
          <iframe class="mnt-map-frame" title="Localização do CAPIITOLO na Chácara Klabin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Rua+Ibaragui+Nissui,+Chacara+Klabin,+Sao+Paulo,+SP&output=embed"></iframe>
          <span class="mnt-map-cta">Solicitar localização para visita <b>WhatsApp ↗</b></span>
        </a>`;
    }

    const faqFirst = document.querySelector("#faq details:first-of-type p");
    if (faqFirst instanceof HTMLElement) {
      faqFirst.innerHTML = `Rua Ibaragui Nissui, Chácara Klabin, São Paulo. <a class="mnt-location-link" href="${locationWhatsapp}" target="_blank" rel="noopener">Solicitar localização</a>.`;
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
              <p class="mnt-price-label">Valores</p>
              <h2 id="mnt-price-title" class="display">Condições atuais.</h2>
            </div>
            <div data-commercial-key="capiitolo">
              <p class="mnt-price-label">A partir de</p>
              <p class="mnt-price-value" data-commercial-value aria-live="polite">R$ 3.647.490</p>
              <p class="mnt-price-note">Unidade 24 · 210 m² · R$ 17.369/m² · Valor a partir de R$ 3.647.490. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes.</p>
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
      badge.innerHTML = '<i class="mnt-whatsapp-dot" aria-hidden="true"></i><span>WhatsApp</span>';
      document.body.append(badge);
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
    const project = form.querySelector("#mt-lead-project");
    const honeypot = form.querySelector("#mt-company-website");
    const submit = form.querySelector("[data-moretegra-form-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const idleSubmitLabel = submitLabel?.textContent || "Receber condições";
    const error = form.querySelector("#mt-lead-error");
    const status = form.querySelector("#mt-lead-status");
    let sending = false;

    const syncCountry = () => {
      phone.placeholder = country.value === "+55" ? "(11) 99999-9999" : "Telefone com código local";
      if (country.value === "+55") phone.value = formatBrazilPhone(phone.value);
    };

    country.addEventListener("change", syncCountry);
    phone.addEventListener("input", () => {
      if (country.value === "+55" && !String(phone.value).trim().startsWith("+")) phone.value = formatBrazilPhone(phone.value);
    });

    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-interest]") : null;
      if (!target) return;
      window.setTimeout(() => {
        const interest = selectedInterest() || String(target.dataset.interest || "").trim();
        if (interest) project.value = interest;
      }, 0);
    }, true);

    form.addEventListener("focusin", () => {
      const interest = selectedInterest();
      if (interest && !project.value.trim()) project.value = interest;
    }, {once:true});

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
      payload.append("form_id", FORM_ID);
      payload.append("title", FORM_TITLE);
      payload.append("nome", result.name);
      payload.append("email", result.email);
      payload.append("telefone", result.phone);
      if (result.project) payload.append("texto-livre", result.project);

      try {
        const response = await fetch(FORM_ENDPOINT, {method:"POST",body:payload,mode:"cors",credentials:"omit",signal:controller.signal});
        if (!response.ok) throw new Error(`Green Form 46 respondeu HTTP ${response.status}`);
        let body = {};
        try { body = await response.json(); } catch { body = {}; }
        setPendingLead();
        showMessage(status, "Solicitação recebida. Redirecionando...");
        const query = safeProviderQuery(body?.query_params || "");
        window.location.assign(`/obrigado${query}`);
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
  }

  function start() {
    initConsent();
    initCapiitoloPortalLink();
    initCapiitoloExperience();
    initForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();