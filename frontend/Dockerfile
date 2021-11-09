#FROM node:15.8.0
#
#ENV HOME /root
#
#WORKDIR /root
#
#COPY package.json /.
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 3000
#
#CMD npm start

FROM nginx

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

RUN apt-get update

RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt install nodejs -y

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE $PORT
