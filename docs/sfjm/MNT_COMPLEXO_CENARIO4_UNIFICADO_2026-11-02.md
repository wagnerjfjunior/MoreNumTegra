# Quarto cenário unificado — PR #538
Data 02/11/2026. Versão em branch não publicada.

O usuário solicitou quarto cenário Pirituba → Piqueri / Ayrton Senna sobre a prancha-base 25 do documento SPObras 2019. A implementação modifica apenas a página mãe `src-greenn/complexo-lapa-pirituba/index.html`; mantém rotas individuais originais 25 e 26 em `routes-verified.json` sem alterações.

Implementado: caminho 25 em azul principal com 8 carros; caminho 26 em azul-claro com 8 carros; 16 veículos neutros em dois fluxos ambiente na Marginal Tietê, rotas ilustrativas adaptadas à escala 1200x849. Um seletor único do cenário e 13 opções totais (de 14). A matriz de cores por origem ainda é proposta não aplicada aos três simuladores anteriores.

Validação: sintaxe de scripts e contagem de itens da lista OK. Não há QA de navegador, comparação visual SVG na base 25, ou certificação de posição dos 16 carros de ambiente: exige LVR e aceite do usuário. Não publicar. Rollback: reverter os commits do quarto cenário, preservando as pranchas 25/26 individuais aprovadas.

## Aceite visual do usuário — 02/11/2026
O usuário confirmou que **os dois trajetos do quarto cenário estão OK**, embora o alinhamento do caminho Pirituba → Ayrton Senna permaneça ligeiramente deslocado: "ficou um pouco fora mas está ótimo assim, os trajetos estao ok". Aceite cobre a composição Pirituba → Piqueri / Ayrton Senna, sem autorizar outros ajustes de geometria, merge ou publicação. Baseline de código de referência: commit `fdd484c598d3a2607453a85368fb248d8e459f4d`. Preservar integralmente Pirituba → Piqueri e o caminho secundário aprovado, os oito carros por rota e os 16 carros do tráfego ambiente. Não interpretar o aceite como certificação geográfica ou de navegação.

## 02/11/2026 — Figura 2 WebP no cenário 4 (gate de aceite)
Upload confirmado na branch: `src-greenn/complexo-lapa-pirituba/assets/Mapa_Figura2_Pirituba_Piqueri_Ayrton_Senna.webp` (SHA blob `d8a0985430733479c3020e6af30afd55737c3bad`). O HTML passou a priorizar este WebP no quarto cenário com fallback para `rota-25.jpg`. Código commit `f0861770da5affcda67449ede5b295b4d95b7f4c`. SVGs, carros e velocidades não alterados nesta atualização. **Pendente:** validar no LVR alinhamento real entre a imagem ilustrada e os paths; caso a imagem não corresponda à geometria, não promover para produção. A curva inferior de tráfego ambiente segue não homologada. PR #538 sem autorização de merge ou deploy neste aceite.
