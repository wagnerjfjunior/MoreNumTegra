# Plano operacional de execução segura — pós-auditoria

Status em 23/11/2026: PLANO EM REVISÃO, NÃO AUTORIZAÇÃO DE EXECUÇÃO.

## Ondas, critérios de aceite e reversibilidade

| Onda | Lote | Meta | Critério de entrada | Critério de aceite |
|---|---|---|---|---|
| 0 | Reconciliação SFJM | alinhar merges #595/#596, snapshots e baseline | main/PR/SHA live verificados | documentação sem divergências materiais |
| 1 | RJ: links de relacionados | substituir fragmentos sem IDs por destinos canônicos | confirmar página de origem e destino, regras RJ | 100% dos links testados no LVR e 200/canonical em runtime; sem regressão em formulários |
| 2 | FGTS: fechar jornada | testar blog→filtro prontos→projeto→Form46/WhatsApp | produto residencial e elegibilidade descrita sem promessa | 360/390/430/900/1440, CTA, parâmetros, consentimento, formulário, origem do lead |
| 3 | Páginas com demanda GSC | analisar Ode, Órbita, Ária, Mozae, Ampère, Elo Duo, YPY | consulta/página/SERP atual + snapshot antes | título/copy/links específicos, sem canibalizar regiões e sem perda de fatos comerciais |
| 4 | Hubs de bairros e páginas isoladas | retorno contextual e links adjacentes legítimos | cada par origem→destino aprovado | sem destinos quebrados, sem excesso, sem templates de link artificial |
| 5 | Blog e cluster de intenção | aprimorar descoberta FGTS, Lapa, Tatuapé, Perdizes, RJ; especificar novas pautas só com demanda e gap confirmados | análise SERP e intenção comparada à URL canônica | cada intenção tem um único owner; links TOFU/MOFU/BOFU rastreáveis |
| 6 | Mensuração e ganhos | validar atribuição real | GA4/GSC/CRM autorizado e acessível | monitorar impressões, CTR, cliques, taxa de passagem, leads qualificados e custo conforme origem |

## Protocolo de execução de cada item A01–A15

1. Registrar **fonte** (GitHub main SHA, arquivo, seletor, posição, link e semântica), **destino** (URL canônica e sua indexabilidade), motivo, funil, prioridade, hipótese, risco e forma de medição.
2. Validar o comportamento em produção e LVR separadamente. Não concluir que um link é quebrado só porque o código usa fragmentos; confirmar destino fragmento e navegação.
3. Conferir intenção e elegibilidade comercial antes de criar um CTA; diferenciar página editorial do produto, projeto pronto de elegível FGTS e RJ de SP.
4. Abrir PR limitada, incluindo matriz ANTES/DEPOIS e testes específicos. Respeitar RESF, baselines, identidade Tegra, mobile e captura.
5. Checar sitemap/robots/canonical, JSON-LD apenas quando pertinente, links HTML rastreáveis, HTML semântico, 404/redirect, layout, acessibilidade, LCP/CLS/INP.
6. Medir baseline GSC pelo menos na URL/consulta afetada. Para novos artigos, primeiro confirmar SERP e canibalização; nenhuma meta de ranking é garantida.
7. Exigir aceite comercial/técnico. Merge, deploy, IndexNow, Bing e publicação são gates distintos — somente com autorização explícita.

## Métricas por funil

- Aquisição: consultas, impressões, posição média, CTR orgânico e página de entrada.
- Engajamento: clique em link editorial/contextual (origem → destino), clique em hub, clique em card de projeto; sem inventar IDs de eventos.
- Conversão: abertura/solicitação do formulário, sucesso confirmado Form46 SP / mecanismo RJ vigente, WhatsApp, lead validado no CRM.
- Qualificação: região de interesse, finalidade moradia/investimento, estágio, aderência a produto e consentimento. Evitar registrar dados pessoais na documentação pública.
- Atribuição: preservar UTMs e consentimento; verificar evento de lead e origem antes de mudar mensuração.
- Avaliação: comparar janelas equivalentes, considerar atraso GSC de ~3 dias, sazonalidade e efeitos de atualização em paralelo. Sem atribuir causalidade automática.

## Condições para bloquear uma proposta

- Query tem alta busca mas intenção incompatível com compra Tegra; pode ser aluguel, concorrente ou outro município.
- Página nova duplicaria intenção de uma existente ou usaria conteúdo superficial de porta de entrada.
- Projeto sem fonte confiável para tipologia, localização, estágio ou disponibilidade.
- Link proposto se baseia apenas em repetição de keyword, sem valor para a jornada.
- A alteração exige mudar Form46, consentimento, mobile ou identidade comercial sem autorização.
- QA funcional indisponível e hipótese depende de operação dinâmica não observada.

## Entrega esperada do Claude

Ver [handoff de revisão](../../../../handoffs/MNT_SEO_LINKS_FUNIS_CLAUDE_REVIEW_2026-11-23.md). Ele deve reconstruir e criticar o plano; não executar nenhuma onda automaticamente.
