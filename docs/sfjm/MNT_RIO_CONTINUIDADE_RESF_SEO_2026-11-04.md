## PRIORIDADE OPERACIONAL CORRIGIDA — orientação expressa do usuário em 04/11/2026

**A ULTIMA ATIVIDADE NAO ERA UMA AUDITORIA SEO GENERICA.** Era transformar a Home Rio e todas as paginas RJ em paginas de ALTA CONVERSAO, retirar mensagens editoriais/administrativas que afastam compradores e INSERIR/PRESERVAR OS VALORES NUMERICOS DOS EMPREENDIMENTOS. A PR #540 ja implementa a base desta frente; continuar nela, nao reconstruir nem reabrir trabalho concluido.

Ordem de trabalho: (1) copy comercial Big Idea + headline + beneficio + CTA; (2) cards e secoes com precos visiveis historicamente registrados e qualificacao discreta/verdadeira, sem afirmar ofertas expiradas como atuais; (3) limpeza das mensagens desnecessarias e creditos fotografico-visiveis apenas quando licenca permitir; (4) validacao comercial e visual mobile da Home e de cada pagina exata; (5) SEO/RESF como gates tecnicos complementares; (6) aceite e release rastreavel.

O usuario rejeitou expressamente a copy 'Voce esta explorando os empreendimentos Tegra do Rio de Janeiro', notas ostensivas de 'Valores de referencia' e frases 'Promocao encerrada em 31/10/2026', 'Tabela de referencia de maio/2026' na area de conversao. O footer juridico obrigatorio e a veracidade dos precos devem permanecer; nao mascarar campanhas vencidas como ofertas atuais. Manter os precos numericos registrados por produto, conforme secao 4; reconfirmar vigencia antes de afirmar 'preco atual' ou publicidade de oferta. A copy final precisa ser especifica a cada empreendimento, nao um molde repetitivo.

**Proxima acao:** revisar o HEAD da #540 e apontar, para cada uma das oito paginas, o que ja foi efetivamente removido, onde os valores aparecem, headline/CTA e pendencias reais de conversao. Nao substituir esse trabalho por inventario SEO generico.

---

# SFJM — Continuidade Rio de Janeiro / RESF / SEO — 2026-11-04

Status: DOCUMENTATION_ONLY; candidato em branch; nao equivale a aceite, merge, deploy ou indexacao.
Repositorio canônico: `wagnerjfjunior/MoreNumTegra`. Referencia observada de main no inicio desta reconciliacao: `d4f7d93b27cb2c4342df61386414012b9ef0de55` (confirmar novamente antes de qualquer runtime).
Fontes: historico fornecido pelo usuario `Resumo paginas.txt` (conversa de auditoria SEO, nao o historico integral do RJ); descricoes e lifecycle consultados diretamente nas PRs #523, #524, #525, #526, #539 e #540; bootstrap, CURRENT, STATUS, NEXT_SAFE_ACTION, BLOCKED_ACTIONS e RESF V1 lidos na main.

## 1. Hierarquia e fatos de lifecycle

- #523 hub RJ: MERGED; criou `/rio-de-janeiro/` com sete projetos e referencias historicas.
- #524 Home nacional: MERGED; seletor Sao Paulo/Rio/Todas, 33 cards SP preservados e sete RJ adicionados.
- #525: MERGED; seis paginas exatas RESF e sete imagens/precos de cards. Paginas exatas inicialmente `noindex,follow`.
- #526: MERGED; harmonizou valores e links dos cards para paginas exatas.
- #540 `feat(RESF): nova Home Rio de Janeiro com catalogo e filtros mobile`: OPEN, DRAFT, NOT MERGED na consulta de 04/11. Esta e a frente editorial/comercial de continuidade; branch e head SHA devem ser resolvidos live antes de edicao. Nao declarar conteudo dessa PR como publicado.
- #539 inventario SEO 85 URLs / DE-PARA: OPEN, DRAFT, NOT MERGED na consulta. Pode tocar metadados RJ; evitar merges concorrentes sem comparacao de diffs.

## 2. Escopo exato do Rio

Rota de entrada `/rio-de-janeiro/` e sete empreendimentos: Kronos by Tegra, Claris Casa & Clube, Claris Rosas, Gran Thai Leisure Residence, Singular Private Residence, Gaea Home Resort, RIIO by Piero Lissoni.
Seis paginas exatas criadas na #525: `kronos-by-tegra`, `claris-casa-e-clube`, `claris-rosas`, `gran-thai-leisure-residence`, `singular-private-residence`, `gaea-home-resort`; confirmar paths completos no codigo. RIIO e pagina preexistente separada; preservar estrutura.
Nao confundir Rio de Janeiro (cidade/UF) com bairros de Sao Paulo ou misturar navegação regional.

## 3. Direcao comercial vigente como intencao do usuario (nao atestado de QA)

