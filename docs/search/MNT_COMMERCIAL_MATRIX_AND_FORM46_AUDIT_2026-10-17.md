# Matriz comercial e auditoria Form46 — 17/10/2026

Estado: inventário de referências existentes e testes isolados; não é confirmação de estoque, oferta vigente, entrega CRM ou GA4. Produção preservada. Escopo SEO complementar à PR #422; não substitui NEXT_SAFE_ACTION global do projeto.

## Base observada

GitHub main: `577c87641c71765d43d501da1944ba77444cc948`; PR #422 aberta/Draft, head pré-registro `909646a62245b974ad13c8c8e98a833b2453bc55`. O HTML validado continua o de `cf66a929c548fe782461dd5602b01db1636817a2`; o commit posterior contém documentação.

## Oito projetos exatos: referências encontradas, não ofertas revalidadas

Fonte de cada linha: `src-greenn/empreendimentos/<slug>/index.html`, observado em 17/10. Datas de observação não renovam a validade comercial. Todos exigem confirmação de disponibilidade atual e condições pela autoridade comercial antes de qualquer mudança de oferta.

| Núcleo / slug | Referência exibida | Unidade e área vinculadas | Data comercial identificada | Pendência específica |
|---|---|---|---|---|
| Higienópolis / aria-higienopolis | R$ 501.000 | Studio 1510, 30 m² | Ago/26; JSON observado em 18/09 | Revalidar referência antiga; não estender preço aos apartamentos de 53 m² |
| Higienópolis / mozae-higienopolis | R$ 721.510 | AP0301, 46 m² | Não identificada no trecho comercial | Confirmar data/tabela; não estender aos 73 m² |
| VNC / tiel-vila-nova-conceicao | R$ 598.500 | 914, 21 m² | Não identificada no trecho comercial | Plantas ilustrativas de 19 m² não representam a unidade de 21 m² |
| VNC / bueno-brandao-257 | R$ 21.750.000 | 31, 500 m² | Não identificada no trecho comercial | A própria página aponta referência pública diferente; reconciliar fontes, unidade e condição antes de proposta |
| Lapa / nova-vivere | R$ 852.586,08; R$ 1.129.900 à vista | 701, 72,82 m²; 708, 105 m² | Não identificada no trecho comercial | Duas unidades/condições distintas; não combinar preço e metragem entre elas |
| Lapa / garden-design | R$ 673.050 | 0112; metragem da unidade não confirmada no trecho comercial | Não identificada no trecho comercial | Confirmar área da unidade; plantas de 62/76 m² e faixa geral de 61–78 m² não provam sua área |
| Lapa / reserva-caminhos-da-lapa | Nenhum preço extraído do HTML visível nesta leitura | Pendente | Pendente | Confirmar modalidade de atendimento/repasse e unidade; ausência de preço não significa ausência de estoque |
| Lapa / caminhos-da-lapa-elo-duo | R$ 690.000; últimas 6 unidades | 67 m², inclusive 109 | Out/26; fonte comercial registrada em 03/10 | Revalidar quantidade e unidade; não atribuir a ELO distinto. JSON registra 47/55 m² esgotados na observação de 03/10 |

JSON complementar: `src-greenn/data/commercial-values.json`. O `updatedAt` global é 18/09, mas ELO Duo contém observações de 03/10. Usar datas por registro, não a data global como certificação de todo o catálogo.

Não calcular área de unidade dividindo preço por valor/m² arredondado. Empreendimento entregue/pronto não comprova estoque. Nenhum preço foi atualizado nesta atividade.

### Complexo Caminhos: sete entidades, sem fusão de identidade

ELO, ELO Duo, Home Club, Jerivás, Reserva, Garden Design e Nova Vivere devem manter identidade independente. As três entidades adicionais ao conjunto de quatro páginas comerciais Lapa acima são ELO, Home Club e Jerivás. Presença no complexo não autoriza criar novas páginas comerciais ou herdar oferta/estoque do ELO Duo. A confirmação comercial permanece aberta para as sete entidades.

### Fechamento necessário por referência

Registrar fonte comercial autorizada, data da tabela, empreendimento exato, unidade, área, preço, forma de pagamento, estágio, disponibilidade, validade e responsável pela confirmação. Este inventário está pronto para conferência, mas não deve ser apresentado como matriz comercial fechada.

## Form46: contrato atual e evidência própria

Contrato vigente: `docs/conversion/MNT_M5_08_GREEN_FORM46_CRM_HANDOFF_CONTRACT_2026-09-21.md`; runtime `src-greenn/preview/runtime.js`; agradecimento Vercel `src-greenn/preview/thank-you-measurement.js`.

- Provider Green/GDigital, tenant 313, Form46, title MoreEmUmTegra.
- POST contém somente tenant_id, form_id, title, nome, email, telefone e contexto controlado em texto-livre.
- O runtime exige host www.moretegra.com.br para envio real. Localhost valida sem transmitir.
- Marcador V2 é escrito após resposta HTTP bem-sucedida; isso não prova vendedor/tag no CRM. A atribuição a Sabrina e tag MORETEGRA são downstream Green.
- Fonte primária: mnt_lead_success, mapeamento previsto generate_lead. WhatsApp/cliques e tentativas permanecem intenções, não prova de lead recebido.
- Teste estático existente `node scripts/validate-m5-07-lead-semantics.mjs`: PASS.
- Execução isolada do adaptador atual em Node VM, sem rede: acesso direto não emite; marcador fresco V2 emite uma vez e é consumido; execução duplicada não duplica; marcador expirado, futuro ou JSON malformado não emite; localhost não emite; contexto com e-mail é removido. PASS.

O teste histórico `scripts/test-thank-you-lead-guard.mjs` aponta para `src-greenn/thank-you/obrigado.js`, não para o adaptador da rota Vercel em uso. Não utilizá-lo como prova única da rota atual.

## Divergência de consentimento confirmada, impacto live pendente

O formulário atual grava `mnt.consent.v2`; o adaptador de agradecimento lê somente `mnt.consent.v1`. A VM confirmou que consentimento apenas em V2 não produz restauração por esse adaptador; V1 produz. Isso pode interromper continuidade da medição entre páginas. Não prova, isoladamente, falha total de conversão ou disparo indevido, pois GTM e outros componentes também precisam ser inspecionados.

Correção delimitada recomendada: reconciliar restauração com o contrato V2, precedência de recusa e eventual compatibilidade V1, em revisão própria do runtime compartilhado. Não simplesmente conceder consentimento nem emitir conversão artificial para testar. Nenhuma configuração GTM/GA4/Clarity foi alterada.

## Gates restantes

1. Revalidar referências comerciais com fonte e data; Higienópolis primeiro.
2. Resolver continuidade de consentimento e verificar a rota real em sessão controlada.
3. Comprovar entrega de um contato autorizado no Green e correspondência projeto/intenção; nenhum teste real enviado nesta etapa.
4. Verificar destino GA4/GTM e unicidade após sucesso, sem PII. A simulação de marcador não é conversão real.
5. Revisão visual final e decisão separada de merge/publicação da PR #422.

O parecer SES e o recibo anterior estão em `MNT_SES_SEO_GEO_OPINION_AND_VALIDATION_2026-10-17.md`. Sem nova página, domínio, backlink, oferta ou alteração de produção.
