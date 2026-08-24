# MoreNumTegra — Technical / Architectural Baseline V2

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V2` when present in resolved `main`
- Date: `2026-08-23`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Functional input: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Supersedes: `docs/baseline/TECHNICAL_BASELINE_V1.md`
- Baseline class: architecture, portability, performance, SEO, Greenn form integration, testing and release strategy
- Production/domain authority: not granted by this document beyond the explicitly approved Greenn V1 publication flow; DNS/custom-domain changes remain separate.

## 1. Reason for supersession

After TECHNICAL_BASELINE_V1 was integrated, the project owner made a material implementation decision: the V1 must use the same portable HTML/CSS/JavaScript artifacts in GitHub/Vercel Preview and in Greenn production, avoiding a Next.js-specific implementation that would require a separate Greenn version.

This is a deliberate architecture change, not a patch to the Next.js baseline.

## 2. Architecture decision summary

| Area | Decision V2 |
|---|---|
| Application model | portable static landing/catalog experience |
| Markup | semantic HTML5 |
| Styling | CSS, mobile-first |
| Client logic | vanilla JavaScript |
| Framework | none required in V1 |
| Bundler | none required in V1 |
| Backend | none required for V1 page rendering |
| Catalog | local/versioned data separated from presentation where it reduces repetition |
| Filtering | client-side over already available local catalog data |
| Primary preview | Vercel Preview |
| Production V1 | Greenn page using the same validated HTML/CSS/JS artifacts with minimal environment adaptation |
| Lead capture V1 | Greenn embedded form contract, tenant 313 / form 46 |
| Future CRM evolution | FECH.AI/n8n/Make/Meta integrations are deferred and must not block V1 |

## 3. Portability contract

The implementation must prioritize artifacts that can be tested in GitHub/Vercel and then placed in Greenn without a separate rewrite.

Target structure:

```text
src-greenn/
  moretegra.html
  moretegra.css
  moretegra.js
```

Additional small assets/configuration are allowed when they do not break this portability contract.

Do not introduce Next.js, React, framework-specific runtime behavior, server rendering requirements, or a custom backend unless a later material requirement proves the portable static model insufficient.

## 4. Canonical flow

```text
GitHub main
-> implementation branch
-> Vercel Preview / static preview
-> functional + mobile + performance + SEO validation
-> approved release artifact
-> Greenn production V1
```

GitHub remains the source of truth. Vercel is homologation/Preview. Greenn is the V1 production surface.

Files published in Greenn must derive from the same validated source files/commit or a traceable release generated from them.

## 5. Catalog and UI

Use a local/versioned catalog representation and keep data separate from rendering logic where practical.

Typical fields, only when verified:

- name;
- slug;
- bairro/location;
- region/zone;
- stage;
- metragens;
- image/media reference;
- approved URL;
- highlights.

Canonical known stages:

- `Pronto para Morar`;
- `Em construção`;
- `Lançamento`.

Do not invent price, address, availability, area, commercial condition or project characteristic.

Filters for zone/location and development stage must work by touch on mobile, expose visible state, combine deterministically and provide an explicit empty-results state.

## 6. Greenn form contract V1

Verified project contract:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`
- fields: `nome`, `email`, `telefone`
- endpoint observed from Greenn embed: `POST https://back.gdigital.com.br/form/register`

The implementation may use this verified Greenn embedded-form contract as the V1 lead-capture mechanism. Do not create an intermediary API/backend unless a real requirement is demonstrated.

The form must be scoped to its own identifier, for example `#moretegra-lead-form`. Avoid global selectors such as `document.querySelector("form")`.

Prefer native `fetch` when compatible with the verified contract.

Required UI behavior:

- validate name/email/phone;
- mobile-appropriate phone mask/input handling;
- `Enviando...` state;
- prevent duplicate submission;
- success state;
- server/application error state;
- network-failure state.

Never expose tokens or secrets in HTML/JS/GitHub. If the verified Greenn contract later requires a secret that cannot safely be public, stop and revise the integration architecture before publication.

## 7. Brand contract

Canonical Tegra yellow: `#EBB92E`.

Approved brand assets:

- transparent yellow logo: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`
- gray logo: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Cinza.webp`

Do not replace the Tegra logo with a generic `T`.

The existing favicon concept may be retained with its yellow aligned to `#EBB92E`.

## 8. Media strategy

Do not store large media volumes in GitHub.

Prefer GDigital/S3 or another authorized media origin for heavy images/video. Keep media URLs decoupled from layout logic so the origin can later move to another CDN.

Rules:

- responsive image sizing;
- explicit dimensions/aspect-ratio to control CLS;
- lazy-load below-the-fold media;
- video must be non-critical and must not block LCP;
- video/player failure must leave catalog, filters and CTAs usable;
- provide static fallback/poster when appropriate.

## 9. Mobile and performance

