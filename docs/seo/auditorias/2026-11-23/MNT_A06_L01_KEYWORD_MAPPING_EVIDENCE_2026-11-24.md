# MNT-A06-L01 — Keyword Mapping & On-Page SEO Evidence

Data 2026-11-24. Status: **DOCUMENTATION_ONLY / CANDIDATE / RUNTIME BLOCKED**.
Base main resolvida: `4f755ac39c2618d62eeb63a6809e3e689b92c2a2` (#616). Fonte canônica integrada permanece main. Esta proposta não substitui o kit antes de merge documental autorizado.

## 1. Autoridade e escopo

Após recuperar o chat travado “Documentação FGTS Tegra”, Wagner confirmou A06, exigiu análise e justificação (não fazer no chute), aprovou pesquisa local/histórica/canibalização e disse “ok siga” para preparar a implementação e registrar evidências. Isto autoriza a preparação documental em branch/PR, sem merge/deploy. A exceção específica de alterações nos validadores/snapshots protegidos **não foi explicitamente autorizada**; portanto nenhum arquivo runtime ou validador foi alterado. A documentação propõe o delta exato e uma futura autorização delimitada.

Fontes: PR #597 (matriz A01–A15, documentação ainda aberta), #598 (reconciliação anterior aberta), #606, #607, #611; GSC via [OpenSEO](https://app.openseo.so/p/a071ab48-dda6-4b7c-bf71-2e3e3d40694d), propriedade URL-prefix https://www.moretegra.com.br/; DataForSEO/Google Ads via OpenSEO, BR/pt e cidade Sao Paulo,State of Sao Paulo,Brazil (1001773). Consultas em 24/11/2026, GSC web, dataState final. SERP mobile BR/pt, quatro termos, depth 10, três leituras por termo. Dados de mercado estimados não são cliques próprios nem previsões.

## 2. Recuperação do estado A01–A05 e drift

#594 (Órbita valor sob consulta, FGTS/Livelo), #595 (guia FGTS transversal), #596 (imagens), #599 A01 (18 links RJ), #600 A02 (marcador origem=fgts e texto-livre Form46, evidência CRM registrada #598), #602 A03 (vitrine blog), #604 (reconciliação de três validadores do Órbita), #611 A05 etapa 1 (links regionais shell e template, facts, DSG Office 32 m² unidade 208 R$355.000 nov/26 conforme decisão e PR) integradas no GitHub segundo leitura prévia das PRs. Não confundir integração com aceite visual ou QA live Vercel; não repetimos testes de produção nesta auditoria. Guia: /blog/mercado/usar-fgts-comprar-apartamento/. FGTS transversal residencial condicionado a elegibilidade, não Office; não restaurar Product/Offer histórico do Órbita. A04 não encerrada: #606 draft, #607 draft empilhada, #581 antiga draft aberta. Usuário havia confirmado Órbita/RJ/Garden/Nova Vivere/Reserva/home Caminhos como aprovados; confirmação do usuário, não nova auditoria.

Ponteiros main no topo de 24/11 referem-se à main ed9978d (#608), mas main já contém #610, #611, #612, #614, #615, #616 (histórico de PRs observado). Kit global está defasado; esta proposta reconcilia **somente a frente A06 e o histórico pertinente**, não certifica o restante do projeto. #613 (Invest) e #609 (validador Órbita) permanecem abertos na última consulta. Reindexação RJ permanece tarefa independente, não executada aqui. Não encerrar #581/#598/#603 automaticamente, não tocar outras frentes.

## 3. Baseline GSC por página

| Página | 21/08–21/11 impressões / cliques / CTR / posição | 25/10–21/11 impressões / cliques / CTR / posição |
|---|---|---|
| Ampère | 286 / 1 / 0,35% / 9,7 | 183 / 1 / 0,55% / 9,0 |
| Ária | 491 / 7 / 1,43% / 9,3 | 352 / 6 / 1,70% / 9,0 |
| YPY | 221 / 1 / 0,45% / 9,0 | 160 / 0 / 0% / 8,9 |
| Mozae | 297 / 4 / 1,35% / 9,6 | 193 / 1 / 0,52% / 9,1 |
| Elo Duo | 224 / 3 / 1,34% / 10,3 | 134 / 1 / 0,75% / 9,9 |
| Órbita | 260 / 9 / 3,46% / 9,5 | 177 / 7 / 3,95% / 9,1 |
| ODE | 189 / 9 / 4,76% / 8,0 | 135 / 6 / 4,44% / 7,5 |

Lote 1: Ampère (consultas de marca em 5–7 sem cliques) e Ária (maior exposição). Lote 2 candidatos YPY e Mozae; Elo Duo reavaliar; ODE/Órbita observar. Amostra pequena. Query/page e device não reconciliam integralmente com page totals; não calcular participação mobile por esses recortes.

### Consultas GSC 25/10–21/11 (filtro URL exata)
| Página | Consulta | Impressões | Cliques | Posição |
|---|---|---:|---:|---:|
| Ampère | tegra ampere | 29 | 0 | 6,1 |
| Ampère | ampere tegra | 25 | 0 | 5,7 |
| Ampère | ampere brooklin | 14 | 0 | 26,6 |
| Ampère | tegra ampere brooklin | 12 | 1 | 8,5 |
| Ampère | ampere brooklin tegra | 7 | 0 | 8,3 |
| Ária | aria higienopolis | 74 | 0 | 9,6 |
| Ária | ária higienópolis | 28 | 0 | 13,4 |
| Ária | aria tegra | 17 | 1 | 3,9 |
| Ária | aria higienopolis tegra | 16 | 0 | 6,3 |
| Ária | aria higienópolis | 16 | 0 | 18,3 |
| Ária | tegra aria higienopolis | 4 | 0 | 4,8 |

## 4. Keyword metrics (estimativas)

28 candidatos consultados, 12 linhas nacionais retornadas; duas seeds, 79+80 sugestões brutas, com ruído descartado. Dados ausentes não equivalem a zero. CPC/competição são publicidade, não dificuldade orgânica. KD zero/inexistente inconclusivo; não declarar facilidade. Semrush sem unidades de API, sem validação independente.

| Termo | BR volume | SP capital volume | CPC SP R$ |
|---|---:|---:|---:|
| ária higienópolis (grupo com/sem acento) | 1900 | 1600 | 1,33 |
| apartamento higienopolis | 1300 | 720 | 1,58 |
| apartamento brooklin | 1000 | 720 | 1,46 |
| ampère brooklin | 320 | — | — |
| ampere brooklin | 170 | — | — |
| studio higienopolis | 140 | 70 | 3,79 |
| ampere tegra | 20 | — | — |
| aria tegra | 20 | 20 | 0,58 |
| aria higienopolis preço | 20 | 10 | 0,58 |
| aria higienopolis tegra | — | 10 | 0,36 |
| tegra aria higienopolis | 20 | não consultado | — |

Não somar variantes de volume agrupado. Intenção automatizada não é autoridade: SERP e propósito da página qualificam termos. Nome exato = descoberta de produto; marca = navegação/intenção mista; preço = comercial; genéricos = descoberta regional, studio = investigar hub e produto sem canibalização.

### Séries mensais estimadas (nov/25–out/26, em ordem cronológica)
- Ária SP: 1000,1300,1600,1600,1600,1600,1300,1300,1300,1900,1900,1900.
- Apartamento Brooklin SP: 880,720,880,720,880,880,720,590,720,720,720,590.
- Apartamento Higienópolis SP: 720,720,720,720,880,720,720,590,720,880,720,720.
- Studio Higienópolis SP: 90,70,70,90,90,70,70,50,70,70,70,70.
- Ampère Brooklin BR (acento): 390,320,320,390,390,260,390,320,320,320,260,320.
- Ampere Brooklin BR (sem acento): 210,210,210,140,170,170,170,140,140,210,210,170.
- Ária SP +90% entre nov/25 e out/26 (não variação anual completa; estimativa). Ampère demanda nacional relativamente estável; ausência de série local impede afirmar tendência SP.

## 5. SERP e canibalização

Mobile BR amostra: Ampère tem resultados Tegra oficial, amperebrooklin.com.br, Imóveis Pro, RE/MAX, tegrabrooklin.brbaseus.com.br; argumentos de torre única, metragem, suítes, alto padrão. Ária: Tegra, QuintoAndar, Apto.vc, VivaReal, IA Apartamentos; tipologias, localização, lazer, pronto. SERP automatizada incluiu application errors, redirecionamentos, variação entre três leituras; não reproduzir rankings como definitivos. Não temos prova do snippet efetivo do próprio site para todas as consultas, nem causalidade do CTR.

GSC query+page de toda a propriedade, 21/08–21/11:
| Consulta | Produto (imp/pos) | Outra URL (imp/pos) |
|---|---|---|
| ampere tegra | 43/6,3 | Brooklin 1/61 |
| tegra ampere | 36/6,6 | sem outra linha |
| ampere brooklin | 14/26,6 | Brooklin 6/49,3 |
| ampere brooklin tegra | 18/8,3 | Brooklin 1/3 |
| tegra ampere brooklin | 25/7,7 | Brooklin 2/7 |
| aria higienopolis | 93/9,9 | Higienópolis 5/57,4 |
| ária higienópolis | 33/13 | Higienópolis 20/53,3 |
| aria higienopolis tegra | 18/6,6 | Higienópolis 2/25; Mozae 1/33 |
| aria tegra | 31/5,9 | Higienópolis 1/18 |

Nenhuma evidência material de canibalização prejudicial; há sobreposição residual. Recortes exatos apartamento brooklin, apartamento higienopolis, studio higienopolis não retornaram linhas; busca ampla por brooklin/higien retornou 17/21 linhas e uma consulta “apartamento na planta higienopolis” (hub, 1 impressão pos14). Não generalizar para todas as variantes. Hubs atuais já possuem title/H1 regionais: Brooklin “Apartamentos Tegra no Brooklin | MoreTegra”; Higienópolis “Apartamentos Tegra em Higienópolis: prontos e na planta”. A06 não altera hubs.

## 6. Mapa HTML e candidato editorial

- Ampère: title nome completo + Tegra + 262 m²/4 suítes (diferenciais factuais, não volume comprovado); description qualificação alto padrão + vagas/dois terraços; H1 da #607 deve ser reutilizado após gate próprio; H2/H3 plantas, Living Double View, localização, pagamento, lazer são mapeamento futuro, não edição desta etapa.
- Ária: title nome completo + Tegra + studios/apartamentos prontos; description metragens 30/53 m² + preços/plantas/condições; H1 existente preservado; H2/H3 tipologias, localização, lazer rooftop, pagamento são mapeamento futuro. A referência atual de preços existe no código; não publicar novo preço nem disponibilidade.
- Generic ownership: /regioes/brooklin/ e /regioes/higienopolis/; studio Higienópolis explorar relação com /investimentos/studios-e-salas-comerciais/ sem alterar nesta PR. Não prometer ganhos, não repetir palavras artificialmente.

### Ampère Brooklin

- Title (57 caracteres): **Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes**
- Description (131 caracteres): **Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.**
- Escopo: seis tags HTML e dois campos do nó WebPage (não global replace).

| Campo | Antes | Depois |
| --- | --- | --- |
| HTML title | `<title>Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin</title>` | `<title>Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes</title>` |
| description | `<meta name="description" content="Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.">` | `<meta name="description" content="Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.">` |
| og:title | `<meta property="og:title" content="Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin">` | `<meta property="og:title" content="Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes">` |
| og:description | `<meta property="og:description" content="Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.">` | `<meta property="og:description" content="Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.">` |
| twitter:title | `<meta name="twitter:title" content="Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin">` | `<meta name="twitter:title" content="Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes">` |
| twitter:description | `<meta name="twitter:description" content="Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições.">` | `<meta name="twitter:description" content="Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições.">` |
| WebPage.name | Tegra Ampère Brooklin | Apartamentos de 262 m² no Brooklin | Ampère Brooklin Tegra | Apartamentos de 262 m² e 4 suítes |
| WebPage.description | Conheça o Tegra Ampère Brooklin: apartamentos em construção de 262 m², 4 suítes, 4 vagas e dois terraços em torre única. Consulte plantas e condições. | Apartamentos de alto padrão no Brooklin, com 262 m², 4 suítes, 4 vagas e dois terraços. Conheça as plantas e consulte as condições. |

Preflight em memória: 7 exact replacement regions / 8 logical fields; graph structural equality after expected fields; inverse full-file equality; H1 count=1; no HTML committed.

### Ária Higienópolis

- Title (56 caracteres): **Ária Higienópolis Tegra | Studios e Apartamentos Prontos**
- Description (127 caracteres): **Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.**
- Escopo: seis tags HTML e dois campos do nó WebPage (não global replace).

| Campo | Antes | Depois |
| --- | --- | --- |
| HTML title | `<title>Ária Tegra Higienópolis | Studios e apartamentos prontos</title>` | `<title>Ária Higienópolis Tegra | Studios e Apartamentos Prontos</title>` |
| description | `<meta name="description" content="Conheça o Ária Higienópolis: studios de 30 m², apartamentos de 53 m² com 1 ou 2 dormitórios, salas comerciais, rooftop com piscina e empreendimento entregue.">` | `<meta name="description" content="Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.">` |
| og:title | `<meta property="og:title" content="Ária Tegra Higienópolis | Studios e apartamentos prontos">` | `<meta property="og:title" content="Ária Higienópolis Tegra | Studios e Apartamentos Prontos">` |
| og:description | `<meta property="og:description" content="Studios de 30 m² e apartamentos de 53 m² em empreendimento entregue, com rooftop e piscina em Higienópolis.">` | `<meta property="og:description" content="Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.">` |
| twitter:title | `<meta name="twitter:title" content="Ária Tegra Higienópolis | Studios e apartamentos prontos">` | `<meta name="twitter:title" content="Ária Higienópolis Tegra | Studios e Apartamentos Prontos">` |
| twitter:description | `<meta name="twitter:description" content="Conheça tipologias, lazer, localização e condições do Ária Higienópolis.">` | `<meta name="twitter:description" content="Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições.">` |
| WebPage.name | Ária Tegra Higienópolis | Studios e apartamentos prontos | Ária Higienópolis Tegra | Studios e Apartamentos Prontos |
| WebPage.description | Página do Ária Higienópolis, empreendimento entregue com studios, apartamentos, salas comerciais, lazer e rooftop. | Conheça o Ária Higienópolis: studios de 30 m² e apartamentos de 53 m² prontos para morar. Consulte preços, plantas e condições. |

Preflight em memória: 7 exact replacement regions / 8 logical fields; graph structural equality after expected fields; inverse full-file equality; H1 count=1; no HTML committed.

## 7. Preflight técnico e dependências

Main e head empilhado #607 (`fedb64081270a3a3eac229c496dbd492e679bd62`) lidos: metadados originais idênticos nos dois, mesmos valores WebPage.name/description. Simulação em memória executada sobre ambas as páginas em ambas as revisões: substituições únicas, reversão integral byte a byte do texto, JSON-LD estruturalmente igual ao esperado, um H1, title <=60, description <=160. **Não foi executado CI, LOCAL_LIVE_SYNC, teste negativo dos validadores, browser, release ou alteração runtime.** O script da simulação não é validador do repo.

#606 head `63c54210d0b0904b97c222e862fa3c21fa4506ed` base main, draft, aberto. #607 base seo/mais-no-bairro-links-20261124, draft aberto; depende #606. #581 draft aberto, proposta antiga; não fechar/mesclar. #606/#607 já têm exceções específicas para módulo regional e H1, não para A06. A06 só deve ser preparada no head adequado depois de resolver a dependência (ou coordenação autorizada com Claude), sem duplicar mudanças nem incorporar releases alheias. A03/A05 não autorizam mudanças em outras páginas.

Bloqueio confirmado: `docs/BLOCKED_ACTIONS.md` exige ordem específica para editar validadores ou snapshots e páginas congeladas; `scripts/validate-resf-html-regression.mjs` e `scripts/validate-resf-v2-postal-address-contract.mjs` têm comparação integral do Ária e regras de snapshot Ampère. A #607 também altera dois validadores Ampère de H1; não replicar. Não contornar a trava nem desativar CI. Proposta de autorização futura: permitir **apenas** a normalização reversível e exata do delta de oito campos enumerados por slug nestes dois validadores, se necessária após ler head atualizado, com teste negativo de valor alterado, campo duplicado e mutação fora de escopo; preservar igualdade integral restante e demais páginas. Se outros validadores exigirem mudança, identificar e pedir autorização específica adicional. Não substituir snapshot amplo nem excluir todo head/JSON-LD. Revalidar escopo e fonte antes de qualquer execução.

Gate futuro:
1. Reconciliar ponteiros e PRs abertas e obter autorização específica de exceção.
2. Gerar PR runtime isolada em base reconciliada: somente HTML das duas URLs, campos delimitados acima, eventual lastmod dessas URLs conforme contrato sitemap, testes/exceções autorizados. Nenhum H1/H2/H3 novo nesta entrega. Preservar FAQ, canonical, robots, mídias, facts, schema comercial, preços, ofertas, Form46, consent, GTM, WhatsApp, footer.
3. Teste negativo de metadado diferente, duplicação e alteração não relacionada (ex.: fato comercial/FAQ), prova que falham. Comparar bateria CI contra baseline do mesmo SHA; não alegar PASS global por testes de outra PR.
4. LOCAL_LIVE_SYNC 360/390/430/900/1440, sem POST real e sem Preview; manifest e launcher compartilhado. Confirmação de usuário; merge/deploy só com ordem específica. Vercel git.deploymentEnabled main true, branches false no config observado.
5. Resolver Production READY exact SHA/rollback, HTTP200, indexability, schema, visual e navegação; recrawl somente autorizado. Medir 28 dias pós-crawl e 56/90 dias se amostra insuficiente. Baseline 25/10–21/11; hipóteses CTR Ampère 3%, Ária 3,5% (metas indicativas não estimativas). Comparar query×page×device, posição, impressões, leads agregados e não inferir causalidade. Não declarar ganho antes dos dados.

## 8. Próxima ação segura e rastreabilidade

Task MNT-A06-L01. Preparação documental aprovada, runtime bloqueado até exceção exata autorizada. Base acima; PR/head serão identificados pelo GitHub. Merge SHA, deployment, runtime QA: NOT_EXECUTED. Nenhuma alteração no Core SFJM, mídia, campanhas ou CRM. Este documento é proposta de adendo evidence-first a RESF, não nova regra global até aprovação/integracão próprias.

Próxima ação desta frente: revisar o dossiê e obter autorização específica para a alteração estrita dos dois validadores e respectivas páginas, após reconciliação das dependências. Não mesclar este documento nem executar runtime automaticamente. Preservar demais frentes (RJ, Invest, Órbita e H2/H3) e reconciliar seus ponteiros independentemente; o gate global de migração permanece PARTIAL/FAIL enquanto o kit canônico estiver defasado.
