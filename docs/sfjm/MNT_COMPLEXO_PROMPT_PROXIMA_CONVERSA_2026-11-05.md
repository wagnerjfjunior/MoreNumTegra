# Prompt canônico para nova conversa — Complexo Lapa–Pirituba — 05/11/2026

> Copiar somente o conteúdo da seção "PROMPT PARA COLAR" para iniciar outra conversa.

## PROMPT PARA COLAR

Estamos continuando o projeto **MoreNumTegra**, especificamente o simulador do **Complexo Lapa–Pirituba**, sob governança **SFJM**. NÃO comece do zero e NÃO se baseie apenas num resumo superficial deste chat. O repositório canônico é **wagnerjfjunior/MoreNumTegra**, e a `main` é a fonte de verdade.

**Primeiro, obrigatoriamente:**
1. Consultar ao vivo o GitHub e a Vercel, confirmando branch, SHA da `main`, PRs, deployment READY e alias `www.moretegra.com.br`. Não inventar estado.
2. Ler integralmente `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`.
3. Ler **`docs/sfjm/MNT_COMPLEXO_HANDOFF_INTEGRAL_ESTADO_LIVE_2026-11-05.md`**, o dossiê desta continuidade; consultar também as referências de baseline e documentos SFJM indicados nele.
4. Separar rigorosamente fatos LIVE, histórico, alterações pendentes, QA estático e QA visual.

**Último estado operacional verificado em 05/11/2026, antes do merge documental:** GitHub `main` commit `0f5a059d1c42b1ad4b33c96e5a542a18e8d6181c` (PR #550); Vercel Production READY `dpl_7BY6Jjk6Vq3vdh9WBAtspJtCSX7q`, domínio `www.moretegra.com.br`, alias sem erro. Rollback imediatamente anterior `dpl_NNXvsx7EyThGjhiuyERzvrnkLFSW`, commit `fcebc6ccc62ebb2e5e0e8ebebaba8f9e87c12ca4` (PR #549). Se este prompt tiver sido mergeado depois, o SHA da main poderá ser outro **apenas por documentação**, e é obrigatório confirmar o deploy live; não assuma que o SHA acima continua sendo o head.

**O que está implementado:** PR #542 C7, #543 C5/C6, #544 seletor principal acima do mapa e retirada dos três botões, #545 correções de legenda e controles, #546 remoção de controles duplicados e referências C2, #547 remoção de blocos explicativos após simuladores, #548 simuladores antes de "Perspectivas do projeto", #549 linguagem simples e limpeza técnica de todos os players, #550 correção de altura do iframe do C3. PRs #542–#550 estão MERGED, conforme GitHub.

**Problema prioritário atual:** Usuário enviou imagem de iPhone com enorme espaço branco sob o mapa do cenário 3 (Lapa / Pirituba → Marginal Pinheiros). A imagem foi obtida **ANTES** do merge #550. A PR #550 removeu `min-height:920px` no mobile, incluiu altura responsiva para `marginalDualEmbed` no `index.html`, e `ResizeObserver` / `postMessage` no `marginal-duplo/index.html`. A Vercel publicou esta versão como READY, mas **a correção ainda não teve aceite visual no iPhone após a publicação**. Próxima ação: obter/avaliar evidência pós-PR #550 e, se o branco persistir, diagnosticar CSS/altura/postMessage em produção. Não refazer rotas, não declarar problema resolvido visualmente sem evidência. LVR não está disponível para o usuário; testes recentes ocorreram em produção mediante autorização explícita e rollback preparado.

**Regra de UX inegociável:** o site é para população geral, não para engenheiros. Não exibir explicações de SVG, LVR, SFJM, arquivos, calibração, contagem de carros ou justificativas técnicas. Deixar a interface premium, mobile-first, com seletor de trajetos no topo, controles de sentidos corretos, zoom e mapa. C7 tem legenda própria; não herdar controles de C6. Preservar integridade dos trajetos SVG, carros e cores aprovados. O FAQ e a fonte histórica geral são informação factual, não notas técnicas nos cenários.

**C8/C9:** existem SOMENTE na branch divergente `feat/complexo-cenarios8-9-editor-prancha7-20261105`, fora da produção. Reutilizam a prancha C7 e cada um precisa de dois trajetos independentes:
- C8 Av. Raimundo → Av. Mercedes; Av. Raimundo → Rua Diogo Ortiz / Estação Domingo de Moraes.
- C9 Av. Mercedes → Av. Raimundo; Rua Diogo Ortiz / Estação Domingo de Moraes → Av. Raimundo.
As coordenadas ainda são ZERO e não existem carros publicados. O último compare live daquela branch contra main estava diverged, 11 ahead e 7 behind. **Não mergear a branch diretamente nem inventar pontos!** Se retomarmos, criar integração limpa a partir da main atual após receber JSON validado/autorizações.

**Governança de alterações:** cada mudança em branch curta, comparar diffs, proteger C1–C7, JS/HTML validação estática, PR com head SHA confirmado, merge somente quando autorizado, Vercel READY com SHA e alias exatos. Salvar rollback real para cada publicação; não force-push/reset. Não mexer em Greenn, Form 46, SEO global, rotas ou CRM sem autorização específica.

**Como responder:** ser direto, técnico na análise mas linguagem humana na interface. Dizer o que foi verificado, qual o problema real, quais arquivos serão mudados, o que será preservado, status de deploy e rollback. Não prometer trabalhos em background. Não pedir ao usuário para repetir informações documentadas no SFJM.

Agora recupere o contexto integral e o estado live, apresente um diagnóstico executivo do projeto e prossiga a partir da próxima solicitação que eu fizer.

## FIM DO PROMPT
