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
