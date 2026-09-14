# MNT-M3-07 — KPI Baseline and Success Criteria — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`  
Task: `MNT-M3-07 — KPI baseline and success criteria`  
Planning estimate: `16h`  
Execution authorization: Product Authority explicitly authorized MNT-M3-07 on `2026-09-13`.  
Current integrated upstream: M3-04, M3-05 and M3-06 merged to `main`; M3-06 squash/main SHA `15876fc71d1e74b08d2a2be45565b2ef040c4d69`.  
Runtime/platform mutation: `NONE`.

## 1. Purpose

Freeze a reproducible Search-to-Lead KPI baseline and success-criteria contract before downstream M4 implementation. This task measures and specifies evaluation; it does not mutate Search Console, GA4/GTM, Green, Vercel, DNS, Ads or production content.

Preserve:

```text
FROZEN SNAPSHOT != LATER CONNECTOR REREAD
NO OBSERVATION != ZERO
NO ORGANIC SESSION ROW != ZERO PERCENT CONVERSION
GSC IMPRESSION != LEAD
GA4 LEAD != SEARCH-ATTRIBUTED LEAD WITHOUT CHANNEL EVIDENCE
TARGET DEFINED != IMPLEMENTATION AUTHORIZED
```

## 2. Accepted upstream inputs

M3-07 consumes the accepted/merged M3-01..M3-06 evidence stack plus the accepted M2 Measurement lifecycle.

Relevant governed contracts include:

- M3-04 Product Fact & Claim Registry;
- M3-05 Search Intent / Query Ownership Contract with 41 governed families;
- M3-06 Query-family to Page-owner Map with one explicit ownership state per family;
- `mnt_lead_success -> generate_lead` as the canonical accepted lead lifecycle.

## 3. Search Console baseline

### 3.1 Frozen accepted M3-01 snapshot

For `sc-domain:moretegra.com.br`:

```text
window = 2026-08-23..2026-09-13
clicks = 0
impressions = 26
weighted_average_position ≈ 27.52
state = ACCEPTED_FROZEN_SNAPSHOT
```

This remains the historical accepted M3-01 observation and must not be overwritten by later retroactive connector reads.

### 3.2 M3-07 live reread of the same window

A later Windsor.ai/Search Console reread returned:

```text
window = 2026-08-23..2026-09-13
clicks = 0
impressions = 23
ctr = 0
average_position = 26.2609
state = OBSERVED_LIVE_REREAD
```

Named query rows returned:

```text
amaro tegra = 1 impression
ode perdizes tegra = 1
tegra = 3
tegra campo belo = 1
tegra conecta = 2
tegra vendas = 5
named-query total = 13 impressions
```

The property total is 23 impressions while named rows sum to 13. This is not treated as corruption: GSC query tables can omit/suppress low-volume rows. Therefore query-row sums must not be silently equated to property totals.

Evidence file:

`docs/search/data/MNT_M3_07_GSC_LIVE_RECHECK_2026-09-13.csv`

### 3.3 Baseline rule

For longitudinal KPI comparisons, use frozen snapshots with explicit observation timestamps/windows. Later connector rereads are separate provenance states and cannot retroactively replace the frozen baseline.

## 4. GA4 baseline

GA4 property:

`553742649 — MoreNumTegra`

Observed window:

`2026-09-10..2026-09-13`

By `session_default_channel_group`:

```text
Referral:
  sessions = 17
  generate_lead key events = 6

Unassigned:
  sessions = 1
  generate_lead key events = 1

Total observed:
  sessions = 18
  generate_lead key events = 7
```

An explicit filter for:

`session_default_channel_group = Organic Search`

returned no rows.

Therefore:

```text
organic sessions = NO_ORGANIC_SESSION_ROW_OBSERVED
organic generate_lead = NOT_YET_BASELINED
organic Search-to-lead rate = NOT_COMPUTABLE
```

Do not coerce the absent Organic Search row into a `0%` organic conversion rate. A conversion rate is published only when the denominator is actually observed under the same frozen channel/window definition.

