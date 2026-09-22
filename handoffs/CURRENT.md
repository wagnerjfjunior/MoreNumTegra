# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-M7-01-COMPLETE-M7-02-P1-GATE.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LAST_RUNTIME_PR = #231 / MERGED
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
MNT-M7-01 = COMPLETE / NO_ACTIVE_PREVIEW_CANDIDATE / EXISTING_RELEASE_EVIDENCE_REUSED
MNT-M7-02 = ACTIVE / QA_EXECUTED / P1_PRODUCT_TRUTH_BLOCKERS_OPEN
MNT-M7 = ACTIVE

P0 = 0
P1 = 2
P2 = 2
P3 = 0
```

Canonical QA:

- `docs/qa/MNT_M7_01_PREVIEW_VALIDATION_ADJUDICATION_2026-09-22.md`
- `docs/qa/MNT_M7_02_TECHNICAL_CONTENT_QA_2026-09-22.md`

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1024
REMAINING_FORECAST_HOURS = 216
ACCEPTED_PERCENT = 82.58
```

## P1 GATE

P1-F01: Home volatile commercial objects lack a current release-time revalidation receipt. Do not infer that older Home unit/price/promotion objects remain current merely because the exact-project page has another valid unit/reference.

P1-F02: ODE Home runtime still exposes `De R$ 2.200.000 por R$ 2.090.000`; M3-04 explicitly says the older R$ 2.200.000 comparative is not recertified and remains prohibited.

No replacement price may be invented.

## GA4 / PAID MEDIA / LOOKER

```text
GA4 audience manual setup = COMPLETE / SCREENSHOT_OBSERVED
M6-07 Google Ads = DEFERRED / PAID_MEDIA_FROZEN
M6-08 = DEFERRED
Search spend = R$ 0
remarketing spend = R$ 0
Looker Studio = DEFERRED
```

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Product Authority must either revalidate the current Home commercial objects or authorize bounded fail-closed removal of unsupported/uncertified Home claims. Do not advance M7-03 while P1 remains open.
