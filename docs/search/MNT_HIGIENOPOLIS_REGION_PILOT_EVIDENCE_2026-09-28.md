# Higienópolis regional pilot — evidence and boundaries

Date: 2026-09-28. Base main: `41601a5440d76322e83e19ea5c4fabc9b83ff9ce`.

## Search ownership

- Primary intent: Tegra projects in Higienópolis / regional discovery.
- Secondary: apartments in Higienópolis with a Tegra preference; compare Ária and Mozae at a factual level.
- Exclusions: exact-project title queries, independent neighborhood guide, other developers, prices and availability.
- Qualitative SERP inspection found both exact Tegra project pages and broader neighborhood/property listings. No reliable volume, CPC or keyword difficulty was asserted.
- Title and H1 avoid ownership of the exact project phrases.

## Factual sources

- Ária product: `src-greenn/empreendimentos/aria-higienopolis/index.html` at base SHA; official [Tegra Ária page](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/aria). Delivered; studios 30 m² and apartments 53 m²; rooftop and pool.
- Mozae product: `src-greenn/empreendimentos/mozae-higienopolis/index.html`; `docs/search/MNT_MOZAE_HIGIENOPOLIS_RESF_C17_FACT_PACK_2026-09-28.md`; official [Tegra Mozae page](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/higienopolis/mozaehigienopolis). Construction; 46 and 73 m²; mural by Isabel Ruas. The conflicting commercial price references were excluded.
- Parque Buenos Aires and its amenities: [Prefeitura de São Paulo](https://prefeitura.sp.gov.br/web/meio_ambiente/w/noticias/318425).
- Higienópolis–Mackenzie station on Line 4: [Metrô de São Paulo](https://www.metro.sp.gov.br/sua-viagem/bilhetes-cartoes/cartao-fidelidade/).
- FAAP in neighborhood history: [Prefeitura de São Paulo](https://prefeitura.sp.gov.br/web/meio_ambiente/w/parques/regiao_centrooeste/5732).

Descriptions of choosing a project are editorial guidance, not commercial or investment claims. No distance or travel time is asserted.

## Conversion and measurement

The existing Form 46 runtime is reused. A region-only lead carries `Higienópolis | São Paulo | Tegra` in the existing `texto-livre` context, with no fabricated project identity. Selecting either card sets the existing project context. The runtime extension returns an empty project context for region-only conversion markers; page identity and route identify the regional origin. No PII is sent to dataLayer. No new provider field, GTM container, GA4 stream, consent behavior, backend, or real preview submission is introduced.

## Validation and residuals

Static HTML parser: no duplicate IDs or broken in-page fragments; both project links present. `vercel.json` parses and maps the intended route. Production sitemap intentionally unchanged.

The repository currently sets `git.deploymentEnabled["**"] = false` and `main = true`. Thus branch preview is unavailable under the current policy. Mobile browser, runtime Form 46, measurement, accessibility and performance acceptance remain pending. This candidate must not be marked Ready, merged or published until the preview gate is resolved and those checks pass.
