# Pacote canônico de evidências — Auditoria SEO, links internos e funis

Data-base: 23/11/2026. Repositório: wagnerjfjunior/MoreNumTegra. Escopo: São Paulo e Rio. Status: DOCUMENTAÇÃO EM PR — REVISÃO INDEPENDENTE PENDENTE. Esta pasta não constitui aceite técnico ou autorização de implementação.

## Arquivos completos (ler, não apenas resumir)

1. [Relatório integral da auditoria](MNT_AUDITORIA_SEO_LINKS_FUNIS_INTEGRAL.md): 386 linhas, cobertura do sitemap, 10 funis, evidências, diagnóstico e limitações.
2. [Inventário de 89 URLs](MNT_INVENTARIO_89_URLS.csv): 84 URLs de sitemap e 5 URLs adicionais a investigar; matriz por rota.
3. [Plano de ação — 15 itens](MNT_PLANO_ACAO_15_ITENS.csv): prioridade, fontes, destinos, evidências e gates.
4. [GSC — consultas](MNT_GSC_CONSULTAS.csv): amostra selecionada de 17 consultas relevantes, 20/08–20/11/2026.
5. [GSC — páginas](MNT_GSC_PAGINAS.csv): amostra selecionada de 23 URLs prioritárias, 20/08–20/11/2026.
6. [OpenSEO — palavras-chave e funis](MNT_KEYWORDS_FUNIS.csv): amostra filtrada de 17 termos, volumes nacionais estimados, intenções e destinos.
7. [Plano de execução segura e verificações](MNT_PLANO_EXECUCAO_SEGURA.md).
8. [Divergências de governança e evidências](MNT_RECONCILIACAO_EVIDENCIAS.md).
9. [Tentativa de revisão e limitação de acesso Claude](MNT_CLAUDE_TENTATIVA_ACESSO_2026-11-23.md): tentativa externa leu 0/10 arquivos; parecer técnico ainda não emitido.
10. [Handoff de revisão pelo Claude](../../../../handoffs/MNT_SEO_LINKS_FUNIS_CLAUDE_REVIEW_2026-11-23.md).

## Proveniência / classificação

- **CONFIRMADO NO CÓDIGO (23/11):** sitemap com 84 URLs; leitura de HTML-fonte dessas rotas no GitHub (homepage via src-greenn/preview/index.html); links e IDs; inexistência no HTML do hub RJ dos IDs #projeto-1 a #projeto-4 referidos por páginas comerciais.
- **CONFIRMADO PELO OPENSEO:** crawl de 14/11, ID e541d749-de85-431a-ae15-a4020cbe01fe, com 87 HTTP 200; 4 páginas auxiliares noindex e 10 avisos informativos de extensão de title. Este crawl é anterior às edições de 23/11.
- **CONFIRMADO PELO GSC (via OpenSEO):** janela 20/08–20/11/2026; consultas e páginas em amostra selecionada. Google arredonda/média posição; não extrapolar para ranking atual nem para tráfego de todas as consultas.
- **ESTIMATIVA EXTERNA (OpenSEO/DataForSEO):** 4 sementes: FGTS, Lapa, Tatuapé e Perdizes, Brasil/português. Volumes mensais estimados; variantes podem compartilhar volume e listas brutas continham termos geograficamente incorretos.
- **PROPOSTA, NÃO EVIDÊNCIA:** 10 funis, 15 ações, mapas TOFU→MOFU→BOFU, intensificação de links e novos conteúdos. Devem passar por revisão independente.

## Ressalvas essenciais para o revisor

1. **Ainda não houve novo crawl de produção após as últimas alterações**; diferenciar código, renderização, runtime e indexação efetiva.
2. **Relatório não é inventário completo de backlinks recebidos ou ranking de 84 páginas**; a planilha de GSC é uma seleção, não extração exaustiva.
3. **Contagem de hyperlinks no HTML-fonte não é contagem de hyperlinks renderizados** quando há JavaScript, especialmente na homepage.
4. **Zero links contextuais de saída não equivale a página órfã**, uma vez que ela pode receber links da homepage/hub.
5. **FGTS não é oferta garantida:** depende de elegibilidade do trabalhador, finalidade residencial, unidade e operação; não aplicar em salas comerciais.
6. **RJ tem contrato comercial distinto:** leads com repasse local, não transplantar identidade, contato ou Form46 de SP indiscriminadamente.
7. **URLs de imagens/plantas não são links editoriais entre páginas:** não misturar no cálculo de autoridade da malha.
8. **CSV de evidência foi arquivado em formato normalizado para intercâmbio** e pode conter coluna auxiliar de índice; a versão integral do relatório é preservada em Markdown.

## Ordem e contrato de revisão

Claude deve começar por [handoff](../../../../handoffs/MNT_SEO_LINKS_FUNIS_CLAUDE_REVIEW_2026-11-23.md), ler o [CLAUDE.md](../../../../CLAUDE.md) e os arquivos canônicos de governança. Entregar parecer próprio, confrontando amostras com URLs reais e indicando erros no plano, não apenas concordância. Sem editar runtime, SEO, formulário, mídia, validadores, preços ou funis até aprovação específica de Wagner. Branch/PR de auditoria **não autoriza merge nem publicação**.
