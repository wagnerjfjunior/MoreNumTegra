# Higienópolis — regional discovery and project selection

Date: 2026-10-17
Task: MNT-HIGIENOPOLIS-REGIONAL-SEARCH-20261017
Status: IMPLEMENTED_IN_BRANCH / AWAITING_VISUAL_ACCEPTANCE / NO_RELEASE
Authority: Product Authority approved the bounded proposal in conversation ("ótimo vamos fazer"). This authorizes implementation and preparation for review, not merge or publication.
Base: `577c87641c71765d43d501da1944ba77444cc948`
Branch: `feat/higienopolis-regional-search-20261017`
Runtime scope: `src-greenn/regioes/higienopolis/index.html` only.

## Problem and intended behavior

Visitors seeking to buy in Higienópolis had to pass neighborhood-history and cultural sections before reaching the two project cards and comparison. The regional must support neighborhood discovery and selection of an exact project within MoreTegra.

New order: hero -> Ária/Mozae cards -> comparison -> existing neighborhood/context -> typologies -> existing form -> FAQ. Hero prioritizes projects, comparison and neighborhood anchors. Card links explicitly name Ária/Mozae. Comparison explains timeline and layout needs, avoids internal "cluster" wording and distinguishes delivered status from unit availability. One price-consultation FAQ is added without publishing prices or implying stock; FAQPage matches all ten visible questions/answers. Meta description reflects the actual selection scope.

The established title, H1, all image tags/credits, Form46, scripts/consent/measurement, identity, contacts, footer and floating actions remain unchanged. No external commercial journey is added. Existing image-attribution links remain for licensing. Exact-project pages, product facts, prices and availability are not changed. Regional Product/Offer is not added.

Moving the cards changes the second content illustration: `#secondary-image` now identifies the existing Ária facade image, preserving the primary hero and aligning schema with visual order. Its caption equals the existing card image ALT.

## Evidence and prioritization

User-supplied GSC export dated 2026-10-16: observed dates 2026-08-29..2026-10-14; regional 5 clicks/19 impressions, Ária 9/131, Mozae 8/98. These are page-table figures; query and page exports are independent, not a query-page join. Small sample does not establish CTR improvement, conversion impact or causal ranking change.

ATP exports for Higienópolis, Vila Nova Conceição and Caminhos and historical repository Planner studies informed intent selection. No demand estimates are added into the regional copy. This is an editorial/navigation hypothesis to test, not a ranking guarantee.

## Pre-change resolution

- Remote main resolved by git fetch: base above.
- Public canonical regional returned HTTP 200; complete served HTML equaled the base file byte-for-byte before modification.
- GitHub open-PR query reviewed: #420/#421 concern Órbita; #412 Bueno Brandão; no Higienópolis regional overlap in returned results. No existing PR modified.
- Production deployment ID was not independently refreshed in this slice. No release performed or claimed.

## Validation observed

- PASS `git diff --check`.
- PASS `node scripts/validate-two-images-39-pages.mjs`: 39/39 routes. First run caught stale secondary-image ownership after section movement; corrected only the regional image reference/caption, then passed.
- PASS `node scripts/validate-onsite-realtor-project-address.mjs`: 19 project agents match addresses; 6 unaffected.
- PASS `node scripts/build-moretegra-release.mjs`: generated artifact restored to baseline afterwards; not part of this change.
- PASS static comparison against base: form, scripts, all image tags, footer, floating nav and H1 unchanged; no graph differences outside approved FAQ and secondary-image node; 10/10 exact visible FAQ/schema parity; unique IDs and valid same-page anchor targets; no regional Product/Offer.
- Browser rendering: NOT_TESTED. Available Playwright package could not launch because browser binaries are absent. No download, substitute screenshot or visual PASS claimed.
- Mobile/desktop visual acceptance, touch, real Form46 delivery, production tracking, CWV, indexation and ranking: NOT_TESTED for this candidate.

## Next action and rollback

Review this exact branch/head through Local Live Sync at `/regioes/higienopolis/`, desktop and mobile. Inspect hero actions, cards, comparison, neighborhood content, FAQ and existing form without sending a real lead. Correct on the same branch if needed; then resolve exact-head CI and request separate merge/release approval.

No changes to global SFJM task pointers while Órbita reconciliation #420/#421 remains open. This receipt records the new user-selected bounded slice without claiming to close those tasks.

Rollback before merge: abandon/revert this branch. After authorized merge: revert only the eventual squash/merge commit through a new PR; preserve unrelated releases. Merge SHA, deployment ID and production acceptance remain NOT_APPLICABLE until release.
