# Plano de publicação individual — Mercado

Estado: PROPOSTA, não autoriza merge, alteração de indexabilidade ou submissão.

## Ordem recomendada

1. Infraestrutura do entorno (P1): conteúdo de apoio aos guias e regiões; resolver primeiro a dependência da Lapa já publicada.
2. Mooca/Tatuapé (P1): apoio à regional Tatuapé e ao Órbita, com consulta de marca já observada; sem deslocar a intenção comercial para o artigo.
3. Itaim Bibi (P1): apoio à regional e ao DSG, sem assumir que procura transacional comprova demanda pelo guia.
4. Sustentabilidade (P2): diferenciar operação geral dos guias específicos de Dicas.
5. IPTU (P2): conferir regras e exercício imediatamente antes de publicar.
6. Investimento de longo prazo (P2): base do cluster financeiro.
7. FIIs/imóvel físico (P2): revisão tributária e de adequação editorial antes do release.
8. Critérios de valor no alto padrão (P2): manter pergunta de compra, sem duplicar análise de renda.
9. Investimento em luxo (P2): conferir SERP exata ainda pendente; manter cenários financeiros próprios.
10. Inventário (P2): conferir norma consolidada e requisitos jurídicos/estaduais.
11. Orla da Barra (P3): confirmar aderência editorial ao portal SP; sem inventar oferta no Rio.

As prioridades refletem papel comercial e lacunas editoriais. Não são ranking de volume de busca ou previsão de leads.

## Gate por página

1. Reconciliar main, PRs e Production novamente; selecionar apenas a página autorizada.
2. Aprovar texto, H1, slug, mídia, fontes e intenção, inclusive relação com URLs existentes.
3. Conferir links entre candidatos. Enquanto destinos não estiverem publicados e aprovados, retirar os links da página de release ou publicar a dependência primeiro por gate próprio; não encaminhar leitores para placeholder ou rascunho. Os links da preparação são verificáveis localmente, mas não demonstram destino já publicado.
4. Homologar o head exato por Local Live Sync. Revisar 360/390px e desktop, tabelas, cards, imagens, foco, dock, WhatsApp e destino Form 46, sem envio real não autorizado.
5. Executar testes oficiais por código quando utilizáveis, checks locais/CI do head e revisão das fontes quantitativas/jurídicas. Registrar avisos, falhas e pendências.
6. Obter autorização de merge/conteúdo para aquela URL. Preview não deve ser presumido utilizável e produção não será ambiente de rascunho sem decisão expressa.
7. Para migração, avaliar o HTTP e o papel da antiga rota. As onze origens existiam publicamente como noindex; um 301 permanente só deve ser introduzido quando houver necessidade real de substituir essa rota, com aprovação e destino correspondente. Não criar cadeias ou redirects de rotas inexistentes.
8. Liberação de indexação é autorização separada. Então remover noindex apenas da URL aprovada, atualizar hub/catálogo/sitemap com canonical www e verificar que não há referências antigas conflitantes.
9. Resolver o deployment Git-driven READY no SHA do merge; validar HTTP, canonical, robots, imagens, links e sitemap no host real. Inspecionar separadamente redirects aplicáveis.
10. Submeter ao Google/Bing apenas por mecanismo disponível e autorizado. Guardar comprovante; envio aceito não comprova indexação. Não submeter páginas noindex.

## Rollback

Antes de cada release, registrar main/runtime anterior, deployment, merge e arquivos da página. Reverter o commit de release por PR rastreável quando necessário; não resetar main nem remover outras páginas aprovadas.

Se o release incluir descoberta, sitemap ou migração, o revert deve considerar esses arquivos no mesmo escopo e testar o comportamento resultante. Revalidar o deployment de rollback e as URLs envolvidas. Um retorno de código não desfaz instantaneamente rastreamento ou indexação externa.

## Acompanhamento

Guardar data de publicação e versões de title/descrição. Observar consulta × página em janelas comparáveis, distinguindo novas páginas de URLs antigas e intenção comercial de informativa. Usar cliques/impressões/CTR/posição reais; não comparar contagens de frequência com desempenho.

Relacionar contatos e qualidade apenas quando houver evidência de CRM e mensuração válida, sem enviar PII ao Analytics. Clique no WhatsApp ou abertura do formulário não é lead qualificado. Se uma consulta aparecer em várias páginas, investigar o owner predominante e o efeito observado antes de chamar a sobreposição de canibalização prejudicial.
