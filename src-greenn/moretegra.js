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
  const CAMINHOS_AWARD = Object.freeze({
    short: "PRÊMIO MASTER IMOBILIÁRIO 2026",
    tagline: "Caminhos da Lapa · um bairro inteiro de opções",
    label: "Prêmio Master Imobiliário 2026 · Caminhos da Lapa — um bairro inteiro de opções · vencedor em Qualificação Urbana"
  });

  const PROJECTS = Object.freeze([
    {name:"Nova Vivere | 72 m²",projectName:"Nova Vivere",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Lançamento",statusKey:"lancamento",info:"72,82 m² · 2 ou 3 suítes · 1 ou 2 vagas",feature:"72 m² · entrada Nova Vivere",award:CAMINHOS_AWARD,image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/363/ImagemPrincipal/Tegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-714x640-1770300546843.png",alt:"Nova Vivere de 72 m², empreendimento Tegra no Caminhos da Lapa, São Paulo",price:852586.08,priceState:"priced",priceLabel:"A partir de",priceNote:"Unidade 701 · 72,82 m² · R$ 11.708/m² · Valor a partir de R$ 852.586,08. Consulte a Tegra Vendas para confirmar disponibilidade e condições vigentes."},
    {name:"Château Jardin",location:"Cidade Jardim · Zona Sul",zone:"Zona Sul",status:"Lançamento",statusKey:"lancamento",info:"3 ou 4 suítes · 185m² a 355m² · 3 ou 4 vagas",feature:"Novo eixo Cidade Jardim",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/364/ImagemPrincipal/Tegra-Incorporadora-Fachada-Empreendimento-Chateau-Jardin-Apartamentos-Cidade-Jardim-Sao-Paulo-SP-714x640-1774666511357.jpg",alt:"Château Jardin, empreendimento Tegra em Cidade Jardim, São Paulo",price:3690361,priceState:"priced",priceNote:"Unidade 501 · 185 m² · R$ 19.947/m² · Valor a partir de R$ 3.690.361. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Caminhos da Lapa Elo Duo",award:CAMINHOS_AWARD,location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"2 ou 3 dorms. · 47m², 55m² e 67m² · até 1 vaga",feature:"Visite o decorado",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/317/ImagemPrincipal/8d3d8839-e0b7-4f21-9d0e-99c363c8f6bc.jpg",alt:"Caminhos da Lapa Elo Duo, empreendimento Tegra em Lapa, São Paulo",price:663000,priceState:"priced",priceLabel:"Valor promocional",priceNote:"Pronto para morar · Unidade AP2408 · 67,42 m² · 1 vaga · De R$ 714.712,34 por R$ 663.000. Condição sujeita à disponibilidade.",promo:{unit:"AP2408",oldPrice:714712.34,price:663000,urgency:"Unidade específica · condição sujeita à disponibilidade",evidence:["Tegra/Agosto/Promocionais/ELO Itamar 663.000 Unidade 2408.png","Tegra/Agosto/Tabela_Coordenação/ELO Duo - Caminhos da Lapa_Agosto_26.pdf"]}},
    {name:"Garden Design",award:CAMINHOS_AWARD,location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. com suíte · 61m² a 78m² · 1 vaga",feature:"Private Park Residence",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/361/ImagemPrincipal/Tegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-714x640-1758223113158.jpg",alt:"Garden Design, empreendimento Tegra em Lapa, São Paulo",price:673050,priceState:"priced",priceNote:"Unidade 0112 · R$ 11.020/m² · Valor a partir de R$ 673.050. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ampère Brooklin",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 262m² privativos · 4 vagas",feature:"Alto padrão no Brooklin",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/351/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-714x640-1718890023834.jpg",alt:"Ampère Brooklin, empreendimento Tegra em Brooklin, São Paulo",price:4770000,priceState:"priced",priceNote:"Unidade 0121 · 262,35 m² · R$ 18.181/m² · Valor a partir de R$ 4.770.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Mozae Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Em construção",statusKey:"construcao",info:"1 ou 2 suítes · 45m² a 73m² · 1 vaga",feature:"Torre única",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/355/ImagemPrincipal/Tegra-Incorporadora-Banner-Principal-Fachada-Portico-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-714x640-1731539898944.jpg",alt:"Mozae Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",price:721510,priceState:"priced",priceNote:"Unidade AP0301 · 46 m² · R$ 15.685/m² · Valor a partir de R$ 721.510. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Universo Tatuapé Órbita",location:"Tatuapé · Zona Leste",zone:"Zona Leste",status:"Pronto para morar",statusKey:"entregue",info:"38m² a 69m² · 1 a 3 dorms. · salas comerciais",feature:"Últimas unidades",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/ImagemPrincipal/e56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg",alt:"Universo Tatuapé Órbita, empreendimento Tegra em Tatuapé, São Paulo",price:611685,priceState:"priced",priceNote:"Unidade AP0609 · 69 m² · R$ 8.865/m² · Valor a partir de R$ 611.685. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ária Higienópolis",location:"Higienópolis · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 30m² · aptos. de 53m² · salas comerciais",feature:"Rooftop em Higienópolis",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/312/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Studio-Salas-Comerciais-Aria-Higienopolis-Sao-Paulo-SP-1715881825537.jpg",alt:"Ária Higienópolis, empreendimento Tegra em Higienópolis, São Paulo",price:501000,priceState:"priced",priceNote:"Studio 1510 · 30 m² · R$ 16.700/m² · Valor a partir de R$ 501.000. Também há referência para a unidade AP1214 · 54 m² · R$ 17.856/m². Consulte a Tegra Vendas para confirmar disponibilidade e condições vigentes."},
    {name:"Bem Moema",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"2 a 4 dorms. · 80m², 123m² e 148m² · 1 ou 2 vagas",feature:"Alto padrão em Moema",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/336/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg",alt:"Bem Moema, empreendimento Tegra em Moema, São Paulo",price:1811200,priceState:"priced",priceNote:"Unidade AP0202 · 80 m² · R$ 22.640/m² · Valor a partir de R$ 1.811.200. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Bem Moema Studios & Offices",location:"Moema · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 26m² a 29m² · aptos. de 36m² · offices",feature:"Morar ou investir",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/343/ImagemPrincipal/Tegra-Incorporadora-Perspectiva-Ilustrada-Piscina-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP714x640-1715882591212.jpg",alt:"Bem Moema Studios & Offices, empreendimento Tegra em Moema, São Paulo",price:509600,priceState:"priced",priceNote:"Studio 1702 · 28 m² · R$ 18.200/m² · Valor a partir de R$ 509.600. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Nova Vivere | 105 m²",projectName:"Nova Vivere",location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Lançamento",statusKey:"lancamento",info:"105 m² · 3 quartos · 2 vagas",feature:"Condição à vista",award:CAMINHOS_AWARD,cashOffer:true,cashUnit:"708",cta:"Quero esta condição",interest:"Nova Vivere | 105 m²",evidence:["Tegra/Agosto/Anuncios/Anúncios.md","Tegra/Agosto/Anuncios/Anuncio NovaVivere Olx valor a vista-29-08-26.png"],image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/363/ImagemPrincipal/Tegra-Incorporadora-Area-de-Lazer-Piscina-Empreendimento-Nova-Vivere-Caminhos-da-Lapa-Apartamentos-Sao-Paulo-SP-714x640-1770300546843.png",alt:"Nova Vivere de 105 m², empreendimento Tegra no Caminhos da Lapa, São Paulo",price:1129900,priceState:"priced",priceLabel:"Condição à vista",priceNote:"*Unidade 708 · 105 m². Valor para pagamento à vista, confirmado em 29/08/2026. Sujeito à disponibilidade e alteração. Consulte condições vigentes."},
    {name:"Soma Perdizes",detailUrl:"/empreendimentos/soma-perdizes/",location:"Perdizes · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 25m² · aptos. de 41m² e 45m² · comerciais",feature:"Uso misto em Perdizes",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/314/ImagemPrincipal/Tegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg",alt:"Soma Perdizes, empreendimento Tegra em Perdizes, São Paulo",price:630000,priceState:"priced",priceNote:"Unidade 0602 · 45 m² · R$ 14.000/m² · Valor a partir de R$ 630.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Zahle Jardins",location:"Jardins · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 28m² · aptos. de 44m² · salas de 43m² a 53m²",feature:"Próximo à Paulista",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/276/ImagemPrincipal/trega_zahle-76-tratada-714x640-1715886658470.jpg",alt:"Zahle Jardins, empreendimento Tegra em Jardins, São Paulo",price:null,priceState:"consult",priceNote:"Valor sob consulta. Consulte a Tegra Vendas para confirmar unidades disponíveis e condições vigentes."},
    {name:"Bueno Brandão 257",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"500m² privativos · 5 suítes · 5 vagas",feature:"Residência singular",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/337/ImagemPrincipal/8e85cddc-003b-4b7a-bfd2-2e38275cb1b8.jpg",alt:"Bueno Brandão 257, empreendimento Tegra em Vila Nova Conceição, São Paulo",price:21750000,priceState:"priced",priceNote:"Unidade 31 · 500 m² · R$ 43.500/m² · Valor a partir de R$ 21.750.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"CAPIITOLO by Piero Lissoni",location:"Chácara Klabin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 210m² privativos · 3 vagas",feature:"Design por Piero Lissoni",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/349/ImagemPrincipal/Tegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg",alt:"CAPIITOLO by Piero Lissoni, empreendimento Tegra em Chácara Klabin, São Paulo",price:3647490,priceState:"priced",priceNote:"Unidade 24 · 210 m² · R$ 17.369/m² · Valor a partir de R$ 3.647.490. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"DSG Itaim",detailUrl:"/empreendimentos/dsg-itaim/",location:"Itaim Bibi · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Studios de 27m² e 29m² · aptos. de 44m² · comerciais",feature:"Design no Itaim",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/284/ImagemPrincipal/4f52d494-85b1-4f39-b114-c30ff9c8d985.jpg",alt:"DSG Itaim, empreendimento Tegra em Itaim Bibi, São Paulo",price:null,priceState:"consult",priceNote:"Unidade 201 · 27 m² · Valor sob consulta. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"Ledge Brooklin",detailUrl:"/empreendimentos/ledge-brooklin/",location:"Brooklin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"Studios de 30m² a 40m² · aptos. de 70m² a 122m²",feature:"Tegra + Exto",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/341/ImagemPrincipal/6b04808c-fa4f-4bc9-bd24-e6052be1dda7.jpg",alt:"Ledge Brooklin, empreendimento Tegra em Brooklin, São Paulo",price:600000,priceState:"priced",priceNote:"Studio 0052 · R$ 16.666/m² · Valor a partir de R$ 600.000. Também há referência para a unidade 1223 · R$ 17.116/m² · R$ 1.199.000. Consulte a Tegra Vendas para confirmar disponibilidade e condições vigentes."},
    {name:"TEG Sacomã",location:"Sacomã · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"1 a 3 dorms. · 45m² a 66m² · 1 ou 2 vagas",feature:"Pronto na Zona Sul",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/281/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Area-Externa-Empreendimento-TEG-Sacoma-Apartamentos-Pronto-para-Morar-Zona-Sul-Sao-Paulo-SP-714x640-1716214964198.jpg",alt:"TEG Sacomã, empreendimento Tegra em Sacomã, São Paulo",price:390000,priceState:"priced",priceNote:"Unidade 0011 · 65 m² · R$ 6.000/m² · Valor a partir de R$ 390.000. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"CAPIITOLO by Piero Lissoni | à vista",projectName:"CAPIITOLO by Piero Lissoni",location:"Chácara Klabin · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"4 suítes · 210m² privativos · 3 vagas",feature:"Condição à vista",cashOffer:true,cashUnit:"24",cashSuffixSmall:true,cta:"Quero esta condição",evidence:["Tegra/Agosto/Valores_a_vista.md"],image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/349/ImagemPrincipal/Tegra-Incorporadora-Detalhe-Fachada-CAPITOLO-by-Piero-Lissoni-Apartamentos-210-Metros-Chacara-Klabin-Sao-Paulo-SP-714x640-1736369712708.jpg",alt:"CAPIITOLO by Piero Lissoni, empreendimento Tegra em Chácara Klabin, São Paulo, condição à vista",price:3160000,priceState:"priced",priceLabel:"A partir de",priceNote:"*Unidade 24 · 210 m². Valor para pagamento à vista, referência Agosto/26. Valor de tabela R$ 3.942.628. Sujeito à disponibilidade e alteração. Consulte condições vigentes."},
    {name:"Tièl Vila Nova Conceição",location:"Vila Nova Conceição · Zona Sul",zone:"Zona Sul",status:"Pronto para morar",statusKey:"entregue",info:"Boutique apartments · piscina no rooftop · fitness",feature:"Próximo ao Ibirapuera",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/352/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Studios-Vila-Nova-Conceicao-Sao-Paulo-SP-714x640-1718129172867.jpg",alt:"Tièl Vila Nova Conceição, empreendimento Tegra em Vila Nova Conceição, São Paulo",price:598500,priceState:"priced",priceNote:"Unidade 914 · 21 m² · R$ 28.500/m² · Valor a partir de R$ 598.500. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"YPY Alto do Ipiranga",location:"Alto do Ipiranga · Zona Sul",zone:"Zona Sul",status:"Em construção",statusKey:"construcao",info:"2 ou 3 dorms. · 65m² e 80m² · 1 vaga",feature:"Mobilidade e lazer",image:"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/346/ImagemPrincipal/f473a9c8-e222-46f5-887e-c06efa82aaff-1715887075276.jpg",alt:"YPY Alto do Ipiranga, empreendimento Tegra em Alto do Ipiranga, São Paulo",price:727650,priceState:"priced",priceNote:"Unidade AP0207 · 66 m² · R$ 11.025/m² · Valor a partir de R$ 727.650. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes."},
    {name:"ODE Perdizes",location:"Perdizes · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"4 dorms. · 2 suítes ou 3 suítes · 156m² · 2 vagas",feature:"Última unidade",image:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/ODE%20Perspectiva%20ilustrada%20da%20fachada.webp",alt:"ODE Perdizes, empreendimento Tegra pronto para morar em Perdizes, São Paulo",price:2090000,priceState:"priced",priceLabel:"Valor promocional",priceNote:"Pronto para morar · Unidade 22 · 2º andar · única unidade disponível · De R$ 2.200.000 por R$ 2.090.000. Condição sujeita à disponibilidade.",promo:{unit:"Unidade 22 · 2º andar",oldPrice:2200000,price:2090000,urgency:"Última unidade · condição sujeita à disponibilidade",evidence:["Tegra/Agosto/Promocionais/Promocional ODE 2.090.000.jpeg"]}},
    {name:"Reserva Caminhos da Lapa",award:CAMINHOS_AWARD,location:"Lapa · Zona Oeste",zone:"Zona Oeste",status:"Pronto para morar",statusKey:"entregue",info:"3 a 4 dorms. · 1 a 3 suítes · 91m², 127m² e 157m² · 2 a 3 vagas",feature:"Pronto para morar",image:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/OJvCwqOQER0mcGGVjBoPxE8xALtGs2KXW1MhcviW.webp",alt:"Reserva Caminhos da Lapa, empreendimento Tegra pronto para morar na Lapa, São Paulo",price:null,priceState:"consult",priceNote:"Pronto para morar. Plantas de 91 m², 127 m² e 157 m², com lazer completo e beach tennis. Consulte a Tegra Vendas para confirmar unidades disponíveis e condições vigentes."}
  ]);

  // INTEREST_GALLERY_SOURCE_2026_08_26:
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
    ],
    "ODE Perdizes": [
      {url:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/ODE%20Perspectiva%20ilustrada%20da%20piscina%20descoberta.webp",alt:"Perspectiva ilustrada da piscina descoberta do ODE Perdizes"},
      {url:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/ODE%20Planta%20156m.webp",alt:"Planta de 156 m² do ODE Perdizes"}
    ],
    "Reserva Caminhos da Lapa": [
      {url:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/lfcTpsFD8BEKGOeBUbijShUuG8t50XTHaFb9wdYl.webp",alt:"Varanda gourmet de 127 m² do Reserva Caminhos da Lapa"},
      {url:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/0uRWUOmaHTJT2dYkP0wP7cFIRccLcPHTFanbRcPe.webp",alt:"Beach tennis do Reserva Caminhos da Lapa"},
      {url:"https://s3-gdigital.s3.amazonaws.com/gdigital/313/SlZUVFigKYYQKCIe0HFiQUgSdcv9QmTqvBHG5OPN.webp",alt:"Imagem interna do Reserva Caminhos da Lapa"}
    ]
  });

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

    if (project.cashOffer && Number.isFinite(project.price)) {
      const unit = project.cashUnit ? `Unidade ${project.cashUnit} · ` : "";
      return `${project.info}. ${unit}condição à vista de ${BRL.format(project.price)}.`;
    }

    if (project.name === "Caminhos da Lapa Elo Duo") {
      return "Pronto para morar na Lapa. Oportunidade na unidade AP2408, com 67,42 m² e 1 vaga: de R$ 714.712,34 por R$ 663.000. Condição sujeita à disponibilidade.";
    }

    if (project.name === "ODE Perdizes") {
      return "Pronto para morar em Perdizes. Unidade 22, no 2º andar, única unidade disponível, com 156 m², 4 dormitórios, 2 suítes ou 3 suítes e 2 vagas. De R$ 2.200.000 por R$ 2.090.000.";
    }

    if (project.name === "Reserva Caminhos da Lapa") {
      return "Pronto para morar na Lapa, com plantas de 91 m², 127 m² e 157 m², 3 a 4 dormitórios, 1 a 3 suítes, 2 a 3 vagas, beach tennis e lazer completo.";
    }

    return `${project.status} em ${project.location}. ${project.info}.`;
  }

  function interestMarketNote(project) {
    if (project?.name !== "Caminhos da Lapa Elo Duo") return "";
    return "Entre as referências atuais deste catálogo para a Lapa, esta é a menor referência por m².";
  }

  function interestGalleryImages(project) {
  if (!project) return [];
  const galleryKey = project.projectName || project.name;
  const extras = INTEREST_GALLERIES[galleryKey] || [];
  const seen = new Set();

  return extras.reduce((images, item) => {
    if (!item?.url || images.length >= 3) return images;

    const resolvedUrl = String(mediaUrl(item.url) || "").trim();
    if (!resolvedUrl) return images;

    let normalizedUrl = resolvedUrl;
    try {
      normalizedUrl = new URL(resolvedUrl).href;
    } catch (_) {}

    if (seen.has(normalizedUrl)) return images;
    seen.add(normalizedUrl);
    images.push({...item, url:resolvedUrl});
    return images;
  }, []);
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

    const galleryAlt = (item) => {
      const alt = String(item?.alt || "").trim();
      if (alt.startsWith("Imagem oficial adicional do ")) return "";
      return alt || project.name;
    };

    const figure = (item, main = false) => `
      <figure style="margin:0;overflow:hidden;border-radius:16px;background:#d7d2c8;${main ? "grid-row:1 / 3" : ""}">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(galleryAlt(item))}" width="960" height="720" ${main ? "" : "loading=\"lazy\""} decoding="async" style="width:100%;height:100%;display:block;object-fit:cover">
      </figure>`;

    const useBento = images.length >= 3;
  mount.hidden = false;
  mount.innerHTML = `
    <div data-interest-gallery-grid style="${useBento ? "display:grid;grid-template-columns:minmax(0,2fr) minmax(96px,1fr);grid-template-rows:1fr 1fr;gap:8px;aspect-ratio:4/3" : "display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr;gap:8px;aspect-ratio:16/7"}">
      ${figure(images[0], useBento)}
      ${figure(images[1])}
      ${useBento ? figure(images[2]) : ""}
    </div>
    <small style="display:block;margin-top:7px;color:#77736b;font-size:12.5px;line-height:1.45">Imagens oficiais do empreendimento; perspectivas ilustradas quando aplicável.</small>`;

    const rebalanceGallery = () => {
      const grid = mount.querySelector("[data-interest-gallery-grid]");
      if (!grid) return;
      const visible = [...grid.querySelectorAll("figure")].filter((figureNode) => figureNode.style.display !== "none");

      visible.forEach((figureNode) => {
        figureNode.style.gridRow = "auto";
      });

      if (visible.length >= 3) return;

      if (visible.length === 2) {
        grid.style.gridTemplateColumns = "1fr 1fr";
        grid.style.gridTemplateRows = "1fr";
        grid.style.aspectRatio = "16 / 7";
        return;
      }

      if (visible.length === 1) {
        grid.style.gridTemplateColumns = "1fr";
        grid.style.gridTemplateRows = "1fr";
        grid.style.aspectRatio = "4 / 3";
        return;
      }

      mount.hidden = true;
    };

    mount.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const holder = img.closest("figure");
        if (holder) holder.style.display = "none";
        rebalanceGallery();
      }, {once:true});
    });
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
      <div data-interest-gallery hidden role="group" aria-label="Galeria do empreendimento"></div>
      <p data-interest-pitch style="margin:0;max-width:780px;color:#5f5c54;font-size:14px;line-height:1.6"></p>
      <div data-interest-price hidden style="display:grid;gap:3px;padding:14px 16px;border-radius:16px;background:#171813;color:#fff">
        <span data-interest-price-label style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#EBB92E">Referência por m²</span>
        <strong data-interest-sqm style="font-size:1.45rem;line-height:1.1"></strong>
        <small data-interest-market-note hidden style="font-size:12px;line-height:1.45;color:rgba(255,255,255,.72)"></small>
      </div>
      <a class="mt-button mt-button-primary" href="#formulario" data-continue-form style="width:100%;min-height:54px;font-size:14px">Quero receber as condições deste Tegra</a>
      <small style="color:#706d65;font-size:12px;line-height:1.45">Disponibilidade e condições vigentes serão confirmadas no atendimento.</small>
      <a href="#oportunidades" data-change-interest style="width:max-content;min-height:44px;display:inline-flex;align-items:center;font-size:12px;font-weight:800;text-decoration:underline;text-underline-offset:3px">Escolher outro empreendimento</a>`;

    anchor.insertAdjacentElement("beforebegin", context);

    context.querySelector("[data-change-interest]")?.addEventListener("click", (event) => {
      event.preventDefault();
      setInterestContext(root, "");
      scrollToSelector("#oportunidades");
    });

    context.querySelector("[data-continue-form]")?.addEventListener("click", (event) => {
      if (scrollToSelector("#formulario")) event.preventDefault();
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
    const priceLabelNode = context.querySelector("[data-interest-price-label]");
    const sqmNode = context.querySelector("[data-interest-sqm]");
    const marketNode = context.querySelector("[data-interest-market-note]");

    if (!name) {
      context.hidden = true;
      if (nameNode) nameNode.textContent = "";
      if (pitchNode) pitchNode.textContent = "";
      renderInterestGallery(context, null);
      document.documentElement.removeAttribute("data-moretegra-interest");
      const leadForm = document.querySelector("[data-moretegra-lead-form]");
      if (leadForm instanceof HTMLFormElement) delete leadForm.dataset.selectedProject;
      return context;
    }

    const project = projectByName(name);
    if (nameNode) nameNode.textContent = name;
    renderInterestGallery(context, project);
    if (pitchNode) pitchNode.textContent = project ? interestPitch(project) : "Você está solicitando condições para este empreendimento.";

    const sqm = pricePerSqm(project);
    const cashOffer = project?.cashOffer === true && Number.isFinite(project?.price);
    const priceReference = cashOffer ? `${BRL.format(project.price)} à vista*` : sqm;
    const marketNote = cashOffer ? String(project.priceNote || "") : interestMarketNote(project);
    if (priceBox) priceBox.hidden = !priceReference;
    if (priceLabelNode) priceLabelNode.textContent = cashOffer ? "Condição à vista" : "Referência por m²";
    if (sqmNode) sqmNode.textContent = priceReference;
    if (marketNode) {
      marketNode.textContent = marketNote;
      marketNode.hidden = !marketNote;
    }

    context.hidden = false;
    document.documentElement.dataset.moretegraInterest = name;
    const leadForm = document.querySelector("[data-moretegra-lead-form]");
    if (leadForm instanceof HTMLFormElement) leadForm.dataset.selectedProject = name;
    return context;
  }

  const PROJECT_LOCATION_COPY = Object.freeze({
    "Lapa": "na Lapa",
    "Cidade Jardim": "em Cidade Jardim",
    "Brooklin": "no Brooklin",
    "Higienópolis": "em Higienópolis",
    "Tatuapé": "no Tatuapé",
    "Moema": "em Moema",
    "Perdizes": "em Perdizes",
    "Jardins": "nos Jardins",
    "Vila Nova Conceição": "na Vila Nova Conceição",
    "Chácara Klabin": "na Chácara Klabin",
    "Itaim Bibi": "no Itaim Bibi",
    "Sacomã": "no Sacomã",
    "Alto do Ipiranga": "no Alto do Ipiranga"
  });

  function projectInfoForCard(info) {
    return String(info || "")
      .replace(/\baptos\./gi, "apartamentos")
      .replace(/\bdorms\./gi, "dormitórios")
      .replace(/·\s*comerciais\b/gi, "· salas comerciais")
      .replace(/(\d) m²/g, "$1 m²")
      .trim();
  }

  function projectSearchLead(project) {
    const neighborhood = String(project?.location || "").split("·")[0].trim();
    const location = PROJECT_LOCATION_COPY[neighborhood] || (neighborhood ? `em ${neighborhood}` : "em São Paulo");
    const hasStudios = /\bstudios?\b/i.test(String(project?.info || ""));
    return `${hasStudios ? "Studios e apartamentos Tegra" : "Apartamentos Tegra"} ${location}.`;
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
      label = !project.priceLabel || project.priceLabel === "A partir de" ? "Preço a partir de" : project.priceLabel;
      accent = "#171813";
    }

    if (project.cashOffer && Number.isFinite(project.price)) {
      return `
        <div class="mt-price-block mt-price-cash">
          <span class="mt-price-label">${escapeHtml(project.priceLabel || "Condição à vista")}</span>
          <strong class="mt-price-current">${escapeHtml(BRL.format(project.price))} <em class="${project.cashSuffixSmall ? "mt-price-suffix-compact" : ""}">à vista*</em></strong>
          <small class="mt-price-urgency">${escapeHtml(project.priceNote || "")}</small>
        </div>`;
    }

    if (project.promo && Number.isFinite(project.promo.oldPrice) && Number.isFinite(project.promo.price)) {
      return `
        <div class="mt-price-block mt-price-promo">
          <span class="mt-price-label">Oportunidade · ${escapeHtml(project.promo.unit || "")}</span>
          <span class="mt-price-old">De ${escapeHtml(BRL.format(project.promo.oldPrice))}</span>
          <strong class="mt-price-current">Por ${escapeHtml(BRL.format(project.promo.price))}</strong>
          <small class="mt-price-urgency">${escapeHtml(project.promo.urgency || "Condição sujeita à disponibilidade")}</small>
        </div>`;
    }

    return `
      <div class="mt-price-block" style="margin-top:14px;padding-top:14px;border-top:1px solid #e3ded3;display:grid;gap:6px">
        <span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:850;color:#8a6a10">${escapeHtml(label)}</span>
        <strong style="font-size:1.3rem;line-height:1.15;color:${accent}">${escapeHtml(headline)}</strong>
        <small style="display:block;font-size:13px;line-height:1.5;color:#625f57">${escapeHtml(project.priceNote || "")}</small>
      </div>`;
  }

  function cardMarkup(project) {
    const actionLabel = project.cta || (project.priceState === "soldout" ? "Ver alternativas" : "Negociar condições");
    const interestValue = project.interest || project.name;

    return `
      <article class="mt-project-card" data-status="${escapeHtml(project.statusKey)}" data-zone="${escapeHtml(project.zone)}" data-award="${project.award ? "true" : "false"}" data-promo="${project.promo ? "true" : "false"}" data-cash-offer="${project.cashOffer ? "true" : "false"}">
        <div class="mt-project-image">
          <img data-project-image src="${escapeHtml(mediaUrl(project.image))}" alt="${escapeHtml(project.alt || project.name)}" width="828" height="743" loading="lazy" decoding="async">
          ${project.award ? `<span class="mt-award-seal" title="${escapeHtml(project.award.label)}" aria-label="${escapeHtml(project.award.label)}"><b>PRÊMIO MASTER</b><small>IMOBILIÁRIO 2026</small></span>` : ""}
          <span class="mt-status ${statusClass[project.statusKey] || ""}">${escapeHtml(project.status)}</span>
          ${project.feature ? `<span class="mt-feature">${escapeHtml(project.feature)}</span>` : ""}
          ${project.promo ? `<span class="mt-promo-ribbon"><b>OPORTUNIDADE</b><span>${escapeHtml(project.promo.unit || "")}</span></span>` : ""}
        </div>
        <div class="mt-project-body">
          <p class="mt-project-location">${escapeHtml(project.location)}</p>
          <h3>${escapeHtml(project.name)}</h3>
          <p class="mt-project-search-lead">${escapeHtml(projectSearchLead(project))}</p>
          <span class="mt-project-info">${escapeHtml(projectInfoForCard(project.info))}</span>
          ${project.award && project.award.tagline ? `<div class="mt-award-context" title="${escapeHtml(project.award.label)}">${escapeHtml(project.award.tagline)}</div>` : ""}
          ${priceMarkup(project)}
          <div class="mt-project-actions" style="grid-template-columns:${project.detailUrl ? "1fr 1fr" : "1fr"}">
            ${project.detailUrl ? `<a class="mt-interest" href="${escapeHtml(project.detailUrl)}" aria-label="Conhecer ${escapeHtml(project.name)}">Conhecer empreendimento</a>` : ""}
            <a class="mt-interest" href="#formulario" data-interest="${escapeHtml(interestValue)}" data-form-intent="conditions">${escapeHtml(actionLabel)}</a>
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

    const mount = () => {
      const existing = frame.querySelector("iframe");
      if (existing) return existing;
      const iframe = document.createElement("iframe");
      const params = new URLSearchParams({
        autoplay: "1",
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
      iframe.tabIndex = 0;
      frame.replaceChildren(iframe);
      return iframe;
    };

    const play = (focusPlayer = false) => {
      frame.removeAttribute("role");
      frame.removeAttribute("tabindex");
      frame.removeAttribute("aria-label");
      delete frame.dataset.videoReady;
      const iframe = mount();
      if (focusPlayer && iframe) {
        window.requestAnimationFrame(() => iframe.focus());
      }
    };

    frame.dataset.videoReady = "true";
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("aria-label", "Reproduzir filme da campanha More em um Tegra");
    frame.addEventListener("click", () => play(false), {once: true});
    frame.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        play(true);
      }
    });
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
      if (label) label.textContent = filtered.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas";
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

    const updateStatusButtons = () => {
      statusButtons.forEach((button) => {
        const active = button.dataset.filterStatus === state.status;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    };

    const setStatus = (value) => {
      state.status = value || "todos";
      updateStatusButtons();
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
        if (link.hasAttribute("data-focus-price") || link.hasAttribute("data-interest") || link.hasAttribute("data-continue-form")) return;
        const selector = link.getAttribute("href");
        if (!selector || selector === "#") return;
        if (scrollToSelector(selector)) event.preventDefault();
      })
    );

    root.querySelectorAll("[data-hero-video]").forEach(initVideo);
    const totalProjects = new Set(PROJECTS.map((project) => project.projectName || project.name)).size;
    root.querySelectorAll("[data-total-projects]").forEach((node) => {
      node.textContent = String(totalProjects);
    });

    updateQuickZones();
    updateStatusButtons();
    render();
  }

  function initAll() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initRoot);
  }

  function mountFloatingActions() {
    if (!document.querySelector(ROOT_SELECTOR)) return;
    if (document.getElementById("mt-floating-dock")) return;

    const dock = document.createElement("div");
    dock.id = "mt-floating-dock";
    dock.setAttribute("aria-label", "Ações rápidas");
    dock.innerHTML = `
      <a class="mt-floating mt-floating-lead"
         href="#formulario"
         data-form-intent="conditions"
         aria-label="Receber condições">Receber condições</a>
      <a class="mt-floating mt-floating-whatsapp"
         href="https://wa.me/5511960779328?text=Ol%C3%A1%2C%20quero%20conhecer%20as%20oportunidades%20Tegra%20em%20S%C3%A3o%20Paulo."
         target="_blank"
         rel="noreferrer"
         aria-label="Conversar pelo WhatsApp"><img src="https://s3-gdigital.s3.amazonaws.com/gdigital/313/whatsapp-removebg.webp" alt="" width="32" height="32" aria-hidden="true"></a>
    `;

    document.body.appendChild(dock);
  }

  function prefillInterestFromUrl() {
    const interest = new URLSearchParams(window.location.search).get("interesse");
    const input = document.getElementById("mt-lead-project");
    if (!interest || !input || input.value) return;
    input.value = interest;
  }

  function boot() {
    prefillInterestFromUrl();
    initAll();
    mountFloatingActions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {once: true});
  } else {
    boot();
  }

  const observer = new MutationObserver(() => {
    initAll();
    mountFloatingActions();
  });
  observer.observe(document.documentElement, {childList: true, subtree: true});
})();

