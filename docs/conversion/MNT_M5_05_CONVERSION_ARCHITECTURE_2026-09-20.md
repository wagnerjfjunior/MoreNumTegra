# MNT-M5-05 — Conversion Architecture

Status: `COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION`

Date: `2026-09-20`

## 1. Authority and scope

Product Authority granted continuing authorization on 2026-09-20 to proceed through the planned MoreNumTegra task sequence, including governed PR Ready/merge lifecycle, stopping only when a material decision is required.

MNT-M5-05 consolidates the **current accepted conversion architecture**. It does not redesign CTA copy/layout; that belongs to MNT-M5-06. It does not redefine lead validity; that belongs to MNT-M5-07. It does not mutate the Form 46/CRM contract; that belongs to MNT-M5-08.

Runtime mutation by this task: `NONE`.

Explicit hard blocks remain in force, including MNT-M5-10, new backend/intermediary, FECH.AI/n8n/Make, Meta/Ads, ungoverned Measurement mutation and DNS/canonical changes.

## 2. Exact current state

```text
CANONICAL_MAIN_AT_START = 0316ab7c482111006d2e909d5da0c4c8b5fa1983
EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

The newer canonical `main` state is documentation-only. The effective runtime remains the M5-04 accepted runtime.

## 3. Canonical business outcome

The V1 business outcome is one accepted Form 46 lead.

```text
PRIMARY_BUSINESS_CONVERSION = mnt_lead_success
FORM_PROVIDER = Green Sales / GDigital
TENANT_ID = 313
FORM_ID = 46
FORM_TITLE = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

Existing M2 conversion semantics remain binding:

- `mnt_lead_success` = PRIMARY;
- explicit commercial/contact `mnt_intent` variants = SECONDARY;
- `project_interest`, `mnt_form_start`, `mnt_form_submit_attempt`, discovery/search/filter events = NONE.

WhatsApp click/open is commercial intent. It is **not** a verified lead.

No property price is conversion value.

## 4. Current Production conversion topology

```text
Organic/direct/referral/other visit
        |
        v
Home or exact-project page
        |
        +--> discovery / filter / project comparison
        |
        +--> WhatsApp intent --------------------------> SECONDARY only
        |
        +--> CTA to Form 46
                 |
                 +--> optional selected-project context
                 |
                 +--> required business form fields
                 |      nome
                 |      email
                 |      telefone
                 |      selected intent
                 |
                 v
        project-owned Form 46 client
        src-greenn/preview/runtime.js
                 |
                 +--> validation
                 +--> E.164 phone normalization
                 +--> double-submit guard
                 +--> native fetch/FormData
                 |
                 v
        Green/GDigital Form 46 endpoint
                 |
              HTTP 2xx
                 |
                 +--> sessionStorage fresh pending marker
                 +--> /obrigado/ + allowlisted provider query only
                 |
                 v
        src-greenn/preview/thank-you-measurement.js
                 |
                 +--> consume fresh marker once
                 |
                 v
        mnt_lead_success
                 |
                 v
        GTM -> GA4 generate_lead
```

The Vercel production path is the current architecture after ADR-006. Historical Green-native page-292/page-294 source artifacts remain evidence of the earlier hosting topology and must not be used as the current Vercel runtime contract where superseded.

## 5. Form conversion boundary

The Vercel client owns:

- form presentation;
- country/DDI selection;
- telephone formatting and E.164 normalization;
- required-field validation;
- current selected-project context;
- controlled user intent;
- loading / `Enviando...`;
- duplicate-submit prevention;
- network timeout/error state;
- HTTP-success navigation to the shared thank-you route.

Green/GDigital owns:

- Form 46 provider endpoint;
- CRM persistence;
- downstream lead handling.

No project-owned backend intermediary is required by the accepted V1 architecture.

## 6. Lead context architecture

The form carries business context to Green through the governed `texto-livre` field.

Current context model:

```text
selected project exists:
  <empreendimento/oferta> | <intenção>

no selected project:
  Página principal | Nenhum empreendimento selecionado | <intenção>
```

Production evidence from PR #119 already proved selected-project context reaches Green Sales.

The architecture therefore preserves two distinct concepts:

1. **visitor PII/business submission data** -> Form 46 provider only;
2. **Measurement metadata** -> controlled project/offer identities and enums only.

Visitor name, e-mail, telephone and free-form form text must never be copied into ordinary `dataLayer`/GA4 events.

## 7. Conversion proof / thank-you contract

Canonical thank-you route:

`https://www.moretegra.com.br/obrigado/`

There is one shared thank-you route for the portfolio.

Current Vercel lead guard:

