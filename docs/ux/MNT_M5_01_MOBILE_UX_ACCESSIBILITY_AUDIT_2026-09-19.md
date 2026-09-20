# MNT-M5-01 — Mobile UX and Accessibility Audit

Status: `IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED`

Reconciled: `2026-09-19`  
Planning effort: `16h`  
Canonical repository head observed before this docs-only update: `df17eb027060551589514d69ea9211031524d8d4`

## 1. Evidence boundary

This audit distinguishes:

- `SOURCE_LEVEL` — directly proven in current `main`;
- `MERGED_REMEDIATION` — corrective work proven merged in repository history;
- `USER_REPORTED_LOCAL_SMOKE` — latest ZIP/local visual smoke reported successful by Product Authority, not an accessibility certification;
- `NOT_OBSERVED` — requires representative browser/device/assistive-technology evidence.

A finding does not by itself authorize new runtime mutation.

## 2. Current positive controls

Current `main` preserves:

- minimum interaction sizing on the home;
- visible `:focus-visible` treatment;
- reduced-motion handling;
- Form 46 labels, validation, `aria-invalid`, live status/error regions and invalid-field focus;
- catalog result count with `aria-live="polite"`;
- explicit labels for search/filter controls;
- descriptive video title and privacy-enhanced YouTube origin;
- image `alt` coverage on checked canonical surfaces;
- skip-to-content links on current exact-project experiences;
- consent-aware floating actions through `--mt-consent-offset`.

## 3. Open findings

### M5-01-F01 — Home primary navigation hidden below 760px

- Evidence: `SOURCE_LEVEL`
- Severity: `P2 / UX DISCOVERABILITY`
- Current CSS keeps `.mt-header nav` hidden below the desktop breakpoint.
- Primary content, catalog and conversion journeys remain available; this is not a proven blocked journey.
- PR #133 is the bounded remediation candidate. Local integrated candidate screenshots at ~360/393/400 px show the primary navigation visible without apparent page-level horizontal displacement.
- `F01_LOCAL_CANDIDATE_VISUAL_VALIDATION = PASS`; supplied lower-page screenshot also shows no required content covered by the floating dock. Production validation pending.

### M5-01-F02 — Home has no explicit skip-to-content link

- Evidence: `SOURCE_LEVEL`
- Severity: `P2 / KEYBOARD ACCESSIBILITY`
- Home has semantic header/nav/main, but no explicit skip link.
- Exact-project pages already implement the pattern.
- Runtime remediation candidate: PR #133, `READY / NOT_MERGED`.
- Local rebuilt integrated candidate: first Tab exposes the skip link and Enter moves DOM focus to `#conteudo`; `document.activeElement.id === "conteudo"`.
- `F02_LOCAL_CANDIDATE_VALIDATION = PASS`; production validation pending.

### M5-01-F10 — Home stage-badge contrast is insufficient for two states

- Evidence: `SOURCE_LEVEL / STATIC_CONTRAST_CALCULATION`
- Severity: `P2 / COLOR CONTRAST`
- Current Home badge text is 10px, bold, white.
- `Pronto para Morar`: white on `#15864f` = approximately `4.61:1` — passes the 4.5:1 normal-text threshold.
- `Em construção`: white on `#d96322` = approximately `3.65:1` — fails the 4.5:1 normal-text threshold.
- `Lançamento`: white on `#a97a00` = approximately `3.84:1` — fails the 4.5:1 normal-text threshold.
- Remediation must preserve semantic stage distinction; changing text, stage facts or availability semantics is out of scope.

### M5-01-F11 — Home light-footer secondary text contrast is insufficient

- Evidence: `SOURCE_LEVEL / STATIC_CONTRAST_CALCULATION`
- Severity: `P2 / COLOR CONTRAST`
- Home footer background is `#ddd8cd`.
- Disclaimer/address `#77736b` ≈ `3.32:1`.
- Contact text `#8f8b82` ≈ `2.39:1`.
- Contact links `#9a968d` ≈ `2.08:1`.
- Contact strong `#b7b2a8` ≈ `1.49:1`.
- These are small-text treatments and do not meet the 4.5:1 normal-text threshold.
- Exact-project footers use dark backgrounds with materially stronger contrast; this finding is specific to the Home light-footer palette.


### M5-01-F13 — Home small gold helper text is slightly below contrast threshold

- Evidence: `SOURCE_LEVEL / STATIC_CONTRAST_CALCULATION`
- Severity: `P2 / COLOR CONTRAST`
- The base Home eyebrow color `#8b6b12` on `#f4f1e9` is approximately `4.42:1` at 11px.
- The zone helper color `#856710` on `#ece8df` is approximately `4.35:1` at 10px.
- Both are below the 4.5:1 threshold for normal text.
- PR #135 now includes a bounded remediation to `#80600e`, yielding approximately `5.17:1` on `#f4f1e9` and `4.77:1` on `#ece8df`.
- Dark-section eyebrow overrides remain Tegra yellow and are not changed.

