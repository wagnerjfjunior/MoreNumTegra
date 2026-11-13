# Handoff da branch — Bairros do Rio e foto oficial no hero

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-13.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rj-bairros-barra-20261113`, criada a partir da `main` em `9c6f20e` (PRs #561 e #562 já mergeadas).
- PR: aberta para a `main`. Merge só com aprovação do Wagner.
- Contexto: `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md`, seção 12.

## Decisão do Wagner (2026-11-13)

- Hero do hub do Rio com a foto oficial da Tegra do guia da Barra da Tijuca (dispensa crédito), no lugar da foto do Pexels.
- Páginas novas: `www.moretegra.com.br/rj/regioes/` e `www.moretegra.com.br/rj/regioes/oeste/barra-da-tijuca/`.

## O que mudou

- `src-greenn/rio-de-janeiro/index.html`: foto da Tegra no hero, no Open Graph, no Twitter e no JSON-LD (sem os campos de licença do Pexels); sem `preconnect` para o Pexels; link "Bairros do Rio" no menu e botão "Conhecer o bairro da Barra da Tijuca" na seção sobre a Barra.
- `src-greenn/rj/regioes/index.html` (novo): hub dos bairros do Rio, com a Barra da Tijuca.
- `src-greenn/rj/regioes/oeste/barra-da-tijuca/index.html` (novo): página do bairro — hero com a foto da Tegra, trilha de navegação, "O bairro", rotina (escolas, faculdades, deslocamento, lazer), os 7 empreendimentos agrupados por parte do bairro (Península; Parque das Rosas; Orla da Avenida Lúcio Costa; outros endereços), FAQ, atendimento e formulário 47.
- Ambas: canal da central de atendimento RJ, formulário 47, GTM, identidade de página (`rj_regioes_hub`, `rj_regiao_barra_da_tijuca`), JSON-LD (`WebPage`/`CollectionPage`, `BreadcrumbList`, `Place`, `ContactPoint`, `ItemList`, `FAQPage`); sem preço nos cards; sem link para a home de SP.
- `scripts/build-rj-regioes-pages.py` (novo): gera as duas páginas a partir dos cards do hub.
- `src-greenn/rio-de-janeiro/home.css`: regras da trilha de navegação e dos grupos por área (aditivo).
- `vercel.json` (2 rotas) e `sitemap.xml` (2 URLs).
- `scripts/lib/commercial-channels.mjs`: `RJ_REGION_PAGES` dentro de `RJ_PAGES`.
- Validadores: novo `validate-rj-regioes.mjs`; `validate-rio-home.mjs` exige a foto da Tegra, nenhum Pexels e os links para os bairros. Smoke `rj-sp-form-measurement-smoke` cobre as 2 páginas novas.

## Verificação

- Validadores: 36 PASS (os 35 anteriores + `validate-rj-regioes`) e as mesmas 6 FAIL antigas.
- Canal e mensuração agora conferidos em 10 páginas RJ (hub, 7 empreendimentos, 2 bairros).
- Smoke `rj-sp-form-measurement-smoke`: PASS nas 10 páginas RJ e 2 de SP, desktop e mobile (GTM, consentimento, form 47, conversão única, WhatsApp RJ no obrigado, sem dados pessoais, sem "Sabrina").
- Smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke`: PASS.
- Navegador (desktop 1440 e iPhone 13): hub, Barra e Bairros do Rio sem estouro horizontal, sem imagem quebrada e sem erro de JavaScript; as 7 imagens de projeto carregam.

Observação: a foto da Tegra é um panorama 1920×640. No celular o hero recorta o centro e a imagem fica um pouco suave, porque é ampliada.

## Pendências

| # | Item | Dono |
|---|---|---|
| B1 | QA no LVR do texto e do visual da página da Barra; merge | Wagner |
| B2 | Depois do merge: IndexNow / Search Console das 2 URLs novas | Wagner |
| B3 | Decidir se o menu do hub do Rio continua com "Home nacional" (`/`) e "São Paulo" (`/regioes/`), que levam para o site de SP | Wagner |
| — | Gates de produção da #561 (P3, P6b, P8, P9), P4, P7 | Wagner + Claude |

## Próxima ação (única)

Wagner faz o QA da branch no LVR (página da Barra e hero do hub) e aprova o merge.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rj-bairros-barra-20261113 e o docs/sfjm/HANDOFF.md dela. Confira se o head é o commit que trouxe este handoff. Se for, siga a próxima ação. Se divergir, pare e me diga.
```
