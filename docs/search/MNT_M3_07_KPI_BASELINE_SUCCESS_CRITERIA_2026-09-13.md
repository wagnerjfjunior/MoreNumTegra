# MNT-M3-07 — KPI Baseline and Success Criteria — 2026-09-13

Status: `IN_PROGRESS / AUTHORIZED`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-07 — KPI baseline and success criteria`  
Planning estimate: `16h`  
Execution authorization: Product Authority explicitly authorized MNT-M3-07 to start on `2026-09-13` after focal acceptance of M3-04/M3-05/M3-06.  
Execution base: accepted MNT-M3-06 exact head `be81c8084e2b0356fdfb3f37edbd4d501b281cec`.  
Runtime/platform mutation: `NONE`.

## 1. Purpose

Define the governed baseline and measurable success criteria for Search-to-Lead before downstream M4 implementation work. This task measures and specifies evaluation; it does not authorize content publication, route implementation, Search Console mutation, Ads spend, GTM/GA4 mutation, Green changes, DNS or Vercel deployment.

Preserve:

```text
BASELINE OBSERVED != TARGET ACHIEVED
TARGET DEFINED != IMPLEMENTATION AUTHORIZED
GSC IMPRESSION != LEAD
GA4 LEAD != SEARCH-ATTRIBUTED LEAD WITHOUT SOURCE EVIDENCE
NO OBSERVATION != ZERO
PROGRAM KPI != V1 RELEASE GATE UNLESS EXPLICITLY DESIGNATED
```

## 2. Accepted upstream inputs

M3-07 consumes the accepted M3-01..M3-06 evidence stack, including:

- M3-01 market/search-demand baseline;
- M3-02 Search Console query classification;
- M3-03 SERP/search-intent analysis;
- M3-04 governed Product Fact & Claim Registry;
- M3-05 Search Intent / Query Ownership Contract;
- M3-06 Query-family to Page-owner Map;
- accepted M2 Measurement foundation and end-to-end lead lifecycle.

M3-04, M3-05 and M3-06 are accepted by Product Authority but remain `PENDING_READY_MERGE`; this branch is intentionally stacked on the accepted M3-06 exact head.

## 3. Current observed baseline

### 3.1 Search Console baseline

Accepted M3-01 first-party Search Console observation for `sc-domain:moretegra.com.br`:

```text
window = 2026-08-23..2026-09-13
clicks = 0
impressions = 26
weighted_average_position ≈ 27.52
```

Interpretation constraints:

- the sample is sparse;
- it is mostly brand/entity-shaped;
- it is insufficient for trend or causality claims;
- absence of impressions for a family is not proof of no demand.

### 3.2 External search-demand context

Keyword Planner provides demand context but is not an organic KPI source. Selected accepted observations include:

```text
tegra = 4,400 avg monthly searches
tegra incorporadora = 3,600
apartamentos são paulo = 12,100
apartamentos a venda são paulo = 8,100
apartamentos para comprar são paulo = 1,900
apartamentos na planta em são paulo = 590
```

Planner values must not be used as ranking, CTR, conversion or ownership KPIs.

### 3.3 Measurement / lead baseline

Accepted source event:

`mnt_lead_success`

Accepted GA4 mapping:

`mnt_lead_success -> generate_lead`

GA4 `generate_lead` is an accepted Key event. No monetary lead value is defined.

Current Search-attributed lead count / organic conversion-rate baseline is:

`NOT_YET_BASELINED_FROM_A_GOVERNED_REPORTING_WINDOW`

Do not substitute implementation QA events for a production acquisition baseline.

## 4. KPI model v1

### KPI-01 — Organic visibility

Source: GSC.

Measures:
- impressions;
- clicks;
- CTR;
- average position.

Baseline: current governed GSC snapshot above.

Success criterion: subsequent governed observation windows must show reproducible improvement or stable qualified visibility without relying on one-query anomalies. No fixed numeric growth percentage is invented at task start.

### KPI-02 — Accepted query-family coverage

Source: GSC classified through M3-05/M3-06 taxonomy.

Measure: number/share of accepted served query families with observed GSC impressions, separated from `DO_NOT_TARGET` and support-only families.

Baseline: `TO_BE_COMPUTED_FROM_GOVERNED_GSC_CLASSIFICATION`.

Success criterion: coverage expands across accepted brand, project, master, stage and qualified modifier families without creating visibility in excluded/noise families as a target objective.

### KPI-03 — Exact-project organic discovery

Source: GSC.

Measure: impressions/clicks for governed exact-project families mapped by M3-06.

Baseline: `TO_BE_COMPUTED_FROM_GOVERNED_QUERY_CORPORA`.

Success criterion: exact-project visibility grows while preserving exact-project ownership over master/stage/location surfaces.

### KPI-04 — Search landing ownership integrity

Source: GSC page/query evidence after implementation plus M3-06 ownership contract.

Measure: proportion of material query families resolving to the intended page owner with no observed cannibalization requiring adjudication.

Baseline: architecture-only; runtime page-owner observation is `NOT_APPLICABLE_BEFORE_IMPLEMENTATION`.

Success criterion: one intended owner per material family, with exact-project precedence and no blocked/conditional route treated as implemented.

### KPI-05 — Organic qualified lead volume

Sources: GA4 + acquisition/source dimensions, using canonical `generate_lead` only.

Baseline: `NOT_YET_BASELINED_FROM_A_GOVERNED_REPORTING_WINDOW`.

Success criterion: organic Search produces reproducible accepted leads under the canonical lifecycle, with no use of form-start or submit-attempt as lead proxies.

### KPI-06 — Organic Search-to-lead conversion rate

Definition:

`organic accepted leads / governed organic session denominator`

Exact denominator dimension and reporting window must be frozen before a numeric baseline is published.

Baseline: `NOT_YET_DEFINED / DO_NOT_INVENT`.

Success criterion: measurable, reproducible conversion rate using one frozen denominator/window definition and no PII.

### KPI-07 — Commercial-truth compliance

Sources: M3-04 + release evidence.

Measure: public Search surfaces containing volatile commercial claims that have current release-time revalidation.

Baseline: governance contract exists; downstream implementation not yet authorized.

Success criterion: `100%` of published volatile price/inventory/promotion claims are release-revalidated; unverified claims fail closed.

### KPI-08 — Mobile performance guardrails

These remain product guardrails rather than Search-demand KPIs:

```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

