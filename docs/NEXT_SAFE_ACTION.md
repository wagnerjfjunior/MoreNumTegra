# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-30`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Estado: `NEXT_CYCLE_SEARCH_MEASUREMENT_PREPARATION`

## 1. Estado de entrada

A release Search + Conversion está integrada, publicada na Green e encerrada pela OT #34.

Nenhuma ação de tracking, Search Console, DNS, Google Ads ou spend está autorizada por esse fechamento.

## 2. Primeira transição aplicável

Antes de iniciar P0-B ou Measurement Foundation:

1. resolver live a provider PR #10 em `wagnerjfjunior/Blogs-sites-portais-seo`;
2. se a PR #10 possuir lifecycle pendente/material finding, concluir ou bloquear conforme a máquina canônica do provider;
3. não usar provider candidate como se estivesse integrado enquanto a PR #10 permanecer Draft/Open.

Após provider lifecycle concluído ou explicitamente adjudicado, iniciar **P0-B Search/indexabilidade** como próximo pacote consumer.

## 3. P0-B Search/indexabilidade

Escopo candidato:
- validar title/meta nativos no head inicial Green;
- validar canonical;
- comprovar ausência de noindex na Green;
- descobrir/implementar robots se capability existir;
- descobrir/implementar sitemap se capability existir;
- configurar Search Console sob gate próprio;
- manter Vercel noindex;
- investigar `www` 301/308.

Não inventar capability da Green.

## 4. Measurement Foundation

Somente depois de gate próprio.

Ativos exclusivos:
- GTM MoreNumTegra;
- GA4 MoreNumTegra;
- Meta Pixel/Dataset MoreNumTegra.

Arquitetura candidata:
- Meta via Green nativo;
- GTM via Green nativo;
- GA4 via GTM;
- Google Ads futuramente via GTM.

Antes de publicar:
- validar consentimento LGPD;
- definir event taxonomy;
- impedir duplicidade;
- testar denied/granted;
- validar `generate_lead`.

## 5. Event taxonomy candidata

- `page_view`
- `view_project`
- `select_offer`
- `click_whatsapp`
- `generate_lead`
- `view_promotion`

## 6. Gates separados

Exigem autorização específica:
- tracking/analytics;
- Meta Pixel/CAPI;
- GTM;
- GA4;
- Search Console;
- DNS;
- Google Ads;
- campanha/spend;
- produção Green adicional;
- alteração de contrato Search.

## 7. Condições de parada

Parar diante de:
- provider PR #10 com BLOCK/INCONCLUSIVE/material finding;
- capability Green não comprovada;
- risco de duplicidade de tags;
- consentimento técnico não comprovado;
- ausência de autorização aplicável;
- dado externo não verificado.

## 8. Resultado esperado do próximo ciclo

```text
PROVIDER LIFECYCLE RESOLVED
-> P0-B SEARCH INDEXABILITY
-> MEASUREMENT FOUNDATION
-> MEASUREMENT QA
-> SEARCH CONSOLE MONITORING
-> GOOGLE ADS CONVERSION SETUP
-> SEM
```
