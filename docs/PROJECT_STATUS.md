# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-18`.

Fonte canônica: GitHub `main`.

## 1. SEO / Search Console / Rich Results — fechamento pós-release

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

Product Authority supplied Google Search Console and Rich Results evidence after the PR #118/#119 runtime. Search Console also confirmed the resubmitted sitemap with four submitted URLs, zero errors and zero warnings.

The three exact-project pages now have externally proven Rich Results parity: one Product Snippet, one Merchant Listing, one Breadcrumb, two Local Business results and two Organization results, totaling seven valid items per project page.

The home is indexed and has five valid Rich Results items: two Local Business, two Organization and one Video. Search Console showing no indexed video is not treated as a page-indexation or structured-data defect.

Canonical evidence: `docs/sfjm/SEO_POST_RELEASE_VALIDATION_2026-09-18.md`.

No code change or WBS progress adjustment is required.

## 2. Estado atual de produção — pós PR #119

```text
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS = SUCCESS
PR_117 = MERGED
PR_118 = MERGED
PR_119 = MERGED
HOME_FORM46_PROJECT_CONTEXT_E2E = PASS
GREEN_SALES_RECEIPT = PASS
REGRESSION = CLOSED
```

A sequência #117–#119 padronizou os formulários/CTAs, corrigiu regressões visuais e encerrou o defeito de propagação do empreendimento selecionado na home até o Green Sales.

A evidência E2E de produção fornecida pelo Product Authority mostra:

```text
YPY Alto do Ipiranga | Agendar visita
```

no campo `texto-livre` do lead recebido pelo Green Sales. Isso comprova a composição `<empreendimento> | <intenção>` no caminho real home → Form 46 → GDigital/Green Sales.

Registro canônico: `docs/sfjm/FORM46_HOME_PROJECT_CONTEXT_E2E_VALIDATION_2026-09-18.md`.

Nenhum progresso WBS foi alterado por essa correção/validação.

## 3. Release Ária Higienópolis

```text
PRODUCT_AUTHORITY_EXCEPTION = CLOSED_AS_RELEASED_WITH_VALIDATION_RESIDUAL
PR_112 = MERGED
PR_112_MERGE_SHA = c4c5e74ac0a2b139df768484da565df471fb24ef
PR_113 = MERGED
RUNTIME_RELEASE_SHA = e9d4d63ba6fae578c2bef84aded69cf968166e29
VERCEL_STATUS = SUCCESS
PROD_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
```

A exceção autorizada foi executada sem ampliar o namespace, provider, DNS, framework ou política de deployment.

Foram incorporados:

- exact-project page Ária;
- link/card da home;
- structured-data list da home;
- sitemap com Ária;
- Vercel rewrite;
- commercial reference governada;
- seções de visita e financiamento indicativo;
- Form 46 compartilhado;
- consentimento/GTM;
- JSON-LD alinhado ao núcleo de identidade usado pelas demais exact-project pages.

O smoke HTTP externo ficou pendente apenas por limitação dos verificadores desta sessão. O commit final de runtime recebeu `Vercel = success`.

## 4. Produção

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
VERCEL_AUTOMATIC_DEPLOYMENTS = main only
NON_MAIN_DEPLOYMENTS = disabled
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
```

## 5. CAPIITOLO — correção de autoridade/localização

```text
PR_115 = MERGED
PR_115_HEAD = 8f105342b34efdcd0354cb663d3a365f31acb47a
MERGE_SHA = e9d4d63ba6fae578c2bef84aded69cf968166e29
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
PROD_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
```

A correção removeu do CAPIITOLO o endereço/geo de Caminhos da Lapa e o excesso de perfil corporativo Tegra, preservando Product/Offer, canonical, robots e o vínculo factual com a Tegra. O atendimento da Sabrina passa a ser modelado no próprio CAPIITOLO, com coordenadas fornecidas pelo Product Authority.

## 6. Rotas exact-project publicadas no repositório/deployment

- `/`
- `/empreendimentos/capiitolo-piero-lissoni/`
- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/aria-higienopolis/`

Para Ária:

- canonical próprio;
- index/follow;
- um H1;
- FAQ visible/schema 11/11;
- Offer ligado ao canonical do projeto;
- entity graph sem `@id` interno pendurado;
- official Tegra page ligada por `sameAs`;
- commercial-values `updatedAt=2026-09-18`.

## 7. Sitemap / robots

Sitemap canônico versionado contém quatro URLs, incluindo Ária. `robots.txt` continua apontando para o sitemap canônico.

```text
SITEMAP_REPOSITORY_STATE = UPDATED
SITEMAP_DEPLOYMENT_STATE = INCLUDED_IN_VERCEL_SUCCESS_SHA
SITEMAP_GSC_PROCESSING = ACCEPTED_4_URLS_0_ERRORS_0_WARNINGS
ARIA_GSC_INDEXATION = INDEXED
```

## 8. Search / structured data residuals

Evidência anterior do Product Authority permanece:

- home indexada;
- CAPIITOLO com Product Snippet válido;
- Elo Duo com Product detectado/válido;
- warnings como `aggregateRating`, `review`, `availability`, `shippingDetails` e `hasMerchantReturnPolicy` não autorizam dados inventados.

A validação live/GSC pós-release foi concluída: home, CAPIITOLO, Elo Duo e Ária estão indexados; CAPIITOLO, Elo Duo e Ária retornam sete itens válidos cada no Rich Results; o sitemap atualizado foi aceito com quatro URLs, zero erros e zero warnings.

## 9. M4-05R

```text
M4-05 historical implementation = MERGED
M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
M4-05R Product Decision = APPROVED
M4-05R Runtime = MERGED
M4-05R Acceptance = NOT_YET_DECLARED_COMPLETE
```

Nenhum progresso WBS foi alterado pelo release excepcional do Ária.

## 10. Próxima ação

Ver `docs/NEXT_SAFE_ACTION.md`.

Resolver o próximo task/gate canônico a partir do WBS e da governança vigente. A frente de validação pós-release de sitemap/indexação/structured data está encerrada e não requer mudança de código.


## Favicon standard — 2026-09-19

```text
CANONICAL_FAVICON = https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp
SCOPE = ALL_STANDALONE_HTML_PAGES_WITH_HEAD
FUTURE_PAGE_ENFORCEMENT = CI_REQUIRED
OLD_HORIZONTAL_LOGO_AS_FAVICON = FORBIDDEN
GOOGLE_SEARCH_FAVICON_FORMAT = OPEN / WEBP_NOT_LISTED_AS_SUPPORTED
```

Canonical contract: `docs/brand/FAVICON_STANDARD.md`. CI guard: `scripts/validate-favicon-standard.mjs` + `.github/workflows/favicon-standard.yml`.
