# 运行环境
FROM nginx:alpine

RUN npm install
RUN npm run build:prod

WORKDIR /usr/share/nginx/html
COPY ./dist .