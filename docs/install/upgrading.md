---
sidebar_position: 99
---

# Upgrading

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
