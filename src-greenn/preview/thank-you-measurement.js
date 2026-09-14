// MoreNumTegra Vercel thank-you conversion adapter.
// V1 client-side proof: a fresh marker is written only after a successful Green Form 46 HTTP response.
(() => {
  "use strict";

  const ELIGIBLE_HOST = "www.moretegra.com.br";
  const THANK_YOU_ROUTE = "/obrigado";
  const ROOT_SELECTOR = "[data-moretegra-thank-you]";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const CONSENT_KEY = "mnt.consent.v1";
  const LEAD_MAX_AGE_MS = 10 * 60 * 1000;
  const EVENT_VERSION = 1;
  const RUN_MARKER = Symbol.for("morenumtegra.vercel.lead_success.v1");

  function normalizedPath() {
    const path = window.location.pathname.replace(/\/+$/, "");
    return path || "/";
  }

  function eventId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    if (window.crypto?.getRandomValues) {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0"));
      return `${hex.slice(0,4).join("")}-${hex.slice(4,6).join("")}-${hex.slice(6,8).join("")}-${hex.slice(8,10).join("")}-${hex.slice(10).join("")}`;
    }
    return `mnt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,12)}`;
  }

  function consumeFreshPendingLead() {
    try {
      const submittedAt = Number(window.sessionStorage.getItem(LEAD_PENDING_KEY) || "");
      if (!Number.isFinite(submittedAt) || submittedAt <= 0) return false;
      const age = Date.now() - submittedAt;
      window.sessionStorage.removeItem(LEAD_PENDING_KEY);
      return age >= 0 && age <= LEAD_MAX_AGE_MS;
    } catch {
      return false;
    }
  }

  function markAcceptedLeadUi(root) {
    root.dataset.leadState = "accepted";
    const eyebrow = root.querySelector("[data-thanks-eyebrow]");
    const message = root.querySelector("[data-thanks-message]");
    if (eyebrow) eyebrow.textContent = "SOLICITAÇÃO RECEBIDA";
    if (message) message.textContent = "Recebemos sua solicitação. O atendimento seguirá com a Tegra Vendas para confirmar disponibilidade e condições atualizadas.";
  }

  function restoreConsent() {
    if (window.location.hostname !== ELIGIBLE_HOST) return;
    let saved = "";
    try { saved = window.localStorage.getItem(CONSENT_KEY) || ""; } catch { saved = ""; }
    if (saved !== "granted" && saved !== "denied") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: saved === "granted" ? "mnt_consent_accept" : "mnt_consent_reject"});
  }

  function emit(root) {
    if (window[RUN_MARKER]) return false;
    if (window.location.hostname !== ELIGIBLE_HOST || normalizedPath() !== THANK_YOU_ROUTE) return false;
    if (!consumeFreshPendingLead()) return false;

    window[RUN_MARKER] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mnt_lead_success",
      mnt_event_id: eventId(),
      mnt_event_version: EVENT_VERSION,
      page_identity: "moretegra_thank_you",
      product_identity: "moretegra_portfolio",
      route: THANK_YOU_ROUTE,
      funnel_stage: "lead",
      form_provider: "green",
      form_id: 46,
      form_name: "MoreEmUmTegra",
      lead_method: "green_form_46",
      placement: "form_46"
    });
    markAcceptedLeadUi(root);
    return true;
  }

  function start() {
    restoreConsent();
    const root = document.querySelector(ROOT_SELECTOR);
    if (root) return emit(root);
    const observer = new MutationObserver(() => {
      const next = document.querySelector(ROOT_SELECTOR);
      if (!next) return;
      observer.disconnect();
      emit(next);
    });
    observer.observe(document.documentElement, {childList:true,subtree:true});
    window.setTimeout(() => observer.disconnect(), 10000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();