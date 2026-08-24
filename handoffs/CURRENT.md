# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica vigente após integração da revisão: `docs/baseline/TECHNICAL_BASELINE_V2.md`

## 1. Mudança material em curso

A baseline técnica V1 baseada em Next.js foi supersedida por decisão posterior do responsável: a V1 deve ser portátil entre GitHub/Vercel Preview e Greenn, usando HTML5 semântico, CSS e JavaScript vanilla.

Enquanto `TECHNICAL_BASELINE_V2.md` não estiver integrada em `main`, a implementação portátil permanece bloqueada pela regra de conflito material.

## 2. Arquitetura alvo V2

- `src-greenn/moretegra.html`
- `src-greenn/moretegra.css`
- `src-greenn/moretegra.js`
- sem framework/bundler/backend obrigatório no V1;
- catálogo local/versionado;
- filtros mobile por localização/zoneamento e estágio;
- identidade Tegra `#EBB92E` e logos oficiais;
- SEO estrutural;
- Vercel Preview como homologação;
- Greenn como produção V1;
- Form 46 da Greenn como lead capture V1 conforme contrato verificado.

## 3. Fluxo operacional

```text
GitHub main
-> feat/initial-product-implementation
-> Vercel Preview
-> testes/validação
-> release rastreável
-> Greenn V1
```

## 4. Estado da branch de implementação antiga

Na resolução live de 2026-08-23, `feat/initial-product-implementation` estava 2 commits atrás de `main` e 0 commits à frente, sem PR aberto e sem evidência de implementação única a preservar.

Não reutilizar/avançar essa branch antes da V2 estar canônica em `main`.

## 5. Limites

Permitido após V2 integrada:

- implementação portátil;
- catálogo/filtros/badges/CTAs;
- formulário Greenn verificado;
- testes;
- SEO/performance/accessibility;
- Vercel Preview.

Separado/bloqueado até gate específico:

- publicação efetiva na Greenn antes do Preview validado;
- domínio/DNS;
- WhatsApp final não verificado;
- analytics/pixels/tags;
- FECH.AI/n8n/Make/Ads;
- CMS/database/backend sem necessidade demonstrada.

## 6. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

Depois da integração de `TECHNICAL_BASELINE_V2.md`, resolver `main` live e então alinhar/recriar `feat/initial-product-implementation` do SHA exato antes de escrever código.