Evidence file:

`docs/search/data/MNT_M3_07_GA4_BASELINE_2026-09-13.csv`

## 5. Machine-readable KPI matrix

Canonical matrix:

`docs/search/data/MNT_M3_07_KPI_MATRIX.csv`

It governs 12 KPI/control rows covering:

- GSC impressions;
- GSC clicks;
- average position;
- named-query visibility;
- total GA4 sessions;
- total accepted GA4 lead key events;
- organic sessions;
- organic accepted leads;
- organic Search-to-lead rate;
- M3-05 family coverage;
- M3-06 ownership ambiguity;
- M3-04 release-time commercial revalidation.

## 6. KPI success criteria

### Organic visibility

Use GSC impressions, clicks, CTR and average position only in frozen comparable windows. Success means qualified visibility grows or improves reproducibly; no arbitrary growth percentage is invented.

### Query-family coverage

M3-05 governs exactly 41 accepted families. Success means future observed visibility expands across served brand/project/master/stage/qualified-modifier families without turning excluded/noise families into target objectives.

### Exact-project discovery

Success means exact-project queries increasingly resolve to the intended exact-project owner rather than master/stage/location surfaces.

### Ownership integrity

M3-06 accepted state has zero unresolved ownership ambiguity across accepted families. Conditional owners remain valid explicit states. Success means runtime implementation preserves one intended owner per material family.

### Organic accepted leads

Only canonical accepted leads count. `mnt_form_start` and `mnt_form_submit_attempt` are not lead proxies.

### Organic Search-to-lead rate

Definition:

`organic accepted leads / governed organic sessions`

The numerator and denominator must share the same GA4 channel attribution basis and frozen reporting window. Current baseline is `NOT_COMPUTABLE` because no Organic Search session row was observed.

### Commercial-truth compliance

All volatile public price/inventory/promotion claims must be revalidated at release time. Missing current evidence fails closed.

### Mobile product guardrails

Downstream implementation must preserve:

```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

These are product/performance guardrails, not Search-demand KPIs.

## 7. Observation-window contract

Future comparison must freeze and record:

- property/account;
- source connector/report;
- start/end dates;
- query/page/channel dimensions used;
- numerator and denominator semantics;
- observation timestamp or snapshot artifact;
- whether the value is a frozen snapshot or later reread;
- explicit handling of suppressed/absent rows.

Do not compare unlike windows or silently replace historical snapshots.

## 8. Leading indicators vs outcomes

Leading indicators:

- GSC impressions;
- query-family coverage;
- exact-project discovery;
- intended owner visibility;
- CTR when sample size is material.

Outcome metrics:

- organic accepted leads;
- organic Search-to-lead conversion rate.

Guardrails:

- product-fact compliance;
- mobile performance;
- consent/privacy integrity;
- no duplicate lead events.

## 9. Current lifecycle

```text
MNT-M3-04 = COMPLETE / ACCEPTED / MERGED
MNT-M3-05 = COMPLETE / ACCEPTED / MERGED
MNT-M3-06 = COMPLETE / ACCEPTED / MERGED
MNT-M3-07 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE
MNT-M4 = PRE_AUTHORIZED_BY_PRODUCT_AUTHORITY / NOT_STARTED
```

M4 may start at the first dependency-safe point after M3-07 acceptance/lifecycle closure. Pre-authorization does not convert this candidate into accepted state.

## 10. Acceptance gate

M3-07 should receive a focal independent review by `seo_analytics_growth` covering only:

1. snapshot/reread provenance separation;
2. correctness of GSC baseline semantics;
3. correctness of GA4 channel/numerator/denominator semantics;
4. no `NO_ROW` -> zero conversion inference;
5. machine-readable KPI matrix consistency;
6. success criteria being measurable without invented targets.

Recommended verdict vocabulary:

`APPROVE_FOR_PRODUCT_AUTHORITY_ACCEPTANCE`

or

`REQUEST_CHANGES`

No runtime/platform mutation is required for this acceptance gate.
