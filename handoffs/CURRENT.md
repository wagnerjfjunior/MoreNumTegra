# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-18`.

GitHub `main` é a fonte canônica. Este handoff registra o **runtime release SHA** observado; toda nova sessão deve resolver `main` live novamente, porque o merge deste próprio closeout documental criará um SHA posterior sem alterar runtime.

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
ARIA_RELEASE_PR = #112 / MERGED
ARIA_SCHEMA_FIX_PR = #113 / MERGED
CAPIITOLO_ENTITY_AUTHORITY_PR = #115 / MERGED
UX_FORM_STANDARDIZATION_PR = #117 / MERGED
POST_117_UX_FIX_PR = #118 / MERGED
HOME_FORM46_CONTEXT_FIX_PR = #119 / MERGED
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS_FOR_RUNTIME_SHA = SUCCESS
HOME_FORM46_PROJECT_CONTEXT_E2E = PASS
SEO_POST_RELEASE_VALIDATION = PASS
PROJECT_RICH_RESULTS_PARITY = PASS_7_7_7
GSC_SITEMAP = ACCEPTED_4_URLS_0_ERRORS_0_WARNINGS
ARIA_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
OPEN_RUNTIME_PRS = 0
```

Release Ária Higienópolis:

- PR #112 publicou a nova exact-project page, integrou card/link da home, ItemList/entity graph da home, sitemap, rewrite Vercel, commercial-values e a exceção de governança;
- PR #113 corrigiu o `updatedAt` comercial e completou o entity graph do Ária sem alterar rota, Form 46 ou política de deploy;
- alterações fora de escopo identificadas na branch original foram removidas antes do release: mutação do experimento CAPIITOLO e redesign do campo opcional do Form 46 da home.

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS_FOR_RUNTIME_SHA = SUCCESS
DEPLOYMENT_POLICY = main-only automatic deployment
NON_MAIN_AUTO_DEPLOY = disabled
ARIA_ROUTE = /empreendimentos/aria-higienopolis/
PROD_HTTP_SMOKE = PARTIALLY_PROVEN_BY_PRODUCT_AUTHORITY_AND_GSC
```

Separação obrigatória:

```text
MERGED != DEPLOYED
DEPLOYED != PROD_HTTP_SMOKE_TESTED
SITEMAP_DEPLOYED != GSC_PROCESSED
```

O status Vercel do SHA final de runtime foi observado como `success`. O smoke HTTP externo não pôde ser concluído nesta sessão porque o fetch web não acessou o host e o ambiente de execução retornou falha temporária de resolução DNS. Isso é `VALIDATION_TOOLING_BLOCKED`, não evidência de falha de código ou de produção.

## 3. FORM 46 HOME PROJECT CONTEXT — E2E CLOSED

```text
PR_119 = MERGED
PR_119_HEAD = 5b6dd53ef80caabbe0564c906cbfb6090ed2c07f
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS = SUCCESS
FORM46_PROJECT_CONTEXT_E2E = PASS
GREEN_SALES_RECEIPT = PASS
REGRESSION = CLOSED
```

Production evidence supplied by Product Authority after the release showed the Green Sales `texto-livre` as:

```text
YPY Alto do Ipiranga | Agendar visita
```

This proves the exact-project context now survives the home journey through Form 46 and arrives in Green Sales together with the selected intent. The fallback `Página principal | Nenhum empreendimento selecionado | <intenção>` remains valid only for a true direct-form journey with no project selection.

Canonical evidence: `docs/sfjm/FORM46_HOME_PROJECT_CONTEXT_E2E_VALIDATION_2026-09-18.md`.

No additional runtime mutation is required for this defect. WBS progress remains unchanged.

## 4. ÁRIA HIGIENÓPOLIS — RELEASE STATE

```text
REPOSITORY = MERGED
VERCEL_DEPLOYMENT = SUCCESS
STATIC_RELEASE_VALIDATION = PASS
EXTERNAL_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
GSC_INDEXATION = INDEXED
```

Escopo publicado no runtime:

- rota canônica `/empreendimentos/aria-higienopolis/`;
- página indexável com canonical próprio, H1 único, Open Graph/Twitter e JSON-LD;
- card da home ligado à nova rota via `portal-links.js`;
- home ItemList/entity graph inclui Ária;
- `sitemap.xml` inclui Ária;
- commercial reference governada: R$ 501.000 / Studio 1510 / 30 m² / R$ 16.700/m² / referência Ago/26;
- seções de visita e possibilidades de pagamento;
- Form 46 usa runtime compartilhado com tenant 313 / form 46 / title MoreEmUmTegra;
- consentimento/GTM preservados;
- JSON-LD final possui Brand, Tegra Incorporadora, Tegra Vendas, ContactPoint, Sabrina da Tegra, Service, ApartmentComplex, Offer e FAQPage, sem IDs internos pendurados;
- FAQ visível/schema permanece 11/11.

