# Responsive Media Delivery Standard V1 — MoreNumTegra

Status: `CANONICAL` when merged to `main`  
Date: `2026-09-22`  
Scope: exact-project photographic media / mobile-first delivery

## 1. Decision

The responsive-media delivery pattern is adopted as the canonical default for new exact-project photographic hero/gallery implementations and for future bounded performance remediation of existing project pages.

This standard is based on replicated Production evidence from two independent exact-project pages:

### Elo Duo — Slice 08

```text
control LCP = 3,279 ms
responsive hero LCP = 2,383 ms
delta = -896 ms / -27.33%
target <=2,500 ms = PASS
```

### Ária Higienópolis — Slice 09

```text
baseline LCP = 5,621 ms
responsive media attempt 1 median = 1,906 ms / -66.09%
responsive media attempt 2 median = 1,442 ms / -74.35%
target <=2,500 ms = PASS / REPLICATED
baseline transfer = 886,131 B
responsive transfer ~= 535,7 KB
transfer delta ~= -39.5%
```

Evidence:

- `docs/performance/MNT_M5_10_ELO_DUO_RESPONSIVE_HERO_SLICE08_2026-09-22.md`
- `docs/performance/MNT_M5_10_ARIA_RESPONSIVE_MEDIA_SLICE09_2026-09-22.md`

## 2. Applicability

Use this standard for:

- exact-project hero photographs;
- gallery main images;
- gallery thumbnails;
- equivalent photographic media where responsive sizing materially reduces waste.

Do not blindly apply the same crop or widths to every image. Source dimensions, rendered slot, focal point, text/detail readability and desktop composition remain page-specific.

## 3. Hero contract

Hero media must remain discoverable in initial HTML.

Required:

```text
DISCOVERY = INITIAL_HTML
LOADING = EAGER
FETCH_PRIORITY = HIGH
JS_DEPENDENCY_FOR_HERO_URL = FORBIDDEN
MOBILE_RESPONSIVE_SOURCE = REQUIRED_WHEN_SOURCE_IS_OVERSIZED
NO_UPSCALE = REQUIRED
```

Preferred markup:

```html
<picture>
  <source
    media="(max-width:719px)"
    type="image/webp"
    srcset="...-640.webp 640w, ...-NATIVE-MAX.webp <native>w"
    sizes="calc(100vw - 32px)">
  <img
    src="<governed-desktop-or-original-fallback>"
    width="..."
    height="..."
    fetchpriority="high"
    decoding="async"
    alt="...">
</picture>
```

Rules:

- do not add `loading="lazy"` to LCP hero;
- do not add blanket hero preload;
- keep the governed original as fallback/desktop until a desktop derivative is separately justified;
- candidate widths must not exceed useful/native source detail;
- `sizes` must reflect the actual layout slot, not a generic guess.

## 4. Hero mobile budget

```text
PREFERRED_TRANSFER <= 100 KiB
HARD_REVIEW_THRESHOLD > 150 KiB
```

If the source cannot satisfy the preferred budget without visible quality loss, retain the best evidence-backed candidate and record the exception.

## 5. Crop and art direction

A derivative may reproduce the current browser crop only when the current composition is governed by deterministic `object-fit:cover` + known `object-position`.

For centered cover:

1. calculate the exact target aspect ratio;
2. center-crop the source to that ratio;
3. resize without upscaling;
4. visually/smoke validate framing.

If focal point is not safely centered, use an explicit governed focal point or art-directed source. Never assume center crop is acceptable for people, text, architecture details or asymmetric compositions.

## 6. Gallery main contract

Below-the-fold gallery main media should:

- keep `loading="lazy"`;
- keep explicit layout reservation/aspect ratio;
- use responsive derivatives for the mobile slot;
- preserve original/governed fallback for desktop when no desktop derivative is validated;
- preserve keyboard/touch/navigation semantics.

Preferred mobile budget:

```text
GALLERY_MAIN_PREFERRED_TRANSFER <= 120 KiB
```

Do not retain an over-budget candidate merely because it has more pixels. Ária rejected a 1080w candidate at `151,796 B` while the 828w candidate was `102,838 B` and met the mobile slot requirement.

## 7. Thumbnail contract

Gallery thumbnails must not reuse large gallery originals when a dedicated derivative can be generated.

Preferred:

```text
THUMB_WIDTH ~= 200-320 px
THUMB_PREFERRED_TRANSFER <= 30 KiB
LOADING = lazy
EXPLICIT_DIMENSIONS = required
```

Ária validated a 240x180 WebP at `10,474 B`.

## 8. Interactive gallery source restoration

If the main gallery image changes dynamically:

- responsive source state must follow the active scene;
- when a scene has responsive variants, restore its `srcset/sizes`;
- when a scene does not have variants, remove the previous scene's responsive `srcset/sizes` before switching `img.src`;
- preserve caption, count and `aria-current`;
- preserve arrow and keyboard navigation.

A responsive `picture` must not trap subsequent gallery scenes on the first image's `source`.

## 9. Format policy

Current validated V1 default:

