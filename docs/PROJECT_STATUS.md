# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-19`.

Fonte canônica: GitHub `main`.

## 1. Estado integrado atual

```text
MAIN_SHA = bee925766398d9d9e629c96cf95511a35f0df175
PR_132 = MERGED
PR_123 = MERGED
MNT-M4-05R = COMPLETE / ACCEPTED
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 752
ACCEPTED_PERCENT = 60.65
```

## 2. Deployment / produção

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
LATEST_MAIN_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
HISTORICAL_VERCEL_STATUS_FOR_353f4a5d = FAILURE / build-rate-limit
CURRENT_MORENUMTEGRA_RATE_LIMIT = NOT_REPROVEN
LAST_VERIFIED_VERCEL_SUCCESS_SHA = 82fd666596b283d1ff5645776ba892abe27885a6
CURRENT_PRODUCTION_DEPLOYMENT = dpl_H6KtyTDQHHAaWxx4FXHSUJBk97HK / READY
PRODUCTION_EXACT_SHA = 82fd666596b283d1ff5645776ba892abe27885a6
PRODUCTION_CONTENT_STATE = CONFIRMED_PRE_PR132 / HTTP_200
```

The Vercel status is a provider capacity/rate-limit block, not evidence of code failure. No artificial commit may be created merely to trigger another deployment.

## 3. PR #132 — semantic on-page SEO

Merged scope:

- Home title: `Apartamentos Tegra em São Paulo | Escolha Tegra`;
- Home H1: `Apartamentos Tegra em São Paulo`;
- CAPIITOLO H1: `CAPIITOLO Tegra Chácara Klabin`;
- CAPIITOLO editorial depth expanded to ~1.1k visible words with governed Garden/parking/location semantics;
- Elo Duo H1: `Elo Duo Tegra — Caminhos da Lapa`;
- Ária H1: `Ária Tegra Higienópolis — apartamentos prontos para morar`.

Repository validation passed before merge. Direct authenticated Vercel fetches on 2026-09-19 confirmed that production is healthy (HTTP 200) but still serves pre-PR #132 markers on Home, CAPIITOLO, Elo Duo and Ária. Evidence: `docs/sfjm/PR132_PRODUCTION_NOT_UPDATED_EVIDENCE_2026-09-19.md`.

## 4. Search / structured data baseline

Previously proven:

```text
GSC_SITEMAP = ACCEPTED
SITEMAP_URLS = 4
SITEMAP_ERRORS = 0
SITEMAP_WARNINGS = 0

HOME_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
ARIA_INDEXATION = INDEXED

CAPIITOLO_RICH_RESULTS = 7_VALID
ELO_DUO_RICH_RESULTS = 7_VALID
ARIA_RICH_RESULTS = 7_VALID
HOME_RICH_RESULTS = 5_VALID
ARIA_GOOGLE_CANONICAL = ACCEPTED
```

Do not reinterpret this historical validation as validation of the undeployed PR #132 content.

## 5. Form 46

The home project-context regression remains closed with Green Sales E2E evidence. Contract remains tenant 313 / form 46 / title `MoreEmUmTegra`.

## 6. M4-05R

```text
M4-05 historical implementation = COMPLETE / MERGED
M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
M4-05R Product Decision = APPROVED
M4-05R Runtime = MERGED
M4-05R Acceptance = COMPLETE / ACCEPTED
M4-05R Additional WBS Hours = 0
```

Canonical record: `docs/sfjm/MNT_M4_05R_ACCEPTANCE_CLOSURE_2026-09-19.md`.

## 7. M5-01

```text
MNT-M5 = ACTIVE
MNT-M5-01 = IN_PROGRESS / AUTHORIZED / SOURCE_REVALIDATED
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 13
P3_OPEN = 0
RUNTIME_DEVICE_RESIDUALS = OPEN
```

Open source-level findings:

- F01 — Home mobile primary navigation hidden below 760px.
- F03 — REOPENED regression: Home stage-filter buttons do not synchronize `aria-pressed`.
- F02 — Home lacks explicit skip-to-content.
- F10 — Home construction/launch stage-badge contrast below 4.5:1.
- F11 — Home light-footer secondary/contact text contrast below 4.5:1.
- F13 — Home small gold helper text slightly below 4.5:1.
- F12 — CAPIITOLO ARIA tab widgets lack complete keyboard/panel semantics.
- F14 — CAPIITOLO mobile horizontal overflow.
- F15 — Home fixed dock overlaps required Form 46 controls under high zoom / short reflow.
- F16 — CAPIITOLO fixed dock overlaps required content/Form 46 under high zoom / short reflow.
- F17 — Elo Duo/Ária shared exact-project dock overlaps required content under high zoom / short reflow.
- F18 — Elo Duo/Ária shared topbar back-link hitbox below governed touch baseline; PR #148 local candidate PASS.
- F19 — Home reduced-motion video retains stale synthetic-button semantics after iframe activation.

Prepared runtime candidates, all NOT_MERGED:
- PR #133 — F01/F02 — Ready; local candidate PASS for mobile navigation, no-overlap criterion and skip-link focus transfer.
- PR #135 — F10/F11/F13 — Ready, stacked on #133.
- PR #145 — F15 — Ready, stacked after #135; local candidate validation PASS (125% dock visible, 200% dock hidden, Form 46 unobstructed).
- PR #148 — F17 — Ready; one shared CSS fix; Elo Duo and Ária local 150%/200% validation PASS, production pending.
- PR #137 — F12/F14/F16 — Ready; local candidate validation PASS for keyboard tabs, mobile overflow and 150%/200% reflow, production pending.

Resolved findings F04–F09 are documented in the current audit. F03 was reopened on 2026-09-20 after direct source revalidation. PR #123 is merged, and later PRs #124–#130 preserve/refine its mobile/footer/map controls.

Audit record: `docs/ux/MNT_M5_01_MOBILE_UX_ACCESSIBILITY_AUDIT_2026-09-19.md`.

## 8. Next action

See `docs/NEXT_SAFE_ACTION.md`.

Preserve the ordered runtime queue (#133 -> #135 -> #145 -> #148 -> #137), continue the Home/runtime-device matrix after the CAPIITOLO local candidate PASS, and do not start M5-02 until M5-01 reaches its own gate. Do not start M5-02 or create remediation merely by sequence.
