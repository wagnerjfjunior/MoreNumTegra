# SFJM — Reconciliação de menor oferta Match Point × MoreTegra
Data: 2026-10-23
Modo: PR_CANDIDATE / NO_PRODUCTION / NO_MERGE
Base: GitHub main `e396f66c695e98ffb9b466a39e9a58b2d8d5ccb4`

## Decisão explícita do proprietário
A diferença de unidade NÃO bloqueia ação: selecionar por empreendimento e TIPO DE PRODUTO a menor oferta sustentada no documento Match Point. Se a referência já publicada no MoreTegra é inferior à menor campanha correspondente, não piorar o valor de entrada. Não misturar condomínios distintos nem residencial com NR/comercial.

Fonte da campanha: `Match Point - São Paulo 1.pdf`, documento fornecido pelo proprietário no Projeto (29 páginas, extração textual existente), observado em 2026-10-20/21. Campanhas não são comprovação atual de estoque, vigência ou elegibilidade do consumidor.

## DE/PARA da primeira implementação
| Empreendimento | Home original | Match Point por unidade | Nova Home candidata | URL individual |
| --- | --- | --- | --- | --- |
| Ária Higienópolis, studios | 1510, 30 m², R$ 501.000 | AP1812, cerca 30 m², tabela R$ 504.497, por R$ 455.100 — p.10 | AP1812, R$ 455.100 | mesma unidade e preço, FAQ/schema |
| Bem Moema, apartamento residencial | AP0202, 80 m², R$ 1.811.200 | AP202, 80 m², tabela R$ 1.819.500, por R$ 1.550.000 — p.12 | AP202 (USER_CONFIRMED; substituir AP0202), R$ 1.550.000 | Offer, FAQ e conteúdo atualizados; unidade AP202 confirmada pelo proprietário em 2026-10-23 |
| Universo Tatuapé Órbita, 1 dormitório | 2408, 51 m², R$ 540.000 | AP1814, 38 m², tabela R$ 378.600, por R$ 343.900 — p.8 | AP1814, 38 m², R$ 343.900 | seletor `?unidade=1814`, Product/Offer e formulário contexto |
| Universo Tatuapé Órbita, 3 dormitórios | AP1305, 69 m², R$ 655.000 | AP1305, tabela R$ 711.100, por R$ 645.800 — p.8 | AP1305, R$ 645.800 | seletor `?unidade=1305` |
| Bem Moema Studios & Offices | Studio 1702, R$ 509.600 | Match Point p.11 identifica somente `BEM MOEMA - STUDIO` AP1102 R$ 418.500 | NÃO ALTERAR | empreendimento distinto explicitamente no RESF: a unidade de p.11 não está vinculada com segurança ao Studios & Offices |

