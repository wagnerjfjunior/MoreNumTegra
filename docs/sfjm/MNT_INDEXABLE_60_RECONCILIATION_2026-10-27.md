# SFJM — Reconciliação de URLs publicáveis MoreNumTegra

Data: 27/10/2026. Sem modificação de runtime.

## Denominadores distintos

| Camada | Total | Interpretação |
|---|---:|---|
| Vercel `vercel.json` rewrites | 101 | 60 URLs canônicas + 40 rotas de blog fora do inventário publicado + /obrigado/ |
| Sitemap atual | 60 | 43 comerciais + 17 blog (12 artigos Dicas, hub Dicas, hub blog, hub bairros, 2 artigos mercado/bairros) |
| OpenSEO audit 27/10 | 60/60 | URLs do sitemap retornaram HTTP 200 e indexáveis na auditoria histórica daquele dia, antes do PR #503 para os redirects |
| GSC snapshot 22/10 | 47 | 42 comerciais, 4 blog (incluindo 1 slug legado), 1 subdomínio lp |
| Evidências combinadas de indexação das 60 | 58 | 42 comerciais da lista GSC + Jerivás indexada por USER_CONFIRMED + 3 URLs blog atuais na lista + 12 artigos Dicas USER_CONFIRMED em 27/10 |
| Sem confirmação individual | 2 | /blog/ e /blog/dicasedecor/ |

A soma 58 é **reconciliação de evidências em momentos diferentes**, NÃO é um contador atual de 58 no GSC. Não é legítimo afirmar que Google indexou 60/60 sem inspeção oficial desses dois hubs e atualização da cobertura. O snapshot original 47 não pode ser simplesmente incrementado por 13: contém 2 URLs fora do inventário canônico (/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/ antiga; lp.moretegra.com.br/).

## Blog — matriz complementar

O inventário comercial de 43 URLs permanece em `docs/sfjm/MNT_COMMERCIAL_43_RECONCILIATION_2026-10-27.csv`; esta matriz de 17 URLs blog fica em `docs/sfjm/MNT_BLOG_17_GSC_RECONCILIATION_2026-10-27.csv`. A junção é 60 linhas, sem sobreposição.

## Pendências

1. Google Search Console URL Inspection de `https://www.moretegra.com.br/blog/` (snapshot indicou detectada, não indexada). Teste publicado/índice, solicitar indexação se apropriado e registrar atualização real.
2. GSC URL Inspection de `https://www.moretegra.com.br/blog/dicasedecor/` (nenhuma confirmação de índice). Solicitar indexação apenas se indexável e a inspeção indicar elegibilidade.
3. Após o PR #503, confirmar GSC sitemap atualizado com 60 URLs e estado das duas inclusões. Indexação de URLs não é controlável pelo deploy.
4. Separar rotas antigas redirect 301 e editorial noindex dos 60 alvos; não remover páginas editoriais em elaboração para igualar contagens.
5. Bing: cobertura por URL e variantes www ainda sem conciliação.

## Fonte e integridade

- GitHub sitemap.xml tem 60 URLs distintas, sem duplicatas; Vercel READY no commit `b92575b2ab33357f8ed59ccc38305e0881a460d8`.
- 60/60 rotas presentes no vercel.json e 60/60 no OpenSEO audit `1d8ee177-e5dc-4511-9880-83fba4b96124` sem noindex na observação disponível.
- Google Performance API não fornece index coverage. Última lista de 47 compartilhada pelo proprietário e 12 artigos reportados indexados são evidência USER_SUPPLIED, não consultas atuais por URL.
