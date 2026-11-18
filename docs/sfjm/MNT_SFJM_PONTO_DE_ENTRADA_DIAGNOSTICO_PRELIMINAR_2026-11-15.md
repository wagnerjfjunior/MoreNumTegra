# MoreNumTegra — SFJM: o repositório não é entendido pela IA? Diagnóstico preliminar e prompt de retomada (2026-11-15)

Status: **DIAGNÓSTICO PRELIMINAR + PROMPT**. Nenhum arquivo de protocolo, bootstrap ou estado foi alterado. Este documento é aditivo.
Autoridade: Wagner. Redação: Claude. Tudo abaixo está separado em FATO (com arquivo), HIPÓTESE e NÃO VERIFICADO. A conversa seguinte deve **refazer** a verificação, não herdar esta.

---

## 1. O que o pedido do Wagner quer dizer

Uma conversa nova deve: (1) resolver o `main` dos três repositórios e ler as fontes SFJM; (2) montar a tabela do kit do Trilho 1 e do contrato v2 para o diretório-problema (existe / falta / contradiz); (3) diagnosticar por que a IA não entende o SFJM ali, cada causa como FATO, HIPÓTESE ou OPINIÃO; (4) propor **uma** correção aditiva em diff, sem executar; (5) definir um teste de retomada (prompt literal + PASS/FAIL) reaproveitando o formato do Gate 2. Nada é criado antes da aprovação do passo 4.

Dois campos do pedido original ficaram em branco: `[NOME]` e o sintoma. Nesta documentação, `[NOME]` foi preenchido como **MoreNumTegra** (suposição do Claude, a única coerente com o contexto; o Wagner confirma ou corrige). O sintoma foi preenchido só com o que é observável.

## 2. Estado vivo conferido em 15/11/2026

| Repositório | `main` (SHA) | Observação |
|---|---|---|
| `wagnerjfjunior/MoreNumTegra` | `0867ba67786f90116b1274b337633425ce123b18` | PR #581 aberto (rascunho, `clean`); PR #582 aberto (rascunho, `clean`) |
| `wagnerjfjunior/StopJuniorMode` | `7669eb65f32312a54a4c62ce372c970e40a13acb` | protocolo |
| `wagnerjfjunior/sfjm-workspace` | `a0e8c4ea06f4bec4c13f52a54f20c4ff6ff563e3` | **O prompt original dizia `a1e8c4e`. O `main` real começa com `a0e8c4e`.** Erro de digitação ou `main` que andou: não distinguido. |

Os dois repositórios SFJM não estavam anexados a esta sessão; foram anexados somente leitura e lidos pela API do GitHub (sem clone).

## 3. Fatos verificados (arquivo → resultado)

**Ponto de entrada**
- F1. `CLAUDE.md` e `AGENTS.md` **não existem** no `main` dos três repositórios.
- F2. MoreNumTegra tem `.sfjm/project.json` (LVR-enabled; `promotion.policy: local-first-remote-on-promotion`, `pushRequiresExplicitIntent: true`, `deployRequiresExplicitIntent: true`).
- F3. `bootstrap/BOOTSTRAP_CANONICO.md` (375 linhas) **não menciona** `.sfjm/project.json`, `docs/sfjm/HANDOFF.md`, `CLAUDE.md` nem `AGENTS.md` (0 ocorrências de cada).
- F4. O `bootstrap/BOOTSTRAP_CANONICO.md` tem, antes do título "# Bootstrap Canônico — MoreNumTegra" (linha 23), banners históricos de 05/11, 28/10, 27/10, 18/10, 16/10 e 12/10 (linhas 1 a 22). O §1 diz "Data de referência desta revisão: 2026-09-23". O §3 (ordem mínima de leitura, 12 itens) começa em `handoffs/CURRENT.md` e termina em "evidências específicas".

