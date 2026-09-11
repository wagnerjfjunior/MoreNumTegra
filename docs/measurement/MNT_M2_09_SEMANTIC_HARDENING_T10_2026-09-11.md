# MNT-M2-09 — Semantic hardening T10 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence class: `SOURCE IMPLEMENTATION + REAL-SOURCE GREEN / TAG ASSISTANT REVALIDATION`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- Production publication by this evidence: `OWNER-CONTROLLED GREEN JS UPDATE OBSERVED BY RUNTIME QA`
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

`scripts/verify-moretegra-release.mjs` additionally guards the v3 semantics:

- FAQ controlled taxonomy must remain present;
- `search_location` must remain controlled and allowlisted;
- raw-search parameter names remain forbidden;
- delegated document listeners must remain present;
- UI/runtime prefix must remain byte-for-byte equal to accepted UI baseline `0ab0de22e2d69bff4b127c2db7f24a1744ea5187`;
- Measurement module and Green artifact tail must remain identical;
- critical interest-gallery/UI markers remain mandatory.

## 5. GTM workspace delta applied in Preview / still unpublished

The owner added the two controlled DLVs and corresponding event-tag parameter mappings in the non-published GTM workspace:

```text
DLV - faq_item        -> faq_item
DLV - search_location -> search_location
```

```text
GA4 - Event - mnt_section_click
  faq_item -> {{DLV - faq_item}}

GA4 - Event - mnt_catalog_search
  search_location -> {{DLV - search_location}}
```

GTM Submit/Publish remains not performed.

## 6. Real-source Green / Tag Assistant revalidation observed

Owner-supplied Tag Assistant screenshots on `moretegra.com.br` prove the following runtime behavior for Measurement v3.

### 6.1 FAQ semantics — PASS

Observed FAQ source events include:

```text
mnt_section_click
funnel_stage = consideration
placement = faq
section_target = faq
faq_item = valores_finais
```

and separately:

```text
mnt_section_click
section_target = faq
faq_item = site_institucional
```

A later FAQ selection after choosing `Château Jardin` showed:

```text
Click Text = Como comparar os empreendimentos? +
_event = mnt_section_click
DLV - section_target = faq
DLV - faq_item = comparar_empreendimentos
DLV - placement = faq
```

The GA4 tag `GA4 - Event - mnt_section_click` fired successfully and its configured event parameter list contained only the common envelope plus:

```text
section_target -> DLV - section_target
faq_item       -> DLV - faq_item
```

It did not include search, filter, intent or project/offer parameters.

Classification: `PASS / EVENT ISOLATION PROVEN FOR MNT_SECTION_CLICK`.

### 6.2 Catalogue search semantics — PASS

Observed recognized search:

```text
mnt_catalog_search
search_state = active
search_location = lapa
result_count = 5
placement = catalog_search
```

Observed unknown/free-form classification:

```text
mnt_catalog_search
search_state = active
search_location = other
result_count = 0
```

No raw free-form search text appeared as a project event parameter.

The GA4 tag `GA4 - Event - mnt_catalog_search` fired successfully and its configured event parameter list contained only the common envelope plus:

```text
search_state
result_count
search_location
```

It did not include FAQ, filter, intent or project/offer parameters.

Classification: `PASS / SEARCH LOCATION CONTROLLED / EVENT ISOLATION PROVEN FOR MNT_CATALOG_SEARCH`.

### 6.3 Project / offer context and intent isolation — PASS

Observed project interest after selecting `Château Jardin`:

```text
mnt_intent
intent_type = project_interest
contact_channel = form
placement = catalog_card
project_name = Château Jardin
offer_name = Château Jardin
```

Observed project conditions request:

```text
mnt_intent
intent_type = request_project_conditions
contact_channel = form
placement = interest_context
project_name = Château Jardin
offer_name = Château Jardin
```

The GA4 tag `GA4 - Event - mnt_intent` fired successfully and its configured event parameter list contained only the common envelope plus:

```text
intent_type
contact_channel
project_name
offer_name
```

It did not include FAQ, search or filter parameters.

Classification: `PASS / PROJECT CONTEXT PROVEN / EVENT ISOLATION PROVEN FOR MNT_INTENT`.

### 6.4 Persistent GTM Data Layer model — EXPECTED / NOT A LEAK

When FAQ was clicked after prior search/filter/project interactions, the Tag Assistant `Variables` and `Data Layer values after this Message` views continued to display previously populated DLV values such as:

```text
project_name = Château Jardin
offer_name = Château Jardin
search_location = other
filter_value = all
intent_type = request_project_conditions
```

This is expected GTM Data Layer model persistence. The per-tag `Tag Details` views prove those unrelated DLVs are not configured into the current GA4 event tag, so they are not evidence of parameter contamination.

No JS cleanup/reset mutation is required or desired for this behavior.

### 6.5 Click correlation — PASS

Observed Tag Assistant ordering now shows the native `Click` immediately before the corresponding canonical source event (`mnt_section_click` or `mnt_intent`) for the tested actions, resolving the previous human-audit ambiguity.

Classification: `PASS / DEBUG CORRELATION HARDENED`.

## 7. T10 adjudication

```text
SOURCE SEMANTICS                 PASS
FAQ SOURCE EVENT                 PASS
FAQ CONTROLLED ITEM              PASS
SEARCH LOCATION                  PASS
UNKNOWN SEARCH -> OTHER          PASS
RAW SEARCH / VISITOR PII         PASS
PROJECT / OFFER CONTEXT          PASS
CLICK CORRELATION                PASS
MNT_SECTION_CLICK TAG ISOLATION  PASS
MNT_CATALOG_SEARCH TAG ISOLATION PASS
MNT_INTENT TAG ISOLATION         PASS
UI REGRESSION SMOKE              PASS (owner-reported after Green rollback/fix and subsequent v3 update)
GTM SUBMIT/PUBLISH               NOT PERFORMED
FORM / LEAD EVENTS               NOT IMPLEMENTED
```

T10 source semantic hardening and the three inspected GA4 event-tag isolation paths are accepted as runtime-proven evidence for the current Draft branch.

This does not by itself make `MNT-M2-09` complete. Remaining task gates include the applicable GTM publication decision/evidence and any other exit criteria still open under the canonical task contract.

`GREEN RUNTIME REVALIDATED != GTM PUBLISHED != MNT-M2-09 COMPLETE`.
