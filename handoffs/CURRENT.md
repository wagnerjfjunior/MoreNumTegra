# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-M5-10-ARIA-HERO-CANDIDATE1-AB.md`

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
MNT-M5-10 = ACTIVE / ARIA_HERO_CANDIDATE1_LIVE / TARGET_PASS / PERFORMANCE_DIRECTION_INCONCLUSIVE / PRODUCT_DECISION_REQUIRED
```

Candidate 1 is the Product Authority-supplied Ária residential-access image.

Contemporaneous control:

- LCP median = `1,853 ms`;
- score = `95`;
- total transfer = `535,700 B`;
- hero transfer ~= `83,042 B`.

Candidate 1 Production:

- attempt 1 median = `2,149 ms` / `+15.97%`;
- attempt 2 median = `1,464 ms` / `-20.99%`;
- both attempts pass `LCP <=2,500 ms`;
- deterministic hero transfer ~= `99.5 KB`, about `+16.5 KB / +19.85%`;
- total transfer ~= `552.25 KB`, about `+3.09%`;
- opposite LCP directions mean no speed win/loss is proven;
- descriptive pooled candidate 10-run median ~= `1,818 ms`, essentially tied with the five-run control but not treated as a controlled 10-run comparison;
- GTM/GA4/Form46/gallery/canonical contracts preserved;
- zero QA Form46 lead submissions.

The rooftop-pool image supplied by Product Authority was **not tested** and remains outside the current slice.

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

No M5-10 task hours are accepted from this A/B.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Current gate: STOP before runtime mutation. Product Authority must decide whether Candidate 1 is retained or the prior Ária hero is restored. The rooftop-pool candidate remains untested and not automatically authorized.
