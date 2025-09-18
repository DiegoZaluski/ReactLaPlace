# --- Estágio 1: Build da Aplicação ---
# Usamos uma imagem oficial do Node.js como base.
# A tag 'lts' refere-se à versão Long-Term Support, que é estável e recomendada.
# 'AS builder' nomeia este estágio, para que possamos referenciá-lo mais tarde.
FROM node:lts AS builder

# Define o diretório de trabalho dentro do contêiner.
# Todos os comandos subsequentes serão executados a partir deste diretório.
WORKDIR /app

# Copia os arquivos 'package.json' e 'package-lock.json'.
# Copiamos apenas esses arquivos primeiro para aproveitar o cache do Docker.
# Se esses arquivos não mudarem, o Docker reutilizará a camada de dependências já baixada.
COPY package*.json ./

# Instala as dependências do projeto definidas no 'package.json'.
# 'npm ci' é recomendado para ambientes de CI/CD e Docker, pois instala as versões exatas do 'package-lock.json'.
RUN npm ci

# Copia todo o restante do código-fonte da aplicação para o diretório de trabalho.
# O arquivo .dockerignore garante que arquivos desnecessários não sejam copiados.
COPY . .

# Executa o script de build da aplicação (definido no 'package.json').
# Isso irá compilar o React e gerar os arquivos estáticos na pasta 'dist'.
RUN npm run build

# --- Estágio 2: Servidor de Produção ---
# Usamos uma imagem oficial e leve do Nginx para servir os arquivos estáticos.
# 'alpine' é uma distribuição Linux mínima, o que resulta em uma imagem final muito pequena.
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio 'builder' (da pasta /app/dist)
# para o diretório padrão do Nginx que serve conteúdo HTML.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx.
# Isso informa ao Docker que o contêiner escutará nesta porta em tempo de execução.
EXPOSE 80

# O comando padrão para iniciar o servidor Nginx quando o contêiner for iniciado.
# 'daemon off;' garante que o Nginx rode em primeiro plano, o que é necessário para que o contêiner continue em execução.
CMD ["nginx", "-g", "daemon off;"]
