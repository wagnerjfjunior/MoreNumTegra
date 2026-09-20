# Handoff — M5-02 Production Performance Baseline

Date: `2026-09-20`

## Canonical/runtime state

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_BEFORE_THIS_DOCS_CHANGE = d7b37bb3a510258d93850ffeae8eebb0be3856b6
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
```

## M5-02

```text
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
RUN = 35538473832
ARTIFACT = 10612579543
```

Lab medians:

```text
HOME       LCP 1346 ms PASS / CLS 0.0131 PASS
CAPIITOLO  LCP 5493 ms FAIL / CLS 0.0012 PASS
ELO DUO    LCP 8234 ms FAIL / CLS 0.0299 PASS
ÁRIA       LCP 5357 ms FAIL / CLS 0.0281 PASS
INP        NOT_OBSERVED
```

The PageSpeed/CrUX probe returned HTTP 429 provider quota on all routes, so no field CWV or INP PASS/FAIL is claimed. TBT is diagnostic only and is not substituted for INP.

The exact-project LCP elements are hero JPEG images. They are already eager, discoverable and high-priority. Lighthouse identifies material image-delivery savings, especially on CAPIITOLO and Ária; Elo Duo has the worst stable LCP despite a smaller absolute image payload, so no single root cause is asserted without the next analysis task.

## Program state

```text
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 784
REMAINING_FORECAST_HOURS = 456
ACCEPTED_PERCENT = 63.23
```

## Next safe action

MNT-M5-03 — Media/image/video performance strategy — remains `PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE`.

MNT-M5-10 performance remediation remains explicitly not authorized.

## Diagnostic lifecycle

```text
PR_180 = CLOSED / NOT_MERGED / DIAGNOSTIC_ONLY
DIAGNOSTIC_HEAD = e4bb61b701ec9baa9affcb8eb0239c07eb1e4eaf
```

The temporary harness was closed after its evidence was canonicalized through PR #181. It never entered runtime.
