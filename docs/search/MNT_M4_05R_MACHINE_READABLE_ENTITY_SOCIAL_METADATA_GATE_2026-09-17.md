# MNT-M4-05R — Machine-Readable Entity & Social Metadata Hardening

- Date: `2026-09-17`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Product Authority decision: `APPROVED`
- Lifecycle: `IMPLEMENTATION_AND_VALIDATION_AUTHORIZED`
- Runtime mutation: `NOT_STARTED`
- Production scope authorized by Product Authority on `2026-09-17`: bounded M4-05R implementation -> Vercel Preview validation -> merge/deploy -> production smoke test on `https://www.moretegra.com.br/`, provided the preview gates pass and no unrelated scope is introduced.
- Supersession scope: reopens the acceptance of the M4-05 structured-data deliverable without erasing the historical implementation/merge evidence from PR #69.

## 1. Why this corrective gate exists

MNT-M4-05 was implemented and merged historically, but Product Authority did not accept the delivered structured-data outcome as sufficient for the MoreNumTegra Search strategy.

Preserve the distinction:

```text
IMPLEMENTED != PRODUCT_ACCEPTED
SCHEMA_PRESENT != ENTITY_GRAPH_QUALITY
SCHEMA_VALID != RICH_RESULT_ELIGIBLE
RICH_RESULT_ELIGIBLE != RANKING
```

The corrective gate is therefore `MNT-M4-05R`, not a claim that the historical PR never existed.

## 2. External observations to reconcile

A 2026-09-16 Digispot audit supplied by Product Authority reported, among other items:

- bot/user content differences on the homepage and CAPIITOLO;
- homepage CLS reported as `1.0`;
- missing social share image on the homepage;
- missing `VideoObject` for homepage video;
- incomplete address information in project structured data;
- image dimension/responsive-source findings;
- sparse internal-link observations.

These are audit observations, not automatic implementation instructions. Each finding must be reproduced/adjudicated before remediation.

The same audit suggested `hreflang` although the current V1 has no separately governed alternate-language URL. Therefore `hreflang` MUST NOT be added merely to satisfy an auditor; it becomes relevant only when real alternate language/region pages exist.

## 3. Canonical vocabulary baseline

The neutral semantic vocabulary baseline is Schema.org.

Reference resolved on 2026-09-16:

```text
repository = schemaorg/schemaorg
release = 30.1
commit = 5f2d8cdec99b7329459ef6584e94b6a840f88471
```

JSON-LD is the preferred serialization for the project-owned entity graph.

Do not confuse:

```text
Schema.org = vocabulary / ontology
JSON-LD = serialization
Open Graph = social-sharing metadata vocabulary
Twitter/X Cards = social-card metadata
HTML = primary visible document semantics
canonical/robots/sitemap = discovery/indexation controls
```

## 4. Approved machine-readable publishing stack

The approved V1 stack is:

```text
SEMANTIC HTML
  + canonical SEO metadata
  + Schema.org / JSON-LD entity graph
  + Open Graph
  + Twitter/X Cards
  + robots/canonical/sitemap discipline
```

Do not add Dublin Core, FOAF, DCAT, GeoSPARQL, RESO or other vocabularies to public landing pages merely because they exist. Additional vocabularies require an explicit interoperability requirement.

## 5. Cross-platform goal

The target is not a Google-only implementation.

Schema.org must describe the factual entity graph in a search-engine/platform-neutral way. Google-specific rich-result requirements are an additional compatibility overlay, not the semantic source of truth.

Open Graph/Twitter metadata is a separate presentation layer for social/messaging previews.

## 6. Stable entity identity contract

Every indexable page must derive machine-readable identity from the same canonical entity/page contract.

At minimum:

```text
canonical URL
= og:url
= WebPage.url
= stable WebPage @id base
```

Names may be editorially adapted for `title` or `og:title`, but they MUST NOT contradict the canonical entity identity.

