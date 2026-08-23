# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Onboarding SFJM integrado em: `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md` quando presente em `main`

## 1. Objetivo operacional

Permitir retomada do MoreNumTegra a partir do GitHub com um contrato funcional inicial explícito, distinguindo requisitos confirmados, comportamento apenas relatado pelo usuário e decisões técnicas ainda pendentes.

## 2. Estado confirmado

1. `main` é a autoridade integrada do projeto.
2. O onboarding SFJM está integrado desde `2819cc158d8775137c992fa2fd147e1c3806e38e`.
3. `FUNCTIONAL_BASELINE_V1.md`, quando integrada em `main`, é a autoridade funcional inicial.
4. A baseline registra Tegra `#EBB92E`, logo transparente indicado pelo proprietário, postura mobile-first, filtros, estágios, CTAs, formulário e requisitos de mídia/performance.
5. Defeitos de vídeo, seletores/botões mobile e baixa saliência de badges são `USER_REPORTED` até reprodução técnica.
6. O proprietário reportou tráfego `>90% mobile`; o valor não é tratado como analytics independentemente medido.
7. Arquitetura, stack, deploy, integrações e metas técnicas numéricas continuam não decididos.

## 3. Decisões vigentes

| Decisão | Estado | Autoridade | Impacto |
|---|---|---|---|
| GitHub `main` é fonte canônica | vigente | bootstrap SFJM | contexto conversacional não substitui estado integrado |
| Baseline funcional precede solução técnica | vigente | `FUNCTIONAL_BASELINE_V1.md` | evita stack por inferência |
| Mobile é contexto primário de aceite funcional | vigente | baseline funcional | desktop não compensa mobile quebrado |
| Tegra yellow = `#EBB92E` | vigente | baseline funcional | identidade visual inicial |
| Lead form é requisito de superfície, não autorização de processamento | vigente | baseline funcional + bloqueios | integração/dados continuam bloqueados |
| Próxima fase é baseline técnica, mas ainda requer autorização explícita | vigente | `docs/NEXT_SAFE_ACTION.md` | nenhuma implementação autorizada |

## 4. Entregas concluídas

| Entrega | Evidência |
|---|---|
| Repositório e identidade inicial | `README.md` |
| Continuidade mínima SFJM | documentos SFJM em `main` |
| Baseline funcional V1 | `docs/baseline/FUNCTIONAL_BASELINE_V1.md` quando integrada |

Não criar PR de reconciliação apenas para registrar o merge desta baseline; sua presença em `main` resolve o lifecycle.

## 5. Próxima frente

| Item | Estado | Condição |
|---|---|---|
| Baseline técnica/arquitetural | bloqueada | autorização explícita após resolver a baseline funcional live |
| Implementação/importação de código | bloqueada | decisão técnica suficiente + autorização material específica |

## 6. Lacunas

- framework/runtime e arquitetura;
- snapshot de implementação no repositório;
- CMS/inventário/backend;
- contrato real de formulário/CRM;
- target de WhatsApp verificado;
- analytics/pixels/tags;
- política de privacidade/consentimento aplicável ao lead;
- domínio/hosting/deploy;
- metas numéricas de Core Web Vitals;
- target formal de acessibilidade;
- SEO técnico;
- testes e release.

## 7. Riscos ativos

| Risco | Impacto | Controle |
|---|---|---|
| tratar defeito relatado como reproduzido | médio | manter `USER_REPORTED` até código/teste |
| implementar antes de decidir arquitetura | alto | próxima ação documental bloqueada por autorização |
| conectar formulário sem contrato de dados | alto | integração real bloqueada |
| degradar mobile apesar de desktop funcional | alto | mobile-first na baseline |
| duplicar lifecycle transitório em Markdown | médio | resolver PR/SHA live e registrar apenas significado material |

## 8. Próxima ação segura

- Autoridade: `docs/NEXT_SAFE_ACTION.md`
- Resumo: definir e versionar uma baseline técnica/arquitetural inicial em PR documental, **somente após autorização explícita**.

## 9. Ações bloqueadas

Consulte `docs/BLOCKED_ACTIONS.md`. Em especial permanecem bloqueados:

- código/implementação;
- correção dos defeitos relatados;
- Vercel/hosting/domínio/DNS;
- formulário real/CRM/WhatsApp config;
- analytics/pixels;
- deploy/publicação;
- campanhas;
- credenciais/dados pessoais.

## 10. Ordem de leitura

1. `bootstrap/BOOTSTRAP_CANONICO.md`
2. `handoffs/CURRENT.md`
3. `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
4. `docs/PROJECT_STATUS.md`
5. `docs/NEXT_SAFE_ACTION.md`
6. `docs/BLOCKED_ACTIONS.md`
7. `README.md`

## 11. Regra de divergência

- lifecycle GitHub: resolver live;
- produto/requisitos: baseline funcional integrada prevalece;
- próxima ação: `docs/NEXT_SAFE_ACTION.md` prevalece;
- se houver conflito material, usar a interpretação mais restritiva até reconciliação.

## 12. Critério de atualização

Atualizar por mudança material de requisito, decisão, risco, autorização, bloqueio ou próxima ação. Não atualizar apenas por novo SHA, merge de documentação autocontida ou troca de conversa.

## 13. Prompt curto de retomada

> Resolva `wagnerjfjunior/MoreNumTegra` `main` live. Leia bootstrap, handoff e `docs/baseline/FUNCTIONAL_BASELINE_V1.md`. Separe fatos canônicos de comportamento `USER_REPORTED`, declare lacunas e consulte `docs/NEXT_SAFE_ACTION.md` antes de qualquer ação. Não implemente sem autorização material explícita.
