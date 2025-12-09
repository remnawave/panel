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

Paste the following content into the .env file:

```bash title=".env file"
APP_PORT=3010
REMNAWAVE_PANEL_URL=http://remnawave:3000
META_TITLE="Subscription page"
META_DESCRIPTION="Subscription page description"
```

<details>
<summary>Full .env file reference</summary>

```bash title=".env file"
APP_PORT=3010

### Remnawave Panel URL, can be http://remnawave:3000 or https://panel.example.com
REMNAWAVE_PANEL_URL=https://panel.example.com


META_TITLE="Subscription page"
META_DESCRIPTION="Subscription page description"

# If you want to display raw keys in the subscription page, set this to true.
# Please note, this setting will not have any effect if you have HWID enabled.
SUBSCRIPTION_UI_DISPLAY_RAW_KEYS=false



# Serve at custom root path, for example, this value can be: CUSTOM_SUB_PREFIX=sub
# Do not place / at the start/end
CUSTOM_SUB_PREFIX=



# Support Marzban links
MARZBAN_LEGACY_LINK_ENABLED=false
MARZBAN_LEGACY_SECRET_KEY=
REMNAWAVE_API_TOKEN=


# If you use "Caddy with security" addon, you can place here X-Api-Key, which will be applied to requests to Remnawave Panel.
CADDY_AUTH_API_TOKEN=
```

</details>

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
        reverse_proxy * http://remnawave:3000
}
// highlight-next-line-green
https://SUBSCRIPTION_PAGE_DOMAIN {
// highlight-next-line-green
        reverse_proxy * http://remnawave-subscription-page:3010
// highlight-next-line-green
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

If you have already configured Nginx, all you need to do is add a new location block to your configuration file.

Issue a certificate for the subscription page domain name:

```bash
acme.sh --issue --standalone -d 'SUBSCRIPTION_PAGE_DOMAIN' --key-file /opt/remnawave/nginx/subdomain_privkey.key --fullchain-file /opt/remnawave/nginx/subdomain_fullchain.pem --alpn --tlsport 8443
```

Open Nginx configuration file:

```bash
cd /opt/remnawave/nginx && nano nginx.conf
```

:::warning

Please replace `SUBSCRIPTION_PAGE_DOMAIN` with your subscription page domain name.

:::

:::danger

Do not fully replace the existing configuration, only add a new location block to your existing configuration file.

:::

Add a new upstream block to the top of the configuration file.

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

Now add a new server block to the bottom of the configuration file.

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # SSL Configuration (Mozilla Intermediate Guidelines)
    ssl_protocols          TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305;

    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:10m;
    ssl_session_tickets    off;
    ssl_certificate "/etc/nginx/ssl/subdomain_fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/subdomain_privkey.key";
    ssl_trusted_certificate "/etc/nginx/ssl/subdomain_fullchain.pem";

    ssl_stapling           on;
    ssl_stapling_verify    on;
    resolver               1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
    resolver_timeout       2s;

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

Now lets modify the docker-compose.yml for Nginx to mount the new certificate files.

```bash
cd /opt/remnawave/nginx && nano docker-compose.yml
```

```yaml title="docker-compose.yml"
services:
    remnawave-nginx:
        image: nginx:1.28
        container_name: remnawave-nginx
        hostname: remnawave-nginx
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
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

Now you need to restart Nginx container.

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

You can customize the subscription page by creating an `app-config.json` file. This allows you to:

- Add support for different VPN apps
- Customize text and instructions in multiple languages
- Add your own branding (logo, company name, support links)
- Configure which apps appear as "featured"

```mdx-code-block
import DocCard from '@theme/DocCard';

<DocCard
  item={{ type: 'link', label: 'Customization', description: 'Customization guide', href: '/docs/install/subscription-page/customization' }}
/>
```
