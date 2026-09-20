# MNT-M5-06 — CTA/Form Journey Optimization — Product Decision Gate

Status: `ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION`

Date: `2026-09-20`

## 1. Authority and stop condition

Product Authority granted continuing authorization to proceed through planned MoreNumTegra tasks and governed PR Ready/merge lifecycle, stopping only when a material product/architecture decision is required.

MNT-M5-06 reached that stop condition.

No runtime mutation is made by this decision packet.

## 2. Exact state analyzed

```text
CANONICAL_MAIN = d3728806d9eae450320831388c76d52a4c5c2c07
EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

M5-05 conversion architecture is canonical and remains binding:

- accepted Form 46 outcome / `mnt_lead_success` = sole primary conversion;
- WhatsApp/governed contact intents = secondary;
- project-owned Vercel Form 46 client;
- one shared `/obrigado/`;
- no intermediary backend required for V1;
- no visitor PII in ordinary Measurement.

## 3. Existing form intent vocabulary

Home, CAPIITOLO, Elo Duo and Ária expose the same controlled select choices:

```text
Condições e disponibilidade
Agendar visita
Simular forma de pagamento
Falar com especialista
```

The form currently defaults to:

`Condições e disponibilidade`

## 4. Journey findings

### F01 — Contextual CTA intent is not carried into Form 46

The current shared Vercel form runtime preserves project selection but does not map form-bound CTA intent into `select[name="texto-livre"]`.

It listens for:

- `[data-interest]` to preserve the selected project;
- `[data-change-interest]` to clear project selection.

It does not currently implement a CTA -> form-intent synchronization contract.

### F02 — Ária exposes explicit contextual CTA/form mismatches

Current form-bound Ária CTAs include:

```text
Receber condições
Consultar unidades
Agendar uma visita
Simular possibilidades de pagamento
Receber condições (floating)
```

Yet all arrive at the form with the default selected choice unless the visitor manually changes it.

Material mismatches:

```text
Agendar uma visita
  -> form still defaults to Condições e disponibilidade

Simular possibilidades de pagamento
  -> form still defaults to Condições e disponibilidade
```

### F03 — Home negotiation CTA has no exact form-option equivalent

Home CTA:

`Quero negociar meu cenário`

Canonical Measurement taxonomy already has:

`intent_type = negotiate_scenario`

But the current Form 46 select has no `Negociar meu cenário` option.

Potential existing approximations are:

- `Simular forma de pagamento`;
- `Falar com especialista`.

Choosing either changes the business meaning of the user's explicit CTA.

### F04 — CAPIITOLO hero CTA intentionally mixes two business intents

Current hero CTA:

`Receber condições e agendar visita`

Those correspond to two distinct existing form options:

- `Condições e disponibilidade`;
- `Agendar visita`.

A single deterministic preselection cannot faithfully represent both without choosing one, splitting the action, or retaining a generic/default form state.

### F05 — Exact-project Measurement currently collapses contextual CTA distinctions

Elo Duo and Ária project-page scripts currently classify every `[data-project-intent]` click as:

```text
mnt_intent
intent_type = request_project_conditions
placement = commercial_card
```

Therefore Ária's `schedule-visit` and `payment-simulation` UI semantics are not represented distinctly in project-page Measurement.

This is a Measurement-semantic consequence and must not be silently changed inside M5-06. M5-07 is the planned lead-semantics task.

## 5. Non-decision findings already determined by canonical contracts

These do not require Product Authority selection:

- preserve Form 46 as the primary business conversion path;
- preserve WhatsApp as an available secondary contact path;
- preserve one shared Form 46 contract;
- preserve the current form field set unless separately decided;
- preserve project context into Form 46;
- avoid modal/stepper/backend complexity without proven need;
- contextual CTA copy should not silently promise a journey the form immediately contradicts;
- CTA -> form synchronization, if adopted, must use controlled allowlisted values and must not copy arbitrary visible text.

## 6. Material decision

The unresolved product question is:

**How should contextual CTA intent be carried into the Form 46 journey?**

### Option A — Single-purpose normalization

Normalize all form-bound CTAs to the single primary request:

`Receber condições e disponibilidade`

Effects:

- simplest journey;
- no intent preselection logic needed;
- contextual CTA copy such as `Agendar visita`, `Simular possibilidades de pagamento` and `Quero negociar meu cenário` must be removed/reworded when they point to the form;
- lowest semantic complexity;
- sacrifices explicit visitor intent before the form.

### Option B — Context-preserving form intent

Keep contextual CTAs and carry their intent into the existing Form 46 select.

Deterministic mappings that do not require new vocabulary:

```text
Receber condições / Consultar unidades / Negociar condições / floating conditions
  -> Condições e disponibilidade

Agendar visita
  -> Agendar visita

Simular possibilidades de pagamento
  -> Simular forma de pagamento
```

Two sub-decisions remain necessary:

1. Home `Quero negociar meu cenário`:
   - map to an existing approximate option; or
   - add a controlled `Negociar meu cenário` Form 46 choice.

2. CAPIITOLO `Receber condições e agendar visita`:
   - choose one intent;
   - split/reword the CTA into an unambiguous action; or
   - intentionally leave the form at a generic/default state.

Benefits:

- strongest continuity between clicked CTA and form;
- preserves the current contextual selling journey;
- requires a small governed mapping contract and later regression QA.

### Option C — Add an intermediate choice surface

A form-bound CTA first opens a modal/stepper allowing the visitor to choose conditions, visit, payment simulation or specialist.

Effects:

- explicit intent capture;
- adds a new interaction layer, focus/keyboard/mobile QA, state management and regression surface;
- creates complexity not required by current V1 architecture.

This option is a material UX expansion and is not justified by current evidence alone.

## 7. Technical recommendation

The engineering/UX recommendation is **Option B — Context-preserving form intent**, while keeping Form 46 visually/architecturally primary and WhatsApp secondary.

Reason:

- it corrects proven semantic discontinuities without adding a new interaction layer;
- it reuses the existing controlled Form 46 select;
- it preserves the current CTA strategy already present in Production;
- it is compatible with the existing M5-05 architecture;
- it can be implemented fail-closed with an allowlisted mapping;
- it does not require backend/provider changes.

For the two unresolved copy/semantic choices, recommended direction:

```text
Home "Quero negociar meu cenário"
  -> add controlled form choice "Negociar meu cenário"

CAPIITOLO hero
  -> change mixed CTA "Receber condições e agendar visita"
     to one unambiguous primary CTA "Receber condições"
     while retaining the separate "Agendar visita" CTA already present lower on the page
```

The first recommendation aligns with the already-canonical Measurement taxonomy `negotiate_scenario`. The second avoids encoding two business intents into one action.

These recommendations are **not authorized decisions until Product Authority chooses**.

## 8. Explicitly not decided here

This packet does not decide or authorize:

- new Measurement event names;
- project-page Measurement remapping;
- promoting WhatsApp to primary conversion;
- changing Form 46 provider or endpoint;
- removing required name/email/phone;
- adding backend/chat/CRM middleware;
- M5-10 performance remediation.

## 9. Program state

M5-06 remains active, not complete.

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 832
REMAINING_FORECAST_HOURS = 408
ACCEPTED_PERCENT = 67.10

MNT-M5-06 = ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION
MNT-M5-07 = BLOCKED_BY_M5_06_DECISION
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```
