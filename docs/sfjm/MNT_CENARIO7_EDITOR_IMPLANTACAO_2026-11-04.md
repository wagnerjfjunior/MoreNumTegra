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
