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

## 3. Decisões vigentes

| Decisão | Estado | Autoridade/fonte | Impacto |
|---|---|---|---|
| GitHub será a fonte canônica de continuidade | vigente após integração deste baseline | `bootstrap/BOOTSTRAP_CANONICO.md` | Conversas e resumos deixam de ser autoridade de estado |
| `main` representa estado integrado; branch/PR representa proposta | vigente | regra de canonicalidade | Evita tratar trabalho não integrado como concluído |
| Estado ausente não será inferido | vigente | protocolo SFJM | Lacunas permanecem explícitas até evidência verificável |

## 4. Entregas concluídas

| Entrega | Evidência | Revisão |
|---|---|---|
| Criação do repositório | `wagnerjfjunior/MoreNumTegra` | âncora inicial `3f45ac60352f917f32c6b9d52eecae414313cb68` |
| Identificação inicial do projeto | `README.md` | âncora inicial |
| Kit mínimo SFJM | arquivos deste onboarding | resolver `main` live após integração |

## 5. Trabalho em andamento

| Item | Estado observável | Responsável | Condição de conclusão |
|---|---|---|---|
| Onboarding SFJM | proposta documental | responsável pelo projeto | arquivos integrados em `main` e leitura mínima validada |
| Baseline funcional do produto | não iniciada no estado canônico | responsável pelo projeto | requisitos e fronteiras versionados com evidência |

## 6. Lacunas, limitações e evidências indisponíveis

- Não existe baseline funcional versionada.
- Não existe stack ou arquitetura declarada no repositório inicial.
- Não existe evidência canônica de domínio, Vercel, ambiente ou deploy.
- Não existe baseline canônica de SEO, analytics, acessibilidade ou performance.
- Não existe matriz canônica de integrações, dados, privacidade ou segurança.

Nenhuma dessas lacunas deve ser preenchida por lembrança de conversas anteriores.

## 7. Riscos ativos

| Risco | Evidência | Impacto | Controle vigente |
|---|---|---|---|
| Implementar a partir de contexto conversacional não versionado | repositório inicial quase vazio | alto | exigir baseline canônica antes de mudança material |
| Confundir proposta em branch com estado integrado | modelo Git/GitHub | médio | `main` prevalece até merge |
| Acoplar deploy ou integrações antes de decisão explícita | ausência de registros canônicos | alto | manter deploy/externos bloqueados |
| Criar documentação duplicada e divergente | risco típico de continuidade | médio | uma única autoridade para a próxima ação segura |

## 8. Próxima ação segura

- Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`
- Resumo derivado e não autoritativo: consolidar e versionar uma baseline funcional inicial exclusivamente documental para o MoreNumTegra.

A execução deve respeitar as pré-condições e autorizações do registro autoritativo.

## 9. Ações bloqueadas ou sujeitas a autorização

- merge em `main`;
- implementação material de produto;
- deploy/publicação;
- alteração de domínio/DNS;
- integrações externas;
- campanhas/anúncios;
- uso de credenciais ou dados sensíveis.

Consulte `docs/BLOCKED_ACTIONS.md` para o registro completo.

## 10. Arquivos para continuidade

Leia nesta ordem:

1. `bootstrap/BOOTSTRAP_CANONICO.md`
2. `handoffs/CURRENT.md`
3. `docs/PROJECT_STATUS.md`
4. `docs/NEXT_SAFE_ACTION.md`
5. `docs/BLOCKED_ACTIONS.md`
6. `README.md`

## 11. Registro de divergências

Se este handoff divergir do estado live de `main`, prevalece `main` para fatos versionados e lifecycle. Registre a divergência e interrompa qualquer ação afetada até reconciliação.

## 12. Critério de atualização

Atualize este handoff quando houver mudança material em objetivo, decisão, bloqueio, risco, autorização, evidência relevante ou próxima ação semântica. Não atualize apenas porque o SHA avançou ou uma conversa mudou.

## 13. Prompt curto de retomada

> Resolva `wagnerjfjunior/MoreNumTegra` `main` live. Leia `bootstrap/BOOTSTRAP_CANONICO.md` e a ordem mínima indicada. Apresente até 8 fatos confirmados, declare lacunas e identifique a única próxima ação segura em `docs/NEXT_SAFE_ACTION.md`. Não infira estado ausente e não execute ações bloqueadas sem autorização explícita.
