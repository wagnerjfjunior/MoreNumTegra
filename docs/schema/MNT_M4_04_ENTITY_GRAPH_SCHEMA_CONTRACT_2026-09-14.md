# MNT-M4-04 — Entity Graph and Schema Contract

Status: COMPLETE_CANDIDATE / AUTHORIZED

Execution base: merged MNT-M4-03 main SHA `d6bab24e268ca72234f41aa936166cd74dd5ab8e`.

## Purpose
Define the governed entity graph and structured-data contract that later runtime JSON-LD may implement without inventing entities or commercial facts.

## Entity graph
- `Organization`: Tegra as incorporation/brand entity only where factual attribution is supported.
- `WebSite`: MoreNumTegra site entity for the site root.
- `WebPage`: one entity per governed indexable page surface.
- `ItemList`: only where a visible list of governed projects is rendered and the listed entities are factually verified.
- `Residence` / `ApartmentComplex` / `Product`-like project entity: use only the schema type selected by later implementation after factual fit review; do not overclaim a type merely for richer snippets.
- `Place`: only for verified location facts; no inferred neighborhood/address.
- `FAQPage`: only when the FAQ is visible on-page and every Q/A is factual.
- `BreadcrumbList`: only for real navigable hierarchy.

## Relationships
- site root `about` portfolio/project entities only when represented on-page;
- master-development page links to verified child-project entities without replacing their canonical ownership;
- exact-project page is the primary entity surface for that project and its modifiers;
- stage/location pages reference verified project members and never become the primary entity owner for those projects;
- historical/sold projects remain project entities with commercial-state truth separated from any verified exception inventory.

## Hard factual gates
- no invented price, metragem, address, availability, stage, amenity, architect, designer, delivery date or inventory state;
- volatile commercial fields require M3-04 release-time revalidation;
- route reservation alone does not authorize schema publication;
- a hidden FAQ does not authorize `FAQPage`;
- a project list that is not visibly rendered does not authorize `ItemList`;
- schema must reflect visible page truth and must not contradict canonical page ownership from M3-06/M4-01.

## Page-type schema eligibility
- portfolio root: `WebSite` + `WebPage`; optional visible `ItemList` when governed project list is present;
- Caminhos da Lapa master: `WebPage` + visible child-project `ItemList`; child exact-project entities remain independent owners;
- exact-project: `WebPage` + governed project entity + optional `BreadcrumbList` + optional visible `FAQPage`;
- stage/location: `WebPage` + optional visible verified `ItemList`; no project ownership transfer;
- historical/sold: `WebPage` + governed project entity, with sold/historical state explicit and no general inventory implication.

## Identity rules
- stable `@id` values must be deterministic canonical URLs plus fragments where appropriate;
- the same real-world entity must reuse the same governed `@id` across pages;
- page entity and real-world project entity must not be conflated when they are distinct concepts;
- canonical URL changes require coordinated `@id` review.

## Implementation boundary
M4-04 defines the contract only. It does not add or change runtime JSON-LD, HTML, canonical tags, sitemap, redirects, Green, Vercel, Search Console, Ads or spend. Runtime structured-data implementation remains a separately gated M4-05 action.
