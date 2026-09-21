# MNT-M5-10 — Elo Duo Green Media Slice 01 Authorization

Date: `2026-09-21`

Status: `ACTIVE / SLICE_01_AUTHORIZED / ELO_DUO_TWO_IMAGE_TRIAL`

## Scope authorized by Product Authority

Bounded first M5-10 runtime slice:

1. replace the Elo Duo hero image with the Green/GDigital WebP:
   `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp`
2. replace the current Rua Jardim/complex image with:
   `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp`
3. preserve all other media;
4. preserve Search, Form46, Measurement, CTA/WhatsApp and mobile accessibility;
5. measure exact before/after performance before proceeding to another M5-10 slice.

## Media probe evidence

Run: `35606609562`

```text
current hero
  236596 bytes
  JPEG
  694x930

Green hero candidate
  175392 bytes
  WebP
  1080x1350

current Rua Jardim/complex
  62606 bytes
  WebP
  835x467

Green complex candidate
  83076 bytes
  WebP
  1126x630
```

Observed uploaded source files in the working session:

```text
Fachada PNG = 2821274 bytes / 1080x1350
Complexo PNG = 1318029 bytes / 1126x630
```

The Complexo image was uploaded to Green without manual pre-compression. Green emitted an 83076-byte WebP at the same 1126x630 dimensions, a reduction of about 93.7% from the supplied PNG.

Therefore manual pre-compression is not required as the default migration workflow. Dimension/crop governance remains required.

The hero candidate is about 25.9% smaller than the current hero but still exceeds the preferred <=100 KiB mobile hero budget and the >150 KiB review threshold defined by M5-03. It is authorized for this measured trial, not accepted as the final optimized hero by assumption.

The new complex image is larger than the current 62606-byte asset but remains below the preferred <=120 KiB gallery/main-image budget and is lazy-loaded below the fold.

## Acceptance method

- exact-head checks before merge;
- Production deployment on merge;
- same mobile Lighthouse methodology as M5-02;
- minimum three runs and median comparison;
- record LCP element and image transfer bytes;
- CLS <= 0.1;
- no conversion/Search/accessibility regression;
- simple rollback to previous immutable URLs if results are negative.

No other M5-10 remediation is authorized by this slice.
