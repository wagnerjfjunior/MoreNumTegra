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
