# SFJM — Mozae Inteligência de Mercado PR #504 — release e rollback (27/10/2026)

## Autorização / escopo
Proprietário autorizou expressamente: tornar PR #504 Ready, merge e teste em produção porque Live Sync não funciona, **com rollback estruturado**, e manter tipologias **46 m² / 73 m²** conforme PDF Inteligência de Mercado Mozae (11 páginas).

Escopo aprovado: textos de plantas, lazer, localização, link regional; ajustes de snapshot estritamente necessários ao CI. Não mudar preços, estoques, canal de captação, SEO estrutural ou outras páginas.

## Baseline de retorno ANTES do release
- Repositório `wagnerjfjunior/MoreNumTegra`, `main` ANTES da PR: `b92575b2ab33357f8ed59ccc38305e0881a460d8` (PR #503).
- Vercel Production READY pré-release: `dpl_32Vu22Sy7WSf2bTwgBTLS54a8wFa`, source mesmo SHA.
- URL canônica: `https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/`.
- Página regional: `https://www.moretegra.com.br/regioes/higienopolis/`.
- Configuração aprovada do Mozae antes do release (ambos os HTMLs e guardas CI) permanece recuperável do SHA `b92575b2...`.

## Plano de rollback
1. Identificar a regressão e registrar evidência (URL, horário, resultado, dispositivo, console/rede se disponível), sem efetuar novo merge paralelamente.
2. Verificar se `main` ou Production mudou após o merge. Não reverter automaticamente outros commits.
3. Caminho preferencial Git-driven: gerar branch de recuperação a partir do `main` live; restaurar APENAS os arquivos desta PR da base `b92575b2...` (Mozae, região Higienópolis e os dois scripts de guarda de snapshot); conferir diff, executar CI; integrar correção/reversão aprovada, sem force-push. Identificar o SHA revertido na mensagem.
4. Alternativa emergencial quando houver pane funcional e urgência: usar o candidato Vercel `dpl_32Vu22Sy7WSf2bTwgBTLS54a8wFa` somente após conferir elegibilidade do rollback/promote, o domínio que receberá tráfego e autorização operacional. Reconciliação obrigatória de `main` para impedir redeploy posterior do código defeituoso. Não confundir build READY anterior com rollback automaticamente executado.
5. Pós-rollback: GET 200 nas duas URLs, canonical self-www, H1 único, Form 46 presente, WhatsApp, menu/CTAs, plantas 46/73, Schema JSON-LD estrutural e CI; registrar receipt e resultado real.

## Critérios de GO
- 8 GitHub workflows SUCCESS no HEAD exato após atualização do snapshot autorizado;
- tipologias 46/73 m² confirmadas em H1/meta/plantas/FAQ; metragem das ofertas específicas separada;
- dados, imagens, preços, estoque e Form 46 inalterados;
- Vercel Production READY no commit resultante do merge;
- smoke externo GET e teste mobile na produção conforme acesso possível.
- Rich Results oficial, Lighthouse/INP, CRM real e QA físico ficam NOT_VERIFIED se não realizados.

## Alertas preexistentes
- A FAQ/JSON-LD ainda contém AP0301/R$ 721.510 na página comercial; a PR #474 define ofertas específicas AP0412 44,85m² e AP807 ~72m² na Home. Não atualizar preço sem nova validação de Product Truth; este release não altera condições.
- A pesquisa de público não informa base amostral/data de campo; seus percentuais não foram publicados como estatística atual.
- O documento tipológico do projeto apresenta 46/73m²; áreas privativas exatas das unidades podem variar.

## Resultado release
Pendente de preencher após integração: head exato, checks, commit merge, deployment READY, testes HTTP, status do rollback (armado/não acionado).
