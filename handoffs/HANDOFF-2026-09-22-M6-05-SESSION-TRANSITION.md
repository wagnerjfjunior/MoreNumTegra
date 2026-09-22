# Handoff — Session Transition after M6-05

Date: `2026-09-22`

Purpose: transfer MoreNumTegra execution to a new conversation without relying on chat history.

GitHub `main` remains the canonical project authority. This handoff is a continuity entrypoint only.

## 1. Canonical project anchor

```text
REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
CANONICAL_MAIN_AT_TRANSITION = ce9f45abad185509b5c4bb11c9b08c4bd1344db2
LATEST_RUNTIME_PR = #231 / MERGED
LATEST_RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
CANONICALIZATION_PR = #232 / MERGED
PRODUCTION_DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

The new conversation must resolve all refs live again before acting.

## 2. Current lifecycle

```text
MNT-M6-01 = COMPLETE
MNT-M6-02 = COMPLETE
MNT-M6-03 = COMPLETE
MNT-M6-04 = COMPLETE
MNT-M6-05 = COMPLETE / LANDING_QUERY_MAP_ACCEPTED / RUNTIME_REGRESSION_FIXED
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-06 / AUTHORIZATION_REQUIRED
```

## 3. M6-05 accepted result

Canonical evidence:

- `docs/attribution/MNT_M6_05_LANDING_PAGE_QUERY_MAPPING_V1_2026-09-22.md`
- `docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`

Accepted seed result:

```text
planned seeds = 30
READY = 29
BLOCKED_DO_NOT_TARGET = 1
HOLD = 0
blocked seed = prt-006 / tegra vendas
external Ads mutations = 0
spend = 0
```

Landing families accepted:

- Ária Higienópolis -> exact-project page;
- Elo Duo -> exact-project page;
- CAPIITOLO -> exact-project page;
- Portfolio Tegra -> Home.

## 4. Home regression repaired during M6-05

The post-interest project context/gallery regression was traced to the static-content cutover.

Historical behavior:

- `moretegra.js` still contained the post-intent gallery/context component;
- the consolidated Vercel Home lost the `data-form-anchor` mount point;
- Form 46 project selection remained preserved by independent `runtime.js` logic;
- the visual confirmation/gallery journey became orphaned.

M6-05 runtime correction:

```text
PR = #231
RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C / READY
```

Accepted behavior:

- restored post-interest mount without duplicating `#formulario`;
- retained Form 46 project context;
- retained dynamic 2/3-image project context/gallery;
- visible Home card copy enriched with natural project/location semantics;
- regular priced cards use natural `Preço a partir de` wording;
- no hidden SEO text or keyword stuffing;
- the dynamic gallery is conversion UX and is not treated as primary SEO-indexable evidence.

## 5. SEO / SEM boundary

M6-04 + M6-05 established:

- Search-only initial architecture;
- internal campaign registry = 4 records;
- planned keyword seeds = 30;
- 29 seeds are landing-ready;
- `tegra vendas` remains blocked for buyer-targeting;
- Exact + Phrase are initial match types;
- Broad / AI Max are not authorized initially;
- organic Search Console evidence is qualitative only and does not authorize Ads spend;
- page/card copy may be semantically improved only when natural and factual;
- do not turn cards into repetitive keyword strings;
- dynamic post-click content is not a substitute for static indexable SEO content.

## 6. Program progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1000
REMAINING_FORECAST_HOURS = 240
ACCEPTED_PERCENT = 80.65
```

## 7. Single next safe action

Authority remains:

`docs/NEXT_SAFE_ACTION.md`

Current gate:

```text
MNT-M6-06 — Budget/spend authorization gate — 8h
STATE = PLANNED / AUTHORIZATION_REQUIRED
```

The new conversation must **not** create campaigns, upload keywords, create conversion actions or spend merely by sequence.

M6-06 may define:

- budget ceilings;
- spend authority;
- campaign activation limits;
- geo/bid constraints;
- kill switches;
- staged-launch boundaries.

Only after explicit Product Authority authorization.

## 8. Explicit blocked actions at transition

Without a new explicit gate:

- no Google Ads spend;
- no external campaign creation;
- no keyword upload;
- no bid/budget mutation;
- no conversion-action creation;
- no GA4/GTM mutation;
- no Meta implementation;
- no CRM attribution transport;
- no enhanced conversions;
- no offline conversion import;
- no new Home SEO/card runtime rewrite by sequence alone.

## 9. New-conversation bootstrap order

Before the first material mutation, the receiving conversation must:

1. resolve MoreNumTegra `main` live;
2. read `bootstrap/BOOTSTRAP_CANONICO.md`;
3. read `handoffs/CURRENT.md`;
4. read this transition handoff;
5. read `docs/baseline/FUNCTIONAL_BASELINE_V2.md`;
6. read `docs/baseline/TECHNICAL_BASELINE_V2_3.md`;
7. read ADR-004, ADR-005 and ADR-006;
8. read `docs/PROJECT_STATUS.md`;
9. read `docs/NEXT_SAFE_ACTION.md`;
10. read `docs/BLOCKED_ACTIONS.md`;
11. resolve Production live;
12. stop at M6-06 until Product Authority authorizes execution.

## 10. SFJM / Workspace boundary

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
SFJM PROTOCOL = CONTINUITY METHOD
SFJM WORKSPACE = DERIVED READ_ONLY REPRESENTATION
WORKSPACE SNAPSHOT != PROJECT AUTHORITY
```

The Workspace may be refreshed from this handoff, but it cannot authorize M6-06 or mutate MoreNumTegra.
