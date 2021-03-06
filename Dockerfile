FROM node:12.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

ENV NODE_ENV docker

EXPOSE 3005

CMD [ "npm", "run", "server" ]