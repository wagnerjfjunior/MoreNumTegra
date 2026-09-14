# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 ACTIVE
- M4-01..08 COMPLETE / MERGED
- M4-09 COMPLETE_CANDIDATE / PENDING_READY_MERGE — PR #82

## Produção web / domínio — estado atual

O cutover comercial Green -> Vercel foi executado e validado em 2026-09-14.

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = https://moretegra.com.br/ -> 308 -> www
DNS AUTHORITY = Cloudflare / DNS only
CLOUDFLARE HTTP PROXY = OFF
LP = Green/GDigital fallback / non-canonical
GREEN/GDIGITAL = Form 46 provider + CRM
```

PR #80 promoveu `www.moretegra.com.br` a host comercial/canônico Vercel e PR #81 adicionou `/sitemap.xml` e `/robots.txt`. ADR-006 está `ACCEPTED / CUTOVER_CERTIFIED`. A baseline técnica vigente é `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

Validado no cutover: apex 308 -> www com path/query preservation, www HTTPS 200, www canonical/indexed, Google-selected canonical = www, Form 46 real, CRM persistence, consent, `mnt_lead_success`, `generate_lead`, sitemap/robots e Git-driven deploy.

## M4-09

A PR #82 foi restackada sobre o estado V2.3 para não duplicar nem regredir as PRs #80/#81. O fechamento técnico preserva a produção `www` já certificada e reconcilia o Product Truth do Mozae.

Mozae metragem:
- áreas exatas observadas por unidade: 44.85 m² a 73.40 m²;
- tipologias comerciais oficiais atuais Tegra: 46 m² e 73 m²;
- faixa arredondada de portfólio 45 m² a 73 m² é permitida quando descrita como faixa.

Logo, o runtime `45m² a 73m²` não é uma contradição factual quando usado como rounded portfolio range. O antigo `RUNTIME_METRAGE_CORRECTION_REQUIRED` foi superseded pelo suplemento M3-04 versionado na PR #82.

Residuals não bloqueantes:
- `/favicon.ico` 404 no HAR Pingdom pós-cutover;
- GSC sitemap submission/processing não é inferido a partir do deploy;
- exact GTM published version number for the `www` cutover = `NOT_RECORDED`.

Forecast 1240h; aceito 728h; restante 512h; progresso 58.71%. M4-09 ainda não contribui horas aceitas até merge.

Próxima ação segura: Ready + merge da PR #82 somente com autorização explícita. Após merge, M4 pode ser declarada COMPLETE. M5 não inicia por sequência automática.

Continuam gated: novas mudanças DNS/proxy, futuras mudanças GTM/GA4, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, backend/secrets e novas famílias de rotas não governadas.
