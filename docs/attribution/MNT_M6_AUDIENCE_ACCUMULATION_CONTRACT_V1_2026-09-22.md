# MoreNumTegra — GA4 Audience Accumulation Contract v1

Date: `2026-09-22`

Status: `MANUAL_GA4_AUDIENCE_SETUP_COMPLETE / REMARKETING_ACTIVATION_DEFERRED / PAID_MEDIA_FROZEN / NO_SPEND`

## 1. Product Authority decision

Product Authority explicitly decided that MoreNumTegra should create the governed audiences now so they can begin accumulating members before remarketing budget is activated.

This authorization is bounded to GA4 audience creation/readiness.

It does not authorize:

- remarketing campaign creation;
- Display, YouTube or Search remarketing spend;
- Customer Match uploads;
- CRM/email/phone uploads;
- Meta audiences;
- Meta Pixel/CAPI;
- new PII collection;
- advertising-personalization bypass;
- any relaxation of the accepted consent model.

## 2. Architecture

Preferred V1 path:

```text
MoreNumTegra runtime
-> existing canonical GA4/GTM measurement
-> governed GA4 audiences
-> linked Google Ads account when live linkage is proven
-> future remarketing activation only after separate gate
```

Do not add a parallel direct remarketing tag merely to populate these audiences.

Existing consent and measurement authority remains controlling.

## 3. Audience registry

### AUD-001 — All eligible visitors

```text
name = MNT | All eligible visitors | 180d
include = any user with a page_view on MoreNumTegra
membership = 180 days
purpose = broad future remarketing / audience sizing
activation = DEFERRED
```

### AUD-002 — Ária Higienópolis visitors

```text
name = MNT | Aria Higienopolis visitors | 180d
include = page_location contains /empreendimentos/aria-higienopolis/
membership = 180 days
purpose = project-specific future remarketing
activation = DEFERRED
```

### AUD-003 — Elo Duo visitors

```text
name = MNT | Elo Duo visitors | 180d
include = page_location contains /empreendimentos/caminhos-da-lapa-elo-duo/
membership = 180 days
purpose = project-specific future remarketing
activation = DEFERRED
```

### AUD-004 — CAPIITOLO visitors

```text
name = MNT | CAPIITOLO visitors | 180d
include = page_location contains /empreendimentos/capiitolo-piero-lissoni/
membership = 180 days
purpose = project-specific future remarketing
activation = DEFERRED
```

### AUD-005 — Commercial intent

```text
name = MNT | Commercial intent | 90d
include = event_name = mnt_intent
membership = 90 days
purpose = future high-intent remarketing
activation = DEFERRED
```

No raw CTA text, visitor PII or free-text payload is needed for membership.

### AUD-006 — Form started, no lead

```text
name = MNT | Form start no lead | 30d
include = event_name = mnt_form_start
exclude = GA4 event_name = generate_lead
membership = 30 days
purpose = future high-priority remarketing
activation = DEFERRED
```

The exact GA4 exclusion mode must be configured so a valid lead leaves this acquisition audience.

### AUD-007 — Accepted leads / suppression

```text
name = MNT | Lead success suppression | 540d
include = GA4 event_name = generate_lead
membership = 540 days
purpose = exclusion/suppression from acquisition remarketing
activation = FUTURE_EXCLUSION_ONLY
```

This audience contains analytics user membership only. Do not upload name, phone or email.

### AUD-008 — Google paid visitors

```text
name = MNT | Google paid visitors | 90d
include = source/medium = google / cpc under the accepted attribution contract
membership = 90 days
purpose = future paid-visitor analysis and controlled re-engagement
activation = DEFERRED
```

This audience may initially contain zero users before paid traffic starts.

## 4. Membership rationale

Real-estate consideration can be longer than a short retail purchase path.

V1 therefore uses:

```text
project visit = 180d
commercial intent = 90d
form start without lead = 30d
lead suppression = 540d
paid visitor = 90d
```

These are project policy choices, not claims about provider defaults.

## 5. Consent/privacy boundary

Audience membership must remain subordinate to the accepted MoreNumTegra consent architecture.

