# MoreNumTegra — Regional Page JSON-LD Standard v1

Status: CANONICAL_FOR_REGIONAL_PAGES  
Promoted: 2026-10-05  
Scope: `/regioes/<verified-location>/`  
Validated pilots: Higienópolis and Lapa

## 1. Purpose

Define the canonical structured-data contract for neighborhood/region pages without turning regional discovery pages into exact-project product pages.

```text
REGIONAL_OWNER != EXACT_PROJECT_OWNER
SEMANTIC_GRAPH_COMPLETENESS != RICH_RESULTS_ITEM_COUNT
VALID_SCHEMA != GUARANTEED_GOOGLE_RICH_RESULT
```

A regional page exists to explain a verified place, connect the user to verified projects in that place, support comparison/discovery intent and route exact-project intent to the project pages.

## 2. Ownership boundary

Regional page owns:
- verified place/neighborhood entity;
- regional discovery and comparison;
- broad stage/typology orientation;
- regional imagery;
- factual visible FAQ;
- project membership through ItemList;
- project-scoped in-person commercial assistance when factually supported.

Exact-project pages own:
- unit/reference price;
- Product/Offer markup;
- floor plans;
- exact availability;
- unit-level commercial truth;
- merchant-listing eligibility;
- exact-project conversion semantics.

## 3. Canonical regional graph

```text
WebSite
└── WebPage
    ├── BreadcrumbList
    ├── ImageObject
    ├── Place
    ├── ItemList
    │   └── ApartmentComplex[] / verified exact-project references
    ├── FAQPage (only when visible factual FAQ exists)
    └── project-scoped commercial assistance

Shared site entities:
- Brand
- Organization
- ContactPoint
- Person

For each verified project with in-person attendance:
- ApartmentComplex
- RealEstateAgent
- Service
```

### 3.1 Required page-local nodes

#### WebPage
Required:
- `@id` = canonical URL + `#webpage`;
- `url`;
- `name`;
- `description`;
- `inLanguage`;
- `isPartOf` -> WebSite;
- `breadcrumb` -> BreadcrumbList;
- `primaryImageOfPage` -> ImageObject;
- `about` -> Place;
- `mainEntity` -> ItemList;
- `relatedLink` -> exact-project URLs when applicable.

Recommended:
- `publisher` -> shared Organization;
- `mentions` -> verified exact-project entities, Person and project-scoped RealEstateAgent nodes.

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

#### Place
Required:
- `@id` = canonical regional URL + `#place`;
- verified region name;
- factual description;
- `containedInPlace` = São Paulo when applicable.

Do not invent centroid, street, address or postal code for the neighborhood itself.

#### ItemList
Required:
- `@id`;
- name;
- `numberOfItems`;
- one ListItem per verified project membership;
- canonical exact-project URL;
- item reference to the corresponding ApartmentComplex node.

The regional ItemList is discovery/navigation, not inventory.

#### ApartmentComplex
For each verified project:
- stable exact-project `@id`;
- `name`;
- canonical `url`;
- short factual description;
- verified image when available;
- `brand` reference;
- factual project address;
- `postalCode` when governed/verified.

Do not add Offer, price or unit-level availability here.

#### RealEstateAgent
When in-person project attendance is factual, create one project-scoped RealEstateAgent node per project.

Required:
- unique regional `@id`;
- project-specific attendance name;
- factual description;
- regional page URL;
- public telephone;
- factual in-person `address`;
- `postalCode`;
- `areaServed` -> regional Place;
- `contactPoint`;
- `parentOrganization`;
- CRECI identifier;
- factual image/profile link when governed.

Pattern:

```text
1 verified project with in-person attendance
= 1 ApartmentComplex
+ 1 RealEstateAgent
+ 1 Service
```

Never create a fake business address. If there is no governed in-person address, do not fabricate one to obtain a rich result.

#### Service
Create one Service per project-scoped RealEstateAgent.

Required:
- unique `@id`;
- project-specific name;
- `serviceType`;
- `provider` -> matching RealEstateAgent;
- `broker` -> Person when factual;
- `areaServed` -> regional Place;
- regional page URL.