Mobile is the first acceptance path. The owner-reported `>90% mobile traffic` remains USER_REPORTED until analytics verifies it.

Field targets:

- LCP <= 2.5 s;
- INP <= 200 ms;
- CLS <= 0.1.

Implementation rules:

- minimal JavaScript;
- no heavy UI/animation library for V1;
- no hover-only primary interaction;
- defer non-critical scripts/media;
- reserve media layout space;
- keep primary content available without waiting on external APIs;
- avoid unnecessary third-party dependencies.

## 10. SEO baseline V2

SEO is structural, not an afterthought.

Implement where applicable:

- unique `title`;
- meta description;
- canonical only when approved production origin is known;
- robots behavior by environment;
- Open Graph metadata;
- Twitter metadata;
- exactly one primary H1;
- coherent H2/H3 hierarchy;
- semantic HTML landmarks;
- indexable textual content;
- verified location/bairro/stage content;
- real internal links only;
- meaningful image alt text;
- valid JSON-LD only for facts actually verified;
- ItemList when the visible catalog supports it;
- FAQPage only when the FAQ is visible and the content is factual.

Do not copy jordanacyrela.com.br/capri content. It may only inform SEO strategy.

Do not use keyword stuffing and do not invent structured-data facts.

Vercel Preview must remain noindex. Greenn production indexation/canonical behavior must be verified before launch.

## 11. Accessibility

Target WCAG 2.2 AA for V1 interactions and visual acceptance.

Minimum controls:

- semantic structure;
- accessible labels;
- keyboard operability;
- visible focus;
- adequate touch targets;
- status not communicated by color alone;
- sufficient contrast;
- form errors associated with fields;
- reduced-motion respect when motion exists.

## 12. Conversion surfaces

Preserve the working interaction patterns reported by the owner:

- floating WhatsApp;
- `Receber condições` CTA.

The final WhatsApp destination remains blocked until verified. Do not infer a number or URL.

## 13. Testing and acceptance

Before implementation PR merge and before Greenn publication:

- validate HTML structure;
- lint/check JavaScript where tooling is introduced;
- execute automated tests for filtering/form logic where practical;
- perform mobile viewport critical-flow tests;
- verify no primary runtime/console errors;
- verify zone/location filtering;
- verify stage filtering;
- verify combined filters and reset;
- verify badges;
- verify CTAs render and are touch-operable;
- verify form validation/submission states using non-sensitive test data;
- verify optional media failure tolerance;
- evaluate Lighthouse/mobile performance where tooling permits;
- verify Preview noindex;
- verify SEO metadata/semantic structure.

No framework/tooling is required merely to satisfy a tooling preference. Tests must remain proportionate to the V1 static architecture.

## 14. Vercel Preview contract

Vercel is homologation, not V1 production.

Before first Preview, resolve Vercel live rather than relying on the earlier snapshot.

Do not:

- promote a Preview as Vercel Production for V1;
- attach production custom domain without a separate gate;
- assume a `.vercel.app` URL is the production destination.

## 15. Greenn production gate

Publishing the validated release in the existing Greenn page is the intended V1 production path, but publication remains a deliberate gate after Preview validation.

Before publication:

- freeze the exact Git SHA/release artifact;
- pass mobile/function/performance/SEO checks;
- confirm Greenn HTML/CSS/JS insertion constraints live;
- confirm the form contract still matches the verified embed;
- use only non-secret client-visible parameters;
- confirm WhatsApp destination if enabled;
- preserve rollback by retaining the previous Greenn version/export where the platform permits.

Custom domain/DNS remains a separate operation unless already managed externally and unchanged by this release.

## 16. Explicitly blocked/deferred

Without a new decision/authorization, do not implement:

- Next.js/React migration as a V1 requirement;
- custom backend/API;
- CMS/database;
- FECH.AI integration;
- n8n/Make automation;
- Meta/Google Ads integration;
- analytics/pixels/tags;
- unverified WhatsApp destination;
- invented inventory/commercial data;
- secret-bearing browser integration;
- domain/DNS mutation.

## 17. Implementation branch contract

After this V2 baseline is integrated and the live gate in `docs/NEXT_SAFE_ACTION.md` passes:

- use `feat/initial-product-implementation` from the then-current exact `main` SHA;
- implement `src-greenn/moretegra.html`, `.css` and `.js` as the primary portable artifacts;
- preserve GitHub/Preview/Greenn traceability;
- stop before Greenn publication until the Preview gate passes.

If an old empty/stale implementation branch exists, it may be fast-forwarded or recreated only after confirming it contains no unique commits.

## 18. Change control

This V2 baseline is the material architecture revision that supersedes TECHNICAL_BASELINE_V1.

Future changes must distinguish:

- compatible implementation detail;
- security/performance correction within the same portable-static architecture;
- material architecture change requiring a new baseline/ADR;
- production/integration operation requiring its own gate.
