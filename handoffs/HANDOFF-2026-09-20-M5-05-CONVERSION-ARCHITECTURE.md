# Handoff — M5-05 Conversion Architecture

Date: `2026-09-20`

## State

```text
CANONICAL_MAIN_AT_START = 0316ab7c482111006d2e909d5da0c4c8b5fa1983
EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
```

Canonical architecture:

`docs/conversion/MNT_M5_05_CONVERSION_ARCHITECTURE_2026-09-20.md`

The accepted V1 conversion architecture remains:

```text
CTA / project context
-> project-owned Form 46 client
-> Green/GDigital Form 46
-> HTTP success
-> fresh non-PII pending timestamp
-> shared /obrigado/
-> single-use mnt_lead_success
-> GTM
-> GA4 generate_lead
```

WhatsApp and controlled commercial intents remain secondary; they are not verified leads.

Historical Green-native conversion artifacts must not be confused with the current Vercel Production implementation where ADR-006 superseded the old hosting topology.

## Program

```text
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 832
REMAINING_FORECAST_HOURS = 408
ACCEPTED_PERCENT = 67.10
MNT-M5-06 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

## Next

Start MNT-M5-06 — CTA/form journey optimization design.

Stop when a proposed optimization requires a material choice that changes lead semantics, provider/CRM ownership, privacy, Measurement taxonomy, or a user-journey product tradeoff not already decided by canonical requirements.
