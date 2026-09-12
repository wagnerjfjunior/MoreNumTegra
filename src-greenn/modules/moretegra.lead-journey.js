// MNT-M2-09 Form 46 lead journey arm v1.
// Creates only opaque journey state. Never reads or stores visitor PII.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const ROOT_SELECTOR = "[data-moretegra]";
  const GREEN_FORM_SELECTOR = "form#form.form-content";
  const GREEN_FORM_SUBMIT_SELECTOR = 'button.g-recaptcha.button_hover[data-action="submit"]';
  const GREEN_FORM_FIELD_NAMES = Object.freeze(["nome", "email", "telefone"]);
  const JOURNEY_KEY = "mnt.lead.journey.v1";
  const SENT_KEY = "mnt.lead.sent.v1";

  function eventId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();

    if (window.crypto?.getRandomValues) {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0"));
      return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
    }

    return `mnt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }

  function isGreenForm46(form) {
    if (!(form instanceof HTMLFormElement)) return false;
    if (!form.matches(GREEN_FORM_SELECTOR)) return false;
    if (!form.querySelector(GREEN_FORM_SUBMIT_SELECTOR)) return false;
    return GREEN_FORM_FIELD_NAMES.every((name) => Boolean(form.querySelector(`[name="${name}"]`)));
  }

  function armLeadJourney(event) {
    if (window.location.hostname !== CANONICAL_HOST) return;
    if (!document.querySelector(ROOT_SELECTOR)) return;

    const form = event.target instanceof HTMLFormElement ? event.target : null;
    if (!isGreenForm46(form)) return;

    const state = {
      event_id: eventId(),
      lead_token: eventId(),
      submitted_at: Date.now()
    };

    try {
      window.sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(state));
      window.sessionStorage.removeItem(SENT_KEY);
    } catch {
      // False negative is safer than manufacturing a lead without journey proof.
    }
  }

  document.addEventListener("submit", armLeadJourney, true);
})();
