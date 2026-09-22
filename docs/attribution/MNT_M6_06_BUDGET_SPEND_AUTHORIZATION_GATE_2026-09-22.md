# MNT-M6-06 — Budget / Spend Authorization Gate

Date: `2026-09-22`

Status: `ACTIVE / DESIGN_PROPOSAL_READY / MONETARY_AUTHORITY_REQUIRED / NO_EXTERNAL_MUTATION`

## 1. Purpose

Define the bounded budget/spend policy that must exist before MoreNumTegra can activate any Google Ads Search spend.

M6-06 owns:

- budget ceiling policy;
- spend authority boundary;
- staged activation limits;
- geographic/language constraints;
- initial bidding constraints;
- budget escalation prohibition;
- financial and technical kill switches;
- observation checkpoints;
- explicit separation between recommended budget and Product Authority approved budget.

M6-06 does **not**:

- create Google Ads campaigns, ad groups, ads or keywords;
- upload keywords;
- create or mutate conversion actions;
- link Google Ads and GA4;
- change GTM/GA4;
- enable spend;
- change billing settings;
- authorize Meta;
- promote `generate_lead` from Secondary to Primary;
- enable Broad, AI Max, Search Partners or automated text expansion;
- authorize enhanced conversions, offline conversion import or CRM click-ID transport.

## 2. Canonical dependencies

- `docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md`
- `docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md`
- `docs/attribution/MNT_M6_04_SEM_CAMPAIGN_QUERY_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_M6_05_LANDING_PAGE_QUERY_MAPPING_V1_2026-09-22.md`
- `docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`
- `docs/BLOCKED_ACTIONS.md`

Preserved upstream decisions:

```text
network = Search only
initial match types = Exact + Phrase
Broad = not authorized
AI Max = not authorized
competitor targeting = forbidden V1
ready keyword seeds = 29
blocked seed = prt-006 / tegra vendas
conversion source = GA4 generate_lead
project semantic = mnt_lead_success
initial Google Ads optimization = Secondary / observe only
native parallel Ads lead tag = forbidden V1
enhanced conversions = not authorized
offline conversion import = not authorized
```

## 3. Live read-only provider evidence used by this gate

A read-only Google Ads connector was available during M6-06 design.

Observed:

```text
connected Google Ads customer candidates = 2
exact MoreNumTegra customer account = NOT_ADJUDICATED_BY_M6_06
campaign/metric rows returned for both candidates through the current read path = 0
external mutation = 0
```

M6-06 does not infer which customer ID belongs to MoreNumTegra.

That exact account identity remains a mandatory M6-07 preflight obligation.

### Keyword Planner scope

Read-only Keyword Planner evidence was obtained for:

```text
location = São Paulo city
language = Portuguese
network = Google Search
date of observation = 2026-09-22
```

Relevant canonical-seed observations with measurable planner CPC:

| Keyword | Avg monthly searches | Avg CPC | Top-of-page low | Top-of-page high | Competition |
|---|---:|---:|---:|---:|---|
| ária higienópolis | 1,300 | R$ 5.47 | R$ 1.63 | R$ 5.31 | LOW |
| elo duo | 170 | R$ 6.31 | R$ 1.07 | R$ 7.91 | MEDIUM |
| elo duo tegra | 10 | R$ 3.86 | R$ 1.02 | R$ 4.00 | MEDIUM |
| caminhos da lapa elo duo | 90 | R$ 3.72 | R$ 0.84 | R$ 9.44 | MEDIUM |
| apartamentos tegra | 10 | R$ 6.67 | R$ 2.46 | R$ 9.81 | HIGH |
| tegra apartamentos | 10 | R$ 12.25 | R$ 2.88 | R$ 8.85 | HIGH |

For these six canonical seed families with non-null average CPC:

```text
median avg CPC ~= R$ 5.89
mean avg CPC ~= R$ 6.38
```

Many long-tail canonical seeds returned null planner volume/CPC. Null is treated as `INSUFFICIENT_PLANNER_DATA`, not as zero demand.

Provider estimates are planning evidence only. They are not a CPA forecast, lead forecast, conversion-rate forecast or guarantee of spend.

## 4. Recommended V1 pilot envelope — not yet authorized

The following is the M6-06 **recommended** launch envelope:

