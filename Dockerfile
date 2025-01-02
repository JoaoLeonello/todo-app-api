FROM node:18

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o script wait-for-it.sh
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Tornar o script executável
RUN chmod +x /usr/src/app/wait-for-it.sh

# Copiar o restante do código
COPY . .

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Expor a porta 3000
EXPOSE 3000

# Comando de inicialização ajustado para incluir o caminho completo do script
CMD ["bash", "/usr/src/app/wait-for-it.sh", "$PGHOST:$PGPORT", "--", "npm", "run", "server"]


