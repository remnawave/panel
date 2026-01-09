---
sidebar_position: 2
title: Separate server
---

Separate server installation means that you will install subscription page on a different server from Remnawave Panel.

## Step 1 - Prepare .env file {#step-1}

:::warning

Make this changes on the server where Remnawave Panel is installed.

:::

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

:::warning

This step and next steps should be made on another server!

:::

:::warning

Make sure you have Docker installed on the server where you will install the subscription page.

:::

import InstallDocker from '/docs/partials/\_install_docker.md';

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
        name: remnawave-network
        driver: bridge
        external: false
```

Now create .env file:

```bash title="Creating .env file"
mkdir -p /opt/remnawave/subscription && cd /opt/remnawave/subscription && nano .env
```

Create API token in Remnawave dashboard. Remnawave Settings → API Tokens.

Paste the following content into the .env file:

```
APP_PORT=3010
// highlight-next-line-red
REMNAWAVE_PANEL_URL=https://remnawave.panel.com
// highlight-next-line-red
REMNAWAVE_API_TOKEN=API_TOKEN_FROM_REMNAWAVE
```

Replace `remnawave.panel.com` with your panel domain name.

<details>
<summary>Full .env file reference</summary>

```bash title=".env file"
APP_PORT=3010

### Remnawave Panel URL, can be http://remnawave:3000 or https://panel.example.com
REMNAWAVE_PANEL_URL=https://panel.example.com
REMNAWAVE_API_TOKEN=API_TOKEN_FROM_REMNAWAVE

# Serve at custom root path, for example, this value can be: CUSTOM_SUB_PREFIX=sub
# Do not place / at the start/end
CUSTOM_SUB_PREFIX=

# Support Marzban links
MARZBAN_LEGACY_LINK_ENABLED=false
MARZBAN_LEGACY_SECRET_KEY=


# If you use "Caddy with security" addon, you can place here X-Api-Key, which will be applied to requests to Remnawave Panel.
CADDY_AUTH_API_TOKEN=

# If you use Cloudflare Zero Trust to protect your panel, please use this variables to bypass the security.
CLOUDFLARE_ZERO_TRUST_CLIENT_ID=
CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET=
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

Create a file called `Caddyfile` in the `/opt/remnawave/caddy` directory.

```bash
mkdir -p /opt/remnawave/caddy && cd /opt/remnawave/caddy && nano Caddyfile
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your subscription page domain name.

Review the configuration below, look for red highlighted lines.

:::

```caddy title="Caddyfile"
// highlight-next-line-red
https://SUBSCRIPTION_PAGE_DOMAIN {
        reverse_proxy * http://remnawave-subscription-page:3010
}
:443 {
    tls internal
    respond 204
}
```

:::warning

Please replace `SUBSCRIPTION_PAGE_DOMAIN` with your domain name.

Review the configuration below, look for green highlighted lines.

:::

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

</details>

## Step 5 - Usage {#step-5}

The subscription page will be available at `https://subdomain.panel.com/<shortUuid>`.

## Configuring subscription page (optional) {#customization}

You can customize the subscription page in the Subpage Builder in Remnawave Dashboard. This allows you to:

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
