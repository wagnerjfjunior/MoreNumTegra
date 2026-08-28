# Status do Projeto — MoreNumTegra

- Data de referência: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release funcional observado: `2d1f9d656761433102f95e4c80bfdebf47f3607e`
- Fase: `GREEN_COMMERCIAL_V1_FUNCTIONALLY_HOMOLOGATED`
- Saúde geral: `verde` com pendência operacional não bloqueante no certificado de `www`

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
| www | CNAME configurado | validar certificado após Green concluir | pendência operacional não bloqueante |
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
| Search/SEO/SEM | provider cross-project definido | retomada via handoff específico | implementação depende de autorização |

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
- HTTPS do domínio raiz.

## 4. Release funcional de referência

PR #27 foi mergeada para corrigir o clipping dos CTAs flutuantes entre os módulos da Green.

SHA funcional observado:

`2d1f9d656761433102f95e4c80bfdebf47f3607e`

Vercel reportou `success` para esse SHA.

## 5. Riscos ativos

| Risco | Controle |
|---|---|
| disponibilidade/preço mudar após publicação | evidência comercial + confirmação no atendimento |
| Green sobrescrever CSS/estrutura em edição futura | sempre derivar mudanças do GitHub e homologar no Vercel |
| regressão dos CTAs por módulos Green | manter dock em `document.body` via JS global |
| www sem SSL durante validação | aguardar Green e testar após `Domínio OK` |
| tracking sem governança | manter bloqueado até gate específico |

## 6. Governança operacional

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

## 7. Próxima ação segura

Autoridade: `docs/NEXT_SAFE_ACTION.md`.
