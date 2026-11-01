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
