# CDP V3 — Contrato de mapeamento de consumidores (proposta)

Data: 2026-10-16
Status: DRAFT / READ_ONLY / NO_RUNTIME_MUTATION
Base: main d33e6d68eefe0ae32f0ea4693b8192281a6cc679

## Evidência observada

- `src-greenn/moretegra.js` mantém preços e notas comerciais diretamente nos objetos dos cards da Home.
- `docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md` mantém os valores comerciais existentes como autoridade transitória até publicação e adoção governadas.
- `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md` determina `PROJECT != OFFER`, associação do card por `projectId` e `commercialOfferId`, e leitura pública de snapshot versionado.
- Editor da PR #413 está integrado à main como protótipo isolado; o JSON exportado é `candidate_unapproved` e não corresponde automaticamente a um snapshot v3 publicado.

## Contrato proposto (não aplicado)

1. Identificar o `projectId` canônico pelo Product Fact & Claim Registry; registrar aliases legados explicitamente.
2. Identificar cada oferta por `offerId` estável e sem dependência da posição visual do card.
3. Cada consumidor (card da Home ou página exata) deve declarar o par `projectId` + `commercialOfferId` somente após reconciliar unidade, área, condição de pagamento e fonte.
4. Um mesmo empreendimento pode possuir múltiplas ofertas, e Home e página exata podem usar ofertas distintas. Não sincronizar preços apenas por nome ou slug.
5. Snapshot v3 publicado é leitura pública; editor/admin não pode escrever diretamente no frontend. O consumidor deve validar esquema, estado `published`, correspondência exata de IDs e consistência preço/área/m².
6. Durante migração, o consumidor preserva os valores atuais. Ausência de oferta, snapshot inválido, indisponibilidade de rede ou divergência de identidade **não** autorizam preço novo ou substituição silenciosa.
7. Adoção de snapshot por superfície requer gate próprio e rollback para a referência comercial anterior, com versionamento e registro de autoridade.
8. Dados estruturados de preço/Offer e preço visível devem ser coerentes no mesmo estado publicado; não implementar SEO dependente de JS que deixe o HTML indexável com valores conflitantes.

## Primeiras evidências para reconciliação (sem atribuição automática de IDs)

| Superfície | Objeto observado | Consequência |
| --- | --- | --- |
| Home | Nova Vivere: card 72,82 m², unidade 701, R$ 852.586,08 | Oferta específica; não confundir com outros cards Nova Vivere |
| Home | Château Jardin: unidade 501, 185 m², R$ 3.690.361 | Exige vínculo de oferta e fonte antes de sincronizar |
| Home | Elo Duo: valor promocional R$ 690.000 e comparação em `promo` | Preço de referência e comparativo não equivalem a `tablePrice`/VPL automaticamente |
| Home | Garden Design: unidade 0112, R$ 673.050 | Oferta distinta de outros produtos do cluster Lapa |

Os exemplos acima são leitura do código da Home e **não** confirmação de disponibilidade ou tabela vigente.

## Gates pendentes

- Inventário integral dos cards e das páginas exatas, com identificação canônica e fonte comercial por oferta.
- Comparação do JSON do editor com o schema v3; implementar normalizador/validador de candidato sem publicação.
- Definição e aprovação do provedor de leitura/escrita, autenticação, autorização, versionamento e publicação atômica.
- QA de navegador mobile/desktop, teste de falha fechada, regressão SEO, Form 46 e rollback antes de qualquer adoção de consumidores.

## Bloqueios

Não alterar valores comerciais, não inferir identidade de oferta por nome, não atualizar Home ou páginas exatas em massa, não declarar CDP operacional e não publicar a partir do protótipo sem gate de aprovação.

## Adendo — cardinalidade de cards, ofertas e páginas (2026-10-16)

**Regra:** um `projectId` pode ter N ofertas, N cards e N páginas comerciais. A identidade da página não é a identidade da oferta, e nenhum `detailUrl` deve ser derivado automaticamente apenas do nome do empreendimento.

Modelo de apresentação proposto (fora do schema de preços v3, que permanece a fonte comercial):

- `projectId`: identidade canônica única do empreendimento.
- `offerId`: identidade estável de cada oferta **dentro** de `projectId`; não é preço nem rota.
- `cardId`: identidade estável da instância de card; vincula-se explicitamente a `projectId`, `offerId` e a um destino.
- `pageId`: identidade estável da página editorial/comercial; resolve para URL canônica real e pode apresentar uma ou várias ofertas.
- `cardDestination`: referência explícita a `pageId`, opcionalmente com `selectedOfferId` para pré-seleção visual. Uma oferta pode aparecer em vários cards e páginas; uma página pode apresentar múltiplas ofertas.

Exemplos de topologias permitidas:

1. Dois cards → duas ofertas → **uma página** (CAPIITOLO padrão e à vista, como cenário conhecido).
2. Dois cards → duas ofertas → **duas páginas distintas**, ambas do mesmo `projectId` (cenário informado pela Product Authority, sem presumir rotas existentes).
3. Dois cards → mesma oferta → páginas distintas, quando houver justificativa editorial/campanha e política SEO aprovada.
4. Uma página → múltiplas ofertas do mesmo empreendimento, com seleção inequívoca e CTA contextual.

**SEO:** URLs canônicas são decisões editoriais por página; páginas realmente distintas podem ter canonicals próprios se possuírem conteúdo e intenção próprios. Não criar automaticamente páginas quase duplicadas, nem apontar canonicals divergentes sem revisão. `?oferta=...` pode selecionar estado de interface, mas não cria por si uma nova página indexável. A oferta visível, o CTA e eventual JSON-LD devem ser coerentes com o conteúdo renderizado e a autoridade comercial.

**Migração:** construir inventário separado de cards, páginas, ofertas e suas relações. Não substituir o atual `DETAIL_ROUTES` por mapeamento unívoco por projeto: esse mapa não representa múltiplos destinos. Nenhum preço, URL, canonical ou publicação muda com este adendo.
