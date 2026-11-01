# SFJM — MoreNumTegra · Complexo Lapa–Pirituba · Mapa editorial Ayrton Senna (01/11/2026)

## Escopo e governança
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`; branch LVR: `feat/complexo-duplo-carrinhos-zoom-lvr-20261031`; PR #528 (DRAFT). Nenhum merge autorizado nesta etapa.
- Diretório: `src-greenn/complexo-lapa-pirituba/`; página: `index.html`; segundo simulador: `duplo-ayrton/index.html`; paths do segundo simulador: `duplo-ayrton/routes-ayrton.json`.
- Aprovação LVR anterior: item 2 com **prancha 21 JPG original** e 2 animações SVG. Esse aceite **não** valida usar os mesmos SVGs sobre uma ilustração diferente.
- Escopo: novo tratamento editorial do mapa do segundo simulador; primeiro dual Lapa↔Pirituba preservado.

## Linha do tempo e decisões técnicas do segundo simulador
1. Inicialmente tentado o mesmo mapa WebP do simulador 1 (`Mapa_Trajeto_Lapa_Pirituba-7.webp`) para caminhos Ayrton/Pirituba. Teste LVR falhou por desalinhamento; rejeitada transposição cartográfica por escala.
2. Testado uso de duas imagens separadas `rota-21.jpg` e `rota-25.jpg`; usuário rejeitou interface com dois slides.
3. Definidas rotas corretas com **origem comum na Ayrton Senna e dois destinos distintos**: amarelo = Ayrton Senna → Pirituba (prancha 21, utiliza rotatória), azul = Ayrton Senna → Lapa (prancha 22, acesso próprio para a nova ponte, não inverte o amarelo).
4. Reconstruído segundo simulador com mapa único `rota-21.jpg`, `viewBox 0 0 1200 849`, 2 SVGs, dois carrinhos, zoom/pan/pinch, controles; foram retirados segmentos inválidos da rotatória amarela e construído caminho azul independente por marcos viários.
5. Usuário testou e aprovou visualmente a versão sobre a **prancha original 21**. O seletor segue com 15 itens; item 2 agrega páginas 21/22, página 25 permanece catálogo individual.
6. Nova frente **EXCLUSIVAMENTE VISUAL**: transformar base cinza em fundo bege claro, parques verdes, água azul, ruas cinza claras, badges padronizados azuis de borda branca, mantendo elementos viários. A imagem produzida por IA é **ilustração não cartográfica**; revisão da rotatória, da ponte e de acessos deve partir do documento original.
7. Shopping Tietê Plaza: primeira tentativa de badge posicionou POI errado; usuário marcou um terreno triangular a oeste da rotatória, a noroeste da Marginal Tietê; foi inserida ilustração caricata do shopping **dentro do triângulo** e badge azul compacto `Tietê Plaza Shopping`.
8. Usuário marcou em vermelho a nova ponte sobre Rio Tietê e, em verde, os segmentos norte e sul da Av. Raimundo Pereira de Magalhães. Arte final traz badge `Ponte Lapa-Pirituba` ligado à ponte, mais **dois badges** `Ac. Raimundo Pereira de Magalhães` ligados aos dois trechos (note grafia na arte `Ac.`, conforme resultado gerado). Nesta documentação, a via é **Av. Raimundo Pereira de Magalhães**; não confundir os badges de referência com instrução de conversão.
9. Arte aceita pelo usuário: `a_polished_colorful_infographic_style_road_map_s.png` no ambiente de trabalho. Gerado WebP **1500×1049**, quality 92, `Mapa_Ayrton_Senna_Pirituba_SFJM_20261101.webp`, ~238KB, entrega para download na conversa.
10. Mudança GitHub de frontend: `duplo-ayrton/index.html` aponta para `assets/Mapa_Ayrton_Senna_Pirituba_SFJM_20261101.webp` e executa fallback controlado a `assets/rota-21.jpg` enquanto o WebP novo não existir no repo; `?mapa=original` exibe mapa original imediatamente. Quando a nova arte carregar, **oculta SVG e carrinhos para evitar trajetos falsos** até a geometria ser recalibrada. Não alterar `duplo-ayrton/routes-ayrton.json` com escala simples.

## Dependência técnica e próximos passos
- **BINÁRIO NÃO ENVIADO** automaticamente ao GitHub: a integração GitHub disponível nesta sessão somente aceita conteúdo UTF-8. Usuário deverá fazer upload manual do WebP baixado para `src-greenn/complexo-lapa-pirituba/assets/Mapa_Ayrton_Senna_Pirituba_SFJM_20261101.webp` **na branch da PR #528**. Não afirmar que está no repo ou que foi publicado.
- Depois do upload: validar HTTP, dimensões reais (1500×1049) e os badges, sem inventar metadados. O mapa novo substitui visualmente o antigo no preview, mas a animação fica oculta até recalibração dos dois paths.
- Recalibração precisa mapear geometrias da prancha 21 e 22 para a ilustração em pontos homólogos (rotatória, acesso Av. Raimundo, nova ponte, curvas e extremos), vetores independentes, separação visual apenas nos trechos efetivamente compartilhados. O desenho novo reduz detalhes e pode não representar fielmente todas as vias necessárias. Se não for cartograficamente apto, manter o JPG original com SVG para o simulador funcional e usar o WebP em seção editorial não animada.
- O 1º simulador `duplo/index.html` fica intocado. Não publicar nem mergear PR #528 sem novo GO do usuário, QA de mobile, animação, geometria, segurança de fallback e rollback.

## Critérios de aceite
- [x] Arte aprovada visualmente no chat.
- [x] WebP gerado localmente, entregue para download.
- [x] Código de preparação e fallback commitado na PR #528.
- [ ] WebP binário incluído na branch Github pelo usuário.
- [ ] Teste de carregamento da arte no LVR.
- [ ] Recalibração geométrica SVG para a ilustração (ou decisão de reservar SVG apenas à prancha original).
- [ ] Aceite de animações nas duas rotas e QA de mobile.
- [ ] Autorização explícita de merge/produção.

## Riscos de conteúdo
- Imagem ilustrativa feita por IA: pequenos textos, badges e geografia podem divergir do original. Verificar nome do empreendimento e badge `Ponte Lapa-Pirituba`; não confundir com Ponte do Piqueri.
- Arte pode mostrar título `AYRTON SENNA -> PIRITUBA` embora a segunda animação tenha destino Lapa. Para página dual, usar título de UI correto, ou gerar arte sem título específico após validação.
- Factualmente as rotas ilustram projeto SPObras 2019; não representam status atual de tráfego/operação.

## 01/11/2026 — Correção do fallback / mapa ainda aparecia como prancha 21
- Usuário enviou efetivamente o binário em `assets/Mapa_Ayrton_Senna_Pirituba_3.webp`, blob GitHub `35ebd5abac2040274fe13e75eea0f2f20f0f4ae5`. **Não** usou o nome planejado `Mapa_Ayrton_Senna_Pirituba_SFJM_20261101.webp`.
- Causa-raiz: HTML buscava o nome planejado inexistente, então o manipulador `error` executava fallback para `rota-21.jpg`, que continuava visível no LVR.
- Correção na PR #528: referências do `<img>`, `approvedArt` e detector `currentSrc` no `duplo-ayrton/index.html` apontam agora para **`Mapa_Ayrton_Senna_Pirituba_3.webp`**. Fallback da prancha 21 continua só para erro real ou modo `?mapa=original`.
- Limite relevante: ao carregar o novo WebP, o código ainda **oculta o SVG e os carrinhos** para evitar sobreposição enganosa com paths homologados exclusivamente na prancha 21. O próximo passo é validar o carregamento e depois decidir ajuste geométrico/uso editorial separado. Não alegar que as animações já foram recalibradas.
- NÃO fazer merge; obter novo teste LVR (sincronizar branch/recarregar a página e escolher opção 2).

## 01/11/2026 — SVGs invisíveis no WebP _3: correção para novo LVR
- O usuário informou: novo mapa carrega mas linhas e carrinhos não aparecem.
- Causa confirmada no frontend: `updateMapMode()` executava `svg.hidden=newArtActive` + `display:none` de maneira intencional, porque paths da prancha 21 não encaixavam na ilustração.
- Nova solução implementada em branch de homologação: **dois conjuntos de caminhos independentes**. `duplo-ayrton/routes-ayrton.json` intacto e exclusivo para `rota-21.jpg`; novo `duplo-ayrton/routes-ayrton-art.json` com `viewBox 0 0 1500 1049` e duas rotas **candidatas manuais** sobre `Mapa_Ayrton_Senna_Pirituba_3.webp`. O HTML ajusta `viewBox` e usa os paths de acordo com o raster efetivamente carregado.
- SVG visível no WebP, com 2 carros e controles pré-existentes. Amarelo segue rumo a Pirituba pela porção superior da rotatória; azul deriva para Lapa pelo acesso independente e nova ponte. Não inverter os caminhos. Linhas da ilustração não foram validadas no navegador ainda, `verified:false`.
- Atenção: o WebP é uma ilustração cartográfica modificada com IA. Os vetores dessa arte foram construídos por inspeção visual e ainda demandam validação de curva, sentido, início/fim, passagem pela rotatória, acesso para ponte e proximidade dos badges. **Aceite LVR anterior da prancha 21 não transfere aprovação para o novo conjunto.**
- Teste LVR: sincronizar branch e abrir opção 2 no `/complexo-lapa-pirituba/`; alternar cores, pausa, zoom. Comparar com `/src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html?mapa=original` para conferir a geometria anterior.
- Sem merge/produção antes de GO. Rollback dos paths da arte: excluir `routes-ayrton-art.json` e restaurar o HTML anterior ao commit `a6900633010a821ee7be2d291c34d7059fa71435`.

## 01/11/2026 — Simplificação LVR: remover zoom dos dois simuladores
- Decisão explícita do usuário: zoom prejudica a visualização. Remover botões `+`, `−`, reset, centralização e comportamento de zoom/pan em desktop e mobile.
- Implementado na branch da PR #528 em `duplo/index.html` (Lapa↔Pirituba) e `duplo-ayrton/index.html` (Ayrton Senna→Pirituba/Lapa): removidos controles do DOM, listeners de wheel/pointer/pinch/teclado e transformações de zoom. `touch-action: pan-y` mantém a rolagem vertical natural no mobile.
- Mapas permanecem responsivos por CSS, com IMG e SVG no mesmo enquadramento sem transformação espacial. Carrinhos SVG, dois sentidos, pausas, reinício, checkboxes e rota original `?mapa=original` são preservados.
- Sem alterações nos JSONs dos caminhos, imagens, escala de geometria ou no primeiro item do catálogo além da remoção do zoom.
- Critério LVR: rolagem mobile fluida, nenhum zoom por roda ou pinça, nenhum botão de zoom, duas linhas e carros visíveis e sincronizados, reprodução/reinício funcionais. PR Draft; sem merge.

## 01/11/2026 — Terceiro simulador: Lapa → Marginal Pinheiros (SPObras, prancha 23)
- Usuário aprovou operação de mapas sem zoom e solicitou avançar ao terceiro percurso usando `src-greenn/complexo-lapa-pirituba/assets/rota-23.jpg`.
- Imagem original `rota-23.jpg` confirmada no GitHub (SHA blob `19bc0fbd7aab25e0eb9e1d2151ae0392839c8450`), visualmente inspecionada; a linha ciano oficial começa na Lapa na parte inferior direita, atravessa o eixo central da nova ponte rumo ao norte, circunda parcialmente a rotatória e sai à esquerda rumo à Marginal Pinheiros.
- Criado `src-greenn/complexo-lapa-pirituba/lapa-marginal/index.html` com **imagem original única** em 1200×849, SVG sobreposto carregado diretamente do caminho **23** do `routes-verified.json`, um único carrinho, play/pause, reiniciar, exibir/ocultar e **sem zoom/pan/pinch**. Respeita redução de movimento, não altera caminhos das opções 1 e 2.
- Integração na terceira posição do seletor em `src-greenn/complexo-lapa-pirituba/index.html` por iframe `#marginalEmbed`; restante do catálogo e dos dois duais preservado.
- Cor ciano provisória `#089ACA` para destino Marginal Pinheiros, pois a convenção cromática do usuário define apenas **destino Pirituba = laranja #FF5F00** e **destino Lapa = azul #137CF1**. Não atribuir uma dessas duas cores a um destino diferente sem decisão.
- `routes-verified.json["23"].verified=false`: geometria candidata. Não confundir traço vetorial com traçado geograficamente homologado. Gate LVR: imagem correta, curva na saída da Lapa, via da nova ponte, passagem próxima da rotatória e derivação final para Marginal Pinheiros; carro orientado pelo sentido, mobile/responsivo e controles. Sem merge ou publicação até aceite.

