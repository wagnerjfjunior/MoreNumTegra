# MNT-RESF — MoreNumTegra Search-to-Lead 2026 — WBS

Status: `CANONICAL_MAIN` when this revision is merged  
Project authority: MoreNumTegra / Product Authority  
Canonical repository: `wagnerjfjunior/MoreNumTegra`  
Program ID: `MNT-RESF`  
Framework: `RESF v1 — Search-to-Lead`  
Framework provider pinned: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`  
Planning baseline date: `2026-09-10`  
Current lifecycle authority: `docs/sfjm/CURRENT_PROGRAM_STATE.json`

## 1. Purpose

This WBS publishes the complete MoreNumTegra Search-to-Lead program so SFJM Workspace and other read-only consumers can render the whole project without inventing phases, tasks, hierarchy, hours, state or provenance.

MoreNumTegra `main` remains authoritative. SFJM Workspace is a derived read-only representation.

## 2. Effort semantics

The program forecast is a planning model, not a timesheet.

- future work uses `CONSUMER_PLANNING_ESTIMATE_V1`;
- completed M0 uses `RETROSPECTIVE_SCOPE_EQUIVALENT_ESTIMATE`;
- completed M1 uses its accepted planning estimate as scope-equivalent;
- accepted M2 tasks use their project-published planning hours as scope-equivalent;
- parent hours equal the sum of immediate child task hours;
- parent/child hours must never be double-counted;
- partial/planned implementation contributes no accepted task hours until accepted complete;
- `CURRENT_PROGRAM_STATE.json` owns current lifecycle/progress;
- `PROGRAM_TASK_GRAPH.json` owns hierarchy/planning hours.

Historical planning-state snapshot retained from the 2026-09-10 planning baseline. **Do not use the State/Accepted columns below as current lifecycle truth; `docs/sfjm/CURRENT_PROGRAM_STATE.json` owns current lifecycle/progress.**

| Phase | Name | State | Hours | Accepted |
|---|---|---|---:|---:|
| MNT-M0 | V1 Foundation & Commercial Production | COMPLETE | 160 | 160 |
| MNT-M1 | RESF Adoption & Existing-State Reconciliation | COMPLETE | 96 | 96 |
| MNT-M2 | Measurement Foundation & Consent | ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION | 144 | 120 |
| MNT-M3 | Intelligence, Product Truth & Search Contract | PLANNED | 144 | 0 |
| MNT-M4 | IA, Content, Schema, GEO/AEO & Linking | PLANNED | 208 | 0 |
| MNT-M5 | UX, Performance, Conversion, Lead & CRM | PLANNED | 168 | 0 |
| MNT-M6 | Attribution & Paid Media Readiness | PLANNED | 128 | 0 |
| MNT-M7 | QA, Release, Observability & Learning Loop | PLANNED | 192 | 0 |
| **TOTAL** |  |  | **1240** | **376** |

At that historical planning-state snapshot: accepted/completed scope-equivalent effort `376h`, remaining forecast `864h`, program progress `30.32%`. Current values are resolved only from `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Program progress is not V1 product readiness. Commercial V1 remains operational.

## 3. WBS

### MNT-M0 — V1 Foundation & Commercial Production — 160h — COMPLETE

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M0-01 | Governance, canonical GitHub flow and baselines | 16 | COMPLETE |
| MNT-M0-02 | Portable HTML/CSS/JS architecture for Vercel/Green | 16 | COMPLETE |
| MNT-M0-03 | Catalogue, data model, filters and stage visibility | 24 | COMPLETE |
| MNT-M0-04 | Mobile UX, floating CTAs and WhatsApp | 16 | COMPLETE |
| MNT-M0-05 | Green native Form 46 and lead journey | 24 | COMPLETE |
| MNT-M0-06 | Vercel Preview and stable homologation flow | 16 | COMPLETE |
| MNT-M0-07 | Search + Conversion package and indexability work | 24 | COMPLETE |
| MNT-M0-08 | Controlled Green release and production smoke | 16 | COMPLETE |
| MNT-M0-09 | Initial Search Console/indexation evidence | 8 | COMPLETE |

