# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa atual: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M1 — RESF Adoption & Existing-State Reconciliation / ACTIVE`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado operacional preservado

MoreNumTegra V1 permanece operacional em produção comercial Green.

Composição Green preservada:

```text
HTML 01
-> Form 46 nativo
-> HTML 02
-> Footer
+ CSS global
+ JavaScript global
```

Estado aceito preservado:

- catálogo e jornadas principais funcionais conforme documentação vigente;
- Form 46 nativo como captação V1;
- Vercel como homologação pública e Green como produção comercial;
- Search/indexability P0-B = `PASS_WITH_RESIDUAL_RISK`;
- home indexada segundo evidência registrada;
- Measurement MoreNumTegra ainda não configurado/provado;
- LGPD modal ativo, enforcement técnico não provado.

## 2. Novo programa canônico para visibilidade completa

O projeto passa a publicar explicitamente sua estrutura completa para consumo read-only pelo SFJM Workspace.

Human WBS:
`docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

Machine-readable task graph:
`docs/sfjm/PROGRAM_TASK_GRAPH.json`

Consumption/presentation contract:
`docs/sfjm/PROGRAM_TASK_GRAPH.md`

Programa:

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             ACTIVE
MNT-M2  Measurement Foundation & Consent                          PLANNED
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Planning baseline:

```text
forecast total = 1240h
accepted scope-equivalent = 160h
remaining forecast = 1080h
pre-reconciliation program progress = 12.90%
```

These are planning/scope-equivalent estimates, not actual timesheets.

## 3. RESF v1 adoption

Manifest:
`docs/frameworks/resf/ADOPTION.yaml`

Reconciliation baseline:
`docs/frameworks/resf/ADOPTION_BASELINE.md`

Provider pin:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`

Mode:
`SELECTIVE`

Wave 1 modules:

- RESF-INTELLIGENCE
- RESF-PRODUCT-TRUTH
- RESF-IA
- RESF-UX
- RESF-CONVERSION
- RESF-TRACKING
- RESF-LEAD
- RESF-CRM
- RESF-CONSENT

Deferred modules remain available for later explicit adoption; they are not rejected.

## 4. GSC T0 — 2026-09-10

Evidence:
`docs/evidence/search/GSC_BASELINE_2026-09-10.md`

Observed screenshot totals:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Classification:
`EARLY_DISCOVERY / INSUFFICIENT_VOLUME_FOR_TREND_OR_CAUSALITY_CLAIMS`.

## 5. Current bounded work

Current work is only:

`MNT-M1 — RESF Adoption & Existing-State Reconciliation`.

This work publishes/reconciles documentation and consumer contracts only.

No runtime mutation is implied.

Authoritative next safe action:
`docs/NEXT_SAFE_ACTION.md`.

## 6. Future sequence

After MNT-M1 closes canonically:

```text
MNT-M2 Measurement Foundation & Consent
-> MNT-M3 Intelligence / Product Truth / Search Contract
-> MNT-M4 IA / Content / Schema / GEO-AEO / Linking
-> MNT-M5 UX / Performance / Conversion / Lead / CRM
-> MNT-M6 Attribution / Paid Media Readiness
-> MNT-M7 QA / Release / Observability / Learning Loop
```

Future existence in WBS does not constitute implementation, publication, spend or mutation authorization.

## 7. SFJM Workspace consumption boundary

MoreNumTegra publishes project truth; SFJM Workspace consumes and renders it.

Workspace may display:

- objective;
- full WBS;
- phases/tasks/subtasks;
- hours/effort class;
- completion/remaining/percentage;
- current work;
- next safe action;
- issues/risks;
- evidence/provenance;
- observed SHA/time.

Workspace may not invent tasks, hours, states, authorization or project truth.

Any Workspace MoreNumTegra snapshot whose observed SHA differs from current `main` must be labeled stale until refreshed.

## 8. External mutation gates preserved

Separate Product Authority authorization remains required for:

- GTM/GA4/Meta/CAPI;
- Green Pixel configuration;
- consent runtime behavior;
- Google Ads/campaign/spend;
- DNS;
- Search Console mutation;
- Vercel Production mutation;
- Green publication;
- FECH.AI/n8n/Make integration;
- any secret-bearing architecture.
