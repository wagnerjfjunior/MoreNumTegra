# Consolidação Comercial Tegra — Agosto/2026

> Documento interno de revalidação. Não autoriza publicação automática em Vercel, Green Sales ou mídia comercial.

## 1. Âncora e fontes

- `main` usada como base: `d0f990a907700b7e2bb3bd9902ec243274e6c166`
- commit que adicionou as tabelas da coordenação: `Tabelas Coordenação`
- fontes de preço/condição: `Tegra/Agosto/Tabela_Coordenação/*.pdf`
- cross-check quando existente: `Tegra/Agosto/Tabela/*.pdf`
- fonte de disponibilidade: `Tegra/Agosto/Espelho/*.pdf` e, para Ledge, `ANAPRO - Disponibilidade.pdf` / `Safari.pdf`
- quarta camada: tabela do proprietário usada para comparação histórica.

### Hierarquia operacional

1. **Coordenação** para preço/condição comercial atual;
2. **Tabela Tegra** como cross-check de unidade/valor quando disponível;
3. **Espelho/ANAPRO** para disponibilidade;
4. **Tabela do proprietário** como referência histórica/comparativa.

Não inferir disponibilidade a partir de uma tabela de preços e não inferir preço a partir de um espelho.

## 2. Regra de locale monetário

As fontes misturam convenções:

- coordenação: predominantemente pt-BR, por exemplo `R$ 1.818.290,32`;
- tabela do proprietário: pt-BR, por exemplo `R$ 17.856,00`;
- PDFs Tegra anteriores: valores extraídos no padrão en-US, por exemplo `$610,101.25`.

A conversão deve preservar o texto original, detectar o locale da fonte, normalizar para número neutro e somente então calcular `R$/m²` ou diferenças. Strings ambíguas como `1.000` ou `1,000`, sem contexto, devem ser bloqueadas.

## 3. Reconciliação

