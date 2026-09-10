# MoreNumTegra — RESF v1 Adoption Baseline

Status: `ADOPTED_CANONICAL_MAIN` after PR #39 merge  
Adoption manifest: `docs/frameworks/resf/ADOPTION.yaml`  
Provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`  
Adoption merge anchor: `dba0de3bfefc7aec90c5a88588c54eae4317c61f`  
Baseline date: `2026-09-10`

## 1. Purpose

Reconcile the already-operational MoreNumTegra V1 against the selectively adopted RESF v1 modules without rebuilding functioning product behavior or upgrading unproven evidence.

The framework does not replace MoreNumTegra product authority, business facts, runtime authority, release gates or Green/Vercel topology.

Preserve:

```text
DOCUMENTED != IMPLEMENTED
IMPLEMENTED != DEPLOYED
DEPLOYED != VALIDATED
VALIDATED_AT_TIME_T != CURRENTLY_VALID
RESF_ADOPTED != RESF_MODULE_IMPLEMENTED
RESF_RECONCILED != RUNTIME_MUTATION_AUTHORIZED
```

## 2. Consumer state at adoption

Confirmed project state:

- commercial V1 operational in Green Sales at `https://moretegra.com.br/`;
- GitHub `main` is canonical project source;
- Vercel Production is public homologation, not commercial production;
- native Green Form 46 remains V1 lead-capture path;
- catalogue, filters, CTAs, WhatsApp and mobile core journeys are documented as functioning in the accepted V1 release;
- Search/indexability P0-B = `PASS_WITH_RESIDUAL_RISK`;
- home indexed according to project-recorded Search Console evidence;
- Measurement for MoreNumTegra not configured/proven;
- LGPD modal presence observed but consent enforcement not proven;
- GTM, GA4, Meta, Google Ads, DNS and other external mutations remain separately gated.

## 3. Selective adoption — Wave 1

| Module | Initial consumer classification |
|---|---|
| RESF-INTELLIGENCE | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-PRODUCT-TRUTH | ADOPTED / PREEXISTING_CONTROLS |
| RESF-IA | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-UX | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-CONVERSION | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-TRACKING | ADOPTED / DESIGN_REQUIRED |
| RESF-LEAD | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CRM | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CONSENT | ADOPTED / ENFORCEMENT_NOT_PROVEN |

Deferred, not rejected:

`RESF-SEARCH-CONTRACT`, `RESF-SEO`, `RESF-CONTENT`, `RESF-SCHEMA`, `RESF-GEO-AEO`, `RESF-LINKING`, `RESF-PERFORMANCE`, `RESF-ATTRIBUTION`, `RESF-PAID`, `RESF-QA`, `RESF-OBSERVABILITY`.

## 4. Existing-state reconciliation map

| Area | Existing consumer evidence/state | RESF interpretation at T0 | Next obligation |
|---|---|---|---|
| Product facts | Canonical baselines and governed Tegra materials | PREEXISTING_CONTROLS | explicit fact/claim registry in MNT-M3 |
| Mobile UX | Mobile-first baseline, filters/CTAs documented functional | PREEXISTING_IMPLEMENTATION | revalidate under MNT-M5/MNT-M7 |
| Conversion | WhatsApp, Receber condições and Form 46 journeys | PREEXISTING_IMPLEMENTATION | formalize conversion semantics/event mapping |
| Lead capture | Green native Form 46 operational | PREEXISTING_RUNTIME | define valid-lead semantics/E2E proof |
| CRM handoff | Green V1 destination | PREEXISTING_RUNTIME | formalize handoff/success contract |
| Search/indexability | P0-B PASS_WITH_RESIDUAL_RISK | PARTIALLY_VALIDATED_PREEXISTING | later SEO/Search reconciliation |
| Tracking | MoreNumTegra measurement not configured/proven | DESIGN_REQUIRED | MNT-M2 after authorization |
| Consent | Green modal observed | DEPLOYED_UI / ENFORCEMENT_NOT_PROVEN | denied/granted proof obligations |
| Attribution | No accepted closed-loop model | DEFERRED | MNT-M6 after prerequisites |
| Paid media | No current execution authority | DEFERRED / NOT_AUTHORIZED | MNT-M6 after measurement/spend gates |
| Observability | GSC evidence available, low volume | EVIDENCE_AVAILABLE / MODULE_DEFERRED | preserve T0; adopt later |

## 5. Search Console T0

Canonical textual evidence:
`docs/evidence/search/GSC_BASELINE_2026-09-10.md`.

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Query rows are partial. Volume is insufficient for trend, causality or improvement claims.

## 6. Program relationship

- human WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- structural task graph: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model: `docs/sfjm/PROJECT_READ_MODEL.json`.

MNT-M1 adoption/reconciliation is `COMPLETE` after PR #39. Current program progress is `256h / 1240h = 20.65%` scope-equivalent. MNT-M2 is next but remains `PLANNED_NOT_AUTHORIZED`.

## 7. Known gaps and residuals

1. No MoreNumTegra-specific measurement stack is accepted as configured.
2. Consent enforcement remains unproven.
3. Search technical residuals remain: canonical client-side, sitemap absent, `www` 301/308 not proven.
4. GSC T0 volume remains too low for trend inference.
5. Historical M0 hours are retrospective scope-equivalent estimates, not actual time records.
6. Future effort is forecast and must be rebaselined when stronger task-level evidence exists.
7. Deferred RESF modules do not govern implementation until explicitly adopted.

## 8. Authorization boundary

RESF adoption completion does not authorize MNT-M2 start or runtime mutation. MNT-M2 bounded READ_ONLY/DESIGN requires explicit Product Authority authorization. Tracking publication, Vercel/Green publication, DNS, Search Console mutation, Ads, budget/spend and external campaigns remain separately gated.
