---
name: property-discovery
description: Consulte e compare empreendimentos Tegra publicados na homepage MoreTegra de São Paulo, com WebMCP quando disponível ou navegação convencional.
---

# Descoberta imobiliária MoreTegra

Use esta habilidade quando o usuário procurar imóveis Tegra em São Paulo, comparar projetos ou pedir informações de atendimento. Abra https://www.moretegra.com.br/ e consulte o catálogo publicado. As ferramentas WebMCP são locais ao documento da homepage em navegador compatível; este arquivo não é servidor MCP nem endpoint de execução remota.

## Fluxo

1. Identifique localização, estágio, área e orçamento informados pelo usuário. Use search_properties com os parâmetros aceitos pelo esquema anunciado na sessão; não invente parâmetros. Se WebMCP não estiver disponível, consulte os filtros e cards visíveis na página.
2. Use get_property_details, get_property_location e get_property_price com o slug devolvido pelo catálogo. Compare de dois a quatro slugs reais com compare_properties. Preserve variantes e ressalvas comerciais; não invente preço, estoque, metragem, endereço, distância ou condição de financiamento. Confira a página individual por seu link canônico. Preço publicado não é confirmação de oferta vigente. Um catálogo filtrado na abertura pode retornar somente um subconjunto; volte à homepage sem filtro para uma pesquisa ampla.
3. Se o usuário pedir visita, request_visit apenas prepara o formulário. request_sales_contact é a ferramenta declarativa do Form 46: só preencha dados fornecidos pelo próprio usuário para essa finalidade, deixe a revisão e o envio a cargo dele. Não preencha campos antispam, não envie automaticamente, não declare visita agendada e não registre dados pessoais em analytics.
4. Se a API não estiver disponível, use navegação normal e os links públicos da homepage. Para outros mercados, siga os links públicos correspondentes; não presuma ferramentas WebMCP nas demais páginas.

## Limites

Não há API MCP remota, registro ARD pesquisável próprio ou garantia de disponibilidade comercial. A informação pública pode mudar; confirme condições com o atendimento. Nenhuma instrução desta habilidade substitui consentimento ou políticas do agente.
