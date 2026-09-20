# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`.

## 1. Estado integrado

```text
MAIN_AT_TRANSITION_START = d9d971d6f667c235723b35d251041ec11c021558
MNT-M4-05R = COMPLETE / ACCEPTED
MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 752
REMAINING_FORECAST_HOURS = 488
ACCEPTED_PERCENT = 60.65
```

## 2. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_Fzk6Js2EZsxRgMinz8ADTQM9dwEK
PRODUCTION_SOURCE_SHA = aa9df4be65f579e233a67fbd90c8d3f47d0ea1e2
PRODUCTION_STATE = READY
B4_PROD_RUN = 35530041309 / SUCCESS
PR132_SEMANTIC_CONTENT_IN_PRODUCTION = YES
HISTORICAL_BUILD_RATE_LIMIT = NO_LONGER_ACTIVE_BLOCKER
```

Production authenticated fetches confirm current semantic titles on Home, CAPIITOLO, Elo Duo and Ária.

Main is newer than the Production source only through PR #173, which removed the temporary `.github` diagnostic workflow. Its Vercel build was intentionally ignored/canceled, so the web runtime remains aligned.

## 3. Canonical HTTP routing

PRs #168–#173 completed the bounded trailing-slash canonicalization workstream.

Current state:

- `trailingSlash: true`;
- slash-only rewrites;
- no redundant explicit redirects;
- `/obrigado/` canonical navigation;
- B4-PROD raw HTTP assertions PASS;
- query preservation PASS;
- apex routing PASS;
- canonical tags PASS;
- thank-you noindex PASS.

## 4. M5-01

```text
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 13
P3_OPEN = 0
RUNTIME_DEVICE_RESIDUALS = OPEN
```

Local candidate evidence:

- F01/F02: PASS.
- F03/F19: behavioral local PASS; PR #167 checks PASS.
- F10/F11/F13: contrast local PASS, all tested ratios >= 4.50:1.
- F12/F14/F16: local PASS.
- F15: local PASS.
- F17/F18: local PASS.

These findings remain open until runtime integration/acceptance.

The old queue is stale relative to current `main`; refresh/rebuild is required before any merge.

## 5. Form 46 / measurement

No regression evidence. Contract remains Green Sales/GDigital tenant 313 / Form 46 / title `MoreEmUmTegra`.

## 6. Search/indexation baseline

Previously accepted indexation/Rich Results baseline remains valid unless new contrary evidence appears. PR #132 on-page semantic content is now actually present in Production.

## 7. Immediate next safe action

Authoritative detail: `docs/NEXT_SAFE_ACTION.md`.

Rebuild/rebase PR #133 onto live `main`, verify bounded F01/F02 scope, run exact-head checks/local smoke, and stop before merge. Then reconcile the remaining M5-01 runtime queue, including PR #167.
