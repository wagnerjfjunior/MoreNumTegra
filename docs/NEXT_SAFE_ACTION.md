# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado: `MNT-M1_COMPLETE / MNT-M2_PLANNED_NOT_AUTHORIZED`
- MNT-M1 closure anchor: PR `#39` / merge `dba0de3bfefc7aec90c5a88588c54eae4317c61f`

## 1. Estado de entrada

O V1 continua operacional em produção comercial Green e Search/indexability P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

MNT-M1 foi concluído: adoção RESF v1 seletiva, reconciliação inicial, GSC T0, WBS completa e contratos machine-readable foram publicados e mergeados na PR #39.

Current-state overlay:
`docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Estrutura do programa:
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- `docs/sfjm/PROJECT_READ_MODEL.json`.

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre o início bounded de MNT-M2 — Measurement Foundation & Consent em modo READ_ONLY / DESIGN**.

Até essa autorização existir:

```text
MNT-M2 = PLANNED_NOT_AUTHORIZED
CURRENT_ACTIVE_PHASE = NONE
CURRENT_ACTIVE_TASK = NONE
NEXT_TASK_CANDIDATE = MNT-M2-01
```

O primeiro pacote de MNT-M2, quando autorizado, poderá cobrir somente desenho/levantamento read-only:

1. inventário do tracking já presente no runtime;
2. arquitetura de transporte e prevenção de duplicidade;
3. event taxonomy;
4. primary/secondary conversions;
5. ownership de GTM/GA4/Meta;
6. consent model/LGPD;
7. contrato de QA denied/granted.

## 3. Progresso programático após MNT-M1

```text
forecast total                = 1240h
MNT-M0 accepted               = 160h
MNT-M1 accepted               = 96h
accepted scope-equivalent     = 256h
remaining forecast            = 984h
program progress              = 20.65%
```

Essas horas são planejamento/scope-equivalent, não timesheet real.

## 4. Gates externos preservados

MNT-M1 encerrado **não** autoriza:

- GTM;
- GA4;
- Meta Pixel/Dataset/CAPI;
- configuração Green de Pixel;
- consentimento runtime;
- Google Ads;
- campanha/spend;
- DNS;
- mutação Search Console;
- Vercel Production;
- Green commercial production;
- FECH.AI/n8n/Make.

Cada mutação continua exigindo autorização específica depois do desenho/evidência aplicável.

## 5. Search residual risk preservado

Sem reiniciar P0-B:

- canonical client-side;
- ausência de sitemap;
- `www` sem HTTP 301/308 comprovado;
- warning `web-share` histórico.

## 6. Condições de parada

Parar diante de:

- tentativa de iniciar MNT-M2 sem autorização explícita;
- estado/hora inventado por consumer;
- divergência material entre current-state overlay, read model, handoff e status;
- mutação externa implícita;
- dado externo não verificado;
- tentativa de tratar planejamento como implementação, deploy ou validação.

## 7. Sequência do programa

```text
MNT-M0 COMPLETE
-> MNT-M1 COMPLETE
-> MNT-M2 PLANNED_NOT_AUTHORIZED / NEXT
-> MNT-M3 PLANNED
-> MNT-M4 PLANNED
-> MNT-M5 PLANNED
-> MNT-M6 PLANNED
-> MNT-M7 PLANNED
```

`NEXT != AUTHORIZED_TO_EXECUTE`.
