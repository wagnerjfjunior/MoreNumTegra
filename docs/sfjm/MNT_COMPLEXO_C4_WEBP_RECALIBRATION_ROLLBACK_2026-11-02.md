# Scenario 4 Figure 2 WebP recalibration — rollback checkpoint

Before recalibration, preserve **head of feature branch** as the rollback anchor; current HTML blob SHA: `2944a5376dcc96c9d308004978e7dc0d3fe70211`. Current committed routes from `routes-verified.json` are left unchanged. Only the index.html scenario 4 runtime paths should be replaced for the new fixed image plane (1500x1049).

Rollback procedure: restore `src-greenn/complexo-lapa-pirituba/index.html` from the feature branch state immediately before the recalibration commit, then rerun SFJM/LVR on the same branch. No merge or production deploy is authorized here. The preceding working WebP version can be tested separately.

Safety: Do not touch simulator 1, 2, 3, hero, catalog, route source data, or other site pages. Geometry on new WebP requires user LVR inspection. The environment cannot guarantee exact road alignment by code syntax alone.

## Modo de calibração por coordenadas — commit 5d02349d
Usuário reportou todos os quatro trajetos desalinhados sobre o WebP. Adicionado painel exclusivo do cenário 4 para capturar pontos diretamente sobre o SVG na base 1500×1049, com seleção de quatro fluxos, desazer, limpar e exportar JSON. Nenhuma geometria de animação foi alterada nesta etapa, nem os simuladores 1–3. Retorno seguro: reverter somente o commit do modo calibrador, preservando a imagem WebP; para retornar ao estado pré-recalibração, recuperar o HTML anterior ao commit d0859ac8. A calibração capturada requer aceite antes de substituir paths. Sem autorização de merge ou produção.

## 03/11/2026 — Traçados capturados implementados — commit `301f4f60872ea4d7dfd7df760a7351dec6ea27a9`
Usuário descartou expressamente a primeira coleta e forneceu novo JSON com quatro sequências para `Mapa_Figura2_Pirituba_Piqueri_Ayrton_Senna.webp`, viewBox `0 0 1500 1049`. Aplicados paths `M/L` (sem interpolação), por ordem e sentido das coordenadas fornecidas: Pirituba→Piqueri 37 pontos, Pirituba→Ayrton 42, Marginal superior 14, Marginal inferior 17; total 110. Preservados 8+8+8+8 veículos, períodos e animação. Removida apenas dependência desnecessária da rota 26 para animar Ayrton no cenário 4. Os cenários 1–3 permanecem sem alterações. Scripts verificados sintaticamente (5 OK); alinhamento real e navegação LVR ainda aguardam inspeção do usuário.

Rollback específico do ajuste por coordenadas: restaurar o HTML do blob `a076ec43522dd8fbbf25ce7a2b2f6d2a1e4b035a` (estado imediatamente ANTERIOR ao commit `301f4f60`), mantendo o WebP, o calibrador e a PR #538. Não publicar, fazer merge ou modificar os outros cenários sem aceite.

## 03/11/2026 — correção responsiva do quarto mapa
Commit `b396f56e8e89b554ca94e7dc998ae5b852b5cc5e`: aplicada proporção real de imagem 1500×1049 especificamente no cenário 4, consistente com o SVG `viewBox="0 0 1500 1049"`. Removida a influência da proporção antiga 1200×849 no quarto cenário. Sem mudanças nos 110 pontos, geometria, contagem de carros ou nos 3 simuladores anteriores. Rollback pontual: restaurar HTML blob `982859f12728f85f9ac3524d51d7dd2cd3e9556f` do commit anterior à correção. Testes sintáticos 5/5; responsividade em navegadores/dispositivos reais pendente de verificação no LVR. Sem merge ou produção.
