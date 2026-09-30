# MoreNumTegra — Caminhos da Lapa Exact-Project SEO Gap Analysis

Date: `2026-09-30`  
Status: `READ_ONLY_ANALYSIS / NO_PAGE_MUTATION`  
Analyzed main SHA: `c567f760d2139bd1ead5b64da8c90906d1a54b26`

## Scope

Exact-project pages reviewed:

- `/empreendimentos/garden-design/`
- `/empreendimentos/nova-vivere/`
- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/reserva-caminhos-da-lapa/`

Dimensions:

- title;
- meta description;
- H1/H2;
- visible body semantics;
- FAQ/answerability;
- JSON-LD;
- internal route linking;
- local/entity coverage;
- lifecycle/commercial intent;
- observed competitor coverage.

This analysis does not authorize page changes.

## Evidence sources

Repository source:

- `src-greenn/empreendimentos/garden-design/index.html`
- `src-greenn/empreendimentos/nova-vivere/index.html`
- `src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html`
- `src-greenn/empreendimentos/reserva-caminhos-da-lapa/index.html`

Competitive/public surfaces observed on 2026-09-30:

- `https://www.caminhosdalapaoficial.com.br/`
- `https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/gardendesignprivateparkresidence`
- `https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/novaviverecaminhosdalapa`
- `https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo`
- `https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/reserva-caminhos-da-lapa`
- ZAP Imóveis Garden Design / Elo Duo project surfaces;
- Viva Real Nova Vivere project surface;
- QuintoAndar Garden Design / Reserva condominium surfaces;
- Apto.vc Reserva project/entity surface.

Machine-readable output:

- `docs/search/data/search-intelligence/caminhos-lapa/exact_project_seo_gap_matrix_2026-09-30.json`
- `docs/search/data/search-intelligence/caminhos-lapa/exact_project_seo_gap_matrix_2026-09-30.csv`

## Cross-page findings

### Titles/H1s are not the main problem

All four pages already resolve exact project entities clearly.

Garden Design:
- title: `Garden Design Tegra Caminhos da Lapa | 61 a 78 m²`
- H1: `Garden Design Tegra Private Park Residence`

Nova Vivere:
- title: `Nova Vivere Tegra Caminhos da Lapa | 72 e 105 m²`
- H1: `Nova Vivere Tegra no Caminhos da Lapa`

Elo Duo:
- title: `Elo Duo Tegra Caminhos da Lapa | Apartamento pronto na Lapa`
- H1: `Elo Duo Tegra — Caminhos da Lapa`

Reserva:
- title: `Reserva Caminhos da Lapa Tegra | 91, 127 e 157 m²`
- H1: `Reserva Caminhos da Lapa projeto Tegra entregue`

No title/H1 rewrite is justified from this evidence alone.

Garden Design has direct user-observed Google page-2 evidence for the long-tail query `caminhos da lapa garden design tegra`; this is an additional reason not to destabilize its title/H1 prematurely.

### Internal discovery is uniformly thin

The four exact-project sources contain no internal route links to another project/region route beyond Home.

That is a structural gap, but it is not an immediate implementation instruction because:

- `/regioes/lapa/` is not yet an accepted live owner;
- the Caminhos master-domain owner remains `GOVERNANCE_RECONCILIATION_REQUIRED`;
- indiscriminate reciprocal exact-match linking would violate the existing ownership contract.

Future linking should therefore wait for the Lapa/master decision or use a separately approved contextual linking slice.

## Garden Design

### Current MoreTegra strengths

- project + Tegra + Caminhos da Lapa in title;
- full `Private Park Residence` entity in H1;
- visible FAQ for price, plants, location and stage;
- `BreadcrumbList`, `ApartmentComplex`, `FloorPlan` and `FAQPage` schema;
- strong price/plant/location commercial structure;
- current Google page-2 observation for a high-specificity project query.

### Competitive coverage

Current official and portal surfaces emphasize:

