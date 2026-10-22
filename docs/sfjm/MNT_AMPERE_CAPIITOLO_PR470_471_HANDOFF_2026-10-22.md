# SFJM — Handoff de migração: Ampère e CAPIITOLO — 2026-10-22

## Estado, autoridade e escopo
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`; `main` é fonte canônica de produção. Reconciliar SHA, PRs e deployments **live** na retomada.
- PR #470 (Draft): `sfjm/ampere-hero-facts-mobile-20261022`, commit inicialmente `6cb344c95a6feed2e9551c8ba8485bd6d788d1d4`; hero mobile + FACTS 2×2 do Ampère, SEM MERGE.
- PR #471 (Draft): `sfjm/capiitolo-ampere-home-price-cards-20261022`; valores, dois cards por empreendimento, páginas individuais e adendo RESF. SEM MERGE. Resolva o HEAD atualizado ao retomar; os SHAs intermediários não são HEAD garantido.
- URL de produção: `https://www.moretegra.com.br/`. Páginas: `/empreendimentos/ampere-brooklin/` e `/empreendimentos/capiitolo-piero-lissoni/`.
- Objetivo do proprietário: fechar com urgência, homologar e publicar para então reindexar no GSC/Bing. **Não declarar publicado enquanto não comprovar merge + SHA Production READY + HTTP.**

## Decisões comerciais aprovadas — não rediscutir
| Empreendimento | Unidade | Card normal | Card à vista |
|---|---|---:|---:|
| Ampère Brooklin | 62 | R$ 3.990.700 | R$ 3.791.165 |
| CAPIITOLO by Piero Lissoni | 33 | R$ 3.350.000 | R$ 3.135.000 |

- Dois cards distintos na Home para cada empreendimento, um normal e outro à vista; o à vista deve usar o mesmo destaque visual `cashOffer`/`cashSuffixSmall` que o CAPIITOLO já tinha.
- Textos do card normal: **Preço a partir de** / **R$ {valor}** / **Unidade {n} · condição promocional de referência R$ {valor}. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.**
- Textos do card à vista: **À vista** / **R$ {valor} à vista*** / ***Unidade {n} · condição à vista de R$ {valor}. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.**
- PROIBIDO acrescentar na UI termos técnicos, nome Match Point, explicações de cálculo, atribuições ao proprietário/coordenadora, justificativas comerciais, preço/m² não solicitado ou ressalvas não aprovadas.
- **Evidência interna**, nunca para copy pública: Match Point SP1 p.18 documenta CAPIITOLO unidade 33. Para Ampère unidade 62, referência R$ 3.990.700 e negociação orientada por coordenadora Rafaela (captura de WhatsApp traz mensagens em 22/10/2026); valor à vista aprovado pelo proprietário é R$ 3.791.165 (5% sobre R$ 3.990.700). Não trocar por R$ 3.790.500, que resultaria de uma base arredondada de R$ 3.990.000.
- RESF adendo já registrado em `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md` na PR #471.

## Nova tarefa solicitada pelo proprietário — NÃO CONCLUÍDA
**Como no Órbita Tatuapé, clicar nos cards diferentes deve abrir a mesma página individual, já selecionando a respectiva condição/preço.** O Órbita usa query `?unidade=2408`/`?unidade=1305`, seletor no bloco `#valores` e `URLSearchParams(location.search)` com fallback.

- Ampère: card regular deve abrir `/empreendimentos/ampere-brooklin/?condicao=promocional#valores`; card à vista `?condicao=avista#valores`; seletor com os dois valores, mantendo SEO, schema, FAQ e form.
- CAPIITOLO: regular `/empreendimentos/capiitolo-piero-lissoni/?condicao=promocional#valores`; à vista `?condicao=avista#valores`; mesmo comportamento.
- Observação de leitura: a branch PR #471 já exibia `detailUrl` com parâmetros para o Ampère durante esta retomada; não presumir que tenha sido implantado seletor funcional. Inspecionar `src-greenn/moretegra.js` e as duas páginas individualmente, conferir se CAPIITOLO já recebeu URLs distintas. Não reimplementar às cegas.
- Mobile-first: estado correto no carregamento direto com `?condicao=`, troca acessível por toque, valor/rotulagem correctos, sem salto ou estado contraditório, CTA leva ao Form46, analytics/consent preservados.
- CAPIITOLO individual usa bootstrap/fetch de outra fonte; conferir interação com preço inserido dinamicamente para evitar substituição/perda ao renderizar.
- Se PR #470 e #471 precisarem ser integradas, resolver conflitos e homologar combinação final antes do merge. Evitar alterações diretas na `main`.

## Evidências/estado conhecido e testes pendentes
- PR #471 registrou atualização dos quatro cards em `src-greenn/moretegra.js`, preço da página individual de CAPIITOLO e preço, FAQ e JSON-LD da página Ampère. O padrão textual simplificado foi aplicado aos quatro cards. **Ainda falta validação end-to-end do seletor por query e do render HTML nas páginas.**
- PR #470 atualiza hero H1 `Ampère Brooklin`, subtítulo 262m²/4 suítes/4 vagas, CTA e fatos 2×2. Confirmar imagem 1920×1080 HTTP, fallback e media queries 320/360/390/430.
- Conferir preços na Home e em páginas individuais, estado inicial e alternado, schema JSON-LD sem preços divergentes, FAQ, canonical estável sem query indexável, anchors, snapshots mobile, formulário Greenn (sem envio de lead real durante QA salvo autorização), botões WhatsApp, GTM/consent/GA4, regressões CI.
- Não confundir links `localhost:8080` fornecidos pelo usuário como links de produção; são evidência de LVR local, não resultados de release.
- Gates de publicação: atualização live do repo e Vercel, aprovação do proprietário (já autorizou urgência para publicar após validação, mas observar condições de QA), CI/testes relevantes e prova `main` + Production READY + HTTP. Só depois reindexar `/intro`? **URLs reais para reindexar: Home, Ampère e CAPIITOLO** (sem query como canonical).

## Sequência segura na nova conversa
1. Ler `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, RESF e este handoff. Resolver `main`, HEAD das PRs #470/#471 e deployments.
2. Auditar estado implementado nas duas páginas e cards; terminar seletor de condição estilo Órbita sem tocar na copy comercial.
3. Testar regressões; reconciliar PRs/branches, preparar release e só então publicar após gates.
4. Conferir produção e entregar URLs de reindexação Google/Bing.

## Fora de escopo
- Reformulação editorial do blog; outras páginas/projetos; endpoints/formulário, CRM, rastreamento e dados comerciais adicionais.
