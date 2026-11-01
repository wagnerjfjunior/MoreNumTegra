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

## 31/10/2026 — substituição de fundo limpa solicitada
- HTML do simulador atualizado em `4dc39273401db483a4c01aa452163c7b27d5e4b5`: removidos `cleanLegacyLabels`, canvas e badges HTML; rotas SVG, zoom e carrinhos preservados.
- Novo asset esperado na branch: `src-greenn/complexo-lapa-pirituba/assets/Rota_Lapa_Pirituba_limpa.webp` (arquivo original do usuário, 1200×896; SHA256 `3a3927ddb70d3ff0023dbd48901f179864160aff36f066ff067980454bbca552`).
- **BLOQUEIO DE INTEGRAÇÃO:** arquivo binário ainda não enviado ao GitHub. Enquanto faltar, a página usa o WebP antigo como fallback. Não declarar substituição concluída ou LVR pronto.
- Rollback: commit HTML anterior `001bbcebeab661542b779023fd7d009142c4ac8d`, ou reverter a única alteração de `mapImage.src` + limpeza canvas; arquivo WebP antigo permanece intacto.
- Antes do merge, validar que o GitHub serve o novo arquivo 200, que a imagem-base permanece alinhada aos paths SVG e que todas as 16 opções funcionam.

## Auditoria pré-merge 31/10/2026 — NO-GO

Solicitação do usuário: validar trajetórias/animação e, somente se estiver OK, mergear PR #528.

Evidência do repositório GitHub head `4b25d427c2504a4caf52ee1c180b53228531c798`:
- `src-greenn/complexo-lapa-pirituba/duplo/index.html` faz referência a `Rota_Lapa_Pirituba_limpa.webp`, **404 no fetch_file GitHub**; fallback é `Complexo_Lapa_Pirituba_trajeto1.webp`, presente.
- Os `routes-verified.json` para páginas 19 e 20 (e todas demais) ainda estão `verified:false`; não declarar validação geométrica de precisão.
- A nova imagem fornecida pelo usuário tem 1200×896 pixels, enquanto o viewer está em `aspect-ratio:1200/849` e o SVG em `viewBox=0 0 1200 849`; antes de liberar, verificar registro vertical e, se necessário, preservar proporção real na camada raster e correspondência SVG.
- A própria PR #528 permanece DRAFT, com 16 rotas agrupadas e page IDs `[19,21..35]`; implementação verificável estaticamente, sem QA visual de LVR automático.
- No head consultado, workflows retornaram: `SEO two distinct images - 39 URLs` SUCCESS; `Favicon standard validation` FAILURE (investigar escopo dessa falha antes de concluir liberação).
- O upload de mídia binária não foi realizado via conector GitHub; o arquivo entregue anteriormente está disponível como download no chat para usuário incluir no mesmo branch.

**Decisão:** NO-GO; merge não executado. Para retomar: (1) colocar asset aprovado no branch, (2) aferir geometria/proporção e sentido dos carrinhos nos quatro marcos (Lapa, Raimundo, Rio Tietê, Pirituba), (3) verificar 16 entradas e controles em LVR, (4) resolver checks relevantes, (5) apenas então merge e verificar Vercel READY.
**Rollback:** base main anterior `5bed3e058d67e29821af55c46b870c83e40e97f5`; a branch permanece isolada. Não converter aceitação visual de uma imagem gerada em confirmação de alinhamento da imagem publicada.

