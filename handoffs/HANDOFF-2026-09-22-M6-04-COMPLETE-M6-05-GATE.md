# Handoff — MNT-M6-04 Complete / M6-05 Gate

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
```

M6-04 made no runtime or external Google Ads mutation.

## Lifecycle

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-03 = COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION
MNT-M6-04 = COMPLETE / DESIGN_CANONICALIZED / INTERNAL_REGISTRY_ONLY / NO_EXTERNAL_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-05 / AUTHORIZATION_REQUIRED
```

Canonical M6-04 authority:

- `docs/attribution/MNT_M6_04_SEM_CAMPAIGN_QUERY_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_SEM_QUERY_CONTRACT_V1.json`

## Search design

```text
network = Search only
internal campaign registry = 4 planned records
external Google Ads campaigns = 0
initial match = Exact + Phrase
Broad = not authorized
Broad-match campaign setting / AI Max = not authorized
competitor targeting = forbidden V1
planned keyword seeds = 30
final URL mapping = M6-05
```

Read-only Search Console evidence:

```text
property = sc-domain:moretegra.com.br
window = last 90d including today
rows = 12
impressions = 29
clicks = 1
```

The sample is qualitative only and cannot support demand, CPA or budget conclusions.

## Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 984
REMAINING_FORECAST_HOURS = 256
ACCEPTED_PERCENT = 79.35
```

## Next safe action

STOP before M6-05.

Product Authority must explicitly authorize:

`MNT-M6-05 — Landing-page/query mapping — 16h`

No campaign creation, Ads keyword upload, spend or landing-page runtime mutation is authorized by M6-04.
