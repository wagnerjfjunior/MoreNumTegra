# MNT Search Image Ownership Standard V1 — MoreNumTegra
Data: 2026-10-10
Status: CANDIDATE / RESF 2.0 / PRODUCT_AUTHORITY_IMAGE_SELECTION_APPROVED / PENDING_MERGE

## Intent and scope
The **36 page-to-hero image associations** in `docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json` are explicit decisions by Product Authority. They represent the preferred Search image of the corresponding exact-project and region pages. The Site may show the human agent as a separate factual entity, without using her photograph as a `WebPage` or `Product` primary image.

Canonical site: `https://www.moretegra.com.br/`. Content source authority is GitHub `main`, not this draft PR until merged. All changes require preview, tests and release traceability.

DSG Itaim and CAPIITOLO are deliberately excluded from the 36-route common rollout; they have a separate media-only draft PR #365. Home follows the approved image contract in PR #355.

## Required contracts, without inventing image URLs
1. The hero remains discoverable in initial HTML as `<img src>` / `<picture><img src>`, with a meaningful existing `alt`. Do not require JS to discover the primary image.
2. In the initial `<head>`, `og:image` and `twitter:image` should refer to the owner's approved primary URL unless a specific and documented art-direction exception exists. If dimensions/type are included, they must be measured, not guessed.
3. `WebPage.primaryImageOfPage` points to an `ImageObject` with `contentUrl` exactly equal to the approved page image. `WebPage.image` may reference the same `ImageObject` as an additional signal.
4. When `Product.image`, `ApartmentComplex.image`, or `Place.image` intends to represent that same page-owned primary image, use the approved URL or matching `ImageObject @id`. **Do not** require a geographical `Place.image` inside a project page to equal the project's facade, because it may depict a different subject.
5. Regional pages are discovery/Place/ItemList surfaces, not single sellable products. Never add `Product`, `Offer`, `merchant listing`, or invented project details to pass a media audit.
6. `Person`, `RealEstateAgent` and `Service` nodes remain factual and may contain Sabrina's image. Do not globally remove her photo, `noimageindex` it, or remove truthful entities merely to influence Google thumbnails. Ensure Sabrina's image is not `WebPage.primaryImageOfPage`, `ImageObject` primary, or `og:image` on exact-project/region pages.
7. Treat gallery images and contextual real-estate images as distinct from primary Search image; they must not be bulk-overwritten.
8. Performance/mobile remain governed by `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`. Do not eager-load below-fold galleries or replace responsive assets with heavyweight originals.

## Google processing caveat
Google Search states that selecting the image preview is automated; `primaryImageOfPage`, main entity `image` and `og:image` are supporting preferences, **not a forced SERP thumbnail control**. Human approval is not evidence that Google already uses the selected image. Check actual crawlability, image HTTPS status, Search Console, live rendered HTML, and eventual query-specific observations after authorized releases. Source: Google Search Central, Image SEO Best Practices.

## Rollout and evidence
- PR #364 draft: manifest, read-only audit, source/HTTP evidence and anti-regression guard.
- Baseline audit at 2026-10-10: 36 owner-selected heroes, 36 OG and Twitter images, 28 distinct URLs HTTP OK.
- Deeper image graph audit at PR #364 HEAD: 18/36 structurally aligned; 18 review candidates; 0 Sabrina Person images used as page primary.
- PR #366 draft (base #364): 16 exact deficient `WebPage` → `ImageObject` links corrected on 5 exact projects and 11 regions. Re-run indicates **35/36** aligned and Sabrina competing primary **0**, with no change to hero, copy, CTA, price or media files.
- PR #367 draft (base main): isolated Ária change to align hero, OG, Twitter, `ImageObject` and `Product` image. Preserve Rich Results / Merchant Listing semantics and verify source media dimensions. PR is not a release.
- Elo Duo Place image disagreement was a **false positive** from applying region semantics to an exact-project page; auditor rule corrected in PR #366.
- DSG Itaim and CAPIITOLO excluded from common rollout; no claims about their SERP owner under this contract.

## Release gates
1. Merge and validate governance/inventory first (PR #364), without accidental runtime modifications.
2. Integrate PR #366 only after full unit + regression validation and production/preview reconciliation. Rebase stacked PR to `main` after its base is merged.
3. Integrate PR #367 independently after verifying image dimensions, social sharing, existing Product/Offer references, Rich Results and Merchant Listing preservation.
4. Run a final audit from the **integrated main SHA** to require all 36 approved routes aligned; collect exceptions with source evidence rather than bypassing contract.
5. On authorized production release, check 200/canonical/indexability, mobile render/LCP, sitemap and Search Console. Request recrawl where appropriate and observe thumbnails without promising timings or a specific Google result.
6. Never merge while required CI failures are unexplained; preexisting unrelated CI failures must be separately compared against main and documented.

## Anti-regression
`docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json` is the protected owner-selected route→hero URL manifest. Both URL changes and a conversion from page-owned ImageObject to Sabrina Person image require explicit Product Authority reapproval. Approved URLs alone do not authorize changing other gallery images or cross-page photos.
