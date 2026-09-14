# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 COMPLETE
- M4-01..09 COMPLETE / MERGED
- M5 ACTIVE
- M5-01 IN_PROGRESS / AUTHORIZED

M4-09 foi mergeada na PR #82 em `a5c3766d93aa4b8ae76acfd6d544f03b204b9b20`.

## Produção web / domínio — estado atual

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = https://moretegra.com.br/ -> 308 -> www
DNS AUTHORITY = Cloudflare / DNS only
CLOUDFLARE HTTP PROXY = OFF
LP = Green/GDigital fallback / non-canonical
GREEN/GDIGITAL = Form 46 provider + CRM
```

PR #80 promoveu `www.moretegra.com.br` a host comercial/canônico Vercel; PR #81 publicou `/sitemap.xml` e `/robots.txt`; ADR-006 permanece `ACCEPTED / CUTOVER_CERTIFIED`. A baseline técnica vigente é `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

## Fechamento M4

M4-09 preservou o estado técnico SEO já certificado e fechou o residual factual do Mozae sem regressão de runtime:
- áreas exatas observadas: 44.85 m² a 73.40 m²;
- tipologias comerciais oficiais atuais: 46 m² e 73 m²;
- faixa arredondada de portfólio 45 m² a 73 m² permitida quando descrita como range.

Residuals não bloqueantes carregados adiante:
- `/favicon.ico` 404 no HAR Pingdom pós-cutover;
- GSC sitemap submission/processing não é inferido a partir do deploy;
- exact GTM published version number for the `www` cutover = `NOT_RECORDED`.

Forecast 1240h; aceito 752h; restante 488h; progresso 60.65%.

## M5 — UX, Performance, Conversion, Lead & CRM

Product Authority autorizou o início de M5. A primeira tarefa é:

`MNT-M5-01 — Mobile UX and accessibility audit — 16h — IN_PROGRESS / AUTHORIZED`

Escopo inicial: auditar a experiência mobile e acessibilidade do runtime atual, registrar findings/evidências e classificar severidade. M5-01 não autoriza automaticamente remediation de runtime, M5-02 ou tarefas seguintes.

Próxima ação segura: executar e documentar M5-01. Ready/merge do candidato e qualquer remediation permanecem gates separados.

Continuam gated: novas mudanças DNS/proxy, futuras mudanças GTM/GA4, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, backend/secrets e novas famílias de rotas não governadas.
