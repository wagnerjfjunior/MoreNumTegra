// Contrato único de canais comerciais e analytics por região (Wagner, 2026-11-10).
// Motivo e fluxo: docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md · Regra: R1/R7 em
// docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md.
// As páginas são HTML estático e trazem os números escritos nelas; este arquivo é a fonte que os
// validadores usam para conferir que cada página usa só o canal da própria região.

export const ANALYTICS = Object.freeze({
  gtm: "GTM-PGCR4R47",
  ga4: "G-57M2XR0CY2",
  greenTenant: "313",
  thankYouPath: "/obrigado/",
});

export const CHANNELS = Object.freeze({
  // São Paulo: atendimento da Sabrina da Tegra (CRECI-SP). Não muda.
  sp: Object.freeze({
    whatsapp: "5511960779328",
    tel: "+5511960779328",
    display: "(11) 96077-9328",
    formId: "46",
  }),
  // Rio de Janeiro: central de atendimento RJ, que encaminha o lead ao corretor local autorizado
  // a vender Tegra no RJ. Número provisório (será trocado por um DDD do RJ). Não é da incorporadora.
  rj: Object.freeze({
    whatsapp: "5511951667227",
    tel: "+5511951667227",
    display: "(11) 95166-7227",
    formId: "47",
  }),
});

// Campos aceitos pelos formulários 46 e 47 da Green Sales (mesmo contrato).
export const FORM_FIELDS = Object.freeze(["nome", "email", "telefone", "texto-livre"]);

// Páginas que usam o canal RJ. Qualquer outra página comercial usa o canal SP.
export const RJ_PROJECT_SLUGS = Object.freeze([
  "kronos-by-tegra",
  "claris-rosas",
  "claris-casa-e-clube",
  "gran-thai-leisure-residence",
  "singular-private-residence",
  "gaea-home-resort",
  "riio-by-piero-lissoni",
]);

// Páginas de bairro do Rio (Wagner, 2026-11-13): mesmo canal RJ, form 47 e regras R1/R7.
export const RJ_REGION_PAGES = Object.freeze([
  "src-greenn/rj/regioes/index.html",
  "src-greenn/rj/regioes/oeste/barra-da-tijuca/index.html",
]);

export const RJ_PAGES = Object.freeze([
  "src-greenn/rio-de-janeiro/index.html",
  ...RJ_PROJECT_SLUGS.map((slug) => `src-greenn/empreendimentos/${slug}/index.html`),
  ...RJ_REGION_PAGES,
]);

// Copy aprovada para o canal RJ (Wagner, 2026-11-10).
export const RJ_COPY = Object.freeze({
  blockTitle: "Atendimento exclusivo para seu próximo imóvel",
  blockLead: "Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro.",
  footer: "Central de atendimento RJ · (11) 95166-7227 · Encaminhamento ao corretor local autorizado.",
  ctaWhatsapp: "Conversar no WhatsApp",
  ctaNegotiate: "Negociar condições",
  ctaPlan: "Solicitar planta",
});

// Frases que atribuem o canal RJ à incorporadora (proibidas nas páginas RJ, R7).
export const RJ_FORBIDDEN = /sabrina|CRECI|Incorporadora Tegra|direto com a Tegra|direto à Tegra|equipe Tegra Vendas/i;
