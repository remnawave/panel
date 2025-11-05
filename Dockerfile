
# # docker build -t docusaurus-starter .
# # docker run -d -p 80:80 --name docusaurus-starter-app docusaurus-starter

# ARG NODE_VERSION=22.17.0
# ARG NGINX_VERSION=1.27.3
# ARG APP_PORT=80
# ARG IMAGE_NAME=remnawave-docs

# FROM node:${NODE_VERSION}-alpine as builder

# WORKDIR /usr/src/app

# COPY .npmrc ./
# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # ---

# FROM nginx:${NGINX_VERSION}-alpine

# LABEL name=${IMAGE_NAME}

# WORKDIR /usr/src/app

# #COPY --from=builder /usr/src/app/nginx.conf /usr/share/nginx/
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html/

# EXPOSE ${APP_PORT}

# CMD ["nginx", "-g", "daemon off;"]


ARG NODE_VERSION=22.17.0
ARG CADDY_VERSION=2.10
ARG IMAGE_NAME=remnawave-docs

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /usr/src/app

COPY .npmrc ./
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---

FROM caddy:${CADDY_VERSION}-alpine

LABEL name=${IMAGE_NAME}

WORKDIR /app

COPY --from=builder /usr/src/app/build /app/build

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE ${PORT:-80}

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]