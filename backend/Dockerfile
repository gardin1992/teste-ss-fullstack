FROM node:alpine

RUN npm install -g nodemon

WORKDIR /usr/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]