# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-20`.

## Estado após M5-06

```text
MNT-M5 = ACTIVE
MNT-M5-06 = COMPLETE / PRODUCTION_JOURNEY_PASS / SEARCH_VARIANT_PRESERVED
MNT-M5-07 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

MAIN_RUNTIME = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
M5_06_PRODUCTION_RUN = 35543247914 / 24 PASS / 0 FAIL
```

## Única próxima ação segura

Executar **MNT-M5-07 — Lead semantics** sob a autorização contínua da Product Authority.

Preservar:

- Form 46 como provider V1;
- `mnt_lead_success` como única conversão primária vigente;
- CTA -> Form 46 intent preselection aceito em M5-06;
- nenhuma PII do visitante em Measurement;
- uma única rota `/obrigado/`;
- nenhuma mudança silenciosa em GTM/GA4/Consent.

**PARAR** diante de escolha material que altere:

- o que constitui um lead válido;
- diferença entre intenção, submit attempt e lead;
- papel de WhatsApp como secondary vs primary;
- semântica `mnt_intent`/taxonomy;
- provider/CRM;
- privacy/PII;
- deduplicação/conversion counting;
- backend/server-side proof.

MNT-M5-10 permanece explicitamente bloqueado.
