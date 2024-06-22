FROM node:21-slim

WORKDIR /home/node/app

RUN apt update && apt install openssl procps -y

RUN npm install -g @nestjs/cli@10.3.2

COPY . .

RUN npm install

USER node
## find and kill the pid of "node main.js" and re-up

CMD ["tail", "-f", "/dev/null"]
