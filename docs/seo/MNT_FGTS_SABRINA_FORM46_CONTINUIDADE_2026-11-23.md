# Continuidade SFJM — FGTS transversal e atendimento Sabrina — 23/11/2026

## Origem e escopo
Recuperação solicitada pelo proprietário após impossibilidade de continuar a conversa anterior. Fonte primária: exportação de chat fornecida nesta conversa, terminando com a solicitação de apresentar Sabrina da Tegra para simulação financeira, carta de crédito e FGTS e inserir o Form 46. Esta nota documenta a solicitação, **não** declara implementação do último pedido.

## Decisões já autorizadas e relatadas
- PR #595, branch `feat/seo-fgts-orbita-guia-20261123`, cluster FGTS transversal para empreendimentos residenciais de São Paulo, sem merge automático.
- Artigo `/blog/mercado/usar-fgts-comprar-apartamento/`; catálogo `/?estagio=pronto#oportunidades`; formulário home `/?interesse=FGTS%20para%20comprar%20apartamento#formulario`.
- Links Elo Duo, Universo Tatuapé Órbita, Soma Perdizes; links contextuais nas páginas Elo Duo e Soma; ressalva explícita de que pronto não equivale a elegibilidade FGTS.
- Contrato de captação Form 46 preservado. Relato anterior: 37 verificações estáticas aprovadas, quatro falhas legadas de CI e QA visual pendente. Estes números são históricos e exigem reverificação live.
- Histórico e matriz detalhados em `docs/seo/MNT_FGTS_ORBITA_CLUSTER_2026-11-23.md` §9 e nos topos de `handoffs/CURRENT.md`, `docs/NEXT_SAFE_ACTION.md` e `docs/PROJECT_STATUS.md` desta branch.

## Solicitação comercial original — implementada posteriormente na branch (ver seção final)
O proprietário pediu que o guia e/ou a jornada FGTS comuniquem que **Sabrina da Tegra pode orientar dúvidas sobre simulação financeira, carta de crédito e utilização de FGTS**, oferecendo contato e o **Form 46**. A expressão 'ajudar' não implica aprovar crédito, emitir carta de crédito ou garantir enquadramento FGTS. Sugestão de copy para avaliação: “Quer entender como o FGTS pode entrar na compra do seu apartamento? A Sabrina da Tegra pode orientar você sobre as possibilidades de utilização do FGTS, simulação financeira e próximos passos para análise de crédito. Envie seus dados e receba atendimento.” Evitar promessa de concessão de financiamento ou exclusividade de elegibilidade. Respeitar a política comercial vigente do canal SP e não propagar nome/canal ao RJ.

## Próxima ação segura
1. Resolver live: main SHA, head/base da PR #595, diff, checks e documentação; confirmar se a solicitação comercial já foi implementada por outra sessão.
2. Projetar a integração comercial no guia e no fluxo do Form46 sem duplicar formulário nem alterar contrato, consentimento, eventos ou rodapé. Verificar se o artigo deve incorporar o próprio formulário ou CTA para formulário existente, conforme arquitetura atual e pedido.
3. Validar copy, escopo do atendimento, acesso mobile, CTA, formulário e rastreabilidade; LVR 360/390/430/900/1440.
4. Manter PR em Draft. **Sem merge, deploy, publicação, alteração de validadores além da autorização exata anterior, ou testes de lead real sem autorização específica.**

## Estado de evidência
Esta nota foi escrita a partir do chat exportado e leitura do GitHub; não certifica runtime, indexação, conversão, CI final, aceite visual nem deploy. A documentação da branch já contém a implementação transversal anterior; esta nota preserva explicitamente o pedido comercial ainda pendente.

## Implementação adicional solicitada — 23/11/2026

- **Commit da página:** `cb2cf0855538293cac6cb62cad33484fa2671eac` na branch da PR #595, **sem merge**.
- Guia `src-greenn/blog/mercado/usar-fgts-comprar-apartamento/index.html`: nova seção comercial com H2 `Quem pode me ajudar a usar o FGTS para comprar um apartamento?`, apresentação de Sabrina da Tegra, simulação financeira, documentação, carta de crédito e limite explícito da aprovação pelo agente financeiro.
- CTA principal e badge flutuante encaminham para o **Form 46 existente na homepage**, via `/?interesse=FGTS%20para%20comprar%20apartamento#formulario`. Não foi embutido um segundo formulário no artigo; o runtime de captação permanece o da homepage. CTA secundário e badge WhatsApp usam contato SP já presente no hub Mercado.
- Rodapé substituído pelo padrão textual/links do hub Mercado (perfil profissional, CRECI, telefone e marca); dock alterado para IDs/classes `#mt-floating-dock`, `.mt-floating-lead`, `.mt-floating-whatsapp`, com CSS escopado para responsividade. Não altera páginas RJ nem outros templates.
- **SEO:** H1, title, canonical, 5 perguntas FAQ e JSON-LD FAQPage mantidos. A pergunta de atendimento foi criada como seção H2 comercial, **não** como FAQ adicional, para não criar divergência no schema. A pesquisa OpenSEO anterior não mede volume desta nova pergunta; não alegar ranking.
- **Validação ainda pendente:** render LVR 360/390/430/900/1440, conferência de footer/dock contra referência visual, CTA/fragmento e seleção de interesse no Form 46, CI do novo head, verificação de compatibilidade com o overlay de consentimento. Sem aceite visual ou publicação declarados.
- **Estado:** implementação em branch, PR #595 deve permanecer Draft até gates e autorização específica de merge.