## 01/11/2026 — Correção da rotatória do trajeto 3: Lapa → Marginal Pinheiros
- Usuário apontou por captura com marcação vermelha que a linha e o carrinho estavam tangenciando a rotatória no lado norte da nova ponte, em vez de realizar um laço.
- Alterado **somente** `routes-verified.json["23"].d`: trecho inicial desde Lapa até a subida da ponte preservado, substituído trecho de topo após `Q 393 259 385 227` por curvas cúbicas que entram pela base/lado direito da rotatória, sobem pelo arco leste, contornam o arco superior e oeste e saem pela alça para a Marginal Pinheiros em direção esquerda. Ponto de saída mantido `L 271 207` em coordenadas originais `1200×849`.
- Novo trecho: `C 380 214 377 206 378 201 C 385 193 386 181 379 173 C 373 165 362 163 353 169 C 343 175 341 188 347 196 C 340 200 326 201 312 201 Q 291 204 271 207`.
- A geometria permanece **`verified:false`**: requer observação em LVR com mapa `rota-23.jpg` para avaliar aderência à linha impressa e movimento do carro sem corte ou salto na rotatória.
- `lapa-marginal/index.html` não precisou de alteração: o mapa e carrinho já consomem `routes-verified.json` por `fetch`; demais rotas, legendas e duais intocados. PR #528 continua Draft, sem merge.
