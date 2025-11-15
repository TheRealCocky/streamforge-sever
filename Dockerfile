FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# força o uso do registry oficial
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

# 🔹 Gera o Prisma Client antes do build
RUN npx prisma generate

# Builda a aplicação NestJS
RUN npm run build

# Porta padrão
EXPOSE 3000

# Rodar a aplicação
CMD ["npm", "run", "start:prod"]




