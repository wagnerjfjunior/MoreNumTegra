# SFJM — Release isolada: navegação superior no Complexo Lapa–Pirituba (05/11/2026)

## Autorização
Usuário solicitou explicitamente merge e publicação em produção após o redesenho de UX mobile do simulador.

## Baseline e limites
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`.
- Branch original: `feat/complexo-cenarios8-9-editor-prancha7-20261105`. Contém trabalhos de calibração C8/C9 ainda sem trajetos; **não publicar esses editores** como parte do ajuste de UX.
- Release isolada criada de `main`: `release/complexo-ux-mobile-seletor-topo-20261105`.
- Manter o seletor e a lista de **12 itens existentes na main**. O usuário reporta ao menos 10 simulações, não autoriza publicar rotas sem pontos.
- Arquivos de interface alterados: `src-greenn/complexo-lapa-pirituba/index.html` e `src-greenn/complexo-lapa-pirituba/duplo/index.html`. Este registro é o único outro arquivo da release.

## Transformação de interface
- Retirados os três botões fixos `.ux-scenarios` da seção "Escolha seu percurso".
- O único select `#route`, com todos os percursos canônicos, é exibido no topo da seção antes do mapa e do painel de sentidos. Alto contraste e alvos mobile acessíveis.
- Em telas pequenas, o painel de sentidos aparece antes da imagem e permite ocultar/exibir as rotas existentes, conforme cada cenário.
- Espaço publicitário movido para depois do mapa, não bloqueando a visualização.
- Iframe do simulador bidirecional informa altura de conteúdo ao pai por `ResizeObserver` + `postMessage` filtrado por origem e source.
- Duplo C1: removidas referências de ruas em chips, notas de engenharia obsoletas, segundo painel de controle, camada de paradas previstas e texto de 32 veículos.
- Preservados: SVG, 8 carros laranja e 8 azuis, 16 neutros, zoom/pan, controles de sentidos no pai, cenários 1–7 publicados.
- Os editores C8/C9 seguem somente na branch de desenvolvimento original, sem iframe ou rota dependente na release.
- Texto introdutório atualizado para não afirmar haver apenas três cenários disponíveis.

## Gates de release
1. Compare `main...release`: somente 3 arquivos esperados e branch sem commits atrás da main.
2. JS do arquivo principal e do simulador duplo: validação sintática.
3. Checar que `#route` ocorre uma única vez, no topo da seção, opções derivadas de `routeNames`, e que não foi copiado C8/C9.
4. PR com head SHA imutável durante merge. Registrar commit merge e Vercel production READY para o mesmo SHA e alias oficial.
5. QA visual desktop/iPhone de contraste, mapa, navegação, controle de sentidos e resize **não é comprovada por análise sintática**.

## Rollback
- Reverter somente a PR da release UX preservando as releases C1–C7 já em main.
- Deployment anterior READY de produção deve ser registrado pelo identificador resolvido live, sem dedução.
- Não resetar main; não publicar Greenn neste fluxo.
