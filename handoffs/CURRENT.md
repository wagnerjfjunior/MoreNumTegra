# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-18`.

GitHub `main` é a fonte canônica. Este handoff registra o **runtime release SHA** observado; toda nova sessão deve resolver `main` live novamente, porque o merge deste próprio closeout documental criará um SHA posterior sem alterar runtime.

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
ARIA_RELEASE_PR = #112 / MERGED
ARIA_SCHEMA_FIX_PR = #113 / MERGED
RUNTIME_RELEASE_SHA = 9d5c82cccb43dcc3992dc24f0d457f24a47cf111
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
RUNTIME_RELEASE_SHA = 9d5c82cccb43dcc3992dc24f0d457f24a47cf111
VERCEL_STATUS_FOR_RUNTIME_SHA = SUCCESS
DEPLOYMENT_POLICY = main-only automatic deployment
NON_MAIN_AUTO_DEPLOY = disabled
ARIA_ROUTE = /empreendimentos/aria-higienopolis/
PROD_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
```

Separação obrigatória:

```text
MERGED != DEPLOYED
DEPLOYED != PROD_HTTP_SMOKE_TESTED
SITEMAP_DEPLOYED != GSC_PROCESSED
```

O status Vercel do SHA final de runtime foi observado como `success`. O smoke HTTP externo não pôde ser concluído nesta sessão porque o fetch web não acessou o host e o ambiente de execução retornou falha temporária de resolução DNS. Isso é `VALIDATION_TOOLING_BLOCKED`, não evidência de falha de código ou de produção.

## 3. ÁRIA HIGIENÓPOLIS — RELEASE STATE

```text
REPOSITORY = MERGED
VERCEL_DEPLOYMENT = SUCCESS
STATIC_RELEASE_VALIDATION = PASS
EXTERNAL_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
GSC_INDEXATION = NOT_PROVEN
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

## 4. SITEMAP / ROBOTS

`sitemap.xml` em `main` contém quatro URLs canônicas:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`
4. `https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`

`robots.txt` continua apontando para `https://www.moretegra.com.br/sitemap.xml`.

A aceitação/indexação efetiva no Google permanece não comprovada por evidência de repositório.

## 5. CURRENT PRODUCT CONSTRAINTS

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

## 6. CURRENT NEXT SAFE ACTION

A fonte autoritativa é `docs/NEXT_SAFE_ACTION.md`.

Próxima frente: **validação não mutativa pós-release de HTTP/Search Console/sitemap/structured data**, agora incluindo Ária Higienópolis. Nenhuma nova correção de código deve ser aberta antes de provar um defeito real.
