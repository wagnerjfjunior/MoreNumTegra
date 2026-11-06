# SFJM — Cenário 3: altura do iframe e espaço branco inferior — 05/11/2026

## Relato
O usuário observou um espaço vazio excessivo abaixo do mapa do cenário 3 ("Lapa / Pirituba → Marginal Pinheiros") na página pública do simulador, especialmente no celular.

## Diagnóstico
- HTML pai `src-greenn/complexo-lapa-pirituba/index.html`: regras antigas em CSS fixavam `#marginalDualEmbed` em `min-height:970px`, reduzido apenas para `920px` no mobile, mesmo depois de remover notas e painéis técnicos.
- HTML filho `src-greenn/complexo-lapa-pirituba/marginal-duplo/index.html`: não informava sua altura ao pai, diferente dos cenários 1 e 2.
- O mapa filho usa proporção `1200/849` para o viewport; no celular a altura real fica muito abaixo dos 920 px impostos pelo iframe.

## Correção
Branch `fix/complexo-c3-iframe-altura-20261105`, derivada de `main`.
1. HTML filho C3: adicionar `ResizeObserver` sobre `main`, com `getBoundingClientRect().bottom`; emitir `postMessage` `{namespace:'mnt-complexo-iframe',type:'resize',height}` para `location.origin`, apenas quando `?embed=1`. Recalcular em load, resize e carregamento da imagem. Não interagir com rotas, carros ou zoom.
2. HTML pai: incluir `marginalDualEmbed` no listener já existente, que confere `event.origin===location.origin`, `event.source===iframe.contentWindow` e limites de altura `160–2400px`; manter `dualEmbed` e `ayrtonEmbed`.
3. Regra CSS final fixa `min-height:0` e altura inicial de `650px` desktop / `365px` mobile para cenário 3, até chegar a primeira altura real do filho.

## Integridade
- Todos os HTMLs originais permanecem na árvore; apenas pai e filho C3 sofrem mudança funcional.
- Geometria SVG, rotas, animações, frota, cores e eventos de zoom não foram alterados.
- Não implementar editor C8/C9; sem mudanças nos cenários 1, 2, 4–7.
- Scripts JS compilados estaticamente; **QA visual no iPhone pendente**. Deve ser testada a área abaixo do mapa do cenário 3 e troca de cenário antes da aceitação visual.

## Governança
- Sem merge/deploy até autorização explícita. Em publicação, PR isolada com os dois HTMLs e esta documentação.
- Rollback por revert da PR ou restauração de deployment Vercel anterior READY resolvido live, sem reset da `main`.
