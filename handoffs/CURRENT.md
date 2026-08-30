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

## 7. Search / indexabilidade pendente

P0-B pendente:

1. validar title/description no head inicial da Green;
2. validar canonical renderizado;
3. comprovar produção sem `noindex`;
4. descobrir capability real de `robots.txt`;
5. descobrir capability real de `sitemap.xml`;
6. configurar Search Console em gate próprio;
7. submeter sitemap quando existir;
8. solicitar/acompanhar indexação da home;
9. manter Vercel `noindex,nofollow`;
10. tratar `www` 301/308 quando a Green comprovar capability.

## 8. Provider Search

Provider:
`wagnerjfjunior/Blogs-sites-portais-seo`

PR #10 continua lifecycle separado e deve ser resolvida live antes de assumir integração do pacote provider candidate.

Não transferir Product Authority ao provider.

## 9. Integrações do GPT

O ambiente GPT atual NÃO possui integração direta conectada para operar:
- Meta Ads / Meta Pixel;
- Google Ads;
- Google Tag Manager.

A configuração dessas plataformas é manual pelo owner, com apoio de arquitetura, revisão, documentação e QA pelo projeto.

## 10. Próxima ordem operacional

```text
1. resolver lifecycle da provider PR #10
2. P0-B Search / indexabilidade
3. Measurement Foundation
   - GTM próprio
   - GA4 próprio
   - Meta Pixel/Dataset próprio
   - consentimento
   - event taxonomy
   - QA
4. Search Console + monitoring
5. Google Ads conversion setup
6. SEM somente após measurement PASS
7. P1 SEO architecture/content
8. Authority / Digital PR
```

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

## 11. Regras preservadas

- GitHub `main` = fonte canônica;
- Vercel = homologação pública, `noindex,nofollow`;
- Green = produção comercial;
- Form 46 nativo não deve ser interceptado;
- tracking, Search Console, DNS, campanha/spend exigem gates próprios;
- não criar arquivos Green paralelos fora de `src-greenn`;
- toda mudança canônica por branch + PR.
