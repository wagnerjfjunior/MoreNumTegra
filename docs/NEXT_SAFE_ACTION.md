# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-12`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-09_COMPLETE / WAITING_MNT-M2-10_AUTHORIZATION`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-03 COMPLETE
MNT-M2-04 COMPLETE
MNT-M2-05 COMPLETE
MNT-M2-06 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 COMPLETE
MNT-M2-10 PLANNED / NOT_YET_AUTHORIZED
```

MNT-M2-09 evidence:

`docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`

Accepted runtime baseline:

```text
GTM = GTM-PGCR4R47
published GTM version = 7
GA4 property_id = 553742649
GA4 stream_id = 15759638334
GA4 measurement_id = G-57M2XR0CY2
source primary = mnt_lead_success
GA4 primary mapping = generate_lead
GA4 generate_lead = Key event / Evento principal
```

The accepted live journey proved exactly one `mnt_form_start`, one `mnt_form_submit_attempt`, one `mnt_lead_success` and one GA4 `generate_lead` for the tested successful Form 46 journey.

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre autorizar `MNT-M2-10 — Execute end-to-end Measurement QA`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
NEXT_TASK = MNT-M2-10
MNT-M2-10 = PLANNED / EXECUTION_NOT_AUTHORIZED
```

A autorização de MNT-M2-10 deve ser interpretada como QA/evidence bounded ao contrato de Measurement. Ela não autoriza automaticamente novas integrações ou mutações fora do necessário para observar/provar o estado existente.

## 3. Escopo esperado de MNT-M2-10

Quando autorizada, MNT-M2-10 deve provar, no mínimo:

- zero project business/page Measurement no alias `www.moretegra.com.br`;
- exatamente um caminho de project page-view por canonical document load;
- uma source event por ocorrência semântica;
- ausência de direct `gtag()`/segundo caminho GA4 fora de `GTM-PGCR4R47`;
- ausência de direct `fbq()`/segundo caminho Meta project-owned, se Meta não estiver implementado;
- ausência de visitor PII e raw free-form catalogue search text nos payloads MNT/GA4;
- nenhum `mnt_lead_success` sem sucesso verificável do Form 46;
- refresh/direct `/obrigado` não fabrica lead;
- `mnt_form_start` e `mnt_form_submit_attempt` permanecem não-conversões;
- nenhum property/listing price vira conversion value;
- consent default/update e comportamento denied/granted permanecem coerentes com o contrato aceito;
- `generate_lead` ocorre uma vez por lead válido no caminho testado;
- event/parameter naming permanece aderente à taxonomy v1.

MNT-M2-10 pode registrar residuals sem inventar PASS. Um requisito não provado deve permanecer `NOT_PROVEN`/OPEN.

## 4. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 376h
remaining forecast = 864h
program progress = 30.32%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-03 = 16h
MNT-M2-04 = 8h
MNT-M2-05 = 8h
MNT-M2-06 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
MNT-M2-09 = 24h
```

MNT-M2 accepted scope-equivalent = `120h` of `144h`.

## 5. Mutation boundary

MNT-M2-09 completion does **not** authorize:

- further GTM publication/configuration beyond a separately authorized corrective need;
- GA4 property/stream replacement or duplicate asset creation;
- Meta Dataset/Pixel/browser source implementation;
- Meta CAPI, partner/server gateway or dual browser/server transport;
- Google Ads linking or conversion tags;
- Green Pixel/integration additions;
- FECH.AI/n8n/Make/webhook/backend;
- campaign/spend;
- DNS/Search Console mutation;
- automatic Vercel deployment;
- changing Vercel `MANUAL_GATE_DRIVEN` policy.

Vercel Production homologation remains a separate manual terminal-driven action. Do not claim it updated until independently observed.

## 6. SFJM Workspace boundary

Consumers must resolve live MoreNumTegra `main` before refreshing state.

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

Workspace refresh does not authorize MNT-M2-10 or any external mutation.

## 7. Condições de parada

Stop if any action attempts to:

- infer MNT-M2-10 authorization from task sequence;
- change GTM/GA4/Meta/Ads only to make a QA check pass without a separately approved remediation gate;
- forward Green `gtm.formSubmit` with PII into GA4;
- add a redundant `form_submit` conversion on top of the accepted `generate_lead` mapping;
- mark `mnt_form_start` or `mnt_form_submit_attempt` as conversions;
- add monetary conversion value by inference;
- enable user-provided data/enhanced conversions/advanced matching/hashed PII;
- infer Meta asset ownership from Lead Ads/Green CRM/Facebook Page relationships;
- claim Vercel homologation is current without manual deployment evidence.

`MNT-M2-09 COMPLETE != MNT-M2-10 AUTHORIZED != MNT-M2-10 VALIDATED != MNT-M2 COMPLETE`.
