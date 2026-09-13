# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva. `main` é a fonte canônica; sempre resolver o SHA live antes de agir.

## Estado live resolvido em 2026-09-13

- Repositório: `wagnerjfjunior/MoreNumTegra`
- PR #54: `MERGED` por squash
- MNT-M2-10 merge SHA: `5d2db073a4b345ae4e0067b675cab1cfb4a068ed`
- PR #55: `MERGED` por squash
- MNT-M2 completion reconciliation / current execution base: `894f0a7c94f15cf19a00481a45bc9d69749b067f`
- MNT-M2-10: `COMPLETE / ACCEPTED_WITH_V1_RESIDUAL`
- MNT-M2: `COMPLETE`
- MNT-M3: `ACTIVE`
- MNT-M3-01: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`
- MNT-M3-02: `PLANNED / NOT_YET_AUTHORIZED`

## Measurement aceito

```text
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
GTM = GTM-PGCR4R47
published GTM version = 7
```

GTM Version 7 permanece aceita; nenhuma nova mutação GTM/GA4 foi necessária para fechar MNT-M2-10 ou executar MNT-M3-01.

## Green / Form 46

```text
page 292 = https://moretegra.com.br/
page 294 = https://moretegra.com.br/obrigado
Form 46 = tenant 313 / form_id 46 / title MoreEmUmTegra
```

Contrato de release Green:

```text
page 292 -> src-greenn/moretegra.js
page 294 -> src-greenn/thank-you/obrigado.js
```

A Green possui um único campo de JavaScript customizado por página. Os módulos em `src-greenn/modules/` são fontes de desenvolvimento e não devem ser colados individualmente na Green.

## Funil validado

Fluxo aceito:

```text
mnt_form_start
-> mnt_form_submit_attempt
-> Green native Form 46 success
-> /obrigado?l_=<positive integer>&p_id=292
-> mnt_lead_success
-> GTM
-> GA4 generate_lead
```

QA live de MNT-M2-10 confirmou:

- `www` -> canonical sem Measurement project-owned no alias;
- um `page_view` project-owned por document load;
- reload gera novo event ID sem duplicação por load;
- busca de catálogo debounced sem raw free-form query no payload;
- `/obrigado` simples não fabrica lead;
- lead Green real gera exatamente um `mnt_lead_success` e um `generate_lead`;
- refresh/back não duplica lead;
- denied consent + persistência após reload;
- QA-01..QA-25 adjudicados.

## Residual V1 aceito

A página 294 usa um gate client-side. Um `pending` recente + entrada manual da forma completa aceita da URL pode satisfazer o gate. Isso é um `KNOWN / ACCEPTED V1 RESIDUAL` e **não** deve ser descrito como autenticação de sucesso pelo servidor/provider Green.

Esse residual é não-bloqueante para o fechamento de MNT-M2.

## Privacy / consent

- nenhum visitor name/email/phone é copiado para payload MNT/GA4;
- raw free-form catalogue search text permanece excluído;
- sem `gtag()`/`fbq()` direto no código do projeto;
- Consent Mode permanece default-denied com update conforme decisão do usuário;
- granted e denied persistence têm evidência aceita no escopo M2.

## Evidência canônica Measurement

- `docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`
- `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`

## MNT-M3-01 — pesquisa executada

A Product Authority autorizou explicitamente iniciar `MNT-M3-01 — Market and Search demand research` em `2026-09-13` após a confirmação do merge da PR #55.

Branch candidate:

`research/mnt-m3-01-market-search-demand`

Evidence candidate:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`
- `docs/search/data/MNT_M3_01_GSC_DEMAND_SNAPSHOT_2026-09-13.csv`
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`

No runtime/platform mutation was performed.

First-party GSC (`sc-domain:moretegra.com.br`, `2026-08-23..2026-09-13`):

```text
clicks = 0
impressions = 26
weighted average position ≈ 27.52
```

The sample remains sparse and mostly brand/entity-related.

Selected Google Keyword Planner estimates, Brazil/Portuguese/Google Search:

```text
tegra = 4,400 avg monthly searches
tegra incorporadora = 3,600
apartamentos são paulo = 12,100
apartamentos a venda são paulo = 8,100
apartamentos para comprar são paulo = 1,900
apartamentos na planta em são paulo = 590
```

Selected current-catalogue project-name demand signals:

```text
dsg itaim = 1,900
ária higienópolis = 1,900
teg sacomã = 1,900
ledge brooklin = 1,600
soma perdizes = 1,300
zahle jardins = 1,300
bueno brandão 257 = 1,300
ypy alto do ipiranga = 1,300
bem moema = 1,000
chateau jardin = 880
reserva caminhos da lapa = 720
```

These are Planner demand estimates, not proof of entity intent, SEO ranking difficulty or page ownership.

Research candidate conclusions:

- São Paulo new-residential market is active at material scale by official Secovi-SP evidence;
- current MoreNumTegra organic visibility is still very early compared with external brand/category demand;
- brand/entity, project-name and catalogue-aligned location families are the strongest direct-fit research clusters;
- generic São Paulo purchase terms are materially larger but require SERP/intent validation;
- stage/state queries correspond to current UI taxonomy;
- rental, houses and generic brokerage queries are excluded as out-of-scope noise;
- Semrush metrics were not available because the connected API reported insufficient unit balance.

## Progresso

Until Product Authority accepts MNT-M3-01:

```text
forecast total = 1240h
accepted scope-equivalent = 400h
remaining forecast = 840h
program progress = 32.26%
MNT-M3-01 candidate = 24h / not yet accepted
```

## Próxima ação segura

The next action is Product Authority review of the MNT-M3-01 candidate and explicit acceptance/Ready/merge authorization if satisfied.

`MNT-M3-02 — Extract and classify Search Console queries` remains planned and must **not** start by sequence alone.

## Residuals preservados

- Meta Pixel/Dataset/CAPI: não implementado; gate separado;
- Google Ads linking/conversions/campaign/spend: não autorizado;
- Vercel Production: update manual via terminal permanece separado;
- FECH.AI/n8n/Make/webhook/backend: fora do escopo V1 atual;
- www HTTP 301/308: ainda não provado;
- sitemap/canonical Search residuals permanecem separados;
- lead-validity client-side residual aceito em MNT-M2-10 permanece registrado;
- M3-01 GSC sample sparse / Planner Brazil scope remain research limitations for later M3 tasks.
