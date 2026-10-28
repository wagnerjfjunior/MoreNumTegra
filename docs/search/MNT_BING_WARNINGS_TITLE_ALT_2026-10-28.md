# Correção de warnings Bing — 28/10/2026

Solicitação do proprietário: resolver Title too long no artigo Lapa e Alt attribute for images is missing em Regiões, RIIO e Ária.

Produção inspecionada: as três páginas já continham atributo alt em todas as imagens; 34 miniaturas informativas tinham alt vazio. Foram preenchidas 6 em Regiões, 7 em Ária (reutilizando data-alt existente) e 21 no RIIO (legendas das miniaturas). Imagem do dialog RIIO recebeu texto inicial, substituído pela legenda selecionada em execução. Helper RIIO sincronizado. Ícones WhatsApp decorativos mantêm alt vazio e links com nome acessível.

Título Lapa: 76 → 60 caracteres: “Valorização imobiliária na Lapa: preços e riscos | MoreTegra”. Conteúdo, H1, canonical e JSON-LD preservados. Guard de originalidade atualizado; proteção do lote Mercado permite somente a troca exata desse título na página Lapa.

Validações locais: originalidade Lapa PASS; Mercado PASS; RIIO ficha/galerias/componentes PASS; Python compile PASS. Nova varredura Bing será necessária para comprovar que o painel retirou os warnings; não declarar aviso resolvido no painel antes dela.

Rollback: reverter PR da correção; base main 69e3570d5305572d1a93ba80db5cd9b286a10ceb, runtime anterior 0b1de5b1218fb1c4c83c2683366bdfe11ad60d44 / dpl_8iiXm3RtVDbMhNSbHdpaJBq6KjjG. Nenhuma alteração de formulário, preços, rotas, redirects ou tracking.
