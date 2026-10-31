# SFJM / RESF — Simulador de dois sentidos e zoom (31/10/2026)

## Origem
- Base canônica: main `5bed3e058d67e29821af55c46b870c83e40e97f5`, PR #527 já integrada.
- Pedido: dois trajetos simultâneos, laranja Lapa → Pirituba e azul Pirituba → Lapa, dois carrinhos em movimento, mostrar/ocultar, pausar, reiniciar, zoom de 1 a 3 vezes com roda/pinça/arraste.
- A composição visual previamente aprovada no chat `lapa_pirituba_duplo_trajeto_overlay.png` (2400×2078) é **referência aceita**, mas NÃO está no GitHub. Não afirmar que foi incorporada.
- Para a primeira homologação, a página nova reutiliza `../assets/rota-19.jpg` oficial do PDF com as duas rotas vetoriais sobrepostas. A composição exata aprovada deverá ser incorporada como asset validado numa etapa posterior; exige rever sistema de coordenadas antes de substituir o JPG original.
- Nenhuma alteração em `/complexo-lapa-pirituba/` ou na página publicada.

## Arquivos da branch
- `src-greenn/complexo-lapa-pirituba/duplo/index.html` — página standalone HTML/CSS/JS sem framework.
- Paths JSON reutilizados de `src-greenn/complexo-lapa-pirituba/routes-verified.json` — páginas 19 e 20, ainda `verified:false`; aceitação visual anterior não é certificação geométrica.

## Como testar pelo LVR
1. Launcher SFJM > MoreNumTegra > Executar outra branch > `feat/complexo-duplo-carrinhos-zoom-lvr-20261031`.
2. Confirmar `[BRANCH]`, `[HEAD]`, `[SYNC] IN_SYNC`.
3. Abrir `http://localhost:8080/src-greenn/complexo-lapa-pirituba/duplo/index.html`.
4. Verificar carros azul/laranja em sentidos opostos; alternar checkboxes; pausar/reiniciar.
5. Zoom + / - / centralizar; roda do mouse em desktop; pinça e arrasto em celular.
6. Checar alinhamento entre carros/rotas e mapa no máximo 3× e resolução do JPG.
7. Validar acessibilidade, resize mobile, limite de arraste, falha de JSON, prefers-reduced-motion.

## Riscos e bloqueios de aceite
- As linhas de 2019 são rotas históricas propostas, **não malha operacional ou tráfego em tempo real**.
- O JPG de 1200×849 pixels pode ficar granular a 3×; não esticar artificialmente alegando melhora. A base aceita de 2400×2078 está disponível como artefato do chat, fora do repositório.
- A imagem aprovada inclui título e legenda dentro do próprio bitmap e proporção diferente: para integrá-la em interatividade é necessário ajustar offsets e transformações SVG, evitando duplicar linhas visuais.
- Os dois paths existentes são candidatos; ajustes finos de posicionamento precisam de aceite no LVR.
- Não mergear nem promover a produção sem autorização.

## Ajuste incremental — separar linhas coincidentes
- No simulador isolado, os percursos continuam vindos do mesmo `routes-verified.json`, que não foi modificado.
- No carregamento são amostradas as curvas de ida/volta; segmentos com proximidade até 24 unidades SVG e tangentes em sentidos opostos recebem deslocamento lateral suave (até 8 unidades para cada sentido).
- A mesma geometria exibida alimenta a animação de cada carro; zoom e pinça não mudam o alinhamento relativo.
- Traçados divergentes permanecem sem offset. O deslocamento é visual, não correção de infraestrutura.
- Aceite pendente: usuário verificar no LVR se os carrinhos aparecem lado a lado nas seções compartilhadas e se não há saltos nas entradas e saídas, inclusive a 3×.
- Não alterar produção nem certificar geométricas como verificadas apenas com esta atualização.

## Consolidação do catálogo — 16 entradas no seletor

- Solicitado pelo usuário após aceite visual do duplo: substituir as entradas 1 e 2 independentes por uma entrada inicial `Lapa ↔ Pirituba`.
- `src-greenn/complexo-lapa-pirituba/index.html` preserva os outros 15 mapas, que passam a ser exibidos com índices 2–16, mas continuam associados a páginas 21–35 do PDF.
- Simulador duplo encaixado na área do mapa por iframe de mesma origem com `?embed=1`, modo que oculta cabeçalho e apresentação duplicados e mostra os dois carrinhos, filtros e zoom.
- O mapa original `rota-20.jpg` continua no GitHub para referência, mas deixou de ser uma opção própria do seletor. Não apagar fonte primária.
- Nenhum arquivo da produção foi alterado; aguarda sincronização e aceite visual no LVR antes de eventual merge.
- QA pendente: verificar contador 1–16, ações Anterior/Próximo, iframe sem barras internas excessivas no mobile, zoom, pause, seleção de ida/volta e todos os 15 mapas remanescentes.

## Camada de paradas previstas — verificação do PDF original
- Fonte: `PIRITUBA LAPA 2026.pdf` (projeto SPObras ago/2019), página 16: Binário Rua John Harrison especifica duas paradas existentes a reformar na John Harrison, uma reforma na Martin Tenório e uma nova parada na Carlos Bertini.
- Página 13: duas paradas de ônibus no canteiro central da Av. Raimundo Pereira de Magalhães, lado sul.
- Página 17: prancha de situação do binário e perfis John Harrison/Carlos Bertini; **não se presumiu equivalência georreferenciada** com o enquadramento da página 19.
- Implementação: checkbox `showStops` controla um overlay/legenda discreto dentro da área do mapa. A camada é informativa, **sem pins ou coordenadas fictícias**; permanece fixa ao ampliar e arrastar o mapa.
- `routes-verified.json`, os carros, as rotas e o zoom não foram alterados.
- Gate LVR: verificar comportamento do checkbox desktop/mobile, legibilidade do overlay e possíveis obstruções do desenho; refinar posições geográficas em etapa separada somente com validação cartográfica.
