# 编译环境
FROM node as builder

WORKDIR /go/src/github.com/gomsa/ui
COPY . .
RUN npm install
RUN npm run build:prod

# 运行环境
FROM nginx:alpine

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /usr/share/nginx/html
COPY --from=builder /go/src/github.com/gomsa/ui/dist /usr/share/nginx/html