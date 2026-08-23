# MoreNumTegra — Technical / Architectural Baseline V1

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V1` when present in resolved `main`
- Date: `2026-08-23`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Functional input: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline class: architecture, runtime, performance, SEO, data/form, testing and deployment strategy
- Implementation authority: implementation is released only after this baseline is integrated and the live gate in `docs/NEXT_SAFE_ACTION.md` passes
- Production/domain authority: **not granted by this document**

## 1. Objective

Define the smallest production-capable architecture that satisfies the canonical functional baseline while preserving mobile performance, SEO, maintainability and a controlled Vercel Preview-first release path.

This baseline intentionally rejects unnecessary backend, database, CMS, microservices or SPA complexity for the initial MoreNumTegra implementation.

## 2. Verified inputs

### 2.1 Canonical project inputs

The following are already canonical in `main` through the functional baseline:

- Tegra-branded real-estate discovery/conversion experience;
- primary Tegra yellow `#EBB92E`;
- transparent Tegra logo supplied by the project owner;
- mobile-first acceptance posture;
- zone/location and development-stage filters;
- visible development-stage badges;
- floating `WhatsApp` and `Receber condições` CTAs to be preserved unless explicitly superseded;
- end-of-page lead form surface;
- broken media must fail gracefully;
- LCP/performance is a primary requirement;
- current mobile/media failures remain `USER_REPORTED` until reproduced against versioned implementation.

### 2.2 Live platform facts resolved during this baseline

- GitHub repository: `wagnerjfjunior/MoreNumTegra`.
- Technical-baseline branch was created from `main` SHA `862e734dac9c60eceae8c311e30304d14efd687a`.
- Connected Vercel team: `team_WIH0gs3BUjcZdk59oPViSjEm`.
- Vercel plan observed: `Hobby`.
- Vercel projects observed for that team: none.

Consequences:

- there is no Vercel legacy configuration to preserve;
- no existing production deployment is assumed;
- Vercel Custom Environments are not part of V1 because the observed Hobby plan uses the standard Local / Preview / Production model;
- the first external deployment must be Preview, not Production.

## 3. Architecture decision summary

| Area | Decision V1 |
|---|---|
| Framework | Next.js 16.x, App Router |
| Language | TypeScript, strict mode |
| Runtime | Node.js 24 LTS |
| Package manager | npm with committed lockfile |
| Rendering | static-first / server-rendered by default; client islands only where interaction requires them |
| Initial route model | one primary catalog/landing experience at `/`; no speculative detail routes required for V1 |
| Content source | versioned local typed dataset for the initial catalog |
| Database | none in V1 |
| CMS | none in V1; future adapter boundary only |
| Filtering | client-side on already-rendered canonical dataset; no server round trip required for V1 |
| Media | optimized images; video non-critical, lazy and failure-tolerant |
| Lead form | UI and local validation may be implemented; real transmission remains blocked until data/privacy contract is approved |
| SEO | server-rendered metadata, semantic HTML, sitemap/robots, production canonical only after domain approval |
| Accessibility | WCAG 2.2 AA target for V1 interaction and visual acceptance |
| Testing | typecheck + lint + build + unit/component tests where useful + Playwright mobile critical journeys |
| Hosting | Vercel Preview-first |
| Production | separate gate after validated preview |
| Custom domain/DNS | separate gate after production decision; never required for preview acceptance |

## 4. Framework and runtime

### 4.1 Next.js

Use **Next.js 16.x App Router**.

Reasons:

- first-class server rendering and static generation for SEO-sensitive pages;
- Server Components by default reduce unnecessary client JavaScript;
- integrated metadata, image and route primitives;
- native Vercel deployment path;
- sufficient headroom for future detail routes or data-source migration without introducing a backend now.

### 4.2 Security version gate

Do not encode a floating `latest` dependency in the committed implementation.

At implementation scaffold time:

1. resolve the currently supported patched Next.js 16.x release live;
2. pin the exact version in `package.json` / lockfile;
3. reject a release with a known pending critical security patch;
4. record the resolved version in the implementation PR.

