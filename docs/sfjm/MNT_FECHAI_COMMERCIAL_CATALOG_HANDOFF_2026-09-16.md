# MoreNumTegra ↔ FECH.AI — Commercial Catalog Handoff

**Status:** `CURRENT / CROSS_PROJECT_HANDOFF / READ_ONLY_DISCOVERY_DELEGATED`

**Date:** `2026-09-16`

**MoreNumTegra repository:** `wagnerjfjunior/MoreNumTegra`

**MoreNumTegra decision base main observed:** `f5b4b27cc31fa6247ad3394e40a295f2a58861d6`

**FECH.AI repository:** `wagnerjfjunior/fecha.ai`

This document transfers the Commercial Catalog / Publication architecture discovery to FECH.AI while preserving MoreNumTegra as an independent consumer and allowing the exact-project page publication stream to continue.

## 1. Separation of responsibilities

```text
FECH.AI
= candidate upstream commercial authority / write model / publication provider

MoreNumTegra
= public consumer / presentation / SEO / performance / lead conversion
```

Do not migrate MoreNumTegra pages, HTML, CSS, JS, SEO ownership or Form 46 runtime into FECH.AI.

Do not create a second independent property registry in MoreNumTegra when the FECH.AI Mesa Cliente registry can be reused safely through a governed contract.

## 2. MoreNumTegra state

PR #94 consolidated the current governed exact-project production release for:

- `/empreendimentos/capiitolo-piero-lissoni/`;
- `/empreendimentos/caminhos-da-lapa-elo-duo/`.

PR #95 reconciled the stale PR queue and preserved the current runtime line.

PR #96 canonicalized the docs-only `Commercial Data Plane v2` contract, schema and hardcode inventory.

At the handoff base there are no open MoreNumTegra pull requests.

The PR #96 commercial-data work must now be interpreted operationally as the **consumer-side contract/boundary**. It does not authorize a MoreNumTegra-owned commercial backend or a local Stage B runtime migration while FECH.AI architecture discovery is pending.

## 3. FECH.AI state observed during read-only cross-project discovery

The following were observed from FECH.AI live sources during this handoff and MUST be revalidated by the FECH.AI conversation before use as current authority:

- FECH.AI `main` observed at `637d51d670394784079819a7ca0c11eba3d83232`;
- architecture decision `STS-M2-06 = COMPLETE / ACCEPTED`;
- database strategy `V2_STRANGLER / SAME_DATABASE_FIRST`;
- current Supabase project observed as `Discador-MesaCliente` / `uobxxgzshrmbtjfdolxd`;
- FECH.AI security program still has residuals and `Security Go = NOT_GRANTED` at the observed state.

The accepted FECH.AI strategy means a new production database is not the default. New capability should first be evaluated as a bounded context in the existing PostgreSQL/Supabase, with versioned contracts, server-side authority, staged cutover and explicit legacy retirement.

## 4. Mesa Cliente capability observed

Read-only inspection found an existing project/inventory domain including structures such as:

- `empresas`;
- `empreendimentos`;
- `estoque_arquivos`;
- `estoque_snapshots`;
- `unidades_estoque`;
- Mesa Cliente simulation/financial structures;
- discount/financial-policy structures;
- audit/RBAC/multiempresa controls.

The `empreendimentos` registry already contained UUIDs and tenant association and included, at the observation time, projects such as Ária, Capitolo, Chateau Jardin, Elo Duo, Garden, Nova Vivere and YPY Alto do Ipiranga.

These observations are discovery evidence, not permission to couple MoreNumTegra directly to internal FECH.AI tables.

## 5. Security observations to reconcile in FECH.AI

A read-only Supabase Security Advisor run produced external observations that FECH.AI must revalidate and reconcile against its existing STS/WBS. They are not independent conclusions that exploitation is possible.

Observed approximately:

- `22` `SECURITY DEFINER` routines executable by `anon`;
- `122` `SECURITY DEFINER` routines executable by `authenticated`;
- `7` RLS-enabled tables with no policy;
- one mutable `search_path` warning;
- leaked-password protection disabled.

Examples in the observed anon-executable set included Mesa Cliente read/import/policy functions. FECH.AI must classify every item as already resolved, covered, planned, residual, or unowned, with evidence.

