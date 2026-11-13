# Handoff da branch — Slugs do Rio padronizados e imagem nos estandes

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-13.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-slugs-estandes-20261113`, criada a partir da `main` em `81cfb6e` (#561, #562 e #563 já mergeadas).
- PR: aberta para a `main`. Merge só com aprovação do Wagner.
- Contexto: `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md`, seção 13.

## Decisão do Wagner (2026-11-13)

- Padrão de URL do Rio: `/rio-de-janeiro/`, `/rio-de-janeiro/regioes/`, `/rio-de-janeiro/regioes/oeste/barra-da-tijuca/`.
- Corrigir os avisos do teste de resultados avançados no `/rio-de-janeiro/`.

## O que mudou

- `src-greenn/rj/regioes/...` → `src-greenn/rio-de-janeiro/regioes/...` (git mv + regeneração pelo `scripts/build-rj-regioes-pages.py`).
- `vercel.json`: rewrites dos novos slugs; 301 permanentes de `/rj/regioes/` e `/rj/regioes/oeste/barra-da-tijuca/`.
- `sitemap.xml`: só os novos slugs.
- Hub `/rio-de-janeiro/`: links do menu e da seção da Barra para os novos slugs; `image` nos 7 `RealEstateAgent` `#estande-tegra`.
- 7 páginas de empreendimento do Rio: `image` no `#estande-tegra` (a mesma do `og:image` da página).
- `scripts/lib/commercial-channels.mjs` (`RJ_REGION_PAGES`), `validate-rj-regioes.mjs` (agora exige os 301 e a imagem dos estandes), `validate-rio-home.mjs`, smoke `rj-sp-form-measurement-smoke`, comentário em `home.css`.
- Identidades GA4 das páginas de bairro mantidas (`rj_regioes_hub`, `rj_regiao_barra_da_tijuca`).

## Verificação

- Validadores: 36 PASS; as mesmas 6 FAIL antigas, com saída idêntica antes e depois (só muda o pid).
- Smoke `rj-sp-form-measurement-smoke`: PASS nas 10 páginas RJ (com os novos slugs) e 2 de SP, desktop e mobile.
- Smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke`: PASS.

## Pendências

| # | Item | Dono |
|---|---|---|
| S1 | Decidir `telephone` e `priceRange` nos estandes (ver seção 13: conflito com a R7 e risco de preço vencido) | Wagner |
| S2 | QA no LVR e merge | Wagner |
| S3 | Depois do merge: conferir os 301, IndexNow / Search Console dos novos slugs, novo teste de resultados avançados | Wagner + Claude |
| B3 | Menu do hub do Rio com "Home nacional" (`/`) e "São Paulo" (`/regioes/`) | Wagner |
| — | Gates de produção da #561 (P3, P6b, P8, P9), P4, P7 | Wagner + Claude |

## Próxima ação (única)

Wagner decide S1 e aprova o merge.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-slugs-estandes-20261113 e o docs/sfjm/HANDOFF.md dela. Confira se o head é o commit que trouxe este handoff. Se for, siga a próxima ação. Se divergir, pare e me diga.
```
