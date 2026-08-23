# Próxima Ação Segura — MoreNumTegra

> Este é o registro autoritativo da única próxima ação segura do projeto após a integração do onboarding SFJM.

- Definida em: `2026-08-23`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Âncora inicial pré-onboarding: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Responsável pela execução: responsável pelo projeto
- Estado: `bloqueada até autorização explícita`

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

## 4. Pré-condições

- [x] Repositório canônico criado e acessível.
- [x] Branch canônica identificada como `main`.
- [x] Kit mínimo SFJM preparado.
- [ ] Onboarding SFJM integrado em `main`.
- [ ] Autorização explícita para iniciar a baseline funcional.
- [ ] Fontes existentes do produto identificadas para leitura e consolidação.

Se qualquer pré-condição obrigatória permanecer pendente, esta ação continua bloqueada.

## 5. Escopo permitido

Quando autorizada, a ação poderá incluir somente:

- leitura não destrutiva de materiais indicados como fonte;
- criação/edição de documentação de baseline em branch dedicada;
- registro explícito de lacunas, decisões e requisitos confirmados;
- abertura de pull request documental para revisão.

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
- merge da futura PR sem autorização específica.

## 7. Autorização

- Autorização necessária: `sim`
- Autoridade: responsável pelo projeto
- Registro da autorização: `pendente`
- Escopo exato autorizado: `pendente`
- Validade/condição: somente para a baseline documental quando concedida

Autorização para preparar a baseline não autoriza implementar, publicar, fazer deploy ou fazer merge.

## 8. Plano mínimo

1. Resolver `main` live e confirmar que o onboarding SFJM está integrado.
2. Identificar as fontes do produto que poderão sustentar a baseline.
3. Extrair somente fatos/decisões verificáveis e separar lacunas.
4. Criar a baseline em branch dedicada.
5. Validar consistência com bootstrap, handoff, status e bloqueios.
6. Abrir PR documental e parar antes do merge.

## 9. Verificação de conclusão

- baseline documental existe em branch/PR dedicada;
- nenhuma alteração de código, ambiente ou integração foi incluída;
- requisitos confirmados apontam para fonte ou autoridade;
- decisões ausentes continuam marcadas como pendentes;
- nenhum deploy, domínio, Vercel ou integração foi alterado;
- diff permanece exclusivamente documental.

## 10. Condições de parada

Pare sem avançar se:

- o estado live de `main` divergir materialmente do esperado;
- o onboarding ainda não estiver integrado;
- faltar autorização para a baseline;
- uma fonte necessária não estiver disponível;
- surgir implementação, deploy ou integração fora do escopo;
- houver conflito entre os documentos SFJM;
- for necessário inferir requisito material.

## 11. Próximo estado

Após conclusão e eventual integração da baseline, atualizar o estado SFJM somente se o significado material do projeto tiver mudado e definir uma nova única próxima ação segura. Não iniciar automaticamente arquitetura, implementação ou deploy.
