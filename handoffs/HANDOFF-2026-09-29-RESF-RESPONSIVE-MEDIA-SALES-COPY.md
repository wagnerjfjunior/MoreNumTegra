# HANDOFF — 2026-09-29 — RESF responsive media + sales-copy correction

## CANONICAL

Repository: `wagnerjfjunior/MoreNumTegra`

GitHub `main` remains canonical.

Live state at handoff creation:

```text
main = 4454c21ab663ea9f8e00417eb6f5fc4b8f69423b
active branch = fix/resf-responsive-media-20260929
active branch head = 9f5e3b71ed36fe57b92494900e69ac8db028d3f4
PR = #306 / OPEN
```

Do not assume these SHAs remain current. Resolve live before any conclusion or mutation.

## USER DECISIONS / NON-NEGOTIABLES

1. Exact-project pages use Château Jardin / corrected Tièl as the visual standard.
2. RESF responsive-media delivery is mandatory for new exact-project and regional pages.
3. Do not publish technical/internal copy such as viewer, layout, implementation, regression, branch, canonical, JSON-LD, mobile/desktop engineering notes.
4. Exact project street address must not be exposed in normal page body. It may remain in the governed footer location hook and structured data where canonical standards allow it.
5. Canonical commercial footer/disclaimer + Sabrina da Tegra block must be preserved.
6. Sold-out/legacy Moema pages are NOT to be written as dead/archive pages. They remain strong sales pages.
7. Visible sales copy must use scarcity/qualification language such as:
   - Sucesso de vendas
   - Consulte disponibilidade
   - Consulte condições atuais
   - Disponibilidade sujeita a consulta
   Never lead with:
   - 100% vendido
   - não possui disponibilidade
   - o imóvel saiu do estoque
   - página histórica
   - projeto vendido
   - vamos procurar o próximo
8. Do not invent availability. CTA is to verify availability with Sabrina/Tegra Vendas.
9. The four Moema legacy projects remain excluded from the active Home commercial catalog, but their exact pages and the Moema regional hub can capture SEO demand and convert to lead.
10. Neutral editorial environment may later cover rental demand; MoreTegra remains purchase/commercial oriented.

## PUBLISHED STATE BEFORE ACTIVE REMEDIATION

The Sep-29 catalog/region expansion was merged and published before the performance regression was detected.

Production source at remediation start:

```text
main = 4454c21ab663ea9f8e00417eb6f5fc4b8f69423b
Vercel production deployment observed READY
```

Published Moema routes include:

- /regioes/moema/
- /empreendimentos/bem-moema/
- /empreendimentos/chez-vous-moema/
- /empreendimentos/key-moema/
- /empreendimentos/ayla-moema-studio-office/
- /empreendimentos/viso-moema/

The four legacy Moema pages were added to sitemap after existence/indexability/canonical checks.

## PERFORMANCE REGRESSION OBSERVED BY USER

User screenshots showed:

- regional Perdizes LCP around 3.1 s
- Ayla mobile LCP around 6.9 s

This triggered a RESF remediation. Do not claim final improved LCP until measured after release.

Canonical performance standard read:

- `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`
- `docs/frameworks/resf/MNT_EXACT_PROJECT_PAGE_READINESS_V1.md`

Key RESF rule being restored:

- hero is in initial HTML
- `fetchpriority="high"`
- no hero lazy-load
- responsive mobile derivatives via `<picture>/<source srcset sizes>`
- project-owned lightweight WebP mobile assets
- original authorized Azure/GDigital image remains fallback/desktop
- no blanket preload
- no upscale
- small mobile hero budget, generally <=100 KiB

## ACTIVE BRANCH — RESF REMEDIATION

Branch:

`fix/resf-responsive-media-20260929`

PR:

`#306 — perf: restore RESF responsive media on new project and region pages`

Exact head at handoff creation:

`9f5e3b71ed36fe57b92494900e69ac8db028d3f4`

Resolve live before continuing.

Project-owned derivatives have been generated under:

`assets/resf/<page>/hero-mobile-640.webp`
`assets/resf/<page>/hero-mobile-828.webp` where source dimensions allow it.

A manifest exists:

`assets/resf/manifest.json`

Observed generated sizes include approximately:

