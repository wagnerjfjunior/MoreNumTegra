# MNT-M2-09 — GTM / GA4 Workspace Build Sheet — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Product Authority scope: prepare GA4 configuration in `GTM-PGCR4R47` for `G-57M2XR0CY2`, with `send_page_view=false`, without GTM publication and without form/lead events.
- Canonical production host: `moretegra.com.br`
- GTM container: `GTM-PGCR4R47`
- Accepted published consent baseline: Version 4
- GA4 Property ID: `553742649`
- GA4 Stream ID: `15759638334`
- GA4 Measurement ID: `G-57M2XR0CY2`
- Publication by this slice: `FORBIDDEN`

## 1. Existing workspace baseline to preserve

Observed before this slice:

```text
Workspace Changes = 0

CONSENT - Default Denied - All Pages
CONSENT - Deny - Cancelar
CONSENT - Grant - Continuar
```

No pre-existing Google tag, GA4 event tag, Meta tag or Google Ads tag was observed in the supplied Tags view.

The three accepted Consent tags and their Version 4 behavior must remain unchanged by this slice.

## 2. Google tag to prepare

Create one Google tag:

```text
Name: GA4 - Google Tag - MoreNumTegra
Tag ID: G-57M2XR0CY2
Configuration parameter:
  send_page_view = false
```

The `send_page_view=false` configuration is mandatory because project page-view measurement is owned by the explicit canonical source event `mnt_page_view`. An automatic GA4 page view plus an explicit event path would violate the single-project-page-view contract.

Trigger target:

```text
Name: INIT - MoreNumTegra - Canonical Host
Type: Initialization
Condition: Page Hostname equals moretegra.com.br
```

Do not use `www.moretegra.com.br` or the Vercel hostname as an eligible project Measurement host.

Consent boundary:

- preserve the accepted Consent Mode state machine;
- do not add a second consent implementation;
- do not alter the three existing Consent tags;
- denied/granted destination-network behavior must be inspected in GTM Preview before any later publish gate;
- this build sheet does not authorize publication or a silent Basic-vs-Advanced Consent Mode policy change.

## 3. Data Layer Variables

Use Data Layer Variable Version 2 for the project parameters below.

Common envelope:

```text
DLV - mnt_event_id
DLV - mnt_event_version
DLV - page_identity
DLV - product_identity
DLV - route
DLV - funnel_stage
DLV - placement
```

Event-specific controlled parameters:

```text
DLV - section_target
DLV - filter_dimension
DLV - filter_value
DLV - result_count
DLV - search_state
DLV - intent_type
DLV - contact_channel
DLV - project_name
DLV - offer_name
```

Do not create variables for visitor name, email, telephone, raw form fields, free-form message text or raw catalogue search text.

`mnt_event_id` is a correlation/debug field. Do not register it as a GA4 reporting custom dimension under this slice because of its intentionally high cardinality.

## 4. Custom Event triggers

Create one exact source trigger per canonical event implemented by this slice. Add `Page Hostname equals moretegra.com.br` as a defense-in-depth condition.

```text
CE - mnt_page_view
  Custom Event = mnt_page_view

CE - mnt_section_click
  Custom Event = mnt_section_click

CE - mnt_catalog_filter
  Custom Event = mnt_catalog_filter

CE - mnt_catalog_search
  Custom Event = mnt_catalog_search

CE - mnt_intent
  Custom Event = mnt_intent
```

Do **not** create triggers for:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Those remain evidence-gated.

## 5. GA4 Event tags

### 5.1 Canonical project page view

```text
Name: GA4 - Event - page_view <- mnt_page_view
Measurement ID / destination: G-57M2XR0CY2
GA4 Event Name: page_view
Trigger: CE - mnt_page_view
Parameters:
  mnt_event_id       = {{DLV - mnt_event_id}}
  mnt_event_version  = {{DLV - mnt_event_version}}
  page_identity      = {{DLV - page_identity}}
  product_identity   = {{DLV - product_identity}}
  route              = {{DLV - route}}
  funnel_stage       = {{DLV - funnel_stage}}
  placement          = {{DLV - placement}}
```

This is the only authorized project-owned GA4 `page_view` path in this workspace design.

### 5.2 Section click

```text
Name: GA4 - Event - mnt_section_click
Event Name: mnt_section_click
Trigger: CE - mnt_section_click
Parameters: common envelope + section_target
```

### 5.3 Catalogue filter

```text
Name: GA4 - Event - mnt_catalog_filter
Event Name: mnt_catalog_filter
Trigger: CE - mnt_catalog_filter
Parameters: common envelope + filter_dimension + filter_value + result_count
```

### 5.4 Catalogue search

```text
Name: GA4 - Event - mnt_catalog_search
Event Name: mnt_catalog_search
Trigger: CE - mnt_catalog_search
Parameters: common envelope + search_state + result_count
```

Raw typed search text must never be mapped.

### 5.5 Commercial/contact intent

```text
Name: GA4 - Event - mnt_intent
Event Name: mnt_intent
Trigger: CE - mnt_intent
Parameters: common envelope + intent_type + contact_channel + project_name + offer_name
```

`project_name` and `offer_name` are sent only when the source event contains project context.

## 6. Conversion boundary

This workspace slice does not configure GA4 Key Events or Google Ads conversions.

Project semantics remain:

```text
PRIMARY = mnt_lead_success only, not implemented yet
SECONDARY = allowlisted mnt_intent types under the project contract
NONE = page/section/filter/search/project_interest/form-start/submit-attempt
```

Destination event delivery must not redefine lead validity.

## 7. Explicit exclusions

Do not add or configure in this slice:

- a second GTM container;
- direct `gtag()` in project code;
- direct Google tag/GA4 ID in Green Sales;
- automatic GA4 page view;
- GA4 Enhanced Measurement re-enable;
- GA4 Key Events;
- Google Ads tags, links or conversion actions;
- Meta Pixel/Dataset/CAPI;
- form-start, submit-attempt or lead-success events;
- user-provided data / enhanced conversions;
- monetary lead value.

## 8. Pre-publish QA gate

The GTM workspace must remain unpublished after preparation.

Before any future Submit/Publish authorization, GTM Preview / Tag Assistant must prove at minimum:

1. the three accepted Consent tags still behave as Version 4 requires;
2. the Google tag uses `G-57M2XR0CY2` and `send_page_view=false`;
3. no Google destination is configured with another Measurement ID;
4. only `moretegra.com.br` is project-measurement eligible;
5. one source `mnt_page_view` produces exactly one GA4 `page_view` event tag firing;
6. each other supported `mnt_*` source event produces no more than one intended GA4 event dispatch;
7. denied/granted network behavior is observed and adjudicated before publication;
8. no visitor PII or raw catalogue search text appears in Data Layer or GA4 event parameters;
9. no form/lead event is present;
10. no Meta/Ads tag was introduced.

MNT-M2-10 remains the owner of full end-to-end acceptance proof.

## 9. Tooling boundary of this chat

The current ChatGPT toolset has authenticated GitHub and analytics connectors but no authenticated Google Tag Manager write connector. Therefore this document is the exact workspace build specification; no claim is made that the GTM workspace itself was mutated by ChatGPT.

The Product Authority's authorization permits the workspace preparation, but actual GTM UI changes must be separately evidenced after they are applied. No GTM publication is authorized.