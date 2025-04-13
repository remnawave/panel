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

### REMNAWAVE-REVERSE-PROXY

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
