---
sidebar_position: 1
slug: /security/caddy-with-minimal-setup
title: Caddy with minimal setup
---

Caddy is a powerful and flexible web server that can be used to secure your Remnawave panel.

## Installation

First of all, create a directory for Caddy.

```bash
mkdir -p ~/opt/remnawave/caddy && cd ~/opt/remnawave/caddy
```

And create a `docker-compose.yml` file.

```bash
touch docker-compose.yml && nano docker-compose.yml
```

And add the following content to the file:

```yaml title="docker-compose.yml"
services:
    remnawave-caddy:
        image: remnawave/caddy-with-auth:latest
        container_name: 'remnawave-caddy'
        hostname: remnawave-caddy
        restart: always
        environment:
            - AUTH_TOKEN_LIFETIME=3600
            // highlight-next-line-red
            - REMNAWAVE_PANEL_DOMAIN=PANEL_DOMAIN
            // highlight-next-line-red
            - AUTHP_ADMIN_USER=LOGIN_USERNAME
            // highlight-next-line-red
            - AUTHP_ADMIN_EMAIL=LOGIN_EMAIL
            // highlight-next-line-red
            - AUTHP_ADMIN_SECRET=LOGIN_PASSWORD

        ports:
            - '0.0.0.0:443:443'
        networks:
            - remnawave-network
        volumes:
            - ./Caddyfile:/etc/caddy/Caddyfile
            - remnawave-caddy-ssl-data:/data

networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: true

volumes:
    remnawave-caddy-ssl-data:
        driver: local
        external: false
        name: remnawave-caddy-ssl-data
```

## Configuring .env variables

You need to set a domain name for your Remnawave panel. Caddy will automatically issue a certificate for this domain.

```bash
REMNAWAVE_PANEL_DOMAIN=panel.domain.com
```

Admin credentials.
Make sure to use a strong password.

```bash
AUTHP_ADMIN_USER=admin
AUTHP_ADMIN_EMAIL=admin@domain.com
AUTHP_ADMIN_SECRET=strong_password
```

Token lifetime.

```bash
AUTH_TOKEN_LIFETIME=3600
```

## Caddyfile

Lets deep dive into the `Caddyfile`.

First of all, you need to select one of our predefined setups.

### Full security setup with MFA {#full}

- [x] All routes are protected by authentication. (Frontend, Backend)
- [x] All API-endpoints are protected, includes /api/sub/\* endpoints.
- [x] Login requires MFA with OTP-codes.
- [x] Special API-keys can be issued for /api/\* endpoints.
- [x] Full domain protection.

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/minimal-security-setup-with-mfa/Caddyfile
```

### API routes without auth (api/\*) {#minimal}

- [x] Routes are protected by authentication. (**Frontend**)
- [x] Login requires MFA with OTP-codes. (**Frontend**)
- [x] **All API-endpoints are not protected!** (/api/\* is public)

:::danger

This setup exposes the `/api/*` endpoints to the public internet.

All endpoints will not require authentication, but will still use the Remnawave security features.

We recommend using [full security setup with MFA](#full) for production environments where you will be issuing API-keys.

:::

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/minimal-security-setup-with-mfa-with-api-without-auth/Caddyfile
```

### /api/sub/\* endpoints without auth {#minimal-with-opened-sub}

- [x] Routes are protected by authentication. (**Frontend**)
- [x] Login requires MFA with OTP-codes. (**Frontend**)
- [x] Only `/api/sub/*` endpoints is public, other endpoints are protected.

:::danger

This setup exposes the `/api/sub/*` endpoints to the public internet.

We recommend using [full security setup with MFA](#full) for production environments where you will be issuing API-keys and using [@remnawave/subscription-page](/docs/install/remnawave-subscription-page) for public subscription page.

:::

Run the command below to download the Caddyfile.

```bash
curl -o Caddyfile https://raw.githubusercontent.com/remnawave/caddy-with-auth/refs/heads/main/examples/minimal-security-setup-with-mfa-with-api-without-auth/Caddyfile
```

## Running the container

After you selected one of the setups above, you can start the container with the following command.

```bash
docker compose up -d && docker compose logs -f
```

## Accessing the panel

After the container is running, you can access the panel at `https://panel.domain.com`.

After that, you will be redirected to the login page of Caddy Auth.

On the first start, you will be prompted to create a MFA method.

We recommend using [Google Authenticator](https://www.google.com/search?q=google+authenticator) for this.

### Disable MFA

If you want to completly disable MFA, you can do this by editing the `Caddyfile`.

Open the `Caddyfile` and change the following line:

```bash
cd ~/opt/remnawave/caddy && nano Caddyfile
```

Find the following lines, and remove the `require mfa` line.

```caddy title="Caddyfile"
transform user {
	match origin local
	action add role authp/admin
    // highlight-next-line-red
	require mfa
}
```

After that, you can restart the container with the following command.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

## Accessing Auth Portal page

:::info

You can access the Auth Portal page at `https://<your-domain>/r`.

:::

![Auth Portal page](/security/auth-portal.webp)

Here you can quickly go to Remnawave dashboard or manage some of Auth Portal settings.

In the MFA section, you can delete or add new MFA devices.

## Issuing API-keys

:::info

You can access the Auth Portal page at `https://<your-domain>/r`.

:::

On the Auth Portal page, you can issue API-keys, click on the `API-keys` tab.

:::info

After you issue an API-key, you can use it in the `X-Api-Key` header of your requests to the API.

Example: `X-Api-Key: YxOovHLnpkcmSig5082egcHnyTk8SK4dNGAFHgZ2LKZezgj5oUj2FA2IR2sMwbALnP9YNpzZ`

:::

![API-keys](/security/api-keys.webp)
