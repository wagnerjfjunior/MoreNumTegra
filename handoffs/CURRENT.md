# Handoff Atual — MoreNumTegra

`main` é a fonte canônica. Resolver GitHub live antes de agir.

Estado reconciliado em 2026-09-14:
- M0 COMPLETE
- M1 COMPLETE
- M2 COMPLETE
- M3 COMPLETE / ACCEPTED
- M4 ACTIVE
- M4-01..08 COMPLETE / MERGED
- M4-09 PLANNED / NOT_AUTHORIZED

M4-05 foi mergeada na PR #69 em `8098997eef2eacfb74854f888bfaee2b6225b980`.

M4-06 foi mergeada na PR #77 em `72ceeab91757ebec8edb0cec6c80c926e8bba43f`.

M4-07 foi mergeada na PR #78 em `0df3e4e116bca19a843feae4c0416ecab68dda98`.

M4-08 foi mergeada na PR #79 em `9073e3b70bd6a6e25255c1d5b147c26788c0630f`, implementando a camada priorizada de conteúdo/answerability na portfolio root `/` sem fabricar rotas master/exact/stage/location ainda inexistentes.

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

PR #80 (`ce62354cc65069afd36b4fda561819d5d4a32bbc`) promoveu `www.moretegra.com.br` a host comercial/canônico Vercel, moveu os gates reais de Form 46/Measurement para `www`, manteve `*.vercel.app` noindex e tornou a home comercial indexável.

PR #81 (`6fdd26f100b60413fbdd85a4af44b78dfd371f76`) adicionou `/sitemap.xml` e `/robots.txt` para descoberta Search.

ADR-006 está `ACCEPTED / CUTOVER_CERTIFIED`. A baseline técnica atual é `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

## Evidência de fechamento

Validado:

```text
Cloudflare authoritative DNS = PASS
Cloudflare DNS only = PASS
apex -> Vercel = PASS
apex 308 -> www = PASS
path/query preservation = PASS
www HTTPS 200 / Vercel = PASS
www canonical = PASS
www Google indexed = PASS
Google-selected canonical = www = PASS
Form 46 real on www = PASS
Green CRM persistence = PASS
Consent accept = PASS
Consent reject = PASS
mnt_lead_success QA = PASS
generate_lead QA = PASS
sitemap deployed = PASS
robots sitemap discovery = PASS
Vercel Git-driven deploy = PASS
```

O número exato da versão GTM publicada para o delta `www` não foi registrado; não inventar. O container live é `GTM-PGCR4R47` e o QA de host/events/consent foi realizado no `www`.

Rich Results/JSON-LD permanece trilha Search/schema separada e não reabre a indexação/cutover.

## Residuals conhecidos

- `src-greenn/moretegra.js` ainda contém o lower bound histórico `45m²` para Mozae; M3-04 governa `46m²` e `73m²`. Corrigir/revalidar antes de fechamento factual integrado de M4.
- `/favicon.ico` retornou 404 no HAR Pingdom pós-cutover; residual menor de asset.
- status de submissão/processamento do sitemap no GSC deve ser evidenciado separadamente do deploy do sitemap.
- exact GTM published version number for the `www` cutover = `NOT_RECORDED`.

Forecast 1240h; aceito 728h; restante 512h; progresso 58.71% após merge da M4-08.

## Próxima ação segura

M4-09 permanece `PLANNED / NOT_AUTHORIZED`.

Não iniciar M4-09 por sequência automática. A próxima mutação material só ocorre com autorização explícita do Product Authority.

Continuam gated: novas mudanças DNS/proxy, futuras mudanças GTM/GA4, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, backend/secrets, novas famílias de rotas não governadas e relaxamento de Product Truth.
