# MNT-SEO-INVEST — Calculadora independente (24/11/2026)

Base main: aa1d0a52a748282c206d4324bcdec054806a66a5. Aceite funcional do proprietário para calculadora V3 na #613 (f63c84bcc921407d41e4c282f5f978bc84f18041), ainda não integrada. Nova branch incorpora exatamente o controlador aprovado em arquivo JS compartilhado, sem alterar fórmulas. URL /investimentos/calculadora-rentabilidade-imovel/ com canonical próprio, WebPage/WebApplication/BreadcrumbList, FAQ visível, links de ida e volta com hub, Form46 e sitemap lastmod 24/11. Sem publicação.

Gate: scripts/validate-two-images-39-pages.mjs exige lista exata de uma única rota /investimentos/. Nova URL requer autorização específica para ampliar exclusivamente essa lista e adicionar contrato independente para ferramenta, sem relaxar demais regras. Não modificado nesta entrega. CI e QA LOCAL_LIVE_SYNC pendentes. Não integrar #613 e nova PR sem reconciliar dependência; nova PR já incorpora correção aprovada. Próximo: autorizar gate exato, testar ambas URLs, merge específico; depois links editoriais e monitoramento GSC. Não afirmar ranking ou taxas atuais.

## Autorização de publicação

24/11/2026: proprietário autorizou explicitamente o merge e a criação da URL após apresentação do bloqueio de allowlist. Alteração restrita a uma rota adicional e gate independente, com teste negativo para rota não autorizada; demais contratos preservados. Commit do gate: bced525790d386ef90494d7ed63ebd9c7aed486a. A autorização é específica da #615, que incorpora #613; não mesclar #613 separadamente. CI do head final e estado live devem ser confirmados antes de declarar produção.
