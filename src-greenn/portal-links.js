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
    const links = Array.from(actions.querySelectorAll("[data-project-page-link], [data-capiitolo-project-link]"));
    const link = links.shift() || document.createElement("a");
    links.forEach((node) => node.remove());

    const capiitolo = title === "CAPIITOLO by Piero Lissoni";
    if (link.className !== "mt-project-details") link.className = "mt-project-details";
    if (link.getAttribute("href") !== url) link.setAttribute("href", url);
    if (link.dataset.projectPageLink !== "true") link.dataset.projectPageLink = "true";
    if (capiitolo) {
      if (link.dataset.capiitoloProjectLink !== "true") link.dataset.capiitoloProjectLink = "true";
    } else if ("capiitoloProjectLink" in link.dataset) {
      delete link.dataset.capiitoloProjectLink;
    }
    if (link.textContent !== "Ver empreendimento →") link.textContent = "Ver empreendimento →";
    if (!link.isConnected) actions.appendChild(link);
    if (actions.dataset.hasProjectPage !== "true") actions.dataset.hasProjectPage = "true";
  }

  function enhanceCards(scope) {
    scope.querySelectorAll(".mt-project-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim();
      const url = PAGE_BY_TITLE[title];
      if (!url) return;
      const actions = card.querySelector(".mt-project-actions");
      if (!actions) return;
      normalizeProjectLink(actions, title, url);
    });
  }

  installStyle();

  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  enhanceCards(grid);
  const observer = new MutationObserver(() => enhanceCards(grid));
  observer.observe(grid, {subtree:true, childList:true});
})();