// MNT-M2-09 measurement instrumentation v6.
// Source module for the single Green release artifact. No direct vendor dispatch.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const ROOT_SELECTOR = "[data-moretegra]";
  const EVENT_VERSION = 1;
  const PAGE_IDENTITY = "moretegra_home";
  const PRODUCT_IDENTITY = "moretegra_portfolio";
  const ROUTE = "/";
  const SEARCH_DEBOUNCE_MS = 600;
  const PAGE_VIEW_MARKER = Symbol.for("morenumtegra.measurement.page_view.v1");
  const BIND_MARKER = Symbol.for("morenumtegra.measurement.delegated.v6");
  const SEARCH_STATE = new WeakMap();
  const SEARCH_LOCATION_INDEX = new Map();
  const FORM_STARTED = new WeakSet();
  const NOT_APPLICABLE = "not_applicable";
  const FORM_PROVIDER = "green";
  const FORM_ID = 46;
  const FORM_NAME = "MoreEmUmTegra";
  const FORM_PLACEMENT = "form_46";
  const GREEN_FORM_SELECTOR = "form#form.form-content";
  const GREEN_FORM_SUBMIT_SELECTOR = 'button.g-recaptcha.button_hover[data-action="submit"]';
  const GREEN_FORM_FIELD_NAMES = Object.freeze(["nome", "email", "telefone"]);

  const ALLOWED_EVENT_PARAMETERS = Object.freeze({
    mnt_page_view: new Set(["placement"]),
    mnt_section_click: new Set(["section_target", "faq_item", "placement"]),
    mnt_catalog_filter: new Set(["filter_dimension", "filter_value", "result_count", "placement"]),
    mnt_catalog_search: new Set(["search_state", "search_location", "result_count", "placement"]),
    mnt_intent: new Set(["intent_type", "contact_channel", "placement", "project_name", "offer_name"]),
    mnt_form_start: new Set(["form_provider", "form_id", "form_name", "placement", "project_name", "offer_name"]),
    mnt_form_submit_attempt: new Set(["form_provider", "form_id", "form_name", "placement"])
  });

  const EVENT_PARAMETER_DEFAULTS = Object.freeze({
    mnt_section_click: Object.freeze({faq_item: NOT_APPLICABLE}),
    mnt_catalog_search: Object.freeze({search_location: NOT_APPLICABLE}),
    mnt_intent: Object.freeze({project_name: NOT_APPLICABLE, offer_name: NOT_APPLICABLE}),
    mnt_form_start: Object.freeze({project_name: NOT_APPLICABLE, offer_name: NOT_APPLICABLE})
  });

  const FORM_PARAMETERS = Object.freeze({
    form_provider: FORM_PROVIDER,
    form_id: FORM_ID,
    form_name: FORM_NAME,
    placement: FORM_PLACEMENT
  });

  const STATUS_VALUE = Object.freeze({
    todos: "all",
    lancamento: "launch",
    construcao: "construction",
    entregue: "ready"
  });

  const ZONE_VALUE = Object.freeze({
    todas: "all",
    "Zona Sul": "south",
    "Zona Oeste": "west",
    "Zona Leste": "east"
  });

  const PRICE_VALUE = Object.freeze({
    todos: "all",
    ate700: "lte_700k",
    "700a1200": "700k_1_2m",
    "1200a2000": "1_2m_2m",
    acima2000: "gt_2m",
    consulta: "consult"
  });

  const PROJECT_NAME_OVERRIDES = Object.freeze({
    "Nova Vivere | 72 m²": "Nova Vivere",
    "Nova Vivere | 105 m²": "Nova Vivere",
    "CAPIITOLO by Piero Lissoni | à vista": "CAPIITOLO by Piero Lissoni"
  });

  const FAQ_ITEM_BY_QUESTION = Object.freeze({
    "os valores mostrados sao finais": "valores_finais",
    "como comparar os empreendimentos": "comparar_empreendimentos",
    "como negociar uma condicao melhor": "negociar_condicao",
    "este e o site institucional da tegra": "site_institucional"
  });

  function isEligibleHost() {
    return window.location.hostname === CANONICAL_HOST;
  }

  function projectRoot() {
    return document.querySelector(ROOT_SELECTOR);
  }

  function asElement(target) {
    if (target instanceof Element) return target;
    return target?.parentElement || null;
  }

  function normalizeSearchState(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function normalizeControlledText(value) {
    return normalizeSearchState(value)
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function slugControlledText(value) {
    return normalizeControlledText(value).replace(/\s+/g, "_");
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

  function cleanParameters(eventName, parameters) {
    const allowlist = ALLOWED_EVENT_PARAMETERS[eventName];
    if (!allowlist) return {};

    const defaults = EVENT_PARAMETER_DEFAULTS[eventName] || {};
    const source = {...defaults};
    Object.entries(parameters || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      source[key] = value;
    });

    return Object.entries(source).reduce((result, [key, value]) => {
      if (!allowlist.has(key)) return result;
      result[key] = value;
      return result;
    }, {});
  }

  function emit(eventName, funnelStage, parameters = {}) {
    if (!isEligibleHost() || !projectRoot()) return false;
    if (!ALLOWED_EVENT_PARAMETERS[eventName]) return false;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      mnt_event_id: eventId(),
      mnt_event_version: EVENT_VERSION,
      page_identity: PAGE_IDENTITY,
      product_identity: PRODUCT_IDENTITY,
      route: ROUTE,
      funnel_stage: funnelStage,
      ...cleanParameters(eventName, parameters)
    });
    return true;
  }

  function projectContext(offerName) {
    const offer = String(offerName || "").trim();
    if (!offer) return {};
    return {
      project_name: PROJECT_NAME_OVERRIDES[offer] || offer,
      offer_name: offer
    };
  }

  function selectedProjectContext() {
    return projectContext(document.documentElement.dataset.moretegraInterest || "");
  }

  function resultCount(root) {
    const raw = root?.querySelector("[data-result-count]")?.textContent || "";
    const value = Number.parseInt(raw, 10);
    return Number.isFinite(value) ? value : 0;
  }

  function currentStatus(root) {
    return (
      root?.querySelector("[data-filter-status].is-active")?.dataset.filterStatus ||
      root?.querySelector("[data-status-mobile]")?.value ||
      "todos"
    );
  }

  function hasEffectiveFilters(root) {
    if (!root) return false;
    const zone = root.querySelector("[data-zone-filter]")?.value || "todas";
    const price = root.querySelector("[data-price-filter]")?.value || "todos";
    const query = normalizeSearchState(root.querySelector("[data-project-search]")?.value || "");
    return currentStatus(root) !== "todos" || zone !== "todas" || price !== "todos" || Boolean(query);
  }

  function registerSearchLocation(label) {
    const normalized = normalizeControlledText(label);
    const slug = slugControlledText(label);
    if (!normalized || !slug || normalized === "todas") return;
    if (!SEARCH_LOCATION_INDEX.has(normalized)) SEARCH_LOCATION_INDEX.set(normalized, slug);
  }

  function refreshSearchLocationIndex(root) {
    root?.querySelectorAll(".mt-project-location").forEach((node) => {
      const parts = String(node.textContent || "")
        .split("·")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts[0]) registerSearchLocation(parts[0]);
      if (parts[1]) registerSearchLocation(parts[1]);
    });
  }

  function containsControlledPhrase(haystack, needle) {
    if (!haystack || !needle) return false;
    return ` ${haystack} `.includes(` ${needle} `);
  }

  function classifySearchLocation(rawValue) {
    const query = normalizeControlledText(rawValue);
    if (!query) return "";

    const exact = SEARCH_LOCATION_INDEX.get(query);
    if (exact) return exact;

    const candidates = new Set();
    for (const [known, slug] of SEARCH_LOCATION_INDEX.entries()) {
      if (containsControlledPhrase(query, known) || containsControlledPhrase(known, query)) {
        candidates.add(slug);
      }
    }

    return candidates.size === 1 ? [...candidates][0] : "other";
  }

  function faqItem(summary) {
    const question = normalizeControlledText(summary?.textContent || "");
    return FAQ_ITEM_BY_QUESTION[question] || "other";
  }

  function emitPageViewOnce() {
    if (!isEligibleHost() || !projectRoot() || window[PAGE_VIEW_MARKER]) return false;
    window[PAGE_VIEW_MARKER] = true;
    return emit("mnt_page_view", "discovery", {placement: "document"});
  }

  function sectionPlacement(link) {
    if (link.closest(".mt-header")) return "header_nav";
    if (link.closest(".mt-hero")) return "hero";
    if (link.closest(".mt-moments")) return "moment_selector";
    return "content";
  }

  function sectionTargetFromHref(href) {
    if (href === "#oportunidades") return "opportunities";
    if (href === "#como-escolher") return "how_to_choose";
    if (href === "#negociacao") return "negotiation";
    if (href === "#inicio") return "top";
    return "";
  }

  function scheduleAfterInteraction(callback) {
    window.setTimeout(callback, 0);
  }

  function emitFilter(root, dimension, sourceValue, placement) {
    const map = dimension === "status" ? STATUS_VALUE : dimension === "zone" ? ZONE_VALUE : PRICE_VALUE;
    const canonicalValue = map[sourceValue];
    if (!canonicalValue) return;

    emit("mnt_catalog_filter", "consideration", {
      filter_dimension: dimension,
      filter_value: canonicalValue,
      result_count: resultCount(root),
      placement
    });
  }

  function cancelPendingSearch(root, committedValue = "") {
    const search = root?.querySelector("[data-project-search]");
    if (!search) return;
    const state = SEARCH_STATE.get(search);
    if (!state) return;
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = 0;
    state.lastCommitted = committedValue;
  }

  function isGreenForm46(form) {
    if (!(form instanceof HTMLFormElement)) return false;
    if (!form.matches(GREEN_FORM_SELECTOR)) return false;
    if (!form.querySelector(GREEN_FORM_SUBMIT_SELECTOR)) return false;
    return GREEN_FORM_FIELD_NAMES.every((name) => Boolean(form.querySelector(`[name="${name}"]`)));
  }

  function greenForm46FromElement(element) {
    const form = element?.closest?.(GREEN_FORM_SELECTOR);
    return isGreenForm46(form) ? form : null;
  }

  function emitFormStartOnce(form) {
    if (FORM_STARTED.has(form)) return false;
    FORM_STARTED.add(form);
    return emit("mnt_form_start", "intent", {
      ...FORM_PARAMETERS,
      ...selectedProjectContext()
    });
  }

  function handleFormInteraction(event) {
    if (event.isTrusted === false) return;
    const target = asElement(event.target);
    if (!target?.matches('input:not([type="hidden"]),textarea,select')) return;
    const form = greenForm46FromElement(target);
    if (!form) return;
    emitFormStartOnce(form);
  }

  function handleFormSubmitAttempt(button) {
    const form = button?.closest?.(GREEN_FORM_SELECTOR);
    if (!isGreenForm46(form)) return false;
    emitFormStartOnce(form);
    return emit("mnt_form_submit_attempt", "intent", FORM_PARAMETERS);
  }

  function handleSearchInput(event) {
    const target = asElement(event.target);
    if (!target?.matches("[data-project-search]")) return;
    const root = target.closest(ROOT_SELECTOR);
    if (!root) return;

    refreshSearchLocationIndex(root);

    let state = SEARCH_STATE.get(target);
    if (!state) {
      state = {lastCommitted: normalizeSearchState(target.defaultValue || ""), timer: 0};
      SEARCH_STATE.set(target, state);
    }

    const next = normalizeSearchState(target.value);
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.timer = 0;
      if (next === state.lastCommitted) return;
      state.lastCommitted = next;
      emit("mnt_catalog_search", "consideration", {
        search_state: next ? "active" : "cleared",
        search_location: next ? classifySearchLocation(next) : undefined,
        result_count: resultCount(root),
        placement: "catalog_search"
      });
    }, SEARCH_DEBOUNCE_MS);
  }

  function handleFilterChange(event) {
    const target = asElement(event.target);
    if (!target) return;
    const root = target.closest(ROOT_SELECTOR);
    if (!root) return;

    if (target.matches("[data-status-mobile]")) {
      const next = target.value || "todos";
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "status_mobile"));
      return;
    }

    if (target.matches("[data-zone-filter]")) {
      const next = target.value || "todas";
      scheduleAfterInteraction(() => emitFilter(root, "zone", next, "zone_select"));
      return;
    }

    if (target.matches("[data-price-filter]")) {
      const next = target.value || "todos";
      scheduleAfterInteraction(() => emitFilter(root, "price", next, "price_select"));
    }
  }

  function handleClick(event) {
    const element = asElement(event.target);
    if (!element) return;

    const formSubmitButton = element.closest(GREEN_FORM_SUBMIT_SELECTOR);
    if (formSubmitButton) {
      handleFormSubmitAttempt(formSubmitButton);
      return;
    }

    const floating = element.closest("#mt-floating-dock a");
    if (floating) {
      if (floating.matches(".mt-floating-lead")) {
        const context = selectedProjectContext();
        scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
          intent_type: "request_conditions",
          contact_channel: "form",
          placement: "floating",
          ...context
        }));
        return;
      }

      if (floating.matches(".mt-floating-whatsapp")) {
        const context = selectedProjectContext();
        scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
          intent_type: "whatsapp_contact",
          contact_channel: "whatsapp",
          placement: "floating",
          ...context
        }));
      }
      return;
    }

    const root = element.closest(ROOT_SELECTOR);
    if (!root) return;

    const faqSummary = element.closest(".mt-faq summary");
    if (faqSummary && root.contains(faqSummary)) {
      const details = faqSummary.closest("details");
      const wasOpen = details?.open === true;
      const item = faqItem(faqSummary);
      if (!wasOpen) {
        scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
          section_target: "faq",
          faq_item: item,
          placement: "faq"
        }));
      }
      return;
    }

    const target = element.closest("a,button");
    if (!target || !root.contains(target)) return;

    const cardInterest = target.closest("[data-interest]");
    if (cardInterest) {
      const context = projectContext(cardInterest.dataset.interest);
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "project_interest",
        contact_channel: "form",
        placement: "catalog_card",
        ...context
      }));
      return;
    }

    const continueForm = target.closest("[data-continue-form]");
    if (continueForm) {
      const context = selectedProjectContext();
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "request_project_conditions",
        contact_channel: "form",
        placement: "interest_context",
        ...context
      }));
      return;
    }

    const statusButton = target.closest("[data-filter-status]");
    if (statusButton) {
      const next = statusButton.dataset.filterStatus || "todos";
      if (statusButton.classList.contains("is-active")) return;
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "status_buttons"));
      return;
    }

    const quickZone = target.closest("[data-quick-zone]");
    if (quickZone) {
      const next = quickZone.dataset.quickZone || "todas";
      if (quickZone.classList.contains("is-active")) return;
      scheduleAfterInteraction(() => emitFilter(root, "zone", next, "zone_quick"));
      return;
    }

    const momentStatus = target.closest("[data-set-status]");
    if (momentStatus) {
      const next = momentStatus.dataset.setStatus || "todos";
      if (next === currentStatus(root)) return;
      scheduleAfterInteraction(() => emitFilter(root, "status", next, "moment_selector"));
      return;
    }

    const clear = target.closest("[data-clear-filters],[data-empty-clear]");
    if (clear) {
      if (!hasEffectiveFilters(root)) return;
      cancelPendingSearch(root, "");
      const placement = clear.matches("[data-empty-clear]") ? "empty_state_reset" : "clear_filters";
      scheduleAfterInteraction(() => emit("mnt_catalog_filter", "consideration", {
        filter_dimension: "reset",
        filter_value: "all",
        result_count: resultCount(root),
        placement
      }));
      return;
    }

    const focusPrice = target.closest("[data-focus-price]");
    if (focusPrice) {
      scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
        section_target: "opportunities",
        placement: "moment_selector"
      }));
      return;
    }

    const changeInterest = target.closest("[data-change-interest]");
    if (changeInterest) {
      scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
        section_target: "opportunities",
        placement: "content"
      }));
      return;
    }

    const href = target.getAttribute("href") || "";
    if (href.startsWith("#")) {
      if (href === "#formulario") {
        if (target.closest(".mt-header")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "request_conditions",
            contact_channel: "form",
            placement: "header_nav"
          }));
          return;
        }

        if (target.closest(".mt-hero")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "request_conditions",
            contact_channel: "form",
            placement: "hero"
          }));
          return;
        }

        if (target.closest(".mt-negotiation")) {
          scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
            intent_type: "negotiate_scenario",
            contact_channel: "form",
            placement: "negotiation"
          }));
          return;
        }
      }

      const sectionTarget = sectionTargetFromHref(href);
      if (sectionTarget) {
        const placement = sectionPlacement(target);
        scheduleAfterInteraction(() => emit("mnt_section_click", "consideration", {
          section_target: sectionTarget,
          placement
        }));
      }
      return;
    }

    if (target.matches('a[href^="https://wa.me/"]') && target.closest(".mt-negotiation")) {
      scheduleAfterInteraction(() => emit("mnt_intent", "intent", {
        intent_type: "schedule_visit",
        contact_channel: "whatsapp",
        placement: "negotiation"
      }));
    }
  }

  function bindDelegatedMeasurement() {
    if (window[BIND_MARKER]) return;
    window[BIND_MARKER] = true;
    document.addEventListener("focusin", handleFormInteraction, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("change", handleFilterChange, true);
    document.addEventListener("input", handleSearchInput, true);
  }

  function primeRuntime() {
    const root = projectRoot();
    if (!root) return false;
    refreshSearchLocationIndex(root);
    emitPageViewOnce();
    return true;
  }

  function waitForRootAndPrimeRuntime() {
    if (primeRuntime()) return;

    const observer = new MutationObserver(() => {
      if (!primeRuntime()) return;
      observer.disconnect();
    });

    observer.observe(document.documentElement, {childList: true, subtree: true});
    window.setTimeout(() => observer.disconnect(), 10000);
  }

  function start() {
    if (!isEligibleHost()) return;
    bindDelegatedMeasurement();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", waitForRootAndPrimeRuntime, {once: true});
    } else {
      waitForRootAndPrimeRuntime();
    }
  }

  start();
})();

