# 运行环境
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY ./dist .