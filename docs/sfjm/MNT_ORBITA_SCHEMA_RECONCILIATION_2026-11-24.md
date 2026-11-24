# SFJM — Reconciliação SEO/JSON-LD Órbita — 24/11/2026

Status: decisão do proprietário confirmada; documentação proposta em PR; implementação dos validadores pendente. Base observada main: 5629c9035a6f60be002e9ebe03bfc225544f1d4b (#601). Não equivale a aceite de produção.

## Evidência e decisão
- Capturas do teste Google fornecidas pelo proprietário em 24/11: Órbita 4 itens válidos (Breadcrumb 1, LocalBusiness 1, Organization 2); Bueno Brandão 257 7 (Product snippets 2, Merchant listings 2, Breadcrumb 1, LocalBusiness 1, Organization 1). Contagem não garante exibição nem ranking.
- HTML do Órbita em main: 16 nós no grafo, zero Product/Offer, 3 FloorPlan, 12 perguntas FAQ, Form46 e consulta de valor. Bueno possui dois pares Product/Offer, sem availability. Não extrapolar a validade comercial do Bueno.
- Modelo RESF de 23/11, §3 item 12, registra remoção deliberada de oferta antiga AP1814 e FloorPlan AP0609; seletor de preços antigos retirado. Decisão de 24/11: manter Órbita sem Product/Offer enquanto não houver preço comercial vigente confirmado e visível. Não restaurar números históricos, não inventar preço zero, disponibilidade, unidade ou avaliação. Reavaliar elegibilidade Google (incluindo restrições de listagens de comerciante para páginas de captação) antes de restaurar, sem prometer resultado enriquecido.
- Fonte: docs/frameworks/resf/v1/RESF_ORBITA_PAGE_MODEL_2026-11-23.md; HTML e scripts em main; screenshots USER_REPORTED.

## Próxima ação técnica (PR separada)
1. scripts/validate-project-schema-coverage.mjs: exceção exata Órbita para Product/Offer ausentes; manter proteção de todos demais tipos/IDs e demais páginas.
2. scripts/validate-resf-v2-postal-address-contract.mjs: reconciliar somente deltas comprovados do Órbita (FAQ, referências, imagens/planos e entidades removidas), sem atualizar snapshots globalmente.
3. scripts/validate-orbita-commercial-schema-parity.mjs: substituir expectativas obsoletas de preço/unidade, galeria de bairro, facts e layout pelo contrato real aprovado; manter paridade FAQ/HTML, identidade, endereço, imagens, plantas, Form46, WhatsApp e IDs. Não apagar cobertura funcional.
4. Testes negativos: exclusão de entidade essencial, FAQ divergente, oferta antiga reintroduzida, referência órfã, alteração de contato/endereço ou formulário e regressão em outra página devem falhar. Executar bateria integral antes/depois; separar falhas preexistentes de regressões. Não declarar CI verde sem evidência.
5. Sem alteração de HTML, CSS, JS de runtime, sitemap, FGTS, Livelo, GTM/CRM ou outras páginas. Sem merge, deploy ou Preview sem ordem específica. Local Live Sync se validação visual for pertinente.

## Continuidade e divergência
Main contém #595 (cluster FGTS), #596 (imagens), #599 (links RJ), #600 (origem FGTS Form46), #601 (copy RJ). Os cabeçalhos de 23/11 do kit estão defasados nesses pontos. #600 relata 33 assertions Chromium e 15/16 CI, com falha editorial histórica; não houve lead real. Não inferir QA de produção, Vercel READY, indexação ou fechamento de outras frentes. F02 e demais gates seguem abertos conforme evidências próprias. Esta reconciliação é pontual, não auditoria global do programa.

## Autorização
Pedido do proprietário: “otimo entao acerte a documnentacao, acione sfjm tb”; “vamos trabalhar nesta reconciliacao”. Escopo atual documentação e preparação de continuidade. Alteração técnica dos três scripts em PR própria, com exceção restrita e testes negativos; merge exige ordem específica. Nenhuma mudança de runtime nesta entrega.
