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

Make sure to change the default credentials in the environment variables.

:::

## Installation

### Main Panel

:::info

This guide was written for Ubuntu 22.04, instructions may vary for other distributions.
:::

1. In order to use Remnawave you will need to install docker, if not already.

```bash
sudo curl -fsSL https://get.docker.com | sh
```

2. Create a directory for the project files.

```bash
mkdir /opt/remnawave && cd /opt/remnawave
```

3. Download the environment variables sample file.

```bash
curl -o .env https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/.env.sample
```

4. Configure the environment variables.

```bash
nano .env
```

5. Create a `docker-compose.yml` file for the panel, you can use the example below.

```bash
nano docker-compose.yml
```

:::danger

Do not expose the services to the public internet; use only `127.0.0.1` for Remnawave services.

You should use a reverse proxy like Nginx, Caddy, Apache, etc. to expose the services publicly.

The documentation provides guides on using these reverse proxies or Cloudflare Tunnel in combination with Remnawave.

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
        depends_on:
            remnawave-db:
                condition: service_healthy
            remnawave-redis:
                condition: service_healthy

    remnawave-redis:
        image: valkey/valkey:8.0.2-alpine
        container_name: remnawave-redis
        hostname: remnawave-redis
        restart: always
        networks:
            - remnawave-network
        volumes:
            - remnawave-redis-data:/data
        healthcheck:
            test: ['CMD', 'valkey-cli', 'ping']
            interval: 3s
            timeout: 10s
            retries: 3

networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: false

volumes:
    remnawave-db-data:
        driver: local
        external: false
        name: remnawave-db-data
    remnawave-redis-data:
        driver: local
        external: false
        name: remnawave-redis-data
```

1. Run the containers.

```bash
docker compose up -d
```

7. Check the logs.

```bash
docker compose logs -f
```

8. Remnawave is now running on `http://127.0.0.1:3000`.

Now we are ready to move on to Reverse Proxy installation.

:::danger

Do not expose the services to the public internet; use only `127.0.0.1` for Remnawave services.

You should use a reverse proxy like Nginx, Caddy, Apache, etc. to expose the services publicly.

<Button label="Continue to Reverse Proxy installation" link="/installation/rp/nginx" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />

:::
