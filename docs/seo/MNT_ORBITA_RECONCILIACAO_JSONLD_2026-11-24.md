# MoreNumTegra — MNT Reconciliação SEO/JSON-LD Órbita (24/11/2026)

**Status:** IMPLEMENTADO EM BRANCH `claude/mnt-orbita-reconciliacao-validadores-20261124` / PR PENDENTE / SEM MERGE / SEM PRODUÇÃO.
**Autoridade:** decisão registrada pelo proprietário em 24/11/2026 sob governança SFJM (contrato abaixo, §1).
**Repositório:** `wagnerjfjunior/MoreNumTegra`. **Base main:** `5629c9035a6f60be002e9ebe03bfc225544f1d4b` (PR #601 integrada).
**Natureza da entrega:** **somente testes e documentação**. Nenhuma página, schema, preço ou rota de produção é alterada nesta PR.

## 1. Contrato registrado

1. Ausência temporária e intencional de `Product` e `Offer` no Órbita.
2. Proibição de restaurar preços históricos ou disponibilidade não comprovada.
3. Reconciliação específica dos três validadores, sem enfraquecer as regras das demais páginas.
4. Restabelecimento futuro das entidades comerciais somente após confirmação de preço vigente.
5. Preservação integral de SEO, Form46, FGTS, Livelo e identidade comercial.
6. Alterações em testes e alterações em produção são entregas distintas.

## 2. Causa

O commit `cc78efe` (23/11/2026, “oportunidades Livelo e FGTS, últimas unidades e FAQ SEO”) reduziu o JSON-LD do Órbita de 19 para 16 nós: saíram `Product`, `Offer` e um `FloorPlan`. A mensagem do commit já registrava “Três validadores históricos permanecem pendentes de reconciliação”. Os testes continuaram exigindo o estado anterior e três checks do CI ficaram vermelhos em todas as PRs: `coverage`, `postal` e `draft-quality`.

## 3. O que mudou em cada teste

| Check | Arquivo | Reconciliação |
|---|---|---|
| `coverage` | `scripts/validate-project-schema-coverage.mjs` | Para `universo-tatuape-orbita`, `Product`/`Offer` deixam de ser exigidos **e passam a ser proibidos** (falha se reaparecerem). A regra de “entidade removida” e de “tipo regredido” ignora só esses dois tipos e só neste slug. As 33 demais páginas seguem iguais. |
| `postal` | `scripts/validate-resf-v2-postal-address-contract.mjs` | Lista fechada de tipos novos do Órbita passa a 3 `FloorPlan` e sem `Product`/`Offer`; asserção explícita de que ambos estão ausentes. |
| `draft-quality` | `scripts/validate-mercado-editorial-20261028.mjs` | (a) Redirects: baseline + uma adição explícita (`/src-greenn/complexo-lapa-pirituba/index.html` → `/complexo-lapa-pirituba/`); qualquer outra reprova. (b) Artigo Lapa preso ao snapshot aprovado `aa1cd583` (troca Sabrina → Time Tegra Vendas de 14/11). (c) RIIO: só o CEP governado `22630-011` (#561) é aceito. (d) Form do RIIO: deltas aprovados do canal RJ (form 47, “Falar com especialista”). (e) `runtime.js` preso a `41401521` (#600) e `measurement-form.js` a `8fe1043a` (#561); `measurement-core.js` segue no baseline. |

O item `draft-quality` estava vermelho por causas além do Órbita (canal RJ do RIIO, redirect, artigo da Lapa e runtime do Form46): todas já aprovadas em PRs anteriores e ainda não refletidas no teste.

## 4. Pendência latente fora do escopo

`scripts/validate-orbita-commercial-schema-parity.mjs` também falha no estado atual (“Three-photo neighborhood editorial block required”). O workflow `orbita-commercial-schema-parity.yml` só roda quando arquivos do Órbita mudam, por isso não aparece nas PRs do Rio. **Não** faz parte dos três validadores do contrato e não foi alterado. Precisa de decisão própria antes da próxima PR que toque o Órbita.

## 5. Gates

- CI da PR: `coverage`, `postal` e `draft-quality` devem ficar verdes; os demais checks não mudam.
- Merge somente com autorização explícita do proprietário.
- Restabelecer `Product`/`Offer` do Órbita exige preço vigente confirmado e PR própria, revertendo a proibição do §3 no mesmo ato.
