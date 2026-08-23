# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Onboarding SFJM: integrado em `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Baseline funcional V1: integrada em `862e734dac9c60eceae8c311e30304d14efd687a`
- Baseline técnica V1: `docs/baseline/TECHNICAL_BASELINE_V1.md` quando presente em `main`
- Fase atual após integração desta baseline: `implementação V1 autorizada em branch dedicada`
- Saúde geral: `verde/amarelo` — contratos funcional/técnico suficientes para construir; Production, domínio e integrações de dados continuam deliberadamente separados

## 1. Resultado pretendido

Entregar um MoreNumTegra V1 mobile-first, rápido e SEO-ready, com experiência Tegra de descoberta/conversão, usando arquitetura estática-first e Preview Vercel como gate antes de qualquer produção.

## 2. Decisões técnicas V1

| Área | Decisão |
|---|---|
| Framework | Next.js 16.x App Router, versão segura resolvida live no scaffold |
| Linguagem | TypeScript strict |
| Runtime | Node.js 24 LTS |
| Renderização | static-first / server-rendered; Client Components só para interatividade |
| Dados V1 | catálogo local tipado e versionado |
| Backend/DB/CMS | nenhum em V1 |
| Filtros | client-side sobre dataset já renderizado |
| Mídia | imagens otimizadas; vídeo não crítico e resiliente |
| Formulário | UI/validação em Preview; sem PII real até contrato separado |
| Performance | LCP <=2.5s, INP <=200ms, CLS <=0.1 no p75 como metas de campo |
| Acessibilidade | WCAG 2.2 AA target |
| Hosting | Vercel Preview-first |
| Production | gate separado após Preview validado |
| Domínio/DNS | gate separado após decisão de Production |

A autoridade detalhada é `docs/baseline/TECHNICAL_BASELINE_V1.md`.

## 3. Estado por frente

| Frente | Estado após baseline técnica integrada | Próximo marco | Bloqueio |
|---|---|---|---|
| SFJM | operacional | reconstrução live por bootstrap | nenhum blocker de lifecycle |
| Baseline funcional | canônica | preservar requisitos | nenhum |
| Baseline técnica | canônica quando presente em `main` | implementação V1 | merge desta PR precisa passar gate |
| Implementação | autorizada condicionalmente | branch `feat/initial-product-implementation` | baseline técnica deve estar em `main` |
| Mobile/UX | pronto para implementação/teste | reproduzir relatos e corrigir | código ainda ausente |
| SEO técnico | estratégia definida | implementar metadata/sitemap/robots/noindex Preview | domínio production ainda não decidido |
| Performance | targets definidos | medir no Preview | field data só após tráfego real |
| Form/lead | UI permitida | implementar mock/safe Preview | transmissão real bloqueada |
| Vercel Preview | autorizado após build gate | Preview validado | nenhum projeto Vercel existe ainda |
| Vercel Production | não autorizado | gate após Preview | bloqueado |
| Domínio/DNS | não autorizado | gate após Production decision | bloqueado |

## 4. Vercel live state observado

- Team: `team_WIH0gs3BUjcZdk59oPViSjEm`.
- Plano: `Hobby`.
- Projetos existentes observados: `0`.

Portanto, não existe configuração legada a preservar e o primeiro deployment deve ser Preview.

## 5. Marcos

| Marco | Situação | Evidência/condição |
|---|---|---|
| Repositório criado | atingido | GitHub |
| SFJM onboarding | atingido | `2819cc1...` |
| Baseline funcional V1 | atingido | `862e734...` |
| Baseline técnica V1 | candidata nesta PR | presença em `main` após gate/merge |
| Branch de implementação | autorizada pós-merge | criar do SHA live após baseline técnica |
| Preview Vercel | autorizado condicionalmente | build/test gate no branch de implementação |
| Production | não atingido | Preview validado + autorização separada |
| Domínio/DNS | não atingido | autorização específica posterior |

## 6. Riscos ativos

| Risco | Impacto | Controle |
|---|---|---|
| pin de Next.js com patch crítico pendente | alto | resolver versão segura live no scaffold |
| transformar página em SPA pesada | alto para mobile | server/static-first + client islands |
| mídia degradar LCP | alto | hero/image strategy; vídeo não crítico |
| formulário capturar PII prematuramente | alto | Preview mock/local only |
| merge em `main` virar Production por automação futura | alto | Vercel Preview-first; Production gate/branch separados |
| indexação de Preview | médio/SEO | verificar `X-Robots-Tag: noindex` |
| escopo crescer para CMS/backend sem necessidade | médio/alto | dataset local V1; adapter boundary |

## 7. Próxima ação segura

- Autoridade: `docs/NEXT_SAFE_ACTION.md`.
- Resumo: depois que `TECHNICAL_BASELINE_V1` estiver em `main`, criar `feat/initial-product-implementation` e implementar o V1; Preview permitido após build gate; Production/domain continuam separados.

## 8. Fora do escopo atual

- Production Vercel;
- custom domain/DNS;
- CRM/form endpoint real;
- transmissão de PII;
- analytics/pixels/tags;
- campanhas;
- CMS/database sem nova decisão;
- expansão para rotas/produto não canonicalizados.

## 9. Critério de atualização

Atualizar por mudança material de requisito, arquitetura, autorização, risco, blocker ou próxima ação. Não criar PR apenas para registrar que uma PR anterior mergeou ou que um SHA mudou.