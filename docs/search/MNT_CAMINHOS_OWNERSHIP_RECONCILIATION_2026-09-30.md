# MoreNumTegra — Caminhos da Lapa Ownership Reconciliation — 2026-09-30

Status: `ACCEPTED / SEARCH_ARCHITECTURE_DECISION / DOCS_ONLY / NO_RUNTIME_MUTATION`

## Scope

Resolve the semantic/page ownership hierarchy for:

- geographic intent: Lapa;
- master-development intent: Caminhos da Lapa;
- exact-project intent: Nova Vivere, Garden Design, Elo Duo, Reserva and other project entities;
- lifecycle-dependent commercial intent;
- historical sibling-domain equity.

No route, redirect, canonical, sitemap, DNS, GTM/GA4 or production mutation is authorized by this decision alone.

## Resolved hierarchy

```text
REGION
→ MASTER DEVELOPMENT
→ EXACT PROJECT
```

Concrete ownership:

```text
Lapa geographic intent
→ future MoreNumTegra /regioes/lapa/

Caminhos da Lapa master-development/entity intent
→ dedicated Caminhos property

Exact-project intent
→ MoreNumTegra /empreendimentos/<project-slug>/
```

## MoreNumTegra master-route decision

```text
/caminhos-da-lapa/
= KEEP NAMESPACE RESERVED
= DO NOT CREATE
```

Reason:
- creating a second full master-development owner inside MoreNumTegra would duplicate a dedicated Caminhos surface;
- exact projects already have governed MoreNumTegra owners;
- the future Lapa regional page has a separate geographic role;
- current architecture should reduce overlap rather than create another master owner.

## Dedicated Caminhos property

Current public evidence on 2026-09-30 shows:

- `https://www.caminhosdalapaoficial.com.br/` operates as a current master-development surface, presenting the complex, Rua Jardim and the project family;
- `https://caminhosdalapategra.com.br/` remains live and has historical first-party Search Console equity for Caminhos queries.

Therefore:

```text
MASTER_ENTITY_OWNER_CLASS = DEDICATED_CAMINHOS_PROPERTY
HOSTNAME_FINAL_CONSOLIDATION = SEPARATE_GOVERNANCE/GSC/DNS_DECISION
```

This decision does not select, redirect or consolidate one hostname into another.

## Region owner

Future `/regioes/lapa/` owns geographic discovery such as:

- Tegra na Lapa;
- apartamentos Tegra na Lapa;
- empreendimentos na Lapa;
- Lapa / Zona Oeste discovery context.

It must not become a duplicate Caminhos master page.

## Exact-project owners

Current exact-project ownership remains:

- Nova Vivere → `/empreendimentos/nova-vivere/`
- Garden Design → `/empreendimentos/garden-design/`
- Elo Duo → `/empreendimentos/caminhos-da-lapa-elo-duo/`
- Reserva → `/empreendimentos/reserva-caminhos-da-lapa/`

Project-specific price, availability, typology, plants, exact address, commercial conditions and conversion CTA belong to the exact-project owner.

## Lifecycle rule

Preserve the distinction:

```text
PROJECT ENTITY OWNERSHIP != CURRENT COMMERCIAL OWNERSHIP
PHYSICAL STATE != COMMERCIAL STATE
```

Rules:
- active developer commercialization → exact project may own current price/availability/conditions;
- sold-out or delivered status does not automatically trigger redirect, canonical transfer, noindex, deletion or sitemap removal;
- historical/entity coverage can remain useful after commercial closure;
- any technical consolidation must follow semantic transition + evidence review;
- no sold-out state may be generalized into active stock.

## Internal-link direction

Approved architecture:

```text
Home → Region / Exact Projects / Stage Discovery
Region → verified Exact Projects
Dedicated Caminhos master → child projects
Exact Project → relevant discovery surfaces
```

Not approved:
- reciprocal exact-match link networks;
- using MoreNumTegra `/caminhos-da-lapa/` as a second master;
- redirecting historical Caminhos pages merely because lifecycle changed.

## Anti-cannibalization rules

1. Exact-project intent beats region/master/stage pages.
2. Region owns geography, not the Caminhos master entity.
3. Dedicated Caminhos property owns master-development identity.
4. Project modifiers inherit the exact-project owner.
5. Lifecycle changes may alter commercial messaging without changing durable entity ownership automatically.
6. Historical sibling-domain overlap is not automatically harmful cannibalization.
7. Destructive consolidation requires separate Search + GSC + DNS evidence and authorization.

## Evidence basis

Canonical repository evidence:
- `docs/search/MNT_M3_02_CAMINHOS_GSC_SIBLING_EVIDENCE_2026-09-13.md`
- `docs/search/MNT_M3_05_SEARCH_INTENT_QUERY_OWNERSHIP_CONTRACT_2026-09-13.md`
- `docs/search/MNT_M3_06_QUERY_FAMILY_PAGE_OWNER_MAP_2026-09-13.md`
- `docs/search/MNT_CAMINHOS_SEARCH_INTELLIGENCE_STUDY_2026-09-30.md`
- `docs/search/MNT_CAMINHOS_EXACT_PROJECT_SEO_GAP_ANALYSIS_2026-09-30.md`

Current public evidence resolved on 2026-09-30:
- `https://www.caminhosdalapaoficial.com.br/`
- `https://caminhosdalapategra.com.br/`
- official Tegra Lapa and exact-project surfaces.

Prior architecture and lifecycle specialist reviews converged on `PASS_WITH_RESIDUAL_RISK`, with the residual concentrated in dedicated-domain hostname/equity reconciliation rather than the hierarchy itself.

## Residual risk

```text
R1 = which dedicated Caminhos hostname should be the long-term canonical master owner
R2 = historical GSC equity preservation on caminhosdalapategra.com.br
R3 = future /regioes/lapa/ implementation must remain geographically distinct
R4 = commercial lifecycle ownership must be reviewed per project
```

## Next safe action

The architecture decision is closed.

Next bounded implementation candidate:

```text
MNT-REGION-LAPA-01
= build /regioes/lapa/ as a REGION discovery page
= not a Caminhos master page
= link to verified Lapa exact-project pages
= preserve dedicated Caminhos master ownership
```

Implementation requires its own branch/PR, factual project-set validation, Local Live Sync, checks and Product Authority approval before merge.
