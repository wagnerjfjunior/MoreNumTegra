# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-13`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado de entrada: `MNT-M2_COMPLETE / WAITING_MNT-M3-01_AUTHORIZATION`
- Merge de fechamento Measurement: PR `#54` / squash merge `5d2db073a4b345ae4e0067b675cab1cfb4a068ed`

## 1. Estado de entrada

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 COMPLETE
  MNT-M2-01 COMPLETE
  MNT-M2-02 COMPLETE
  MNT-M2-03 COMPLETE
  MNT-M2-04 COMPLETE
  MNT-M2-05 COMPLETE
  MNT-M2-06 COMPLETE
  MNT-M2-07 COMPLETE
  MNT-M2-08 COMPLETE
  MNT-M2-09 COMPLETE
  MNT-M2-10 COMPLETE / ACCEPTED_WITH_V1_RESIDUAL
MNT-M3 PLANNED
```

Canonical MNT-M2-10 evidence:

- `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`

Accepted V1 residual: the page-294 lead gate is client-side and can still be satisfied by a fresh pending marker plus manual entry of the complete accepted redirect shape. This is explicitly not provider/server authentication and is accepted as non-blocking for MNT-M2 closure.

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre autorizar `MNT-M3-01 — Market and Search demand research`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = NONE
CURRENT_ACTIVE_TASK = NONE
NEXT_PHASE = MNT-M3
NEXT_TASK = MNT-M3-01
MNT-M3-01 = PLANNED / EXECUTION_NOT_AUTHORIZED
```

A sequência do WBS não constitui autorização.

## 3. Escopo esperado de MNT-M3-01

Quando autorizada, MNT-M3-01 deve ser pesquisa/evidência first e produzir uma visão governada de demanda de Search aplicável ao MoreNumTegra, preservando:

- fatos de produto verificados;
- separação entre dado observado, inferência e recomendação;
- nenhuma invenção de volume, posição, concorrente, intenção ou dado comercial;
- nenhuma mutação Search Console, Ads, GTM/GA4, Green, DNS ou Vercel por sequência automática;
- uso de fontes live quando a evidência exigir atualidade;
- registro de proveniência para datasets/consultas utilizados.

MNT-M3-01 não autoriza automaticamente MNT-M3-02..07.

## 4. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 400h
remaining forecast = 840h
program progress = 32.26%
MNT-M2 accepted = 144h / 144h
```

Effort semantics permanecem `PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET`.

## 5. Mutation boundary preservado

O fechamento de MNT-M2 não autoriza automaticamente:

- nova publicação/configuração GTM;
- substituição/criação duplicada de GA4 property/stream;
- Meta Dataset/Pixel/CAPI;
- Google Ads linking/conversion tags/campaign/spend;
- user-provided data, enhanced conversions, advanced matching ou hashed PII;
- FECH.AI/n8n/Make/webhook/backend;
- mudança DNS/Search Console;
- mudança estrutural na Green;
- deploy automático Vercel ou mudança de `MANUAL_GATE_DRIVEN`;
- inferir preço de imóvel como conversion value;
- encaminhar Green `gtm.formSubmit` como evento de negócio.

Vercel Production homologation continua uma ação manual separada e não deve ser declarada atualizada sem evidência.

## 6. SFJM Workspace boundary

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

Consumidores devem resolver `main` live antes de atualizar snapshots.

## 7. Condições de parada

Stop se qualquer ação tentar:

- inferir autorização de MNT-M3-01 pela sequência;
- inventar dado de mercado/Search;
- transformar recomendação de Search em implementação sem gate;
- alterar plataformas externas para forçar um resultado de pesquisa;
- reabrir Measurement M2 sem novo finding/gate explícito;
- tratar o residual client-side de lead como provider-authenticated success.

`MNT-M2 COMPLETE != MNT-M3-01 AUTHORIZED != MNT-M3 COMPLETE`.
