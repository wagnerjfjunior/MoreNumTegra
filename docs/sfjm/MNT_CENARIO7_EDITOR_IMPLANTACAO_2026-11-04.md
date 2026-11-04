# SFJM — Cenários 7+8 — editor de implantação editorial — 04/11/2026

## Estado e escopo
- Branch de edição: `feat/complexo-prancha-condominios-lapa-20261104`, criada a partir de `feat/complexo-unificacao-pranchas-2-3-4-5-20261103`.
- Não houve merge nem deploy.
- Imagem aprovada como base de marcação: `src-greenn/complexo-lapa-pirituba/assets/Mapa Ilustrado-Pirituba–Lado-Lapa.png`; blob verificado `3e1946d4171ee087749558e4370d6e6f9ef63a75`.
- A imagem original não foi modificada. Editor novo: `src-greenn/complexo-lapa-pirituba/cenario7-editor/index.html`.
- Entradas 7 e 8 do catálogo apontam ao mesmo calibrador editorial, sem alterar códigos dos cenários C1–C6.
- O editor obtém `naturalWidth/naturalHeight` da imagem e define viewBox SVG dinâmico: não presumir dimensões sem inspeção. Marcação via SVG `getScreenCTM().inverse()`, não coordenadas aproximadas por CSS.
- Nenhuma rota de carro criada; polígonos são somente áreas propostas para edição posterior.
- Exportar JSON completo por botão Copiar JSON/Baixar JSON, antes de recarregar a página. O editor não persiste os pontos automaticamente.

## Nove marcações, nesta ordem
1. `quintas` — condomínio Quintas da Lapa, quatro torres paralelas à Raimundo Pereira de Magalhães.
2. `homeclub` — Home Club existente na esquina Fortunato Ferraz x Raimundo Pereira de Magalhães, referência a preservar.
3. `jerivas` — primeiro retângulo junto ao Home Club.
4. `reserva` — segundo retângulo junto ao Jerivás.
5. `elo_duo` — nova posição na extremidade do terreno.
6. `garden_design` — volume L invertido, atrás do Nova Vivere.
7. `nova_vivere` — volume L da frente com base paralela à Fortunato Ferraz.
8. `stand_vendas` — Stand de Vendas Caminhos da Lapa.
9. `remover_area_exercito` — ilustração indevida de prédio a apagar para recuperar área verde do Exército.

## Homologação LVR e proteção
- Abrir `http://localhost:8080/complexo-lapa-pirituba/` com branch acima e escolher Cenário 7.
- Conferir imagem correta, todas as ruas e quarteirões completos, sem recorte; selecionar cada item, iniciar marcação, tocar perímetro, pausar, desfazer, limpar, exportar.
- Verificar que o cenário 8 abre o mesmo editor.
- Não confundir polígonos propostos com aprovação final de localização dos condomínios. Usuário validará coordenadas e implantação antes de edição raster.
- Preservar todos os seis cenários anteriores, especialmente C6 homologado pelo usuário. Sem produção sem nova autorização.
- Rollback de código desta fase: restaurar `src-greenn/complexo-lapa-pirituba/index.html` da branch origem e remover o diretório novo `cenario7-editor/`, em commit de reversão isolado.
- QA visual LVR ainda pendente. O sucesso do commit GitHub não comprova carregamento da imagem ou funcionamento no navegador.

## 04/11/2026 — coleta de coordenadas recebida e nome do cenário 7
- O usuário definiu a nomenclatura: **Lapa → Ayrton Senna / Condomínios Anastácio**. O índice 6 (sétima opção) do seletor principal foi atualizado; o índice 7 (oitava opção) continua abrindo o mesmo editor, preservando a unificação editorial.
- JSON fornecido pelo usuário integralmente registrado em `docs/sfjm/data/cenario7-implantacao-coordenadas-2026-11-04.json`, com 9 itens, 49 pontos, base `Mapa Ilustrado-Pirituba–Lado-Lapa.png` e `viewBox 0 0 1448 1086`.
- Auditoria geométrica em leitura: os 9 itens têm pontos; polígonos das 8 outras áreas são válidos; **stand_vendas** apresenta autointerseção/anomalia de fechamento do contorno nos pontos `[265,847]` e `[265,849]`. Preservados os pontos enviados sem correção automática. Confirmar visualmente no LVR antes de usar como máscara definitiva.
- Alguns polígonos terminam próximos, mas não exatamente no primeiro ponto; SVG `polygon` fecha automaticamente. Não acrescentar coordenadas fictícias.
- Os polígonos representam localização editorial marcada pelo usuário, não geometria definitiva de torres: desenho final ainda depende de inspeção/aceite. Nenhuma edição raster ou rota de carros efetuada.
- Branch de trabalho isolada; sem merge/deploy.

## 04/11/2026 — overlay de conferência não destrutivo
- SVG transparente com os nove polígonos e 49 pontos originais do usuário: `src-greenn/complexo-lapa-pirituba/cenario7-editor/implantacao-marcacoes.svg`.
- Visualização para comparar com a imagem original, sem modificar pixels, vias, edifícios ou cenários C1–C6: `src-greenn/complexo-lapa-pirituba/cenario7-editor/conferencia.html`.
- Testar no LVR em `/complexo-lapa-pirituba/cenario7-editor/conferencia.html`, verificando carregamento da imagem PNG e botão de mostrar/ocultar overlay. Caso LVR use roteamento diferente, verificar acesso ao mesmo arquivo pela árvore `src-greenn`.
- Área 8 `stand_vendas` permanece com polígono autointersectante; não usar como máscara de edição até revisão visual. A tela de conferência sinaliza o alerta.
- O GitHub confirmou a existência e blob do PNG, mas o conector não disponibilizou os bytes do PNG. Sem QA visual browser nesta etapa, e sem reconstrução da prancha via gerador de imagens.
- Não houve merge nem deploy. Próxima etapa: confirmar posições em LVR e só então criar versão editada da imagem em arquivo separado.

## 04/11/2026 — correção de acesso LVR, sem rota nova
- Usuário reportou `404 - SFJM LVR local file not found` ao tentar acessar `/complexo-lapa-pirituba/cenario7-editor/conferencia.html`.
- Causa identificada no roteamento: `vercel.json` só declara rewrite de `/complexo-lapa-pirituba/` para o HTML principal, e não da subrota de conferência. A URL previamente anunciada não era comprovada no LVR.
- Correção minimalista: botão **Mostrar/Ocultar 9 áreas coletadas** incorporado diretamente em `cenario7-editor/index.html`, que já é carregado como iframe do cenário 7 na página principal conhecida `/complexo-lapa-pirituba/`. SVG da sobreposição permanece separado e em resolução 1448×1086. Não foi alterado `vercel.json`, nem o HTML dos cenários 1–6, nem imagem, rotas ou polígonos.
- Teste pendente: selecionar branch LVR e abrir somente `/complexo-lapa-pirituba/` → cenário 7; verificar botão dentro do editor. Não usar a subrota `/complexo-lapa-pirituba/cenario7-editor/conferencia.html` como URL certificada.
