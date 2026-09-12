// MoreNumTegra thank-you page lifecycle v1.
// RESF-aligned lead gate: thank-you route alone never creates a lead.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const THANK_YOU_ROUTE = "/obrigado";
  const ROOT_SELECTOR = "[data-moretegra-thank-you]";
  const JOURNEY_KEY = "mnt.lead.journey.v1";
  const SENT_KEY = "mnt.lead.sent.v1";
  const LEAD_MAX_AGE_MS = 10 * 60 * 1000;
  const EVENT_VERSION = 1;

  function normalizedPath() {
    const path = window.location.pathname.replace(/\/+$/, "");
    return path || "/";
  }

  function ensureMeta(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  function applyPageMetadata() {
    document.title = "Obrigado | More em um Tegra";
    ensureMeta("description", "Obrigado pelo interesse no portfólio More em um Tegra. Continue o atendimento com a Tegra Vendas.");
    ensureMeta("robots", "noindex,nofollow");
    ensureMeta("googlebot", "noindex,nofollow");
    document.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove());
  }

  function readJourney() {
    try {
      const raw = window.sessionStorage.getItem(JOURNEY_KEY);
      if (!raw) return null;
      const state = JSON.parse(raw);
      if (!state || typeof state !== "object") return null;
      return state;
    } catch {
      return null;
    }
  }

  function validOpaqueValue(value) {
    return typeof value === "string" && value.length >= 12 && value.length <= 128 && /^[A-Za-z0-9-]+$/.test(value);
  }

  function isFreshJourney(state) {
    const submittedAt = Number(state?.submitted_at);
    if (!Number.isFinite(submittedAt) || submittedAt <= 0) return false;
    const age = Date.now() - submittedAt;
    return age >= 0 && age <= LEAD_MAX_AGE_MS;
  }

  function isAlreadySent(eventId) {
    try {
      return window.sessionStorage.getItem(SENT_KEY) === eventId;
    } catch {
      return true;
    }
  }

  function consumeJourney(state) {
    try {
      window.sessionStorage.setItem(SENT_KEY, state.event_id);
      window.sessionStorage.removeItem(JOURNEY_KEY);
      return true;
    } catch {
      return false;
    }
  }

  function markVerifiedUi(root) {
    root.dataset.leadState = "verified";
    const eyebrow = root.querySelector("[data-thanks-eyebrow]");
    const message = root.querySelector("[data-thanks-message]");
    if (eyebrow) eyebrow.textContent = "SOLICITAÇÃO RECEBIDA";
    if (message) {
      message.textContent = "Recebemos sua solicitação. O atendimento seguirá com a Tegra Vendas para confirmar disponibilidade e condições atualizadas.";
    }
  }

  function emitVerifiedLead(root) {
    if (window.location.hostname !== CANONICAL_HOST) return false;
    if (normalizedPath() !== THANK_YOU_ROUTE) return false;

    const state = readJourney();
    if (!state) return false;
    if (!validOpaqueValue(state.event_id) || !validOpaqueValue(state.lead_token)) return false;
    if (!isFreshJourney(state) || isAlreadySent(state.event_id)) return false;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "mnt_lead_success",
      mnt_event_id: state.event_id,
      mnt_event_version: EVENT_VERSION,
      page_identity: "moretegra_thank_you",
      product_identity: "moretegra_portfolio",
      route: THANK_YOU_ROUTE,
      funnel_stage: "lead",
      form_provider: "green",
      form_id: 46,
      form_name: "MoreEmUmTegra",
      lead_method: "green_form_46",
      placement: "form_46",
      lead_token: state.lead_token
    });

    if (!consumeJourney(state)) return false;
    markVerifiedUi(root);
    return true;
  }

  function start() {
    applyPageMetadata();
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root) return;
    emitVerifiedLead(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {once: true});
  } else {
    start();
  }
})();
