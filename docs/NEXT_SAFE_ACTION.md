# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-18`.

Antes de executar, resolver `main` live.

Base canônica observada nesta transição:

`e13b019f9bcca9e18bde8eedf0eb56a44a50be15`

## Estado atual

```text
HOME_RUNTIME = RESTORED / PRODUCT_AUTHORITY_SMOKE_OK
ELO_DUO_CONSENT = FIXED / MERGED / DEPLOYED
CAPIITOLO = PUBLISHED / INDEXABLE
ELO_DUO = PUBLISHED / INDEXABLE
VERCEL = PRODUCTION_ONLY_AUTOMATIC_DEPLOYMENT
NON_MAIN_PREVIEW = DISABLED
MNT-M4-05R = MERGED_RUNTIME / ACCEPTANCE_NOT_YET_DECLARED_COMPLETE
```

## Única próxima ação segura

Executar uma **validação factual e não mutativa de Search Console + sitemap + structured data** para responder:

1. o sitemap atual é sintaticamente correto e servido de forma aceitável pelo Google?
2. o `robots.txt` referencia corretamente o sitemap?
3. há headers HTTP ou comportamento de canonical/indexação que impeçam descoberta?
4. os "3 erros não críticos" em CAPIITOLO/Elo Duo são apenas recomendações opcionais ou representam defeito real?
5. existe erro real de JSON-LD na home, separado de peculiaridades do Schema.org Validator?

## Evidência a resolver

Estado versionado atual:

- `sitemap.xml`: home + CAPIITOLO + Elo Duo;
- namespace: `http://www.sitemaps.org/schemas/sitemap/0.9`;
- `robots.txt`: `Sitemap: https://www.moretegra.com.br/sitemap.xml`.

Evidência USER_REPORTED via screenshots do Search Console:

- home: "O URL está no Google";
- CAPIITOLO: 1 Product Snippet válido, com 3 issues não críticos;
- Elo Duo: Product detectado, com issues não críticos;
- issues observados incluem `aggregateRating`, `review`, `availability`; Merchant Listing também pode apontar `shippingDetails` e `hasMerchantReturnPolicy`.

## Restrições

- não preencher `aggregateRating`, `review`, `availability`, `shippingDetails` ou `hasMerchantReturnPolicy` com dados inventados;
- não remover Product/Offer apenas para zerar warnings sem decisão de produto/SEO;
- não alterar sitemap, robots, JSON-LD ou headers antes de provar o problema;
- não gerar Preview Vercel;
- qualquer alteração de código segue branch/PR, mas somente `main` pode gerar deployment automático;
- provider/rate-limit não deve ser classificado como falha de código sem evidência.

## Condição de encerramento

A ação termina quando houver uma classificação explícita:

```text
SITEMAP = VALID_AND_ACCEPTABLE | INVALID | NOT_PROVEN
ROBOTS = VALID | INVALID
PRODUCT_SNIPPET_WARNINGS = OPTIONAL | ACTIONABLE
HOME_JSONLD = VALID | INVALID | NEEDS_FURTHER_EVIDENCE
CODE_CHANGE_REQUIRED = YES | NO
```

Se `CODE_CHANGE_REQUIRED = YES`, abrir nova ação segura antes de mutar produção.
