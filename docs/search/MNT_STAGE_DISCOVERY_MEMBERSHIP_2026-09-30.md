# Stage Discovery Membership Matrix — 2026-09-30

Status: `RESEARCH_CANDIDATE / RUNTIME_NOT_AUTHORIZED`

Scope: MoreNumTegra stage-discovery architecture only. This document does not publish routes, alter sitemap, internal links, canonical tags, runtime cards, Search Console, GTM/GA4, Ads or production.

Canonical architecture inputs:
- `docs/search/MNT_M3_05_SEARCH_INTENT_QUERY_OWNERSHIP_CONTRACT_2026-09-13.md`
- `docs/search/MNT_M3_06_QUERY_FAMILY_PAGE_OWNER_MAP_2026-09-13.md`
- `docs/product/MNT_M3_04_PRODUCT_FACT_CLAIM_REGISTRY_2026-09-13.md`
- `docs/product/data/MNT_M3_04_PRODUCT_FACT_CLAIM_REGISTRY_2026-09-13.csv`
- `docs/linking/MNT_M4_07_SEMANTIC_INTERNAL_LINKING_CONTRACT_2026-09-14.md`

## 1. Reserved stage owners

```text
/estagios/lancamento/
/estagios/em-construcao/
/estagios/pronto-para-morar/
```

These are discovery owners only.

```text
STAGE OWNER != EXACT PROJECT OWNER
PHYSICAL_STAGE != COMMERCIAL_AVAILABILITY
DELIVERED != READY_TO_BUY
MIXED_USE_AVAILABILITY != RESIDENTIAL_AVAILABILITY
```

Exact-project intent remains with `/empreendimentos/<project-slug>/`.

## 2. Admission rules

### Launch
Admit when current governed evidence classifies the project as `Lançamento`.

### Under construction
Admit when current governed evidence classifies the project as `Em construção`.

### Ready to move
Admit to the primary commercial grid only when all are true:
1. physical stage is `Entregue`;
2. current residential availability is positively established;
3. the exact project remains the commercial detail owner;
4. price/unit/availability claims are revalidated at release time when required.

For mixed-use projects, generic "últimas unidades" is insufficient if the remaining stock can be office/commercial only. Such rows remain `RESIDENTIAL_AVAILABILITY_REVALIDATION_REQUIRED`.

Delivered and sold-out projects may be useful as historical/entity context but must not be presented as current ready-to-buy inventory.

## 3. Current membership matrix