- Lapa / Vila Anastácio;
- exact address;
- under-construction stage;
- large amenity set;
- city/nature positioning;
- future-delivery context on marketplace surfaces;
- multiple detailed plant variants.

### Gaps

`GD-01 — LOCAL_ENTITY_COVERAGE / MEDIUM`

The current MoreTegra source does not explicitly use `Vila Anastácio`, while portal competitors do.

`GD-02 — LOCATION_CONTEXT / MEDIUM`

Current source does not materially cover nearby mobility/landmark vocabulary such as Domingos de Moraes, Marginal Tietê, Bandeirantes, Anhanguera, Mercado da Lapa or Sesc Pompeia. Competitors provide richer neighborhood context.

`GD-03 — AMENITY_BREADTH / MEDIUM`

Current visible lexical coverage is narrower than portal competitors for features such as coworking, churrasqueira, brinquedoteca and salão de festas.

`GD-04 — COMMERCIAL_TRUTH_REVALIDATION / HIGH`

The MoreTegra source and the currently observed official Tegra/Caminhos surface expose different price references. This is a commercial-truth issue, not a reason to copy the lower value. Revalidate the canonical current unit/price before any SEO/content mutation.

### Disposition

`RETAIN_TITLE_H1`

Best future direction:
- enrich body/local semantics only after fact verification;
- preserve current exact-project positioning;
- do not change title/H1 based on portal copy.

## Nova Vivere

### Current MoreTegra strengths

- exact project + Tegra + Caminhos da Lapa in both title and H1;
- 72 m² / 105 m² product targeting;
- visible FAQ for price, plants, location and stage;
- strong structured data coverage.

### Competitive coverage

Official/portal surfaces emphasize:

- Vila Anastácio;
- launch state;
- 72/105 m² product family;
- broad family/leisure vocabulary;
- delivery/prevision timeline on marketplace surfaces;
- detailed feature list.

### Gaps

`NV-01 — LOCAL_ENTITY_COVERAGE / MEDIUM`

No explicit `Vila Anastácio` lexical coverage in the current source.

`NV-02 — AMENITY_BREADTH / MEDIUM`

Marketplace content exposes substantially more indexable feature vocabulary: spa, coworking, pet, sauna, brinquedoteca, churrasqueira and related leisure terms.

`NV-03 — DELIVERY_LIFECYCLE_CONTEXT / MEDIUM`

Current MoreTegra source does not visibly cover `entrega` or `previsão`. Marketplace surfaces do. Any delivery-date addition requires canonical verification first.

`NV-04 — COMMERCIAL_TRUTH_REVALIDATION / HIGH`

Current MoreTegra price reference differs from the currently observed official reference. Do not change automatically.

### Disposition

`RETAIN_TITLE_H1`

Future enrichment should focus on verified local/lifecycle/amenity semantics, not a title rewrite.

## Elo Duo

### Current MoreTegra strengths

Elo Duo is the strongest of the four pages semantically:

- approximately 1,300 visible words;
- exact-project + Tegra + Caminhos + ready-to-move intent;
- Vila Anastácio already present;
- Domingos de Moraes;
- Marginal Tietê;
- Bandeirantes;
- Anhanguera;
- Sesc Pompeia;
- ready-to-move and last-units language;
- `Product`, `Service`, `ApartmentComplex`, `FloorPlan` and breadcrumb structured data.

### Competitive coverage

ZAP currently answers:

- exact project/entity;
- ready-to-move state;
- unit dimensions;
- price;
- obra/evolution state;
- large amenity set;
- separate condominium/resale surfaces.

### Main gap

`ED-01 — FAQ_ANSWERABILITY / HIGH`

Elo Duo has:
- no visible FAQ;
- no `FAQPage` schema.

This is the cleanest bounded on-page gap in the four-page set.

A future FAQ could answer already-supported questions such as:

- Is Elo Duo ready to move?
- What sizes does Elo Duo offer?
- How many bedrooms/suites?
- Where is Elo Duo?
- How do I check current availability/conditions?

