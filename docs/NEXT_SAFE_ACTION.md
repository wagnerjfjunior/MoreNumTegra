# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-18`.

## Estado após Ária + correção CAPIITOLO

A exceção de publicação do Ária Higienópolis foi executada e fechada no pipeline:

```text
PR_112 = MERGED
PR_113 = MERGED
PR_115 = MERGED
PR_115_HEAD = 8f105342b34efdcd0354cb663d3a365f31acb47a
RUNTIME_RELEASE_SHA = e9d4d63ba6fae578c2bef84aded69cf968166e29
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
EXTERNAL_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
ARIA_GSC_INDEXATION = NOT_PROVEN
CAPIITOLO_POST_115_GSC_RECRAWL = NOT_PROVEN
```

Registros: `docs/sfjm/ARIA_HIGIENOPOLIS_RELEASE_EXCEPTION_2026-09-18.md` e `docs/sfjm/CAPIITOLO_ENTITY_AUTHORITY_LOCATION_CORRECTION_2026-09-18.md`.

## Única próxima ação segura

Executar uma **validação factual e não mutativa pós-release** para resolver:

1. HTTP live de `/`, CAPIITOLO, Ária, `/sitemap.xml` e `/robots.txt`;
2. canonical/indexability de CAPIITOLO e Ária no runtime;
3. carregamento de assets essenciais e existência dos links/cards da home;
4. Search Console do sitemap atualizado;
5. inspeção/descoberta do Ária no Google;
6. recrawl/inspeção do CAPIITOLO após a PR #115;
7. structured data do CAPIITOLO, Ária e home;
8. confirmar que o Product Snippet do CAPIITOLO continua válido após a correção de entidade/localização;
9. classificar warnings de Product/Merchant como opcionais ou realmente acionáveis.

## Restrições

- não alterar código apenas porque o smoke desta sessão ficou bloqueado pelas ferramentas;
- não classificar falha de DNS/fetch do ambiente de validação como falha de produção sem evidência independente;
- não inventar `aggregateRating`, `review`, `availability`, `shippingDetails` ou `hasMerchantReturnPolicy`;
- não gerar Preview Vercel;
- qualquer correção futura segue branch/PR;
- somente `main` permanece habilitada para deployment automático.

## Condição de encerramento

Produzir classificação explícita:

```text
HOME_HTTP = PASS | FAIL | NOT_PROVEN
CAPIITOLO_HTTP = PASS | FAIL | NOT_PROVEN
ARIA_HTTP = PASS | FAIL | NOT_PROVEN
SITEMAP_HTTP = PASS | FAIL | NOT_PROVEN
ROBOTS_HTTP = PASS | FAIL | NOT_PROVEN
CAPIITOLO_CANONICAL = VALID | INVALID | NOT_PROVEN
ARIA_CANONICAL = VALID | INVALID | NOT_PROVEN
CAPIITOLO_STRUCTURED_DATA = VALID | INVALID | NEEDS_FURTHER_EVIDENCE
CAPIITOLO_PRODUCT_SNIPPET = VALID | REGRESSED | NOT_PROVEN
ARIA_STRUCTURED_DATA = VALID | INVALID | NEEDS_FURTHER_EVIDENCE
GSC_SITEMAP = ACCEPTED | ERROR | NOT_PROVEN
ARIA_INDEXATION = INDEXED | NOT_INDEXED | NOT_PROVEN
CODE_CHANGE_REQUIRED = YES | NO
```

Se `CODE_CHANGE_REQUIRED = YES`, abrir nova ação segura antes de mutar produção.
