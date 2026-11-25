# Agentic Web — QA e mensuração V1

## Homologação funcional em produção (Chrome DevTools WebMCP)

1. Abra a homepage sem filtros; teste search_properties com {}, region Zona Oeste, stage entregue, min_area 65 e max_price 1000000. Confira os cards publicados, sem assumir disponibilidade. Teste intervalo invertido e slug inexistente.
2. Use slugs reais retornados pela busca para get_property_details, get_property_location, get_property_price e compare_properties (2 a 4 slugs distintos). Compare valores e variantes com a página. Registre resultados e divergências; não confunda mock com produção.
3. request_visit {} deve selecionar Agendar visita e focar o nome, sem submissão. request_sales_contact deve preparar formulário apenas; usar Inspector sem confirmar envio. Não usar dados pessoais reais em QA e não transmitir lead fictício. Honeypot deve ficar vazio. Confirmar nenhuma requisição POST Greenn.
4. Repetir sem API habilitada; UX convencional preservada. Lighthouse 6/6 e sete tools devem continuar reconhecidos.

## Mensuração

No Tag Assistant, aceitar cookies e executar uma ferramenta: dois eventos dataLayer (invoked e success/error), mais visit_intent somente para visita preparada. Recusar cookies e repetir: nenhum evento webmcp novo. Revogar consentimento e repetir. Não inspecionar dados pessoais em exportações.

GTM-PGCR4R47: criar trigger Custom Event regex ^webmcp_(tool_invoked|tool_success|tool_error|visit_intent)$; configurar tag GA4 Event usando {{Event}} e variáveis Data Layer webmcp_tool e webmcp_outcome; exigir analytics_storage. Validar Preview e DebugView antes de publicar contêiner. Não marcar como key event. Registrar dimensões personalizadas event-scoped webmcp_tool e webmcp_outcome. Reutilizar propriedade/Google tag existente, não criar ID novo sem verificação. Não alterar tags existentes. Este repo não publica configuração administrativa GTM.

GA4 Explorações: linhas webmcp_tool, colunas event name e métricas event count; success/invoked como taxa de sucesso de chamadas (não usuários nem agentes únicos). visit_intent não é visita agendada. Manter mnt_lead_success/generate_lead como conversão única; atribuição agêntica e ferramenta declarativa exigem desenho e validação adicionais. Não enviar parâmetros de busca, dados de formulário ou resultado das tools.

## Critérios

CI simulado verde, execução nativa manual, zero POST de teste, consentimento positivo/negativo, Tag Assistant, DebugView, Lighthouse sem regressão. Sem expansão até homologação. Rollback: reverter somente PR de observabilidade.
