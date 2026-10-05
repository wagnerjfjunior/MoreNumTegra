# SES — Regional JSON-LD Architecture Review — 2026-10-05

Status: CLOSED / PASS_WITH_RESIDUAL_RISK  
Final adjudication: CANONICAL_FOR_REGIONAL_PAGES  
Closed: 2026-10-05

## Scope

Review whether MoreNumTegra should adopt one canonical structured-data profile for neighborhood/region pages and whether Higienópolis and Lapa can serve as the two pilot implementations.

## Live state reviewed

```text
main = 0ec2eb6a81a33f3bf4044d2f0ef7e1e38da4cbcd
Higienópolis = regional owner / live
Lapa = regional owner / live
```

## Evidence

### Higienópolis current graph
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
- 2 ApartmentComplex
- ItemList
- FAQPage

User-observed Google Rich Results Test:
- current location indicators = valid
- Organization = valid

### Lapa current graph
- WebPage
- BreadcrumbList
- ItemList
- FAQPage

User-observed Google Rich Results Test:
- current location indicators = valid

Historical comparison confirms Lapa did not recently lose the richer graph; its regional JSON-LD was originally published in this reduced form.

## Findings

### F1 — There is real schema drift
PASS / MATERIAL FINDING

Higienópolis and Lapa represent the same page class but do not implement the same regional entity contract.

### F2 — Exact-project rich-result count is not a valid regional target
PASS

Mozae can legitimately expose product/merchant/local-business oriented structures because it is an exact-project page. A neighborhood page must not imitate those types merely to increase Google Rich Results Test count.

### F3 — One regional standard is justified
PASS

The project already has clear regional ownership semantics. A shared structured-data contract reduces drift, prevents accidental Product/Offer leakage and improves repeatability for future clusters.

### F4 — Higienópolis is a useful semantic reference but should not be copied mechanically
PASS_WITH_RESIDUAL_RISK

Higienópolis contains the right broad entity relationships, but Google recommends Organization markup primarily on the home page or a dedicated organization page. Regional pages may reference the shared Organization when it materially participates in the graph, but the standard should avoid duplicating inconsistent organization data.

### F5 — LocalBusiness must not become a regional target
PASS

A neighborhood is not a business location. LocalBusiness requires a real local business entity/location and must remain excluded unless a separate page truly represents a physical commercial location.

### F6 — FAQPage may remain for semantic parity, not as a rich-result KPI
PASS

Google no longer regularly shows FAQ rich results for ordinary commercial sites. Keeping factual visible FAQ markup is acceptable, but it must not be used as a claimed SERP enhancement objective.

## SES verdict

```text
VERDICT = PASS_WITH_RESIDUAL_RISK
ADOPT_ONE_REGIONAL_STANDARD = YES
COPY_HIGIENOPOLIS_BLINDLY = NO
MAKE_RICH_RESULTS_COUNT_A_KPI = NO
ADD_PRODUCT_OR_OFFER_TO_REGION = NO
ADD_LOCALBUSINESS_TO_REGION_BY_DEFAULT = NO
LAPA_REMEDIATION_AFTER_APPROVAL = YES
HIGIENOPOLIS_CONFORMANCE_REVIEW_AFTER_APPROVAL = YES
```

## Residual risks

1. Google may choose not to render a supported structured-data feature even when markup is valid.
2. Organization detection on a regional page must not be interpreted as proof that Organization should be duplicated everywhere.
3. Region/project ownership can regress if exact-project commercial data leaks into the regional graph.
4. Schema.org-valid nodes do not necessarily correspond to a Google rich-result feature.

## Recommended next action

1. Product Authority reviews and approves `MNT_REGIONAL_PAGE_JSONLD_STANDARD_V1_2026-10-05.md`.
2. Implement Lapa conformance first in a bounded runtime branch.
3. Validate locally + JSON parser + Schema.org + Google Rich Results Test.
4. Publish Lapa and observe Google processing.
5. Recheck Higienópolis against the approved standard.
6. If both pass, promote v1 to CANONICAL_FOR_REGIONAL_PAGES.


## Final production adjudication — 2026-10-05

The bounded production experiment completed successfully.

### Higienópolis

User-observed Google Rich Results Test:

```text
6 valid items
- current location indicators = 1
- local businesses = 2
- organization = 3
- errors = 0 observed
```

The two project-scoped RealEstateAgent nodes correspond to Ária Higienópolis and Mozae Higienópolis and use factual in-person addresses.

### Lapa

User-observed Google Rich Results Test after the final Reserva CEP correction:

```text
10 valid items
- current location indicators = 1
- local businesses = 4
- organization = 5
- errors = 0 observed
```

The four project-scoped RealEstateAgent nodes correspond to Elo Duo, Garden Design, Nova Vivere and Reserva Caminhos da Lapa.

Google Search Console user-observed:
- both regional URLs are indexed;
- HTTPS is valid;
- current location indicators are valid.

### Final SES conclusion

```text
VERDICT = PASS_WITH_RESIDUAL_RISK
PROMOTE_STANDARD = YES
REGIONAL_PAGE_JSONLD_STANDARD_V1 = CANONICAL_FOR_REGIONAL_PAGES
PRODUCT_OR_OFFER_ON_REGION = NO
FAKE_LOCALBUSINESS = NO
PROJECT_SCOPED_REALESTATEAGENT = YES, WHEN FACTUALLY SUPPORTED
ADDRESS_AND_POSTAL_CODE = REQUIRED WHEN AGENT ADDRESS IS USED
```

Residual risk remains limited to external Google processing: valid structured data does not guarantee a fixed rich-result count on every future region.

The canonical contract is now:
`docs/search/MNT_REGIONAL_PAGE_JSONLD_STANDARD_V1_2026-10-05.md`.