```text
PILOT_WINDOW = 14 calendar days
RECOMMENDED_FINANCIAL_CEILING = R$ 1,500 total billable spend
RECOMMENDED_CONFIGURED_AVERAGE_DAILY_BUDGET_TOTAL = R$ 70/day
RECOMMENDED_INITIAL_BIDDING = Maximize Clicks
RECOMMENDED_MAX_CPC_BID_LIMIT = R$ 10.00
AUTOMATIC_BUDGET_INCREASE = FORBIDDEN
TARGET_CPA = NOT_SET
TARGET_ROAS = NOT_SET
CONVERSION_VALUE = NONE
```

This recommendation is derived from the currently observable Search CPC range and is deliberately bounded because no MoreNumTegra paid-history CPA exists.

The R$ 1,500 ceiling is **not** spend authorization until Product Authority explicitly accepts it.

## 5. Recommended campaign budget split

When each stage is reached:

| Campaign | Recommended avg daily budget | Activation |
|---|---:|---|
| `mnt-cmp-000001` — Ária Higienópolis | R$ 30/day | Stage 1 |
| `mnt-cmp-000002` — Elo Duo | R$ 20/day | Stage 1 |
| `mnt-cmp-000003` — CAPIITOLO | R$ 10/day | Stage 2 |
| `mnt-cmp-000004` — Portfolio Tegra | R$ 10/day | Stage 3 |

Configured total after full staged activation:

```text
R$ 70/day average
```

This is an average daily budget, not a guaranteed same-day charge ceiling.

The operational hard stop is the Product Authority-approved cumulative financial ceiling, not merely the sum of configured daily budgets.

## 6. Staged launch boundary

### Stage 0 — external implementation / spend OFF

M6-07 may prepare the authorized external configuration only after M6-06 monetary approval.

Required state before spend:

- exact MoreNumTegra Google Ads account resolved live;
- correct GA4 property resolved live;
- Ads↔GA4 link state verified;
- auto-tagging verified;
- `generate_lead` live state verified;
- semantic duplicate conversion inventory = clear;
- campaign final URLs = M6-05 canonical URLs;
- 29 READY seeds only;
- `prt-006 / tegra vendas` absent;
- conversion remains Secondary;
- campaigns created paused before activation QA.

### Stage 1 — bounded traffic validation

Initial activation candidate:

```text
Ária = R$ 30/day
Elo Duo = R$ 20/day
configured total = R$ 50/day average
minimum observation before expansion = 72 hours
```

Reason: these two families have the strongest currently observed exact-project planner evidence.

### Stage 2 — CAPIITOLO

Eligible only if Stage 1 has no global kill condition.

```text
CAPIITOLO = +R$ 10/day
configured total = R$ 60/day average
```

### Stage 3 — Portfolio Tegra

Eligible only after at least seven calendar days of controlled paid observation and no unresolved P0/P1 measurement or landing defect.

```text
Portfolio Tegra = +R$ 10/day
configured total = R$ 70/day average
prt-006 / tegra vendas = BLOCKED_DO_NOT_TARGET
```

No stage transition is automatic.

## 7. Geographic and language constraints

Recommended initial configuration:

```text
geo target = São Paulo city
language = Portuguese
location-intent posture = São Paulo target with provider-supported presence/interest semantics
Search Partners = OFF initially
Display expansion = OFF
```

This initial geo restriction is a budget-control decision, not a claim that only São Paulo residents are valid buyers.

Expansion beyond the initial geo requires evidence from search-term/geographic performance and a separate bounded decision. M6-04's rule remains binding: legitimate buyers may exist outside São Paulo.

## 8. Bidding constraint

Initial recommendation:

```text
strategy = Maximize Clicks
max CPC bid limit = R$ 10.00
bid adjustments = none initially
conversion-based bidding = NOT_AUTHORIZED_BEFORE_M6_08
```

Reason:

- the accepted Ads conversion is initially Secondary / observe only;
- there is no MoreNumTegra paid-history CPA;
- current planner evidence centers near a R$ 5.89 median average CPC for canonical seeds with measurable data;
- a R$ 10 cap spans most currently observed top-of-page high ranges without granting unconstrained click bidding.

The CPC ceiling is a pilot guardrail, not a target price.

## 9. Financial controls

Until Product Authority provides explicit monetary approval:

```text
AUTHORIZED_FINANCIAL_CEILING = R$ 0
AUTHORIZED_SPEND = R$ 0
```

