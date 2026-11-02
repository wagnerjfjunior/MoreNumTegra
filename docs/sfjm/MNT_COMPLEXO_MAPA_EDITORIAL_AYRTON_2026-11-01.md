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

## 01/11/2026 — Ajuste cirúrgico 2 no SVG da rota 23
- Orientação explícita do usuário: **o SVG deve seguir apenas a linha tracejada azul original da prancha 23**, sem engenharia de percurso conjectural.
- Alterado exclusivamente o sufixo da geometria `routes-verified.json["23"].d` em `viewBox 0 0 1200 849`, desde `Q 393 259 385 227`. O arco foi reduzido e reposicionado para acompanhar melhor o círculo tracejado em torno de (363,184) e sair à esquerda sobre o tracejado; nenhuma outra rota ou raster alterado.
- `verified:false`; demanda aceite visual no LVR, com atenção à aderência do carrinho na rotatória e na saída para a Marginal Pinheiros. PR Draft; não mergear.

## 01/11/2026 — Rota 23: sentido do laço corrigido esquerda → direita
- Usuário especificou a causa-raiz do erro anterior: o carro percorria a circunferência da direita para a esquerda; o sentido requerido do círculo é **entrar pela esquerda, percorrer em direção à direita e depois sair rumo à Marginal Pinheiros**.
- Ajustado somente o sufixo de `routes-verified.json["23"].d` desde `(385,227)`, deslocando a entrada ao lado esquerdo `(352,198)`, seguindo pelo arco superior até a direita `(379,187)` e saindo pelo arco inferior à esquerda `(338,202)` em direção a `(271,207)`. Não alterado o trajeto anterior sobre a ponte nem outros itens.
- Estado permanece `verified:false`: conferir linha tracejada e orientação do carrinho em LVR. Sem merge.

## 01/11/2026 — Rota 23 aprovada no sentido; alinhamento fino -6 px
- Usuário confirmou que **o sentido e o laço agora estão corretos** e solicitou apenas deslocar a linha ligeiramente para esquerda para coincidir com o tracejado ciano impresso da prancha 23.
- Ajuste isolado no `lapa-marginal/index.html`: `<g id="route23Alignment" transform="translate(-6 0)">` envolve **halo, path SVG e carrinho**. Move-os juntos 6 unidades à esquerda no sistema 1200×849, sem alterar geometria nem sentido do laço.
- Não foi modificado o JSON `routes-verified.json`, que preserva os pontos da versão aprovada, facilitando rollback; nenhum outro trajeto afetado.
- Gate LVR: conferir aderência da linha ao tracejado, especialmente rotatória e via da ponte, em desktop e mobile. O valor -6 pode ser refinado após comparação visual. Sem merge.

## 01/11/2026 — Opção 4: Pirituba → Marginal Pinheiros, prancha 24 + cores por destino
- Confirmação usuário: prancha 23 = Lapa→Marginal Pinheiros (opção 3, deslocamento -6px aprovado); prancha 24 = Pirituba→Marginal Pinheiros (opção 4).
- Inspecionada `assets/rota-24.jpg` (blob `e66996e0aca8373dac1ebbdeaf591013bb8e8c09`). Imagem original mostra partida em Pirituba (ponto 355,167), descida pelo corredor oeste e saída à esquerda para Marginal Pinheiros (aprox. 403,456). Não confundir esta rota com o balão da opção 3.
- Criado `pirituba-marginal/index.html` (um mapa JPG SPObras 1200×849, um carrinho, linha ciano, controls play/pause/reset/exibir, sem zoom). Conectado em `index.html` como `#piritubaMarginalEmbed` apenas para opção 4; opções 1–3 preservadas.
- `routes-verified.json["24"]` suavizado com curvas cúbicas sobre a linha pontilhada da prancha 24, `verified:false`; sua aderência geométrica ainda exige teste LVR.
- **Padrão visual obrigatório por DESTINO:** Pirituba `#FF5F00`; Lapa `#137CF1`; Marginal Pinheiros `#089ACA` (ciano mantido nos dois percursos 3 e 4). Alterados `duplo/index.html`, `duplo-ayrton/index.html` para aplicar hexadecimal exato à linha, legenda, swatch e carro. O `index.html` genérico agora calcula cor da rota de acordo com o destino e aplica inline aos SVGs e marcador. **Não** mudar a cor Tegra `#EBB92E` usada nos botões.
- Gate LVR: validar Pirituba→Marginal Pinheiros acompanhando pontilhado original, curvas de saída e destino; cor do carrinho/linha e legibilidade; opções 1/2 cores exatas; opção 3 deslocamento -6px preservado. Sem merge/produção até GO.

