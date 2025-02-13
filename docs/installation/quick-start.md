---
sidebar_position: 1
slug: /installation/quick-start
title: Quick start
---

## Installation

Remnawave consists of two parts:

- Main panel (aka backend)
- Node (with XRay Core inside)

You can install both parts on the same machine or separate machines.

Minimum requirements for Backend:

- 2GB of RAM
- 2 CPU cores
- Docker Engine

Minimum requirements for Node:

- 1GB of RAM
- 1 CPU core
- Docker Engine

## Configuration

First of all, you need to configure the environment variables.

You can find the list of all environment variables in the [Environment Variables](/installation/env) page.

:::warning

Be sure to change the default credentials in the environment variables.

:::

## Installation

### Main Panel

:::info

This guide written for Ubuntu 22.04, instructions may vary for other distributions.
:::

1. Create separate directory for the project.

```bash
mkdir remnawave && cd remnawave
```

2. Download and configure the environment variables.

```bash
curl -o .env https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/.env.sample
```

3. Configure the environment variables.

```bash
nano .env
```

4. Create `docker-compose.yml` file, example below.

:::danger

Do not expose the services to the public internet, use only `127.0.0.1` for Remnawave services.

You must use Nginx/Caddy/Apache/etc. to expose the services to the public internet.

This guide does not cover the configuration of the reverse proxy, but just a bit later we will use Cloudflare Tunnel to expose the services to the public internet.

:::

```yaml title="docker-compose.yml"
services:
    remnawave-db:
        image: postgres:17
        container_name: 'remnawave-db'
        hostname: remnawave-db
        restart: always
        env_file:
            - .env
        environment:
            - POSTGRES_USER=${POSTGRES_USER}
            - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
            - POSTGRES_DB=${POSTGRES_DB}
            - TZ=UTC
        ports:
            - '127.0.0.1:6767:5432'
        volumes:
            - remnawave-db-data:/var/lib/postgresql/data
        networks:
            - remnawave-network
        healthcheck:
            test: ['CMD-SHELL', 'pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}']
            interval: 3s
            timeout: 10s
            retries: 3

    remnawave:
        image: remnawave/backend:latest
        container_name: 'remnawave'
        hostname: remnawave
        restart: always
        ports:
            - '127.0.0.1:3000:3000'
        env_file:
            - .env
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: false

volumes:
    remnawave-db-data:
        driver: local
        external: false
        name: remnawave-db-data
```

5. Run containers.

```bash
docker compose up -d
```

6. Check the logs.

```bash
docker compose logs -f
```

7. Remnawave is now running on `http://127.0.0.1:3000`.

Now we are ready to move on the Reverse Proxy installation.

:::danger

Do not expose the services to the public internet, use only `127.0.0.1` for Remnawave services.

You must use Nginx/Caddy/Apache/etc. to expose the services to the public internet.

<Button label="Continue to Reverse Proxy installation" link="/installation/rp/nginx" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />

:::
