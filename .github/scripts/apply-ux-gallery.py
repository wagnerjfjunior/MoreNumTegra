from pathlib import Path

path = Path("src-greenn/moretegra.js")
text = path.read_text(encoding="utf-8")

if "const INTEREST_GALLERIES" in text:
    raise SystemExit("INTEREST_GALLERIES already present; refusing duplicate patch")

galleries = r'''  // INTEREST_GALLERY_SOURCE_2026_08_26:
  // mídias adicionais obtidas das galerias oficiais Tegra; Bueno Brandão usa o microsite oficial.
  // nenhuma mídia adicional é carregada no catálogo inicial: a galeria só é montada após intenção explícita.
  const INTEREST_GALLERIES = Object.freeze({
    "Château Jardin": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/364/Imagem/Tegra-Incorporadora-Detalhe-Superior-Fachada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-1400x1400-1774666761101.jpg",alt:"Detalhe da fachada do Château Jardin"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/364/Imagem/Tegra-Incorporadora-Fachada-Portaria-Entrada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-1400x1400-1774666761147.jpg",alt:"Portaria do Château Jardin"}
    ],
    "Nova Vivere": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/363/Imagem/Tegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-1400x1400-1770321852196.png",alt:"Piscina do Nova Vivere"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/363/Imagem/Tegra-Incorporadora-Living-Terraco-Decorado-105-Metros-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-1400x1400-1770322321236.png",alt:"Living e terraço decorado do Nova Vivere"}
    ],
    "Caminhos da Lapa Elo Duo": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/Imagem/09d7acf8-6317-4c6a-a4e0-589dd0db757a.jpg",alt:"Perspectiva da Rua Jardim do Caminhos da Lapa Elo Duo"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/Imagem/86b37d37-1be5-4d74-9acf-b2df71520437.jpg",alt:"Piscina do Caminhos da Lapa Elo Duo"}
    ],
    "Garden Design": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/361/Imagem/Tegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-1400x1400-1758224843793.jpg",alt:"Piscina do Garden Design"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/361/Imagem/Tegra-Incorporadora-Area-de-Lazer-Espaco-Gourmet-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-1400x1400-1758225901080.jpg",alt:"Espaço gourmet do Garden Design"}
    ],
    "Ampère Brooklin": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/351/Imagem/Tegra-Incorporadora-Area-de-Lazer-Voo-da-Piscina-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-1600x900-1722456940854.jpg",alt:"Voo da piscina do Ampère Brooklin"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/351/Imagem/Tegra-Incorporadora-Living-Decorado-262-Metros-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-1600x900-1722457089023.jpg",alt:"Living decorado do Ampère Brooklin"}
    ],
    "Mozae Higienópolis": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-de-Lazer-Lounge-Churrasqueira-Rooftop-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731541249373.jpg",alt:"Lounge churrasqueira Skyline do Mozae Higienópolis"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Living-Decorado-73-Metros-2-Suites-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731542177358.jpg",alt:"Living decorado do Mozae Higienópolis"}
    ],
    "Universo Tatuapé Órbita": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Salas-Comerciais-Universo-Tatuape-Orbita-Sao-Paulo-SP%20001-1715474684588.jpg",alt:"Imagem oficial adicional do Universo Tatuapé Órbita"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Salas-Comerciais-Universo-Tatuape-Orbita-Sao-Paulo-SP%20005-1715474686420.jpg",alt:"Piscina do Universo Tatuapé Órbita"}
    ],
    "Ária Higienópolis": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/312/Imagem/309b34e4-72f0-48d0-a8f8-1f8e94a90cbb.jpg",alt:"Imagem oficial adicional do Ária Higienópolis"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/312/Imagem/71beba8c-baff-43aa-a782-9bbff8ad82e9.JPG",alt:"Imagem oficial adicional do Ária Higienópolis"}
    ],
    "Bem Moema": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/336/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Bem-Moema-Sao-Paulo-SP%20001-1715460274740.jpg",alt:"Imagem oficial adicional do Bem Moema"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/336/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Bem-Moema-Sao-Paulo-SP%20002-1715460274667.jpg",alt:"Imagem oficial adicional do Bem Moema"}
    ],
    "Bem Moema Studios & Offices": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/343/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP%20001-1715469405767.jpg",alt:"Imagem oficial adicional do Bem Moema Studios & Offices"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/343/Imagem/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-Externa-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP%20002-1715469405591.jpg",alt:"Imagem oficial adicional do Bem Moema Studios & Offices"}
    ],
    "Soma Perdizes": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/314/Imagem/acb2a934-5af7-4d81-b91f-1cb1092784de.jpg",alt:"Imagem oficial adicional do Soma Perdizes"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/314/Imagem/7cb1dd5d-20f6-4550-bea1-2dbaece0eaa1.jpg",alt:"Imagem oficial adicional do Soma Perdizes"}
    ],
    "Zahle Jardins": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/276/Imagem/Tegra-Incorporadora-Area-de-Lazer-Empreendimento-Zahle-Jardins-Apartamentos-Studios-Salas-Comerciais-Jardins-Sao-Paulo-SP%20001-1713925484397.jpg",alt:"Detalhe do voo da fachada do Zahle Jardins"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/276/Imagem/Tegra-Incorporadora-Area-de-Lazer-Empreendimento-Zahle-Jardins-Apartamentos-Studios-Salas-Comerciais-Jardins-Sao-Paulo-SP%20013-1713925656238.jpg",alt:"Piscina do Zahle Jardins"}
    ],
    "Bueno Brandão 257": [
      {url:"https://buenobrandao257.com.br/images/perspectivas/optimized/BUEN_07_RESID_EXT_Detalhe%20Fachada%202_EF-opt-1920.WEBP",alt:"Detalhe da fachada do Bueno Brandão 257"},
      {url:"https://buenobrandao257.com.br/images/perspectivas/optimized/BUEN_44_RESID_APT_Living%20Decorado%20500_EF_v1-opt-1920.WEBP",alt:"Living decorado do Bueno Brandão 257"}
    ],
    "CAPIITOLO by Piero Lissoni": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/349/Imagem/Tegra-Incorporadora-Voo-do-Lazer-Residencial-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-1400x1400-1736373382338.jpg",alt:"Voo do lazer do CAPIITOLO by Piero Lissoni"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/349/Imagem/Tegra-Incorporadora-Area-de-Lazer-Piscina-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-1400x1400-1736372923082.jpg",alt:"Piscina do CAPIITOLO by Piero Lissoni"}
    ],
    "DSG Itaim": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/284/Imagem/328c58a5-896c-4d29-b8d5-ea020aca7d3b.jpg",alt:"Imagem oficial adicional do DSG Itaim"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/284/Imagem/4015a167-5092-456d-b79c-196db7064929.jpg",alt:"Imagem oficial adicional do DSG Itaim"}
    ],
    "Ledge Brooklin": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/341/Imagem/b271cff9-e44c-4404-ae15-afaefba5010f.jpg",alt:"Imagem oficial adicional do Ledge Brooklin"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/341/Imagem/f98ad012-04c6-4cc1-880c-4db129510f17.jpg",alt:"Imagem oficial adicional do Ledge Brooklin"}
    ],
    "TEG Sacomã": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/281/Imagem/af4721e1-59b3-4624-9f32-518be125784c.jpg",alt:"Imagem oficial adicional do TEG Sacomã"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/281/Imagem/f6eacd2c-55e2-4b06-b74e-60260439fd90.jpg",alt:"Imagem oficial adicional do TEG Sacomã"}
    ],
    "Tièl Vila Nova Conceição": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/352/Imagem/Tegra-Incorporadora-Area-de-Lazer-Voo-Rooftop-Boutique-Apartments-Studios-Alto-Padrao-Tiel-Vila-Nova-Conceicao-Sao-Paulo-SP-1727979958129.jpg",alt:"Voo do rooftop do Tièl Vila Nova Conceição"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/352/Imagem/Tegra-Incorporadora-Area-de-Lazer-Bar-Rooftop-Boutique-Apartments-Studios-Alto-Padrao-Tiel-Vila-Nova-Conceicao-Sao-Paulo-SP-1727979957124.jpg",alt:"Bar do rooftop do Tièl Vila Nova Conceição"}
    ],
    "YPY Alto do Ipiranga": [
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/346/Imagem/af0d89c4-1517-4d5b-ade4-4c00390d9c41.jpg",alt:"Imagem oficial adicional do YPY Alto do Ipiranga"},
      {url:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/346/Imagem/65379649-08c4-4f0c-b2b3-1218caa1aee5.jpg",alt:"Imagem oficial adicional do YPY Alto do Ipiranga"}
    ]
  });

'''

