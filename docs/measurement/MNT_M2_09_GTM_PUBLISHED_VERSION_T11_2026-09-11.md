# MNT-M2-09 — GTM Published Version T11 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `PRODUCT-AUTHORITY-SUPPLIED GTM PUBLICATION EVIDENCE`
- Date: `2026-09-11`
- Container: `GTM-PGCR4R47`
- GA4 destination: `G-57M2XR0CY2`
- Publication state: `PUBLISHED`

## 1. Published GTM version

Product Authority supplied GTM UI evidence showing:

```text
Version ID: 5
Version name: MNT M2-09 - Measurement v3 - 2026-09-11
Published: 09/11/2026, 4:58 PM (as displayed by GTM UI)
Created:   09/11/2026, 4:58 PM (as displayed by GTM UI)
Version items:
  9 Tags
  8 Triggers
  24 Variables
```

The screenshot also shows the version description identifying:

```text
MoreNumTegra — MNT-M2-09 Measurement v3
GA4 destination: G-57M2XR0CY2
```

and the validated source-event set:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

The screenshot is owner-supplied UI evidence; the displayed 4:58 PM timestamp is recorded exactly as shown and is not independently re-derived from GTM API metadata in this evidence.

## 2. Post-publication workspace state

A second Product Authority-supplied GTM workspace screenshot shows:

```text
Container: web-moretegra.com.br
Container ID: GTM-PGCR4R47
Google tag / destination: MoreNumTegra / G-57M2XR0CY2
Workspace Changes: 0
Pending Changes:
  Modified = 0
  Added    = 0
  Deleted  = 0
```

This supports that the active workspace was clean immediately after Version 5 publication.

## 3. Relationship to pre-publication runtime QA

Before publication, Product Authority supplied real-source Green / Tag Assistant evidence for Measurement v3 showing successful source semantics and isolated GA4 Event-tag mappings for, at minimum:

- FAQ -> `mnt_section_click` with controlled `faq_item`;
- catalogue search -> `mnt_catalog_search` with controlled `search_location` and no raw query parameter;
- project interest / conditions -> `mnt_intent` with `project_name` / `offer_name`;
- click-to-source-event correlation in the current-action order;
- GA4 `mnt_catalog_search`, `mnt_intent` and `mnt_section_click` tags consuming only their intended event-specific parameters plus the common envelope.

The pre-publication runtime evidence and Version 5 publication evidence are distinct proof classes:

```text
PREVIEW / REAL-SOURCE QA != GTM PUBLISHED VERSION
GTM PUBLISHED VERSION != GA4 INGESTION CONFIRMED
```

## 4. What this evidence proves

This T11 evidence supports:

```text
GTM_PUBLISHED_VERSION = 5
GTM_PUBLISHED_VERSION_NAME = MNT M2-09 - Measurement v3 - 2026-09-11
GTM_CONTAINER = GTM-PGCR4R47
GA4_DESTINATION = G-57M2XR0CY2
POST_PUBLICATION_WORKSPACE_CHANGES = 0
```

## 5. What this evidence does not prove by itself

This screenshot package does not independently prove:

- post-publication non-Preview production hits reaching GA4;
- GA4 Realtime / DebugView ingestion after Version 5 publication;
- MNT-M2-09 acceptance / completion;
- MNT-M2-10 end-to-end Measurement validation;
- form start / submit attempt / verified Green lead-success instrumentation;
- GA4 Key Event configuration;
- Google Ads conversions;
- Meta Pixel / Dataset / CAPI.

## 6. Immediate next proof gate

Run a short post-publication production smoke against the normal production page, outside GTM Preview URL parameters, and confirm that Version 5 continues to generate the expected canonical source/GA4 events without UI regression. Where available, confirm corresponding ingestion in GA4 Realtime or DebugView.

Do not infer `MNT-M2-09 COMPLETE` solely from the publication screenshot.