### M5-01-F12 — CAPIITOLO ARIA tab widgets are incomplete for keyboard users

- Evidence: `SOURCE_LEVEL`
- Severity: `P2 / KEYBOARD + ARIA SEMANTICS`
- Both CAPIITOLO controls declare `role="tablist"`, and dynamically-created controls declare `role="tab"` with `aria-selected`.
- The current implementation changes scenes/tipologies on click only.
- It does not implement the expected tab keyboard model (Left/Right, and optionally Home/End), does not rove `tabindex`, and does not associate tabs with a corresponding `role="tabpanel"` through `aria-controls` / `aria-labelledby`.
- Because the UI opts into ARIA tab semantics, native-button tabbing alone does not complete the tab pattern.
- Scope is limited to the CAPIITOLO gallery and typology selector; content, images, product facts and Form 46 are unaffected.


### M5-01-F14 — CAPIITOLO mobile horizontal overflow

- Evidence: `USER_REPORTED_LOCAL_RUNTIME / VISUAL`
- Severity: `P2 / MOBILE LAYOUT`
- The initial integrated candidate showed page-level horizontal overflow around 393–440 px, clipping the hero H1/header pilot.
- PR #137 was extended with a bounded mobile-hero remediation: smaller mobile H1 clamp, `min-width:0` for nav flex children, and bounded/wrapping pilot badge.
- No global `overflow-x:hidden` workaround was used.
- Re-tested locally at 360, 375, 393 and 440 px: no page-level horizontal displacement was observed and the H1/pilot remained inside the viewport.
- Production validation remains pending.

### M5-01-F15 — Home fixed dock overlaps Form 46 under high zoom / short reflow

- Evidence: `USER_REPORTED_LOCAL_RUNTIME / VISUAL`
- Severity: `P2 / REFLOW + INTERACTION OBSTRUCTION`
- Initial 200% zoom validation showed the fixed lead/WhatsApp dock covering required Form 46 controls.
- The first `max-height:520px` guard hid the dock too early at 125% and was rejected.
- PR #145 narrows the guard to `max-height:400px`.
- Final local candidate validation: 125% retains the dock; 200% hides it; Form 46 remains fully visible and unobstructed.
- `F15_LOCAL_CANDIDATE_VALIDATION = PASS`; production validation pending.

### M5-01-F16 — CAPIITOLO fixed dock overlaps content under high zoom / short reflow

- Evidence: `USER_REPORTED_LOCAL_RUNTIME / VISUAL`
- Severity: `P2 / REFLOW + INTERACTION OBSTRUCTION`
- Initial 200% zoom validation showed the fixed `Receber condições` + WhatsApp controls covering required CAPIITOLO content.
- PR #137 now applies a CAPIITOLO-specific `max-height:400px` guard at the `runtime.js` injection source.
- Final local candidate validation: 150% retains both fixed controls; 200% hides them; Form 46 remains fully visible and unobstructed.
- `F16_LOCAL_CANDIDATE_VALIDATION = PASS`; production validation pending.

### M5-01-F17 — Shared exact-project fixed dock overlaps content under high zoom / short reflow

- Evidence: `USER_REPORTED_LOCAL_RUNTIME / VISUAL`
- Severity: `P2 / REFLOW + INTERACTION OBSTRUCTION`
- Elo Duo and Ária both use the shared `.mt-quick-actions` pattern.
- Initial 200% zoom validation showed required content obscured: footer/form content on Elo Duo and lower Form 46 note/content on Ária.
- PR #148 adds one shared `project-page.css` rule: `@media(max-height:400px){body .mt-quick-actions{display:none}}`.
- Final local candidate validation: both routes retain the dock at 150%, hide it at 200%, and leave Form 46/footer content unobstructed.
- `F17_LOCAL_CANDIDATE_VALIDATION = PASS`; production validation pending.

### M5-01-C10 — Ária gallery has explicit keyboard navigation

- Evidence: `SOURCE_LEVEL`
- State: `POSITIVE_CONTROL`
- Ária uses native buttons for thumbnails and previous/next controls.
- The gallery also handles `ArrowLeft` / `ArrowRight` at the gallery container and updates `aria-current` on the active thumbnail.
- This does not by itself prove screen-reader behavior, but source-level keyboard navigation is present.


## 4. Findings resolved in current main

### M5-01-F03 — Stage-filter accessible state

State: `RESOLVED / MERGED`

Current `src-greenn/moretegra.js` updates `aria-pressed` on `[data-filter-status]` together with visual active state.

### M5-01-F04 — Home floating action dock / consent collision

State: `RESOLVED / MERGED`

PR #123 standardized the mobile action dock and consent offset. Current main uses a yellow `Receber condições` action plus circular WhatsApp action and consumes `--mt-consent-offset`.

### M5-01-F05 — Vertical campaign video aspect ratio

