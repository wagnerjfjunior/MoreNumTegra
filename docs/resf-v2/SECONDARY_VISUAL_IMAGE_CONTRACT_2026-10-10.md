# SEO — contrato de imagem secundária visível (2026-10-10)

Status: CANDIDATE / PR DRAFT / SEM ALTERAÇÃO DE RUNTIME

## Decisão editorial

Cada rota comercial deve considerar **a primeira imagem de conteúdo efetivamente exibida após o HERO** como candidata a imagem secundária de página. Isso NÃO significa "segundo item da galeria", "segunda URL de ApartmentComplex.image" ou logo no cabeçalho. O HERO aprovado continua proprietário de `WebPage.primaryImageOfPage`, `og:image` e `twitter:image`.

- Fonte: HTML da rota, escopado a `<main>`; descartar logo, fotos da corretora, cards de produtos, ícones, planta não identificada ou imagens de rodapé. Conferir ordem de renderização quando CSS/JS puder alterá-la.
- Segundo `img` no código-fonte é **candidato**, não verdade absoluta da posição visual. Revisar cada exceção.
- Só registrar imagem secundária se tiver URL REAL distinta do HERO; não duplicar `ImageObject` de `#primary-image`, não trocar URL/crop/ALT do conteúdo visível.
- O tipo Schema.org e relacionamento devem refletir os fatos: imagem da Rua Jardim representa contexto urbano do Caminhos da Lapa, não uma instalação privada de um empreendimento; planta de Ária representa uma planta, não uma perspectiva da fachada.
- Em JSON-LD, preservar o nó primário e, quando aprovado em PR específica, adicionar `ImageObject` secundário com `@id` distinto (`#secondary-image`) e `contentUrl` idêntico à imagem visível. O nó `WebPage.image` pode conter ambos, preservando ordem primary/secondary. Não alterar `primaryImageOfPage`.
- Não acrescentar a nova imagem em `Product.image` ou `ApartmentComplex.image` sem prova de relação factual e validação de compatibilidade. Imagem de bairro/contexto urbano pertence primeiro a `WebPage`.
- O Google pode escolher qualquer miniatura; marcação adicional não garante exibição de ambas.

## Resultado de inspeção estática inicial

Escopo: 25 arquivos de empreendimentos + 13 páginas de região. **Duas rotas de empreendimentos (DSG Itaim e CAPIITOLO) são EXCLUDED_FROM_RESF_V2**; usam composição dinâmica, não entram automaticamente no rollout nem na exigência de segunda imagem.

Das 13 páginas regionais inspecionadas, **cinco repetem a própria URL principal no segundo elemento de imagem do conteúdo**:
- `/regioes/alto-do-ipiranga/`
- `/regioes/chacara-klabin/`
- `/regioes/itaim-bibi/`
- `/regioes/sacoma/`
- `/regioes/tatuape/`

Estas cinco NÃO podem ganhar um `#secondary-image` distinto reutilizando a URL do HERO; é necessário identificar imagem visual própria, já publicada e aprovada, antes de marcar.

Outros casos de revisão:
- `/empreendimentos/aria-higienopolis/`: segunda imagem-fonte é **planta oficial de 1 dormitório**. A semântica deve continuar sendo de planta, não fachada.
- `/empreendimentos/nova-vivere/`, `/empreendimentos/garden-design/` e `/empreendimentos/caminhos-da-lapa-elo-duo/`: segunda imagem-fonte é imagem da **Rua Jardim / contexto urbano** do complexo, não fotografia exclusiva de uma unidade/torre.
- Páginas de região com fonte `<picture>` podem ter `srcset` mobile; registrar o `img src` como fallback canônico somente quando a equivalência visual for comprovada.

## Implementação gated

1. Manter este contrato e a análise fonte em PR documental separada (sem saída em produção).
2. Resolver integração da PR #372 de Órbita (grafo comercial com 18 nós) e a dependência #364 → #366 (ownership), reconciliando freeze validators com endereços da #368.
3. Implantar `#secondary-image` somente em branch de runtime própria, testando por rota: HERO proprietário, URL secundária exata, sem duplicatas, presença no conteúdo visível, preservação de Form46, consentimento, OG, Twitter, FAQ, endereços, Price/Offer e FloorPlan.
4. Homologar em Preview, Rich Results/Schema Markup Validator, conferir HEAD/checks e rollback antes de autorização explícita de merge/deploy.
5. Não reabrir LCP/performance.

Este documento **não certifica cobertura 38/38**: existem duplicatas, exceções e páginas dinâmicas. O script de auditoria de fonte deverá gerar relatório por rota e forçar revisão manual da segunda imagem em vez de transformar convenção DOM em verdade factual.
