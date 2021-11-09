FROM node:15.8.0

ENV HOME /root

WORKDIR /root

COPY package.json /.

RUN npm install

COPY . .

EXPOSE 8081

CMD

#
#FROM node:10
#
#WORKDIR /root
#
#COPY . .
#
#EXPOSE $PORT
#
#CMD [ "npm", "run", "start" ]
