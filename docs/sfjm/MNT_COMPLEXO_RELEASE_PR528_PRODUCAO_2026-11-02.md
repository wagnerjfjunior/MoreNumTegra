# SFJM — Release Complexo Lapa–Pirituba · PR #528 · 02/11/2026

## Autorizações e fonte canônica

- Solicitação expressa do usuário: **"vamos mergear e passar para producao"** em 02/11/2026.
- Repositório: `wagnerjfjunior/MoreNumTegra`, branch canônica `main`.
- PR: https://github.com/wagnerjfjunior/MoreNumTegra/pull/528 — **MERGED**, head de código `e91ee152ff5de9cb60b41a57dcdca62475840e3e`, merge commit `6c49bdbca2eed63358ef6625e3c37ef2392fefe9`.
- Merge feito somente depois de marcar a PR como Ready for Review e conferir `mergeable=true`. Método: `merge`, com `expected_head_sha` fixado.
- Escopo: **Complexo Lapa–Pirituba** e documentação de acompanhamento; não autoriza FECH.AI, campanhas, CRM ou operações em outras áreas.

## Conteúdo integrado

1. Simulador 1 `duplo/index.html`: Lapa→Pirituba (laranja) e Pirituba→Lapa (azul), 8 carros por SVG, 16 veículos neutros na Marginal Tietê, com curvas independentes nas duas margens. Total editorial: **32 veículos**. Pistas e rotas informativas, não condições de circulação em tempo real.
2. Simulador 2 `duplo-ayrton/index.html`: Ayrton Senna→Pirituba (laranja) e Ayrton Senna→Lapa (azul), 8 carros em cada rota e 16 carros neutros (8 por direção), total 32.
3. Simulador 3 `marginal-duplo/index.html`: Lapa/Pirituba→Marginal Pinheiros, 8 carros azuis + 8 laranjas + 16 neutros, total 32. Rota azul e circulação na rotatória protegidas; curva laranja e trânsito inferior ajustados conforme aceite visual anterior no LVR.
4. Carros azul/laranja principais maiores, dois para-brisas brancos, autoloop, sem botões de pausa/reinício; trânsito neutro preto/vermelho/cinza em guias invisíveis. Imagens editoriais separadas dos SVGs.
5. Reparo de validação: seis HTMLs do Complexo passaram a declarar os tamanhos de favicon 48/32/16, shortcut e apple-touch-icon.

## Evidências de verificação e publicação

- PR #528 ficou `mergeable=true` e avançou do estado Draft para Ready.
- GitHub workflow `Favicon standard validation`: **SUCCESS**, run `41382136142`.
- GitHub workflow `SEO two distinct images - 39 URLs`: **SUCCESS**, run `41382136116`.
- Merge confirmado pelo GitHub: `6c49bdbca2eed63358ef6625e3c37ef2392fefe9`.
- Vercel `morenumtegra`: **production READY**, deployment `dpl_6CEBRDtfEo11bBeqmREffq5rPNFd`, commit associado exatamente ao merge `6c49bdbca2eed63358ef6625e3c37ef2392fefe9`.
- Aliases confirmados pela Vercel: `www.moretegra.com.br`, `moretegra.com.br`, `lp.moretegra.com.br` etc.; `aliasError=null`.
- A verificação externa por navegação automatizada não conseguiu abrir as páginas públicas nesta conversa. **Não** confundir READY + alias com prova de HTTP200 ou com teste da animação já publicada.
- A experiência LVR é aceite visual **reportado pelo usuário** em etapas anteriores. Não há relatório de QA browser mobile completo para esta integração.
- Páginas do Complexo têm meta `noindex,nofollow`; release não é uma solicitação de indexação Google/Bing.

## Plano de rollback

- Deployment de produção **anterior**: `dpl_8dnBe9ATKvrbRpudd9mDNfsjpNVg`, commit `5bed3e058d67e29821af55c46b870c83e40e97f5`, registrado como READY.
- Em regressão grave, recuperar a implantação anterior usando mecanismo nativo de rollback da Vercel, depois validar aliases e domínio principal. **Rollback não foi executado**.
- Alternativa no GitHub: criar revert do merge `6c49bdbca2eed63358ef6625e3c37ef2392fefe9`, mediante autorização se necessário.
- Não modificar as geometrias de circulação validadas sem novo controle de regressão.

## Pendências pós-release

- Teste HTTP/visual real no domínio `https://www.moretegra.com.br/complexo-lapa-pirituba/` com as três opções, carregamento de todos os assets, veículos sobre as pistas, dois sentidos e mobile.
- Conferir eventual estratégia SEO/noindex antes de indexar a seção experimental.
- **Greenn:** a release neste registro é **GitHub main + Vercel production**, sem evidência de publicação separada na Greenn. A governança V1 da Greenn permanece independente.

Documento de histórico: `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`. Baseline visual do simulador 3: `docs/sfjm/MNT_COMPLEXO_SIMULADOR3_ACEITE_LVR_2026-11-01.md`.
