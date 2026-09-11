# MNT-M2-09 — GA4 Asset Creation T2 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `T2 / PRODUCT-AUTHORITY GA4 DESTINATION CREATION`
- Canonical main at task start: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Working branch: `feat/mnt-m2-09-tracking-implementation`

## 1. Created destination

Provider-native screenshots supplied by Product Authority prove:

```text
Property name: MoreNumTegra
Property ID: 553742649
Web stream URL: https://moretegra.com.br
Stream ID: 15759638334
Measurement ID: G-57M2XR0CY2
Reporting timezone: São Paulo / GMT-03:00
Currency: BRL
Industry: Serviços imobiliários
Enhanced Measurement: OFF
```

The stream UI showed collection not active at creation time, consistent with no Google tag/GA4 destination having been published yet.

## 2. Windsor.ai post-creation observation

After creation, the connected `googleanalytics4` Windsor scope exposed:

```text
553742649 | MoreNumTegra
```

A data read against the new property returned no rows while collection remained inactive. This is consistent with the current implementation state and is not treated as failure.

## 3. GTM / Green relationship

Separate provider/runtime evidence supplied by Product Authority proves:

- Green Sales has `GTM-PGCR4R47` registered for MORETEGRA;
- runtime inspection on `moretegra.com.br` observed one distinct `GTM-PGCR4R47` container with normal GTM lifecycle events;
- the GTM workspace Tags view contained only the three accepted Consent Mode tags before GA4 workspace preparation;
- no prior Google tag / GA4 event tag was visible;
- Workspace Changes was `0` at that observation point.

Therefore the bounded architecture remains:

```text
project source -> canonical mnt_* dataLayer event -> GTM-PGCR4R47 -> G-57M2XR0CY2
```

Do not add the GA4 Measurement ID directly to Green Sales and do not introduce a second GTM container.

## 4. Page-view contract

Enhanced Measurement is OFF at the GA4 stream.

The GTM Google tag must also use:

```text
send_page_view = false
```

The canonical source `mnt_page_view` is the sole project-owned page-view occurrence and is mapped explicitly to the GA4 `page_view` destination event.

## 5. Current implementation state

Branch implementation now includes the bounded deterministic source instrumentation for:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

No form/lead event is implemented.

The exact non-published GTM build specification is recorded in:

`docs/measurement/MNT_M2_09_GTM_GA4_WORKSPACE_BUILD_SHEET_2026-09-11.md`

The current ChatGPT toolset has no authenticated GTM write connector, so no claim is made that the GTM workspace was mutated by ChatGPT.

## 6. Explicit non-claims

This T2 evidence does not prove:

- GA4 event collection is active;
- GTM GA4 tags have been created provider-side;
- GTM has been published beyond accepted Version 4;
- denied/granted GA4 network behavior;
- form lifecycle signals;
- verified native Green Form 46 success;
- Meta Dataset/Pixel/CAPI;
- Ads conversion configuration;
- end-to-end Measurement acceptance.

## 7. Current classification

```text
GA4_PROPERTY_ID = PROVEN / 553742649
GA4_STREAM_ID = PROVEN / 15759638334
GA4_MEASUREMENT_ID = PROVEN / G-57M2XR0CY2
GA4_ENHANCED_MEASUREMENT = OFF / PROVEN
SOURCE DETERMINISTIC SLICE = IMPLEMENTED ON DRAFT BRANCH
GTM_GA4_WORKSPACE_SPEC = PREPARED
GTM_GA4_PROVIDER_WORKSPACE_MUTATION = NOT_YET_EVIDENCED
GTM_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
```

MNT-M2-09 remains `ACTIVE / PARTIAL_IMPLEMENTED`.