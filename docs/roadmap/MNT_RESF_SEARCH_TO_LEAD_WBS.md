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

## 2.1 Dashboard current-state summary

**This is the only phase-summary table that dashboard consumers should render as current lifecycle truth.**

Current lifecycle/progress is reconciled from `CURRENT_PROGRAM_STATE.json` and `PROGRAM_TASK_GRAPH.json`.

| Phase | Name | Current state | Hours | Accepted | Deferred |
|---|---|---|---:|---:|---:|
| MNT-M0 | V1 Foundation & Commercial Production | COMPLETE | 160 | 160 | 0 |
| MNT-M1 | RESF Adoption & Existing-State Reconciliation | COMPLETE / ACCEPTED | 96 | 96 | 0 |
| MNT-M2 | Measurement Foundation & Consent | COMPLETE / ACCEPTED | 144 | 144 | 0 |
| MNT-M3 | Intelligence, Product Truth & Search Contract | COMPLETE / ACCEPTED | 144 | 144 | 0 |
| MNT-M4 | IA, Content, Schema, GEO/AEO & Linking | COMPLETE / ACCEPTED | 208 | 208 | 0 |
| MNT-M5 | UX, Performance, Conversion, Lead & CRM | COMPLETE / ACCEPTED | 168 | 168 | 0 |
| MNT-M6 | Attribution & Paid Media Readiness | DEFERRED / PAID_MEDIA_FROZEN / 40H_UNACCEPTED | 128 | 88 | 40 |
| MNT-M7 | QA, Release, Observability & Learning Loop | COMPLETE / ACCEPTED | 192 | 192 | 0 |
| **TOTAL** |  | **CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE** | **1240** | **1200** | **40** |

```text
ACCEPTED_PERCENT = 96.77%
DEFERRED_PERCENT = 3.23%
DEFERRED_SCOPE = MNT-M6-07 24h + MNT-M6-08 16h
```

The historical 2026-09-10 planning snapshot has been moved to:

`docs/roadmap/archive/MNT_RESF_PLANNING_BASELINE_2026-09-10.md`

**ARCHIVE_ONLY != CURRENT_DASHBOARD_STATE**

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

### MNT-M3 — Intelligence, Product Truth & Search Contract — 144h — COMPLETE / ACCEPTED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M3-01 | Market and Search demand research | 24 | COMPLETE / ACCEPTED |
| MNT-M3-02 | Extract and classify Search Console queries | 16 | COMPLETE / ACCEPTED |
| MNT-M3-03 | SERP, competitor and search-intent analysis | 16 | COMPLETE / ACCEPTED |
| MNT-M3-04 | Governed Product Fact & Claim Registry | 24 | COMPLETE / ACCEPTED |
| MNT-M3-05 | Search Intent / Query Ownership Contract | 24 | COMPLETE / ACCEPTED |
| MNT-M3-06 | Query-family to page-owner map | 24 | COMPLETE / ACCEPTED |
| MNT-M3-07 | KPI baseline and success criteria | 16 | COMPLETE / ACCEPTED |

### MNT-M4 — IA, Content, Schema, GEO/AEO & Linking — 208h — COMPLETE / ACCEPTED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M4-01 | Information Architecture | 24 | COMPLETE / ACCEPTED |
| MNT-M4-02 | Page contracts and page types | 24 | COMPLETE / ACCEPTED |
| MNT-M4-03 | Decision-useful content architecture | 24 | COMPLETE / ACCEPTED |
| MNT-M4-04 | Entity graph and schema contract | 24 | COMPLETE / ACCEPTED |
| MNT-M4-05 | Factual JSON-LD expansion | 16 | COMPLETE / ACCEPTED / CORRECTIVE_GATE_M4_05R |
| MNT-M4-06 | GEO/AEO / answerability / AI discoverability readiness | 24 | COMPLETE / ACCEPTED |
| MNT-M4-07 | Semantic internal-linking contract | 16 | COMPLETE / ACCEPTED |
| MNT-M4-08 | Implement prioritized content/architecture | 32 | COMPLETE / ACCEPTED |
| MNT-M4-09 | Resolve technical SEO residuals: sitemap/www/canonical where capability permits | 24 | COMPLETE / ACCEPTED |

### M3/M4 lifecycle reconciliation

The individual M3/M4 evidence files preserve their point-in-time candidate/authorized wording. Current lifecycle is later and is governed by the merged execution chain plus aggregate acceptance.

Evidence anchors:

- M3 execution PRs #56–#62 merged through `09405ae2c002b7e3b3298ca3a4fb434338b0ad3e`;
- M4 execution PRs #65–#82 merged through `a5c3766d93aa4b8ae76acfd6d544f03b204b9b20`;
- M4-05 corrective acceptance: `docs/sfjm/MNT_M4_05R_ACCEPTANCE_CLOSURE_2026-09-19.md`;
- M5 final closure records aggregate accepted scope `920h`, which mathematically includes M0+M1+M2+M3+M4+M5 and therefore confirms M1/M3/M4 accepted scope in the integrated program state.

