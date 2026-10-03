# MoreNumTegra — Lapa Exact Project Page Standard V1

Date: 2026-10-03  
Repository: `wagnerjfjunior/MoreNumTegra`  
Reference implementation: `/empreendimentos/reserva-caminhos-da-lapa/`  
Status: CANDIDATE until merged to `main`; canonical after merge.

## 1. Purpose

Freeze the page pattern validated on Reserva Caminhos da Lapa so the next Lapa exact-project pages can reuse the same information architecture without copying lifecycle-specific claims blindly.

Target sequence:

1. Reserva Caminhos da Lapa — reference implementation / ready;
2. Garden Design — next bounded adaptation;
3. Nova Vivere — following bounded adaptation;
4. Elo Duo — preserve its current stronger pattern unless a bounded delta is explicitly approved.

## 2. Non-negotiable principles

- mobile-first;
- one H1;
- no duplicated technical facts across hero layers;
- factual commercial copy;
- direct visitor voice;
- More em um Tegra / Sabrina retains commercial authority;
- do not turn Tegra into the narrator;
- do not invent price, availability, address, dimensions, amenities or awards;
- visible FAQ and FAQPage JSON-LD must remain in exact factual parity;
- Form 46 and measurement contracts must remain intact;
- exact address/road-number content is footer-only when governed by the current commercial-footer standard;
- all image alt text must be factual and scene-specific where evidence permits.

## 3. Canonical page architecture

### 3.1 Hero

Function separation:

- eyebrow = geography + stage;
- H1 = project + primary search intent;
- lead = commercial proposition / differentiator;
- technical facts = one compact facts band below the hero;
- CTA = one direct commercial action.

Do not repeat metragem/dormitories/vagas in hero lead and facts band.

Tracking rule:
- visit CTA -> `data-form-intent="schedule_visit"`;
- conditions CTA -> `data-form-intent="conditions"`;
- payment simulation -> `payment_simulation`;
- negotiation -> `negotiate_scenario`;
- specialist -> `specialist`.

### 3.2 Intro / commercial proposition

- explain who the project is for and why it matters;
- direct language;
- finish with a clear commercial action;
- no defensive or archive-style copy unless lifecycle requires clarification.

### 3.3 Caminhos da Lapa / Rua Jardim block

Use the Reserva/Elo composition:

- eyebrow: CAMINHOS DA LAPA;
- H2 about the first Rua Jardim of São Paulo;
- short factual text;
- four compact factual cards;
- contextual Rua Jardim image;
- separate award block when applicable;
- project signatures in a dedicated block.

Reserva-approved Rua Jardim reference:
- approximately 1.2 km;
- planned landscaping;
- underground wiring;
- coexistence / public-realm context.

Do not expose exact street number outside the canonical footer.

### 3.4 Professional signatures

Do not leave only names floating in the layout.

For each architect/interior designer/landscape architect:
- name;
- discipline;
- one or two short factual sentences about professional trajectory, projects or recognition;
- no invented prestige claims.

### 3.5 Gallery

- minimum editorial target: about six strong informative images when source inventory allows;
- varied scene intent, not repeated near-identical images;
- factual alt text;
- captions aligned with scene names;
- avoid institutional filler such as "Imagens autorizadas do acervo...";
- external-media dependency should be migrated only when control/stability/resilience materially improves.

### 3.6 Plant comparison / decision block

Use the decision-oriented pattern:

- eyebrow centered on living / typologies;
- H2 compares sizes and routine;
- one card per principal typology;
- factual bedrooms/suites/parking configuration;
- plant images below;
- note only the availability/configuration caveat actually required by lifecycle.

### 3.7 Morar na Lapa

Use the Elo/Reserva editorial pattern:

- eyebrow: MORAR NA LAPA;
- H2: infrastructure, services and neighborhood life;
- concise contextual paragraph;
- three cards: commerce/services, mobility, tradition/renewal;
- three regional images;
- location/map block below.

This section belongs to region context, not exact-project technical facts.

### 3.8 FAQ

Target: 8–10 real questions when facts support them.

Cover:
- stage / ready-to-move or construction;
- typologies;
- key plant distinctions;
- relevant amenities;
- relationship to Caminhos da Lapa;
- current commercial/lifecycle model;
- how to contact Sabrina / schedule visit.

Visible FAQ and FAQPage JSON-LD must match 1:1.

### 3.9 Closing / conversion

Adopt the softer Elo/Reserva ending:

1. visit section;
2. Sabrina card;
3. project/Caminhos context cards;
4. white rounded Form 46 card on light background;
5. canonical footer.

Avoid abrupt yellow/black blocks when the softer pattern is available.

## 4. Tracking / conversion contract

Must preserve:

- `data-mnt-page-identity`;
- `data-mnt-product-identity`;
- `data-mnt-route`;
- `data-moretegra-interest`;
- `data-moretegra-lead-form`;
- `data-form-id="46"`;
- `tenant_id=313`;
- `form_id=46`;
- `title=MoreEmUmTegra`;
- `measurement-core.js`;
- `measurement-form.js`;
- consent default denied;
- canonical `mnt_* ` event taxonomy.

No PII or raw free-text enters Measurement.

## 5. Lifecycle adaptation matrix

### Reserva Caminhos da Lapa

- stage: ready / delivered;
- developer direct inventory: no;
- current opportunities: secondary/resale when available;
- FAQ must explicitly say current negotiation is not directly with Tegra;
- Sabrina is the commercial contact.

### Garden Design

- current commercial project;
- construction / in-plan status per current governed truth;
- do not copy Reserva resale language;
- CTA may be direct conditions / visit;
- validate current price/unit facts separately before changing them.

### Nova Vivere

- current commercial project;
- construction / in-plan status per current governed truth;
- do not copy Reserva resale language;
- preserve 72/105 m² ownership and governed parking distinctions;
- CTA may be direct conditions / visit;
- validate current price/unit facts separately before changing them.

## 6. Media acceptance

Informative/editorial image target:
- FORTE when factual evidence supports the scene;
- no ALT_GENERIC;
- no ALT_INCOMPLETE;
- no ALT_FACT_MISMATCH.

Brand/decorative assets remain correctly classified rather than forced into nonempty alt text.

## 7. Release gate for each adaptation

Before merge:

1. resolve live `main`;
2. confirm lifecycle/product truth;
3. show proposed copy in chat first when content is materially rewritten;
4. implement in bounded branch;
5. local visual validation;
6. visible FAQ ↔ JSON-LD parity;
7. Form 46 contract check;
8. tracking semantic check;
9. metadata/canonical check;
10. exact-head merge;
11. Production deployment resolution;
12. public smoke;
13. reconcile current-state documentation.

## 8. Reserva closure evidence

Reference release:
- PR #333;
- validated content head: `e60f57e2e92e53d3acd7d35b5291f201e73fbdbb`;
- merge/runtime SHA: `87194553074db86f901a3c40352dbcced3dbff21`;
- Production deployment: `dpl_G6kP56utSR1apBpQYBZK27mJpGP4`;
- Production state: READY;
- visual validation: USER_APPROVED;
- JSON-LD parse: PASS;
- visible FAQ: 10;
- FAQPage questions: 10;
- visible/schema parity: PASS;
- unsupported Offer.availability: absent.

A follow-up closure PR corrects the hero CTA tracking semantic from the generic fallback key to `schedule_visit` and canonicalizes this document.

## 9. Next application

Next bounded page:
`Garden Design`

Then:
`Nova Vivere`

Do not bulk-apply the template to both pages in one unbounded mutation. Each page must retain its own lifecycle, media inventory, product facts and conversion semantics.
