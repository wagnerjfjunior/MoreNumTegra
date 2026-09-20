# Handoff — M5-01 Production Acceptance Closed

Date: `2026-09-20`

## Canonical state

```text
REPOSITORY = wagnerjfjunior/MoreNumTegra
BRANCH = main
RUNTIME_SHA_BEFORE_THIS_DOCS_CHANGE = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## M5-01 decision

```text
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 0
P3_OPEN = 0
FINAL_PRODUCTION_MATRIX = 100 PASS / 0 FAIL / 2 NOT_OBSERVED / 102
FINAL_RUN = 35537580700
```

The two `NOT_OBSERVED` items remain explicit accepted residuals, not PASS:

- real screen-reader session — `NOT_OBSERVED / ACCEPTED_RESIDUAL`;
- real physical-device touch validation — `NOT_OBSERVED / ACCEPTED_RESIDUAL`.

No WCAG certification claim follows from this gate.

## Residual WebKit finding

Run `35536868292` against runtime `1d3d7d0f9213586ae8a5a3a015b8afda3ce21603` had one real failure: Home / WebKit / C02-ACCEPT retained focus on the hidden `Aceitar` button.

PR #178 bounded the correction to `src-greenn/preview/runtime.js`. The final Production run `35537580700` against `6aec388443410a2bff4d7c7a8ddff9d90224d8c9` passed the same case with:

```text
hidden = true
stored = granted
hiddenFocus = false
active = Receber condições
```

No evidence supported a second consent handler in `moretegra.js`; the observed issue was treated as WebKit focus/timing behavior.

## Program progress

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 768
REMAINING_FORECAST_HOURS = 472
ACCEPTED_PERCENT = 61.94
```

## Next gate

M5-02 remains `PLANNED / NOT_AUTHORIZED_BY_SEQUENCE`.

The next safe project action is an explicit Product Authority decision on whether to authorize MNT-M5-02. Do not start performance/runtime work merely because M5-01 is complete.

## Temporary diagnostic PR

PR #176 remains diagnostic-only and must never be merged into runtime. Once this closure package is canonical in `main`, close #176.
