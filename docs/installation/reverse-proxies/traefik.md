---
sidebar_position: 4
slug: /installation/rp/traefik
title: Traefik
---

## Overview

In this guide we will use Traefik as a reverse proxy for requests to Remnawave. We will redirect a domain to our server and configure Traefik. Traefik will handle issue of SSL certificates by itself.
Complete [Quick Start](/installation/quick-start) and [Env Variables](/installation/env) before continuing.

## Prerequisites

- Completed [Quick Start](/installation/quick-start)
- Completed [Env Variables](/installation/env)

:::warning

You should have a registered domain name to continue.

:::

## Point domain to your server

Check out your server IP address, it is better to use a static IPv4 address.

Now, you need to point your domain to your server.

For example, it will be my-super-panel.com -> 193.122.122.122.

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

## Traefik configuration

### Create docker-compose.yml

Create a file `docker-compose.yml` in the `~/remnawave/traefik` folder.

```bash
mkdir -p ~/remnawave/traefik && cd ~/remnawave/traefik && nano docker-compose.yml
```

Paste the following configuration.

```yaml title="docker-compose.yml"
services:
  traefik:
    image: traefik:latest
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - remnawave-network
    ports:
      - 80:80
      - 443:443
    environment:
      - TZ=Europe/Moscow
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./letsencrypt:/letsencrypt
      - ./config:/config:ro
      - ./logs:/var/log/traefik
networks:
  remnawave-network:
    name: remnawave-network
    driver: bridge
    external: false
```

### Create static configuration file

Creating a static configuration file `traefik.yml` in the `~/remnawave/traefik` folder.

```bash
cd ~/remnawave/traefik && nano traefik.yml
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_EMAIL` with your email.

Review configuration below, look for yellow highlighted lines.

:::

```yaml title="traefik.yml"
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
serversTransport:
  insecureSkipVerify: true
providers:
  file:
    directory: /config
    watch: true
certificatesResolvers:
  letsencrypt:
    acme:
      // highlight-next-line-yellow
      email: REPLACE_WITH_YOUR_EMAIL
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: http

log:
  level: "INFO"
  filePath: "/var/log/traefik/traefik.log"
accessLog:
  filePath: "/var/log/traefik/access.log"
```

### Create dynamic configuration file

Create a file `remnawave.yml` in the `~/remnawave/traefik/config` folder.

```bash
mkdir -p ~/remnawave/traefi/config && cd ~/remnawave/traefik/config && nano remnawave.yml
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review configuration below, look for yellow highlighted lines.

:::

```yaml title="remnawave.yml"
http:
  routers:
    remnawave:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - http
      middlewares:
        - remnawave-https-redirect
      service: remnawave

    remnawave-secure:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - https
      middlewares:
      tls:
        certResolver: letsencrypt
      service: remnawave

  middlewares:
    remnawave-https-redirect:
      redirectScheme:
        scheme: https

  services:
    remnawave:
      loadBalancer:
        servers:
          - url: "http://remnawave:3000"
```

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

### Open the panel in the browser

Open the configured domain name in the browser and you will see login page.

![login-page](/reverse-proxies/nginx/login-page.webp)

### Restricting access to the panel by IP

If you want to restrict access to the panel by IP, create a middleware named `ip_allow_list.yml`

```bash
cd ~/remnawave/traefik/config && nano ip_allow_list.yml
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_IP` with your allowed IPs (or ranges of allowed IPs by using CIDR notation).

Review configuration below, look for yellow highlighted lines.

:::

:::info

If your domain is proxied by Cloudflare, then you need to specify the IP ranges belonging to Cloudflare in the `excludedIPs` list.

Cloudflare regularly updates its IP ranges. To do this, you can use the [official Cloudflare page](https://www.cloudflare.com/ips/) to make sure that you have an up-to-date list.

:::

```yaml title="ip_allow_list.yml"
http:
  middlewares:
    ip-allow-list:
      ipAllowList:
        sourceRange:
          // highlight-next-line-yellow
          - "REPLACE_WITH_YOUR_IP"
        ipStrategy:
          excludedIPs:
            - 73.245.48.0/20
            - 103.21.244.0/22
            - 103.22.200.0/22
            - 103.31.4.0/22
            - 141.101.64.0/18
            - 108.162.192.0/18
            - 190.93.240.0/20
            - 188.114.96.0/20
            - 197.234.240.0/22
            - 198.41.128.0/17
            - 162.158.0.0/15
            - 104.16.0.0/13
            - 104.24.0.0/14
            - 172.64.0.0/13
            - 131.0.72.0/22
```

Then you need to connect the middleware `ip-allow-list` to the configuration file `remnawave.yml`

```bash
nano remnawave.yml.yml
```

Pay attention to the green line, they are the ones you need to add.

```yaml title="remnawave.yml"
http:
  routers:
    remnawave:
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - http
      middlewares:
        - remnawave-https-redirect
      service: remnawave

    remnawave-secure:
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - https
      middlewares:
        // highlight-next-line-green
        - ip-allow-list
      tls:
        certResolver: letsencrypt
      service: remnawave

  middlewares:
    remnawave-https-redirect:
      redirectScheme:
        scheme: https

  services:
    remnawave:
      loadBalancer:
        servers:
          - url: "http://remnawave:3000"

```

## Troubleshooting

<Button label="Ask community" link="https://t.me/+YxzE4bOmEog2Zjhi" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />