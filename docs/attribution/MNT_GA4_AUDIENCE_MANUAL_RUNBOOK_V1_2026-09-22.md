# MoreNumTegra — GA4 Audience Manual Runbook v1

Date: `2026-09-22`

Status: `MANUAL_EXECUTION_COMPLETE / SCREENSHOT_OBSERVED / ZERO_PAID_SPEND`

Property:

```text
GA4 property = MoreNumTegra
property_id = 553742649
measurement_id = G-57M2XR0CY2
```

Purpose: create governed GA4 audiences now so they can accumulate members before any future remarketing activation.

This runbook does not authorize paid remarketing, Customer Match, CRM/PII upload, Meta audiences, or any change that bypasses the accepted consent architecture.

## 1. Prerequisites

Before creating any audience:

1. Select the exact GA4 property `MoreNumTegra / 553742649`.
2. Confirm the operator has a GA4 property role that can create audiences.
3. Confirm required GA4-visible events are available:
   - `mnt_intent`
   - `mnt_form_start`
   - `generate_lead`

   Project source event `mnt_lead_success` is mapped by GTM to GA4 `generate_lead`; audience rules inside GA4 must use the GA4 destination event `generate_lead`.
4. Confirm audience conditions never use visitor name, email, phone, raw Form 46 values or free text.
5. Preserve the accepted Consent Mode and advertising-personalization rules.

Official GA4 UI path checked on 2026-09-22:

```text
Administrador
-> Exibição de dados
-> Públicos-alvo
-> Novo público-alvo
-> Criar um público-alvo personalizado
```

For each audience, set the name, description, include/exclude conditions and membership duration, review the summary estimate, then save.

## 2. Canonical measurement signals used

The accepted MoreNumTegra taxonomy defines:

```text
mnt_intent
  intent_type
  contact_channel = form | whatsapp
  placement
  funnel_stage = intent

intent_type enum:
  request_conditions
  project_interest
  request_project_conditions
  negotiate_scenario
  schedule_visit
  whatsapp_contact

mnt_form_start
mnt_lead_success
```

Opening WhatsApp is intent, not a verified lead.

## 3. Phase A audiences — create first

### AUD-001 — All eligible visitors | 180d

Name:

```text
MNT | All eligible visitors | 180d
```

Create:

1. New custom audience.
2. Include users when `event_name` exactly matches `page_view`.
3. Membership duration: `180 days`.
4. Save.

Purpose: broad audience-size baseline and future remarketing reservoir.

### AUD-002 — Any exact-project visitor | 180d

Name:

```text
MNT | Project visitors | 180d
```

Include users when `page_view` occurs and `page_location` matches any governed exact-project route:

```text
/empreendimentos/aria-higienopolis/
/empreendimentos/caminhos-da-lapa-elo-duo/
/empreendimentos/capiitolo-piero-lissoni/
```

Use OR logic between routes.

Membership: `180 days`.

Do not include invented/unpublished routes.

### AUD-003 — Ária Higienópolis visitors | 180d

Name:

```text
MNT | Aria Higienopolis visitors | 180d
```

Include:

```text
event_name = page_view
AND
page_location contains /empreendimentos/aria-higienopolis/
```

Membership: `180 days`.

### AUD-004 — Elo Duo visitors | 180d

Name:

```text
MNT | Elo Duo visitors | 180d
```

Include:

```text
event_name = page_view
AND
page_location contains /empreendimentos/caminhos-da-lapa-elo-duo/
```

Membership: `180 days`.

### AUD-005 — CAPIITOLO visitors | 180d

Name:

```text
MNT | CAPIITOLO visitors | 180d
```

Include:

```text
event_name = page_view
AND
page_location contains /empreendimentos/capiitolo-piero-lissoni/
```

Membership: `180 days`.

### AUD-006 — Commercial intent | 90d

Name:

```text
MNT | Commercial intent | 90d
```

Include:

```text
event_name = mnt_intent
AND
intent_type matches one of:
  request_conditions
  request_project_conditions
  negotiate_scenario
  schedule_visit
  whatsapp_contact
```

Exclude `project_interest` from this high-intent audience because the canonical taxonomy classifies it as development-card interest, not stronger contact intent.

Membership: `90 days`.

If the UI requires adding an event parameter, use `Adicionar parâmetro` on `mnt_intent` and select `intent_type`.

### AUD-007 — WhatsApp intent | 90d

Name:

```text
MNT | WhatsApp intent | 90d
```

Include:

```text
event_name = mnt_intent
AND
contact_channel = whatsapp
```

This intentionally includes both general WhatsApp contact and visit scheduling through WhatsApp.

