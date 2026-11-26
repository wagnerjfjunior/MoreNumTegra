# MoreNumTegra — Consent Mode V3 — Resolução técnica e gates de produção

- Data: 25/11/2026.
- Projeto: MoreNumTegra; repositório canônico \`wagnerjfjunior/MoreNumTegra\`.
- Branch de origem: \`feat/consent-granular-v3-20261125\`, base verificada \`ece0df81c8cb556c48d2855109ff6856c27e1e6b\`.
- Autorização explícita: instrução do proprietário de 25/11/2026, abrangendo código, testes, validações, PR, merge, produção e documentação, sem alterar contratos comerciais.
- Fonte de verdade: GitHub \`main\`; runtime Vercel para \`www.moretegra.com.br\`, Form46 SP/Form47 RJ em Green Sales.
- **Estado do fechamento nesta revisão:** implementação e testes locais concluídos; registrar PR, SHA, Vercel e testes live no recibo após o merge. A presença deste documento **não** comprova deploy.

## 1. Decisão e contrato

V3 substitui consentimento puramente analítico do piloto V2, preservando Basic Consent Mode: nenhum carregamento não essencial do GTM antes de escolha válida. Um gerenciador vanilla compartilhado controla a sinalização e interface, sem backend novo. A interpretação do consentimento para GA4/Clarity é analítica; sinais de anúncios só com marketing. A captura de contatos pelo CRM não depende de cookies analíticos.

| Contexto | analytics_storage | ad_storage | ad_user_data | ad_personalization |
|---|---|---|---|---|
| Padrão primeira visita | denied | denied | denied | denied |
| Aceitar todos | granted | granted | granted | granted |
| Apenas análise | granted | denied | denied | denied |
| Apenas marketing | denied | granted | granted | granted |
| Recusar todos | denied | denied | denied | denied |

\`window.MNTConsent\`: \`get()\`, \`allowed('analytics'|'marketing')\`, \`save(boolean,boolean)\`, \`signals()\`, \`open()\`, \`version\`. Evento do navegador \`mnt:consent-changed\`. Evento \`mnt_consent_accept\` exclusivamente para aceite total; \`mnt_consent_reject\` para recusa; \`mnt_consent_preferences\` para escolhas granulares. Os gatilhos antigos nunca devem converter preferências granulares em grant-all.

## 2. Persistência, inicialização e revogação

Armazenamento do navegador \`mnt.consent.v3\`: \`version:3, analytics:boolean, marketing:boolean, savedAt:number, expiresAt:number\`. Validade fixa 365 dias; não renovada em page view. Registros inválidos, expirados ou V2 ficam denied e exigem nova escolha. Restaurar antes do GTM, sinalizar default denied primeiro, aplicar atualização determinística. \`storage\` sincroniza múltiplas abas; rejeitar permissões retiradas imediatamente e recarregar a página para retirar scripts de terceiros já carregados. Cookies conhecidos controláveis pelo host são expirados na revogação quando possível; cookies fora do domínio não podem ser apagados pela aplicação. Se armazenamento não funcionar, UI sinaliza que a preferência não persistirá.

O banner apresenta Aceitar todos, Recusar todos, Personalizar, análises, marketing, essenciais obrigatórios, detalhes de cookies e Salvar; mantém mesma facilidade de recusa e aceite. Controle \`Gerenciar cookies\` criado no rodapé de cada página HTML completa. Manter foco e áreas de toque. Cores fundo escuro / \`#EBB92E\`.

## 3. Cobertura técnica

O inventário verificado nesta revisão tem **161 arquivos HTML** em \`src-greenn\`, sendo **157 documentos completos com \`<head>\`** integrados ao V3 e **4 fragmentos** intencionalmente excluídos (\`blocks/01-html-inicial.html\`, \`blocks/02-html-pos-form.html\`, \`blocks/03-footer.html\`, \`thank-you/obrigado.html\`). Todos os **137 rewrites de destino HTML** em \`vercel.json\` apontam para arquivo com manager V3; todas as **92 URLs listadas no sitemap** possuem o manager.

Foram removidos 93 GTM bootstraps legados, 91 eventos inline \`default_consent\` e 48 iframes de GTM \`noscript\` para impedir coleta antes da autorização. Gerenciador carregado no início de \`head\`; script defer do runtime e mensuração preservados, cache-bust \`?v=20261125-v3\`. O Form46/SP e Form47/RJ, tenant 313, links e CTA não tiveram conteúdo comercial alterado. Não inserir SDK externo novo além dos provedores consentidos.

Arquivos de núcleo: \`src-greenn/preview/consent-v3.js\`, \`runtime.js\`, \`measurement-core.js\`, \`measurement-form.js\`, \`thank-you-measurement.js\`, \`agentic-web.js\`, \`src-greenn/blog/measurement-editorial.js\`, \`src-greenn/modules/moretegra.measurement.js\`, \`src-greenn/moretegra.js\`. Mais 157 documentos HTML completos e testes relacionados. O \`runtime.js\` desativa a interface V2 na origem canônica se V3 presente.

## 4. GA4, Clarity, WebMCP e conversão

Taxonomia intacta: \`mnt_page_view\`, \`mnt_section_click\`, \`mnt_catalog_filter\`, \`mnt_catalog_search\`, \`mnt_intent\`, \`mnt_form_start\`, \`mnt_form_submit_attempt\`, \`mnt_lead_success\`. Contrato administrativo: \`mnt_lead_success -> generate_lead\`. Page view só com analytics e uma emissão por página. O sucesso de lead visual da página de agradecimento permanece independente do consentimento; o evento de mensuração só sai após sucesso real verificado no marcador fresco e analytics autorizado. Nunca emitir PII ao dataLayer. WebMCP somente telemetria de cardinalidade limitada e analytics permitido.

Clarity \`yyop6wf72m\`: a chamada \`clarity('consentv2', {ad_Storage, analytics_Storage})\` segue os respectivos sinais. Quando apenas análises autorizadas, o manager pode carregar Clarity diretamente, com armazenamento publicitário negado; quando aceite total, o GTM pode carregar a tag já configurada. Em caso de transição entre modos de carregamento, validar duplicações em produção. A configuração administrativa efetivamente publicada do GTM permanece não auditada.

## 5. GTM — alterações administrativas necessárias, **não presumir publicadas**

Container \`GTM-PGCR4R47\`, GA4 measurement ID \`G-57M2XR0CY2\`, propriedade \`553742649\`. Export de referência \`docs/attribution/gtm/GTM-PGCR4R47_workspace14_export_2026-11-10.json\` é **histórico**, não prova configuração atual.

Antes de habilitar anúncios com segurança, abrir o **workspace ativo** no GTM e:

1. Em \`Consent Initialization\`, verificar se \`CONSENT - Default Denied - All Pages\` executa o comando oficial \`gtag('consent','default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'})\`; não sobrescrever a preferência restaurada no manager posteriormente.
2. Auditar \`CONSENT - Grant - Continuar\`, \`CONSENT - Deny - Cancelar\` e \`MT - Consent Grant All\`/\`MT - Consent Deny All\`. Excluir ou desabilitar triggers de clique com texto \`Continuar\`/\`Cancelar\` e ações automáticas conflitantes. \`mnt_consent_accept\` concede os quatro apenas para aceite total. \`mnt_consent_preferences\` **não** deve disparar a template Grant All. Se houver template nova para preferências, mapear quatro sinais pelos valores reais do dataLayer, sem defaults publicitários permissivos.
3. Manter \`GA4 - Google Tag - MoreNumTegra\` com \`send_page_view:false\`, preservar eventos nomeados \`mnt_*\`, e um único trigger de \`mnt_lead_success\` mapeado a \`generate_lead\`; ver Consent Checks e requisito \`analytics_storage:granted\` no modo Basic. Não habilitar auto page_view.
4. Exigir \`ad_storage\`, \`ad_user_data\` e \`ad_personalization\` adequados nas tags publicitárias, com gating explícito na ausência de consentimento. Eventos anteriores à autorização não podem ser reproduzidos.
5. Verificar tags do Microsoft Clarity, disparo único quando analytics autorizado; garantir que modo analytics-only não acione consentimento publicitário nem duplicação da tag. Configurar mascaramento dos dados de formulário.
6. No Preview/Tag Assistant, testar matriz denied/full/analytics/marketing/reject e transições, carga única de GTM, sem Google Tag antes de consentimento; depois publicar versão do container e registrar número e data. **Não alegar versão publicada sem acesso.**

O acesso administrativo direto ao GTM não está disponível nesta execução. A liberação definitiva de finalidade publicitária, testes Tag Assistant e entrega de eventos GA4 dependem dessa conciliação externa. Não declarar publicidade homologada por testes estáticos.

## 6. Testes e prova

- \`node scripts/test-consent-v3.mjs\`: 27 cenários VM + 157 HTML completos — **PASS** na execução remota local.
- \`node scripts/test-gtm-consent-pilot.mjs\`: aponta para a bateria V3 — **PASS**.
- \`node scripts/test-vercel-thank-you-consent.mjs\`: 9 invariantes de conversão/CRM/RJ/SP/PII/preview — **PASS**.
- \`node scripts/validate-global-measurement.mjs\`: 92 URLs do sitemap e quatro negativos — **PASS**.
- \`node scripts/validate-measurement-region-rj.mjs\`: 10 páginas do Rio e isolamento dos formulários — **PASS**.
- Cobertura de 137 rewrites HTML — **PASS**.
- GTM Preview/Tag Assistant, GA4 DebugView, Clarity UI e Core Web Vitals: **NOT TESTED** externamente, não inventar.
- Validador legado \`validate-home-consent-desktop-width.mjs\`: base ausente em \`9c8bdc74...\`, falhava anteriormente no main, revisar separadamente sem relaxar proteção.

## 7. Homologação do proprietário em produção

Em janela anônima no \`https://www.moretegra.com.br/\` e no artigo \`/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/\`, confirmar banner inicial e Network sem \`gtm.js\`/Clarity antes de consentimento. Aceitar todos → no Tag Assistant quatro sinais granted, só um \`gtm.js\`; navegar blog, empreendimento, hub RJ e página de agradecimento sem banner repetido; no rodapé, Gerenciar cookies → deixar apenas analytics, confirmar ads denied; recusar todos → ambos denied e nenhuma nova solicitação analytics; fechar e reabrir navegador para testar persistência, verificar em duas abas. Inspecionar ausência de PII em dataLayer. Não enviar lead real ao CRM como teste sem autorização específica.

## 8. Recibo de release e rollback

- PR: **preencher após criação**.
- SHA de merge main: **preencher após merge**.
- Vercel Production READY: **preencher após deploy**.
- Alias verificado: **preencher após deploy**.
- Rollback pré-release conhecido: \`dpl_imyUg1KrLKdBPthaScojV9yxEhZu\`, anterior \`main ece0df81c8cb556c48d2855109ff6856c27e1e6b\`. Verificar elegibilidade no Vercel antes de executar rollback.
- Pendências: admin GTM/GA4/Clarity, política de privacidade com fonte jurídica publicável, QA visual mobile/desktop e medição de performance em produção. Nenhuma informação pessoal ou token armazenado.

