# MNT-SEO-INVEST — Gate de sitemap e continuidade (24/11/2026)

Status: candidato na PR #612, não integrado à main. Autorização do proprietário para corrigir lastmod e seguir a frente de investimentos. Base main verificada: ed9978d75da3b3d7888b8bfd532c4f315b1f5052.

## Regra operacional

Toda alteração material em conteúdo indexável deve incluir a atualização do lastmod da URL correspondente no sitemap.xml, na mesma PR, com a data efetiva da alteração. Não atualizar datas de páginas não alteradas, não substituir canonical e não modificar validadores para contornar falhas. Conferir diff, existência única da URL e CI antes de solicitar merge. Alterações exclusivamente documentais não justificam lastmod.

## Evidências da PR #612

Head anterior 31fe9ceda4638e29bce1efcf7c5a1431752e9b21: Favicon PASS, SEO two distinct images PASS, Sitemap lastmod FAIL. Causa observada: URL do hub de investimentos com lastmod 2026-11-14 após atualização material de 24/11. Commit corretivo c9d6c647f7e378b86f1de79542faf16dc0d304ca: uma única linha alterada para 2026-11-24; nenhuma outra URL alterada. Novo CI ainda não certificado neste registro.

## Continuidade INVEST

Baseline GSC 21/08–21/11: 14 impressões, 1 clique, CTR 7,14%, posição média 8,4; URL indexada, canonical coincidente. PR #612 melhora metadata, copy, conteúdo regional, ItemList, FAQ e inclui simulador. 15 cards e Form46 preservados por inspeção estática. Valores conflitantes de Órbita/DSG pausados até confirmação. Próximo gate: CI do head final e LOCAL_LIVE_SYNC (360/390/430/900/1440), filtros, ordenação, simulador, CTA e Form46 sem envio real. Merge/deploy somente com autorização específica. Depois: páginas transacionais distintas, links bidirecionais e seis artigos prioritários; não alterar outras frentes nem publicar preços não confirmados.
