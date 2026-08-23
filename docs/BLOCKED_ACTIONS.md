# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação | Autoridade | Evidência exigida |
|---|---|---|---|---|
| Baseline técnica/arquitetural | próxima fase ainda não autorizada | autorização explícita + baseline funcional integrada | responsável pelo projeto | autorização registrada + `main` live |
| Implementação/importação de produto | autorização atual é somente documental e solução técnica não está decidida | baseline técnica suficiente + autorização material específica | responsável pelo projeto | decisão técnica + escopo de implementação autorizado |
| Escolha definitiva de stack/runtime | solução técnica ainda não canonicalizada | autorização para baseline técnica + decisão versionada | responsável pelo projeto/revisor técnico quando aplicável | PR/decisão técnica integrada |
| Correção dos defeitos mobile/mídia relatados | não há implementação versionada nem autoridade de execução | código/snapshot identificado + implementação autorizada | responsável pelo projeto | fonte técnica + escopo aprovado |
| Formulário real/CRM/lead routing | envolve dados pessoais e integração externa | contrato de dados, privacidade, destino e autorização definidos | responsável pelo projeto | decisão + data contract + autorização |
| WhatsApp destination/configuração | destino e ownership não verificados canonicamente | target verificado + autorização | responsável pelo projeto | evidência do target |
| Analytics/pixels/tags | cria telemetria e potencial fluxo de dados | requisitos e autorização definidos | responsável pelo projeto | decisão versionada |
| Deploy/publicação | efeito externo não autorizado | ambiente/target + critérios + autorização explícita | responsável pelo projeto | autorização + evidência de target |
| Vercel/hosting/domínio/DNS | target ainda não canônico | decisão explícita sobre ambiente e propriedade | responsável pelo projeto | conta/projeto/configuração verificados |
| Campanhas/anúncios/comunicação externa | custo/reputação/terceiros | campanha e orçamento autorizados | responsável pelo projeto | autorização explícita |
| Uso de credenciais/segredos/dados pessoais | risco de segurança e privacidade | necessidade comprovada + canal seguro + autorização | responsável pelo projeto | registro apropriado sem expor segredo |

## 2. Ações que sempre exigem autorização explícita

Salvo regra mais restritiva:

- alteração material de `main`;
- merge quando não houver autorização específica/condicional registrada;
- implementação ou importação de código;
- publicação, preview público, deploy ou release;
- domínio, DNS ou hosting;
- integração externa;
- processamento de leads/dados pessoais;
- analytics, pixels ou tags;
- campanha ou compromisso financeiro;
- ação destrutiva/irreversível;
- expansão material de escopo;
- declaração de produção/go-live.

## 3. Limites de interpretação

- baseline funcional aprovada não autoriza baseline técnica automaticamente;
- baseline técnica aprovada não autoriza implementação;
- “preparar” não autoriza “executar”;
- “revisar” não autoriza “aprovar” ou “alterar”;
- “criar PR” não autoriza merge salvo condição explícita previamente concedida;
- “testar” não autoriza produção ou dados reais;
- capacidade da ferramenta não equivale a autoridade;
- sequência lógica não substitui autorização.

## 4. Evidências ainda ausentes que afetam execução

| Evidência ausente | Ação afetada | Tratamento |
|---|---|---|
| implementação/snapshot versionado | reprodução e correção dos defeitos relatados | localizar/importar somente após autorização |
| baseline técnica/stack | desenvolvimento | não escolher por inferência |
| contrato de formulário/dados | lead capture | bloquear processamento real |
| target de WhatsApp/CRM | conversão | verificar antes de integrar |
| target de deploy | publicação | não criar por suposição |
| metas numéricas de performance | aceite técnico | definir na baseline técnica |
| política SEO técnica/indexação | produção SEO | definir antes de go-live |

## 5. Exceções autorizadas

A PR da **baseline funcional V1** possui autorização condicional de merge somente se o pré-merge passar sem blocker material.

Essa exceção termina com a integração desta baseline e não concede autoridade para a próxima fase.

## 6. Procedimento para desbloqueio

1. resolver `main` live;
2. confirmar a condição objetiva;
3. obter autorização específica quando exigida;
4. atualizar a próxima ação segura se o significado material mudar;
5. executar somente o escopo liberado;
6. preservar evidência;
7. não iniciar automaticamente a etapa seguinte.

## 7. Procedimento diante de dúvida

Quando o enquadramento não estiver claro, tratar como bloqueado e obter a menor decisão necessária.
