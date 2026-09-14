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

Technical baseline vigente: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

Decision record: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`.

Cutover evidence: `docs/infra/MNT_VERCEL_WWW_COMMERCIAL_CUTOVER_CLOSEOUT_2026-09-14.md`.

Search state: `https://www.moretegra.com.br/` foi observado no Google Search Console como indexado, com crawl/indexação permitidos e canonical escolhido pelo Google igual ao `www` inspecionado. `/sitemap.xml` e `/robots.txt` foram publicados na PR #81.

## Programa MNT-RESF

- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 COMPLETE — M4-09 mergeada na PR #82 (`a5c3766d93aa4b8ae76acfd6d544f03b204b9b20`)
- M5 ACTIVE
- M5-01 `Mobile UX and accessibility audit` — IN_PROGRESS / AUTHORIZED

Forecast: 1240h. Accepted scope-equivalent: 752h. Remaining: 488h. Progress: 60.65%.

Program state: ver `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Handoff atual: ver `handoffs/CURRENT.md`.

Próxima ação segura: executar/documentar MNT-M5-01. M5-02 e qualquer remediation de runtime permanecem separadamente gated.
