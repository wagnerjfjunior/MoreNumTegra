# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-M5-10-ARIA-HERO-CANDIDATE1.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LAST_RUNTIME_PR = #223 / MERGED
LATEST_RUNTIME_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = https://www.moretegra.com.br/
PRODUCTION_DEPLOYMENT = dpl_AmvdNUQdqA6URbcL8JaWfJyPLmPc
PRODUCTION_SOURCE_SHA = 5a0df7b6757930bf34664d04d66b9a41e841f577
PRODUCTION_STATE = READY
```

## VALIDATION_STATE

```text
MNT-M5-10 = ACTIVE / ARIA_CANDIDATE1_LIVE / PERFORMANCE_INCONCLUSIVE / LCP_TARGET_PASS / SECOND_IMAGE_DECISION_REQUIRED
```

Candidate 1 = residential-access hero only.

- control LCP median = `1,853 ms`;
- candidate attempt 1 = `2,149 ms`;
- candidate attempt 2 = `1,464 ms`;
- both candidate batteries remain <=2,500 ms;
- mobile hero transfer = `~99.5 KB`;
- prior hero transfer = `~83.0 KB`;
- deterministic payload delta = `~+16.5 KB`;
- no functional regression observed;
- rooftop-pool image remains untested and absent from runtime.

Canonical evidence:

`docs/performance/MNT_M5_10_ARIA_HERO_ACCESS_CANDIDATE1_2026-09-22.md`

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

No M5-10 task hours are accepted from this candidate test.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

STOP before second-image/carousel/rotation mutation. Product Authority decision required.
