# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-20`.

Fonte canônica: GitHub `main`. Resolver o estado live antes de qualquer mutação.

## 1. Estado integrado

```text
CANONICAL_MAIN_AT_M5_03_START = 0114b386b5fe9b58287e40424eb50947f6fa1f95
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9

MNT-M5 = ACTIVE
MNT-M5-01 = COMPLETE / ACCEPTED_WITH_EXPLICIT_RESIDUALS
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-04 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 800
REMAINING_FORECAST_HOURS = 440
ACCEPTED_PERCENT = 64.52
```

## 2. Production / Vercel

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_SOURCE_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_STATE = READY
```

M5-03 is docs/strategy only and does not change the effective runtime.

## 3. M5-02 baseline retained

| Route | LCP | LCP target | CLS | CLS target |
|---|---:|---|---:|---|
| Home | 1,346 ms | PASS | 0.0131 | PASS |
| CAPIITOLO | 5,493 ms | FAIL | 0.0012 | PASS |
| Elo Duo | 8,234 ms | FAIL | 0.0299 | PASS |
| Ária Higienópolis | 5,357 ms | FAIL | 0.0281 | PASS |

Field CWV/INP remains `NOT_OBSERVED`; TBT is not used as INP.

## 4. M5-03 media strategy

Canonical strategy:

`docs/performance/MNT_M5_03_MEDIA_IMAGE_VIDEO_PERFORMANCE_STRATEGY_2026-09-20.md`

Key decisions:

- hero/LCP media must be directly discoverable in initial HTML;
- use pre-generated responsive AVIF/WebP variants with JPEG fallback;
- keep large binaries outside GitHub;
- authorized GDigital/S3 or another authorized media/CDN origin is preferred for derivatives;
- do not add blanket preloads;
- preserve lazy loading below the fold and use dedicated thumbnail derivatives;
- keep CAPIITOLO video disabled on mobile, Save-Data and reduced-motion;
- do not replicate CAPIITOLO client fetch/parse/document.write bootstrap on new project pages;
- image optimization precedes any GTM tuning as the first performance-remediation strategy;
- M5-10 is still not authorized.

Recommended future M5-10 slice order, if separately authorized:

1. Elo Duo hero;
2. Ária hero + first gallery asset;
3. CAPIITOLO hero + heavy below-fold images;
4. optional CAPIITOLO bootstrap flattening assessment after image-only evidence.

## 5. Form 46 / Measurement / Search

No Form 46 submission, GTM mutation, SEO/canonical change, DNS change, commercial-content change or runtime mutation occurred in M5-03.

## 6. Immediate next safe action

Authority: `docs/NEXT_SAFE_ACTION.md`.

Obtain explicit Product Authority authorization before starting **MNT-M5-04 — Regression of filters, touch and mobile controls**.

Do not perform M5-10 performance remediation from the M5-03 strategy without a separate explicit authorization.
