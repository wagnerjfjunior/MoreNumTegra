# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura após a integração da baseline técnica V1.

- Definida em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V1.md` quando presente em `main`
- Responsável: responsável pelo projeto
- Estado: `AUTORIZADA_CONDICIONALMENTE_APOS_GATE_LIVE`

## 1. Ação

Criar a branch `feat/initial-product-implementation` a partir do `main` que contenha `TECHNICAL_BASELINE_V1` e implementar o MoreNumTegra V1 dentro dos contratos funcional e técnico canônicos.

## 2. Autorização vigente

O responsável pelo projeto autorizou em `2026-08-23`:

- definir/canonicalizar a baseline técnica;
- após validação e merge dessa baseline, liberar a implementação em branch dedicada;
- manter Production e domínio/DNS separados até validação do Preview.

Esta autorização inclui implementação de aplicação, estilos, componentes, dados locais versionados, testes e preparação/deploy de **Vercel Preview** quando o branch estiver buildável.

Esta autorização **não** inclui:

- Vercel Production;
- custom domain ou DNS;
- transmissão real de leads/PII;
- CRM/form endpoint real;
- analytics/pixels/tags;
- campanhas;
- credenciais/segredos não previamente autorizados;
- expansão material além das baselines.

## 3. Gate live obrigatório

Antes de criar ou trabalhar na branch de implementação:

1. resolver `main` live;
2. confirmar que `docs/baseline/FUNCTIONAL_BASELINE_V1.md` está presente;
3. confirmar que `docs/baseline/TECHNICAL_BASELINE_V1.md` está presente;
4. confirmar que nenhuma das baselines foi supersedida;
5. confirmar que Production/domain continuam fora do escopo;
6. criar `feat/initial-product-implementation` do SHA exato validado.

Se qualquer condição falhar, parar antes de implementação.

## 4. Escopo permitido

- scaffold da aplicação conforme baseline técnica;
- Next.js/TypeScript e runtime aprovados;
- componentes/UI responsivos;
- catálogo local tipado;
- filtros de localização/zoneamento e estágio;
- badges de estágio;
- identidade Tegra canônica;
- CTAs de conversão sem inventar destinos não verificados;
- formulário de Preview sem transmissão real de PII;
- mídia resiliente;
- SEO técnico de Preview/estrutura;
- acessibilidade;
- testes;
- configuração necessária para build;
- Vercel Preview após build local/repository gate.

## 5. Gate de dependências

Antes de congelar o scaffold:

- resolver a versão Next.js 16.x suportada e corrigida live;
- não piná-la se houver patch crítico pendente conhecido;
- usar Node.js 24 LTS;
- commit do lockfile obrigatório;
- registrar versões no PR de implementação.

## 6. Vercel Preview

Preview está autorizado dentro desta ação somente quando:

- build passa;
- não há segredos/PII reais;
- deploy é explicitamente não-production;
- SHA da implementação é registrado;
- URL Preview permanece sem domínio customizado;
- `X-Robots-Tag: noindex` é verificado.

Preview não equivale a aprovação de Production.

## 7. Resultado verificável

Uma PR de implementação com:

- aplicação buildável;
- requisitos Must da baseline funcional implementados ou explicitamente bloqueados por evidência ausente;
- testes/gates técnicos executados;
- defeitos `USER_REPORTED` reclassificados com reprodução real onde houver implementação correspondente;
- Preview Vercel validado quando criado;
- nenhum efeito em Production/domain/DNS.

## 8. Condições de parada

Parar se:

- for necessário escolher solução materialmente diferente da baseline técnica;
- surgir necessidade de dados/segredos não autorizados;
- CTA/form exigir destino real ainda não verificado;
- Vercel tentar criar/promover Production;
- houver necessidade de domínio/DNS;
- dependência crítica não puder ser usada com versão segura;
- o escopo crescer além do V1 canônico.

## 9. Próximo estado

Depois de um Preview validado, apresentar separadamente o gate de Production. Somente após autorização de Production poderá haver promoção/produção. Custom domain/DNS permanece um gate distinto, mesmo após Production.