# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Âncora inicial pré-onboarding: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Fase atual: `continuidade SFJM estabelecida / baseline funcional pendente de canonicalização`
- Saúde geral: `amarelo` — a continuidade operacional está definida quando este conjunto estiver em `main`, mas o produto ainda não possui baseline funcional/arquitetural integrada

## 1. Resultado pretendido

Estabelecer uma base canônica verificável para que o MoreNumTegra possa evoluir sem depender de memória de conversa, mantendo estado, bloqueios e próxima ação explícitos antes da implementação material.

O resultado de negócio e o escopo funcional detalhado do produto serão tratados na baseline funcional autorizada e não são inventados por este documento.

## 2. Estado por frente

| Frente | Estado | Evidência | Próximo marco | Bloqueio |
|---|---|---|---|---|
| Repositório | concluída | `wagnerjfjunior/MoreNumTegra` | manter `main` como fonte integrada | nenhum |
| Continuidade SFJM | estabelecida quando estes arquivos estiverem presentes em `main` | conjunto documental SFJM | validar retomada pelo `main` live | nenhum blocker adicional de reconciliação |
| Baseline funcional | autorizada como próxima ação documental | `docs/NEXT_SAFE_ACTION.md` | criar, validar e integrar baseline exclusivamente documental | gate live + pré-merge sem blocker material |
| Arquitetura/stack | não iniciada no canônico | ausência no estado inicial | decidir após baseline funcional suficiente | não inferir tecnologia; requer autorização futura |
| Implementação | não iniciada no canônico | ausência de código no estado inicial | somente após escopo material autorizado | bloqueada |
| Deploy/hosting | não estabelecido | ausência de evidência canônica | definir ambiente quando necessário | ação externa exige autorização |
| SEO/performance/analytics | ainda não canonicalizado | ausência no estado inicial | registrar requisitos confirmados na baseline quando sustentados | não inventar requisitos ausentes |

## 3. Marcos

| Marco | Situação | Condição | Evidência |
|---|---|---|---|
| Repositório criado | atingido | repositório acessível | GitHub |
| Fonte canônica definida | atingida quando este conjunto estiver em `main` | `main` declarado como autoridade | `bootstrap/BOOTSTRAP_CANONICO.md` |
| Kit mínimo SFJM integrado | resolvido live pela presença destes arquivos em `main` | não requer PR posterior apenas para registrar o merge | GitHub `main` |
| Baseline funcional versionada | próxima ação autorizada | PR documental validada e integrada | futura evidência canônica |
| Implementação autorizada | não atingido | escopo material aprovado separadamente | registro futuro |

## 4. Decisões necessárias

| Decisão | Por que é necessária | Opções conhecidas | Autoridade | Prazo/condição |
|---|---|---|---|---|
| Escopo inicial do produto/MVP | impede implementação por suposição | será consolidado a partir de fontes confirmadas | responsável pelo projeto | baseline funcional |
| Stack e arquitetura | define execução técnica | ainda não canonicalizadas | responsável pelo projeto + revisão técnica quando aplicável | após baseline funcional suficiente |
| Ambiente/hosting/deploy | produz efeito externo | ainda não canonicalizadas | responsável pelo projeto | antes de qualquer publicação |
| Requisitos de SEO, performance, analytics, privacidade e segurança | afetam arquitetura e aceite | registrar somente os que forem confirmados | responsável pelo projeto | baseline e decisões posteriores conforme aplicável |

## 5. Dependências e bloqueios

- O escopo real do produto precisa ser convertido em evidência versionada pela baseline funcional autorizada.
- Materiais existentes fora do GitHub devem ser tratados como fonte de proveniência e consolidados explicitamente, sem transformar memória não verificável em fato.
- Deploy e integrações externas permanecem bloqueados sem autorização específica.
- Implementação não deve começar apenas porque a baseline documental for integrada.
- O lifecycle do próprio onboarding deve ser resolvido live; não criar PR de reconciliação apenas para registrar que ele foi mergeado.

## 6. Riscos

| Risco | Probabilidade | Impacto | Mitigação autorizada |
|---|---|---|---|
| Drift entre conversa e repositório | alta enquanto faltam requisitos versionados | alto | canonicalizar baseline antes de implementação |
| Escopo crescer sem decisão explícita | média | alto | uma próxima ação segura por vez |
| Escolha prematura de tecnologia | média | médio/alto | separar requisitos de solução |
| Publicação externa prematura | baixa/média | alto | bloquear deploy/DNS/integrações até autorização |
| Loop documental para registrar lifecycle já resolvível live | média | médio | não duplicar estado transitório de PR em autoridade Markdown |

## 7. Próxima ação segura

- Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`
- Resumo derivado e não autoritativo: consolidar e versionar, em branch/PR exclusivamente documental, a baseline funcional inicial do MoreNumTegra; fazer merge apenas se o pré-merge passar sem blocker material.

## 8. Fora do escopo atual

- código de aplicação;
- definição automática de stack;
- deploy ou configuração de Vercel;
- domínio/DNS;
- execução de integrações, formulários ou analytics;
- campanhas e mídia paga;
- dados pessoais ou credenciais;
- declaração de produção ou conclusão do produto.

## 9. Critério de atualização

Atualize este status quando houver mudança material em fase, escopo, marco, decisão, bloqueio, risco ou próxima ação semântica. Não use avanço de SHA, lifecycle de PR ou mudança de conversa como gatilho isolado de reconciliação.
