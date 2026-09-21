# MNT-M5-08 — Green / Form 46 CRM Handoff Contract

Date: `2026-09-21`

Status: `COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION`

## 1. Scope

MNT-M5-08 defines the canonical handoff boundary between the MoreNumTegra Vercel frontend and Green Sales/GDigital Form 46.

This task does not replace Green, add an intermediary backend, change seller routing, change tags, or alter Measurement.

## 2. Provider contract

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
required provider fields = nome, email, telefone
optional provider field = texto-livre
```

The current MoreNumTegra runtime always requires the controlled intent selector before submit, so current product behavior sends a controlled `texto-livre` value on valid submissions even though the provider contract itself classifies that field as optional.

## 3. Frontend-owned responsibilities

The MoreNumTegra frontend owns:

- form presentation and accessibility;
- country/DDI selection;
- phone normalization to E.164;
- validation of nome/e-mail/telefone;
- required controlled commercial intent selection;
- contextual project selection;
- composition of controlled CRM context;
- loading state;
- duplicate-click prevention;
- network timeout/error feedback;
- POST through native `fetch` + `FormData`;
- same-host `/obrigado/` redirect after HTTP-successful provider response.

## 4. Exact outbound payload

Current runtime appends only:

```text
tenant_id
form_id
title
nome
email
telefone
texto-livre
```

No seller/vendor identifier, Green tag, CRM note, internal pipeline/status or automation identifier is sent by the frontend.

## 5. CRM context semantics

Current product-level CRM context is:

```text
texto-livre = <controlled project context> | <controlled intent>
```

Examples:

```text
ODE Perdizes | Condições e disponibilidade
Ária Higienópolis | Simular forma de pagamento
CAPIITOLO by Piero Lissoni | Agendar visita
Página principal | Nenhum empreendimento selecionado | Falar com especialista
```

The intent vocabulary remains controlled by the Form 46 select:

- Condições e disponibilidade
- Agendar visita
- Simular forma de pagamento
- Falar com especialista
- Negociar meu cenário

This CRM vocabulary is intentionally more precise than the compact Measurement taxonomy.

## 6. Production CRM evidence

Product Authority supplied a real Green Sales lead showing the accepted handoff result:

```text
origin = MoreEmUmTegra
title = MoreEmUmTegra
texto-livre = ODE Perdizes | Condições e disponibilidade...
tag observed = MORETEGRA
seller observed = Sabrina da Tegra
```

The observed tag and seller assignment are downstream Green CRM enrichment.

They are **not** part of the current frontend POST contract and must not be hardcoded into browser code without a separate provider/routing decision.

## 7. Ownership boundary

### MoreNumTegra-owned

- commercial intent capture;
- project/offer context;
- PII validation and provider submission;
- controlled `texto-livre` composition;
- browser UX and error handling;
- lead-success browser gate after HTTP-successful provider response.

### Green-owned / provider downstream

- CRM record creation;
- origin rendering/internal attribution;
- tag application;
- seller assignment;
- follow-up fields;
- CRM notes/status/history;
- provider response query parameters.

No claim is made that tag or seller assignment is guaranteed by the Form 46 API contract merely because it was observed on a real lead.

## 8. Privacy boundary

PII may be sent only to the authorized Green Form 46 provider as required for lead capture.

The frontend must not copy visitor:

- name;
- e-mail;
- telephone;
- raw/free-form content

into Measurement.

Controlled project/offer business metadata may be sent to Measurement under the accepted M5-07 contract.

## 9. Provider response semantics

An HTTP-successful Form 46 response is the current browser acceptance signal.

Green may return `query_params` such as `l_` and `p_id`; they are sanitized for same-host thank-you navigation and are not treated as project identity, lead identity or proof of seller assignment.

No backend-authenticated provider receipt is claimed in V1.

## 10. Failure and duplicate behavior

- one in-flight submit at a time;
- submit button disabled while sending;
- network timeout/error shown to the user;
- non-2xx provider response is failure;
- pending lead marker is written only after HTTP-successful provider response;
- direct/refresh thank-you does not manufacture another lead.

Provider-side deduplication is not claimed.

## 11. Architectural decision

Do not add seller/tag/routing parameters to the public frontend merely to mirror current Green workspace configuration.

If future requirements need deterministic seller routing, CRM pipeline ownership, server-side verification, webhook/CAPI or FECH.AI synchronization, that requires a separate provider/backend/privacy architecture gate.

## 12. Acceptance

M5-08 is accepted because:

1. provider and payload contract are explicit;
2. source runtime matches the contract;
3. real Green CRM evidence proves project+intent context reaches the lead;
4. downstream seller/tag enrichment is correctly separated from frontend ownership;
5. no runtime mutation is required.

```text
MNT-M5-08 = COMPLETE / CRM_HANDOFF_CONTRACT_CANONICALIZED / NO_RUNTIME_MUTATION
```
