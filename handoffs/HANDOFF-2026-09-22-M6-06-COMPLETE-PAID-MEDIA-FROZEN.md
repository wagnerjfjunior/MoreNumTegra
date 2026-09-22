# MoreNumTegra — M6-06 Closure / Paid Media Freeze Handoff

Date: `2026-09-22`

## Canonical closure

```text
MNT-M6-06 = COMPLETE / BUDGET_SPEND_POLICY_AUTHORIZED / PAID_MEDIA_FROZEN
accepted_hours = 8
program_progress = 1008 / 1240h = 81.29%
remaining_forecast = 232h
actual_paid_spend = R$ 0
external_google_ads_mutations = 0
```

Approved future Search envelope:

```text
financial ceiling = R$ 1,000
pilot window = 30 days
configured average daily total = R$ 32/day
bidding = Maximize Clicks
max CPC = R$ 10.00
geo = São Paulo city
language = Portuguese
Search Partners = OFF initially
Display expansion = OFF
Broad = NOT_AUTHORIZED
AI Max = NOT_AUTHORIZED
conversion = Secondary / observe only
```

Stage allocation always reallocates within R$ 32/day:

```text
Stage 1: Ária 20 + Elo 12
Stage 2: Ária 16 + Elo 10 + CAPIITOLO 6
Stage 3: Ária 14 + Elo 8 + CAPIITOLO 5 + Portfolio 5
```

No stage transition is automatic.

## Paid media freeze

Product Authority froze paid media after accepting M6-06 policy.

```text
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6-07
current Search spend = R$ 0
current remarketing spend = R$ 0
```

No Google Ads campaign, ad group, ad, keyword, conversion action, budget or bidding configuration was mutated during M6-06.

## Future Google Ads account

Product Authority designated the following account as the future M6-07 preflight target:

```text
customer_id = 560-869-4042
display_name observed = SWL Consultoria de imoveis
state = USER_DESIGNATED_TARGET / NOT_YET_M6_07_PREFLIGHT_VALIDATED
```

A user-provided screenshot showed an overdue-balance warning and that ads were not being served.

This is not remediated while paid media is frozen.

When M6-07 is resumed, preflight must prove at minimum:

- exact account identity and permissions;
- billing/account serving eligibility;
- GA4 MoreNumTegra linkage;
- auto-tagging;
- expected GA4 `generate_lead` conversion import/state;
- no duplicate lead conversion semantic;
- final URL/UTM compatibility;
- campaigns created paused before any activation.

## GA4 audience accumulation

Audience accumulation remains authorized with zero spend.

Canonical registry:

- `docs/attribution/MNT_M6_AUDIENCE_ACCUMULATION_CONTRACT_V1_2026-09-22.md`
- `docs/attribution/MNT_GA4_AUDIENCE_MANUAL_RUNBOOK_V1_2026-09-22.md`

Current connector limitation:

```text
googleanalytics4 read = AVAILABLE
googleanalytics4 write actions = []
live audience creation through connector = NOT_AVAILABLE
```

Therefore audience creation is a manual GA4 admin procedure.

## Looker Studio

Looker Studio connection/dashboard work is intentionally deferred.

When resumed, it should consume governed provider data and must not become the authority for campaign or product state.

## Next zero-spend action

If Product Authority wants to continue without paid media, the next safe operational action is manual GA4 audience creation using the canonical runbook, followed by live verification that each audience exists and begins populating.

Paid media remains frozen unless Product Authority explicitly reopens M6-07.
