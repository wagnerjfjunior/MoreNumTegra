# MNT — Exceção de mídia DSG Itaim e CAPIITOLO (10/10/2026)

## Autorização e limites
Product Authority forneceu explicitamente as três URLs e a regra de hero com vídeo do CAPIITOLO.
Esta é uma exceção **somente de mídia** à exclusão destas duas páginas da migração RESF V2.
Não reclassifica DSG/CAPIITOLO nas 36 rotas RESF V2 nem autoriza reconstrução de layout, schema geral, conteúdo, facts, Form 46 ou tracking.
PR: #365, branch fix/dsg-capiitolo-media-exception-20261010, sem merge automático.

## DSG Itaim
- Mobile <=719px: https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTegra-Torre-Fechada-DSG-Itaim-9x16.webp
- Desktop/OG/Twitter/JSON-LD primary: https://s3-gdigital.s3.amazonaws.com/gdigital/313/More-Tegra-Foto-DSG-Itaim-Rua-Joaquim-Floriano-Vista-area-da-Fachada-e-Avenida.webp
- Arquivo vertical medido por GitHub Actions: 1023x1537 WebP.
- Arquivo horizontal medido por GitHub Actions: 1169x533 WebP.
- O hero do experimento utiliza picture com source mobile e img fallback desktop; imagem antiga mantida nas posições secundárias da galeria/localização onde for usada.
- HTML canônico mantém OG/Twitter/JSON-LD e a rotina DOMParser conserva imagem social atualizada.

## CAPIITOLO by Piero Lissoni
- Poster/hero/OG/Twitter/JSON-LD: https://s3-gdigital.s3.amazonaws.com/gdigital/313/Fachada_Capitolo.webp
- Dimensões observadas no CI: 1400x1120 WebP.
- Iframe já existente do YouTube: iq50ei83B8U. Preservados vídeo em segundo plano após poster, delayed/idle loading, muted autoplay quando permitido, e salvaguardas mobile, Save-Data e prefers-reduced-motion.
- No comportamento existente do experimento, o filme não é carregado para telas <=700px. A presente exceção não muda essa regra; qualquer mudança requer novo aceite.

## Regressões que precisam ser verificadas
- Visual de DSG em 375px e desktop 1440px, enquadramento/corte legíveis, imagem desktop usada como fallback.
- CAPIITOLO: poster antes do vídeo e transição somente após load; falha de iframe mantém fachada.
- Form 46 e CTA permanecem funcionais (não foram modificados).
- Meta OG/Twitter e ImageObject devem apontar para imagens aprovadas; dimensões não estimadas.
- Preview/routing da composição DOMParser não foram refatorados.

## Histórico de CI
- Workflow específico: DSG CAPIITOLO hero exception PASS em run 38072593688 (testes de contrato e HTTP).
- Arquivos verificados pela GitHub Actions: 3/3 imagens S3 HTTP OK.
- Social sharing inicial ficou vermelho pela ausência de dimensões do CAPIITOLO; após medição e atualização, social sharing já passou no commit de teste e3917572.
- M5-06 CTA/Form journey falha em validadores de mapa das páginas Ledge, Soma, Zahle, YPY, Bem, Mozae, Bueno, Château, Reserva, Nova Vivere e Garden; não são arquivos modificados nesta PR.
- M4-05R falha em requisitos Home (portal-links observer e script). Home não foi alterada nesta PR.
- Antes do merge, reconciliar workflows no HEAD final e realizar QA visual. Não alegar que os checks herdados passaram.

## Estado
IMPL_CANDIDATE / DRAFT_PR / NO_PRODUCTION_RELEASE.
