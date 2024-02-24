# Next Level Week / Expert Notes

## Isto não é apenas uma cópia de código de um curso!
Este projeto foi desenvolvido com base no evento NLW, porém foi aplicado diversas mudanças com o objetivo de melhorar o código e estudos, tais quais:

- Configuração do ESLINT;
- Aplicado diversas componentizações adicionais para garantir padronizações, como:
  - BaseCard:
    componente base para os cards, tanto card de criação de nota quando card de nota.
  - NoteDialog:
    componente wrapper do Dialog do radix, uma vez que no curso foi usado o Dialog do radix tanto no NewNoteCard quanto no NoteCard.
- Aplicações de conceitos de clean code:
  - Separação de tipagem em arquivos separados para não poluir o código;
  - criação de micro componentes para não poluir JSX;