Reason for the explicit gate: the official Next.js release channel on `2026-08-20` announced a scheduled security release for `2026-08-26`, including a critical vulnerability patch affecting supported lines. The project must not knowingly freeze an about-to-be-superseded vulnerable package simply to satisfy a documentation version number.

This does **not** block creation of the implementation branch. It gates dependency pinning/scaffold acceptance.

### 4.3 Node.js

Use **Node.js 24 LTS**, not Node 26 Current.

Observed official Node.js release status on `2026-08-23`:

- Node 24: LTS;
- Node 26: Current.

Production applications should use an LTS line. The implementation must pin the Node 24 major through `engines` and/or repository runtime configuration.

### 4.4 TypeScript

- `strict: true`;
- no untyped catalog payloads entering rendering code;
- no `any` as a convenience boundary for development inventory;
- user-visible stage values represented by a finite canonical type.

## 5. Rendering model

### 5.1 Static-first

The V1 site must be static-first.

- `/` is rendered on the server/build path with the canonical development dataset available at render time.
- Do not ship the entire page as a client-side SPA.
- Use Client Components only for interactive filters, menus, form validation and other stateful widgets.
- No client fetch is required to display the initial catalog in V1.

This architecture directly supports fast first render, crawlability and reduced hydration cost on mobile.

### 5.2 Route scope

V1 requires the primary experience at `/`.

Do **not** create speculative `/empreendimentos/[slug]`, blog, search, account or CMS routes merely because the framework supports them.

A later product decision can add detail/index routes when their content and conversion value are canonicalized.

## 6. Repository structure target

The implementation should converge on a compact structure similar to:

```text
app/
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  brand/
  filters/
  developments/
  conversion/
  form/
content/
  developments.ts
lib/
  catalog.ts
  seo.ts
  validation.ts
public/
  brand/
  media/
tests/
  e2e/
```

Exact file names may vary without changing the architecture if responsibilities remain clear.

## 7. Development inventory / content strategy

### 7.1 V1 source of truth

Use a **versioned local typed dataset** in the repository for development inventory in V1.

The dataset should include only fields actually required by the current UI, for example:

- stable ID / slug;
- development name;
- zone/location classification;
- development stage;
- primary image/media references;
- short display attributes already approved for presentation;
- CTA/display flags where required.

Do not invent commercial values, availability, prices, addresses or stage values not supplied by an authorized source.

### 7.2 Why no CMS/database now

A CMS/database is not justified by the current canonical requirements. Introducing one now would add:

- runtime dependency;
- data synchronization risk;
- credentials;
- schema/migration burden;
- additional LCP/availability failure paths.

Add a CMS or external inventory source only when update frequency, multiple editors, inventory volume or commercial workflow makes the versioned dataset insufficient.

### 7.3 Adapter boundary

Components must consume catalog data through a small repository/domain abstraction rather than import provider-specific SDKs.

This preserves the option to replace the local dataset with a CMS/API later without rewriting presentation components.

## 8. Filtering architecture

- Zone/location and development-stage filters operate client-side over the canonical V1 dataset.
- Filter state must be deterministic and composable.
- Mobile controls must use native buttons/select controls or accessible custom equivalents with explicit labels.
- No hover-only behavior.
- Every interaction must expose visible state/feedback.
- Empty result state must be explicit; an empty grid with no explanation is a failure.
- Filter semantics must not silently reinterpret unknown stage labels.

Where practical, filter state may be reflected in the URL query string only if it improves shareability without introducing route/render complexity. Query-string persistence is optional for V1 and is not a blocker.

## 9. Media strategy

### 9.1 Brand assets

Critical brand assets used above the fold should be versioned locally under `public/brand/` when licensing/brand rules permit.

The owner-supplied transparent Tegra logo should therefore be copied into the repository during implementation rather than depending on an external S3 request for primary branding.

### 9.2 Images

