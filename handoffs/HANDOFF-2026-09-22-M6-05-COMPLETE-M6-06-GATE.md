# Handoff — MNT-M6-05 Complete / M6-06 Gate

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #231 / MERGED
RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
PRODUCTION_DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
PRODUCTION_STATE = READY
```

## M6-05 result

```text
TOTAL_SEEDS = 30
READY = 29
BLOCKED_DO_NOT_TARGET = 1
HOLD = 0
BLOCKED = prt-006 / tegra vendas
EXTERNAL_GOOGLE_ADS_KEYWORDS = 0
ADS_SPEND = 0
```

Landing families ready:

- Ária -> exact-project page
- Elo Duo -> exact-project page
- CAPIITOLO -> exact-project page
- Portfolio Tegra -> Home

Home regression fixed in PR #231:

- restored post-interest context mount;
- curated gallery journey works again;
- Form 46 selected-project context preserved;
- visible project-card semantics enriched without changing product facts;
- Chromium / Firefox / WebKit smoke PASS.

Canonical authority:

- `docs/attribution/MNT_M6_05_LANDING_PAGE_QUERY_MAPPING_V1_2026-09-22.md`
- `docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`

## Lifecycle

```text
MNT-M6-01 = COMPLETE
MNT-M6-02 = COMPLETE
MNT-M6-03 = COMPLETE
MNT-M6-04 = COMPLETE
MNT-M6-05 = COMPLETE / LANDING_QUERY_MAP_ACCEPTED / RUNTIME_REGRESSION_FIXED
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-06 / AUTHORIZATION_REQUIRED
```

## Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1000
REMAINING_FORECAST_HOURS = 240
ACCEPTED_PERCENT = 80.65
```

## Next safe action

STOP before M6-06.

Product Authority must explicitly authorize:

`MNT-M6-06 — Budget/spend authorization gate — 8h`

No Ads budget, spend, campaign creation, keyword upload, bid change, conversion-action creation or external platform mutation is authorized by M6-05.