## 01/11/2026 — REVISÃO que prevalece: item 3 une pranchas 23/24 em um só mapa
- Pedido expresso: não manter duas opções separadas para Marginal Pinheiros. **Item 3 = Lapa / Pirituba → Marginal Pinheiros**, com dois percursos de origens diferentes e **destino comum**, um único slide e um único raster base `assets/rota-23.jpg`, retirando a antiga opção 4 do seletor. Total do catálogo = **14 opções**.
- Código novo `marginal-duplo/index.html` e `marginal-duplo/routes-marginal.json`: 1 imagem 1200×849; 1 SVG; 2 caminhos e 2 carrinhos independentes, controles reproduzir/pausar/reiniciar/ocultar por sentido, mobile responsivo, sem zoom/pan/pinch.
- **Azul `#137CF1` identifica origem Lapa → Marginal Pinheiros** e preserva rigorosamente o `d` da página 23 já aprovado pelo usuário, inclusive o laço correto e o deslocamento visual `translate(-6 0)`. **Laranja `#FF5F00` identifica origem Pirituba → Marginal Pinheiros**, reconstruída manualmente pelo corredor e acesso da prancha 24 para coordenadas equivalentes na imagem da prancha 23; `verified:false` até LVR. As duas cores nesta tela identificam **ORIGENS** para distinguir as rotas de mesmo destino, uma exceção explícita à regra habitual de cores por DESTINO. Não declarar genericamente que Lapa ou Pirituba são os destinos deste item.
- A prancha 24 tem enquadramento diferente da 23. Não usar transformações de escala linear nem afirmar geometria exata sem teste LVR: avaliar início em Pirituba, descida do corredor, derivação antes/ao lado da rotatória, encontro com saída para Marginal, sobreposição de carros nos trechos compartilhados e se existe necessidade de afastamento visual limitado.
- `src-greenn/complexo-lapa-pirituba/index.html` agora tem `routePages=[19,21,23,25,...,35]`, `routeNames` com 14 títulos; iframe único `#marginalDualEmbed` da opção 3. Antigos simuladores individuais `lapa-marginal/` e `pirituba-marginal/` não foram apagados (rollback, sem acesso no catálogo).
- Não modificar versões aprovadas dos itens 1 e 2, nem `routes-verified.json` original; a geometria candidata do item 3 está isolada em JSON próprio. Sem merge ou produção até novo teste LVR da opção 3.

