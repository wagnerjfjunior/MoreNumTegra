# Handoff da branch — Rio: endereços, estandes e páginas de venda

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-10.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-enderecos-estandes-20261109`
- PR: #561 (aberta, base `main`). Merge só pelo Wagner.
- Head do código coberto por este handoff: `07e91ab`. Os commits depois dele (`444a698`, `6194e4b` e o commit deste arquivo) só alteram documentação.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

> **Não fazer merge da #561 no estado atual.** As páginas RJ ainda usam o WhatsApp de SP e a copy "Direto com a Incorporadora Tegra", que conflita com a decisão de canais de 2026-11-10. O merge espera os commits A e B descritos em `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md`.

## Documento de referência desta etapa

`docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` — por que existem dois canais (RJ/SP), contrato de canais e analytics, diagnóstico das 8 páginas RJ (estático e em navegador), auditoria do contêiner GTM, plano dos commits A e B, pendências e critério de aceite.

Export do contêiner auditado: `docs/attribution/gtm/GTM-PGCR4R47_workspace14_export_2026-11-10.json`.

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
| `dbda76a` | Páginas do Rio sem Sabrina, atendimento "Direto com a Incorporadora Tegra" (copy a substituir, ver abaixo), metragens oficiais |
| `444a698` | Handoff no head `dbda76a` |
| `07e91ab` | Home de SP: só os cards do Gran Thai (125 a 405 m²) e do Gaea (123 a 365 m²) com a metragem oficial |
| `6194e4b` | Handoff no head `07e91ab` |
| (este) | Documento de canais e analytics RJ/SP, export do GTM e este handoff |

## O que `dbda76a` fez

Escopo: só as páginas do Rio de Janeiro (hub + 7). São Paulo não mudou.

1. Nenhuma referência à Sabrina nas páginas RJ (botões, FAQ em HTML e JSON-LD, formulário, rodapé, `aria-label`, perfil, `Person`, CRECI). RIIO: `#atendimento` e `Service` sem `Person`; `riio.css` sem regras `.sabrina-*`.
2. Copy "Direto com a Incorporadora Tegra" / "Falar direto com a Tegra" / "Negociar direto com a Tegra". **Substituída pela decisão de canais de 2026-11-10:** o canal RJ é de uma central, não da incorporadora; a copy nova vem da etapa de copy (pendência P1) e entra no commit A.
3. Metragens oficiais sem decimais: Gran Thai 125 a 405 m²; Gaea 123 a 365 m² (iguais às plantas oficiais publicadas). Filtro de metragem do hub atualizado.
4. Validadores (só Rio): R7 no guard de conversão e ajustes em `validate-rio-home`, `validate-resf-rio`, `validate-onsite-realtor-project-address`, `validate-project-schema-coverage`, `validate-commercial-page-standard`, `validate-riio-editorial-review-20261028` e `rio-home-visual-smoke`. Hash do Form46 do RIIO atualizado com o anterior em `history`.

Verificação em `dbda76a` e `07e91ab`: validadores 32 PASS + as mesmas 6 FAIL da linha de base (fora do Rio); smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke` PASS em desktop e mobile.

## Decisões do Wagner (com data)

- 2026-11-09: atendimento presencial no estande de cada empreendimento; Claris Rosas e Claris Casa no mesmo endereço; endereços do Singular e do Gaea informados por ele.
- 2026-11-09: rodapé com o endereço do próprio empreendimento (igual ao JSON-LD), fonte única, sem negrito, itálico ou sublinhado.
- 2026-11-09: nunca mandar cliente para concorrente ou para fora do funil; sem texto de justificativa; toda planta com foto oficial.
- 2026-11-09: peninsulacollection.com.br é site oficial da Tegra.
- 2026-11-10: galeria sem a linha repetida; header do RIIO padronizado; card do hub abre no hero.
- 2026-11-10: nas páginas do Rio, nada relacionado à Sabrina (questão do CRECI no RJ). Só Rio.
- 2026-11-10: metragens oficiais sem decimais — Gran Thai 125–405 m², Gaea 123–365 m²; também nos 2 cards da home de SP (só a metragem).
- 2026-11-10: **canais separados.** SP = Sabrina, WhatsApp `5511960779328`, form 46. RJ = central de atendimento que encaminha ao corretor local autorizado, WhatsApp provisório `5511951667227`, form 47. O canal RJ não é da incorporadora. Mesmo GTM (`GTM-PGCR4R47`), mesmo GA4 (`G-57M2XR0CY2`), mesmo tenant (`313`), mesma rota `/obrigado/`.
- 2026-11-10: blog fora do escopo (inclusive os posts sobre o Rio); só as 8 páginas RJ.
- 2026-11-10: rebaseline do bloco `form46` do RIIO autorizado para a troca 46 → 47.
- 2026-11-10: form 47 criado na Green para leads do RJ, com os mesmos campos do 46 (`nome`, `email`, `telefone`, `texto-livre`).

## Pendências

| # | Item | Dono |
|---|---|---|
| P1 | Copy RJ (título, linha de apoio, rodapé, 3 botões) sem declarar o canal como da Tegra | ChatGPT propõe; Wagner aprova |
| P2 | Validação de `MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` contra o repositório | ChatGPT |
| P3 | Confirmar workspace 14 = versão publicada do GTM; dimensão `form_id` no GA4 | Wagner |
| P4 | Decidir se corrige os 2 defeitos do GTM (leitura de `mnt.consent.v2`; gatilhos de clique mortos) | Wagner |
| P5 | Commit A (canais) e commit B (formulário e mensuração) | Claude, depois de P1 e P2 |
| P6 | QA no LVR, merge, GTM Preview, DebugView, 1 lead controlado RJ e 1 SP | Wagner |
| P7 | Depois do merge: IndexNow/Search Console das URLs RJ | Wagner |

## Próxima ação (única)

ChatGPT valida o documento `docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` contra o repositório e entrega as opções de copy RJ (P1 e P2). Com a copy aprovada pelo Wagner, Claude executa os commits A e B.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-enderecos-estandes-20261109, o arquivo docs/sfjm/HANDOFF.md e docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md. Confira se o head do código citado no handoff (07e91ab) continua sendo o último commit que altera código (os posteriores só mexem em documentação). Se for, siga a próxima ação do handoff. Se divergir, pare e me diga.
```
