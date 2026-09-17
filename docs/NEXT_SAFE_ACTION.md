# Próxima Ação Segura — MoreNumTegra

Estado reconciliado em `2026-09-17`.

Resolver `main` live antes de executar. Base observada no início deste gate:

`f5b4b27cc31fa6247ad3394e40a295f2a58861d6`

## Estado atual

```text
CAPIITOLO exact-project page = PUBLISHED / INDEXABLE
ELO DUO exact-project page = PUBLISHED / INDEXABLE
COMMERCIAL DATA PLANE V2 = DOCS CANONICALIZED
COMMERCIAL CATALOG UPSTREAM DISCOVERY = HANDED OFF TO FECH.AI
MORENUMTEGRA COMMERCIAL RUNTIME MIGRATION = DEFERRED
MNT-M4-05 historical implementation = MERGED
MNT-M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
MNT-M4-05R Product Decision = APPROVED
MNT-M4-05R Runtime = IMPLEMENTATION_AND_VALIDATION_AUTHORIZED
MNT-M4-05R Acceptance = PENDING
```

## Única próxima ação segura local

Implementar e validar `MNT-M4-05R — Machine-Readable Entity & Social Metadata Hardening` nas três superfícies já publicadas/indexáveis:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

Contrato focal:

- conteúdo/identidade crítica presente no HTML inicial;
- Schema.org/JSON-LD factual com `@id` estáveis;
- Open Graph e Twitter/X Cards explícitos;
- canonical/`og:url`/WebPage URL consistentes;
- entidade oficial Tegra referenciada pelo `@id` autoritativo `https://www.tegraincorporadora.com.br/#organization` quando aplicável;
- Sabrina da Tegra modelada como `Person`, com CRECI-SP `209.905-F`, `worksFor` Tegra Vendas, perfil oficial, contato comercial e `workLocation` no Estande Tegra Caminhos da Lapa, apenas com paridade visível adequada;
- `Offer` somente quando houver condição comercial vigente, publicável e de origem autoritativa Tegra;
- validação automatizada/reprodutível do contrato.

Fluxo autorizado por Product Authority em `2026-09-17`:

```text
branch runtime dedicada
-> Vercel Preview automático
-> validar HTML + Schema.org + Social + entity consistency + regressão mobile/runtime
-> se PASS, Ready/merge do release focal
-> Vercel Production automático
-> smoke test em https://www.moretegra.com.br/
```

Não ampliar escopo durante este gate.

## Commercial Catalog / FECH.AI continua paralelo

O Commercial Catalog / Publication Context continua owned upstream pelo FECH.AI e não é pré-condição para esta correção de metadados/entidades.

Até existir contrato upstream aceito:

```text
NO direct FECH.AI internal-table access
NO service_role/browser secret
NO MoreNumTegra-owned replacement commercial backend
NO local Stage B Commercial Data Plane runtime migration
```

A origem autoritativa dos fatos comerciais publicados continua sendo a Tegra quando preço/disponibilidade/condição são fornecidos pela Tegra, ainda que no futuro FECH.AI transporte ou governe esses dados.

## Fora do gate

Continuam separados:

- novas famílias de rotas;
- DNS/canonical-host changes;
- Form 46 changes;
- GTM/GA4 changes;
- Meta/Ads;
- FECH.AI/Supabase mutation;
- backend/framework migration;
- fatos comerciais não verificados.
