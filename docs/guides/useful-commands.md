---
sidebar_position: 1
title: Useful commands
---

## Remnawave Panel

### Rescue CLI

Rescue CLI provides a few rescue commands like reset superadmin and other useful commands.

```bash
docker exec -it remnawave remnawave
```

### Restart Remnawave Panel

```bash
cd ~/opt/remnawave && docker compose down && docker compose up -d && docker compose logs -f -t
```

## Remnawave Node

### Access Xray Core logs {#logs}

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.out.log
```

or

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.err.log
```

### Restart Remnawave Node

```bash
cd ~/opt/remnanode && docker compose down && docker compose up -d && docker compose logs -f -t
```
