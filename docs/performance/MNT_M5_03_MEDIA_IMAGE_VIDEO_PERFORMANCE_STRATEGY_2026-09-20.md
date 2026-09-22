# MNT-M5-03 — Media/Image/Video Performance Strategy

Status: `COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION`

Canonicalized: `2026-09-20`  
Repository: `wagnerjfjunior/MoreNumTegra`

## 1. Authority and scope

Product Authority explicitly authorized `MNT-M5-03 — Media/image/video performance strategy` on 2026-09-20.

This task authorizes analysis and architectural strategy only. It does **not** authorize:

- replacing or recompressing Production assets;
- changing HTML/CSS/JS runtime;
- changing preload/fetchpriority behavior in Production;
- changing GTM/GA4/Consent;
- changing Form 46;
- changing SEO/canonical/DNS/Vercel configuration;
- executing `MNT-M5-10 — Authorized performance remediation`.

M5-02 remains the measurement baseline and is not reinterpreted here.

## 2. Exact state analyzed

```text
CANONICAL_MAIN = 0114b386b5fe9b58287e40424eb50947f6fa1f95
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
M5_02_RUN = 35538473832
M5_02_ARTIFACT = 10612579543
```

Analyzed public routes:

- `/`;
- `/empreendimentos/capiitolo-piero-lissoni/`;
- `/empreendimentos/caminhos-da-lapa-elo-duo/`;
- `/empreendimentos/aria-higienopolis/`.

## 3. Evidence summary

M5-02 mobile lab medians:

| Route | Lighthouse simulated LCP | CLS | Result |
|---|---:|---:|---|
| Home | 1,346 ms | 0.0131 | LCP PASS / CLS PASS |
| CAPIITOLO | 5,493 ms | 0.0012 | LCP FAIL / CLS PASS |
| Elo Duo | 8,234 ms | 0.0299 | LCP FAIL / CLS PASS |
| Ária | 5,357 ms | 0.0281 | LCP FAIL / CLS PASS |

The exact-project LCP elements are hero JPEG images.

Representative hero resources:

| Route | Hero transfer | Format | Priority | Image-delivery estimated waste |
|---|---:|---|---|---:|
| CAPIITOLO | ~172 KiB | JPEG | High | ~138 KiB |
| Elo Duo | ~237 KiB | JPEG | High | ~207 KiB |
| Ária | ~221 KiB | JPEG | High | ~202 KiB |

Important interpretation boundary:

- Lighthouse was run with **simulated throttling**. Its scored/simulated LCP is the canonical lab baseline for M5-02.
- The same reports also contain runner-observed LCP around 1.39–1.67 s for the project pages. Those observed trace values do **not** replace the M5-02 simulated baseline.
- The large gap reinforces sensitivity to constrained mobile network conditions; it does not prove a unique root cause.

Representative LCP breakdown from the Lighthouse insight layer:

```text
CAPIITOLO:
TTFB ~64 ms
resource load delay ~58 ms
resource load duration ~1257 ms
element render delay ~11 ms

ELO DUO:
TTFB ~53 ms
resource load delay ~163 ms
resource load duration ~1442 ms
element render delay ~15 ms

ÁRIA:
TTFB ~50 ms
resource load delay ~155 ms
resource load duration ~1444 ms
element render delay ~11 ms
```

This evidence does not indicate Vercel document TTFB or element render delay as the dominant first remediation target.

## 4. Current media implementation findings

### 4.1 Elo Duo and Ária

Both pages:

- emit the hero image directly in the initial HTML;
- use `fetchpriority="high"`;
- do not lazy-load the hero;
- preconnect to `stracctegra.blob.core.windows.net`;
- preserve explicit width/height;
- use a single JPEG URL without responsive `srcset` or modern-format `picture`.

Lighthouse confirms the hero request is discoverable and high-priority. Therefore the primary strategy is **not** to add more priority hints blindly.

Observed sizing findings:

```text
ELO DUO source ~= 694x605
displayed mobile ~= 361x484 in the Lighthouse image-delivery analysis
estimated hero waste ~= 207 KiB

ÁRIA source ~= 714x620
displayed mobile ~= 361x324
estimated hero waste ~= 202 KiB
```

### 4.2 CAPIITOLO

CAPIITOLO differs architecturally.

The public route:

