# 编译环境
FROM node as builder

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build:prod

# 运行环境
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .