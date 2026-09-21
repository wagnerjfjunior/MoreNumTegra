# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-20`.

**GitHub `main` / versionado é a fonte canônica.** Resolver estado live antes de qualquer conclusão ou mutação.

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-20-M5-07-LEAD-SEMANTICS-DECISION-GATE.md`

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_AT_M5_07_ANALYSIS = af9a58cb49200b5e4a226ab5ede8a7df6b532f03
```

## 2. PRODUCTION_STATE

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_SOURCE_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_STATE = READY
```

## 3. M5 state

```text
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = ACTIVE / DECISION_APPROVED / IMPLEMENTATION_AUTHORIZED
MNT-M5-08 = PLANNED / BLOCKED_BY_M5_07_IMPLEMENTATION_AND_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

## 4. Decision

Product Authority approved Option A on 2026-09-21:

```text
Form 46 / CRM = Simular forma de pagamento
Measurement = negotiate_scenario / form / SECONDARY
```

Also approved: preserve controlled non-PII `project_name` / `offer_name` through `mnt_lead_success` and GA4 `generate_lead`.

Implementation is authorized. Visitor name, e-mail, telephone and raw/free-form form text remain prohibited in Measurement.

## 5. Progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 848
REMAINING_FORECAST_HOURS = 392
ACCEPTED_PERCENT = 68.39
```
