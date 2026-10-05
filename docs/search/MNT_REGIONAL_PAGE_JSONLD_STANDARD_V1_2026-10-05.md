# MoreNumTegra — Regional Page JSON-LD Standard v1

Status: CANDIDATE_FOR_PRODUCT_AUTHORITY_APPROVAL  
Date: 2026-10-05  
Scope: `/regioes/<verified-location>/`  
Pilot pages: Higienópolis and Lapa

## 1. Purpose

Define one reusable structured-data contract for neighborhood/region pages without turning regional discovery pages into exact-project product pages.

```text
SEMANTIC_GRAPH_COMPLETENESS != RICH_RESULTS_ITEM_COUNT
REGIONAL_OWNER != EXACT_PROJECT_OWNER
VALID_SCHEMA != GUARANTEED_GOOGLE_RICH_RESULT
```

A regional page exists to explain a verified place, connect the user to verified projects in that place, support comparison/discovery intent, and route exact-project intent to the project pages.

## 2. Ownership boundary

Regional page owns:
- verified place/neighborhood entity;
- regional discovery and comparison;
- broad stage/typology orientation;
- regional imagery;
- factual visible FAQ;
- project membership through ItemList;
- commercial assistance for the region.

Exact-project pages own:
- unit/reference price;
- Product/Offer markup;
- floor plans;
- exact availability;
- unit-level commercial truth;
- merchant-listing eligibility;
- exact-project conversion semantics.

## 3. Canonical regional graph

Required semantic graph:

```text
WebSite
└── WebPage
    ├── BreadcrumbList
    ├── ImageObject
    ├── Place
    ├── ItemList
    │   └── ApartmentComplex[] / verified exact-project references
    ├── FAQPage (only when visible factual FAQ exists)
    └── Service (when regional commercial assistance is visibly offered)

Shared site entities, referenced with stable @id when present:
- Brand
- Organization
- ContactPoint
- Person
```

### 3.1 Required page-local nodes

#### WebPage
Required:
- `@id` = canonical URL + `#webpage`
- `url`
- `name`
- `description`
- `inLanguage`
- `isPartOf` -> WebSite
- `breadcrumb` -> BreadcrumbList
- `primaryImageOfPage` -> ImageObject
- `about` -> Place
- `mainEntity` -> ItemList
- `relatedLink` -> exact-project URLs when applicable

Recommended:
- `publisher` -> shared Organization when the page visibly identifies the publisher/provider
- `mentions` -> verified project entities and commercial contact when relevant

#### BreadcrumbList
Required:
- root site;
- current verified region;
- factual visible hierarchy only.

#### ImageObject
Required:
- one factual regional image actually present on the page;
- `contentUrl`;
- descriptive `caption`.

Do not use a project image as the regional primary image unless the visible page itself uses it specifically as the regional hero and the caption remains truthful.

#### Place
Required:
- `@id` = canonical regional URL + `#place`;
- verified region name;
- factual description;
- `containedInPlace` = São Paulo when applicable.

Optional only with governed evidence:
- `geo`;
- `sameAs`;
- administrative identifiers.

Do not invent a centroid, exact address, postal code, or street for a neighborhood.

#### ItemList
Required:
- `@id`;
- name;
- `numberOfItems`;
- one ListItem per verified project membership;
- each ListItem links to the canonical exact-project page.

The regional ItemList is discovery/navigation, not inventory.

#### ApartmentComplex references
For each verified project:
- stable exact-project `@id`;
- `name`;
- canonical `url`;
- short factual description;
- verified image when available;
- `brand` reference when applicable.

Do not add regional Offer, price, availability, or unit-level data.

#### FAQPage
Use only when:
- FAQ is visible on the page;
- every Question/Answer is factual;
- visible text and JSON-LD are in exact semantic parity.

Google FAQ rich results are not a normal objective for MoreNumTegra regional pages; FAQPage remains a semantic/answerability node.

