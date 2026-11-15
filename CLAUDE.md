# MoreNumTegra — ponto de entrada para IA (SFJM)

Este arquivo é um ponteiro: não contém estado nem próxima ação. Se divergir do repositório, o repositório prevalece.

## Antes da primeira resposta (somente leitura)
1. Resolva o SHA atual do `main` (`git ls-remote origin refs/heads/main`). Prompt colado, memória e conversa anterior não são fonte de estado.
2. Leia `.sfjm/project.json` nessa revisão. Presença = projeto LVR-enabled: use o launcher compartilhado; push e deploy só com ordem explícita do Wagner.
3. Leia `bootstrap/BOOTSTRAP_CANONICO.md` a partir do título "# Bootstrap Canônico — MoreNumTegra". Os avisos acima do título são históricos. Siga a "Ordem mínima de leitura" dele.
4. `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md` e `docs/BLOCKED_ACTIONS.md` são pilhas de seções datadas, mais novas no topo. Leia a seção do topo e as que ela cita; não varra o arquivo inteiro.
5. Teste de defasagem (obrigatório): pegue a data da seção do topo de `docs/NEXT_SAFE_ACTION.md` e liste os PRs mesclados no `main` depois dela. Se houver, o kit está defasado: declare como divergência material.

## Precedência
- `docs/NEXT_SAFE_ACTION.md` no `main` é o único registro autoritativo da próxima ação.
- `docs/sfjm/HANDOFF.md` é handoff de BRANCH: vale só na branch que o criou, com o head que o trouxe. No `main` é histórico.
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`, `PROJECT_READ_MODEL.json` e `PROGRAM_TASK_GRAPH.json` são derivados.
- PRs e branches abertos são propostas, não estado do `main`.
- Divergência material entre fontes: pare, liste cada fonte com arquivo e data, e peça decisão ao Wagner. Não declare "estado limpo" nem escolha uma ação por conta própria.

## Regras fixas
- Mudança só por branch e PR. Merge, deploy, publicação e gasto em mídia só com ordem explícita.
- Não inventar preço, metragem, endereço, data ou métrica. Separar fato, hipótese e falta de acesso.
- Preparação, auditoria e execução são atos distintos; autorização não se propaga.

## Primeira resposta
Estado confirmado (máx. 8 itens, cada um com o arquivo); lacunas e o que não foi verificado; divergências materiais (ou "nenhuma"); a única próxima ação segura e o arquivo que a define; bloqueios e autorizações; gate de migração PASS ou FAIL, com justificativa.

## Protocolo
Definido em `wagnerjfjunior/StopJuniorMode` (`docs/SFJM_BOOTSTRAP_V1.md`, `docs/CANONICAL_BOOTSTRAP_PROTOCOL.md`), repositório privado. Sem acesso a ele, declare a lacuna. Este repositório aplica o protocolo; não o redefine.
