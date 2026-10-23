# MoreNumTegra — Recibo SFJM do release Ampère + CAPIITOLO (#472)

Data: 2026-10-23
Natureza: release production e reconciliação pós-merge
Repositório: `wagnerjfjunior/MoreNumTegra`
Domínio: `https://www.moretegra.com.br/`

## Lifecycle verificado
- Fonte canônica `main` antes do release: `9610f237a6c2d9e8c1588c51026c2b858f467dfd`.
- Candidata: PR #472, `sfjm/ampere-capiitolo-release-candidate-20261023`, com integração das propostas #470 e #471 sem reescrever branches originais.
- Baseline comercial USER_ACCEPTED em LVR Live Sync: `ec0fe0a3a7925e712932589c0cbeeb94315af08b`.
- Baseline do HTML Ampère integrado e USER_ACCEPTED em LVR Live Sync: `ffe7dd2183e51360c8ecf6a217f61605b8ca652a`.
- HEAD da PR aprovado pelo GitHub Actions: `d9c9ce3ad5eadc490a7c53fc08e456f48a2ef888`, 13 SUCCESS / 0 FAILURE / 0 PENDING, incluindo Playwright CTA/Form.
- PR #472 saiu de Draft para Ready com `mergeable=true` e foi merged via squash.
- Merge na `main`: `6d20e9102659c3288f7da18ac20871138904b2a2`.
- Vercel Production: deployment `dpl_AfKcdWavJxVEskWGSwUkMBpGZYH9`, `READY`; alias `www.moretegra.com.br` mapeado ao mesmo SHA GitHub `6d20e9102659c3288f7da18ac20871138904b2a2`.
- Qualquer merge DOCUMENTAL posterior na main não altera automaticamente o SHA do runtime Vercel. Conferir deployment por runtime SHA, não somente por HEAD GitHub.

## Escopo protegido e verificado no código canônico após merge
- Home: cards Ampère e CAPIITOLO com links `?condicao=promocional` e `?condicao=avista`.
- Ampère Brooklin, unidade 62: R$ 3.990.700 promocional; R$ 3.791.165 à vista.
- CAPIITOLO, unidade 33: R$ 3.350.000 promocional; R$ 3.135.000 à vista.
- URL query acompanha a condição selecionada; selector e contexto do formulário são preservados.
- Hero/editorial Ampère, FACTS mobile 2×2, badge WhatsApp oficial RESF e CTAs aprovados pelo usuário durante Live Sync.
- Form 46, consentimento, GTM/GA4 e identidade Sabrina da Tegra devem permanecer com contratos vigentes; Playwright/CI não equivale a envio real de lead/CRM.

## Correções técnicas do CI
- Expectativas históricas de H1, unidade e preços das ofertas foram atualizadas sem mudar HTML aprovado.
- Schema NR Studios Berrini validado como `Place` e não `ApartmentComplex` residencial fictício.
- Endereços NR e identidade Sabrina verificados sem fabricar CEP ou representação presencial.
- Favicons completos nas páginas NR e coleção de investimentos.
- Inventário RESF manteve verificação das 41 rotas; coleção investimentos recebeu checagem própria de imagens, CollectionPage e ItemList.
- Validador postal Ampère usa o snapshot HTML integral integrado aprovado, preservando invariantes de endereço e grafo.
- CTA do Reserva permanece `Consulte disponibilidade` via WhatsApp; testes estático e Playwright agora verificam o comportamento real, sem forçar `data-form-intent` falso.
- Rodapé NR passou a preservar disclaimer canônico e contato Sabrina; exceção delimitada à exposição de endereço público do NR deve manter igualdade com `Place` e footer.

## Matriz de evidência e limitações
| Gate | Evidência | Resultado |
| --- | --- | --- |
| Live Sync comercial, hero, FACTS, WhatsApp | aceite expresso do proprietário nesta conversa | USER_APPROVED |
| GitHub Actions HEAD PR #472 | 13 workflows completos | PASS 13/13 |
| GitHub main merge | SHA `6d20e910...` | PASS |
| Vercel production deployment | `dpl_AfKcdWavJxVEskWGSwUkMBpGZYH9`, READY e SHA idêntico | PASS |
| Código comercial e ícone no GitHub main | HTML/JS canônicos conferidos após merge | PASS STATIC |
| HTTP público independente após deploy | tentativa externa de acesso retornou indisponível para a ferramenta | NOT_VERIFIED |
| Navegador público após deploy | abas conectadas disponíveis podem conter HTML anterior em cache; não usado como evidência de release | NOT_VERIFIED |
| Form 46 submissão real, consentimento no navegador público, CRM e GA4 | nenhuma submissão real realizada neste gate | NOT_VERIFIED |
| Lighthouse/CWV e indexação GSC/Bing | não medidos nesta operação | NOT_VERIFIED |

## Continuidade e guardrails
- A funcionalidade Ampère/CAPIITOLO que foi aprovada está fechada para mudanças não relacionadas; não reabrir preços, hero, FACTS ou WhatsApp sem evidência de regressão e aprovação específica.
- Prioridades editoriais do blog, cluster Vila Nova Conceição e outros projetos mantêm lifecycle próprio; não são concluídos por este release.
- PRs #470/#471 históricas não devem ser merged cegamente após #472; conciliar sobreposição e encerrar redundâncias de forma rastreável.
- Pós-release externo ainda exige smoke HTTP da Home, Ampère/CAPIITOLO com queries, navegação real, consentimento, Form46 sem envio não autorizado e SEO/canonical/JSON-LD. Registrar PASS somente após execução real.
- Reversão somente por PR governada do squash `6d20e910...` com análise de impacto; nunca reset/force-push de `main`.
