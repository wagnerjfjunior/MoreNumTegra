# Solicitação formal de revisão independente ao Claude — MoreNumTegra SEO, funis e links

**Data-base da auditoria:** 23/11/2026  
**Repo canônico:** wagnerjfjunior/MoreNumTegra  
**Branch de documentação:** docs/auditoria-seo-funis-revisao-claude-20261123  
**Estado da tarefa:** AVALIAR DOCUMENTAÇÃO, FONTES, METODOLOGIA E PLANO — SOMENTE LEITURA. NÃO IMPLEMENTAR, NÃO MESCLAR, NÃO PUBLICAR.

## Mensagem de entrada para o Claude

Você foi designado como **revisor adversarial independente** da auditoria de SEO e arquitetura de links internos do MoreNumTegra. O objetivo não é validar por concordância a análise anterior, mas encontrar os erros, omissões, prioridades incorretas, termos sem demanda real, quebra de governança e oportunidades perdidas que impediriam a conversão orgânica.

Leia os **documentos completos** e os **5 datasets**, não apenas o resumo, antes de opinar. Assuma que nenhuma recomendação anterior é aprovada automaticamente.

### 1) Resolver estado live e governança SFJM/RESF antes do mérito

1. Resolver o SHA da main atual e o head da branch de auditoria; conferir PRs #595 e #596 na main e eventuais PRs posteriores.
2. Ler CLAUDE.md, AGENTS.md, .sfjm/project.json e os topos atuais de bootstrap/BOOTSTRAP_CANONICO.md, handoffs/CURRENT.md, docs/PROJECT_STATUS.md, docs/NEXT_SAFE_ACTION.md e docs/BLOCKED_ACTIONS.md.
3. Ler docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md; docs/frameworks/resf/v1/RESF_ORBITA_PAGE_MODEL_2026-11-23.md e baselines relevantes.
4. Sinalizar divergência: os topos do kit SFJM de 23/11 ainda falam em PR #595 sem merge, embora PRs #595 e #596 constem merged ao vivo. **Não corrigir silenciosamente nem inferir autorização.**
5. Separar a documentação proposta de estado publicado. Esta tarefa não libera mudanças materiais ou atualizações em produção.

### 2) Materiais obrigatórios da auditoria (leitura completa)

Pasta: docs/seo/auditorias/2026-11-23/

- INDEX.md — índice de evidências e escopos.
- MNT_AUDITORIA_SEO_LINKS_FUNIS_INTEGRAL.md — auditoria integral (todas as seções, inclusive inventário por rota e lacunas).
- MNT_INVENTARIO_89_URLS.csv — conferir as 84 rotas do sitemap e 5 extras.
- MNT_PLANO_ACAO_15_ITENS.csv — confrontar cada ação A01..A15 com o HTML real e contrato do produto.
- MNT_GSC_CONSULTAS.csv — consultas priorizadas, recorte 20/08 a 20/11/2026.
- MNT_GSC_PAGINAS.csv — páginas priorizadas, mesmo período.
- MNT_KEYWORDS_FUNIS.csv — sementes/caudas/volume e URL proprietária; dados estimados.
- MNT_PLANO_EXECUCAO_SEGURA.md — gates, fases, métricas e riscos.
- MNT_RECONCILIACAO_EVIDENCIAS.md — discrepâncias, fonte e grau de comprovação.

