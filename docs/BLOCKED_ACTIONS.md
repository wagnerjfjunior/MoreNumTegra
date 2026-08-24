# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-24`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical candidate: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR candidate: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueio transitório atual

Enquanto a V2.1/ADR de composição Green não estiver integrada em `main`, bloquear a reestruturação material da PR #6. O protótipo atual pode permanecer acessível no Vercel apenas como evidência visual, não como release candidata.

## 2. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| mergear PR #6 na forma monolítica atual | não corresponde à topologia real do builder | V2.1/ADR em main + implementação modular validada |
| usar formulário customizado `fetch` como produção | Green já oferece Form 46 nativo | usar bloco nativo e JS somente para UX verificada |
| depender de seletor global `form` | risco de colisão com builder | seletores próprios/verificados ou nenhuma interceptação |
| abrir YouTube como fluxo principal do vídeo | remove usuário da página | player in-page com fallback |
| publicar na Green antes do novo Preview | release precisa simular composição real | Preview modular validado + SHA congelado |
| Vercel Production como produção V1 | Vercel é laboratório | nova decisão material |
| custom domain/DNS | efeito público/SEO | autorização específica |
| analytics/pixels/tags | telemetria/dados | autorização específica |
| CMS/database/backend próprio | não necessário no V1 | necessidade material + nova decisão |
| FECH.AI/n8n/Make/Ads | fora do escopo V1 | autorização específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |
| dados comerciais/inventário não verificados | precisão/reputação | fonte atual/aprovada |
| copiar conteúdo/design do Capri | referência é apenas estratégica/comportamental | criar solução original |

## 3. Permitido após V2.1/ADR + gate live

- sincronizar `feat/initial-product-implementation` com `main` preservando commits;
- criar `src-greenn/blocks/01-html-inicial.html`;
- criar `src-greenn/blocks/02-html-pos-form.html`;
- criar `src-greenn/blocks/03-footer.html`;
- manter CSS/JS vanilla globais;
- criar Preview compositor com mock não transmissor do form;
- migrar/validar catálogo anterior;
- preservar/evoluir hero escuro;
- implementar vídeo in-page;
- testar filtros/CTAs/mobile/SEO/performance/accessibility;
- criar Vercel Preview não-production.

## 4. Regras de interpretação

- `Preview acessível` != `Preview aprovado`.
- `Preview aprovado` != `Green publicada`.
- `Form 46 conhecido` != `form customizado necessário`.
- `YouTube disponível` != `click-out aceitável`.
- `dado presente em ZIP anterior` != `dado automaticamente atual`.
- `tool capability` != `authorization`.
- `main` integrada é fonte canônica; branch/PR é proposta até merge.

## 5. Sequência V1 atual

```text
V2.1 + ADR
-> SYNC PR #6
-> GREEN MODULES
-> PORTFOLIO VALIDATION
-> VERCEL PREVIEW
-> MOBILE/FUNCTION/SEO/PERF VALIDATION
-> RELEASE SHA
-> GREEN BUILDER PUBLICATION GATE
-> GREEN V1
```

Domínio/DNS e integrações futuras permanecem fluxos separados.