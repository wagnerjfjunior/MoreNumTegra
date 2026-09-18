# Post-PR #118 Home Form Project Context Fix — 2026-09-18

Status: `IMPLEMENTED_IN_BRANCH / STATIC_QA_PASS / NOT_MERGED`

Repository: `wagnerjfjunior/MoreNumTegra`  
Base `main`: `2ce80dab8bb8a490d567e1f867f82e62d345c3ec`  
Branch: `fix/home-project-context-form46-20260918`

## Production evidence

Product Authority submitted a Green Sales lead created from the home page. The received `texto-livre` was:

```text
Página principal | Nenhum empreendimento selecionado | Agendar visita
```

The user had selected an empreendimento before sending the form. Therefore the project-context propagation implemented in PR #117/#118 was not reliable in production.

## Root cause

The home catalog stored project selection only in:

```text
document.documentElement.dataset.moretegraInterest
```

At the same time, the generic in-page navigation handler had logic that cleared this project context whenever another ordinary `href="#formulario"` CTA was used.

This made the selection dependent on the exact click path between the catalog card and Form 46. The UI could show a project-selection journey while the form payload later fell back to:

`Página principal | Nenhum empreendimento selecionado`.

## Correction

The lead form itself now owns a mirrored, explicit project context:

```text
form.dataset.selectedProject
```

Rules:

1. clicking any `[data-interest]` captures the project directly into the Form 46 element in the capture phase;
2. `leadProjectContext(form)` prioritizes `form.dataset.selectedProject`;
3. `setInterestContext(...)` mirrors selection into the form dataset;
4. only the explicit `Escolher outro empreendimento` action clears the selected project;
5. ordinary links/CTAs to `#formulario` no longer clear an existing project selection;
6. when no project was ever selected, the required fallback remains:
   `Página principal | Nenhum empreendimento selecionado | <intenção>`.

No visitor PII is stored. The mirrored value is only the public empreendimento name.

## Expected contract

Selected project:

```text
Caminhos da Lapa Elo Duo | Agendar visita
CAPIITOLO by Piero Lissoni | Condições e disponibilidade
Ária Higienópolis | Simular forma de pagamento
```

Direct form access without project selection:

```text
Página principal | Nenhum empreendimento selecionado | Agendar visita
```

## Invariants

Form 46 remains unchanged:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

No provider, DNS, schema, sitemap, canonical, analytics or deployment-policy change.

## Static QA

```text
RUNTIME_JS_SYNTAX = PASS
MORETEGRA_JS_SYNTAX = PASS
HOME_FORM_COUNT = 1
FORM_46_CONTRACT = PRESERVED
FORM_SELECTED_PROJECT_DIRECT_CAPTURE = PASS
FORM_SELECTED_PROJECT_PAYLOAD_PRIORITY = PASS
MORETEGRA_SELECTION_MIRROR = PASS
EXPLICIT_CHANGE_SELECTION_CLEAR = PASS
GENERIC_FORM_CTA_CONTEXT_RESET = REMOVED
```

## Release gate

This correction requires fresh Ready/merge authorization because it changes the exact production form-context behavior after the previously merged release.
