# Handoff — MNT-M6-01 Complete / M6-02 Gate

Date: `2026-09-22`

GitHub `main` remains canonical. Resolve live before any conclusion or mutation.

## Runtime

```text
LAST_RUNTIME_PR = #223 / MERGED
RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY
```

M6-01 made no runtime or external-platform mutation.

## Lifecycle

```text
MNT-M5 = COMPLETE / ACCEPTED
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
NEXT = MNT-M6-02 / AUTHORIZATION_REQUIRED
```

Canonical M6-01 authority:

`docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md`

## Attribution decisions

```text
MODEL = FIRST_ELIGIBLE_TOUCH + LAST_ELIGIBLE_TOUCH
PROJECT_EVENT_ID = mnt_event_id
PROJECT_USER_ID = NOT_DEFINED
CROSS_DEVICE_IDENTITY = NOT_IMPLEMENTED
FINGERPRINTING = FORBIDDEN
GOOGLE_CLICK_IDS = gclid/wbraid/gbraid / OPAQUE / RESERVED
UTM_EXACT_CONTRACT = DEFERRED_TO_M6_02
META_IDENTIFIER_CONTRACT = DEFERRED
CRM_ATTRIBUTION_TRANSPORT = NOT_AUTHORIZED
GREEN_l__AND_p_id = NOT lead/attribution IDs
ENHANCED_CONVERSIONS_OR_HASHED_PII = NOT_AUTHORIZED
CANONICAL_HOST = www.moretegra.com.br
```

Historical M2-02 non-www host wording is superseded for current M6 design by ADR-006/current baseline.

## Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 936
REMAINING_FORECAST_HOURS = 304
ACCEPTED_PERCENT = 75.48
```

## Next safe action

STOP before M6-02.

Product Authority must explicitly authorize:

`MNT-M6-02 — UTM/source/medium/campaign contract — 8h`

No Ads spend, campaign launch, conversion-action creation, GTM/GA4 mutation, Meta implementation or CRM attribution transport is authorized by M6-01.
