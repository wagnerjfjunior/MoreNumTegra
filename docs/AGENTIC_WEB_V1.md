# AGENTIC-WEB-V1-PILOT — MoreNumTegra

## Atualização operacional — 25/11/2026 — Origin Trial

PR #630 integrada em `9cd49d921a836659db2715e378e8baacc3162472`, 15/15 workflows aprovados, Vercel READY `dpl_6Sfgx3NKqPxwQBVs23DqhQagkSR8`. Proprietário reportou PageSpeed com quatro auditorias ainda N/A; aceite nativo não concluído. Autorização explícita posterior: corrigir e publicar Origin Trial. Esta correção adiciona somente header HTTP `Origin-Trial` em vercel.json, host canônico www.moretegra.com.br, todos os caminhos; token público first-party fornecido pelo proprietário, expira 2027-03-30 00:00 UTC. A implementação de ferramentas continua restrita à homepage. Sem alteração de Form46, GTM, GA4, LGPD, sitemap, ARD ou demais páginas. Validar header ao vivo, API nativa e auditorias; não presumir que PageSpeed habilite a API. Rollback: remover somente a regra adicionada. Os registros históricos abaixo não representam o estado atual. Ponteiros SFJM globais defasados; não sobrescrever a frente concorrente #629, que trata de GTM/GA4. Reconciliação global permanece pendente.

Data da implementação: 25/11/2026. Repositório: wagnerjfjunior/MoreNumTegra. Homepage piloto: https://www.moretegra.com.br/.

**Estado histórico pré-merge:** implementação preparada em branch/PR; ver atualização operacional acima. Teste JavaScript simulado efetuado; execução nativa WebMCP, Lighthouse pós-publicação, Tag Assistant e performance mobile ainda NÃO VERIFICADOS.

## 1. Estado inicial e governança

