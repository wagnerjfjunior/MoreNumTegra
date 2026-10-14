# RESF — PR #405 — Reconciliação CI Mozae — 2026-10-14

## Escopo e fonte
- Repositório canônico `wagnerjfjunior/MoreNumTegra`.
- Branch `fix/mozae-sabrina-stand-intent-20261014`, PR #405.
- Mudança visível exclusiva no bloco de atendimento da página `src-greenn/empreendimentos/mozae-higienopolis/index.html`: solicitação explícita de atendimento Sabrina da Tegra no estande e link WhatsApp +55 11 96077-9328 para agendamento.
- Sem alterações nos preços, Form 46, JSON-LD, imagens, tracking ou outras páginas.

## Proteção `postal` reconciliada
A regra antiga, em `scripts/validate-resf-v2-postal-address-contract.mjs:436`, comparava rigidamente todo o HTML não-JSON-LD e reprovava até a frase autorizada no bloco de atendimento.

Exceção explícita e estritamente delimitada ao slug `mozae-higienopolis`:
1. Exige exatamente uma ocorrência do HTML autorizado com nome e link WhatsApp.
2. Exige que a frase não estivesse presente na referência histórica.
3. Remove exclusivamente esse fragmento para a comparação e exige igualdade integral de todo o HTML restante com o congelamento original.
4. Os mesmos validadores continuam aplicados a todas as outras páginas. Não desativar a proteção nem atualizar baselines globais.

**Evidência:** check `postal` do commit `93d9e13a21702f1227aaa286670481a1cd52359f` = `success`.

## Falhas `validate` anteriores à PR
Comparamos o log da workflow **M5-06 CTA/Form journey**, `main`, run `38142650445`, job `114479494798`, **2026-10-11**, com o check `validate` da PR #405, job `115999903448`, **2026-10-14**. Ambos reportaram exatamente as mesmas **16 falhas**, sem novas falhas:
- 5 itens de CTAs e opção controlada: Bem Moema (3), Reserva (1), Garden Design (1).
- 11 itens de mapa regional: Ledge, Soma, Zahle, YPY, Bem, Mozae, Bueno, Château, Reserva, Nova Vivere, Garden Design.

**Classificação:** `PRE_EXISTING_VALIDATOR_DEBT`, NÃO `PASS`. Esta PR não resolve nem oculta o débito transversal de mapas e CTAs; requer gate próprio, já documentado no SFJM, para qualquer alteração nesses itens.

## Testes da PR #405 (commit 93d9e13a...)
- `postal`: PASS.
- `Validate commercial page standard`: PASS.
- `onsite-address`: PASS.
- `coverage`: PASS.
- `images`: PASS.
- `Validate canonical favicon`: PASS.
- `Validate Open Graph and Twitter metadata`: PASS.
- `validate`: FAIL, 16 falhas preexistentes idênticas ao log de main 2026-10-11.
- `Mermaid Diagram Sync Assistant`: SKIPPED.

## Gates de release ainda necessários
- Inspeção visual mobile e desktop do texto/CTA, teste do deep-link WhatsApp com número correto.
- Conferir funcionamento do Form 46 sem gerar lead de teste desnecessário, e ausência de regressões de conversão.
- Aprovação de merge pela Product Authority segundo contrato SFJM. Não alegar Preview visual ou teste live não executado.
- Após merge, verificar SHA de produção Vercel, HTTP/HTML real, CTA e registrar evidência/rollback.
- `validate` permanece falhando no repositório, apesar da ausência comprovada de regressão provocada pela PR.

## Decisão
**Correção de código e proteção concluída na branch; publicação ainda não certificada.** Não falsificar green CI, não efetuar merge automático enquanto faltarem os gates acima.

## 2026-10-14 — complementação RESF de localização e Form46 (autorização direta)

O operador constatou duas faltas materiais que a PR #405 anterior não cobriu: **três fotografias reais do bairro de Higienópolis** sob o título "Higienópolis, entre tradição e mobilidade" e **formulário claro** (o card ainda estava preto). A correção foi implementada na própria branch #405, sem alterar IDs, valores ocultos, endpoints ou lógica de formulário.

### Alterações aprovadas delimitadas
1. Galeria contextual antes do mapa da região, três imagens de locais verificáveis em Higienópolis, `loading="lazy"`, dimensões, legendas e crédito de direitos, sem apresentá-las como instalações do empreendimento:
   - Parque Buenos Aires: `Parque Buenos Aires 01.JPG`, Dornicke, CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Parque_Buenos_Aires_01.JPG
   - Praça Vilaboim: `Praça Vilaboim - São Paulo - 20240914153652.jpg`, TamiresAnsanelo, CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Pra%C3%A7a_Vilaboim_-_S%C3%A3o_Paulo_-_20240914153652.jpg
   - Arquitetura da Avenida Angélica: `Imóvel à Avenida Angélica, nº 1647 - São Paulo - 20240914160011.jpg`, TamiresAnsanelo, CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Im%C3%B3vel_%C3%A0_Avenida_Ang%C3%A9lica%2C_n%C2%BA_1647_-_S%C3%A3o_Paulo_-_20240914160011.jpg
