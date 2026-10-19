# Lapa Blog — badges flutuantes RESF — 2026-10-19

## Motivo e padrão
O artigo SEO Lapa não apresentava o padrão flutuante do rodapé já usado nas páginas comerciais RESF.

## Alteração delimitada
- Reaplicada a estrutura `.mt-quick-actions`: CTA amarelo `Receber condições` e badge verde circular `WhatsApp` com imagem real da marca, sem substituí-la por letra/ícone genérico.
- Fonte do padrão: `src-greenn/empreendimentos/garden-design/index.html` e `src-greenn/regioes/lapa/index.html`.
- Destino do CTA: formulário existente `/regioes/#formulario`, pois o blog não tem Form 46 próprio. WhatsApp: `wa.me/5511960779328` com mensagem contextual dirigida à Sabrina.
- CSS encapsulado em `src-greenn/blog/lapa-artigo.css`, com `safe-area-inset-bottom`, padding para evitar encobrir rodapé, foco visível e desktop compacto. Nenhum JS novo.
- Mantidos: seis cards de empreendimentos, H1, links, imagens, FAQ/schema existente, preço/disponibilidade e componentes do formulário.

## Gates
- CI de favicon e imagens do repositório.
- Estático: uma nav de ações rápidas, dois links, WhatsApp com logo e destino correto; H1 único e JSON-LD.
- Mobile real, imagem remota HTTP e CRM não são comprovados pelo CI. Não enviar lead sem autorização.
- Rollback: revert do squash da PR.