#### Service
Use when the page visibly offers regional commercial assistance.

Recommended:
- `serviceType`;
- `provider` -> Organization;
- `broker` -> Person when factual and visibly supported;
- `areaServed` -> Place;
- regional canonical `url`.

## 4. Shared entities

### WebSite
Stable site-level @id:
`https://www.moretegra.com.br/#website`

### Brand
Stable site-level @id:
`https://www.moretegra.com.br/#tegra-brand`

### Organization
Use the stable site-level @id for the factual commercial organization.

Rules:
- Organization is a shared entity, not the primary subject of a neighborhood page.
- Do not duplicate inconsistent organization data across regional pages.
- Do not add unsupported address, logo, legal name, registration or business-location claims.
- Google recommends Organization markup mainly on the home page or a single organization/about page; on regional pages it should be referenced only when it materially participates in the graph.

### ContactPoint
Use a stable shared @id and only governed public contact information.

### Person
Use a stable shared @id for Sabrina only when the page visibly identifies Sabrina as the commercial contact and the factual profile remains valid.

## 5. Explicit exclusions on regional pages

By default, prohibit:

```text
Product
Offer
AggregateOffer
MerchantReturnPolicy
Review
AggregateRating
LocalBusiness
RealEstateAgent as a fake regional business location
unit-level price
unit-level availability
invented geo/address/postalCode
```

Any exception requires a separate factual and ownership gate.

Reason:
- Product/Offer belong to exact-project owners.
- LocalBusiness represents a real business location, not a neighborhood.
- rich-result count must never drive unsupported schema.

## 6. Rich Results expectations

Regional pages are not expected to match exact-project pages in Google Rich Results Test item count.

Target:
- zero critical structured-data errors;
- valid breadcrumb/location semantics;
- consistent entity graph;
- no ownership leakage;
- no unsupported rich-result bait.

Do not use `RICH_RESULTS_ITEM_COUNT` as a quality score.

## 7. Validation matrix

Every regional implementation must pass:

```text
JSON parse = PASS
canonical ↔ WebPage.url = PASS
one regional Place = PASS
primary ImageObject visible = PASS
ItemList count ↔ visible project membership = PASS
project URLs canonical = PASS
visible FAQ ↔ FAQPage = PASS when FAQ exists
Product/Offer absent = PASS
LocalBusiness absent unless separately authorized = PASS
Form 46 preserved = PASS
Measurement/consent preserved = PASS
one H1 = PASS
Rich Results Test critical errors = 0
Schema.org validator critical errors = 0
```

After Production:
- Google Rich Results Test;
- URL Inspection / recrawl;
- Search Console observation;
- query/page ownership observation;
- no harmful cannibalization.

## 8. Pilot conformance

### Higienópolis
Current strengths:
- WebSite
- WebPage
- BreadcrumbList
- ImageObject
- Place
- Brand
- Organization
- ContactPoint
- Person
- Service
- ItemList
- ApartmentComplex references
- FAQPage

Current status:
`CLOSE_TO_STANDARD / REVIEW_SHARED_ORGANIZATION_USAGE`

### Lapa
Current graph:
- WebPage
- BreadcrumbList
- ItemList
- FAQPage

Missing against candidate standard:
- WebSite
- ImageObject
- Place
- Service
- shared entity references where applicable
- explicit ApartmentComplex nodes referenced by ItemList

Current status:
`BELOW_STANDARD / REMEDIATION_REQUIRED`

## 9. Promotion gate

This standard becomes canonical only after:
1. SES Search/SEO review = PASS or PASS_WITH_RESIDUAL_RISK;
2. Product Authority approval;
3. Higienópolis conformance review;
4. Lapa implementation + Google validation;
5. evidence that no regional/exact-project ownership regression is introduced.

Until then:
`REGIONAL_PAGE_JSONLD_STANDARD_V1 = CANDIDATE`
