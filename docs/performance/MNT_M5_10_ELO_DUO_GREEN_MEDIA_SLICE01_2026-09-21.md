# MNT-M5-10 — Elo Duo Green Media Slice 01 Authorization

Date: `2026-09-21`

Status: `SLICE_01_COMPLETE / KEEP_ASSETS / IMPROVEMENT_OBSERVED / LCP_TARGET_NOT_MET`

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


## Production implementation and measurement result

Runtime PR:

`#200 — merged`

Runtime SHA:

`a43431ce65468a70a06844452fc17589fb49c68d`

Production deployment:

`dpl_5nz8h9AzHNqYAwM9aaw12xorVrUX / READY`

All exact-head gates passed after metadata/social/structured-data references were aligned to the new hero asset.

Production performance diagnostic:

```text
RUN = 35608067789
RESULT = SUCCESS
ARTIFACT = 10643068494
ARTIFACT_SHA256 = b70526fab31061ae0a1a69d10aa292382a4fd4be39e9acd24a7d7a85eb5caa9e
METHODOLOGY = Lighthouse 13.5.0 / mobile / 393x852 / simulated throttling / 3 runs / median
```

Results:

```text
historical M5-02 Elo LCP median = 8234 ms
slice 01 Elo LCP median = 7486 ms
delta = -748 ms
historical-baseline improvement = 9.1%

slice 01 runs:
  4014 ms
  7759 ms
  7486 ms

CLS median = 0.0357 / PASS
total-byte-weight median = 1076432 B
```

The LCP element is still the Elo Duo hero image.

LCP breakdown on the new hero observed resource-load durations:

```text
run 1 = 471 ms
run 2 = 595 ms
run 3 = 486 ms
median = 486 ms
```

Historical M5-02 observed hero resource-load duration was approximately `1442 ms`.

The Green hero is:

```text
175392 B
1080x1350
WebP
HTTP 200
```

The Green complex image is:

```text
83076 B
1126x630
WebP
HTTP 200
loading = lazy
```

The new hero did not appear as a material item in the Lighthouse image-delivery waste list. The complex image was occasionally estimated at about 18.5 KiB responsive-sizing waste; it remains below the M5-03 preferred <=120 KiB gallery/main-image budget.

## Interpretation

This slice demonstrates that Green/GDigital conversion is sufficient as the default compression path for ordinary media uploads.

Direct evidence:

- raw Complexo PNG supplied in the session = 1318029 B / 1126x630;
- Green output = 83076 B / 1126x630 WebP;
- approximate byte reduction = 93.7%;
- dimensions were preserved.

Therefore:

```text
DEFAULT_UPLOAD_WORKFLOW:
original/source image
-> dimension/crop review
-> upload to Green/GDigital
-> use Green WebP
-> verify output bytes/dimensions
```

Manual pre-compression is not required by default.

Important limitation: Green compresses/formats but does not prove automatic responsive resizing. Dimension and crop governance remain project-owned.

The scored Lighthouse LCP remains above the <=2500 ms target and is highly variable. The historical comparison is useful directional evidence, not a strict same-runtime causal A/B because M5-02 predates later accepted runtime changes.

## Slice decision

```text
SLICE_01 = COMPLETE
ASSET_DECISION = KEEP_GREEN_ASSETS
GREEN_AS_MEDIA_REPOSITORY = VALIDATED_FOR_THIS_WORKFLOW
MANUAL_PRECOMPRESSION_DEFAULT = NOT_REQUIRED
DIMENSION_CROP_REVIEW = REQUIRED
LCP_TARGET = NOT_MET
ADDITIONAL_M5_10_SLICE = NOT_AUTHORIZED_BY_THIS_SLICE
```
