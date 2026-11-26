# RESF G02 — baseline GSC + auditoria estática (26/11/2026)

## Proveniência / fonte

- MoreNumTegra main anterior a esta PR: `0b9a3697ac7aabb350351f5673ce1da8e3fea541` (merge documental #662; PR head `41c0a62cf6b7a5558c280dc201d7fa43e68002c7`). Documento prévio: `docs/sfjm/MNT_RESF_G01_CLOSE_G02_PLAN_2026-11-26.md`.
- Runtime observado: Vercel Production READY `dpl_835EpVEGLGRV4J3ZNVG62RAF7p1u`, SHA `da69974eb1a959401cad92406eff458a1e2649fd`, alias `www.moretegra.com.br`. O deploy do merge docs #662, `dpl_BXQyBc135UkgYST9g8vrWez8LNpM`, ficou CANCELED conforme política de ignorar build documental; não representa release runtime.
- `sitemap.xml`: 92 URLs distintas. `vercel.json`: 138 rewrites. As dez rotas G02 existem em ambos.
- OpenSEO/GSC projeto `a071ab48-dda6-4b7c-bf71-2e3e3d40694d`; propriedade `https://www.moretegra.com.br/`. Consulta `inspect_urls` de 26/11/2026: **10/10 Enviada e indexada**, canonicals Google/declarado concordantes, robots ALLOWED, fetch SUCCESSFUL; visita Google anterior variou por página. Isso não comprova homologação técnica atual nem nova indexação pós-release.
- Estado RESF G01 continua `INDEX_SUBMISSION_COMPLETE / QA_RESIDUAL_OPEN`. Não reabrir componentes protegidos por inferência.

## Gaps efetivamente encontrados na leitura do código

- Todos os dez efetivos/HTMLs diretos usam runtime de telefone legado `/src-greenn/preview/runtime.js`. Seletor original de 1, 3 ou 7 países; **29 opções obrigatórias** conforme #659: Brasil, OTHER, mais 27 na ordem Home. Testar +, 00, DDI, zeros, E164 <=15 dígitos, US/CA separados e não truncamento.
- Form46 de 9 páginas SP e Form47 no Kronos RJ, tenant313; endpoint/payload e contrato de consentimento/analytics não são autorização para teste de envio real. Preservar form, hidden fields, texto-livre, UTMs, redirecionamento, prevenção de duplo clique, estados de rede.
- Nenhum dos dez HTMLs diretos/experiments inclui o trio WebMCP G01 `get_project_details`, `get_project_faq`, anotação `request_sales_contact`. Adicionar sem autosubmit e validar em navegador; não afirmar 6/6 antes do oficial.
- Uma única seção `.facts` nos 8 HTMLs completos e nos 2 documentos editoriais; shell CAPIITOLO/DSG não é DOM final. `.hero-meta` permanece em Nova Vivere, YPY e TEG Sacomã. Galerias e captions variam; auditar com referência Órbita e preservar amenidades únicas.
- CAPIITOLO/DSG carregam os `experiments/*-editorial-v3/index.html` por `fetch`, substituindo o documento via `document.write` e injetando schema, consent V3, CTA comercial. Não corrigir o shell isoladamente. GSC CAPIITOLO Product vem de crawl anterior e não prova que o grafo final atual contenha Product/Offer.
- Manifesto `assets/resf/manifest.json` contém variantes de Bem Moema Studios, TEG Sacomã e Viso Moema. Utilizar a fonte autorizada e medir primeiro; preservar recursos não críticos.

## Matriz e links reais de inspeção GSC

| Página | Canal | Opções atuais | Dados Schema (fonte) | Gap próprio | Inspeção exata |
|---|---|---:|---|---|---|
| [Nova Vivere](https://www.moretegra.com.br/empreendimentos/nova-vivere/) | SP Form46 | 3 | Product+Offer: 1 | hero-meta; mídia/galeria; confirmar contexto da unidade 701 | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=0yG1mfms4okISOlR44uiHw&utm_medium=link&utm_source=api) |
| [Garden Design](https://www.moretegra.com.br/empreendimentos/garden-design/) | SP Form46 | 1 | consulta, 0 Product | galeria; manter perfil consulta | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=4ktVVc0vPQqQIzv809hJkw&utm_medium=link&utm_source=api) |
| [Reserva Caminhos da Lapa](https://www.moretegra.com.br/empreendimentos/reserva-caminhos-da-lapa/) | SP Form46 | 1 | consulta, 0 Product | galeria; manter perfil consulta | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=LN1OUzDkjDS1KvBYJc4nmQ&utm_medium=link&utm_source=api) |
| [CAPIITOLO](https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/) | SP Form46 (editorial) | 7 | shell 0 Product; Google detectou Product em crawl antigo | fetch/document.write, schema final, unidade 33 promocional/à vista, texto livre | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=5Qkkhv0m-jua0mcFe5rJFg&utm_medium=link&utm_source=api) |
| [DSG Itaim](https://www.moretegra.com.br/empreendimentos/dsg-itaim/) | SP Form46 (editorial) | 7 | shell 0 Product | fetch/document.write, schema final, Office 208/32m² R$355.000 ref. nov/26 | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=BRIzfdcbkS6K9oDPGQehDg&utm_medium=link&utm_source=api) |
| [YPY](https://www.moretegra.com.br/empreendimentos/ypy-alto-do-ipiranga/) | SP Form46 | 3 | 2 Product+Offer | hero-meta; preservar AP1507/AP906 e intenção selecionada | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=GluIZYgsZZBiqBr0Y6SI-Q&utm_medium=link&utm_source=api) |
| [Bem Moema Studios & Offices](https://www.moretegra.com.br/empreendimentos/bem-moema-studios-offices/) | SP Form46 | 1 | 1 Product+Offer | mídia do manifesto; studio AP1102; galeria | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=UIpeO-VfEWz2iIBrFMGkWg&utm_medium=link&utm_source=api) |
| [TEG Sacomã](https://www.moretegra.com.br/empreendimentos/teg-sacoma/) | SP Form46 | 1 | 0 Product | hero-meta; sem RealEstateAgent; mídia do manifesto | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=T70_4ueo8rai_pcgJzdmDw&utm_medium=link&utm_source=api) |
| [Viso Moema](https://www.moretegra.com.br/empreendimentos/viso-moema/) | SP Form46 | 1 | 0 Product | sem RealEstateAgent; mídia/hero; consulta | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=FzfE9zhLxvT0ivrZtECioQ&utm_medium=link&utm_source=api) |
| [Kronos by Tegra](https://www.moretegra.com.br/empreendimentos/kronos-by-tegra/) | RJ Form47 | 3 | 0 Product | canal RJ, 29 países, galeria; não inferir canal pelo DDI | [GSC](https://search.google.com/search-console/inspect?resource_id=https://www.moretegra.com.br/&id=QjBjafHtzDRJXByxYvWLeg&utm_medium=link&utm_source=api) |

## Lotes propostos (não implementados nesta PR)

1. A — SP sem shell: Nova Vivere, Garden Design e Reserva (validação do contrato P0 e galerias).
2. B — YPY, Bem Moema Studios & Offices, TEG Sacomã e Viso Moema (unidades selecionáveis, mídia existente, heros/schema especiais).
3. C — CAPIITOLO e DSG Itaim isolados por renderização dinâmica e estado comercial específico.
4. D — Kronos RJ isolado por Form47/identidade de atendimento.

## Gates inegociáveis

- Read-only baseline por URL, cinco PSI Mobile comparáveis antes/depois; métricas de laboratório separadas do CrUX.
- Testar payload com interceptação local sem transmitir lead real; cenários positivos/negativos BR + internacional, Form46/47, troca de país, duplicidade, falha de rede, consentimento e atribuição.
- Validação estática e DOM final de SEO/JSON-LD, canonical, WebMCP, facts único, hero sem meta duplicado, galerias/controles e acessibilidade; não modificar validadores históricos para CI verde.
- Diff e CI por sublote, homologação owner após eventual produção, SHA/deployment READY/alias www reais; correção de falhas comprovadas, depois GSC + IndexNow sob decisão de aceite.
- Sem modificação runtime/infra/CRM/Consent V3/GA4/GTM/WhatsApp/preço por esta PR. Nenhuma contagem meta de rich results justifica Offer/Review fictício.

## Entrega ao proprietário

Dashboard HTML local fornecido na conversa: dez cartões, cinco links por URL, seis checks por URL, persistência/exportação JSON e CSV. Não afirmar testes PSI ou aprovação do dashboard como feitos. O HTML de homologação não foi instalado no website por esta PR.
