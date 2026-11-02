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