Historical candidate labels inside task-specific evidence are not current dashboard lifecycle state.

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

### MNT-M6 — Attribution & Paid Media Readiness — 128h — DEFERRED / PAID_MEDIA_FROZEN / 40H_UNACCEPTED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M6-01 | Attribution model and identifier boundaries | 16 | COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M6-02 | UTM/source/medium/campaign contract | 8 | COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION |
| MNT-M6-03 | Google Ads conversion architecture | 16 | COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION |
| MNT-M6-04 | SEM campaign/query contract | 24 | COMPLETE / DESIGN_CANONICALIZED / INTERNAL_REGISTRY_ONLY / NO_EXTERNAL_MUTATION |
| MNT-M6-05 | Landing-page/query mapping | 16 | COMPLETE / LANDING_QUERY_MAP_ACCEPTED / RUNTIME_REGRESSION_FIXED |
| MNT-M6-06 | Budget/spend authorization gate | 8 | COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN |
| MNT-M6-07 | Authorized external platform implementation | 24 | DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED |
| MNT-M6-08 | Paid conversion QA | 16 | DEFERRED / DEPENDS_ON_M6-07 / NOT_ACCEPTED |

Accepted M6 scope-equivalent is `88h`: M6-01 through M6-06 are accepted. M6-07/M6-08 remain unaccepted while paid media is frozen.

M6-06 Product Authority closure on 2026-09-22:

```text
financial ceiling = R$ 1,000 / 30 days
configured average daily total = R$ 32/day
Maximize Clicks / max CPC R$ 10
São Paulo city / Portuguese
Search Partners OFF initially
paid media = FROZEN
current spend = R$ 0
future Google Ads target = 560-869-4042 / SWL Consultoria de imoveis / USER_DESIGNATED_NOT_YET_PREFLIGHT_VALIDATED
GA4 audience manual setup = AUTHORIZED / ZERO_SPEND
Looker Studio = DEFERRED
```

Canonical closure evidence:

- `docs/attribution/MNT_M6_06_BUDGET_SPEND_AUTHORIZATION_GATE_2026-09-22.md`
- `docs/attribution/MNT_GA4_AUDIENCE_MANUAL_RUNBOOK_V1_2026-09-22.md`
- `handoffs/HANDOFF-2026-09-22-M6-06-COMPLETE-PAID-MEDIA-FROZEN.md`

### MNT-M7 — QA, Release, Observability & Learning Loop — 192h — COMPLETE / ACCEPTED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M7-01 | Preview validation | 16 | COMPLETE / NO_ACTIVE_PREVIEW_CANDIDATE / EXISTING_RELEASE_EVIDENCE_REUSED |
| MNT-M7-02 | Technical/content QA | 16 | COMPLETE / ACCEPTED_WITH_P2_RESIDUALS |
| MNT-M7-03 | Independent mobile QA | 16 | COMPLETE / ACCEPTED |
| MNT-M7-04 | Tracking + lead end-to-end QA | 16 | COMPLETE / ACCEPTED |
| MNT-M7-05 | Regression suite | 16 | COMPLETE / ACCEPTED |
| MNT-M7-06 | P0/P1 release adjudication | 8 | COMPLETE / ACCEPTED / P0_P1_GATE_PASS |
| MNT-M7-07 | Vercel Production homologation | 8 | COMPLETE / ACCEPTED / EXISTING_PRODUCTION_HOMOLOGATED |
| MNT-M7-08 | Controlled Green publication | 8 | COMPLETE / ACCEPTED_BY_SUPERSESSION |
| MNT-M7-09 | Production smoke | 8 | COMPLETE / ACCEPTED |
| MNT-M7-10 | Post-release measurement | 24 | COMPLETE / ACCEPTED |
| MNT-M7-11 | GSC/GA4/Ads observation window | 24 | COMPLETE / ACCEPTED / PAID_MEDIA_FROZEN |
| MNT-M7-12 | Result registration with provenance | 16 | COMPLETE / ACCEPTED |
| MNT-M7-13 | RESF provider evidence intake / learning loop | 16 | COMPLETE / PROVIDER_INTAKE_MERGED |

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

M5 is complete at 168h. M6-01 through M6-06 are complete; M6-07/M6-08 remain deferred while paid media is frozen. Manual GA4 audience setup is complete.

M7-01 through M7-13 are complete/accepted under their recorded evidence. M7-08 was accepted by supersession because ADR-006 makes Vercel the canonical commercial web runtime and Green/GDigital the Form46/CRM provider; no artificial Green web publication was performed.

M7-13 provider evidence intake was merged into `wagnerjfjunior/Blogs-sites-portais-seo` through PR #15, merge `c8cf9c8f49982c30d641b6c590ddf53018802e52`. The provider lifecycle remained CANDIDATE and no framework registry was promoted.

M7 release severity remains:

