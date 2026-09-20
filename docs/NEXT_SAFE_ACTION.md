# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-20`.

## Estado M5-07

```text
MNT-M5 = ACTIVE
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = ACTIVE / DECISION_REQUIRED / NO_RUNTIME_MUTATION
MNT-M5-08 = PLANNED / BLOCKED_BY_M5_07_DECISION_AND_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

MAIN = af9a58cb49200b5e4a226ab5ede8a7df6b532f03
EFFECTIVE_PRODUCTION_RUNTIME_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
```

## Decisão necessária da Product Authority

Definir a semântica Measurement do CTA/Form 46 **Simular forma de pagamento**.

### Opção A — recomendada

Reutilizar o intent canônico existente:

```text
intent_type = negotiate_scenario
contact_channel = form
conversion_role = SECONDARY
```

O CRM/Form 46 continua preservando o valor preciso `Simular forma de pagamento`.

### Opção B

Criar novo intent canônico:

```text
intent_type = payment_simulation
contact_channel = form
conversion_role = SECONDARY
```

Isso exige revisão formal de MNT-M2-03, MNT-M2-04 e validações/destinos aplicáveis.

## Bloqueio

Não alterar runtime/Measurement antes desta decisão.

As demais correções semânticas de M5-07 já estão determinadas pelos contratos existentes e podem ser executadas depois da decisão.

MNT-M5-10 permanece explicitamente bloqueado.