### MNT-M1 — RESF Adoption & Existing-State Reconciliation — 96h — COMPLETE

Closure anchor: PR `#39`, merge `dba0de3bfefc7aec90c5a88588c54eae4317c61f`.

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M1-01 | Resolve and pin RESF v1 immutable provider revision | 8 | COMPLETE |
| MNT-M1-02 | Create RESF consumer adoption manifest | 8 | COMPLETE |
| MNT-M1-03 | Classify adopted, deferred and rejected RESF modules | 8 | COMPLETE |
| MNT-M1-04 | Reconcile existing MoreNumTegra implementation/evidence against RESF contracts | 24 | COMPLETE |
| MNT-M1-05 | Register GSC T0 baseline observed 2026-09-10 | 8 | COMPLETE |
| MNT-M1-06 | Register gaps, overrides and residual risks | 8 | COMPLETE |
| MNT-M1-07 | Publish consumer-readable WBS/task graph and continuity entrypoints | 16 | COMPLETE |
| MNT-M1-08 | Schema/consistency review, documentation audit and PR lifecycle | 16 | COMPLETE |

### MNT-M2 — Measurement Foundation & Consent — 144h — COMPLETE

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M2-01 | Inventory tracking already present in live runtime | 8 | COMPLETE |
| MNT-M2-02 | Define transport architecture and duplicate-event prevention | 16 | COMPLETE |
| MNT-M2-03 | Define canonical event taxonomy | 16 | COMPLETE |
| MNT-M2-04 | Define primary and secondary conversions | 8 | COMPLETE |
| MNT-M2-05 | Define ownership for MoreNumTegra GTM and GA4 | 8 | COMPLETE |
| MNT-M2-06 | Define ownership for Meta Pixel/Dataset | 8 | COMPLETE |
| MNT-M2-07 | Define consent model and LGPD gating | 16 | COMPLETE |
| MNT-M2-08 | Define denied/granted consent QA contract | 16 | COMPLETE |
| MNT-M2-09 | Implement authorized tracking configuration | 24 | COMPLETE |
| MNT-M2-10 | Execute end-to-end Measurement QA | 24 | COMPLETE / ACCEPTED_WITH_V1_RESIDUAL |

Accepted M2 scope-equivalent: `144h / 144h`. M2-10 was accepted through PR #54 on 2026-09-13; this 2026-09-22 reconciliation does not add those hours again.

M2-09 closure anchors:

```text
implementation PR #50 merge = 6eaacaca9af2c22243d45f20a24e04577ac58ce2
runtime fix PR #52 merge = 70f2b77e93225b65a1972c12875c58bd7198be1d
runtime evidence = docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md
```

Evidence chain:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md` — T0 pre-GTM inventory;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md` — GTM/Consent historical T1 baseline;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md` — accepted transport/dedup design;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md` — canonical source-event vocabulary and semantics;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md` — project conversion-role classification;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md` — Google Measurement ownership/topology design;
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md` — Meta Measurement ownership/topology design;
- `docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md` — accepted Green/GTM/GA4 runtime implementation.

Current Google Measurement runtime:

```text
GTM container = GTM-PGCR4R47
GTM current accepted publication = Version 7
GA4 property = MoreNumTegra
GA4 property_id = 553742649
GA4 stream_id = 15759638334
GA4 measurement_id = G-57M2XR0CY2
source primary = mnt_lead_success
GA4 mapping = generate_lead
GA4 generate_lead = Key event / Evento principal
```

Current Meta Measurement boundary:

```text
Meta Measurement governance owner = MoreNumTegra / Product Authority
Meta Dataset target = one dedicated MoreNumTegra Dataset
Meta browser source target = one project browser source relationship if implemented
Browser dispatcher = GTM-PGCR4R47
Meta Dataset/Pixel IDs and relationship = NOT_PROVEN
Meta runtime = NOT_IMPLEMENTED_BY_M2_09
CAPI = NOT_IMPLEMENTED / NOT_AUTHORIZED
```

Conversion contract v1 remains:

```text
PRIMARY
  mnt_lead_success

