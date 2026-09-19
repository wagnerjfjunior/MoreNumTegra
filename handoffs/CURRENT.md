# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-19`.

GitHub `main` é a fonte canônica. Resolver estado live antes de qualquer nova conclusão ou mutação.

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_SHA_OBSERVED = bee925766398d9d9e629c96cf95511a35f0df175
PR_123 = MERGED / M5-01 MOBILE REMEDIATION
PR_132 = MERGED / SEMANTIC ON-PAGE SEO
OPEN_RUNTIME_QUEUE = PR #133 -> PR #135 -> PR #137 / ALL NOT_MERGED
```

PR #132 changed Home, CAPIITOLO, Elo Duo and Ária semantic on-page content. Its exact head `5dc3aea5e0256574edb498dcc63fe5f7bb2ca2a6` passed the three repository checks before merge.

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
DEPLOYMENT_POLICY = main-only automatic deployment
NON_MAIN_AUTO_DEPLOY = disabled

LATEST_MAIN_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
VERCEL_STATUS_FOR_LATEST_MAIN = FAILURE / PROVIDER_BLOCKED
VERCEL_REASON = build-rate-limit

LAST_VERIFIED_VERCEL_SUCCESS_SHA = 6e852f1c41ea834aa138e333cef56519f382dc5f
PRODUCTION_EXACT_SHA_AFTER_BLOCK = NOT_REVALIDATED
PRODUCTION_CONTENT_STATE = CONFIRMED_PRE_PR132 / HTTP_200
```

Interpretation:

```text
MERGED != DEPLOYED
DEPLOYMENT_PROVIDER_BLOCKED != CODE_FAILURE
DEPLOYED != PROD_HTTP_SMOKE_TESTED
```

Do not create an artificial commit to trigger deployment. When the provider block clears, deploy/retry the exact approved `main` state.

## 3. M4-05R ACCEPTANCE

```text
MNT-M4 = COMPLETE / ACCEPTED
MNT-M4-05R = COMPLETE / ACCEPTED
M4-05R_ADDITIONAL_WBS_HOURS = 0

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 752
REMAINING_FORECAST_HOURS = 488
ACCEPTED_PERCENT = 60.65
```

Canonical acceptance record:

`docs/sfjm/MNT_M4_05R_ACCEPTANCE_CLOSURE_2026-09-19.md`

## 4. M5-01 — MOBILE UX AND ACCESSIBILITY

```text
MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 6
P3_OPEN = 0
WBS_PROGRESS_CHANGE = NO
```

Open P2 findings:

1. F01 — Home primary navigation hidden below 760px.
2. F02 — Home lacks explicit skip-to-content.
3. F10 — Home construction/launch stage-badge contrast below 4.5:1.
4. F11 — Home light-footer secondary/contact contrast below 4.5:1.
5. F13 — Home small gold helper text slightly below 4.5:1.
6. F12 — CAPIITOLO ARIA tabs incomplete for keyboard/panel semantics.

Prepared runtime queue:
- PR #133 — F01/F02 — Ready, not merged.
- PR #135 — F10/F11/F13 — Ready, stacked on #133, not merged.
- PR #137 — F12 — Ready, not merged.

Resolved in current `main`:

- stage-filter `aria-pressed` state;
- consent-aware mobile floating action dock;
- 9:16 mobile campaign video;
- map CTA placement / governed WhatsApp-only map pattern;
- Ária neighborhood map query;
- CAPIITOLO intent-select affordance remediation;
- footer/address visual standardization.

PR #123 is merged at `830dd775641f25bb137a0f58de7c9c2a35ab0a2c`. Subsequent PRs #124–#130 further standardized footer/address and map policy.

Current audit:

`docs/ux/MNT_M5_01_MOBILE_UX_ACCESSIBILITY_AUDIT_2026-09-19.md`

## 5. SEARCH / INDEXATION BASELINE

Previously proven and still canonical unless new contrary evidence appears:

```text
GSC_SITEMAP = ACCEPTED / 4 URLS / 0 ERRORS / 0 WARNINGS
HOME_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
ARIA_INDEXATION = INDEXED
CAPIITOLO_RICH_RESULTS = 7_VALID
ELO_DUO_RICH_RESULTS = 7_VALID
ARIA_RICH_RESULTS = 7_VALID
HOME_RICH_RESULTS = 5_VALID
```

The PR #132 semantic changes are confirmed NOT PRESENT in production. Authenticated Vercel fetches on 2026-09-19 returned HTTP 200 on all four canonical routes while showing the pre-PR #132 title/H1/content markers. Evidence: `docs/sfjm/PR132_PRODUCTION_NOT_UPDATED_EVIDENCE_2026-09-19.md`.

## 6. FORM 46

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
HOME_PROJECT_CONTEXT_E2E = PASS
```

Do not reopen the Form 46 regression without new evidence.

## 7. CURRENT NEXT SAFE ACTION

Authority: `docs/NEXT_SAFE_ACTION.md`.

Preserve the ordered runtime queue (#133 -> #135 -> #137), execute the canonical runtime/device matrix when representative browser/device evidence is available, and keep PR #132 exact runtime deployment first in the Vercel recovery sequence. Do not start M5-02 by sequence alone.
