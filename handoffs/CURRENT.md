# Handoff Atual — MoreNumTegra

> RELEASE EXCEPTION ACTIVE (2026-09-18): Ária Higienópolis publication authorized by Product Authority. See `docs/sfjm/ARIA_HIGIENOPOLIS_RELEASE_EXCEPTION_2026-09-18.md`. Exact post-merge SHA/deployment must be reconciled after release.

Atualizado em `2026-09-18`.

GitHub `main` é a fonte canônica. Conversa, screenshots e memória não substituem o estado versionado.

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
CANONICAL_SHA = e13b019f9bcca9e18bde8eedf0eb56a44a50be15
OPEN_PULL_REQUESTS = 0
```

Lifecycle recente relevante:

- PR #108 — merged: removeu bindings RDFa `property="twitter:*"`, preservando Twitter/X Cards por `name="twitter:*"`;
- PR #109 — merged: hotfix da home; eliminou feedback loop de `MutationObserver`, restringiu observação ao grid e removeu auto-load de `floating-ui.js`;
- PR #110 — merged: restaurou apresentação da faixa de consentimento no Elo Duo e configurou Vercel para deployment automático somente em `main`.

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

```text
WEB PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
CANONICAL_SHA = e13b019f9bcca9e18bde8eedf0eb56a44a50be15
VERCEL_STATUS = SUCCESS
DEPLOYMENT_POLICY = main-only automatic deployment
NON_MAIN_AUTO_DEPLOY = disabled by git.deploymentEnabled["**"] = false
MAIN_AUTO_DEPLOY = enabled
```

Preservar a distinção:

```text
REPOSITORY_STATE != DEPLOYMENT_STATE
MERGED != DEPLOYED
DEPLOYED != PROD_SMOKE_TESTED
```

Não criar Preview deployments para branches/PRs salvo nova autorização explícita e necessidade comprovada. Motivo operacional: reduzir consumo/rate-limit Vercel.

## 3. VALIDATION_STATE

Home:

- runtime voltou a funcionar após PR #109;
- vídeo e fluidez foram validados pelo Product Authority como funcionando;
- faixa de consentimento da home voltou ao comportamento esperado;
- M4-05R ainda não deve ser declarado completamente aceito apenas com base em validações parciais.

Elo Duo:

- faixa de consentimento corrigida pela PR #110;
- produção atual contém o CSS compartilhado necessário no `project-page.css`.

Google Search Console — evidência atual fornecida pelo Product Authority via screenshots:

- home aparece como indexada / "O URL está no Google";
- CAPIITOLO possui Product Snippet válido;
- Elo Duo possui Product Snippet válido;
- Product Snippet exibe issues não críticos/optionais relacionados a `aggregateRating`, `review` e `availability`;
- Merchant listing pode exibir recomendações opcionais como `shippingDetails`, `availability` e `hasMerchantReturnPolicy`;
- não inventar rating, review, shipping, return policy ou disponibilidade para zerar warnings.

## 4. SITEMAP / ROBOTS — ESTADO CANÔNICO

`sitemap.xml` em `main` contém exatamente:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

Estrutura versionada:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ...
</urlset>
```

`robots.txt` contém:

```text
User-agent: *
Allow: /

Sitemap: https://www.moretegra.com.br/sitemap.xml
```

A aceitação efetiva do sitemap pelo Google ainda precisa ser resolvida live no Search Console. Não confundir XML válido no repositório com aceitação/indexação confirmada pelo Google.

## 5. CURRENT PRODUCT CONSTRAINTS

- HTML5 semântico + CSS + JavaScript vanilla;
- mobile-first, performance-first, SEO-first;
- GitHub `main` = fonte de verdade;
- Vercel = web production;
- Green/GDigital Form 46 = captação/CRM;
- Cloudflare = DNS authoritative / DNS only;
- não inventar preço, metragem, endereço, disponibilidade, rating ou review;
- não alterar produção fora de lifecycle governado;
- não criar commits artificiais para disparar deploy;
- não gerar Preview por padrão enquanto a política production-only estiver vigente.

## 6. CURRENT NEXT SAFE ACTION

A fonte autoritativa da próxima ação é `docs/NEXT_SAFE_ACTION.md`.

Tema imediato para a próxima conversa:

**validar Search Console / sitemap / structured data sem alterar código antes de provar a causa.**

A nova conversa deve:

1. resolver `main` live;
2. ler bootstrap + este handoff + PROJECT_STATUS + NEXT_SAFE_ACTION + BLOCKED_ACTIONS + baselines;
3. validar o `sitemap.xml`, `robots.txt` e resposta HTTP live;
4. distinguir warnings opcionais de erros reais no Product Snippet / Merchant Listings;
5. verificar se existe qualquer problema real de JSON-LD na home;
6. propor mudança somente se houver evidência concreta de invalidade ou perda de elegibilidade.