Every answer must reuse verified current facts.

### Secondary-market separation

ZAP also exposes Elo/Elo Duo condominium/resale inventory.

MoreTegra should not blur:
- developer/current-commercial intent;
with
- secondary-market inventory intent.

### Disposition

`RETAIN_TITLE_H1 / FAQ_IS_CLEANEST_ON_PAGE_GAP`

## Reserva

Reserva has the largest strategic content gap.

### Current strengths

- exact project + Tegra + plant sizes in title;
- visible FAQ;
- FAQPage schema;
- 91/127/157 m² coverage;
- beach tennis and several leisure entities;
- project authorship.

### Current Search environment

Official Tegra presents the project as delivered and sold out.

However, post-delivery Search results also contain strong buyer/condominium surfaces:

- QuintoAndar exposes active secondary-market inventory and neighborhood/proximity information;
- Apto.vc presents the project as `Pronto para morar`, with project structure, detailed amenities, location and FAQ.

Those are different lifecycle intents from developer inventory.

### Main gap

`RS-01 — COMMERCIAL_INTENT_SUPPRESSION / HIGH`

The current MoreTegra source repeats `100% vendido` multiple times and front-loads historical/alternative semantics.

This is factually consistent with the observed official developer status, but it excessively narrows the page's commercial/entity usefulness for a user who is still researching Reserva.

The right future correction is **not** to invent Tegra inventory.

The opportunity is to:
- preserve truthful lifecycle status;
- avoid repeating the dead-end wording throughout the funnel;
- strengthen `sucesso de vendas`, `projeto entregue`, project/entity value and consultation-led language;
- distinguish developer inventory from broader availability/research intent.

`RS-02 — POST_DELIVERY_QUERY_COVERAGE / HIGH`

Portals answer:
- condominium characteristics;
- nearby transport/points;
- ready-to-move intent;
- detailed plant/differential questions;
- market availability.

MoreTegra under-serves this post-delivery research layer.

`RS-03 — LOCAL_ENTITY_COVERAGE / MEDIUM`

Current source has no explicit Vila Anastácio coverage and little nearby transport/amenity context.

`RS-04 — FAQ_INTENT / MEDIUM`

Current FAQ is weighted toward sold-out status and alternatives. A better future FAQ would keep truth while covering:
- location;
- plant differences;
- leisure;
- delivered status;
- consultation/availability distinction.

### Disposition

`HIGHEST_CONTENT_REMEDIATION_CANDIDATE`

But any future runtime slice must explicitly preserve:
- no invented developer inventory;
- no unsupported resale claim;
- no stale price;
- no destructive redirect/canonical change.

## Priority order for a future mutation decision

1. **Reserva — commercial/entity copy remediation**
   - highest strategic opportunity;
   - requires careful lifecycle wording.

2. **Elo Duo — FAQ + FAQPage**
   - cleanest bounded technical/content improvement;
   - can be implemented without title/H1 rewrite.

3. **Garden Design — commercial truth revalidation**
   - before semantic enrichment.

4. **Nova Vivere — commercial truth revalidation**
   - before semantic enrichment.

5. **Garden Design + Nova Vivere — local entity/amenity enrichment**
   - only after factual verification.

## No-change decisions from this study

Do not:

- change Garden Design title/H1 now;
- change Nova Vivere title/H1 now;
- change Elo Duo title/H1 now;
- create `/caminhos-da-lapa/` in MoreTegra;
- redirect historical Caminhos URLs;
- copy portal inventory/price/delivery facts into MoreTegra without canonical verification;
- create reciprocal keyword-link networks merely to manipulate Search.

## Next decision gate

This analysis is sufficient to choose a bounded implementation slice.

The cleanest candidates are:

```text
A = Reserva lifecycle/commercial-copy remediation
B = Elo Duo FAQ/answerability remediation
C = Garden/Nova commercial-truth revalidation only
```

No implementation is authorized by this document alone.
