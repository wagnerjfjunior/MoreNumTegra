# Form 46 Home Project Context — E2E Production Validation

Status: `PASS / CLOSED`

Observed: `2026-09-18`  
Canonical runtime release SHA: `782c25b7229af99d0f1839bbfc6af412a5cb31e7`  
Release PR: `#119`

## Scope

This record closes the production regression where a visitor selected an empreendimento on the MoreNumTegra home page but the Green Sales lead could still arrive with:

```text
Página principal | Nenhum empreendimento selecionado | <intenção>
```

PR #119 changed project-context ownership so Form 46 keeps an explicit selected-project value and ordinary navigation to `#formulario` no longer clears a valid selection.

## Production evidence

After PR #119 was merged and the corresponding Vercel production deployment reached `success`, Product Authority executed a new real lead flow from the home page and supplied Green Sales runtime evidence.

The received `texto-livre` showed:

```text
YPY Alto do Ipiranga | Agendar visita
```

The lead also showed origin `MoreEmUmTegra` and seller `Sabrina da Tegra`.

No visitor name, e-mail or telephone from the validation lead is canonicalized in this repository because those values are not required to prove the contract.

## Result

```text
FORM46_PROJECT_CONTEXT_E2E = PASS
HOME_PROJECT_SELECTION = PASS
PROJECT_CONTEXT_SURVIVES_NAVIGATION = PASS
TEXTO_LIVRE_PROJECT_INTENT_COMPOSITION = PASS
GREEN_SALES_RECEIPT = PASS
PRODUCTION_VALIDATION = PASS
REGRESSION = CLOSED
```

Expected behavior remains:

Selected project:

```text
<empreendimento> | <intenção>
```

True direct-form access without project selection:

```text
Página principal | Nenhum empreendimento selecionado | <intenção>
```

## Runtime / deployment

```text
PR_119 = MERGED
PR_119_HEAD = 5b6dd53ef80caabbe0564c906cbfb6090ed2c07f
RUNTIME_RELEASE_SHA = 782c25b7229af99d0f1839bbfc6af412a5cb31e7
VERCEL_STATUS = SUCCESS
FORM_PROVIDER = Green/GDigital
TENANT_ID = 313
FORM_ID = 46
FORM_TITLE = MoreEmUmTegra
```

## Governance consequence

No further code change is required for this defect.

The next safe action returns to non-mutative post-release HTTP/Search Console/structured-data validation. WBS progress is unchanged by this corrective release and validation evidence.
