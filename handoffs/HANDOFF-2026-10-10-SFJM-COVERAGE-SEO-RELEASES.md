# SFJM — HANDOFF CANÔNICO DE CONTINUIDADE — 2026-10-10

**Projeto:** MoreNumTegra · **Repositório:** `wagnerjfjunior/MoreNumTegra` · **Data da observação:** 2026-10-10 (São Paulo).

**Natureza:** fotografia auditada do projeto para retomada. `GitHub main` permanece canônico. Este documento é candidato em **PR Draft** até merge; **não** muda produção, estado operativo do programa SFJM ou autorizações anteriores. Sempre resolver estado live novamente antes de nova execução.

## 1. Produção verificada e rollback

| Dimensão | Valor observado em 2026-10-10 |
|---|---|
| `main` | `3acd0a9228ebaf4d368fba40052f1ff41c0cbca2` |
| Vercel produção `www.moretegra.com.br` | `dpl_4K9i6b96UnCUvYbgWrB5LUa9v6k1` / **READY** / mesmo SHA |
| Última versão de recuperação verificada na ocasião do release | `dpl_D6xLZzkvn5xuF1S7FB4U68ttGHdB` / `f191a0b70a0fbd3a9a2632fd98418489646120cd` / READY e elegível naquele momento |
| Produção de leads | GDigital/Green Sales Form 46, tenant 313; não substituir ou introduzir backend |
| Arquitetura | HTML/CSS/JS vanilla; Vercel é produção conforme ADR-006; Cloudflare DNS only; GDigital/Green Sales captura |
| `lp.moretegra.com.br` | redirect 308 para `www`; preservar política de GSC |
| `moretegra.com.br` | canonicalização para `www.moretegra.com.br` |

O rollback Vercel **não reverte automaticamente GitHub main**. Para persistência, preparar revert do commit em GitHub e conferir novo deploy. Conferir elegibilidade live no momento do incidente; status acima não é promessa futura.

## 2. Releases integrados em 10/10

- **PR #370**, merged `f191a0b70a0fbd3a9a2632fd98418489646120cd`: faixa de privacidade/consentimento da Home ocupa viewport desktop ponta a ponta. Usuário confirmou por captura que está **OK**. JS consentimento/GTM preservado.
- **PR #368**, merged `3acd0a9228ebaf4d368fba40052f1ff41c0cbca2`: contrato de endereços de **23 empreendimentos**; **16 complementações** de `ApartmentComplex.address` e **7 páginas completas preservadas**. Elo Duo `Rua Fortunato Ferraz, 851 · CEP 05093-000`, `ApartmentComplex.geo` lat `-23.51768499139431`, long `-46.72021320439278` expressamente fornecidos pelo usuário; não implica validação geodésica independente. Nova Vivere e Garden Design usam showroom `Rua Fortunato Ferraz, 625` provisoriamente. Órbita `Avenida Celso Garcia, 5040 · CEP 03064-000`.
- O Google Rich Results Test do Órbita em produção mostrou somente **BreadcrumbList: 1 item válido**. O endereço **está** no JSON-LD publicado; `ApartmentComplex.address`/ `PostalAddress` não aparece como recurso próprio no teste. Schema Markup Validator capturas: Órbita 2 itens / 1 aviso; Nova Vivere 5 itens / 5 avisos. Google Rich Results Test Nova Vivere 6 itens (captura anterior). **Contagens de validadores não são contagem de nós nem garantias de rich results.**

## 3. PRs abertas resolvidas live