## 31/10/2026 — Asset novo presente; homologação geométrica ainda pendente
- Confirmação Github: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Lapa_Pirituba_atualizado.webp` existe na branch (blob `08f49013d7c3077cb56eefb3adb81aff174baf96`), imagem 1452×1083.
- HTML do simulador atualizado para esse asset (commit `62556738178a967a82a0a12630a72a2cc69603c2`), proporção CSS corrigida para 1452/1083; `viewBox 1200 849` permanece como coordenada relativa do SVG; fallback anterior mantido.
- Inspeção de composição raster + paths originais `19` e `20`: traço laranja acompanha corredor geral com discrepâncias; linha azul tem **desvio visível no trecho final de Lapa**, incluindo zigue-zagues sobre área fora do corredor da imagem. Ponto confirmado por prévia `inspecao_alinhamento_mapa_528.png` em conversa; não considerar `verified:true`.
- O WEBP aprovado possui linhas azuis/laranjas já pintadas nos pixels; overlay SVG acrescenta novamente traços, podendo produzir duplicidade visual, especialmente em trechos fora de coincidência.
- **NO-GO para merge até corrigir a geometria/correspondência de ambos os vetores com o mapa e realizar teste LVR e navegador.** Não inventar ruas nem fazer merge apenas por arquivo presente.
- Rollback rastreável: commit pré-troca HTML `4b25d427c2504a4caf52ee1c180b53228531c798`, arquivo original `Complexo_Lapa_Pirituba_trajeto1.webp` preservado.

## 01/11/2026 — Validação visual efetiva do mapa atualizado (NO-GO)

- Usuário pediu validação das duas rotas animadas antes do merge.
- Arquivo de imagem no GitHub: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Lapa_Pirituba_atualizado.webp`, blob `08f49013d7c3077cb56eefb3adb81aff174baf96`, dimensões **1452×1083**.
- HTML da branch: aponta para esse WebP, viewport `aspect-ratio:1452/1083`, SVG ainda `viewBox=0 0 1200 849` com `preserveAspectRatio=none`.
- Inspeção reproduzida em Python/CairoSVG: duas paths atuais extraídas das páginas 19/20 do `routes-verified.json` renderizadas sobre a **imagem atualizada** na mesma viewport do navegador; arquivo de evidência `/mnt/data/auditoria_sobreposicao_svg_mapa528.png` no ambiente da conversa (não incorporado ao repo).
- Convenção da evidência: magenta = página 19 Lapa→Pirituba; verde = página 20 Pirituba→Lapa. As linhas foram desenhadas **sem** o pequeno offset adicional da função `separateSharedSegments`, então a divergência demonstrada é estrutural, não eliminável só pelo offset de faixas.
- Achado: na parte norte, há desvio lateral; na Av. Raimundo Pereira de Magalhães, alinhamento parcial; na curva inferior, divergência; no trecho final `Pirituba→Lapa` há segmentos inteiros fora da rota azul desenhada na imagem. A base publicada pretendida representa o novo complexo, e não deve ser inferida a partir da Ponte do Piqueri.
- **Decisão NO-GO. Não executar merge da PR #528.** Corrigir vetores separados do mapa-base preservando a lógica dos sentidos e o pequeno afastamento lateral; depois gerar nova sobreposição, validar percurso completo e testar controles pelo LVR.
- O `verified:false` de páginas 19 e 20 permanece justificável; não afirmar precisão geométrica com base apenas em parecer visual.

## 01/11/2026 — Recalibração dos dois sentidos para o WebP aprovado

