# MNT-M5-10 — Elo Duo Hero Preload Slice 02

Date: `2026-09-21`

Status: `ACTIVE / SLICE_02_AUTHORIZED / HERO_PRELOAD_EXPERIMENT`

## Product Authority decision

The Product Authority selected continuation of Elo Duo optimization after Slice 01 and authorized additional bounded attempts to reduce LCP.

## Evidence basis

Preserved Slice 01 Production winner:

- compact Green hero: `160,918 B`;
- five-run median Lighthouse LCP: `3,947 ms`;
- target: `<= 2,500 ms`.

New diagnostic evidence supplied for this continuation:

- Pingdom HAR uses Chromium 61 and is not suitable for validating native `loading="lazy"` behavior;
- the HAR still shows the selected hero as a `160,918 B` HTTP/1.1 S3 resource and shows contention on the same S3 origin;
- the supplied modern DevTools trace identifies the compact Green hero as the LCP image;
- that trace is contaminated by browser extensions and therefore is not accepted as the canonical Lighthouse performance result;
- the trace nevertheless records hero discovery after navigation rather than as a head preload;
- the page source places the hero element after a substantial head containing metadata/JSON-LD/GTM.

## Slice 02 single runtime variable

Add exactly one explicit preload for the already-selected compact Green hero:

```html
<link rel="preload" as="image"
      href="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp"
      fetchpriority="high">
```

Preserve:

- the same hero URL and `160,918 B` payload;
- the same hero dimensions;
- `fetchpriority="high"` on the visible `img`;
- no hero lazy loading;
- S3 preconnect;
- complex/Rua Jardim asset;
- Search, Form 46, Measurement, Consent, CTA/WhatsApp, schema, accessibility and commercial content.

## Validation contract

1. exact-head static gates;
2. inspect PR diff for single runtime variable;
3. merge only after lifecycle gate;
4. Production deployment must be READY on the exact merge SHA;
5. run the same five-run mobile Lighthouse methodology used for Slice 01;
6. compare median LCP, performance score and transfer bytes against the compact baseline;
7. retain only if evidence is non-regressive; otherwise rollback the preload.

No responsive derivative, image URL change, Azure preconnect removal, GTM change or unrelated optimization is part of this slice.