| Empreendimento / unidade | Referência anterior | Coordenação AGO/26 | Disponibilidade | Classificação | Observação |
|---|---|---|---|---|---|
| Château Jardin | — | — | — | SEM FONTE ATUAL | Não há PDF de coordenação no lote atual. |
| Nova Vivere | Tabela -8% | Tabela comercial AGO/26 | — | REGRA PENDENTE | PDF é `Versão Comercial`; -8% não aparece explicitamente. Não descontar novamente sem confirmação. |
| Caminhos da Lapa Elo Duo | R$ 10.730/m² + 3 meses condomínio | AP0109 68,64 m² / R$ 723.437,56 / R$ 10.539,59/m² | Torre B 18 + Torre A 1 disponíveis | ATUALIZAR | Preço ~1,8% menor; promoção de 3 meses não localizada no PDF. |
| Garden Design | Tabela -8% | Tabela lançamento AGO/26 | — | REGRA PENDENTE | -8% não aparece explicitamente no PDF. |
| Ampère Brooklin | — | Separar Residencial e Studios/NR | 33 + 33 disponíveis | DIVIDIR PRODUTO | Não usar uma única linha/ticket para os dois produtos. |
| Mozae Higienópolis | AP0301 R$ 15.685/m² | AP0301 46,15 m² / R$ 956.884 / R$ 20.734,21/m² | Não reconciliado por unidade | DIVERGENTE +32,2% | Atualizar preço. |
| Universo Tatuapé Órbita | AP0609 R$ 8.865/m² | AP0609 68,83 m² / R$ 610.101 / R$ 8.863,88/m² | 118 disponíveis no empreendimento | CONFIRMADO | Diferença ~-0,01%. |
| Ária Higienópolis AP1214 | R$ 17.856/m² | AP1214 53,53 m² / R$ 955.822 / R$ 17.855,82/m² | Confirmar unidade específica | CONFIRMADO | Tabela Tegra anterior também é consistente. |
| Ária Higienópolis Studio 510 | R$ 16.700/m² | Sem linha de preço atual localizada | Não inferir | VALIDAR | AP0510 aparece na malha, mas preço atual não foi confirmado. |
| Bem Moema Residencial | AP0202 R$ 22.640/m² | AP0202 80,31 m² / R$ 1.818.290,32 / R$ 22.640,90/m² | 4 residenciais disponíveis | CONFIRMADO | Diferença ~0,004%. |
| Bem Moema Studios/Offices | SU1702 R$ 18.200/m² | SU1702 26,77 m² / R$ 773.851,27 / R$ 28.907,41/m² | 86 disponíveis no bloco | DIVERGENTE +58,8% | Área correta da fonte é 26,77 m². |
| Soma Perdizes | Esgotado | Tabela coordenação AGO/26 existente | 15 disponíveis | STATUS DESATUALIZADO | Remover Esgotado. |
| Zahle Jardins | — | Tabela comercial vigente | Comercial 9; Residencial 0 | DIVIDIR PRODUTO | Comercial e residencial têm situações distintas. |
| Bueno Brandão 257 | Unid. 31 / R$ 43.500/m² | Unid. 31 = 3º andar / 500 m² / R$ 33.030.000 / R$ 66.060/m² | Torre A 5 disponíveis | DIVERGENTE +51,9% | Tabela da coordenação resolve a mistura Bueno/Tièl do PDF oficial agregado. |
| CAPIITOLO | Unid. 24 / R$ 17.369/m² | 2º andar/final 4 / 210,08 m² / ~R$ 4.904.379 / R$ 23.345,29/m² | 70 disponíveis no empreendimento | DIVERGENTE +34,4% | Tabela Tegra anterior confirma praticamente o mesmo total. |
| DSG Itaim | Esgotado | Tabela coordenação AGO/26 existente | 6 disponíveis | STATUS DESATUALIZADO | Remover Esgotado. |
| Ledge Brooklin | U-1223 R$ 17.116/m² / R$ 1.199.000 | U-1223 70,05 m² / R$ 1.360.228,16 / R$ 19.417,96/m² | Disponível em Safari/ANAPRO | DIVERGENTE +13,4% | Atualizar preço. |
| Ledge Brooklin Studios | S-0052 R$ 16.666/m² / R$ 600.000 | S-0052 36,40 m² / R$ 629.165,51 / R$ 17.284,77/m² | Disponível em Safari/ANAPRO | ATUALIZAR +3,7% | Atualizar preço e área. |
| TEG Sacomã | — | Sem tabela coordenação específica no lote | 4 disponíveis | ATUALIZAR STATUS | Preço permanece Sob consulta. |
| Tièl Vila Nova Conceição | Unid. 914 R$ 28.500/m² | 9º andar/final 14 / 20,78 m² / R$ 835.200 / R$ 40.192,49/m² | 72 disponíveis no bloco | DIVERGENTE +41,0% | Atualizar preço; confirmar SU0914 específica. |
| YPY Alto do Ipiranga | AP0207 R$ 11.025/m² | AP0207 65,73 m² / R$ 724.666 / R$ 11.024,89/m² | 88 disponíveis no empreendimento | CONFIRMADO | Corrige a classificação anterior: o valor da sua tabela está certo para a AP0207. |

## 4. Regras de publicação

- `CONFIRMADO` significa que preço/unidade foram localizados na tabela da coordenação e são numericamente consistentes com a referência comparada; ainda assim, confirmar disponibilidade da **unidade específica** antes de anunciá-la.
- `DIVERGENTE` significa que a referência histórica não deve ser usada como preço atual.
- `STATUS DESATUALIZADO` significa que a anotação de estoque conflita com o espelho atual.
- `REGRA PENDENTE` significa que a condição comercial anotada não aparece explicitamente no PDF da coordenação.
- `DIVIDIR PRODUTO` significa que o empreendimento agrega produtos com estoque/ticket distintos e não deve ser publicado com uma única referência.
- Casos sem fonte atual ou com ambiguidade permanecem `Sob consulta`/omitidos.

## 5. Pontos que corrigem a consolidação anterior

- YPY AP0207 está **confirmado** em aproximadamente R$ 11.025/m²; a comparação anterior por menor unidade do bloco era inadequada.
- Bem Moema AP0202 está **confirmado** em aproximadamente R$ 22.641/m².
- Bueno Brandão agora possui tabela específica da coordenação; o preço da unidade 31 pode ser analisado sem herdar o bloco Tièl.
- Nova Vivere, Garden Design, Mozae e Ledge agora têm fonte de coordenação, mas as regras de desconto/promocionais continuam condicionadas ao que está explicitamente documentado.
