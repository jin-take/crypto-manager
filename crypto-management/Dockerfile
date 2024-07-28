FROM node:22.5.1-alpine3.19

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
COPY .env.local .env

RUN npm run build

CMD ["npm", "start"]
