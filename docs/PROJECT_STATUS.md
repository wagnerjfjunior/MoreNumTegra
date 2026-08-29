# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-29`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release funcional observado: `2d1f9d656761433102f95e4c80bfdebf47f3607e`
- Fase: `GREEN_COMMERCIAL_V1_FUNCTIONALLY_HOMOLOGATED`
- Saúde geral: `verde`
- Search readiness: `SEARCH_CONVERSION_PACKAGE_2026_08_29_APPROVED_FOR_LIFECYCLE`

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
| Domínio raiz | HTTPS PASS | canonical comercial target + transporte JS aprovado no pacote 2026-08-29 | static/head capability Green não comprovada |
| HTTP -> HTTPS | PASS | preservar | nenhum |
| www | Domínio OK + HTTPS + redirect page-level para raiz | preferir 301/308 quando capability existir | 301/308 não comprovado |
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
| Search provider | P0 integrado no provider main + pacote 2026-08-29 em provider PR #10 | revalidar exact-head/lifecycle | provider não possui Product Authority |
| Search metadata package | title/description + canonical JS + OG/Twitter + WebSite/WebPage JSON-LD aprovados no contrato 2026-08-29 | gates exact-head da PR corrente | Green somente após merge + gate próprio |
| canonical | target non-www definido; JS aprovado neste pacote com risco residual | rendered-head smoke após Green | static/head capability continua não comprovada |
| SEM | somente estratégia futura | P2 | tracking/conversion/budget gates |

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

## 5. Search — estado atual

O handoff consumer foi consumido pelo Search Center of Expertise e a recomendação está integrada em:

`wagnerjfjunior/Blogs-sites-portais-seo@c20c15ce6f591071b3ec5236291d7ed6e92934bf`

Prioridade aceita:

```text
P0 canonicalidade / hostname / metadata / robots / sitemap / Search Console
-> P1 JSON-LD / OG-Twitter / rendering / CWV / IA / internal linking / measurement
-> P2 SEM
```

A execução corrente é o pacote delimitado `Search + Conversion 2026-08-29`, definido em `docs/search/SEARCH_CONVERSION_PACKAGE_CONTRACT_2026-08-29.md`.

Title/meta description, canonical JS, OG/Twitter e JSON-LD conservador estão definidos no contrato 2026-08-29.

A capability estática/nativa Green para canonical continua não comprovada. Para este pacote específico, o Product Authority aprovou o transporte client-side do canonical no JavaScript, respaldado por decisão Technical SEO do provider candidate e com risco residual explícito. Redirect HTTP 301/308 continua não comprovado.

Vercel homologation deve permanecer `noindex,nofollow` e pode apontar canonical para a origem comercial.

## 6. Riscos ativos

| Risco | Controle |
|---|---|
| disponibilidade/preço mudar após publicação | evidência comercial + confirmação no atendimento |
| Green sobrescrever CSS/estrutura em edição futura | sempre derivar mudanças do GitHub e homologar no Vercel |
| regressão dos CTAs por módulos Green | manter dock em `document.body` via JS global |
| www servir HTTP 200 antes de redirecionar | canonical consistente quando capability comprovada; preferir 301/308 |
| canonical client-side depender de rendering | manter target único/non-www, evitar conflito no HTML inicial e executar rendered-head smoke após Green |
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
