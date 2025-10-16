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
cd /opt/remnawave && docker compose down && docker compose up -d && docker compose logs -f -t
```

### Access PM2 monitor

```bash
docker exec -it remnawave pm2 monit
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
cd /opt/remnanode && docker compose down && docker compose up -d && docker compose logs -f -t
```

### FIX postgres REFRESH COLLATION VERSION

```bash
cd /opt/remnawave && docker compose exec remnawave-db psql -U $(grep '^POSTGRES_USER=' .env | cut -d '=' -f2) -d remnawave_db -c "
DO \$\$
DECLARE
    db_name text;
BEGIN
    FOR db_name IN SELECT datname FROM pg_database WHERE datname NOT IN ('template0') LOOP
        EXECUTE format('ALTER DATABASE %I REFRESH COLLATION VERSION', db_name);
    END LOOP;
END \$\$;
"
```
