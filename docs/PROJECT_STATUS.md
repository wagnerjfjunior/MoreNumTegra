# Status do Projeto

Estado reconciliado em `2026-09-16`.

Fonte canônica: GitHub `main`.

Base live observada nesta reconciliação:

`f5b4b27cc31fa6247ad3394e40a295f2a58861d6`

## 1. Produção atual

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
LP = Green/GDigital fallback / non-canonical
```

Technical baseline vigente: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

Decision record: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`.

This documentation reconciliation does not by itself prove a new Vercel deployment or a new production smoke test. Repository, deployment, production and validation state remain separate.

## 2. Repository lifecycle

At the observed base:

```text
OPEN_PULL_REQUESTS = 0
```

Recent merged work:

- PR #94 — exact-project production/indexation release for CAPIITOLO + Elo Duo;
- PR #95 — stale-PR queue reconciliation/current runtime preservation;
- PR #96 — docs-only Commercial Data Plane v2 architecture/schema/hardcode inventory.

## 3. Current published exact-project stream

Canonical release routes currently established by PR #94:

- `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
- `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

The project may continue publishing additional governed exact-project pages without waiting for the FECH.AI Commercial Catalog architecture, provided each page independently passes Product Truth, Search/ownership, commercial-evidence, mobile, performance, Form 46 and measurement gates.

## 4. Commercial data architecture

PR #96 canonicalized the MoreNumTegra Commercial Data Plane v2 docs-only contract.

The architecture track is now split:

```text
FECH.AI
= upstream Commercial Catalog / Publication Context discovery

MoreNumTegra
= consumer contract / public rendering / SEO / conversion
```

Detailed cross-project handoff:

`docs/sfjm/MNT_FECHAI_COMMERCIAL_CATALOG_HANDOFF_2026-09-16.md`

The former local runtime Stage B from PR #96 is deferred while the upstream FECH.AI contract is being designed/adjudicated.

No MoreNumTegra runtime/backend/Supabase integration is authorized by this state update.

## 5. Security boundary

Read-only cross-project discovery found FECH.AI/Supabase security-advisor observations that have been transferred to the FECH.AI audit for live reconciliation.

Until the upstream publication boundary is reviewed and accepted:

- MoreNumTegra does not read FECH.AI internal operational tables directly;
- no privileged key/service role is exposed to browser code;
- no new MoreNumTegra commercial backend is created by implication;
- commercial runtime integration remains a separate future gate.

## 6. Search / publication continuation

Next local objective: continue the exact-project publication stream from clean canonical `main`.

The next page candidate must be resolved from current repository evidence, including Product Fact & Claim Registry and query/page ownership. Do not infer the candidate from conversation memory.

For commercial values during the transition:

- current governed evidence -> may be published under its applicable disclaimer/gate;
- absent/stale evidence -> consult-only;
- no stale hardcoded fallback should be introduced as new target architecture;
- visible price and structured data must not diverge.

## 7. Current pointers

Handoff atual: `handoffs/CURRENT.md`.

Próxima ação segura: `docs/NEXT_SAFE_ACTION.md`.

Ações bloqueadas: `docs/BLOCKED_ACTIONS.md`.
