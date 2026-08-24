# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Baseline funcional vigente: `FUNCTIONAL_BASELINE_V2`
- Baseline técnica vigente: `TECHNICAL_BASELINE_V2`; candidata que a refina: `TECHNICAL_BASELINE_V2_1`
- ADR candidato: `ADR-001-GREENN-BUILDER-MODULE-COMPOSITION`
- Fase: `implementação/homologação com ajuste de topologia Green`
- Saúde geral: `amarelo` — arquitetura central está estável, Preview inicial existe, mas a composição modular Green ainda precisa ser incorporada à PR #6

## 1. Resultado pretendido

Entregar um MoreNumTegra V1 mobile-first, rápido e SEO-first, com catálogo de empreendimentos, filtros, CTAs, vídeo in-page e captura de leads pelo formulário nativo da Green Sales.

## 2. Estado por frente

| Frente | Estado | Próximo marco | Bloqueio |
|---|---|---|---|
| SFJM | operacional | continuar reconstrução live por bootstrap | nenhum |
| Functional V2 | canônica | preservar | nenhum |
| Technical V2 | canônica | integrar refinamento V2.1 | topologia builder ainda não registrada em main |
| Green builder | requisito owner-confirmed | integrar ADR/V2.1 | documentação candidata |
| Implementação PR #6 | Draft, protótipo funcional | modularizar | depende da V2.1 em main |
| Vercel Preview | primeiro protótipo acessível | substituir por Preview modular | protótipo atual monolítico |
| Mobile/UX | direção visual inicial aprovada para evolução | testar versão completa | portfólio ainda incompleto |
| Catálogo | migração de 19 cards disponível no ZIP | verificar/migrar | dados precisam validação |
| Vídeo | estratégia anterior rejeitada | in-page autoplay mudo/loop/playsinline | mídia final/origem a validar |
| Form/lead | Form 46 conhecido | usar bloco nativo Green | Preview usa mock não transmissor |
| Green production | gate posterior | publicar release modular validada | Preview final ainda não validado |

## 3. Decisões confirmadas

- HTML5 + CSS + JavaScript vanilla;
- GitHub é fonte canônica;
- Vercel é laboratório;
- Green Sales é produção V1;
- Green Sales monta a página por módulos;
- produção usa o bloco nativo Form 46;
- layout Green alvo: HTML 01 -> Form -> HTML 02 -> Footer;
- CSS e JavaScript são inseridos globalmente no builder;
- vídeo deve tocar dentro da página, não abrir YouTube externamente;
- a direção hero escura + headline branca do primeiro Preview pode ser mantida/evoluída;
- o catálogo final deve recuperar os imóveis existentes no material anterior, sujeito a validação factual.

## 4. Riscos ativos

| Risco | Controle |
|---|---|
| Vercel divergir da Green | Preview compositor usa os snippets exatos da Green |
| formulário customizado divergir do builder | produção usa Form 46 nativo |
| CTA não localizar form | âncora própria `#formulario` antes do bloco nativo |
| módulos quebrarem HTML | cada bloco é autocontido |
| vídeo prejudicar LCP | muted autoplay + poster/fallback + carregamento controlado |
| YouTube tirar usuário da página | embed in-page; sem click-out como fluxo principal |
| perder imóveis existentes | ZIP de 19 cards usado como input de migração |
| publicar dado incorreto | validar campos antes de produção |
| regressão mobile | teste por toque e metas CWV |

## 5. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Integrar V2.1/ADR; em seguida sincronizar a PR #6 com `main`, substituir o HTML monolítico pela composição modular Green-compatible, recuperar o catálogo validado e gerar novo Preview.