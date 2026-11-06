# Complexo Lapa–Pirituba — versão B (V2)

- Versão A canônica: `/complexo-lapa-pirituba/` em `src-greenn/complexo-lapa-pirituba/`.
- Versão B de testes: `/complexo-lapa-pirituba-v2/` em `src-greenn/complexo-lapa-pirituba-v2/`.
- Cópia inicial da página A após PR #553 (WhatsApp Sabrina).
- HTML dos simuladores `duplo`, `duplo-ayrton`, `marginal-duplo`, `cenario7-trajetos`, JS `ux-map-v2.js` e `routes-verified.json` clonados para V2. Editar sempre os caminhos V2.
- Imagens pesadas em `src-greenn/complexo-lapa-pirituba/assets/` são compartilhadas apenas como recursos estáticos de leitura. Para editar imagem, criar nova imagem em V2 e mudar somente referência V2; nunca sobrescrever asset da A.
- V2 tem meta robots `noindex,nofollow,noarchive`, canonical próprio, e não entra em sitemap/navegação.
- `vercel.json` recebe rewrite exclusivo da V2; A preservada.
- Rollback: reverter PR de criação V2; a rota A e seus arquivos não são modificados. Baseline de A: PR #553, commit `2ae08e47e96863865f8fa4da965833b450efd805`.
- QA pendente após deploy: conferir V2 em iPhone, carrosséis, rotas C1–C7, mapas, imagens, console, WhatsApp e `noindex`.
- V2 é ambiente de experimentação; nenhuma mudança V2 deve ser copiada para A sem aprovação expressa.
