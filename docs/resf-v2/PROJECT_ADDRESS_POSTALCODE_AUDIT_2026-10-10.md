# Auditoria READ-ONLY — Endereço/CEP dos 23 empreendimentos RESF V2
Data: 2026-10-10
Baseline: `main` `9c8bdc74cb83dc9c9566f87d9288daf25f10c051`
Status: EVIDÊNCIA DO CÓDIGO-FONTE / PENDENTE VALIDAÇÃO CADASTRAL EXTERNA
Escopo: 23 rotas comerciais da lista de imagens homologadas. DSG e CAPIITOLO EXCLUÍDOS.

## Resultado da inspeção de JSON-LD no HTML de `main`
- **7/23** `ApartmentComplex.address` com `streetAddress` e `postalCode`.
- **8/23** `ApartmentComplex.address` com `streetAddress` e SEM `postalCode`.
- **8/23** sem endereço do empreendimento no JSON-LD (mesmo havendo endereço textual no rodapé).
- 16/23 necessitam investigação e eventual preenchimento controlado.
- Valores de CEP encontrados nos 7 registros são **presença/forma de dado no código**, não comprovação independente do cadastro Correios.

| Empreendimento | Rua e número exibidos no HTML / endereço do projeto quando presente | CEP do empreendimento em `ApartmentComplex` | Diagnóstico |
|---|---|---|---|
| Ampère Brooklin | Rua André Ampére, 136 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Ária Higienópolis | Rua Coronel José Eusébio, 145 | 01239-030 | `ESTRUTURA_COMPLETA` |
| Ayla Moema Studio & Office | Avenida Chibarás, 75 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Bem Moema Studios & Offices | Alameda dos Arapanés, 1.241 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Bem Moema | Avenida Bem-te-vi, 221 | — | `SEM_CEP_JSONLD` |
| Bueno Brandão 257 | Rua Bueno Brandão, 257 | — | `SEM_CEP_JSONLD` |
| Elo Duo Caminhos da Lapa | Rua Fortunato Ferraz, 365 | — | `SEM_CEP_JSONLD / ESTANDE_DIFERENTE` |
| Château Jardin | Rua Ministro Nelson Hungria, 400 | 05690-050 | `ESTRUTURA_COMPLETA` |
| Chez Vous Moema | Avenida Rouxinol, 1017 | — | `SEM_CEP_JSONLD` |
| Garden Design | Rua Fortunato Ferraz, 625 | 05093-000 | `ESTRUTURA_COMPLETA` |
| Key Moema | Avenida dos Imarés, 160 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Ledge Brooklin | Avenida Nova Independência, 110 | 04570-000 | `ESTRUTURA_COMPLETA` |
| Mozae Higienópolis | Rua Conselheiro Brotero, 832 | 01232-010 | `ESTRUTURA_COMPLETA` |
| Nova Vivere | Rua Fortunato Ferraz, 625 | 05093-000 | `ESTRUTURA_COMPLETA` |
| ODE Perdizes | Rua Bartira, 856 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Reserva Caminhos da Lapa | Rua Fortunato Ferraz, 280 | 05093-000 | `ESTRUTURA_COMPLETA` |
| Soma Perdizes | Avenida Sumaré, 179 | — | `SEM_CEP_JSONLD` |
| TEG Sacomã | Rua Malvina Ferrara Samarone, 195 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Tièl Vila Nova Conceição | Rua Jacques Félix, 309 | — | `SEM_CEP_JSONLD` |
| Universo Tatuapé Órbita | Avenida Celso Garcia, 5040 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| Viso Moema | Avenida Lavandisca, 627 | — | `ENDERECO_AUSENTE_NO_JSONLD` |
| YPY Alto do Ipiranga | Rua Marquês de Olinda, 336 | — | `SEM_CEP_JSONLD` |
| Zahle Jardins | Rua Osório Duque Estrada, 40 | — | `SEM_CEP_JSONLD` |

## Casos que não devem ser preenchidos por cópia
- Elo Duo: `ApartmentComplex.address.streetAddress` = **Rua Fortunato Ferraz, 365**, sem CEP; `Place` do estande e `RealEstateAgent` indicam **Rua Fortunato Ferraz, 625, CEP 05093-000**. Esses endereços têm finalidades distintas; CEP do estande NÃO foi comprovado para o empreendimento.
- Garden Design e Nova Vivere: `ApartmentComplex` com Rua Fortunato Ferraz, **625**, CEP 05093-000.
- Reserva: `ApartmentComplex` com Rua Fortunato Ferraz, **280**, CEP 05093-000. CEP igual não é automaticamente incorreto, mas precisa de validação cadastral por endereço.
- Alguns dígitos em nomes de arquivos/imagens podem parecer CEP, mas não são; o teste deve ler apenas `PostalAddress.postalCode`.

## Regra de aceitação
1. Confirmar externamente cada `streetAddress`/número + CEP em fonte confiável (ex.: consulta Correios ou documentação oficial do empreendimento), registrando URL, data, trecho e origem.
2. Confirmar se a referência é **empreendimento**, **estande**, **escritório comercial**, **portaria** ou endereço de correspondência. Não misturar as entidades.
3. Se CEP oficial não for encontrado ou persistir divergência, manter `CEP_PENDENTE` — não adivinhar ou atribuir por bairro/CEP de rua próxima.
4. Corrigir apenas por PR isolada após evidência, preservando tipos/quantidades/identificadores das entidades JSON-LD já homologadas. Para rotas sem endereço, considerar preencher `ApartmentComplex.address` existente ou enriquecer essa entidade somente após comprovação, sem criar tipos extras.
5. Revisar interface e JSON-LD para consistência factual; não abrir mapa com endereço exato caso política comercial da rota proíba.
6. Não publicar nem solicitar recrawl até o release consolidado aprovado.

Esta auditoria comprova a estrutura do código e os valores literais. **Não comprova que todos os endereços exibidos ou os sete CEPs sejam oficialmente corretos.**
