# Search Provider Handoff — MoreNumTegra — 2026-08-28

## 1. Identidade e autoridade

- Consumer / Product Authority: `wagnerjfjunior/MoreNumTegra`
- Search Center of Expertise / provider: `wagnerjfjunior/Blogs-sites-portais-seo`
- Produção comercial: `https://moretegra.com.br`
- Homologação: `https://morenumtegra.vercel.app/`
- Referência funcional observada: `2d1f9d656761433102f95e4c80bfdebf47f3607e`
- Estado do projeto na origem deste handoff: `GREEN_COMMERCIAL_V1_FUNCTIONALLY_HOMOLOGATED`

Este documento é um pacote de entrada project-local para auditoria/recomendação Search. Não transfere autoridade do produto e não autoriza mutação.

## 2. Produção já homologada

Fatos observados em 2026-08-28:

- `https://moretegra.com.br` responde em HTTPS;
- `http://moretegra.com.br` redireciona para HTTPS;
- `www.moretegra.com.br` aparece como `Domínio OK` na Green;
- HTTPS do `www` está válido;
- Green associa o `www` a uma página dedicada de redirecionamento;
- a navegação `www -> https://moretegra.com.br/` funciona;
- HAR observado mostra HTTP 200 no `www` seguido de navegação para a raiz; não há evidência de redirect HTTP 301/308;
- favicon está ativo;
- catálogo renderiza 21 empreendimentos;
- filtros por estágio, zona e ticket funcionam em desktop/mobile;
- busca por nome/bairro funciona no mobile;
- WhatsApp está funcional;
- Form 46 realiza submit real com persistência/origem/vendedor;
- CTAs flutuantes atravessam os módulos até o footer.

## 3. Arquitetura e restrições

V1:

- HTML5 semântico;
- CSS mobile-first;
- JavaScript vanilla;
- GitHub `main` = fonte canônica;
- Vercel Preview/Production = homologação;
- Green Sales = produção comercial;
- Form 46 nativo permanece o mecanismo de captação;
- não introduzir framework/backend/CMS sem necessidade material;
- não interceptar o submit nativo do Form 46;
- não inventar preço, metragem, endereço, disponibilidade ou condição;
- analytics/pixels/tags dependem de gate próprio;
- DNS/domínio dependem de gate próprio;
- FECH.AI/n8n/Make/Ads não fazem parte deste handoff.

## 4. Observações Search preliminares

O provider deve confirmar live antes de usar qualquer item abaixo como finding final.

Na observação preliminar do HTML/HAR live:

- canonical explícito para `https://moretegra.com.br/` não foi identificado;
- JSON-LD não foi identificado;
- title observado na Green está genérico;
- meta description observada está ausente/vazia ou genérica;
- Open Graph está incompleto;
- Twitter metadata não foi identificada;
- o `www` não comprovou 301/308, apenas HTTP 200 + redirect page-level;
- Vercel deve permanecer fora da indexação comercial salvo decisão Search específica.

## 5. Perguntas obrigatórias para o provider

Retornar recomendação versionada sobre:

1. canonical principal e canonicalidade entre raiz/`www`;
2. necessidade/viabilidade de 301/308 versus mitigação com canonical;
3. title/meta description finais;
4. Open Graph/Twitter;
5. robots/indexação da Green;
6. sitemap;
7. Search Console;
8. JSON-LD válido e factual;
9. uso de `WebSite`, `WebPage`, `ItemList` e `FAQPage` somente quando suportado;
10. arquitetura de páginas para empreendimentos, bairros/regiões e estágios;
11. Technical SEO;
12. conteúdo semântico e links internos;
13. estratégia de autoridade/backlinks;
14. mensuração orgânica;
15. SEM, se recomendado, sem campanha/spend até autorização separada.

## 6. Conteúdo atual que pode suportar schema

A página principal já possui conteúdo visível para:

- H1 único;
- catálogo de empreendimentos;
- filtros;
- conteúdo textual sobre regiões;
- seção de orientação de compra;
- FAQ visível;
- CTAs e formulário.

O provider deve validar o HTML final da Green e os dados reais antes de recomendar schema. Não usar schema para conteúdo que não esteja visível ou factual.

## 7. Saída esperada

O provider deve devolver um handoff contendo:

- findings com severidade/prioridade;
- recomendações concretas;
- arquivos/trechos do MoreNumTegra a alterar;
- dependências da Green;
- itens que exigem gate próprio;
- evidência de live usada;
- o que é obrigatório para indexação inicial versus evolução posterior.

## 8. Implementação

Nenhuma recomendação deste handoff é autorização automática de implementação.

Fluxo obrigatório:

```text
PROVIDER SEARCH RESULT
-> MORENUMTEGRA DECISION/AUTHORIZATION
-> GITHUB PR
-> VERCEL PREVIEW
-> VALIDATION
-> MERGE
-> VERCEL PRODUCTION
-> GREEN SALES
-> PRODUCTION SMOKE
```