## 01/11/2026 — Terceiro simulador: arte FINAL fornecida pelo usuário, sem redesenho
- Usuário rejeitou as imagens de interfaces completas geradas por IA e forneceu pessoalmente `mapa padrao Lado Pirituba.png`. A orientação vinculante é **utilizar EXATAMENTE esse mapa** no percurso 3, sem alterar geometria, posições de vias/ponte/rotatória, shopping e badges.
- A imagem fornecida foi convertida localmente a WebP 1500×1049, ~255 KB: `Mapa_Padrao_Lado_Pirituba_Trajeto3.webp`. Nome alvo no repo: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Padrao_Lado_Pirituba_Trajeto3.webp`.
- **Upload binário GitHub pendente**: conector GitHub usado nesta conversa suporta criar/atualizar UTF-8, não o arquivo de imagem. Disponibilizar WebP ao usuário para colocação manual na mesma branch de homologação; não alegar que já está no repo.
- Preparada referência em `marginal-duplo/index.html` à arte editorial. Em caso de erro de carregamento (até upload), fallback automático para a imagem original `rota-23.jpg`. `?mapa=original` sempre seleciona a versão original.
- **SVG e animação da nova imagem ainda NÃO calibrados.** Quando o WebP carregar, HTML oculta temporariamente o SVG antigo da prancha 23 e desabilita controles de animação, para não simular um trajeto falso. Na versão original, os SVGs aprovados permanecem integralmente funcionais, inclusive offset -6 px no trajeto desde Lapa.
- Próximo gate: após upload, validar visualmente a nova arte no LVR, então mapear pontos homólogos e produzir SVGs específicos em coordenadas 1500×1049 (laranja origem Pirituba; azul origem Lapa), testando antes de ativar. Não transformar a geometria da prancha 23 apenas por escala. Caso o mapa editorial não preserve geometria suficiente, utilizar como figura de referência sem animação.
- Preservados simuladores 1 e 2, catálogo com 14 opções, PR #528 Draft, sem merge.

## 01/11/2026 — Ativação dos dois SVGs sobre mapa editorial do trajeto 3
- Confirmado no GitHub asset real `src-greenn/complexo-lapa-pirituba/assets/Mapa_Padrao_Lado_Pirituba_Trajeto3.webp`, blob `37f8b9004d551c85aeb09d03527391c30a1fbb56`.
- Criado `marginal-duplo/routes-marginal-editorial.json`, com **dois paths candidatos desenhados no próprio sistema `1500×1049` da arte editorial**, sobrepondo carro azul desde Lapa via nova ponte/rotatória e carro laranja desde Pirituba ao acesso da Marginal Pinheiros. As cores são `#137CF1` (origem Lapa) e `#FF5F00` (origem Pirituba), conforme convenção visual desta opção 3; o destino é o mesmo.
- Alterado somente `marginal-duplo/index.html`: detecção do raster efetivamente carregado, ajuste do `viewBox`, seleção entre JSON original e editorial, exibição do SVG, animação e toggles. **Quando a imagem editorial carrega, os dois carrinhos são ativados** e a geometria original não é modificada.
- `?mapa=original` preserva `routes-marginal.json` e deslocamento aprovado `-6` do azul, em `viewBox 1200×849`; no mapa novo o deslocamento -6 NÃO é copiado.
- **NÃO declarar alinhamento aprovado**: paths editoriais foram estimados por inspeção visual de vias e da rotatória; precisam de teste LVR para corrigir laço, acesso a Marginal, transições, início/fim e proximidade dos veículos. `verified:false` para ambos. Nunca editar o JPG nem o WebP para acomodar SVGs.
- O primeiro e segundo simuladores, os outros itens e a produção permanecem intactos. PR #528 continua DRAFT, sem merge.

## 01/11/2026 — Atualização dos badges de título nas artes 2 e 3 (PR #528)
- Usuário disponibilizou e confirmou upload na branch dos arquivos `assets/Mapa_Ayrton_Senna_Pirituba_Badge2.webp` (blob `2e692b273773d7ed3d3b5e4356e86c138668a03e`) e `assets/Mapa_Lapa_Pirituba_Marginal_Badge3.webp` (blob `d27340dcadacc665ac1f0f92ea2151410e4ce543`).
- Opção 2: título previsto para o badge do canto superior direito `2. Ayrton Senna → Pirituba / Lapa`; `duplo-ayrton/index.html` passou a usar o novo WebP em IMG, variável `approvedArt` e detector `currentSrc`.
- Opção 3: título previsto `3. Lapa / Pirituba → Marginal Pinheiros`; `marginal-duplo/index.html` passou a usar o novo WebP em IMG, variável `editorial` e detector `currentSrc`.
- Mantidas as medidas 1500×1049, geometrias SVG/JSON, cores, animações e fallback `?mapa=original`. Não foram alterados os simuladores 1 nem o catálogo.
- Gate LVR: validar se os dois novos badges possuem texto exato, sem cortes ou sobreposição, e se os dois conjuntos de carros continuam alinhados. Nenhum merge/autorização de produção.

