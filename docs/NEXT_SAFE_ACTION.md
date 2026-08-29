# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-29`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Active contract: `docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`
- Estado: `SEARCH_CONVERSION_AWARD_METADATA_PACKAGE`

## 1. Contexto

O Product Authority aprovou em 2026-08-29 o pacote delimitado de:

- copy e badge do Prêmio Master Imobiliário 2026;
- dois cards Nova Vivere na mesma home;
- card Nova Vivere 105 m² / unidade 708 / R$ 1.129.900 à vista;
- title/meta description;
- canonical comercial via JavaScript;
- Open Graph/Twitter;
- JSON-LD conservador `WebSite + WebPage`.

A aprovação não implica merge nem Green.

Search provider candidate:

`wagnerjfjunior/Blogs-sites-portais-seo PR #10`

MoreNumTegra continua Product Authority.

## 2. Máquina de próxima ação

Resolver live PR, head, base, Vercel, documentação, reviews, threads e autorizações. Executar somente a primeira condição aplicável:

1. se head/base divergirem ou houver finding material -> parar e reconciliar;
2. se Vercel do head exato não estiver `success` -> aguardar/revalidar;
3. se não houver documentation audit atual para o head -> executar READ_ONLY;
4. se documentation audit = `BLOCK` ou `INCONCLUSIVE` -> parar;
5. se não houver lifecycle governance atual para head+base -> executar READ_ONLY;
6. se lifecycle governance = `BLOCK` ou `INCONCLUSIVE` -> parar;
7. se PR estiver Draft e não houver autorização Ready exata -> solicitar autorização;
8. se PR estiver Draft e houver autorização Ready exata -> marcar Ready somente;
9. depois de Ready, revalidar reviews/threads/checks;
10. merge exige autorização nova, separada e posterior ao Ready;
11. após merge, verificar novo `main` e Vercel Production;
12. Green continua gate separado e manual.

`READY != MERGE`

`MERGE != GREEN`

## 3. Acceptance do pacote

Antes de Ready, confirmar no head exato:

- Vercel Preview = `success`;
- JavaScript sintaticamente válido;
- Vercel continua `noindex,nofollow`;
- canonical = `https://moretegra.com.br/`;
- nenhum canonical para hostname Vercel;
- title/meta description conforme contrato;
- OG/Twitter conforme contrato;
- JSON-LD apenas `WebSite + WebPage`;
- sem tracking, Search Console ou SEM;
- sem interceptação do Form 46;
- sem outbound CTA para SECOVI-SP;
- nome oficial `PRÊMIO MASTER IMOBILIÁRIO 2026` visível;
- Nova Vivere 72 m² no início da grade;
- Nova Vivere 105 m² no meio da grade;
- card 105 m² usa `R$ 1.129.900 à vista*` + disclaimer próximo;
- evidência da unidade 708 versionada.

## 4. Green

Green só pode ocorrer após:

1. merge autorizado separadamente;
2. Vercel Production alinhada ao novo `main`;
3. reconfirmação de disponibilidade/preço da unidade 708;
4. owner copiar manualmente os artefatos aprovados;
5. publicação e smoke production.

## 5. Bloqueios preservados

Continuam fora do pacote:

- DNS;
- Search Console;
- GA4/GTM/Meta Pixel;
- SEM/spend;
- schema de award/review/rating;
- Product schema com preço volátil na home;
- mudanças de Form 46;
- publicação Green antes de merge;
- qualquer expansão não descrita no contrato.

## 6. Condições de parada

Parar diante de:

- drift de head/base;
- Vercel diferente de `success`;
- remoção do noindex da homologação;
- canonical conflitante;
- dado comercial sem evidência;
- finding material;
- review/thread material;
- ausência de autorização aplicável;
- tentativa de reutilizar autorização de Ready como merge.
