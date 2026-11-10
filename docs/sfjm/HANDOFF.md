# Handoff da branch — Rio: endereços, estandes e páginas de venda

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-10.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-enderecos-estandes-20261109`
- PR: #561 (aberta, base `main`). Merge só pelo Wagner.
- Head do código coberto por este handoff: `9335daa`. O commit deste arquivo vem depois dele e só acrescenta este documento.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

## Commits da branch (mais antigo primeiro)

| Commit | O que muda |
|---|---|
| `e853c93` | Endereço, CEP e estande Tegra (RealEstateAgent `#estande-tegra`) no JSON-LD e no rodapé das 7 páginas RJ |
| `9d83f56` | Páginas RJ como página de venda: mapa estilo Mozae que abre o WhatsApp, plantas com botão de WhatsApp, guardrails R1–R6 (`RESF_CONVERSION_GUARDRAILS_2026-11-09.md`, `validate-resf-conversion-guard.mjs`) |
| `ef2aad9` | Mídia e plantas oficiais Tegra no Gran Thai e no Singular (peninsulacollection.com.br é site oficial Tegra: usa mídia, não recebe link) |
| `67693da` | Seletor de plantas (padrão Chateau Jardin, `resf-rio-plans.js`) e foto oficial em todo card de planta |
| `f3a2903` | RIIO: sem quadros por edifício e sem seção da Sabrina |
| `9577d9f` | Galeria cabe na tela; Kronos com 12 ambientes variados |
| `f30285e` | Galeria no padrão Ampère Brooklin, em tela cheia como o hero |
| `9335daa` | Os 4 ajustes de 2026-11-10 (abaixo) |

## Os 4 ajustes pedidos em 2026-11-10 — todos concluídos em `9335daa`

1. Linha repetida abaixo da galeria (`.rio-scene-list`) removida das 6 páginas e do CSS. **Feito.**
2. Header do RIIO no padrão topbar Rio (logo Tegra, Início, Rio de Janeiro, Plantas, Imagens, Atendimento). Faixa escura porque o hero travado do RIIO abre em fundo claro. **Feito.**
3. Card do hub abria a página no meio. Causa: `scrollIntoView` no seletor de plantas (Claris Rosas, Gran Thai, Singular, Gaea). Corrigido; as 7 páginas abrem no hero (scrollY 0 medido). **Feito.**
4. Hub: seção da Sabrina trocada por "Atendimento personalizado Tegra Vendas" com um botão "Falar no WhatsApp". JSON-LD Person sem `image`. Rodapé mantém nome, CRECI e telefone. **Feito.**

Verificação em `9335daa`: validadores 32 PASS + as mesmas 6 FAIL de base do `main` (clone raso); smokes `resf-rio-visual-smoke` e `rio-home-visual-smoke` PASS em desktop e mobile.

## Decisões do Wagner (com data)

- 2026-11-09: atendimento presencial no estande de cada empreendimento; Claris Rosas e Claris Casa no mesmo endereço; endereços do Singular e do Gaea informados por ele.
- 2026-11-09: rodapé com o endereço do próprio empreendimento (igual ao JSON-LD), fonte única, sem negrito, itálico ou sublinhado.
- 2026-11-09: nunca mandar cliente para concorrente ou para fora do funil; sem texto de justificativa; toda planta com foto oficial.
- 2026-11-09: peninsulacollection.com.br é site oficial da Tegra.
- 2026-11-10: galeria sem a linha repetida; header do RIIO padronizado; card do hub abre no hero; hub sem a seção da Sabrina, com "Atendimento personalizado Tegra Vendas".

## Pendências

- **Decisão do Wagner:** atualizar metragens? Gran Thai hoje 125–210 m², ficha oficial 125,01–405,45 m². Gaea hoje 125 e 170 m², oficial 123,35–365,16 m².
- **Decisão do Wagner:** o nome da Sabrina ainda aparece no hub em 2 respostas do FAQ, no texto do formulário e no botão flutuante do WhatsApp. Manter ou tirar.
- **Wagner:** QA no LVR das 7 páginas RJ e do hub.
- **Wagner:** merge da PR #561. Depois do merge: IndexNow/Search Console das URLs RJ.

## Próxima ação (única)

Wagner faz o QA no LVR desta branch e responde às duas decisões acima (metragens; nome da Sabrina no hub).

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-enderecos-estandes-20261109 e o arquivo docs/sfjm/HANDOFF.md. Confira se o head do código citado no handoff (9335daa) é o pai do commit que criou o handoff, ou o head atual. Se for, siga a próxima ação dele. Se divergir, pare e me diga.
```
