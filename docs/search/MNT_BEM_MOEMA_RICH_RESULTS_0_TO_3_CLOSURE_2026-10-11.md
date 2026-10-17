# SFJM — Bem Moema: Google Rich Results, 0 → 3, evidências e próximos gates

- Data: 2026-10-11 (São Paulo)
- Status: `GOOGLE_USER_OBSERVED_3_VALID / PRODUCTION_RELEASE_CONFIRMED / FURTHER_SCHEMA_AUDIT_PENDING`
- URL: https://www.moretegra.com.br/empreendimentos/bem-moema/
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Autoridade: solicitação explícita da Product Authority para publicar em produção e validar no domínio oficial.
- Release: PR #379 / merge SHA `08e727aa879ab2f4afa996dfbbe40aade85c3c72`
- HEAD pré-merge validado: `36a283ad9fbd651b4688c06f393af2480ea92866`
- Produção Vercel: `dpl_3rRUfTn489ELq6n3Qdycayk2aXZJ` / `READY` / alias `www.moretegra.com.br`
- Rollback histórico anterior: `dpl_5Zq3b2hkzVy9ZjW54KoyQhc9U4Wk` / merge `7cd73b7589b974cd91ca441a2b22a7c44e37d0c4`.

## 1. Problema observado, não confundir com sintaxe

O teste público Google Rich Results (captura fornecida pela Product Authority em 2026-10-11 às 07:28, São Paulo) indicava `Nenhum item foi detectado`, **mas o rastreamento teve êxito, a indexação era permitida e o HTML continha JSON-LD parseável**. O grafo inicial possuía 5 nós: `WebPage`, `ApartmentComplex`, 2 `ImageObject` e `FAQPage`. Nenhum destes gerou, naquela execução, item elegível reconhecido pelo Rich Results Test. NÃO equivale a JSON-LD ausente/ilegível.

## 2. Intervenção exatamente efetuada — PR #379

Adicionados 5 nós, preservando todas as entidades originais:

1. `BreadcrumbList`: Home → Bem Moema, com URLs canônicas.
2. `Brand`: Tegra.
3. `Organization`: Tegra Vendas.
4. `ContactPoint`: atendimento comercial e telefone já governado.
5. `RealEstateAgent`: Sabrina da Tegra, atendimento **in loco** no endereço aprovado do Bem Moema (`Avenida Bem-te-vi, 221, São Paulo, SP, CEP 04524-030`), retrato comercial canônico e CRECI `209.905-F`.

O grafo passou de **5 para 10 nós**. `ApartmentComplex.address`, `WebPage.primaryImageOfPage`, as duas `ImageObject`/URLs da fachada e área externa, FAQ visível/JSON-LD, Copy comercial, Form 46, CTAs, GTM/Consent, canonical, OG/Twitter e LCP permaneceram fora da alteração funcional.

A governança de paridade de `RealEstateAgent.address` foi atualizada: 16 páginas com agente local entre 25 empreendimentos; outras nove páginas continuam sem uma entidade separada. Não usar um endereço fixo do agente para todos os empreendimentos.

## 3. Resultado real observado depois da publicação

Captura da Product Authority às **07:34:47 de 2026-10-11** mostra no Google Rich Results Test:

| Tipo de resultado avançado | Antes | Depois |
|---|---:|---:|
| Indicadores de localização atual (Breadcrumb) | 0 | **1 válido** |
| Empresas locais (Local Business, `RealEstateAgent`) | 0 | **1 válido** |
| Organização (`Organization`) | 0 | **1 válido** |
| Total na ferramenta | **0** | **3** |

Classificação: `GOOGLE_USER_OBSERVED_PASS_3_ITEMS`. A captura mostra contagens e check verdes, **mas não expande avisos opcionais** de cada entidade; não declarar ausência de warnings até inspeção detalhada. Não inferir indexação definitiva ou presença visual na SERP apenas do Rich Results Test.

## 4. Por que não existe a meta de seis resultados

**Nós Schema.org != categorias suportadas pelo Google != resultados exibidos na SERP.** O teste conta apenas recursos elegíveis para os tipos que reconhece, não todos os nós e não uma proporção como 3/6 ou "50% faltando". `ApartmentComplex`, `ImageObject`, `FloorPlan` e `WebPage` podem enriquecer semântica sem gerar uma categoria separada no Rich Results Test.

`FAQPage` mantém seis perguntas visíveis e em JSON-LD, mas os rich results FAQ são fortemente restritos a sites governamentais/de saúde de alta autoridade; não criar `QAPage` ou avaliações fictícias para contornar isso.

Referências técnicas:
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- https://developers.google.com/search/blog/2023/08/howto-faq-changes

## 5. Potencial real de próxima ampliação — análise separada, não publicada

A página exibe a referência comercial identificável **unidade AP0202, 80 m², R$ 1.811.200**, com `R$ 22.640/m²`. Isso permite **estudar** uma entidade `Product` associada à unidade específica e `Offer` com preço de referência correspondente, como existe no projeto Órbita. **Não implementar automaticamente**:

- Revalidar tabela, disponibilidade/condição e escopo de compra; o valor é referência comercial, não promessa de estoque. Não inventar `availability`, ratings/reviews, avaliações, GTIN, frete, política de devolução, unidades adicionais ou propriedades ausentes.
- Diretrizes Google `Product`: página deve focar produto individual/variantes reais; `merchant listing` requer contexto em que o usuário possa comprar, ao contrário de mero formulário de interesse. Empreendimento com diversas tipologias pode não ser elegível como merchant listing.
- Usar eventualmente `Product` para **unidade AP0202**, nunca fingir que todo o condomínio é um produto único disponível a esse preço; testar com Google + Schema.org e os critérios de conteúdo visível antes de aprovar.
- `FloorPlan`: se plantas oficiais e m² estiverem mapeados de modo verificável, considerar nós Schema.org de planta por tipologia, mas sem expectativa de contar item extra no Google.
- `Service` e `Person`: podem tornar grafo semanticamente coeso se as relações e evidências forem válidas, porém não geram automaticamente mais categorias Rich Results.
- Inspecionar avisos opcionais de `RealEstateAgent` e `Organization`, sem forçar mudanças apenas para eliminar warnings que não correspondam a dados autorizados.

Referências:
- https://developers.google.com/search/docs/appearance/structured-data/product
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://developers.google.com/search/docs/appearance/structured-data/merchant-listing

## 6. Gates / dívida separada

- CI específico pré-release: 7 sucessos (postal, duas imagens 39 URLs, cobertura, onsite agent, comercial, social, favicon); M5-06 CTA/Form permaneceu vermelho por dívida de baseline, **não declarar CI global verde**.
- Próxima ação segura: **auditoria read-only de elegibilidade, factualidade de preço/unit mapping e avisos expandidos do Rich Results Test**, depois proposta de `Product/Offer` e `FloorPlan` numa PR própria **somente após autorização específica**.
- Não alterar outro empreendimento por contagem de rich results. Sem automatizar publicação, sem novas alterações em Home, mídia, GTM ou Form 46.
- Evidência de interface: capturas da Product Authority nos diálogos de 2026-10-11, antes 07:28 e depois 07:34. **As imagens do chat não foram incorporadas ao GitHub**, apenas os fatos visualmente observáveis e seus horários declarados acima.

## 7. Decisão de documentação

Este arquivo é documentação e decisão de diagnóstico, **sem efeito de runtime**. Não reescrever marcadores históricos de produção sem reconciliar o estado live. Ao integrar documentação, atualizar os ponteiros SFJM aplicáveis em gate próprio.