Stable `@id` references must be reused across the graph instead of minting semantically different copies of the same entity.

When an authoritative external entity publishes a stable entity identifier, MoreNumTegra SHOULD reference that authoritative external `@id` instead of minting a duplicate local identity for the external organization.

## 7. Approved Tegra / Sabrina entity contract

Product Authority approved the following first-implementation entity model on 2026-09-17.

### 7.1 Tegra Incorporadora — authoritative external entity

A Product-Authority-supplied Google Rich Results test of the official Tegra surface exposed the following stable organization identity:

```text
@type = RealEstateAgent
@id = https://www.tegraincorporadora.com.br/#organization
name = Tegra Incorporadora
legalName = TG SÃO PAULO EMPREENDIMENTOS IMOBILIÁRIOS S.A.
alternateName = Tegra
url = https://www.tegraincorporadora.com.br/
```

It also exposed official organization identity/supporting data such as logo, CRECI identifier, social `sameAs`, offices/contact points, `OfferCatalog`, `Offer`, `Apartment`, `seller` and service areas.

MoreNumTegra MUST NOT mint `https://www.moretegra.com.br/#tegra-incorporadora` as the primary identity of that external organization when the authoritative Tegra `@id` above is available.

The project may use a minimal reference such as:

```json
{"@id":"https://www.tegraincorporadora.com.br/#organization"}
```

or add truthful identifying fields where useful, but MUST NOT copy the entire Tegra graph merely to inflate local markup.

### 7.2 Tegra brand

`Tegra` may be represented as a `Brand` when a property/project relationship requires brand semantics. Brand identity MUST NOT be confused with the external corporate `RealEstateAgent` entity.

### 7.3 Tegra Vendas

Tegra Vendas is modeled as a distinct `Organization` for the commercial/brokerage relationship with Sabrina.

Until an authoritative stable Tegra Vendas `@id` is observed, MoreNumTegra may use the local graph identifier:

```text
https://www.moretegra.com.br/#tegra-vendas
```

This local identifier describes the organization reference in the MoreNumTegra graph; it MUST NOT claim a legal corporate relationship to Tegra Incorporadora that has not been separately verified.

### 7.4 Sabrina da Tegra

Product Authority confirmed the following public professional facts for publication:

```text
entity = Person
name = Sabrina da Tegra
jobTitle = Corretora de imóveis
CRECI-SP = 209.905-F
worksFor = Tegra Vendas
official Tegra Vendas profile = https://corretor.tegravendas.com.br/sabrina/sp
public commercial phone = +55 11 96077-9328
work location = Estande Tegra Caminhos da Lapa
work address = Rua Fortunato Ferraz, 625 - São Paulo - SP
```

Stable MoreNumTegra identity:

```text
https://www.moretegra.com.br/#sabrina-da-tegra
```

Preferred semantic relationships:

```text
Person
├── identifier -> CRECI-SP 209.905-F
├── hasCredential -> professional CRECI credential when modeled
├── worksFor -> Tegra Vendas
├── workLocation -> Estande Tegra Caminhos da Lapa
├── contactPoint -> public commercial contact
└── sameAs -> official Tegra Vendas profile
```

The work address is a commercial stand location, not a residential/home address, and MUST be modeled accordingly.

Normalized machine telephone:

```text
+5511960779328
```

Human display may use:

```text
(11) 96077-9328
```

### 7.5 Brokerage/service relationship

Where a visible MoreNumTegra commercial-attendance section exists, Sabrina may be referenced as broker through a factual `Service` graph:

```text
Service
└── broker -> Sabrina da Tegra
```

Do not use Sabrina as `author`, `seller`, project `provider` or project owner merely to increase entity linkage.

When a current valid Tegra-origin commercial `Offer` is later published, role separation is:

```text
Offer
├── seller -> Tegra Incorporadora authoritative entity, when the applicable source supports that seller role
└── broker -> Sabrina da Tegra, when the applicable visible commercial service supports that broker role
```