## 01/11/2026 — Terceiro simulador: tráfego ambiente nos dois sentidos + autoplay sem controles
- Pedido do usuário: preservar os dois carros principais (Lapa azul `#137CF1`, Pirituba laranja `#FF5F00`) e acrescentar **carros menores em trânsito nos dois lados da Marginal Tietê**, com movimentos opostos. Não desenhar linhas de trajetória em nenhum dos casos; remover controles de reprodução e seletores, animação sempre em movimento e com loop automático.
- Aplicado apenas a `marginal-duplo/index.html` (opção 3). Mapa `Mapa_Lapa_Pirituba_Marginal_Badge3.webp`, badges e SVGs de `routes-marginal-editorial.json` e `routes-marginal.json` **inalterados**.
- Os `path` dos dois trajetos continuam no DOM para computar coordenadas dos carros, mas estão invisíveis no CSS (`.halo,.route{stroke:none;visibility:hidden}`). Carrinhos principais permanecem visíveis e seguem o mesmo loop de 15,5s.
- Adicionados **8 carros pequenos em duas vias da Marginal Tietê** sobre a arte editorial, 4 por sentido, em cinza/branco/bege para não confundir com as cores das rotas principais. Os caminhos de tráfego ambiente são independentes e invisíveis, só para animação, **não representam dados de trânsito reais**.
- Removidos DOM e handlers de botões `play`/`restart` e checkboxes de mostrar/ocultar. Um único `requestAnimationFrame` anima carros principais + tráfego; `visibilitychange` interrompe processamento em aba oculta e reinicia quando retorna; `prefers-reduced-motion` exibe posição estática por acessibilidade.
- Em `?mapa=original` os dois carros principais também executam autoplay sem linhas e sem controles; tráfego ambiente só aparece no mapa editorial, porque o desenho de pistas é exclusivo da arte 1500×1049.
- **Gate LVR**: verificar se as 2 linhas principais desapareceram, se os 2 carros permanecem no traçado correto, se os 8 veículos menores passam nas duas margens sem atravessar o Rio Tietê, se as direções são opostas, se não cobrem badges e se o loop não trava nem causa sobrecarga mobile. Se houver desvio de pista, ajustar apenas os caminhos invisíveis `bands` do trânsito ambiente.
- PR #528 Draft, sem merge ou publicação.

## 01/11/2026 — Ajuste solicitado: 8 carros azuis e 8 laranjas na Marginal Tietê
- A solicitação "8 carros de cada" foi aplicada como **16 carros adicionais**: oito azuis `#137CF1` numa pista/sentido, oito laranjas `#FF5F00` na pista oposta, além dos **dois carrinhos principais** azul e laranja. Total de 18 veículos virtuais no mapa editorial.
- Correção de regressão: `marginal-duplo/index.html` volta a renderizar **linhas SVG principais** `.halo` e `.route` com contorno branco e traços azul/laranja. Apenas guias invisíveis dos carros extras permanecem sem `stroke`.
- Auto-loop, sem botões nem zoom; movimento espalhado ao longo dos corredores por `phase=i/8` e pequenas variações de período. Mapa `Mapa_Lapa_Pirituba_Marginal_Badge3.webp` e ambos JSONs de geometria não foram modificados.
- Validar no LVR: 8 carros em cada lado/sentido, cores, colisões visuais com vias/badges, linhas principais legíveis e carrinhos sem saltos. Tráfego é ficcional/ilustrativo, sem dados reais. Nenhum merge autorizado.

