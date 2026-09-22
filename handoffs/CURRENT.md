# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-M5-10-ELO-RESPONSIVE-HERO-SLICE08.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LAST_RUNTIME_PR = #219 / MERGED
LATEST_RUNTIME_SHA = 90745255775129638b3d8f061ab067d8ecc1c425
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_6Dw473nRdfcCgAiEBQGAk5Uer6QL
PRODUCTION_SOURCE_SHA = 90745255775129638b3d8f061ab067d8ecc1c425
PRODUCTION_STATE = READY
```

## VALIDATION_STATE

```text
MNT-M5-10 = ACTIVE / SLICE_08_RETAINED / ELO_LAB_LCP_TARGET_MET / NEXT_SLICE_DECISION_REQUIRED
```

Slice 08 responsive hero:

- mobile 393x852 DPR 2.75 selects `hero-mobile-828.webp`;
- hero mobile transfer ~= `72.6 KB`;
- original 160.9 KB hero is not downloaded on mobile;
- desktop keeps the original Green/S3 hero;
- Production QA run `35740314881` = SUCCESS;
- LCP median = `2,383 ms`;
- Slice 07 control = `3,279 ms`;
- improvement = `-896 ms / -27.33%`;
- score median = `92`;
- CLS = `0.0325`;
- lab target `LCP <= 2,500 ms` = PASS;
- GTM/GA4/Form46 contracts preserved;
- zero real Form 46 submissions during QA.

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

No M5-10 task hours are accepted merely from Slice 08.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Current gate: STOP before another runtime mutation. Product Authority must choose the next bounded M5-10 slice.
