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

### Remnawave Reverse Proxy from eGames

Server Using NGINX Reverse Proxy. This script is designed to streamline the setup of a reverse proxy server using NGINX and Xray, as well as to automate the installation of the Remnawave control panel and node. In this configuration, Xray operates directly on port 443, forwarding traffic through a socket that NGINX listens to.

Author: [eGamesAPI](https://github.com/eGamesAPI)

#### Installation Guidelines

Please read the [Installation Guidelines](https://github.com/eGamesAPI/remnawave-reverse-proxy/blob/main/README.md) before proceeding with the installation.

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

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/eGamesAPI/remnawave-reverse-proxy" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-reverse-proxy.webp" alt="REMNAWAVE-REVERSE-PROXY" width="600" />
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

### Remnawave Restore Script (Beta)

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

### Remnawave Telegram Subscription Mini App

This is a Telegram Subscription Mini App that allows users to view their subscriptions directly through Telegram. As a requirement for using the page, the Telegram ID must be set in the user's profile to ensure proper identification and linking of subscriptions.

Features:

- View your subscriptions in the mini app
- Multi-language support (English, Russian)

Author: [maposia](https://github.com/maposia)

### Environment Variables

The application requires the following environment variables to be set:

| Variable          | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `REMNAWAVE_URL`   | Remnawave API PLAIN DOMAIN(panel.domain.com)                                                                  |
| `REMNAWAVE_MODE`  | Remnawave mode (remote/local), default is remote. If local set – you can pass remnawave:3000 to REMNAWAVE_URL |
| `REMNAWAVE_TOKEN` | Authentication token for Remnawave API                                                                        |
| `BUY_LINK`        | The URL for purchase actions                                                                                  |
| `CRYPTO_LINK`     | Allows using encrypted links (currently supported Happ application)                                           |
| `REDIRECT_LINK`     | Allows you to specify a **custom redirect page URL** for deep links. Useful for handling protocols like `v2box://` in Telegram Desktop (Windows). For more details and examples, see [Telegram Deep Link Redirect](https://github.com/maposia/redirect-page/tree/main)                                         |

#### Install and Run

1. Create new directory for mini app

```bash
mkdir /opt/remnawave-telegram-sub-mini-app && cd /opt/remnawave-telegram-sub-mini-app
```

2. Download and configure the environment variables.

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

Example below.

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
P.S. file must be placed in the same directory with this `docker-compose.yml` file

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
   Now we are ready to move on the Reverse Proxy installation.

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/maposia/remnawave-telegram-sub-mini-app" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/remnawave-telegram-sub-mini-app.webp" alt="Remnawave Telegram Subscription Mini App" width="600" />
</div>
---

### Ansible playbook for install Remnawave

This project for install remnaware via ansible.

Author: [iphizic](https://github.com/iphizic)

#### Clone repo and change dir
  ```bash
    git clone https://github.com/iphizic/remna-playbook.git
    cd remna-playbook
  ```

#### Now make Python .env:
  ```bash
    pythhon3 -m venv .env
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

#### `Optional` Make somw user but not root
   `!!!ATTENTION for start this playbook we need username like in Github 
and all.yml`
   ```bash
     ansible-playbook prepare-playbook.yml -u root -k
   ```
   First question its root password
   Second question its password for create user
   
#### Run install remnaware:
  ```bash
     ansible-playbook playbook.yml -K
   ```

<div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
  <Button label="Github repository" link="https://github.com/iphizic/remna-playbook" variant="secondary" size="md" outline />
</div>
<br />

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/awesome/ansible.webp" alt="Ansible playbook for installation" width="600" />
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
