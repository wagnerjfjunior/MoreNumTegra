# MNT-M2-09 — Tracking Implementation Evidence — 2026-09-12

Status: `ACCEPTED_COMPLETE` when this revision is integrated into canonical `main`.

## 1. Scope

This evidence closes the Product Authority-authorized `MNT-M2-09 — Implement authorized tracking configuration` scope defined by PR #50 and corrected by PR #52.

The accepted scope is the MoreNumTegra browser-side Measurement path for the canonical Green production host, including Form 46 funnel instrumentation, GA4 delivery, Consent Mode compatibility and verified primary-lead conversion mapping.

Explicitly out of scope for this task remain Meta Pixel/Dataset/CAPI, Google Ads linking/conversions, FECH.AI/n8n/Make, webhook/backend transport and Vercel Production promotion.

## 2. Canonical implementation anchors

```text
PR #50 merge = 6eaacaca9af2c22243d45f20a24e04577ac58ce2
PR #52 exact accepted head = d9c6436ccb7bf063fb1fe2c0d6aad00e43d587bd
PR #52 merge = 70f2b77e93225b65a1972c12875c58bd7198be1d
```

PR #50 established the accepted MNT-M2-09 implementation and explicit completion gate. PR #52 fixed the Green reCAPTCHA-driven submit lifecycle so `mnt_form_submit_attempt` and the lead pending guard use the verified submit-button click rather than relying on a native DOM `submit` event.

## 3. Green production topology

```text
canonical host = moretegra.com.br
page 292 = https://moretegra.com.br/
page 294 = https://moretegra.com.br/obrigado
Form 46 = tenant 313 / form_id 46 / title MoreEmUmTegra
page 292 JS artifact = src-greenn/moretegra.js
page 294 JS artifact = src-greenn/thank-you/obrigado.js
```

Green page 292 accepts one custom-JavaScript payload; therefore `src-greenn/moretegra.js` is the single complete paste-ready artifact. Development modules under `src-greenn/modules/` are not Green publication units.

The native Green Form 46 submission lifecycle remains authoritative. Project code does not replace submission with custom `fetch`, does not stop propagation and does not read/store visitor name, email or phone for Measurement.

## 4. Accepted Google Measurement assets

Observed and adopted for MoreNumTegra:

```text
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
GTM container = GTM-PGCR4R47
Enhanced Measurement = OFF
```

The previously unproven GA4 identifiers from MNT-M2-05 are therefore resolved for the accepted runtime implementation.

## 5. Current GTM publication

Published by Product Authority on 2026-09-12:

```text
GTM Version 7
name = MNT M2-09 - Form Funnel + generate_lead - 2026-09-12
published_at = 2026-09-12 18:25 -03:00
container = GTM-PGCR4R47
version_items = 12 tags / 11 triggers / 28 variables
```

Version 7 adds:

- `CE - mnt_form_start`;
- `CE - mnt_form_submit_attempt`;
- `CE - mnt_lead_success` constrained to `moretegra.com.br` + `/obrigado`;
- DLVs for `form_id`, `form_name`, `form_provider`, `lead_method`;
- `GA4 - Event - mnt_form_start`;
- `GA4 - Event - mnt_form_submit_attempt`;
- `GA4 - Event - generate_lead - mnt_lead_success`.

The accepted mapping is:

```text
source event = mnt_lead_success
GA4 event_name = generate_lead
```

No `form_submit` mapping was added. Green `gtm.formSubmit` remains platform telemetry and is not forwarded as a MoreNumTegra business event.

## 6. Runtime proof

Latest Tag Assistant export observed after Version 7 configuration:

```text
file = tag_assistant_moretegra_com_br_2026_09_12 (12).json
SHA-256 = 7f5625dd8b3d80129c9935d5749793d67c038a51762bd246506fe7f3afec8deb
size = 1,605,135 bytes
```

The live Form 46 journey proved:

```text
mnt_form_start = exactly 1
mnt_form_submit_attempt = exactly 1
native Green submission = success
redirect = /obrigado
mnt_lead_success = exactly 1
GA4 tag generate_lead = execute_succeeded
```

The accepted `mnt_lead_success` payload included only governed non-PII parameters such as event identity/version, page/product identity, route, funnel stage, form metadata, `lead_method` and placement. Visitor name, email and phone were not copied into the project MNT/GA4 payload.

Consent state in the accepted Tag Assistant run showed the four governed consent types granted after the previously validated default-denied flow, with `wasSetLate=false`.

## 7. GA4 proof

GA4 DebugView subsequently showed:

```text
mnt_form_start = 1
mnt_form_submit_attempt = 1
generate_lead = 1
```

`generate_lead` then appeared in GA4 `Eventos recentes` for stream MoreNumTegra and was marked by Product Authority as an `Evento principal` / Key event.

`mnt_form_start` and `mnt_form_submit_attempt` remain non-conversions, preserving MNT-M2-04 semantics.

No monetary lead value is defined and no property/listing price is sent as conversion value.

## 8. MNT-M2-09 acceptance

The seven explicit completion requirements recorded in PR #50 are now satisfied:

1. click-based Form 46 guard synchronized into GitHub;
2. `src-greenn/moretegra.js` regenerated as one complete page-292 artifact;
3. complete artifact published on Green page 292 by Product Authority;
4. real Form 46 submission proved exactly one `mnt_lead_success` on `/obrigado`;
5. project MNT/GA4 payload validated without visitor PII;
6. GTM mapping `mnt_lead_success -> GA4 generate_lead` configured and published in Version 7;
7. one real `generate_lead` hit validated in `G-57M2XR0CY2` and observed in GA4 DebugView.

Therefore:

```text
MNT-M2-09 = COMPLETE / ACCEPTED
accepted scope-equivalent = 24h
MNT-M2-10 = NOT YET AUTHORIZED / NOT YET COMPLETE
```

`MNT-M2-09 COMPLETE != MNT-M2-10 END-TO-END VALIDATED`.

## 9. Residuals / next gate

MNT-M2-10 remains the next Measurement task and must separately prove the full end-to-end QA contract, including canonical-host behavior, duplicate-path absence, denied/granted consent behavior where applicable, source-event uniqueness, privacy boundaries and any destination-specific residuals.

Meta Measurement assets remain outside the completed MNT-M2-09 scope and remain unproven/not implemented unless separately authorized.

Vercel Production remains `MANUAL_GATE_DRIVEN`; its update is a separate homologation action and is not claimed complete by this evidence.
