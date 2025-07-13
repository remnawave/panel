---
sidebar_position: 1
title: Caddy
description: Lightweight reverse proxy with automatic SSL certificates and zero configuration
---

import PointDomainToIp from '/docs/partials/\_point_domain_to_ip.md';
import OpenLoginPage from '/docs/partials/\_open_login_page.md';

## Overview

In this guide we will be using Caddy as a reverse proxy to access the Remnawave panel.
We will point a domain name to our server and configure Caddy. Caddy will handle issuance of the SSL certificates by itself.

<PointDomainToIp />

## Caddy configuration

### Simple configuration

Create a file called `Caddyfile` in the `/opt/remnawave/caddy` directory.

```bash
mkdir -p /opt/remnawave/caddy && cd /opt/remnawave/caddy && nano Caddyfile
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review the configuration below, look for red highlighted lines.

:::

```caddy title="Caddyfile"
// highlight-next-line-red
https://REPLACE_WITH_YOUR_DOMAIN {
        reverse_proxy * http://remnawave:3000
}
:443 {
    tls internal
    respond 204
}
```

### Create docker-compose.yml

Create a `docker-compose.yml` file in the `/opt/remnawave/caddy` directory.

```bash
cd /opt/remnawave/caddy && nano docker-compose.yml
```

Paste the following configuration.

```yaml title="docker-compose.yml"
services:
    caddy:
        image: caddy:2.9
        container_name: 'caddy'
        hostname: caddy
        restart: always
        ports:
            - '0.0.0.0:443:443'
            - '0.0.0.0:80:80'
        networks:
            - remnawave-network
        volumes:
            - ./Caddyfile:/etc/caddy/Caddyfile
            - caddy-ssl-data:/data

networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: true

volumes:
    caddy-ssl-data:
        driver: local
        external: false
        name: caddy-ssl-data
```

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

<OpenLoginPage />
