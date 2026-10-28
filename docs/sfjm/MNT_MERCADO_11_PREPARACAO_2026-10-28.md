# SFJM — Mercado: onze artigos preparados para avaliação

TASK: MNT-MERCADO-11-PREP-20261028.

Autoridade: prompt mestre anexado e autorização expressa do proprietário para executar o escopo completo em 28/10/2026. Escopo autorizado é pesquisa, redação, implementação, validações disponíveis e preparação para avaliação. Não autoriza merge, publicação, alteração de indexabilidade ou submissão em lote.

BASE_SHA: bbe59c7a0b7b8a597826d56f6bc01d5291d9dfa5.
BRANCH: editorial/mercado-11-preparacao-20261028.
PR/HEAD: resolver no GitHub; recibo remoto será acrescentado após abertura.

Produção observada antes da preparação: dpl_iTarC8LY4vvXq44mGGf9ekCg3fCi / READY / mesmo SHA da base. Lote não chegou a main ou Production. Não há merge/deployment do candidato alegado.

## Entrega

- Onze artigos completos em Markdown e HTML, cerca de 1.800–1.900 palavras editoriais por página; mapa de SEO/links/fontes em JSON.
- Matriz de Mercado + Dicas + Lapa: 61 termos e variantes, com contagens no corpus de 13 artigos existentes; fontes Planner e GSC com limites explícitos.
- GSC 142 linhas consulta × página, 27/09–24/10/2026; quatro consultas comerciais relacionadas na matriz, nenhuma linha exata das 11 principais editoriais exposta.
- Seis brutos Planner de 29/09 lidos integralmente (16.257 linhas / 12.635 chaves normalizadas); histórico de 3.859 não reconstruído por ausência dos brutos originais de 13/09. Resumo M3 de 65 linhas mantido separado.
- Onze rotas novas noindex com canonical www e rewrites explícitos. Nenhuma alteração nos onze placeholders, Dicas, Lapa, hubs, sitemap, redirects, catálogo, preços, Form 46 ou mensuração.
- Fontes vinculadas nos textos e registro quantitativo: exemplos matemáticos separados de dados de mercado e regras datadas. Sem garantia de valorização/renda.

## Verificações e limites

Validator do lote e regressões específicas passaram localmente. Onze rotas HTTP 200 em simulação local; 11 origens de produção HTTP 200/noindex. Das 42 verificações HTTP externas, 40 retornaram 200 e dois endpoints CNJ 403; texto oficial indexado foi consultado sem contornar restrição.

JSON-LD local e paridade textual conferidos. Schema.org/Google oficiais, layout mobile/desktop em navegador, performance e conversão real permanecem NOT_EXECUTED/NOT_VERIFIED. Chromium ausente e download inválido; extensão não completou conexão e navegador remoto sem acesso ao checkout/Preview. Nenhum envio de formulário ou mensagem WhatsApp.

Uma PR de preparação concentra os arquivos e a matriz comum; cada artigo é revisável individualmente. Publicação deve ocorrer por página com gate próprio, resolução de links entre candidatos e nova reconciliação de main/deployment. Não tratar CI da preparação como aceite editorial/visual ou indexação.

## Arquivos e continuidade

Pacote: `docs/editorial/mercado-2026-10-28/README.md`.
Mapa: `docs/editorial/mercado-2026-10-28/mapa-artigos.json`.
Plano: `docs/editorial/mercado-2026-10-28/plano-publicacao.md`.
Validator: `scripts/validate-mercado-editorial-20261028.mjs`.

Next safe action deste candidato: revisão editorial/visual e conferência das fontes jurídicas/tributárias; consulta exata de luxo ainda pendente no provedor. Não reiniciar redação nem solicitar novamente autorização para a preparação já concluída.

Rollback da preparação: descartar/fechar a branch e PR sem merge não altera produção. Após futuro release, rollback por revert da alteração aprovada e verificação do deployment real, nunca reset forçado de main.

Não foram atribuídas horas aceitas ao programa nem alterados modelos de progresso. A produção e seus históricos permanecem governados pelos ponteiros integrados de main.