- use `next/image` for catalog/hero images unless a verified reason requires raw `<img>`;
- explicit width/height or fill container geometry is mandatory to prevent layout shift;
- use responsive `sizes`;
- the LCP image receives intentional priority/preload treatment only when measurement confirms it is the LCP candidate;
- non-visible catalog images must lazy-load;
- avoid downloading desktop-size media for mobile cards.

### 9.3 Video

Video must never be the sole LCP-critical content.

V1 rules:

- no autoplay requirement;
- use a poster/thumbnail;
- lazy-load the actual player/media;
- prefer `preload="none"` or the minimum verified preload behavior for non-critical media;
- if the video fails, the surrounding discovery/conversion experience remains intact;
- broken player chrome is not acceptable.

If a reliable video source is not available during implementation, omit the player or use an approved static fallback rather than ship a broken feature.

## 10. Mobile and performance baseline

### 10.1 Core Web Vitals production targets

Use current Google Core Web Vitals "good" thresholds at the 75th percentile, segmented for mobile and desktop:

- **LCP <= 2.5 s**;
- **INP <= 200 ms**;
- **CLS <= 0.1**.

Mobile is the primary acceptance segment for this project.

The previous user reference to `NCP` is not treated as a metric. The technical baseline supersedes that ambiguous term with explicit LCP / INP / CLS.

### 10.2 Preview/lab gate

Before a preview is accepted:

- representative mobile Lighthouse run should target Performance >= 90;
- LCP lab result should remain <= 2.5 s on the representative primary route where tooling is stable enough to compare;
- CLS <= 0.1;
- no serious accessibility errors on the critical journeys;
- no console/runtime errors on normal interaction;
- filtering and CTAs must not regress under a mobile viewport.

Lighthouse score is a regression signal, not a substitute for real-user Core Web Vitals after production traffic exists.

### 10.3 Performance implementation rules

- Server Components by default;
- minimize `use client` boundaries;
- no animation/slider library unless demonstrably needed;
- no large icon/UI framework for a small landing/catalog experience;
- defer non-critical third-party scripts;
- reserve layout space for all media;
- keep hero content simple and available without waiting on client JavaScript;
- do not make the catalog depend on runtime API latency in V1.

## 11. SEO technical baseline

### 11.1 Crawlable HTML

Primary headings, development names, stage labels and relevant descriptive content must be present in server-rendered HTML.

Do not require client execution for crawlers to discover the primary content.

### 11.2 Metadata

Implement server-side Next.js metadata for:

- page title;
- meta description;
- Open Graph essentials;
- favicon/icons;
- robots behavior by environment.

Title/description copy remains product/content work and must not be fabricated as factual claims about Tegra inventory.

### 11.3 Sitemap and robots

- provide `app/sitemap.ts` or equivalent;
- provide `app/robots.ts` or equivalent;
- Preview deployments remain `noindex`;
- verify Vercel `X-Robots-Tag: noindex` on Preview;
- do not attach a preview custom domain that accidentally removes the platform's default noindex behavior without adding an explicit equivalent control.

### 11.4 Canonical URL

Do not hardcode a production canonical domain before the domain decision is approved.

During Preview:

- no production canonical assumption;
- no indexation.

After domain approval:

- configure one canonical production host;
- generate absolute canonical/OG URLs from the approved production origin;
- redirect duplicate host variants when applicable.

### 11.5 Structured data

Do not claim Tegra corporate identity, seller authority, exact offers, prices or availability through structured data without verified source material.

V1 may add conservative `WebSite` / page-level structured data where semantically correct. More specific real-estate offer structured data requires canonical inventory fields.

## 12. Accessibility baseline

Target **WCAG 2.2 AA** for V1.

Minimum implementation expectations:

- semantic landmarks/headings;
- labels for every interactive control;
- keyboard operability;
- visible focus state;
- touch targets appropriate for mobile;
- color must not be the only stage/status signal;
- contrast verified for badges/buttons/text;
- images carry meaningful alt text or empty alt when decorative;
- form errors are programmatically associated with fields;
- reduced-motion preference is respected if motion is introduced.