// MNT-M5-01 F02: make skip-link focus transfer explicit across browsers.
(() => {
  "use strict";

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const skip = target?.closest('a.mt-skip[href="#conteudo"]');
    if (!skip) return;

    const main = document.getElementById("conteudo");
    if (!main) return;

    event.preventDefault();
    const transferFocus = () => {
      main.focus({preventScroll: true});
      main.scrollIntoView({block: "start"});
    };

    transferFocus();
    window.requestAnimationFrame(() => {
      if (document.activeElement !== main) transferFocus();
    });
  });
})();

// MNT-M2-09 Form 46 lead guard v4.
// Stores only a short-lived submit timestamp. Never reads or stores visitor PII.
(() => {
  "use strict";

  const CANONICAL_HOST = "moretegra.com.br";
  const ROOT_SELECTOR = "[data-moretegra]";
  const GREEN_FORM_SELECTOR = "form#form.form-content";
  const GREEN_FORM_SUBMIT_SELECTOR = 'button.g-recaptcha.button_hover[data-action="submit"]';
  const GREEN_FORM_FIELD_NAMES = Object.freeze(["nome", "email", "telefone"]);
  const LEAD_PENDING_KEY = "mnt.lead.pending.v1";

  function isGreenForm46(form) {
    if (!(form instanceof HTMLFormElement)) return false;
    if (!form.matches(GREEN_FORM_SELECTOR)) return false;
    if (!form.querySelector(GREEN_FORM_SUBMIT_SELECTOR)) return false;
    return GREEN_FORM_FIELD_NAMES.every((name) => Boolean(form.querySelector(`[name="${name}"]`)));
  }

  function armLeadPending(event) {
    if (window.location.hostname !== CANONICAL_HOST) return;
    if (!document.querySelector(ROOT_SELECTOR)) return;

    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest(GREEN_FORM_SUBMIT_SELECTOR);
    if (!button) return;

    const form = button.closest(GREEN_FORM_SELECTOR);
    if (!isGreenForm46(form)) return;
    // The successful Green redirect to /obrigado is the authoritative second factor.
    // Do not depend on native HTML submit/validity semantics from the reCAPTCHA-driven Green flow.

    try {
      window.sessionStorage.setItem(LEAD_PENDING_KEY, String(Date.now()));
    } catch {
      // A storage failure causes a false negative rather than a manufactured lead.
    }
  }

  document.addEventListener("click", armLeadPending, true);
})();
