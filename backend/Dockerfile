# PROD CONFIG
FROM node as prod

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN npm run build

WORKDIR /app

ENV NODE_ENV=production

CMD [ "npm", "start" ]