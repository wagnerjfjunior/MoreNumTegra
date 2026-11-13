# Handoff da branch — Home exclusiva de São Paulo

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-12.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/home-sp-exclusiva-20261112`
- Base: `main` em `8fe1043` (squash da PR #561, mergeada em 2026-11-12 com aprovação do Wagner). A branch foi rebaseada sobre esse commit e contém só as mudanças da home.
- PR: aberta para a `main`. Merge aprovado pelo Wagner em 2026-11-12.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

O handoff da #561 (canais RJ/SP, form 47 e mensuração) está no histórico: `git show 8fe1043:docs/sfjm/HANDOFF.md`. Contexto completo: `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` (seção 11 trata desta entrega).

## Decisão do Wagner

- 2026-11-10: homepage exclusiva de São Paulo aprovada (USER_APPROVED).
- 2026-11-12: "o CRECI é regional". A home `www.moretegra.com.br/` fica só com São Paulo: sem cards, menu, hero, filtro ou metadados do Rio. O hub `/rio-de-janeiro/` e as 7 páginas RJ ficam independentes.
- 2026-11-12: o bloco do Prêmio Master Imobiliário 2026 continua citando o RIIO, porque não tem link.

## O que mudou

`src-greenn/preview/index.html`:
- Título, description, Open Graph, Twitter e JSON-LD `WebPage`: "Apartamentos Tegra em São Paulo | MoreTegra"; "por bairro, estágio…" no lugar de "por cidade".
- JSON-LD `ItemList`: sem o RIIO (era o 16º item).
- Topo: "MORE EM UM TEGRA · SÃO PAULO"; menu sem "Rio de Janeiro".
- Hero: "PORTFÓLIO TEGRA · SÃO PAULO", título "Empreendimentos Tegra em São Paulo", texto só de São Paulo.
- Catálogo: "Encontre seu próximo Tegra em São Paulo." / "Compare os projetos por zona, estágio e faixa de valor."; filtro "Cidade" removido (e a regra de CSS dele); mensagem de lista vazia sem "cidade".
- Script `moretegra.js` com nova versão na URL (`?v=20261112-home-sp`), para o navegador não usar a versão antiga em cache.

`src-greenn/moretegra.js`:
- Catálogo `PROJECTS` só com os empreendimentos de São Paulo. Os 7 cards RJ saíram; ficam no histórico do git (commit `846876b`).
- Saiu o texto de localização "na Barra da Tijuca, Rio de Janeiro"; o rótulo da imagem indisponível virou "TEGRA · SÃO PAULO".
- A lógica de filtros não mudou: ela já trata a ausência do filtro de cidade e começa em São Paulo.

Novo validador: `scripts/validate-home-sp-exclusiva.mjs` — reprova qualquer referência ao Rio na home fora do bloco do prêmio, filtro de cidade, link para o hub ou para páginas RJ, catálogo RJ no script ou canal RJ na home; exige form 46, WhatsApp SP e Sabrina na home; exige as 8 URLs do Rio no sitemap.

Nada mudou nas páginas do Rio nem em outras páginas de São Paulo.

## Verificação

- Validadores: 35 PASS (os 34 da #561 + o novo) e as mesmas 6 FAIL anteriores.
- Prova negativa: com o link "Rio de Janeiro" recolocado no menu, o validador novo reprova; arquivo restaurado byte a byte.
- Home antes/depois em Chromium (desktop 1440 e mobile 390): os mesmos 33 cards de São Paulo, na mesma ordem; nenhum link para o Rio (antes: `/rio-de-janeiro/`); payload do form 46, eventos e ida para `/obrigado/` idênticos; sem estouro horizontal; sem erro de JavaScript. Texto do Rio visível só no bloco do prêmio ("RIIO BY PIERO LISSONI", "Tegra · Rio de Janeiro"). Filtros de estágio funcionando (15 prontos, 11 em construção, 3 lançamentos).
- Smoke `rj-sp-form-measurement-smoke` (8 RJ + 2 SP, desktop e mobile): PASS.
- Smoke `m5-07-lead-semantics-smoke`: os mesmos 11 testes PASS em Chromium antes e depois (inclui `home-negotiate`); falha só ao abrir o Firefox, que não está instalado neste ambiente, igual antes.
- `test-riio-gallery-20261028.mjs` falha antes e depois por falta do módulo `jsdom` neste ambiente; não tem relação com a home.

Observação para o QA: no desktop 1440, a palavra "Empreendimentos" do título do hero encosta na coluna do vídeo. Já acontecia antes desta mudança e pode ser só a fonte substituta do ambiente de teste (as fontes externas não carregam aqui). Conferir no LVR.

## Pendências

| # | Item | Dono |
|---|---|---|
| H1 | ~~Merge da PR #561~~ — feito em 2026-11-12 (`8fe1043`) | concluída |
| H2 | ~~Abrir a PR desta branch~~ — aberta | concluída |
| H3 | Conferir em produção a home (inclui o título do hero no desktop) | Wagner |
| H4 | Depois do merge: pedir reindexação da home no Search Console | Wagner |
| — | Pendências da #561, agora em produção: gates P3 (GTM publicado, dimensão `form_id`), P6b (GTM Preview, DebugView, 1 lead RJ e 1 SP), P8 (resposta da Green), P9 (consentimento em `/obrigado/`); P4 (defeitos do GTM); P7 (IndexNow das URLs RJ) | Wagner + Claude |
| — | CI com falhas antigas, também na `main` antes da #561: `favicon`, `two-images-39-pages`, `mercado-editorial`, `m5-10-elo-late-gtm-bootstrap-smoke` | Backlog |

## Próxima ação (única)

Depois do merge desta PR: Wagner faz os testes em produção da #561 (gate P6b: GTM Preview, DebugView, 1 lead controlado RJ e 1 SP) e confere a home.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/home-sp-exclusiva-20261112 e o arquivo docs/sfjm/HANDOFF.md dela. Confira se a PR desta branch foi mergeada na main. Se sim, siga a próxima ação do handoff. Se divergir, pare e me diga.
```
