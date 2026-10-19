# Blog Lapa — correção de badge flutuante visível como link simples (2026-10-19)

## Evidência e causa

Captura mobile do proprietário após PR #452 mostra **Receber condições** como link sublinhado no fluxo da página e imagem WhatsApp pequena, no fim do rodapé. A PR #452 implementou `.mt-quick-actions` e CSS em `lapa-artigo.css`, mas não reproduziu o componente da Home `#mt-floating-dock`. O CSS específico não apareceu aplicado na captura; causa externa definitiva (cache, resposta HTTP, CSS bloqueado) ainda não comprovada em inspeção de rede.

## Fix delimitado

- Substituir a barra de ações anterior por `<nav id="mt-floating-dock">` com as classes reais `mt-floating mt-floating-lead` e `mt-floating mt-floating-whatsapp`, mesmo contrato estrutural de `src-greenn/moretegra.js`.
- Aplicar o CSS crítico diretamente no `<head>` do artigo, espelhado do `src-greenn/moretegra.css` para impedir uma dependência exclusiva de CSS externo/cached.
- Manter amarelo Tegra `#EBB92E`, logotipo WhatsApp na imagem corporativa já usada, `z-index`, posição `fixed`, safe area, duas colunas mobile e foco visível.
- Direcionar condições ao formulário existente em `/regioes/#formulario` e WhatsApp ao número validado Sabrina `5511960779328`, com mensagem contextual.
- Sem mudança nos cards, fatos comerciais, H1, SEO, form ou tratamento de consentimento. O CSS antigo `.mt-quick-actions` permanece sem efeitos por não haver mais componente com essa classe; pode ser removido em etapa posterior após QA.

## Aceite e rollback

- Conferir fonte HTML: um `#mt-floating-dock`, `position:fixed` em `<head>`, imagem oficial, botões e destinos.
- CI e deploy READY no mesmo SHA pós merge.
- QA visual real mobile continua necessária; **não confundir CI com renderização**.
- Reverter squash PR em caso de falha.
