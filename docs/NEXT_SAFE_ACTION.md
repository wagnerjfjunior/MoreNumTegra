# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-22`.

```text
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6-07
MNT-M6 = ACTIVE / PAID_MEDIA_FROZEN

LATEST_RUNTIME_SHA = 124b620855175a583c528733462d6d0f4f44cd41
PRODUCTION_SOURCE_SHA = 124b620855175a583c528733462d6d0f4f44cd41
PRODUCTION_DEPLOYMENT = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
PRODUCTION_STATE = READY

PROGRAM_PROGRESS = 1008 / 1240h = 81.29%
AUTHORIZED_FUTURE_SEARCH_CEILING = R$ 1,000 / 30 days
AUTHORIZED_FUTURE_CONFIGURED_DAILY_TOTAL = R$ 32/day
AUTHORIZED_FUTURE_MAX_CPC = R$ 10
AUTHORIZED_ADS_SPEND_NOW = R$ 0
EXTERNAL_ADS_MUTATIONS = 0
```

## Paid-media state

Product Authority accepted the complete M6-06 policy and then froze paid media.

Future Search policy remains canonical:

```text
bidding = Maximize Clicks
max CPC = R$ 10
geo = São Paulo city
language = Portuguese
Search Partners = OFF initially
Display expansion = OFF
Broad = NOT_AUTHORIZED
AI Max = NOT_AUTHORIZED
conversion = Secondary / observe only
```

Future Google Ads M6-07 preflight target designated by Product Authority:

```text
customer_id = 560-869-4042
display_name = SWL Consultoria de imoveis
state = USER_DESIGNATED_TARGET / NOT_YET_M6_07_PREFLIGHT_VALIDATED
```

The user-provided screenshot showed an overdue-balance warning and ads not serving. Billing remediation is deferred while paid media is frozen.

## GA4 audience setup

Manual GA4 audience creation is COMPLETE and screenshot-observed.

Evidence:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_COMPLETION_2026-09-22.md`

```text
GA4 audience manual setup = COMPLETE
remarketing activation = DEFERRED
remarketing spend = R$ 0
```

There is no remaining zero-spend audience-creation action required in M6.

## Explicitly frozen/deferred

```text
Google Ads campaign creation = FROZEN
keyword upload = FROZEN
budget/bid mutation = FROZEN
conversion-action mutation = FROZEN
Search activation = FROZEN
remarketing activation = FROZEN
Meta paid media = NOT_AUTHORIZED
Looker Studio connection/dashboard = DEFERRED
```

M6-07 may resume only after a new explicit Product Authority decision.
