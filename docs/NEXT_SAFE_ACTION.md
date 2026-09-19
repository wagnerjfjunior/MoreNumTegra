# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-19`.

## Estado canônico resolvido

```text
MAIN_SHA_BEFORE_THIS_DOCS_UPDATE = df17eb027060551589514d69ea9211031524d8d4

MNT-M4-05R = COMPLETE / ACCEPTED
M4-05R_ADDITIONAL_WBS_HOURS = 0

MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED

P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 7
P3_OPEN = 0

F01/F02 = REMEDIATION_READY_NOT_MERGED / PR #133 / F01_LOCAL_PASS / F02_PENDING
F10/F11/F13 = SOURCE_LEVEL_STATIC_CONTRAST_FINDINGS / PR #135 READY
F12/F14 = CAPIITOLO ARIA_TABS + MOBILE_OVERFLOW / PR #137 READY / LOCAL_CANDIDATE_PASS

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 752
REMAINING_FORECAST_HOURS = 488
ACCEPTED_PERCENT = 60.65

APPROVED_PENDING_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
LATEST_RUNTIME_DEPLOYMENT = PROVIDER_BLOCKED / VERCEL build-rate-limit
```

Canonical records:

- `docs/sfjm/MNT_M4_05R_ACCEPTANCE_CLOSURE_2026-09-19.md`
- `docs/ux/MNT_M5_01_MOBILE_UX_ACCESSIBILITY_AUDIT_2026-09-19.md`
- `docs/sfjm/VERCEL_RECOVERY_QUEUE_2026-09-19.md`
- `docs/ux/MNT_M5_01_RUNTIME_DEVICE_VERIFICATION_MATRIX_2026-09-19.md`

## Única próxima ação segura

Continue `MNT-M5-01 — Mobile UX and accessibility audit` without merging additional runtime while the approved PR #132 runtime is provider-blocked.

Work that may continue now:

1. preserve PR #133 as the bounded remediation candidate for F01/F02;
2. preserve PR #135 as the bounded stacked remediation candidate for F10/F11/F13;
3. preserve PR #137 as the bounded remediation candidate for F12/F14; local candidate validation for both is PASS, production validation pending;
4. complete source-level accessibility checks that do not require a representative browser/device;
5. execute the canonical runtime/device verification matrix when a representative browser/device is available;
6. retain any still-unexecuted browser/device checks as `NOT_OBSERVED` until valid evidence exists.

When Vercel recovers, execute the ordered recovery queue in:

`docs/sfjm/VERCEL_RECOVERY_QUEUE_2026-09-19.md`

The first production action is always the exact approved runtime `353f4a5d...`, followed by production smoke. PR #133 comes only after that smoke passes and after a fresh lifecycle gate.

## Remaining runtime/device set

- representative keyboard focus order;
- full keyboard operation;
- screen-reader announcement behavior;
- 200% text resize / browser zoom;
- color contrast for states not covered by current static calculations;
- adjacent touch-target spacing;
- horizontal overflow on representative mobile widths;
- gallery/tab interaction on representative mobile browser.

## Current P2 findings

1. F01 — mobile Home primary navigation hidden below 760px; PR #133 ready, not merged; local visual validation PASS at ~360/393/400 px.
2. F02 — Home without explicit skip-to-content; PR #133 ready, not merged; focused skip-link behavior still NOT_YET_OBSERVED.
3. F10 — Home stage badges: construction/launch text contrast below 4.5:1.
4. F11 — Home light-footer secondary/contact text contrast below 4.5:1.
5. F13 — Home small gold helper text slightly below 4.5:1; PR #135 ready.
6. F12 — CAPIITOLO ARIA tab widgets lack complete keyboard/panel semantics; PR #137 ready; local keyboard interaction user-reported PASS.
7. F14 — CAPIITOLO mobile horizontal overflow; PR #137 ready; local visual validation PASS at 360/375/393/440 px.

## Boundaries

- M5-01 remains audit-first;
- a finding is not automatic authorization for runtime mutation;
- do not start M5-02 by sequence alone;
- do not create an artificial commit to bypass Vercel build-rate-limit;
- do not merge additional runtime before the pending PR #132 production state is reconciled;
- preserve runtime queue order and re-resolve exact heads before every merge;
- do not reopen M4-05R, Form 46, sitemap, indexation or Rich Results without new contrary evidence.

## Condition of exit

```text
MNT_M5_01 = COMPLETE_CANDIDATE | IN_PROGRESS
P0 = <count>
P1 = <count>
P2 = <count>
P3 = <count>
RUNTIME_DEVICE_RESIDUALS = NONE | <explicit set>
RUNTIME_REMEDIATION_REQUIRED = YES | NO | NOT_YET_ADJUDICATED
WBS_PROGRESS_CHANGE = NO
NEXT_TASK = MNT-M5-02 | NO_TASK
AUTHORITY_REQUIRED = YES | NO
```
