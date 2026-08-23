# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Âncora inicial pré-onboarding: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Fase atual: `inicialização / onboarding de continuidade`
- Saúde geral: `amarelo` — repositório e fonte canônica existem, mas o produto ainda não possui baseline funcional/arquitetural versionada

## 1. Resultado pretendido

Estabelecer uma base canônica verificável para que o MoreNumTegra possa evoluir sem depender de memória de conversa, mantendo estado, bloqueios e próxima ação explícitos antes da implementação material.

O resultado de negócio e o escopo funcional detalhado do produto ainda precisam ser canonicalizados e não são inferidos neste documento.

## 2. Estado por frente

| Frente | Estado | Evidência | Próximo marco | Bloqueio |
|---|---|---|---|---|
| Repositório | concluída | `wagnerjfjunior/MoreNumTegra` | manter `main` como fonte integrada | nenhum |
| Continuidade SFJM | em onboarding | conjunto documental SFJM | integrar e validar leitura mínima | merge exige autorização explícita |
| Baseline funcional | não iniciada no canônico | ausência no estado inicial | registrar baseline em proposta documental | requer escopo/evidência e autorização |
| Arquitetura/stack | não iniciada no canônico | ausência no estado inicial | decidir após baseline funcional | não inferir tecnologia |
| Implementação | não iniciada no canônico | ausência de código no estado inicial | somente após escopo autorizado | bloqueada até decisão material |
| Deploy/hosting | não estabelecido | ausência de evidência canônica | definir ambiente quando necessário | ação externa exige autorização |
| SEO/performance/analytics | não estabelecido no canônico | ausência de requisitos versionados | incorporar à baseline se aplicável | requisitos ainda ausentes |

## 3. Marcos

| Marco | Situação | Condição | Evidência |
|---|---|---|---|
| Repositório criado | atingido | repositório acessível | GitHub |
| Fonte canônica definida | atingido pelo onboarding quando integrado | `main` declarado como autoridade | `bootstrap/BOOTSTRAP_CANONICO.md` |
| Kit mínimo SFJM integrado | planejado | merge do onboarding validado | PR do onboarding |
| Baseline funcional versionada | planejado | documento aprovado/integrado | futura evidência canônica |
| Implementação autorizada | não atingido | escopo material aprovado | registro futuro |

## 4. Decisões necessárias

| Decisão | Por que é necessária | Opções conhecidas | Autoridade | Prazo/condição |
|---|---|---|---|---|
| Escopo inicial do produto/MVP | impede implementação por suposição | ainda não canonicalizadas | responsável pelo projeto | antes de implementação material |
| Stack e arquitetura | define execução técnica | ainda não canonicalizadas | responsável pelo projeto + revisão técnica quando aplicável | após baseline funcional suficiente |
| Ambiente/hosting/deploy | produz efeito externo | ainda não canonicalizadas | responsável pelo projeto | antes de qualquer publicação |
| Requisitos de SEO, performance, analytics, privacidade e segurança | afetam arquitetura e aceite | ainda não canonicalizadas | responsável pelo projeto | antes do aceite da solução aplicável |

## 5. Dependências e bloqueios

- O escopo real do produto precisa ser convertido em evidência versionada.
- Materiais existentes fora do GitHub devem ser identificados explicitamente antes de serem usados como fonte.
- Deploy e integrações externas permanecem bloqueados sem autorização específica.
- Implementação não deve começar a partir de requisitos apenas lembrados ou inferidos.

## 6. Riscos

| Risco | Probabilidade | Impacto | Mitigação autorizada |
|---|---|---|---|
| Drift entre conversa e repositório | alta enquanto faltam requisitos versionados | alto | canonicalizar baseline antes de implementação |
| Escopo crescer sem decisão explícita | média | alto | uma próxima ação segura por vez |
| Escolha prematura de tecnologia | média | médio/alto | separar requisitos de solução |
| Publicação externa prematura | baixa/média | alto | bloquear deploy/DNS/integrações até autorização |

## 7. Próxima ação segura

- Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`
- Resumo derivado e não autoritativo: consolidar e versionar, em branch/PR documental, a baseline funcional inicial do MoreNumTegra sem implementar produto.

## 8. Fora do escopo atual

- código de aplicação;
- definição automática de stack;
- deploy ou configuração de Vercel;
- domínio/DNS;
- integrações, formulários ou analytics;
- campanhas e mídia paga;
- dados pessoais ou credenciais;
- declaração de produção ou conclusão do produto.

## 9. Critério de atualização

Atualize este status quando houver mudança material em fase, escopo, marco, decisão, bloqueio, risco ou próxima ação semântica. Não use avanço de SHA, lifecycle de PR ou mudança de conversa como gatilho isolado de reconciliação.
