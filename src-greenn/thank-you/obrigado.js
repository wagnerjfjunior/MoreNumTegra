// MoreNumTegra thank-you page lifecycle v3.
// A verified lead requires both a fresh Form 46 submit-attempt marker and the observed Green success redirect signature.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const THANK_YOU_ROUTE = "/obrigado";
  const ROOT_SELECTOR = "[data-moretegra-thank-you]";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const LEAD_MAX_AGE_MS = 10 * 60 * 1000;
  const EVENT_VERSION = 1;
  const GREEN_SOURCE_PAGE_ID = "292";
  const GREEN_LEAD_PARAM = "l_";
  const GREEN_PAGE_PARAM = "p_id";

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
      return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
    }

    return `mnt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
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

  function hasGreenSuccessRedirectSignature() {
    const params = new URLSearchParams(window.location.search || "");
    const leadRef = String(params.get(GREEN_LEAD_PARAM) || "").trim();
    const sourcePage = String(params.get(GREEN_PAGE_PARAM) || "").trim();
    if (sourcePage !== GREEN_SOURCE_PAGE_ID) return false;
    return /^[1-9]\d*$/.test(leadRef);
  }

  function consumeFreshPendingLead() {
    try {
      const raw = window.sessionStorage.getItem(LEAD_PENDING_KEY) || "";
      const submittedAt = Number(raw);
      if (!Number.isFinite(submittedAt) || submittedAt <= 0) return false;

      const age = Date.now() - submittedAt;
      window.sessionStorage.removeItem(LEAD_PENDING_KEY);
      if (age < 0 || age > LEAD_MAX_AGE_MS) return false;

      return window.sessionStorage.getItem(LEAD_PENDING_KEY) === null;
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

    const hasSuccessSignature = hasGreenSuccessRedirectSignature();
    const hasFreshPending = consumeFreshPendingLead();
    if (!hasSuccessSignature || !hasFreshPending) return false;

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
