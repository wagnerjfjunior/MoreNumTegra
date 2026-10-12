# RESF V1 — Fechamento Tièl e prontidão para escala (2026-10-12)

Estado: `STANDARD_CANONICAL / TIEL_RELEASED / SCALE_EXECUTION_NOT_STARTED_BY_THIS_RECEIPT`
Tipo: evidência documental; não muda HTML, assets, schema, Form 46, rotas, Vercel, SEO ou mídia.
Padrão: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`, inclusive adendo operacional §10 (2026-10-12).

## 1. Escopo fechado e fatos observados

Empreendimento: Tièl Vila Nova Conceição
Rota: `/empreendimentos/tiel-vila-nova-conceicao/`
- PR #393, merge `152e0db2521f194db8ed5068a7e2a97dfc8d47af`: completude semântica do projeto.
- PR #394, merge `d7c7d98ee435cfeb16979c11015fbe14bcbfd0e2`: WebPage.mentions e relação da pessoa/projeto.
- PR #395, merge `57970a878b08b0dde577b3af00a323ab91684cae`: copy comercial, singular/plural, tipografia, facts, galeria de interiores, fotografias contextualizadas do bairro, navegação e WhatsApp.
- PR #396, merge `b2e02ace0d1391f6570f14fa7c056e9defb41b8b`: remoção de links clicáveis dos três créditos do bairro, mantendo atribuição em texto.
- Vercel produção do SHA #396: `dpl_HSMTSZnARCDKwDDVei6YDUGZT7EF` — `READY` — aliases `www.moretegra.com.br` e `moretegra.com.br` confirmados no momento do deploy. É observação temporal, não garantia permanente.
- GitHub Actions PR #395 e #396: 8 checks concluídos `success` cada no último head verificado. Não converter CI estático em prova de performance/entrega de formulário.
- Product Authority aprovou o layout revisto via SFJM Local Live Sync e, após o merge, reportou: galeria OK, lead funcionando no Green Sales, evidência visual de origem `MoreEmUmTegra`, texto de interesse Tièl e vendedor Sabrina da Tegra. Não registrar aqui informações pessoais do lead de teste.
- Google URL Inspection: usuário confirmou em 12/10/2026 Googlebot Smartphone, fetch permitido/OK, indexação permitida. Esse resultado significa `INDEXABLE`, **não** `INDEXED`.
- Schema.org validator: usuário conferiu 5 itens principais/zero erros/zero avisos para #394; Google Rich Results foi assinalado OK pelo usuário, sem inferir que o crawler já consumiu #396.
- QA público autônomo HTTP, bateria Lighthouse 5x e métricas reais LCP/INP/CLS: `NOT_INDEPENDENTLY_VERIFIED`; monitoramento GSC de indexação efetiva: `PENDING_EXTERNAL`.

## 2. Critérios fechados como *padrão reutilizável*

1. SEO comprador: nome exato, Tegra, estágio e tipologia verificável; arquitetura de H1/H2/H3 útil, sem redundância; singular/plural sem stuffing; ownership regional/empreendimento/estágio conforme M3-05/M3-06.
2. Tipografia consistente por função de cada elemento, avaliada em mobile/desktop; nenhuma fonte/escala de Tièl vira valor universal obrigatório.
3. Uma faixa canonical facts 4 itens, desktop 4 e mobile 2x2. Se dado necessário falta (ex. vagas), registrar `FACTS_DATA_GAP` e exceção específica; separação inequívoca de plantas ilustrativas versus unidade comercial.
4. Galeria com imagens relevantes **dos apartamentos quando autorizadas e disponíveis**, áreas de lazer e legendas/ALT corretos; não inventar fotos reais de perspectivas ilustradas.
5. Bairro valorizado com imagens pertinentes e autorizadas, links internos somente contextuais e sem URL de bairro deslocando CTA da dobra. Três imagens são precedente, não quota. Créditos/licenças conforme direitos da mídia; não retirar obrigação legal.
6. WhatsApp e CTA `Receber condições` visíveis, acessíveis, consistentes no mobile e testados por toque; Form46/GDigital e medição `mnt_*` invariáveis.
7. Validação por página: estrutura, dados produto, preço/oferta, imagens, FAQ/JSON-LD, consentimento, CTA/Form46, SEO, performance e QA mobile; merge e produção rastreáveis.

## 3. Como executar as próximas aproximadamente 30 páginas

O número `30` é escopo estimado pelo Product Authority; **a lista exata e a conformidade das rotas ainda precisam ser auditadas**. O encerramento do padrão RESF **não é** encerramento de 30 páginas.

Fluxo por página:
`inventário factual + baseline` → `priorização de delta` → `PR pontual` → `testes` → `SFJM Live Sync e aprovação visual` → `merge explicitamente autorizado` → `Vercel produção SHA/URL` → `smoke e recibo`.

Campos mínimos de matriz:
`slug | URL | estágio | estado comercial | fact pack | SEO/copy | fontes/mídia | facts | gallery/interiores | bairro | Form46/WhatsApp | JSON-LD/FAQ | mobile/performance | QA | PR/SHA/deployment | status | bloqueio`.

Status por página: `NOT_AUDITED`, `AUDITED_GAPS`, `BLOCKED_BY_PRODUCT_TRUTH`, `IN_PR`, `QA_APPROVED`, `RELEASED`, `RELEASED_WITH_RESIDUALS`. Nunca computar `RELEASED` por herança de outra rota. Agrupar por cluster/risco e evitar PR gigantesco; não assumir autorização de publicação para páginas futuras.

## 4. Decisão e próximos passos

- `RESF_V1_STANDARD = CANONICAL_AND_SCALE_READY` — fechado como especificação e processo para uso nas próximas páginas.
- `TIEL_COMMERCIAL_UI = USER_VALIDATED`; `TIEL_GITHUB_AND_VERCEL = MERGED_READY`; `TIEL_PUBLIC_SMOKE_FULL = PARTIAL_USER_REPORT / INDEPENDENT_QA_OPEN`.
- Não bloquear a auditoria das demais páginas esperando a futura indexação do Tièl. Lighthouse, inspeção HTTP autônoma e performance permanecem pendências de evidência de execução, não um motivo para reabrir a arquitetura ou redefinir o RESF.
- A próxima ação segura é levantar o inventário real de páginas e iniciar correções individuais, cada uma autorizada conforme governança.