| Project | MoreNumTegra route | Physical/current stage | Commercial baseline | Stage hub disposition |
|---|---|---|---|---|
| Nova Vivere | `/empreendimentos/nova-vivere/` | Lançamento | ACTIVE / release revalidation | `LANCAMENTO_PRIMARY` |
| Château Jardin | `/empreendimentos/chateau-jardin/` | Lançamento | ACTIVE / release revalidation | `LANCAMENTO_PRIMARY` |
| Garden Design | `/empreendimentos/garden-design/` | Em construção | ACTIVE / release revalidation | `EM_CONSTRUCAO_PRIMARY` |
| CAPIITOLO by Piero Lissoni | `/empreendimentos/capiitolo-piero-lissoni/` | Em construção | ACTIVE / offer revalidation | `EM_CONSTRUCAO_PRIMARY` |
| Ledge Brooklin | `/empreendimentos/ledge-brooklin/` | Em construção | ACTIVE / release revalidation | `EM_CONSTRUCAO_PRIMARY` |
| Ampère Brooklin | `/empreendimentos/ampere-brooklin/` | Em construção | ACTIVE / release revalidation | `EM_CONSTRUCAO_PRIMARY` |
| Mozae Higienópolis | `/empreendimentos/mozae-higienopolis/` | Em construção | ACTIVE / governed 46m² + 73m² / release revalidation | `EM_CONSTRUCAO_PRIMARY` |
| YPY Alto do Ipiranga | `/empreendimentos/ypy-alto-do-ipiranga/` | Em construção | ACTIVE / release revalidation | `EM_CONSTRUCAO_PRIMARY` |
| Caminhos da Lapa Elo Duo | `/empreendimentos/caminhos-da-lapa-elo-duo/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Soma Perdizes | `/empreendimentos/soma-perdizes/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Bem Moema | `/empreendimentos/bem-moema/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Universo Tatuapé Órbita | `/empreendimentos/universo-tatuape-orbita/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Tièl Vila Nova Conceição | `/empreendimentos/tiel-vila-nova-conceicao/` | Entregue | Últimas unidades / release revalidation | `PRONTO_PRIMARY_CANDIDATE` |
| TEG Sacomã | `/empreendimentos/teg-sacoma/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Bueno Brandão 257 | `/empreendimentos/bueno-brandao-257/` | Entregue | Últimas unidades | `PRONTO_PRIMARY_CANDIDATE` |
| Ária Higienópolis | `/empreendimentos/aria-higienopolis/` | Entregue | Availability not explicit in M3-04; current public commercial surface exists | `RESIDENTIAL_AVAILABILITY_REVALIDATION_REQUIRED` |
| DSG Itaim | `/empreendimentos/dsg-itaim/` | Entregue | Últimas unidades on mixed-use surface | `RESIDENTIAL_AVAILABILITY_REVALIDATION_REQUIRED` |
| Bem Moema Studios & Offices | `/empreendimentos/bem-moema-studios-offices/` | Entregue | Availability not explicit in M3-04; mixed-use | `RESIDENTIAL_AVAILABILITY_REVALIDATION_REQUIRED` |
| Zahle Jardins | `/empreendimentos/zahle-jardins/` | Entregue | Últimas unidades, but residential section is 100% sold | `EXCLUDE_FROM_RESIDENTIAL_READY_UNTIL_PROVEN` |
| ODE Perdizes | `/empreendimentos/ode-perdizes/` | Entregue | 100% vendido + returned-unit exception requiring exact revalidation | `HISTORICAL_OR_EXCEPTION_ONLY` |
| Reserva Caminhos da Lapa | `/empreendimentos/reserva-caminhos-da-lapa/` | Entregue | 100% vendido + exception units under consultation requiring revalidation | `HISTORICAL_OR_EXCEPTION_ONLY` |
| Chez Vous Moema | `/empreendimentos/chez-vous-moema/` | Entregue | 100% vendido | `HISTORICAL_ONLY` |
| Key Moema | `/empreendimentos/key-moema/` | Entregue | 100% vendido | `HISTORICAL_ONLY` |
| Ayla Moema Studio & Office | `/empreendimentos/ayla-moema-studio-office/` | Entregue | 100% vendido | `HISTORICAL_ONLY` |
| Viso Moema | `/empreendimentos/viso-moema/` | Entregue | 100% vendido | `HISTORICAL_ONLY` |

Coverage: 25/25 project routes currently listed in the MoreNumTegra sitemap reviewed for this stage slice.

## 4. Current external revalidation observed on 2026-09-30

Current Tegra first-party surfaces observed during this research support, among others:
- Nova Vivere and Château Jardin as `Lançamento`;
- Garden Design, CAPIITOLO, Ledge Brooklin, Ampère Brooklin, Mozae Higienópolis and YPY Alto do Ipiranga as `Em construção`;
- Elo Duo, Soma Perdizes, Bem Moema, Universo Tatuapé Órbita, Tièl, TEG Sacomã and Bueno Brandão 257 as `Entregue` with current commercial signals such as `Últimas unidades`;
- Reserva, Chez Vous, Key Moema, Ayla Moema Studio & Office and Viso Moema as `Entregue / 100% Vendido`.

External first-party pages are point-in-time evidence and do not eliminate release-time revalidation obligations already established by M3-04.

## 5. Page-content contract

Each stage hub must:
- explain the purchase-stage meaning;
- list only governed members;
- link every member to its exact project owner;
- never absorb project-name, price, floor-plan, address or availability ownership;
- distinguish physical stage from commercial availability;
- contain useful comparison fields such as region, typology, area and commercial state only when governed;
- avoid indexable filter permutations;
- preserve natural internal-link anchors;
- provide a commercial CTA at hub level without making unsupported project-level inventory claims.

## 6. Ready-page special rule

`/estagios/pronto-para-morar/` must separate:
1. `READY_RESIDENTIAL_AVAILABLE` — eligible primary cards;
2. `READY_RESIDENTIAL_REVALIDATION_REQUIRED` — not eligible until stock class is proven;
3. `DELIVERED_HISTORICAL_OR_SOLD` — optional contextual section only, never active inventory.

This prevents a mixed-use office remainder or historical sold entity from being misrepresented as a residential unit ready to buy.

## 7. Next implementation gate

Before runtime implementation:
1. revalidate all `PRONTO_PRIMARY_CANDIDATE` rows for residential availability;
2. adjudicate the three ambiguous mixed-use/current-commercial rows;
3. freeze launch/construction membership for release;
4. define exact copy, cards and internal-link graph;
5. validate sitemap/canonical/structured-data implications;
6. implement on a dedicated branch and run existing MoreNumTegra lifecycle gates.

No runtime implementation is authorized by this research artifact alone.
