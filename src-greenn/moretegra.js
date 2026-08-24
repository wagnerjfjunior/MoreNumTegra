(() => {
  "use strict";

  const ROOT_SELECTOR = "[data-moretegra]";
  const initializedRoots = new WeakSet();
  const BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  // MIGRATION_INPUT_PENDING_REVALIDATION:
  // catálogo migrado do pacote Green e preços iniciais fornecidos pelo proprietário em 2026-08-24.
  // A PR permanece Draft. Antes da Green, estoque, unidade, estágio, metragem e preço devem ser revalidados.
  const PROJECTS = Object.freeze([
    {name:"Château Jardin",location:"Cidade Jardim · Zona Sul",zone:"Zona Sul",status:"Lançamento",statusKey:"lancamento",info:"3 ou 4 suítes · 185m² a 355m² · 3 ou 4 vagas",feature:"Novo eixo Cidade Jardim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F364%2FImagemPrincipal%2FTegra-Incorporadora-Fachada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-714x640-1774666511357.jpg&w=828",alt:"Château Jardin, empreendimento Tegra em Cidade Jardim, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/cidade-jardim/chateaujardin",price:null,priceState:"consult",priceNote:"Valor inicial ainda não informado."},
    {name:"Nova Vivere",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Lançamento",statusKey:"lancamento",info:"2 ou 3 suítes · 72m² e 105m² · 1 ou 2 vagas",feature:"Caminhos da Lapa",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F363%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-714x640-1770300546843.png&w=828",alt:"Nova Vivere, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/novavivere",price:null,priceState:"consult",priceNote:"Condição informada: tabela -8%."},
    {name:"Caminhos da Lapa Elo Duo",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"2 ou 3 dorms. · 47m², 55m² e 67m² · até 1 vaga",feature:"Visite o decorado",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F317%2FImagemPrincipal%2F8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg&w=828",alt:"Caminhos da Lapa Elo Duo, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo",price:null,priceState:"consult",priceNote:"Unidade 109 · referência de R$ 10.730/m² · 3 meses de condomínio grátis. Área da unidade precisa ser confirmada."},
    {name:"Garden Design",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. com suíte · 61m² a 78m² · 1 vaga",feature:"Private Park Residence",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F361%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-714x640-1758223113158.jpg&w=828",alt:"Garden Design, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/gardendesignprivateparkresidence",price:null,priceState:"consult",priceNote:"Condição informada: tabela -8%."},
    {name:"Ampère Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 262m² privativos · 4 vagas",feature:"Alto padrão no Brooklin",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F351%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-714x640-1718890023834.jpg&w=828",alt:"Ampère Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/amperebrooklin",price:null,priceState:"consult",priceNote:"Valor inicial ainda não informado."},
    {name:"Mozae Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"1 ou 2 suítes · 46m² e 73m² · 1 vaga",feature:"Torre única",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F355%2FImagemPrincipal%2FTegra-Incorporadora-Banner-Principal-Fachada-Portico-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-714x640-1731539898944.jpg&w=828",alt:"Mozae Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/mozaehigienopolis",price:721510,priceState:"priced",priceNote:"Unidade 301 · 46 m² · R$ 15.685/m²."},
    {name:"Universo Tatuapé Órbita",location:"Tatuapé · Zona Leste",zone:"Zona Leste",status:"Pronto para morar",statusKey:"entregue",info:"38m² a 69m² · 1 a 3 dorms. · salas comerciais",feature:"Últimas unidades",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F339%2FImagemPrincipal%2Fe56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg&w=828",alt:"Universo Tatuapé Órbita, empreendimento Tegra em Tatuapé, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/leste/tatuape/universoorbita",price:611685,priceState:"priced",priceNote:"Unidade 609 · 69 m² · R$ 8.865/m²."},
    {name:"Ária Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 30m² · aptos. de 53m² · salas comerciais",feature:"Rooftop em Higienópolis",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F312%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Studio-Salas-Comerciais-Aria-Higienopolis-Sao-Paulo-SP-1715881825537.jpg&w=828",alt:"Ária Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/aria-higienopolis",price:501000,priceState:"priced",priceNote:"Studio 510 · 30 m² · R$ 16.700/m². Outra referência informada: unidade 1214 · 54 m² · R$ 17.856/m²."},
    {name:"Bem Moema",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"2 a 4 dorms. · 80m², 123m² e 148m² · 1 ou 2 vagas",feature:"Alto padrão em Moema",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F336%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg&w=828",alt:"Bem Moema, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoema",price:1811200,priceState:"priced",priceNote:"Unidade 202 · 80 m² · R$ 22.640/m²."},
    {name:"Bem Moema Studios & Offices",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 26m² a 29m² · aptos. de 36m² · offices",feature:"Morar ou investir",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F343%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Piscina-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP714x640-1715882591212.jpg&w=828",alt:"Bem Moema Studios & Offices, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoemastudios",price:509600,priceState:"priced",priceNote:"Unidade 1702 · 28 m² · R$ 18.200/m²."},
    {name:"Soma Perdizes",location:"Perdizes · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 25m² · aptos. de 41m² e 45m² · comerciais",feature:"Uso misto em Perdizes",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F314%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg&w=828",alt:"Soma Perdizes, empreendimento Tegra em Perdizes, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/somaperdizes",price:null,priceState:"soldout",priceNote:"Esgotado conforme tabela inicial fornecida."},
    {name:"Zahle Jardins",location:"Jardins · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 28m² · aptos. de 44m² · salas de 43m² a 53m²",feature:"Próximo à Paulista",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F276%2FImagemPrincipal%2Ftrega_zahle-76-tratada-714x640-1715886658470.jpg&w=828",alt:"Zahle Jardins, empreendimento Tegra em Jardins, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/jardins/zahlejardins",price:null,priceState:"consult",priceNote:"Valor inicial ainda não informado."},
    {name:"Bueno Brandão 257",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"500m² privativos · 5 suítes · 5 vagas",feature:"Residência singular",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F337%2FImagemPrincipal%2F8e85cddc-003b-4b7a-bfd2-2e38275cb1b8.jpg&w=828",alt:"Bueno Brandão 257, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/bb257",price:21750000,priceState:"priced",priceNote:"Unidade 31 · 500 m² · R$ 43.500/m²."},
    {name:"CAPIITOLO by Piero Lissoni",location:"Chácara Klabin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 210m² privativos · 3 vagas",feature:"Design por Piero Lissoni",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F349%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg&w=828",alt:"CAPIITOLO by Piero Lissoni, empreendimento Tegra em Chácara Klabin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin",price:3647490,priceState:"priced",priceNote:"Unidade 24 · 210 m² · R$ 17.369/m²."},
    {name:"DSG Itaim",location:"Itaim Bibi · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 27m² e 29m² · aptos. de 44m² · comerciais",feature:"Design no Itaim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F284%2FImagemPrincipal%2F4f52d494-85b1-4f39-b114-c30ff9c8d985.jpg&w=828",alt:"DSG Itaim, empreendimento Tegra em Itaim Bibi, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/itaim-bibi/dsgitaim",price:null,priceState:"soldout",priceNote:"Esgotado conforme tabela inicial fornecida."},
    {name:"Ledge Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"Studios de 30m² a 40m² · aptos. de 70m² a 122m²",feature:"Tegra + Exto",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F341%2FImagemPrincipal%2F6b04808c-fa4f-4bc9-bd24-e6052be1dda7.jpg&w=828",alt:"Ledge Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/ledgebrooklin",price:1199000,priceState:"priced",priceNote:"Unidade 1223 · 70,05 m² · R$ 17.116/m². Total informado: R$ 1.199.000."},
    {name:"TEG Sacomã",location:"Sacomã · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"1 a 3 dorms. · 45m² a 66m² · 1 ou 2 vagas",feature:"Pronto na Zona Sul",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F281%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Area-Externa-Empreendimento-TEG-Sacoma-Apartamentos-Pronto-para-Morar-Zona-Sul-Sao-Paulo-SP-714x640-1716214964198.jpg&w=828",alt:"TEG Sacomã, empreendimento Tegra em Sacomã, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/sacoma/teg-sacoma",price:null,priceState:"consult",priceNote:"Valor inicial ainda não informado."},
    {name:"Tièl Vila Nova Conceição",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Boutique apartments · piscina no rooftop · fitness",feature:"Próximo ao Ibirapuera",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F352%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Studios-Vila-Nova-Conceicao-Sao-Paulo-SP-714x640-1718129172867.jpg&w=828",alt:"Tièl Vila Nova Conceição, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/tielvilanovaconceicao",price:598500,priceState:"priced",priceNote:"Unidade 914 · 21 m² · R$ 28.500/m²."},
    {name:"YPY Alto do Ipiranga",location:"Alto do Ipiranga · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. · 65m² e 80m² · 1 vaga",feature:"Mobilidade e lazer",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F346%2FImagemPrincipal%2Ff473a9c8-e222-46f5-887e-c06efa82aaff-1715887075276.jpg&w=828",alt:"YPY Alto do Ipiranga, empreendimento Tegra em Alto do Ipiranga, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/alto-do-ipiranga/ypyaltodoipiranga",price:727650,priceState:"priced",priceNote:"Unidade 207 · 66 m² · R$ 11.025/m²."}
  ]);

  const statusClass = Object.freeze({lancamento:"mt-status-lancamento",construcao:"mt-status-construcao",entregue:"mt-status-entregue"});
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const escapeHtml = (value) => String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");

  function mediaUrl(value) {
    if (!value) return "";
    try {
      const parsed = new URL(value);
      if (parsed.pathname === "/_next/image" && parsed.searchParams.get("url")) return parsed.searchParams.get("url");
    } catch (_) {}
    return value;
  }

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

  function priceMarkup(project) {
    let headline = "Sob consulta";
    let label = "Valor";
    let accent = "#6d6b63";

    if (project.priceState === "soldout") {
      headline = "Esgotado";
      label = "Disponibilidade";
      accent = "#8b1e16";
    } else if (Number.isFinite(project.price)) {
      headline = `A partir de ${BRL.format(project.price)}`;
      label = "Ticket de referência";
      accent = "#171813";
    }

    return `
      <div class="mt-price-block" style="margin-top:14px;padding-top:14px;border-top:1px solid #e3ded3;display:grid;gap:4px">
        <span style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#8a6a10">${label}</span>
        <strong style="font-size:1.16rem;line-height:1.15;color:${accent}">${escapeHtml(headline)}</strong>
        <small style="display:block;font-size:8.5px;line-height:1.35;color:#8b887f">${escapeHtml(project.priceNote || "")}</small>
      </div>`;
  }

  function cardMarkup(project) {
    const actionLabel = project.priceState === "soldout" ? "Ver alternativas" : "Negociar condições";

    return `
      <article class="mt-project-card" data-status="${escapeHtml(project.statusKey)}" data-zone="${escapeHtml(project.zone)}">
        <a class="mt-project-image" href="#formulario" data-interest="${escapeHtml(project.name)}" aria-label="${actionLabel} para ${escapeHtml(project.name)}">
          <img data-project-image src="${escapeHtml(mediaUrl(project.image))}" alt="${escapeHtml(project.alt || project.name)}" width="828" height="743" loading="lazy" decoding="async">
          <span class="mt-status ${statusClass[project.statusKey] || ""}">${escapeHtml(project.status)}</span>
          ${project.feature ? `<span class="mt-feature">${escapeHtml(project.feature)}</span>` : ""}
        </a>
        <div class="mt-project-body">
          <p class="mt-project-location">${escapeHtml(project.location)}</p>
          <h3>${escapeHtml(project.name)}</h3>
          <span class="mt-project-info">${escapeHtml(project.info)}</span>
          ${priceMarkup(project)}
          <div class="mt-project-actions" style="grid-template-columns:1fr">
            <a class="mt-interest" href="#formulario" data-interest="${escapeHtml(project.name)}">${actionLabel}</a>
          </div>
        </div>
      </article>`;
  }

  function initCardImages(root) {
    root.querySelectorAll("[data-project-image]").forEach((img) => {
      if (img.dataset.errorBound === "true") return;
      img.dataset.errorBound = "true";
      img.addEventListener("error", () => {
        img.alt = "";
        img.style.display = "none";
        img.closest(".mt-project-image")?.setAttribute("data-image-unavailable", "true");
      }, {once:true});
    });
  }

  function priceMatches(project, filter) {
    if (filter === "todos") return true;
    if (filter === "consulta") return project.priceState === "consult";
    if (!Number.isFinite(project.price)) return false;
    if (filter === "ate700") return project.price <= 700000;
    if (filter === "700a1200") return project.price > 700000 && project.price <= 1200000;
    if (filter === "1200a2000") return project.price > 1200000 && project.price <= 2000000;
    if (filter === "acima2000") return project.price > 2000000;
    return true;
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
    const price = root.querySelector("[data-price-filter]");
    const mobileStatus = root.querySelector("[data-status-mobile]");
    const statusButtons = [...root.querySelectorAll("[data-filter-status]")];
    const quickZones = [...root.querySelectorAll("[data-quick-zone]")];
    const state = {status:"todos", zone:"todas", price:"todos", query:""};

    const updateQuickZones = () => {
      quickZones.forEach((button) => {
        const active = button.dataset.quickZone === state.zone;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    };

    const render = () => {
      if (!grid) return;
      const query = normalize(state.query);
      const filtered = PROJECTS.filter((project) => {
        const statusOk = state.status === "todos" || project.statusKey === state.status;
        const zoneOk = state.zone === "todas" || project.zone === state.zone;
        const priceOk = priceMatches(project, state.price);
        const haystack = normalize(`${project.name} ${project.location} ${project.zone} ${project.info} ${project.feature} ${project.priceNote}`);
        const queryOk = !query || haystack.includes(query);
        return statusOk && zoneOk && priceOk && queryOk;
      });

      grid.innerHTML = filtered.map(cardMarkup).join("");
      initCardImages(root);
      if (count) count.textContent = String(filtered.length);
      if (label) label.textContent = filtered.length === 1 ? "empreendimento encontrado" : "empreendimentos encontrados";
      if (empty) empty.hidden = filtered.length !== 0;
      if (clear) clear.hidden = state.status === "todos" && state.zone === "todas" && state.price === "todos" && !state.query;

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

    const setZone = (value) => {
      state.zone = value || "todas";
      if (zone) zone.value = state.zone;
      updateQuickZones();
      render();
    };

    const reset = () => {
      state.status = "todos";
      state.zone = "todas";
      state.price = "todos";
      state.query = "";
      if (zone) zone.value = "todas";
      if (price) price.value = "todos";
      if (search) search.value = "";
      updateQuickZones();
      setStatus("todos");
    };

    statusButtons.forEach((button) => button.addEventListener("click", () => setStatus(button.dataset.filterStatus)));
    quickZones.forEach((button) => button.addEventListener("click", () => setZone(button.dataset.quickZone)));
    mobileStatus?.addEventListener("change", (event) => setStatus(event.target.value));
    zone?.addEventListener("change", (event) => { state.zone = event.target.value; updateQuickZones(); render(); });
    price?.addEventListener("change", (event) => { state.price = event.target.value; render(); });
    search?.addEventListener("input", (event) => { state.query = event.target.value; render(); });
    clear?.addEventListener("click", reset);
    emptyClear?.addEventListener("click", reset);

    root.querySelectorAll("[data-set-status]").forEach((link) => link.addEventListener("click", () => setStatus(link.dataset.setStatus)));
    root.querySelectorAll("[data-focus-price]").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      if (scrollToSelector("#oportunidades")) window.setTimeout(() => price?.focus({preventScroll:true}), 450);
    }));
    root.querySelectorAll("a[href^='#']").forEach((link) => link.addEventListener("click", (event) => {
      if (link.hasAttribute("data-focus-price")) return;
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;
      if (scrollToSelector(selector)) event.preventDefault();
    }));

    root.querySelectorAll("[data-hero-video]").forEach(initVideo);
    root.querySelectorAll("[data-total-projects]").forEach((node) => { node.textContent = String(PROJECTS.length); });
    updateQuickZones();
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
