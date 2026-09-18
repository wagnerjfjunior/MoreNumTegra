# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-18`.

## Product Authority exception now in force

The previously recorded non-mutative Search Console/sitemap validation remains valid work, but its sequencing is temporarily superseded by one explicit Product Authority exception:

**publish the completed Ária Higienópolis exact-project page and reconcile the release.**

Authority record:

`docs/sfjm/ARIA_HIGIENOPOLIS_RELEASE_EXCEPTION_2026-09-18.md`

## Release candidate

```text
BRANCH = feature/aria-higienopolis
PRE_GOVERNANCE_HEAD = 651005d65d8200298c6859204ade297c9580df2e
BASE_INCORPORATED = bb614c3234f1945237e3fe8ea9787c438aebd7e6
NON_MAIN_AUTO_DEPLOY = disabled
TARGET_ROUTE = /empreendimentos/aria-higienopolis/
```

## Authorized scope

- Ária exact-project page;
- governed R$ 501.000 Studio 1510 reference already approved by Product Authority;
- home card/internal link;
- home published-project structured-data list;
- sitemap entry;
- Vercel route rewrite;
- commercial-values entry;
- minimal shared project-page canonical generalization required so Offer IDs resolve to the current project;
- SFJM/release documentation.

## Explicit exclusions

Do not include unrelated CAPIITOLO experiment edits or a redesign of the home Form 46 field. Do not reactivate branch previews. Do not change DNS, provider, GTM/GA4 ownership, Form 46 backend contract, framework/backend architecture, FECH.AI or Ads.

## Acceptance sequence

1. clean branch scope;
2. validate JSON/JSON-LD, canonical, H1, Form 46 wiring, consent/GTM ownership, home link, sitemap and Vercel route;
3. open governed PR to `main`;
4. verify exact PR head and changed files;
5. merge only if scope remains clean;
6. resolve Vercel production deployment from the merge SHA;
7. production smoke: home + Ária + sitemap + canonical/robots/assets;
8. docs-only SFJM post-merge reconciliation.

```text
MERGED != DEPLOYED
DEPLOYED != PROD_SMOKE_TESTED
SITEMAP_DEPLOYED != GSC_PROCESSED
```

After this exception is closed, return to the deferred Search Console / structured-data validation track unless a newer Product Authority decision supersedes it.
