# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica candidata vigente: `docs/baseline/TECHNICAL_BASELINE_V2.md`
- Estado: `BASELINE_V2_MUST_MERGE_BEFORE_IMPLEMENTATION`

## 1. Ação imediata

Revisar e integrar `TECHNICAL_BASELINE_V2.md`, que supersede a arquitetura Next.js da V1 e canonicaliza a implementação portátil HTML/CSS/JavaScript para GitHub/Vercel Preview/Greenn.

Nenhum código V1 portátil deve ser escrito enquanto a V2 não estiver integrada em `main`.

## 2. Gate live após merge da V2

Antes de criar ou trabalhar na implementação:

1. resolver `main` live;
2. confirmar `FUNCTIONAL_BASELINE_V1.md` presente;
3. confirmar `TECHNICAL_BASELINE_V2.md` presente e não supersedida;
4. confirmar que `TECHNICAL_BASELINE_V1.md` está explicitamente supersedida;
5. confirmar que publicação Greenn e domínio/DNS continuam gates separados;
6. comparar `feat/initial-product-implementation` com `main`;
7. se a branch continuar sem commits únicos, fast-forward/recriar a partir do SHA exato de `main`;
8. implementar somente então.

Se qualquer condição falhar, parar.

## 3. Escopo autorizado de implementação após o gate

- `src-greenn/moretegra.html`;
- `src-greenn/moretegra.css`;
- `src-greenn/moretegra.js`;
- identidade Tegra canônica;
- catálogo local/versionado;
- filtros mobile de localização/zoneamento e estágio;
- badges de estágio;
- WhatsApp e `Receber condições` sem inventar destino não verificado;
- mídia resiliente;
- SEO estrutural;
- acessibilidade;
- testes;
- formulário Greenn tenant 313 / form 46 conforme contrato verificado;
- Vercel Preview não-production após gate técnico;
- preparação de release rastreável para Greenn.

## 4. Formulário V1 autorizado

Contrato conhecido:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`
- fields: `nome`, `email`, `telefone`
- endpoint: `POST https://back.gdigital.com.br/form/register`

Pode ser implementado na V1 desde que:

- não haja segredo/token exposto;
- validação e estados de UI sejam implementados;
- duplo clique seja prevenido;
- testes usem dados não sensíveis;
- qualquer divergência do contrato observada live interrompa a integração até reconciliação.

## 5. Preview gate

Vercel Preview somente quando:

- os artefatos estáticos estiverem funcionais;
- não houver erros primários de runtime/console;
- filtros mobile funcionarem;
- formulário estiver validado com dados de teste não sensíveis;
- SEO/robots de Preview estiverem corretos;
- Vercel live tiver sido resolvido;
- deploy for explicitamente não-production.

## 6. Greenn production gate

Depois de Preview validado, apresentar/executar separadamente o gate de publicação Greenn.

Antes de publicar:

- identificar SHA/release exato;
- confirmar restrições do editor Greenn live;
- confirmar que o Form 46 continua compatível;
- confirmar rollback/versão anterior quando possível;
- não alterar domínio/DNS sem autorização específica.

## 7. Condições de parada

Parar se:

- V2 ainda não estiver em `main`;
- surgir necessidade de framework/backend incompatível com a baseline;
- o formulário exigir segredo no cliente;
- inventário necessário não estiver verificado;
- WhatsApp exigir destino não confirmado;
- Vercel tentar promover Production;
- publicação Greenn ocorrer antes de Preview validado;
- houver necessidade de domínio/DNS;
- o escopo crescer para FECH.AI/n8n/Make/Ads/CMS/database/analytics sem nova decisão.