1. ships a bootstrap document;
2. preconnects to the Tegra Azure Blob origin;
3. preloads the hero JPEG;
4. fetches `/experiments/capiitolo-editorial-v3/index.html` with `cache:"no-store"`;
5. parses that document;
6. mutates metadata/content;
7. replaces the document via `document.write`.

The experiment source itself contains the final hero, galleries and video logic.

The extra experiment HTML request was small/fast in the observed run (~11 KiB transfer and roughly 34 ms on the runner), so the current evidence does **not** justify claiming this bootstrap as the primary LCP cause.

It is nevertheless an architectural portability/complexity residual and should not be expanded as the template for new project pages.

### 4.3 CAPIITOLO image waste below the fold

The Lighthouse image-delivery audit identified approximately **1,042 KiB** of page-level potential savings, including:

- hero JPEG: ~138 KiB estimated waste;
- gallery/pool image: ~505 KiB resource with ~460 KiB estimated waste;
- full-width night facade: ~511 KiB resource with ~456 KiB estimated waste.

This makes CAPIITOLO the strongest candidate for a page-wide responsive-image pass, not only hero replacement.

### 4.4 Ária gallery

The main gallery image is approximately 315 KiB and Lighthouse estimates ~288 KiB waste.

The current gallery uses large original images for both the main view and thumbnail references. Although browser caching can prevent duplicate transfer for identical URLs, the architecture has no dedicated thumbnail derivative contract.

### 4.5 Video

CAPIITOLO already applies useful protections:

- the YouTube iframe starts with `data-video-src`, not `src`;
- mobile <=700 px does not hydrate the video;
- `navigator.connection.saveData` suppresses it;
- `prefers-reduced-motion: reduce` suppresses it;
- eligible desktop hydration uses idle/timer deferral;
- the poster remains the visual fallback.

These protections should be preserved. M5-03 does not recommend eager-loading YouTube.

## 5. Canonical media strategy

### S1 — Keep LCP media statically discoverable

For exact-project pages, the LCP poster/image must be represented directly in initial HTML.

Required invariant:

```text
LCP_MEDIA_DISCOVERY = INITIAL_HTML
LCP_LOADING = EAGER
LCP_PRIORITY = HIGH
LCP_RUNTIME_JS_DEPENDENCY = FORBIDDEN
```

Do not make the hero URL dependent on a runtime fetch, catalog API or JavaScript registry.

A media registry may govern authoring/validation, but it must not become a client-side prerequisite for first-paint hero discovery.

### S2 — Use responsive modern image derivatives

For photographic media, create pre-generated variants outside GitHub heavy-asset storage.

Preferred delivery family:

1. AVIF;
2. WebP;
3. JPEG fallback.

Runtime markup pattern:

```html
<picture>
  <source type="image/avif" srcset="... 480w, ... 768w, ... 1200w" sizes="...">
  <source type="image/webp" srcset="... 480w, ... 768w, ... 1200w" sizes="...">
  <img src="...jpg"
       srcset="... 480w, ... 768w, ... 1200w"
       sizes="..."
       width="..."
       height="..."
       fetchpriority="high"
       alt="...">
</picture>
```

Exact widths must be validated against each page layout and real source dimensions; do not upscale beyond useful source detail.

### S3 — Media storage/origin

Do not add large binary media volumes to GitHub.

Preferred origin order:

1. existing authorized GDigital/S3 media origin when upload/derivative workflow is available;
2. another explicitly authorized media/CDN origin;
3. existing Tegra Azure originals as fallback/source material.

Do not migrate origin solely because Lighthouse showed HTTP/1.1. The measured problem is materially image payload/dimension-related; protocol migration alone is not a demonstrated fix.

Media URLs must remain decoupled from layout so the origin can be changed later without redesigning the page.

### S4 — Hero performance budgets

These are engineering budgets for future remediation validation, not claims about current asset quality.

Mobile hero target:

```text
PREFERRED_TRANSFER <= 100 KiB
HARD_REVIEW_THRESHOLD > 150 KiB
FORMAT = AVIF/WebP preferred
DISCOVERY = initial HTML
FETCH_PRIORITY = high
LAZY = forbidden
```

Desktop hero target:

```text
PREFERRED_TRANSFER <= 180 KiB
HARD_REVIEW_THRESHOLD > 250 KiB
```

Any exception requires visual-quality evidence and repeatable Lighthouse evidence.

### S5 — Art direction

Elo Duo and Ária have hero aspect ratios close enough to the current mobile card layout that responsive resizing/compression is the first strategy.

