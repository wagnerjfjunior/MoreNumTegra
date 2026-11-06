# SFJM — Simuladores antes das perspectivas do projeto — 05/11/2026

## Pedido e autorização
O usuário solicitou colocar a seção **Experiência interativa / Visualize os trajetos nos simuladores** antes de **Perspectivas do projeto**, com autorização explícita de merge e publicação. LVR indisponível; validação estática e conferência do deployment substituem somente os gates possíveis, sem equivaler à homologação visual no celular.

## Fonte canônica e escopo
- Repositório: `wagnerjfjunior/MoreNumTegra`; base `main`, verificada antes da alteração.
- Branch: `ux/complexo-simuladores-antes-perspectivas-20261105`.
- Arquivo funcional único: `src-greenn/complexo-lapa-pirituba/index.html`.
- Moveu, **sem alterar conteúdo interno**, os blocos HTML consecutivos `section.bridge-sim-intro` e `section#simuladores` (6.063 caracteres) do ponto imediatamente posterior à cronologia para o ponto imediatamente anterior a `section.bridge-section.bridge-visual`.
- Ordem resultante: seção de benefícios do projeto → experiência interativa → simuladores → perspectivas do projeto → cronologia → FAQ → fontes.
- Preservados todos os IDs, controles de sentido, seletores, iframes, scripts, SVGs, 12 opções disponíveis, cenários 1–7, mídia, SEO, FAQ, cronologia e anúncios.

## Evidências técnicas
- Comprimento HTML antes/depois idêntico; movimentação de trecho por cópia literal, sem reescrita dos handlers.
- Scripts JS inline compilados por `new Function` (**3 blocos PASS**).
- Referências singulares preservadas: `#simuladores`, `#route`, `#dualEmbed`, `#ayrtonEmbed`, `#marginalDualEmbed`, `#c7Player` e `#faq`.
- Nenhuma alteração na Greenn nem nos editores SVG dos cenários 8 e 9.

## Gate de publicação e rollback
- Comparar `main...branch`: apenas este HTML e este documento devem figurar no diff, sem commits atrás da main.
- Abrir PR e confirmar `mergeable=true`, usar `expected_head_sha` no squash merge.
- Conferir deployment Vercel Production READY com `githubCommitSha` exato e alias oficial `www.moretegra.com.br`.
- Registrar baseline do deployment READY imediatamente anterior, para rollback por promoção do deployment anterior ou revert **somente da PR**, sem reset forçado.
- QA visual mobile e desktop após publicação é pendente e não deve ser declarada concluída.
