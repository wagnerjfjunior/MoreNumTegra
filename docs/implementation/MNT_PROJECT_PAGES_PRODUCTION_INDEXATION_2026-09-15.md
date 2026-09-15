# MoreNumTegra — CAPIITOLO + Elo Duo production/indexation — 2026-09-15

Status: `AUTHORIZED_PRODUCTION_RELEASE_CANDIDATE`

## Product Authority authorization

On 2026-09-15 Product Authority explicitly authorized:

- CAPIITOLO to become indexable;
- full existing measurement path on project pages;
- Elo Duo publication even with the simpler current page design;
- both exact-project URLs in `sitemap.xml`;
- `Ver empreendimento →` links on the MoreTegra homepage cards for CAPIITOLO and Elo Duo;
- production release after the controlled Git/Vercel gate.

## URLs

- `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
- `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

## Search

Both routes are intended to be real, self-canonical, indexable exact-project pages and are listed in `sitemap.xml` together with the portfolio root.

CAPIITOLO production bootstrap sets `index,follow,max-image-preview:large`, canonical/OG URL, project/Breadcrumb/FAQ structured data and keeps the approved editorial experience as the rendered content source.

Elo Duo already carries `index,follow,max-image-preview:large`, self-canonical metadata and project structured data.

## Measurement

Canonical measurement architecture remains:

- GTM: `GTM-PGCR4R47`;
- GA4 measurement ID: `G-57M2XR0CY2`;
- primary conversion path: `mnt_lead_success -> generate_lead`;
- project-level `mnt_page_view`, intent and form events;
- no PII/free-text sent to GA4/dataLayer.

GA4 is governed through GTM. A second direct `gtag.js` installation is intentionally not added because that could double-count page views/events if the GA4 configuration tag is already published in the container.

## Commercial reference — CAPIITOLO

Visible reference preserved as authorized:

`R$ 3.647.490`

`Unidade 24 · 210 m² · R$ 17.369/m² · Valor a partir de R$ 3.647.490. Consulte a Tegra Vendas para confirmar disponibilidade desta unidade e condições vigentes.`

## Homepage discovery

`src-greenn/portal-links.js` adds a secondary `Ver empreendimento →` link only where a real governed exact-project URL exists. The primary negotiation CTA remains unchanged.

## Rate-limit / PR cleanup

This release consolidates the runtime outcome previously split across the Elo Duo pilot and the CAPIITOLO pilot chain, so the superseded runtime PRs can be closed after this release merges. Documentation/governance PRs outside this runtime scope are not silently merged or discarded.
