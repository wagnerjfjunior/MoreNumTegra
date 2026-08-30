# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-30`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release atual publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Fase: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED`
- Saúde geral: `verde`
- OT #34: `CLOSED / COMPLETED`

## 1. Produção

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- PR #33: merged
- smoke Green: `PASS` por confirmação do owner

## 2. Conteúdo / conversão

- 21 empreendimentos únicos;
- 23 oportunidades/cards;
- Nova Vivere cash card: R$ 1.129.900 à vista, unidade 708;
- CAPIITOLO cash card: R$ 3.160.000 à vista, unidade 24;
- badge do Prêmio Master Imobiliário 2026 validado visualmente;
- Form 46, filtros, CTA, WhatsApp e mobile confirmados funcionais pelo owner.

## 3. Search

P0-B: `PASS_WITH_RESIDUAL_RISK`.

Confirmado:
- title inicial Green: PASS;
- meta description inicial Green: PASS;
- canonical JS: PASS;
- canonical selecionada pelo Google: `https://moretegra.com.br/`;
- JSON-LD WebSite/WebPage runtime: PASS;
- produção Green sem `noindex`: PASS;
- `robots.txt`: PASS para a root; `/user` bloqueado;
- Search Console Domain property: acessível;
- home `https://moretegra.com.br/`: indexada;
- Googlebot Smartphone: crawl permitido, fetch com êxito e indexação permitida;
- HTTP `200 OK` observado no Search Console;
- HTTPS: PASS;
- Vercel homologation: `noindex,nofollow` e canonical para produção.

Riscos residuais:
- canonical não estático no HTML inicial;
- `sitemap.xml` não disponível;
- nenhum sitemap de referência detectado no Search Console;
- `www` usa redirect page-level temporizado, sem 301/308 comprovado;
- warning não bloqueante `Unrecognized feature: 'web-share'`.

Evidência:
`docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md`.

## 4. Measurement

Green UI observada suporta:
- Meta Pixel;
- GTM;
- Google Analytics;
- Visualização;
- Conversão;
- Envios Web;
- API de conversão.

Estado:
`NOT_CONFIGURED_FOR_MORENUMTEGRA`

LGPD modal:
`ACTIVE / CONSENT_ENFORCEMENT_NOT_PROVEN`

## 5. Próximos marcos

1. Measurement Foundation;
2. Measurement QA;
3. Search Console monitoring;
4. Google Ads conversion setup;
5. SEM após tracking PASS;
6. P1 SEO architecture/content;
7. Authority/Digital PR.

## 6. Bloqueios

Sem gate próprio:
- não ativar GA4/GTM/Meta;
- não criar/publish Google Ads;
- não alterar DNS;
- não alterar Search Console;
- não duplicar tracking por múltiplos transports;
- não reutilizar pixels/containers de outros projetos.

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.
