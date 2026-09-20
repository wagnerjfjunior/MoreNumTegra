# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-20`.

**GitHub `main` / versionado é a fonte canônica.** Resolver estado live antes de qualquer conclusão ou mutação.

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-20-M5-06-CTA-FORM-DECISION-GATE.md`

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_AT_M5_06_DECISION = d3728806d9eae450320831388c76d52a4c5c2c07
```

## 2. PRODUCTION_STATE

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_SOURCE_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_STATE = READY
```

## 3. M5 state

```text
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = ACTIVE / DECISION_APPROVED / IMPLEMENTATION_AUTHORIZED
MNT-M5-07 = PLANNED / BLOCKED_BY_M5_06_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

Product Authority approved context-preserving Form 46 intent preselection.

Approved details:

- add `Negociar meu cenário` as a controlled form intent;
- CTA click should save the user's already-declared intent and preselect it in Form 46;
- CAPIITOLO hero -> `Receber condições`;
- preserve separate CAPIITOLO visit CTA;
- CAPIITOLO stays the official brand while the same canonical page naturally covers the `Capitolo` search variant;
- no duplicate alias route and no keyword stuffing.

## 4. Next safe action

Implement the approved M5-06 change in a bounded runtime PR and run exact-head + Production validation.

Do not alter project-page Measurement intent semantics until M5-07.
