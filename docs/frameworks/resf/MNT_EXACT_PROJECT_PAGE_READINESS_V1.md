# MoreNumTegra — Exact Project Page Readiness V1

Status: `CONSUMER_STANDARD_CANDIDATE`
Date: 2026-09-28
Provider contract: `RESF v1 / C17`
Provider ref: `59517d276c25c6529390ed67a0f68a9f914cb332`

## 1. Purpose

Prevent omission-driven rework on new exact-project pages by making the full consumer release surface explicit before Preview or Production.

This standard is consumer-owned. It does not turn any existing page into a universal template.

## 2. Reference families

### Standard project family

Use for:
- Soma Perdizes
- Zahle Jardins
- YPY Alto do Ipiranga
- Bem Moema
- Mozae Higienópolis
- Caminhos da Lapa Reserva

Reference direction:

`DSG interaction/visual family + Ledge Brooklin completeness/performance learnings + RESF C17`

Do not copy DSG product facts or its client-side composition bootstrap.

### High-end editorial family

Use for:
- Bueno Brandão 257
- Château Jardin

Reference direction:

`CAPIITOLO editorial/visual family + Ledge Brooklin completeness/performance learnings + RESF C17`

Do not copy CAPIITOLO product facts, brand claims or project-specific schema.

## 3. Required readiness surface

Every exact-project page must resolve each item as `PRESENT`, `NOT_APPLICABLE`, `BLOCKED_BY_MISSING_FACT` or `MISSING`.

### Search / SEO
- one primary query/entity owner;
- governed secondary query families;
- unique title, description and H1;
- self canonical;
- robots index/follow;
- Open Graph and Twitter;
- visible FAQ aligned to FAQPage when FAQPage is emitted;
- sitemap entry;
- Home/catalog internal link;
- Home structured inventory entry when consumer architecture requires it;
- no doorway alias pages for typo/price/metragem/address variants.

### Product truth
- official/current factual sources recorded;
- source conflicts preserved;
- stage;
- typologies/metragens;
- dorms/suítes/vagas when evidenced;
- price only from governed commercial truth;
- availability/status disclaimer where commercial claims are volatile;
- official/authorized media only.

### Conversion
- persistent mobile `Receber condições` action;
- persistent WhatsApp/contact action;
- Form 46;
- governed intent mapping;
- no duplicate-submit regression;
- commercial footer;
- consent banner/preferences lifecycle.

### Location / local
- visible neighborhood/location section;
- exact-location handoff through WhatsApp under current MoreNumTegra product policy;
- map/location card;
- exact street/number visibility follows consumer policy;
- PostalAddress / postalCode / GeoCoordinates only when governed.

### Structured data
- coherent connected graph;
- WebPage;
- project entity appropriate to factual page type;
- BreadcrumbList;
- ImageObject;
- Brand;
- commercial RealEstateAgent/ContactPoint when used;
- FloorPlan only for verified typologies;
- FAQPage only when visible;
- no invented Offer, availability, AggregateRating or Review;
- no duplicate or unresolved local @id.

### Media / UX / performance
- critical hero discoverable in initial HTML;
- no unnecessary hero video;
- below-fold images lazy where appropriate;
- gallery breadth adequate to project type;
- responsive media;
- no primary function depends on hover;
- mobile controls touch-usable;
- LCP target <= 2.5s;
- CLS target <= 0.1;
- Lighthouse/PageSpeed evidence does not substitute field CWV;
- one Lighthouse run is not a canonical median.

## 4. Consent lifecycle

Current consumer expectation:

1. unresolved visitor receives the consent choice UI;
2. choice persists under a versioned consumer key;
3. stored choice does not permanently remove access to preferences;
4. visible `Preferências de privacidade` control can reopen the banner;
5. accept/reject may be changed later;
6. event semantics remain governed separately from the presence of the UI.

## 5. Release gate

A page must not be described as release-ready while any adopted required capability is `MISSING`.

Before merge:
- exact-head static validation;
- consumer CI gates;
- browser smoke;
- Form/CTA smoke without creating a real lead;
- visual/mobile review on the authorized artifact;
- performance evidence;
- explicit consumer release authorization.

## 6. Current rollout queue

| Order | Project | Reference family | Current status |
|---:|---|---|---|
| 1 | Soma Perdizes | Standard | NEXT |
| 2 | Zahle Jardins | Standard | QUEUED |
| 3 | YPY Alto do Ipiranga | Standard | QUEUED |
| 4 | Bem Moema | Standard | QUEUED |
| 5 | Mozae Higienópolis | Standard | QUEUED |
| 6 | Bueno Brandão 257 | High-end editorial | QUEUED |
| 7 | Château Jardin | High-end editorial | QUEUED |
| 8 | Caminhos da Lapa Reserva | Standard | PRODUCT_TRUTH_RECHECK_REQUIRED |

Reserva requires a Product Truth recheck before commercial conversion because the current official Tegra source presents the project as `Entregue / 100% Vendido`, while the current MoreNumTegra Home card remains a commercial-discovery surface. Do not silently reconcile that conflict.
