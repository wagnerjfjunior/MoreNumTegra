# Dicas & Decoração — dez artigos publicados — 26/10/2026

As dez páginas foram publicadas após a reiteração expressa do usuário. PRs #486–#495 integrados individualmente, 40/40 workflows SUCCESS nos heads finais. O bloqueio de CAPTCHA não foi contornado; os testes externos indisponíveis permanecem não executados.

## Produção comprovada

- Projeto Vercel: morenumtegra (`prj_f8r2PwQ42f38CWUjOGpEStkjmaqt`), production, READY.
- Deploy: `dpl_EbqLXnC4bpz6YnVMD3m9rBPLDP25`; fonte main `35c157f03f2a7477dde9fae5f0fc35a304c29e3a`; alias www.moretegra.com.br.
- Dez artigos HTTP 200, conteúdo servido idêntico ao source preparado, canonical próprio, um H1, robots sem noindex e quatro entidades JSON-LD com parse válido.
- Dez slugs antigos respondem HTTP 301 diretamente ao slug novo. Sitemap e catálogo incluem os dez artigos.
- 27 recursos/destinos únicos HTTP 200, incluindo os cinco novos WebP conceituais e as imagens externas.
- Evidência: MNT_DECOR_10_PRODUCAO_HTTP_2026-10-26.json. O teste inicial leu Location com caixa incorreta; a segunda coleta de headers corrigiu a aferição e confirmou os dez destinos. Não houve alteração de rotas para resolver isso.

| Nº | Artigo | PR | Merge SHA | Novo / antigo |
|---|---|---|---|---|
| 1 | [Salões de festas](https://www.moretegra.com.br/blog/dicasedecor/salao-festas-espaco-gourmet-como-avaliar/) | [#486](https://github.com/wagnerjfjunior/MoreNumTegra/pull/486) | dac009434bdb44506c7a040a60fe45adc8175c42 | 200 / 301 |
| 2 | [Garagem](https://www.moretegra.com.br/blog/dicasedecor/vaga-garagem-apartamento-acesso-manobra/) | [#487](https://github.com/wagnerjfjunior/MoreNumTegra/pull/487) | 309fef73d34474a82c667084aeee035bafcc3b58 | 200 / 301 |
| 3 | [Iluminação artificial](https://www.moretegra.com.br/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/) | [#488](https://github.com/wagnerjfjunior/MoreNumTegra/pull/488) | cf44e3c445b85bcfc1f9a99f886742899bfec5de | 200 / 301 |
| 4 | [Brinquedoteca](https://www.moretegra.com.br/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/) | [#489](https://github.com/wagnerjfjunior/MoreNumTegra/pull/489) | bd881370030fcb093cef74178ae8930d55ed22df | 200 / 301 |
| 5 | [Apartamento com pets](https://www.moretegra.com.br/blog/dicasedecor/apartamento-com-pets-layout-materiais/) | [#490](https://github.com/wagnerjfjunior/MoreNumTegra/pull/490) | a8eaed8080f2d8ce235ba5096033d281353d1078 | 200 / 301 |
| 6 | [Quadras esportivas](https://www.moretegra.com.br/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/) | [#491](https://github.com/wagnerjfjunior/MoreNumTegra/pull/491) | d942e7d33c5b7ffdaeee00827c4f754703118d33 | 200 / 301 |
| 7 | [Recarga elétrica](https://www.moretegra.com.br/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/) | [#492](https://github.com/wagnerjfjunior/MoreNumTegra/pull/492) | fd2c163348317b92da1de934dda3af3992889b91 | 200 / 301 |
| 8 | [Casas em condomínio](https://www.moretegra.com.br/blog/dicasedecor/casa-condominio-layout-claris-barra/) | [#493](https://github.com/wagnerjfjunior/MoreNumTegra/pull/493) | 4767ef489e390fd15129b56a7cf15ce7410a30e2 | 200 / 301 |
| 9 | [Pisos](https://www.moretegra.com.br/blog/dicasedecor/piso-apartamento-materiais-acustica-umidade/) | [#494](https://github.com/wagnerjfjunior/MoreNumTegra/pull/494) | 0d177b9545d255ae87f3e3ce2ad457e2c5c1465b | 200 / 301 |
| 10 | [Cores e paletas](https://www.moretegra.com.br/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/) | [#495](https://github.com/wagnerjfjunior/MoreNumTegra/pull/495) | 35c157f03f2a7477dde9fae5f0fc35a304c29e3a | 200 / 301 |

## Busca

IndexNow aceitou 21 URLs: dez novas, dez redirecionadas e a categoria. Isso notifica Bing e parceiros, não o Google. Inspeção GSC das dez novas URLs retornou “O Google não reconhece o URL”, sem crawl/indexação confirmados. O conector disponível não oferece solicitação individual de indexação Google. Sitemap público atualizado; não se declara indexação nem submissão individual Google.

## Limites e continuidade

Schema.org oficial, Google Rich Results, render mobile/toque/overflow/teclado e métricas de performance NÃO EXECUTADOS. Testes de source e CI não equivalem a esses testes. O usuário reiterou publicação mesmo após o histórico de indisponibilidade; a ausência desses resultados fica registrada sem PASS inventado.

As fontes integrais, hashes, decisões editoriais e DE/PARA permanecem nos recibos individuais e no JSON de execução atualizado. Cinco ilustrações de IA são explicitamente conceituais e não representam projetos reais. Quatro interiores de acervo não comprovam tipo de piso, cor Pantone ou instalações pet. Autoria editorial real e papel comercial de Sabrina em SP mantidos.

As mensagens anteriores de rascunho/bloqueio para estes dez artigos são histórico, superadas por este recibo de produção. Continuar com QA visual e testes oficiais quando a navegação voltar a funcionar, e acompanhar cobertura de busca sem promessa de indexação. Não é necessária nova autorização para concluir o trabalho já ordenado.

Rollback: reverter os merges por PR em ordem inversa #495→#486, conferindo sitemap/rotas/catálogo; não usar reset ou force push em main. Um revert exige nova verificação do deploy e HTTP.