Fontes complementares: sitemap.xml, src-greenn/preview/index.html, src-greenn/blocks/01-html-inicial.html, src-greenn/moretegra.js, src-greenn/blog/**, src-greenn/empreendimentos/**, src-greenn/regioes/**, src-greenn/rio-de-janeiro/**, vercel.json e dossiês SEO/FGTS. Se a rota do site não corresponder ao caminho sugerido no relatório, registrar exatamente.

### 3) Perguntas que o Claude deve responder criticamente

**Escopo, integridade e metodologia**
- As 84 URLs auditadas correspondem às 84 do sitemap atual? O inventário tem exatamente 89 linhas e classifica as 5 extras corretamente? Existem páginas relevantes fora desse universo, no robots, sitemap, arquivos ou runtime?
- A homepage representada por src-greenn/preview/index.html é idêntica ao runtime? Como as versões Greenn/preview e o JavaScript geram links e filtros? Há links não encontrados por HTML estático?
- O crawl OpenSEO de 14/11 com 87 URLs está sendo indevidamente apresentado como auditoria pós-23/11? Quais conclusões exigem novo crawl e validação de DOM?
- Qual a real distribuição de links ENTRANTES e SAÍNTES, por contexto/editorial vs nav vs footer vs galeria vs cards vs JS? Há erros ao chamar páginas de "órfãs"?
- Verificar literalmente os href /rio-de-janeiro/#projeto-N e a ausência/presença dos IDs no destino. O conserto correto é URL de projeto ou fragmento existente? Qual risco de regressão?

**Estratégia SEO baseada em dados**
- GSC da janela 20/08–20/11: quais consultas têm demanda orgânica real, de marca vs não-marca? As métricas justificam a prioridade? Posicionamentos médios 5–15 não garantem ganho de CTR; há SERP/concorrência a investigar?
- OpenSEO/DataForSEO: as caudas e os volumes são geograficamente relevantes (SP vs RJ, aluguel vs venda)? Variações são estimativas compartilhadas? Existe canibalização entre artigo, região e página de empreendimento?
- Não criar URLs novas se a intenção já tem proprietário adequado; propor owner único por cluster, páginas de suporte quando indispensáveis e links contextualizados por benefício real.
- Reavaliar os 10 funis. Quais têm evidência suficiente, quais são apenas hipótese e quais precisam ser eliminados, fundidos ou divididos?

**Contratos comerciais e conversão**
- FGTS: jornada guia → região/prontos → imóveis residenciais candidatos → Form46; não afirmar que empreendimento pronto ou unidade aceita automaticamente FGTS. Testar escopo sem tomar FGTS como exclusivo de Órbita.
- ODE, Órbita, Ária, Mozae, Ampère, Elo Duo e YPY: priorizar SEO por demanda e conversão potencial, não por repetir âncoras.
- RJ: não introduzir corretora/telefone/canais de SP; validar modelo de repasse a profissional local, formulário RJ e consentimento. Não alterar proposta comercial sem validação.
- Diferenciar studios residenciais, NR e salas comerciais. Acompanhar para onde os CTAs realmente levam; não inventar lead events.

**Acessibilidade, HTML, semântica e schema**
- Distinguir texto visível, aria-label, heading, links HTML rastreáveis, dados JS, fragmentos válidos e CTAs. Não supor que aria-label sozinho resolve SEO.
- JSON-LD deve representar conteúdo real visível. Dataset/FAQPage/Article/ItemList somente quando apropriado, não por "quantidade de rich results".
- Identificar links para noindex, redirects, #id ausentes, target equivocado, links relativos/canonicals e relações editoriais sem sustentação.

### 4) Entrega obrigatória do parecer

Estruture o parecer nos seguintes blocos, com evidência e contrapontos:

1. **STATE LIVE:** main SHA, branch SHA, PR #595/#596 e divergências documentais; distinguir fato verificado vs registro antigo.
2. **VEREDITO:** aprovar / aprovar com revisões / rejeitar metodologia / rejeitar plano, com motivação. Não suavizar críticas.
3. **MATRIZ DE INCONSISTÊNCIAS:** ID, severidade, URL/arquivo/linha, trecho literal, falha, fonte independente, consequência, correção sugerida, confiança (alta/média/baixa).
4. **COBERTURA POR URL:** confirmar inventário 84+5 e listar rotas faltantes, falsos positivos e riscos. Distinguir links de entrada, saída, DOM renderizado e HTML.
5. **FUNIS REVISADOS:** para cada um dos 10 funis, owner de intenção, head term, caudas validadas, TOFU, MOFU, BOFU, CTA, critérios de elegibilidade, links origem→destino, prova de interesse e oportunidade real.
6. **PRIORIZAÇÃO ALTERNATIVA:** reordenar A01..A15 usando impacto, esforço, risco, demanda, potencial de leads e dificuldade de validar. Justificar cada mudança.
7. **GAPS:** dados novos que faltam de GSC/GA4/CRM/OpenSEO/keywords, SERP, screenshot mobile/desktop, fontes de preço/estoque e crawler; propor coleta objetiva.
8. **PLANO POR PR:** definir lotes mínimos, testes, regressão/rollback e gate de aprovação. NÃO editar páginas e NÃO executar merge.
9. **PERGUNTAS AO PROPRIETÁRIO:** somente decisões realmente necessárias, objetivas e não respondidas pela documentação.
10. **PARECER CONSOLIDADO PRONTO PARA SFJM:** Markdown autocontido, com inventário de fontes, evidence status e próxima ação única sugerida como PROPOSTA, jamais mudança automática do próximo gate.

### 5) Critérios de rejeição da revisão

Uma revisão que apenas diga "está ótimo", que confunda 84 URLs de sitemap com 87 do crawler antigo, que some volumes das variantes, que indique FGTS garantido, que atribua ganhos de ranking antes de medições, ou que ignore os links RJ sem fragmento, é **insuficiente**.

**Retornar o parecer antes de qualquer implementação.** Não criar branch/PR adicional, não alterar o runtime e não editar os documentos de estado como se a revisão já estivesse aprovada. A decisão final sobre implementação pertence ao proprietário.
