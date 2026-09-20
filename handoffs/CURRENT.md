# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-20`.

**GitHub `main` / versionado é a fonte canônica.** Resolver o estado live antes de qualquer conclusão ou mutação.

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-20-M5-02-PERFORMANCE-BASELINE.md`

## 1. REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_BEFORE_M5_02_CANONICALIZATION = d7b37bb3a510258d93850ffeae8eebb0be3856b6

PR_176 = CLOSED / NOT_MERGED / M5_01_DIAGNOSTIC_ONLY
PR_177 = MERGED
PR_178 = MERGED / EFFECTIVE_RUNTIME
PR_179 = MERGED / M5_01_DOCS_CLOSURE
PR_180 = OPEN_DRAFT / M5_02_DIAGNOSTIC_ONLY / NEVER_MERGE_TO_RUNTIME
```

PR #180 may be closed only after the M5-02 baseline evidence is canonical in `main`.

## 2. DEPLOYMENT_STATE / PRODUCTION_STATE

```text
WEB_PRODUCTION = Vercel
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
PRODUCTION_SOURCE_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
DOCS_ONLY_MAIN_DEPLOYMENT = CANCELED_BY_IGNORED_BUILD_STEP / EXPECTED
```

## 3. M5 state

```text
MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

M5-02 Production lab baseline:

```text
RUN = 35538473832
HOME LCP = 1346 ms / PASS
CAPIITOLO LCP = 5493 ms / FAIL
ELO DUO LCP = 8234 ms / FAIL
ÁRIA LCP = 5357 ms / FAIL
CLS = PASS on all four routes
FIELD CWV / INP = NOT_OBSERVED / PSI API 429 provider quota
```

## 4. PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 784
REMAINING_FORECAST_HOURS = 456
ACCEPTED_PERCENT = 63.23
```

## 5. FORM 46 / Measurement

No Form 46 contract change and no real lead submission in M5-02. No GTM/GA4 mutation.

## 6. NEXT SAFE ACTION

Authority: `docs/NEXT_SAFE_ACTION.md`.

Obtain explicit Product Authority authorization before starting MNT-M5-03. MNT-M5-10 performance remediation remains not authorized.
