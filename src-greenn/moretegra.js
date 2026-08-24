(() => {
  "use strict";

  const ROOT_SELECTOR = "[data-moretegra]";
  const initializedRoots = new WeakSet();

  // MIGRATION_INPUT_PENDING_REVALIDATION:
  // catálogo migrado do pacote Green fornecido pelo proprietário em 2026-08-24.
  // A PR permanece Draft; campos devem ser revalidados antes da publicação Green.
  const PROJECTS = Object.freeze([
    {name:"Château Jardin",location:"Cidade Jardim · Zona Sul",zone:"Zona Sul",status:"Lançamento",statusKey:"lancamento",info:"3 ou 4 suítes · 185m² a 355m² · 3 ou 4 vagas",feature:"Novo eixo Cidade Jardim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F364%2FImagemPrincipal%2FTegra-Incorporadora-Fachada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-714x640-1774666511357.jpg&w=828",alt:"Château Jardin, empreendimento Tegra em Cidade Jardim, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/cidade-jardim/chateaujardin"},
    {name:"Nova Vivere",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Lançamento",statusKey:"lancamento",info:"2 ou 3 suítes · 72m² e 105m² · 1 ou 2 vagas",feature:"Caminhos da Lapa",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F363%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-714x640-1770300546843.png&w=828",alt:"Nova Vivere, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/novavivere"},
    {name:"Caminhos da Lapa Elo Duo",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"2 ou 3 dorms. · 47m², 55m² e 67m² · até 1 vaga",feature:"Visite o decorado",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F317%2FImagemPrincipal%2F8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg&w=828",alt:"Caminhos da Lapa Elo Duo, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo"},
    {name:"Garden Design",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. com suíte · 61m² a 78m² · 1 vaga",feature:"Private Park Residence",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F361%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-714x640-1758223113158.jpg&w=828",alt:"Garden Design, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/gardendesignprivateparkresidence"},
    {name:"Ampère Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 262m² privativos · 4 vagas",feature:"Alto padrão no Brooklin",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F351%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-714x640-1718890023834.jpg&w=828",alt:"Ampère Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/amperebrooklin"},
    {name:"Mozae Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"1 ou 2 suítes · 46m² e 73m² · 1 vaga",feature:"Torre única",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F355%2FImagemPrincipal%2FTegra-Incorporadora-Banner-Principal-Fachada-Portico-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-714x640-1731539898944.jpg&w=828",alt:"Mozae Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/mozaehigienopolis"},
    {name:"Universo Tatuapé Órbita",location:"Tatuapé · Zona Leste",zone:"Zona Leste",status:"Pronto para morar",statusKey:"entregue",info:"38m² a 69m² · 1 a 3 dorms. · salas comerciais",feature:"Últimas unidades",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F339%2FImagemPrincipal%2Fe56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg&w=828",alt:"Universo Tatuapé Órbita, empreendimento Tegra em Tatuapé, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/leste/tatuape/universoorbita"},
    {name:"Ária Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 30m² · aptos. de 53m² · salas comerciais",feature:"Rooftop em Higienópolis",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F312%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Studio-Salas-Comerciais-Aria-Higienopolis-Sao-Paulo-SP-1715881825537.jpg&w=828",alt:"Ária Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/aria-higienopolis"},
    {name:"Bem Moema",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"2 a 4 dorms. · 80m², 123m² e 148m² · 1 ou 2 vagas",feature:"Alto padrão em Moema",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F336%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg&w=828",alt:"Bem Moema, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoema"},
    {name:"Bem Moema Studios & Offices",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 26m² a 29m² · aptos. de 36m² · offices",feature:"Morar ou investir",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F343%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Piscina-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP714x640-1715882591212.jpg&w=828",alt:"Bem Moema Studios & Offices, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoemastudios"},
    {name:"Soma Perdizes",location:"Perdizes · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 25m² · aptos. de 41m² e 45m² · comerciais",feature:"Uso misto em Perdizes",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F314%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg&w=828",alt:"Soma Perdizes, empreendimento Tegra em Perdizes, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/somaperdizes"},
    {name:"Zahle Jardins",location:"Jardins · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 28m² · aptos. de 44m² · salas de 43m² a 53m²",feature:"Próximo à Paulista",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F276%2FImagemPrincipal%2Ftrega_zahle-76-tratada-714x640-1715886658470.jpg&w=828",alt:"Zahle Jardins, empreendimento Tegra em Jardins, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/jardins/zahlejardins"},
    {name:"Bueno Brandão 257",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"500m² privativos · 5 suítes · 5 vagas",feature:"Residência singular",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F337%2FImagemPrincipal%2F8e85cddc-003b-4b7a-bfd2-2e38275cb1b8.jpg&w=828",alt:"Bueno Brandão 257, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/bb257"},
    {name:"CAPIITOLO by Piero Lissoni",location:"Chácara Klabin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 210m² privativos · 3 vagas",feature:"Design por Piero Lissoni",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F349%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg&w=828",alt:"CAPIITOLO by Piero Lissoni, empreendimento Tegra em Chácara Klabin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin"},
    {name:"DSG Itaim",location:"Itaim Bibi · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 27m² e 29m² · aptos. de 44m² · comerciais",feature:"Design no Itaim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F284%2FImagemPrincipal%2F4f52d494-85b1-4f39-b114-c30ff9c8d985.jpg&w=828",alt:"DSG Itaim, empreendimento Tegra em Itaim Bibi, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/itaim-bibi/dsgitaim"},
    {name:"Ledge Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"Studios de 30m² a 40m² · aptos. de 70m² a 122m²",feature:"Tegra + Exto",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F341%2FImagemPrincipal%2F6b04808c-fa4f-4bc9-bd24-e6052be1dda7.jpg&w=828",alt:"Ledge Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/ledgebrooklin"},
    {name:"TEG Sacomã",location:"Sacomã · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"1 a 3 dorms. · 45m² a 66m² · 1 ou 2 vagas",feature:"Pronto na Zona Sul",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F281%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Area-Externa-Empreendimento-TEG-Sacoma-Apartamentos-Pronto-para-Morar-Zona-Sul-Sao-Paulo-SP-714x640-1716214964198.jpg&w=828",alt:"TEG Sacomã, empreendimento Tegra em Sacomã, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/sacoma/teg-sacoma"},
    {name:"Tièl Vila Nova Conceição",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Boutique apartments · piscina no rooftop · fitness",feature:"Próximo ao Ibirapuera",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F352%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Studios-Vila-Nova-Conceicao-Sao-Paulo-SP-714x640-1718129172867.jpg&w=828",alt:"Tièl Vila Nova Conceição, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/tielvilanovaconceicao"},
    {name:"YPY Alto do Ipiranga",location:"Alto do Ipiranga · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. · 65m² e 80m² · 1 vaga",feature:"Mobilidade e lazer",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F346%2FImagemPrincipal%2Ff473a9c8-e222-46f5-887e-c06efa82aaff-1715887075276.jpg&w=828",alt:"YPY Alto do Ipiranga, empreendimento Tegra em Alto do Ipiranga, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/alto-do-ipiranga/ypyaltodoipiranga"}
  ]);

  const statusClass = Object.freeze({lancamento:"mt-status-lancamento",construcao:"mt-status-construcao",entregue:"mt-status-entregue"});
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const escapeHtml = (value) => String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");

  function visibleTarget(selector) {
    const nodes = [...document.querySelectorAll(selector)];
    return nodes.find((node) => node.getClientRects().length > 0) || nodes[0] || null;
  }

  function scrollToSelector(selector) {
    const target = visibleTarget(selector);
    if (!target) return false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    target.scrollIntoView({behavior: reduced ? "auto" : "smooth", block:"start"});
    return true;
  }

  function cardMarkup(project) {
    const official = project.official
      ? `<a class="mt-official" href="${escapeHtml(project.official)}" target="_blank" rel="noreferrer">Site oficial</a>`
      : "";

    return `
      <article class="mt-project-card" data-status="${escapeHtml(project.statusKey)}" data-zone="${escapeHtml(project.zone)}">
        <a class="mt-project-image" href="#formulario" data-interest="${escapeHtml(project.name)}" aria-label="Consultar disponibilidade de ${escapeHtml(project.name)}">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt || project.name)}" width="828" height="743" loading="lazy" decoding="async">
          <span class="mt-status ${statusClass[project.statusKey] || ""}">${escapeHtml(project.status)}</span>
          ${project.feature ? `<span class="mt-feature">${escapeHtml(project.feature)}</span>` : ""}
        </a>
        <div class="mt-project-body">
          <p class="mt-project-location">${escapeHtml(project.location)}</p>
          <h3>${escapeHtml(project.name)}</h3>
          <span class="mt-project-info">${escapeHtml(project.info)}</span>
          <div class="mt-project-actions">
            <a class="mt-interest" href="#formulario" data-interest="${escapeHtml(project.name)}">Consultar disponibilidade</a>
            ${official}
          </div>
        </div>
      </article>`;
  }

  function initVideo(frame) {
    if (!frame || frame.dataset.videoInitialized === "true") return;
    frame.dataset.videoInitialized = "true";
    const id = frame.dataset.videoId;
    if (!id) return;

    const mount = (autoplay = true) => {
      if (frame.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      const params = new URLSearchParams({
        autoplay: autoplay ? "1" : "0",
        mute: "1",
        controls: "1",
        disablekb: "0",
        enablejsapi: "1",
        fs: "1",
        loop: "1",
        playlist: id,
        playsinline: "1",
        rel: "0",
        modestbranding: "1"
      });
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
      iframe.title = "Filme da campanha More em um Tegra";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    };

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    if (reduced) {
      frame.setAttribute("role", "button");
      frame.setAttribute("tabindex", "0");
      const play = () => mount(true);
      frame.addEventListener("click", play, {once:true});
      frame.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); play(); }
      }, {once:true});
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          window.setTimeout(() => mount(true), 350);
        }
      }, {rootMargin:"160px"});
      observer.observe(frame);
    } else {
      window.setTimeout(() => mount(true), 500);
    }
  }

  function initRoot(root) {
    if (!root || initializedRoots.has(root)) return;
    initializedRoots.add(root);

    const grid = root.querySelector("[data-project-grid]");
    const count = root.querySelector("[data-result-count]");
    const label = root.querySelector("[data-result-label]");
    const empty = root.querySelector("[data-empty-state]");
    const clear = root.querySelector("[data-clear-filters]");
    const emptyClear = root.querySelector("[data-empty-clear]");
    const search = root.querySelector("[data-project-search]");
    const zone = root.querySelector("[data-zone-filter]");
    const mobileStatus = root.querySelector("[data-status-mobile]");
    const statusButtons = [...root.querySelectorAll("[data-filter-status]")];
    const state = {status:"todos", zone:"todas", query:""};

    const render = () => {
      if (!grid) return;
      const query = normalize(state.query);
      const filtered = PROJECTS.filter((project) => {
        const statusOk = state.status === "todos" || project.statusKey === state.status;
        const zoneOk = state.zone === "todas" || project.zone === state.zone;
        const haystack = normalize(`${project.name} ${project.location} ${project.zone} ${project.info} ${project.feature}`);
        const queryOk = !query || haystack.includes(query);
        return statusOk && zoneOk && queryOk;
      });
      grid.innerHTML = filtered.map(cardMarkup).join("");
      if (count) count.textContent = String(filtered.length);
      if (label) label.textContent = filtered.length === 1 ? "empreendimento encontrado" : "empreendimentos encontrados";
      if (empty) empty.hidden = filtered.length !== 0;
      if (clear) clear.hidden = state.status === "todos" && state.zone === "todas" && !state.query;

      root.querySelectorAll("[data-interest]").forEach((link) => {
        link.addEventListener("click", (event) => {
          if (!scrollToSelector("#formulario")) return;
          event.preventDefault();
          document.documentElement.dataset.moretegraInterest = link.dataset.interest || "";
        });
      });
    };

    const setStatus = (value) => {
      state.status = value || "todos";
      statusButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.filterStatus === state.status));
      if (mobileStatus) mobileStatus.value = state.status;
      render();
    };

    const reset = () => {
      state.status = "todos"; state.zone = "todas"; state.query = "";
      if (zone) zone.value = "todas";
      if (search) search.value = "";
      setStatus("todos");
    };

    statusButtons.forEach((button) => button.addEventListener("click", () => setStatus(button.dataset.filterStatus)));
    mobileStatus?.addEventListener("change", (event) => setStatus(event.target.value));
    zone?.addEventListener("change", (event) => { state.zone = event.target.value; render(); });
    search?.addEventListener("input", (event) => { state.query = event.target.value; render(); });
    clear?.addEventListener("click", reset);
    emptyClear?.addEventListener("click", reset);

    root.querySelectorAll("[data-set-status]").forEach((link) => link.addEventListener("click", () => setStatus(link.dataset.setStatus)));
    root.querySelectorAll("a[href^='#']").forEach((link) => link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;
      if (scrollToSelector(selector)) event.preventDefault();
    }));

    root.querySelectorAll("[data-hero-video]").forEach(initVideo);
    root.querySelectorAll("[data-total-projects]").forEach((node) => { node.textContent = String(PROJECTS.length); });
    render();
  }

  function initAll() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initRoot);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll, {once:true});
  else initAll();

  const observer = new MutationObserver(() => initAll());
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();