marker = '  const statusClass = Object.freeze({'
if marker not in text:
    raise SystemExit("statusClass marker not found")
text = text.replace(marker, galleries + marker, 1)

gallery_functions = r'''  function interestGalleryImages(project) {
    if (!project) return [];
    const primary = {url:mediaUrl(project.image),alt:project.alt || project.name};
    const extras = INTEREST_GALLERIES[project.name] || [];
    return [primary, ...extras].filter((item) => item?.url).slice(0, 3);
  }

  function renderInterestGallery(context, project) {
    const mount = context?.querySelector("[data-interest-gallery]");
    if (!mount) return;

    const images = interestGalleryImages(project);
    if (images.length < 2) {
      mount.hidden = true;
      mount.replaceChildren();
      return;
    }

    const figure = (item, main = false) => `
      <figure style="margin:0;overflow:hidden;border-radius:16px;background:#d7d2c8;${main ? "grid-row:1 / 3" : ""}">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt || project.name)}" width="960" height="720" ${main ? "" : "loading=\"lazy\""} decoding="async" style="width:100%;height:100%;display:block;object-fit:cover">
      </figure>`;

    mount.hidden = false;
    mount.innerHTML = `
      <div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(96px,1fr);grid-template-rows:1fr 1fr;gap:8px;aspect-ratio:4/3">
        ${figure(images[0], true)}
        ${figure(images[1])}
        ${figure(images[2] || images[1])}
      </div>
      <small style="display:block;margin-top:7px;color:#77736b;font-size:10.5px;line-height:1.35">Imagens oficiais do empreendimento; perspectivas ilustradas quando aplicável.</small>`;

    mount.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const holder = img.closest("figure");
        if (holder) holder.style.display = "none";
      }, {once:true});
    });
  }

'''

