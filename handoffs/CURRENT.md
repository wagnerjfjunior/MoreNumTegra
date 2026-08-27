# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-26`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- SHA observado no fechamento desta etapa: `8a237e298dee1391babb9bbbbf88fd4d9c2e40dd`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Baseline técnica anterior: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR aplicável: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado atual

A implementação canônica permanece em HTML/CSS/JavaScript vanilla e composição modular compatível com o builder Green Sales.

Arquivos integrados:

```text
src-greenn/
  blocks/
    01-html-inicial.html
    02-html-pos-form.html
    03-footer.html
  moretegra.css
  moretegra.js
  preview/
    index.html
```

O catálogo integrado contém 21 empreendimentos, filtros por estágio/zona/ticket, badges, preços de referência, vídeo in-page, CTAs e mock Vercel não transmissor do Form 46.

A jornada UX foi refinada em 2026-08-26 e integrada em `main`, incluindo:

- contexto visível de empreendimento selecionado;
- galeria pós-intenção;
- card mantendo uma única imagem de capa;
- galeria usando apenas mídias adicionais distintas, sem repetir a capa do card;
- deduplicação de URLs de mídia;
- layout com 2 imagens quando existirem 2 mídias distintas e bento apenas quando existirem 3;
- melhorias de acessibilidade, fallback e legibilidade comercial.

A PR #21 foi mergeada por squash e resultou no SHA `8a237e298dee1391babb9bbbbf88fd4d9c2e40dd` em `main` no fechamento desta etapa.

## 2. Composição Green comercial

```text
HTML 01 inicial
-> bloco nativo Form 46
-> HTML 02 pós-form
-> HTML 03 footer
+ CSS global
+ JavaScript global
```

Produção Green usa o Form 46 nativo. O JavaScript não deve interceptar o submit nativo.

## 3. Vercel

O projeto usa dois ambientes operacionais:

- **Vercel Preview**: validação intermediária de branch/change;
- **Vercel Production**: homologação pública estável após aprovação e merge em `main`.

URL pública de homologação:

`https://morenumtegra.vercel.app/`

Vercel Production não é a produção comercial V1. Green Sales continua sendo a produção comercial.

Fluxo:

```text
change
-> Preview
-> aprovação
-> merge main
-> Vercel Production homologação pública
-> testes abertos/mobile
-> release SHA
-> Green Sales
```

## 4. Situação de homologação

O drift anterior entre `main` e Vercel Production foi corrigido durante esta etapa.

Para o SHA `8a237e298dee1391babb9bbbbf88fd4d9c2e40dd`, a integração Vercel registrou status `success` com descrição `Deployment has completed`, e a URL pública `https://morenumtegra.vercel.app/` respondeu durante a verificação desta sessão.

Ainda não classificar a homologação pública como finalizada sem completar o gate público previsto em `docs/NEXT_SAFE_ACTION.md`, incluindo mobile/desktop, fluxos principais, runtime/console e CWV quando possível.

## 5. Mídia e tracking

- as imagens atuais permanecem referenciadas por origens oficiais/remotas já usadas pelo projeto; nenhuma migração de mídia para repositório próprio foi executada nesta etapa;
- GitHub continua sendo fonte do código, não repositório de mídia pesada;
- uma futura migração das mídias escolhidas para CDN/storage sob controle próprio pode ser avaliada separadamente;
- GA4, GTM e Meta Pixel não foram ativados nesta etapa;
- qualquer tracking futuro deve usar contas/containers próprios e gate específico de analytics/privacy.

## 6. Dados comerciais

Os valores visíveis permanecem referências de publicação aprovadas no projeto, com casos sem referência segura mantidos como `Sob consulta` quando aplicável.

Antes da Green comercial, revalidar os fatos visíveis relevantes, especialmente preço, disponibilidade, metragem, estágio e condições.

## 7. Integração SES / Search

O MoreNumTegra mantém autoridade integral sobre produto, código, Vercel/Green, implementação, deploy, orçamento, publicação de campanha e aceitação de risco.

Para Search, o modelo SES vigente usa `blogs-sites-portais-seo` como Search Center of Expertise / provider:

```text
seo_strategy
technical_seo
content_semantic_seo
seo_analytics_growth
paid_search_sem
```

A capability permanece `ADOPTED`; a execução Search usa `EXECUTION_MODE: PROJECT_LOCAL_CROSS_PROJECT_SERVICE`. Local SEO e Authority & Digital PR são somente `FUTURE_SERVICE_INTENT` enquanto não houver certificação + ativação explícita posterior.

Retomada material de Search deve resolver SES live, `projects/SPECIALIST_ADOPTION_MATRIX_CURRENT.md`, o Project Adapter MoreNumTegra e o Project Adapter do provider. O provider pode diagnosticar, pesquisar, recomendar, medir e otimizar; qualquer mutação no MoreNumTegra exige autoridade própria deste projeto.

```text
PROVIDER_SPECIALIST_WORK != MORENUMTEGRA_MUTATION
CROSS_PROJECT_SERVICE != PROJECT_OWNERSHIP_TRANSFER
```

## 8. Limites

Continuam fora do escopo sem gate específico:

- publicação Green antes da homologação pública final;
- custom domain/DNS;
- analytics/pixels/tags;
- FECH.AI/n8n/Make/Ads;
- CMS/database/backend próprio;
- segredo/token client-side;
- dados comerciais não revalidados para a publicação Green.

## 9. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.