CAPIITOLO uses a near-full-viewport `object-fit:cover` hero. A dedicated portrait/mobile crop is recommended so mobile does not download pixels that are immediately cropped away.

Recommended CAPIITOLO source classes:

```text
mobile portrait / narrow hero
tablet
desktop landscape
```

The focal point must be visually validated; automatic center-crop is not assumed acceptable.

### S6 — Preload policy

Do **not** add blanket image preloads to every project page.

Elo Duo and Ária already expose a high-priority hero directly in initial HTML. Their measured resource-load delay (~155–163 ms) is secondary to resource-load duration.

Policy:

- preserve direct HTML discovery + `fetchpriority=high`;
- add a responsive preload only when a new exact-head measurement proves meaningful discovery delay;
- if preload is used with responsive variants, preload the same responsive candidate contract to avoid double download.

CAPIITOLO's current explicit preload is justified by its client-side bootstrap architecture. If CAPIITOLO is later flattened to direct static HTML, retest whether that preload is still useful.

### S7 — Below-the-fold galleries and plans

Below-the-fold photographic images:

- keep `loading="lazy"`;
- keep explicit dimensions/aspect-ratio reservation;
- use responsive AVIF/WebP/JPEG derivatives;
- avoid serving 1400–2048 px originals into ~360–600 px rendered slots;
- use dedicated thumbnail derivatives for thumbnail UI;
- load alternate gallery scenes on user intent where practical rather than prefetching the full gallery.

Proposed budgets:

```text
gallery/main mobile preferred <= 120 KiB
thumbnail preferred <= 30 KiB
floor-plan preferred <= 160 KiB where fine text/detail requires higher quality
```

Floor plans require readability QA before aggressive compression.

### S8 — Video remains progressive enhancement

Video must not become a mobile LCP dependency.

Required behavior:

```text
MOBILE_AUTOPLAY_IFRAME = NO
SAVE_DATA_IFRAME = NO
REDUCED_MOTION_AUTOPLAY = NO
POSTER_FALLBACK = REQUIRED
CATALOG/CTA/FORM_DEPENDENCY_ON_VIDEO = NO
```

Desktop autoplay/ambient video may remain only after the poster/LCP path is complete and must be revalidated for network/main-thread competition.

A facade/user-initiated player is an acceptable future optimization if product UX permits, but it is not required by M5-03.

### S9 — CAPIITOLO bootstrap containment

The current CAPIITOLO bootstrap pattern is legacy containment, not the canonical future page architecture.

Strategy:

- do not replicate the client-side fetch/parse/`document.write` pattern to new pages;
- prefer direct final semantic HTML for new exact-project pages;
- treat flattening CAPIITOLO as a separately testable remediation slice only if M5-10 is authorized;
- preserve all canonical/schema/Form46/Measurement/accessibility behavior if flattening is attempted.

M5-03 does not claim flattening alone will solve LCP.

### S10 — Media registry contract

Introduce a lightweight project-owned registry **only as an authoring/validation source**, not a runtime LCP dependency.

Suggested fields:

```text
media_id
project_slug
role = hero | gallery | thumb | floorplan | poster | social
source_original_url
avif_variants[]
webp_variants[]
fallback_variants[]
intrinsic_width
intrinsic_height
alt
focal_point (optional/governed)
source_provenance
last_validated_at
```

The registry may later support a validator/generator. Heavy binaries remain external.

## 6. Recommended M5-10 remediation slices

This section is a strategy/dependency map only. It does **not** authorize M5-10.

### Slice P1 — Elo Duo hero

Why first:

- worst simulated LCP baseline: 8,234 ms;
- hero-only estimated waste ~207 KiB;
- direct HTML architecture makes rollback simple.

Candidate work:

- generate responsive AVIF/WebP derivatives;
- preserve JPEG fallback;
- add `picture/srcset/sizes`;
- keep direct high-priority discovery;
- rerun exact M5-02 Lighthouse methodology.

### Slice P2 — Ária hero + first gallery asset

Candidate work:

- responsive hero derivatives;
- responsive main gallery derivative;
- thumbnail derivative contract;
- preserve gallery accessibility behavior accepted in M5-01.

### Slice P3 — CAPIITOLO hero + large below-fold images

Candidate work:

- portrait mobile hero art direction;
- responsive modern hero;
- optimize the two ~500 KiB below-fold images;
- preserve mobile video suppression.