```text
P0 = 0
P1 = 0
P2 = 2
P3 = 0
```

M7 accepted scope-equivalent is `192 / 192h` and M7 is COMPLETE.

M6-07/M6-08 remain explicitly deferred while paid media is frozen; no Ads implementation, spend or paid conversion QA is manufactured.

The MoreNumTegra RESF consumer program is closed as:

```text
CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
accepted = 1200 / 1240h = 96.77%
deferred = 40h
```

The deferred 40h are exactly M6-07 (24h) + M6-08 (16h) and remain reopenable only by a future explicit paid-media decision.

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


## Commercial Data Plane re-entry priority — outside RESF hour accounting

Product Authority explicitly recertified the current Home commercial state and directed work on an independent commercial update mechanism.

This parallel architecture workstream is not counted as additional RESF accepted hours.

Canonical artifacts:

- `docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md`
- `docs/architecture/MNT_COMMERCIAL_UPDATE_MEDIUM_REENTRY_2026-09-22.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json`
- `docs/architecture/data/MNT_HOME_COMMERCIAL_SNAPSHOT_V3_CANDIDATE_2026-09-22.json`
- `docs/architecture/data/MNT_HOME_CARD_COMMERCIAL_BINDINGS_V1_2026-09-22.json`

Validation: 21 canonical projects / 25 offers / 23 Home cards / 23-of-23 runtime primary-price parity / no runtime mutation.

Final RESF accepted progress at closure: `1200 / 1240h = 96.77%`; deferred paid-media scope: `40h`.


## Post-RESF operational backlog — dashboard-visible, outside RESF hours

These items are **not part of the 1240h RESF denominator**. They remain visible because they are current operational work or explicit deferred scope.

| ID | Work item | RESF hours | Current state | Dependency / boundary |
|---|---|---:|---|---|
| MNT-CDP-01 | Select Commercial Data Plane publication provider/owner | — | ACTIVE / NEXT_SAFE_ACTION | provider must satisfy public-read/admin-write/version/rollback/audit contract |
| MNT-CDP-02 | Define/prove public read + protected admin-write publication contract | — | PLANNED / BLOCKED_BY_CDP_01 | no browser secret; atomic/current pointer; CORS/cache/freshness |
| MNT-CDP-03 | **Planilha/CSV para atualização de valores**: import, normalize, validate and create candidate snapshot | — | PLANNED / PENDING | spreadsheet is operator input, not direct site source; no invented values |
| MNT-CDP-04 | Approval, publish, version history, rollback and audit workflow | — | PLANNED | requires provider contract |
| MNT-CDP-05 | Migrate Home/exact-project commercial consumers to snapshot v3 | — | PLANNED / NOT_AUTHORIZED | preserve current Home truth; fail closed to consult-only on invalid/unavailable feed |
| MNT-CDP-06 | End-to-end first value-only update without MoreNumTegra runtime deploy + rollback proof | — | PLANNED | after consumer migration |
| MNT-M6-07 | Google Ads external platform implementation | 24 | DEFERRED / PAID_MEDIA_FROZEN / NOT_ACCEPTED | reopen only by explicit Product Authority decision |
| MNT-M6-08 | Paid conversion QA | 16 | DEFERRED / DEPENDS_ON_M6_07 / NOT_ACCEPTED | cannot be real until M6-07 exists |

### Known residuals / observations — not P0/P1 blockers

| ID | Residual | Current state | Release impact |
|---|---|---|---|
| MNT-RES-01 | CAPIITOLO body composed client-side through editorial fetch/document replacement | OPEN / P2 | accepted residual; future bounded remediation |
| MNT-RES-02 | Google Search favicon eligibility for current WebP favicon | OPEN / P2 | accepted residual; do not claim SERP favicon fixed |
| MNT-RES-03 | Physical-device mobile QA | NOT_OBSERVED / ACCEPTED_RESIDUAL | emulated touch multi-browser passed; physical device still not proven |
| MNT-RES-04 | Screen-reader validation | NOT_OBSERVED / ACCEPTED_RESIDUAL | accessibility residual, not a hidden PASS |
| MNT-RES-05 | Field CWV / field INP | NOT_OBSERVED / ACCEPTED_RESIDUAL | lab targets do not substitute for field data |

Current Home commercial values remain governed by `PA-MNT-HOME-COMMERCIAL-TRUTH-2026-09-22` until the Commercial Data Plane is published and adopted.

## RESF final closure — 2026-09-23

Canonical closure:

`docs/sfjm/MNT_RESF_PROGRAM_CLOSURE_2026-09-23.md`

```text
M7 = COMPLETE / 192h accepted
M6 = 88h accepted / 40h deferred
MNT-RESF = CLOSED / COMPLETE_WITH_DEFERRED_PAID_MEDIA_SCOPE
accepted = 1200 / 1240h
accepted percent = 96.77%
deferred = 40h
Ads spend used for closure = R$ 0
```

The program must not be rendered as 100% complete because M6-07/M6-08 were intentionally not executed.
