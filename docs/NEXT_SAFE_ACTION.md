# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-22`.

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M6 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION

LATEST_RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_SOURCE_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_STATE = READY

PROGRAM_PROGRESS = 944 / 1240h = 76.13%
```

## M6-02 closure

Canonical contract:

- `docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_UTM_CONTRACT_V1.json`

Key boundary:

```text
minimum governed UTM tuple = source + medium + campaign
future paid launch requires utm_id too
stable campaign key = mnt-cmp-NNNNNN
pre-consent persistence = none
future post-consent project window = fixed 30 days
internal UTM propagation = forbidden
untagged referral/organic = vendor-native only
CRM attribution transport = not authorized
active campaigns created = 0
```

## Única próxima ação segura

**PARAR antes de M6-03.**

```text
MNT-M6-03 — Google Ads conversion architecture — 16h
STATE = PLANNED / AUTHORIZATION_REQUIRED
```

M6-03 may define Google Ads conversion architecture only after explicit Product Authority authorization.

No conversion action creation, account linking, spend, offline import, enhanced conversions, GTM/GA4 mutation or external Ads mutation is authorized.
