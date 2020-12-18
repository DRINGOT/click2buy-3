FROM ubuntu:20.04
LABEL maintainer="dringot@click2buy.com"

RUN rm -rf /var/lib/apt/lists/*
RUN apt-get update
RUN apt-get install curl -y 

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs
RUN node -v
RUN npm -v
RUN npm i -g nodemon
RUN nodemon -v

#ADD file
ADD Javascript/ /home/Javascript/
ADD views/ /home/views/
COPY package*.json /home/
WORKDIR /home

RUN npm install

EXPOSE 3000

CMD [ "nodemon", "Javascript/app.js" ]


