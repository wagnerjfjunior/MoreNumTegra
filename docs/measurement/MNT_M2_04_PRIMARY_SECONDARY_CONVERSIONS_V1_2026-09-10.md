# MNT-M2-04 — Primary and Secondary Conversions v1

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-04 — Define primary and secondary conversions`
- Mode: `DESIGN_ONLY / NO_RUNTIME_MUTATION`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-10`
- Canonical main resolved before execution: `8c68ea8406a88cb84f873f364c0305a3eba5f7ab`
- Taxonomy dependency: `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`
- Transport dependency: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`
- RESF provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`
- RESF C11 template consulted: `docs/frameworks/resf/templates/TRACKING_CONTRACT.template.yaml`
- Runtime mutation by this task: `NONE`
- Status when this revision is integrated into canonical `main`: `COMPLETE`

## 1. Purpose

Classify the already-governed MoreNumTegra semantic events as primary conversion, secondary conversion, or non-conversion without changing event meaning and without activating any destination.

Preserve:

```text
PROJECT CONVERSION ROLE != GA4 KEY EVENT CONFIGURATION
PROJECT CONVERSION ROLE != GOOGLE ADS PRIMARY/SECONDARY ACTION SETTING
PROJECT CONVERSION ROLE != META STANDARD EVENT MAPPING
CONVERSION DEFINED != CONVERSION IMPLEMENTED
SECONDARY CONVERSION != VERIFIED LEAD
CTA / WHATSAPP / SUBMIT ATTEMPT != VERIFIED LEAD
```

Destination ownership/configuration remains MNT-M2-05/MNT-M2-06; runtime implementation remains MNT-M2-09; end-to-end proof remains MNT-M2-10; paid-media optimization/attribution semantics remain governed later by MNT-M6.

## 2. Project-level conversion-role enum

Canonical roles:

```text
PRIMARY
SECONDARY
NONE
```

Meaning:

- `PRIMARY` = the business outcome the V1 lead-generation experience is ultimately designed to produce;
- `SECONDARY` = explicit high-intent contact/request behavior that is materially closer to the business outcome but does not prove lead creation;
- `NONE` = discovery, consideration, diagnostic, funnel-progress, or pre-success behavior that must not be represented as a project conversion.

The project-level role is a semantic contract. Vendor platforms may have similarly named settings, but those settings are not automatically authorized or configured by this document.

## 3. Canonical classification

| Source event / condition | Project role | Rationale |
|---|---|---|
| `mnt_lead_success` | `PRIMARY` | only verified successful Green Form 46 lead registration represents the V1 business outcome |
| `mnt_intent` + `request_conditions` | `SECONDARY` | explicit request to receive conditions, but no lead success yet |
| `mnt_intent` + `request_project_conditions` | `SECONDARY` | explicit project-specific request, but no lead success yet |
| `mnt_intent` + `negotiate_scenario` | `SECONDARY` | explicit commercial negotiation intent, but no lead success yet |
| `mnt_intent` + `schedule_visit` | `SECONDARY` | explicit visit/contact intent through form or WhatsApp, but no verified lead registration |
| `mnt_intent` + `whatsapp_contact` | `SECONDARY` | explicit outbound contact intent, but click/open does not prove a conversation or lead |
| `mnt_intent` + `project_interest` | `NONE` | selecting a project/card establishes context and intent progression, not a contact outcome |
| `mnt_form_submit_attempt` | `NONE` | submit initiation may fail validation, network, application processing or Green registration |
| `mnt_form_start` | `NONE` | funnel diagnostic only |
| `mnt_catalog_filter` | `NONE` | consideration/diagnostic event |
| `mnt_catalog_search` | `NONE` | consideration/diagnostic event |
| `mnt_section_click` | `NONE` | content/navigation engagement only |
| `mnt_page_view` | `NONE` | discovery baseline only |

No other event or parameter combination is a conversion in v1 unless a later governed revision explicitly changes this contract.

## 4. Primary conversion — hard validity contract

The sole v1 primary conversion is:

```text
mnt_lead_success
```

Validity remains exactly as defined by MNT-M2-03:

```text
ONLY VERIFIED NATIVE GREEN FORM 46 SUCCESS -> PRIMARY CONVERSION
CTA CLICK -> NOT PRIMARY
WHATSAPP OPEN/CLICK -> NOT PRIMARY
FORM START -> NOT PRIMARY
FORM SUBMIT ATTEMPT -> NOT PRIMARY
NETWORK REQUEST START -> NOT PRIMARY
GREEN /page/view -> NOT PRIMARY
```

A stable, non-invasive Green Form 46 success signal remains `NOT_YET_PROVEN` in canonical project evidence. Therefore:

```text
PRIMARY_CONVERSION = DEFINED
PRIMARY_CONVERSION_RUNTIME_SIGNAL = NOT_YET_PROVEN
PRIMARY_CONVERSION_IMPLEMENTATION = BLOCKED UNTIL SIGNAL IS PROVEN
```

This does not prevent MNT-M2-04 from being complete as a design/classification task.

## 5. Secondary conversion contract

Secondary conversion classification is intentionally restricted to explicit commercial/contact intents. It does not imply a lead exists.

Allowed secondary conditions are only these `mnt_intent.intent_type` values:

```text
request_conditions
request_project_conditions
negotiate_scenario
schedule_visit
whatsapp_contact
```

