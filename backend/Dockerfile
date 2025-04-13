FROM node:23-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 本番ビルドは不要：開発ではts-node-devを使う
EXPOSE 4000

CMD ["npx", "ts-node-dev", "--respawn", "src/index.ts"]
