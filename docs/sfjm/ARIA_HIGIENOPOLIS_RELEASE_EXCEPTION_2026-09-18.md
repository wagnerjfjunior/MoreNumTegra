# Ária Higienópolis — Product Authority Release Exception — 2026-09-18

Status: `AUTHORIZED / RELEASE_CANDIDATE`

Repository: `wagnerjfjunior/MoreNumTegra`

Branch: `feature/aria-higienopolis`

Pre-release exact head observed before governance reconciliation: `651005d65d8200298c6859204ade297c9580df2e`

Canonical base incorporated by the branch: `bb614c3234f1945237e3fe8ea9787c438aebd7e6`

## Decision

The Product Authority explicitly authorized integrating and publishing the completed Ária Higienópolis exact-project page as an exception to the previously declared next-safe-action sequencing.

This exception is narrow. It authorizes only the Ária release package and the minimum portfolio/search integration required for that route:

- `/empreendimentos/aria-higienopolis/`;
- home card/link integration;
- home published-project ItemList/entity graph update;
- `sitemap.xml` inclusion after the route is merged to `main`;
- Vercel route rewrite;
- governed commercial reference already authorized for MoreNumTegra;
- SFJM state reconciliation required by this release.

It does **not** authorize a new route family, DNS change, provider change, framework/backend change, preview-deployment reactivation, Meta/Ads/FECH.AI work, or unrelated edits to CAPIITOLO/Elo Duo.

## Product truth used by this release

Official Tegra source revalidated on 2026-09-18:

- project: Ária Higienópolis;
- stage: delivered;
- address: Rua Coronel José Eusébio, 145 — Higienópolis — São Paulo/SP;
- studios: 30 m²;
- apartments: 53 m², 1 or 2 bedrooms;
- commercial units: 22 m² to 44 m².

Commercial reference selected by Product Authority for MoreNumTegra:

- R$ 501.000;
- Studio 1510;
- 30 m²;
- R$ 16.700/m²;
- reference Aug/2026.

The official Tegra site may expose a different current commercial reference. The MoreNumTegra page must not merge those two references or imply they are the same unit.

## Release constraints

- GitHub `main` remains canonical.
- Vercel production remains automatic from `main` only.
- Non-main automatic deployment remains disabled.
- No artificial commit may be created solely to trigger deploy.
- Form 46 contract remains tenant 313 / form 46 / title MoreEmUmTegra.
- Consent/GTM/GA4 ownership is unchanged.
- Sitemap inclusion is valid only together with the actual published, self-canonical route.
- Production acceptance requires post-merge HTTP/runtime smoke; merge alone is not deployment proof.

## Scope cleanup applied before release

Two branch-side changes are explicitly excluded from this release because they are outside the authorized Ária scope:

1. CAPIITOLO editorial experiment form mutation;
2. home Form 46 optional free-text field replacement with a project dropdown.

The canonical existing behavior is preserved for both.

## Required closeout

After merge:

1. resolve the new `main` SHA;
2. resolve Vercel deployment state;
3. smoke-test home, Ária route, sitemap and core static assets;
4. confirm canonical/indexability headers;
5. confirm home card/link and Ária Form 46 runtime;
6. reconcile `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `CURRENT_PROGRAM_STATE.json` and `PROJECT_READ_MODEL.json` with observed post-release state.
