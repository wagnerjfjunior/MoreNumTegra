# Jerivás — correção RESF de regressão visual e funcional (20/10/2026)

## Autorização e reclamações
Usuário solicitou explicitamente corrigir a página Jerivás em produção após PR #460. Problemas: quarta fact "Entregue" não deve exibir "Venda original encerrada", mas **Sob consulta**; seção exclusiva Sabrina ausente; formulário fora do modelo claro RESF; mapa inexistente; galeria entregue como fotos soltas; plantas sem galeria.

## Alterações na branch
- Jerivás: facts passa para **Entregue / Sob consulta**, mantendo o caráter de condomínio entregue e informação de venda original encerrada somente no texto explicativo factual. Valores/unidades seguem sob confirmação, sem inventar oferta.
- Galeria premium real de ambientes: 6 imagens Tegra/Azure do acervo Jerivás, uma imagem por vez, seletores, anterior/próxima, gesto swipe e setas de teclado. CSS mobile responsivo, imagens abaixo da dobra lazy.
- Galeria de plantas específica: implantação Jerivás, planta padrão 105 m² e planta padrão 136 m², fontes autorizadas do repositório irmão CaminhosdaLapaTegra; três seletores, imagem ampliada e alt/caption dinâmicos.
- Localização em padrão RESF: galeria contextual com 3 fotos Lapa reutilizadas do Reserva, mapa regional Google Maps embutido lazy, sem gesto do mapa para bloquear a captura de toque, overlay e botão "Solicitar localização" abrindo WhatsApp da Sabrina. Mapa mostra contexto regional, NÃO inventa pin de portaria.
- Seção exclusiva Sabrina da Tegra com retrato S3 e identidade profissional, CRECI-SP 209.905-F, telefone, botão comercial e perfil profissional.
- Form46 passa à seção clara com cartão branco, preservando IDs, método de envio em runtime, Consent Mode, dados e mensuração.
- Metadados e `@graph` preservados sem inventar preços ou Offer, assim como todos os links entre domínio histórico Caminhos e domínio comercial MoreTegra.
- Arquivos: `src-greenn/empreendimentos/jerivas-caminhos-da-lapa/index.html`, `jerivas.css`, novo `jerivas-gallery.js`, validador próprio e CI.
- Gate `scripts/validate-jerivas-commercial.mjs` verifica galeria, plantas, 3 fotos da região, mapa, Sabrina, form claro, mobile, contratos anteriores; workflow executa `node --check` no JavaScript.

## Governança
Sem modificações no domínio CaminhosdaLapaTegra. Produção só por merge de PR testada na `main`, Vercel automática sem Preview ou deployment manual duplicado. Rollback por revert desta PR. Sem testes de leads reais não autorizados. Aceite visual no iPhone e entrega real no CRM continuam não comprovados até usuário validar.