Membership: `90 days`.

Do not treat this audience as leads.

### AUD-008 — Form start without lead | 30d

Name:

```text
MNT | Form start no lead | 30d
```

Include:

```text
event_name = mnt_form_start
```

Add exclusion:

```text
Exclude users permanently when:
event_name = generate_lead
```

Membership: `30 days`.

Purpose: future remarketing for users who started Form 46 but did not produce a verified accepted lead.

### AUD-009 — Lead success suppression | 540d

Name:

```text
MNT | Lead success suppression | 540d
```

Include:

```text
event_name = generate_lead
```

Membership: `540 days`.

Purpose: suppression/exclusion from future acquisition remarketing.

No visitor PII is needed or permitted.

### AUD-010 — Google paid visitors | 90d

Created in advance so it can begin populating automatically when Search traffic starts.

Name:

```text
MNT | Google paid visitors | 90d
```

Condition:

```text
Session source / medium exactly matches google / cpc
```

Membership: `90 days`.

This audience may remain empty while paid media is frozen.

## 4. Phase B audiences — create only after live builder validation

### Multi-project visitor / high exploration

Desired semantic:

```text
user visited at least 2 DISTINCT governed project pages
```

Do not implement this as merely `page_view count >= 2`; that can count two views of the same project.

Acceptable implementation options after live UI validation:

- governed sequence combinations across distinct project paths; or
- a future first-party derived non-PII event specifically approved by Measurement governance.

Until then, use `AUD-006 Commercial intent` as the high-intent behavioral audience.

### Returning visitor

A recurring-visitor audience may be created from GA4's supported returning/visit-count audience logic, but its final threshold must be selected and documented during manual creation.

Do not invent a threshold merely for remarketing.

## 5. Manual creation checklist — repeat for every audience

For each audience:

1. Open `Administrador > Exibição de dados > Públicos-alvo`.
2. Click `Novo público-alvo`.
3. Click `Criar um público-alvo personalizado`.
4. Enter the exact canonical audience name.
5. Add inclusion conditions.
6. Add event parameters when required.
7. Add exclusion conditions where specified.
8. Set membership duration exactly as the registry states.
9. Review the GA4 summary estimate.
10. Save.
11. Return to the audiences table and confirm the audience exists.
12. Capture the audience name, creation time, conditions, duration and visible size/eligibility state as evidence.

## 6. Evidence record to capture

For each created audience record:

```text
property_id
audience_name
include_conditions
exclude_conditions
membership_duration_days
creation_state
current/estimated_size_if_exposed
google_ads_export_eligibility_if_exposed
created_at
operator
```

No audience is considered live until observed in the GA4 audiences table.

## 7. Google Ads export/remarketing gate

Creating audiences now does not activate remarketing.

Before future ad delivery:

1. resolve and validate the exact Google Ads account;
2. prove GA4 <-> Google Ads linkage;
3. confirm advertising-personalization eligibility and consent behavior;
4. confirm the GA4 audience appears in Google Ads;
5. observe provider list size/eligibility;
6. separately authorize remarketing budget/network/creative/frequency;
7. apply lead-suppression audience where appropriate.

## 8. Current paid-media freeze

Product Authority decided on 2026-09-22:

```text
PAID_MEDIA_STATE = FROZEN
SEARCH_SPEND_NOW = R$ 0
REMARKETING_SPEND_NOW = R$ 0
AUDIENCE_ACCUMULATION = ALLOWED
```

The user-designated Google Ads account for future M6-07 preflight is:

```text
customer_id = 560-869-4042
display_name observed = SWL Consultoria de imoveis
status = USER_DESIGNATED_TARGET / NOT_YET_M6_07_PREFLIGHT_VALIDATED
```

A user-provided Google Ads screenshot on 2026-09-22 showed an overdue-balance warning stating ads were not being served. Because paid media is frozen, remediation is deferred. It becomes a mandatory M6-07 preflight item before activation.

## 9. Looker Studio

Looker Studio connection/dashboard work is intentionally deferred.

Future reporting intake should use the existing governed sources:

- GA4 MoreNumTegra;
- Google Search Console MoreNumTegra;
- Google Ads only after the target account is validated;
- no visitor PII.

Dashboard design must not become a source of truth for campaign/product state; canonical project data remains in GitHub and provider metrics remain provider evidence.


## 10. Completion receipt

Manual GA4 audience setup was completed on 2026-09-22 and observed through screenshots.

Canonical evidence:

`docs/attribution/MNT_GA4_AUDIENCE_MANUAL_COMPLETION_2026-09-22.md`

The existing `All Users` audience was retained rather than duplicated. Paid media remains frozen.
