---
title: Updating from 1.3.x to 1.4.x
authors: remnawave
tags: [updating-guides]
date: 2025-03-14
---

# Release v1.4.x

<Button
    label="Check out full changelog"
    variant="secondary"
    outline
    link="https://hub.remna.st/changelog/remnawave-v1-4-0"
/>

## Remnawave Panel

### Updating backend

1. Update docker-compose.yml.

```bash
cd /opt/remnawave && nano docker-compose.yml
```

2. Replace your current configuration with the new one:

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
        // highlight-next-line-green
        depends_on:
            // highlight-next-line-green
            remnawave-db:
            // highlight-next-line-green
                condition: service_healthy
            // highlight-next-line-green
            remnawave-redis:
            // highlight-next-line-green
                condition: service_healthy

    // highlight-next-line-green
    remnawave-redis:
        // highlight-next-line-green
        image: valkey/valkey:8.0.2-alpine
        // highlight-next-line-green
        container_name: remnawave-redis
        // highlight-next-line-green
        hostname: remnawave-redis
        // highlight-next-line-green
        restart: always
        // highlight-next-line-green
        networks:
            // highlight-next-line-green
            - remnawave-network
        // highlight-next-line-green
        volumes:
            // highlight-next-line-green
            - remnawave-redis-data:/data
        // highlight-next-line-green
        healthcheck:
            // highlight-next-line-green
            test: ['CMD', 'valkey-cli', 'ping']
            // highlight-next-line-green
            interval: 3s
            // highlight-next-line-green
            timeout: 10s
            // highlight-next-line-green
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
    // highlight-next-line-green
    remnawave-redis-data:
        // highlight-next-line-green
        driver: local
        // highlight-next-line-green
        external: false
        // highlight-next-line-green
        name: remnawave-redis-data
```

3. Moving on to the .env file.

```bash
cd /opt/remnawave && nano .env
```

4. Remove old .env variables:

```title=".env"
// highlight-next-line-red
SUB_SUPPORT_URL
// highlight-next-line-red
SUB_PROFILE_TITLE
// highlight-next-line-red
SUB_UPDATE_INTERVAL
// highlight-next-line-red
SUB_WEBPAGE_URL
// highlight-next-line-red
EXPIRED_USER_REMARKS
// highlight-next-line-red
DISABLED_USER_REMARKS
// highlight-next-line-red
LIMITED_USER_REMARKS
// highlight-next-line-red
SUPERADMIN_PASSWORD
// highlight-next-line-red
SUPERADMIN_USERNAME
```

Don't worry about the removed variables, they are moved to dashboard settings.
Check out "Subscription Settings" section in dashboard.

Superadmin credentials now is stored in database and you will be prompted to create a superadmin account after updating.

1. Add new .env variables:

```title=".env"
// highlight-next-line-green
### REDIS ###
// highlight-next-line-green
REDIS_HOST=remnawave-redis
// highlight-next-line-green
REDIS_PORT=6379
```

6. Going live

```bash
docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```

### About subscription templates

In previous versions of Remnawave, you could can mount custom templates for Sing-box, Mihomo, and Stash with setup similar to this:

```yaml title="docker-compose.yml"
volumes:
    - ./custom/configs/clash/stash_template.yml:/var/lib/remnawave/configs/stash/stash_template.yml
    - ./custom/configs/clash/clash_template.yml:/var/lib/remnawave/configs/clash/clash_template.yml
    - ./custom/configs/singbox/singbox_legacy.json:/var/lib/remnawave/configs/singbox/singbox_legacy.json
    - ./custom/configs/singbox/singbox_template.json:/var/lib/remnawave/configs/singbox/singbox_template.json
```

In v1.4.x, we've removed support of _mounting_ custom templates from docker-compose.yml.

Now, you can only use templates from dashboard.  
Check out new section in dashboard `Templates`.

## Remnawave Node (Remnanode)

1. Update with command:

```bash
cd /opt/remnanode && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```
