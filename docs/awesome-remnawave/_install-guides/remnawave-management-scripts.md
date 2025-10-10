### 📦 Key Features

- 🚀 **One-line installation** for Panel, Node, and Selfsteal configurations
- 🎛️ **Interactive menus** with real-time status monitoring and guided operations
- 💾 **Smart backup system** with version compatibility checking and safety rollbacks
- 🔄 **Complete lifecycle management** - install, update, backup, restore, uninstall
- 🎯 **Reality masking** with 11 AI-generated website templates

### Quick Install Commands

#### Remnawave Panel (v3.5.5+)

```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave.sh) @ install
```

#### Remnawave Node (v3.1.2+)

```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh) @ install
```

#### Reality Selfsteal (v2.1.3+)

```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/selfsteal.sh) @ install
```

:::info Options

- Add `--dev` for development version
- Add `--name customname` for custom directory (default: `/opt/remnawave`, `/opt/remnanode`)
  :::

#### For existing installations

Use `install-script` to add CLI wrapper only:

```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave.sh) @ install-script
```

```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh) @ install-script
```

### Available CLI Commands

**Installation & Management:**

- `install`, `update`, `uninstall`
- `install-script`, `uninstall-script`

**Service Control:**

- `up`, `down`, `restart`, `status`, `logs`

**Node-specific Commands:**

- `core-update` - Manual Update/Install Xray-core to latest version
- `xray-log-out`, `xray-log-err` - View Xray logs
- `setup-logs` - Configure log rotation

**Configuration:**

- `edit`, `edit-env`, `console` (Panel only)

**Interactive Menus:**

- Run `remnawave`, `remnanode`, or `selfsteal` without arguments for interactive menu
- Real-time status monitoring and resource usage
- Step-by-step guided operations

**Backup & Restore (Panel):**

- `backup` - Create manual backup
- `schedule` - Configure automated backups
- `restore` - Restore from backup archive

**Reality Selfsteal:**

- Choose from 11 AI-generated website templates
- Automatic SSL certificate management by Caddy
- DNS validation before start

Run `remnawave help`, `remnanode help`, or `selfsteal help` for detailed usage.

### 💾 Intelligent Backup & Restore System

**🔄 Smart Backup Features:**

- **Version-aware backups** with compatibility checking
- **Safety restore** with automatic rollback protection
- **Scheduled automation** with cron integration
- **Telegram notifications** with file delivery and alerts
- **Cross-server migration** support with detailed instructions
- **Compressed archives** with unified structure

**📦 What's Backed Up:**

- PostgreSQL database as `db_backup.sql`
- Configuration files: `docker-compose.yml`, `.env`, `app-config.json`
- Optional: full directory backup with selective restore

**🎯 Quick Commands:**

```bash
remnawave backup          # Create instant backup
remnawave schedule        # Setup automated backups
remnawave restore         # Intelligent restore with version checks
```

**🛡️ Safety Features:**

- Automatic version compatibility verification
- Safety backup before restore operations
- Rollback capability if restore fails
- Real-time status monitoring during operations

**📋 Restore Options:**

- Full restore (replace all files and database)
- Database-only restore (keep existing files)
- Custom directory restoration
- Manual restore commands included in each backup archive

**Legacy Standalone Scripts:**

Available for users who need legacy standalone backup/restore tools:

- [remnawave-backup.sh](https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave-backup.sh) - Standalone backup script
- [restore.sh](https://github.com/DigneZzZ/remnawave-scripts/raw/main/restore.sh) - Standalone restore script

📦 Full info, updates, and examples: [**remnawave-scripts**](https://github.com/DigneZzZ/remnawave-scripts)

Project: [GIG.ovh](https://gig.ovh)
