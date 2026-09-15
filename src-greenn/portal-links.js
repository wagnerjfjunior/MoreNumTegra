(() => {
  "use strict";

  const PAGE_BY_TITLE = Object.freeze({
    "Caminhos da Lapa Elo Duo": "/empreendimentos/caminhos-da-lapa-elo-duo/",
    "CAPIITOLO by Piero Lissoni": "/empreendimentos/capiitolo-piero-lissoni/"
  });

  function installStyle() {
    if (document.getElementById("mt-project-page-link-style")) return;
    const style = document.createElement("style");
    style.id = "mt-project-page-link-style";
    style.textContent = `
      .mt-project-actions[data-has-project-page="true"]{grid-template-columns:1fr!important;gap:8px!important}
      .mt-project-details{display:inline-flex;align-items:center;justify-content:center;min-height:32px;padding:3px 8px;color:#171813;text-decoration:none;font-size:12px;font-weight:850;letter-spacing:.01em}
      .mt-project-details:hover,.mt-project-details:focus-visible{text-decoration:underline;text-underline-offset:3px}
    `;
    document.head.appendChild(style);
  }

  function normalizeProjectLink(actions, title, url) {
    const existing = Array.from(actions.querySelectorAll("[data-project-page-link], [data-capiitolo-project-link]"));
    const link = existing.shift() || document.createElement("a");
    existing.forEach((node) => node.remove());

    link.className = "mt-project-details";
    link.href = url;
    link.dataset.projectPageLink = "true";
    if (title === "CAPIITOLO by Piero Lissoni") link.dataset.capiitoloProjectLink = "true";
    else delete link.dataset.capiitoloProjectLink;
    link.textContent = "Ver empreendimento →";

    if (!link.isConnected) actions.appendChild(link);
    actions.dataset.hasProjectPage = "true";
  }

  function enhanceCards() {
    document.querySelectorAll(".mt-project-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim();
      const url = PAGE_BY_TITLE[title];
      if (!url) return;
      const actions = card.querySelector(".mt-project-actions");
      if (!actions) return;
      normalizeProjectLink(actions, title, url);
    });
  }

  function loadFloatingUi() {
    if (document.querySelector('script[data-mt-floating-ui]')) return;
    const script = document.createElement("script");
    script.src = "/src-greenn/preview/floating-ui.js";
    script.defer = true;
    script.dataset.mtFloatingUi = "true";
    document.body.appendChild(script);
  }

  installStyle();
  enhanceCards();
  loadFloatingUi();
  const observer = new MutationObserver(enhanceCards);
  observer.observe(document.documentElement, {subtree:true, childList:true});
})();
