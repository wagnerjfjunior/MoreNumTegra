# Status do Projeto — MoreNumTegra

Atualizado em `2026-09-18`.

Fonte canônica: GitHub `main`.

SHA live observado nesta reconciliação:

`e13b019f9bcca9e18bde8eedf0eb56a44a50be15`

## 1. Produção

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
VERCEL AUTOMATIC DEPLOYMENTS = main only
NON_MAIN DEPLOYMENTS = disabled
```

Vercel reportou `SUCCESS` para o merge commit atual.

## 2. Runtime recente

PR #109 restaurou estabilidade da home após identificar feedback loop de `MutationObserver` no runtime de links de projeto.

Resultado validado pelo Product Authority:

- vídeo da home funcionando;
- página fluida;
- faixa de consentimento da home funcionando.

PR #110 corrigiu a apresentação da faixa de consentimento do Elo Duo e consolidou política production-only no Vercel.

## 3. Search / exact-project pages

Rotas publicadas e indexáveis:

- `/`
- `/empreendimentos/capiitolo-piero-lissoni/`
- `/empreendimentos/caminhos-da-lapa-elo-duo/`

Search Console, conforme screenshots fornecidos pelo Product Authority:

- home indexada;
- CAPIITOLO com Product Snippet válido;
- Elo Duo com Product detectado/válido;
- warnings observados são apresentados como não críticos/opcionais.

Não há autorização para inventar dados a fim de eliminar warnings.

## 4. Sitemap / robots

Sitemap canônico contém três URLs publicadas.

`robots.txt` permite crawling e referencia:

`https://www.moretegra.com.br/sitemap.xml`

A próxima validação deve confirmar comportamento live e aceitação no Google, não apenas sintaxe de arquivo.

## 5. M4-05R

```text
M4-05 historical implementation = MERGED
M4-05 Product Acceptance = SUPERSEDED_BY_CORRECTIVE_GATE
M4-05R Product Decision = APPROVED
M4-05R Runtime = MERGED
M4-05R Acceptance = NOT_YET_DECLARED_COMPLETE
```

Mudanças recentes em metadata/schema não devem ser revertidas sem evidência concreta de regressão.

## 6. Deployment/provider policy

Por limitação operacional/rate-limit observada no Vercel, o projeto adota atualmente:

```json
"git": {
  "deploymentEnabled": {
    "**": false,
    "main": true
  }
}
```

Esta é uma política local ao Vercel/MoreNumTegra e não deve ser generalizada para outros providers sem evidência equivalente.

## 7. Próxima ação

Ver `docs/NEXT_SAFE_ACTION.md`.

A próxima frente é validação não mutativa de:

- sitemap;
- robots;
- headers/canonical/indexabilidade;
- Product Snippet / Merchant warnings;
- JSON-LD da home.

Nenhuma correção deve ser implementada antes de classificar se existe erro real.
