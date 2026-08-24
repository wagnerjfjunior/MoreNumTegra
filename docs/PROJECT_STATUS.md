# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Baseline funcional vigente: `FUNCTIONAL_BASELINE_V2`
- Baseline técnica vigente após integração desta revisão: `TECHNICAL_BASELINE_V2_2`
- Baseline técnica anterior: `TECHNICAL_BASELINE_V2_1`
- ADR aplicável: `ADR-001-GREENN-BUILDER-MODULE-COMPOSITION`
- Fase: `homologação pública Vercel antes da publicação Green`
- Saúde geral: `amarelo` — implementação integrada e funcional, mas Vercel Production precisa ser alinhado ao `main` aprovado e os dados comerciais ainda exigem revalidação antes da Green.

## 1. Resultado pretendido

Entregar um MoreNumTegra V1 mobile-first, rápido e SEO-first, com catálogo Tegra, filtros, tickets de referência, CTAs, vídeo in-page e captura pelo Form 46 nativo da Green Sales.

## 2. Estado por frente

| Frente | Estado | Próximo marco | Bloqueio |
|---|---|---|---|
| SFJM | operacional | continuar reconstrução live por bootstrap | nenhum |
| Functional V2 | canônica | preservar | nenhum |
| Technical V2.2 | decisão owner-confirmed | integrar | documentação em revisão |
| Implementação PR #6 | mergeada em main | homologar publicamente | nenhum de código para Vercel |
| Green builder | estrutura modular integrada | validar montagem real | publicação ainda bloqueada |
| Vercel Preview | versão recente validada visualmente | preservar como evidência | nenhum |
| Vercel Production | homologação pública estável | alinhar ao `main` aprovado | deployment antigo pode estar ativo |
| Mobile/UX | direção visual aprovada para evolução | testar em URL pública estável | teste final pendente |
| Catálogo | 19 cards integrados | revalidar fatos | dados comerciais parciais |
| Preços | referências iniciais integradas | conferir tabelas/espelhos | alguns itens Sob consulta/ambíguos |
| Vídeo | in-page | testar mobile/performance | mídia final pode evoluir |
| Form/lead | Form 46 conhecido | validar aparência no builder | Vercel usa mock não transmissor |
| Green commercial production | gate posterior | publicar release homologada | homologação pública + revalidação pendentes |

## 3. Decisões confirmadas

- HTML5 + CSS + JavaScript vanilla;
- GitHub `main` é fonte canônica;
- Vercel Preview é teste intermediário;
- Vercel Production é homologação pública estável;
- URL de homologação: `https://morenumtegra.vercel.app/`;
- Green Sales é produção comercial V1;
- Green Sales monta a página por módulos;
- produção comercial usa Form 46 nativo;
- layout Green: HTML 01 -> Form -> HTML 02 -> Footer;
- CSS e JavaScript são globais no builder;
- vídeo toca dentro da página;
- hero escuro + headline branca + amarelo Tegra é direção aceita;
- catálogo integrado tem 19 imóveis, sujeito à revalidação factual/comercial;
- valores são referências `A partir de`, não promessa de preço final;
- negociação, fluxo, entrada e forma de pagamento podem alterar o cenário final.

## 4. Riscos ativos

| Risco | Controle |
|---|---|
| Vercel Production ficar desatualizado em relação ao main | promover/redeploy após merge aprovado e validar URL estável |
| confundir Vercel Production com Green comercial | manter nomenclatura `Vercel Production Homologation` |
| Vercel divergir da Green | compositor usa snippets exatos da Green |
| formulário divergir do builder | produção usa Form 46 nativo |
| CTA não localizar form | âncora própria `#formulario` |
| vídeo prejudicar LCP | carregamento não crítico + fallback |
| publicar preço/dado incorreto | revalidar tabelas/espelhos antes da Green |
| regressão mobile | teste público na URL estável + metas CWV |

## 5. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Alinhar Vercel Production ao `main` aprovado, validar publicamente `https://morenumtegra.vercel.app/` em mobile/desktop e só então avançar para freeze de release e montagem controlada na Green Sales.
