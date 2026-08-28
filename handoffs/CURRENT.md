# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver live antes de agir
- Release funcional observado antes deste fechamento documental: `2d1f9d656761433102f95e4c80bfdebf47f3607e`
- Baseline funcional vigente: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica vigente: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR aplicável: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`

## 1. Estado atual

MoreNumTegra V1 está publicado comercialmente na Green Sales em:

`https://moretegra.com.br`

Arquitetura preservada:

```text
GitHub main = fonte canônica
Vercel Production = homologação pública
Green Sales = produção comercial V1
```

A composição Green em produção usa:

```text
HTML 01
-> Form 46 nativo
-> HTML 02
-> Footer
+ CSS global
+ JavaScript global
```

O catálogo contém 21 empreendimentos. A implementação permanece HTML/CSS/JavaScript vanilla.

## 2. Evidência funcional observada em produção Green

Validações executadas em 2026-08-28:

- domínio raiz HTTPS válido;
- `http://moretegra.com.br` redireciona para HTTPS;
- favicon publicado e visível;
- catálogo renderiza 21 empreendimentos;
- filtros por estágio, zona e ticket funcionam;
- combinações de filtros e estado vazio funcionam;
- busca por nome/bairro funciona no mobile;
- promoção ELO AP2408 exibida com DE/POR;
- promoção ODE Unidade 22 / 2º andar exibida com DE/POR;
- WhatsApp abre número e mensagem configurados;
- Form 46 realiza submit real;
- lead persiste na Green com origem `More Tegra / MoreEmUmTegra`;
- vendedor configurado é atribuído pela Green;
- CTAs flutuantes foram corrigidos na PR #27 e agora atravessam Form 46, HTML 02 e footer sem clipping;
- validação mobile confirmou filtros e CTAs operáveis.

## 3. Release funcional

A correção estrutural final dos CTAs flutuantes foi integrada pela PR #27.

Release funcional observado:

`2d1f9d656761433102f95e4c80bfdebf47f3607e`

A integração Vercel reportou `success` para esse SHA.

Os payloads Green devem continuar derivados dos arquivos canônicos em `src-greenn/`.

## 4. Domínio

- `moretegra.com.br`: produção principal, HTTPS OK;
- `www.moretegra.com.br`: CNAME configurado na Green e aguardando validação do certificado no momento deste fechamento.

O `www` não bloqueia o domínio raiz já operacional. Quando a Green marcar `Domínio OK`, validar `https://www.moretegra.com.br`.

## 5. Formulário

Produção usa o Form 46 nativo:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`

O JavaScript do projeto não intercepta o submit nativo.

## 6. Analytics / Search

GA4, GTM, Meta Pixel e outras tags continuam sem autorização de implementação neste projeto.

Search/SEO/SEM continua sob o modelo cross-project vigente:

```text
MoreNumTegra = consumer / Product Authority
blogs-sites-portais-seo = Search Center of Expertise / provider
```

Roles atuais: `seo_strategy`, `technical_seo`, `content_semantic_seo`, `seo_analytics_growth`, `paid_search_sem`.

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.
