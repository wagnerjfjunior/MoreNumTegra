# Quarto cenário unificado — PR #538
Data 02/11/2026. Versão em branch não publicada.

O usuário solicitou quarto cenário Pirituba → Piqueri / Ayrton Senna sobre a prancha-base 25 do documento SPObras 2019. A implementação modifica apenas a página mãe `src-greenn/complexo-lapa-pirituba/index.html`; mantém rotas individuais originais 25 e 26 em `routes-verified.json` sem alterações.

Implementado: caminho 25 em azul principal com 8 carros; caminho 26 em azul-claro com 8 carros; 16 veículos neutros em dois fluxos ambiente na Marginal Tietê, rotas ilustrativas adaptadas à escala 1200x849. Um seletor único do cenário e 13 opções totais (de 14). A matriz de cores por origem ainda é proposta não aplicada aos três simuladores anteriores.

Validação: sintaxe de scripts e contagem de itens da lista OK. Não há QA de navegador, comparação visual SVG na base 25, ou certificação de posição dos 16 carros de ambiente: exige LVR e aceite do usuário. Não publicar. Rollback: reverter os commits do quarto cenário, preservando as pranchas 25/26 individuais aprovadas.
