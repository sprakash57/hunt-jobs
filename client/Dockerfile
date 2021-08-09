FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
RUN npm rebuild node-sass

COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]