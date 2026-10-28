## 28/10/2026 — ESTADO VIGENTE: Mercado e RIIO em produção (PR #507)

**Supera os avisos históricos de preparação/noindex abaixo para estas 12 páginas.** PR #507 MERGED; head final `99ff6710b1d792468d43a8cca3f38c1fc1b7b3e8` com 10/10 checks SUCCESS; merge/runtime `0b1de5b1218fb1c4c83c2683366bdfe11ad60d44`; Vercel Production READY `dpl_8iiXm3RtVDbMhNSbHdpaJBq6KjjG`. Onze artigos Mercado + RIIO HTTP200, indexáveis, canonical www e JSON-LD sintaticamente válido; hub/Blog/catálogo/sitemap atualizados (73 URLs no sitemap). Isso não comprova indexação Google/Bing.

Ler integralmente `docs/sfjm/MNT_MERCADO_RIIO_PRODUCAO_CONTINUIDADE_2026-10-28.md` e JSON homônimo. Preservar cards/badges/rodapé RESF, IPTU atemporal, novo hero Inventário, ficha integral/galerias/bairro do RIIO e atendimento inicial remoto sem credencial RJ inventada. QA visual independente, testes oficiais schema/performance e entrega CRM do lote seguem pendentes. Não reabrir redação/publicação do lote. Próxima ação: resolver live e QA pós-release em leitura; prioridade de negócio continua cliques qualificados. Este pedido atualiza documentação, sem novo runtime/Core/CRM/campanhas. Prompt: `handoffs/PROMPT_RETOMADA_MERCADO_RIIO_2026-10-28.md`.

---

# MoreNumTegra — SFJM Consumer Entrypoint

Status: `CANONICAL_WHEN_MERGED_TO_MAIN`.

This directory exposes project-owned structured state for read-only SFJM Workspace consumption.

## Entrypoints

1. `docs/sfjm/PROJECT_READ_MODEL.json` — project summary, progress, issues/evidence and pointers.
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress overlay.
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — structural MNT-M0..MNT-M7 hierarchy and planning hours.
4. `docs/sfjm/PROGRAM_TASK_GRAPH.md` — consumption/presentation contract.
5. `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — human WBS.

## Resolution rule

A consumer must resolve `wagnerjfjunior/MoreNumTegra@main` live and record observed SHA/time before current-state claims.

Then read, at minimum:

1. `bootstrap/BOOTSTRAP_CANONICO.md`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. `docs/BLOCKED_ACTIONS.md`;
6. `docs/sfjm/PROJECT_READ_MODEL.json`;
7. `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
8. `docs/sfjm/PROGRAM_TASK_GRAPH.json` when WBS/task detail is needed.

## State precedence

Current lifecycle state/progress comes from `CURRENT_PROGRAM_STATE.json`. Structural hierarchy/task IDs/planning hours come from `PROGRAM_TASK_GRAPH.json`. `PROJECT_READ_MODEL.json` is the consumer summary tying both together.

A later canonical current-state overlay can supersede lifecycle fields captured in an older structural graph, but cannot authorize a consumer to invent or modify hierarchy/hours.

## Authority boundary

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
SFJM WORKSPACE = READ-ONLY DERIVED REPRESENTATION
```

Workspace must not invent tasks, hours, status, authorization or evidence. A snapshot whose observed SHA differs from live MoreNumTegra main is stale.