## Manter até nova evidência
- YPY AP0207 MoreTegra R$ 727.650 é inferior ao menor `POR` do PDF (AP1507 R$ 740.000), sem prova de indisponibilidade.
- Mozae AP0301 R$ 721.510 inferior ao PDF AP807/AP808 R$ 1.015.840.
- Nova Vivere 701 R$ 852.586,08 inferior ao PDF AP906 R$ 873.840.
- Garden Design 0112 R$ 673.050 inferior ao PDF AP1506/AP1513 R$ 732.960.
- Ampère AP62 e CAPIITOLO AP33: não regredir preços/seletores e condições já homologados (PR #472).
- ELO Duo: Match Point p.6 menciona últimas 12 unidades; site pode exibir últimas 6 (dados de momento diferente); verificar estoque separadamente, não inventar contagem.
- Não usar VPL, bônus, incentivo ATO, participação e sorteios como preço final ao consumidor.

## Gates obrigatórios
- [ ] QA estático CI completo; reconciliar validadores que congelam referências antigas sem desativar proteções.
- [ ] Verificar execução de filtros, 4 cards e links Home.
- [ ] LVR Live Sync mobile/desktop das páginas Ária, Bem Moema, Órbita (selector 1814/1305) e Form46 sem envio real.
- [ ] Verificar JSON-LD, Product/Offer, FAQ visível, metadados, canonicals, mídia, disponibilidade não afirmada, e contexto de intenção de unidade.
- [ ] Revisar dados comerciais internos `commercial-values.json` antes de publicação: há histórico de valores de Ária 501000 e CAPIITOLO 3539900; não alterar o plano da PR #472 sem regressão, e garantir single truth.
- [ ] Aprovação explícita para merge desta PR, deployment production READY no SHA de release, smoke HTTP e aceite pós-merge.
- [ ] Não enviar lead real ao CRM, GSC reindex ou campanha paga nesta revisão.

A branch é **candidata**, não há publicação. O aceite do release #472 não autoriza automaticamente a publicação deste novo pacote comercial.

## Abrangência comercial obrigatória — decisão do proprietário (23/10/2026)
Toda alteração efetiva de unidade/preço deve ser reconciliada em TODAS as superfícies existentes que anunciam a MESMA oferta, jamais apenas na Home:
1. `src-greenn/moretegra.js` (Home, filtros, cards e deep links).
2. `src-greenn/investimentos/studios-e-salas-comerciais/index.html` (cards de studio/comercial, JSON-LD ItemList e filtragem, SOMENTE quando existir oferta correspondente e mesma identidade de projeto).
3. `src-greenn/empreendimentos/<slug>/index.html` (texto visível, unidade, tipologia, metragens, FAQ/JSON-LD Product/Offer, CTA e parâmetros de URL).
4. `wagnerjfjunior/CaminhosdaLapaTegra`, domínio `https://www.caminhosdalapategra.com.br/`, nas páginas que efetivamente exibirem valores da MESMA oportunidade; preservar as páginas institucionais sem preço e os links para a página comercial proprietária. Não misturar a superfície `caminhosdalapaoficial.com.br` (outro domínio/owner).
5. Demais superfícies comerciais indexáveis e objetos de dados/fixtures que tragam preço concreto: localizar e separar `source-of-truth`, referência histórica, validação e conteúdo publicado antes de qualquer alteração.

### Auditoria de superfícies neste slice
| Superfície | Constatação live read-only | Próxima ação |
|---|---|---|
| MoreTegra Home | Home atual substituída na candidata para AP1812 Ária, Bem Moema AP0202 e Órbita AP1814/AP1305 | QA/CI aberto |
| MoreTegra Ária exata | Oferta AP1812 R$455.100 candidata | QA/CI aberto |
| MoreTegra Bem Moema residencial | AP0202 R$1.550.000 candidata; AP202 USER_CONFIRMED; revisão de preço, unit ID e schema em CI | QA/CI aberto |
| MoreTegra Órbita exata | AP1814 R$343.900 e AP1305 R$645.800 candidatas, preservar seletores/CTAs | QA/CI aberto |
| MoreTegra investimentos/studios | Card Ária **já** traz AP1812, R$455.100 em HTML e data-price=455100; não reescrever | PASS STATIC quanto ao preço da oferta |
| MoreTegra investimentos/studios | Cards Órbita na coleção são salas/lojas COMERCIAIS; oferta AP1814 é apartamento residencial de 1 dormitório, não studio formal | **NÃO** transplantar preço residencial a esses cards |
| MoreTegra Bem Moema Studios & Offices | Página individual para outro projeto, oferta Studio 1702 R$509.600 | Sem fonte que vincule a unidade AP1102 do PDF ao projeto Studios & Offices; preservar |
| Caminhos Home | `index.html` sem preço `R$`; links para ELO Duo interno, Nova Vivere/Garden Design no MoreTegra | Sem edição de valor a fazer; garantir links corretos |
| Caminhos ELO Duo | `eloduo/index.html` sem preço `R$` no código atual | Não introduzir preço artificial |
| Caminhos ELO | `elo/index.html` sem preço `R$` | Não introduzir preço artificial |
| Caminhos Reserva | `reserva/index.html` sem preço `R$` | Preservar `Consulte disponibilidade` |
| Caminhos Jerivás | `jerivas/index.html` sem preço `R$` | Preservar sob consulta |
| Caminhos Nova Vivere/Garden Design | Não há rotas exatas locais homônimas; Home aponta para exatas MoreTegra | Não duplicar páginas comerciais |

**NOTA:** estas verificações são de código GitHub canônico; não certificam HTTP de produção ou vigência/estoque do Match Point. PR de release só poderá sair de Draft após revalidar CI, catálogo/rotas, tipologia e governança comercial e obter aceite de publicação específico. Os dados de `commercial-values.json` incluem referências históricas de outro momento e devem ser reconciliados antes de declarar ausência total de divergências.

## Confirmação do proprietário — 2026-10-23 17:36 BRT
- **Bem Moema residencial, unidade correta: AP202.** Não AP0202. Confirmação explícita nesta conversa. Atualizar referência de Home, página exata, JSON-LD IDs Product/Offer, preço R$ 1.550.000, validadores e toda superfície de publicação que use a mesma oferta. A numeração AP0202 é somente histórico para comparar snapshots e nunca deve permanecer no runtime candidato.

## Adendo comercial solicitado pelo proprietário — 2026-10-23
1. **YPY Alto do Ipiranga:** AP0207, R$ 727.650 no MoreTegra; menor valor no material Match Point para AP1507 (65 m²) é R$ 740.000. Manter oferta publicada; não trocar uma oferta mais barata por uma mais cara.
2. **Copy do consumidor:** remover menção explícita “(Match Point, outubro/2026)” de cards da Home, Ária e Órbita. O documento permanece citado neste handoff apenas como evidência interna.
3. **Bem Moema Studios & Offices:** decisão expressa nesta conversa: trocar referência da unidade Studio 1702/R$ 509.600 pela unidade AP1102/26 m²/R$ 418.500, inclusive Home, página exata e coleção de studios. Identidade do empreendimento foi escolhida pelo proprietário; revisão histórica de vínculo documental não deve ser confundida com validação live de estoque.
4. **Ária Higienópolis:** adicional à referência AP1812/30 m²/R$ 455.100, Home ganhou card de apartamento AP2102/53 m²/R$ 856.480, com link `?unidade=2102#valores`. Página exata ganhou seletor AP1812/AP2102 com contexto de Form46; não presumir disponibilidade.
5. **Mozae Higienópolis:** manter referência existente AP0301/46 m²/R$ 721.510 e criar Home cards AP807/72 m²/R$ 1.015.840 e AP809/73 m²/R$ 1.027.180, com deep links e seletor na página exata; Product/Offer individuais para cada referência. O Match Point associa AP807/AP808 a 72 m² e AP809/AP810 a 73 m², **não comprova que as unidades sejam 2 e 3 dormitórios**. Não publicar alegação de 3 dormitórios sem fonte técnica.
6. **Garden Design:** mídia de campanha JPEG fornecida pelo proprietário nesta conversa identifica unidade **101 de 61 m² por R$ 695.600**, obra iniciada, e demonstra sugestão de fluxo: sinal 50 mil, 32 mensais de 2.800, 3 anuais de 12 mil, uma única de 50 mil e financiamento de 470 mil. Soma exata do fluxo = R$ 695.600. Home/página individual atualizados para unidade 101 e preço R$ 695.600. A mídia ainda não foi publicada em origem/CDN autorizada; **imagem é evidência fornecida, não um arquivo acessível por URL pública**. Não utilizar endereço do estande Rua Fortunato Ferraz, 625 como endereço do empreendimento.
7. **Caminhos da Lapa:** páginas no repositório `wagnerjfjunior/CaminhosdaLapaTegra` verificadas na main não publicam preços destas novas ofertas; Home aponta para ofertas de Nova Vivere e Garden Design no MoreTegra. Nenhuma mudança de preço nesse repo nesta rodada.

### Gates pendentes
- CI completo da PR #474 e inventário de validações congeladas; alterações novas podem exigir atualização explícita de invariantes comerciais sem enfraquecer segurança/layout/SEO/FAQ.
- QA mobile touch dos seletores Ária e Mozae e comportamento de formulário por unidade; não enviar lead real sem autorização.
- Garantir que `ItemList` da coleção de investimentos mantém o mesmo número de cards e SEO estruturado.
- Verificar JSON-LD Offer/Product do Garden Design e Ária para ofertas adicionais, e ausência de claims contraditórias.
- Confrontar referências internas/canônicas de oferta (snapshots CDP) antes de publicação.
- PR permanece Draft, sem autorização implícita para merge/deploy desta rodada.

## Correção emergencial do Mozae — 2026-10-23
- Evidência direta do proprietário: AP0412, 44,85 m², preço de tabela R$ 686.754,45; **condição à vista R$ 606.000**.
- Home Mozae: exatamente três cards nesta candidata — AP0301 (46 m², R$ 721.510), AP807 (72 m², R$ 1.015.840), AP0412 (44,85 m², à vista R$ 606.000). Card AP809 (73 m², R$ 1.027.180) retirado por solicitação expressa.
- A Home utiliza padrão já existente `cashOffer:true`, `priceLabel:"À vista"`, CTA e deep link `?unidade=412#valores` para destacar AP0412.
- Página Mozae: seletor `301/807/412`; AP0412 mostra preço à vista e comparativo de tabela. Form 46 preservado e intenção vinculada à unidade no seletor. JSON-LD Product/Offer alterado para AP0412; AP809 não é mais oferta publicada nesta candidata.
- CI/QA do último commit ainda requer conclusão; não publicar em produção antes dos gates. A fonte comercial é informação diretamente fornecida pelo proprietário; não afirmar vigência ou disponibilidade automática.

## Ajuste de Home — 2026-10-23
- Proprietário determinou apagar apenas o card Home Mozae genérico da AP0301 (46 m², R$ 721.510).
- Home passa a apresentar **2 cards Mozae**: AP807/72 m²/R$ 1.015.840 e AP0412/44,85 m²/R$ 606.000 à vista. Código alterado em `src-greenn/moretegra.js` commit `82b63b4ac0c175ec9b899e4b6589d5f6c2fa3293`.
- A página exata do Mozae e o seletor AP0301 permanecem sem alteração nesta solicitação; ocultação do card na Home não significa revogação da oferta em outras superfícies. PR segue Draft e produção preservada.
