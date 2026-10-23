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
| Bem Moema, apartamento residencial | AP0202, 80 m², R$ 1.811.200 | AP202, 80 m², tabela R$ 1.819.500, por R$ 1.550.000 — p.12 | AP0202 (normalização 0202/202), R$ 1.550.000 | Offer, FAQ e conteúdo atualizados; normalização de ID deve ser validada |
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
