# MoreNumTegra — Higienópolis Regional Search/AI Profile v1

Status: PILOT_CANONICAL_FOR_HIGIENOPOLIS_ONLY  
Date: 2026-10-01  
Route: https://www.moretegra.com.br/regioes/higienopolis/  
Runtime source: fb7304cc79717ea5e53a74c0aa536fa5287544fa  
Production deployment: dpl_BXWj3PBkP1AKDa3BjDc7wQdar4Gj

## Purpose

This document canonicalizes the currently published Search/AI entity profile for the Higienópolis regional page.

It is intentionally **not** a general regional-page standard yet.

Do not apply this profile mechanically to Lapa, Moema, Jardins, Brooklin or other regional pages until the pilot is observed and explicitly promoted by Product Authority.

## Regional ownership

The Higienópolis route is the geographic discovery/comparison owner.

It may:
- explain the neighborhood;
- answer broad apartment/dormitory/suite/stage queries;
- compare exact projects at regional level;
- link to exact-project pages;
- identify the commercial publisher/agent;
- expose regional imagery and factual FAQ.

It must not:
- become the exact owner of project price/unit availability;
- emit project-specific Product/Offer as if the regional page were a single purchasable item;
- duplicate exact-project conversion ownership;
- invent inventory, pricing, address or lifecycle facts.

## Published entity graph

The accepted Higienópolis pilot graph is:

```text
WebSite
-> WebPage
   -> BreadcrumbList
   -> ImageObject
   -> Place (Higienópolis, São Paulo)
   -> Brand (Tegra)
   -> Organization (Tegra Vendas)
   -> ContactPoint
   -> Person (Sabrina da Tegra)
   -> Service (regional commercial assistance)
   -> ItemList
      -> ApartmentComplex (Ária Higienópolis)
      -> ApartmentComplex (Mozae Higienópolis)
   -> FAQPage
```

Explicit exclusions on the regional page:

```text
Product = ABSENT_BY_DESIGN
Offer = ABSENT_BY_DESIGN
Merchant Listing = NOT_A_REGIONAL_OBJECTIVE
```

## Exact-project relationship

Ária and Mozae remain the exact-project owners for:
- project-specific product facts;
- floor plans;
- unit/reference price;
- Offer/Product structured data;
- exact-project conversion;
- merchant-listing eligibility.

Regional page references those entities through ItemList/ApartmentComplex and contextual links.

## Search/AI goals

The pilot is intended to strengthen machine understanding of:
- Higienópolis as a Place;
- Tegra Vendas as publisher/provider;
- Sabrina as commercial contact entity;
- Ária and Mozae as developments located in the regional cluster;
- broad intent such as apartment, ready to move, under construction, off-plan, 1/2 bedrooms and 1/2 suites;
- concise factual answerability for Search and answer engines.

## Validation at publication

```text
PR = #328 / MERGED
validated head = b08149a184cf082cea3afd34ce330ef4190ddec6
merge/runtime SHA = fb7304cc79717ea5e53a74c0aa536fa5287544fa
Production deployment = dpl_BXWj3PBkP1AKDa3BjDc7wQdar4Gj
Production state = READY
canonical route = HTTP 200
JSON-LD parse = PASS
FAQ visible/schema = 8/8 / PARITY PASS
Product = absent
Offer = absent
Form 46 = preserved
GTM = preserved
post-release runtime errors checked route = NONE OBSERVED
```

## Promotion gate to general standard

This pilot MUST NOT be generalized merely because it validates syntactically.

Promotion to a reusable regional standard requires explicit review of:
1. Google processing / structured-data observations;
2. Search Console indexing and query/page behavior;
3. regional-vs-exact-project ownership behavior;
4. evidence of no harmful cannibalization;
5. answerability / AI discovery observations when available;
6. schema factual parity;
7. compatibility with at least one additional regional page;
8. explicit Product Authority approval.

Until then:

```text
HIGIENOPOLIS_PROFILE_V1 = CANONICAL_FOR_HIGIENOPOLIS
REGIONAL_STANDARD_GENERAL = NOT_YET_APPROVED
```
