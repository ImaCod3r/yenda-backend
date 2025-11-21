# 1. Imagem base (Node 18 LTS)
FROM node:18

# 2. Diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar apenas package.json + package-lock.json primeiro
COPY package*.json ./

# 4. Instalar dependências
RUN npm install --production

# 5. Copiar todo o projeto para o container
COPY . .

# 6. Expor a porta (muito importante)
EXPOSE 3000

# 7. Comando para iniciar a aplicação
CMD ["npm", "start"]
