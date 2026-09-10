# MNT-RESF — MoreNumTegra Search-to-Lead 2026 — WBS

Status: `CANONICAL_MAIN` when this revision is merged  
Project authority: MoreNumTegra / Product Authority  
Canonical repository: `wagnerjfjunior/MoreNumTegra`  
Program ID: `MNT-RESF`  
Framework: `RESF v1 — Search-to-Lead`  
Framework provider pinned for this adoption: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`  
Planning baseline date: `2026-09-10`

## 1. Purpose

This WBS publishes the complete MoreNumTegra Search-to-Lead program so SFJM Workspace and other read-only consumers can render the whole project without inventing phases, tasks, hierarchy, hours, state or provenance.

The MoreNumTegra repository remains authoritative. SFJM Workspace is a derived visualization/continuity consumer only.

For current lifecycle/progress after the structural baseline, read `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

## 2. Effort semantics

The program forecast is a planning model, not a timesheet and not proof of elapsed engineering time.

- future work uses `CONSUMER_PLANNING_ESTIMATE_V1`;
- completed M0 uses `RETROSPECTIVE_SCOPE_EQUIVALENT_ESTIMATE` because historical actual hours were not captured canonically;
- completed M1 uses its accepted planning estimate as scope-equivalent after lifecycle closure;
- parent hours are the sum of immediate child task hours;
- parent/child hours must never be double-counted;
- later project-published canonical task hours supersede earlier planning estimates;
- Workspace may display these values but must not silently rewrite them.

Current planning forecast:

| Phase | Name | State | Hours |
|---|---|---:|---:|
| MNT-M0 | V1 Foundation & Commercial Production | COMPLETE | 160 |
| MNT-M1 | RESF Adoption & Existing-State Reconciliation | COMPLETE | 96 |
| MNT-M2 | Measurement Foundation & Consent | PLANNED_NOT_AUTHORIZED | 144 |
| MNT-M3 | Intelligence, Product Truth & Search Contract | PLANNED | 144 |
| MNT-M4 | IA, Content, Schema, GEO/AEO & Linking | PLANNED | 208 |
| MNT-M5 | UX, Performance, Conversion, Lead & CRM | PLANNED | 168 |
| MNT-M6 | Attribution & Paid Media Readiness | PLANNED | 128 |
| MNT-M7 | QA, Release, Observability & Learning Loop | PLANNED | 192 |
| **TOTAL** |  |  | **1240** |

Accepted/completed scope-equivalent effort: `256h`  
Remaining forecast: `984h`  
Program progress: `20.65%`

`20.65%` is progress against the expanded MNT-RESF program. It does not mean the live V1 is only 20.65% complete. The commercial V1 is already operational.

## 3. WBS

### MNT-M0 — V1 Foundation & Commercial Production — 160h — COMPLETE

Historical accepted scope. Hours are retrospective scope-equivalent estimates, not actual timesheets.

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

Completed as documentation/governance/reconciliation. Closure anchor: PR `#39`, merge `dba0de3bfefc7aec90c5a88588c54eae4317c61f`.

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

### MNT-M2 — Measurement Foundation & Consent — 144h — PLANNED_NOT_AUTHORIZED

The phase is next in sequence but has not been authorized to start by MNT-M1 closure.

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M2-01 | Inventory tracking already present in live runtime | 8 | PLANNED |
| MNT-M2-02 | Define transport architecture and duplicate-event prevention | 16 | PLANNED |
| MNT-M2-03 | Define canonical event taxonomy | 16 | PLANNED |
| MNT-M2-04 | Define primary and secondary conversions | 8 | PLANNED |
| MNT-M2-05 | Define ownership for MoreNumTegra GTM and GA4 | 8 | PLANNED |
| MNT-M2-06 | Define ownership for Meta Pixel/Dataset | 8 | PLANNED |
| MNT-M2-07 | Define consent model and LGPD gating | 16 | PLANNED |
| MNT-M2-08 | Define denied/granted consent QA contract | 16 | PLANNED |
| MNT-M2-09 | Implement authorized tracking configuration | 24 | PLANNED_NOT_AUTHORIZED |
| MNT-M2-10 | Execute end-to-end Measurement QA | 24 | PLANNED |

