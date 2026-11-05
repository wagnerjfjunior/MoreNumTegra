# SFJM — Release isolada do cenário 7 — 05/11/2026

## Decisão do Product Authority
Usuário: "vamos fechar o cenário 7 acredito que está ótimo vamos retirar o editor, acertar o controle dos carrinhos Sentidos do trajeto com respectivas cores e labels. e vamos mergear para produção".

Interpretação delimitada: **liberar apenas o cenário 7 consolidado**. A branch histórica `feat/complexo-prancha-condominios-lapa-20261104` está **100 commits à frente de main** e carrega alterações em C1–C6 não cobertas por esta autorização de release. Portanto **não fazer merge dessa branch histórica**.

## Baseline e release branch
- Main anterior `d4f7d93b27cb2c4342df61386414012b9ef0de55`.
- Branch isolada derivada da main `release/complexo-cenario7-final-20261105`.
- Diff esperado: apenas player C7, prancha PNG V1, JSON de coleta preservado e referência do cenário 7 na página principal; documento de release.
- Não incluir editor de pontos público ou sobreposição dos nove perímetros.
- Cenário 8 consolidado no cenário 7; permanece a opção 7, removendo a opção duplicada 8 do seletor. Cenários 1–6 não alterados.

## Player público / legenda
Arquivo: `src-greenn/complexo-lapa-pirituba/cenario7-trajetos/index.html`.
- **Sentidos do trajeto**, painel escuro, três controles de ativação individuais:
  - Lapa → Ayrton Senna, cor origem Lapa **#FF5F00**, **8 carros**, **35 pontos**;
  - Saída Parques da Lapa, cor editorial atual **#D7A44D**, **5 carros**, **37 pontos**;
  - Lapa → Quintas da Lapa, cor origem Lapa **#FF5F00**, **5 carros**, **33 pontos**.
- Veículo padrão de duas janelas, corpo SVG 20x36, stroke branco; posição e ângulo com `getPointAtLength` e tangente.
- Reproduzir/pausar global e reiniciar; checkbox por percurso com ocultação dos elementos correspondentes (sem parar os demais).
- Ciclo `28000/1.1` ms = 10% mais rápido que baseline de 28 segundos; defasagem de 12,5% entre Saída Parques e Lapa → Quintas. Oitavo carro apenas no trajeto 1.
- Em `prefers-reduced-motion: reduce`, o player aguarda reprodução explícita; autoplay nos demais.
- Prancha em `src-greenn/complexo-lapa-pirituba/assets/Complexo-Lapa-Tietê-Percurso-Completo-v1.png`, dimensões canônicas 1448x1086; barra de erro caso o arquivo não carregue ou não corresponda à dimensão.
- Pontos imutáveis preservados em `docs/sfjm/data/cenario7-trajetos-coleta-2026-11-05.json` (105 pontos).
- Nenhum back-end, token, Form 46, SEO, outras rotas ou cores dos cenários anteriores alterados.

## Gates de release
1. Confirmar compare main...release com apenas arquivos esperados e sem behind.
2. Validar sintaxe JS e 3 labels/checkboxes/quantidades/cores por inspeção da fonte.
3. Verificar CI/PR. O usuário relata aprovação visual ("acredito que está ótimo") e autorizou merge, mas teste visual do **player final sem editor** não deve ser declarado automaticamente homologado.
4. Merge apenas da release isolada, com expected head SHA; resolver deployment Vercel READY por SHA e alias, sem inventar ID. Verificar retorno 200 da página e dos assets.
5. Rollback Git: **reverter somente a PR C7**; não forçar reset da main. Rollback Vercel: restaurar deployment READY imediatamente anterior se o player final regredir. Guardar SHA anterior à publicação para rastreabilidade.
6. Greenn permanece fora do escopo desta publicação; "produção" refere-se ao site GitHub/Vercel já conectado até que uma publicação Greenn seja explicitamente requisitada.

## Pendências explícitas
- Destinos futuros Lapa → Bosques e Saída Praças não estão nesta release: zero pontos no JSON. Não inventar.
- Se surgirem erros de posicionamento, contagem, pausa ou integração após merge, retornar à versão anterior e corrigir em branch separada.

## Resultado da publicação — 05/11/2026
- PR **#542**: **MERGED** em `main`; commit de produção `2aa6b8c268e8a112c9d74fe1c293c3cec9358db2`.
- Vercel projeto `morenumtegra` (`prj_f8r2PwQ42f38CWUjOGpEStkjmaqt`), deployment `dpl_GCsg81XJDEfUeVX7A4RGsVnw815f` **READY**, `target=production`, `githubCommitSha` idêntico ao merge, alias `www.moretegra.com.br`, `aliasError=null`.
- Main compare contra merge idêntico. O merge não introduziu alterações em C1–C6; cinco arquivos previstos compõem a release.
- Baseline anterior pronto ao rollback do projeto: `dpl_2eYYe3WxdhZeMMNgrZZg3XMA4n7w` (PR #538, `c4c37f5d4c5a3b94089ece6cccbafcff7f3e6e1a`).
- Atenção: **READY não comprova funcionamento visual nos navegadores**. QA mobile/desktop pós-publicação permanece aberto.
- Greenn não modificada.
