# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-08-29`
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
- `www.moretegra.com.br` está com `Domínio OK` na Green e certificado HTTPS válido;
- `www.moretegra.com.br` está associado a página dedicada de redirecionamento para `https://moretegra.com.br`;
- HAR observado em 2026-08-28 confirma que o `www` responde HTTP 200 e depois navega para a raiz; não há evidência de redirect HTTP 301/308;
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
- CTAs flutuantes atravessam Form 46, HTML 02 e footer sem clipping;
- validação mobile confirmou filtros e CTAs operáveis.

## 3. Release funcional

A correção estrutural final dos CTAs flutuantes foi integrada pela PR #27.

Release funcional observado:

`2d1f9d656761433102f95e4c80bfdebf47f3607e`

A integração Vercel reportou `success` para esse SHA.

Os payloads Green devem continuar derivados dos arquivos canônicos em `src-greenn/`.

## 4. Domínio

- `moretegra.com.br`: produção principal, HTTPS OK;
- `www.moretegra.com.br`: `Domínio OK`, HTTPS válido e página dedicada de redirecionamento para a raiz;
- canonical target aprovado pelo Search provider: `https://moretegra.com.br/`.

A solução atual do `www` é page-level: HTTP 200 seguido de navegação para a raiz. O target continua sendo redirect HTTP 301/308 quando a Green comprovar mecanismo adequado.

Não alterar DNS adicional sem necessidade comprovada e gate próprio.

## 5. Formulário

Produção usa o Form 46 nativo:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`

O JavaScript do projeto não intercepta o submit nativo.

## 6. Analytics / Search

GA4, GTM, Meta Pixel e outras tags continuam sem autorização de implementação neste projeto.

Modelo vigente:

```text
MoreNumTegra = consumer / Product Authority
blogs-sites-portais-seo = Search Center of Expertise / provider
```

Roles atuais: `seo_strategy`, `technical_seo`, `content_semantic_seo`, `seo_analytics_growth`, `paid_search_sem`.

Handoff de entrada:

`handoffs/SEARCH_PROVIDER_HANDOFF_2026-08-28.md`

Provider result integrado:

`wagnerjfjunior/Blogs-sites-portais-seo@c20c15ce6f591071b3ec5236291d7ed6e92934bf`

`docs/assets/morenumtegra-search-provider-recommendation-2026-08-28.md`

O Product Authority aprovou em 2026-08-29 o pacote delimitado Search + Conversion documentado em:

`docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`

O pacote inclui prêmio, dois cards Nova Vivere, unidade 708 / 105 m² / R$ 1.129.900 à vista, title/meta description, canonical via JS e JSON-LD `WebSite + WebPage`. OG/Twitter permanecem autorizados apenas como runtime best-effort e não comprovam preview para crawlers sociais.

Contrato anterior:

`docs/search/P0A_CANONICAL_METADATA_CONTRACT_2026-08-28.md`

Contrato corrente para o pacote 2026-08-29:

`docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`

A capability estática Green para canonical continua não comprovada. O pacote 2026-08-29 autoriza explicitamente canonical via JavaScript para `https://moretegra.com.br/`, com risco residual. Redirect HTTP 301/308 permanece sem capability proof.

Nenhuma mutação Green deve preceder branch/PR, Preview, validação, merge e gate de produção.

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.


## 8. Pacote Search + Conversion 2026-08-29

Decisões aprovadas:

- headline: `Dois prêmios em 2026. Um deles está no seu próximo endereço.`;
- badge completo: `PRÊMIO MASTER IMOBILIÁRIO 2026`;
- segunda camada: `Caminhos da Lapa · um bairro inteiro de opções`;
- Nova Vivere 72 m² permanece como primeiro card;
- Nova Vivere 105 m² entra no meio da mesma home;
- unidade 708: R$ 1.129.900 à vista, evidence-bound;
- CAPIITOLO unidade 24: segundo card com R$ 3.160.000 à vista, evidence-bound em `Tegra/Agosto/Valores_a_vista.md`;
- sem outbound SECOVI-SP;
- metadata estável permanece focada em apartamentos Tegra em São Paulo;
- canonical comercial via JS e `WebSite + WebPage` JSON-LD aprovados;
- OG/Twitter: runtime-only best-effort; social preview confiável depende de capability nativa/static de `<head>` ainda não comprovada.

Search provider candidate:

`wagnerjfjunior/Blogs-sites-portais-seo PR #10`

Ready e merge permanecem gates separados.
