---
sidebar_position: 5
slug: /awesome
title: ❤️ Awesome Remnawave
---

# ❤️ Awesome Remnawave

### Xray Checker

Xray Checker is a tool for monitoring proxy server availability with support for VLESS, VMess, Trojan, and Shadowsocks protocols. It automatically tests connections through Xray Core and provides metrics for Prometheus, as well as API endpoints for integration with monitoring systems.

Author: [kutovoys](https://github.com/kutovoys)

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/kutovoys/xray-checker" variant="secondary" size="md" outline />
  <Button label="Documentation" link="https://xray-checker.kutovoy.dev/" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/xray-checker.webp" alt="Xray Checker" width="600" />
</div>

---

### Remnawave Node installation script

Bash script to fast install Remnawave node

Author: [DigneZzZ](https://github.com/dignezzz)

#### DEV branch Install

```bash
sudo bash -c "$(curl -sL https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh)" @ install --dev
```

If you want the latest branch, delete `--dev`.

Working directory: `/opt/remnanode`

App directory for custom `xray`: `/var/lib/remnanode`

After install, use `remnanode help` for more information.

<br />
<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/DigneZzZ/remnawave-scripts" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnanode-script.webp" alt="RemnaNode script" width="600" />
</div>

---

### Remnawave Backup Script

A bash script to create backups of the Remnawave database and configurations. Backups are sent to a Telegram chat for easy access. The script backs up the following:

- The Remnawave database as `db_backup.sql`
- Either the entire specified folder (e.g., `/opt/remnawave` or user-defined) or specific files:
  - `docker-compose.yml`
  - `.env`
  - `app-config.json` (custom file for the subscription page, see [instructions](https://remna.st/subscription-templating/client-configuration))

Author: [DigneZzZ](https://github.com/DigneZzZ)

#### Install and Run

```bash
sudo bash -c "$(curl -sL https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave-backup.sh)"
```

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/DigneZzZ/remnawave-scripts" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-backup.webp" alt="Remnawave Backup Script" width="600" />
</div>

---

### Remnawave Restore Script (BETA)

A bash script to restore Remnawave backups, either fully (files and database) or database-only, from a `.tar.gz` archive to a specified directory. **Warning: This is a beta version. Use with extreme caution, especially on a live Remnawave panel, as it may overwrite critical data or cause instability.**

The script performs the following:
- Clears all existing data in the specified database and restores it from `db_backup.sql`
- Restores files to the chosen directory (e.g., `/opt/remnawave` or user-defined), including:
  - `docker-compose.yml`
  - `.env`
  - `app-config.json` (custom file for the subscription page, see [instructions](https://remna.st/subscription-templating/client-configuration))
- Starts containers to ensure the restored setup is operational

Author: [DigneZzZ](https://github.com/DigneZzZ)

#### Install and Run

```bash
sudo bash -c "$(curl -sL https://github.com/DigneZzZ/remnawave-scripts/raw/main/restore.sh)"
```

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/DigneZzZ/remnawave-scripts" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-restore.webp" alt="Remnawave Restore Script" width="600" />
</div>


---

## Add project to the list

If you want to add project to the list, please open a PR on [GitHub](https://github.com/remnawave/panel/blob/main/docs/awesome-remnawave/index.md).

Make sure that is your target branch is `main`.

Also, the following pre-requisites must be met:

- [x] Project must be open source.
- [x] Project must be related to Remnawave or **useful for Remnawave users**.

Following format must be used:

```md
### Project name

Short project description.

[Project link or repository link](https://project.com)

![Project image](/awesome/project-name.webp)
```

Use the examples above to add your project to the list.

:::info

Please, use [https://squoosh.app/](https://squoosh.app/) to compress the image. Format must be `webp`.  
Place the image to folder `static/awesome`.

:::