- Eliminada dependência do `routes-verified.json` (páginas 19/20) no simulador dual: carrega `src-greenn/complexo-lapa-pirituba/duplo/routes-duplo.json` com caminhos visualmente recalibrados e `viewBox 0 0 1452 1083`.
- Imagem em teste: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Lapa_Pirituba_atualizado.webp` (1452×1083; arquivo presente no branch), que representa o corredor gráfico do projeto via a nova ponte; não inferir trajeto da Ponte do Piqueri.
- Dados do legado `routes-verified.json` dos demais 15 percursos não foram alterados.
- Direções: página lógica 19 laranja Lapa→Pirituba (início no canto inferior direito), 20 azul Pirituba→Lapa (início superior esquerdo); ambos percorrem mesma referência de corredor ao contrário, separados visualmente por normais de até 4 unidades de cada lado no trecho coincidente.
- SVG e imagem usam agora as mesmas dimensões lógicas, `1452×1083`, sem deformação por razões divergentes. Zoom/pan/pinch preservados.
- Inspeção visual: comparado raster e traçado suavizado em resolução nativa, corrigida curva da Lapa; evidência de trabalho local `/mnt/data/calibracao_svg_lapa_pirituba.png`. Inspeção inicial automatizada por máscara de tinta apontou mediana de 2px e p90 de 14,2px até qualquer tinta azul/laranja do mapa, incluindo regiões com interferência de rótulos. Esses números são apenas diagnóstico aproximado; **não prova que linha corresponde à via real**.
- Não se alegou validação de execução em navegador; comportamento dinâmico de controles e renderização LVR continuam sem teste automatizado real nesta sessão. Paths ainda marcados `verified:false` até aceite visual do usuário.
- GO técnico parcial para novo ensaio LVR: conferir direção, carrinhos lado a lado sem cruzar, regiões Lapa/av. Raimundo/Tietê/Pirituba, zoom 3×, duas camadas e seletor 1–16. Merge permanece condicionado a esse gate, sem publicação automática.
- Rollback: arquivos originais preservados; voltar o HTML/duplo a commit `62556738178a967a82a0a12630a72a2cc69603c2` se necessário (antes da recalibração).

## 01/11/2026 — Correção estrutural do retorno Pirituba → Lapa
- Causa: arquivo `duplo/routes-duplo.json`, path 20, era reverso idêntico do path 19; isso contraria a página 20 do documento original, que apresenta conversões independentes no entorno da Lapa.
- Commit `0d7f82e0aa38668f03445622fff4b15518f34a13`: caminho 20 independente e experimental baseado nas conversões da página 20; path 19 e imagem aprovados preservados.
- Inspeção estática do caminho candidato sobre o WebP `Mapa_Lapa_Pirituba_atualizado.webp` mostra boa coincidência no corredor compartilhado, **mas diferenças expressivas no trecho final da Lapa**, pois a figura de fundo mostra principalmente a linha direta e não as manobras próprias do retorno. Não certificar geografia, nem automatizar merge.
- Evidência visual gerada na conversa: `/mnt/data/inspecao_rota_azul_retorno.png` (linha magenta tracejada = caminho candidato 20; não corresponde a cor azul de produção).
- Próximo gate: confrontar manobras com PDF página 20 e visual no LVR. Não fazer `verified:true` nem publicar enquanto o retorno estiver divergente.

## 01/11/2026 — Fundo v7 selecionado para PR #528 (sem merge)

- Asset enviado pelo usuário e verificado no GitHub: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Trajeto_Lapa_Pirituba-7.webp` (blob `c9bfb0b545e7f7034527010882f2e5e5b8bc9fec`, dimensão 1456×1088).
- HTML `duplo/index.html` atualizado para usar arquivo v7 com cache-busting `?v=c9bfb0b5`; imagem e CSS aspect ratio atualizados para 1456×1088; erro de carregamento é explícito. Commit HTML `085a77e2af3bd6438b202dad858fde6f870cba5d`.
- Trajetórias SVG existentes preservadas em `routes-duplo.json` com `viewBox 1452×1083`; como o raster novo tem quase a mesma proporção, a transformação CSS compartilha frame, mas **não houve prova cartográfica de alinhamento pleno**. Pontos e curvas da Lapa precisam de inspeção LVR.
- Check estático: URL, asset existente, dimensões, seletor/iframe e JSON verificados. Teste dinâmico de movimento, zoom/pan e ausência de desvios não executado em navegador nesta sessão.
- Impedimento de GO: `verified:false` permanece nos caminhos e usuário precisa conferir retorno Pirituba→Lapa no LVR. Não confundir novas etiquetas numeradas na arte com validação de geometria do retorno.
- Rollback do fundo: restaurar `Mapa_Lapa_Pirituba_atualizado.webp?v=08f49013` no HTML e dimensão 1452×1083; manter asset v7 armazenado. Produção não alterada.

## 01/11/2026 — Dual Ayrton Senna ↔ Pirituba (candidato, NÃO liberado)

- Solicitação: reutilizar `Mapa_Trajeto_Lapa_Pirituba-7.webp`, consolidar Ayrton Senna → Pirituba e Pirituba → Ayrton Senna numa única opção dual.
- Divergência dos nomes anteriores: item 2 era Ayrton Senna→Pirituba (PDF p.21), item 3 Ayrton Senna→Lapa (PDF p.22) e item 7 Pirituba→Ayrton Senna (PDF p.25). Para **não apagar a rota distinta da página 22**, reunimos páginas 21+25 e retiramos somente a entrada duplicada da página 25. O seletor mostra 15 opções, sendo a segunda `Ayrton Senna ↔ Pirituba` e a terceira `Ayrton Senna → Lapa`.
- Novo `src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html`: simulador dual com controles existentes, cores laranja/azul, zoom/pan/pinch, badge de não homologado e mesmo WebP. Exibido por iframe `?embed=1` na página principal.
- Novo `src-greenn/complexo-lapa-pirituba/duplo-ayrton/routes-ayrton.json`: candidatos das páginas 21 e 25 do `routes-verified.json` transformados linearmente de 1200×849 a 1456×1088, `verified:false`. **Escala geométrica não equivale a alinhamento cartográfico**. Não afirmar que os carrinhos seguem a via correta na nova figura sem inspeção.
- O título presente no raster ainda diz `Lapa ↔ Pirituba` porque o usuário solicitou reaproveitar o mesmo mapa; necessidade potencial de subtítulo overlay ou tratamento visual não cartográfico na revisão.
- Não alterar `routes-verified.json` nem o primeiro dual; nenhum merge ou publicação autorizada.
- Gate para GO: testar no LVR as duas direções nas páginas 21/25 e provar alinhamento real com vias/acessos ao usar o mesmo WebP; revisar se a imagem é adequada para rota Ayrton Senna↔Pirituba. Corrigir arquivos candidatos isolados se necessário, mantendo rollback via PR.

