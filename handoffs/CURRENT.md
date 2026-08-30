# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-30`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release integrada e publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- OT de release: `#34 CLOSED / COMPLETED`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR aplicável: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado confirmado

MoreNumTegra V1 está em produção comercial na Green Sales.

Release atual:
`18cfab98e01be29c86d78d08f2f5035a8da70444`

PR #33 foi mergeada e a OT #34 foi encerrada após confirmação do owner de que o smoke em produção passou.

A composição Green permanece:

```text
HTML 01
-> Form 46 nativo
-> HTML 02
-> Footer
+ CSS global
+ JavaScript global
```

O catálogo possui 21 empreendimentos únicos e 23 oportunidades/cards na release atual.

## 2. Release Search + Conversion concluída

A release atual inclui:

- badge horizontal legível do Prêmio Master Imobiliário 2026;
- assinatura `Caminhos da Lapa · um bairro inteiro de opções` no corpo dos cards premiados;
- Nova Vivere 105 m² / unidade 708 / R$ 1.129.900 à vista;
- segundo card CAPIITOLO by Piero Lissoni / unidade 24 / R$ 3.160.000 à vista;
- title/meta description;
- canonical comercial via JavaScript para `https://moretegra.com.br/`;
- JSON-LD conservador `WebSite + WebPage`;
- OG/Twitter apenas como runtime best-effort.

Produção Green foi confirmada funcional pelo owner.

## 3. Green — capabilities observadas em 2026-08-30

Evidência visual fornecida pelo owner no editor Green Sales confirma capability nativa para:

### SEO
- título da página;
- favicon;
- thumbnail de compartilhamento;
- descrição para buscadores.

Configuração observada:
- título: `Apartamentos Tegra em São Paulo | More em um Tegra`;
- descrição: `Compare empreendimentos Tegra em São Paulo por região, estágio e faixa de valor. Veja lançamentos, prontos para morar e opções no premiado Caminhos da Lapa.`;
- favicon configurado;
- thumbnail de compartilhamento configurada.

Ainda não foi comprovado, pela UI observada:
- canonical nativo;
- controle nativo de robots;
- sitemap;
- Search Console.

### Pixel / measurement
A área `Aplicativos > Pixel` da Green mostrou suporte nativo a registros dos tipos:
- Meta/Facebook Pixel;
- Google Tag Manager (`GTM-...`);
- Google Analytics (`G-...`).

A UI também expõe estados/capabilities:
- `Visualização`;
- `Conversão`;
- `Envios Web`;
- `API de conversão`.

Não reutilizar integrações existentes de outros projetos (Jordana, Sereno, Bosque etc.).

## 4. LGPD

O modal de coleta de cookies da Green está ativo, segundo evidência visual do owner.

Isso comprova a presença do modal, mas NÃO comprova ainda que GA4/Meta/GTM respeitam tecnicamente consentimento negado/concedido.

Preservar:

`LGPD_MODAL_ACTIVE != CONSENT_ENFORCEMENT_PROVEN`

## 5. Arquitetura de measurement proposta

Nenhum tracking novo está autorizado apenas por este handoff.

Arquitetura candidata:

```text
GREEN NATIVO
├── Meta Pixel próprio do MoreNumTegra
│   └── CAPI somente se configuração/deduplicação forem comprovadas
└── GTM próprio do MoreNumTegra

GTM
├── GA4 próprio
├── Google Ads futuramente
└── eventos adicionais
```

Evitar:
- Meta simultaneamente via Green e GTM sem desenho explícito;
- GA4 simultaneamente via Green e GTM sem desenho explícito;
- reutilização de IDs de outros projetos.

## 6. Event taxonomy candidata

Antes de publicar tracking, definir e validar:

- `page_view`;
- `view_project`;
- `select_offer`;
- `click_whatsapp`;
- `generate_lead`;
- `view_promotion`.

Conversão primária candidata:
`generate_lead`.

## 7. Search / indexabilidade — P0-B concluído em 2026-08-30

Verdict:

`PASS_WITH_RESIDUAL_RISK`

Evidência consolidada em:

`docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md`

Confirmado no live:

- title inicial Green: PASS;
- meta description inicial Green: PASS;
- produção comercial sem `noindex`: PASS;
- canonical estático no HTML inicial: ABSENT;
- canonical runtime: PASS para `https://moretegra.com.br/`;
- Google Search Console aceitou a mesma URL como canonical selecionada;
- `robots.txt`: presente, root permitida, `Disallow: /user`;
- `sitemap.xml`: não disponível; Search Console não detectou sitemap de referência;
- `www`: redirect funcional por página Green temporizada, sem prova de HTTP 301/308;
- Vercel homologation: `noindex,nofollow` e canonical para a produção;
- Search Console: propriedade Domain acessível;
- URL `https://moretegra.com.br/`: indexada;
- Googlebot Smartphone: crawl permitido, fetch com êxito, indexação permitida;
- resposta HTTP observada pelo Search Console: `200 OK`;
- HTTPS: PASS.

Riscos residuais não bloqueantes:

1. canonical é client-side, não SSR/static;
2. sitemap ausente;
3. `www` não possui 301/308 comprovado;
4. warning `Unrecognized feature: 'web-share'` observado no teste renderizado.

Não solicitar nova indexação sem mudança material: a home já está indexada e foi rastreada em 2026-08-30.

## 8. Provider Search

Provider:
`wagnerjfjunior/Blogs-sites-portais-seo`

PR #10 foi mergeada em 2026-08-30.

Merge commit provider:

`d0f6e4c9879a48bdac00bea1cf40056e04bf736c`

O provider result P0 está integrado no provider `main`.

Não transferir Product Authority ao provider.

## 9. Integrações do GPT

O ambiente GPT atual NÃO possui integração direta conectada para operar:
- Meta Ads / Meta Pixel;
- Google Ads;
- Google Tag Manager.

A configuração dessas plataformas é manual pelo owner, com apoio de arquitetura, revisão, documentação e QA pelo projeto.

## 10. Próxima ordem operacional

```text
1. Measurement Foundation
   - arquitetura e inventário
   - GTM próprio
   - GA4 próprio
   - Meta Pixel/Dataset próprio
   - consentimento
   - event taxonomy
   - QA
2. Search Console monitoring
3. Google Ads conversion setup
4. SEM somente após measurement PASS
5. P1 SEO architecture/content
6. Authority / Digital PR
```

Criação/publicação de tracking, containers, propriedades analytics, pixels, Google Ads ou spend continua exigindo gate específico.

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

## 11. Regras preservadas

- GitHub `main` = fonte canônica;
- Vercel = homologação pública, `noindex,nofollow`;
- Green = produção comercial;
- Form 46 nativo não deve ser interceptado;
- tracking, Search Console, DNS, campanha/spend exigem gates próprios;
- não criar arquivos Green paralelos fora de `src-greenn`;
- toda mudança canônica por branch + PR.
