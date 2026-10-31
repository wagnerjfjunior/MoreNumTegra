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
