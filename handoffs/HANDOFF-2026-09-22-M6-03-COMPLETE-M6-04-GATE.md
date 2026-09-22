# Handoff — MNT-M6-03 Complete / M6-04 Gate

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
```

M6-03 made no runtime or external-platform mutation.

## Lifecycle

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-03 = COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-04 / AUTHORIZATION_REQUIRED
```

Canonical M6-03 authority:

- `docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md`
- `docs/attribution/MNT_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1.json`

## Google Ads conversion decisions

```text
source = GA4 generate_lead
project semantic = mnt_lead_success
category = Submit lead form
initial optimization = Secondary
counting = One
value = none
click window = 30 days
attribution = Data-driven where available
credit channel target = Google paid channels / live-setting gate
Ads<->GA4 link = required
auto-tagging = required
parallel native lead tag = forbidden V1
enhanced conversions = not authorized
offline import = not authorized
Primary promotion = post M6-08 + M6-06 + explicit activation
```

## Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 960
REMAINING_FORECAST_HOURS = 280
ACCEPTED_PERCENT = 77.42
```

## Next safe action

STOP before M6-04.

Product Authority must explicitly authorize:

`MNT-M6-04 — SEM campaign/query contract — 24h`

No campaign creation, keyword upload, Ads account mutation, spend, conversion action creation or GTM/GA4 mutation is authorized by M6-03.
