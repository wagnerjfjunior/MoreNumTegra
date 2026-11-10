# Handoff da branch — Rio: endereços, estandes e páginas de venda

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-10.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-enderecos-estandes-20261109`
- PR: #561 (aberta, base `main`). Merge só pelo Wagner.
- Head do código coberto por este handoff: `dbda76a`. O commit deste arquivo vem depois dele e só altera este documento.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

## Commits da branch (mais antigo primeiro)

| Commit | O que muda |
|---|---|
| `e853c93` | Endereço, CEP e estande Tegra (RealEstateAgent `#estande-tegra`) no JSON-LD e no rodapé das 7 páginas RJ |
| `9d83f56` | Páginas RJ como página de venda: mapa estilo Mozae que abre o WhatsApp, plantas com botão de WhatsApp, guardrails R1–R6 (`RESF_CONVERSION_GUARDRAILS_2026-11-09.md`, `validate-resf-conversion-guard.mjs`) |
| `ef2aad9` | Mídia e plantas oficiais Tegra no Gran Thai e no Singular (peninsulacollection.com.br é site oficial Tegra: usa mídia, não recebe link) |
| `67693da` | Seletor de plantas (padrão Chateau Jardin, `resf-rio-plans.js`) e foto oficial em todo card de planta |
| `f3a2903` | RIIO: sem quadros por edifício e sem seção da Sabrina |
| `9577d9f` | Galeria cabe na tela; Kronos com 12 ambientes variados |
| `f30285e` | Galeria no padrão Ampère Brooklin, em tela cheia como o hero |
| `9335daa` | 4 ajustes de 2026-11-10: galeria sem linha repetida, header do RIIO, card do hub abre no hero, bloco de atendimento no hub |
| `9c15d48` | Primeiro handoff de caminho fixo |
| `dbda76a` | Páginas do Rio sem Sabrina, atendimento "Direto com a Incorporadora Tegra", metragens oficiais (abaixo) |

## O que `dbda76a` fez (decisões de 2026-11-10)

Escopo: **só as páginas do Rio de Janeiro** (hub + 7 páginas). São Paulo não mudou: Sabrina, CRECI-SP e perfil continuam lá, e os validadores de SP seguem exigindo isso.

1. Nenhuma referência à Sabrina nas páginas RJ: botões, FAQ (HTML e JSON-LD), texto do formulário, rodapé, `aria-label`, link de perfil, `Person` e CRECI no JSON-LD. No RIIO: `#atendimento` e `Service` sem `Person`, opção do formulário "Falar com especialista", `riio.css` sem as regras `.sabrina-*` (não usadas).
2. Atendimento "Direto com a Incorporadora Tegra". Botões: "Falar direto com a Tegra" e, no quadro de preço, "Negociar direto com a Tegra". Mensagens do WhatsApp começam com "Olá, quero ...". Mesmo número de WhatsApp e telefone.
3. Hub: bloco "Atendimento direto com a Incorporadora Tegra" com botão "Falar direto com a Tegra". Saiu o aviso "Atendimento inicial remoto…".
4. Metragens oficiais, sem decimais: Gran Thai 125 a 405 m²; Gaea 123 a 365 m². Batem com as plantas oficiais já publicadas nas páginas (125,01–405,45 e 123,35–365,16). Filtro de metragem do hub atualizado. Formato "125 a 405 m²", igual ao resto do site.
5. Validadores (só regras do Rio): nova R7 no guard de conversão (páginas RJ e hub sem Sabrina e com contato direto Tegra); `validate-rio-home`, `validate-resf-rio`, `validate-onsite-realtor-project-address`, `validate-project-schema-coverage`, `validate-commercial-page-standard` (exceção RJ), `validate-riio-editorial-review-20261028` e `rio-home-visual-smoke`. Hash aprovado do Form46 do RIIO atualizado, com o anterior guardado em `history`.

Verificação em `dbda76a`: validadores 32 PASS + as mesmas 6 FAIL da linha de base (conferido com os commits de referência buscados; fora do Rio); smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke` PASS em desktop e mobile.

## Decisões do Wagner (com data)

- 2026-11-09: atendimento presencial no estande de cada empreendimento; Claris Rosas e Claris Casa no mesmo endereço; endereços do Singular e do Gaea informados por ele.
- 2026-11-09: rodapé com o endereço do próprio empreendimento (igual ao JSON-LD), fonte única, sem negrito, itálico ou sublinhado.
- 2026-11-09: nunca mandar cliente para concorrente ou para fora do funil; sem texto de justificativa; toda planta com foto oficial.
- 2026-11-09: peninsulacollection.com.br é site oficial da Tegra.
- 2026-11-10: galeria sem a linha repetida; header do RIIO padronizado; card do hub abre no hero.
- 2026-11-10: nas páginas do Rio de Janeiro, nada relacionado à Sabrina (questão do CRECI no RJ); atendimento "Direto com a Incorporadora Tegra". Só Rio.
- 2026-11-10: metragens oficiais sem decimais — Gran Thai 125–405 m², Gaea 123–365 m².

## Pendências

- **Decisão do Wagner:** a home de SP (`src-greenn/moretegra.js`) mostra os cards do Gran Thai e do Gaea com a metragem antiga (125 a 210 m²; 125 e 170 m²). Ficou fora desta mudança por ser página de SP. Atualizar só esses dois números ou deixar.
- **Wagner:** QA no LVR das 7 páginas RJ e do hub.
- **Wagner:** merge da PR #561. Depois do merge: IndexNow/Search Console das URLs RJ.

## Próxima ação (única)

Wagner faz o QA no LVR desta branch e decide sobre a metragem dos dois cards na home de SP.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-enderecos-estandes-20261109 e o arquivo docs/sfjm/HANDOFF.md. Confira se o head do código citado no handoff (dbda76a) é o pai do commit que reescreveu o handoff, ou o head atual. Se for, siga a próxima ação dele. Se divergir, pare e me diga.
```
