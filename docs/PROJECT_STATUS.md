# Status do Projeto

Estado reconciliado em `2026-09-14`.

Fonte canônica: GitHub `main`.

## Produção atual

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
LP = Green/GDigital fallback / non-canonical
```

Technical baseline vigente após integração: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

Decision record: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`.

Cutover evidence: `docs/infra/MNT_VERCEL_WWW_COMMERCIAL_CUTOVER_CLOSEOUT_2026-09-14.md`.

Search state: `https://www.moretegra.com.br/` foi observado no Google Search Console como indexado, com crawl/indexação permitidos e canonical escolhido pelo Google igual ao `www` inspecionado. `/sitemap.xml` e `/robots.txt` foram publicados na PR #81.

Program state: ver `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Handoff atual: ver `handoffs/CURRENT.md`.

Próxima ação segura: ver `docs/NEXT_SAFE_ACTION.md`; MNT-M4-09 permanece `PLANNED / NOT_AUTHORIZED` até autorização explícita.
