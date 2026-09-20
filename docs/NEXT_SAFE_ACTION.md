# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-20`.

## Estado após M5-05

```text
MNT-M5 = ACTIVE
MNT-M5-05 = COMPLETE / ARCHITECTURE_CANONICALIZED / NO_RUNTIME_MUTATION
MNT-M5-06 = AUTHORIZED / READY_TO_START
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
```

## Única próxima ação segura

Executar **MNT-M5-06 — CTA/form journey optimization design** sob a autorização contínua da Product Authority.

Pode avançar por análise e documentação sem nova microaprovação quando a decisão já estiver determinada pelos contratos canônicos.

**PARAR** diante de escolha material de produto/jornada, por exemplo:

- alterar hierarquia estratégica Form 46 vs WhatsApp;
- tornar WhatsApp uma conversão primária;
- alterar campos obrigatórios/intent obrigatório do formulário;
- remover ou adicionar uma etapa material na jornada;
- introduzir modal/stepper/chat como caminho principal;
- redefinir comportamento de CTA de forma que troque o objetivo da ação;
- mudar provider/CRM, lead validity, privacy ou Measurement semantics.

Continuam explicitamente bloqueados sem decisão específica: M5-10, novo backend, FECH.AI/n8n/Make, Meta/Ads, DNS/canonical e Measurement mutation fora de gate.
