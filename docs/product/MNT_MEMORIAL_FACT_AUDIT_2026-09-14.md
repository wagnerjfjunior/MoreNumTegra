# MoreNumTegra — Auditoria dos Memoriais Descritivos

- Data: `2026-09-14`
- Base canônica auditada: `122e26225bbf7e33d803dde00ea85a281838a321`
- Fonte: `Tegra/Memoriais_Descritivos/`
- Escopo: inventário documental, extração de texto nativo, cobertura do catálogo governado, comparação com `src-greenn/moretegra.js` e criação de evidência técnica complementar.
- Método: `pdftotext -layout` executado de forma reproduzível; **OCR não foi usado**.
- Regra: memorial descritivo é evidência técnica primária, mas não prova preço, estoque, disponibilidade, promoção ou condição comercial vigente.

## Resumo executivo

Foram encontrados **51 PDFs**, representando **40 famílias documentais**.

No universo de **21 projetos governados no Product Fact Registry / catálogo atual**:

- **15/21** têm memorial corretamente associado e com camada de texto nativa utilizável;
- **4/21** não possuem memorial no diretório: `nova-vivere`, `garden-design`, `mozae-higienopolis`, `tiel-vila-nova-conceicao`;
- **1/21** (`ledge-brooklin`) possui PDFs, mas a camada de texto é insuficiente (`148` e `44` bytes extraídos), portanto requer OCR pontual ou substituição por PDF com texto nativo antes de auditoria de conteúdo;
- **1/21** (`zahle-jardins`) está **materialmente inválido como fonte**: seu PDF é byte-a-byte idêntico ao de `YPY Alto do Ipiranga` e o texto extraído identifica `Rua Gama Lobo, nº 1884 - Ipiranga`, isto é, conteúdo de YPY.

## Finding crítico — Zahle

`YPY Alto do Ipiranga-Memorial Descritivo.pdf` e `Zahle Jardins-Memorial Descritivo.pdf` possuem o mesmo SHA-256:

`3f0140e46c530d43ffa66667f453fa489e8d5b7b914cdca7f0b7b3a5228187d2`

Logo, o arquivo atualmente nomeado como Zahle **não pode ser usado** como evidência de Zahle. A correção segura é substituir esse PDF pelo memorial correto; até lá, Zahle continua dependente das demais evidências governadas.

## Relação memorial x runtime

Os memoriais provaram ser especialmente ricos para:

- endereço técnico;
- implantação, torres/subcondomínios e composição do empreendimento;
- piscinas e dimensões de raias quando expressas;
- lazer e áreas comuns;
- infraestrutura de ar-condicionado;
- gerador;
- segurança;
- sistemas elétricos/hidráulicos;
- aquecimento;
- acabamentos;
- esquadrias;
- sustentabilidade;
- infraestrutura técnica das unidades.

Por outro lado, **a maioria dos memoriais não repete a faixa comercial de metragem usada nos cards**. Isso não constitui contradição. Dos valores de área exibidos atualmente no `info` do runtime, apenas `Bem Moema` apresenta no memorial, de forma explícita e conjunta, `80m²`, `123m²` e `148m²`; `DSG Itaim` confirma explicitamente `44m²`, mas não os `27m²` e `29m²` no mesmo memorial residencial analisado.

Portanto, as metragens comerciais dos demais cards **não devem ser reclassificadas como erradas por ausência no memorial**. Elas continuam dependentes das fontes comerciais/registry aplicáveis.

## Enriquecimento de alto valor identificado

A extração revela material factual suficiente para enriquecer futuras páginas individuais sem inventar conteúdo. Exemplos já observados diretamente:

- **Ampère Brooklin:** endereço técnico; implantação mista; piscina adulta descoberta com raia de 25 m + infantil; coworking; fitness; segurança e infraestrutura técnica.
- **Universo Tatuapé Órbita:** Av. Celso Garcia, 5000; piscina adulta com raia de 25 m + infantil; coworking; fitness; churrasqueira/pool bar; gerador.
- **Ária Higienópolis:** Rua Cel. José Eusébio, 145; piscina adulta com borda infinita e raia de 25 m; coworking; fitness; sauna.
- **Bem Moema:** Av. Bem-te-vi, 221; o memorial confirma explicitamente as famílias `80m²`, `123m²` e `148m²`; duas piscinas e infraestrutura de lazer.
- **Soma Perdizes:** Av. Sumaré, 179; piscina adulta com raia de 25 m; coworking; fitness; churrasqueira; sauna.
- **Bueno Brandão 257:** Rua Bueno Brandão, 257 / Rua Jacques Félix, 309; piscinas coberta e descoberta; tratamento de ozônio; churrasqueira com grelha argentina; placas solares para climatização da piscina.
- **CAPIITOLO:** Rua Ibaragui Nissui, 166; três piscinas, incluindo raia adulta de 25 m e piscina coberta com correnteza, spa e sistema solar.
- **TEG Sacomã:** endereço técnico; piscinas adulta/infantil; quadra recreativa; churrasqueiras; fitness e sistemas técnicos.
- **YPY Alto do Ipiranga:** Rua Gama Lobo, 1884; piscina adulta com raia de 20 m + infantil; coworking; fitness; churrasqueira e gerador.
- **ODE Perdizes:** Rua Bartira, 856; piscinas; fitness; churrasqueira gourmet; sistema solar de aquecimento de água e gerador.

Estes são **candidatos de Product Truth**, não publicação automática. Antes de irem para copy/schema, cada claim deve manter referência ao memorial e respeitar o owner/page contract.

## Lacunas

1. `nova-vivere`: sem memorial.
2. `garden-design`: sem memorial.
3. `mozae-higienopolis`: sem memorial; existe suplemento governado específico para metragem.
4. `tiel-vila-nova-conceicao`: sem memorial.
5. `ledge-brooklin`: PDFs presentes, porém sem texto nativo suficiente.
6. `zahle-jardins`: arquivo atual é duplicata binária de YPY e deve ser substituído.

## Artefatos desta auditoria

- `MNT_MEMORIAL_SOURCE_INVENTORY_2026-09-14.csv` — inventário completo dos 51 PDFs, hash, tamanho, extração e duplicidade.
- `MNT_MEMORIAL_RUNTIME_COVERAGE_2026-09-14.csv` — matriz dos 21 projetos atuais versus memorial/runtime.
- `MNT_MEMORIAL_TECHNICAL_FACT_CANDIDATES_2026-09-14.csv` — fatos técnicos candidatos extraídos por categoria, sempre marcados como candidatos antes de publicação.
- `MNT_MEMORIAL_HIGH_VALUE_ENRICHMENT_2026-09-14.csv` — shortlist de enriquecimentos estáticos com maior valor para futuras páginas.

## Decisão de governança

Esta auditoria **não sobrescreve** o M3-04 Product Fact Registry comercial. Ela cria uma camada complementar de evidência técnica. Preço, disponibilidade, estoque, estágio comercial e promoções continuam sujeitos à evidência comercial/revalidação definida no registry existente.

A próxima utilização segura destes dados é nas páginas/projetos governados, com vínculo explícito `claim -> memorial -> arquivo/hash`, e nunca como generalização para outro empreendimento.
