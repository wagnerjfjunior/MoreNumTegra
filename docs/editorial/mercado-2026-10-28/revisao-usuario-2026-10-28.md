# Revisão após teste LVR — 28/10/2026

Escopo autorizado: correções dos 11 candidatos após observações do usuário, na mesma branch/PR507. Usuário escolheu **RIIO by Piero Lissoni** para a primeira página RJ. Não é autorização de publicação ou merge.

## Alterações

- Todos os 11 artigos: retirar o dock divergente `.mnt-market-dock`; usar o contrato do RESF já aplicado em Lapa, `#mt-floating-dock`, CTA amarelo arredondado, WhatsApp circular verde com logotipo oficial, foco visível, safe area, CSS crítico inline e compensação de consentimento. Destino de condições permanece o formulário existente em `/regioes/#formulario`.
- Links internos contextuais transformados em cards acessíveis. Empreendimentos/coleções com imagem; artigos relacionados em cards de leitura. Fontes externas continuam vinculadas no texto. Navegação, breadcrumbs, contato e rodapé preservam sua função.
- Valorização: cards Tièl e studios/salas; no trecho de arquitetura assinada, Piero Lissoni/CAPIITOLO e Bueno Brandão, distinguindo as autorias de cada projeto. Não atribuir Bueno Brandão a Lissoni.
- Infraestrutura: card **Caminhos da Lapa → https://www.caminhosdalapategra.com.br/**, proprietário do complexo. Não criar `/caminhos-da-lapa/` no MoreTegra nem confundir o master com a regional Lapa.
- IPTU: retirar calendário/percentual/valor mínimo/parcelamento de 2026, atualizar título da seção, introdução e FAQ. Orientação atemporal para conferir as regras do exercício nos canais oficiais; não prometer desconto permanente. Retirada correspondente da lista de afirmações quantitativas.
- Investimento de longo prazo e FIIs: card studios/salas no corpo, além da navegação final padronizada.
- Luxo: cards Bueno Brandão e Tièl.
- Barra: card RIIO, introdução contextual da expansão e FAQ atualizado. CTA/WhatsApp do artigo passam a RIIO/Barra, sem texto restrito à pesquisa em SP.
- Inventário: novo hero, perspectiva da fachada noturna do CAPIITOLO, substituindo a Rua Jardim já repetida. Dimensões e créditos em `midia.json`; não retrata um imóvel efetivamente herdado.
- Mooca/Tatuapé, Sustentabilidade e Itaim: sem alteração editorial específica solicitada; recebem os ajustes comuns de cards e badges.

## RIIO

Rota de teste: `/empreendimentos/riio-by-piero-lissoni/` — noindex, fora de Home/hubs/sitemap. Fatos e divergências em `riio-fatos.json`. Tipologias/ficha técnica, assinatura, quatro facts na ordem RESF, galeria ilustrativa acessível, foto contextual do bairro, localização, oito FAQs em paridade com JSON-LD, Sabrina e Form46 atual com identidade própria.

Ficha técnica específica: 3–6 vagas, enquanto o portal genérico informa 2–6. Usar a ficha por tipologia; confirmar a unidade. Estágio no portal vivo: em construção. Índice antigo dizia lançamento; não usar o índice antigo para o estágio. Preço vivo associado à tabela de outubro não é importado sem uma unidade/tabela governada para nossa operação. Sem Product/Offer, disponibilidade, CEP/geo, prazo de entrega ou planta inventados. Quadro de tipologias e link da ficha substituem a ausência de imagens de plantas confirmadas nesta preparação.

Sabrina permanece com sua credencial **CRECI-SP 209.905-F** e contato autorizados; atendimento descrito como inicial para materiais e encaminhamento da consulta, sem alegar credencial, escritório ou equipe RJ. Revisão comercial do fluxo de expansão é um residual de release, não impede avaliar o candidato local.

## Evidência e limites

Base main/Production reconciliada: `bbe59c7a0b7b8a597826d56f6bc01d5291d9dfa5`, deployment `dpl_iTarC8LY4vvXq44mGGf9ekCg3fCi` READY. Head da branch antes das correções: `df9bcc9e344ab43efba5ecd94ae420372adb1db2`.

Validator específico passou em 11 artigos + regressões dos cards/badges/IPTU/hero + RIIO: quatro facts, FAQ visível/schema, não herdar preço/unidade, Form46 idêntico ao contrato atual ajustando somente o nome do projeto, mensuração/runtime preservados. Favicon passou em 125 HTML; Bairros/Lapa passou. Mídias novas baixadas com sucesso dos originais autorizados e inspecionadas em contact sheet. Somatório atual: **20.263 palavras editoriais**, 1.801–1.940 por artigo.

A extensão do navegador voltou a conectar. Leitura da aba LVR do usuário confirmou **versão anterior** de Inventário: hero `rua-jardim.webp` e dock antigo. Isso é evidência do antes, não QA dos arquivos corrigidos, nem prova do SHA servido. Após atualizar a branch no LVR, recarregar e verificar os novos componentes.

Não foram executados testes oficiais Schema.org/Google, performance/CWV ou entrega CRM. Não foi enviado lead/mensagem. Há preparação estrutural e de conteúdo, não aceite final visual/comercial ou certificação de schema. Os novos candidatos permanecem noindex. O relatório OpenSEO previamente salvo continua sendo o diagnóstico inicial, não evidência da versão corrigida.
