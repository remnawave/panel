---
sidebar_position: 1
title: Bundled
---

Bundled installation means that you will install subscription page on the same server as Remnawave Panel.

## Step 1 - Prepare .env file {#step-1}

Edit the `/opt/remnawave/.env` file and change `SUB_PUBLIC_DOMAIN` to your subscription page domain name.

```bash title="Editing .env file"
cd /opt/remnawave && nano .env
```

Change `SUB_PUBLIC_DOMAIN` to your subscription page domain name. Domain name must be without http or https.

```bash title=".env file content"
SUB_PUBLIC_DOMAIN=subscription.domain.com
```

Don't forget to restart Remnawave Panel container:

```bash
cd /opt/remnawave && docker compose down remnawave && docker compose up -d && docker compose logs -f
```

## Step 2 - Create docker-compose.yml file {#step-2}

```bash title="Creating docker-compose.yml file"
mkdir -p /opt/remnawave/subscription && cd /opt/remnawave/subscription && nano docker-compose.yml
```

```yaml title="docker-compose.yml file content"
services:
    remnawave-subscription-page:
        image: remnawave/subscription-page:latest
        container_name: remnawave-subscription-page
        hostname: remnawave-subscription-page
        restart: always
        env_file:
            - .env
        ports:
            - '127.0.0.1:3010:3010'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: true
```

Now create .env file:

```bash title="Creating .env file"
mkdir -p /opt/remnawave/subscription && cd /opt/remnawave/subscription && nano .env
```

Create API token in Remnawave dashboard. Remnawave Settings → API Tokens.

Paste the following content into the .env file:

```bash title=".env file"
APP_PORT=3010
REMNAWAVE_PANEL_URL=http://remnawave:3000
REMNAWAVE_API_TOKEN=API_TOKEN_FROM_REMNAWAVE
```

<details>
<summary>Full .env file reference</summary>

```bash title=".env file"
APP_PORT=3010

### Remnawave Panel URL, can be http://remnawave:3000 or https://panel.example.com
REMNAWAVE_PANEL_URL=http://remnawave:3000
REMNAWAVE_API_TOKEN=API_TOKEN_FROM_REMNAWAVE

# Serve at custom root path, for example, this value can be: CUSTOM_SUB_PREFIX=sub
# Do not place / at the start/end
CUSTOM_SUB_PREFIX=

# Support Marzban links
MARZBAN_LEGACY_LINK_ENABLED=false
MARZBAN_LEGACY_SECRET_KEY=

# If you use "Caddy with security" addon, you can place here X-Api-Key, which will be applied to requests to Remnawave Panel.
CADDY_AUTH_API_TOKEN=

# Express `trust proxy` setting, used so the real client IP is resolved from
# the trusted hop and cannot be spoofed via X-Forwarded-For. Accepts:
#   - "true" / "false"                          -> trust all / none
#   - a non-negative integer (e.g. 1, 2)        -> number of trusted hops
#   - a comma-separated list of preset names    -> loopback, linklocal, uniquelocal
#     and/or IP addresses / CIDR subnets        -> e.g. 127.0.0.1, 172.16.0.0/12
# See https://expressjs.com/en/guide/behind-proxies/
TRUST_PROXY=1
```

</details>

### About `TRUST_PROXY` {#trust-proxy}

:::info About `TRUST_PROXY`

The subscription page runs behind a reverse proxy (Caddy / Nginx), so the client connects to the proxy, not directly to the app. To know the **real** client IP, the app reads the `X-Forwarded-For` header – but that header can be spoofed by the client unless the app is told which hops to trust.

