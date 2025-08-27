# Por que Vanilla JavaScript?

## Objetivo Deste Documento
O projeto ainda está em seu estágio inicial, mas vou falar um pouco sobre a ideia por trás dele.

O objetivo principal é criar um sistema operacional com um Large Language Model (LLM) integrado. Esse LLM será capaz de controlar requisições de API e gerenciar operações dentro do próprio sistema, permitindo que ele se integre com outros sistemas operacionais ou funcione de forma autônoma e muito mais.

A ideia é que o sistema atue como um agente inteligente, capaz de chamar outras IAs open source e controlar operações como a organização de repositórios.

A parte de front-end que eu criei serve para facilitar o acesso à documentação do projeto, que estará disponível no site. Além disso, ela terá o download do próprio OS/LLM e uma pequena interface para testar e entender melhor a ideia.
---
## 📂 Estrutura do Projeto

```
react/
├── public/             # Arquivos estáticos
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   ├── Button.jsx
│   │   ├── Language.jsx
│   │   └── ...
│   ├── pages/          # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ...
│   ├── styles/         # Estilos globais
│   └── App.jsx         # Componente raiz
└── README.md           # Este arquivo
```
---
Eu sei que este é um projeto bastante ambicioso para uma pessoa só. Se você achou a ideia interessante e gostaria de contribuir, ficarei muito feliz com sua ajuda.
