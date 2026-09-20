# MNT-M5-01 — Form 46 Invalid-submit Focus Validation Evidence

Date: `2026-09-20`  
Environment: local Chrome  
Route exercised: `/empreendimentos/aria-higienopolis/`

## Scope

Validate local invalid-submit behavior without creating a real lead.

The runtime explicitly blocks real submission outside `www.moretegra.com.br` after client-side validation.

## Observed

### Empty required fields

After submitting with required identity/contact fields empty:

```text
VISIBLE_ERROR = Informe seu nome.
document.activeElement.id = mt-lead-name
RESULT = PASS
```

### Name filled, e-mail empty

After filling only the Name field and submitting again:

```text
VISIBLE_ERROR = Informe um e-mail válido.
document.activeElement.id = mt-lead-email
RESULT = PASS
```

No Form 46 POST was observed in the local Network panel during the invalid-submit checks.

## Boundary

```text
FORM46_LOCAL_INVALID_VALIDATION = PASS
FOCUS_FIRST_INVALID_FIELD = PASS
ERROR_MESSAGE_VISIBLE = PASS
REAL_LEAD_SENT = NO_OBSERVED
PRODUCTION_VALIDATION = PENDING
```

This evidence does not replay the already-proven production Green Sales receipt contract.
