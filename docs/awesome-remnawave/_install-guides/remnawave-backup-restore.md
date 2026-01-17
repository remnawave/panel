### Features

- creating a manual backup and configuring automatic scheduled backups
- notifications in Telegram with backup file attached
- supports sending backup to Google Drive
- restore from backup
- backups retention policy (7 days) implemented
- quick access from anywhere on the system with the `rw-backup` command

### Installation

```bash
curl -o ~/backup-restore.sh https://raw.githubusercontent.com/distillium/remnawave-backup-restore/main/backup-restore.sh && chmod +x ~/backup-restore.sh && ~/backup-restore.sh
```

:::danger
As a precaution, use the restore function on the same panel version from which the backup was made (or create the backup from the latest panel version).
:::

:::warning
This script is designed to perform meaningful maintenance operations on the Remnawave database. Although it has been thoroughly tested, its functions affect the entire database and its components. It is recommended that you carefully follow the script's instructions before executing any commands.
:::

:::tip
The script backups and restores only the entire database, as well as the .env and .env-node files (if they exist in the /opt/remnawave/ or /root/remnawave/ directory). The backup and recovery of all other files and configurations are entirely the responsibility of the user.
:::
