// MNT-M2-09 Form 46 lead guard v4.
// Stores only a short-lived submit timestamp. Never reads or stores visitor PII.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const ROOT_SELECTOR = "[data-moretegra]";
  const GREEN_FORM_SELECTOR = "form#form.form-content";
  const GREEN_FORM_SUBMIT_SELECTOR = 'button.g-recaptcha.button_hover[data-action="submit"]';
  const GREEN_FORM_FIELD_NAMES = Object.freeze(["nome", "email", "telefone"]);
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";

  function isGreenForm46(form) {
    if (!(form instanceof HTMLFormElement)) return false;
    if (!form.matches(GREEN_FORM_SELECTOR)) return false;
    if (!form.querySelector(GREEN_FORM_SUBMIT_SELECTOR)) return false;
    return GREEN_FORM_FIELD_NAMES.every((name) => Boolean(form.querySelector(`[name="${name}"]`)));
  }

  function armLeadPending(event) {
    if (window.location.hostname !== CANONICAL_HOST) return;
    if (!document.querySelector(ROOT_SELECTOR)) return;

    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest(GREEN_FORM_SUBMIT_SELECTOR);
    if (!button) return;

    const form = button.closest(GREEN_FORM_SELECTOR);
    if (!isGreenForm46(form)) return;
    // The successful Green redirect to /obrigado is the authoritative second factor.
    // Do not depend on native HTML submit/validity semantics from the reCAPTCHA-driven Green flow.

    try {
      window.sessionStorage.setItem(LEAD_PENDING_KEY, String(Date.now()));
    } catch {
      // A storage failure causes a false negative rather than a manufactured lead.
    }
  }

  document.addEventListener("click", armLeadPending, true);
})();
