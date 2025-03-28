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

### RemnaNode - console script with installation.

Bash script to fast install Remnawave node

Author: [DigneZzZ](https://github.com/dignezzz)

#### Latest branch Install
```bash
sudo bash -c "$(curl -sL https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh)" @ install

#### Install Only Script in the System
```bash
sudo bash -c "$(curl -sL https://github.com/DigneZzZ/remnawave-scripts/raw/main/remnanode.sh)" @ install-script
```

Working directory: `/opt/remnanode`

App directory for custom `xray`: `/var/lib/remnanode`

Console commands: (`remnanode` + ...)

```bash
  up                  – Start services
  down                – Stop services
  restart             – Restart services
  status              – Show status
  logs                – Show logs
  install             – Install or reinstall Remnanode
  update              – Update to the latest version
  uninstall           – Uninstall Remnanode
  install-script      – Install the Remnanode script
  uninstall-script    – Uninstall the Remnanode script
  edit                – Edit docker-compose.yml (using nano or vi)
  core-update         – Update or change the Xray core
```

<br />

<div style="display: flex; justify-content: center;">
  <img src="https://github.com/user-attachments/assets/1d206538-23b5-49b3-a300-61337c7e2f12" alt="RemnaNode" width="600" />
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
