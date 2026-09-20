# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. O estado live deve ser resolvido novamente antes de qualquer mutação.

## 1. Estado integrado

```text
ACCEPTANCE_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
MNT-M4-05R = COMPLETE / ACCEPTED
MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = PLANNED / NOT_AUTHORIZED_BY_SEQUENCE

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 768
REMAINING_FORECAST_HOURS = 472
ACCEPTED_PERCENT = 61.94
```

M5-01 contributes its governed 16h planning scope only after the acceptance gate was closed.

## 2. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_SOURCE_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_STATE = READY
CURRENT_RATE_LIMIT_BLOCK = NO
```

PR #178 is the latest runtime change in the accepted M5-01 chain.

## 3. M5-01 acceptance

Final Production acceptance run:

```text
RUN = 35537580700
RESULT = SUCCESS
PASS = 100
FAIL = 0
NOT_OBSERVED = 2
TOTAL = 102
P0_OPEN = 0
P1_OPEN = 0
P2_OPEN = 0
P3_OPEN = 0
```

The prior run `35536868292` had one real residual at Home / WebKit / C02-ACCEPT. PR #178 bounded the fix to the consent focus-release path and the final Production run passed the same case.

Explicit residuals retained:

- real screen-reader session: `NOT_OBSERVED / ACCEPTED_RESIDUAL / NOT_PASS`;
- real physical-device touch validation: `NOT_OBSERVED / ACCEPTED_RESIDUAL / NOT_PASS`.

These are accepted as non-blocking for M5-01 only. They are not accessibility certification evidence.

Canonical closure: `docs/sfjm/MNT_M5_01_PRODUCTION_ACCEPTANCE_CLOSURE_2026-09-20.md`.

## 4. Form 46 / measurement

No contract change and no regression evidence.

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

The final matrix validated invalid-input behavior without sending a real lead.

## 5. Search / canonical baseline

No SEO, canonical, DNS, structured-data or commercial-content mutation was part of PR #178 or the M5-01 acceptance closure.

## 6. Immediate next safe action

Authority: `docs/NEXT_SAFE_ACTION.md`.

M5-02 does not become executable by sequence. The next safe action is an explicit Product Authority decision on whether to authorize MNT-M5-02.
