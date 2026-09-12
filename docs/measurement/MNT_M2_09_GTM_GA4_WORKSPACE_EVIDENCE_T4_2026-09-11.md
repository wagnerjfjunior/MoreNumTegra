# MNT-M2-09 — GTM / GA4 Workspace Evidence T4 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `T4 / GTM WORKSPACE PRE-PUBLISH CONFIGURATION`
- Date: `2026-09-11`
- GTM container: `GTM-PGCR4R47`
- Production host: `moretegra.com.br`
- GA4 Measurement ID: `G-57M2XR0CY2`
- Publication state: `NOT_PUBLISHED`
- Product Authority supplied screenshot SHA-256: `a081b284225898eadba451bcc8a7d3c4a79e9f39e7306c2d5599ff5f13044873`

## 1. Observed Google Tag configuration

The Product Authority supplied a GTM workspace screenshot showing the new, unpublished tag:

```text
Tag name: GA4 - Google Tag - MoreNumTegra
Tag type: Google Tag
Tag ID: G-57M2XR0CY2
Configuration parameter: send_page_view
Configuration value: false
Trigger: INIT - MoreNumTegra - Canonical Host
Trigger type shown: Initialization
```

Classification:

```text
GOOGLE_TAG_DESTINATION_ID = PROVEN_IN_WORKSPACE
SEND_PAGE_VIEW_FALSE = PROVEN_IN_CONFIGURATION_SETTINGS
CANONICAL_HOST_INITIALIZATION_TRIGGER = OBSERVED
GTM_PUBLICATION = NOT_PERFORMED
```

The screenshot also shows the tag as `Added in this workspace`, which is consistent with a pre-publish workspace mutation rather than a published container version.

## 2. Architectural significance

This observed configuration is consistent with the accepted MoreNumTegra Measurement architecture:

```text
project source event: mnt_page_view
-> dataLayer
-> GTM-PGCR4R47
-> explicit GA4 page_view event tag
-> G-57M2XR0CY2
```

The Google Tag itself is configured with `send_page_view=false`, preserving the contract that automatic GA4 page-view emission must not create a second project-owned page-view path.

## 3. What this evidence does NOT prove

This screenshot does not by itself prove:

- the exact trigger condition `Page Hostname equals moretegra.com.br` inside the trigger editor;
- denied/granted destination-network behavior;
- any GA4 event tag for `mnt_page_view` or other `mnt_*` events;
- the Data Layer Variables;
- the five Custom Event triggers;
- runtime dispatch to GA4;
- one-and-only-one GA4 `page_view` at runtime;
- absence of PII in runtime payloads;
- GTM publication;
- MNT-M2-09 completion;
- MNT-M2-10 acceptance.

Those remain subject to the pre-publish QA contract and later end-to-end proof.

## 4. Current adjudication

```text
MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED
GOOGLE_TAG_WORKSPACE_PREPARATION = PARTIALLY_PROVEN
GTM_SUBMIT_OR_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
FORM_OR_LEAD_EVENTS = NOT_IMPLEMENTED
META_OR_ADS_TAGS = NOT_IMPLEMENTED
```

Next safe workspace actions under the already authorized bounded slice are to prepare the approved Data Layer Variables, exact `mnt_*` Custom Event triggers and GA4 Event tags, while keeping the workspace unpublished. Before any future publication gate, GTM Preview / Tag Assistant must validate consent-state behavior, host eligibility, event multiplicity and payload hygiene.
