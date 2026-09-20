# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_AT_M5_05_START = 0316ab7c482111006d2e909d5da0c4c8b5fa1983
EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY

MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 832
REMAINING_FORECAST_HOURS = 408
ACCEPTED_PERCENT = 67.10
```

## 2. Production

Production remains unchanged by M5-05:

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_SOURCE_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
```

## 3. M5-04 lifecycle cleanup

```text
PR_184 = CLOSED / NOT_MERGED / DIAGNOSTIC_ONLY
PR_185 = MERGED / ARIA_TOUCH_TARGET_REMEDIATION
PR_186 = MERGED / M5_04_CANONICAL_CLOSURE
M5_04_ACCEPTANCE_RUN = 35540543038 / 57 PASS / 0 FAIL / 1 NOT_OBSERVED
```

Physical-device testing remains `NOT_OBSERVED / NOT_PASS`.

## 4. M5-05 conversion architecture

Canonical evidence:

`docs/conversion/MNT_M5_05_CONVERSION_ARCHITECTURE_2026-09-20.md`

Current V1 architecture:

```text
CTA/project context
-> project-owned Form 46 client
-> Green/GDigital Form 46
-> HTTP success
-> fresh non-PII pending timestamp
-> shared /obrigado/
-> single-use mnt_lead_success
-> GTM
-> GA4 generate_lead
```

Conversion semantics remain:

- Form 46 accepted outcome / `mnt_lead_success` = sole primary conversion;
- explicit commercial/contact intents including WhatsApp = secondary;
- project interest, form start and submit attempt = non-conversions;
- no property price as conversion value;
- no visitor PII in ordinary Measurement;
- no intermediary backend required for V1.

Historical Green-native page-292/page-294 artifacts are not the current Vercel runtime contract where ADR-006 superseded the hosting topology.

## 5. Immediate next action

Start **MNT-M5-06 — CTA/form journey optimization design** under Product Authority's continuing authorization.

Stop at a material product/user-journey decision that is not already determined by canonical requirements.
