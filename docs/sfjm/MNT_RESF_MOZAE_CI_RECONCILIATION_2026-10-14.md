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
