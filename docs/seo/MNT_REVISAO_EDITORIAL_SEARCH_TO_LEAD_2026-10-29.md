# MoreNumTegra — revisão editorial Search-to-Lead (29/10/2026)

**Estado:** PROPOSTA / DOCUMENTATION_ONLY / NÃO PUBLICAR. Reunião de direção editorial do usuário: substituir a linha excessivamente descritiva por uma jornada verificável de descoberta sem marca, Big Idea, prova, oferta e CTA. Não significa autorização para reescrever todas as páginas em produção, mudar títulos, publicar artigos ou criar novas rotas sem gate individual. GitHub main é fonte integrada; esta branch é proposta.

## 1. Fontes e limites

- Padrão editorial integrado aprovado: `docs/sfjm/MNT_BLOG_PADRAO_EDITORIAL_V1_2026-10-26.md`, incluindo §5A e seção Sabrina; originalidade `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`.
- RESF exato: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`. Não transplantar quatro fatos comerciais para páginas editoriais nem copiar `.hero-meta` legado.
- SEO histórico: `docs/sfjm/MNT_SEO_BLOG_BING_CONTINUIDADE_INTEGRAL_2026-10-27.md` e estudos/relatórios OpenSEO existentes. Não descartar pesquisas anteriores nem inventar dificuldade ou volume.
- OpenSEO → Google Search Console, propriedade `https://www.moretegra.com.br/`, consulta em 29/10/2026 com dataState final e janela 29/09 a 26/10 (datas PT do GSC). Retorno de 47 URLs em dimensão page e 160 pares consulta+URL. Tabelas por página não são somatório do total de propriedade.
- OpenSEO → GA4 MoreNumTegra `properties/553742649`, janela 01/10 a 28/10/2026, organic_search: 92 sessões somadas das 13 linhas, incluindo 16 `(not set)`; um key event reportado na landing Órbita, sem conciliação CRM nesta leitura. Períodos GSC/GA4 e definições divergem; não comparar numeradores entre relatórios como taxa.
- A consulta por dimensão query retornou 118 linhas. Classificação automática branded/non-branded por regex **não é confiável** para variantes de marcas, Unicode, nomes implícitos e consultas suprimidas; não declarar proporção de tráfego não-marcado com base nessa classificação. Exige dicionário revisado e limites de amostragem.
- Estes dados sustentam necessidade de melhoria, não prova causal de que determinado hero, CTA ou snippet gerou o desempenho.

## 2. Evidências que alteram a prioridade

| Página | Impressões GSC | Cliques | Posição média GSC | Observação |
| --- | ---: | ---: | ---: | --- |
| Ária Higienópolis | 154 | 2 | 10,2 | CTR ~1,3%; preservar posicionamento até estudar consultas |
| Mozae Higienópolis | 111 | 3 | 10,4 | 2,7%; examinar consultas, concorrência e proposta |
| Ampère Brooklin | 110 | 0 | 10,8 | Prioridade de diagnóstico SERP; posição média limita cliques |
| Elo Duo | 99 | 2 | 11,5 | Proposta comercial/semântica |
| Nova Vivere | 61 | 2 | 12,5 | Dados indicam exposição incipiente; piloto sem marca segue separado |
| Soma Perdizes | 53 | 0 | 9,8 | Snippet e intenção a investigar |
| Ayla Moema | 49 | 0 | 10,1 | Snippet, tipo de intenção e competição |
| Studios Berrini | 31 | 0 | 10,5 | Pouca amostra; segmentar por query e dispositivo |

Há 26 de 47 URLs com zero cliques na listagem por página; algumas têm menos de 10 impressões e não justificam reescrita imediata. Não se inferem "zero cliques em todo o site" ou falha de CTA interno a partir de GSC. Query-page mostrou nomes de projetos, termos de bairro e termos ambíguos distribuídos entre páginas exatas, regionais e blog. Verificar sobreposição antes de canonical/redirect.

## 3. Funil e hipótese de intervenção

1. **Demanda e indexação:** a página tem cobertura e consulta coerente? Se não, problema de descoberta, intenção ou posição; CTA dentro da página não resolve.
2. **SERP / clique:** a impressão ocorreu em que query, posição, dispositivo e concorrência? Testar title/description e conteúdo de suporte à intenção, sem criar promessas falsas. Big Idea no meta title só quando a promessa é direta e corresponde à query, não para fabricar sensacionalismo.
3. **Experiência na página:** hero com proposta clara e resposta inicial, informações verificáveis, visual mobile e estrutura RESF/blog V1.
4. **Convencimento:** problema do comprador → custo de escolher mal → critério/mecanismo de decisão → evidência → aplicação em produto real → benefício de falar com Sabrina.
5. **Conversão:** WhatsApp contextual, cards internos e Form46 quando cabível. Clique em CTA não é `generate_lead` nem venda; preservar consentimento e eventos.
6. **Comercial:** qualificação, conversa, visita, unidade/condições. Sem dado de CRM, não atribuir vendas a um artigo.

## 4. Novo contrato editorial a propor como adendo V2 — sem substituir automaticamente V1 aprovado

