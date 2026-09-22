# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-22`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-22-M6-06-COMPLETE-PAID-MEDIA-FROZEN.md`

## REPOSITORY_STATE

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
LAST_RUNTIME_PR = #231 / MERGED
LATEST_RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
```

## DEPLOYMENT_STATE / PRODUCTION_STATE

```text
CANONICAL_HOST = www.moretegra.com.br
PRODUCTION_DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
PRODUCTION_SOURCE_SHA = 124b620855175a583c528733462d6d0f4f44cd41
PRODUCTION_STATE = READY
```

## VALIDATION_STATE

```text
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6-07
MNT-M6 = ACTIVE / PAID_MEDIA_FROZEN
```

## PROGRAM PROGRESS

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1008
REMAINING_FORECAST_HOURS = 232
ACCEPTED_PERCENT = 81.29
```

## M6-06 accepted future envelope

```text
financial ceiling = R$ 1,000 / 30 days
configured average daily total = R$ 32/day
bidding = Maximize Clicks
max CPC = R$ 10
geo/language = São Paulo city / Portuguese
Search Partners = OFF initially
Display expansion = OFF
Broad = NOT_AUTHORIZED
AI Max = NOT_AUTHORIZED
current spend = R$ 0
```

## Future Google Ads target

```text
customer_id = 560-869-4042
display_name = SWL Consultoria de imoveis
state = USER_DESIGNATED_TARGET / NOT_YET_M6_07_PREFLIGHT_VALIDATED
```

User-provided screenshot showed overdue balance and ads not serving. Paid media is frozen, so remediation is deferred to future M6-07 preflight.

## GA4 audiences

Audience accumulation is authorized now with zero spend.

Canonical manual runbook:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_RUNBOOK_V1_2026-09-22.md`

Current GA4 connector is read-only. Manual audience creation is COMPLETE / SCREENSHOT_OBSERVED. Evidence: `docs/attribution/MNT_GA4_AUDIENCE_MANUAL_COMPLETION_2026-09-22.md`.

## Looker Studio

Connection/dashboard work is explicitly deferred.

## NEXT SAFE ACTION

Read `docs/NEXT_SAFE_ACTION.md`.

Manual GA4 audience creation is complete. Paid media remains frozen; M6-07 external Google Ads implementation requires a new explicit Product Authority decision.
