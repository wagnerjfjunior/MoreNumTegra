# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Última fase concluída: `MNT-M1 / COMPLETE`
- Fase atual: `MNT-M2 / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Última task executada: `MNT-M2-01 / COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`
- Próxima task candidata: `MNT-M2-02 / PLANNED_NOT_AUTHORIZED`
- Base live no início da tarefa: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`

## 1. Estado operacional

MoreNumTegra V1 permanece operacional na Green Sales.

```text
HTML 01
-> Form 46 nativo
-> HTML 02
-> Footer
+ CSS global
+ JavaScript global
```

Preservado:

- Form 46 como captação V1;
- catálogo/jornadas principais documentados como funcionais;
- Vercel como homologação pública e Green como produção comercial;
- Search/indexability P0-B = `PASS_WITH_RESIDUAL_RISK`;
- GSC T0 registrado;
- Measurement project-owned ainda não configurado;
- Green/GDigital possui telemetria própria de page view observada;
- LGPD modal ativo, enforcement técnico não adjudicado nesta task.

## 2. Programa canônico / Workspace

Entrypoints publicados pelo projeto:

- `docs/sfjm/PROJECT_READ_MODEL.json` — resumo para consumer;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json` — estado/progresso vigente;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json` — hierarquia/planning hours;
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — WBS humana;
- `docs/sfjm/PROGRAM_TASK_GRAPH.md` — contrato de consumo.

Estado candidato após execução de MNT-M2-01:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  MNT-M2-01  COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
  MNT-M2-02  PLANNED_NOT_AUTHORIZED
MNT-M3  PLANNED
MNT-M4  PLANNED
MNT-M5  PLANNED
MNT-M6  PLANNED
MNT-M7  PLANNED
```

Progresso pretendido após merge da PR #41:

```text
forecast total = 1240h
accepted scope-equivalent = 264h
remaining forecast = 976h
program progress = 21.29%
```

Horas são planning/scope-equivalent, não timesheet real.

## 3. MNT-M2-01 — Tracking Runtime Inventory

Evidência:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

HAR fornecido pelo Product Authority:

`SHA-256 c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446`.

Conclusões suportadas:

```text
PROJECT_OWNED GTM = NOT_OBSERVED
PROJECT_OWNED GA4/gtag/dataLayer = NOT_OBSERVED
PROJECT_OWNED Meta Pixel/fbq = NOT_OBSERVED
GREEN/GDIGITAL POST /page/view = OBSERVED / PLATFORM_INJECTED
YOUTUBE EMBED TELEMETRY = OBSERVED / THIRD_PARTY_MEDIA
GTM RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
GA4 RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
META PIXEL RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
CLARITY/HOTJAR/DOUBLECLICK = NOT_OBSERVED IN CAPTURED SESSION
```

A captura também mostrou duas gravações Green `/page/view` na sequência `www` -> non-www, com `page_id=293` e `page_id=292`. Isso é carry-forward obrigatório como `DUPLICATE_MEASUREMENT_RISK` para MNT-M2-02, sem tratar automaticamente como defeito confirmado.

O player `youtube-nocookie.com` emitiu telemetria de playback/QoE/watchtime/log_event. Isso é `THIRD_PARTY_MEDIA`, não GA4/Ads.

## 4. Próxima ação segura

Concluir o lifecycle da PR #41 que registra MNT-M2-01.

Depois de aceitação canônica, a próxima task candidata é:

`MNT-M2-02 — Define transport architecture and duplicate-event prevention`.

Ela continua `PLANNED_NOT_AUTHORIZED` até autorização explícita da Product Authority.

## 5. RESF v1

Adoção seletiva consolidada pela PR #39.

Provider pin:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`.

Wave 1 inclui `RESF-TRACKING`, `RESF-LEAD`, `RESF-CRM` e `RESF-CONSENT`, além das dependências previamente adotadas.

## 6. SFJM Workspace consumption boundary

MoreNumTegra é autoridade para objetivo, WBS, tarefas, estados, horas publicadas, autorização, evidência e próxima ação.

SFJM Workspace pode consumir/renderizar, mas não pode criar ou alterar esses fatos. Sempre aplicar `CURRENT_PROGRAM_STATE.json` sobre o task graph estrutural e marcar snapshot stale quando o SHA observado divergir de `main` live.

## 7. Gates externos preservados

MNT-M2-01 concluída não autoriza GTM/GA4/Meta/CAPI, Green Pixel, consent runtime, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make ou segredo no cliente.

`MNT-M2-01 COMPLETE != MNT-M2-02 AUTHORIZED`.
