---
title: Upgrading to 1.6.x
authors: remnawave
tags: [updating-guides]
date: 2025-05-10
---

# Release v1.6.x

<Button
    label="Check out full changelog"
    variant="secondary"
    outline
    link="https://hub.remna.st/changelog/remnawave-v1-6-0"
/>

<!-- truncate -->

## Remnawave Panel

### API schema changed

Remnawave Panel API schema changed, so you need to update your API clients.

:::danger

**Release v1.6.x contains really breaking changes in API schema.**

Almost all endpoints are changed!

Please, review [new API schema](https://docs.rw/api) before updating.

:::

### Change .env variables

If you are using Telegram bot notifications, pleace review changes below:

```bash title="1.5.x .env"
IS_TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=1234567890

TELEGRAM_ADMIN_ID=1234567890
TELEGRAM_ADMIN_THREAD_ID=1234567890

NODES_NOTIFY_CHAT_ID=1
NODES_NOTIFY_THREAD_ID=1
```

And update them with new values:

```bash title="1.6.x .env"

# Disable/Enable Telegram notifications
IS_TELEGRAM_NOTIFICATIONS_ENABLED=false

# Telegram bot token
TELEGRAM_BOT_TOKEN=change_me

# Notifications about users
TELEGRAM_NOTIFY_USERS_CHAT_ID=change_me

# Notifications about nodes
TELEGRAM_NOTIFY_NODES_CHAT_ID=change_me

# Optional, if you want to send notifications to specific topics in Telegram group
TELEGRAM_NOTIFY_USERS_THREAD_ID=
TELEGRAM_NOTIFY_NODES_THREAD_ID=
```

### Update Remnawave Panel

```bash
docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```

## Remnawave Subscription Page

The backend part of @remnawave/subscription-page has been fully rewritten with NestJS (TypeScript) from scratch.

### New .env file format and variables

```bash title=".env"

APP_PORT=3010

### Remnawave Panel URL, can be http://remnawave:3000 or https://panel.example.com
REMNAWAVE_PANEL_URL=https://panel.example.com


META_TITLE="Subscription page"
META_DESCRIPTION="Subscription page description"

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

You can use with .env file or environment variables.

```yaml title="docker-compose.yml"
services:
    remnawave-subscription-page:
        image: remnawave/subscription-page:latest
        container_name: remnawave-subscription-page
        hostname: remnawave-subscription-page
        restart: always
        environment:
            - APP_PORT=3010
            - REMNAWAVE_PANEL_URL=https://panel.example.com # Can be http://remnawave:3000 or https://panel.example.com
            - META_TITLE="Subscription page"
            - META_DESCRIPTION="Subscription page description"
        ports:
            - '127.0.0.1:3010:3010'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: true
```

Also, pay attention if you are using custom app-config.json.

New correct path is `/opt/app/frontend/assets/app-config.json`.

```yaml title="docker-compose.yml"
volumes:
    - ./app-config.json:/opt/app/frontend/assets/app-config.json
```

### Update Remnawave Subscription Page

```bash
docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```
