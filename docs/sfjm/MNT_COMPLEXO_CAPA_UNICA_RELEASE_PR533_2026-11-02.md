# SFJM — Release PR #533 e rollback

## 02/11/2026 — Capa única PR #533 PUBLICADA para teste

Autorização do usuário: “Vou testar em produção mas cuide do rollback”. PR #533 MERGED, runtime `60b8bdb839e3a34f987f80558595188e7c683305`; Vercel `dpl_GaocVCL1UD8UMrTbLp7R3oP3Prg8` READY com alias www sem erro. HTTP 200, capa presente e cards antigos ausentes; três acessos conferidos em browser de produção. Aceite do proprietário e teste físico mobile pendentes. Supera a espera por LVR descrita abaixo.

Rollback preparado e não executado: deployment anterior `dpl_4vAHBB7UXbyYX3JofdaojFnwXoYK`, source `96703353b0bc6b6bffbc5ca2bb0c6eb3602a2022`. Procedimento: `docs/sfjm/MNT_COMPLEXO_CAPA_UNICA_RELEASE_PR533_2026-11-02.md`. Preservar trajetos, curvas e carros.

---


## Validação e rastreabilidade

Base main antes da release: `1376e5e14123b3ef75b005d82badbc51f5c16294`.
Head validado: `a44abeb8b59ed16c4c3653caadca7cd4b1d41923`.
Dois workflows SUCCESS: Favicon standard validation e SEO two distinct images.
PR #533 saiu de Draft e foi integrada com expected_head_sha.
Produção resolve para o merge acima, target production, READY, aliasError null.
GET https://www.moretegra.com.br/complexo-lapa-pirituba/: HTTP 200.
Browser de produção renderizou a capa integral e confirmou os botões 1/2/3 selecionando dualEmbed/ayrtonEmbed/marginalDualEmbed.
Teste físico mobile, CWV e aceite visual do proprietário permanecem pendentes.
Escopo runtime: somente HTML da entrada e dois WebPs. Simuladores internos intactos.

## Reversão

1. Para retorno imediato, usar Vercel request_rollback com projectId `prj_f8r2PwQ42f38CWUjOGpEStkjmaqt` e deploymentId `dpl_4vAHBB7UXbyYX3JofdaojFnwXoYK`, registrando o motivo.
2. Resolver www novamente e confirmar source `96703353b0bc6b6bffbc5ca2bb0c6eb3602a2022`, READY, grade anterior e três simuladores acessíveis.
3. Reconciliar GitHub por PR de reversão exclusiva da PR #533, preservando alterações posteriores. Validar e integrar; não usar reset/force-push.
4. Registrar causa e resultado no SFJM.

Rollback preparado, não executado. Nenhuma alteração Greenn, CRM ou campanhas.
