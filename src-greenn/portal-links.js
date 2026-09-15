(() => {
  "use strict";

  const PAGE_BY_TITLE = Object.freeze({
    "Caminhos da Lapa Elo Duo": {
      projectId: "caminhos-da-lapa-elo-duo",
      url: "/empreendimentos/caminhos-da-lapa-elo-duo/"
    }
  });

  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  let commercialByProject = null;

  function installStyle() {
    if (document.getElementById("mt-project-page-link-style")) return;
    const style = document.createElement("style");
    style.id = "mt-project-page-link-style";
    style.textContent = `
      .mt-project-actions[data-has-project-page="true"]{grid-template-columns:1fr!important;gap:8px!important}
      .mt-project-details{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:2px 8px;color:#171813;text-decoration:none;font-size:12px;font-weight:800;letter-spacing:.01em}
      .mt-project-details:hover,.mt-project-details:focus-visible{text-decoration:underline;text-underline-offset:3px}
      .mt-pilot-commercial{margin-top:14px;padding-top:14px;border-top:1px solid #e3ded3;display:grid;gap:6px}
      .mt-pilot-commercial-label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#8a6a10}
      .mt-pilot-commercial-price{font-size:1.3rem;line-height:1.15;color:#171813}
      .mt-pilot-commercial-note{font-size:13px;line-height:1.5;color:#625f57}
    `;
    document.head.appendChild(style);
  }

  function syncCommercialCard(card, projectId) {
    const commercial = commercialByProject?.[projectId];
    if (!commercial || commercial.state !== "active_reference" || !Number.isFinite(Number(commercial.price))) return;
    if (card.dataset.commercialSource === "governed-json") return;

    card.dataset.commercialSource = "governed-json";
    card.dataset.promo = "false";
    card.querySelector(".mt-promo-ribbon")?.remove();

    const oldPrice = card.querySelector(".mt-price-block");
    const block = document.createElement("div");
    block.className = "mt-price-block mt-pilot-commercial";
    block.innerHTML = `
      <span class="mt-pilot-commercial-label"></span>
      <strong class="mt-pilot-commercial-price"></strong>
      <small class="mt-pilot-commercial-note"></small>
    `;
    block.querySelector(".mt-pilot-commercial-label").textContent = commercial.priceLabel || "A partir de";
    block.querySelector(".mt-pilot-commercial-price").textContent = brl.format(Number(commercial.price));
    block.querySelector(".mt-pilot-commercial-note").textContent = [commercial.reference, commercial.disclaimer].filter(Boolean).join(" · ");

    if (oldPrice) oldPrice.replaceWith(block);
    else card.querySelector(".mt-project-info")?.insertAdjacentElement("afterend", block);
  }

  function enhanceCards() {
    document.querySelectorAll(".mt-project-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim();
      const page = PAGE_BY_TITLE[title];
      if (!page) return;

      syncCommercialCard(card, page.projectId);

      const actions = card.querySelector(".mt-project-actions");
      if (!actions || actions.querySelector("[data-project-page-link]")) return;
      actions.dataset.hasProjectPage = "true";
      const link = document.createElement("a");
      link.className = "mt-project-details";
      link.href = page.url;
      link.dataset.projectPageLink = "true";
      link.textContent = "Ver empreendimento →";
      actions.appendChild(link);
    });
  }

  async function loadCommercialData() {
    try {
      const response = await fetch("/src-greenn/data/commercial-values.json", {cache: "no-store"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      commercialByProject = payload?.projects || {};
      enhanceCards();
    } catch (error) {
      console.warn("MoreNumTegra pilot commercial data unavailable", error);
    }
  }

  installStyle();
  enhanceCards();
  loadCommercialData();

  const observer = new MutationObserver(enhanceCards);
  observer.observe(document.documentElement, {subtree: true, childList: true});
})();
