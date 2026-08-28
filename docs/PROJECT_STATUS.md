# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release funcional observado: `2d1f9d656761433102f95e4c80bfdebf47f3607e`
- Fase: `GREEN_COMMERCIAL_V1_FUNCTIONALLY_HOMOLOGATED`
- Saúde geral: `verde`
- Search readiness: `READY_FOR_PROVIDER_HANDOFF`

## 1. Resultado atingido

MoreNumTegra V1 está em produção comercial na Green Sales, preservando HTML5 semântico, CSS e JavaScript vanilla, com catálogo, filtros, vídeo, CTAs e Form 46 nativo.

Produção:

`https://moretegra.com.br`

Homologação Vercel:

`https://morenumtegra.vercel.app/`

## 2. Estado por frente

| Frente | Estado | Próximo marco | Bloqueio |
|---|---|---|---|
| GitHub main | canônico | preservar rastreabilidade | nenhum |
| Vercel Production | alinhada ao release funcional observado | preservar como homologação | nenhum |
| Green Sales | publicada e funcionalmente homologada | manutenção controlada | nenhum funcional conhecido |
| Domínio raiz | HTTPS PASS | preservar | nenhum |
| HTTP -> HTTPS | PASS | preservar | nenhum |
| www | Domínio OK + HTTPS + redirect page-level para raiz | Search definir canonicalização final | nenhum funcional; 301/308 não comprovado |
| Favicon | PASS | preservar | nenhum |
| Catálogo | 21 empreendimentos | manutenção factual | revalidar dados quando alterados |
| Filtros | PASS desktop/mobile | preservar | nenhum |
| Busca nome/bairro | PASS mobile | preservar | nenhum |
| Promo ELO | PASS | revalidar disponibilidade quando necessário | disponibilidade muda |
| Promo ODE | PASS | revalidar disponibilidade quando necessário | disponibilidade muda |
| WhatsApp | PASS | preservar | nenhum |
| Form 46 | PASS com submit real e persistência | preservar contrato nativo | nenhum |
| Floating CTAs | PASS após PR #27 | preservar montagem no body | nenhum |
| Analytics | não habilitado | gate próprio | sem autorização |
| Search/SEO/SEM | provider cross-project definido; site pronto para handoff | auditoria live + recomendação provider | implementação depende de autorização |

## 3. Evidência de homologação Green

Foram observados em produção:

- filtros por estágio e zona;
- filtro por faixa de valor;
- combinação de filtros;
- estado sem resultados;
- busca por bairro;
- CTA `Limpar filtros`;
- cards e promoções ELO/ODE;
- WhatsApp com mensagem configurada;
- Form 46 com lead de teste salvo na Green;
- origem do formulário registrada;
- vendedor atribuído;
- CTAs flutuantes visíveis até o footer;
- favicon ativo;
- HTTPS do domínio raiz;
- HTTPS válido em `www.moretegra.com.br`;
- Green marcando os dois domínios como `Domínio OK`;
- navegação `www -> moretegra.com.br` funcional por redirecionamento de página.

## 4. Release funcional de referência

PR #27 foi mergeada para corrigir o clipping dos CTAs flutuantes entre os módulos da Green.

SHA funcional observado:

`2d1f9d656761433102f95e4c80bfdebf47f3607e`

Vercel reportou `success` para esse SHA.

## 5. Search readiness observado

A auditoria preliminar do HTML/HAR live identificou como itens de Search ainda não implementados/fechados:

- canonical explícito para `https://moretegra.com.br/`;
- JSON-LD estruturado e factual;
- title/meta description finais;
- Open Graph completo;
- Twitter metadata quando aplicável;
- estratégia final para `www`, considerando que o redirect atual é HTTP 200 + navegação page-level;
- robots/indexação de produção;
- sitemap;
- Search Console;
- arquitetura/cluster de páginas, bairros e empreendimentos;
- Technical SEO e conteúdo semântico;
- analytics de Search apenas após gate correspondente.

Esses itens pertencem ao provider `blogs-sites-portais-seo` para estratégia/recomendação. MoreNumTegra permanece Product Authority e executor das mudanças aprovadas.

## 6. Riscos ativos

| Risco | Controle |
|---|---|
| disponibilidade/preço mudar após publicação | evidência comercial + confirmação no atendimento |
| Green sobrescrever CSS/estrutura em edição futura | sempre derivar mudanças do GitHub e homologar no Vercel |
| regressão dos CTAs por módulos Green | manter dock em `document.body` via JS global |
| www servir HTTP 200 antes de redirecionar | canonical consistente + recomendação Search; 301/308 se houver mecanismo comprovado |
| tracking sem governança | manter bloqueado até gate específico |

## 7. Governança operacional

Qualquer alteração futura deve seguir:

```text
branch/PR
-> Vercel Preview
-> validação
-> merge main
-> Vercel Production
-> replicação controlada na Green
-> smoke production
```

Não aplicar correção manual somente na Green sem atualizar a fonte canônica.

## 8. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.
