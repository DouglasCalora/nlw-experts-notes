# Next Level Week / Expert Notes

## Isto não é apenas uma cópia de código de curso!
Este projeto foi desenvolvido com base no evento NLW, porém foi aplicado diversas mudanças com o objetivo de melhorar o código e estudos, tais quais:

- Configuração do ESLINT;
- Criação de custom aliases;
- Criação de custom hook para trabalhar com os `notes`;
- Aplicado diversas componentizações adicionais para garantir padronizações, como:
  - BaseCard:
    componente base para os cards, tanto card de criação de nota quando card de nota.
  - NoteDialog:
    componente wrapper do Dialog do radix, uma vez que no curso foi usado o Dialog do radix tanto no NewNoteCard quanto no NoteCard.
- Aplicações de conceitos de clean code:
  - Separação de tipagem em arquivos separados para não poluir o código;
  - criação de micro componentes para não poluir JSX;

## Como rodar
Com o node estando na versão `20`, rode os comandos na raiz do projeto:

```bash
npm i
```

Após isto é só rodar:

```bash
npm run dev
```

Pronto, a aplicação já esta rodando.