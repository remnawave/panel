---
sidebar_position: 2
slug: /installation/rp/caddy
title: Caddy
---

## Overview

In this guide we will use Caddy as a reverse proxy for requests to Remnawave.
We will redirect a domain to our server and configure Caddy. Caddy will handle issue of SSL certificates by itself.
Complete [Quick Start](/installation/quick-start) and [Env Variables](/installation/env) before continuing.

## Configuration

Requirements:

- Completed [Quick Start](/installation/quick-start)
- Completed [Env Variables](/installation/env)
- Registered domain name (e.g. `my-super-panel.com`)

:::warning

You should have a registered domain name to continue.

:::

## Point domain to your server

Check out your server IP address, it is better to use a static IPv4 address.

Now, you need to point your domain to your server.

For example, it will be `my-super-panel.com` -> `193.122.122.122`.

There are two ways to do this:

1. Use a DNS provider (e.g. Cloudflare, Google Cloud, etc.)
2. Use a registrar (e.g. Namecheap, etc.)

### DNS provider

If you use Cloudflare, you need to add a record to your DNS.

Log in to your Cloudflare account [here](https://dash.cloudflare.com/login).
Select domain, which you want to point to your server.

On the left side of the page, click on `DNS` and then click on `Records`.

Click on `Create record`.

Select `Type` as `A` and `Name` as `@`.

:::info

If you want to use subdomains, you should write subdomain name (e.g. `panel`) in the `Name` field.

:::

In the `IPv4 address` field, you should write your server IP address.

Click on `Save`.

Now, you need to wait for the DNS to be updated.

:::info

There are a big difference between yellow cloud (domain is proxied with Cloudflare) and grey cloud (domain is not proxied with Cloudflare) in the Cloudflare control panel.

We will return later to this topic in this guide, but for now it really depends on you.

If Cloudflare works fine in your region, it is better to proxy the domain with Cloudflare. (Yellow cloud)

:::

![static](/reverse-proxies/nginx/cloudflare-dns.webp)

Some DNS providers have a different interface, but the process is the same.

## Caddy configuration

### Simple configuration

Create a file `Caddyfile` in the `/opt/remnawave/caddy` folder.

```bash
mkdir -p /opt/remnawave/caddy && cd /opt/remnawave/caddy && nano Caddyfile
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review configuration below, look for red highlighted lines.

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

Create a file `docker-compose.yml` in the `/opt/remnawave/caddy` folder.

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

### Open the panel in the browser

Open the configured domain name in the browser and you will see login page.

![login-page](/reverse-proxies/nginx/login-page.webp)

## Troubleshooting

<Button label="Ask community" link="https://t.me/+YxzE4bOmEog2Zjhi" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />
