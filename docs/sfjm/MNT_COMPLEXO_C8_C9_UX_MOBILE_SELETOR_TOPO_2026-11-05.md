# SFJM — UX mobile: seletor superior e limpeza do simulador — 05/11/2026

## Solicitação / evidência
Usuário enviou captura de tela iPhone do bloco "Escolha seu percurso" e apontou:
- Três grandes botões fixos na parte superior são insuficientes para ao menos dez percursos.
- O seletor real ficava abaixo do mapa; deve ser movido ao topo para evitar rolagem e descoberta tardia.
- Retirar o conjunto de textos e controles redundantes do simulador 1: "Referências da região", chips Lapa/Piqueri/Pirituba e ruas, nota JPG/SPObras, "Controle da circulação", checkboxes duplicados, camada opcional de paradas, texto descritivo de 32 carros e "Na arte editorial".

## Escopo / branch
- Branch `feat/complexo-cenarios8-9-editor-prancha7-20261105`, baseada na `main` após as PRs #542/#543.
- Arquivos modificados:
  1. `src-greenn/complexo-lapa-pirituba/index.html`.
  2. `src-greenn/complexo-lapa-pirituba/duplo/index.html`.
- Preservados C1–C7, imagem da prancha, paths SVG, movimentos, frota, zoom/pan, formulário e o editor C8/C9 já habilitado na mesma branch. Sem merge/deploy.

## Decisões de UI
- Seletor HTML nativo único `#route` movido para antes de `.layout`, em `.ux-route-picker`: rótulo "Selecione o trajeto", caixa larga de toque com foco destacado e texto curto, 10 opções geradas por `routeNames`.
- Removido `nav.ux-scenarios` (três botões fixos) e seus event listeners; botões de acesso rápido da capa e os controles "Anterior/Próximo" permanecem.
- A legenda funcional do site (`#uxDirections`, checkbox por direção com carrinhos nas cores) continua sendo a única área de controle de sentidos; no mobile, `.panel` vem antes de `.map`.
- Slot publicitário não foi descartado: `.ux-ad` foi realocado para depois do layout/mapa, para não bloquear a imagem no celular.
- No iframe do primeiro simulador (`duplo/index.html?embed=1`), removidos controles duplicados e observações técnicas citadas. Mapa, SVG original, animação 8+8+16 e zoom intactos. `#status` permanece no DOM, oculto visualmente, como saída técnica de erro/carregamento; nenhum seletor JS retorna nulo.
- Autoajuste de altura do iframe por `ResizeObserver` + `postMessage` same-origin `mnt-complexo-iframe:resize` e verificação de `event.source` no pai; isso reduz espaço vazio no mobile após retirar blocos de texto.
- Barra interna do mapa simplificada para "Lapa ↔ Pirituba · dois sentidos", sem nome técnico de imagem.

## QA (pendente de LVR)
1. Entrar em `http://localhost:8080/complexo-lapa-pirituba/` na branch.
2. Na seção "Escolha seu percurso", conferir seletor no topo, com 10 cenários; **não** exibir três botões fixos acima do mapa.
3. Trocar C1 → C5 → C6 → C7 → C8 → C9: título, mapa, legenda e editor devem corresponder ao percurso; não permitir exibição simultânea de iframes.
4. C1: mapa e 32 carros preservados; texto de chip/ruas, segundo conjunto de controles e bloco de paradas ausentes; zoom por toque funcional.
5. Mobile 375px/390px: legenda acima do mapa, slot publicitário abaixo do mapa, sem iframe com grande vazio; mapa inteiro acessível.
6. Controle técnico: scripts compilam; conferir a rolagem, acessibilidade (label/select), responsividade e foco de teclado em navegador.
7. Validar C2–C7 sem regressão e editor C8/C9 sem perda de coordenadas.
8. Não declarar aceite visual ou publicação sem teste/merge específicos.

## Rollback
Reverter apenas os commits UX desta branch; a produção da `main` não é modificada nesta entrega. Em produção futura usar PR isolada e rollback por revert da PR, não reset do histórico.
