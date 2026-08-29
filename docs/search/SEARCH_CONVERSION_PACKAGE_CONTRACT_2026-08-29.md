# MoreNumTegra — Search + Conversion Package Contract — 2026-08-29

## Status

`PRODUCT_AUTHORITY_APPROVED / PREVIEW_CANDIDATE / READY_NOT_IMPLIED / MERGE_NOT_IMPLIED / GREEN_NOT_IMPLIED`

## 1. Authority

Product Authority approved the package after the exact implementation summary in conversation on 2026-08-29.

This approval covers the bounded implementation scope in this contract.

It does not authorize:

- merge;
- Green publication;
- DNS;
- Search Console;
- analytics/tracking;
- SEM spend/publication;
- unrelated schema/content expansion.

Ready and merge remain separate lifecycle decisions.

## 2. Award conversion scope

Use the official name:

`PRÊMIO MASTER IMOBILIÁRIO 2026`

Institutional headline:

`Dois prêmios em 2026. Um deles está no seu próximo endereço.`

Supporting copy must preserve the factual relationship:

- Tegra received recognition in two categories;
- Caminhos da Lapa won in `Qualificação Urbana`;
- the Caminhos da Lapa award belongs to the complex/masterplan, not to each component project as an independent award.

No visible outbound SECOVI-SP CTA is required on the conversion page. Provenance remains versioned internally.

Card treatment:

- triangular badge: `PRÊMIO MASTER IMOBILIÁRIO 2026`;
- second layer: `Caminhos da Lapa · um bairro inteiro de opções`;
- accessible label preserves `Qualificação Urbana`.

## 3. Nova Vivere — two-card home strategy

This package does not create a second page.

It creates two conversion cards for the same project on the same homepage:

### Card A — beginning of the grid

`Nova Vivere | 72 m²`

Evidence-bound values:

- unit 701;
- 72.82 m²;
- price reference: R$ 852,586.08.

### Card B — middle of the grid

`Nova Vivere | 105 m²`

Evidence-bound values:

- unit 708;
- 105 m²;
- cash price: R$ 1,129,900;
- CTA: `Quero esta condição`;
- condition: payment in cash;
- source:
  - `Tegra/Agosto/Anuncios/Anúncios.md`;
  - `Tegra/Agosto/Anuncios/Anuncio NovaVivere Olx valor a vista-29-08-26.png`.

The 24.6% discount is unit-bound. It is not a global Nova Vivere or portfolio rule.

Before Green, unit 708 availability and the R$ 1,129,900 cash condition must be reconfirmed.

## 4. Stable homepage metadata

Title:

`Apartamentos Tegra em São Paulo | More em um Tegra`

Meta description:

`Compare empreendimentos Tegra em São Paulo por região, estágio e faixa de valor. Veja lançamentos, prontos para morar e opções no premiado Caminhos da Lapa.`

The volatile unit 708 price must not be placed in stable homepage title/meta description.

## 5. Canonical

Commercial target:

`https://moretegra.com.br/`

This package explicitly authorizes the current JavaScript transport to create/update:

`<link rel="canonical" href="https://moretegra.com.br/">`

Conditions:

1. no conflicting commercial canonical in initial Green HTML;
2. no Vercel hostname as canonical;
3. Vercel remains `noindex,nofollow`;
4. post-Green rendered-head smoke when technically accessible.

Residual risk:

client-side canonical remains weaker operationally than a proven static/head implementation.

`JS_CANONICAL_APPROVED_FOR_THIS_PACKAGE != UNIVERSAL_JS_CANONICAL_PREFERENCE`

## 6. Open Graph / Twitter

Authorized only as a runtime enhancement:

- `og:type=website`;
- `og:url`;
- `og:title`;
- `og:description`;
- `og:locale`;
- `og:site_name`;
- `twitter:card`;
- `twitter:title`;
- `twitter:description`.

Current transport is JavaScript-only.

Classification:

`RUNTIME_ONLY_BEST_EFFORT / NOT_SOCIAL_CRAWLER_RELIABLE`

These tags may exist in the rendered browser DOM, but the package must not claim reliable Facebook, WhatsApp, X/Twitter or other social-link previews because those crawlers may not execute page JavaScript.

Reliable social preview requires a proven native/static `<head>` capability or equivalent server-rendered transport in Green and is outside the current implementation.

No social image is introduced in this package without a durable approved image.

## 7. JSON-LD

Authorized graph:

- `WebSite`;
- `WebPage`.

Explicitly not authorized by this package:

- award schema invention;
- `AggregateRating`;
- self-authored `Review`;
- volatile homepage `Product` price schema;
- fabricated organization/business facts.

`VALID_SCHEMA != RICH_RESULT_GRANTED`

## 8. Vercel boundary

Vercel is homologation.

It must remain `noindex,nofollow`.

The commercial canonical may point to the Green production origin while Vercel remains non-indexable.

`VERCEL_PREVIEW != GREEN_COMMERCIAL_PRODUCTION`

## 9. Provider provenance

Search provider candidate work:

`wagnerjfjunior/Blogs-sites-portais-seo PR #10`

Provider candidate includes:

- award conversion guidance;
- conversion pricing strategy;
- Technical SEO metadata decision.

The provider result remains a provider-side lifecycle object until integrated there. Product Authority approval in this consumer is sufficient to authorize this bounded implementation, but does not convert the provider PR into merged canonical state.

## 10. Acceptance criteria before Ready

- exact-head Vercel Preview = success;
- JavaScript syntax = PASS;
- no Form 46 interception/change;
- no tracking/analytics/Search Console/SEM;
- no outbound SECOVI CTA;
- official award name visible;
- Nova Vivere 72 m² first card;
- Nova Vivere 105 m² middle card;
- 105 m² card shows R$ 1,129,900 cash condition with nearby disclaimer;
- selecting the 105 m² card preserves the cash price and disclaimer beside the native form;
- both Nova Vivere cards preserve the existing Nova Vivere gallery;
- canonical target = `https://moretegra.com.br/`;
- OG/Twitter may be validated only as runtime DOM metadata; social-crawler preview is not an acceptance guarantee;
- Vercel noindex remains present in Preview architecture;
- documentation audit passes;
- lifecycle governance passes;
- explicit exact-head/base Ready authorization.

## 11. Green gate

Green remains blocked until:

1. PR merged under separate authorization;
2. Vercel Production aligned to new main;
3. Product Authority reconfirms unit 708 price/availability;
4. owner manually copies approved Green artifacts;
5. smoke validates commercial production.

## 12. Boundary

`PACKAGE_APPROVED != READY_AUTHORIZED_FOR_FUTURE_HEAD`

`READY_AUTHORIZED != MERGE_AUTHORIZED`

`MERGED != GREEN_PUBLISHED`

`PRICE_EVIDENCE != PERMANENT_AVAILABILITY`
