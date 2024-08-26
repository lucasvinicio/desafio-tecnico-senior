FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node ./
RUN chmod -R 755 ./

RUN npm run build

USER node

CMD [ "npm", "run", "start:dev" ]
