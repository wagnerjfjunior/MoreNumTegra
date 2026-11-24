# Auditoria MoreNumTegra — atualização de estado A01–A15

Data da atualização: 2026-11-24. Documento de continuidade preparado na PR #598, **não integrado à `main` até merge autorizado**.

## Fontes / corte

- Fonte canônica GitHub `main 5629c9035a6f60be002e9ebe03bfc225544f1d4b`; incorpora #595 (guia FGTS), #596 (imagens), #599 (links RJ), #600 (contexto Form46) e #601 (copy de sete empreendimentos RJ).
- Vercel Production READY `dpl_34zZ9Nhko7bTRSuyqJQGJbT82B9S`, atrelada à `main` / #601. Não extrapolar READY para prova de indexação.
- Pacote auditoria histórico PR #597: leitura de 84 URLs sitemap + 5 extras, 10 funis, 15 ações A01–A15, GSC selecionado 20/08–20/11 e OpenSEO crawl 14/11 (fotografias históricas).
- Prova de recepção Form46: captura de tela fornecida pelo proprietário em 24/11, com campo adicional `texto-livre` contendo `Universo Tatuapé Órbita | Condições e disponibilidade — Universo Tatuapé Órbita, tipologia de 1 dormitório | Interesse: FGTS`. Dados pessoais do lead não são reproduzidos aqui.

## Matriz auditável de progresso

| ID | Prioridade original | Estado em 24/11 | Evidência e residual |
| --- | --- | --- | --- |
| A01 | P0 | IMPLEMENTADO EM PRODUÇÃO | PR #599 merged, 18 links de seis páginas RJ apontam para URL canônica dos projetos; revisão HTTP móvel completa não certificada |
| A02 | P0 | IMPLEMENTADO / CRM CONFIRMADO | PR #600 merged, 33/33 testes de navegador com cinco viewports; campo `Interesse: FGTS` recebido na Green Sales; intenção enviada no exemplo foi `Condições e disponibilidade` |
| A03 | P1 | PREPARADO / SEM MERGE | PR #602 draft, um destaque no `/blog/` aponta ao guia FGTS; correção CSS móvel escopada para overflow preexistente de 405px em tela de 360px; 10/10 verificações editoriais estáticas; smoke estrito, LVR e aceite dependem de evidência do último head |
| A04 | P1 | PENDENTE | Hubs de região e links recíprocos por produto |
| A05 | P1 | PENDENTE | Capiitolo e DSG Itaim; verificar fatos antes de ampliar copy |
| A06 | P1 | PENDENTE | CTR/snippets com consulta e URL atuais; não presumir efeito de #601 em dados anteriores |
| A07 | P1 | PENDENTE | Artigo Claris e destino comercial RJ, preservando Form47 |
| A08 | P1 | PENDENTE | Separar FGTS residencial de studio/sala comercial |
| A09 | P1 | PENDENTE | Status Garden Design em artigos Lapa; depende fonte oficial |
| A10 | P2 | PENDENTE | Cluster de estágios por bairro |
| A11 | P2 | PENDENTE | Pontes contextuais dos artigos Dicas |
| A12 | P2 | PENDENTE | URLs legadas fora de sitemap e auxiliares noindex |
| A13 | P2 | PARCIALMENTE ATENDIDO PELA A01 | Fragmentos quebrados do RJ corrigidos; revisar pertinência dos relacionados ainda pendente |
| A14 | P2 | PENDENTE | Paridade schema/HTML e elegibilidade real a rich results |
| A15 | P2 | PARCIAL | Evidência CRM de A02 existe; GA4/GSC por funil ainda não verificados |

## Ajustes metodológicos para a próxima etapa

1. A contagem de 84+5 da PR #597 se refere à fotografia de 23/11. Novas edições em #600/#601 exigem reauditoria de HTML/links por amostra antes de alegar inventário novo. Não extrapolar o crawler de 14/11 para a produção atual.
2. A03 foi escolhida por uma lacuna confirmada no HTML de `src-greenn/blog/index.html`: a capa não possuía link ao guia FGTS embora `/blog/mercado/` já possuísse. A PR #602 altera somente um card, preserva a matéria Lapa em outra seção da capa e não cria claim comercial.
3. A revisão externa pelo Claude de **todas** as 89 URLs não está confirmada como concluída no material da PR #597. Não marcar parecer independente como PASS sem leitura verificável.
4. O SFJM de `main` ainda relata #595 sem merge nos quatro ponteiros; a PR #598 corrige essas divergências **somente se mesclada**. Não reportar reconciliação publicada antes do merge.
5. Gate sequencial após esta atualização: validar A03 em LOCAL_LIVE_SYNC (360/390/430/900/1440), obter aprovação de merge separada, conferir Vercel READY e URL real; A04 permanece separada.

**Limites:** sem IndexNow, novo sitemap, tráfego pago, alteração de CRM, media, preço, disponibilidade ou garantia de uso de FGTS. Este documento é evidência de status proposto, não autorização de execução de A04–A15.
