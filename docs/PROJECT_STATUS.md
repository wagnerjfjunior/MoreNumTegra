# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-14`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-10 merge: PR #54 / squash merge `5d2db073a4b345ae4e0067b675cab1cfb4a068ed`
- MNT-M2 completion reconciliation: PR #55 / squash merge `894f0a7c94f15cf19a00481a45bc9d69749b067f`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase concluída: `MNT-M2 — COMPLETE`
- Fase atual candidate: `MNT-M3 — ACTIVE`
- Task atual candidate: `MNT-M3-01 — COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`
- Próxima task após aceitação, ainda não autorizada: `MNT-M3-02 — Extract and classify Search Console queries`
- Saúde operacional do V1: `verde`

## 1. Produção atual

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- Vercel deployment mode: `GIT_DRIVEN_FILTERED_AUTOMATIC` conforme ADR-004
- Form 46 nativo permanece autoritativo para captação
- Green page 292 usa `src-greenn/moretegra.js`
- Green page 294 usa `src-greenn/thank-you/obrigado.js`
- mudanças runtime mergeadas em `main` disparam Vercel Production automaticamente; commits exclusivamente documentais são cancelados pelo Ignored Build Step
- MNT-M3-01 não realizou mutation em produção, Measurement, Ads, Search Console, DNS, Green ou Vercel

Preservar:

```text
LIVE V1 OPERATIONAL != MNT-RESF PROGRAM COMPLETE
PROGRAM PROGRESS != V1 PRODUCT READINESS
GREEN PRODUCTION != VERCEL HOMOLOGATION
MNT-M2 COMPLETE != MNT-M3 COMPLETE
MNT-M3-01 COMPLETE_CANDIDATE != MNT-M3-01 ACCEPTED
MNT-M3-01 ACCEPTED != MNT-M3-02 AUTHORIZED
```

## 2. Programa MNT-RESF

Estado desta revisão candidate:

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 COMPLETE
  MNT-M2-01 COMPLETE
  MNT-M2-02 COMPLETE
  MNT-M2-03 COMPLETE
  MNT-M2-04 COMPLETE
  MNT-M2-05 COMPLETE
  MNT-M2-06 COMPLETE
  MNT-M2-07 COMPLETE
  MNT-M2-08 COMPLETE
  MNT-M2-09 COMPLETE
  MNT-M2-10 COMPLETE / ACCEPTED_WITH_V1_RESIDUAL
MNT-M3 ACTIVE
  MNT-M3-01 COMPLETE_CANDIDATE / PENDING_ACCEPTANCE
  MNT-M3-02..07 PLANNED / NOT_AUTHORIZED
MNT-M4..MNT-M7 PLANNED
```

Planning forecast enquanto M3-01 ainda não foi aceito:

```text
forecast total                = 1240h
accepted scope-equivalent     = 400h
remaining forecast            = 840h
program progress              = 32.26%
MNT-M3-01 candidate           = 24h / not yet accepted
```

Accepted M2 scope-equivalent = `144h`:

- M2-01 `8h`;
- M2-02 `16h`;
- M2-03 `16h`;
- M2-04 `8h`;
- M2-05 `8h`;
- M2-06 `8h`;
- M2-07 `16h`;
- M2-08 `16h`;
- M2-09 `24h`;
- M2-10 `24h`.

## 3. Measurement foundation — COMPLETE

Accepted Google runtime:

```text
GTM container = GTM-PGCR4R47
GTM current accepted publication = Version 7
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
Enhanced Measurement = OFF
```

Canonical source events:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Primary conversion mapping:

```text
mnt_lead_success -> GA4 generate_lead
```

`generate_lead` permanece GA4 `Evento principal` / Key event. Nenhum valor monetário de lead foi definido.

## 4. MNT-M2-10 — end-to-end QA

Evidence:

- `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`

Resultado:

- QA-01..QA-25 adjudicados;
- `www` -> canonical Measurement behavior validado;
- page-view uniqueness/reload validado;
- catalog search debounce/privacy validado;
- Form 46 negative bare `/obrigado` validado;
- genuine Green success -> exatamente um `mnt_lead_success` -> um `generate_lead`;
- refresh/back dedup validado;
- denied consent + persistence após reload validado;
- nenhum P0/P1 Measurement permanece sem adjudicação no escopo M2.

## 5. Residual V1 aceito — lead validity

A page 294 usa gate client-side. Um pending recente + entrada manual da forma completa aceita da URL pode satisfazer o gate.

Esse comportamento foi explicitamente aceito pela Product Authority como residual V1 não-bloqueante para MNT-M2. Não deve ser descrito como provider/server authentication.

Uma arquitetura mais forte exigiria gate futuro específico de lead-validity/provider handoff; não é implícita pelo fechamento de M2.

## 6. Privacy / consent

- visitor name/email/phone permanecem fora dos payloads MNT/GA4;
- raw free-form catalogue search text permanece excluído;
- GTM permanece o dispatcher project-owned do browser;
- sem `gtag()` ou `fbq()` direto project-owned;
- Consent Mode default-denied/update permanece aceito;
- granted e denied persistence possuem evidência aceita no escopo M2.

## 7. Meta Measurement boundary

Meta runtime permanece fora do MNT-M2 executado:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
META_CAPI = NOT_IMPLEMENTED / NOT_AUTHORIZED
```

