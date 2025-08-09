# LaPlace - Orquestrador de IAs Inteligente

## 🚀 Visão Geral
LaPlace é uma plataforma inovadora que atua como um orquestrador inteligente de IAs, capaz de selecionar e gerenciar automaticamente diferentes modelos de IA para fornecer as melhores respostas possíveis. O projeto combina tecnologias modernas de frontend (React) e backend (Python) para criar uma experiência poderosa e intuitiva.

## 🧠 Conceito Principal
O coração do LaPlace é um sistema que:
- Analisa consultas em tempo real
- Seleciona o modelo de IA mais adequado para cada tipo de pergunta
- Combina múltiplas IAs para respostas mais completas
- Aprende continuamente com as interações

## 🛠️ Tecnologias Utilizadas

### Frontend (React)
- **React 18** - Biblioteca principal para construção da interface
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Estilização responsiva
- **Sistema Próprio de i18n** - Solução personalizada para internacionalização

### Backend (Python - Em desenvolvimento)
- **FastAPI/Flask** - Framework web
- **Várias APIs de IA** - Integração com diferentes modelos
- **Sistema de Roteamento Inteligente** - Para seleção de modelos

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

## 🌐 Internacionalização
O projeto possui um sistema próprio de internacionalização desenvolvido internamente, permitindo suporte a múltiplos idiomas com uma arquitetura leve e personalizada.

## 🚧 Status do Desenvolvimento
- [x] Configuração inicial do React
- [x] Sistema de autenticação básico
- [x] Componente de seleção de idiomas
- [ ] Integração com backend Python
- [ ] Sistema de orquestração de IAs
- [ ] Painel administrativo

## 🚀 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📄 Licença
Este projeto está sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

---
Desenvolvido com ❤️ pela equipe LaPlace
