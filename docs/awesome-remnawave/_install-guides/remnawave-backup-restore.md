### Features

- Manual and scheduled backups of the panel, a Telegram shop bot, or both
- Docker and external PostgreSQL databases
- Upload to Telegram (direct chat or group topic) or up to 5 S3-compatible storages
- Separate retention on the server and in each S3 storage, with disk and S3 usage shown in the menu
- Optional encryption with [age](https://github.com/FiloSottile/age)
- Selective restore: everything, database only, or files only
- Quick access from anywhere with the `rw-backup` command

### Installation

Requires root. On the first run the script asks for the language, the backup mode and your Telegram details.

```bash
curl -o ~/backup-restore.sh https://raw.githubusercontent.com/distillium/remnawave-backup-restore/main/backup-restore.sh && chmod +x ~/backup-restore.sh && ~/backup-restore.sh
```

Migration guides for moving the panel to a new server are in the [README](https://github.com/distillium/remnawave-backup-restore#readme).

### Documentation

The script is also included in [Remnawave Reverse Proxy](https://github.com/eGamesAPI/remnawave-reverse-proxy) by eGames. A step-by-step guide is available in the [eGames wiki](https://wiki.egam.es/configuration/backup-restore/).

:::warning
Restore on the same panel version the backup was made from. The script shows this version before restoring.
:::

:::note
The script backs up only the Remnawave directory and database, and optionally a Telegram shop bot. Other services and configurations are up to you.
:::
