---
sidebar_position: 99
---

# Upgrading

:::tip
It is recommended to update the **Remnawave Panel** first, then the **Remnawave Nodes**.
Make sure to check the [Changelog](/docs/changelog/remnawave-panel) for other changes.
:::

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