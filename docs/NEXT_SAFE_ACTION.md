# Próxima Ação Segura — MoreNumTegra

> Este é o registro autoritativo da única próxima ação segura do projeto após a integração do onboarding SFJM.

- Definida em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Âncora inicial pré-onboarding: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Responsável pela execução: responsável pelo projeto
- Estado: `autorizada condicionalmente ao gate live pós-merge`

## 1. Ação

Consolidar e versionar uma **baseline funcional inicial do MoreNumTegra** em branch e pull request exclusivamente documentais, sem implementar ou publicar o produto.

## 2. Resultado verificável

Uma proposta documental versionada que registre, apenas com fatos e decisões confirmadas:

- objetivo e escopo inicial do produto;
- público/usuários e jornadas essenciais, quando definidos;
- páginas ou superfícies necessárias, quando definidas;
- requisitos funcionais e não funcionais já confirmados;
- requisitos de mobile, performance, SEO, acessibilidade, analytics e privacidade, quando aplicáveis e confirmados;
- integrações necessárias, sem executá-las;
- critérios de aceite conhecidos;
- lacunas e decisões ainda pendentes;
- fontes utilizadas para cada decisão material.

## 3. Justificativa

O repositório inicial continha somente `README.md`. Sem uma baseline funcional canônica, qualquer implementação material dependeria de memória, contexto externo ou inferência, aumentando risco de drift e retrabalho.

A documentação do escopo é a menor ação útil antes de escolher arquitetura, escrever código ou configurar deploy.

## 4. Pré-condições e gate live

Pré-condições já satisfeitas:

- [x] Repositório canônico criado e acessível.
- [x] Branch canônica identificada como `main`.
- [x] Kit mínimo SFJM preparado nesta PR.
- [x] Autorização explícita recebida em `2026-08-23` para canonicalizar a baseline funcional em PR exclusivamente documental.
- [x] Autorização explícita recebida em `2026-08-23` para merge da baseline somente após pré-merge validado.

### Gate obrigatório no início da execução

Não persista como checkbox estático o lifecycle do próprio onboarding. Antes de iniciar a baseline:

1. resolver `main` live;
2. confirmar que os documentos SFJM deste onboarding estão presentes no `main` resolvido;
3. confirmar que não surgiu mudança material incompatível com esta ação;
4. se qualquer verificação falhar, parar sem criar implementação.

A integração do onboarding é, portanto, uma condição live resolvida no momento da execução, e não uma pendência documental que exigiria uma PR de reconciliação apenas para marcar checkbox.

## 5. Escopo permitido

A ação autorizada poderá incluir somente:

- leitura não destrutiva de materiais disponíveis como fonte;
- criação/edição de documentação de baseline em branch dedicada;
- registro explícito de lacunas, decisões e requisitos confirmados;
- abertura de pull request documental;
- validação pré-merge da PR documental;
- merge da PR documental somente se o pré-merge passar sem blocker material.

## 6. Limites explícitos

Não inclui:

- código de aplicação;
- alteração de UI ou conteúdo publicado;
- escolha de tecnologia por inferência;
- criação ou alteração de Vercel, domínio, DNS ou hosting;
- deploy, preview público ou produção;
- criação de formulário ou integração externa;
- analytics, pixels, tags ou campanhas;
- credenciais, segredos ou dados pessoais;
- qualquer implementação material após o merge da baseline.

## 7. Autorização

- Autorização necessária: `sim`
- Autoridade: responsável pelo projeto
- Registro da autorização: instrução explícita do usuário em `2026-08-23`, a ser preservada por este registro quando integrado
- Escopo exato autorizado: canonicalizar a baseline funcional inicial em PR exclusivamente documental e fazer merge somente após pré-merge validado
- Validade/condição: limitada à baseline documental; não se propaga para implementação, publicação, deploy ou integrações

Autorização para a baseline e seu merge condicional não autoriza implementar, publicar ou fazer deploy.

## 8. Plano mínimo

1. Resolver `main` live e aplicar o gate da seção 4.
2. Identificar as fontes disponíveis que sustentam a baseline.
3. Extrair somente fatos/decisões verificáveis e separar lacunas.
4. Criar a baseline em branch dedicada.
5. Validar consistência com bootstrap, handoff, status e bloqueios.
6. Abrir PR exclusivamente documental.
7. Executar pré-merge: diff, escopo, conflitos, reviews/threads e checks disponíveis.
8. Se houver blocker material, corrigir e repetir o pré-merge.
9. Se o pré-merge passar, fazer o merge usando o HEAD exato validado.
10. Parar após verificar o novo `main`; não iniciar implementação.

## 9. Verificação de conclusão

- baseline documental integrada em `main` após pré-merge aprovado;
- nenhuma alteração de código, ambiente ou integração incluída;
- requisitos confirmados apontam para fonte ou autoridade;
- decisões ausentes continuam marcadas como pendentes;
- nenhum deploy, domínio, Vercel ou integração foi alterado;
- diff permaneceu exclusivamente documental;
- novo `main` foi resolvido após o merge.

## 10. Condições de parada

Pare sem avançar se:

- o estado live de `main` divergir materialmente do esperado;
- os documentos SFJM do onboarding não estiverem integrados quando a baseline começar;
- surgir blocker material no pré-merge;
- uma fonte necessária não estiver disponível e a ausência impedir declarar requisito sem inferência;
- surgir implementação, deploy ou integração fora do escopo;
- houver conflito entre os documentos SFJM;
- for necessário inferir requisito material.

## 11. Próximo estado

Após integração da baseline, atualizar o estado SFJM na própria PR da baseline quando necessário para refletir o novo significado material e definir uma nova única próxima ação segura. Não iniciar automaticamente arquitetura, implementação ou deploy.
