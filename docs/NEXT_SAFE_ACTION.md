# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline após integração desta revisão: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `VERCEL_PRODUCTION_HOMOLOGATION_MUST_MATCH_APPROVED_MAIN`

## 1. Ação imediata

Resolver `main` live e alinhar a **Vercel Production de homologação pública** ao estado aprovado integrado em `main`.

URL estável alvo:

`https://morenumtegra.vercel.app/`

Se existir Preview já validado correspondente ao estado aprovado, preferir promover esse deployment para Vercel Production em vez de reconstruir artefato materialmente diferente.

## 2. Gate de promoção Vercel

Antes da promoção/redeploy:

1. resolver `main` live;
2. confirmar o SHA aprovado;
3. confirmar que a implementação modular está em `main`;
4. confirmar que o deployment alvo corresponde ao conteúdo aprovado;
5. publicar/promover somente para Vercel Production;
6. manter `noindex, nofollow`;
7. não publicar na Green como consequência automática.

## 3. Gate após Vercel Production

Após `https://morenumtegra.vercel.app/` refletir o `main` aprovado, testar publicamente:

- desktop e mobile;
- imagens dos 19 cards;
- vídeo in-page/autoplay mudo/loop/playsinline;
- filtros por estágio;
- badges/filtros Zona Sul, Zona Oeste e Zona Leste;
- busca por nome/bairro;
- filtro por ticket;
- reset/combinação de filtros;
- preços `A partir de`, `Sob consulta` e `Esgotado`;
- CTA `Negociar condições` / `Receber condições`;
- rolagem para `#formulario`;
- mock do formulário sem transmissão;
- ausência de erro primário de runtime/console;
- responsividade e touch targets;
- LCP/INP/CLS quando possível.

## 4. Dados comerciais

Antes da Green comercial, revalidar os fatos visíveis usando as tabelas/espelhos atuais e informação aprovada:

- preço de referência;
- unidade/metragem usada para referência;
- valor/m² quando exibido;
- disponibilidade/esgotado;
- estágio;
- imagem/URL oficial;
- demais diferenciais visíveis.

Ambiguidade deve resultar em `Sob consulta` ou omissão, não inferência.

## 5. Green production gate

Somente depois da homologação pública aprovada:

1. congelar SHA/release;
2. identificar os 3 blocos HTML exatos;
3. identificar CSS e JavaScript exatos;
4. montar/validar o Form 46 nativo no builder;
5. confirmar CTA -> `#formulario`;
6. revalidar mobile já dentro da Green;
7. preservar versão anterior/export para rollback quando possível;
8. publicar de forma controlada.

## 6. Condições de parada

Parar se:

- Vercel Production não puder ser ligada ao estado aprovado de `main`;
- o deployment alvo contiver conteúdo diferente do aprovado;
- surgir dado comercial que exija inferência;
- Form 46 exigir comportamento desconhecido;
- houver necessidade de custom domain/DNS, analytics, FECH.AI, n8n, Make, Ads, CMS/database ou backend sem nova decisão.
