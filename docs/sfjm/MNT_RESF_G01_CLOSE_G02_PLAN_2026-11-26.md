# RESF — encerramento operacional G01 e preparação G02

Data 26/11/2026. Fonte canônica main runtime `da69974eb1a959401cad92406eff458a1e2649fd`, PR #661, Vercel Production READY dpl_835EpVEGLGRV4J3ZNVG62RAF7p1u com alias www.moretegra.com.br confirmado. Owner autorizou consolidação documental e preparação G02; esta PR é docs-only, sem autorização implícita para mutação G02.

## G01 — INDEX_SUBMISSION_COMPLETE, QA_RESIDUAL_OPEN

PR #659 40eb19de (telefone), #660 dfebc9e7 (apresentação/WebMCP/schema), #661 da69974e (topologia JSON-LD). #661 altera apenas Service.provider em Ária/Mozae/Elo para Organization existente, e WebPage.mentions em ODE para projeto em vez de RealEstateAgent; todos os bytes fora JSON-LD e demais propriedades iguais. Sem novos preços, entidades ou ofertas. Testes oficiais enviados pelo proprietário confirmaram Schema.org Ária 4→5, Mozae 6→7, Elo 4→5, ODE 3→4, zero erros/avisos. Rich Results Elo 6, Mozae 10, ODE 4 pós #661; Ária 6 pré #661. RIIO 6 atribuídos provisoriamente (relatório não identifica URL). Ampère Rich Results 6 anterior. Contagem de itens raiz não equivale à cobertura integral do grafo; não criar entidades artificiais. Avisos não críticos de produto/merchant não detalhados; elegibilidade técnica não garante exibição no Google nem elegibilidade comercial real.

| URL canônica | Schema.org | Rich Results | Google solicitação | IndexNow submissão |
|---|---:|---:|---|---|
| https://www.moretegra.com.br/ | 3 | 3 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/ | 4 | 4 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/ampere-brooklin/ | 5 | 6 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/bem-moema/ | 5 | 6 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/tiel-vila-nova-conceicao/ | 5 | 6 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/aria-higienopolis/ | 5 | 6 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/ | 7 | 10 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/ode-perdizes/ | 4 | 4 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/ | 5 | 6 | USER_REPORTED | submitted |
| https://www.moretegra.com.br/empreendimentos/riio-by-piero-lissoni/ | 4 | 6 (provisório) | USER_REPORTED | submitted |

Resultados de diferentes releases, não bateria simultânea. Google 10/10 solicitações confirmadas pelo owner. OpenSEO project a071ab48-dda6-4b7c-bf71-2e3e3d40694d: host www.moretegra.com.br status submitted urlCount10 skipped[] keyCreated false; verificação da chave e processamento pelos motores ainda pendentes; não afirmar indexação. Não repetir submissão sem alteração. G01 retestes pós #660/#661 de PSI, acessibilidade, práticas/SEO, WebMCP, visual e browser/CRM pendentes; não certificar CI integral. Lacunas vagas Bem/Ária/Tièl, mídia responsiva Mozae/ODE, centralização CSS/runtime e governança GTM admin pendentes. Home V7 referência aceita, 4 medições reportadas (98/100/100/100, LCP1.4), gate 5 comparáveis e CrUX não fechados. Não reabrir JSON-LD sem evidência.

## Baseline de escala

Home performance; Ampère facts e semântica comercial (5/6 uma unidade; Mozae 7/10 três unidades); Órbita/ODE sob consulta 4/4 sem Product/Offer; Home hub 3/3; RIIO atendimento RJ próprio. Mozae formulário claro; #659 telefone 28 países + OTHER (29 opções), BR primeiro, OTHER segundo, 27 restantes na ordem Home; revoga proposta catálogo integral. Form46 SP e Form47 RJ explícitos, tenant313 e endpoint existentes, sem alteração de payload/consentimento/atribuição. Runtime opt-in runtime-resf-phone-v1.js?v=20261126-g01, não propagar sem auditar variantes; OTHER valida plausibilidade E164, não alcançabilidade. WebMCP 6/6 meta, duas ferramentas leitura e formulário confirmação manual, sem autosubmit. Facts único após hero, quatro slots com dados comprovados, zero hero-meta; sem inventar vagas. Galeria Órbita, preservar únicas amenidades, mapas CTA WhatsApp intactos. Performance meta 98–100, LCP<=1.8s excelência / <=2.5s piso, FCP<=1s, SI<=1.5s excelência, TBT<=50ms, CLS0; acessibilidade/práticas/SEO100. Cinco medições comparáveis antes/depois, não declarar field INP sem dados. Não trocar infraestrutura nem criar mídia pesada no GitHub. Procedimento export PSI Chrome DevTools: expandir details e botões aria-expanded=false, baixar document.body.innerText via Blob; não inferir dados ocultos do texto copiado.

## G02 — PREPARED, NOT_IMPLEMENTED

Sitemap em main da69974e: 92 URLs distintas, G01 10, restantes 82; G02 10 propostas sem sobreposição, 72 fora G01/G02. Seleção por relevância comercial, reutilização de mídia e cobertura RJ, não ranking GSC atual. Auditoria estática preliminar, números de Product não provam preço vigente. CAPIITOLO/DSG usar documento renderizado via fetch/document.write, auditar shell e overrides; não confundir grafo shell com resultado final.

| URL | Opções país atuais | Product no documento direto | Lacuna preliminar |
|---|---:|---:|---|
| https://www.moretegra.com.br/empreendimentos/nova-vivere/ | 3 | 1 | hero-meta; galeria; PNG externo; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/garden-design/ | 1 | 0 | galeria; perfil consulta; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/reserva-caminhos-da-lapa/ | 1 | 0 | galeria; perfil consulta; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/ | 7 | auditar renderizado | shell + experiments/capiitolo-editorial-v3/index.html; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/dsg-itaim/ | 7 | auditar renderizado | shell + experiments/dsg-itaim-editorial-v3/index.html; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/ypy-alto-do-ipiranga/ | 3 | 2 | hero-meta; galeria; duas unidades; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/bem-moema-studios-offices/ | 1 | 1 | manifesto mídia existente; galeria; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/teg-sacoma/ | 1 | 0 | manifesto; hero-meta; ausência RealEstateAgent; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/viso-moema/ | 1 | 0 | manifesto; ausência RealEstateAgent; dimensões hero; WebMCP ausente no arquivo inspecionado |
| https://www.moretegra.com.br/empreendimentos/kronos-by-tegra/ | 3 | 0 | RJ Form47; perfil comercial a verificar; WebMCP ausente no arquivo inspecionado |

Form46 nas nove SP (incluindo documentos experiments), Form47 Kronos. Todos os formulários inspecionados ainda usam runtime legado e lista reduzida, sem toolname; nenhuma mutação nesta PR. Reutilizar variantes manifesto bem-moema-studios-offices, teg-sacoma, viso-moema. Capturar PSI/Schema/Rich baseline, verificar catálogo/comercial e referências institucionais, auditar mídia, facts, galeria, forma/region, WebMCP. Escopo implementação por sublotes similares e especiais isolados (CAPIITOLO/DSG e RJ), homologação por URL e reindexação lote de 10. Autorizar implementação/merge explicitamente, preservar históricos/validadores, não inventar dados. Após READY, painel produção #formulario, PSI mobile, Rich Results, Schema.org, GSC links reais via inspeção, checklist e IndexNow somente após aceite. Retestes G01 seguem abertos.
