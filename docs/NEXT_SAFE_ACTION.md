# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-18`.

## Estado após a exceção Ária

A exceção de publicação do Ária Higienópolis foi executada e fechada no pipeline:

```text
PR_112 = MERGED
PR_113 = MERGED
RUNTIME_RELEASE_SHA = 9d5c82cccb43dcc3992dc24f0d457f24a47cf111
VERCEL_STATUS = SUCCESS
STATIC_VALIDATION = PASS
EXTERNAL_HTTP_SMOKE = NOT_PROVEN_BY_CURRENT_TOOLING
GSC_INDEXATION = NOT_PROVEN
```

Registro: `docs/sfjm/ARIA_HIGIENOPOLIS_RELEASE_EXCEPTION_2026-09-18.md`.

## Única próxima ação segura

Executar uma **validação factual e não mutativa pós-release** para resolver:

1. HTTP live de `/`, `/empreendimentos/aria-higienopolis/`, `/sitemap.xml` e `/robots.txt`;
2. canonical/indexability do Ária no runtime;
3. carregamento de assets essenciais e existência do card/link da home;
4. Search Console do sitemap atualizado;
5. inspeção/descoberta do Ária no Google;
6. structured data do Ária e da home;
7. classificação dos warnings de Product/Merchant como opcionais ou realmente acionáveis.

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
ARIA_HTTP = PASS | FAIL | NOT_PROVEN
SITEMAP_HTTP = PASS | FAIL | NOT_PROVEN
ROBOTS_HTTP = PASS | FAIL | NOT_PROVEN
ARIA_CANONICAL = VALID | INVALID | NOT_PROVEN
ARIA_STRUCTURED_DATA = VALID | INVALID | NEEDS_FURTHER_EVIDENCE
GSC_SITEMAP = ACCEPTED | ERROR | NOT_PROVEN
ARIA_INDEXATION = INDEXED | NOT_INDEXED | NOT_PROVEN
CODE_CHANGE_REQUIRED = YES | NO
```

Se `CODE_CHANGE_REQUIRED = YES`, abrir nova ação segura antes de mutar produção.
