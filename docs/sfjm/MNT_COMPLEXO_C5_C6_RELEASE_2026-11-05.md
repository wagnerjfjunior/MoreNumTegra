# SFJM — Release C5/C6 isolada, após publicação do C7 — 05/11/2026

## Motivo e decisão
Usuário apontou que a PR #542 trouxe apenas o C7, deixando C5/C6 prontos na branch `feat/complexo-prancha-condominios-lapa-20261104`. Essa branch divergiu da `main` e contém mais de 100 commits, portanto não deve ser mergeada integralmente como correção pontual.

Foi criada a branch `release/complexo-cenarios5-6-20261105` a partir da main vigente após a PR #542 e documentação de release, reaproveitando somente a mídia e os blocos de animação dos cenários 5 e 6.

## Conteúdo incluído
- Imagem compartilhada `src-greenn/complexo-lapa-pirituba/assets/Prancha5_Mapa_Aprovado_Tiete_Escola_Mercado_Drogaria.webp`, blob da branch de desenvolvimento `d9e384983af54d8ad0d5bd001e67e59f765a61fe`.
- `src-greenn/complexo-lapa-pirituba/index.html` atualizado a partir da main: mapa e código C1–C4 preservados, C7 player final preservado, sem calibradores C5/C6.
- **Cenário 5 — Marginal Pinheiros → Pirituba**: 33 pontos do path SVG já existente na branch, 8 carros de dois vidros roxos `#8B5CF6`, duas pistas com 16 veículos de trânsito ambiente e trens representados na mídia comum.
- **Cenário 6 — Saída dos Condomínios**: 3 paths do usuário totalizando 111 pontos; origem com tons A `#007985`, B `#00B8C7`, C `#B9EDCF`; destinos A → Marginal Pinheiros, B → Ayrton Senna, C → Lapa; 8 carros por traçado, além de 16 de tráfego ambiente.
- Legenda escura existente `Sentidos do trajeto` reutilizada, com terceiro carrinho de dois vidros e terceiro checkbox somente para C6; selo azul `Saída dos Condomínios`.
- Sem alterações no Form 46, SEO, outros empreendimentos, C7, imagem-base C7, dados C7 ou calibradores públicos.

## Validação de fonte
- Main e branch de desenvolvimento foram lidas ao vivo no GitHub.
- A C4 path literal foi comparada e é **idêntica** entre main e release.
- Código isolado na release: diff inicial somente `index.html` e um asset WebP.
- Sintaxe dos scripts JS do HTML alterado validada por parser JS: PASS; validação visual do LVR/browser **não realizada** neste fluxo.
- **Não alegar ausência de regressão visual ou alinhamento de mapas sem teste de navegador**.

## Gate de merge e rollback
- Antes do merge: verificar o diff completo do PR, exact head SHA, status do merge e resultado dos checks disponíveis.
- Rollback: reverter exclusivamente a PR desta release; base anterior é o commit main imediatamente anterior ao merge de C5/C6, já contendo C7.
- Vercel: comparar deployment production READY ao merge SHA e alias www.moretegra.com.br; manter referência do deployment anterior para rollback.
- Greenn não é alvo deste merge.

## Publicação efetiva — 05/11/2026

- **PR #543 MERGED**, squash SHA `be685ba8ae28c04fa93f9a3c50db00962ccd1a5f`.
- Vercel projeto `morenumtegra`, deployment `dpl_Gc372kgLzEuXv3gbAA4ra95VhNV9`, **target production / state READY**.
- `githubCommitSha` do deployment corresponde exatamente ao merge `be685ba8ae28c04fa93f9a3c50db00962ccd1a5f`; domínio/alias `www.moretegra.com.br`; `aliasError=null`.
- PR isolada alterou somente três arquivos: HTML principal do complexo, asset WebP compartilhado e este documento de governança.
- **Rollback seguro:** reverter a PR #543, mantendo a PR #542 do C7 publicada; deployment READY anterior `dpl_GCsg81XJDEfUeVX7A4RGsVnw815f`, SHA `2aa6b8c268e8a112c9d74fe1c293c3cec9358db2`.
- Fonte pública não acessível pela ferramenta web utilizada na sessão: não declarar QA visual público concluído. QA mobile e desktop permanece pendente.
- Publicação Greenn não realizada.
