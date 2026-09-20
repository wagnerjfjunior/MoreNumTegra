# MNT-M5-01 — Form 46 Local Validation Evidence

Date: `2026-09-20`  
Environment: local Chrome  
Route exercised: `/empreendimentos/aria-higienopolis/`

## Scope

Validate local invalid-submit focus behavior and valid-data localhost guard behavior without creating a real lead.

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

### Valid e-mail, invalid Brazilian phone

After filling Name and E-mail with valid values and entering only `11` as the Brazilian phone:

```text
VISIBLE_ERROR = Informe um telefone brasileiro válido com DDD.
document.activeElement.id = mt-lead-phone
RESULT = PASS
```

### All locally valid fields

After filling locally valid Name, E-mail and Brazilian phone data:

```text
VISIBLE_STATUS = Formulário validado. O envio real fica habilitado somente em www.moretegra.com.br após merge em main.
FORM46_POST_OBSERVED = NO
RESULT = PASS
```

The local runtime stops after validation because the host is not `www.moretegra.com.br`.



## Boundary

```text
FORM46_LOCAL_INVALID_VALIDATION = PASS
FORM46_LOCAL_VALID_DATA_GUARD = PASS
FOCUS_FIRST_INVALID_FIELD = PASS
PHONE_VALIDATION = PASS
ERROR_MESSAGE_VISIBLE = PASS
LOCAL_REAL_POST = NOT_SENT
PRODUCTION_VALIDATION = PENDING
```

This evidence does not replay the already-proven production Green Sales receipt contract.
