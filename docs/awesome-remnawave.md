---
sidebar_position: 7
title: ❤️ Awesome Remnawave
---

# ❤️ Awesome Remnawave

### Xray Checker

Xray Checker is a tool for monitoring proxy server availability with support for VLESS, VMess, Trojan, and Shadowsocks protocols. It automatically tests connections through Xray Core and provides metrics for Prometheus, as well as API endpoints for integration with various monitoring systems.

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

### Geo File Viewer

A utility for viewing the contents of geoip and geofile (.dat) files in the v2fly format.

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://jomertix.github.io/geofileviewer" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/geofileviewer.webp" alt="GeoFileViewer" width="600" />
</div>

---

### Remnawave Management Scripts by DigneZzZ

Comprehensive bash scripts for **Remnawave Panel**, **Remnawave Node**, and **Reality Selfsteal** with full automation support. Features Docker integration, intelligent backup/restore system with version checking, advanced monitoring, and complete lifecycle management.

📦 **Key Features:**
- 🚀 **One-line installation** for Panel, Node, and Selfsteal configurations
- 🎛️ **Interactive menus** with real-time status monitoring and guided operations
- 💾 **Smart backup system** with version compatibility checking and safety rollbacks
- 🔄 **Complete lifecycle management** - install, update, backup, restore, uninstall
- 🎯 **Reality masking** with 11 AI-generated website templates