**Cada URL precisa de:**
- Persona e problema pesquisado, estágio do funil e intenção primária (não-marcada quando houver fit factual).
- Uma **Big Idea verdadeira e específica**, que ajude a tomar decisão. "Inimigo comum" deve ser uma crença/erro de comparação, nunca uma falsidade atribuída a pessoas ou empresas.
- Uma promessa editorial que o conteúdo cumpre imediatamente e um mecanismo demonstrado (checklist, comparação, dados, planta real, roteiro de visita).
- **Oferta conversível e entregável**: comparar plantas, consultar unidades, receber orientação por Sabrina ou agendar visita conforme estágio; sem escassez artificial, descontos ou prazos inventados.
- CTA acima da dobra quando contexto comercial permitir, CTA contextual após prova/estudo de caso e CTA próximo ao encerramento; variar benefício e intenção, não repetir botão idêntico mecanicamente.
- Cards HTML <a href> com nomes e URLs internas reais; cards contextuais de empreendimentos somente sob critérios do §5A e três cards finais (bairros, catálogo, studios) conforme padrão integrado, admitindo exceção justificada.
- Hero com imagem autorizada, H1 único, lead de benefício e metatags; **sem hero-meta legado duplicado**. Facts editoriais somente se agregarem valor real; faixa comercial de quatro fatos continua exclusiva do RESF de empreendimento.
- Seção Sabrina com foto e contato já governados; badges WhatsApp oficial e "Condições" nas páginas em que o componente é aplicável, acessíveis e funcionais; não copiar símbolo genérico.
- Footer com identidade/atribuição/legalidade visíveis; tipografia branca regular se adotada sobre fundo escuro, sem texto oculto ou camuflagem.
- Separação de funções SEO: Lifestyle = preferência/vida prática; Dicas = critérios técnicos; Mercado = contexto/economia; Regiões = geografia; Empreendimento = oferta comercial. Uma URL proprietária por intenção predominante.
- SEO técnico e QA: sem sobrepromessa no snippet; links rastreáveis; JSON-LD fiel ao visível; FAQ útil; mobile, imagens, performance, eventos, Form46 e SEO validados em HEAD exato.
- **Não impor 2.000 palavras:** profundidade ajustada à complexidade; evitar preenchimento e duplicação para alcançar quota.

## 5. Exemplos de copy a testar — rascunhos, não mudanças em produção

| URL/tema | Gancho editorial ou comercial de trabalho | Ação proposta | Cuidado |
| --- | --- | --- | --- |
| Nova Vivere / Lifestyle plantas | "Mais metros quadrados não garantem mais conforto para sua família." | "Comparar plantas de 2 e 3 suítes com Sabrina" | Intenção genérica no H1/article; landing é dona de preço/unidade |
| Ampère Brooklin / comercial | "262 m² e quatro suítes: avalie a planta e os terraços do Ampère Brooklin." | "Ver plantas e consultar condições do Ampère" | O título da SERP deve primeiro responder à query; fatos da landing vigentes |
| Studios / investimento | "O custo que pode mudar a conta de um studio para investir." | "Conhecer studios e avaliar despesas de compra e ocupação" | Não prometer retorno ou valorização |
| Garden Design / Lifestyle | "Lazer completo no anúncio. Quais espaços sua família realmente vai usar?" | "Conhecer Garden Design e consultar áreas de lazer" | Confirmar no memorial características, regras e disponibilidade |
| Região / bairro | "Morar no bairro é mais do que escolher um endereço: confira a rotina real." | "Comparar imóveis disponíveis na região" | Evitar números de segurança/mobilidade não verificados |
| Dicas / cozinha | "A ilha que parece perfeita no decorado pode atrapalhar a circulação." | "Ver plantas com ambientes integrados" | Só usar ilustração vinculada à planta real quando comprovada |

**Se não houver empreendimentos compatíveis, não forçar a chamada comercial.** Primeiro corrigir seleção de produto/escopo.

## 6. Prioridades e triagem por evidência

**P0 — auditoria de dados e medição (somente leitura):**
- Inventário completo de URLs por tipo: indexáveis, placeholders protegidos, owners de intenção, titles/H1/descriptions, CTAs efetivos, badges e Sabrina, links.
- Segmentar consultas GSC por query+page e dispositivo nas páginas com impressões >= 30 e zero clique; obter comparação SERP atual e estimativas já salvas (OpenSEO) antes de sugerir edição.
- Revisar dados de `(not set)` GA4, key events, eventos de CTA e coleta Form46; não instalar scripts duplicados por suposição.
- Diferenciar ausência de impressões de CTR baixo e conversão pós-clique.

**P1 — correções focadas sob PR e aceite por URL:** Ampère, Soma Perdizes, Ayla Moema e outros com amostra suficiente, depois Mozae/Ária com preservação do que funciona. Propor DE/PARA de title, meta, H1, hero, oferta e links para cada URL, sem reescrita massiva por padrão.

**P2 — piloto Lifestyle Nova Vivere:** PR #511 contém copy e diretriz Big Idea, mas precisa de revisão de intenção/SEO com dados; implementar HTML/CSS/JS RESF/blog quando legitimamente autorizado e testar no mobile. Dossiê de fontes #510 continua independente.

**P3 — expansão dos 12 Lifestyle:** matriz por URL com fonte, palavra-chave principal e secundárias, volume/KD quando existentes, consulta/competidor, ângulo original, prova, produto compatível, CTA, risco de canibalização, direito de imagem, QA individual e gates de release. Corrigir trechos incompletos onde necessário.

**P4 — melhoria contínua:** após releases, medir SERP, GSC query-page, cliques qualificados e leads confirmados nas janelas comparáveis. Não concluir sucesso antes de indexação/ranking e tráfego suficientes.

## 7. Governança

- `main` segue canônica; proposta **não** muda padrão V1 aprovado automaticamente.
- PR #510 é pesquisa Lifestyle; PR #511 é piloto de copy; esta proposta é revisão estratégica transversal. Não mesclar as três por inferência.
- Não executar alterações em produção, robots, noindex, sitemap, redirects, produtos, CRM ou tags.
- Não abrir portas de indexação para placeholders nem alegar que um CTA sozinho vai corrigir CTR da SERP.
- Próximo gate para implementar: relatório DE/PARA verificável, escopo de URLs, Product Authority aplicável, aprovação explícita, QA e rollback.
