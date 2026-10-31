# Complexo Lapa–Pirituba — execução parcial de mídia e rotas, 31/10/2026

## Evidência local
- PDF original da Prefeitura / SPObras de agosto de 2019, 71 páginas, já fornecido.
- 17 mapas de circulação (páginas 19–35) extraídos como imagens 1200×849 e convertidos para WebP.
- 7 perspectivas (páginas 64–70) convertidas para WebP.
- Artefato local separado inclui HTML e as 24 imagens otimizadas, aproximadamente 1,4 MB em ZIP.
- Dois paths SVG **candidatos** (páginas 19/20) renderizam uma animação demonstrativa; direção e geometria precisam de checagem visual LVR. Não marcar PASS.
- Demais 15 paths: NÃO VETORIZADOS.

## Restrição de integração
A ação GitHub disponível nesta sessão aceita conteúdo de texto/base64, mas não um arquivo binário local como entrada direta. A inexistência de origem de mídia autorizada transferível impede subir as 24 imagens WebP por essa interface. Não expor URL fictícia ou apontar a LVR para assets inexistentes. O usuário NÃO precisa reenviar o PDF para a conversa.

## Situação GitHub
- PR #527 é draft e não foi mergeada.
- `src-greenn/complexo-lapa-pirituba/routes-verified.json` contém dois paths candidatos, ambos `verified:false`.
- Media ainda NÃO publicada no GitHub/GDigital.
- Frontend do GitHub continua apresentando ausência de mapa até asset real ficar disponível.
- Nenhum status LVR/Production pode ser declarado PASS.

## Próximo gate
- Fazer ingestão das WebP em `src-greenn/complexo-lapa-pirituba/assets/` ou na origem GDigital aprovada.
- Conectar o frontend ao manifesto de mídias e mostrar os 17 mapas.
- Conferir path a path origem, sentido, curvas, setas e alinhamento no LVR.
- Completar 17 SVGs, testes mobile/desktop e atualizar PR; só então considerar merge e publicação.
