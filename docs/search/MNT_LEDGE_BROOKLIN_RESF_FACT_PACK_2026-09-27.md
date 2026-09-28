# Ledge Brooklin — RESF Fact Pack / Search Contract — 2026-09-27

Status: `CANDIDATE_IN_BRANCH / PREVIEW_QA_REQUIRED`

## 1. Scope

- Project: MoreNumTegra
- Exact-project owner: `/empreendimentos/ledge-brooklin/`
- Visual/interaction baseline: DSG exact-project model
- Runtime implementation: direct static HTML; do not inherit DSG client-side composition bootstrap
- RESF consumer authority: `docs/frameworks/resf/ADOPTION.yaml`
- Product/technical authority: current MoreNumTegra `main`

## 2. Search evidence

Canonical MNT-M3-01 research records:

- query: `ledge brooklin`
- Google Keyword Planner average monthly searches: `1,600`
- Ads competition index: `25`
- evidence class: `GOOGLE_KEYWORD_PLANNER`

This volume is prioritization evidence, not a ranking guarantee.

## 3. Official factual sources

Primary source:
- Tegra: https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/brooklin/ledgebrooklin

Additional official project/partner sources:
- Ledge Brooklin microsite: https://www.ledgebrooklin.com.br/
- Exto: https://www.exto.com.br/empreendimentos/ledge-brooklin

## 4. Governed facts used on the page

Primary-source facts:
- name: Ledge Brooklin
- partnership: Tegra + Exto
- neighborhood: Brooklin
- city/state: São Paulo/SP
- exact address: Rua Nova Independência, 110
- Tegra stage at evidence capture: Em construção
- apartments: 70 m², 80 m², 122 m²
- studios: 30 m² to 40 m²
- 70 m²: 2 dormitórios / 1 suíte
- 80 m²: 2 suítes
- 122 m²: 3 suítes
- architecture: Exto
- interiors: Claudia Albertini Arquitetos Associados
- landscaping: Estúdio Alice Izumi
- verified amenities used: fitness, coworking, salão de festas, espaço gourmet, brinquedoteca, piscina adulto, piscina infantil, bicicletário

## 5. Source conflict

The Exto source was observed describing the project as `Pronto Para Morar`, while the current Tegra primary page describes it as `Em construção`.

Decision for this candidate:
- do not silently reconcile conflicting lifecycle facts;
- use Tegra as the primary commercial/product source;
- render `Em construção`;
- preserve the conflict in this fact pack for later Product Truth revalidation.

## 6. Price / availability boundary

The Tegra source exposed an Aug/2026 commercial price reference. The new exact-project page deliberately does not hardcode that value.

Rules:
- no price claim is published from a stale point-in-time reference;
- no unit availability is presumed;
- availability and current conditions are routed to Tegra Vendas/Form 46;
- future price publication must use the governed commercial data path.

## 7. Address boundary

Current MoreNumTegra standard applies:
- exact street/number may exist in JSON-LD;
- exact street/number is visibly rendered only in the canonical commercial footer;
- body/location/FAQ use neighborhood-level wording and WhatsApp for location handoff.

## 8. SEO owner

Primary page owner:
- exact entity/project intent for Ledge Brooklin;
- project + Brooklin intent;
- verified project typology/metragem intent.

The exact-project owner must not be fragmented into doorway pages for:
- price;
- metragem;
- address;
- individual plant;
- stage modifiers.

## 9. Metadata / schema contract

Candidate implements:
- unique title;
- meta description;
- index/follow;
- self canonical;
- Open Graph;
- Twitter card;
- H1 unique;
- BreadcrumbList;
- ApartmentComplex;
- verified FloorPlan entities for 70/80/122 m²;
- visible FAQ + FAQPage;
- commercial RealEstateAgent context;
- no Product/Offer price schema.

## 10. Conversion / measurement

- Form provider: Green Sales / GDigital
- tenant_id: 313
- form_id: 46
- title: MoreEmUmTegra
- shared runtime/measurement scripts remain project-owned
- GTM: GTM-PGCR4R47
- default consent denied
- visitor PII is not sent to Measurement
- WhatsApp remains a separate intent channel

## 11. Performance posture

The DSG composition is used as a visual/interaction baseline only.

This candidate:
- is direct HTML, not a client-side fetched composition;
- uses the relatively small official Tegra ImagemPrincipal as initial hero;
- hero is in initial HTML, eager by default and fetchpriority=high;
- below-the-fold media is lazy;
- heavy optional media does not block Form 46 or core content;
- no hero video is introduced.

Before merge, Preview QA must verify actual mobile LCP/CLS and media behavior. The target remains LCP <= 2.5 s / CLS <= 0.1; lab TBT must not be relabeled as field INP.

## 12. Release gate

Required before merge:
1. exact-head diff review;
2. static/search/schema checks;
3. Preview resolves and route returns intended page;
4. mobile/browser smoke;
5. CTA/Form interaction smoke without creating a real lead;
6. performance battery or bounded performance evidence sufficient for new exact-project release;
7. Product Authority merge authorization if the project lifecycle requires a separate merge gate.
