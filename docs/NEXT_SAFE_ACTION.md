# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado: `MNT-M1_RESF_ADOPTION_RECONCILIATION`

## 1. Estado de entrada

O V1 continua operacional em produção comercial Green e Search/indexability P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

O programa completo está definido em:

- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

A adoção RESF está definida em:

- `docs/frameworks/resf/ADOPTION.yaml`;
- `docs/frameworks/resf/ADOPTION_BASELINE.md`.

GSC T0:
`docs/evidence/search/GSC_BASELINE_2026-09-10.md`.

## 2. Única próxima ação segura

Concluir **MNT-M1 — RESF Adoption & Existing-State Reconciliation** como mudança documental/governança bounded.

Escopo atual:

1. validar consistência WBS <-> machine-readable task graph;
2. validar somatórios de horas e cálculo de progresso;
3. validar `ADOPTION.yaml` contra o schema canônico do RESF v1;
4. validar que o provider está pinado em SHA imutável;
5. validar que estados históricos não foram promovidos além da evidência;
6. validar GSC T0 e suas limitações;
7. executar revisão documental independente do exact head da PR;
8. adjudicar P0/P1 documentais;
9. somente depois seguir os gates separados de Ready e merge exigidos pela governança.

Nenhum runtime deve ser modificado por MNT-M1.

## 3. Condição de saída MNT-M1

MNT-M1 pode ser encerrado quando:

- manifesto de adoção estiver schema-valid;
- WBS e task graph forem semanticamente equivalentes;
- total = `1240h`;
- accepted scope-equivalent = `160h`;
- remaining forecast = `1080h`;
- pre-reconciliation progress = `12.90%`;
- provenance e effort class estiverem explícitos;
- nenhum P0/P1 documental permanecer aberto;
- lifecycle da PR tiver sido concluído sob autorizações apropriadas.

## 4. Próxima fase após MNT-M1

Somente após o fechamento canônico de MNT-M1, a próxima fase planejada é:

`MNT-M2 — Measurement Foundation & Consent`.

A primeira parte de MNT-M2 permanece `READ_ONLY / DESIGN`:

- inventário de tracking live;
- arquitetura de transporte sem duplicidade;
- event taxonomy;
- primary/secondary conversions;
- ownership de GTM/GA4/Meta;
- consent model/LGPD;
- QA denied/granted.

`MNT-M2 PLANNED != TRACKING IMPLEMENTATION AUTHORIZED`.

## 5. Gates externos preservados

Exigem autorização específica antes de mutação:

- GTM;
- GA4;
- Meta Pixel/Dataset/CAPI;
- configuração Green de Pixel;
- consentimento runtime;
- Google Ads;
- campanha/spend;
- DNS;
- Search Console mutation;
- Vercel Production;
- Green commercial production.

## 6. Search residual risk preservado

Sem reiniciar P0-B:

- canonical client-side;
- ausência de sitemap;
- `www` sem HTTP 301/308 comprovado;
- warning `web-share` histórico.

## 7. Condições de parada

Parar diante de:

- divergência entre WBS e task graph;
- manifesto RESF inválido;
- provider ref mutável;
- horas sem provenance/semântica;
- status não sustentado por evidência;
- nova mutação de runtime implícita;
- necessidade de autorização não concedida;
- dado externo não verificado.

## 8. Sequência do programa

```text
MNT-M0 COMPLETE
-> MNT-M1 ACTIVE / CURRENT
-> MNT-M2 Measurement Foundation & Consent
-> MNT-M3 Intelligence / Product Truth / Search Contract
-> MNT-M4 IA / Content / Schema / GEO-AEO / Linking
-> MNT-M5 UX / Performance / Conversion / Lead / CRM
-> MNT-M6 Attribution / Paid Media Readiness
-> MNT-M7 QA / Release / Observability / Learning Loop
```
