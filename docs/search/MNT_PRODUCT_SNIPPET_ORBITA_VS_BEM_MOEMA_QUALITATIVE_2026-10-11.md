# SFJM — Auditoria qualitativa Google Rich Results: Órbita × Bem Moema

Data: 2026-10-11 — USER-OBSERVED + GITHUB-MAIN VERIFIED  
Status: **6 itens válidos no Bem Moema — USER_REPORTED**; Product Snippet **1 item válido em ambas — USER-PROVIDED GOOGLE TEST**; comparação qualitativa do JSON-LD confirmada na main `d5bc6dac1a90104759194d94ea940b463b08ea0a`.  
Fontes: texto copiado pelo usuário do Google Rich Results Test 11/10/2026; GitHub `src-greenn/empreendimentos/{universo-tatuape-orbita,bem-moema}/index.html` na main.

## Resultado quantitativo

- Bem Moema: Product Snippet 1 válido (rastreamento 11/10/2026, 09:05:40); usuário reportou **6 itens válidos totais** depois do release #382, sem fornecer nesta mensagem decomposição integral das outras cinco detecções. Registrar 6 como USER_REPORTED, não inferir tipos ou inventar captura.
- Órbita: Product Snippet 1 válido (11/10/2026, 07:18:10).
- Ambos: Google reporta avisos opcionais `aggregateRating`, `review` no `Product` e `availability` no `Offer`. Não adicionar ratings, reviews, stock/status ou validade não documentados.
- Nó JSON-LD total: Órbita **19**; Bem Moema **18**. Contagem de nós NÃO equivale à contagem de itens válidos Google.

## Diferença qualitativa determinante

```text
ÓRBITA
Product #product
  ├─ brand → Tegra
  ├─ offers → Offer #offer
  └─ isRelatedTo → ApartmentComplex #project
                        ├─ address → Av. Celso Garcia 5040 / CEP 03064-000
                        ├─ image → imagem primária + seis perspectivas do empreendimento
                        ├─ brand → Tegra
                        └─ accommodationFloorPlan → 4 FloorPlans

BEM MOEMA (MAIN ATUAL)
Product #product-ap0202
  ├─ brand → Tegra
  └─ offers → Offer #offer-ap0202

ApartmentComplex #project (nó SEPARADO)
  ├─ address → Av. Bem-te-vi 221 / CEP 04524-030
  ├─ image → sete entradas, COM DUPLICATA da fachada principal
  ├─ brand → Tegra
  └─ accommodationFloorPlan → 3 FloorPlans reais (80, 123, 148 m²)
```

O Bem Moema **já possui endereço, perspectivas e três plantas** na entidade `ApartmentComplex`, mas o `Product` **não inclui `isRelatedTo: {"@id": ".../bem-moema/#project"}`**. Resultado observado nos detalhes fornecidos do Google: Product expande Brand e Offer, porém NÃO expande ApartmentComplex e dados relacionados. Órbita expande os vínculos até endereço, imagens e plantas. É uma diferença comprovada de **conectividade do grafo**, não ausência dos dados.

A `ApartmentComplex.image` de Bem Moema inclui **duas entradas consecutivas idênticas** para o URL principal da fachada, depois cinco perspectivas distintas. Esse é um problema de redundância interna da galeria semântica, separado do vínculo ausente. Não confundir com a hierarquia `WebPage.image` de duas imagens distintas já validada nas 39 rotas.

## Matriz factual de Product Snippet

| Atributo | Órbita | Bem Moema |
|---|---|---|
| Produto | AP0609, 69 m² | AP0202, 80 m² |
| Preço de referência | R$ 611.685 | R$ 1.811.200 |
| Product.name/description/url | Presente | Presente |
| Product.image | Hero aprovado | Hero aprovado |
| Product.brand | Tegra | Tegra |
| Product.offers → Offer | Sim | Sim |
| Product.isRelatedTo → ApartmentComplex | **Sim** | **Não** |
| Endereço da entidade ApartmentComplex | Sim | Sim, separado |
| Imagens da entidade ApartmentComplex | Principal + 6 | 7 entradas, 1 duplicata |
| Plantas oficiais vinculadas a ApartmentComplex | 4 | 3 |
| aggregateRating, review | Ausentes (opcionais) | Ausentes (opcionais) |
| availability | Ausente (opcional) | Ausente (opcional) |

## Correção candidata estritamente delimitada (NÃO APLICADA)

Adicionar **somente** a propriedade factual `Product.isRelatedTo` ao Product AP0202 já publicado:

```json
"isRelatedTo": {
  "@id": "https://www.moretegra.com.br/empreendimentos/bem-moema/#project"
}
```

O destino `#project` **já existe** como `ApartmentComplex` e preserva o endereço correto de Bem Moema. Não copiar fotos/plantas/endereço do Órbita. Não alterar `Offer`, valores, `availability`, `aggregateRating` ou `review`.

Tratar a duplicação de imagem principal de `ApartmentComplex.image` em uma revisão separada com validador de invariância (sem alterar mídia visível, hero, OG ou o catálogo existente).

## Aceite de qualidade

1. Teste de esquema local prova que Product AP0202 vincula o `#project` do Bem Moema, e que o projeto liga endereço, sete entradas de imagem (até revisão de duplicata) e três plantas reais.
2. Congelar HTML não JSON-LD, hero/secondary, dados de atendimento in loco Avenida Bem-te-vi 221, URL da fachada, Form46, CTAs, preço de referência AP0202.
3. Só após autorização de alteração runtime e deployment, repetir Google Rich Results e **comparar expansão qualitativa**, não apenas número de itens.
4. Ausência dos três campos opcionais é deliberada até surgirem fatos válidos. Não fabricar reviews, estoque ou rating.

## Governance

Documento read-only, PR separada. Não modifica HTML nem produção. O resultado quantitativo 6 de Bem Moema é USER_REPORTED, enquanto o Product Snippet 1 válido em ambas tem texto direto fornecido pelo usuário. Mudanças materiais requerem branch/PR, testes, merge aprovado, SHA production e rollback.
