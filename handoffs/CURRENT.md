# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-19`.

GitHub `main` é a fonte canônica. Resolver estado live antes de qualquer nova conclusão ou mutação.

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_SHA_OBSERVED = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
PR_123 = MERGED / M5-01 MOBILE REMEDIATION
PR_132 = MERGED / SEMANTIC ON-PAGE SEO
OPEN_RUNTIME_MUTATION = NONE_AUTHORIZED_FROM_THIS_HANDOFF
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
P2_OPEN = 2
P3_OPEN = 0
WBS_PROGRESS_CHANGE = NO
```

Open P2 findings:

1. Home primary navigation remains hidden below 760px.
2. Home still lacks an explicit skip-to-content link.

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

The new PR #132 semantic changes are not yet production-validated because the exact main deployment is provider-blocked.

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

Complete M5-01 representative runtime/device accessibility verification and adjudicate F01/F02. Do not start M5-02 by sequence alone and do not mutate runtime merely because an audit finding exists.
