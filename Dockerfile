FROM ubuntu:20.04 AS builder
LABEL maintainer="dringot@click2buy.com"

RUN apt-get update && apt-get install curl -y && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs
#ADD file
COPY package*.json /home/
WORKDIR /home
RUN npm install --production
ADD Javascript/ /home/Javascript/
ADD views/ /home/views/

FROM builder AS development
RUN npm install --dev
RUN npm i -g nodemon
EXPOSE 3001
CMD [ "nodemon", "Javascript/app.js" ]

FROM builder AS production
EXPOSE 3000
CMD [ "node", "Javascript/app.js" ]
