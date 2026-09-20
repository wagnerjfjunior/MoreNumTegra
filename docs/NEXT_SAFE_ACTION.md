# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-20`.

## Estado M5-06 após decisão da Product Authority

```text
MNT-M5 = ACTIVE
MNT-M5-06 = ACTIVE / DECISION_APPROVED / IMPLEMENTATION_AUTHORIZED
MNT-M5-07 = PLANNED / BLOCKED_BY_M5_06_ACCEPTANCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

EFFECTIVE_PRODUCTION_RUNTIME_SHA = a070e968a547cf94a68b0eb2a38a4bb2e9f64758
PRODUCTION_DEPLOYMENT = dpl_C9zyvyKSDgYmep24dEj88xacNZ73
PRODUCTION_STATE = READY
```

## Única próxima ação segura

Implementar o change set aprovado de **MNT-M5-06 — CTA/Form journey optimization**:

- CTA contextual deve pré-selecionar a intenção correspondente no Form 46;
- o mapping deve ser allowlisted e não derivar texto arbitrário do DOM;
- adicionar a opção controlada `Negociar meu cenário` aos formulários governados;
- Home `Quero negociar meu cenário` -> `Negociar meu cenário`;
- `Agendar visita` -> `Agendar visita`;
- `Simular possibilidades de pagamento` -> `Simular forma de pagamento`;
- condições/consultar unidades/negociar condições/floating -> `Condições e disponibilidade`;
- CAPIITOLO hero deve se tornar um CTA único `Receber condições`, preservando o CTA separado de visita;
- CAPIITOLO continua sendo o branding oficial/H1;
- a mesma página canônica deve cobrir naturalmente a variante de busca `Capitolo`, sem nova URL e sem keyword stuffing.

Após implementação: checks do repositório + smoke exact-head + validação Production.

Não alterar sem gate próprio:

- semântica Measurement dos project-page `mnt_intent` (M5-07);
- Form 46 provider/endpoint;
- lead validity;
- GTM/GA4;
- DNS/canonical;
- backend;
- M5-10.
