# Gallery curation request — temporary implementation note

Scope authorized by owner on 2026-08-26.

Goal: stop repeating the catalog/card cover image inside the post-intent gallery and never duplicate a second image just to fill a third slot.

Required implementation in `src-greenn/moretegra.js`:

1. `interestGalleryImages(project)` must use only `INTEREST_GALLERIES[project.name]` additional media; do not prepend `project.image`.
2. Deduplicate gallery items by normalized URL and keep at most 3 additional images.
3. If fewer than 2 valid additional images remain, hide the gallery as today.
4. If exactly 2 images remain, render exactly 2 distinct figures in an balanced two-column grid; never repeat image 2 as image 3.
5. If 3 images remain, keep the existing premium bento treatment (one larger + two smaller).
6. Preserve accessibility semantics, lazy loading for non-primary gallery images, error fallback/rebalancing and no autoplay/carousel.
7. Do not change PROJECTS data, prices, Form 46, filters, CTAs, commercial copy, Green composition, analytics, DNS or Vercel config.
8. Run `node --check src-greenn/moretegra.js`.
9. Remove this temporary request file before the candidate is considered ready. Final material diff should be only `src-greenn/moretegra.js`.

Trigger note: apply the already-installed temporary workflow on this synchronization event.
