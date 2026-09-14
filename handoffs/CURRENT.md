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

Runtime parity concluída fora da sequência M4: PR #75 (`feat: Vercel Form 46 + Measurement runtime parity`) foi mergeada em `main` no commit `d81ac7f4fbcca67ce83fb4dd03744947b7d8c7f5`. Em `lp.moretegra.com.br`, o placeholder foi substituído por implementação project-owned do contrato Green Form 46, com submissão real somente no hostname estável `lp`, normalização E.164, thank-you gate, `GTM-PGCR4R47`, Consent Mode e taxonomia `mnt_*`. A produção Green permaneceu inalterada. ADR-005 governa esta exceção e supersede apenas o antigo mock não transmissor do Vercel; não autoriza substituir o Form 46 nativo da Green.

Measurement parity `lp` foi validada em Tag Assistant em 2026-09-14: default denied, `mnt_consent_accept -> granted`, `mnt_consent_reject -> denied`, hostname gate do `lp`, regex `^/obrigado/?$`, `mnt_lead_success -> generate_lead` e ausência de PII no contrato de Measurement. A publicação da versão GTM após esse QA foi confirmada pelo Product Authority em 2026-09-14; o número exato da versão publicada não foi registrado no repositório e não deve ser inventado.

Forecast 1240h; aceito 640h; restante 600h; progresso 51.61%. A intervenção PR #75 não altera a contabilidade do programa MNT-RESF e M4-05 ainda não contribui horas aceitas.

Próxima ação segura: concluir M4-05 na PR #69, validar módulo/schema/consolidação no `src-greenn/moretegra.js` e parar em `COMPLETE_CANDIDATE / PENDING_READY_MERGE` salvo autorização específica. M4-06 não inicia por sequência.

Continuam gated: migração do apex, proxy Cloudflare, Search Console mutation, futuras mudanças GTM/GA4 além da paridade já encerrada da PR #75, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make e substituição do Form 46 nativo da Green. Para `lp.moretegra.com.br`, a implementação project-owned do contrato Form 46 já está autorizada/mergeada sob ADR-005 e não constitui autorização para alterar a Green.
