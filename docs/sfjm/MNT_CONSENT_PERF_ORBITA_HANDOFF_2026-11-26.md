# 26/11/2026 — Handoff Consent V3, performance e Órbita

Main observada diretamente: 14c5b2536eff26ed3a2aaa7d998ded7dd8326e58. PRs verificadas como MERGED via GitHub:
- #637 e42dbd9fb1c80c46e65f7c193ed4be6c9842549f — Consent V3 granular; 157 HTML, 137 rewrites, 92 sitemap. CI histórico relatado 31 pass/11 fail/1 skip, não recertificado.
- #638 ca1a1836e9bbca76b893c704700fe1731b2d9438 — V3.1 banner e CTA flutuante; cache antigo relatado.
- #639 65354077ae7e3189b378ef193af2d9ead470e003 — Rua Jardim WebP.
- #640 ff9f62e8e2e4433a5200b954f44be7385892fb42 — robots Agentmap removido, autoplay 3s, ARD mantido.
- #641 285945f0a504973173a9f964682e71da5bf6d088 — poster estável, autoplay com marketing, respeita save-data/reduced motion/viewport.
- #642 a029b8c066d42e03bd7bc4af9dfc6e9b8cb927d0 — Form46 CAPIITOLO: inicialização no documento efetivo após document.write; preservar “Condições e disponibilidade — CAPIITOLO, unidade 33, promocional” ou à vista. HAR anterior HTTP 200 com lead mas contexto ausente. #644 recibo registra 33 payloads Playwright e 2 falhas CI independentes; homologação CRM real pendente.
- #643 33abff673955a766715f191044e6efad622ae0a1 — V5 descoberta crítica/dimensões.
- #644 88705c32c7aee7c10e2bf94167a039d78b4c5e8f — recibo documental CAPIITOLO.
- #645 892666b060c1b5771270249c740b734614e3db9a — V6 defer ordenado do consent manager home.
- #646 14c5b2536eff26ed3a2aaa7d998ded7dd8326e58 — V7 WebP responsivos home.

Contrato preservado: Basic Consent Mode, quatro sinais default denied, analytics/marketing independentes, 365 dias, revogação rodapé, Form46/47 independentes de cookies, sem PII no dataLayer, mnt_lead_success -> generate_lead somente sucesso real e analytics autorizado, send_page_view:false + mnt_page_view, GTM GTM-PGCR4R47, GA4 G-57M2XR0CY2 property 553742649. Administração GTM/GA4/Clarity e deploy atual não recertificados nesta leitura; não afirmar homologação. Não liberar publicidade por inferência. Produção web Vercel (ADR-006), CRM Green Sales.

## Evidência USER_REPORTED PSI
Home 26/11 07:49: 91 performance, 100 acessibilidade, 96 práticas, 100 SEO, 6/6 agêntica, SI 5,6s relatado. Órbita 26/11 12:43 mobile Lighthouse 13.6.0: 98/97/96/100; FCP 0,9s LCP 2,0s TBT 0ms CLS 0 SI 3,2s; CrUX ausente. Imagens 659 KiB, cache 801 KiB, render blocking 310ms estimados; contraste e proporção de imagens pendentes. Agêntica 4/4: acessibilidade, CLS, llms.txt, ai-catalog.json aprovados. Form46 sem anotações declarativas; lista de ferramentas sem nomes; schema WebMCP não aplicável, fora da pontuação. Home possui search_properties e get_property_details conforme histórico. Não inferir quais dois audits adicionais sem relatório completo. 4/4 não é reprovação.

## Próxima ação segura
QA read-only Órbita: comparar scripts/registro WebMCP, auditorias Lighthouse e manifest ARD com home; conferir consentimento antes/depois, sem envio de lead real. Propor piloto de ferramenta de leitura contextual e eventual anotação declarativa Form46 sem envio automático, após autorização específica. Preservar SEO (Órbita sem Product/Offer por decisão anterior), CTA, FGTS/Livelo, CRM, métricas e privacidade. Não alterar runtime neste handoff. Priorizar prova da captação e mensuração, depois contraste/dimensões e mídia. Pendências: homologação real CAPIITOLO unidade 33 e matriz consent/CRM/GTM; repetir PSI home após V7. Contexto recuperado de conversa anterior e PRs; não se trata de transcrição integral nem de certificação completa de CI/deploy.
