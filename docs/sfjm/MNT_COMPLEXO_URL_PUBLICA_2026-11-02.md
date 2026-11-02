# SFJM — URL pública do Complexo Lapa–Pirituba · 02/11/2026

## Fato observado
Após merge e publicação da PR #528, usuário compartilhou URL `https://www.moretegra.com.br/src-greenn/complexo-lapa-pirituba/index.html?utm_source=chatgpt.com` em vez da URL pública amigável.

## Causa identificada
- `vercel.json` já tinha **rewrite** `/complexo-lapa-pirituba/` → `/src-greenn/complexo-lapa-pirituba/index.html`.
- O arquivo interno estava diretamente acessível sem um **redirect** para a URL pública; o rewrite não altera a barra de endereço.
- A própria página já declara `<link rel="canonical" href="https://www.moretegra.com.br/complexo-lapa-pirituba/">`.
- `utm_source=chatgpt.com` é query string de atribuição, não a origem do problema. O servidor pode preservá-la no redirecionamento para métricas; o canonical permanece sem query.

## Mudança restrita
Nova entrada em `vercel.json`, na seção `redirects`, sem editar `rewrites`, links internos dos iframes, JSON de trajetos, animação, badges ou mapas:
```json
{
  "source": "/src-greenn/complexo-lapa-pirituba/index.html",
  "destination": "/complexo-lapa-pirituba/",
  "permanent": true
}
```
Objetivo: responder com **308 permanente** (ou status permanente equivalente que a Vercel aplicar), levando o endereço interno à rota pública; o rewrite existente continua a servir o mesmo HTML.

## Validação e gate
- Verificação estática: `vercel.json` válido em JSON; nova entrada única; quantidade de rewrites inalterada e destino conferido.
- **Pendente:** PR e verificação de CI, merge autorizado e teste HTTP real em produção (headers `Location`, status 30x, resposta 200 da rota amigável, loop e query string).
- Antes de promover, observar que outras URLs `/src-greenn/...` continuam internas e podem precisar de normalização separada. Não aplicar regra genérica que interfira nos assets ou iframes dos simuladores.

## Rollback
Reverter só a nova entrada de redirect em `vercel.json`; preservar rewrite público e o release PR #528.

## Diagnóstico definitivo e resolução no mesmo dia

**Validação HTTP na produção, após PR #529:** `/complexo-lapa-pirituba/` e `/src-greenn/complexo-lapa-pirituba/index.html` retornavam 200 com o mesmo arquivo físico `complexo-lapa-pirituba/index.html` na raiz do GitHub, que era um stub de 585 bytes contendo `meta http-equiv="refresh"` e `location.replace("/src-greenn/complexo-lapa-pirituba/index.html")`. Isso **forçava o navegador para a URL interna**, mesmo depois de adicionar o redirect em `vercel.json`.

**PR #530 MERGED** (`5478b418b9767b8b7844c394d1993042c72120cf`): removeu **somente** o stub físico da raiz, permitindo que o rewrite `/complexo-lapa-pirituba/` já existente sirva o HTML integral de `src-greenn/complexo-lapa-pirituba/index.html`. Pós-deploy Vercel `dpl_8vQWFrysJwLQEMocdyNp7CvxSFW1` READY, HTTP 200 em URL pública com HTML completo (14.520 caracteres), 3 iframes de simuladores e sem meta refresh indevido.

**PR #531 MERGED** (`64a88671175f7cf405c9f83b388cc0aac44ec23f`): normalização defensiva **somente quando** `location.pathname === "/src-greenn/complexo-lapa-pirituba/index.html"`: `location.replace("/complexo-lapa-pirituba/"+location.search+location.hash)`. Preserva query string/fragmento; não roda na URL pública. Não altera rotas ou iframes.

**Última produção verificada:** Vercel deployment `dpl_HoxB9Yg3AsomPZJD24hpPLAY1Yx9` READY, commit da PR #531 `64a88671175f7cf405c9f83b388cc0aac44ec23f`, sem erro de alias. Busca HTTP conectada retornou 200 tanto no path público quanto no path interno; ambos entregam HTML real (14.684 caracteres), `canonical=https://www.moretegra.com.br/complexo-lapa-pirituba/`, iframes presentes e nenhum meta refresh legado.

**Limite de verificação:** o acesso direto ao path interno ainda **não retorna HTTP 301/308**, pois o arquivo físico permanece acessível, mesmo com a regra server-side em `vercel.json`. A normalização atual é um **redirecionamento client-side JavaScript** apenas nessa URL. O HTML está correto; confirmar a mudança da barra de endereço com navegador JS é o gate restante. Não declarar redirect HTTP permanente aplicado. A PR #529 mantém a regra declarada para eventual ajuste de roteamento futuro.

**Rollback:** para retornar ao estado anterior, reverter o merge #531 e, se exigido, o #530; atenção: reintroduzir o stub antigo volta a forçar URL interna (regressão). Recomendado preservar as duas correções.
