FROM node:23.11.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS deploy
COPY --from=builder /app/build /usr/share/nginx/html