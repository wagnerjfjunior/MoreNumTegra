# MNT-M2-09 — Semantic hardening T10 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `SOURCE IMPLEMENTATION CANDIDATE / RUNTIME REVALIDATION PENDING`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- Production publication by this evidence: `NOT PERFORMED`
- GTM Submit/Publish by this evidence: `NOT PERFORMED`

## 1. Trigger for this hardening

Real-source Green / Tag Assistant QA showed that the delegated Measurement v2 restored the canonical `mnt_*` events, but two semantic/readability gaps remained:

1. FAQ opens had no canonical semantic event;
2. the Tag Assistant timeline could visually associate a source `mnt_*` event with the previous GTM `Click` text because the source event was pushed from a capture-phase delegated listener before GTM completed its native click bookkeeping.

The Product Authority also requested a privacy-safe way to understand recognized location searches without transmitting free-form search text.

## 2. Implemented source behavior

Measurement source is now `v3` in:

`src-greenn/modules/moretegra.measurement.js`

The single Green artifact remains:

`src-greenn/moretegra.js`

The release assembler preserves the accepted UI/runtime prefix byte-for-byte and replaces only the Measurement tail.

### FAQ

Opening a known FAQ emits:

```text
event = mnt_section_click
section_target = faq
faq_item = valores_finais | comparar_empreendimentos | negociar_condicao | site_institucional
placement = faq
```

Closing an already-open FAQ does not emit a new semantic open event. Unknown future FAQ text is classified as controlled `faq_item=other`; raw question text is never sent.

### Catalogue search location classification

`mnt_catalog_search` now permits controlled `search_location` in addition to `search_state`, `result_count` and `placement`.

Known locations are derived at runtime from the rendered canonical catalogue location labels (`.mt-project-location`), which are produced from the project catalogue. This avoids a second manually maintained neighbourhood list inside Measurement.

Normalization is accent-insensitive and case-insensitive. Examples of the intended classification behavior:

```text
lapa -> lapa
HIGIENÓPOLIS -> higienopolis
chacara klabin -> chacara_klabin
zona oeste -> zona_oeste
unrecognized/free-form input -> other
```

The raw user-entered search value is not emitted.

### Project / offer context

`mnt_intent` continues to emit only controlled catalogue-derived context when available:

```text
project_name
offer_name
```

The existing project-name overrides for multi-offer catalogue entries are preserved.

### Tag Assistant correlation/readability

Click-derived semantic pushes are deferred with `setTimeout(..., 0)` after the capture handler records the controlled context. This allows GTM/native click bookkeeping for the current action to complete before the `mnt_*` push is displayed, while preserving delegated listeners on stable `document` and avoiding root-rebind observers.

This is a debugging/correlation hardening; event semantics and conversion classification remain unchanged.

## 3. Privacy / architecture boundaries preserved

Still forbidden / absent from Measurement source:

- visitor name/email/phone;
- form field values;
- raw catalogue search text;
- direct `gtag()`;
- direct `fbq()`;
- `mnt_form_start`;
- `mnt_form_submit_attempt`;
- `mnt_lead_success`.

Canonical-host guard remains exact `moretegra.com.br`. GTM remains the sole project-owned vendor dispatcher.

## 4. Regression protection

`scripts/verify-moretegra-release.mjs` now additionally guards the v3 semantics:

- FAQ controlled taxonomy must remain present;
- `search_location` must remain controlled and allowlisted;
- raw-search parameter names remain forbidden;
- delegated document listeners must remain present;
- UI/runtime prefix must remain byte-for-byte equal to accepted UI baseline `0ab0de22e2d69bff4b127c2db7f24a1744ea5187`;
- Measurement module and Green artifact tail must remain identical;
- critical interest-gallery/UI markers remain mandatory.

## 5. GTM workspace delta still required before destination publication

The source now emits two additional controlled parameters. To carry them to GA4, the unpublished GTM workspace still needs:

```text
DLV - faq_item        -> faq_item
DLV - search_location -> search_location
```

and the following tag parameter additions:

```text
GA4 - Event - mnt_section_click
  faq_item -> {{DLV - faq_item}}

GA4 - Event - mnt_catalog_search
  search_location -> {{DLV - search_location}}
```

No GTM Submit/Publish is authorized or performed by this source change.

## 6. Required real-source revalidation

Before acceptance/merge, publish the exact assembled `src-greenn/moretegra.js` to Green under the applicable owner-controlled gate and re-run Tag Assistant for at least:

1. FAQ open -> `mnt_section_click` with `section_target=faq` and controlled `faq_item`;
2. search `lapa` -> `mnt_catalog_search` with `search_location=lapa`, no raw term;
3. an unknown free-form search -> `search_location=other`, no raw term;
4. project card interest -> `mnt_intent` with correct `project_name` / `offer_name`;
5. floating/form/WhatsApp intents -> current click correlation readable and no previous-click confusion;
6. UI regression smoke: galleries, project conditions context, filters, reset and scroll behavior remain functional.

`SOURCE IMPLEMENTED != GREEN RUNTIME REVALIDATED != GTM PUBLISHED != MNT-M2-09 COMPLETE`.
