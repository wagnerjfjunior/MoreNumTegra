# Elo Duo pilot — first real exact-project page — 2026-09-15

Status: `PILOT_RUNTIME_CANDIDATE / PENDING_PREVIEW_VALIDATION`

## Purpose

Create the first real MoreNumTegra exact-project page using the governed M3 ownership model and the official Tegra project surface as the factual source.

Pilot route:

`/empreendimentos/caminhos-da-lapa-elo-duo/`

Canonical target:

`https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

## Source basis

Official Tegra surface observed on 2026-09-15:

`https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/lapa/caminhos-da-lapa-elo-duo`

Observed facts used in the pilot include:

- project name: Caminhos da Lapa Elo Duo;
- stage: Entregue;
- address: Rua Fortunato Ferraz, 365, Lapa, São Paulo;
- typologies: 47 m², 55 m² and 67 m²;
- 2 or 3 bedrooms; 1 suite; up to 1 parking space;
- official amenities represented visibly on the pilot page;
- current official commercial reference observed on 2026-09-15: from R$ 658,000, ref. 68 m² unit 109, Aug/26, cash payment;
- official page currently states `Últimas unidades`.

## Architecture decision — stable product != commercial state

The pilot introduces separate files:

- `src-greenn/data/projects/caminhos-da-lapa-elo-duo.json` — relatively stable project/entity facts;
- `src-greenn/data/commercial-values.json` — volatile price/inventory/reference state.

The exact-project page consumes the commercial file at runtime. If the commercial record is absent, invalid or cannot be loaded, the page fails closed to `Consulte valores atuais` / `Consulte disponibilidade` rather than reusing or inventing a price.

This is the intended foundation for future bulk price updates through chat/file operations and a possible governed administration front end. The existing homepage monolith has not yet been fully migrated to this commercial store in this pilot; that migration must remove duplicated price truth rather than create another permanent override layer.

## Search / structured data

The page is self-canonical and contains visible factual content plus a JSON-LD graph with:

- `WebSite`;
- `WebPage`;
- `BreadcrumbList`;
- `ApartmentComplex` as the factual project entity after pilot fact-fit review.

A separate `Offer` entity is injected only when an active governed commercial record with numeric price exists. The project entity remains valid without a commercial record.

Rich-result display is not guaranteed. The pilot intentionally does not add Review/AggregateRating/LocalBusiness or other unsupported claims merely to force a Rich Results Test category.

## Portal linking

`src-greenn/portal-links.js` adds a secondary `Ver empreendimento →` link only to the Elo Duo card. Other cards receive no project-page link until a real route exists, avoiding dead or doorway URLs.

The primary `Negociar condições` CTA remains visually dominant. The project page sends the user back to the shared Form 46 journey with the project interest in the URL so the home form can be prefilled.

## Release gate

Before merge/production:

1. validate Vercel Preview desktop and mobile;
2. validate the route returns 200 on Preview and preview remains noindex;
3. validate commercial JSON fail-closed behavior;
4. validate JSON-LD syntax and visible parity;
5. validate card CTA layout and project link on mobile;
6. validate project-interest prefill into Form 46;
7. validate no regression to the existing M2 lead path;
8. only after acceptance should the new route be promoted to production and submitted for indexing.
