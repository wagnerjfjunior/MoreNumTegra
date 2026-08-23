# Bootstrap Canônico — MoreNumTegra

> Ponto de entrada operacional para iniciar ou retomar o projeto sem depender do histórico de uma conversa.

## 1. Identificação

- Projeto: `MoreNumTegra`
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Âncora inicial pré-SFJM: `3f45ac60352f917f32c6b9d52eecae414313cb68`
- Onboarding SFJM integrado em: `2819cc158d8775137c992fa2fd147e1c3806e38e`
- Data de referência: `2026-08-23`
- Autoridade pelo estado do projeto: proprietário/responsável pelo projeto

## 2. Regra de canonicalidade

A fonte canônica do MoreNumTegra é o conteúdo versionado e integrado em `main` no repositório `wagnerjfjunior/MoreNumTegra`.

Em caso de divergência:

1. prevalece o estado resolvido live de `main` e os documentos canônicos nele integrados;
2. branches e pull requests representam propostas até o merge;
3. conversas, memórias e resumos locais podem fornecer proveniência, mas não substituem material integrado;
4. informação ausente permanece ausente e não deve ser preenchida por inferência;
5. fatos de lifecycle que possam mudar devem ser resolvidos live antes de decisões sensíveis.

## 3. Ordem mínima de leitura

Leia, nesta ordem:

1. `handoffs/CURRENT.md`
2. `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
3. `docs/PROJECT_STATUS.md`
4. `docs/NEXT_SAFE_ACTION.md`
5. `docs/BLOCKED_ACTIONS.md`
6. `README.md`

Se `docs/baseline/FUNCTIONAL_BASELINE_V1.md` não estiver presente em `main`, não presuma que a baseline candidata foi integrada; resolva a PR/branch live.

## 4. Estado confirmado

- O repositório canônico existe em `wagnerjfjunior/MoreNumTegra` e usa `main`.
- O onboarding SFJM foi integrado no commit `2819cc158d8775137c992fa2fd147e1c3806e38e`.
- `docs/baseline/FUNCTIONAL_BASELINE_V1.md`, quando presente em `main`, é a autoridade funcional inicial do produto.
- A baseline funcional separa requisitos confirmados, comportamento apenas relatado e decisões ainda ausentes.
- Arquitetura, stack, deploy e integrações continuam fora da baseline funcional e exigem decisões próprias.

## 5. Lacunas e evidências indisponíveis

Ainda não estão estabelecidos como decisões técnicas canônicas:

- arquitetura e stack tecnológica;
- snapshot de implementação versionado no repositório;
- fonte de inventário/CMS/backend;
- contrato de formulário/CRM e tratamento de dados;
- analytics/pixels/tags;
- domínio, hosting e target de deploy;
- metas numéricas de performance/Core Web Vitals;
- target formal de acessibilidade;
- estratégia técnica de SEO;
- estratégia de testes e release.

Consequência: a baseline funcional não autoriza preencher essas lacunas por conveniência técnica.

## 6. Estado de autorização

### Permitido sem nova autorização

- leitura e inspeção não destrutiva;
- síntese de estado sustentada por evidência canônica;
- revisão da baseline funcional integrada;
- preparação de análise sobre lacunas sem mutação material.

### Exige autorização explícita

- nova baseline técnica/arquitetural ou decisão de stack quando envolver alteração canônica;
- implementação ou importação de código;
- merge sem autorização específica/condicional aplicável;
- publicação, deploy, domínio, DNS ou hosting;
- integrações externas, formulários reais, CRM, analytics ou pixels;
- uso de credenciais ou dados pessoais;
- campanhas, anúncios ou comunicação externa;
- expansão material de escopo.

## 7. Próxima ação segura

- Registro autoritativo: `docs/NEXT_SAFE_ACTION.md`
- Resumo derivado: definir e versionar a baseline técnica/arquitetural inicial, **somente após autorização explícita**, sem implementar produto.

Se este resumo divergir materialmente de `docs/NEXT_SAFE_ACTION.md`, pare e reconcilie antes de agir.

## 8. Ações bloqueadas

Consulte `docs/BLOCKED_ACTIONS.md`. Ausência de uma ação naquele arquivo não constitui autorização.

## 9. Instrução de retomada

Antes de agir:

1. resolva `main` live e registre o SHA observado;
2. confirme a presença da baseline funcional em `main`;
3. leia os arquivos da ordem mínima;
4. apresente no máximo 8 fatos confirmados;
5. declare lacunas e evidências apenas relatadas, quando relevante;
6. identifique a próxima ação em `docs/NEXT_SAFE_ACTION.md`;
7. compare a ação com `docs/BLOCKED_ACTIONS.md` e com a autorização vigente;
8. não execute uma etapa material apenas porque parece ser a sequência lógica.

## 10. Critério de atualização

Atualize este bootstrap somente quando houver mudança material em canonicalidade, ordem mínima, autoridade operacional, baseline vigente, referência da próxima ação ou bloqueio de retomada.

Mudanças de SHA, lifecycle de PR ou troca de conversa, isoladamente, não exigem reescrita se o significado operacional permanecer igual.