MoreNumTegra must NOT use this finding list as justification to expose internal FECH.AI tables directly.

## 6. Target architecture hypothesis

To be validated by FECH.AI architecture/security discovery:

```text
FECH.AI internal write model
    -> Property Registry / Mesa Cliente
    -> inventory source + snapshots + units
    -> Commercial Catalog / pricing policy
    -> controlled Publication Context
    -> versioned public read model
    -> MoreNumTegra consumer
```

Required invariants:

```text
PUBLIC_READ != ADMIN_WRITE
SERVICE_ROLE != BROWSER
CLIENT-PROVIDED TENANT != AUTHORITY
PUBLISHED DATA != INTERNAL COMMERCIAL DATASET
```

MoreNumTegra must consume only explicitly published public data, never operational/admin tables.

## 7. Commercial pricing domain — Product Authority reported rules to validate

The pricing domain must represent commercial components without reducing them to a guessed formula.

Reported current Tegra practices include:

1. exact table price;
2. Tegra-provided VPL condition/discount;
3. broker prize/incentive that may, when authorized, be reduced/removed to lower the client price;
4. cash / à-vista condition;
5. unit-specific or time-specific promotional price.

These are `USER_REPORTED / MUST_VALIDATE` against real tables, Mesa Cliente rules and current functions before implementation.

Do NOT implement `final = table - VPL - prize` without evidence of combinability and calculation semantics.

The future model must distinguish:

```text
OBSERVED FACT
DERIVED PRICE
BUSINESS POLICY
PUBLICATION DECISION
```

and retain provenance, validity, source, calculation explanation, approval and revision history.

## 8. Unit selection policy — Product Authority reported rule to validate

When there is no unique unit, specifically promoted unit or explicitly selected unit, the public landing page generally uses the lowest-priced eligible available unit. This often correlates with a lower floor, but floor is not the governing rule.

Garden is a known reported exception and must not become a scattered hardcoded `if`.

The future policy should support governed strategies such as:

- `SPECIFIC_UNIT`;
- `ONLY_AVAILABLE_UNIT`;
- `PROMOTIONAL_UNIT`;
- `LOWEST_ELIGIBLE_PRICE`;
- `MANUAL_APPROVED_UNIT`;
- project-specific governed policy where justified.

Only publishable/eligible inventory may participate in selection.

## 9. Media crossover opportunity

Landing pages may contain better project photography than the current Mesa Cliente presentation.

A future optional enhancement may let Mesa Cliente consume governed landing-page media metadata, preferably as URLs plus provenance/rights/alt/order/status instead of duplicating heavy binaries.

Media/presentation metadata remains distinct from commercial truth and must not block Commercial Catalog delivery.

## 10. MoreNumTegra continuation while FECH.AI discovery runs

The Commercial Catalog discovery is **not a blocker** for publishing additional exact-project pages when those pages can satisfy existing Product Truth, Search, SEO, Form 46, measurement, mobile and performance gates.

Rules during this period:

- do not expand commercial hardcoding as the target architecture;
- use only current governed commercial evidence when a price is displayed;
- if no current publishable commercial evidence exists, use consult-only behavior rather than inventing or copying stale values;
- keep visible price and structured-data price consistent;
- do not create a direct FECH.AI/Supabase browser dependency;
- do not create a MoreNumTegra commercial backend while the cross-project contract is unresolved.

## 11. Re-entry gate into MoreNumTegra

FECH.AI work returns to the MoreNumTegra runtime only after a separately reviewed architecture/security result defines at minimum:

- upstream system of record;
- stable project identity/mapping;
- publication owner;
- public contract/schema/versioning;
- public/private field boundary;
- authentication/authorization boundary;
- cache/freshness/fail-closed behavior;
- provenance and rollback;
- pricing and unit-selection semantics;
- security residual disposition.

Only then may MoreNumTegra open a dedicated consumer-integration runtime PR.

## 12. Current local objective

The immediate MoreNumTegra objective is to resume the governed **exact-project page publication stream** from the clean canonical main.

Selection of the next project/page must be reconstructed from the current Product Fact & Claim Registry, ownership/search evidence and live runtime. Do not infer the next project solely from historical conversation or homepage ordering.

One page or one deliberately bounded publication batch per primary risk is preferred.
