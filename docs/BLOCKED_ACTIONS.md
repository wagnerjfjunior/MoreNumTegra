# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Regra: ausência nesta lista não constitui autorização.

## 1. Bloqueios ativos

| Ação bloqueada | Motivo | Condição de liberação | Autoridade | Evidência exigida |
|---|---|---|---|---|
| Implementação material do produto | baseline funcional ainda precisa ser integrada e implementation scope não está autorizado | baseline suficiente integrada + escopo material autorizado | responsável pelo projeto | documentação integrada + autorização material específica |
| Escolha definitiva de stack/arquitetura | requisitos funcionais ainda não estão canônicos | baseline relevante integrada + decisão técnica explícita | responsável pelo projeto/revisor técnico quando aplicável | decisão versionada |
| Deploy/publicação | efeito externo não autorizado | ambiente e escopo definidos + autorização explícita | responsável pelo projeto | registro de autorização + evidência de target |
| Vercel/hosting/domínio/DNS | inexistência de autoridade canônica para target | decisão explícita sobre ambiente e propriedade | responsável pelo projeto | configuração/conta/target verificados |
| Integrações externas, formulários, CRM, analytics ou pixels | podem criar fluxo de dados e efeito externo | requisitos, privacidade e autorização definidos | responsável pelo projeto | decisão + escopo + evidência técnica |
| Campanhas, anúncios ou comunicação externa | custo/reputação/terceiros | campanha e orçamento autorizados | responsável pelo projeto | autorização explícita |
| Uso de credenciais, segredos ou dados pessoais | risco de segurança e privacidade | necessidade comprovada + canal seguro + autorização | responsável pelo projeto | registro apropriado sem expor segredo |

## 2. Ações que sempre exigem autorização explícita

Salvo regra mais restritiva do projeto:

- modificar material integrado em `main` quando houver efeito material;
- fazer merge, publicar, deploy ou release, salvo autorização condicional já registrada para uma PR específica;
- alterar domínio, DNS ou hosting;
- criar ou modificar integração externa;
- enviar mensagens, documentos ou dados a terceiros;
- criar compromisso financeiro ou consumir recursos relevantes;
- executar ação destrutiva, irreversível ou de difícil reversão;
- acessar, transferir ou divulgar dados sensíveis;
- ampliar o escopo materialmente;
- declarar conclusão, aprovação, produção ou go-live em nome de uma autoridade.

A autorização condicional vigente para a baseline funcional está registrada em `docs/NEXT_SAFE_ACTION.md` e não se propaga além daquele escopo.

## 3. Limites de interpretação

- “Preparar” não autoriza “executar”.
- “Revisar” não autoriza “aprovar” ou “alterar”.
- “Criar branch/PR” não autoriza “fazer merge”, exceto quando existir autorização condicional explícita e suas condições forem comprovadas.
- “Testar” não autoriza usar produção ou dados reais.
- “Criar preview” é publicação externa e requer enquadramento/autorização quando aplicável.
- Uma etapa concluída não autoriza automaticamente a etapa seguinte.
- Capacidade de ferramenta não equivale a autoridade.
- Silêncio, expectativa ou sequência lógica não substituem autorização.

## 4. Bloqueios por evidência ausente

| Evidência ausente | Ação afetada | Fonte esperada | Tratamento |
|---|---|---|---|
| Baseline funcional integrada | implementação/arquitetura | documentação canônica do projeto | canonicalizar primeiro |
| Stack/arquitetura decidida | implementação técnica | decisão versionada | não inferir tecnologia |
| Target de deploy | Vercel/hosting/publicação | conta/projeto/configuração confirmados | não criar por suposição |
| Requisitos de dados/privacidade | formulários/CRM/analytics | baseline/decisão específica | bloquear fluxo de dados |
| Autorização material de implementação | código/produto | decisão explícita do responsável | parar antes de implementar |

## 5. Exceções autorizadas

Existe uma autorização condicional limitada à **baseline funcional documental**: criar a PR e efetuar seu merge somente após pré-merge validado sem blocker material, conforme `docs/NEXT_SAFE_ACTION.md`.

Não há exceção para implementação, publicação, deploy ou integrações.

## 6. Procedimento para desbloqueio

1. confirmar a condição objetiva de liberação;
2. resolver a fonte canônica live;
3. obter e registrar a autorização quando exigida;
4. atualizar a próxima ação segura se o significado material mudar;
5. executar somente o escopo liberado;
6. preservar evidência do resultado;
7. não iniciar automaticamente a etapa seguinte.

## 7. Procedimento diante de dúvida

Quando o enquadramento não estiver claro, trate a ação como bloqueada, declare a dúvida e solicite a menor decisão necessária.