| PR | Base, âmbito | Estado em 10/10 |
|---|---|---|
| **#372** | main — Órbita JSON-LD comercial + imagem + FloorPlan + guard global | **DRAFT**, HEAD `3408b702f9d1e56fee0608572e6c17fac306fee9`. Deve continuar isolada e ser homologada. |
| **#371** | main — correção de layout Home (momentos + regiões) | **DRAFT**, HEAD `0ef53645076ee0eebaa78f5ca4b3a46c8a925d33`; CSS/HTML apenas; CI específico PASS no desenvolvimento. |
| **#369** | main — M4-05R test-only (Home versionamento JS/shim) | **DRAFT**, HEAD `ea0253085b6cc3e2f1800a04e78d7fb2eca0e77b`, validador M4 PASS; sem mudança runtime. |
| **#367** | main — Ária Higienópolis search image ownership | **DRAFT**, HEAD `fa080b1fb6f5cc04fd15403011067859be4fcd8b`. |
| **#366** | baseada em branch **#364**, não main — ImageObject/search ownership lote 16 | **DRAFT**, HEAD `71342d93d4ce25bb60084a52fd6f9a158dffa4cb`; dependência explícita #364. |
| **#365** | main — DSG Itaim/CAPIITOLO mídia isolada, fora das 36 | **DRAFT**, HEAD `71f6a25d3481efdf17ba4d9fe97735062dd9d44b`. |
| **#364** | main — RESF V2 inventário de **36 imagens HERO aprovadas** | **DRAFT**, HEAD `0c9fe91d235a2e5394838549e42f549eecc6d927`. Imagens aprovadas não implicam autorização indiscriminada de alterações OG/schema nem publicação. |
| **#335** | main — SFJM LVR automatic refresh | DRAFT antigo; reavaliar, não misturar na versão SEO. |
| **#141** | main — QA acessibilidade M5-01 | DRAFT antigo; reavaliar, não misturar na versão SEO. |

**PR #368 e #370 estão MERGED**; não reaplicá-las. As demais PRs listadas **não** estão em produção.

## 4. PR #372 — Órbita cobertura comercial e visual

A PR acrescenta ao grafo existente:
- `Organization`, `ContactPoint`, `Person`, `RealEstateAgent`, `Service`;
- `Product` da unidade **AP0609 de 69 m²** e `Offer` de **R$ 611.685 / BRL**, referência visível na página, sem `availability` inventada;
- `ImageObject` de URL **já aprovada** no inventário RESF: `https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/ImagemPrincipal/e56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg`; sem alterar hero/OG/asset;
- três `FloorPlan` das plantas **já publicadas** de 1, 2 e 3 dormitórios, cada uma com URL real;
- um `FloorPlan` de **AP0609 · 69 m²** sem associar imagem: não existe mapeamento inequívoco entre a unidade AP0609 e uma das três fotos de plantas. Não inventar correspondência.

A cobertura global de `scripts/validate-project-schema-coverage.mjs` audita **25 páginas**. Protege `WebPage`, `ApartmentComplex`, tipos/nós `@id` existentes e exige cobertura elevada para o Órbita; outras páginas recebem débito explícito, sem forçar preço inexistente. Baseline auditado antes do enriquecimento: **11/25 páginas** com menos de 8 nós (5 com 4, 5 com 6, 1 com 7); métrica de triagem, não contrato de qualidade do Google.

Checks da PR #372 no HEAD auditado: **6 PASS** — cobertura global; contrato Órbita; endereços RESF; padrão comercial; compartilhamento social; favicon. Não significa homologação do Google na produção. **PR ainda DRAFT, nenhum merge.**

## 5. Proteções e bloqueios

- Não criar schema para atingir arbitrariamente seis itens do Google. Respeitar `Product`/`Offer` somente com verdade comercial visível e comprovada; preservar FAQ ↔ conteúdo visível; endereço de projeto ≠ endereço da corretora; não inventar `geo`.
- **Melhorar proteção da cobertura gradualmente:** agora apenas Órbita possui contrato enriquecido estrito. Os outros 24 requerem auditoria de fatos e migração por lotes para contratos compatíveis com disponibilidade real de planta/preço/contato. Não desativar CI para mascarar dívida.
- M5-06 CTA/Form e late GTM consent order têm falhas preexistentes em main conforme análise anterior; M4-05R corrigido apenas no Draft #369. Validar sem alterar lógica de consentimento às cegas.
- **LCP/performance otimização foi expressamente adiada pelo usuário em 10/10**. Não reabrir frente sem decisão nova.
- Não publicar PRs Draft, aplicar changes em GSC, alterar ads/spend/Meta/FECH.AI/n8n, ou fazer merge sem autorização e verificação head/main. Não misturar imagem hero com política OG por inferência.
- Preservar a UX mobile e captador Form 46, WhatsApp e SEO semântico.