1. WebP responsive derivatives;
2. original governed JPEG/WebP as fallback/desktop.

AVIF may be added later only when the generation/QA workflow is stable and evidence shows value. AVIF is not required to use this standard.

## 10. Storage policy

Large originals and heavy media volumes remain external (Green/GDigital S3 or another authorized origin).

Small essential generated derivatives may be project-owned in GitHub during V1 when:

- each file stays within the applicable budget;
- total volume remains small;
- files are immutable/traceable;
- the source provenance is documented;
- no large media library is migrated into GitHub.

This is not authorization to store bulk galleries/videos in GitHub.

## 11. SEO/social/schema boundary

Responsive runtime delivery must not silently replace governed social/entity references.

Unless separately authorized:

- Open Graph image remains the governed social source;
- Twitter image remains governed;
- JSON-LD `ImageObject/contentUrl` remains governed;
- alt semantics remain unchanged;
- canonical/robots/schema remain unchanged.

Runtime responsive derivatives are a delivery optimization, not a new factual media claim.

## 12. Validation contract

Before retaining a remediation on an existing page:

1. freeze a Production baseline with the same Lighthouse method;
2. record original dimensions/bytes;
3. generate derivatives with deterministic parameters;
4. reject upscale;
5. run exact-head static + browser regression gates;
6. deploy exact candidate to Production;
7. smoke mobile asset selection on the public canonical host;
8. minimum five Lighthouse mobile runs;
9. compare medians;
10. preserve CLS <=0.1;
11. preserve Form46/Measurement/CTA/accessibility;
12. create no real lead during performance QA unless explicitly authorized.

For high-confidence standard validation, an independent repeated battery is preferred when the measured effect is being generalized across the project.

## 13. Performance interpretation

Do not infer field INP from TBT.

Do not attribute all LCP movement to image bytes when other runtime variables changed.

For a responsive-media A/B to support causal interpretation:

- baseline and candidate should differ only in media delivery for the tested route;
- Measurement/Form46/other runtime behavior must remain unchanged;
- same lab method and viewport must be used.

## 14. Rollback

Keep the original governed source URL intact.

A rollback should be possible by:

- removing the responsive `source/srcset` contract;
- restoring the prior thumbnail/main references;
- leaving the original external asset untouched.

Never destructively overwrite the governed original to implement this standard.

## 15. Adoption boundary

```text
STANDARD = ADOPTED
AUTOMATIC_BULK_REWRITE_OF_EXISTING_PAGES = NOT_AUTHORIZED
NEW_EXACT_PROJECT_PAGES = USE_STANDARD_BY_DEFAULT
EXISTING_PAGE_REMEDIATION = BOUNDED_SLICE + QA REQUIRED
```

CAPIITOLO remains a special case because its hero composition and bootstrap architecture differ. Apply the standard principles, not a blind copy of Elo/Ária markup.

## 2026-11-26 addendum — MNT-PERF-V7 reference and bounded scale

Owner explicitly approved incorporating the V7 method into the consumer RESF. Applies to new pages across applicable route families, and existing pages only through authorized bounded slices. The existing §3–15 rules remain binding. Homepage-specific evidence: docs/sfjm/MNT_PERF_V7_RESPONSIVE_MEDIA_2026-11-26.md. Execution checklist, quality gates and proposed lab budgets: docs/performance/MNT_RESF_PERFORMANCE_SCALE_RUNBOOK_2026-11-26.md.

- Prefer measured responsive delivery, not a universal width or crop. Use existing `assets/resf/manifest.json` and `assets/resf/<slug>/` for small essential derivatives; reuse existing verified candidates and shared logos. V7 home assets remain under `assets/home/`. Preserve original external authorized assets and SEO/social/schema references. No bulk gallery/video migration into GitHub; record aggregate storage budget and use authorized CDN for scale when needed.
- The V7 direct-child hero uses `img srcset/sizes` to preserve player/CSS contract. This is an allowed alternative to picture/source; no blanket preload. When measurement justifies hero preload, match `imagesrcset/imagesizes` exactly to img and confirm one selected request/no duplicate or incorrect mobile prefetch. Use picture for explicit media art direction when needed; preserve gallery/player semantics. Correct intrinsic dimensions from actual source; no upscale. Verify currentSrc, network bytes/cache headers, crop/quality, DPR and all relevant breakpoints.
- Existing 100 KiB preferred hero / 150 KiB review / 120 KiB gallery / 30 KiB thumbnails budgets remain. Smaller is preferable only when visual quality and interaction survive. Do not use the homepage 960/768/288 widths or quality 70/65 as universal defaults.
- Compare five mobile runs before/after under same conditions, preserve all raw metrics, median and worst; note any outlier rather than discard selectively. Existing CWV targets stand. V7 reference does not certify other routes, field metrics, or full five-run battery. Do not mutate consent, tracking, forms, commercial data, structured metadata, visual facts or attribution for performance alone. Preserve region-specific channels. Separate changes by cause; rollback exact slice if regression. No blanket rewrite, no authorization transfer.