## 01/11/2026 — Correção definitiva de distribuição de veículos da prancha 3
- Usuário rejeitou tráfego ambiente azul/laranja: carros no **corredor da Marginal Tietê** devem ser somente **pretos, vermelhos ou cinzas**; seus guias invisíveis permanecem sem linha desenhada. Mantidos **16 carros ambiente** no total (8 por sentido).
- Além disso, **8 carros azuis devem percorrer a própria linha SVG azul** (Lapa → Marginal Pinheiros) e **8 carros laranjas devem percorrer a linha SVG laranja** (Pirituba → Marginal Pinheiros), com respectivas linhas principais visíveis. Isto significa **32 veículos em cena (8 azuis + 8 laranjas + 16 ambiente)** quando o mapa editorial está ativo; não confundir com o arranjo anterior.
- Implementado em `marginal-duplo/index.html`: um carro original + sete clones por percurso, distribuídos ao longo de cada path com `phase=index/8` e ciclo compartilhado de 22,5 s. Posicionamento e orientação via `getPointAtLength`, atualizado no mesmo `requestAnimationFrame` de todos os carros. Clones anteriores são removidos ao recalcular/alternar mapa para evitar duplicação; rotas no JSON não foram editadas.
- Cores do ambiente apenas `#24272c`, `#c73434`, `#777f87`, `#3d4247`, `#b92f2e`, `#90969c`. Paths auxiliares `stroke:none`, linhas SVG originais preservadas, autoplay, loop, sem controles/zoom.
- Gate de aceite no LVR: conferir se os 8 veículos azuis percorrem a curva/ponte pela linha azul, se os 8 laranjas percorrem a linha laranja, se os 16 carros ambiente estão nas pistas da Marginal em dois sentidos (sem atravessar água), sem congestionamento visual excessivo ou stutter mobile. Não afirmar validação visual sem teste. PR #528 segue Draft e produção não é alterada.

## 01/11/2026 — Ajuste geométrico da curva e faixas paralelas junto ao Tietê Plaza
- Usuário definiu sentido **Pirituba → Marginal Pinheiros** para SVG laranja; fazer curva suave próxima à rotatória para acessar a Marginal, **sem vértice**, e manter a ordem espacial da margem próxima ao shopping até a curva: 1) SVG laranja (mais próximo do shopping); 2) SVG azul, paralelo e sem cruzamento com o laranja; 3) caminho invisível do trânsito ambiente, mais externo. Do outro lado do rio, preservar os carros ambiente no sentido inverso.
- Ajustadas **somente geometrias candidatas** no `marginal-duplo/routes-marginal-editorial.json`: trajetos 23 (azul) e 24 (laranja), preservando a subida original pela ponte e a descida de Pirituba, alterando curvas de ligação e tramo final paralelo junto ao shopping até a saída à Marginal.
- Ajustada a primeira guia invisível de trânsito em `marginal-duplo/index.html` para contornar o shopping e deixar corredores sequenciais ao longo da Marginal. Segunda guia (margem oposta) inalterada. Total de **8 carros azuis na linha azul, 8 laranjas na linha laranja, 16 preto/vermelho/cinza no trânsito ambiente**, autoplay sem controle e badges/mapa inalterados.
- **PENDENTE ACEITE NO LVR**: verificar orientação dos carros na curva laranja, afastamento em relação à rota azul, via correta sob o shopping (sem passar dentro do terreno) e guia dos carros neutros afastada das vias principais; não declarar geometria ou engenharia homologada. Restauração via versão anterior dos arquivos no histórico Git. PR #528 Draft, nenhum merge.

