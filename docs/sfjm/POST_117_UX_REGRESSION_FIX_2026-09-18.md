# Post-PR #117 UX Regression Fix — 2026-09-18

Status: `IMPLEMENTED_IN_BRANCH / STATIC_QA_PASS / READY_AUTHORIZED / NOT_MERGED`

Repository: `wagnerjfjunior/MoreNumTegra`  
Base `main` resolved before implementation: `9d9751ddfcdd56192ba798bd610c74559b5d76b0`  
Branch: `fix/post-117-ux-regressions-20260918`

## Trigger

Product Authority supplied live-production screenshots after PR #117 and reported:

1. Ária Higienópolis map rendered as an empty/gray frame;
2. home lead form kept the "Nenhum empreendimento selecionado" notice even after project selection;
3. Sabrina telephone/profile links in the home lead section had inadequate contrast and the desktop layout was visually misaligned;
4. Elo Duo still exposed exact addresses in visible content and in the map query, while the intended pattern is to keep the exact stand address in the footer and structured data.

These screenshots are direct runtime evidence and supersede the prior `EXTERNAL_HTTP_SMOKE_NOT_PROVEN` limitation for the reported UI defects.

## Corrections

### Home

- the no-project helper remains visible only when no project is selected;
- after a project card/CTA sets `data-moretegra-interest`, the helper is hidden while the project context continues to be included in the Form 46 payload;
- Sabrina contact copy is rendered as a dedicated contact block;
- telephone/profile links use high-contrast Tegra yellow instead of browser default visited/unvisited colors;
- desktop layout is rebalanced at `>= 900px`, with a wider shell, explicit grid gap, no sticky offset on the left copy and no premature two-column layout at tablet widths.

### Ária Higienópolis

- generic neighborhood map query removed;
- map iframe now resolves the verified Google place for Ária Higienópolis through Place ID `ChIJ-2vIlDFYzpQR53U-llXEhmI`;
- parent map action still routes the click to WhatsApp; the iframe remains non-interactive.

### Caminhos da Lapa Elo Duo

Visible content:
- removed `Rua Fortunato Ferraz, 365` from the location copy;
- visit card now shows only `Stand Caminhos da Lapa`, Sabrina and contact links;
- map query no longer contains the street address and uses the governed stand coordinates `-23.517165527430233, -46.71861778788628`;
- exact stand address moved to the footer:
  `Rua Fortunato Ferraz, 625 — São Paulo/SP · CEP 05093-000`.

Structured data:
- factual project/stand addresses remain in JSON-LD, following the same visible-footer + structured-data pattern accepted for CAPIITOLO.

## Invariants

- Form 46 contract unchanged:
  - tenant `313`
  - form `46`
  - title `MoreEmUmTegra`
  - endpoint `https://back.gdigital.com.br/form/register`
- project/intent composition unchanged;
- canonical and `index,follow` unchanged;
- no sitemap/DNS/provider/framework change;
- no new dependency;
- no branch preview or artificial deployment commit.

## Static QA

```text
JS_SYNTAX = PASS
JSON_LD_PARSE = PASS
HOME_H1 = 1
ARIA_H1 = 1
ELO_H1 = 1
HOME_FORM = 1
ARIA_FORM = 1
ELO_FORM = 1
FORM_46_CONTRACT = PRESERVED
HOME_NO_PROJECT_NOTICE_HIDE_ON_SELECTION = PASS
HOME_CONTACT_CONTRAST_RULE = PASS
HOME_DESKTOP_LAYOUT_BREAKPOINT = 900PX
ARIA_MAP_PLACE_ID = PRESENT
ARIA_OLD_NEIGHBORHOOD_QUERY = ABSENT
ELO_VISIBLE_PROJECT_365 = ABSENT
ELO_VISIBLE_STAND_625 = FOOTER_ONLY
ELO_VISIBLE_CEP = FOOTER_ONLY
ELO_MAP_ADDRESS_QUERY = ABSENT
ELO_MAP_GOVERNED_COORDINATES = PRESENT
ELO_JSON_LD_PROJECT_ADDRESS = PRESERVED
ELO_JSON_LD_STAND_ADDRESS = PRESERVED
CANONICALS = PRESERVED
INDEX_FOLLOW = PRESERVED
```

## Release gate

This branch is not production until reviewed and merged to `main`. No Ready/merge is implied by this implementation record.


## Rich Results parity correction

Product Authority supplied live Google Rich Results evidence:

```text
ELO_DUO = 7 valid detected items
ARIA = 5 valid detected items
CAPIITOLO = 5 valid detected items
```

The difference was traced to the eligible entity topology, not to Product/Offer validity:

- Elo Duo already exposed two factual `RealEstateAgent` entities:
  - Tegra Incorporadora;
  - Sabrina da Tegra / Tegra Vendas;
- Ária exposed Tegra Incorporadora as `RealEstateAgent` but Sabrina only as `Person`;
- CAPIITOLO exposed Sabrina as `RealEstateAgent` but Tegra Incorporadora only as `Organization`.

Correction:

- Ária now has a project-scoped Sabrina `RealEstateAgent` entity, linked to the existing Person/Service graph;
- CAPIITOLO now models the already factual Tegra Incorporadora entity as `RealEstateAgent`, using the same corporate identity contract already proven on Elo Duo;
- all three exact-project pages now have structural parity:
  - `Product = 1`;
  - `BreadcrumbList = 1`;
  - `RealEstateAgent = 2`;
  - `Organization = 1` explicit Tegra Vendas node;
- no duplicate internal `@id` and no dangling MoreTegra internal references were introduced.

For Ária, the in-loco address used by the new Sabrina entity is also made visible in the footer, avoiding hidden factual location data:

`Rua Coronel José Eusébio, 145 — Higienópolis · São Paulo/SP · CEP 01239-030`.

The Google Rich Results count of exactly seven is a post-deployment external validation target, not something static repository validation can prove before Google parses the production URL.

## Authorization

Product Authority explicitly authorized, after this parity correction:

`READY + MERGE + PRODUCTION ON VERCEL`.

No branch Preview is required or generated. The active deployment policy remains main-only automatic deployment.
