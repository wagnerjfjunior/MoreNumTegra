# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 ACTIVE
- M4-01..07 COMPLETE / MERGED
- M4-08 IN_PROGRESS / AUTHORIZED — PR #79

M4-05 foi mergeada na PR #69 em `8098997eef2eacfb74854f888bfaee2b6225b980`, adicionando FAQPage JSON-LD factual com paridade 4/4 com o FAQ visível e verificador próprio.

M4-06 foi mergeada na PR #77 em `72ceeab91757ebec8edb0cec6c80c926e8bba43f`, definindo o contrato GEO/AEO/answerability, matriz testável e gates de evidência.

M4-07 foi mergeada na PR #78 em `0df3e4e116bca19a843feae4c0416ecab68dda98`, definindo semantic internal linking, graph-integrity gates e a obrigação de crawl/link evidence para implementação.

M4-08 implementa primeiro a superfície runtime real da V1: portfolio root `/`. A PR #79 adiciona conteúdo visível/direct-answer para propósito, estágio, interpretação de valores e descoberta regional, preservando Form 46, catálogo e arquitetura Green/Vercel. Rotas master/exact/stage/location inexistentes não são fabricadas.

Residual factual conhecido: `src-greenn/moretegra.js` ainda contém o lower bound histórico `45m²` para Mozae; M3-04 governa `46m²` e `73m²` e exige runtime correction/revalidation. A nova copy M4-08 não usa esse valor como evidência. Não declarar fechamento factual integrado de M4 enquanto o residual persistir.

Infra concluída: PRs #70-#73 canonicalizam Cloudflare como DNS autoritativo, `lp.moretegra.com.br` no Vercel, `www.moretegra.com.br` com HTTPS 308 para `lp`, path/query preservados e deploy Vercel `GIT_DRIVEN_FILTERED_AUTOMATIC`. O apex `moretegra.com.br` permanece Green/GDigital.

Runtime parity do `lp` foi concluída/canonicalizada nas PRs #75/#76. A implementação project-owned do contrato Green Form 46, normalização E.164, thank-you gate, `GTM-PGCR4R47`, Consent Mode e taxonomia `mnt_*` permanece governada por ADR-005. A produção Green não foi substituída.

Forecast 1240h; aceito 696h; restante 544h; progresso 56.13%. M4-08 ainda não contribui horas aceitas até seu lifecycle de aceitação/merge.

Próxima ação segura: concluir/validar a M4-08 na PR #79 e parar em `COMPLETE_CANDIDATE / PENDING_READY_MERGE` salvo autorização específica. M4-09 não inicia por sequência automática.

Continuam gated: migração do apex, novas mudanças DNS/proxy, Search Console mutation, futuras mudanças GTM/GA4 fora de gate específico, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, substituição do Form 46 nativo da Green, Green publication e M4-09 sem autorização própria.
