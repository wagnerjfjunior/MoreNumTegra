# MoreNumTegra — Technical Baseline V2.2

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V2_2` when present in resolved `main`
- Date: `2026-08-24`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Functional input: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- Binding ADR retained: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Scope: supersedes V2.1 only for Vercel environment semantics, public homologation and post-merge promotion flow.

## 1. Architecture retained

All V2.1 decisions remain in force except where explicitly changed below:

- semantic HTML5;
- mobile-first CSS;
- vanilla JavaScript;
- no React/Next.js requirement;
- no bundler requirement;
- no custom backend requirement;
- GitHub `main` is canonical source;
- Green Sales builder is the commercial V1 production destination;
- Green production uses the modular composition `HTML 01 -> native Form 46 -> HTML 02 -> Footer + CSS + JavaScript`;
- Vercel uses the same versioned snippets through the Preview compositor;
- no invented inventory/commercial facts.

## 2. Vercel environment semantics

Vercel has two distinct roles in the MoreNumTegra workflow:

### Preview

Used for intermediate validation of a branch/change before integration into `main`.

- generated deployment URL;
- `noindex, nofollow`;
- may be replaced by later previews;
- not the stable public homologation endpoint.

### Production

Used as the **stable public homologation environment** after owner approval and merge to canonical `main`.

Canonical public homologation URL:

`https://morenumtegra.vercel.app/`

`Vercel Production` does **not** mean Green Sales commercial production.

Preserve the distinction:

```text
VERCEL_PREVIEW != VERCEL_PRODUCTION_HOMOLOGATION
VERCEL_PRODUCTION_HOMOLOGATION != GREEN_COMMERCIAL_PRODUCTION
MAIN_MERGED != GREEN_PUBLISHED
```

## 3. Canonical deployment flow

```text
feature/change
-> Vercel Preview
-> owner validation
-> merge to GitHub main
-> Vercel Production public homologation
-> open/mobile/functional validation at https://morenumtegra.vercel.app/
-> freeze approved SHA/release
-> controlled Green Sales publication
```

A Preview approved by the owner and merged to `main` should be promoted/redeployed to Vercel Production so the stable public homologation URL reflects the approved canonical state.

## 4. Production promotion rule

Before Vercel Production publication:

1. resolve `main` live;
2. confirm the intended implementation is integrated in `main`;
3. identify the approved deployment/release SHA;
4. publish/promote only that approved state;
5. verify `https://morenumtegra.vercel.app/` resolves to the approved implementation;
6. do not interpret this promotion as authorization to publish Green Sales.

When an already validated Preview exists, Vercel promotion of that deployment is preferred over rebuilding a materially different artifact.

## 5. Robots / SEO

The Vercel public homologation environment is not the canonical commercial site and should remain protected from organic indexing unless a separate SEO decision explicitly changes this.

- keep `noindex, nofollow` on Vercel homologation;
- do not set the Vercel URL as commercial canonical;
- production SEO canonical/robots are finalized for the Green/custom-domain launch separately.

## 6. Green commercial production gate

Green Sales remains the V1 commercial production destination.

Before Green publication:

- exact Git SHA/release frozen;
- public Vercel homologation tested on the stable URL;
- all three Green HTML blocks identified;
- CSS and JavaScript payloads identified;
- native Form 46 placement/appearance verified in builder;
- CTA -> `#formulario` verified;
- mobile critical flows verified;
- video degrades gracefully;
- visible portfolio/pricing facts revalidated;
- previous Green version/export retained when possible for rollback.

## 7. Scope boundaries

This baseline does not authorize:

- custom domain/DNS changes;
- analytics/pixels/tags;
- FECH.AI/n8n/Make/Ads;
- CMS/database/backend;
- client-side secrets;
- Green publication before its separate gate.

## 8. Operational interpretation

- `Preview Ready` means the Preview built successfully; it does not make it the stable homologation deployment.
- `Vercel Production Ready` means stable public homologation is available; it does not mean Green is published.
- after an approved change is merged to `main`, leaving an older Vercel Production deployment active is a homologation drift and should be corrected before final public testing.