State: `RESOLVED / MERGED`

Current mobile CSS uses `aspect-ratio: 9/16`, with larger-screen overrides.

### M5-01-F06 — Location CTA covering map

State: `RESOLVED / MERGED + GOVERNED_STANDARD`

Map actions are outside the map viewport. The current commercial standard intentionally makes project maps neighborhood-level WhatsApp-only click surfaces; direct Maps navigation is forbidden.

### M5-01-F07 — Ária unreliable place_id query

State: `RESOLVED / MERGED`

Current Ária source uses a neighborhood query for `Higienópolis, São Paulo, SP`, consistent with the governed neighborhood-level map standard.

### M5-01-F08 — CAPIITOLO intent selector affordance

State: `RESOLVED / MERGED`

Current form/select treatment is preserved as an explicit form control; PR #123 supplied the bounded remediation and is merged.

### M5-01-F09 — Footer/address visual consistency

State: `RESOLVED / MERGED`

PRs #123–#130 standardized the commercial footer/address treatment. Exact visible address is footer-only and muted; JSON-LD may retain governed exact address.

## 5. Runtime/deployment context

The latest SEO runtime change is merged in `main` at:

`353f4a5dba058f2fb60fd4001128f8c857cd6fce`

Its Vercel Git status is currently:

`PROVIDER_BLOCKED / build-rate-limit`

This does not invalidate repository/source findings. It means the newest SEO content is not yet proven deployed. M5 remediations from PR #123 and later footer standardization predate that blocked deployment.

## 6. Remaining runtime/device verification

Canonical execution matrix: `docs/ux/MNT_M5_01_RUNTIME_DEVICE_VERIFICATION_MATRIX_2026-09-19.md`.

Local CAPIITOLO candidate evidence is recorded in `docs/ux/MNT_M5_01_CAPIITOLO_LOCAL_VALIDATION_2026-09-19.md`.

Local Home candidate evidence is recorded in `docs/ux/MNT_M5_01_HOME_LOCAL_VALIDATION_2026-09-19.md`.

Shared Elo Duo/Ária reflow evidence is recorded in `docs/ux/MNT_M5_01_SHARED_EXACT_PROJECT_REFLOW_VALIDATION_2026-09-20.md`.

Elo Duo/Ária representative mobile-width evidence is recorded in `docs/ux/MNT_M5_01_EXACT_PROJECT_MOBILE_VALIDATION_2026-09-20.md`.

Still `NOT_OBSERVED` as an accessibility acceptance set:

- representative keyboard focus order across Home and exact-project pages;
- full keyboard operation;
- screen-reader announcements;
- 200% text resize / browser zoom on routes not yet locally exercised (Home and CAPIITOLO dock/Form46 cases now locally PASS);
- measured color contrast for states not covered by the static calculations above;
- adjacent touch-target spacing;
- cross-browser/device horizontal-overflow behavior beyond the locally exercised Chrome emulation matrix; Home, CAPIITOLO, Elo Duo and Ária now have local representative-width evidence;
- screen-reader-level interpretation of gallery/tab interaction.

The Product Authority's latest local ZIP visual smoke is treated only as `USER_REPORTED_LOCAL_SMOKE = PASS`, not as proof of the checks above.

## 7. Current severity table

```text
P0 = 0 open proven
P1 = 0 open proven
P2 = 10 open source/runtime findings
P3 = 0 open proven

RESOLVED = F03–F09
REMEDIATION_READY_NOT_MERGED = F01–F02 / PR #133
NEW_STATIC_CONTRAST_FINDINGS = F10–F11 + F13
NEW_KEYBOARD_ARIA_FINDING = F12
NEW_MOBILE_OVERFLOW_FINDING = F14 / LOCAL_CANDIDATE_PASS
NEW_REFLOW_OBSTRUCTION_FINDING = F15 / PR #145 / LOCAL_CANDIDATE_PASS
NEW_CAPIITOLO_REFLOW_FINDING = F16 / PR #137 / LOCAL_CANDIDATE_PASS
NEW_SHARED_EXACT_PROJECT_REFLOW_FINDING = F17 / PR #148 / LOCAL_CANDIDATE_PASS
REMEDIATION_READY_NOT_MERGED = F01/F02 -> PR #133; F10/F11/F13 -> PR #135; F15 -> PR #145; F17 -> PR #148; F12/F14/F16 -> PR #137
RUNTIME_DEVICE_RESIDUALS = OPEN
```

## 8. Gate state

```text
MNT_M5_01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
RUNTIME_REMEDIATION_REQUIRED = NOT_YET_ADJUDICATED
WBS_PROGRESS_CHANGE = NO
NEXT = representative runtime/device accessibility verification and queued fresh release gates for PR #133, PR #135, PR #145, PR #148 and PR #137 after the pending SEO runtime is validated
```

Do not start M5-02 merely by sequence until M5-01 reaches its own acceptance gate.