- Big Idea da #540: 'o proximo capitulo do comprador na Barra da Tijuca comeca com a escolha certa'.
- Headline: 'Seu proximo capitulo na Barra da Tijuca comeca aqui.'
- CTA: 'Encontrar meu imovel' / 'Quero atendimento personalizado'.
- Home RJ com filtro mobile, sete cards, fotografias identificadas e caminhos para atendimento e paginas exatas.
- Remover apresentacao editorial/operacional que atrapalha venda: referencia fotografica visivel ao visitante quando nao necessaria pela licenca; 'Voce esta explorando os empreendimentos Tegra do Rio de Janeiro'; notas amarelas ostensivas de valores historicos, texto de promocao encerrada e datas de tabelas antigas no corpo comercial.
- Nao remover atribuicao legalmente obrigatoria nem ocultar situacao de preco/estoque: substituicao por midia cuja licenca permita ausencia de credito e veracidade do anuncio sao gates independentes.
- Na #540, labels `Valor divulgado · a partir de` aparecem como proposta, mas precos de campanhas vencidas NAO podem ser tratados como oferta vigente; reconfirmar comercialmente antes de publicidade de oferta, inclusive cards e schema. Evitar falso `Offer` JSON-LD.
- Preservar formulario Green Sales/GDigital Form46, WhatsApp, badge de Condicoes, identidade Tegra, assinatura profissional autorizada, footer juridico e consentimento. Nao inventar credencial no RJ.
- Nao reconstruir RIIO nem outras paginas aprovadas; corrigir escopo pontual.

## 4. Valores registrados historicamente nas PRs #525-#526 — NAO validados como preco atual

Kronos R$ 1.471.000 (microsite setembro/2026); Claris Casa & Clube R$ 3.473.000; Claris Rosas R$ 3.647.000; Gran Thai R$ 2.148.000; Singular R$ 3.610.000; Gaea R$ 2.221.000; RIIO R$ 8.212.000. Promocoes de alguns produtos expiravam em 31/10/2026. Qualquer valor vigente exige fonte atual exata e verificacao por produto. Nao alterar silenciosamente estoque, area, unidades ou valores.

## 5. SEO/RESF aprovado no historico anexado

A auditoria OpenSEO relata 85 URLs rastreadas em 02/11, 16 titles longos, dez descriptions longas e 11 noindex. Esses totais representam a amostra historica, nao todas as URLs atuais. Na #539 constam 21 URLs editadas no lote, 42 linhas DE/PARA e as demais pendentes de auditoria completa: confirmar artefatos e diferencas live.
Contrato interno: title ate 60 caracteres, meta description ate 160, exatamente um H1 e hierarquia H2/H3 coerente, ALT descritivo ou vazio quando decorativo, canonical www exato, robots corretos, OG/Twitter consistentes, JSON-LD valido e factual, FAQ visivel com paridade, CTAs Form46 funcionais. Nao alegar que limites internos sao regras fixas do Google.
PRIORIDADE SEMANTICA: intencao de busca e lead antes do mero corte de caracteres. Cada URL com keyword principal, secundarias, busca generica versus branded e controle de canibalizacao; paginas regionais assumem buscas amplas e paginas exatas nome + bairro + tipologia. Exemplo aprovado: `Apartamentos no Brooklin | Ampère Tegra de 262 m²` (rever live).
DE/PARA literal por URL e campo: texto anterior, texto proposto, caracteres de ambos, motivacao, fonte e status. Nunca recriar texto original por memoria.
No Rio, verificar um a um: titulo, description, H1, robots/noindex, canonical, OG, Twitter, ALT, JSON-LD/FAQ, preco/offer, links, mobile e CTA.

## 6. Conflitos documentais que nao podem ser mascarados

- `handoffs/CURRENT.md` (03/11) concentra simulador complexo PR #538; `docs/PROJECT_STATUS.md` e `docs/NEXT_SAFE_ACTION.md` estavam com topo 02/11 PR #533. Estas fotografias nao descrevem integralmente RJ/SEO 04/11.
- PR #540 e #539 simultaneamente OPEN/DRAFT; nao presumir integracao do SEO com copy comercial.
- A #540 declara `noindex,follow` para Home RJ e seis paginas ate aceite; a #525 descreve home indexavel em determinado estado da main. Verificar robots literal por ref e HTTP em producao; jamais inferir o estado efetivo da pagina pela descricao da PR.
- O upload fornecido cobre principalmente conversa SEO 02/11; preferencias adicionais sobre remocao de creditos/disclaimers das paginas RJ vieram de contexto conversacional e PR #540, nao desse arquivo.
- Nao houve certificacao nesta reconciliacao de Core Web Vitals, teste fisico mobile, Rich Results Google, CRM real, deploy Vercel do head #540 ou indexacao.

## 7. Proxima acao segura e gates de release

1. Resolver main SHA, head SHA e diffs das PR #540 e #539, checks, Vercel runtime e intersecoes exatas (especialmente RJ metadata); manter branches isoladas.
2. Auditar HTML da Home RJ e sete paginas do catalogo, em especial seis exact-project; produzir matriz URL a URL DE/PARA SEO + copy + conformidade comercial/midia. Preservar RESF; nao aplicar mudancas em lote sem constatar cada arquivo.
3. Corrigir unicamente lacunas verificadas na branch #540 (ou nova branch acordada), testar filtros mobile/toque, cards, imagens, CTA, WhatsApp, Form46 simulado sem envio real, FAQ/JSON-LD/SEO, layout 390x844 e desktop.
4. Garantir licencas das imagens; nao transformar dados historicos em ofertas atuais. Checar postura de indexacao caso a caso.
5. Exigir revisao/aceite da PR #540 e autorizacao explicita de merge/release, checks no head aprovado, Vercel READY SHA e rollback por revert; QA independente pos-release e indexacao por URL.
6. Somente apos reconciliacao documental, atualizar indicadores SFJM, handoff e NEXT_SAFE_ACTION com estado observado; manter todo historico anterior.

## 8. Guardrails

Este handoff nao autoriza merge, promocao para indexavel, mudanca no Form46, campainhas Meta/Google, valores novos, modificacoes no Complexo Lapa-Pirituba, nem exclusao de atribuicoes exigidas por licenca. `main` e fonte integrada. Cada release e rastreavel; nunca chamar Draft de producao.