## 01/11/2026 22h — Curva encurtada e guias do tráfego conforme captura anotada no LVR
- Evidência: captura de tela anexada com linhas ciano representando o corredor imaginário dos carros na Marginal. Usuário pediu reduzir a curva perto da rotatória para que SVG azul e laranja não se cruzem, e seguir o desenho imaginário do trânsito em ambas as margens.
- Em `marginal-duplo/routes-marginal-editorial.json`, reajustada conexão laranja com raio/curva Bézier menor e sem ponta junto à rotatória, rumo Pirituba → Marginal Pinheiros, deixando a conexão azul na pista paralela e abaixo (mais próxima do rio). Não editados origem, subida da ponte ou a imagem WebP. Continuam paths candidatos, `verified: false`.
- Em `marginal-duplo/index.html`, curvas invisíveis do tráfego ambiente norte/sul adaptadas para acompanhar as curvas de acesso à Marginal indicadas em ciano, com 8 carros ambiente por sentido em preto/vermelho/cinza (linhas não desenhadas).
- Mantidos: 8 carros azuis sobre SVG azul visível + 8 carros laranjas sobre SVG laranja visível, loop automático sem controles nem zoom; 16 carros ambiente, total 32 veículos. Proibido fundir SVG na imagem base.
- **Aceite pendente no LVR**: confirmar se no exato trecho próximo à rotatória houve eliminação dos cruzamentos, se as curvas correspondem às pistas e se a guia ciano de referência fica dentro da via. Correções pontuais de coordenadas somente depois de inspeção; nenhum merge/produção.

## 01/11/2026 — Correção de escopo: NÃO alterar SVG azul ou sentido da rotatória
- Usuário identificou intervenção indevida na rota azul e mudança no sentido da rotatória. Regra explícita: **azul não pode ser alterado**; **sentido da rotatória é imutável**. Único pedido admissível neste ajuste: suavização localizada da curva da **rota laranja**.
- Em `marginal-duplo/routes-marginal-editorial.json`, restaurada **identicamente** a string `23.d` azul da versão histórica canônica anterior às intervenções `10935974b3b8e85718adf1b83f24d1f0c3513b37`. Comparação textual exata confirmou igualdade.
- Laranja `24.d` também restaurada da mesma referência, **exceto por dois comandos Bézier junto à curva da rotatória**: `C 618 470 620 478 615 485 C 604 494 584 484 565 482` → `C 618 470 621 476 617 482 C 613 488 590 484 565 482`. Isso preserva todos os segmentos restantes, a ordem de pontos e o sentido de circulação, reduzindo o vértice na transição.
- Não modificado o HTML, mapas, layout, número de carros, guias auxiliares de tráfego ou JSON da prancha original. **Novo teste visual LVR obrigatório**, sem afirmar que já está homologado. PR #528 Draft; produção intacta.

## 01/11/2026 — Correção pontual da curva laranja e via inferior
- Conforme capturas LVR 22h21 e 22h23, encurtada exclusivamente a curva do SVG laranja 24.d, eliminando a extensão até x608–617, preservando o restante do percurso e seu sentido.
- SVG azul 23.d mantido integralmente, sem alteração em rotatória ou JSON original.
- Guia invisível do trânsito inferior movida para o lado sul do Rio Tietê, com curva mais acentuada de acesso, sem editar a guia superior, contagens e cores dos veículos.
- Validação visual pendente: confirmar encaixe exato da curva ciano e ausência de carros sobre o rio. PR #528 Draft, sem merge.

## 01/11/2026 — Implementação 32 carros no simulador 2; carro maior no simulador 3

**Solicitação explícita:** executar no próprio GitHub/MoreNumTegra, sem transferência de tarefa a outra ferramenta. PR #528 segue Draft.