## 8. Homepage target graph

The homepage is a portfolio/discovery surface.

Preferred target graph, subject to factual parity and current Schema.org domain/range validation:

```text
WebSite
CollectionPage
ItemList
Brand
Person -> Sabrina da Tegra
Organization -> Tegra Vendas
Service -> broker Sabrina
external Tegra RealEstateAgent reference
ImageObject for selected governed social/editorial image when useful
VideoObject only when required facts are verified
```

The homepage MUST remain canonically owned by MoreNumTegra. External Tegra identity references do not change page ownership or canonical URL.

`FAQPage` may remain only when the visible FAQ genuinely exists and the markup is semantically useful. It is not the primary success criterion and must not be treated as a proxy for Google rich-result eligibility.

## 9. Exact-project target graph

For exact-project landing pages, preferred stable core:

```text
WebSite
WebPage
BreadcrumbList
ApartmentComplex
PostalAddress / Place when verified
ImageObject when materially useful
VideoObject when a real video is present and required facts are verified
FloorPlan / Apartment only when visible facts and model semantics support them
Person / Service references when Sabrina's commercial attendance is visible
Offer only when a current governed commercial publication exists
```

Whenever an official Tegra project URL exists, the MoreNumTegra project entity SHOULD reconcile to that authoritative project URL, while the MoreNumTegra WebPage retains its own canonical URL and stable project `@id`.

`RealEstateListing` or any term whose Schema.org status is not in the stable core MUST NOT become the foundation without an explicit compatibility decision.

## 10. Commercial data rule

Structured data MUST NOT become a stale-price backdoor.

Commercial provenance contract:

```text
AUTHORITATIVE BUSINESS SOURCE = Tegra
TRANSPORT / GOVERNANCE = current governed project evidence; future FECH.AI Commercial Catalog when separately accepted
PUBLICATION CHANNEL = MoreNumTegra
```

MoreNumTegra receiving, normalizing, storing or publishing a commercial value does NOT make MoreNumTegra the authoritative origin of that value.

```text
NO VALID CURRENT TEGRA-ORIGIN COMMERCIAL RECORD
-> omit Offer
-> visible page uses consult-only behavior as applicable

VALID GOVERNED PUBLISHED TEGRA-ORIGIN COMMERCIAL RECORD
-> Offer may be emitted
-> visible price and structured-data price must be identical in meaning and freshness
-> provenance must preserve Tegra as authoritative business source
```

Do not derive or invent availability, price, `priceValidUntil`, discount, unit status or aggregate price range without the applicable governed evidence.

Future FECH.AI Commercial Catalog integration remains a separate cross-project gate. FECH.AI may become a system of record/governance/transport layer without becoming the business origin of Tegra-supplied price or availability facts.

## 11. Open Graph contract

Every indexable canonical URL should carry, directly in initial HTML where applicable:

```text
og:type
og:site_name
og:locale
og:url
og:title
og:description
og:image
og:image:width
og:image:height
og:image:alt
```

Each exact-project page should use a project-specific governed image rather than a generic site image when a suitable source exists.

Recommended social-card target is `1200x630` / approximately `1.91:1`, but actual asset dimensions must be known and emitted truthfully.

Do not publish fictitious width/height metadata.

For a future Sabrina-owned entity page, `og:type=profile` may be considered. Project pages MUST remain project-oriented social cards; Sabrina's phone/address/CRECI SHOULD NOT be stuffed into project `og:title`/`og:description` merely because they exist in the entity graph.

## 12. Twitter/X Cards contract

Use explicit page-level metadata where applicable:

```text
twitter:card = summary_large_image
twitter:title
twitter:description
twitter:image
twitter:image:alt
```

Fallback behavior from Open Graph is not the project contract; the project should declare the intended social preview explicitly.

## 13. Initial-HTML invariant