After explicit approval, the approved ceiling must be recorded verbatim before M6-07 spend activation.

Rules:

1. no operator may increase campaign budgets by sequence;
2. no Google recommendation may auto-apply a budget increase;
3. no provider recommendation supersedes Product Authority;
4. no shared-budget expansion may silently increase aggregate authorized exposure;
5. no campaign may remain active after the approved cumulative pilot ceiling is reached;
6. any additional spend requires a new explicit financial decision.

## 10. Kill switches

### Global immediate pause

Pause all paid campaigns if any of the following is observed:

- Form 46 submission regression;
- accepted lead no longer produces the canonical `mnt_lead_success`;
- duplicate lead conversion semantic is detected;
- visitor PII enters project Measurement;
- consent regression;
- final URL/canonical mismatch;
- GCLID/WBRAID/GBRAID is destroyed by project routing;
- Google Ads conversion source is not the intended GA4 `generate_lead`;
- `prt-006 / tegra vendas` or another `BLOCKED_DO_NOT_TARGET` term is intentionally activated;
- unsupported commercial claim is introduced by ad/asset automation;
- cumulative billable spend reaches the approved financial ceiling.

### Campaign-local pause

Pause the affected campaign when:

- landing page ceases to be READY under M6-05;
- project becomes unavailable for advertising under Product Truth governance;
- query ownership conflicts with the landing;
- policy/account state requires evidence not available to the project;
- search-term evidence shows systematic irrelevant intent requiring adjudication.

A tiny sample or one non-converting click is not enough by itself to label a keyword defective.

## 11. Observation checkpoints

Required reviews:

```text
T+48h
T+7d
T+14d / pilot close
```

Observe at minimum:

- spend;
- impressions;
- clicks;
- average CPC;
- search terms;
- keyword/match provenance;
- geographic performance;
- Form 46 starts/attempts/success semantics;
- GA4 `generate_lead`;
- Google Ads conversion observation after provider propagation;
- technical/landing failures;
- no PII in project Measurement.

No budget scale-up is authorized merely because spend is below budget.

## 12. Conversion lifecycle during pilot

Preserve:

```text
Google Ads conversion = Secondary
bidding signal authority = OFF
Primary promotion = NOT_PART_OF_M6_06
```

Promotion to Primary still requires:

1. M6-06 financial policy PASS;
2. controlled M6-07 external implementation;
3. M6-08 paid conversion QA PASS;
4. explicit Product Authority activation.

## 13. Product Authority decision required

M6-06 cannot honestly close while the project has no explicit monetary ceiling.

Recommended decision packet:

```text
APPROVE_RECOMMENDED_PILOT =
  financial ceiling: R$ 1,500
  pilot window: 14 days
  configured average daily total after full staged activation: R$ 70/day
  max CPC bid limit: R$ 10.00
  staged activation: Ária + Elo -> CAPIITOLO -> Portfolio
```

Product Authority may:

- approve this recommendation unchanged; or
- provide a different explicit financial ceiling.

Until then:

```text
MNT-M6-06 = ACTIVE / DESIGN_PROPOSAL_READY / MONETARY_AUTHORITY_REQUIRED
AUTHORIZED_SPEND = R$ 0
EXTERNAL_ADS_MUTATIONS = 0
```

## 14. Meta boundary

This Google Search budget gate does not authorize Meta Pixel/Dataset/CAPI implementation or Meta spend.

The existing Meta ownership contract remains:

```text
Meta browser path = canonical mnt_* event -> dataLayer -> GTM-PGCR4R47 -> consent/host eligibility -> dedicated MoreNumTegra Meta destination
direct project fbq() = forbidden
Meta exact Dataset/Pixel IDs = NOT_PROVEN
Meta implementation = separate explicit gate
```

## 15. Exit criteria

M6-06 is eligible for `COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED` only when:

- Product Authority explicitly approves a monetary ceiling;
- approved pilot duration is recorded;
- approved configured daily-budget envelope is recorded;
- approved CPC/bidding limit is recorded;
- staged activation boundary is recorded;
- geo/language constraints are recorded;
- kill switches are recorded;
- spend is still zero at the design-gate closure;
- no external Google Ads mutation occurred merely to close M6-06.

Until that decision, accepted task hours remain zero.
