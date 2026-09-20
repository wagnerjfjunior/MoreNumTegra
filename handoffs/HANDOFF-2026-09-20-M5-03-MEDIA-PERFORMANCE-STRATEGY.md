# Handoff — M5-03 Media/Image/Video Performance Strategy

Date: `2026-09-20`

## Canonical/runtime state

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_AT_M5_03_START = 0114b386b5fe9b58287e40424eb50947f6fa1f95
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
```

## M5-03 outcome

```text
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

Canonical strategy:

`docs/performance/MNT_M5_03_MEDIA_IMAGE_VIDEO_PERFORMANCE_STRATEGY_2026-09-20.md`

Core decisions:

- keep hero/LCP media discoverable directly in initial HTML;
- responsive AVIF/WebP with JPEG fallback;
- no large binary media in GitHub;
- use authorized GDigital/S3 or another authorized media/CDN origin for derivatives;
- no blanket hero preload;
- preserve lazy loading below fold;
- dedicated thumbnail derivatives;
- preserve CAPIITOLO mobile/Save-Data/reduced-motion video suppression;
- do not replicate CAPIITOLO fetch/parse/document.write bootstrap for new pages;
- media registry may govern authoring/validation but must not gate LCP at runtime.

Recommended future M5-10 ordering, not authorized:

1. Elo Duo hero;
2. Ária hero + first gallery asset;
3. CAPIITOLO hero + heavy below-fold images;
4. assess CAPIITOLO bootstrap flattening only after image-only evidence.

## Program state

```text
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 800
REMAINING_FORECAST_HOURS = 440
ACCEPTED_PERCENT = 64.52
MNT-M5-04 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
```

## Next safe action

Obtain explicit Product Authority authorization before starting `MNT-M5-04 — Regression of filters, touch and mobile controls`.

Do not execute M5-10 performance remediation from this strategy without a separate explicit authorization.
