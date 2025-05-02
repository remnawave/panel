---
sidebar_position: 1
slug: /installation/rp/nginx
title: Nginx
---

## Overview

In this guide we will be using Nginx as a reverse proxy to access the Remnawave panel.
We will point a domain name to our server, issue a SSL certificate and configure Nginx.
You should complete [Quick Start](/installation/quick-start) and [Env Variables](/installation/env) before continuing.

## Prerequisites

- Completing [Quick Start](/installation/quick-start)
- Completing [Env Variables](/installation/env)
- Registered domain name (e.g. `my-super-panel.com`)

:::warning

You need to have a registered domain name to continue.

:::

## Point domain to your server

Check your server's IP address. It is better to use a static IPv4 address.

Now, you need to point your domain name to this IP address.

For example, it will be `my-super-panel.com` -> `193.122.122.122`.

There are two ways to do this:

1. Use a DNS provider (e.g. Cloudflare, Google Cloud, etc.)
2. Use a registrar (e.g. Namecheap, etc.)

### DNS provider

If you are using Cloudflare, you need to add a A/AAAA record (for IPv4 and IPv6 respectively) to your DNS records.

Log in to your Cloudflare account [here](https://dash.cloudflare.com/login).
Select the desired domain.

On the left side of the page, click on `DNS` and then click on `Records`.

Click on `Create record`.

Set the `Type` to `A` and the `Name` to `@`.

:::info

If you want to use subdomains, you should enter the subdomain name (e.g. `panel`) in the `Name` field.

:::

Enter your server's IP address in the `IPv4 address` field.

Click on `Save`.

Now you need to wait a while for the DNS records to be updated.

:::info

There is a big difference between yellow cloud (domain is proxied by Cloudflare) and grey cloud (domain is not proxied by Cloudflare) in the Cloudflare control panel.

If Cloudflare works fine in your region, it is better to proxy the domain through Cloudflare. (Yellow cloud)

:::

![static](/reverse-proxies/nginx/cloudflare-dns.webp)

Some DNS providers have a different interface, but the overall process is the same.

## Issue an SSL certificate

Now, you need to issue an SSL certificate.

The most easy way is to use [acme.sh](https://acme.sh/).

:::warning

This guide will cover only issuing SSL certificate for the domain of the panel.
:::

### Install dependencies

```bash
sudo apt-get install cron socat
```

### Install acme.sh

:::info

You can use any email address to issue the certificate, but it is recommended to use a valid one.

:::

Replace `EMAIL` with your email address.

```bash
curl https://get.acme.sh | sh -s email=EMAIL && source ~/.bashrc
```

### Create a folder for the certificates

```bash
mkdir -p /opt/remnawave/nginx && cd /opt/remnawave/nginx
```

### Issue a certificate

Replace `DOMAIN` with the domain name you want to issue a certificate for.

:::warning
Do not use domain zones: .ru, .su, .рф. Currently ZeroSSL does not support these zones.
:::

```bash
acme.sh --issue --standalone -d 'DOMAIN' --key-file /opt/remnawave/nginx/privkey.key --fullchain-file /opt/remnawave/nginx/fullchain.pem --alpn --tlsport 8443
```

:::info
Make sure that port **8443** is open on your server. It is required for certificate issuance.
:::

![](/reverse-proxies/nginx/issue-cert.webp)

This shows that the certificate is issued.

Acme.sh will take care of automatically renewing the certificate every 60 days, just make sure that you have a **8443** port open (and not busy) on your server.

## Nginx configuration

### Simple configuration

We are going to need a dhparam.pem file.

```bash
curl https://ssl-config.mozilla.org/ffdhe2048.txt > /opt/remnawave/nginx/dhparam.pem
```

Create a file called `nginx.conf` in the `/opt/remnawave/nginx` directory.

```bash
cd /opt/remnawave/nginx && nano nginx.conf
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review the configuration below, look for red highlighted lines.

:::

```nginx title="nginx.conf"
upstream remnawave {
    server remnawave:3000;
}

# Connection header for WebSocket reverse proxy
map $http_upgrade $connection_upgrade {
    default upgrade;
    "" close;
}

server {
    // highlight-next-line-red
    server_name REPLACE_WITH_YOUR_DOMAIN;

    listen 443 ssl reuseport;
    listen [::]:443 ssl reuseport;
    http2 on;

    location / {
        proxy_http_version 1.1;
        proxy_pass http://remnawave;
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
    ssl_certificate "/etc/nginx/ssl/fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/privkey.key";

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate "/etc/nginx/ssl/fullchain.pem";
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

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name _;

    ssl_reject_handshake on;
}

```

### Create docker-compose.yml

Create a `docker-compose.yml` file in the `/opt/remnawave/nginx` directory.

```bash
cd /opt/remnawave/nginx && nano docker-compose.yml
```

Paste the following configuration.

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

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

### Open the panel in the browser

Open the configured domain name in the browser and you will see the login page.

![login-page](/reverse-proxies/nginx/login-page.webp)

## Troubleshooting

<Button label="Ask community" link="https://t.me/+YxzE4bOmEog2Zjhi" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />
