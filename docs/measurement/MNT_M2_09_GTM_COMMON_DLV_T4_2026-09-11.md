# MNT-M2-09 — GTM Common Data Layer Variables T4 Evidence — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `T4 / GTM NON-PUBLISHED WORKSPACE PREPARATION`
- Date: `2026-09-11`
- GTM container: `GTM-PGCR4R47`
- Publication by this slice: `NOT AUTHORIZED / NOT PERFORMED`
- Evidence source: Product Authority-supplied GTM Variables screenshot in the implementation session.

## 1. Observed workspace state

The supplied GTM `Variables` screen visibly shows seven User-Defined Variables, all with type `Data Layer Variable`:

```text
DLV - funnel_stage
DLV - mnt_event_id
DLV - mnt_event_version
DLV - page_identity
DLV - placement
DLV - product_identity
DLV - route
```

Classification:

```text
COMMON_DLV_VARIABLE_OBJECTS = OBSERVED_CREATED_IN_GTM_WORKSPACE
COMMON_DLV_COUNT = 7
COMMON_DLV_TYPE = DATA_LAYER_VARIABLE
GTM_PUBLICATION = NOT_PERFORMED
```

## 2. Intended canonical mapping

Per `MNT_M2_09_GTM_GA4_WORKSPACE_BUILD_SHEET_2026-09-11.md`, these objects are intended to map one-to-one to the following Data Layer keys:

```text
DLV - mnt_event_id      -> mnt_event_id
DLV - mnt_event_version -> mnt_event_version
DLV - page_identity     -> page_identity
DLV - product_identity  -> product_identity
DLV - route             -> route
DLV - funnel_stage      -> funnel_stage
DLV - placement         -> placement
```

The list screenshot itself does not expose each variable's internal Data Layer Variable Name nor the selected Data Layer Version. Therefore:

```text
VARIABLE_OBJECT_NAME_AND_TYPE = PROVEN_BY_SCREENSHOT
INTERNAL_KEY_MAPPING = INTENDED_BY_BUILD_SHEET / NOT_RE-PROVEN_BY_THIS LIST VIEW
DATA_LAYER_VERSION_2 = INTENDED_BY_BUILD_SHEET / NOT_RE-PROVEN_BY_THIS LIST VIEW
```

Those details must be verified through individual variable configuration or functional Preview/Tag Assistant evidence before publication acceptance.

## 3. Safety boundary preserved

No variables for visitor PII or raw catalogue search text are visible in the supplied evidence. This slice does not authorize or introduce variables for:

- name;
- email;
- telephone;
- form field values;
- free-form message text;
- raw catalogue search text;
- `mnt_form_start`;
- `mnt_form_submit_attempt`;
- `mnt_lead_success`.

## 4. Next bounded workspace step

Create the nine event-specific controlled Data Layer Variables, still without Submit/Publish:

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

Then create exact Custom Event triggers for the five authorized canonical source events. GTM production publication remains a separate gate.
