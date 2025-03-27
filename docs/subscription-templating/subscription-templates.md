---
sidebar_position: 1
slug: /subscription-templating/installation
title: Subscription templates [beta]
---

## Prerequisites

- Completed [Quick Start](/installation/quick-start)
- Completed [Env Variables](/installation/env)
- Completed [Reverse Proxies](/category/reverse-proxies)

## Page screenshot

![Page screenshot](/misc/subscription-page-preview.webp)

## Installation

Firstly, make sure you have completed [Quick Start](/installation/quick-start) and [Env Variables](/installation/env).

This guide requires you have already configured Remnawave Dashboard and Reverse Proxies.

### Change Remnawave Dashboard port

Open `~/remnawave/.env` file and change `SUB_PUBLIC_DOMAIN` to your subscription page domain name.

```bash
cd ~/remnawave && nano .env
```

```env title=".env"
SUB_PUBLIC_DOMAIN=subdomain.panel.com
```

### Step 1: Creating docker-compose.yml file

```bash
mkdir -p /opt/remnawave/subscription && cd /opt/remnawave/subscription && nano docker-compose.yml
```

### Step 2: Paste the following configuration

```yaml title="docker-compose.yml"
services:
    remnawave-subscription-page:
        image: remnawave/subscription-page:latest
        container_name: remnawave-subscription-page
        hostname: remnawave-subscription-page
        restart: always
        environment:
        // highlight-next-line-red
            - REMNAWAVE_PLAIN_DOMAIN=panel.com
            - SUBSCRIPTION_PAGE_PORT=3010
            - META_TITLE="Subscription Page Title"
            - META_DESCRIPTION="Subscription Page Description"
        ports:
            - '127.0.0.1:3010:3010'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: true
```

:::warning

Please, replace `panel.com` with URL which Remnawave Dashboard is available at. Only plain domain name without any path or port is not allowed!

:::

### Step 3: Start the container

```bash
docker compose up -d && docker compose logs -f
```

## Configuration of reverse proxy

:::warning

You need create a subdomain or use another domain name for the subscription page.

:::

### Nginx

If you have already configured Nginx, you need to add a new location block to your configuration file.

Issue a certificate for the subscription page domain name:

```bash
acme.sh --issue --standalone -d 'SUBSCRIPTION_PAGE_DOMAIN' --key-file /opt/remnawave/nginx/subdomain_privkey.key --fullchain-file /opt/remnawave/nginx/subdomain_fullchain.pem --alpn --tlsport 8443
```

Open Nginx configuration file:

```bash
cd /opt/remnawave/nginx && nano nginx.conf
```

:::warning

Please, replace `SUBSCRIPTION_PAGE_DOMAIN` with your subscription page domain name.

:::

:::danger

Do not fully replace the existing configuration, only add a new location block to your configuration file.

:::

Firstly, add a new upstream block to the top of configuration file.

Pay attention to the green lines, they are the ones you need to add.

```nginx title="nginx.conf"
upstream remnawave {
    server remnawave:3000;
}

// highlight-next-line-green
upstream remnawave-subscription-page {
    // highlight-next-line-green
    server remnawave-subscription-page:3010;
    // highlight-next-line-green
}
```

And now add new server block to the bottom of configuration file.

```nginx title="nginx.conf"
server {
    // highlight-next-line-red
    server_name SUBSCRIPTION_PAGE_DOMAIN;

    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    location / {
        proxy_http_version 1.1;
        proxy_pass http://remnawave-subscription-page;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # SSL Configuration (Mozilla Intermediate Guidelines)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ecdh_curve X25519:prime256v1:secp384r1;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers off;

    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:10m; # ~40,000 sessions
    ssl_dhparam "/etc/nginx/ssl/dhparam.pem";
    ssl_certificate "/etc/nginx/ssl/subdomain_fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/subdomain_privkey.key";

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate "/etc/nginx/ssl/subdomain_fullchain.pem";
    resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220;

    # HTTP Strict Transport Security (HSTS)
    proxy_hide_header Strict-Transport-Security;
    add_header Strict-Transport-Security "max-age=15552000" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;
}
```

Now lets modify docker-compose.yml file to add new certificate path.

```bash
cd /opt/remnawave/nginx && nano docker-compose.yml
```