marker = '  function ensureInterestContext(root) {'
if marker not in text:
    raise SystemExit("ensureInterestContext marker not found")
text = text.replace(marker, gallery_functions + marker, 1)

old = '      <strong data-interest-name style="font-size:clamp(1.55rem,6vw,2.35rem);line-height:1.02;letter-spacing:-.035em"></strong>\n      <p data-interest-pitch style="margin:0;max-width:780px;color:#5f5c54;font-size:14px;line-height:1.6"></p>'
new = '      <strong data-interest-name style="font-size:clamp(1.55rem,6vw,2.35rem);line-height:1.02;letter-spacing:-.035em"></strong>\n      <div data-interest-gallery hidden aria-label="Galeria do empreendimento"></div>\n      <p data-interest-pitch style="margin:0;max-width:780px;color:#5f5c54;font-size:14px;line-height:1.6"></p>'
if old not in text:
    raise SystemExit("interest context markup marker not found")
text = text.replace(old, new, 1)

old = '      document.documentElement.removeAttribute("data-moretegra-interest");\n      return context;'
new = '      renderInterestGallery(context, null);\n      document.documentElement.removeAttribute("data-moretegra-interest");\n      return context;'
if old not in text:
    raise SystemExit("interest clear marker not found")
text = text.replace(old, new, 1)

old = '    const project = projectByName(name);\n    if (nameNode) nameNode.textContent = name;\n    if (pitchNode) pitchNode.textContent = project ? interestPitch(project) : "Você está solicitando condições para este empreendimento.";'
new = '    const project = projectByName(name);\n    if (nameNode) nameNode.textContent = name;\n    renderInterestGallery(context, project);\n    if (pitchNode) pitchNode.textContent = project ? interestPitch(project) : "Você está solicitando condições para este empreendimento.";'
if old not in text:
    raise SystemExit("interest render marker not found")
text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
