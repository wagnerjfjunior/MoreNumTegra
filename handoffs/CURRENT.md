# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 ACTIVE
- M4-01..05 COMPLETE / MERGED
- M4-06 IN_PROGRESS / AUTHORIZED — PR #77

M4-05 foi mergeada na PR #69 em `8098997eef2eacfb74854f888bfaee2b6225b980`, adicionando FAQPage JSON-LD factual com paridade 4/4 com o FAQ visível e verificador próprio.

Infra concluída: PRs #70-#73 canonicalizam Cloudflare como DNS autoritativo, `lp.moretegra.com.br` no Vercel, `www.moretegra.com.br` com HTTPS 308 para `lp`, path/query preservados e deploy Vercel `GIT_DRIVEN_FILTERED_AUTOMATIC`. O apex `moretegra.com.br` permanece Green/GDigital.

Runtime parity do `lp` foi concluída/canonicalizada nas PRs #75/#76. A implementação project-owned do contrato Green Form 46, normalização E.164, thank-you gate, `GTM-PGCR4R47`, Consent Mode e taxonomia `mnt_*` permanece governada por ADR-005. A produção Green não foi substituída.

Forecast 1240h; aceito 656h; restante 584h; progresso 52.90%. M4-06 ainda não contribui horas aceitas até seu lifecycle de aceitação/merge.

Próxima ação segura: concluir M4-06 na PR #77, validando o contrato GEO/AEO/answerability e sua matriz testável; parar em `COMPLETE_CANDIDATE / PENDING_READY_MERGE` salvo autorização específica. M4-07 não inicia por sequência automática.

Continuam gated: migração do apex, novas mudanças DNS/proxy, Search Console mutation, futuras mudanças GTM/GA4 fora de gate específico, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, substituição do Form 46 nativo da Green e implementação M4-08/M4-09 sem autorização própria.