### Slice P4 — CAPIITOLO bootstrap flattening assessment

Only after image-only evidence is available.

Candidate work:

- compare image-only remediation result with current architecture;
- flatten only if there is measurable performance/maintainability value and regression risk is bounded.

This ordering avoids combining asset optimization with structural rewrite in the first experiment.

## 7. Validation contract for any future remediation

Every M5-10 slice must use exact-head evidence and preserve:

- M5-01 accessibility/mobile acceptance;
- Form 46 behavior without sending test leads unless explicitly authorized;
- Measurement/Consent contracts;
- canonical/robots/schema;
- floating WhatsApp and CTA behavior;
- image alt semantics;
- CLS <= 0.1.

Performance validation:

1. same Production-like/mobile Lighthouse configuration as M5-02;
2. minimum three runs;
3. compare medians;
4. record LCP element identity;
5. record transfer bytes and image-delivery savings;
6. distinguish simulated Lighthouse values from observed trace values;
7. never infer INP from TBT;
8. field CWV remains separate evidence.

Success target for project pages remains:

```text
LAB LCP <= 2500 ms
LAB CLS <= 0.1
FIELD INP <= 200 ms only when field evidence exists
```

A faster score alone is not acceptance if functional/accessibility regression is introduced.

## 8. Rollback strategy

Future asset remediation must be reversible by URL/markup rollback without deleting originals.

Required:

- retain original governed source URL;
- use immutable derivative URLs;
- avoid destructive overwrite of the source image;
- change one project/slice at a time;
- keep a known-good previous markup reference.

## 9. Decisions

```text
M5_03_D01 = RESPONSIVE_MODERN_FORMAT_DERIVATIVES / ADOPT
M5_03_D02 = LARGE_MEDIA_IN_GITHUB / REJECT
M5_03_D03 = JS_DEPENDENT_HERO_DISCOVERY / REJECT
M5_03_D04 = BLANKET_PRELOAD_ALL_HEROES / REJECT
M5_03_D05 = CAPIITOLO_MOBILE_VIDEO_SUPPRESSION / PRESERVE
M5_03_D06 = CAPIITOLO_BOOTSTRAP_PATTERN_FOR_NEW_PAGES / REJECT
M5_03_D07 = MEDIA_REGISTRY_AS_AUTHORING_VALIDATION_SOURCE / ADOPT
M5_03_D08 = MEDIA_REGISTRY_AS_RUNTIME_LCP_DEPENDENCY / REJECT
M5_03_D09 = IMAGE_OPTIMIZATION_BEFORE_GTM_TUNING / PRIORITIZE
M5_03_D10 = M5_10_RUNTIME_REMEDIATION / STILL_NOT_AUTHORIZED
```

## 10. Completion

```text
MNT-M5-03 = COMPLETE / STRATEGY_ESTABLISHED / NO_RUNTIME_MUTATION
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

M5-03 is complete when this strategy is canonical in `main`. No Production behavior is changed by this task.

## 11. Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 800
REMAINING_FORECAST_HOURS = 440
ACCEPTED_PERCENT = 64.52
MNT-M5 = ACTIVE
MNT-M5-04 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```


## 12. Post-strategy validation — 2026-09-22

M5-10 subsequently validated the responsive-media strategy on two independent exact-project pages.

Elo Duo Slice 08:

```text
LCP 3,279 -> 2,383 ms
delta = -27.33%
target <=2,500 ms = PASS
```

Ária Slice 09:

```text
baseline LCP = 5,621 ms
post-change independent median A = 1,906 ms / -66.09%
post-change independent median B = 1,442 ms / -74.35%
transfer reduction ~= 39.5%
target <=2,500 ms = PASS / REPLICATED
```

Therefore:

```text
M5_03_D01 = RESPONSIVE_MODERN_FORMAT_DERIVATIVES / ADOPT / CROSS_PROJECT_VALIDATED
M5_03_D02 = LARGE_MEDIA_IN_GITHUB / REJECT / SMALL_ESSENTIAL_DERIVATIVES_ALLOWED
M5_03_D10 = M5_10_RUNTIME_REMEDIATION / AUTHORIZED_PER_SLICE_ONLY
RESPONSIVE_MEDIA_STANDARD = docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md
```

This addendum does not retroactively authorize bulk mutation. Existing pages remain bounded remediation slices.
