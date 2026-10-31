# Complexo Viário Lapa–Pirituba — implementação LVR

## Escopo autorizado
Portal público em `/complexo-lapa-pirituba/` no MoreNumTegra, com 17 trajetos baseados EXCLUSIVAMENTE nas páginas 19 a 35 de **Operação Urbana Consorciada Água Branca — Projeto Viário Pirituba Lapa**, SPObras, agosto/2019 (71 páginas), fornecido pelo proprietário.

## Pipeline / governança
- GitHub `main`: fonte integrada.
- Desenvolvimento nesta branch isolada; validação **Live Sync LVR**, não Preview.
- `vercel.json` atual bloqueia deploy de branches não-main. **Não modificar essa proteção** apenas para facilitar teste.
- Merge/publicação não autorizados antes de aceite funcional LVR, teste dos 17 caminhos e rollback documentado.
- Não alterar catálogo, Form 46, tracking, páginas comerciais, robots/sitemap sem gate próprio.

## Inventário exato dos mapas
| Página | Percurso |
|---:|---|
| 19 | Lapa → Pirituba |
| 20 | Pirituba → Lapa |
| 21 | Ayrton Senna → Pirituba |
| 22 | Ayrton Senna → Lapa |
| 23 | Lapa → Marginal Pinheiros |
| 24 | Pirituba → Marginal Pinheiros |
| 25 | Pirituba → Piqueri |
| 26 | Pirituba → Ayrton Senna |
| 27 | Marginal Pinheiros → Pirituba |
| 28 | Retornos condomínios → Lapa |
| 29 | Lapa → Ayrton Senna |
| 30 | Lapa → Condomínios Vila Anastácio |
| 31 | Av. Raimundo → Av. Mercedes |
| 32 | Av. Mercedes → Av. Raimundo |
| 33 | Av. Raimundo → Rua Diogo Ortiz |
| 34 | Rua Diogo Ortiz → Av. Raimundo |
| 35 | Acesso CPTM Estação Piqueri |

## Animação sem alteração de geometria
O SVG sobreposto deve ter exatamente o mesmo sistema de coordenadas da imagem e seguir a linha pontilhada original; a direção da animação deve seguir a seta indicada no PDF. Para cada mapa: armazenar imagem, viewBox, path validado, origem, destino e evidência visual. Até a revisão geométrica LVR, não declarar o traçado animado como fiel.

## Fontes e integridade
PDF é **de agosto de 2019**, ainda que o nome do arquivo indique 2026. Não confundir orçamento, cronograma e imagens ilustrativas históricos com status atual. Site informativo independente, não publicação oficial da Prefeitura.

## Bloqueios técnicos nesta sessão
- O protótipo HTML com 17 JPGs e sete perspectivas existe no artefato de trabalho da conversa, mas **os binários ainda não foram transferidos para GitHub**. Não criar página com imagens quebradas.
- Não é possível afirmar validação LVR, CI, URL pública ou edição de `main` nesta etapa.
- Próximo lote: enviar mídias autorizadas com integridade, implementar SVG paths conferidos e executar LVR antes do PR de release.
