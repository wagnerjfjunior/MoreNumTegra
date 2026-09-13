# MNT-M3-04 — September commercial reconciliation — 2026-09-13

Status: `AUTHORITATIVE_SUPPLEMENT_FOR_M3_04_CANDIDATE`

Source fully read: `Tegra/Setembro/Endomarket-Setembro.md` at commit `264d11477e2c6193a457f8541f58700c93743d26`.

This supplement is reconciled with the base registry and both machine-readable CSVs. Prose no longer overrides stale CSV adjudications.

## Source semantics

Current public Tegra pages control low-volatility identity/address/headline product facts and the general inventory baseline. Dated Product Authority commercial evidence controls narrower volatile objects such as exact units, exact prices and temporary conditions, always subject to release-time revalidation. Any Product Authority interpretation is recorded separately and is not attributed to the commercial file itself.

`PUBLIC SOLD-OUT BASELINE + GOVERNED EXCEPTION INVENTORY != GENERAL STOCK REOPENING`

## Product Authority decision provenance

These are direct Product Authority assertions recorded under the explicit `2026-09-13` authorization to correct PR #59 according to the blocking `content_semantic_seo` findings.

Stable locator: `https://github.com/wagnerjfjunior/MoreNumTegra/pull/59`

### `PA-MNT-M3-04-ODE-2026-09-13`

- class: `DIRECT_PRODUCT_AUTHORITY_ASSERTION`
- clarification: ODE Perdizes unit 22 returned
- separate commercial evidence: `Endomarket-Setembro.md@264d11477e2c6193a457f8541f58700c93743d26` records unit 22 / 2º andar / R$ 2.090.000
- boundary: the return explanation is not inferred from Endomarket
- gate: `RELEASE_REVALIDATION_REQUIRED`

### `PA-MNT-M3-04-RESERVA-2026-09-13`

- class: `DIRECT_PRODUCT_AUTHORITY_ASSERTION`
- clarification: Reserva Caminhos da Lapa has exception units under consultation
- separate commercial evidence: `Endomarket-Setembro.md@264d11477e2c6193a457f8541f58700c93743d26` records `100% Vendido / Preço sob consulta`
- boundary: `Preço sob consulta` alone does not prove inventory; exception availability comes from this Product Authority decision
- gate: `RELEASE_REVALIDATION_REQUIRED`

## ODE Perdizes

Public baseline: `Entregue / 100% Vendido`.

September evidence: `unidade 22 / 2º andar / R$ 2.090.000`.

Disposition: `SOLD_OUT_BASELINE + CURRENT_RETURNED_UNIT_EXCEPTION / RELEASE_REVALIDATION_REQUIRED`.

Do not represent ODE as generally available. Unit 22 may be used commercially only after explicit revalidation for that exact unit. The older `De R$ 2.200.000` comparison is not recertified and remains prohibited.

## Reserva Caminhos da Lapa

Public baseline: `Entregue / 100% Vendido`.

September evidence: `100% Vendido / Preço sob consulta`.

Disposition: `SOLD_OUT_BASELINE_WITH_EXCEPTION_UNITS_UNDER_CONSULTATION / RELEASE_REVALIDATION_REQUIRED`.

Do not invent quantity, unit numbers or price. `Sob consulta` must not imply general inventory reopening and may be used only after current revalidation.

## Tièl Vila Nova Conceição

September evidence confirms `unidade 914 / 21m² / R$ 28.500/m²` and product families of 19m² and 21m².

`21 × R$ 28.500 = R$ 598.500`, exactly matching the runtime total.

Disposition: `CURRENT_INTERNAL_MATCH / RELEASE_REVALIDATION_REQUIRED`.

The prior 19m²-versus-21m² discrepancy is resolved; availability and price remain volatile.

## Mozae Higienópolis

September evidence records product families of 46m² and 73m². Runtime `45m² a 73m²` remains a future implementation correction; governed headline values are `46m² e 73m²` unless newer official evidence supersedes them.

## Release-time revalidation

No TTL is invented. A volatile commercial claim remains release-blocked until an explicit verification of the same commercial object records at least: `project_id`, unit when applicable, relevant metragem, price when claimed, availability/consultation state, promotion/comparison condition when applicable, source locator, verification timestamp and validating authority/source.

## Downstream rule

MNT-M3-05 and later tasks consume this supplement together with the base registry and machine-readable CSVs as one internally consistent candidate. ODE, Reserva and Tièl must not retain contradictory stale states in the CSV layer.

No runtime, Green, Vercel, GTM/GA4 or page implementation change is authorized by this supplement.