# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-26`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2_1.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `PUBLIC_HOMOLOGATION_VALIDATION_BEFORE_RELEASE_FREEZE`

## 1. Ação imediata

Resolver `main` live e validar publicamente a implementação atual em:

`https://morenumtegra.vercel.app/`

No fechamento de 2026-08-26, o SHA observado em `main` era:

`8a237e298dee1391babb9bbbbf88fd4d9c2e40dd`

A integração Vercel registrou `success` / `Deployment has completed` para esse SHA. Esse fato prova conclusão do deployment, mas não substitui a validação pública funcional/mobile/performance.

## 2. Gate público obrigatório

Antes de congelar release ou avançar para Green Sales, validar na URL estável:

- desktop e mobile, com prioridade para 360px e 390px;
- imagens dos 21 cards;
- jornada `Negociar condições`;
- bloco `Seu interesse`;
- galeria pós-intenção sem repetição da imagem de capa;
- galeria com 2 imagens quando existirem apenas 2 mídias adicionais distintas;
- bento somente quando existirem 3 mídias distintas;
- fallback quando mídia falhar;
- vídeo in-page/autoplay mudo/loop/playsinline;
- filtros por estágio;
- badges/filtros Zona Sul, Zona Oeste e Zona Leste;
- busca por nome/bairro;
- filtro por ticket;
- reset/combinação de filtros;
- preços `A partir de`, `Sob consulta` e demais estados visíveis;
- CTA `Negociar condições` / `Receber condições`;
- rolagem para `#formulario`;
- mock do formulário sem transmissão;
- ausência de erro primário de runtime/console;
- responsividade e touch targets;
- LCP/INP/CLS quando possível.

## 3. Condição para freeze

Somente após o gate público ser aprovado:

1. resolver `main` live novamente;
2. confirmar que a Vercel Production corresponde ao mesmo estado aprovado;
3. congelar o SHA/release;
4. registrar os payloads Green exatos derivados desse SHA;
5. iniciar o gate controlado de montagem/publicação Green.

Não congelar automaticamente o SHA observado em 2026-08-26 se `main` tiver avançado ou se a homologação pública encontrar regressão.

## 4. Dados comerciais antes da Green

Antes da publicação Green comercial, revalidar os fatos visíveis usando as tabelas/espelhos atuais e informação aprovada:

- preço de referência;
- unidade/metragem usada para referência;
- valor/m² quando exibido;
- disponibilidade/esgotado;
- estágio;
- imagem/URL oficial;
- demais diferenciais visíveis.

Ambiguidade deve resultar em `Sob consulta` ou omissão, não inferência.

## 5. Mídia

As imagens atuais permanecem em origens remotas oficiais/externas já utilizadas pelo projeto.

Não migrar mídia pesada para GitHub por padrão. Uma eventual migração das mídias finais para CDN/storage sob controle próprio deve ser tratada como mudança separada, preservando origem/autorização e rastreabilidade.

## 6. Analytics / tracking

GA4, GTM, Meta Pixel e outras tags permanecem fora do estado atual.

Antes de habilitar tracking:

1. definir contas/propriedades/containers próprios;
2. definir eventos e conversões;
3. revisar dados coletados e consent/privacy quando aplicável;
4. não enviar PII bruta por parâmetros de analytics;
5. validar em ambiente controlado antes de publicar.

## 7. Green production gate

Somente depois da homologação pública aprovada e do freeze:

1. identificar os 3 blocos HTML exatos;
2. identificar CSS e JavaScript exatos;
3. montar/validar o Form 46 nativo no builder;
4. confirmar CTA -> `#formulario`;
5. revalidar mobile já dentro da Green;
6. preservar versão anterior/export para rollback quando possível;
7. publicar de forma controlada.

## 8. Condições de parada

Parar se:

- Vercel Production não puder ser ligada ao estado aprovado de `main`;
- surgir regressão funcional/mobile material na URL pública;
- o deployment alvo contiver conteúdo diferente do aprovado;
- surgir dado comercial que exija inferência;
- Form 46 exigir comportamento desconhecido;
- houver necessidade de custom domain/DNS, analytics, FECH.AI, n8n, Make, Ads, CMS/database ou backend sem nova decisão.