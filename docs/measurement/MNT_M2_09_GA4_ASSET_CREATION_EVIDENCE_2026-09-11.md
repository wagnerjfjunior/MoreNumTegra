# MNT-M2-09 — GA4 Asset Creation Evidence — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence source: provider-native Google Analytics screenshots supplied by Product Authority
- Canonical main at task start: `98f92ea3e80770a0e735ee9b105a29b18a706255`

## Proven dedicated GA4 destination

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

The property and web stream were created specifically for the MoreNumTegra production host after the Product Authority confirmed that no dedicated MoreNumTegra GA4 property existed.

The stream creation screen showed GA4 collection as not active, which is expected before the project Google tag / destination configuration is published.

## Post-creation connector corroboration

Windsor.ai subsequently exposed the connected GA4 property entry:

```text
553742649 | MoreNumTegra
```

A data read returned no event rows while collection remained inactive. This corroborates connector visibility of the new property but is not runtime-delivery proof.

## Binding implementation consequence

The GA4 target for MNT-M2-09 is now proven and must not be substituted with an unrelated pre-existing property:

```text
GA4_PROPERTY_ID = 553742649
GA4_STREAM_ID = 15759638334
GA4_MEASUREMENT_ID = G-57M2XR0CY2
```

The accepted transport architecture remains:

```text
project source -> canonical mnt_* dataLayer event -> GTM-PGCR4R47 -> G-57M2XR0CY2
```

Direct `gtag()` project transport remains forbidden.

Because Enhanced Measurement is OFF and the project owns page-view semantics, the GTM Google tag must use `send_page_view=false`; `mnt_page_view` is mapped explicitly to the sole project-owned GA4 `page_view` path.

## Explicit non-claims

This evidence does not prove:

- GA4 collection has started;
- GTM provider-side GA4 workspace changes exist;
- a new GTM version has been published;
- destination consent/network behavior has been validated;
- form/lead lifecycle signals exist;
- Meta Measurement exists;
- Ads conversion configuration exists;
- MNT-M2-09 or MNT-M2-10 is complete.

Current task classification remains:

`MNT-M2-09 = ACTIVE / PARTIAL_IMPLEMENTED`.