- Ampère 640: 64 KB
- Bem Moema 640: 74 KB
- Bem Moema Studios 640: 36 KB
- Tièl 640: 46 KB
- Órbita 640: 98 KB
- TEG Sacomã 640: 64 KB
- Chez Vous 640/828: 48/72 KB
- Key 640/828: 58/91 KB
- Ayla 640/828: 67/97 KB
- Viso 640/828: 49/79 KB
- regional Brooklin 640: 56 KB
- regional Perdizes 640: 89 KB
- regional Vila Nova Conceição 640: 74 KB

A temporary attempt to use the corporate Tegra Next image optimizer was rejected because the canonical commercial-page validator forbids corporate-site URLs. Do not reintroduce that dependency.

## SALES-COPY CORRECTION — MOEMA

The following pages were corrected on the active branch so visible copy no longer contains the dead-end language:

- Chez Vous Moema
- Key Moema
- Ayla Moema Studio & Office
- Viso Moema
- regional /regioes/moema/

A live branch audit at handoff creation found none of these visible phrases on those five pages:

- 100% vendido
- não possui disponibilidade
- O imóvel saiu do estoque
- página histórica
- projeto vendido
- produto foi vendido
- está 100% vendido
- não oferece unidade
- vamos procurar o próximo
- não representa oferta

Current intended visible framing:

`SUCESSO DE VENDAS · CONSULTE DISPONIBILIDADE`

Primary commercial action should remain tied to the exact project:

`Consultar disponibilidade`
`Consultar condições atuais`

Secondary links to Moema/catalog may remain, but must not replace the project CTA.

## SEO OWNERSHIP — MOEMA

Regional page remains generic owner:

`/regioes/moema/`
H1: `Apartamentos em Moema`

Current exact-page differentiated H1 strategy:

- Chez Vous: `Apartamento de 71 m² em Moema com 2 dormitórios`
- Key: `Apartamentos de 62 a 74 m² em Moema a 220 m do metrô`
- Ayla: `Studios e salas comerciais em Moema`
- Viso: `Apartamentos de 74 e 115 m² em Moema`

Planner exports supplied by user showed material demand around generic Moema apartment terms and `key moema`; GSC live query for `moema` previously returned zero rows for the queried period, so do not invent current GSC demand/position.

## CURRENT CHECK STATE — PR #306

At head `9f5e3b71ed36fe57b92494900e69ac8db028d3f4`:

- Validate Open Graph and Twitter metadata = SUCCESS
- Validate commercial page standard = SUCCESS
- Validate canonical favicon = SUCCESS
- general `validate` = FAILURE
- Mermaid = SKIPPED

The general validator failure log includes legacy/static map expectations across several older pages. Do not merge merely because three focused checks pass. Inspect current exact-head failure and separate:
- regression introduced by PR #306
from
- pre-existing validator debt / stale expectations.

No merge is authorized merely by this handoff.

## NEXT SAFE ACTION

1. Resolve `main`, branch head and PR #306 live.
2. Re-read bootstrap/CURRENT/status/NEXT/BLOCKED and RESF responsive-media standard.
3. Finish wiring project-owned RESF hero derivatives into every intended new exact-project and regional page. Do not use corporate Tegra optimizer URLs.
4. Confirm no hero uses lazy-load; preserve `fetchpriority="high"`.
5. Confirm original media remains fallback/desktop.
6. Re-audit Moema sales copy for dead-end language and CTA semantics.
7. Re-run exact-head checks.
8. Inspect general validator failures and remediate only PR-caused failures.
9. Validate via Local Live Sync before merge if visual/crop changes are material.
10. After explicit user acceptance, merge PR #306 and validate Production.
11. Run a post-release mobile performance battery before claiming LCP improvement.

## LOCAL LIVE SYNC

Use:

`fix/resf-responsive-media-20260929`

At handoff creation expected head:

`9f5e3b71ed36fe57b92494900e69ac8db028d3f4`

Always trust the live `[SYNC] OK branch=... head=...` line over this static handoff if newer.

## IMPORTANT: DO NOT REGRESS

- Do not put engineering notes on public pages.
- Do not expose exact project address in body copy.
- Do not remove canonical footer disclaimer.
- Do not turn legacy/sold-out pages into archive/dead-end pages.
- Do not claim availability that is not proven; use consultation language.
- Do not claim LCP improvement without measurement.
- Do not add sold Moema projects to Home active catalog unless Product Authority changes the rule.