SECONDARY
  mnt_intent:request_conditions
  mnt_intent:request_project_conditions
  mnt_intent:negotiate_scenario
  mnt_intent:schedule_visit
  mnt_intent:whatsapp_contact

NONE
  mnt_page_view
  mnt_section_click
  mnt_catalog_filter
  mnt_catalog_search
  mnt_intent:project_interest
  mnt_form_start
  mnt_form_submit_attempt
```

M2-09 implementation proof does not replace M2-10 end-to-end QA.

Preserve:

```text
MNT-M2-09 COMPLETE != MNT-M2-10 VALIDATED
PROJECT PRIMARY != GOOGLE ADS OPTIMIZATION ACTION
GREEN gtm.formSubmit != MORENUMTEGRA BUSINESS EVENT
FORM START/SUBMIT ATTEMPT != LEAD
PROPERTY PRICE != LEAD VALUE
META NOT_PROVEN != META DOES_NOT_EXIST
```

### MNT-M3 — Intelligence, Product Truth & Search Contract — 144h — PLANNED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M3-01 | Market and Search demand research | 24 | PLANNED |
| MNT-M3-02 | Extract and classify Search Console queries | 16 | PLANNED |
| MNT-M3-03 | SERP, competitor and search-intent analysis | 16 | PLANNED |
| MNT-M3-04 | Governed Product Fact & Claim Registry | 24 | PLANNED |
| MNT-M3-05 | Search Intent / Query Ownership Contract | 24 | PLANNED |
| MNT-M3-06 | Query-family to page-owner map | 24 | PLANNED |
| MNT-M3-07 | KPI baseline and success criteria | 16 | PLANNED |

### MNT-M4 — IA, Content, Schema, GEO/AEO & Linking — 208h — PLANNED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M4-01 | Information Architecture | 24 | PLANNED |
| MNT-M4-02 | Page contracts and page types | 24 | PLANNED |
| MNT-M4-03 | Decision-useful content architecture | 24 | PLANNED |
| MNT-M4-04 | Entity graph and schema contract | 24 | PLANNED |
| MNT-M4-05 | Factual JSON-LD expansion | 16 | PLANNED_NOT_AUTHORIZED |
| MNT-M4-06 | GEO/AEO / answerability / AI discoverability readiness | 24 | PLANNED |
| MNT-M4-07 | Semantic internal-linking contract | 16 | PLANNED |
| MNT-M4-08 | Implement prioritized content/architecture | 32 | PLANNED_NOT_AUTHORIZED |
| MNT-M4-09 | Resolve technical SEO residuals: sitemap/www/canonical where capability permits | 24 | PLANNED_NOT_AUTHORIZED |

### MNT-M5 — UX, Performance, Conversion, Lead & CRM — 168h — COMPLETE

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M5-01 | Mobile UX and accessibility audit | 16 | COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS |
| MNT-M5-02 | Core Web Vitals/performance baseline | 16 | COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED |
| MNT-M5-03 | Media/image/video performance strategy | 16 | COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION |
| MNT-M5-04 | Regression of filters, touch and mobile controls | 16 | COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED |
| MNT-M5-05 | Conversion architecture | 16 | COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M5-06 | CTA/form journey optimization design | 16 | COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED |
| MNT-M5-07 | Lead semantics and lead-validity contract | 16 | COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE |
| MNT-M5-08 | Green/Form 46 CRM handoff contract | 16 | COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M5-09 | Form/CTA conversion QA | 16 | COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION |
| MNT-M5-10 | Authorized performance remediation | 24 | COMPLETE / ACCEPTED / CANDIDATE1_RETAINED / TARGET_PASS / PERFORMANCE_DIRECTION_INCONCLUSIVE |

Performance targets retained: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.

### MNT-M6 — Attribution & Paid Media Readiness — 128h — ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M6-01 | Attribution model and identifier boundaries | 16 | COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M6-02 | UTM/source/medium/campaign contract | 8 | COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M6-03 | Google Ads conversion architecture | 16 | COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION |
| MNT-M6-04 | SEM campaign/query contract | 24 | COMPLETE / DESIGN_CANONICALIZED / INTERNAL_REGISTRY_ONLY / NO_EXTERNAL_MUTATION |
| MNT-M6-05 | Landing-page/query mapping | 16 | PLANNED / NEXT / AUTHORIZATION_REQUIRED |
| MNT-M6-06 | Budget/spend authorization gate | 8 | PLANNED_NOT_AUTHORIZED |
| MNT-M6-07 | Authorized external platform implementation | 24 | PLANNED_NOT_AUTHORIZED |
| MNT-M6-08 | Paid conversion QA | 16 | PLANNED |

Accepted M6 scope-equivalent: `64h` from M6-01 through M6-04. M6-05 remains separately gated.

### MNT-M7 — QA, Release, Observability & Learning Loop — 192h — PLANNED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M7-01 | Preview validation | 16 | PLANNED |
| MNT-M7-02 | Technical/content QA | 16 | PLANNED |
| MNT-M7-03 | Independent mobile QA | 16 | PLANNED |
| MNT-M7-04 | Tracking + lead end-to-end QA | 16 | PLANNED |
| MNT-M7-05 | Regression suite | 16 | PLANNED |
| MNT-M7-06 | P0/P1 release adjudication | 8 | PLANNED |
| MNT-M7-07 | Vercel Production homologation | 8 | PLANNED_NOT_AUTHORIZED |
| MNT-M7-08 | Controlled Green publication | 8 | PLANNED_NOT_AUTHORIZED |
| MNT-M7-09 | Production smoke | 8 | PLANNED |
| MNT-M7-10 | Post-release measurement | 24 | PLANNED |
| MNT-M7-11 | GSC/GA4/Ads observation window | 24 | PLANNED |
| MNT-M7-12 | Result registration with provenance | 16 | PLANNED |
| MNT-M7-13 | RESF provider evidence intake / learning loop | 16 | PLANNED_NOT_AUTHORIZED |

## 4. Current journey position

Current lifecycle authority is `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

