FROM ubuntu:latest
LABEL maintainer="dringot@click2buy.com"
RUN apt-get update
RUN apt-get install curl -y

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install --yes nodejs
RUN node -v
RUN npm -v
RUN npm i -g nodemon
RUN nodemon -v

# Cleanup
RUN apt-get update && apt-get upgrade -y && apt-get autoremove -y

#ADD file
ADD Javascript/app.js /home/Javascript/app.js
ADD Javascript/background.js /home/Javascript/background.js
ADD views/index.html /home/views/index.html
ADD views/login.html /home/views/login.html
ADD views/signup_success.html /home/views/signup_success.html
ADD views/error401.html /home/views/error401.html
ADD views/data.ejs /home/views/data.ejs
COPY package*.json /home/
WORKDIR /home

RUN npm install

EXPOSE 3000

CMD [ "nodemon", "Javascript/app.js" ]


