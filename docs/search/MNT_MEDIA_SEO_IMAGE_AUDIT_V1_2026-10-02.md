# MNT Media SEO Image Audit v1 — 2026-10-02

Status: IMPLEMENTATION_CANDIDATE

Canonical base at audit start:

```text
main = cabf4321f710faa4dd8c1e0812bee7b62ba20e4f
```

## Objective

Strengthen image semantics across public MoreNumTegra regional and exact-project pages so informative images are factually described, decorative images remain correctly silent, and key media is easier for Search/Image systems to associate with the visible page.

## Acceptance taxonomy

- FORTE — informative image with specific, factual alt text.
- OK_BRAND — brand/logo asset.
- OK_DECORATIVE — decorative image intentionally uses empty alt and accessibility treatment.
- MEDIA_TECH_PENDING — semantics are acceptable but width/height or media-delivery hardening remains.
- STRUCTURAL_GAP — key page media exists in metadata/schema but lacks equivalent static HTML image exposure.

Target:

```text
informative images -> FORTE whenever factual evidence permits
brand/decorative -> correctly classified
ALT_GENERIC -> 0 targeted occurrences
ALT_INCOMPLETE -> 0 targeted occurrences
ALT_FACT_MISMATCH -> 0 targeted occurrences
```

## Audit coverage

The audit covered 262 static image elements across the public regional/exact-project surface reviewed in the 2026-10-02 sequence, including Lapa, Higienópolis, Moema, Brooklin, Perdizes, Jardins, Vila Nova Conceição, Tatuapé, Sacomã, Alto do Ipiranga, Chácara Klabin, Cidade Jardim and Itaim Bibi.

## Implementation slice in this candidate

This candidate is intentionally semantic and bounded:

- strengthen factual alt text on regional and exact-project media;
- strengthen plant alt text with project identity and typology context;
- replace the Helbor-hosted Rua Jardim image with the user-migrated GDigital/S3 asset:
  https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.webp
- align Lapa social-image references that used the same old Helbor asset;
- normalize selected decorative WhatsApp icons to alt="" + aria-hidden="true".

No price, availability, stage, address, Form 46, analytics, canonical, sitemap, routing or commercial-truth changes are intended.

## Explicitly deferred

### CAPIITOLO
Current page has strong og:image metadata but static HTML media exposure remains a separate STRUCTURAL_GAP remediation.

### DSG Itaim
Current page has ImageObject / primaryImageOfPage metadata, but equivalent static HTML media exposure remains a separate STRUCTURAL_GAP remediation.

These two structural remediations are not silently bundled into this semantic-alt slice because governance records them as separately gated runtime/media work.

## Media-delivery residual

Many below-the-fold project/gallery images still omit explicit width/height. That is tracked as MEDIA_TECH_PENDING and should be handled under a bounded responsive-media/performance slice rather than by inventing dimensions.

## YouTube

The Sabrina Tegra Imóveis YouTube channel is retained as a future media/entity input. VideoObject must only be added where a factual corresponding video is visibly embedded on the page.