**Próxima ação**
- F5. O §15 do bootstrap delega: "Autoridade: `docs/NEXT_SAFE_ACTION.md`".
- F6. `docs/NEXT_SAFE_ACTION.md` (597 linhas) e `handoffs/CURRENT.md` são **pilhas de seções datadas**, mais novas no topo. O topo de ambos é de **05/11/2026** (Complexo Lapa–Pirituba). Não há nada sobre a frente Rio (13/11) nem sobre a frente SEO/H1 (15/11) nesses dois arquivos.
- F7. `docs/sfjm/HANDOFF.md` existe no `main` (3.166 B), descreve a branch `feat/rio-slugs-estandes-20261113`, última atualização 13/11/2026, e declara outra "Próxima ação (única)": "Wagner aprova o merge". O cabeçalho do próprio arquivo diz que, no merge, o conteúdo vai para o `NEXT_SAFE_ACTION` e o arquivo sai. Se aquela branch foi mesclada: **não verificado**.
- F8. Logo, no `main` há pelo menos três respostas candidatas para "qual é a próxima ação": Complexo (NEXT_SAFE_ACTION, 05/11), Rio (HANDOFF.md, 13/11) e o que a conversa atual declara (SEO/H1, 15/11, em PR #582 ainda não mesclado).

**Protocolo (StopJuniorMode)**
- F9. `handoffs/CURRENT.md` resume a única próxima ação como "obter decisão explícita do usuário sobre a aposentadoria da conversa anterior". `docs/NEXT_SAFE_ACTION.md` (autoritativo, segundo o próprio CURRENT) diz "criar `SFJM - Workspace - Chat2`" e registra que a aposentadoria já foi autorizada em 23/07/2026. **Divergência confirmada** (a afirmação do pedido original está correta).
- F10. StopJuniorMode não tem `bootstrap/BOOTSTRAP_CANONICO.md`; seu bootstrap é `docs/SFJM_BOOTSTRAP_V1.md` (9.758 B). Existem `docs/CANONICAL_BOOTSTRAP_PROTOCOL.md`, `docs/SFJM_CONTINUITY_CONTRACT_V2.md`, `docs/SFJM_V2_ADOPTION_CHECKLIST.md` e `templates/BOOTSTRAP_CANONICO_TEMPLATE.md`. A ordem de leitura do CURRENT cita `handoffs/SFJM_CURRENT_STATUS_HANDOFF.md`, que existe (5.231 B).
- F11. Aposentadoria: o CURRENT.md do StopJuniorMode não é a fonte da ação; a ordem é "NEXT_SAFE_ACTION prevalece".

**Workspace (sfjm-workspace)**
- F12. `docs/BOOTSTRAP.md` define a ordem de leitura em 10 passos (live `main` → bootstrap → `SFJM_BOUNDARY` → `CURRENT` → `PROJECT_STATUS` → `NEXT_SAFE_ACTION` → ...). `docs/SFJM_BOUNDARY.md`: Workspace aplica o protocolo e não o redefine.
- F13. `docs/sfjm/HANDOFF.md` **não existe** no `main` do Workspace.
- F14. PR #63 (`docs/plano-regra-20261109`) está **aberto, não mesclado**. Seu `docs/PLANO_OPERACIONAL_REGRA.md` contém a decisão **D13** (linha 115): checkpoint em `docs/sfjm/HANDOFF.md` de caminho fixo a cada commit; conversa nova em compactação, merge ou troca de tarefa; uma conversa por tarefa; "piloto MoreNumTegra `9c15d48`". Ou seja, D13 é regra de uma PR aberta e **já está sendo praticada no MoreNumTegra sem estar no `main` do Workspace**.
- F15. `docs/evidence/GATE_PROMPTS.md` tem o texto literal do Gate 1 (alvo `main` em `e126111`) e do Gate 2 (branch da PR #58, `0b2855c`), com definição de "gate de migração" (a) a (e).

## 4. Hipóteses (a testar na próxima conversa)

- H(a) **Falta ponto de entrada automático** (F1). Ferramentas de código leem `CLAUDE.md`/`AGENTS.md` ao abrir o diretório; sem eles a IA só sabe do SFJM se alguém colar o prompt. Sustentada por F1; o efeito sobre o comportamento **não foi testado**.
- H(b) **O bootstrap existe, mas a trilha de leitura não leva ao que importa hoje** (F3, F4, F6, F7): a ordem de leitura não inclui `docs/sfjm/HANDOFF.md` nem `.sfjm/project.json`, e termina em estado de 05/11.
- H(c) **Mais de uma próxima ação** (F8). Forte, apoiada por três arquivos.
- H(d) **Estado defasado em relação às decisões do Wagner**: padrão de títulos, frente "fontes e créditos", ordem das tarefas e a decisão de dividir fases só vivem no PR #582 (aberto).
- H(e) **Inflação do bootstrap**: 375 linhas com histórico antes do título e pilhas de 597 linhas dificultam a IA achar o que vale. Opinião, a validar.
- H(f) **Conflito de regra com o Workspace**: D13 manda `docs/sfjm/HANDOFF.md` ser "a" próxima ação da branch, e o bootstrap do MoreNumTegra manda `docs/NEXT_SAFE_ACTION.md`. Sem regra de precedência escrita no `main` do MoreNumTegra.

## 5. Não verificado nesta rodada

- Conteúdo integral de `SFJM_CONTINUITY_CONTRACT_V2.md`, `SFJM_V2_ADOPTION_CHECKLIST.md`, `CANONICAL_BOOTSTRAP_PROTOCOL.md` e do template: só confirmei a existência. A **tabela do kit do Trilho 1 e do contrato v2 não foi montada**; é o passo 2 da próxima conversa.
- Se a branch `feat/rio-slugs-estandes-20261113` foi mesclada.
- Comportamento real de Claude/ChatGPT numa conversa nova sobre este diretório (nenhum teste de retomada foi executado).
- Se o Wagner usa o launcher LVR para o MoreNumTegra; nesta frente os PRs foram criados via API REST do GitHub.

---

## 6. PROMPT PARA COLAR EM NOVA CONVERSA

CONTEXTO
Sou o Wagner. Esta conversa nova substitui uma que ficou grande demais.
Problema: o repositório **wagnerjfjunior/MoreNumTegra** não está entendendo o SFJM.
Sintoma observado: a retomada do trabalho depende de eu colar prompt e das instruções do Projeto no claude.ai; o repositório sozinho aponta para o estado do Complexo Lapa–Pirituba de 05/11/2026 e não menciona as frentes Rio (13/11) e SEO/H1 (15/11).
Antes de enviar este prompt, o conector GitHub precisa estar ligado e com acesso aos TRÊS repositórios: MoreNumTegra, StopJuniorMode e sfjm-workspace.

O QUE É O SFJM (lido nos repositórios em 15/11/2026)
- SFJM = Stateful Flow & Journey Management (origem interna: Stop Fucking Junior Mode). Protocolo de continuidade cognitiva e operacional entre conversas de IA.
- Protocolo e pesquisa: wagnerjfjunior/StopJuniorMode. Produto que aplica o protocolo sem redefini-lo: wagnerjfjunior/sfjm-workspace (docs/SFJM_BOUNDARY.md).
- Regras centrais: GitHub é canônico e a conversa não é estado do projeto; leitura canônica obrigatória antes da primeira resposta; uma única próxima ação segura no NEXT_SAFE_ACTION, que prevalece sobre resumos; preparação, auditoria e execução são atos distintos; autorização não se propaga; sem inferência (informação ausente permanece ausente); mudança estrutural só após teste de retomada com PASS no Claude e no ChatGPT.
- O MoreNumTegra tem `.sfjm/project.json`, portanto é LVR-enabled: usar o launcher compartilhado, nunca patch manual como padrão.

FONTES A LER (não confie neste resumo)
- StopJuniorMode: `docs/SFJM_BOOTSTRAP_V1.md`, `docs/CANONICAL_BOOTSTRAP_PROTOCOL.md`, `docs/SFJM_CONTINUITY_CONTRACT_V2.md`, `docs/SFJM_V2_ADOPTION_CHECKLIST.md`, `templates/BOOTSTRAP_CANONICO_TEMPLATE.md`, `handoffs/CURRENT.md`, `docs/NEXT_SAFE_ACTION.md`.
- sfjm-workspace: `docs/BOOTSTRAP.md`, `docs/SFJM_BOUNDARY.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, `docs/evidence/GATE_PROMPTS.md`; e a PR #63 (aberta) para a decisão D13.
- MoreNumTegra: `.sfjm/project.json`, `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/PROJECT_STATUS.md`, `docs/BLOCKED_ACTIONS.md`, `docs/sfjm/HANDOFF.md`, e `docs/sfjm/MNT_SFJM_PONTO_DE_ENTRADA_DIAGNOSTICO_PRELIMINAR_2026-11-15.md` (PR #582, ainda aberto: ler na branch `docs/sfjm-handoff-h1h2h3-fontes-20261115`).

FATOS JÁ VERIFICADOS EM 15/11/2026 (reconfirme os que afetam sua conclusão; o detalhe com arquivos está no documento acima)
- `main`: MoreNumTegra `0867ba67786f90116b1274b337633425ce123b18`; StopJuniorMode `7669eb65f32312a54a4c62ce372c970e40a13acb`; sfjm-workspace `a0e8c4ea06f4bec4c13f52a54f20c4ff6ff563e3` (o prompt anterior dizia `a1e8c4e`: está errado ou o main andou).
- Nenhum dos três tem CLAUDE.md ou AGENTS.md.
- No MoreNumTegra, o bootstrap não menciona `.sfjm/project.json` nem `docs/sfjm/HANDOFF.md`; `NEXT_SAFE_ACTION.md` (597 linhas) e `CURRENT.md` são pilhas de seções datadas, com topo em 05/11; `docs/sfjm/HANDOFF.md` descreve outra próxima ação (Rio, 13/11).
- No StopJuniorMode, `handoffs/CURRENT.md` e `docs/NEXT_SAFE_ACTION.md` divergem sobre a próxima ação.
- No sfjm-workspace, `docs/sfjm/HANDOFF.md` não existe no main; D13 só está na PR #63 (aberta).
- Os prompts e critérios dos gates estão em sfjm-workspace `docs/evidence/GATE_PROMPTS.md`.

REGRAS DE TRABALHO
- Análise linha a linha; fato, hipótese e opinião separados; diga o que não verificou.
- Aditivo e reversível; nada apagado; não altere lógica central sem meu consentimento, proponha por diff.
- Você decide a parte técnica e entrega UMA recomendação; eu autorizo.
- Não crie arquivos, branches ou PRs antes da minha aprovação do passo 4.
- Merge, deploy e publicação só com minha ordem explícita. Os PRs #581 (conteúdo SEO) e #582 (documentação) estão abertos e fora desta tarefa.

TAREFA, NESTA ORDEM
1. Verifique o main ao vivo dos três repositórios (SHA) e leia as fontes acima.
2. Para o MoreNumTegra, monte a tabela do kit do Trilho 1 e do contrato v2: o que existe, o que falta, o que contradiz, com caminhos. (O documento preliminar não montou esta tabela.)
3. Diagnostique por que a IA não entende o SFJM nesse repositório. Cada causa como FATO (com arquivo), HIPÓTESE ou OPINIÃO. Hipóteses a testar: (a) falta CLAUDE.md/AGENTS.md apontando para o bootstrap; (b) bootstrap com ordem de leitura que omite `.sfjm/project.json` e `docs/sfjm/HANDOFF.md`; (c) mais de uma próxima ação; (d) estado desatualizado em relação às minhas decisões; (e) bootstrap inflado por histórico; (f) conflito de precedência entre D13 (`docs/sfjm/HANDOFF.md`) e `docs/NEXT_SAFE_ACTION.md`; (g) outra.
4. Proponha UMA correção aditiva, em diff, sem executar. Se a causa for a falta de um ponto de entrada, proponha o conteúdo mínimo do CLAUDE.md que aponte para o bootstrap sem duplicar o estado.
5. Defina o teste de retomada (prompt literal + critério PASS/FAIL) para validar a correção no Claude e no ChatGPT, reaproveitando o formato do Gate 2.

## FIM DO PROMPT
