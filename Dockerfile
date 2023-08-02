FROM node:18-alpine

# RUN npm install -g yarn

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
