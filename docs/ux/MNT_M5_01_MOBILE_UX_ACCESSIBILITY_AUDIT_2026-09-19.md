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
- Decision still required: intentional mobile simplification versus discoverability remediation.

### M5-01-F02 — Home has no explicit skip-to-content link

- Evidence: `SOURCE_LEVEL`
- Severity: `P2 / KEYBOARD ACCESSIBILITY`
- Home has semantic header/nav/main, but no explicit skip link.
- Exact-project pages already implement the pattern.
- Runtime remediation candidate: PR #133, `READY / NOT_MERGED`.

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

### M5-01-F12 — CAPIITOLO ARIA tab widgets are incomplete for keyboard users

- Evidence: `SOURCE_LEVEL`
- Severity: `P2 / KEYBOARD + ARIA SEMANTICS`
- Both CAPIITOLO controls declare `role="tablist"`, and dynamically-created controls declare `role="tab"` with `aria-selected`.
- The current implementation changes scenes/tipologies on click only.
- It does not implement the expected tab keyboard model (Left/Right, and optionally Home/End), does not rove `tabindex`, and does not associate tabs with a corresponding `role="tabpanel"` through `aria-controls` / `aria-labelledby`.
- Because the UI opts into ARIA tab semantics, native-button tabbing alone does not complete the tab pattern.
- Scope is limited to the CAPIITOLO gallery and typology selector; content, images, product facts and Form 46 are unaffected.

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

Still `NOT_OBSERVED` as an accessibility acceptance set:

- representative keyboard focus order across Home and exact-project pages;
- full keyboard operation;
- screen-reader announcements;
- 200% text resize / browser zoom;
- measured color contrast for states not covered by the static calculations above;
- adjacent touch-target spacing;
- horizontal overflow at representative mobile widths;
- gallery/tab interaction on representative mobile browser.

The Product Authority's latest local ZIP visual smoke is treated only as `USER_REPORTED_LOCAL_SMOKE = PASS`, not as proof of the checks above.

## 7. Current severity table

```text
P0 = 0 open proven
P1 = 0 open proven
P2 = 5 open source-level findings
P3 = 0 open proven

RESOLVED = F03–F09
REMEDIATION_READY_NOT_MERGED = F01–F02 / PR #133
NEW_STATIC_CONTRAST_FINDINGS = F10–F11
NEW_KEYBOARD_ARIA_FINDING = F12
RUNTIME_DEVICE_RESIDUALS = OPEN
```

## 8. Gate state

```text
MNT_M5_01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
RUNTIME_REMEDIATION_REQUIRED = NOT_YET_ADJUDICATED
WBS_PROGRESS_CHANGE = NO
NEXT = representative runtime/device accessibility verification, queued release gates for F01/F02 and F10/F11, and bounded remediation design for F12
```

Do not start M5-02 merely by sequence until M5-01 reaches its own acceptance gate.