📦 Full info, updates, and examples: [**/remnawave-scripts**](https://github.com/DigneZzZ/remnawave-scripts)

Author: [DigneZzZ](https://github.com/DigneZzZ)

Project: [GIG.ovh](https://gig.ovh)

---

<details>
<summary>🚀 Quick Install Commands</summary>

**Remnawave Panel (v3.5.5+):**
```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave.sh) @ install
```

**Remnawave Node (v3.1.2+):**
```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh) @ install
```

**Reality Selfsteal (v2.1.3+):**
```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/selfsteal.sh) @ install
```

**Options:**
- Add `--dev` for development version
- Add `--name customname` for custom directory (default: `/opt/remnawave`, `/opt/remnanode`)

**For existing installations:**
Use `install-script` to add CLI wrapper only:
```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnawave.sh) @ install-script
```
```bash
bash <(curl -Ls https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh) @ install-script
```
</details>

<details>
<summary>⚙️ Available CLI Commands</summary>

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

</details>

<details>
<summary>💾 Intelligent Backup & Restore System</summary>

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

</details>

<br />
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-script.webp" alt="Remnawave Management Scripts" width="600" />
</div>


---

### Remnawave Reverse Proxy from eGames

Server Setup Using NGINX Reverse Proxy. This script is designed to streamline the setup of a reverse proxy server using NGINX and Xray, as well as to automate the installation of the Remnawave control panel and node. In this configuration, Xray operates directly on port 443, forwarding traffic through a socket that NGINX listens to.

Author: [eGamesAPI](https://github.com/eGamesAPI)

#### Installation Guidelines

Please read the [Installation Guidelines](https://github.com/eGamesAPI/remnawave-reverse-proxy/blob/main/README.md) or the [wiki](https://wiki.egam.es) before proceeding with the installation.

#### Installation

```bash
bash <(curl -Ls https://raw.githubusercontent.com/eGamesAPI/remnawave-reverse-proxy/refs/heads/main/install_remnawave.sh)
```

Features:

- Support for automatic configuration updates via subscription
- NGINX reverse proxy setup in combination with Xray
- Cloudflare SSL certificates with automatic renewal
- UFW setup for access management
- BBR optimization for TCP connections

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <Button label="Github repository" link="https://github.com/eGamesAPI/remnawave-reverse-proxy" variant="secondary" size="md" outline />
  <Button label="Documentation" link="https://wiki.egam.es" variant="secondary" size="md" outline />
  <Button label="Telegram Chat" link="https://t.me/+G8GtPf9dW9FlMWVi" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-reverse-proxy.webp" alt="REMNAWAVE-REVERSE-PROXY" width="600" />
</div>

---

### Remnawave Telegram Subscription Mini App

This is a Telegram Subscription Mini App that allows users to view their subscriptions directly through Telegram. As a requirement for using the page, the Telegram ID must be set in the user's profile to ensure proper identification and linking of subscriptions.

Features:

- View your subscriptions in the mini app
- Multi-language support (English, Russian)

Author: [maposia](https://github.com/maposia)

<details>
<summary>Installation instructions</summary>
#### Environment Variables

The application requires the following environment variables to be set:

| Variable          | Description                                                                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REMNAWAVE_PANEL_URL`   | Remnawave Panel URL, can be `http://remnawave:3000` or `https://panel.example.com`                                                                                                                                                                                        |
| `REMNAWAVE_TOKEN` | Authentication token for Remnawave API                                                                                                                                                                                                                                 |
| `BUY_LINK`        | The URL for purchase actions                                                                                                                                                                                                                                           |
| `CRYPTO_LINK`     | Allows using encrypted links (currently supported Happ application)                                                                                                                                                                                                    |
| `REDIRECT_LINK`     | Allows you to specify a **custom redirect page URL** for deep links. Useful for handling protocols like `v2box://` in Telegram Desktop (Windows). For more details and examples, see [Telegram Deep Link Redirect](https://github.com/maposia/redirect-page/tree/main) |
| `AUTH_API_KEY`        | If you use "Caddy with security" or TinyAuth for Nginx addon, you can place here X-Api-Key, which will be applied to requests to Remnawave Panel.                                                                                                                      |
#### Install and Run

1. Create a new directory for the mini app

```bash
mkdir /opt/remnawave-telegram-sub-mini-app && cd /opt/remnawave-telegram-sub-mini-app
```

2. Download the sample environment variables.

```bash
curl -o .env https://raw.githubusercontent.com/maposia/remnawave-telegram-mini-bot/refs/heads/main/.env.example
```

3. Configure the environment variables.

```bash
nano .env
```

4. Create docker-compose.yml file

```bash
nano docker-compose.yml
```

Example below:

```yaml
services:
remnawave-mini-app:
    image: ghcr.io/maposia/remnawave-telegram-sub-mini-app:latest
    container_name: remnawave-telegram-mini-app
    hostname: remnawave-telegram-mini-app
    env_file:
        - .env
    restart: always
    # volumes:
    #   - ./app-config.json:/app/public/assets/app-config.json
    ports:
        - '127.0.0.1:3020:3020'
#      networks:
#         - remnawave-network

#networks:
#   remnawave-network:
#     name: remnawave-network
#      driver: bridge
#      external: true
```

Uncomment if you want to use your own template downloaded from the Remnawave panel.  
P.S. File must be placed in the same directory as this `docker-compose.yml` file

```yaml
volumes:
    - ./app-config.json:/app/public/assets/app-config.json
```

Uncomment if you want to use local connection via single network in docker

```yaml
     networks:
        - remnawave-network

networks:
   remnawave-network:
     name: remnawave-network
      driver: bridge
      external: true
```

1. Run containers.

```bash
docker compose up -d && docker compose logs -f
```

2. Mini app is now running on http://127.0.0.1:3020  
   Now we are ready to move on to Reverse Proxy installation.

</details>

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/maposia/remnawave-telegram-sub-mini-app" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-telegram-sub-mini-app.webp" alt="Remnawave Telegram Subscription Mini App" width="600" />
</div>
---

### Ansible playbook for Install Remnawave

This project helps install Remnawave via Ansible.

Author: [iphizic](https://github.com/iphizic)

<details>
<summary>Installation instructions</summary>

#### Clone repo and change dir

```bash
git clone https://github.com/iphizic/remna-playbook.git
cd remna-playbook
```

#### Now make Python .env:

```bash
python3 -m venv .env
```

#### Activate .env:

```bash
source .env/bin/activate
```

#### Install Ansible and requirements:

```bash
pip install -r requirements.txt
ansible-galaxy install -r requirements.yml
```

#### Make inventory and other vars

Make inventory like inventory.yml.example in inventory dir
In directory group_vars make all.yml like all.yml.example

#### `Optional` Make some user but not root

:::warning
To run this playbook, the GitHub username must match the username in all.yml
:::

```bash
ansible-playbook prepare-playbook.yml -u root -k
```

First question it is root password
Second question it is password for the created user

#### Run install Remnaware:

```bash
ansible-playbook playbook.yml -K
```

</details>

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/iphizic/remna-playbook" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/ansible.webp" alt="Ansible playbook for installation" width="600" />
</div>

---

### Remnawave Telegram Shop Bot

A Telegram bot for selling subscriptions with integration to Remnawave. This service allows users to purchase and manage subscriptions through Telegram with multiple payment system options. YooKass | Telegram Stars | CryptoBot

Author: [jolymmiles](https://github.com/Jolymmiles)

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <Button label="Github repository" link="https://github.com/Jolymmiels/remnawave-telegram-shop" variant="secondary" size="md" outline />
  <Button label="Documentation" link="https://github.com/Jolymmiels/remnawave-telegram-shop/wiki" variant="secondary" size="md" outline />
  <Button label="Telegram Chat" link="https://t.me/remnawavetelegramshop" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-telegram-shop-bot.webp" alt="Remnawave Telegram Shop Bot" width="600" />
</div>

---

### RemnaSetup 🛠️

Universal script for automatic installation, configuration, and updating of Remnawave and Remnanode infrastructure. Includes installation of the control panel, node, subscription page, Caddy setup, Tblocker, BBR, WARP, and an automatic backup system with Telegram integration.

Author: [Capybara-z](https://github.com/Capybara-z)

<details>
<summary>Quick Start</summary>

**Option 1:**

```bash
bash <(curl -fsSL raw.githubusercontent.com/Capybara-z/RemnaSetup/refs/heads/main/install.sh)
```

**Option 2:**

```bash
curl -fsSL https://raw.githubusercontent.com/Capybara-z/RemnaSetup/refs/heads/main/install.sh -o install.sh && chmod +x install.sh && sudo bash ./install.sh
```

</details>

**🔥 Main Features:**

- 📦 Complete Remnawave installation + Subscription page + Caddy
- 🌐 Remnanode installation with Caddy, Tblocker, BBR, and WARP
- 💾 Backup system with Telegram integration
- ♻️ Recovery from local backups and Telegram
- 🔄 Automatic component updates

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/Capybara-z/RemnaSetup" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnasetup.webp" alt="RemnaSetup" width="600" />
</div>

---

### Remnawave Backup & Restore by distillium

The script automates backups and performs a restore of the Remnawave database.

**Author:** [distillium](https://github.com/distillium)

<details>
<summary>Instruction</summary>

#### Installation

```bash
curl -o ~/backup-restore.sh https://raw.githubusercontent.com/distillium/remnawave-backup-restore/main/backup-restore.sh && chmod +x ~/backup-restore.sh && ~/backup-restore.sh
```

:::danger
As a precaution, use the restore function on the same panel version from which the backup was made (or create the backup from the latest panel version).
:::

:::warning
This script is designed to perform meaningful maintenance operations on the Remnawave database. Although it has been thoroughly tested, its functions affect the entire database and its components. It is recommended that you carefully follow the script’s instructions before executing any commands.
:::

:::tip
The script backups and restores only the entire database, as well as the .env and .env-node files (if they exist in the /opt/remnawave/ or /root/remnawave/ directory). The backup and recovery of all other files and configurations are entirely the responsibility of the user.
:::

</details>

**Features:**

- creating a manual backup and configuring automatic scheduled backups
- notifications in Telegram with backup file attached
- supports sending backup to Google Drive
- restore from backup
- backups retention policy (7 days) implemented
- quick access from anywhere on the system with the `rw-backup` command

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/distillium/remnawave-backup-restore" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-backup-restore.webp" alt="REMNAWAVE-BACKUP-RESTORE" width="600" />
</div>

---

### WARP Native Installer

This script installs Cloudflare WARP in “native” mode via `WireGuard`, without using `warp-cli`.

**Script Author:** [distillium](https://github.com/distillium) <br />
**Ansible Role Author:** [TheMelbine](https://github.com/TheMelbine)

It automates:
- Installing the necessary packages (`wireguard`, `resolvconf`)
- Downloading and configuring `wgcf`
- Generating and modifying the WireGuard configuration
- Connecting and checking status
- Enabling autorun of the `warp` interface

**Installing:** <br />
**Option 1: Shell Script (performed on each desired node):**
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/distillium/warp-native/main/install.sh)
```

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Shell Script Github Repository" link="https://github.com/distillium/warp-native" variant="secondary" size="md" outline />
</div>
<br />

**Option 2: Ansible Role (Recommended for automation)**
```bash
ansible-galaxy install themelbine.warp_native
```

<details>
  <summary>📝 Show example playbook</summary>
  
```yaml
- hosts: warp_servers
  become: yes
  roles:
    - themelbine.warp_native
  vars:
    warp_native_state: present
    warp_native_modify_resolv: true
```
</details>

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Ansible Role Github Repository" link="https://github.com/TheMelbine/ansible-role-warp-native" variant="secondary" size="md" outline />
</div>
<br /><br />

**Templates for Xray configuration**
<details>
 <summary>📝 Show example outbound</summary>

 ```json
{
  "tag": "warp-out",
  "protocol": "freedom",
  "settings": {},
  "streamSettings": {
    "sockopt": {
      "interface": "warp",
      "tcpFastOpen": true
    }
  }
}
```
</details>

<details>
  <summary>📝 Show example routing rule</summary>

```json
{
  "type": "field",
  "domain": [
    "netflix.com",
    "youtube.com",
    "twitter.com"
  ],
  "inboundTag": [
    "Node-1",
    "Node-2"
  ],
  "outboundTag": "warp-out"
}
```
</details>
<br />

**Interface management**
<details>
  <summary>⚙️ Commands</summary>

| Operation              | Command                               |
|------------------------|----------------------------------------|
| Check service status   | `systemctl status wg-quick@warp`       |
| View interface status  | `wg show warp`                         |
| Stop the interface     | `systemctl stop wg-quick@warp`         |
| Start the interface    | `systemctl start wg-quick@warp`        |
| Restart the interface  | `systemctl restart wg-quick@warp`      |
| Disable autorun        | `systemctl disable wg-quick@warp`      |
| Enable autorun         | `systemctl enable wg-quick@warp`       |
</details>
<br />

**Uninstall:** <br />
**Shell Script Method:**
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/distillium/warp-native/main/uninstall.sh)
```
**Ansible Role Method:**
<details>
  <summary>📝 Show</summary>
```yaml
- hosts: warp_servers
  become: yes
  roles:
    - themelbine.warp_native
  vars:
    warp_native_state: absent
```
</details>

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/warp-native.webp" alt="warp-native" width="600" />
</div>

---

### Remnawave TG Shop

A Telegram bot for selling and managing Remnawave subscriptions. It supports user registration, trial periods, promo codes, referral programs, subscription management. Payments are accepted through YooKassa | CryptoPay | Telegram Stars | Tribute. Admins get access to a secure panel with statistics, user management, promo code creation, broadcast messaging and other functions

Author: [machka pasla](https://github.com/machka-pasla)

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <Button label="Github repository" link="https://github.com/machka-pasla/remnawave-tg-shop" variant="secondary" size="md" outline />
  <Button label="Telegram Chat" link="https://t.me/remnawave_tg_shop" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-tg-shop.webp" alt="Remnawave TG Shop" width="600" />
</div>

---

## Add project to the list

If you want to add your project to the list, please open a PR on [GitHub](https://github.com/remnawave/panel/blob/main/docs/awesome-remnawave.md).

Make sure that the target branch is `main`.

Also, the following requirements must be met:

- [x] Project must be open source.
- [x] Project must be related to Remnawave or **useful for Remnawave users**.

The following format must be used:

```md
### Project name

Short project description.

[Project link or repository link](https://project.com)

![Project image](/awesome/project-name.webp)
```

Use the examples above to add your project to the list.

:::info

Please, use [https://squoosh.app/](https://squoosh.app/) to compress the image. Format must be `webp`.  
Add the image to the `static/awesome` directory.

:::
