(() => {
  "use strict";

  const CONFIG = Object.freeze({
    tegraLogo: "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp",
    formEndpoint: "https://back.gdigital.com.br/form/register",
    tenantId: "313",
    formId: "46",
    campaignId: "31",
    formTitle: "MoreEmUmTegra",
    whatsappUrl: ""
  });

  const STAGE_CLASS = Object.freeze({
    "Pronto para Morar": "stage-ready",
    "Em construção": "stage-building",
    "Lançamento": "stage-launch"
  });

  // Catálogo inicial: só entram dados sustentados por fonte validada.
  // Novos itens devem seguir o mesmo contrato sem inventar endereço, preço,
  // metragem, estágio, imagem ou condição comercial.
  const DEVELOPMENTS = Object.freeze([
    {
      id: "elo-duo-caminhos-da-lapa",
      name: "ELO Duo",
      region: "Caminhos da Lapa",
      stage: "Pronto para Morar",
      description: "Empreendimento Tegra no Caminhos da Lapa.",
      image: "",
      alt: "",
      highlights: [],
      url: ""
    }
  ]);

  const $ = (selector, root = document) => root.querySelector(selector);

  const elements = {
    grid: $("#development-grid"),
    emptyState: $("#empty-state"),
    summary: $("#catalog-summary"),
    region: $("#filter-region"),
    stage: $("#filter-stage"),
    reset: $("#filter-reset"),
    emptyReset: $("#empty-reset"),
    form: $("#moretegra-lead-form"),
    name: $("#lead-name"),
    email: $("#lead-email"),
    phone: $("#lead-phone"),
    submit: $("#lead-submit"),
    status: $("#lead-status"),
    whatsapp: $("#moretegra-whatsapp")
  };

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function stageClass(stage) {
    return STAGE_CLASS[stage] || "stage-building";
  }

  function populateRegions() {
    const regions = [...new Set(DEVELOPMENTS.map((item) => item.region).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "pt-BR"));

    regions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      elements.region.appendChild(option);
    });
  }

  function cardMarkup(item) {
    const imageMarkup = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.name)}" loading="lazy" decoding="async">`
      : `<img class="development-placeholder" src="${escapeHtml(CONFIG.tegraLogo)}" alt="" loading="lazy" decoding="async">`;

    const highlights = Array.isArray(item.highlights) && item.highlights.length
      ? `<div class="development-meta">${item.highlights
          .map((highlight) => `<span class="meta-pill">${escapeHtml(highlight)}</span>`)
          .join("")}</div>`
      : "";

    const primaryAction = item.url
      ? `<a class="button button-ghost" href="${escapeHtml(item.url)}">Ver detalhes</a>`
      : `<button class="button button-ghost js-request-info" type="button" data-development="${escapeHtml(item.name)}">Tenho interesse</button>`;

    return `
      <article class="development-card" data-region="${escapeHtml(item.region)}" data-stage="${escapeHtml(item.stage)}">
        <div class="development-media">
          ${imageMarkup}
          <span class="stage-badge ${stageClass(item.stage)}">${escapeHtml(item.stage)}</span>
        </div>
        <div class="development-body">
          <p class="development-location">${escapeHtml(item.region)}</p>
          <h3 class="development-title">${escapeHtml(item.name)}</h3>
          <p class="development-description">${escapeHtml(item.description)}</p>
          ${highlights}
          <div class="development-actions">
            ${primaryAction}
            <button class="button button-primary js-request-info" type="button" data-development="${escapeHtml(item.name)}">Receber condições</button>
          </div>
        </div>
      </article>
    `;
  }

  function filteredDevelopments() {
    const selectedRegion = elements.region.value;
    const selectedStage = elements.stage.value;

    return DEVELOPMENTS.filter((item) => {
      const regionMatches = selectedRegion === "all" || item.region === selectedRegion;
      const stageMatches = selectedStage === "all" || item.stage === selectedStage;
      return regionMatches && stageMatches;
    });
  }

  function renderCatalog() {
    const items = filteredDevelopments();
    elements.grid.innerHTML = items.map(cardMarkup).join("");
    elements.emptyState.hidden = items.length !== 0;
    elements.summary.textContent = `${items.length} ${items.length === 1 ? "empreendimento" : "empreendimentos"} exibido${items.length === 1 ? "" : "s"}.`;

    document.querySelectorAll(".js-request-info").forEach((button) => {
      button.addEventListener("click", () => {
        const development = button.dataset.development || "";
        scrollToLeadForm(development);
      });
    });
  }

  function clearFilters() {
    elements.region.value = "all";
    elements.stage.value = "all";
    renderCatalog();
  }

  function scrollToLeadForm(developmentName = "") {
    const section = $("#atendimento");
    if (!section) return;

    section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

    if (developmentName) {
      setStatus(`Interesse selecionado: ${developmentName}. Preencha seus dados para continuar.`, "");
    }

    window.setTimeout(() => elements.name?.focus({ preventScroll: true }), 350);
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function formatPhone(value) {
    const digits = digitsOnly(value).slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function isValidName(value) {
    return value.trim().replace(/\s+/g, " ").length >= 3;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
  }

  function isValidPhone(value) {
    const digits = digitsOnly(value);
    return digits.length === 10 || digits.length === 11;
  }

  function setFieldError(input, message) {
    if (!input) return;
    const error = $(`#${input.id}-error`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validateForm() {
    const nameValue = elements.name.value.trim();
    const emailValue = elements.email.value.trim();
    const phoneValue = elements.phone.value.trim();

    const nameError = isValidName(nameValue) ? "" : "Informe seu nome.";
    const emailError = isValidEmail(emailValue) ? "" : "Informe um e-mail válido.";
    const phoneError = isValidPhone(phoneValue) ? "" : "Informe um telefone com DDD.";

    setFieldError(elements.name, nameError);
    setFieldError(elements.email, emailError);
    setFieldError(elements.phone, phoneError);

    return !nameError && !emailError && !phoneError;
  }

  function setStatus(message, kind = "") {
    elements.status.textContent = message;
    elements.status.classList.toggle("is-success", kind === "success");
    elements.status.classList.toggle("is-error", kind === "error");
  }

  function isLabEnvironment() {
    const host = window.location.hostname.toLowerCase();
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".vercel.app") ||
      host.endsWith(".github.io") ||
      host === ""
    );
  }

  async function submitLead(event) {
    event.preventDefault();

    if (elements.submit.disabled) return;
    setStatus("");

    if (!validateForm()) {
      setStatus("Revise os campos destacados.", "error");
      const invalid = elements.form.querySelector('[aria-invalid="true"]');
      invalid?.focus();
      return;
    }

    elements.submit.disabled = true;
    const originalLabel = elements.submit.textContent;
    elements.submit.textContent = "Enviando...";

    try {
      if (isLabEnvironment()) {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        setStatus("Laboratório validado: nenhum dado foi enviado para fora do Preview.", "success");
        return;
      }

      const payload = new FormData();
      payload.set("tenant_id", CONFIG.tenantId);
      payload.set("form_id", CONFIG.formId);
      payload.set("campaign_id", CONFIG.campaignId);
      payload.set("title", CONFIG.formTitle);
      payload.set("nome", elements.name.value.trim());
      payload.set("email", elements.email.value.trim());
      payload.set("telefone", elements.phone.value.trim());

      const response = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      elements.form.reset();
      setFieldError(elements.name, "");
      setFieldError(elements.email, "");
      setFieldError(elements.phone, "");
      setStatus("Dados enviados. O atendimento dará continuidade ao seu contato.", "success");
    } catch (error) {
      console.error("MoreNumTegra lead submission failed:", error);
      setStatus("Não foi possível enviar agora. Tente novamente em instantes.", "error");
    } finally {
      elements.submit.disabled = false;
      elements.submit.textContent = originalLabel;
    }
  }

  function handleWhatsapp() {
    if (CONFIG.whatsappUrl) {
      window.open(CONFIG.whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    scrollToLeadForm();
    setStatus("O destino final do WhatsApp ainda não foi validado. Use o formulário para atendimento.", "");
  }

  function bindEvents() {
    elements.region.addEventListener("change", renderCatalog);
    elements.stage.addEventListener("change", renderCatalog);
    elements.reset.addEventListener("click", clearFilters);
    elements.emptyReset.addEventListener("click", clearFilters);
    elements.form.addEventListener("submit", submitLead);
    elements.whatsapp.addEventListener("click", handleWhatsapp);

    elements.phone.addEventListener("input", (event) => {
      const caretAtEnd = event.target.selectionStart === event.target.value.length;
      event.target.value = formatPhone(event.target.value);
      if (caretAtEnd) {
        event.target.setSelectionRange(event.target.value.length, event.target.value.length);
      }
      setFieldError(elements.phone, "");
    });

    [elements.name, elements.email].forEach((input) => {
      input.addEventListener("input", () => setFieldError(input, ""));
    });
  }

  function init() {
    if (!elements.grid || !elements.form) return;
    populateRegions();
    bindEvents();
    renderCatalog();

    if (isLabEnvironment()) {
      document.documentElement.dataset.environment = "preview";
    }
  }

  init();
})();
