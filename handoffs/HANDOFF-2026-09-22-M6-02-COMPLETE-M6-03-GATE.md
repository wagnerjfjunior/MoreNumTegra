# Handoff — MNT-M6-02 Complete / M6-03 Gate

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
```

M6-02 made no runtime or external-platform mutation.

## Lifecycle

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-03 / AUTHORIZATION_REQUIRED
```

Canonical M6-02 authority:

- `docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_UTM_CONTRACT_V1.json`

## UTM decisions

```text
minimum governed tuple = source + medium + campaign
future paid launch tuple = id + source + medium + campaign
stable campaign key = utm_id / mnt-cmp-NNNNNN
sources = google/facebook/instagram/youtube
media = cpc/paid_social/paid_video
pre-consent = memory only
future persistent store = localStorage mnt_attribution_v1
project attribution window = fixed 30 days
direct/internal = no overwrite
untagged organic/referral = vendor-native only
internal UTM propagation = forbidden
CRM attribution transport = not authorized
active campaigns = 0
```

## Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 944
REMAINING_FORECAST_HOURS = 296
ACCEPTED_PERCENT = 76.13
```

## Next safe action

STOP before M6-03.

Product Authority must explicitly authorize:

`MNT-M6-03 — Google Ads conversion architecture — 16h`

No Google Ads conversion action, account linking, spend, GTM/GA4 mutation, offline import, enhanced conversions or external platform mutation is authorized by M6-02.
