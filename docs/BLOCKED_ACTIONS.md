# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional vigente após revisão: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente após revisão: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Estado atual

Enquanto as baselines V2 não estiverem integradas em `main`, a implementação portátil HTML/CSS/JS está bloqueada por conflito material com as baselines V1.

Depois das V2 integradas e do gate live em `docs/NEXT_SAFE_ACTION.md`, a implementação V1 em branch dedicada é autorizada.

## 2. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| escrever implementação portátil antes das V2 em main | baselines canônicas ainda são V1 | merge das V2 + gate live |
| publicar na Greenn antes de Preview validado | produção V1 precisa de homologação/rastreabilidade | Preview validado + SHA/release congelado + gate Greenn |
| Vercel Production como produção V1 | arquitetura V2 define Vercel como Preview/homologação | nova decisão material, se algum dia necessária |
| custom domain / DNS | efeito público/SEO | autorização específica + ownership/host verificados |
| WhatsApp destination final | destino não verificado canonicamente | target/ownership verificados |
| analytics / pixels / tags | telemetria/dados | escopo/privacy/target autorizados |
| CMS/database/backend próprio | não necessário no V1 portátil | necessidade material + nova decisão |
| FECH.AI / n8n / Make / Ads integration | evolução futura fora do V1 | autorização específica |
| campanhas/anúncios | custo/reputação | campanha/orçamento autorizados |
| segredo/token no HTML/JS | risco de segurança | arquitetura server-side/serviço seguro aprovada |
| dados comerciais/inventário inventados | precisão/reputação | fonte autorizada |
| expansão material do produto | fora da baseline | requisito canonicalizado |

## 3. Ações permitidas após V2 + gate live

- alinhar/recriar `feat/initial-product-implementation` do SHA exato, desde que sem commits únicos;
- implementar `src-greenn/moretegra.html`, `.css`, `.js`;
- identidade Tegra;
- catálogo local/versionado;
- filtros mobile;
- badges;
- CTAs sem destino inventado;
- formulário Greenn Form 46 conforme contrato verificado;
- testes/performance/accessibility/SEO;
- Vercel Preview não-production;
- preparar release rastreável para publicação Greenn posterior.

## 4. Regras de interpretação

- `Preview autorizado` != `Greenn publication autorizada`.
- `Greenn publication autorizada` != `domínio/DNS autorizado`.
- `form contract conhecido` != `segredo permitido no cliente`.
- `CTA autorizado` != `destino inferido`.
- `tool capability` != `authorization`.
- `main integrado` é fonte canônica; branch/PR é proposta até merge.

## 5. Gates por evidência

| Evidência | Ação | Tratamento |
|---|---|---|
| V2 ausente de main | implementação portátil | parar |
| branch de implementação com commits únicos | realinhamento/recriação | preservar e reconciliar antes de alterar |
| filtros mobile falham | Preview acceptance | corrigir |
| erro runtime/console primário | Preview acceptance | corrigir |
| Preview indexável | Preview acceptance | corrigir |
| contrato Form 46 diverge do verificado | lead submission | parar e revalidar |
| formulário exige segredo público | lead submission | bloquear arquitetura atual |
| WhatsApp não verificado | link final | não inventar |
| Preview não validado | Greenn publication | bloquear |
| domínio/ownership ausente | DNS | bloquear |

## 6. Sequência V1

```text
BASELINES_V2
-> IMPLEMENTATION
-> TESTS
-> VERCEL_PREVIEW
-> PREVIEW_VALIDATION
-> RELEASE_SHA
-> GREENN_GATE
-> GREENN_V1
```

Domínio/DNS e integrações futuras permanecem fluxos separados.

## 7. Procedimento diante de dúvida

Usar a interpretação mais restritiva e obter/versionar a menor decisão necessária antes de mutação material.
