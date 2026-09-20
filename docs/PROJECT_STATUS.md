# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`.

## 1. Estado integrado

```text
RUNTIME_MAIN_BEFORE_DOCS_RECONCILIATION = 16515a8c69e30dd97e04e092ded3077ea396319f
MNT-M4-05R = COMPLETE / ACCEPTED
MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / RUNTIME_QUEUE_RECONCILED / REMEDIATIONS_INTEGRATED / ACCEPTANCE_PENDING

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 752
REMAINING_FORECAST_HOURS = 488
ACCEPTED_PERCENT = 60.65
WBS_PROGRESS_CHANGE = NO
```

No WBS progress was added merely because remediation code was integrated.

## 2. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_CuT2rozyJ4xNvyXCbtrbjWL1KaFL
PRODUCTION_SOURCE_SHA = 16515a8c69e30dd97e04e092ded3077ea396319f
PRODUCTION_STATE = READY
PR132_SEMANTIC_CONTENT_IN_PRODUCTION = YES
HISTORICAL_BUILD_RATE_LIMIT = NO_LONGER_ACTIVE_BLOCKER
```

All six reconciled M5-01 remediation releases reached Vercel Production through the Git-driven flow.

## 3. M5-01 runtime reconciliation

Merged remediation mapping:

- PR #133 — F01/F02 — merge `d9b4a67912b317ec44d511db9561d966fb7e6914`;
- PR #135 — F10/F11/F13 — merge `2a468e9373820f2cef9ba5486d1e2262fe1f8b14`;
- PR #145 — F15 — merge `575efb1c880f59a501e6ee37337c672187d89570`;
- PR #167 — F03/F19 — merge `a8d36fc94084eb866657bf678aa7e6c28629304f`;
- PR #148 — F17/F18 — merge `e8400adbc0d8deb22f621e5bbbf0bf74467ec57b`;
- PR #137 — F12/F14/F16 — merge `16515a8c69e30dd97e04e092ded3077ea396319f`.

```text
OPEN_RUNTIME_REMEDIATION_PRS = 0
P2_REMEDIATIONS_INTEGRATED = 13
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 13
P3_OPEN = 0
RUNTIME_DEVICE_RESIDUALS = OPEN
```

The P2 findings remain open for acceptance; merged code/source presence is not silently promoted to behavioral PASS.

## 4. Validation already confirmed

- exact-head repository checks passed where applicable;
- #148 had no direct workflow on its single shared CSS head; source scope and prior integrated QA evidence were preserved and revalidated;
- current Production source serves Home F01/F02, F03/F19, F10/F11/F13 and F15 changes;
- shared project CSS in Production serves F17/F18;
- CAPIITOLO wrapper still loads the Production experiment asset;
- the Production experiment asset serves F12/F14;
- Production runtime JS serves F16.

## 5. Form 46 / measurement

No regression evidence. Contract remains Green Sales/GDigital tenant 313 / Form 46 / title `MoreEmUmTegra`.

No new real lead should be sent merely to repeat the already proven E2E contract.

## 6. Search / canonical baseline

Previously accepted indexation/Rich Results and B4-PROD canonical-routing evidence remain valid unless contrary evidence appears. No Search/DNS/canonical mutation occurred in the M5-01 queue reconciliation.

## 7. Immediate next safe action

Authoritative detail: `docs/NEXT_SAFE_ACTION.md`.

Execute the representative M5-01 Production acceptance matrix and adjudicate remaining P2/`NOT_OBSERVED` items. Do not start M5-02 by sequence alone.
