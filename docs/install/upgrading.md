---
sidebar_position: 99
---

# Upgrading

:::danger Before updating, be sure to check the [changelog](https://docs.rw/docs/changelog/remnawave-panel). It show the actions needed before updating. :::

## Remnawave Panel

```bash title="Update and restart"
cd /opt/remnawave && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```

```bash title="Clean unused images"
docker image prune
```

## Remnawave Node

```bash title="Update and restart"
cd /opt/remnanode && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```

## Remnawave Subscription Page

```bash title="Update and restart"
cd /opt/remnawave/subscription && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```
