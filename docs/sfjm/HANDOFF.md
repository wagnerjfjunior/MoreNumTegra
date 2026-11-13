# Handoff da branch — Base de demanda SEO do Rio

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-13.

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `docs/seo-rio-base-20261113`, criada a partir da `main` em `4ed7151` (#561 a #564 mergeadas e publicadas).
- PR: só documentação, aberta para a `main`. Merge com aprovação do Wagner.

## O que esta branch registra

- `docs/seo/rio-2026-11-13/`: estudo do Wagner (9 exportações do Keyword Planner e 4 estudos do Trends, originais), consolidado em UTF-8 com 1.446 termos do Rio, script de consolidação e `README.md` com limites, achados, hipóteses, decisões e o pedido ao especialista.
- `docs/NEXT_SAFE_ACTION.md`: entrada de 13/11 com o estado de produção do Rio e a próxima ação. Substitui o handoff da #564, que ficou na `main`.

## Estado de produção conferido (2026-11-13)

- `/rio-de-janeiro/`, `/rio-de-janeiro/regioes/` e `/rio-de-janeiro/regioes/oeste/barra-da-tijuca/`: 200, cada uma com canonical próprio e presentes no sitemap.
- `/rj/regioes/...`: 404 (decisão do Wagner: não estavam indexadas).
- Estandes (`RealEstateAgent` `#estande-tegra`) com `image`, `telephone` `+5511951667227` e `priceRange` "A partir de R$ X". O RIIO fica sem `priceRange`, porque a página dele não mostra preço.

## Próxima ação (única)

Conversa nova: rodar o especialista em SEO sobre as 10 páginas do Rio e entregar o plano do hub e das páginas, conforme `docs/seo/rio-2026-11-13/README.md`, seção "Pedido ao especialista".

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário — plano SEO do Rio.
Leia ao vivo, na main (ou na branch docs/seo-rio-base-20261113 se a PR ainda não foi mergeada):
docs/NEXT_SAFE_ACTION.md (entrada de 13/11), docs/seo/rio-2026-11-13/README.md e
docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md (seções 12 e 13).
Confira se a main está em 4ed7151 ou depois e se as 10 páginas do Rio respondem 200 em produção.
Depois rode o especialista em SEO (skills seo-aeo-geo-ultimate) como auditoria independente,
num agente separado, e entregue o plano do hub /rio-de-janeiro/ e das páginas do Rio
(mapa palavra-chave → página, plano por página, páginas novas, plano de ação).
Use o arquivo 08 (Google, RJ) como base principal. "Em construção" e "na planta": minha
sugestão é mesclar, mas quem decide é o especialista, com justificativa.
Não altere páginas nem faça merge sem minha aprovação. Separe fato, hipótese e opinião.
```
