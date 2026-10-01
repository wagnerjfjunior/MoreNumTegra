# PR #325 — Mozae Rich Results correction — 2026-10-01

## Scope

Bounded structured-data correction for:

`/empreendimentos/mozae-higienopolis/`

## Traceability

```text
PR = #325 / MERGED
validated head = 0489a5f439ae6d89dc7215ef549b8e3fdae280b4
merge/runtime SHA = c96b5e0118414e579a4d89d4cf4e05b2468ea4e0
Production deployment = dpl_BRDUZmji53c86zET1DpZQKvvts5Q
Production state = READY
canonical host = https://www.moretegra.com.br/
```

## Trigger

Google Rich Results Test showed:
- Product snippets = valid;
- Merchant listings = invalid because `Product.image` was missing;
- Organization/PostalAddress = valid with optional postalCode warning.

## Delivered

- added `Product.image` using the existing governed Mozae primary image;
- added verified `postalCode = 01232-010` to Mozae exact-address PostalAddress nodes;
- added CEP to the governed visible footer address only;
- preserved canonical, Form 46, GTM, price, lifecycle and layout;
- intentionally did not add review, aggregateRating or availability because they are optional and were not independently governed facts for the referenced unit.

## Validation

```text
Commercial page standard validation = PASS
Social sharing metadata validation = PASS
Favicon standard validation = PASS
M5-06 CTA/Form journey = RED / pre-existing global validator debt
```

M5-06 failures remained the known global Bem Moema/map expectations and were unrelated to this structured-data delta.

## Production validation

Observed after deployment on:
`https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/`

- HTTP 200;
- Product.image present in live JSON-LD;
- postalCode 01232-010 present in both exact-address PostalAddress nodes;
- footer CEP present;
- canonical preserved;
- Form 46 preserved;
- GTM preserved;
- runtime errors in checked 1h window = NONE OBSERVED.

## Address evidence

The CEP 01232-010 was verified before mutation against current Tegra-hosted location content and an official São Paulo State publication for Rua Conselheiro Brotero, 832.

## Next action

Re-run Google Rich Results Test against the production URL to confirm Merchant Listings no longer reports the missing-image critical error. Google-side recrawl/processing remains external and is not implied by deployment.
