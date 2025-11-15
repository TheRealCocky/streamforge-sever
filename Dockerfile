FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# força o uso do registry oficial
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]