```yaml title="docker-compose.yml"
services:
    remnawave-nginx:
        image: nginx:1.26
        container_name: remnawave-nginx
        hostname: remnawave-nginx
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
            - ./dhparam.pem:/etc/nginx/ssl/dhparam.pem:ro
            - ./fullchain.pem:/etc/nginx/ssl/fullchain.pem:ro
            - ./privkey.key:/etc/nginx/ssl/privkey.key:ro
            // highlight-next-line-green
            - ./subdomain_fullchain.pem:/etc/nginx/ssl/subdomain_fullchain.pem:ro
            // highlight-next-line-green
            - ./subdomain_privkey.key:/etc/nginx/ssl/subdomain_privkey.key:ro
        restart: always
        ports:
            - '0.0.0.0:443:443'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: true
```

Now, you need to restart Nginx container.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

### Caddy

If you have already configured Caddy, you need to add a new site block to Caddyfile.

Open Caddyfile:

```bash
cd /opt/remnawave/caddy && nano Caddyfile
```

:::warning

Please, replace `SUBSCRIPTION_PAGE_DOMAIN` with your domain name.

Review configuration below, look for green highlighted lines.

:::

:::danger

Do not fully replace the existing configuration, only add a new site block to Caddyfile.

:::

Firstly, add a new site block to the end of configuration file.

Pay attention to the green lines, they are the ones you need to add.

```caddy title="Caddyfile"
https://REPLACE_WITH_YOUR_DOMAIN {
        reverse_proxy * http://remnawave:3000
}
:443 {
    tls internal
    respond 204
}

// highlight-next-line-green
https://SUBSCRIPTION_PAGE_DOMAIN {
// highlight-next-line-green
        reverse_proxy * http://remnawave-subscription-page:3010
// highlight-next-line-green
}
```

Now, you need to restart Caddy container.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

#### Caddy with security settings

:::info

If you use Caddy configuration with [security setting](/category/panel-security), you need to make some changes to the `docker-compose` file of the subscription page.

:::

Open `docker-compose.yml`:

```bash
cd /opt/remnawave/subscription && nano docker-compose.yml
```

:::warning

Please use the docker container name and port `remnawave:3000` instead of the URL `panel.com` which Remnawave Dashboard is available at.
And also add the `REQUEST_REMNAWAVE_SCHEME` variable so that the subscription page can send requests to the panel API inside the docker network via the `http` protocol.

Review configuration below, look for yelow highlighted line and make the changes into it. Then copy the entire line highlighted in green and add it to the `docker-compose` file.
:::

```yaml title="docker-compose.yml"
environment: // highlight-next-line-yellow
    - REMNAWAVE_PLAIN_DOMAIN=remnawave:3000
    // highlight-next-line-green
    - REQUEST_REMNAWAVE_SCHEME=http
```

Now, you need to restart Subscription Page container.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

### Traefik

If you have already configured Traefik, you need create a new dynamic configuration file `remnawave-sub-page.yml` in the `/opt/remnawave/traefik/config` folder.

```bash
cd /opt/remnawave/traefik/config && nano remnawave-sub-page.yml
```

Paste the following configuration.

:::warning

Please, replace `SUBSCRIPTION_PAGE_DOMAIN` with your subscription page domain name.

Review configuration below, look for yellow highlighted lines.

:::

```yaml title="remnawave-sub-page.yml"
http:
  routers:
    remnawave-sub-page:
      // highlight-next-line-yellow
      rule: "Host(`SUBSCRIPTION_PAGE_DOMAIN`)"
      entrypoints:
        - http
      middlewares:
        - remnawave-sub-page-https-redirect
      service: remnawave-sub-page

    remnawave-sub-page-secure:
      // highlight-next-line-yellow
      rule: "Host(`SUBSCRIPTION_PAGE_DOMAIN`)"
      entrypoints:
        - https
      middlewares:
      tls:
        certResolver: letsencrypt
      service: remnawave-sub-page

  middlewares:
    remnawave-sub-page-https-redirect:
      redirectScheme:
        scheme: https

  services:
    remnawave-sub-page:
      loadBalancer:
        servers:
          - url: "http://remnawave-subscription-page:3010"
```

## Usage

Now, you can use subscription templates.

Subscription page will be available at `https://subdomain.panel.com/<shortUuid>`.
