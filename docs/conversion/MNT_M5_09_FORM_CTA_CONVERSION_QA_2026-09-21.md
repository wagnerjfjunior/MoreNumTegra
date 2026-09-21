# MNT-M5-09 — Form/CTA Conversion QA Acceptance

Date: `2026-09-21`

Status: `COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION`

## 1. Runtime under test

```text
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
PRODUCTION_DEPLOYMENT = dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs
PRODUCTION_STATE = READY
```

No runtime change occurred after the accepted M5-07 implementation.

## 2. Diagnostic-only QA

Diagnostic branch:

`diag/m5-09-form-cta-conversion-qa-20260921`

Exact diagnostic head:

`6b521ddc92b57c2378f59c443fd2c4d301bfae3d`

Workflow:

`M5-09 Form CTA conversion QA`

Run:

`35602579028`

Result:

`SUCCESS`

The diagnostic branch is not a runtime merge candidate.

## 3. Static regression

The accepted M5-07 static contract validator passed again, including:

- v2 pending lead marker;
- v1 rollout compatibility;
- fail-closed thank-you behavior;
- controlled project/offer context;
- payment simulation -> `negotiate_scenario`;
- exact-project conditions -> `request_project_conditions`;
- visit semantics;
- WhatsApp remains secondary;
- no change to PRIMARY lead semantics.

## 4. Candidate lead/privacy regression

The existing exact source candidate smoke was re-run:

```text
PASS = 36
FAIL = 0
TOTAL = 36
```

Critical accepted cases include:

- `mnt_lead_success` carries:
  - `project_name = Nova Vivere`
  - `offer_name = Nova Vivere | 72 m²`
- no visitor name/e-mail/telephone/raw texto-livre in the source event;
- pending marker is consumed;
- refresh creates no duplicate lead;
- legacy v1 pending marker remains accepted without inventing project context.

The Form 46 provider was mocked only inside the candidate runner. No real Green lead was created by this diagnostic.

## 5. CTA -> Form QA

A dedicated M5-09 matrix executed seven CTA/Form journeys on both:

- source candidate;
- live Production `https://www.moretegra.com.br/`.

Browsers:

- Chromium;
- Firefox;
- WebKit.

Dynamic result:

```text
PASS = 42
FAIL = 0
TOTAL = 42
```

Journeys:

1. Home -> Negociar meu cenário;
2. Home -> Receber condições;
3. Elo Duo -> Condições e disponibilidade;
4. Ária -> Agendar visita;
5. Ária -> Simular forma de pagamento;
6. CAPIITOLO -> Receber condições;
7. CAPIITOLO -> Agendar visita.

Each case verifies:

- CTA exists;
- Form 46 controlled intent is preselected correctly;
- canonical `mnt_intent.intent_type` is correct;
- CTA interaction itself does not emit `mnt_lead_success`.

## 6. Composite end-to-end evidence

M5-09 deliberately does not manufacture another real lead because the same effective runtime already has accepted real-world downstream evidence:

### Green CRM
M5-08 real lead evidence shows:

- origin `MoreEmUmTegra`;
- title `MoreEmUmTegra`;
- project + controlled commercial intent in `texto-livre`;
- downstream Green seller/tag enrichment.

### GTM / GA4
M5-07 evidence shows:

- GTM `GTM-PGCR4R47`;
- published version `12` = Live / Latest;
- `mnt_lead_success -> generate_lead`;
- GA4 `G-57M2XR0CY2` receives controlled `project_name` / `offer_name`.

## 7. Acceptance result

The complete conversion chain is evidenced without redefining conversion semantics:

```text
CTA
-> controlled Form 46 intent
-> validated Form 46 submission
-> Green CRM handoff
-> fresh single-use lead marker
-> /obrigado/
-> mnt_lead_success
-> GTM
-> GA4 generate_lead
```

No CTA, form start or submit attempt is promoted to a lead.

```text
MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
```

## 8. Next gate

MNT-M5-10 — Authorized performance remediation — remains explicitly `NOT_AUTHORIZED`.

No M5-10 runtime remediation may start without a new Product Authority authorization.
