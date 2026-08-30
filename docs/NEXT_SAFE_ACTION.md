# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-30`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Estado: `MEASUREMENT_FOUNDATION_PREPARATION`

## 1. Estado de entrada

Search + Conversion permanece em produção comercial na Green.

P0-B Search/indexabilidade foi concluído com:

`PASS_WITH_RESIDUAL_RISK`

A home `https://moretegra.com.br/` está indexada no Google. O Search Console mostrou Googlebot Smartphone, crawl permitido, busca com êxito, indexação permitida, HTTP 200, HTTPS PASS e canonical selecionada igual à canonical declarada.

Evidência:

`docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md`

## 2. Primeira transição aplicável

Preparar **Measurement Foundation** sem publicar tracking.

Escopo READ_ONLY / DESIGN:

1. inventariar qualquer tracking já presente no live;
2. definir arquitetura de transporte sem duplicidade;
3. fixar event taxonomy;
4. definir consent model e proof obligations LGPD;
5. definir QA para denied/granted;
6. definir ownership de GTM, GA4 e Meta Pixel/Dataset exclusivos do MoreNumTegra;
7. definir conversão primária e critérios para Google Ads futuro.

Nenhuma criação/publicação externa é autorizada apenas por esta transição.

## 3. Arquitetura candidata

```text
GREEN NATIVO
├── Meta Pixel próprio do MoreNumTegra
│   └── CAPI somente se deduplicação/capability forem comprovadas
└── GTM próprio do MoreNumTegra

GTM
├── GA4 próprio
├── eventos adicionais
└── Google Ads futuramente
```

Evitar:

- Meta via Green + GTM simultaneamente sem desenho explícito;
- GA4 via Green + GTM simultaneamente;
- reutilização de IDs de outros projetos;
- publicação antes de validar consentimento.

## 4. Event taxonomy candidata

- `page_view`
- `view_project`
- `select_offer`
- `click_whatsapp`
- `generate_lead`
- `view_promotion`

Conversão primária candidata:

`generate_lead`

## 5. Gates separados

Exigem autorização específica antes de mutação externa:

- criar/publicar GTM;
- criar/publicar GA4;
- Meta Pixel/Dataset/CAPI;
- alterar configuração Green de Pixel;
- consentimento técnico;
- Google Ads;
- campanha/spend;
- DNS;
- novas mutações Search Console;
- produção Green adicional.

## 6. Search residual risk

Manter em backlog, sem reiniciar P0-B:

- canonical client-side;
- ausência de sitemap;
- `www` sem 301/308 comprovado;
- warning `web-share`.

Esses riscos não bloquearam crawling/indexação observados no Search Console.

## 7. Condições de parada

Parar diante de:

- tracking pré-existente não reconciliado;
- risco de duplicidade;
- consentimento técnico não comprovado;
- capability Green não comprovada;
- necessidade de segredo/token no cliente;
- ausência de autorização para mutação externa;
- dado externo não verificado.

## 8. Resultado esperado do próximo ciclo

```text
P0-B SEARCH INDEXABILITY PASS_WITH_RESIDUAL_RISK
-> MEASUREMENT FOUNDATION DESIGN
-> EXPLICIT TRACKING AUTHORIZATION
-> MEASUREMENT IMPLEMENTATION
-> MEASUREMENT QA
-> SEARCH CONSOLE MONITORING
-> GOOGLE ADS CONVERSION SETUP
-> SEM
```