They must be preserved by downstream implementation because degraded mobile performance can invalidate Search-to-Lead outcomes.

## 5. Observation-window contract to finalize

M3-07 must still freeze, with provenance:

- comparison windows for GSC;
- query-family rollup procedure;
- GA4 organic acquisition denominator;
- accepted lead numerator;
- minimum evidence requirement before declaring movement;
- treatment of sparse/zero-click baselines;
- post-implementation observation window;
- separation of leading indicators from business outcomes.

No arbitrary target percentage or unsupported forecast is admitted merely to make the KPI table look complete.

## 6. Leading indicators vs outcome metrics

Leading indicators:
- GSC impressions;
- qualified-query coverage;
- exact-project discovery;
- intended owner visibility;
- CTR where sample size is material.

Outcome metrics:
- organic accepted leads;
- organic Search-to-lead conversion rate.

Guardrails:
- product-fact compliance;
- mobile performance;
- consent/privacy integrity;
- no duplicate lead events.

## 7. Current task state

```text
MNT-M3-04 = COMPLETE / ACCEPTED / PENDING_READY_MERGE
MNT-M3-05 = COMPLETE / ACCEPTED / PENDING_READY_MERGE
MNT-M3-06 = COMPLETE / ACCEPTED / PENDING_READY_MERGE
MNT-M3-07 = IN_PROGRESS / AUTHORIZED
```

Ready/merge for PRs #59/#60/#61 remains a separate Product Authority gate.

## 8. Next work inside M3-07

1. resolve current governed GSC classification inputs;
2. compute family-level baseline counts without inventing missing observations;
3. resolve GA4 reporting dimensions needed for organic lead numerator/denominator;
4. freeze comparison-window semantics;
5. publish machine-readable KPI baseline/success-criteria matrix;
6. route candidate through the adopted `seo_analytics_growth` specialist and any additional specialist strictly required by the M3-07 acceptance gate.

No M4 execution is authorized by this task.