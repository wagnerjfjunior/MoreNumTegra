# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-18`.

## Estado após PR #119 e validação E2E do Form 46

A exceção de publicação do Ária Higienópolis foi executada e fechada no pipeline:

```text
PR_112 = MERGED
PR_113 = MERGED
PR_115 = MERGED
PR_117 = MERGED
PR_118 = MERGED
PR_119 = MERGED
PR_119_HEAD = 5b6dd53ef80caabbe0564c906cbfb6090ed2c07f
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
HOME_FORM46_PROJECT_CONTEXT_E2E = PASS
GREEN_SALES_RECEIPT = PASS
FORM46_REGRESSION = CLOSED
EXTERNAL_HTTP_SMOKE = PARTIALLY_PROVEN_BY_PRODUCT_AUTHORITY_SCREENSHOTS
ARIA_GSC_INDEXATION = NOT_PROVEN
CAPIITOLO_POST_115_GSC_RECRAWL = NOT_PROVEN
```

Registros: `docs/sfjm/ARIA_HIGIENOPOLIS_RELEASE_EXCEPTION_2026-09-18.md`, `docs/sfjm/CAPIITOLO_ENTITY_AUTHORITY_LOCATION_CORRECTION_2026-09-18.md` e `docs/sfjm/FORM46_HOME_PROJECT_CONTEXT_E2E_VALIDATION_2026-09-18.md`.

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
9. classificar warnings de Product/Merchant como opcionais ou realmente acionáveis;
10. revalidar no Rich Results a paridade pós-PR #118 entre Elo Duo, Ária e CAPIITOLO.

## Restrições

- o defeito de contexto do Form 46 da home está encerrado; não reabrir sem nova evidência de regressão;
- não alterar código apenas porque parte do smoke ainda depende de ferramentas externas;
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