Forbidden:

- visitor email;
- visitor phone;
- visitor name;
- raw Form 46 payload;
- free-text CRM notes;
- Customer Match;
- hashed PII;
- fingerprinting;
- cross-device identity invented by the project.

No audience condition may be created from sensitive or ungoverned visitor data.

## 6. Google Ads activation gate

Audience creation now does not equal remarketing activation now.

Before any audience is used for ad delivery:

1. exact MoreNumTegra Google Ads customer account must be resolved live;
2. GA4 <-> Google Ads linkage must be proven;
3. advertising-personalization eligibility/consent behavior must be proven;
4. exported audience must be visible in Google Ads;
5. provider eligibility/list size must be observed;
6. budget for remarketing must be separately authorized;
7. campaign/network/creative/frequency constraints must be approved;
8. suppression audience must be applied where required.

Current Google Ads provider guidance requires at least 100 active visitors/users in the last 30 days for Search, Display and YouTube remarketing eligibility. Provider thresholds may change and must be re-verified at activation time.

## 7. Current execution capability

The connected GA4 data source is read-only in the currently exposed integration.

Therefore:

```text
PRODUCT_AUTHORIZATION = GRANTED
GA4_AUDIENCE_DESIGN = CANONICALIZED
GA4_ADMIN_WRITE_CAPABILITY_IN_CURRENT_RUNTIME = NOT_EXPOSED
AUDIENCES_CREATED_LIVE = SCREENSHOT_OBSERVED / MANUAL_SETUP_COMPLETE
REMARKETING_CAMPAIGNS = ZERO
REMARKETING_SPEND = R$ 0
```

Manual GA4 admin screenshots now provide live creation evidence. Connector-side admin write remains unavailable.

## 8. Relationship to M6

This bounded authorization may be executed as an audience-readiness prerequisite to M6-07 without authorizing the remainder of M6-07.

M6-06 budget/spend policy remains independently gated.

M6-07 campaign/conversion/account mutations remain unauthorized except for this explicitly bounded GA4 audience-creation authorization.

## 9. Acceptance evidence for live audience creation

For each audience, capture:

- exact GA4 property = MoreNumTegra / 553742649;
- exact audience name;
- exact include/exclude logic;
- membership duration;
- creation state;
- estimated/current audience size if exposed;
- export eligibility/link state;
- no PII conditions;
- consent/personalization eligibility state;
- timestamp.

No audience is considered live solely because this contract exists.


## 10. Live capability retest — 2026-09-22

A second live capability test was executed after Product Authority requested a retest.

Observed connector state:

```text
connector = googleanalytics4
connected property = 553742649 / MoreNumTegra
connector read access = AVAILABLE
connector write actions = []
create_audience = NOT_EXPOSED
update_audience = NOT_EXPOSED
delete_audience = NOT_EXPOSED
GA4 admin mutation through current connector = NOT_AVAILABLE
```

The connector catalog explicitly returned an empty write-action list for `googleanalytics4`.

Therefore:

```text
AUDIENCE_CREATION_AUTHORIZATION = GRANTED
LIVE_GA4_AUDIENCE_CREATION = BLOCKED_BY_CURRENT_CONNECTOR_CAPABILITY
REMARKETING_SPEND = R$ 0
```

This is a provider/tooling capability constraint, not a project-code failure and not evidence that GA4 itself lacks audience administration.


## 11. Manual execution runbook

Because the live `googleanalytics4` connector exposes no write actions, use the canonical manual procedure:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_RUNBOOK_V1_2026-09-22.md`

Product Authority froze paid media after M6-06 closure. Audience accumulation remains allowed; Search and remarketing spend remain R$ 0 until explicit reopening.


## 12. Manual creation completion

Manual creation was completed and observed in the GA4 audience list on 2026-09-22.

Evidence:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_COMPLETION_2026-09-22.md`

Important destination-event rule:

```text
project source = mnt_lead_success
GA4 destination = generate_lead
GA4 audience lead rules = generate_lead
```

Paid media and remarketing remain frozen.