Mutation gates remain separate for GTM, GA4, Meta, Green configuration, CAPI, consent runtime and Google Ads.

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

### MNT-M5 — UX, Performance, Conversion, Lead & CRM — 168h — PLANNED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M5-01 | Mobile UX and accessibility audit | 16 | PLANNED |
| MNT-M5-02 | Core Web Vitals/performance baseline | 16 | PLANNED |
| MNT-M5-03 | Media/image/video performance strategy | 16 | PLANNED |
| MNT-M5-04 | Regression of filters, touch and mobile controls | 16 | PLANNED |
| MNT-M5-05 | Conversion architecture | 16 | PLANNED |
| MNT-M5-06 | CTA/form journey optimization design | 16 | PLANNED |
| MNT-M5-07 | Lead semantics and lead-validity contract | 16 | PLANNED |
| MNT-M5-08 | Green/Form 46 CRM handoff contract | 16 | PLANNED |
| MNT-M5-09 | Form/CTA conversion QA | 16 | PLANNED |
| MNT-M5-10 | Authorized performance remediation | 24 | PLANNED_NOT_AUTHORIZED |

Performance targets retained: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.

### MNT-M6 — Attribution & Paid Media Readiness — 128h — PLANNED

| ID | Activity | Hours | State |
|---|---|---:|---|
| MNT-M6-01 | Attribution model and identifier boundaries | 16 | PLANNED |
| MNT-M6-02 | UTM/source/medium/campaign contract | 8 | PLANNED |
| MNT-M6-03 | Google Ads conversion architecture | 16 | PLANNED |
| MNT-M6-04 | SEM campaign/query contract | 24 | PLANNED |
| MNT-M6-05 | Landing-page/query mapping | 16 | PLANNED |
| MNT-M6-06 | Budget/spend authorization gate | 8 | PLANNED_NOT_AUTHORIZED |
| MNT-M6-07 | Authorized external platform implementation | 24 | PLANNED_NOT_AUTHORIZED |
| MNT-M6-08 | Paid conversion QA | 16 | PLANNED |

`PLANNED` or `PLANNED_NOT_AUTHORIZED` never means publication or spend authority.

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

```text
MNT-M0 COMPLETE
-> MNT-M1 COMPLETE
-> MNT-M2 PLANNED_NOT_AUTHORIZED / NEXT
-> MNT-M3 PLANNED
-> MNT-M4 PLANNED
-> MNT-M5 PLANNED
-> MNT-M6 PLANNED
-> MNT-M7 PLANNED
```

No phase after MNT-M1 is active automatically. The next safe action is the Product Authority decision on bounded MNT-M2 READ_ONLY / DESIGN start.

## 5. SFJM Workspace presentation contract

The consumer should render:

- program/phase rows at the top level;
- immediate child tasks when a phase is expanded;
- recursive child decomposition only when present;
- hours and progress without parent/child double counting;
- exact effort provenance;
- current/next state separately from the full tree;
- `PLANNED_NOT_AUTHORIZED` distinctly from executable work;
- canonical repository, observed SHA and observation timestamp.

Workspace must not create, rename, flatten or infer missing project tasks.

## 6. Current-state precedence

For current lifecycle/progress use `docs/sfjm/CURRENT_PROGRAM_STATE.json`. The structural task graph remains authoritative for hierarchy/task IDs/planning hours. A later current-state overlay can supersede lifecycle-state fields captured by an older graph snapshot without permitting consumer invention.

Preserve:

`DOCUMENTED != IMPLEMENTED != DEPLOYED != VALIDATED`.
