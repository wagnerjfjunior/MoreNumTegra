# Handoff — M5-06 CTA/Form Journey Decision Gate

Date: `2026-09-20`

## State

```text
CANONICAL_MAIN_AT_ANALYSIS = d3728806d9eae450320831388c76d52a4c5c2c07
EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY

MNT-M5-06 = ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION
```

Decision packet:

`docs/conversion/MNT_M5_06_CTA_FORM_JOURNEY_DECISION_GATE_2026-09-20.md`

Material decision: choose how contextual CTA intent is carried into Form 46.

Technical recommendation: context-preserving preselection using the existing controlled select, add a controlled `Negociar meu cenário` choice for the Home negotiation CTA, and make the CAPIITOLO hero CTA single-purpose (`Receber condições`), leaving its separate visit CTA intact.

No runtime mutation has been made.

Progress remains `832 / 1240h = 67.10%` because M5-06 is not complete.

M5-07 must not start until this decision is adjudicated. M5-10 remains explicitly not authorized.
