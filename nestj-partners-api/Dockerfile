FROM node:21-slim

RUN apt update && apt install -y openssl procps

RUN npm install -g @nestjs/cli@10.3.2

WORKDIR /home/node/app

USER node
## find and kill the pid of "node main.js" and re-up

CMD ["tail", "-f", "/dev/null"]
