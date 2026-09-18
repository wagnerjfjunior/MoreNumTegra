# CAPIITOLO — Entity Authority & In-Loco Location Correction — 2026-09-18

Status: `AUTHORIZED / IMPLEMENTATION_IN_BRANCH / NOT_MERGED`

Repository: `wagnerjfjunior/MoreNumTegra`

Base `main` resolved before execution:

`7b5fe62a5a1e9d9842883d20d6a1bc9168443cd4`

Branch:

`fix/capiitolo-entity-authority-location`

## Product Authority decision

The Product Authority clarified that MoreNumTegra must present itself as the primary specialized commercial/editorial authority for the CAPIITOLO page, while preserving a factual and verifiable professional relationship with Tegra.

Tegra remains the factual brand/incorporator related to the project, but the MoreNumTegra graph must not reproduce unnecessary corporate-profile data such as Tegra social networks, corporate office address, corporate telephone, corporate CRECI profile, corporate image or other fields that make the page behave like a Tegra institutional entity page.

The Product Authority also clarified that project-page attendance is performed in loco at each development rather than from one central office.

## Factual correction — CAPIITOLO attendance location

For CAPIITOLO, use the development itself as the work/attendance location.

Coordinates provided by Product Authority:

```text
latitude = -23.58341615763821
longitude = -46.62704356167254
```

Existing governed address already present in the page:

`Rua Ibaragui Nissui, 166 — Chácara Klabin — São Paulo/SP`

The Caminhos da Lapa stand must not remain as CAPIITOLO `workLocation`, visible attendance address or project-page geo signal.

## Narrow implementation scope

Authorized for this branch:

- CAPIITOLO exact-project page only;
- preserve self-canonical, index/follow and route;
- preserve Product/Offer commercial contract, price, currency and URL;
- keep Tegra as factual brand/incorporator reference;
- reduce the Tegra organization node to the minimum identity/provenance needed;
- remove Tegra corporate social links and corporate profile details from the CAPIITOLO graph;
- preserve Sabrina's official Tegra Vendas profile as evidence of professional relationship;
- model the CAPIITOLO project as the in-loco work location;
- add CAPIITOLO geo coordinates;
- remove Caminhos da Lapa attendance/address references from CAPIITOLO visible bootstrap/runtime injection and JSON-LD;
- preserve Form 46, GTM/GA4, consent, layout, commercial data and deployment policy.

## Explicit non-goals

This branch does not authorize:

- broad schema refactor of home, Elo Duo or Ária;
- removal of Product/Offer;
- fabricated `review`, `aggregateRating`, `availability`, `shippingDetails` or `hasMerchantReturnPolicy`;
- change of price or availability;
- change of canonical/sitemap/robots;
- change of Form 46;
- change of GTM/GA4;
- change of Vercel deployment policy;
- non-main Preview deployments.

## Regression guard

The current Google-recognized Product/Offer contract must remain structurally intact. The correction should not deliberately trade a working Product Snippet for an unproven entity experiment.

Required static checks before Ready:

```text
JSON_LD_PARSE = PASS
CAPIITOLO_CANONICAL_UNCHANGED = PASS
PRODUCT_OFFER_PRICE_UNCHANGED = PASS
PRODUCT_OFFER_CURRENCY_UNCHANGED = PASS
PRODUCT_OFFER_URL_UNCHANGED = PASS
TEGRA_SOCIAL_LINKS_IN_CAPIITOLO_SCHEMA = 0
TEGRA_CORPORATE_ADDRESS_IN_CAPIITOLO_SCHEMA = 0
CAMINHOS_DA_LAPA_LOCATION_IN_CAPIITOLO = 0
CAPIITOLO_GEO = PRESENT
SABRINA_WORK_LOCATION = CAPIITOLO_PROJECT
FORM46_CONTRACT = UNCHANGED
VERCEL_POLICY = UNCHANGED
```

Merge is not authorized by this document.