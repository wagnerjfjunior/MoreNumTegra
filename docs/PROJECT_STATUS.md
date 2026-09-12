# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-12`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-09 implementation merge: PR #50 / `6eaacaca9af2c22243d45f20a24e04577ac58ce2`
- MNT-M2-09 runtime hotfix merge: PR #52 / `70f2b77e93225b65a1972c12875c58bd7198be1d`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 — ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task: `MNT-M2-10 — PLANNED / EXECUTION_NOT_AUTHORIZED`
- Saúde operacional do V1: `verde`

## 1. Produção atual

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- Vercel deployment mode: `MANUAL_GATE_DRIVEN` conforme ADR-002
- Form 46 nativo permanece autoritativo para captação
- Green page 292 usa o artefato consolidado `src-greenn/moretegra.js`
- Green page 294 usa `src-greenn/thank-you/obrigado.js`
- Vercel Production ainda requer atualização manual via terminal; não declarar alinhamento até evidência específica

Preservar:

```text
LIVE V1 OPERATIONAL != MNT-RESF PROGRAM COMPLETE
PROGRAM PROGRESS != V1 PRODUCT READINESS
IMPLEMENTED != END_TO_END_VALIDATED
MNT-M2-09 COMPLETE != MNT-M2-10 COMPLETE
GREEN PRODUCTION != VERCEL HOMOLOGATION
```

## 2. Programa MNT-RESF

Estado canônico desta revisão:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  MNT-M2-01  COMPLETE
  MNT-M2-02  COMPLETE
  MNT-M2-03  COMPLETE
  MNT-M2-04  COMPLETE
  MNT-M2-05  COMPLETE
  MNT-M2-06  COMPLETE
  MNT-M2-07  COMPLETE
  MNT-M2-08  COMPLETE
  MNT-M2-09  COMPLETE
  MNT-M2-10  PLANNED / NEXT / EXECUTION_NOT_AUTHORIZED
MNT-M3..MNT-M7  PLANNED
```

Planning forecast:

```text
forecast total                = 1240h
accepted scope-equivalent     = 376h
remaining forecast            = 864h
program progress              = 30.32%
```

Accepted M2 scope-equivalent = `120h`:

- M2-01 `8h`;
- M2-02 `16h`;
- M2-03 `16h`;
- M2-04 `8h`;
- M2-05 `8h`;
- M2-06 `8h`;
- M2-07 `16h`;
- M2-08 `16h`;
- M2-09 `24h`.

M2-10 remains `24h` planned and contributes `0h accepted` until complete.

## 3. Accepted Measurement foundation

### Historical / design evidence

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`

### MNT-M2-09 runtime implementation

Evidence:

`docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`

Accepted Google runtime:

```text
GTM container = GTM-PGCR4R47
GTM current accepted publication = Version 7
GA4 property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
Enhanced Measurement = OFF
```

The earlier `NOT_PROVEN` GA4 identifiers from M2-05 are resolved by M2-09 evidence. This does not retroactively change the historical state of the M2-05 design document.

## 4. Canonical event taxonomy / conversion semantics

Canonical source events remain:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Project conversion classification remains:

```text
PRIMARY
  mnt_lead_success

SECONDARY
  mnt_intent:request_conditions
  mnt_intent:request_project_conditions
  mnt_intent:negotiate_scenario
  mnt_intent:schedule_visit
  mnt_intent:whatsapp_contact

NONE
  mnt_page_view
  mnt_section_click
  mnt_catalog_filter
  mnt_catalog_search
  mnt_intent:project_interest
  mnt_form_start
  mnt_form_submit_attempt
```

GA4 mapping implemented under M2-09:

```text
mnt_lead_success -> generate_lead
```

`generate_lead` is configured as GA4 `Evento principal` / Key event.

No monetary lead value is defined. No property/listing price is a conversion value.

## 5. Form 46 runtime proof

Accepted Green journey:

```text
mnt_form_start = 1
mnt_form_submit_attempt = 1
Green native submit success
/obrigado
mnt_lead_success = 1
generate_lead = 1
```

Tag Assistant showed the `generate_lead` GA4 tag with `execute_succeeded`. GA4 DebugView independently showed `mnt_form_start = 1`, `mnt_form_submit_attempt = 1`, `generate_lead = 1` for the accepted test.

`gtm.formSubmit` emitted by Green remains platform telemetry and is not used as a project GA4 business event because it can carry visitor form fields.

## 6. Privacy / consent

- visitor name/email/phone are excluded from project MNT/GA4 Measurement payloads;
- raw free-form catalogue search text remains excluded;
- no direct project `gtag()` or `fbq()` path is introduced;
- GTM remains the sole project-owned browser dispatcher;
- Consent Mode default-denied/update model remains accepted;
- accepted Version 7 test showed granted state after consent with `wasSetLate=false`.

Full denied/granted and duplicate-path end-to-end proof remains M2-10 scope.

## 7. Meta Measurement boundary

M2-06 governance remains valid, but Meta runtime identifiers and implementation remain unproven/not implemented by M2-09:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
META_CAPI = NOT_IMPLEMENTED / NOT_AUTHORIZED
```

Do not infer website Pixel/Dataset ownership from Facebook Page, Lead Ads, ad account or Green CRM relationships.

## 8. Measurement remaining work

```text
TRANSPORT / DEDUP ARCHITECTURE = COMPLETE
CANONICAL EVENT TAXONOMY = COMPLETE
PRIMARY / SECONDARY CONVERSIONS = COMPLETE
GTM / GA4 OWNERSHIP = COMPLETE DESIGN
GA4 RUNTIME IDENTIFIERS = PROVEN
TRACKING IMPLEMENTATION = COMPLETE / MNT-M2-09
END-TO-END MEASUREMENT QA = OPEN / MNT-M2-10 / NOT_YET_AUTHORIZED
META RUNTIME IMPLEMENTATION = NOT_IMPLEMENTED / SEPARATE GATE
```

## 9. Search / GSC residuals

P0-B remains `PASS_WITH_RESIDUAL_RISK`.

Residuals remain:

- canonical client-side;
- sitemap unavailable;
- `www` without proven HTTP 301/308 semantics;
- historical `web-share` warning.

GSC T0 remains historical baseline:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

## 10. SFJM Workspace boundary

Consumer precedence:

1. `docs/sfjm/PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `docs/NEXT_SAFE_ACTION.md` — execution authority.

Consumers must resolve the resulting exact live `main` SHA before refresh.

## 11. External gates

Further GTM/GA4 changes, MNT-M2-10 execution, Meta Dataset/Pixel/CAPI, Google Ads/spend, DNS, Search Console mutation, automatic Vercel changes, Green structural changes and FECH.AI/n8n/Make remain separately gated unless explicitly authorized.
