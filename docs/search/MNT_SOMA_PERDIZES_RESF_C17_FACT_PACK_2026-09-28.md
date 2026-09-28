# Soma Perdizes — RESF C17 Fact Pack / Readiness — 2026-09-28

Status: `CANDIDATE_IN_BRANCH`

## Consumer / route
- project: MoreNumTegra
- exact-project route: `/empreendimentos/soma-perdizes/`
- reference family: Standard
- reference direction: DSG interaction/visual family + Ledge completeness/performance learnings + RESF C17
- consumer main at branch start: `a79ceccc171d4b677f69d404bb01442512c2c2de`
- RESF provider: `59517d276c25c6529390ed67a0f68a9f914cb332`

## Search owner
Primary owner:
- `Soma Perdizes`

Secondary query families:
- Soma Perdizes Tegra
- apartamento Soma Perdizes
- apartamentos em Perdizes
- Soma Perdizes preço
- Soma Perdizes planta
- Soma Perdizes 45 m²
- studio Soma Perdizes
- apartamento Avenida Sumaré
- apartamento próximo à futura Estação Perdizes

No alias/doorway routes are authorized.

## Primary official source
Tegra:
- https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/somaperdizes

Observed 2026-09-28:
- name: Soma Perdizes
- address: Avenida Sumaré, 179
- neighborhood: Perdizes
- city/state: São Paulo/SP
- stage: Entregue
- commercial status: Últimas unidades
- apartments: 41 m² and 45 m² / 1 dorm
- studios: 25 m²
- commercial units: 33 m² to 66 m²
- official public price reference: R$ 630.000 / 45 m² / unit 602 / Aug-2026 / cash
- architecture: Königsberger Vannucchi Arquitetos Associados
- landscape: Núcleo Arquitetura da Paisagem
- interiors: Carlos Rossi Arquitetura de Interiores
- verified amenities include rooftop/pool, fitness, coworking, pet place, delivery, sauna, bicycle storage, barbecue gourmet, SPA and party room
- official locality references include future Perdizes metro station, Allianz Parque, Bourbon, West Plaza, Sesc Pompeia and Parque da Água Branca

## Consumer commercial truth
Current MoreNumTegra Home card:
- starting value: R$ 630.000
- unit: 0602
- 45 m²
- R$ 14.000/m²
- availability/conditions disclaimer required

This matches the official current Tegra public starting price at evidence capture.

## Fact conflicts / blocks
- Postal code: `BLOCKED_BY_MISSING_GOVERNED_FACT`. Secondary sources conflict; do not publish a postalCode until consumer Product Truth resolves it.
- Geo coordinates: `BLOCKED_BY_MISSING_GOVERNED_FACT`. Do not infer.
- Studios are listed by Tegra as part of the project, while individual studio plant sections are shown as 100% sold. Do not imply studio availability.
- Commercial availability by typology must be confirmed in sales service.

## C17 readiness matrix
- primary search owner: PRESENT
- independent fact pack: PRESENT
- price commercial truth: PRESENT
- persistent conditions CTA: REQUIRED
- persistent WhatsApp: REQUIRED
- gallery >= 6 official/authorized images: REQUIRED
- visible location section: REQUIRED
- WhatsApp exact-location handoff: REQUIRED
- Form 46: REQUIRED
- consent preferences lifecycle: SHARED_RUNTIME_REQUIRED
- coherent schema graph: REQUIRED
- postalCode: BLOCKED_BY_MISSING_FACT
- geo: BLOCKED_BY_MISSING_FACT
- Home internal link: REQUIRED
- Home ItemList: REQUIRED
- sitemap: REQUIRED
- cross-browser Form/CTA smoke: REQUIRED
- performance evidence: REQUIRED_BEFORE_RELEASE_READY

## Release boundary
No merge/Production conclusion until repository gates, route integration, browser smoke and performance/visual validation are complete.
