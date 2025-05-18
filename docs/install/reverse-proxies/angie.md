---
sidebar_position: 5
title: Angie
description: Reverse proxy with automatic SSL certificates
---

import PointDomainToIp from '/docs/partials/\_point_domain_to_ip.md';
import OpenLoginPage from '/docs/partials/\_open_login_page.md';

## Overview

In this guide we will be using Angie as a reverse proxy to access the Remnawave panel.
We will point a domain name to our server and configure Angie.

<PointDomainToIp />

### Create a folder for Angie

```bash
mkdir -p /opt/remnawave/angie && cd /opt/remnawave/angie
```

## Angie configuration

### Simple configuration

Create a file called `angie.conf` in the `/opt/remnawave/angie` directory.

```bash
cd /opt/remnawave/angie && nano angie.conf
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review the configuration below, look for red highlighted lines.

:::

```angie title="angie.conf"
upstream remnawave {
    server remnawave:3000;
}

# Connection header for WebSocket reverse proxy
map $http_upgrade $connection_upgrade {
    default upgrade;
    "" close;
}

resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220;

acme_client acme_le https://acme-v02.api.letsencrypt.org/directory;

server {
    // highlight-next-line-red
    server_name REPLACE_WITH_YOUR_DOMAIN;

    listen 443 ssl reuseport;
    listen [::]:443 ssl reuseport;
    http2 on;

    acme acme_le;

    # SSL Configuration (Mozilla Modern)
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_certificate $acme_cert_acme_le;
    ssl_certificate_key $acme_cert_key_acme_le;

    add_header Strict-Transport-Security "max-age=15552000" always;

    location / {
        proxy_http_version 1.1;
        proxy_pass http://remnawave;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name _;

    ssl_reject_handshake on;
}

server {
    listen 80;
    return 444; # https://angie.software/angie/docs/configuration/acme/#http
}
```

### Create docker-compose.yml

Create a `docker-compose.yml` file in the `/opt/remnawave/angie` directory.

```bash
cd /opt/remnawave/angie && nano docker-compose.yml
```

Paste the following configuration.

```yaml title="docker-compose.yml"
services:
    remnawave-angie:
        image: docker.angie.software/angie:1.9.0
        container_name: remnawave-angie
        hostname: remnawave-angie
        restart: always
        ports:
            - '0.0.0.0:443:443'
        networks:
            - remnawave-network
        volumes:
            - angie-ssl-data:/data
            - ./angie.conf:/etc/angie/http.d/default.conf:ro

networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: true

volumes:
    angie-ssl-data:
        driver: local
        external: false
        name: angie-ssl-data
```

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

<OpenLoginPage />
