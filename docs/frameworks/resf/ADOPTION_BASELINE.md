# MoreNumTegra — RESF v1 Adoption Baseline

Status: `CANDIDATE_IN_PR` until merged into `main`  
Adoption manifest: `docs/frameworks/resf/ADOPTION.yaml`  
Provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`  
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

## 2. Current consumer state at adoption start

Confirmed from current project documentation before this candidate change:

- commercial V1 is operational in Green Sales at `https://moretegra.com.br/`;
- GitHub `main` is the canonical project source;
- Vercel Production is stable public homologation, not commercial production;
- native Green Form 46 remains the V1 lead-capture path;
- catalogue, filters, CTAs, WhatsApp and mobile core journeys are documented as functioning in the accepted V1 release;
- Search/indexability P0-B is `PASS_WITH_RESIDUAL_RISK`;
- the home is indexed according to project-recorded Search Console evidence;
- Measurement for MoreNumTegra is not configured/proven;
- LGPD modal presence is observed but consent enforcement is not proven;
- GTM, GA4, Meta, Google Ads, DNS changes and other external mutations remain separately gated.

## 3. Selective adoption — Wave 1

Adopted modules:

| Module | Adoption reason | Initial consumer classification |
|---|---|---|
| RESF-INTELLIGENCE | Search/demand evidence is required for later architecture and query ownership | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-PRODUCT-TRUTH | Commercial facts must remain governed and non-invented | ADOPTED / PREEXISTING_CONTROLS |
| RESF-IA | Current home/catalog needs explicit future intent/page ownership | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-UX | Mobile-first behavior is already a project requirement | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-CONVERSION | CTA/Form 46 journey already exists | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-TRACKING | Current next cycle is Measurement Foundation | ADOPTED / DESIGN_REQUIRED |
| RESF-LEAD | Lead semantics must align tracking and Form 46 | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CRM | Green is V1 lead/CRM destination | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CONSENT | Measurement cannot advance safely without consent proof | ADOPTED / ENFORCEMENT_NOT_PROVEN |

Deferred modules are not rejected. They remain outside active RESF governance until later explicit adoption/reconciliation:

`RESF-SEARCH-CONTRACT`, `RESF-SEO`, `RESF-CONTENT`, `RESF-SCHEMA`, `RESF-GEO-AEO`, `RESF-LINKING`, `RESF-PERFORMANCE`, `RESF-ATTRIBUTION`, `RESF-PAID`, `RESF-QA`, `RESF-OBSERVABILITY`.

## 4. Existing-state reconciliation map

| Area | Existing consumer evidence/state | RESF interpretation at T0 | Next obligation |
|---|---|---|---|
| Product facts | Canonical baselines and governed Tegra materials; no invented facts allowed | PREEXISTING_CONTROLS | Build explicit fact/claim registry in MNT-M3 |
| Mobile UX | Mobile-first baseline, filters/CTAs documented functional | PREEXISTING_IMPLEMENTATION | Revalidate independently under MNT-M5/MNT-M7 |
| Conversion | WhatsApp, Receber condições and Form 46 journeys exist | PREEXISTING_IMPLEMENTATION | Formalize conversion semantics and event mapping |
| Lead capture | Green native Form 46 operational | PREEXISTING_RUNTIME | Define business-valid lead semantics and E2E proof |
| CRM handoff | Green is V1 capture/CRM destination | PREEXISTING_RUNTIME | Formalize handoff/success contract; do not intercept submit |
| Search/indexability | P0-B `PASS_WITH_RESIDUAL_RISK`; indexed home recorded | PARTIALLY_VALIDATED_PREEXISTING | Reconcile later deferred SEO/Search modules |
| Tracking | MoreNumTegra-specific measurement not configured/proven | DESIGN_REQUIRED | MNT-M2 Measurement Foundation |
| Consent | Green modal observed | DEPLOYED_UI / ENFORCEMENT_NOT_PROVEN | Define denied/granted proof obligations |
| Attribution | No accepted closed-loop model | DEFERRED | MNT-M6 after tracking/CRM prerequisites |
| Paid media | Not current execution authority | DEFERRED / NOT_AUTHORIZED | MNT-M6 after measurement validation and spend gate |
| Observability | GSC evidence available but low volume | EVIDENCE_AVAILABLE / FORMAL_MODULE_DEFERRED | Register T0 now; adopt observability later |

## 5. Search Console T0

Canonical textual evidence for the user-supplied Search Console observation is stored at:

`docs/evidence/search/GSC_BASELINE_2026-09-10.md`

T0 summary:

- total clicks: `0`;
- total impressions: `17`;
- average CTR: `0%`;
- average position: `26.1`;
- query-level visible rows are partial and must not be treated as exhaustive;
- volume is insufficient for trend, causality or performance-improvement claims.

## 6. Program/WBS relationship

The whole consumer program is published at:

- human WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- machine-readable task graph: `docs/sfjm/PROGRAM_TASK_GRAPH.json`.

The graph is authoritative for the planned MNT-RESF hierarchy when present in canonical `main`. The SFJM Workspace may consume and render it but may not invent missing tasks, hours, state, authorization or provenance.

## 7. Known gaps and residuals

1. No MoreNumTegra-specific measurement stack is accepted as configured.
2. Consent enforcement remains unproven.
3. Search technical residuals remain: canonical is client-side, sitemap absent, and `www` HTTP 301/308 behavior is not proven.
4. GSC T0 volume is very low and unsuitable for trend inference.
5. Historical M0 hours are retrospective scope-equivalent estimates, not actual time records.
6. Future effort is forecast and must be rebaselined when canonical task-level evidence becomes available.
7. Deferred RESF modules do not govern implementation until explicitly adopted.

## 8. Current bounded action

Current work is MNT-M1 only:

`RESF Adoption & Existing-State Reconciliation`.

This adoption package does not authorize runtime code changes, tracking publication, Vercel/Green publication, DNS, Search Console mutation, Ads creation, budget/spend, external campaigns or changes to the RESF provider.