`TRUST_PROXY` is the Express [`trust proxy`](https://expressjs.com/en/guide/behind-proxies/) setting and controls exactly that. Accepted values:

- `true` / `false` – trust all proxies / trust none.
- a non-negative integer (e.g. `1`, `2`) – number of trusted hops between the app and the client.
- a comma-separated list of preset names (`loopback`, `linklocal`, `uniquelocal`) and/or IP addresses / CIDR subnets (e.g. `127.0.0.1, 172.16.0.0/12`).

For the standard single reverse proxy on the same host, the default `TRUST_PROXY=1` is correct. Increase the hop count only if you have additional proxies in front (e.g. Cloudflare → Nginx → app).

:::

## Step 3 - Start the container {#step-3}

```bash title="Starting the container"
docker compose up -d && docker compose logs -f
```

## Step 4 - Configure reverse proxy {#step-4}

:::danger

Remnawave and its components **does not support being server on a sub-path**. (e.g. `location /subscription {`)

It has to be served on the root path of a domain or subdomain.

For custom path, you can use the `CUSTOM_SUB_PREFIX` parameter.

:::

### Caddy

<details>
<summary>Caddy configuration</summary>

If you have already configured Caddy all you need to do is add a new site block to the Caddyfile.

```bash title="Editing Caddyfile"
cd /opt/remnawave/caddy && nano Caddyfile
```

:::warning

Please replace `SUBSCRIPTION_PAGE_DOMAIN` with your domain name.

Review the configuration below, look for green highlighted lines.

:::

:::danger

Do not fully replace the existing configuration, only add a new site block to the existing Caddyfile.

:::

Add a new site block to the end of configuration file.

Pay attention to the green lines, they are the ones you need to add.

```caddy title="Caddyfile"
https://REPLACE_WITH_YOUR_DOMAIN {
    encode
    reverse_proxy * http://remnawave:3000
}

// highlight-next-line-green
https://SUBSCRIPTION_PAGE_DOMAIN {
// highlight-next-line-green
    encode
// highlight-next-line-green
    reverse_proxy * http://remnawave-subscription-page:3010
// highlight-next-line-green
}

:443 {
    tls internal
    respond 204
}
```

Now you need to restart Caddy container.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

</details>

### Nginx

<details>
<summary>Nginx configuration</summary>

If you have already configured Nginx, all you need to do is create a new configuration file.

Issue a certificate for the subscription page domain name:

```bash
acme.sh --issue --standalone -d 'SUBSCRIPTION_PAGE_DOMAIN' --key-file /opt/remnawave/nginx/ssl/subpage_privkey.key --fullchain-file /opt/remnawave/nginx/ssl/subpage_fullchain.pem --alpn --tlsport 8443 --reloadcmd "docker exec remnawave-nginx nginx -s reload"
```

Create new Nginx configuration file for subscription page:

```bash
cd /opt/remnawave/nginx/conf.d && nano subpage.conf
```

:::warning

Please replace `SUBSCRIPTION_PAGE_DOMAIN` with your subscription page domain name.

Review the configuration below, look for red highlighted lines.

:::

```nginx title="subpage.conf"
upstream remnawave-subscription-page {
    server remnawave-subscription-page:3010;
}

server {
    // highlight-next-line-red
    server_name SUBSCRIPTION_PAGE_DOMAIN;

    listen 443 ssl;
    http2 on;
    gzip on;

    location / {
        limit_except GET {
            deny all;
        }

        proxy_http_version 1.1;
        proxy_pass http://remnawave-subscription-page;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Authorization "";

        proxy_intercept_errors on;
        error_page 400 401 403 404 405 500 502 @redirect;
    }

    location @redirect {
        return 404;
    }

    ssl_certificate "/etc/nginx/ssl/subpage_fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/subpage_privkey.key";
    ssl_trusted_certificate "/etc/nginx/ssl/subpage_fullchain.pem";
}
```

Now you need to reload Nginx configuration.

```bash
docker exec remnawave-nginx nginx -t && docker exec remnawave-nginx nginx -s reload
```

Or you can perform full restart of container.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

</details>

### Traefik

<details>
<summary>Traefik configuration</summary>

If you have already configured Traefik, you need to create a new dynamic configuration file called `remnawave-sub-page.yml` in the `/opt/remnawave/traefik/config` directory.

```bash
cd /opt/remnawave/traefik/config && nano remnawave-sub-page.yml
```

Paste the following configuration.

:::warning

Please replace `SUBSCRIPTION_PAGE_DOMAIN` with your subscription page domain name.

Review the configuration below, look for yellow highlighted lines.

:::

```yaml title="remnawave-sub-page.yml"
http:
  routers:
    remnawave-sub-page:
      // highlight-next-line-yellow
      rule: "Host(`SUBSCRIPTION_PAGE_DOMAIN`)"
      entrypoints:
        - https
      tls:
        certResolver: letsencrypt
      middlewares:
        - remnawave-sub-page-https-redirect
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

</details>

## Step 5 - Usage {#step-5}

The subscription page will be available at `https://subdomain.panel.com/<shortUuid>`.

## Configuring subscription page (optional) {#customization}

You can customize the subscription page in the Subpage Builder in Remnawave Dashboard. This allows you to:

- Add support for different VPN apps
- Customize text and instructions in multiple languages
- Add your own branding (logo, company name, support links)
- Configure which apps appear as "featured"