- **Simulador 3:** modificados somente os `<g id="car23">` e `<g id="car24">` em `marginal-duplo/index.html`: corpo 20×36 (`x=-10 y=-18 rx=7`), dois retângulos brancos por carro (`14×8` e `14×7`). Os sete clones de cada percurso herdam a geometria e o desenho. **Não alterados os paths SVG, guia invisível dos 16 veículos, mapa, badges, cores, autoplay ou demais parâmetros da baseline visual aprovada.** Este é um ajuste de apresentação posterior à baseline `158e23a8`, sujeito a novo teste LVR.
- **Simulador 2:** em `duplo-ayrton/index.html`, acrescentada camada SVG independente `trafficLayer` com **16 veículos ambiente** (8 em cada margem da Marginal Tietê), guias invisíveis editoriais idênticas às do simulador 3, mesma dimensão 10×20 e paleta de preto/vermelho/cinza `#24272c`, `#c73434`, `#777f87`, `#3d4247`, `#b92f2e`, `#90969c`. Guias só aparecem na arte 1500×1049 para evitar projeções erradas no JPG técnico original.
- **Simulador 2, carros de percurso:** **8 laranjas** no path 21 (Ayrton Senna→Pirituba) e **8 azuis** no path 22 (Ayrton Senna→Lapa), incluindo o carro original de cada rota e sete clones SVG, igualmente espaçados com `phase=i/8`, autoloop de 22,5s. Cor/forma grande original 20×36 e **dois para-brisas brancos**. Rotas SVG originais e lógica de separação de trechos preservadas; não alterar rotatória ou orientação.
- **Simulador 2, controles:** botões de pausar/reiniciar removidos; autoplay, ciclo contínuo com um único `requestAnimationFrame`, desligamento ao ocultar aba e respeito a `prefers-reduced-motion`. Seletores de exibir percurso e paradas informativas preservados.
- **Contagem editorial por simulador:** 8 azuis + 8 laranjas + 16 neutros = **32 carros**. Não há informação de tráfego em tempo real; visualização ilustrativa.
- **Verificação GitHub:** arquivos atualizados na branch e inspeção estática de oito carros por rota, paleta, ausência de controles e SVGs. **Teste visual LVR continua pendente** para garantir que o fluxo do simulador 2 acompanha as pistas e não atravessa shopping/água; não confundir inspeção estática com homologação.
- **Rollback seguro:** restaurar somente `duplo-ayrton/index.html` e/ou `marginal-duplo/index.html` da baseline imediatamente anterior ao ajuste, sem reverter dados de rotas ou todo o repositório. **Não fazer merge/publicação sem autorização.**

## 01/11/2026 — Simulador 1 com 32 veículos (novo candidato LVR)
- Pedido: adicionar carros ao item 1 (Lapa ↔ Pirituba), reutilizando padrão dos simuladores 2 e 3: 8 laranjas Lapa → Pirituba, 8 azuis Pirituba → Lapa e 16 carros neutros (8 por margem/sentido da Marginal Tietê), em loop automático.
- Implementação confinada ao `src-greenn/complexo-lapa-pirituba/duplo/index.html`. Inserida camada `trafficLayer` com 2 guias invisíveis **específicas da imagem do simulador 1 (1452×1083)**; não copiadas coordenadas dos outros mapas. Carros de trânsito com o mesmo tamanho 10×20 e paleta preto/vermelho/cinza dos simuladores 2/3.
- Cada carro principal original 20×36 com 2 para-brisas brancos é mantido, mais 7 clones por rota, fases `i/8`, sem editar o JSON `duplo/routes-duplo.json` ou os caminhos. SVGs principais seguem visíveis; controles de reprodução removidos, alternância de exibição das rotas e camada de paradas preservadas; autoplay/autoloop com `requestAnimationFrame`, pausa em aba oculta e respeito à preferência de movimento reduzido.
- **QA visual LVR ainda pendente**: validar alinhamento das duas guias dos carros da Marginal nos dois lados do Rio Tietê (evitar rio e bairros), direção, rotas principais, 32 veículos, mobile e badges. Não reivindicar aceite, nem merge/publicação.
