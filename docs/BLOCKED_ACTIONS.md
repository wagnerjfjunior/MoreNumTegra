# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V1.md` quando integrada
- Regra: ausência nesta lista não constitui autorização.

## 1. Estado de liberação

Após `TECHNICAL_BASELINE_V1` estar integrada em `main`, **implementação V1 em branch dedicada está autorizada** conforme `docs/NEXT_SAFE_ACTION.md`.

Vercel Preview também pode ser criado dentro do escopo da implementação após build/test gate.

## 2. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação | Autoridade/evidência |
|---|---|---|---|
| Vercel Production | Preview ainda precisa demonstrar qualidade | Preview validado + autorização específica | responsável + receipt do Preview |
| Custom domain / DNS | efeito público e SEO permanente | decisão de Production + domínio/ownership verificados + autorização | responsável |
| Git production branch `release/production` | só é necessária no release real | Production autorizada | responsável |
| Formulário real / CRM / lead routing | envolve PII e integração externa | data/privacy contract + target + autorização | decisão versionada |
| WhatsApp destination/config final | destino não está verificado canonicamente | target/ownership verificados | evidência do target |
| Analytics / pixels / tags | telemetria/dados | escopo/privacy/target autorizados | decisão versionada |
| CMS/database | não necessário no V1 técnico | necessidade material demonstrada + nova decisão | baseline revision/ADR |
| Campanhas/anúncios | custo/reputação | campanha/orçamento autorizados | autorização explícita |
| Uso de segredo/dado pessoal não previsto | risco de segurança/privacidade | necessidade + canal seguro + autorização | registro adequado |
| Expansão para novas rotas/produto material | fora da baseline V1 | requisito canonicalizado + escopo aprovado | baseline/decisão |

## 3. Ações permitidas na implementação autorizada

Depois do gate live da baseline técnica:

- criar `feat/initial-product-implementation`;
- scaffold e código do V1;
- assets aprovados;
- catálogo local tipado;
- filtros/badges/CTAs;
- formulário Preview sem transmissão real de PII;
- testes e build;
- SEO estrutural;
- performance/accessibility work;
- Vercel Preview não-production quando o branch estiver buildável.

## 4. Regras de interpretação

- `Preview autorizado` != `Production autorizada`.
- `Production autorizada` != `domínio/DNS autorizado`.
- `form UI autorizado` != `lead processing autorizado`.
- `CTA autorizado` != `destino inferido`.
- `baseline técnica aprovada` autoriza somente a implementação explicitamente registrada em `NEXT_SAFE_ACTION`.
- `main` integrado não é automaticamente a branch Production do Vercel.
- capability/tool access não equivale a autorização.

## 5. Gates por evidência

| Evidência | Ação | Tratamento |
|---|---|---|
| technical baseline ausente de `main` | implementação | parar |
| Next.js safe patch não resolvido | scaffold freeze/merge | parar e resolver versão live |
| build falha | Preview | não deployar |
| Preview sem `noindex` | aceite de Preview | corrigir antes de aceitar |
| target real de formulário ausente | lead submission | manter mock/local |
| target WhatsApp não verificado | link final | não inventar destino |
| Preview não validado | Production | bloquear |
| domínio/ownership ausentes | DNS | bloquear |

## 6. Produção e domínio

Production e custom domain são gates intencionalmente separados.

Sequência autorizável futura:

```text
IMPLEMENTATION
-> BUILD/TEST
-> PREVIEW
-> PREVIEW_VALIDATION
-> PRODUCTION_GATE
-> PRODUCTION
-> DOMAIN_GATE
-> DOMAIN/DNS
```

Nenhuma seta autoriza automaticamente a seguinte.

## 7. Procedimento diante de dúvida

Quando o enquadramento não estiver claro, usar a interpretação mais restritiva e obter a menor decisão necessária.