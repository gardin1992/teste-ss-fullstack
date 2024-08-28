FROM node:alpine

WORKDIR /usr/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 

# RUN npm build
CMD ["npm", "run", "dev"]