A referência comercial oficial da Tegra observada em 2026-09-18 é de outra unidade e não foi misturada com a referência autorizada no MoreNumTegra.

## 5. SEO / SEARCH CONSOLE / RICH RESULTS — CLOSED

```text
GSC_SITEMAP = ACCEPTED
SITEMAP_URLS = 4
SITEMAP_ERRORS = 0
SITEMAP_WARNINGS = 0

HOME_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
ARIA_INDEXATION = INDEXED

CAPIITOLO_RICH_RESULTS = 7_VALID
ELO_DUO_RICH_RESULTS = 7_VALID
ARIA_RICH_RESULTS = 7_VALID
HOME_RICH_RESULTS = 5_VALID

ARIA_GOOGLE_CANONICAL = ACCEPTED
CODE_CHANGE_REQUIRED = NO
```

Evidence combines Product Authority screenshots from Google Search Console / Rich Results Test and read-only Search Console data for `sc-domain:moretegra.com.br`.

Canonical record: `docs/sfjm/SEO_POST_RELEASE_VALIDATION_2026-09-18.md`.

This closes the prior sitemap-processing, Ária-indexation, CAPIITOLO-recrawl and project Rich Results parity residuals. No runtime mutation or WBS progress change follows from this validation.

## 6. CAPIITOLO — ENTITY AUTHORITY / IN-LOCO LOCATION

```text
PR_115 = MERGED
PR_115_HEAD = 8f105342b34efdcd0354cb663d3a365f31acb47a
MERGE_SHA = e9d4d63ba6fae578c2bef84aded69cf968166e29
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
EXTERNAL_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
```

O CAPIITOLO preserva Product/Offer, canonical e indexabilidade, mas agora:
- usa o próprio empreendimento como `workLocation` da Sabrina;
- contém as coordenadas fornecidas pelo Product Authority;
- remove referências de atendimento do Caminhos da Lapa;
- reduz a entidade Tegra ao vínculo factual mínimo necessário;
- remove redes sociais, endereço corporativo e demais dados institucionais Tegra desnecessários ao objetivo do MoreNumTegra.

Nenhum Preview de branch foi criado. O smoke HTTP externo continuou bloqueado pelas ferramentas por resolução DNS temporária, sem evidência de falha de produção.

## 7. SITEMAP / ROBOTS

`sitemap.xml` em `main` contém quatro URLs canônicas:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`
4. `https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`

`robots.txt` continua apontando para `https://www.moretegra.com.br/sitemap.xml`.

A aceitação/indexação efetiva no Google permanece não comprovada por evidência de repositório.

## 8. CURRENT PRODUCT CONSTRAINTS

- HTML5 semântico + CSS + JavaScript vanilla;
- mobile-first, SEO-first, performance-first;
- GitHub `main` = fonte de verdade;
- Vercel = web production;
- Green/GDigital Form 46 = captação/CRM;
- Cloudflare = DNS authoritative / DNS only;
- não inventar preço, metragem, endereço, disponibilidade, rating ou review;
- não alterar produção fora de lifecycle governado;
- não criar commits artificiais para disparar deploy;
- não reativar Preview automático sem necessidade/autorização.

## 9. CURRENT NEXT SAFE ACTION

A fonte autoritativa é `docs/NEXT_SAFE_ACTION.md`.

A validação pós-release de Search Console/sitemap/structured data está encerrada com evidência positiva. A próxima ação segura é **resolver o próximo task/gate canônico no WBS e na governança do repositório**, sem inferir progresso e sem mutar runtime antes dessa resolução.


## Favicon standard — 2026-09-19

```text
CANONICAL_FAVICON = https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp
SCOPE = ALL_STANDALONE_HTML_PAGES_WITH_HEAD
FUTURE_PAGE_ENFORCEMENT = CI_REQUIRED
OLD_HORIZONTAL_LOGO_AS_FAVICON = FORBIDDEN
GOOGLE_SEARCH_FAVICON_FORMAT = OPEN / WEBP_NOT_LISTED_AS_SUPPORTED
```

Canonical contract: `docs/brand/FAVICON_STANDARD.md`. CI guard: `scripts/validate-favicon-standard.mjs` + `.github/workflows/favicon-standard.yml`.
