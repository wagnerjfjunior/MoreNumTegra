# PR #132 — Production State Evidence

Date: `2026-09-19`  
Canonical host: `https://www.moretegra.com.br/`

## Result

Authenticated Vercel fetches returned HTTP 200 for Home, CAPIITOLO, Elo Duo and Ária, but the production HTML still reflects the pre-PR #132 semantic state.

```text
DEPLOYMENT_STATE = PROVIDER_BLOCKED / VERCEL build-rate-limit
PRODUCTION_STATE = CONFIRMED_PRE_PR132
VALIDATION_STATE = PR132_NOT_IN_PRODUCTION
```

This is direct production-content evidence, not an inference from GitHub commit status alone.

## Observed production markers

### Home

```text
HTTP = 200
title = Apartamentos Tegra em São Paulo | More em um Tegra
H1 = Encontre o Tegra que combina com o seu momento.
Escolha Tegra title marker = ABSENT
```

Expected PR #132 markers not present:

```text
title = Apartamentos Tegra em São Paulo | Escolha Tegra
H1 = Apartamentos Tegra em São Paulo
```

### CAPIITOLO

```text
HTTP = 200
title = CAPIITOLO Tegra na Chácara Klabin | MoreTegra
H1 = CAPIITOLO by Piero Lissoni
Giardino (Garden) marker = ABSENT
3 vagas de garagem marker = ABSENT
```

Expected PR #132 markers include:

```text
title = CAPIITOLO Tegra Chácara Klabin | Piero Lissoni
H1 = CAPIITOLO Tegra Chácara Klabin
Giardino (Garden) = PRESENT
3 vagas de garagem = PRESENT for the governed 210 m² type
```

### Elo Duo

```text
HTTP = 200
title = Elo Duo Caminhos da Lapa | Apartamento pronto na Lapa | More em um Tegra
H1 = Elo Duo Caminhos da Lapa
```

Expected PR #132 markers not present:

```text
title = Elo Duo Tegra Caminhos da Lapa | Apartamento pronto na Lapa
H1 = Elo Duo Tegra — Caminhos da Lapa
```

### Ária

```text
HTTP = 200
title = Ária Higienópolis | Studios e apartamentos prontos | More em um Tegra
H1 = Ária Higienópolis
```

Expected PR #132 markers not present:

```text
title = Ária Tegra Higienópolis | Studios e apartamentos prontos
H1 = Ária Tegra Higienópolis — apartamentos prontos para morar
```

## Interpretation

```text
GITHUB_MAIN_CONTAINS_PR132 = YES
PR132_REPOSITORY_VALIDATION = PASS
PR132_VERCEL_COMMIT_STATUS = FAILURE / build-rate-limit
CURRENT_PRODUCTION_HTTP = 200
CURRENT_PRODUCTION_PR132_MARKERS = ABSENT
```

Therefore:

- production is available;
- the provider block is not a site outage;
- the PR #132 runtime has not been promoted to the canonical production host;
- later docs-only main commits must not be mistaken for production runtime advancement;
- the recovery queue must deploy/retry exact runtime SHA `353f4a5dba058f2fb60fd4001128f8c857cd6fce` first.

No runtime mutation was performed while collecting this evidence.
