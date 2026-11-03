# Prancha 5 — Reutilizar Figura 2 aprovada no quarto cenário (03/11/2026)

**Escopo:** usar a MESMA imagem WebP já aprovada e publicada no cenário 4 como imagem-base da opção 5 (Marginal Pinheiros → Pirituba, página 27), evitando reconstrução geográfica e reilustração. SVG da rota 5 ainda não foi capturado e **não deve ser inventado**.

**Branch:** `feat/complexo-prancha5-marginal-pirituba-20261103` baseada em `main` após merge PR #538. **Rollback:** Git `main` anterior à branch é a referência. Os arquivos antigos permanecem em `main`; descartar branch ou reverter exclusivamente seus commits restaura o cenário anterior.

**Arquivos alterados:** somente `src-greenn/complexo-lapa-pirituba/index.html`. Na opção 5 (idx 4/page 27), `setMapImage()` carrega `Mapa_Figura2_Pirituba_Piqueri_Ayrton_Senna.webp` de `src-greenn/complexo-lapa-pirituba/assets`. Fallback continua `rota-27.jpg`. Mantém proporção 1500×1049 e viewBox correspondente. Painel privado temporário `c5CalPanel` captura cliques, desfaz, limpa e exporta JSON `marginal_pinheiros_pirituba` para o usuário fornecer. Não acrescentar o caminho até o aceite de coordenadas no LVR; **remover o painel antes da publicação**, preservando o código de calibrador arquivado em `docs/sfjm/MNT_CALIBRADOR_REUSO_PRANCHA5_2026-11-03.md`.

**Verificações de código:** 5 blocos JavaScript compilados sintaticamente; responsividade e toque ainda dependem de teste LVR. Não modificar os quatro primeiros cenários, não fazer merge ou deploy sem autorização específica.
