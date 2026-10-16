# SFJM — Universo Tatuapé Órbita — recibo de produção PR #418 (2026-10-16)

## Fontes e lifecycle
- Repositório: `wagnerjfjunior/MoreNumTegra`, `main`.
- PR: https://github.com/wagnerjfjunior/MoreNumTegra/pull/418 — MERGED.
- Head validado: `63d596a29f063a3c261a8af7e8e4ceb5e509d789`; 12/12 checks GitHub SUCCESS.
- Squash merge SHA: `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8`.
- Vercel: `dpl_33MEpNw9UHJ9xQCaG5nFuXR5eefx`, Production READY, SHA correspondente ao merge.
- URL: https://www.moretegra.com.br/ ; https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/?unidade=2408#valores ; https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/?unidade=1305#valores .

## Entrega
Dois cards de unidade na Home e seletor comercial na página exata. Dados comerciais de referência de outubro/2026: unidade 2408 — 51 m², 2 dormitórios, vaga, R$ 540.000; unidade 1305 — 69 m², 3 dormitórios, vaga, R$ 655.000. Preços/disponibilidade sujeitos a confirmação. JSON-LD Product/Offer referencia a 2408. Checks `postal` e `verify` aprovados após correções específicas, sem bypass de CI.

## Evidência e limites
- **PASS / USER_CONFIRMED**: usuário abriu e testou os links da Home e das duas unidades em produção; duas capturas mostram preços, metragens, estado selecionado e alternância correta em navegador desktop. `utm_source=chatgpt.com` não impediu o teste.
- **PASS / PROVIDER_OBSERVED**: Vercel READY com SHA correto e CI do head 12/12 SUCCESS.
- **NOT VERIFIED**: envio real Green Sales Form46 e persistência de contexto de unidade, mobile touch, Lighthouse/Core Web Vitals, inspeção HTTP/SEO independente, indexação no Google. Não declarar RESF integralmente certificado.

## Continuidade / rollback
1. Validar mobile (ambas unidades, alternância, CTA, scroll e WhatsApp).
2. Verificar Form46 e transporte da unidade sem submeter dados pessoais reais sem autorização específica.
3. Verificar canonical/robots/JSON-LD/HTTP e registrar resultados; métricas de campo e Google em trilhas separadas.
4. Se houver regressão, abrir PR para reverter especificamente o merge `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8`; não reescrever a main.
5. Preservar governança: nenhuma edição em massa, mudança comercial, Form46/measurement ou publicação adicional autorizada por este recibo.

Este recibo é histórico de release e aceite delimitado; não substitui a resolução live antes de nova mutação.
