# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-26`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- SHA observado no fechamento desta etapa: `8a237e298dee1391babb9bbbbf88fd4d9c2e40dd`
- Baseline funcional vigente: `FUNCTIONAL_BASELINE_V2`
- Baseline técnica vigente: `TECHNICAL_BASELINE_V2_2`
- Baseline técnica anterior: `TECHNICAL_BASELINE_V2_1`
- ADR aplicável: `ADR-001-GREENN-BUILDER-MODULE-COMPOSITION`
- Fase: `Vercel Production alinhada; validação pública final antes de release/Green`
- Saúde geral: `amarelo-verde` — implementação integrada, Vercel Production recebeu o estado atual de `main` e o próximo gate é validação pública completa + freeze de release; Green Sales ainda não foi publicada.

## 1. Resultado pretendido

Entregar um MoreNumTegra V1 mobile-first, rápido e SEO-first, com catálogo Tegra, filtros, tickets de referência, CTAs, vídeo in-page e captura pelo Form 46 nativo da Green Sales.

## 2. Estado por frente

| Frente | Estado | Próximo marco | Bloqueio |
|---|---|---|---|
| SFJM | operacional; cross-project Search discovery registrado | preservar reconstrução live por bootstrap + SES adapters | nenhum conhecido |
| Functional V2 | canônica | preservar | nenhum |
| Technical V2.2 | canônica | preservar | nenhum |
| Implementação frontend | integrada em `main` | validar publicamente | nenhum de código conhecido |
| UX galeria | capa não repete na galeria; 2/3 imagens distintas | validar em URL pública | teste final público pendente |
| Green builder | estrutura modular integrada | validar montagem real após freeze | publicação ainda bloqueada |
| Vercel Preview | candidato aprovado pelo proprietário e integrado | preservar como evidência | nenhum |
| Vercel Production | deployment do `main` atual concluído com status `success` | homologação pública final | validação aberta completa pendente |
| Mobile/UX | direção visual integrada | testar 360/390 e desktop na URL pública | evidência final pendente |
| Catálogo | 19 cards integrados | revalidar fatos antes da Green | dados comerciais exigem conferência final |
| Preços | referências aprovadas no projeto | revalidar antes da Green | casos `Sob consulta` permanecem quando aplicável |
| Vídeo | in-page | testar mobile/performance | mídia final pode evoluir |
| Form/lead | Form 46 conhecido | validar aparência no builder | Vercel usa mock não transmissor |
| Analytics | não habilitado | decisão/gate próprio | GA4/GTM/Meta Pixel fora desta etapa |
| Mídia | imagens remotas oficiais/externas | avaliar CDN próprio futuramente | migração não requerida para o fechamento atual |
| Green commercial production | gate posterior | publicar release homologada | validação pública + revalidação comercial + freeze pendentes |

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
- negociação, fluxo, entrada e forma de pagamento podem alterar o cenário final;
- card mantém 1 imagem de capa e a galeria pós-intenção não repete essa capa;
- a galeria não deve duplicar artificialmente uma imagem para preencher uma terceira posição;
- imagens pesadas não devem ser migradas para GitHub por padrão;
- GA4/GTM/Meta Pixel exigem gate próprio e não foram ativados neste fechamento.

## 4. Integração Search via SES

Decisão vigente:

```text
MoreNumTegra = consumer / product authority
blogs-sites-portais-seo = Search Center of Expertise / service provider
ADOPTION_STATUS = ADOPTED
EXECUTION_MODE = PROJECT_LOCAL_CROSS_PROJECT_SERVICE
```

Roles atuais via provider: `seo_strategy`, `technical_seo`, `content_semantic_seo`, `seo_analytics_growth` e `paid_search_sem`.

Local SEO e Authority & Digital PR permanecem future intent, não adoção ativa. O modo cross-project é metadata de execução local e não cria um novo status universal de adoção. O SES central registra a decisão; este projeto continua dono de sua verdade, implementação e autorizações.

## 5. Evidência desta etapa

- PR #21 mergeada em `main`;
- `main` observado em `8a237e298dee1391babb9bbbbf88fd4d9c2e40dd`;
- Vercel registrou `success` / `Deployment has completed` para esse SHA;
- `https://morenumtegra.vercel.app/` respondeu durante a verificação da sessão;
- nenhuma publicação Green foi executada;
- nenhum custom domain/DNS foi alterado;
- nenhum GA4/GTM/Meta Pixel foi ativado.

## 6. Riscos ativos

| Risco | Controle |
|---|---|
| confundir Vercel Production com Green comercial | manter nomenclatura `Vercel Production Homologation` |
| homologação pública não cobrir regressões mobile/runtime | executar gate público completo antes do freeze |
| Vercel divergir da Green | compositor usa snippets exatos da Green |
| formulário divergir do builder | produção usa Form 46 nativo |
| CTA não localizar form | âncora própria `#formulario` |
| vídeo prejudicar LCP | carregamento não crítico + fallback |
| mídia externa mudar/quebrar | fallback atual + avaliar CDN próprio para release futura |
| publicar preço/dado incorreto | revalidar tabelas/espelhos antes da Green |
| tracking coletar dados sem governança | gate próprio de analytics/privacy antes de habilitar tags |

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Validar publicamente `https://morenumtegra.vercel.app/` em mobile/desktop e fluxos principais. Somente após aprovação desse gate, congelar SHA/release e preparar a montagem controlada na Green Sales.