# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-21`.

## Estado M5-07 após decisão da Product Authority

```text
MNT-M5 = ACTIVE
MNT-M5-07 = ACTIVE / DECISION_APPROVED / IMPLEMENTATION_AUTHORIZED
MNT-M5-08 = PLANNED / BLOCKED_BY_M5_07_IMPLEMENTATION_AND_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

CANONICAL_MAIN_AT_DECISION = 25f3b1e801625a69bfefbf76dd3c5fd5f0c2e808
EFFECTIVE_PRODUCTION_RUNTIME_SHA = be7f229ea04cf4050c40c471e21f262f4cfc845d
PRODUCTION_DEPLOYMENT = dpl_CZEKd9SmbVTx6T2L7y4rFkTRdQhP
PRODUCTION_STATE = READY
```

## Decisão aprovada

```text
payment form intent = Simular forma de pagamento
canonical Measurement intent = negotiate_scenario
contact_channel = form
conversion_role = SECONDARY
```

Também aprovado:

- preservar `project_name` e `offer_name` controlados até `mnt_lead_success`;
- encaminhar esses dois parâmetros não-PII ao GA4 `generate_lead`;
- manter nome/e-mail/telefone/texto livre fora do Measurement;
- preservar `mnt_lead_success` como única conversão PRIMARY;
- preservar WhatsApp/intent como SECONDARY;
- manter compatibilidade de rollout com o marcador timestamp-only vigente.

## Única próxima ação segura

Implementar o delta M5-07 em branch/PR:

1. normalizar CTAs para a taxonomia canônica existente;
2. corrigir exact-project conditions/visit/payment semantics;
3. cobrir WhatsApp project-page sem promovê-lo a lead;
4. introduzir pending marker versionado com somente timestamp + contexto controlado de projeto/oferta;
5. consumir o marker uma única vez em `/obrigado/`;
6. emitir `mnt_lead_success` com `project_name/offer_name` quando houver contexto;
7. preservar marker v1 durante rollout;
8. validar sem enviar PII;
9. somente então atualizar o mapping GTM `generate_lead` com `project_name/offer_name`.

Não alterar M5-10, provider Form 46, DNS/canonical, conversion value ou enhanced conversions.
