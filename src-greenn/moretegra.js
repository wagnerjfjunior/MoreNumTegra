(() => {
  "use strict";

  const ROOT_SELECTOR = "[data-moretegra]";
  const initializedRoots = new WeakSet();
  const BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  // DIRECTORATE_AUTHORIZED_REFERENCE_2026_08_25:
  // valores publicados usam exclusivamente a coluna “Sua referência / USAR VALOR” autorizada pela Diretoria.
  // valores da Coordenação AGO/26 são comparação interna e não são usados na publicação.
  // ELO_INTEREST_COPY_2026_08_26:
  // fatos adicionais do Elo Duo (Entregue, Últimas unidades, mobilidade ligada à estação e lazer completo)
  // conferidos na página oficial Tegra em 2026-08-26. Revalidar antes da publicação Green.
  const PROJECTS = Object.freeze([
    {name:"Château Jardin",location:"Cidade Jardim · Zona Sul",zone:"Zona Sul",status:"Lançamento",statusKey:"lancamento",info:"3 ou 4 suítes · 185m² a 355m² · 3 ou 4 vagas",feature:"Novo eixo Cidade Jardim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F364%2FImagemPrincipal%2FTegra-Incorporadora-Fachada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-714x640-1774666511357.jpg&w=828",alt:"Château Jardin, empreendimento Tegra em Cidade Jardim, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/cidade-jardim/chateaujardin",price:3690361,priceState:"priced",priceNote:"Unidade 501 · 185 m² · R$ 19.947/m² · Valor a partir de R$ 3.690.361. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Nova Vivere",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Lançamento",statusKey:"lancamento",info:"2 ou 3 suítes · 72m² e 105m² · 1 ou 2 vagas",feature:"Caminhos da Lapa",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F363%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-714x640-1770300546843.png&w=828",alt:"Nova Vivere, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/novavivere",price:852586.08,priceState:"priced",priceNote:"Unidade 701 · 72,82 m² · R$ 11.708/m² · Valor a partir de R$ 852.586,08. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Caminhos da Lapa Elo Duo",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"2 ou 3 dorms. · 47m², 55m² e 67m² · até 1 vaga",feature:"Visite o decorado",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F317%2FImagemPrincipal%2F8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg&w=828",alt:"Caminhos da Lapa Elo Duo, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo",price:718910,priceState:"priced",priceNote:"Unidade AP0109 · 67 m² · R$ 10.730/m² · Valor a partir de R$ 718.910. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Garden Design",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. com suíte · 61m² a 78m² · 1 vaga",feature:"Private Park Residence",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F361%2FImagemPrincipal%2FTegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-714x640-1758223113158.jpg&w=828",alt:"Garden Design, empreendimento Tegra em Lapa, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/gardendesignprivateparkresidence",price:673050,priceState:"priced",priceNote:"Unidade 0112 · R$ 11.020/m² · Valor a partir de R$ 673.050. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ampère Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 262m² privativos · 4 vagas",feature:"Alto padrão no Brooklin",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F351%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-714x640-1718890023834.jpg&w=828",alt:"Ampère Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/amperebrooklin",price:4770000,priceState:"priced",priceNote:"Unidade 0121 · 262,35 m² · R$ 18.181/m² · Valor a partir de R$ 4.770.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Mozae Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"1 ou 2 suítes · 45m² a 73m² · 1 vaga",feature:"Torre única",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F355%2FImagemPrincipal%2FTegra-Incorporadora-Banner-Principal-Fachada-Portico-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-714x640-1731539898944.jpg&w=828",alt:"Mozae Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/mozaehigienopolis",price:721510,priceState:"priced",priceNote:"Unidade AP0301 · 46 m² · R$ 15.685/m² · Valor a partir de R$ 721.510. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Universo Tatuapé Órbita",location:"Tatuapé · Zona Leste",zone:"Zona Leste",status:"Pronto para morar",statusKey:"entregue",info:"38m² a 69m² · 1 a 3 dorms. · salas comerciais",feature:"Últimas unidades",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F339%2FImagemPrincipal%2Fe56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg&w=828",alt:"Universo Tatuapé Órbita, empreendimento Tegra em Tatuapé, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/leste/tatuape/universoorbita",price:611685,priceState:"priced",priceNote:"Unidade AP0609 · 69 m² · R$ 8.865/m² · Valor a partir de R$ 611.685. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ária Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 30m² · aptos. de 53m² · salas comerciais",feature:"Rooftop em Higienópolis",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F312%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Studio-Salas-Comerciais-Aria-Higienopolis-Sao-Paulo-SP-1715881825537.jpg&w=828",alt:"Ária Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/aria-higienopolis",price:501000,priceState:"priced",priceNote:"Studio 1510 · 30 m² · R$ 16.700/m² · Valor a partir de R$ 501.000. Também há referência para a unidade AP1214 · 54 m² · R$ 17.856/m². Consulte a Tegra Vendas para confirmar disponibilidade e condições vigentes."},
    {name:"Bem Moema",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"2 a 4 dorms. · 80m², 123m² e 148m² · 1 ou 2 vagas",feature:"Alto padrão em Moema",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F336%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg&w=828",alt:"Bem Moema, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoema",price:1811200,priceState:"priced",priceNote:"Unidade AP0202 · 80 m² · R$ 22.640/m² · Valor a partir de R$ 1.811.200. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Bem Moema Studios & Offices",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 26m² a 29m² · aptos. de 36m² · offices",feature:"Morar ou investir",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F343%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Piscina-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP714x640-1715882591212.jpg&w=828",alt:"Bem Moema Studios & Offices, empreendimento Tegra em Moema, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/moema/bemmoemastudios",price:509600,priceState:"priced",priceNote:"Studio 1702 · 28 m² · R$ 18.200/m² · Valor a partir de R$ 509.600. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Soma Perdizes",location:"Perdizes · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 25m² · aptos. de 41m² e 45m² · comerciais",feature:"Uso misto em Perdizes",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F314%2FImagemPrincipal%2FTegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg&w=828",alt:"Soma Perdizes, empreendimento Tegra em Perdizes, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/somaperdizes",price:630000,priceState:"priced",priceNote:"Unidade 0602 · 45 m² · R$ 14.000/m² · Valor a partir de R$ 630.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Zahle Jardins",location:"Jardins · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 28m² · aptos. de 44m² · salas de 43m² a 53m²",feature:"Próximo à Paulista",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F276%2FImagemPrincipal%2Ftrega_zahle-76-tratada-714x640-1715886658470.jpg&w=828",alt:"Zahle Jardins, empreendimento Tegra em Jardins, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/jardins/zahlejardins",price:null,priceState:"consult",priceNote:"Valor sob consulta. Consulte a Tegra Vendas para confirmar unidades disponíveis e condições vigentes."},
    {name:"Bueno Brandão 257",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"500m² privativos · 5 suítes · 5 vagas",feature:"Residência singular",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F337%2FImagemPrincipal%2F8e85cddc-003b-4b7a-bfd2-2e38275cb1b8.jpg&w=828",alt:"Bueno Brandão 257, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/bb257",price:21750000,priceState:"priced",priceNote:"Unidade 31 · 500 m² · R$ 43.500/m² · Valor a partir de R$ 21.750.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"CAPIITOLO by Piero Lissoni",location:"Chácara Klabin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 210m² privativos · 3 vagas",feature:"Design por Piero Lissoni",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F349%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg&w=828",alt:"CAPIITOLO by Piero Lissoni, empreendimento Tegra em Chácara Klabin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/chacara-klabin/chacaraklabin",price:3647490,priceState:"priced",priceNote:"Unidade 24 · 210 m² · R$ 17.369/m² · Valor a partir de R$ 3.647.490. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"DSG Itaim",location:"Itaim Bibi · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 27m² e 29m² · aptos. de 44m² · comerciais",feature:"Design no Itaim",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F284%2FImagemPrincipal%2F4f52d494-85b1-4f39-b114-c30ff9c8d985.jpg&w=828",alt:"DSG Itaim, empreendimento Tegra em Itaim Bibi, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/itaim-bibi/dsgitaim",price:null,priceState:"consult",priceNote:"Unidade 201 · 27 m² · Valor sob consulta. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ledge Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"Studios de 30m² a 40m² · aptos. de 70m² a 122m²",feature:"Tegra + Exto",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F341%2FImagemPrincipal%2F6b04808c-fa4f-4bc9-bd24-e6052be1dda7.jpg&w=828",alt:"Ledge Brooklin, empreendimento Tegra em Brooklin, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/ledgebrooklin",price:600000,priceState:"priced",priceNote:"Studio 0052 · R$ 16.666/m² · Valor a partir de R$ 600.000. Também há referência para a unidade 1223 · R$ 17.116/m² · R$ 1.199.000. Consulte a Tegra Vendas para confirmar disponibilidade e condições vigentes."},
    {name:"TEG Sacomã",location:"Sacomã · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"1 a 3 dorms. · 45m² a 66m² · 1 ou 2 vagas",feature:"Pronto na Zona Sul",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F281%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Area-Externa-Empreendimento-TEG-Sacoma-Apartamentos-Pronto-para-Morar-Zona-Sul-Sao-Paulo-SP-714x640-1716214964198.jpg&w=828",alt:"TEG Sacomã, empreendimento Tegra em Sacomã, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/sacoma/teg-sacoma",price:390000,priceState:"priced",priceNote:"Unidade 0011 · 65 m² · R$ 6.000/m² · Valor a partir de R$ 390.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Tièl Vila Nova Conceição",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Boutique apartments · piscina no rooftop · fitness",feature:"Próximo ao Ibirapuera",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F352%2FImagemPrincipal%2FTegra-Incorporadora-Detalhe-da-Fachada-Studios-Vila-Nova-Conceicao-Sao-Paulo-SP-714x640-1718129172867.jpg&w=828",alt:"Tièl Vila Nova Conceição, empreendimento Tegra em Vila Nova Conceição, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/vila-nova-conceicao/tielvilanovaconceicao",price:598500,priceState:"priced",priceNote:"Unidade 914 · 21 m² · R$ 28.500/m² · Valor a partir de R$ 598.500. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"YPY Alto do Ipiranga",location:"Alto do Ipiranga · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. · 65m² e 80m² · 1 vaga",feature:"Mobilidade e lazer",image:"https://www.tegraincorporadora.com.br/_next/image?q=76&url=https%3A%2F%2Fstracctegra.blob.core.windows.net%2Fassets%2FEmpreendimentoVitrine%2F346%2FImagemPrincipal%2Ff473a9c8-e222-46f5-887e-c06efa82aaff-1715887075276.jpg&w=828",alt:"YPY Alto do Ipiranga, empreendimento Tegra em Alto do Ipiranga, São Paulo",official:"https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/alto-do-ipiranga/ypyaltodoipiranga",price:727650,priceState:"priced",priceNote:"Unidade AP0207 · 66 m² · R$ 11.025/m² · Valor a partir de R$ 727.650. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."}
  ]);

  const statusClass = Object.freeze({
    lancamento: "mt-status-lancamento",
    construcao: "mt-status-construcao",
    entregue: "mt-status-entregue"
  });

  const normalize = (value) =>
    String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  function mediaUrl(value) {
    if (!value) return "";
    try {
      const parsed = new URL(value);
      if (parsed.pathname === "/_next/image" && parsed.searchParams.get("url")) {
        return parsed.searchParams.get("url");
      }
    } catch (_) {}
    return value;
  }

  function visibleTarget(selector) {
    const nodes = [...document.querySelectorAll(selector)];
    return nodes.find((node) => node.getClientRects().length > 0) || nodes[0] || null;
  }

  function scrollToElement(target) {
    if (!target) return false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    target.scrollIntoView({behavior: reduced ? "auto" : "smooth", block: "start"});
    return true;
  }

  function scrollToSelector(selector) {
    return scrollToElement(visibleTarget(selector));
  }

  function projectByName(name) {
    return PROJECTS.find((project) => project.name === name) || null;
  }

  function pricePerSqm(project) {
    const match = String(project?.priceNote || "").match(/R\$\s*[\d.]+(?:,\d+)?\/m²/);
    return match ? match[0] : "";
  }

  function interestPitch(project) {
    if (!project) return "";

    if (project.name === "Caminhos da Lapa Elo Duo") {
      return "Ótima escolha. O Elo Duo está pronto para morar na Lapa, com últimas unidades, plantas de 47 m², 55 m² e 67 m², lazer completo e mobilidade ligada à estação de trem.";
    }

    return `${project.status} em ${project.location}. ${project.info}.`;
  }

  function interestMarketNote(project) {
    if (project?.name !== "Caminhos da Lapa Elo Duo") return "";
    return "Entre as referências atuais deste catálogo para a Lapa, esta é a menor referência por m².";
  }

  function ensureInterestContext(root) {
    let context = root.querySelector("[data-interest-context]");
    if (context) return context;

    const anchor = root.querySelector("[data-form-anchor]");
    if (!anchor) return null;

    context = document.createElement("aside");
    context.dataset.interestContext = "";
    context.hidden = true;
    context.setAttribute("aria-live", "polite");
    context.style.cssText =
      "margin:0 max(20px,5vw) 28px;padding:22px;border:1px solid #d9d5ca;border-radius:22px;background:linear-gradient(135deg,#fff,#f7f2e5);color:#171813;box-shadow:0 16px 36px rgba(20,20,16,.10);display:grid;gap:12px";

    context.innerHTML = `
      <span style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:850;color:#8a6a10">Ótima escolha</span>
      <strong data-interest-name style="font-size:clamp(1.55rem,6vw,2.35rem);line-height:1.02;letter-spacing:-.035em"></strong>
      <p data-interest-pitch style="margin:0;max-width:780px;color:#5f5c54;font-size:14px;line-height:1.6"></p>
      <div data-interest-price hidden style="display:grid;gap:3px;padding:14px 16px;border-radius:16px;background:#171813;color:#fff">
        <span style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#EBB92E">Referência por m²</span>
        <strong data-interest-sqm style="font-size:1.45rem;line-height:1.1"></strong>
        <small data-interest-market-note hidden style="font-size:12px;line-height:1.45;color:rgba(255,255,255,.72)"></small>
      </div>
      <a class="mt-button mt-button-primary" href="#formulario" data-continue-form style="width:100%;min-height:54px;font-size:14px">Quero receber as condições deste Tegra</a>
      <small style="color:#706d65;font-size:12px;line-height:1.45">Disponibilidade e condições vigentes serão confirmadas no atendimento.</small>
      <a href="#oportunidades" data-change-interest style="width:max-content;min-height:44px;display:inline-flex;align-items:center;font-size:12px;font-weight:800;text-decoration:underline;text-underline-offset:3px">Escolher outro empreendimento</a>`;

    anchor.insertAdjacentElement("beforebegin", context);

    context.querySelector("[data-change-interest]")?.addEventListener("click", (event) => {
      event.preventDefault();
      document.documentElement.removeAttribute("data-moretegra-interest");
      context.hidden = true;
      scrollToSelector("#oportunidades");
    });

    return context;
  }

  function setInterestContext(root, interest) {
    const context = ensureInterestContext(root);
    if (!context) return null;

    const name = String(interest || "").trim();
    const nameNode = context.querySelector("[data-interest-name]");
    const pitchNode = context.querySelector("[data-interest-pitch]");
    const priceBox = context.querySelector("[data-interest-price]");
    const sqmNode = context.querySelector("[data-interest-sqm]");
    const marketNode = context.querySelector("[data-interest-market-note]");

    if (!name) {
      context.hidden = true;
      if (nameNode) nameNode.textContent = "";
      if (pitchNode) pitchNode.textContent = "";
      document.documentElement.removeAttribute("data-moretegra-interest");
      return context;
    }

    const project = projectByName(name);
    if (nameNode) nameNode.textContent = name;
    if (pitchNode) pitchNode.textContent = project ? interestPitch(project) : "Você está solicitando condições para este empreendimento.";

    const sqm = pricePerSqm(project);
    const marketNote = interestMarketNote(project);
    if (priceBox) priceBox.hidden = !sqm;
    if (sqmNode) sqmNode.textContent = sqm;
    if (marketNode) {
      marketNode.textContent = marketNote;
      marketNode.hidden = !marketNote;
    }

    context.hidden = false;
    document.documentElement.dataset.moretegraInterest = name;
    return context;
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
      headline = BRL.format(project.price);
      label = "A partir de";
      accent = "#171813";
    }

    return `
      <div class="mt-price-block" style="margin-top:14px;padding-top:14px;border-top:1px solid #e3ded3;display:grid;gap:6px">
        <span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#8a6a10">${label}</span>
        <strong style="font-size:1.3rem;line-height:1.15;color:${accent}">${escapeHtml(headline)}</strong>
        <small style="display:block;font-size:13px;line-height:1.5;color:#625f57">${escapeHtml(project.priceNote || "")}</small>
      </div>`;
  }

  function cardMarkup(project) {
    const actionLabel = project.priceState === "soldout" ? "Ver alternativas" : "Negociar condições";

    return `
      <article class="mt-project-card" data-status="${escapeHtml(project.statusKey)}" data-zone="${escapeHtml(project.zone)}">
        <div class="mt-project-image">
          <img data-project-image src="${escapeHtml(mediaUrl(project.image))}" alt="${escapeHtml(project.alt || project.name)}" width="828" height="743" loading="lazy" decoding="async">
          <span class="mt-status ${statusClass[project.statusKey] || ""}">${escapeHtml(project.status)}</span>
          ${project.feature ? `<span class="mt-feature">${escapeHtml(project.feature)}</span>` : ""}
        </div>
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
      }, {once: true});
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
      frame.addEventListener("click", play, {once: true});
      frame.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          play();
        }
      }, {once: true});
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          window.setTimeout(() => mount(true), 350);
        }
      }, {rootMargin: "160px"});
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
    const zoneField = zone?.closest("label") || null;
    const mobileZoneQuery = window.matchMedia?.("(max-width: 759px)") || null;
    const state = {status: "todos", zone: "todas", price: "todos", query: ""};

    const syncZoneControls = () => {
      if (!zoneField) return;
      if (mobileZoneQuery?.matches) zoneField.style.display = "none";
      else zoneField.style.removeProperty("display");
    };

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
          event.preventDefault();
          const context = setInterestContext(root, link.dataset.interest || "");
          if (!scrollToElement(context)) scrollToSelector("#formulario");
        });
      });
    };

    const setStatus = (value) => {
      state.status = value || "todos";
      statusButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.filterStatus === state.status);
      });
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

    statusButtons.forEach((button) =>
      button.addEventListener("click", () => setStatus(button.dataset.filterStatus))
    );
    quickZones.forEach((button) =>
      button.addEventListener("click", () => setZone(button.dataset.quickZone))
    );
    mobileStatus?.addEventListener("change", (event) => setStatus(event.target.value));
    zone?.addEventListener("change", (event) => {
      state.zone = event.target.value;
      updateQuickZones();
      render();
    });
    price?.addEventListener("change", (event) => {
      state.price = event.target.value;
      render();
    });
    search?.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
    });
    clear?.addEventListener("click", reset);
    emptyClear?.addEventListener("click", reset);

    if (mobileZoneQuery) {
      if (typeof mobileZoneQuery.addEventListener === "function") {
        mobileZoneQuery.addEventListener("change", syncZoneControls);
      } else if (typeof mobileZoneQuery.addListener === "function") {
        mobileZoneQuery.addListener(syncZoneControls);
      }
    }
    syncZoneControls();

    root.querySelectorAll("[data-set-status]").forEach((link) =>
      link.addEventListener("click", () => setStatus(link.dataset.setStatus))
    );

    root.querySelectorAll("[data-focus-price]").forEach((link) =>
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (scrollToSelector("#oportunidades")) {
          window.setTimeout(() => price?.focus({preventScroll: true}), 450);
        }
      })
    );

    root.querySelectorAll("a[href^='#']").forEach((link) =>
      link.addEventListener("click", (event) => {
        if (link.hasAttribute("data-focus-price") || link.hasAttribute("data-interest")) return;
        const selector = link.getAttribute("href");
        if (!selector || selector === "#") return;
        if (selector === "#formulario" && !link.hasAttribute("data-continue-form")) {
          setInterestContext(root, "");
        }
        if (scrollToSelector(selector)) event.preventDefault();
      })
    );

    root.querySelectorAll("[data-hero-video]").forEach(initVideo);
    root.querySelectorAll("[data-total-projects]").forEach((node) => {
      node.textContent = String(PROJECTS.length);
    });

    updateQuickZones();
    render();
  }

  function initAll() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll, {once: true});
  } else {
    initAll();
  }

  const observer = new MutationObserver(() => initAll());
  observer.observe(document.documentElement, {childList: true, subtree: true});
})();