## 01/11/2026 — Ayrton Senna ↔ Pirituba: retorno às pranchas originais após reprovação LVR
- Usuário reprovou sobreposição de caminhos nas imagens ilustradas: os vetores das páginas 21 e 25 foram apenas escalados e ficaram completamente fora.
- Remediação em `src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html`: **dois visores separados no mesmo item de catálogo**, utilizando exclusivamente `assets/rota-21.jpg` e `assets/rota-25.jpg` com `viewBox 0 0 1200 849`, um carrinho animado por visor e cores laranja/azul; ambos compartilham reprodução/pausa e reinício, mas têm zoom/pan independentes. São duas imagens porque as pranchas não são a mesma base cartográfica.
- Os caminhos são carregados diretamente das páginas 21 e 25 do `routes-verified.json`; **sem transposição, sem inversão, sem deslocamento lateral artificial**. Todos permanecem `verified:false` até cotejo das linhas impressas do PDF no LVR.
- O primeiro dual Lapa↔Pirituba, demais opções e imagens aprovadas permanecem inalterados. O item de catálogo 2 continua agrupando os dois sentidos.
- `duplo-ayrton/routes-ayrton.json` antigo permanece como registro histórico de candidatos transpostos, mas **não é carregado pelo novo visor**.
- Gate de aceite: verificar que cada JPG carrega, carro e traçado seguem a linha original inclusive acessos/retornos, pausa/reinício, zoom e toque mobile; depois definir se os visores permanecem separados ou se haverá georreferenciamento real para unificá-los.
- **Sem merge** até validação, rollback pelo commit anterior à alteração `a9f3057029c0f83a09617951831af84b8e4d6776`.

## 01/11/2026 — Corrigido para LVR: um mapa, dois destinos a partir da Ayrton Senna
- Pedido mais recente do usuário prevalece sobre descrição anterior de retorno. **Amarelo = Ayrton Senna→Pirituba (PDF página 21, com rotatória); azul = Ayrton Senna→Lapa (PDF página 22, desvio próprio, sem espelhar a página 21)**.
- `duplo-ayrton/index.html` reimplementado conforme o simulador do trajeto 1: **um só WebP**, um SVG com duas linhas/carrinhos, pausa/reinício e zoom/pan/pinch até 3×, identidade Tegra amarela.
- Novo mapa é `assets/Mapa_Ayrton_Senna_Pirituba_1.webp`, blob `9c6343e05a3c227ae9918f41d21c181f549a674d`, dimensões 1451×1084; fundo original do trajeto 1 permanece intocado.
- `duplo-ayrton/routes-ayrton.json` agora armazena **duas geometrias independentes, páginas 21 e 22**, escaladas das pranchas SPObras do `routes-verified.json` para o novo raster. Essa escala é **apenas candidata e não valida a aderência viária**, sobretudo a rotatória e o acesso alternativo à nova ponte.
- Catálogo corrigido para 15 opções: item 2 agrupa páginas 21+22; página 25 Pirituba→Ayrton Senna preservada como item individual. O item Ayrton Senna→Lapa separado foi retirado para evitar duplicidade.
- Checagem estática via GitHub confirmou asset, dois paths distintos, um IMG, dois carros, dimensões e URLs. A execução efetiva em navegador do LVR **ainda depende do usuário**; não alegar alinhamento final. Não mergear.
- Gate LVR: conferir o sentido amarelo, rotatória e saída; conferir azul via acesso distinto à Av. Raimundo; confirmar que separação visual não altera cruzamentos, alternância, zoom e pause. Fazer ajuste manual vetorial se o SVG não estiver sobre as pistas.
- Rollback: PR isolada; restaurar o conteúdo de `duplo-ayrton/index.html` e `routes-ayrton.json` do estado anterior ao commit `c1de206032125f093ee2e4c5854cb030e5ff08b2` e o catálogo se necessário.
