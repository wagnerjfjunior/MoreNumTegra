# Handoff Atual — MoreNumTegra

- Status do documento: `atual`
- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência canônica: `main`
- Âncora inicial pré-onboarding: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Escopo deste handoff: continuidade operacional inicial e adoção mínima do SFJM

## 1. Objetivo operacional

Permitir que uma nova conversa, ferramenta ou agente retome o MoreNumTegra a partir do GitHub, sem depender de contexto conversacional anterior e sem inventar requisitos que ainda não estejam versionados.

## 2. Estado confirmado

1. O repositório `wagnerjfjunior/MoreNumTegra` existe e usa `main` como branch padrão.
2. A âncora inicial verificada antes do onboarding SFJM foi `3f45ac60352f917f32c6b9d52eecae414313cb68`.
3. Nessa âncora havia somente `README.md`.
4. O `README.md` registra `MoreNumTegra` e a descrição curta `More em um Tegra`.
5. Requisitos funcionais, arquitetura, stack, deploy e critérios de aceite ainda não estavam presentes na fonte canônica inicial.
6. Quando este handoff estiver presente em `main`, o kit mínimo SFJM deve ser tratado como integrado; não é necessária PR adicional apenas para registrar o próprio merge do onboarding.

## 3. Decisões vigentes

| Decisão | Estado | Autoridade/fonte | Impacto |
|---|---|---|---|
| GitHub é a fonte canônica de continuidade | vigente quando este conjunto estiver em `main` | `bootstrap/BOOTSTRAP_CANONICO.md` | Conversas e resumos não substituem estado versionado |
| `main` representa estado integrado; branch/PR representa proposta | vigente | regra de canonicalidade | Evita tratar trabalho não integrado como concluído |
| Estado ausente não será inferido | vigente | protocolo SFJM | Lacunas permanecem explícitas até evidência verificável |
| Baseline funcional deve ser canonicalizada antes de implementação | autorizada como próxima ação documental | `docs/NEXT_SAFE_ACTION.md` | Implementação continua bloqueada até decisão material posterior |

## 4. Entregas concluídas

| Entrega | Evidência | Revisão |
|---|---|---|
| Criação do repositório | `wagnerjfjunior/MoreNumTegra` | âncora inicial `3f45ac60352f917f32c6b9d52eecae414313cb68` |
| Identificação inicial do projeto | `README.md` | âncora inicial |
| Kit mínimo SFJM | presença destes arquivos em `main` | resolver `main` live |

A publicação do próprio onboarding é autocontida: se estes arquivos estiverem em `main`, o onboarding está integrado. Não criar reconciliação documental apenas para registrar esse lifecycle.

## 5. Trabalho em andamento / próxima frente

| Item | Estado observável | Responsável | Condição de conclusão |
|---|---|---|---|
| Baseline funcional do produto | autorizada como próxima ação documental, condicionada ao gate live | responsável pelo projeto | baseline validada e integrada em `main` sem implementação |
| Arquitetura/stack | não iniciada no canônico | responsável pelo projeto | decisão posterior baseada em baseline suficiente e autorização específica |

## 6. Lacunas, limitações e evidências indisponíveis

- Não existe baseline funcional integrada em `main` até que a próxima ação seja concluída.
- Não existe stack ou arquitetura declarada no estado inicial.
- Não existe evidência canônica de domínio, Vercel, ambiente ou deploy.
- Não existe baseline canônica de SEO, analytics, acessibilidade ou performance.
- Não existe matriz canônica de integrações, dados, privacidade ou segurança.

Essas lacunas podem ser reduzidas pela baseline funcional autorizada, mas nenhuma deve ser preenchida por inferência.

## 7. Riscos ativos

| Risco | Evidência | Impacto | Controle vigente |
|---|---|---|---|
| Implementar a partir de contexto não versionado | repositório inicial quase vazio | alto | baseline canônica antes de mudança material |
| Confundir proposta em branch com estado integrado | modelo Git/GitHub | médio | resolver `main` live |
| Acoplar deploy ou integrações antes de decisão explícita | ausência de registros canônicos | alto | manter externos bloqueados |
| Criar loop de reconciliação do próprio lifecycle documental | natureza do onboarding | médio | presença em `main` resolve integração; não duplicar estado de PR em Markdown |

## 8. Próxima ação segura

- Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`
- Resumo derivado e não autoritativo: consolidar e versionar uma baseline funcional inicial exclusivamente documental para o MoreNumTegra.

A ação está autorizada somente nos limites e condições do registro autoritativo.

## 9. Ações bloqueadas ou sujeitas a autorização

- implementação material de produto;
- escolha definitiva de stack/arquitetura sem baseline suficiente e decisão explícita;
- deploy/publicação;
- alteração de domínio/DNS;
- integrações externas;
- campanhas/anúncios;
- uso de credenciais ou dados sensíveis.

Consulte `docs/BLOCKED_ACTIONS.md` para o registro completo. O merge da baseline documental possui autorização condicional específica em `docs/NEXT_SAFE_ACTION.md` e não amplia os demais poderes.

## 10. Arquivos para continuidade

Leia nesta ordem:

1. `bootstrap/BOOTSTRAP_CANONICO.md`
2. `handoffs/CURRENT.md`
3. `docs/PROJECT_STATUS.md`
4. `docs/NEXT_SAFE_ACTION.md`
5. `docs/BLOCKED_ACTIONS.md`
6. `README.md`

## 11. Registro de divergências

Se este handoff divergir do estado live de `main`, prevalece `main` para fatos versionados e lifecycle. Registre a divergência e interrompa qualquer ação afetada até reconciliação material.

Não trate o simples avanço de SHA ou o merge do próprio onboarding como divergência material quando o significado operacional permanecer igual.

## 12. Critério de atualização

Atualize este handoff quando houver mudança material em objetivo, decisão, bloqueio, risco, autorização, evidência relevante ou próxima ação semântica. Não atualize apenas porque o SHA avançou, uma PR mudou de lifecycle ou uma conversa mudou.

## 13. Prompt curto de retomada

> Resolva `wagnerjfjunior/MoreNumTegra` `main` live. Leia `bootstrap/BOOTSTRAP_CANONICO.md` e a ordem mínima indicada. Apresente até 8 fatos confirmados, declare lacunas e identifique a única próxima ação segura em `docs/NEXT_SAFE_ACTION.md`. Não infira estado ausente e não execute ações bloqueadas sem autorização explícita.
