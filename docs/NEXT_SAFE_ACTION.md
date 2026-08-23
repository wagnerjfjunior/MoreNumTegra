# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura após a integração da baseline funcional V1.

- Definida em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Responsável: responsável pelo projeto
- Estado: `bloqueada até autorização explícita`

## 1. Ação

Definir e versionar uma **baseline técnica/arquitetural inicial** do MoreNumTegra em PR exclusivamente documental, usando a baseline funcional integrada como entrada e sem implementar, publicar ou configurar o produto.

## 2. Resultado verificável

Uma proposta técnica documental que, quando autorizada, defina ou deixe explicitamente pendentes:

- arquitetura alvo inicial;
- stack/runtime;
- estratégia de conteúdo/inventário;
- tratamento de mídia e imagens;
- estratégia mobile/performance e metas mensuráveis;
- SEO técnico;
- acessibilidade;
- contrato de formulário/dados/privacidade;
- integrações externas;
- estratégia de testes;
- ambientes, hosting e deploy;
- rollback e critérios técnicos de aceite.

A proposta deve distinguir decisão, alternativa, hipótese e lacuna.

## 3. Justificativa

A baseline funcional define o que o produto precisa fazer, mas deliberadamente não escolhe como fazê-lo. Separar requisitos de solução reduz decisões prematuras de stack e impede que implementação seja iniciada apenas por conveniência técnica.

## 4. Gate live obrigatório

Antes de iniciar esta ação, se ela for autorizada:

1. resolver `main` live;
2. confirmar que `docs/baseline/FUNCTIONAL_BASELINE_V1.md` está integrada;
3. confirmar que o conteúdo funcional não foi supersedido;
4. confirmar a autorização explícita para a baseline técnica;
5. parar se qualquer condição falhar.

Não persista o lifecycle da futura PR como checkbox autoritativo; resolva-o live.

## 5. Escopo permitido quando autorizado

- leitura não destrutiva do repositório e fontes técnicas autorizadas;
- análise de alternativas;
- documentação técnica em branch dedicada;
- atualização coerente do estado SFJM na mesma PR, se houver mudança material;
- abertura de PR documental para revisão.

## 6. Limites explícitos

Não inclui:

- importar ou escrever código de aplicação;
- corrigir os defeitos funcionais relatados;
- criar Vercel/hosting/domain/DNS;
- criar banco, backend, CMS ou CRM;
- conectar formulário real;
- configurar WhatsApp, analytics, pixels ou tags;
- usar segredos ou dados pessoais;
- deploy, preview público ou produção;
- merge sem autorização específica aplicável.

## 7. Autorização

- Autorização necessária: `sim`
- Autoridade: responsável pelo projeto
- Registro da autorização: `pendente após a baseline funcional`
- Escopo: baseline técnica/arquitetural documental somente
- Validade: não se propaga para implementação

## 8. Plano mínimo quando liberada

1. Resolver `main` e a baseline funcional live.
2. Inventariar lacunas técnicas e restrições funcionais.
3. Separar requisitos de decisões de solução.
4. Propor arquitetura/stack com justificativa e alternativas relevantes.
5. Definir metas técnicas mensuráveis onde houver base suficiente.
6. Atualizar SFJM na mesma PR se a decisão material mudar o estado.
7. Abrir PR documental e parar no gate aplicável.

## 9. Verificação de conclusão

- PR exclusivamente documental;
- baseline funcional preservada ou alterações justificadas separadamente;
- nenhuma implementação ou configuração externa;
- decisões técnicas rastreáveis;
- lacunas mantidas explícitas;
- próximo estado SFJM definido sem duplicar lifecycle transitório.

## 10. Condições de parada

Pare se:

- a baseline funcional não estiver integrada ou tiver sido supersedida;
- faltar autorização explícita;
- for necessário escrever/importar código para concluir a análise;
- uma decisão depender de credencial, dado ou acesso não autorizado;
- surgir necessidade de deploy ou integração externa;
- houver conflito material entre requisitos e solução proposta.

## 11. Próximo estado

Após eventual integração de uma baseline técnica, a implementação deverá continuar bloqueada até autorização material específica. Não interpretar aprovação documental como autorização de execução.