```text
MNT-M5 COMPLETE
  M5-01 COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
  M5-02 COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
  M5-03 COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
  M5-04 COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
  M5-05 COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
  M5-06 COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
  M5-07 COMPLETE / PRODUCTION_GA4_PASS / GTM_VERSION_12_LIVE
  M5-08 COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION
  M5-09 COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
  M5-10 COMPLETE / ACCEPTED / CANDIDATE1_RETAINED / TARGET_PASS / PERFORMANCE_DIRECTION_INCONCLUSIVE
```

M5 is complete at 168h. M6-01 through M6-04 are complete as design-only paid-media architecture. M6-04 creates four internal Search campaign registry records, Exact+Phrase initial match policy, factual/query-intent governance, Search Terms/negative governance and 30 planned keyword seeds grounded in canonical content plus limited live Search Console evidence. External Google Ads campaigns remain zero. The next gate is MNT-M6-05.

Consumers must use `CURRENT_PROGRAM_STATE.json` for current lifecycle/progress and this WBS for structure/planning hours.

## 5. SFJM Workspace presentation contract

The consumer should render:

- program/phase rows at top level;
- immediate child tasks when expanded;
- recursive child decomposition only when present;
- hours/progress without parent-child double counting;
- exact effort provenance;
- current/next state separately from full tree;
- planned/not-authorized distinctly from COMPLETE;
- canonical repository, observed SHA and observation timestamp.

Workspace must not create, rename, flatten or infer missing project tasks.

## 6. Current-state precedence

For current lifecycle/progress use `docs/sfjm/CURRENT_PROGRAM_STATE.json`. Structural task graph remains authoritative for hierarchy/task IDs/planning hours.

Preserve:

`DOCUMENTED != IMPLEMENTED != DEPLOYED != VALIDATED != FULL_PHASE_COMPLETE`.
