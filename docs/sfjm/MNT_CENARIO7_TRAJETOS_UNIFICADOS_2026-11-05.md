# SFJM — Cenário 7: trajetos unificados e coleta SVG — 05/11/2026

## Autoridade e escopo
- Branch: `feat/complexo-prancha-condominios-lapa-20261104`. Nenhum merge ou deploy autorizado.
- Nomenclatura dada pelo usuário: **Lapa → Ayrton Senna / Condomínio Anastácio**.
- Cenário 8 anterior foi consolidado na opção 7; sem duplicação no seletor principal.
- Imagem-base compartilhada existente no GitHub: `src-greenn/complexo-lapa-pirituba/assets/Complexo-Lapa-Tietê-Percurso-Completo-v1.png`.
- Editor específico para trajetos: `src-greenn/complexo-lapa-pirituba/cenario7-trajetos/index.html`, aberto pelo iframe da opção C7 em `src-greenn/complexo-lapa-pirituba/index.html`.
- Editor original de nove polígonos imobiliários mantido em `cenario7-editor/index.html`. JSON original `docs/sfjm/data/cenario7-implantacao-coordenadas-2026-11-04.json` não modificado.

## Trajetos para o usuário mapear no LVR
1. `lapa_ayrton` — Lapa → Ayrton Senna.
2. `lapa_bosques` — Lapa → Bosques da Lapa.
3. `saida_parques` — Saída Parques da Lapa.
4. `saida_pracas` — Saída Praças da Lapa.
5. `lapa_quintas` — Lapa → Quintas da Lapa.

Os dois trajetos de saída são independentes apesar de terem sido mencionados juntos no item 3 do pedido. Destinos dos trajetos de saída permanecem NÃO DEFINIDOS até coleta/confirmação do usuário, portanto sem extrapolar nomes.
Não há coordenadas de carros nem de trajetos pré-fabricadas neste commit.

## Contrato de coleta
- A prancha carrega a resolução intrínseca e atribui viewBox correspondente ao SVG.
- Seleção de um entre cinco trajetos, iniciar/pausar, adicionar pontos em sequência origem → destino por pointer, desfazer último ponto, limpar somente trajeto selecionado, visualizar cinco trilhas simultâneas.
- Botões Copiar JSON e Baixar JSON exportam as cinco listas de pontos e nome da imagem; estado somente na sessão atual, sem salvamento remoto.
- Cores da coleta são indicadores editoriais provisórios. Cor canônica para origem Lapa é laranja; as duas saídas ainda exigem origem/semântica finais antes da implementação de carrinhos.
- Mostrar lotes SVG é opcional e disponível somente se a resolução original 1448×1086 for mantida; se imagem nova tiver dimensões diferentes, desabilitar a referência histórica para não alegar calibração falsa.
- Mapa principal e seis simuladores existentes não tiveram geometrias, mídias ou animações alteradas.

## Homologação e rollback
1. Selecionar branch no SFJM/LVR.
2. Abrir `http://localhost:8080/complexo-lapa-pirituba/` e selecionar o sétimo cenário.
3. Confirmar título, nova prancha, cinco opções, toque/pontos/linhas e exportação JSON. Não afirmar teste LVR concluído apenas pelo commit.
4. Conferir que opções C1–C6 continuam íntegras; conferir que cenários posteriores preservaram nomes e respectivas páginas (após a remoção da opção 8 duplicada).
5. Enviar o JSON exportado para validação geométrica, e só então desenvolver rotas animadas/carros.
6. Rollback: restaurar HTML principal anterior ao commit de integração e remover arquivo novo do editor em commit separado, preservando o editor de implantação e a prancha-base.

## Bloqueios
Sem merge/deploy; sem gerar rotas de carros automaticamente; sem alterar polígonos aprovados, C1–C6, planta original, ferrovias, tráfego ambiental ou identidade visual.

## 05/11/2026 — Primeiro trajeto capturado: Lapa → Ayrton Senna, animação candidata ao LVR

- Usuário forneceu `sfjm-cenario7-trajetos.json`; **35 pontos** de `lapa_ayrton` preservados sem alteração na ordem e sem novas coordenadas, `viewBox=0 0 1448 1086`, base `Complexo-Lapa-Tietê-Percurso-Completo-v1.png`.
- Cópia documental fiel da coleta em `docs/sfjm/data/cenario7-trajetos-coleta-2026-11-05.json`, com outras quatro rotas vazias.
- Editor `src-greenn/complexo-lapa-pirituba/cenario7-trajetos/index.html` agora pré-carrega a rota 1, usa a matriz cromática por **origem Lapa: laranja `#FF5F00`**, substituindo a cor provisória `#F08C29` apenas na apresentação do trajeto 1.
- Oito carros simultâneos, espaçados por distância proporcional ao comprimento do path SVG, usando modelo já presente no simulador duplo: carroceria `20 × 36`, `rx=7`, contorno branco, **dois vidros** em `y=-11` e `y=5`. Movimento por `getPointAtLength()`, rotação tangente conforme a direção dos pontos, repetição em 28 s; sem geometria inventada.
- O percurso é reproduzido automaticamente após carregar uma base `1448×1086`; botão **Pausar carros / Reproduzir Lapa → Ayrton Senna (8 carros)**. Coleta SVG desliga a animação para permitir novos pontos. Quando pausados, os carros ficam ocultos, não acumulados em `0,0`.
- As outras quatro opções permanecem disponíveis para coleta; não possuem carro, trajeto inventado nem alteração de pontos.
- Auditoria técnica: HTML/JavaScript alterado somente no editor C7; JavaScript submetido a verificação sintática V8 **PASS**. **Ainda sem QA visual em navegador/LVR**; verificar alinhamento, sentido, dois vidros, comportamento de play/pause e responsividade.
- Preservados a prancha, o arquivo original de polígonos imobiliários, os seis simuladores anteriores, seus trens e carros. Nenhum merge ou deploy.
- Rollback isolado: reverter commits do editor do C7 e manter o JSON original para nova homologação.

## 05/11/2026 — Segunda rota coletada integrada: Saída Parques da Lapa

- O usuário coletou o segundo trajeto cronologicamente, **Saída Parques da Lapa** (`saida_parques`), embora permaneça denominado `3A` na numeração editorial original da seleção.
- Foram preservados **37 pontos** no mesmo `viewBox 0 0 1448 1086` da prancha `Complexo-Lapa-Tietê-Percurso-Completo-v1.png`, sem interpolação ou geometria fabricada.
- `src-greenn/complexo-lapa-pirituba/cenario7-trajetos/index.html`: rota pré-carregada, visível no SVG e animável independentemente com 8 carrinhos de dois vidros, mesmo desenho dos carros do primeiro trajeto.
- Cor **provisória** da coleta `#D7A44D`; não declarar como cor canônica de origem até aprovação. O trajeto Lapa → Ayrton Senna segue intacto com 35 pontos e laranja canônico `#FF5F00`.
- Dois botões separados para pausar/reproduzir os veículos sem reinicializar o outro percurso; animação automática de ambos no carregamento da prancha se a imagem medir 1448×1086.
- Dados atualizados em `docs/sfjm/data/cenario7-trajetos-coleta-2026-11-05.json`: **35 + 37 pontos**. Outros três continuam vazios.
- QA: integração confirmada no código do GitHub; **teste visual LVR e calibração real pendentes**. Validar direção da rota Saída Parques, cor desejada, contagem/vidros dos carros, não interferência com a primeira rota, pausa individual, responsividade e exportação dos dois conjuntos de pontos.
- Não houve merge/deploy, nem alteração nas demais pranchas ou cenários 1–6.
