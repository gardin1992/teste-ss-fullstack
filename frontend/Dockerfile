FROM node:alpine

WORKDIR /usr/frontend

COPY package*.json ./

RUN npm install

COPY . .
COPY next.config.mjs ./next.config.mjs

EXPOSE 3000 

# RUN npm build
CMD ["npm", "run", "dev"]