1. Form 46 POST returns HTTP success;
2. the client writes only a timestamp to `sessionStorage["mnt.lead.pending.v1"]`;
3. navigation goes to `/obrigado/`;
4. thank-you Measurement consumes the marker once;
5. marker age must be <=10 minutes;
6. absence/staleness/refresh after consumption cannot emit a second `mnt_lead_success`.

The marker contains no PII, project identity or visitor identifier.

The thank-you page remains `noindex,nofollow`.

## 8. Provider-query handling

The current Form 46 client may receive provider `query_params`. Only these keys are allowed to reach the thank-you URL:

```text
l_
p_id
```

Values must be numeric.

Provider query parameters are **not** the Vercel lead-validity mechanism. The Vercel primary guard is the fresh marker written only after an HTTP-successful project-owned Form 46 POST.

Provider query values are not copied to Measurement.

## 9. Conversion/Measurement separation

Canonical source semantics:

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

Important boundaries:

```text
CTA_CLICK != LEAD
WHATSAPP_CLICK != LEAD
FORM_START != LEAD
FORM_SUBMIT_ATTEMPT != LEAD
HTTP_REQUEST_START != LEAD
THANK_YOU_DIRECT_ACCESS != LEAD
mnt_lead_success = only project primary conversion
```

Destination mapping remains:

`mnt_lead_success -> GTM -> GA4 generate_lead`

No direct project-owned `gtag()` or second dispatcher is introduced by M5-05.

## 10. Consent boundary

The conversion **business submission** and Measurement consent are separate concerns.

Form 46 must continue to function as the business lead path under its accepted provider/privacy contract.

Measurement follows the accepted Consent Mode state:

- default denied;
- accept -> four governed signals granted;
- reject -> four governed signals denied;
- persisted first-party choice.

No second consent state machine is introduced.

## 11. CTA channel architecture

Canonical conversion channels:

### Form channel

Purpose:
- request conditions;
- project-specific conditions;
- negotiate scenario;
- other controlled intent that resolves into Form 46.

Role:
- intent until Form 46 success;
- primary only after `mnt_lead_success`.

### WhatsApp channel

Purpose:
- direct contact;
- schedule visit;
- request exact project location where governed.

Role:
- secondary intent only in current project conversion semantics.

M5-05 does not introduce a mechanism to prove a WhatsApp conversation/lead. Promoting WhatsApp to a primary conversion would be a new product/Measurement decision and is not implied here.

## 12. Page/context invariants

Home and exact-project pages may share the same Form 46 provider while preserving page/project context.

Required invariants:

- one Form 46 provider contract;
- one thank-you route;
- selected-project context is preserved when present;
- direct-form access remains valid without a selected project;
- CTA visible copy may vary without changing source-event names;
- exact-project pages identify their page/route in Measurement;
- no project-specific thank-you URL is required;
- no separate backend per page/project.

## 13. Fail-closed rules

If any part cannot prove the accepted condition:

- invalid form -> no POST;
- non-live Vercel host -> no real Form 46 POST;
- timeout/network/provider error -> no pending marker and no lead event;
- no fresh pending marker -> no `mnt_lead_success`;
- storage unavailable -> conversion Measurement may undercount rather than manufacture a lead;
- direct/refresh thank-you without fresh marker -> no lead;
- missing project selection -> use governed generic context rather than inventing one.

## 14. Architecture decisions inherited, not reopened

The following are already resolved by canonical project contracts and therefore do not require a new Product Authority choice in M5-05:

```text
D01 = Form 46 remains V1 lead provider
D02 = project-owned Vercel form client remains accepted
D03 = no intermediary backend required for V1
D04 = one shared /obrigado/ route
D05 = mnt_lead_success is the sole primary conversion
D06 = WhatsApp/commercial intents remain secondary
D07 = project_interest and submit_attempt are not conversions
D08 = no property price as lead conversion value
D09 = no visitor PII in ordinary Measurement
D10 = GTM remains the single project-owned browser dispatcher
```

## 15. M5-06 handoff boundary

M5-06 may optimize **journey design** only within this architecture.

It may evaluate:

- CTA hierarchy and placement;
- whether CTA copy matches intent;
- project-context continuity into the form;
- form-entry friction;
- mobile journey clarity;
- sequencing of Form vs WhatsApp choices.

It must not silently redefine:

- what counts as a lead;
- Form 46 provider;
- thank-you validity;
- Measurement taxonomy;
- CRM ownership;
- privacy/PII boundary.

Any proposed M5-06 change that requires one of those redefinitions is a **material decision** and must stop for Product Authority.

## 16. Completion

```text
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
```

No runtime mutation is required because the current Production architecture already implements the canonical V1 conversion path and the task is architectural consolidation.

## 17. Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 832
REMAINING_FORECAST_HOURS = 408
ACCEPTED_PERCENT = 67.10
MNT-M5 = ACTIVE
MNT-M5-06 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```
