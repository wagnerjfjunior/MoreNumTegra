# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver o estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_BEFORE_THIS_DOCS_CHANGE = d7b37bb3a510258d93850ffeae8eebb0be3856b6
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9

MNT-M4-05R = COMPLETE / ACCEPTED
MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 784
REMAINING_FORECAST_HOURS = 456
ACCEPTED_PERCENT = 63.23
```

## 2. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_SOURCE_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_STATE = READY
CURRENT_RATE_LIMIT_BLOCK = NO
```

The newer docs-only `main` state did not replace runtime because Vercel's Ignored Build Step canceled the documentation deployment as designed.

## 3. M5-01

M5-01 remains closed under:

`docs/sfjm/MNT_M5_01_PRODUCTION_ACCEPTANCE_CLOSURE_2026-09-20.md`.

The two accepted evidence residuals remain explicit and are not converted into PASS.

## 4. M5-02 performance baseline

Canonical evidence:

`docs/performance/MNT_M5_02_PRODUCTION_PERFORMANCE_BASELINE_2026-09-20.md`

Diagnostic run:

```text
RUN = 35538473832
RESULT = SUCCESS
ARTIFACT = 10612579543
METHOD = Lighthouse 13.5 mobile / 393x852 / simulated throttling / 3 runs per route / medians
```

Lab medians:

| Route | LCP | LCP target | CLS | CLS target |
|---|---:|---|---:|---|
| Home | 1,346 ms | PASS | 0.0131 | PASS |
| CAPIITOLO | 5,493 ms | FAIL | 0.0012 | PASS |
| Elo Duo | 8,234 ms | FAIL | 0.0299 | PASS |
| Ária Higienópolis | 5,357 ms | FAIL | 0.0281 | PASS |

Field CWV/INP is `NOT_OBSERVED`. The PageSpeed/CrUX probe returned HTTP 429 provider quota; TBT is not substituted for INP.

The project-page LCP elements are hero JPEG images and Lighthouse reports material image-delivery savings. This is evidence for the next strategy task, not runtime-remediation authority.

## 5. Form 46 / Measurement / Search

No Form 46 submission, GTM mutation, SEO/canonical change, DNS change, commercial-content change or runtime code mutation occurred in M5-02.

## 6. Immediate next safe action

Authority: `docs/NEXT_SAFE_ACTION.md`.

Obtain explicit Product Authority authorization before starting **MNT-M5-03 — Media/image/video performance strategy**.

Do not start M5-03 by sequence alone. Do not perform M5-10 performance remediation from M5-02 evidence.
