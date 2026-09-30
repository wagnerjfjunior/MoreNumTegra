# Stage Discovery Hub Content Contract — 2026-09-30

Status: `RESEARCH_CANDIDATE / RUNTIME_NOT_AUTHORIZED`

Depends on:
- `docs/search/MNT_STAGE_DISCOVERY_MEMBERSHIP_2026-09-30.md`
- `docs/search/MNT_M3_06_QUERY_FAMILY_PAGE_OWNER_MAP_2026-09-13.md`
- `docs/linking/MNT_M4_07_SEMANTIC_INTERNAL_LINKING_CONTRACT_2026-09-14.md`

## 1. Purpose

Define decision-useful page structure for the three reserved stage owners without stealing exact-project ownership or creating thin filter pages.

```text
STAGE HUB = DISCOVERY + COMPARISON + EDUCATION
PROJECT PAGE = EXACT ENTITY + FACTS + COMMERCIAL DETAIL + CONVERSION
```

## 2. Shared page anatomy

Every stage hub should contain, in this order:

1. SEO/semantic hero
   - one H1 naming the stage and São Paulo/Tegra context naturally;
   - short answer explaining what the stage means;
   - no unsupported stock count or promotional superlative.

2. Current governed projects
   - cards only for members admitted by the membership matrix;
   - project name, verified location, governed typology/area summary, current stage;
   - commercial-state label separated from physical stage;
   - CTA to the exact project owner.

3. Decision comparison
   - user-useful comparison table or cards;
   - region, typology, area, stage and validated commercial state;
   - no price comparison unless all compared prices are release-current and same-condition comparable.

4. Buying-stage guide
   - explain practical implications of buying at that stage;
   - financing/payment/INCC/delivery themes only when factually supportable;
   - informational content must not impersonate legal/financial advice.

5. Related discovery
   - relevant region pages;
   - exact project pages;
   - other stage hubs only where the next/previous stage relationship helps the user.

6. FAQ
   - direct answers to stage-specific questions;
   - answers must remain consistent with visible copy and structured data.

7. Conversion
   - general consultation CTA;
   - project-specific availability remains on exact project owners or requires governed resolution.

## 3. /estagios/lancamento/

### Search role
Own stage-discovery intent around Tegra residential launches in São Paulo, not exact launch project names.

### Suggested H1
`Apartamentos Tegra em lançamento em São Paulo`

### Primary members
- Nova Vivere
- Château Jardin

Membership remains release-revalidation gated.

### Required educational topics
- what "lançamento" means in the purchase journey;
- differences between launch, construction and delivered property;
- payment-flow concepts before financing, without inventing a universal commercial flow;
- expected need to verify current price, availability and delivery schedule per project.

### Prohibited behavior
- claiming every listed unit is available;
- generic discount claims;
- separate thin pages for "launch + bedrooms", "launch + area", etc. without independent evidence.

## 4. /estagios/em-construcao/

### Search role
Own construction-stage discovery across verified current projects.

### Current primary members
- Garden Design
- CAPIITOLO by Piero Lissoni
- Ledge Brooklin
- Ampère Brooklin
- Mozae Higienópolis
- YPY Alto do Ipiranga

### Suggested H1
`Apartamentos Tegra em construção em São Paulo`

### Required educational topics
- what changes after launch and before delivery;
- construction progress is project-specific and must not be normalized into one generic completion promise;
- price/availability and delivery dates remain volatile project facts;
- how to compare neighborhood, typology, area and project stage.

### Optional useful field
A construction-progress field may appear only when sourced from a current first-party project surface and timestamped. It must never be a stale manually copied evergreen percentage.

## 5. /estagios/pronto-para-morar/

### Search role
Own ready/delivered residential discovery where current residential availability is governed.

### Suggested H1
`Apartamentos Tegra prontos para morar em São Paulo`

### Primary-grid eligibility
Only `READY_RESIDENTIAL_AVAILABLE`.

Rows currently classed `PRONTO_PRIMARY_CANDIDATE` must be revalidated before release.

### Separate non-primary states
- `READY_RESIDENTIAL_REVALIDATION_REQUIRED`: omit from active primary grid until resolved;
- `DELIVERED_HISTORICAL_OR_SOLD`: optional "empreendimentos entregues para conhecer/consultar" context, visually and semantically separated from active inventory;
- governed commercial exceptions may appear only when the exact exception is current and clearly qualified.

### Special mixed-use rule
If the official page says "Últimas unidades" but the remaining unit class can be office/commercial only, the project cannot be advertised as a ready residential option until residential stock is positively established.

### Required educational topics
- difference between "entregue" and "disponível";
- benefits/considerations of a ready property;
- immediate visit/inspection possibility only when the exact project supports it;
- financing and purchase timing at a high level, with project/bank-specific conditions kept outside generic claims.

## 6. Cards

Each card should use a stable schema:

```text
project_name
exact_project_url
location
physical_stage
commercial_state
typology_summary
area_summary
availability_label
availability_evidence_state
```

Render rules:
- `availability_label` may be omitted if not governed;
- do not synthesize "últimas unidades" from a price or contact form;
- do not reuse a sold-out historical project's CTA language as active inventory;
- exact project page CTA remains the authoritative next step.

## 7. Internal linking

Required graph:

```text
home -> stage hubs
stage hub -> exact projects
stage hub -> relevant regions
exact project -> relevant stage hub (secondary discovery)
region -> relevant stage hub only when useful
```

No stage hub may become the canonical or semantic substitute for an exact project.

## 8. Metadata direction

Titles/descriptions should describe the stage collection, not promise inventory quantities.

Examples are design direction, not final release copy:

```text
Apartamentos Tegra em Lançamento em São Paulo | MoreTegra
Apartamentos Tegra em Construção em São Paulo | MoreTegra
Apartamentos Tegra Prontos para Morar em São Paulo | MoreTegra
```

Final metadata must be checked for length, overlap and live SERP fit before implementation.

## 9. Structured data boundary

Potential visible-content-aligned types may be evaluated during implementation, but:
- stage hubs must not fabricate Offer inventory;
- ItemList/Product/Residence semantics require page-visible support;
- exact prices/offers belong to governed exact-project facts;
- FAQ structured data, if used, must exactly reflect visible FAQ content and current Google eligibility guidance.

## 10. Release proof obligations

Before a runtime PR:
1. resolve ready-to-move residential availability for every primary candidate;
2. freeze the member set with evidence timestamps;
3. produce final copy and metadata;
4. define card source fields;
5. validate internal links against M4-07;
6. define sitemap/canonical behavior for all three routes;
7. verify no collision with existing regional/project pages;
8. run project-specific CI and SFJM lifecycle.

No runtime mutation is authorized by this document.
