# MoreNumTegra — RESF Wave 2 Adoption Reconciliation

Status: `PROPOSED_CANONICAL / PRODUCT_AUTHORITY_AUTHORIZED`
Date: `2026-09-14`
Provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`
Consumer: `wagnerjfjunior/MoreNumTegra`

## Why this reconciliation exists

Wave 1 intentionally adopted only a subset of RESF. Search Contract, SEO, Content, Schema, GEO/AEO, Linking and Performance remained deferred in `docs/frameworks/resf/ADOPTION.yaml`.

M3/M4 later executed substantial work in those domains without a canonical adoption update. Product Authority identified the mismatch after comparing the MoreNumTegra structured-data outcome with the Capri benchmark that materially informed RESF.

This document corrects the governance layer. It does not retroactively certify the quality of M3/M4 work.

## Modules promoted in Wave 2

- `RESF-SEARCH-CONTRACT`
- `RESF-SEO`
- `RESF-CONTENT`
- `RESF-SCHEMA`
- `RESF-GEO-AEO`
- `RESF-LINKING`
- `RESF-PERFORMANCE`

Still deferred:

- `RESF-ATTRIBUTION`
- `RESF-PAID`
- `RESF-QA`
- `RESF-OBSERVABILITY`

No provider ref is changed. No framework rule is copied into project truth without consumer applicability/evidence.

## Mandatory interpretation

```text
WAVE_2_ADOPTED != PREVIOUS_WORK_AUTOMATICALLY_CONFORMANT
CAPRI_BENCHMARK != COPY_CAPRI_SCHEMA_BLINDLY
SCHEMA_VALID != GOOGLE_RICH_RESULT_ELIGIBLE
NO_RICH_RESULT_ITEM != STRUCTURED_DATA_SUCCESS
RESF_PATTERN != CONSUMER_BUSINESS_FACT
```

## Capri / RESF relationship

The pinned RESF provider records Capri-derived evidence in its content/search pattern provenance, including editorial + semantic + commercial completeness and canonical continuity observations.

For MoreNumTegra, Capri is therefore a legitimate comparative benchmark for implementation quality and completeness. It is not authority to invent or transplant:

- reviews or ratings;
- business addresses;
- LocalBusiness identity;
- Product/Offer semantics;
- price/availability;
- project facts not present in MoreNumTegra governed evidence.

## Required conformance re-review

The bounded re-review covers:

1. M3-05 Search Intent / Query Ownership;
2. M3-06 Query-family to page-owner map;
3. M4-01 Information Architecture;
4. M4-02 Page contracts;
5. M4-03 Decision-useful content architecture;
6. M4-04 Entity graph/schema contract;
7. M4-05 Factual JSON-LD expansion;
8. M4-06 GEO/AEO answerability;
9. M4-07 semantic internal linking;
10. M4-08 prioritized runtime implementation.

M3-01/02/03 research and M3-04 Product Truth are not repeated unless this review exposes a direct contradiction.

M4-09 technical www/canonical/sitemap closure is not reopened by this content/schema conformance review.

## Structured-data correction gate

M4-05 is reopened as the first material correction candidate because:

- M4-04 already allowed `WebSite`, `WebPage` and a visible governed `ItemList` on the portfolio root;
- M4-05 only added `FAQPage` as its runtime expansion;
- Product Authority supplied current Google Rich Results Test evidence showing no eligible item detected on MoreNumTegra while the Capri benchmark shows multiple detected result classes.

A corrected structured-data implementation must be judged by factual fit and current Google support, not by the number of schema nodes emitted.

Acceptance evidence must distinguish:

- Schema.org semantic validity;
- Google-supported rich-result eligibility;
- Rich Results Test detection/result;
- non-eligible but semantically useful entity markup;
- fields/types intentionally omitted because factual support is absent.

## Execution freeze

Until the conformance audit is adjudicated:

- no new M5 task should start;
- M5-01/M5-02 work already drafted remains noncanonical/unaccepted;
- no runtime remediation is implied by this reconciliation;
- PR #84 remains a separate UX candidate;
- production, DNS, GTM/GA4, Form 46, Search Console, Ads, Meta and external automation remain under their existing gates.
