# SFJM — Reconciliação tática PR #465, #470, #471 — 2026-10-23

## Fonte e fronteira
Inspeção read-only do GitHub canônico seguida de duas correções delimitadas na branch da PR #471. Não houve merge nem publicação. Este registro não substitui CURRENT/NEXT_SAFE_ACTION e não altera escopo do ImobData.

## Estado confirmado por GitHub
- MoreNumTegra main observada: 9610f237a6c2d9e8c1588c51026c2b858f467dfd.
- A PR #465 foi incorporada à main pelo commit af7902f88e3d406f4bf6fab36f2bb25ec459dbde; #466, #467 e #468 também aparecem no histórico de main (respectivamente f6e3d856d2dae4a0b26c936cd781ea6c085d92f, 2d52886037489ffe62c41f558dd2089ba07a2a0e e 9610f237a6c2d9e8c1588c51026c2b858f467dfd). A landing investimentos e Studios Berrini NÃO devem ser reconstruídos por omissão do handoff.
- PR #470, branch sfjm/ampere-hero-facts-mobile-20261022: compare com main ahead 1/behind 0, apenas src-greenn/empreendimentos/ampere-brooklin/index.html.
- PR #471, branch sfjm/capiitolo-ampere-home-price-cards-20261022: compare com main ahead 16/behind 0 após as duas correções; arquivos relacionados Home, Ampère, CAPIITOLO, RESF e handoffs.
- PR #7 ImobData consta incorporada à main em f4b7db5a5317d58728157033b7cafddc2bce83f4. Não foram feitos writes no ImobData.

## Diagnóstico de código
- Os quatro cards da Home já têm rotas ?condicao=promocional/avista#valores.
- Ambas as páginas já possuem seletor funcional no código, inicializado por URLSearchParams, alternância de valor/nota e atualização da opção de interesse no formulário. Isso é evidência estática; interação de browser/mobile e CRM permanecem não verificados.
- Modificado CAPIITOLO na PR #471, commit 708a6c292b5f410ea6352cb4d3859c88b0eeec50: HTML bootstrap público deixou de citar Match Point e passou à condição promocional de referência.
- Modificado Ampère na PR #471, commit bd2e46ed8fcf64168cb614fb671d64164c9db793: ambas as páginas agora sincronizam ?condicao= com a opção clicada via history.replaceState (CAPIITOLO ajustado no commit anterior).
- Ambas as mudanças preservam outros parâmetros de URL e hash no código; exigem teste real do browser.

## CI observado no head bd2e46ed8fcf64168cb614fb671d64164c9db793
- 13 workflow runs visíveis; 11 in_progress e 2 failure na segunda consulta. Não há gate PASS.
- Project structured data coverage guard falhou em studios-berrini: 'missing essential ApartmentComplex'. Não corrigir cegamente: avaliar perfil adequado a studios/comercial e débito de baseline.
- M5-06 CTA/Form journey falhou: 'Reserva floating CTA maps to conditions'. Falha aparentemente fora das páginas editadas, atribuição/legado ainda não verificados.
- É proibido reportar CI completo ou promover o release sem reconciliação dos checks.

## Lacunas críticas para próximo ciclo
1. Verificar lifecycle formal e checks completos das PRs #470/#471, comparar alterações sobrepostas no Ampère e homologar a combinação em branch delimitada.
2. Verificar mobile 320/360/390/430 e desktop, botões/CTA, deep links promocional e avista, troca de condição e preservação UTM/hash.
3. Confirmar JSON-LD e FAQ visível versus valor 62 Ampère e 33 CAPIITOLO; revisar implementação bootstrap/fetch CAPIITOLO e Form 46 sem lead real não autorizado.
4. Reconciliar falhas dos validadores com main e criar correções de escopo específico. Nenhum gate sem evidência.
5. Confirmar production SHA/READY no Vercel; list_deployments(app=moretegra) não retornou deployments nesta execução, portanto status production é UNKNOWN.
6. Preservar trilhas de investimentos PR #465/#466/#467/#468, SEO/blog, clusters e ImobData PR #7/#8 como frentes próprias do inventário, nunca descartá-las no handoff.

## Bloqueios
- Sem publicação, merge, reindexação nem envio real de formulário antes de CI, QA, autorização e comprovação de produção.
- Sem alteração dos preços aprovados: Ampère 62 R$ 3.990.700 / R$ 3.791.165; CAPIITOLO 33 R$ 3.350.000 / R$ 3.135.000.
