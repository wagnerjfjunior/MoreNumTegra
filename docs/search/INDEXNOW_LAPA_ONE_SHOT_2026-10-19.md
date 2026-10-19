# IndexNow — submissão pontual de artigo SEO da Lapa

**Data:** 2026-10-19  
**Escopo:** uma URL canonical de artigo já publicada (não reenvio integral do sitemap).

URL exata:

`https://www.moretegra.com.br/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/`

Este marcador executa, no merge à main, `IndexNow` após verificar chave pública HTTP 200, página HTTP 200, ausência de noindex e self-canonical. O workflow realiza uma tentativa de submissão e armazena `indexnow-receipt.json` como artefato. Não reenviar automaticamente, mesmo em falha.

**Limites:** IndexNow informa buscadores participantes, não é solicitação de indexação Google e não comprova indexação efetiva. A inspeção e eventual pedido ao Google ocorrem no Google Search Console. Manter meta robots/sitemap/BreadcrumbList/BlogPosting do artigo. Nenhuma mudança de conteúdo, preço ou lead.

**Rollback:** revert pontual do workflow/script, se necessário. O histórico da tentativa de IndexNow não pode ser desfeito.
