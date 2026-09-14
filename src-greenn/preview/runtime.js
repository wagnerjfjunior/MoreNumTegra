(() => {
  "use strict";

  const LIVE_HOST = "lp.moretegra.com.br";
  const FORM_SELECTOR = "[data-moretegra-lead-form]";
  const FORM_ENDPOINT = "https://back.gdigital.com.br/form/register";
  const TENANT_ID = "313";
  const FORM_ID = "46";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const CONSENT_KEY = "mnt.consent.v1";
  const REQUEST_TIMEOUT_MS = 15000;

  function isLiveHost() {
    return window.location.hostname === LIVE_HOST;
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function dialCode(countrySelect, manualInput) {
    if (countrySelect.value !== "other") return countrySelect.value;
    const value = digits(manualInput.value);
    return value ? `+${value}` : "";
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

  function validate(form, countrySelect, manualDdi) {
    const name = form.elements.nome;
    const email = form.elements.email;
    const phone = form.elements.telefone_display;
    const code = dialCode(countrySelect, manualDdi);
    const normalizedPhone = normalizeE164(phone.value, code);
    const errors = [];

    [name, email, phone, countrySelect, manualDdi].forEach((field) => field?.removeAttribute("aria-invalid"));

    if (!String(name.value || "").trim()) {
      errors.push("Informe seu nome.");
      name.setAttribute("aria-invalid", "true");
    }

    if (!email.validity.valid || !String(email.value || "").trim()) {
      errors.push("Informe um e-mail válido.");
      email.setAttribute("aria-invalid", "true");
    }

    if (!code) {
      errors.push("Informe o DDI do telefone.");
      (countrySelect.value === "other" ? manualDdi : countrySelect).setAttribute("aria-invalid", "true");
    }

    if (!normalizedPhone) {
      errors.push(countrySelect.value === "+55" ? "Informe um telefone brasileiro válido com DDD." : "Informe um telefone internacional válido.");
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

  function initForm() {
    const form = document.querySelector(FORM_SELECTOR);
    if (!(form instanceof HTMLFormElement)) return;

    const country = form.querySelector("#mt-phone-country");
    const manualDdiField = form.querySelector(".mt-field-ddi");
    const manualDdi = form.querySelector("#mt-phone-ddi");
    const phone = form.querySelector("#mt-lead-phone");
    const project = form.querySelector("#mt-lead-project");
    const honeypot = form.querySelector("#mt-company-website");
    const submit = form.querySelector("[data-moretegra-form-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const error = form.querySelector("#mt-lead-error");
    const status = form.querySelector("#mt-lead-status");
    let sending = false;

    const syncCountry = () => {
      const other = country.value === "other";
      manualDdiField.hidden = !other;
      manualDdi.required = other;
      phone.placeholder = country.value === "+55" ? "(11) 99999-9999" : "Telefone com código local";
      if (country.value === "+55") phone.value = formatBrazilPhone(phone.value);
    };

    country.addEventListener("change", syncCountry);
    phone.addEventListener("input", () => {
      if (country.value === "+55" && !String(phone.value).trim().startsWith("+")) {
        phone.value = formatBrazilPhone(phone.value);
      }
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
    }, {once: true});

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (sending) return;
      showMessage(error, "");
      showMessage(status, "");

      if (honeypot?.value) {
        showMessage(error, "Não foi possível enviar. Atualize a página e tente novamente.");
        return;
      }

      const result = validate(form, country, manualDdi);
      if (!result.valid) {
        showMessage(error, result.message);
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      if (!isLiveHost()) {
        showMessage(status, "Formulário validado. O envio real fica habilitado somente em lp.moretegra.com.br após merge em main.");
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
      payload.append("nome", result.name);
      payload.append("email", result.email);
      payload.append("telefone", result.phone);
      if (result.project) payload.append("texto-livre", result.project);

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: payload,
          mode: "cors",
          credentials: "omit",
          signal: controller.signal
        });

        if (!response.ok) throw new Error(`Green Form 46 respondeu HTTP ${response.status}`);

        let body = {};
        try { body = await response.json(); } catch { body = {}; }

        setPendingLead();
        showMessage(status, "Solicitação recebida. Redirecionando...");
        const query = safeProviderQuery(body?.query_params || "");
        window.location.assign(`/obrigado${query}`);
      } catch (cause) {
        const timedOut = cause?.name === "AbortError";
        showMessage(error, timedOut
          ? "O envio demorou além do esperado. Tente novamente."
          : "Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
      } finally {
        window.clearTimeout(timeout);
        sending = false;
        submit.disabled = false;
        submitLabel.textContent = "Receber condições";
      }
    });

    syncCountry();
  }

  function start() {
    initConsent();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {once: true});
  } else {
    start();
  }
})();
