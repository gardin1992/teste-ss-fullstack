FROM node:alpine

RUN npm install -g nodemon

WORKDIR /usr/backend

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .
EXPOSE 3005

CMD ["npm", "run", "dev"]