# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver o estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_RUNTIME = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY

MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = COMPLETE / PRODUCTION_REGRESSION_PASS / PHYSICAL_DEVICE_NOT_OBSERVED
MNT-M5-05 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 816
REMAINING_FORECAST_HOURS = 424
ACCEPTED_PERCENT = 65.81
```

## 2. M5-04 Production regression

Canonical evidence:

`docs/ux/MNT_M5_04_PRODUCTION_MOBILE_REGRESSION_CLOSURE_2026-09-20.md`

Pre-fix Production:

```text
RUN = 35540073578
RUNTIME = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PASS = 54
FAIL = 3
NOT_OBSERVED = 1
```

All three failures were the same Ária gallery touch-target finding (44x44) observed in Chromium, Firefox and WebKit.

PR #185 applied the bounded 46x46 remediation and repository guard.

Exact-head gate:

`35540432189 / SUCCESS`

Post-fix Production:

```text
RUN = 35540543038
RUNTIME = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PASS = 57
FAIL = 0
NOT_OBSERVED = 1
TOTAL = 58
ARTIFACT = 10614387172
```

Physical-device testing remains `NOT_OBSERVED / NOT_PASS`. It is not inferred from browser-engine touch emulation.

## 3. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_SOURCE_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
```

## 4. Form 46 / Measurement / Search

M5-04 sent no real Form 46 lead and made no GTM/GA4, SEO/canonical, DNS, commercial-content or media-source changes.

## 5. Continuing execution authority

On 2026-09-20 Product Authority authorized continuing through planned tasks, including governed Ready/merge lifecycle, stopping only when a material decision is required.

This continuing authorization does not supersede explicit hard blocks. In particular, MNT-M5-10 remains `NOT_AUTHORIZED`.

## 6. Immediate next action

Start **MNT-M5-05 — Conversion architecture**.

Stop when M5-05 reaches a material product/architecture choice that cannot be resolved from canonical requirements and existing accepted contracts.
