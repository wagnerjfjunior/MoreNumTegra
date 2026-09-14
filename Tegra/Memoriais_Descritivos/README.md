# Memoriais Descritivos — Tegra

Este diretório é a fonte local versionada do MoreNumTegra para memoriais descritivos, cadernos técnicos e documentos equivalentes dos empreendimentos Tegra usados pelo projeto.

## Objetivo

Preservar evidência documental primária para consultas de produto, factualidade, SEO, conteúdo, comparativos e futuras páginas de empreendimento.

Estes arquivos podem sustentar fatos como:

- áreas e tipologias;
- ambientes e dependências;
- acabamentos e especificações;
- equipamentos e sistemas;
- áreas comuns e lazer;
- características construtivas;
- itens entregues;
- informações técnicas do projeto.

Um memorial descritivo não autoriza, isoladamente, afirmar preço, disponibilidade, condição comercial, estoque, prazo vigente ou qualquer fato que dependa de fonte comercial atual.

## Organização recomendada

Use um arquivo ou subdiretório por empreendimento, preferencialmente com o slug canônico do projeto.

Exemplos:

```text
Tegra/Memoriais_Descritivos/
  README.md
  TEMPLATE.md
  nova-vivere/
    memorial-descritivo.pdf
  mozae-higienopolis/
    memorial-descritivo.pdf
  chateau-jardin/
    memorial-descritivo.pdf
```

Git não mantém diretórios vazios; o subdiretório nasce quando o primeiro documento é incluído.

## Convenção de nomes

Preferir nomes estáveis e sem espaços quando possível:

```text
memorial-descritivo.pdf
memorial-descritivo-2026-08.pdf
caderno-tecnico.pdf
plantas-tipo.pdf
```

Se houver mais de uma versão do mesmo documento, não sobrescrever silenciosamente uma versão anterior relevante. Preservar versão/data no nome ou histórico Git.

## Regra de factualidade

```text
DOCUMENTO_EXISTE != CLAIM_AUTOMATICAMENTE_PUBLICAVEL
```

Antes de usar um fato em runtime, SEO, schema ou material comercial:

1. identificar o empreendimento correto;
2. localizar a passagem que suporta o fato;
3. registrar a fonte/documento aplicável;
4. verificar se existe evidência mais recente que a supersede;
5. separar fato técnico estável de dado comercial volátil;
6. não preencher lacunas por inferência.

Quando houver divergência entre memorial, página oficial, tabela comercial ou outra evidência, registrar a divergência e adjudicar antes de publicar.

## Formatos

Aceitos para documentação de origem:

- PDF;
- Markdown;
- texto;
- planilhas/documentos auxiliares quando necessários.

Evitar armazenar vídeos ou grandes volumes de mídia pesada neste diretório. Para arquivos muito grandes, preferir origem autorizada externa e manter aqui um apontamento versionado para a fonte.

## Relação com Product Truth

Os memoriais são **evidência de origem**. O Product Fact & Claim Registry e demais contratos governados continuam sendo a camada de adjudicação para determinar qual fato pode ser consumido pelo site.

GitHub `main` permanece a fonte integrada canônica do projeto.