## 13. Lead form and data architecture

### 13.1 Preview implementation

The form UI may be fully implemented in Preview with:

- client-side field validation;
- accessible errors;
- loading/success/error states;
- local/mock submission behavior that transmits **no real PII** outside the browser/project.

### 13.2 Real submission remains blocked

Before enabling real lead transmission, a separate data/integration decision must define:

- exact fields;
- mandatory vs optional fields;
- destination/CRM;
- lawful/consent language applicable to the use case;
- privacy notice/link;
- retention expectation;
- who can access the data;
- anti-spam/rate-limit strategy;
- server-side validation;
- secret handling;
- failure/retry behavior.

Do not send lead PII directly from browser JavaScript to an unverified third-party endpoint.

When later authorized, prefer a server-side Next.js Route Handler / Server Action boundary or a verified external form service with equivalent controls. The exact integration is deliberately not chosen in this baseline.

## 14. WhatsApp / conversion targets

- preserve the `WhatsApp` and `Receber condições` interaction surfaces;
- do not infer or embed a destination number/URL from memory;
- store approved destination/configuration in one typed/configurable location;
- before production, verify the destination ownership and final message parameters;
- analytics tracking remains blocked until analytics/privacy scope is approved.

## 15. Security baseline

V1 is a low-compute public site, but the following controls still apply:

- no secrets in client bundles or repository;
- no real PII transmission until the form contract is approved;
- third-party scripts denied by default;
- external media hosts explicitly allowlisted;
- dependency lockfile committed;
- dependency/security warnings reviewed before merge;
- security headers added where they do not conflict with verified platform behavior;
- CSP to be introduced once the actual external asset/script inventory is known, rather than shipping a fictitious policy that is immediately bypassed.

## 16. Test strategy

### 16.1 Required repository gates before implementation PR merge

The implementation repository should expose commands equivalent to:

- `npm run typecheck`;
- `npm run lint`;
- `npm run test` when unit/component tests exist;
- `npm run build`;
- `npm run test:e2e` for the critical mobile flows once Playwright is configured.

### 16.2 Playwright critical journeys

At minimum cover mobile viewport behavior for:

1. initial page renders without primary runtime error;
2. zone/location filter changes results or state visibly;
3. stage filter changes results or state visibly;
4. filters can be combined and cleared;
5. development-stage badges are visible;
6. WhatsApp / conditions CTAs render and are operable when a verified destination is configured;
7. end-of-page form is reachable and validates fields without transmitting real data in Preview;
8. optional media failure does not remove the catalog/CTAs.

Desktop smoke coverage is also required, but mobile is the first acceptance path.

## 17. Vercel strategy

### 17.1 Current state

No Vercel project exists in the connected Hobby team at baseline time.

### 17.2 Preview-first rule

The first Vercel deployment for MoreNumTegra must be **Preview**.

Do not:

- deploy with `--prod`;
- attach a custom production domain;
- configure production-only lead destinations;
- treat a generated `.vercel.app` URL as an approved production launch.

### 17.3 Initial Vercel project creation

Create/link the Vercel project only after the implementation branch has a locally/build-verified minimal application.

Preferred initial flow:

1. implementation branch reaches buildable state;
2. create/link project under `team_WIH0gs3BUjcZdk59oPViSjEm`;
3. deploy using Preview target / non-production deployment;
4. record deployment ID/URL and exact Git SHA;
5. validate functional, mobile, performance, SEO-noindex and runtime behavior;
6. keep Production and custom domain untouched.

Because the team is Hobby, use the standard Preview environment rather than designing around Pro-only custom environments.

### 17.4 Preview indexation

Vercel Preview deployments normally receive `X-Robots-Tag: noindex` automatically. The preview gate must verify the response header rather than assume it.

### 17.5 Production separation

After Preview passes, production still requires a **separate explicit gate**.

A production action may be performed only after:

- the preview SHA is frozen/identified;
- critical journeys pass;
- mobile performance gate passes or deviations are explicitly accepted;
- no blocking runtime errors remain;
- form remains non-PII or has a separately approved live data contract;
- production branch/promotion strategy is explicitly resolved.

