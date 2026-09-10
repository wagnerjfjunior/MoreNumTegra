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
- Fase atual autorizada: `MNT-M2 / ACTIVE_READ_ONLY_DESIGN`
- Tarefa atual: `MNT-M2-01 / ACTIVE_PARTIAL_EVIDENCE`
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
- Measurement MoreNumTegra ainda não configurado/provado;
- LGPD modal ativo, enforcement técnico não provado.

## 2. Programa canônico / Workspace

Entrypoints publicados pelo projeto:

- `docs/sfjm/PROJECT_READ_MODEL.json` — resumo para consumer;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json` — estado/progresso vigente;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json` — hierarquia/planning hours;
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — WBS humana;
- `docs/sfjm/PROGRAM_TASK_GRAPH.md` — contrato de consumo.

Estado atual da execução bounded:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_READ_ONLY_DESIGN
  MNT-M2-01  ACTIVE_PARTIAL_EVIDENCE
MNT-M3  PLANNED
MNT-M4  PLANNED
MNT-M5  PLANNED
MNT-M6  PLANNED
MNT-M7  PLANNED
```

Planejamento enquanto MNT-M2-01 não estiver aceita:

```text
forecast total = 1240h
accepted scope-equivalent = 256h
remaining forecast = 984h
program progress = 20.65%
```

Horas são planning/scope-equivalent, não timesheet real.

## 3. MNT-M2-01 — Tracking Runtime Inventory

Evidência atual:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

Levantamento já concluído no lado project-owned:

```text
GTM bootstrap = NOT_OBSERVED
GA4 / gtag / dataLayer = NOT_OBSERVED
Meta fbq / connect.facebook.net = NOT_OBSERVED
sendBeacon measurement = NOT_OBSERVED
Vercel preview project-owned measurement = NOT_OBSERVED
Green native Form 46 lead capture = PRESENT
Search Console = PRESENT AS SEARCH OBSERVABILITY
```

Não comprovado ainda:

```text
Green-builder/platform-injected tracking
consent enforcement denied/granted
```

A ausência de código no GitHub não pode ser convertida em ausência no runtime Green.

## 4. Próxima ação segura

Completar MNT-M2-01 com `READ_ONLY COMMERCIAL RUNTIME NETWORK/DOM CAPTURE`:

1. abrir `https://moretegra.com.br/` sem alterar configuração;
2. inspecionar scripts/requests de measurement;
3. não enviar Form 46/PII para esta etapa;
4. distinguir `PROJECT_OWNED` de `PLATFORM_INJECTED`;
5. registrar GTM/GA4/Meta/Ads/Green measurement como observado ou `NOT_PROVEN`;
6. fechar MNT-M2-01 somente após a evidência suficiente.

MNT-M2-02 ainda não deve ser tratado como ativo.

## 5. RESF v1

Adoção seletiva consolidada pela PR #39.

Provider pin:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`.

Wave 1 inclui `RESF-TRACKING`, `RESF-LEAD`, `RESF-CRM` e `RESF-CONSENT`, além das dependências previamente adotadas.

## 6. SFJM Workspace consumption boundary

MoreNumTegra é autoridade para objetivo, WBS, tarefas, estados, horas publicadas, autorização, evidência e próxima ação.

SFJM Workspace pode consumir/renderizar, mas não pode criar ou alterar esses fatos. Sempre aplicar `CURRENT_PROGRAM_STATE.json` sobre o task graph estrutural e marcar snapshot stale quando o SHA observado divergir de `main` live.

## 7. Gates externos preservados

A autorização da tarefa atual não autoriza GTM/GA4/Meta/CAPI, Green Pixel, consent runtime, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make ou segredo no cliente.

`READ_ONLY INVENTORY != IMPLEMENTATION AUTHORITY`.