## 6. Lacunas de documentação encontradas

Documentação **extensa, mas não plenamente atualizada**: os cabeçalhos e estado ativo de `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` ainda referiam em parte o runtime de **06/10**. `docs/sfjm/CURRENT_PROGRAM_STATE.json` ainda registra fotografia de **06/10**; não sobrescrever conclusões antigas do programa MNT-RESF com estado fictício de execução. Este handoff + ponteiros criam um delta rastreável, não alegação de que todos os 100+ arquivos históricos estão atualizados. Baselines e ADR-006 têm valor histórico/autoritativo e não devem ser reescritos por rotina.

## 7. Próxima ação segura

1. **Reabrir a conversa** e resolver `main`, produção Vercel, PR #372 e PR documental de handoff; confirmar HEADs e checks antes de qualquer mudança.
2. Auditar detalhe final de `#372`: contrato de cobertura, links reais `ImageObject`/ `FloorPlan`, preço AP0609, consistência JS/Form46 e compatibilidade com PRs #364/#366 (evitar colisão do `WebPage.primaryImageOfPage` e da imagem primária).
3. Obter aprovação explícita para merge de #372; preparar rollback para a versão imediatamente anterior, publicar e conferir Google Rich Results/Schema.org pós-deploy. **Não prometer seis resultados**.
4. Homologar #371 (Home desktop/mobile) e tratar backlog SEO/RESF em integração planejada, com #366 empilhada sobre #364.
5. Planejar cobertura estrita por empreendimento como fase distinta com inventário de dados comerciais (não forçar ofertas onde não existem).
6. Documentar resultados dos testes pós-publicação e somente então solicitar indexação/reindexação, se autorizada.

## 8. Procedimento padrão de nova conversa

Prompt sugerido:

> Ative SFJM para `wagnerjfjunior/MoreNumTegra` em modo live, leitura primeiro. Antes de executar, consulte na `main` `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, `docs/baseline/FUNCTIONAL_BASELINE_V2.md`, `docs/baseline/TECHNICAL_BASELINE_V2_3.md` e `handoffs/HANDOFF-2026-10-10-SFJM-COVERAGE-SEO-RELEASES.md` (se ainda estiver em PR, ler pela branch do handoff). Confirme `main` e o deploy ativo na Vercel; verifique PR #372, #371, #369, #364, #366, #367, #365 e seus checks. Último deploy confirmado no fechamento: `3acd0a92` / `dpl_4K9i6b96UnCUvYbgWrB5LUa9v6k1`. Prioridade: homologar PR #372 de enriquecimento do Órbita, proteger cobertura SEO das demais páginas e coordenar integração segura das PRs sem regressão; **não** inventar dados nem usar contagem de itens do Google como verdade do grafo. LCP/performance fora de escopo. Não faça merge/deploy sem autorização explícita e rollback identificável. Entregue quadro de estado real, riscos, próxima ação segura.

## 9. Referências

- `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`
- `docs/resf-v2/data/APPROVED_HERO_IMAGES_2026-10-10.json` (**na PR #364, não em main**)
- `docs/resf-v2/APPROVED_PROJECT_ADDRESSES_CEP_2026-10-10.md` (integrado via PR #368)
- `docs/resf-v2/ORBITA_COMMERCIAL_SCHEMA_PARITY_2026-10-10.md` (**na PR #372**)
- `scripts/validate-project-schema-coverage.mjs` (**na PR #372**)
- `scripts/validate-resf-v2-postal-address-contract.mjs` (**em main**)
- `docs/sfjm/CURRENT_PROGRAM_STATE.json` (fotografia anterior; requer futura reconciliação dirigida)
