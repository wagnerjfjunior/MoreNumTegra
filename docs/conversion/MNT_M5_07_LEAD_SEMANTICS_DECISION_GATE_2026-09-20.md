# MNT-M5-07 — Lead Semantics and Lead-Validity Contract — Product Decision Gate

Status: `ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION`

Date: `2026-09-20`

## 1. Authority and scope

Product Authority granted continuing authorization to advance the MoreNumTegra planned task sequence, including governed Ready/merge lifecycle, stopping only at material product/architecture decisions.

MNT-M5-07 has reached one material Measurement-semantic decision.

No runtime, GTM, GA4, Form 46, CRM or DNS mutation is made by this packet.

## 2. Exact state analyzed

```text
CANONICAL_MAIN = af9a58cb49200b5e4a226ab5ede8a7df6b532f03
EFFECTIVE_PRODUCTION_RUNTIME_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

M5-06 is accepted and must be preserved:

- contextual CTA intent is carried into the controlled Form 46 select;
- no automatic form submission;
- Form 46 remains the V1 provider;
- CAPIITOLO official branding and Capitolo same-page Search variant are unrelated to this Measurement decision.

## 3. Binding lead-validity baseline

Existing canonical contracts already determine:

```text
mnt_lead_success = sole PRIMARY conversion
verified Form 46 accepted outcome = lead
CTA click = not lead
WhatsApp click/open = not lead
form start = not lead
form submit attempt = not lead
request/network start = not lead
direct /obrigado/ = not lead
```

The Vercel V1 acceptance signal remains:

```text
project-owned Form 46 POST
-> HTTP-successful provider response
-> fresh non-PII session marker
-> shared /obrigado/
-> marker consumed once
-> mnt_lead_success
```

M5-07 does not reopen provider-authenticated/server-side proof.

## 4. Existing canonical mnt_intent vocabulary

MNT-M2-03 defines only:

```text
request_conditions
project_interest
request_project_conditions
negotiate_scenario
schedule_visit
whatsapp_contact
```

MNT-M2-04 classifies these as:

```text
SECONDARY:
  request_conditions
  request_project_conditions
  negotiate_scenario
  schedule_visit
  whatsapp_contact

NONE:
  project_interest
```

There is no canonical `payment_simulation` intent type today.

## 5. Runtime semantic mismatches found

### F01 — exact-project conditions

CAPIITOLO currently reaches shared `measurement-core.js`. Its hero `Receber condições` has exact project context but is currently emitted as:

`request_conditions`

Canonical semantics already support a more precise existing value:

`request_project_conditions`

No product decision is required to align this.

### F02 — exact-project visit CTA

CAPIITOLO and Ária have form-bound `Agendar visita` journeys.

The canonical enum already contains:

`schedule_visit`

The common envelope already supports:

`contact_channel = form | whatsapp`

Therefore a form-based visit request can be represented as:

```text
intent_type = schedule_visit
contact_channel = form
```

This is an implementation alignment, not a new intent type.

### F03 — Elo Duo / Ária project measurement is over-collapsed

Their inline project scripts currently map every `[data-project-intent]` to:

```text
intent_type = request_project_conditions
placement = commercial_card
```

That is correct only for condition-request actions. It is not correct for Ária visit/payment CTA semantics and loses placement distinctions such as floating actions.

### F04 — Home negotiation

Home `Quero negociar meu cenário` is already correctly represented as:

`negotiate_scenario`

No change is required to this semantic.

### F05 — Form option vocabulary != Measurement taxonomy

The Form 46 controlled select now contains:

```text
Condições e disponibilidade
Agendar visita
Simular forma de pagamento
Falar com especialista
Negociar meu cenário
```

The CRM/form vocabulary does not need a one-to-one Measurement event vocabulary.

In particular, manually changing the select must not automatically generate a second `mnt_intent` occurrence merely because M5-06 preselection exists. This prevents duplicate intent inflation.

## 6. Material decision — payment simulation

Ária exposes an explicit CTA:

`Simular possibilidades de pagamento`

M5-06 correctly preselects:

`Simular forma de pagamento`

But the canonical `mnt_intent` taxonomy has no exact semantic for that action.

Two viable choices remain.

### Option A — Reuse negotiate_scenario

Map payment simulation to:

```text
intent_type = negotiate_scenario
contact_channel = form
```

Rationale:

- payment composition (entry, installments, financing, flow) is already part of the site's negotiation model;
- MNT-M2-03 already defines `negotiate_scenario`;
- MNT-M2-04 already classifies it as SECONDARY;
- no taxonomy expansion;
- no new downstream GTM/GA4 semantic contract is required;
- Form 46/CRM still retains the more precise user choice `Simular forma de pagamento`.

Tradeoff:

- Measurement cannot distinguish payment-simulation intent from other negotiation-scenario intent using `intent_type` alone.

### Option B — Add payment_simulation to canonical taxonomy

Add:

`payment_simulation`

as a new `mnt_intent.intent_type`, with:

```text
contact_channel = form
conversion_role = SECONDARY
```

Required consequences:

- revise MNT-M2-03 canonical taxonomy;
- revise MNT-M2-04 primary/secondary classification;
- update source/runtime allowlists and validation;
- inspect GTM/GA4 mapping/reporting assumptions before claiming parity;
- extend M5-07 QA and later M5-09 conversion QA.

Benefit:

- direct analytics distinction between payment simulation and general negotiation.

Tradeoff:

- broader semantic surface/cardinality and more governance work for one current CTA.

## 7. Technical recommendation

Recommend **Option A — reuse `negotiate_scenario`**.

This preserves a compact canonical taxonomy while the CRM retains the exact commercial request in `texto-livre`.

The user-facing distinction remains fully preserved:

```text
CTA = Simular possibilidades de pagamento
Form 46 = Simular forma de pagamento
CRM = exact controlled form intent
Measurement = negotiate_scenario
```

This avoids making ordinary analytics taxonomy mirror every CRM option.

This recommendation is not an authorization decision.

## 8. Semantic alignment that may proceed after the decision

Once the payment-simulation decision is resolved, M5-07 can canonicalize and, where required, implement the bounded alignment:

```text
portfolio conditions -> request_conditions
exact-project conditions -> request_project_conditions
Home negotiate -> negotiate_scenario
exact-project visit via form -> schedule_visit / form
WhatsApp general contact -> whatsapp_contact / whatsapp
WhatsApp visit -> schedule_visit / whatsapp
project card selection -> project_interest / form / NONE conversion role
payment simulation -> PRODUCT AUTHORITY DECISION
```

No CTA click becomes a lead.

## 9. Explicit boundaries

M5-07 must not silently:

- promote WhatsApp to PRIMARY;
- emit lead success from CTA/form-start/submit-attempt;
- change Form 46 endpoint/provider;
- send name/e-mail/phone/texto-livre to Measurement;
- add enhanced conversions;
- change GTM/GA4 destinations without gate;
- change provider/CRM ownership;
- introduce backend/server-side proof;
- change conversion value/counting;
- execute M5-10 performance remediation.

## 10. Program state

M5-07 is not complete.

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 848
REMAINING_FORECAST_HOURS = 392
ACCEPTED_PERCENT = 68.39

MNT-M5-07 = ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION
MNT-M5-08 = BLOCKED_BY_M5_07_DECISION_AND_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```
