# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-HOME-COMMERCIAL-TRUTH-CDP-V3-REENTRY.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LATEST_RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = www.moretegra.com.br
PRODUCTION_DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
PRODUCTION_SOURCE_SHA = 124b620855175a583c528733462d6d0f4f44cd41
PRODUCTION_STATE = READY
```

## VALIDATION_STATE

```text
MNT-M7-01 = COMPLETE
MNT-M7-02 = COMPLETE / ACCEPTED_WITH_P2_RESIDUALS
MNT-M7-03 = PLANNED / AUTHORIZATION_REQUIRED
MNT-M7 = ACTIVE

P0 = 0
P1 = 0
P2 = 2
P3 = 0
```

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1040
REMAINING_FORECAST_HOURS = 200
ACCEPTED_PERCENT = 83.87
```

## HOME COMMERCIAL TRUTH

Authority:

`docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md`

Current Production Home commercial state is the interim Home truth until separately superseded. No current Home value is changed by the Commercial Data Plane architecture work.

## COMMERCIAL DATA PLANE

```text
state = ACTIVE / DESIGN_ONLY
schema = v3 / multi-offer
projects = 21
offers = 25
Home cards = 23
runtime price parity = PASS 23/23
snapshot = CANDIDATE / NOT_PUBLISHED
provider = NOT_SELECTED
runtime migration = NOT_AUTHORIZED
```

Canonical architecture:

- `docs/architecture/MNT_COMMERCIAL_UPDATE_MEDIUM_REENTRY_2026-09-22.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json`

## FECH.AI

Read-only discovery found useful internal MesaCliente inventory structures but no proven MoreNumTegra public publication context. Direct browser access to FECH.AI internal tables remains forbidden.

## PAID MEDIA / LOOKER

```text
M6-07 Google Ads = DEFERRED / PAID_MEDIA_FROZEN
M6-08 = DEFERRED
Search spend = R$ 0
remarketing spend = R$ 0
Looker Studio = DEFERRED
```

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Select and prove the Commercial Data Plane publication provider/owner before any runtime consumer migration. M7-03 remains a separate authorization gate.
