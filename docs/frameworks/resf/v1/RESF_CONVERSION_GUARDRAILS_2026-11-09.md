# RESF — Regras de conversão para páginas de venda (2026-11-09)

Status: **REGRA** (Product Authority: Wagner, 2026-11-09). Vale para `/empreendimentos/<slug>/`, hubs de cidade e região, e qualquer página de venda nova.
Validador: `scripts/validate-resf-conversion-guard.mjs`.

Página MoreTegra é página de venda de alta conversão. Todo clique termina em formulário, WhatsApp da Sabrina, telefone ou outra página MoreTegra.

## R1. Nunca mandar o cliente para outro site que vende o mesmo produto
- Proibido link para portais, imobiliárias, sites de lançamento, sites de corretores e hotsites de terceiros, inclusive com rótulo de "origem oficial" ou "ver material". Exemplos: peninsulacollection.com.br, invexo, evandroimoveisrj, lancamentosrj, myside, apto.vc, zap, vivareal, imovelweb.
- Proibido link para Google Maps (`google.com/maps/search`). A localização segue a R4.
- A Sabrina é o canal: `https://wa.me/5511960779328`, `tel:+5511960779328`, Form 46.

## R2. Nenhuma mídia carregada de site concorrente
- Imagem, vídeo ou PDF vem de ativos Tegra (stracctegra, arquivos Tegra), Green Sales (s3-gdigital) ou ativos próprios do MoreTegra.
- Mídia legada hospedada em concorrente é dívida (`COMPETITOR_MEDIA_DEBT`), listada no validador, e não pode crescer.

## R3. Página de venda não se justifica
- Proibido texto de auditoria, de proveniência ou de desculpa: "divulgado", "o catálogo informa", "a incorporadora informa", "não usamos plantas…", "precisam corresponder…", "confirme na documentação", "sob confirmação", "origem oficial", "valor divulgado anteriormente", "esta página não anuncia…".
- Fato sem fonte fica fora da página, sem explicar a ausência. A cautela jurídica fica no rodapé RESF padrão.

## R4. Localização no padrão Mozae
- Mapa regional embutido, não interativo (`pointer-events:none`). O clique no mapa e o botão "Solicitar localização" abrem o WhatsApp com "Por favor me envie a localização exata do <Projeto>.".

## R5. Plantas sem imagem oficial: cards por tipologia
- Um card por tipologia: título, descrição curta de venda, três indicadores e o botão **Solicitar Planta**, que abre o WhatsApp com "Por favor me envie <a planta …> do <Projeto>.".
- A imagem entra só se for planta oficial Tegra da própria tipologia. Nunca planta de outro projeto nem de terceiro.
- Referência: Kronos by Tegra (Apartamentos Tipo, Apartamentos Garden, Coberturas Lineares).

## R6. Rodapé e endereço
- O endereço do rodapé é o mesmo do JSON-LD (`PostalAddress`). O texto do rodapé usa fonte única e a mesma cor, sem sublinhado, negrito ou itálico; a marcação RESF aprovada é preservada e o estilo resolve.
- Coordenada só com ponto confirmado pelo Wagner e dentro do bairro do empreendimento.