Não inferir ownership de website Pixel/Dataset por associação com Facebook Page, Lead Ads, ad account ou Green CRM.

## 8. Search / GSC residuals históricos

P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

Residuals:

- canonical client-side;
- sitemap unavailable;
- `www` sem HTTP 301/308 comprovado;
- histórico `web-share` warning.

GSC T0 histórico:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Esse baseline histórico não deve ser confundido com os dados current candidate de MNT-M3-01.

## 9. MNT-M3-01 — Market and Search demand research candidate

Execution authorization: Product Authority explícita em `2026-09-13`.  
Execution base: `894f0a7c94f15cf19a00481a45bc9d69749b067f`.

Evidence candidate:

- `docs/search/MNT_M3_01_MARKET_SEARCH_DEMAND_RESEARCH_2026-09-13.md`;
- `docs/search/data/MNT_M3_01_GSC_DEMAND_SNAPSHOT_2026-09-13.csv`;
- `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`.

Observed first-party GSC range `2026-08-23..2026-09-13`:

```text
clicks = 0
impressions = 26
weighted average position ≈ 27.52
```

The current GSC sample is sparse and mostly brand/entity-shaped. It is insufficient for trend or causality claims.

Selected Google Keyword Planner estimates, Brazil/Portuguese/Google Search:

```text
tegra = 4,400 avg monthly searches
tegra incorporadora = 3,600
apartamentos são paulo = 12,100
apartamentos a venda são paulo = 8,100
apartamentos para comprar são paulo = 1,900
apartamentos na planta em são paulo = 590
```

Project-name demand was also material for multiple current catalogue names, including DSG Itaim, Ária Higienópolis, TEG Sacomã, Ledge Brooklin, Soma Perdizes, Zahle Jardins, Bueno Brandão 257, YPY Alto do Ipiranga, Bem Moema and others. These values are query-demand estimates and do not themselves prove entity intent, SEO ranking difficulty or page ownership.

Candidate findings:

- São Paulo new-residential market is active at material scale by official Secovi-SP evidence;
- MoreNumTegra organic visibility remains early relative to external Tegra/category demand;
- brand/entity, project-name and catalogue-aligned location families are direct-fit research clusters;
- generic São Paulo apartment-purchase terms are materially larger but need SERP/intent validation before ownership decisions;
- stage/state demand exists and maps to current UI taxonomy;
- rental, houses and generic brokerage terms returned by Planner are out-of-scope noise.

Limitations:

- GSC remains sparse;
- Planner scope is Brazil/Portuguese, not São Paulo city-only;
- Planner competition is paid-search competition, not organic SEO difficulty;
- some project names require SERP/entity disambiguation;
- Semrush metrics were unavailable because the connected API reported insufficient unit balance;
- no page owner, canonical query, final intent or content action is defined by M3-01.

## 10. SFJM Workspace boundary

Consumer precedence:

1. `docs/sfjm/PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `docs/NEXT_SAFE_ACTION.md` — execution authority.

Consumers devem resolver o live `main` antes de refresh.

## 11. Próxima ação

A próxima ação segura é a decisão explícita da Product Authority sobre aceitar o candidate `MNT-M3-01` e autorizar o lifecycle Ready + merge da PR correspondente.

`MNT-M3-02 — Extract and classify Search Console queries` permanece planejada e não autorizada.

MNT-M3-01 é research/evidence-only e não implica automaticamente Search Console mutation, Ads/spend, GTM/GA4 changes, Green changes, DNS changes, content implementation ou Vercel deployment.

## 12. External gates preservados

Meta Dataset/Pixel/CAPI, Google Ads/spend, DNS, Search Console mutation, mudanças futuras na política Vercel fora do ADR-004, Green structural changes, FECH.AI/n8n/Make e qualquer reabertura material de Measurement permanecem separadamente gated.