#### FAQPage
Use only when:
- FAQ is visible;
- each question/answer is factual;
- visible text and JSON-LD maintain semantic parity.

FAQPage is an answerability node, not a guaranteed rich-result feature.

## 4. Shared entities

### WebSite
Stable site-level @id:
`https://www.moretegra.com.br/#website`

### Brand
Stable site-level @id:
`https://www.moretegra.com.br/#tegra-brand`

### Organization
Stable site-level organization entity:
`https://www.moretegra.com.br/#tegra-vendas`

Rules:
- shared entity, not the primary subject of the neighborhood page;
- keep organization facts consistent across regional pages;
- do not invent legal/address claims.

### ContactPoint
Stable shared contact entity using only governed public contact information.

### Person
Stable Sabrina entity only when the page visibly identifies Sabrina as the commercial contact and factual profile data remains valid.

## 5. Explicit exclusions

Regional pages must not add these merely to increase Rich Results count:

```text
Product
Offer
AggregateOffer
MerchantReturnPolicy
Review
AggregateRating
unit-level price
unit-level availability
invented geo/address/postalCode
```

`LocalBusiness` is not used as a generic regional node. Google may classify valid project-scoped `RealEstateAgent` entities under "Empresas locais"; that does not authorize a fake neighborhood business entity.

## 6. Production validation baseline

### Higienópolis
Production Google Rich Results Test observed on 2026-10-05:

```text
TOTAL VALID ITEMS = 6
Current location indicators = 1
Local businesses = 2
Organization = 3
errors = 0 observed
```

Regional composition:
- 2 verified projects;
- 2 project-scoped RealEstateAgent nodes;
- 2 matching Service nodes.

### Lapa
Production Google Rich Results Test observed on 2026-10-05 after final postal-code correction:

```text
TOTAL VALID ITEMS = 10
Current location indicators = 1
Local businesses = 4
Organization = 5
errors = 0 observed
```

Regional composition:
- 4 verified projects;
- 4 project-scoped RealEstateAgent nodes;
- 4 matching Service nodes.

Google Search Console user-observed on 2026-10-05:
- Higienópolis URL = indexed;
- Lapa URL = indexed;
- HTTPS = valid;
- current location indicators = valid.

These counts are production evidence for the two pilots, not a universal target. Future regions may yield different Google counts according to their factual project membership and Google processing.

## 7. Validation matrix

Every regional implementation must pass:

```text
JSON parse = PASS
canonical ↔ WebPage.url = PASS
one regional Place = PASS
primary ImageObject visible = PASS
ItemList count ↔ visible project membership = PASS
ApartmentComplex count ↔ governed project membership = PASS
project URLs canonical = PASS
project address/postalCode = governed fact
RealEstateAgent count ↔ projects with factual in-person attendance = PASS
Service count ↔ RealEstateAgent count = PASS
Service.provider ↔ matching RealEstateAgent = PASS
visible attendance/address copy ↔ schema = PASS
visible FAQ ↔ FAQPage = PASS when FAQ exists
Product/Offer absent = PASS
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

## 8. Canonical interpretation

```text
RICH_RESULTS_ITEM_COUNT != QUALITY_SCORE
PROJECT_COUNT MAY CHANGE DETECTED ENTITY COUNT
FACTUAL ADDRESS + POSTAL CODE REQUIRED WHEN USED
REGION OWNS DISCOVERY
EXACT PROJECT OWNS PRODUCT/OFFER
```

The successful pilots establish the reusable infrastructure pattern, not a promise that every future neighborhood will produce 6, 10 or any fixed number of Google items.

## 9. Promotion record

Promotion gate completed on 2026-10-05:

1. SES Search/SEO review = PASS_WITH_RESIDUAL_RISK;
2. Product Authority approved production testing;
3. Higienópolis production validation = PASS;
4. Lapa production validation = PASS;
5. regional/exact-project ownership boundary preserved;
6. no Product/Offer introduced into regional owners;
7. Lapa postal-code warning resolved.

Final state:

```text
REGIONAL_PAGE_JSONLD_STANDARD_V1 = CANONICAL_FOR_REGIONAL_PAGES
```
