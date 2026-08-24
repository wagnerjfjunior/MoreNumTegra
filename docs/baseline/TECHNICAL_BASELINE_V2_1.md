# MoreNumTegra — Technical Baseline V2.1

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V2_1` when present in resolved `main`
- Date: `2026-08-24`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Functional input: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- Binding ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Supersedes V2 only where this document explicitly changes publication topology, form ownership, preview composition and video behavior.

## 1. Architecture retained from V2

V1 remains:

- semantic HTML5;
- CSS mobile-first;
- vanilla JavaScript;
- no React/Next.js requirement;
- no bundler requirement;
- no custom backend requirement;
- local/versioned catalog;
- GitHub as canonical source;
- Vercel as laboratory/Preview;
- Green Sales as V1 production;
- mobile-first, SEO-first and performance-first;
- no invented inventory/commercial facts.

All V2 requirements not contradicted below remain in force.

## 2. Green Sales is a builder, not a static-file host

The production page is assembled from independent builder modules. Therefore the final release unit is a set of portable snippets plus global CSS/JS, not one standalone HTML document.

Canonical production order:

```text
1. HTML block — initial page / hero / catalog / content / form anchor
2. native Green Sales Form 46 block
3. HTML block — post-form continuation / conversion CTA
4. HTML block — footer
5. page-level CSS
6. page-level JavaScript
```

No HTML block may depend on another block to close an element opened previously.

## 3. Canonical source structure

```text
src-greenn/
  blocks/
    01-html-inicial.html
    02-html-pos-form.html
    03-footer.html
  moretegra.css
  moretegra.js
  preview/
    index.html
```

The old `src-greenn/moretegra.html` may remain temporarily as migration evidence but is not the target Green production artifact after V2.1.

## 4. Native Green form ownership

Production uses the native Green Sales form block associated with:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`
- fields: `nome`, `email`, `telefone`

The page must not replace the Green builder's submission lifecycle with custom `fetch` in production.

Allowed JavaScript around the form is limited to verified, scoped presentation behavior such as:

- scrolling to a stable anchor immediately before the form;
- optional focus/presentation enhancement when a verified selector exists;
- UI behavior that does not intercept native submission.

Forbidden:

- `document.querySelector("form")` against an unspecified form;
- preventing native submit without a separately verified need;
- reconstructing the Green submission endpoint in production JS when the native block already provides it;
- exposing secrets or tokens.

## 5. Stable form anchor

`01-html-inicial.html` must end its conversion section with a stable anchor such as:

```html
<div id="formulario" class="moretegra-form-anchor" aria-hidden="true"></div>
```

The native Green form block is placed immediately after this module.

Later CTAs use `href="#formulario"` or equivalent scoped scroll behavior. They must not depend on undocumented builder-generated IDs/classes.

## 6. Vercel Preview composition

The Vercel laboratory must reproduce the Green builder order using the exact production snippets/CSS/JS.

`src-greenn/preview/index.html` is allowed to contain laboratory-only composition code that:

1. loads/inserts `01-html-inicial.html`;
2. inserts a visually representative, non-sending mock of the native Green Form 46;
3. loads/inserts `02-html-pos-form.html`;
4. loads/inserts `03-footer.html`.

The mock form must never transmit PII or call the Green endpoint.

The Preview shell is not copied to Green production.

Preview remains `noindex, nofollow` and must never be promoted as V1 production.

## 7. Portfolio migration

The previous Green package supplied by the owner contains 19 property cards and two hero variants (campaign video and Château Jardin). It is migration input, not automatically authoritative inventory truth.

The new implementation must not regress to a one-property catalog merely because the first Vercel prototype used ELO Duo as a safe placeholder.

Before each property is published, verify its visible fields against an approved/current source where practical:

- name;
- bairro/location;
- zone;
- development stage;
- metragem;
- bedrooms/suites/parking when shown;
- image/media URL;
- official URL;
- highlight text.

If a field cannot be verified, omit or mark it for validation rather than inventing it.

## 8. Hero direction

The dark hero with high-contrast white headline from the first Vercel prototype is an accepted visual direction to evolve, not discard.

The hero may combine:

- dark/near-black background;
- white primary headline;
- Tegra yellow `#EBB92E` for accent/CTA;
- in-page campaign video or a verified featured-development visual;
- immediate catalog/form CTAs.

No visual choice may compromise mobile LCP/INP/CLS targets.

## 9. Video behavior

The previous click-out behavior that navigates to YouTube is rejected for the target implementation.

Preferred media strategy:

1. authorized MP4/WebM hosted on GDigital/S3 using native `<video muted autoplay loop playsinline>` plus poster/fallback;
2. if only YouTube is available, use an in-page privacy-enhanced iframe (`youtube-nocookie.com`) with muted autoplay, loop and `playsinline`.

For YouTube loop, use the same video ID in `playlist=`. Autoplay must be muted to satisfy modern browser policies.

The player must:

- stay on the page;
- reserve aspect ratio to avoid CLS;
- have a poster/static fallback;
- fail without blocking catalog/filter/CTA/form;
- avoid unnecessary controls/branding where supported;
- avoid becoming a hard dependency for page usability.

The Capri page is a behavioral reference only; do not copy its content/design.

## 10. CSS and JavaScript portability

`src-greenn/moretegra.css` is the page-level CSS pasted into the Green builder CSS field.

`src-greenn/moretegra.js` is the page-level JavaScript pasted into the Green builder JavaScript field.

Both must scope product selectors under MoreNumTegra-specific IDs/classes/data attributes to minimize collision with Green builder markup.

Primary navigation, filters and CTAs must work by touch and without hover dependency.

## 11. Existing V2 performance/SEO/accessibility gates

Retain V2 targets:

- LCP <= 2.5 s;
- INP <= 200 ms;
- CLS <= 0.1;
- WCAG 2.2 AA target;
- one H1;
- semantic headings/landmarks;
- factual indexable content;
- Preview noindex;
- production canonical/robots verified at launch;
- responsive/lazy below-the-fold media;
- no heavy dependency added merely for convenience.

Vercel performance is indicative only because Green production adds builder runtime/markup. Final production acceptance must include Green mobile verification after controlled publication.

## 12. Release gate

A release is publishable to Green only when:

- exact Git SHA is frozen;
- all three production HTML blocks are identified;
- CSS and JavaScript payloads are identified;
- the native Form 46 placement is confirmed;
- CTA-to-form scrolling works;
- filters work on mobile;
- video remains in-page and degrades gracefully;
- portfolio fields included in the release are verified;
- Preview has been visually/functionally accepted;
- previous Green version/export is retained when possible for rollback.

Domain/DNS, analytics/pixels, FECH.AI/n8n/Make/Ads and unrelated integrations remain separate gates.