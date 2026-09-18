# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-18`.

Fonte canônica: GitHub `main`.

## 1. Release Ária Higienópolis

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

## 2. Produção

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
VERCEL_AUTOMATIC_DEPLOYMENTS = main only
NON_MAIN_DEPLOYMENTS = disabled
RUNTIME_RELEASE_SHA = 9d5c82cccb43dcc3992dc24f0d457f24a47cf111
```

## 3. CAPIITOLO — correção de autoridade/localização

```text
PR_115 = MERGED
PR_115_HEAD = 8f105342b34efdcd0354cb663d3a365f31acb47a
MERGE_SHA = e9d4d63ba6fae578c2bef84aded69cf968166e29
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
PROD_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
```

A correção removeu do CAPIITOLO o endereço/geo de Caminhos da Lapa e o excesso de perfil corporativo Tegra, preservando Product/Offer, canonical, robots e o vínculo factual com a Tegra. O atendimento da Sabrina passa a ser modelado no próprio CAPIITOLO, com coordenadas fornecidas pelo Product Authority.

## 4. Rotas exact-project publicadas no repositório/deployment

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

## 5. Sitemap / robots

Sitemap canônico versionado contém quatro URLs, incluindo Ária. `robots.txt` continua apontando para o sitemap canônico.

```text
SITEMAP_REPOSITORY_STATE = UPDATED
SITEMAP_DEPLOYMENT_STATE = INCLUDED_IN_VERCEL_SUCCESS_SHA
SITEMAP_GSC_PROCESSING = NOT_PROVEN
ARIA_GSC_INDEXATION = NOT_PROVEN
```

## 6. Search / structured data residuals

Evidência anterior do Product Authority permanece:

- home indexada;
- CAPIITOLO com Product Snippet válido;
- Elo Duo com Product detectado/válido;
- warnings como `aggregateRating`, `review`, `availability`, `shippingDetails` e `hasMerchantReturnPolicy` não autorizam dados inventados.

Ária ainda precisa de validação live/GSC pós-release antes de qualquer claim de indexação.

CAPIITOLO precisa de recrawl/inspeção pós-PR #115 para confirmar que o Product Snippet continua válido e que a nova modelagem de entidade/localização foi processada sem regressão.

## 7. M4-05R

```text
M4-05 historical implementation = MERGED
M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
M4-05R Product Decision = APPROVED
M4-05R Runtime = MERGED
M4-05R Acceptance = NOT_YET_DECLARED_COMPLETE
```

Nenhum progresso WBS foi alterado pelo release excepcional do Ária.

## 8. Próxima ação

Ver `docs/NEXT_SAFE_ACTION.md`.

Executar validação não mutativa de HTTP live + sitemap/robots + Search Console + structured data, incluindo Ária e CAPIITOLO pós-PR #115. Só abrir mudança de código com evidência concreta de defeito.