- main observado antes de iniciar: 531043561e32c9e6d93e0b7f059a78e3f4fe26c6 (PR #627).
- Deployment de produção observado: dpl_3RNRPceJfip42bBuiUhHumxXZ8Wt, READY, alias www.moretegra.com.br e mesma source SHA.
- PR aberta em paralelo: #629, documentação de continuidade GTM/GA4. Seus cinco ponteiros SFJM não foram editados por esta iniciativa.
- Fontes lidas: bootstrap/BOOTSTRAP_CANONICO.md, CLAUDE.md, AGENTS.md, .sfjm/project.json, handoffs/CURRENT.md, docs/PROJECT_STATUS.md, docs/NEXT_SAFE_ACTION.md, docs/BLOCKED_ACTIONS.md, RESF_CONVERSION_GUARDRAILS e RELEASE_GUARD.
- A fonte autoritativa de próxima ação de 24/11/2026 é anterior ao main observado em 25/11; reconciliar a documentação SFJM após a PR #629, sem sobrescrever seus registros.
- Política vigente: branch e PR; merge e deploy exigem autorização específica e controles de release. Vercel só habilita deployments automáticos na main, segundo vercel.json.

## 2. Arquitetura e fronteiras

O JavaScript existente src-greenn/moretegra.js mantém o catálogo e renderiza os cartões para a interface visual. O novo src-greenn/preview/agentic-web.js registra ferramentas opcionais quando o navegador implementa document.modelContext.registerTool. Ele lê somente os cartões DOM efetivamente apresentados na homepage, uma única vez, sem duplicar catálogo, copiar dados comerciais para outro arquivo, carregar SDK ou inserir backend.

A ativação exige simultaneamente hostname www.moretegra.com.br, rota /, suporte ao método WebMCP e cartões renderizados. Ausência de API = site convencional permanece funcional, sem requisições, armazenamento ou alteração da UI.

**Limitação de dados:** o snapshot segue os cartões inicialmente renderizados. Uma homepage carregada com filtro pré-ativado (por exemplo estagio=pronto) poderá ter subconjunto de resultados. Área só é extraída quando há texto em m² no card; dormitórios, suítes e vagas não foram convertidos em filtros numéricos porque o contrato comercial dos cards não oferece valores normalizados suficientes. Sem inventar dados não publicados.

## 3. Ferramentas imperativas

| Nome | Contrato | Efeito |
|---|---|---|
| search_properties | query, region, neighborhood, stage, min_area/max_area, min_price/max_price, limit até 40 | Consulta de cards; combina busca e filtro |
| get_property_details | slug | Dados públicos e variantes do mesmo empreendimento |
| compare_properties | slugs (2 a 4 distintos) | Comparação objetiva de campos existentes |
| get_property_location | slug | Cidade, zona, bairro e URL canônica; não inventa endereço |
| get_property_price | slug | Preços publicados, notas comerciais e referência temporal quando explícita |
| request_visit | Sem parâmetros | Somente seleciona a intenção Agendar visita no formulário e foca o primeiro campo; NÃO agenda ou envia |

Todos os tools têm nomes estáveis, inputSchema JSON Schema com limites e additionalProperties=false; respostas JSON serializadas; leitura com annotations.readOnlyHint=true quando apropriado. Erros são informados como objetos sem expor stack, PII ou segredo. Nenhuma consulta é classificada como conversão.

**Não há ferramenta separada filter_properties:** search_properties já cobre filtros sem duplicação. Não há request_sales_contact imperativa, para evitar nomes duplicados: esta ferramenta pertence ao formulário declarativo.

## 4. Formulário declarativo e segurança LGPD

Em src-greenn/preview/index.html, o Form46 existente recebe toolname=request_sales_contact e descrições de parâmetros. Não existe toolautosubmit. Campos nome, email, telefone_display, pais e texto-livre são os reais já utilizados. Tenant 313, Form46, validação, máscara, consentimento, UTMs, tratamento de erros, honeypot, prevenção de envio duplicado e endpoint Greenn continuam definidos na implementação anterior. O agente pode facilitar preenchimento; o visitante revisa e confirma manualmente o envio. Testes não transmitem leads reais.

O módulo agente não acessa cookies, localStorage, sessionStorage, endpoint Greenn ou dados pessoais do formulário e não despacha eventos GA4. Eventos existentes só podem representar conversão comercial quando o ciclo de submissão já existente for confirmado. Não registrar parâmetros de ferramentas ou PII em Analytics.

## 5. WebMCP e ARD — maturidade

Fontes para homologação: Chrome WebMCP (declarativa e imperativa), W3C WebMCP em desenvolvimento, Lighthouse Agentic Browsing e llmstxt.org. A API é experimental e pode exigir flags ou Origin Trial; não é garantida na versão estável de todos os navegadores. O uso de feature detection permite degradação segura; não alegar integração nativa com agentes comerciais com base apenas em mocks de JavaScript.

A evolução ARD substituiu referências antigas a ai-catalog.json por versão baseada em /.well-known/ard.json. A infraestrutura atual não disponibiliza endpoint MCP remoto, OpenAPI ou A2A real. Um manifesto anunciando ferramentas client-side como HTTP remoto seria enganoso. Por isso, NÃO foi introduzido manifesto fictício. A auditoria ARD permanece não aplicável até existir contrato verificável para recursos realmente disponíveis.

## 6. SEO e performance

Preservados title, canonical, Open Graph, Twitter, H1/H2, JSON-LD, robots, sitemap, llms.txt, footer e links. Nenhuma modificação nos módulos de mensuração, no script principal de catálogo, CSS ou nas páginas individuais. Novo script é defer e não faz requests adicionais, além do próprio carregamento deste arquivo. Não introduz dependência de runtime.

Baseline recebido pelo proprietário como USER_REPORTED: árvore de acessibilidade aprovada, CLS 0,034 e llms.txt aprovado. Não constitui medição nova. Após promoção, medir LCP, INP de campo quando houver, CLS e Lighthouse mobile em ambiente comparável, com registro da versão e das flags do navegador. Metas indicativas: LCP até 2,5s, INP até 200ms, CLS até 0,1; sem alegar metas atendidas sem medições.

## 7. Testes executados e pendentes

Mock de execução JavaScript realizado em 25/11: registrou as 6 ferramentas, encontrou Nova Vivere por área e estágio, 2 empreendimentos sob teto de preço, validou comparação, detalhes, slug/URL, parâmetros inválidos e preparo de visita. O contador de envio do formulário permaneceu zero.

Teste automatizado reproduzível: node --check src-greenn/preview/agentic-web.js e node scripts/test-agentic-web.mjs, com workflow dedicado de CI. A aprovação desse teste é evidência de **simulação de API**, não teste real com Chrome/Google/ChatGPT.

**Pendências de aceite:** browser compatível e sem suporte, Lighthouse 7 auditorias, telas 360/390/430/900/1440, teclado/leitor de tela, testes dos filtros, CTA, formulário manual, GTM/GA4 e consentimento por Tag Assistant, medição antes/depois, resposta do CRM real autorizada, CI do head e verificação READY da produção após merge. Não criar lead fictício sem autorização.

### Matriz das sete auditorias pré-release

| Lighthouse Agentic Browsing | Baseline USER_REPORTED | Estado do piloto |
|---|---|---|
| Árvore de acessibilidade | Aprovada | Não revalidada |
| CLS | 0,034 | Não revalidado |
| llms.txt | Aprovada | Preservado, não revalidado |
| Detecção de formulário | Não aplicável | Marcação adicionada; teste nativo pendente |
| Ferramentas registradas | Não aplicável | Implementadas condicionalmente; teste nativo pendente |
| JSON Schemas | Não aplicável | Esquemas e teste unitário; teste nativo pendente |
| Manifesto ARD | Não aplicável | Não aplicável: sem MCP remoto real |

## 8. Regressões a prevenir

Fluxo de Form46, eventos de analytics, consentimento, CTAs, WhatsApp, catálogo SP, SEO e metadados devem permanecer inalterados. Não declarar que merge é produção ou que um score Lighthouse experimental aumenta ranking. Não introduzir tools na Greenn apenas pelo fato de estarem presentes no Preview Vercel: o contrato da Greenn exige um único JS customizado da página 292 e validação própria, fora desta PR.

## 9. Release, gate e rollback

PR da branch feature/agentic-web-v1-homepage-pilot para main. Antes de merge, confirmar o HEAD atual, checks e ausência de conflito com PR #629. **Merge, deploy e homologação em produção dependem de autorização específica da PR.**

Rollback preferencial após release: PR de reversão apenas dos novos arquivos/atributos WebMCP, preservando correções posteriores. O deployment anterior dpl_3RNRPceJfip42bBuiUhHumxXZ8Wt pertence à revisão 5310435; revalidá-lo antes de rollback completo, pois reverter toda a produção desfaz alterações independentes que venham a ocorrer. Conferir aliases, SHA, site, formulário e Lighthouse após rollback.

## 10. Expansão excluída

Páginas de empreendimento, hubs SP/RJ, Caminhos da Lapa, blog, FECH.AI, n8n, Make, Meta e integrações externas exigem análise e autorização adicionais. Nenhum rollout geral nesta iniciativa.
