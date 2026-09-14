# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 ACTIVE
- M4-01..04 COMPLETE / MERGED
- M4-05 IN_PROGRESS / AUTHORIZED — PR #69

Infra concluída: PRs #70-#73 canonicalizam Cloudflare como DNS autoritativo, `lp.moretegra.com.br` no Vercel, `www.moretegra.com.br` com HTTPS 308 para `lp`, path/query preservados e deploy Vercel `GIT_DRIVEN_FILTERED_AUTOMATIC`. O apex `moretegra.com.br` permanece Green/GDigital.

Forecast 1240h; aceito 640h; restante 600h; progresso 51.61%. M4-05 ainda não contribui horas aceitas.

Próxima ação segura: concluir M4-05 na PR #69, validar módulo/schema/consolidação no `src-greenn/moretegra.js` e parar em `COMPLETE_CANDIDATE / PENDING_READY_MERGE` salvo autorização específica. M4-06 não inicia por sequência.

Continuam gated: migração do apex, proxy Cloudflare, Search Console mutation, novas mudanças GTM/GA4, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make e substituição do Form 46.
