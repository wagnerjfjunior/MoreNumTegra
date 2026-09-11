# MNT-M2-09 — GTM / GA4 Workspace Tags T5 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `T5 / PRODUCT-AUTHORITY-SUPPLIED GTM WORKSPACE UI EVIDENCE`
- Date: `2026-09-11`
- GTM container: `GTM-PGCR4R47`
- GA4 Measurement ID: `G-57M2XR0CY2`
- Publication state: `NOT PUBLISHED BY THIS EVIDENCE`

## 1. Purpose

Record the owner-supplied GTM workspace screenshots after the bounded, non-published GA4 workspace preparation authorized for MNT-M2-09.

This evidence proves workspace configuration visible in the GTM UI. It does **not** prove runtime firing, network delivery, consent behavior of the new Google destination, or production publication.

## 2. Google tag observed

Observed configuration:

```text
Tag name: GA4 - Google Tag - MoreNumTegra
Tag type: Google Tag
Tag ID: G-57M2XR0CY2
Configuration parameter:
  send_page_view = false
Trigger:
  INIT - MoreNumTegra - Canonical Host
```

The canonical-host trigger had already been corrected in the supplied Triggers view to:

```text
Page Hostname equals moretegra.com.br
```

## 3. GA4 Event tags observed

### 3.1 Canonical page view

```text
Tag: GA4 - Event - page_view - mnt_page_view
Type: Google Analytics: GA4 Event
Measurement ID: G-57M2XR0CY2
Event name: page_view
Trigger: CE - mnt_page_view
Parameters:
  mnt_event_id       -> {{DLV - mnt_event_id}}
  mnt_event_version  -> {{DLV - mnt_event_version}}
  route              -> {{DLV - route}}
  funnel_stage       -> {{DLV - funnel_stage}}
  placement          -> {{DLV - placement}}
  page_identity      -> {{DLV - page_identity}}
  product_identity   -> {{DLV - product_identity}}
```

The earlier mistaken mapping of `mnt_event_version` to `DLV - mnt_event_id` was corrected before this T5 evidence.

### 3.2 Section click

```text
Tag: GA4 - Event - mnt_section_click
Event name: mnt_section_click
Trigger: CE - mnt_section_click
Parameters:
  common envelope + section_target
```

Observed parameter mapping matches the M2-09 build sheet.

### 3.3 Catalogue filter

```text
Tag: GA4 - Event - mnt_catalog_filter
Event name: mnt_catalog_filter
Trigger: CE - mnt_catalog_filter
Parameters:
  common envelope + filter_dimension + filter_value + result_count
```

Observed parameter mapping matches the M2-09 build sheet.

### 3.4 Catalogue search

```text
Tag: GA4 - Event - mnt_catalog_search
Event name: mnt_catalog_search
Trigger: CE - mnt_catalog_search
Parameters:
  common envelope + search_state + result_count
```

No raw catalogue search text is configured as an event parameter.

### 3.5 Intent

```text
Tag: GA4 - Event - mnt_intent
Event name: mnt_intent
Trigger: CE - mnt_intent
Parameters:
  common envelope + intent_type + contact_channel + project_name + offer_name
```

Observed parameter mapping matches the M2-09 build sheet.

## 4. Relationship to Google tag

Each supplied GA4 Event-tag screenshot shows:

```text
Google tag found in this container
This tag will use the configuration of Google tag MoreNumTegra.
```

This supports a single GA4 destination configuration path through the Google tag for `G-57M2XR0CY2`.

## 5. Explicitly not evidenced

This T5 package does not prove:

- that any of these workspace changes were submitted or published;
- that `mnt_*` events currently exist on the live Green production page;
- that the Google tag or GA4 Event tags fire in Preview;
- that one `mnt_page_view` produces exactly one GA4 `page_view` dispatch;
- denied-vs-granted destination network behavior;
- successful delivery into GA4 DebugView or Realtime;
- absence of every third-party duplicate outside the inspected GTM workspace;
- form-start, submit-attempt or lead-success instrumentation;
- Meta Pixel/Dataset/CAPI configuration;
- Google Ads conversion configuration.

## 6. Next proof gate

Before any GTM Submit/Publish authorization, execute GTM Preview / Tag Assistant and prove at minimum:

1. Google tag resolves to `G-57M2XR0CY2` with `send_page_view=false`;
2. canonical-host gating works;
3. synthetic or real source `mnt_page_view` produces no more than one intended GA4 `page_view` tag firing;
4. each other supported `mnt_*` event produces no more than one intended GA4 Event tag firing;
5. consent state is inspected for default denied, Continue granted and Cancel denied;
6. no visitor PII or raw search text is present;
7. no form/lead, Meta or Ads tag has been introduced by this slice.

Because the source instrumentation is still branch-only staging and the production Green page has not been updated by this slice, Preview may require controlled synthetic `dataLayer.push(...)` events to validate the GTM workspace before production source deployment. Synthetic workspace proof must not be misrepresented as end-to-end production proof.