2. `<section class="lead mt-conversion-form" id="formulario">` e CSS escopado: seção clara `#f4f1e9`, card branco `#fff`, campos claros, estados de foco/erro, duas colunas responsivas e CTA amarelo; preservado `#moretegra-lead-form`, `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`.
3. `scripts/validate-resf-v2-postal-address-contract.mjs` nesta PR valida a presença exata e única dos fragmentos comerciais/fotográficos/CSS aprovados e igualdade integral do HTML restante com baseline histórico. A futura PR #406 já separa HTML de PostalAddress e foi sincronizada para reconhecer tanto a versão legada quanto o pacote completo, nunca estado parcial. Os dois PRs permanecem independentes até decisão de integração.

### Validação e limites
- `postal` passou no commit `2645cbd8cea4bec4b2941315f7113e6739105b96` depois de correção de um caractere de newline na inserção de CSS.
- `validate` ainda apresenta as 16 falhas históricas de mapas/CTA vistas também em `main` antes desta PR; não declarar como PASS.
- QA mobile/desktop de renderização, carregamento efetivo dos três arquivos pela origem Wikimedia, contraste real, funcionamento WhatsApp/Form46 e deployment production **não certificados nesta etapa**.
- Não realizar merge sem avaliação da Product Authority e evidência dos gates aplicáveis.

## 2026-10-14 — dois logotipos fornecidos pela Product Authority

Foram recebidas URLs de mídia hospedadas no diretório GDigital tenant 313, aprovadas pelo operador para as assinaturas institucionais:
- **LE Arquitetos** (Arquitetura): `https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTegra-Mozae-Arquitetura-Logo_Le_Arquitetos.webp`
- **Cardim Arquitetura Paisagística** (Paisagismo): `https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTEgra-Mozae-Paisagismo-Cardim.webp`

Integradas somente aos respectivos créditos na seção de autoria, com texto institucional preservado, imagens lazy, alt descritivo e CSS escopado. Os outros dois créditos (Suíte Arquitetos; mural de Isabel Ruas) permanecem textuais até entrega de ativos específicos. Sem incorporação de imagens de outros projetos.

Foi acrescentada exceção **literal e limitada a esses dois arquivos e CSS** na proteção de HTML do branch #405 e sincronizada no validador de regressão separado da PR #406. Mudanças adicionais permanecem proibidas.

**Evidência HTTP dos assets:** a checagem externa automática não conseguiu confirmar status/content-type desta origem nesta sessão. O QA visual e a disponibilidade real dos arquivos devem ser verificados no Local Live Sync antes do release. Não registrar `ASSET_HTTP_PASS` sem prova.

## 2026-10-14 — Autoria arquitetônica RESF: teste visual solicitado

Após QA do operador em screenshots desktop/mobile, os créditos sem texto e com logomarcas ilegíveis foram reestruturados numa seção editorial responsiva. A nova versão foi implementada e liberada **apenas na branch de teste**, sem merge ou publicação.

- Título: `Arquitetura e design do Mozae Higienópolis`; introdução para compradores, quatro cards e descrições de atribuições verificadas.
- LE Arquitetos: logo fornecido pelo operador, sem repetir nome em título no card; papel `Arquitetura`.
- Suíte Arquitetos: novo logo fornecido `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Suite-Arquitetos-SemFundo.webp`; `Interiores`.
- Cardim: logo fornecido anteriormente `https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTEgra-Mozae-Paisagismo-Cardim.webp` sobre placa clara para preservar contraste do texto escuro; `Paisagismo`.
- Isabel Ruas: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Mural-Isabel-Ruas.webp`, com `object-fit:cover` e atribuição de mural exclusivo. A associação específica da imagem ao mural do projeto e o carregamento HTTP ainda dependem de QA de mídia.
- Layout: cards em duas colunas no desktop e uma no mobile; H2 fluido e limitado no mobile, texto legível, imagens lazy e dimensão declarada.
- Exceções nos testes de regressão da PR #405 e #406 são literais para o bloco e CSS novos, com comparação integral do HTML restante ao baseline.
- Evidência em commit `6b4eb0e29a438a2cf229597de1bc1e92ff601775`: 7 checks PASS (postal, commercial standard, canonical favicon, Open Graph/Twitter, onsite-address, images e coverage). O `validate` geral mantém FAIL histórico (16 ocorrências).
- PR #406 commit `6e6b3e2c31e0ee1ac2112139ada3a4bfe11bd019`: `postal` PASS e `regression` PASS.
- Gate pendente: operador conferir Live Sync desktop/mobile, verificação de carregamento real e contraste de logos no navegador, WhatsApp/Form46, e aprovação explícita de merge.

