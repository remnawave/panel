---
sidebar_position: 2
title: Nginx
description: Popular reverse proxy with manual SSL certificates
---

import PointDomainToIp from '/docs/partials/\_point_domain_to_ip.md';
import OpenLoginPage from '/docs/partials/\_open_login_page.md';

## Overview

In this guide we will be using Nginx as a reverse proxy to access the Remnawave panel.
We will point a domain name to our server, issue a SSL certificate and configure Nginx.

<PointDomainToIp />

## Issue an SSL certificate

Now, you need to issue an SSL certificate. The most easy way is to use [acme.sh](https://acme.sh/).

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
mkdir -p /opt/remnawave/nginx/ssl && cd /opt/remnawave/nginx/ssl
```

### Issue a certificate

Replace `DOMAIN` with the domain name you want to issue a certificate for.

:::warning
Do not use domain zones: .ru, .su, .рф. Currently ZeroSSL does not support these zones.
:::

```bash
acme.sh --issue --standalone -d 'DOMAIN' --key-file /opt/remnawave/nginx/ssl/privkey.key --fullchain-file /opt/remnawave/nginx/ssl/fullchain.pem --alpn --tlsport 8443 --reloadcmd "docker exec remnawave-nginx nginx -s reload"
```

:::info
Make sure that port **8443** is open on your server. It is required for certificate issuance.
:::

![](/reverse-proxies/nginx/issue-cert.webp)

```bash
acme.sh --install-cert -d 'DOMAIN' --key-file /opt/remnawave/nginx/ssl/privkey.key --fullchain-file /opt/remnawave/nginx/ssl/fullchain.pem --reloadcmd "docker exec remnawave-nginx nginx -s reload"
```

This shows that the certificate is issued. `Acme.sh` will take care of automatically renewing the certificate every 60 days, just make sure that you have a **8443** port open (and not busy) on your server.

## Nginx configuration

### Simple configuration

Create a file called `remnawave.conf` in the `/opt/remnawave/nginx/conf.d` directory.

```bash
mkdir -p /opt/remnawave/nginx/conf.d && cd /opt/remnawave/nginx/conf.d && nano remnawave.conf
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review the configuration below, look for red highlighted lines.

:::

```nginx title="remnawave.conf"
upstream remnawave {
    server remnawave:3000;
}

server {
    // highlight-next-line-red
    server_name REPLACE_WITH_YOUR_DOMAIN;

    listen 443 ssl;
    http2 on;
    gzip on;

    location / {
        proxy_http_version 1.1;
        proxy_pass http://remnawave;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    ssl_certificate "/etc/nginx/ssl/fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/privkey.key";
    ssl_trusted_certificate "/etc/nginx/ssl/fullchain.pem";
}

# Reject unknown SNI
server {
    listen 443 ssl default_server reuseport;
    server_name _;

    ssl_reject_handshake on;
}

# Gzip Compression
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_types
    application/javascript
    application/json
    application/manifest+json
    application/xml
    font/opentype
    font/eot
    font/otf
    font/ttf
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;

# SSL Configuration (https://configurator.tlsref.org/#server=nginx&version=1.30&config=intermediate&openssl=3.5&ocsp)
ssl_protocols             TLSv1.2 TLSv1.3;
ssl_ecdh_curve            X25519MLKEM768:X25519:prime256v1:secp384r1;
ssl_ciphers               ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
ssl_prefer_server_ciphers off;

# Turn off session cache and tickets
ssl_session_cache         off;
ssl_session_tickets       off;

# OCSP stapling
ssl_stapling              on;
ssl_stapling_verify       on;
resolver                  1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
resolver_timeout          2s;

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
        image: nginx:stable
        container_name: remnawave-nginx
        hostname: remnawave-nginx
        volumes:
            - ./conf.d/:/etc/nginx/conf.d/:ro
            - ./ssl/:/etc/nginx/ssl/:ro
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

<OpenLoginPage />
