ARG CADDY_VERSION=2.10
ARG IMAGE_NAME=remnawave-docs

FROM caddy:${CADDY_VERSION}-alpine

LABEL name=${IMAGE_NAME}

WORKDIR /app

COPY build /app/docs
COPY landing /app/landing

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE ${PORT:-80}

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]