# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica atual em `main`: `docs/baseline/TECHNICAL_BASELINE_V1.md`
- Baseline técnica candidata que supersede V1: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- Fase: `reconciliação arquitetural antes da implementação`
- Saúde geral: `amarelo` — requisitos do produto estão claros, mas a implementação portátil só pode iniciar depois da V2 estar integrada

## 1. Resultado pretendido

Entregar um MoreNumTegra V1 mobile-first, rápido e SEO-first, com descoberta de empreendimentos, filtros, CTAs e captura de leads, usando os mesmos artefatos HTML/CSS/JS no Preview e na Greenn.

## 2. Decisão arquitetural V2

| Área | Decisão |
|---|---|
| Framework | nenhum obrigatório no V1 |
| Markup | HTML5 semântico |
| Styling | CSS mobile-first |
| Interatividade | JavaScript vanilla |
| Artefatos principais | `src-greenn/moretegra.html`, `.css`, `.js` |
| Dados V1 | catálogo local/versionado separado da apresentação quando útil |
| Backend/DB/CMS | nenhum em V1 sem necessidade comprovada |
| Filtros | client-side |
| Formulário | Greenn Form 46 / tenant 313 conforme contrato verificado |
| Performance | LCP <=2.5s, INP <=200ms, CLS <=0.1 |
| Acessibilidade | WCAG 2.2 AA target |
| Homologação | Vercel Preview |
| Produção V1 | Greenn após Preview validado e release rastreável |

## 3. Estado por frente

| Frente | Estado | Próximo marco | Bloqueio |
|---|---|---|---|
| SFJM | operacional | reconstrução live por bootstrap | nenhum |
| Baseline funcional | canônica | preservar | nenhum |
| Baseline técnica V1 | canônica, porém supersedenda | integrar V2 | conflito com decisão vigente |
| Baseline técnica V2 | candidata | revisão/merge | ainda não está em main |
| Implementação | parada corretamente | alinhar branch após V2 | V2 não integrada |
| Mobile/UX | requisitos definidos | implementar/testar | implementação ausente |
| SEO | requisitos definidos | implementar | implementação ausente |
| Form/lead | contrato Greenn conhecido | implementar/testar | validar comportamento real no Preview/Greenn |
| Vercel Preview | permitido após branch buildável | homologação | resolver Vercel live antes do deploy |
| Greenn production | gate posterior ao Preview | publicação controlada | Preview ainda não validado |
| Domínio/DNS | separado | decisão posterior | não autorizado nesta fase |

## 4. Branch de implementação observada

`feat/initial-product-implementation` existe, mas na checagem live estava 2 commits atrás de `main` e 0 commits à frente. Não há PR aberto.

Ela não deve receber código antes da V2 integrar `main`. Depois do merge, deve ser fast-forwarded/recriada do SHA exato somente após reconfirmar que segue sem commits únicos.

## 5. Riscos ativos

| Risco | Controle |
|---|---|
| implementar Next.js apesar da nova decisão | V2 supersede explicitamente V1 antes de código |
| duplicar versão Vercel e Greenn | um único conjunto `src-greenn` como fonte portátil |
| regressão mobile | mobile-first + testes por toque |
| mídia degradar LCP | lazy loading/fallback/vídeo não crítico |
| inventar dados de empreendimentos | somente dados verificados |
| formulário vazar segredo | somente contrato público verificado; parar se segredo for necessário |
| publicação Greenn prematura | Preview + release gate antes de produção |
| perder rastreabilidade | SHA/release identificado para cada publicação |

## 6. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

A próxima ação é integrar a baseline V2. Somente depois disso a implementação V1 portátil pode começar em `feat/initial-product-implementation` alinhada ao SHA live de `main`.
