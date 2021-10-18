FROM node:15.8.0

ENV HOME /root

WORKDIR /root

COPY package.json /.

RUN npm install

COPY . .

EXPOSE 5000

CMD node server.js
