# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-20`.

GitHub `main` é a fonte canônica. Resolver o estado live antes de qualquer conclusão ou mutação.

Handoff de transição detalhado:

`handoffs/HANDOFF-2026-09-20-M5-01-SESSION-TRANSITION.md`

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_AT_TRANSITION_START = d9d971d6f667c235723b35d251041ec11c021558

PR_168 = MERGED
PR_169 = MERGED
PR_170 = MERGED / TEMP_DIAGNOSTIC
PR_171 = MERGED / FINAL_MINIMAL_CANONICALIZATION
PR_172 = CLOSED_NOT_MERGED / DIAGNOSTIC_ONLY
PR_173 = MERGED / DIAGNOSTIC_CLEANUP

OPEN_M5_RUNTIME_PRS = #133 #135 #145 #148 #137 #167
```

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_Fzk6Js2EZsxRgMinz8ADTQM9dwEK
PRODUCTION_STATE = READY
PRODUCTION_SOURCE_SHA = aa9df4be65f579e233a67fbd90c8d3f47d0ea1e2
PR132_SEMANTIC_CONTENT_IN_PRODUCTION = YES
B4_PROD_RUN = 35530041309 / SUCCESS
HISTORICAL_BUILD_RATE_LIMIT = CLOSED_AS_ACTIVE_BLOCKER
```

Current `main` is newer only because PR #173 removed the temporary `.github` diagnostic workflow; its Vercel build was intentionally ignored/canceled.

## 3. HTTP CANONICALIZATION

Current `vercel.json`:

- `trailingSlash: true`;
- slash-only rewrites;
- no redundant explicit canonical redirects;
- non-main Vercel deployment disabled;
- docs/handoffs/bootstrap/.github-only changes ignored by build.

Raw B4-PROD assertions passed for routing, query preservation, apex routing, canonical tags and thank-you `noindex`.

## 4. M5-01

```text
MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 13
P3_OPEN = 0
WBS_PROGRESS_CHANGE = NO
```

Local candidate status:

- F01/F02 — PASS — PR #133.
- F03/F19 — behavioral local PASS — PR #167; exact Production pending.
- F10/F11/F13 — contrast local PASS — PR #135.
- F12/F14/F16 — PASS — PR #137.
- F15 — PASS — PR #145.
- F17/F18 — PASS — PR #148.

All remain open until their runtime remediation is integrated/accepted.

The old runtime queue is stale because its PR branches are behind the current canonicalization main and PR #167 was added later. Do not merge the historical queue mechanically.

## 5. FORM 46

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
HOME_PROJECT_CONTEXT_E2E = PASS
```

No new regression evidence.

## 6. NEXT SAFE ACTION

Authority: `docs/NEXT_SAFE_ACTION.md`.

Resolve live `main`, then rebuild/rebase PR #133 onto that exact main, verify the bounded F01/F02 diff, rerun exact-head checks/local smoke, and stop before merge. After that, reconcile the remaining runtime queue including PR #167.

Do not start M5-02 by sequence alone.
