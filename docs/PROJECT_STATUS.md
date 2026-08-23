# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Onboarding SFJM: integrado em `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Fase atual: `baseline funcional V1 / definição técnica pendente`
- Saúde geral: `amarelo` — requisitos funcionais iniciais estão canonicalizados quando a baseline estiver em `main`, mas solução técnica, código e deploy ainda não estão decididos/autorizados

## 1. Resultado pretendido

Evoluir o MoreNumTegra como experiência Tegra de descoberta e conversão imobiliária com forte prioridade mobile, preservando requisitos funcionais em GitHub antes de decisões técnicas e evitando drift entre conversas e implementação.

A autoridade funcional inicial é `docs/baseline/FUNCTIONAL_BASELINE_V1.md` quando integrada em `main`.

## 2. Estado por frente

| Frente | Estado | Evidência | Próximo marco | Bloqueio |
|---|---|---|---|---|
| Repositório | concluída | GitHub `main` | preservar fonte integrada | nenhum |
| Continuidade SFJM | operacional | onboarding em `2819cc1...` | validar sempre por leitura live | nenhum blocker de lifecycle |
| Baseline funcional | `V1` quando presente em `main` | `docs/baseline/FUNCTIONAL_BASELINE_V1.md` | manter requisitos rastreáveis | não usar branch como estado integrado |
| Mobile/UX funcional | requisitos definidos; defeitos atuais apenas relatados | baseline funcional | reproduzir tecnicamente após código autorizado | implementação ausente/não autorizada |
| Marca Tegra | requisitos iniciais definidos | `#EBB92E` + logo indicado na baseline | implementar futuramente | código não autorizado |
| Arquitetura/stack | não definida | lacuna explícita | baseline técnica documental | exige nova autorização |
| Implementação | não iniciada/autorizada | bloqueios SFJM | escopo técnico futuro | bloqueada |
| Formulário/CRM/dados | superfície funcional requerida; integração não definida | baseline funcional | data/privacy contract | bloqueada |
| Deploy/hosting | não estabelecido | ausência de target canônico | decidir após fase técnica | bloqueada |
| SEO/performance | intenção/requisitos gerais registrados; metas técnicas pendentes | baseline funcional | metas/estratégia técnica | baseline técnica pendente |

## 3. Marcos

| Marco | Situação | Condição | Evidência |
|---|---|---|---|
| Repositório criado | atingido | repositório acessível | GitHub |
| SFJM onboarding | atingido | merge validado | `2819cc158d8775137c992fa2fd147e1c3806e38e` |
| Baseline funcional V1 | atingida quando arquivo estiver em `main` | PR funcional validada/mergeada | `docs/baseline/FUNCTIONAL_BASELINE_V1.md` |
| Baseline técnica/arquitetural | não iniciada | autorização explícita futura | `docs/NEXT_SAFE_ACTION.md` |
| Implementação autorizada | não atingido | autorização material após decisão técnica | registro futuro |
| Deploy autorizado | não atingido | target + critérios + autorização | registro futuro |

Não abrir PR apenas para atualizar o texto `atingida quando arquivo estiver em main`; após o merge, a presença do arquivo resolve o estado live.

## 4. Requisitos funcionais já decididos

Resumo não autoritativo; a baseline funcional prevalece:

- Tegra yellow `#EBB92E`;
- logo Tegra transparente indicado pelo proprietário;
- favicon preservado com amarelo alinhado;
- mobile como contexto primário de aceite;
- filtros de zoneamento/localização e estágio devem funcionar em mobile;
- cards exibem estágios com badges mais salientes;
- preservar CTAs flutuantes `WhatsApp` e `Receber condições` salvo decisão posterior;
- formulário ao final da página, sem integração real até contrato de dados autorizado;
- mídia/vídeo não pode permanecer visivelmente quebrado;
- LCP/loading performance é prioridade, metas numéricas ainda pendentes.

## 5. Decisões necessárias

| Decisão | Por que é necessária | Autoridade | Condição |
|---|---|---|---|
| autorizar baseline técnica | próxima etapa sem executar produto | responsável pelo projeto | após baseline funcional live |
| arquitetura e stack | define solução | responsável + revisão técnica quando aplicável | baseline técnica |
| origem dos dados de empreendimentos | define conteúdo/runtime | responsável | baseline técnica |
| contrato de lead/form/CRM | envolve dados pessoais | responsável | antes de integração real |
| hosting/Vercel/domínio | efeito externo | responsável | antes de publicação |
| metas Core Web Vitals | aceite mensurável | decisão técnica | antes de produção |
| SEO técnico/indexação | descoberta orgânica | decisão técnica/SEO | antes de produção |
| analytics/pixels | medição e dados | responsável | antes de instrumentação |

## 6. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| tratar relatos de defeito como teste concluído | média | médio | reclassificar somente após reprodução técnica |
| escolha prematura de stack | média | alto | baseline técnica separada |
| regressão mobile | alta se não houver gate | alto | mobile-first + metas técnicas futuras |
| formulário sem governança de dados | média | alto | integração bloqueada |
| deploy prematuro | baixa/média | alto | target e autorização separados |
| loop de documentação/lifecycle | média | médio | resolver GitHub live e atualizar apenas significado material |

## 7. Próxima ação segura

- Autoridade: `docs/NEXT_SAFE_ACTION.md`
- Resumo: definir e versionar uma baseline técnica/arquitetural inicial em PR documental, **bloqueada até autorização explícita**.

## 8. Fora do escopo/autoridade atual

- código ou importação de implementação;
- correção dos defeitos relatados;
- escolha de stack por inferência;
- Vercel/hosting/domínio/DNS;
- formulário real/CRM/WhatsApp config;
- analytics/pixels/tags;
- deploy/preview público/produção;
- campanhas;
- uso de credenciais/dados pessoais.

## 9. Critério de atualização

Atualizar somente quando houver mudança material em requisito, baseline, decisão, bloqueio, risco, autorização ou próxima ação. Não usar SHA/lifecycle/conversa como gatilho isolado.