### 17.6 Git production branch

If Git Integration is enabled before normal production operation, configure a dedicated production branch such as `release/production` rather than allowing ordinary `main` merges to become live automatically.

Rationale:

- `main` remains the canonical integrated source state;
- feature branches and `main` can produce Preview deployments;
- production release remains an intentional operation;
- the user-requested separation between implementation and production is preserved.

Do not create or promote `release/production` merely because this baseline mentions it. The branch becomes necessary only when the production gate is authorized.

### 17.7 Domain separation

Custom domain/DNS is a later gate after Preview validation and production decision.

Domain action requires:

- approved domain name;
- verified ownership/access;
- canonical host decision (`www` vs apex or equivalent);
- redirect strategy;
- production deployment identified;
- post-DNS verification;
- rollback path.

No domain is inferred in this baseline.

## 18. Implementation branch contract

After this technical baseline is integrated and the live gate passes:

- create branch `feat/initial-product-implementation` from the resolved `main` SHA;
- implementation is authorized on that branch within the functional + technical baselines;
- implementation may include application files, styles, tests, local catalog data and Preview-ready configuration;
- implementation may **not** include production deploy, custom domain/DNS, real lead transmission, analytics/pixels, campaigns or unverified secrets;
- Vercel Preview may be created only after the branch builds and its preview action is explicitly within the active implementation scope.

Implementation must preserve rollback through branch/PR isolation.

## 19. Implementation acceptance gate

Before an implementation PR can merge to `main`, verify at minimum:

### Build / quality

- dependency security gate passed;
- typecheck passed;
- lint passed;
- production build passed;
- critical tests passed;
- no unexplained console/runtime errors.

### Functional

- canonical filters work on mobile;
- stage badges are visible and readable;
- Tegra brand color/logo requirements are satisfied;
- CTAs are preserved without inventing destinations;
- form surface exists with safe Preview behavior;
- media fails gracefully.

### Performance / UX

- mobile-first review complete;
- LCP/CLS lab gate evaluated;
- no obvious large-layout shift;
- no hover-only critical interaction;
- no unnecessary client-heavy architecture.

### SEO / accessibility

- server-rendered primary content;
- metadata present;
- sitemap/robots present;
- Preview is `noindex`;
- accessibility critical path reviewed.

### Scope

- no Production deployment;
- no domain/DNS mutation;
- no real PII transmission;
- no unapproved analytics/tracking;
- no scope expansion hidden in implementation.

## 20. Explicitly deferred decisions

These remain outside TECHNICAL_BASELINE_V1 and require later evidence/authorization where applicable:

- final production domain;
- live WhatsApp destination;
- real lead fields/CRM contract;
- analytics/pixels/tag manager;
- CMS/database migration;
- paid campaign instrumentation;
- production release timing;
- production branch creation/promotion;
- long-term multi-page/content architecture beyond V1;
- field Core Web Vitals monitoring provider after launch.

## 21. External references used

- Next.js official release channel: `https://nextjs.org/blog`
- Node.js official release status: `https://nodejs.org/en/about/previous-releases`
- Google Web Vitals thresholds: `https://web.dev/articles/vitals`
- Vercel Git deployments / production branch: `https://vercel.com/docs/git`
- Vercel environments: `https://vercel.com/docs/deployments/environments`
- Vercel Preview noindex behavior: `https://vercel.com/docs/headers/response-headers`

These references inform technical constraints; GitHub `main` remains the project-state authority.

## 22. Change control

When integrated in `main`, this document becomes `TECHNICAL_BASELINE_V1`.

Future changes must distinguish:

- security/runtime patch within the same architectural line;
- implementation detail compatible with this baseline;
- material architecture change requiring a new decision/baseline revision;
- production/domain operation that requires its own gate.

Do not rewrite this baseline only because package patch versions, Git SHAs, preview URLs or PR lifecycle change. Resolve volatile lifecycle live.