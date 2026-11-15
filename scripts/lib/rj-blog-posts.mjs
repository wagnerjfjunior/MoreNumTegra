// Posts do blog cujo assunto é o Rio de Janeiro (Wagner, 2026-11-13): usam o canal RJ, nunca a Sabrina.
// Critério: o tema do post é um empreendimento ou bairro do Rio. Post de SP que só cita o Rio de passagem
// (ex.: /blog/dicasedecor/quadras-condominio-tenis-beach-tennis/) continua com o canal SP.
// cardTitle/cardLead só existem nos posts que têm o cartão de atendimento no corpo.

export const RJ_BLOG_POSTS = Object.freeze([
  {
    file: "src-greenn/blog/mercado/orla-barra-tijuca-localizacao-conservacao/index.html",
    product: "o RIIO by Piero Lissoni na Barra da Tijuca",
    cardTitle: "Conheça o RIIO by Piero Lissoni",
    cardLead:
      "Fale com a central de atendimento RJ para solicitar os materiais do RIIO by Piero Lissoni e esclarecer os próximos passos da sua pesquisa de compra na Barra da Tijuca.",
    whatsappText:
      "Olá! Li o artigo “Imóveis na orla da Barra da Tijuca: localização, conservação e escolha” no MoreTegra e quero conhecer o RIIO by Piero Lissoni na Barra da Tijuca.",
  },
  {
    file: "src-greenn/blog/dicasedecor/casa-condominio-layout-claris-barra/index.html",
    product: "o Claris Casa &amp; Clube na Barra da Tijuca",
    cardTitle: "Conheça o Claris Casa &amp; Clube",
    cardLead:
      "Fale com a central de atendimento RJ para conhecer plantas, valores e condições do Claris Casa &amp; Clube, na Barra da Tijuca.",
    whatsappText:
      "Olá! Li o artigo sobre casas em condomínio no MoreTegra e quero conhecer o Claris Casa & Clube na Barra da Tijuca.",
  },
  // Posts antigos (noindex, fora do sitemap): só o rodapé tem canal comercial.
  { file: "src-greenn/blog/dicasedecor/condominio-de-casas-entenda-e-conheca-o-claris-casa-clube/index.html" },
  { file: "src-greenn/blog/lifestyle/kronos-by-tegra-a-primeira-blue-zone-urbana-do-rio/index.html" },
  { file: "src-greenn/blog/mercado/a-orla-da-barra-da-tijuca-luxo-no-rio-de-janeiro/index.html" },
  { file: "src-greenn/blog/lifestyle/claris-casa-clube-refugio-de-alto-padrao-na-barra-da-tijuca/index.html" },
  { file: "src-greenn/blog/lifestyle/o-minimalismo-do-riio-by-piero-lissoni-redefine-o-luxo-carioca/index.html" },
  { file: "src-greenn/blog/lifestyle/viver-na-abm-e-o-novo-significado-de-conveniencia-na-barra-da-tijuca/index.html" },
]);
