# Reconciliação RESF — split de postal e regressão HTML após PR #405

Data: 2026-10-14. Esta PR substitui a #406 que entrou em conflito com o merge da #405.

- `postal` continua verificando o grafo JSON-LD e os 23 endereços aprovados; a comparação integral de HTML visível deixa este job.
- `regression` verifica as 7 páginas historicamente congeladas; todas as exceções de Mozae da #405 são literais e o Bem Moema pode diferir do baseline apenas em: card de mapa + WhatsApp, CTA hero, CTA flutuante e opção Negociar meu cenário.
- Todos os demais arquivos, atributos, conteúdo editorial, JS e o Form46 permanecem cobertos por regressão. Os dois gates operam na mesma `main` sem suprimir o teste geral M5-06.
- QA manual validado pelo operador: 11 mapas e 5 fluxos de CTA; PR #405 merge `3701673123d4286c795bb9e6e4003fd66c18e009`; produção Vercel READY `dpl_EEEeNj1u8LbnFtTHYmZVg9fZVeCy`.
- Bloqueio de merge: `postal` e `regression` PASS comprovados. Release atual deve ser validado novamente após esta mudança de workflow.
