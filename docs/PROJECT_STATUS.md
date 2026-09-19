# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-19`.

Fonte canônica: GitHub `main`.

## 1. Estado integrado atual

```text
MAIN_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
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
VERCEL_STATUS = FAILURE / PROVIDER_BLOCKED
VERCEL_REASON = build-rate-limit
LAST_VERIFIED_VERCEL_SUCCESS_SHA = 6e852f1c41ea834aa138e333cef56519f382dc5f
PRODUCTION_EXACT_SHA_AFTER_BLOCK = NOT_REVALIDATED
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

Repository validation passed before merge. Production validation remains pending the Vercel provider block.

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
P2_OPEN = 2
P3_OPEN = 0
RUNTIME_DEVICE_RESIDUALS = OPEN
```

Open findings:

- Home mobile primary navigation hidden below 760px.
- Home lacks explicit skip-to-content.

Resolved findings F03–F09 are documented in the current audit. PR #123 is merged, and later PRs #124–#130 preserve/refine its mobile/footer/map controls.

Audit record: `docs/ux/MNT_M5_01_MOBILE_UX_ACCESSIBILITY_AUDIT_2026-09-19.md`.

## 8. Next action

See `docs/NEXT_SAFE_ACTION.md`.

Complete representative runtime/device accessibility verification for M5-01 and adjudicate the two remaining P2 findings. Do not start M5-02 or create remediation merely by sequence.
