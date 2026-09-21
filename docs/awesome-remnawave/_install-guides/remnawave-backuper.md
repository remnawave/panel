### Features

- Remnawave files and PostgreSQL dump
- Native and Docker Compose installation
- Telegram, Discord, and Gmail delivery
- HTTP/SOCKS proxy support for Telegram and Discord
- Configurable scheduling with per-job locking
- Optional ZIP password protection

### Native installation

```bash
git clone https://github.com/AidarKhusainov/backupable.git
cd backupable
sudo bash backupable.sh
```

### Docker Compose

```bash
mkdir -p /opt/backupable
cd /opt/backupable

curl -fsSLo compose.yaml \
  https://raw.githubusercontent.com/AidarKhusainov/backupable/master/compose.yaml

docker compose pull
docker compose up -d
docker compose run --rm backupable setup
```

The built-in Remnawave template targets the standard local deployment with files under `/opt/remnawave` and PostgreSQL in the `remnawave-db` container.
