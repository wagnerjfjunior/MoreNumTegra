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

  function enhanceCards() {
    document.querySelectorAll(".mt-project-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim();
      const url = PAGE_BY_TITLE[title];
      if (!url) return;
      const actions = card.querySelector(".mt-project-actions");
      if (!actions || actions.querySelector("[data-project-page-link]")) return;
      actions.dataset.hasProjectPage = "true";
      const link = document.createElement("a");
      link.className = "mt-project-details";
      link.href = url;
      link.dataset.projectPageLink = "true";
      link.textContent = "Ver empreendimento →";
      actions.appendChild(link);
    });
  }

  installStyle();
  enhanceCards();
  const observer = new MutationObserver(enhanceCards);
  observer.observe(document.documentElement, {subtree:true, childList:true});
})();
