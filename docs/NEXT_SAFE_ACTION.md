# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-22`.

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-03 = COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION

LATEST_RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_SOURCE_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY

PROGRAM_PROGRESS = 960 / 1240h = 77.42%
```

## M6-03 closure

Canonical architecture:

- `docs/attribution/MNT_M6_03_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1_2026-09-22.md`
- `docs/attribution/MNT_GOOGLE_ADS_CONVERSION_ARCHITECTURE_V1.json`

Key target:

```text
GA4 generate_lead -> one Google Ads web conversion
category = Submit lead form
Secondary initially
count = One
value = none
click window = 30d
no parallel native lead tag
no enhanced conversions
no offline import
```

## Única próxima ação segura

**PARAR antes de M6-04.**

```text
MNT-M6-04 — SEM campaign/query contract — 24h
STATE = PLANNED / AUTHORIZATION_REQUIRED
```

M6-04 may define SEM campaign/query structure only after explicit Product Authority authorization.

No campaign creation, keyword upload, spend, conversion-action creation or external Ads mutation is authorized.
