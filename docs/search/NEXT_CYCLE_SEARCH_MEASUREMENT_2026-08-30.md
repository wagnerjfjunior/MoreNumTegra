# MoreNumTegra — Next Cycle: Search + Measurement Foundation — 2026-08-30

## Objetivo

Preparar o próximo ciclo do MoreNumTegra após a release Search + Conversion, sem ativar tracking ou mídia antes dos gates necessários.

## Estado de entrada

- produção Green funcional;
- release `18cfab98e01be29c86d78d08f2f5035a8da70444`;
- OT #34 concluída;
- SEO nativo Green parcialmente comprovado por evidência visual;
- LGPD modal ativo;
- Green UI com suporte aparente a Meta Pixel, GTM e Google Analytics;
- nenhum ativo de measurement exclusivo do MoreNumTegra configurado;
- Search Console/robots/sitemap ainda pendentes.

## Sequência

### A. Provider lifecycle
Resolver PR #10 do provider Search.

### B. P0-B Search
Validar indexabilidade, head nativo, canonical, robots, sitemap, Search Console e hostname.

### C. Measurement Foundation
Criar ativos exclusivos:
- GTM;
- GA4;
- Meta Pixel/Dataset.

### D. Consentimento
Validar comportamento técnico denied/granted.

### E. Eventos
Definir e testar:
- page_view;
- view_project;
- select_offer;
- click_whatsapp;
- generate_lead;
- view_promotion.

### F. QA
- GTM Preview/Tag Assistant;
- GA4 Realtime/DebugView;
- Meta Test Events;
- deduplicação browser/server se CAPI for usada;
- Form 46 preservado.

### G. Google Ads
Somente após measurement PASS.

## Invariantes

```text
GREEN_NATIVE_PIXEL_SUPPORT != MORENUMTEGRA_PIXEL_CONFIGURED
LGPD_MODAL_ACTIVE != CONSENT_ENFORCEMENT_PROVEN
TRACKING_CREATED != TRACKING_PUBLISHED
TRACKING_PUBLISHED != CONVERSION_VALIDATED
SEARCH_CONSOLE_VERIFIED != INDEXED
INDEXED != RANKING
GOOGLE_ADS_ACCOUNT_READY != CAMPAIGN_AUTHORIZED
CAMPAIGN_DESIGNED != SPEND_AUTHORIZED
```

## Limites

- nenhum tracking é ativado por este documento;
- nenhum Pixel/GTM/GA4 de outro projeto pode ser reutilizado;
- nenhuma campanha/spend é autorizado;
- nenhuma mudança Green deve ocorrer sem lifecycle e gate aplicáveis.
