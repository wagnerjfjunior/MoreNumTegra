# SFJM — Cluster editorial Ponte Pirituba–Lapa, 02/11/2026

## Decisão
Usar `www.moretegra.com.br` como domínio. Página raiz `/complexo-lapa-pirituba/` vira hub de informações; três simuladores existentes são um recurso interativo complementar, sem mudança de geometria/animadores ou volume de carros.

## URLs novas na branch
- `/complexo-lapa-pirituba/previsao-entrega/`
- `/complexo-lapa-pirituba/projeto/`
- `/complexo-lapa-pirituba/acessos-trajetos/`
- `/complexo-lapa-pirituba/obras/`

Todas começam `noindex,follow` para avaliação editorial e mobile antes de indexação. Não inserir no sitemap antes de QA. `vercel.json` recebe rewrites específicos. O hub recebe links HTML sem alterar os iframes SVG.
Conteúdo pautado em informações oficiais com links de origem: Prefeitura 18/01/2024, 14/06/2024 e 06/08/2026. Dezembro/2026 é previsão histórica anunciada, não data confirmada de entrega. Não declarar via aberta. Informações comerciais segregadas e sem alegação de valorização assegurada.

## Gate
- Confirmação de identidade, URLs, linkagem, indexação e canonical no navegador público.
- Teste desktop/mobile do hub + artigos; simulação não deve sofrer regressão.
- Revisão factual independente, especialmente status de obra e prazos atuais.
- Leitura integral do PDF `PIRITUBA LAPA 2026.pdf` antes de acrescentar detalhes das pranchas; não recuperado nesta sessão.
- Reavaliar cobertura Google GSC; nenhuma indexação prometida.
- Release somente após testes e protocolo de rollback. Baseline de produção do Complexo e seus scripts deve permanecer intacta.

## Rollback
Reverter somente a PR editorial. Nenhuma alteração foi feita nas páginas dos simuladores internos `duplo`, `duplo-ayrton` ou `marginal-duplo`. Antes de produção, identificar deployment READY e alias live; registrar fonte para rollback por deployment.