`project_interest` is explicitly excluded because the current card action can establish a selected project and move the visitor toward the form without proving that a contact request was actually submitted.

Secondary conversions may later be useful for funnel diagnostics, audience analysis or constrained bidding experiments, but MNT-M2-04 does not authorize any vendor optimization against them.

## 6. Non-conversion funnel signals

The following remain useful Measurement events while carrying `conversion_role = NONE` conceptually:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent(project_interest)
mnt_form_start
mnt_form_submit_attempt
```

They exist to explain funnel behavior, not to inflate business outcomes.

In particular, `mnt_form_submit_attempt` must remain non-conversion because counting it as a lead or secondary conversion would hide failed submissions and could train future optimization toward attempts rather than accepted outcomes.

## 7. Conversion value / revenue policy

No monetary conversion value is assigned in v1.

```text
LEAD_CONVERSION_VALUE = NOT_DEFINED
PROPERTY_CARD_PRICE != CONVERSION_VALUE
OFFER_PRICE != REVENUE
CURRENCY_PARAMETER_FOR_CONVERSION_VALUE = NOT_REQUIRED
```

The site does not complete an e-commerce property transaction. Property prices or promotional values must never be reused as conversion value.

Any later business-value model for leads requires an explicit governed attribution/paid-media decision and evidence; it belongs outside MNT-M2-04.

## 8. Destination boundary

MNT-M2-04 activates no destination and assigns no vendor administrative setting.

```text
GA4_KEY_EVENT_CONFIGURATION = NOT_AUTHORIZED_BY_M2_04
GOOGLE_ADS_CONVERSION_ACTION = NOT_AUTHORIZED_BY_M2_04
META_EVENT_MAPPING = NOT_AUTHORIZED_BY_M2_04
GREEN_PIXEL_MAPPING = NOT_AUTHORIZED_BY_M2_04
```

Future destination mappings must preserve these project semantics. For example, a vendor may receive a recommended standard name later, but it may not reinterpret `mnt_form_submit_attempt` as a verified lead.

Project-level `PRIMARY`/`SECONDARY` must not be mechanically copied into Google Ads action settings before the later MNT-M6 attribution/paid-media contract decides optimization semantics.

## 9. Counting and deduplication obligations

Source-layer identity remains governed by MNT-M2-02/MNT-M2-03:

- one semantic source event per user occurrence;
- one `mnt_event_id` per logical source occurrence;
- canonical-host enforcement remains required;
- no duplicate project event due to UI synchronization;
- destination-native dedup/counting rules remain destination-specific.

For the primary conversion, one verified Green Form 46 success occurrence may produce at most one canonical `mnt_lead_success` source event.

MNT-M2-04 does not choose vendor counting options such as one-per-click, every, once-per-session, or Ads primary/secondary optimization. Those are later destination/attribution decisions.

## 10. Consent and privacy

Conversion classification does not bypass the accepted Consent Mode baseline.

The MNT-M2-03 privacy contract remains unchanged:

- no visitor name;
- no email;
- no visitor phone number;
- no raw Form 46 values;
- no raw catalogue search text;
- no hashed PII introduced as ordinary analytics data by this task.

A semantic conversion role does not create permission to transmit data to a destination.

## 11. QA obligations for later implementation

MNT-M2-09/MNT-M2-10 must prove, as applicable:

1. `mnt_lead_success` is emitted only after a stable, verified Green Form 46 success signal;
2. `mnt_lead_success` is not emitted for submit attempts, CTA clicks or network starts;
3. each allowed secondary conversion condition maps from the exact canonical `mnt_intent.intent_type` enum;
4. `project_interest` remains non-conversion;
5. form start/submit attempt remain non-conversion diagnostics;
6. no property/listing price is used as conversion value;
7. one source occurrence does not become duplicate destination conversions unintentionally;
8. consent, canonical-host and PII rules remain intact.

## 12. Relationship to RESF C11

The pinned RESF C11 template requires per-event `primary_conversion` and `secondary_conversion` classification.

MNT-M2-03 supplied event semantics and identities. MNT-M2-04 now supplies the MoreNumTegra project-level conversion-role classification while deliberately leaving `destinations: []` and attribution implementation unresolved.

Therefore:

```text
MNT-M2-04 CONVERSION CLASSIFICATION = COMPLETE WHEN ACCEPTED
RESF C11 FULL TRACKING CONTRACT = STILL PARTIAL
```

The remaining C11 closure dependencies include destination ownership/mapping, runtime implementation, attribution elements where applicable, and validation.

## 13. Exit criteria

MNT-M2-04 may be accepted complete when all are true:

- exactly one primary business conversion is defined;
- secondary conversions are enumerated narrowly;
- non-conversion events are explicitly protected from inflation;
- lead-success validity remains tied to verified Form 46 success;
- no monetary value is invented;
- no vendor destination/configuration is implied as implemented;
- no runtime mutation occurred;
- next task remains separately gated.

This document satisfies those design criteria.

## M5-07 approved specialization — 2026-09-21

The controlled Form 46 choice `Simular forma de pagamento` does **not** create a new conversion semantic. It maps to:

```text
mnt_intent.intent_type = negotiate_scenario
contact_channel = form
project role = SECONDARY
```

The exact CRM/form value remains available in Green Sales. This keeps analytics taxonomy compact and does not change the sole PRIMARY conversion: `mnt_lead_success`.