For critical SEO/entity information, the preferred V1 contract is:

```text
HTTP 200
-> initial HTML already contains
   title
   meta description
   canonical
   robots
   H1 / primary semantic content needed for page identity
   stable structured-data core
   Open Graph / Twitter metadata
-> JavaScript progressively enhances interaction
```

Do not make the canonical entity graph depend on `fetch -> DOMParser -> document.write` or post-load DOM injection when static HTML can carry the factual graph directly.

The current homepage fragment-loading and CAPIITOLO bootstrap architecture therefore require focal review under this corrective gate.

## 14. HTML and accessibility parity

Structured data must describe content the user can actually observe or reasonably access on the page.

Required parity checks include:

- one meaningful H1;
- semantic heading order where practical;
- factual visible names/descriptions;
- image `alt` semantics;
- explicit image dimensions/aspect reservation where known;
- no schema-only claims;
- no bot-only commercial facts;
- no hidden keyword/entity stuffing;
- Sabrina professional facts emitted in structured data only when the visible page/service context presents or reasonably exposes the same commercial identity.

## 15. Validation matrix

M4-05R acceptance requires independent checks across distinct layers.

### HTML

- Nu HTML Checker / equivalent standards validation;
- no material HTML errors;
- primary semantic identity observable in initial document.

### Schema.org

- JSON-LD syntactically valid;
- Schema.org classes/properties compatible with the pinned stable vocabulary baseline;
- stable `@id` graph;
- no invented facts;
- no unjustified pending/experimental term dependency;
- external Tegra organization references resolve to the authoritative `https://www.tegraincorporadora.com.br/#organization` identity when applicable.

### Google compatibility

- Rich Results Test used only for Google-supported eligible features;
- absence of a Google rich-result type is NOT itself a Schema.org failure;
- Google-specific required/recommended properties added only when truthful and applicable.

### Social

- Open Graph identity and image metadata present;
- Twitter/X card metadata present;
- canonical social URL exact;
- preview image real, accessible and page-specific where applicable.

### Entity consistency

Automated or reproducible checks should confirm that canonical URL, `og:url`, JSON-LD `WebPage.url`, entity `@id` bases, breadcrumb URLs and sitemap URL do not drift.

## 16. Automation target

Add a repository-owned validation script/test rather than relying only on manual browser tools.

The validator should be able to fail a candidate when it detects material conditions such as:

- invalid JSON-LD;
- canonical/`og:url`/WebPage URL mismatch;
- duplicate or conflicting `@id` identity;
- required page identity missing;
- schema claim with no allowed source/parity;
- `Offer` emitted without governed Tegra-origin commercial evidence;
- malformed Open Graph/Twitter URL/image fields;
- accidental use of non-approved experimental vocabulary.

Exact implementation language/tooling must remain lightweight and compatible with the current vanilla/static architecture.

## 17. Scope surfaces for first acceptance

M4-05R first acceptance is bounded to the three currently published/indexable sitemap surfaces:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

Future project pages inherit the accepted contract after these three reference implementations pass.

## 18. Explicit non-goals

This gate does NOT authorize by itself:

- FECH.AI/Supabase integration;
- new unverified commercial facts;
- price recalculation;
- new route families;
- Google Ads/Meta Ads changes;
- new GTM/GA4 mutations;
- DNS/canonical-host changes;
- a CMS/backend;
- framework migration;
- publication of experimental Schema.org vocabulary merely for completeness.

## 19. Acceptance semantics

Target state:

```text
MNT-M4-05 historical implementation = MERGED
MNT-M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
MNT-M4-05R Product Decision = APPROVED
MNT-M4-05R Runtime = AUTHORIZED / NOT_STARTED
MNT-M4-05R Acceptance = PENDING
```

The corrective gate becomes accepted only after the three reference surfaces pass the HTML + Schema.org + Google-applicable + Social + entity-consistency validation matrix and Product Authority explicitly accepts the result.
