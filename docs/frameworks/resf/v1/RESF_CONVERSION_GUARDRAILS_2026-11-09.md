# RESF — Regras de conversão para páginas de venda (2026-11-09)

Status: **REGRA** (Product Authority: Wagner, 2026-11-09). Vale para `/empreendimentos/<slug>/`, hubs de cidade e região, e qualquer página de venda nova.
Validador: `scripts/validate-resf-conversion-guard.mjs`.

Página MoreTegra é página de venda de alta conversão. Todo clique termina em formulário, WhatsApp, telefone ou outra página MoreTegra, sempre no canal comercial da região da página (R1).

> Atualização de 2026-11-10 (Wagner): canais separados por região. São Paulo usa o canal da Sabrina; Rio de Janeiro usa a central de atendimento RJ. Contrato completo e motivo: `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md`. Fonte única dos números e formulários para os validadores: `scripts/lib/commercial-channels.mjs`.

## R1. Nunca mandar o cliente para fora do funil da região
- Proibido link para portais, imobiliárias, sites de lançamento e sites de corretores (concorrentes), inclusive com rótulo de "origem oficial" ou "ver material". Exemplos: invexo, evandroimoveisrj, lancamentosrj, myside, apto.vc, zap, vivareal, imovelweb.
- Sites oficiais da Tegra também não recebem link (isolamento de site Tegra), porque o lead sai do funil MoreTegra: tegraincorporadora.com.br e hotsites como peninsulacollection.com.br (site oficial Tegra da Península, confirmado pelo Wagner em 2026-11-10). A única exceção existente é o tour 360 da Tegra.
- Proibido link para Google Maps (`google.com/maps/search`). A localização segue a R4.
- O canal depende da região da página (separação permanente, Wagner 2026-11-10):
  - **São Paulo** (todas as páginas que não são do Rio): Sabrina da Tegra, CRECI-SP 209.905-F — `https://wa.me/5511960779328`, `tel:+5511960779328`, Form 46.
  - **Rio de Janeiro** (hub `/rio-de-janeiro/` e as 7 páginas de empreendimento RJ listadas em `scripts/lib/commercial-channels.mjs`): central de atendimento RJ, que encaminha o lead ao corretor local autorizado a vender Tegra no RJ — `https://wa.me/5511951667227`, `tel:+5511951667227`, Form 47. Número provisório, a ser trocado por um número com DDD do RJ.
- Uma página nunca usa o canal da outra região. O canal RJ não é da incorporadora: a página não diz que o atendimento é da própria Tegra nem declara credenciais.

## R2. Nenhuma mídia carregada de site concorrente
- Imagem, vídeo ou PDF vem de ativos Tegra (stracctegra, arquivos Tegra), Green Sales (s3-gdigital) ou ativos próprios do MoreTegra.
- Mídia legada hospedada em concorrente é dívida (`COMPETITOR_MEDIA_DEBT`), listada no validador, e não pode crescer. Desde 2026-11-10 a dívida é zero: as galerias do Gran Thai e do Singular passaram para a mídia oficial Tegra (`stracctegra/.../peninsula/`), a mesma usada pelo hotsite oficial.
- Planta com imagem: só a planta oficial Tegra, com a área exata da própria planta.

## R3. Página de venda não se justifica
- Proibido texto de auditoria, de proveniência ou de desculpa: "divulgado", "o catálogo informa", "a incorporadora informa", "não usamos plantas…", "precisam corresponder…", "confirme na documentação", "sob confirmação", "origem oficial", "valor divulgado anteriormente", "esta página não anuncia…".
- Fato sem fonte fica fora da página, sem explicar a ausência. A cautela jurídica fica no rodapé RESF padrão.

## R4. Localização no padrão Mozae
- Mapa regional embutido, não interativo (`pointer-events:none`). O clique no mapa e o botão "Solicitar localização" abrem o WhatsApp com "Por favor me envie a localização exata do <Projeto>.".

## R5. Plantas: toda planta com foto e pedido pelo WhatsApp
- Nenhum card ou planta sem imagem (Wagner, 2026-11-10).
- **Seletor (padrão Chateau Jardin)** quando há planta oficial publicada: grupos (Apartamentos, Gardens, Coberturas, Casas), uma aba por planta com título e área privativa exata, imagem oficial e o botão **Solicitar Planta**, que abre o WhatsApp com "Por favor me envie a planta <título> do <Projeto>.". Módulo único: `src-greenn/empreendimentos/rio/resf-rio-plans.js`.
- **Cards por tipologia** quando não há planta baixa oficial publicada: foto oficial da tipologia (decorado, terraço etc.), título, descrição de venda, três indicadores e **Solicitar Planta** pelo WhatsApp. Referência: Kronos by Tegra.
- Imagem só de mídia oficial Tegra: stracctegra, Green Sales (s3-gdigital) e hotsites oficiais Tegra (peninsulacollection.com.br, kronosbytegra.com.br). Nunca de site de corretor ou portal; por exemplo, clariscasaclube.com.br é da Apetopia Imobiliária e fica vetado.
- A área vem do carimbo ou da legenda oficial da própria planta.

## R6. Rodapé e endereço
- O endereço do rodapé é o mesmo do JSON-LD (`PostalAddress`). O texto do rodapé usa fonte única e a mesma cor, sem sublinhado, negrito ou itálico; a marcação RESF aprovada é preservada e o estilo resolve.
- Coordenada só com ponto confirmado pelo Wagner e dentro do bairro do empreendimento.

## R7. Rio de Janeiro sem Sabrina e sem atribuir o canal à Tegra
- Nas páginas RJ (hub e 7 empreendimentos) não há nenhuma referência à Sabrina: nome, CRECI, perfil, `Person` no JSON-LD, mensagens de WhatsApp, `aria-label`, avisos do formulário (Wagner, 2026-11-10; questão do CRECI no RJ).
- O canal RJ é apresentado como **central de atendimento RJ**, com encaminhamento ao corretor local autorizado. Proibido dizer que o atendimento é "direto com a Incorporadora Tegra", "direto com a Tegra" ou da Tegra Vendas, e ligar o `ContactPoint` do canal à organização Tegra Vendas.
- Copy aprovada (Wagner, 2026-11-10): bloco "Atendimento exclusivo para seu próximo imóvel" / "Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro."; rodapé "Central de atendimento RJ · (11) 95166-7227 · Encaminhamento ao corretor local autorizado."; botões "Conversar no WhatsApp", "Negociar condições", "Solicitar planta".
- O estande físico (`#estande-tegra`, equipe Tegra RJ no endereço do empreendimento) continua ligado à Tegra: é o estande da Tegra, não o canal de contato.
- São Paulo não muda: Sabrina, CRECI-SP, perfil, telefone, links, CTAs e JSON-LD preservados.
