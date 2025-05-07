---
sidebar_position: 1
---

# Requirements

**Remnawave Panel** is the main component of Remnawave. It will be used to manage your users, nodes and all the other stuff.  
**Remnawave Node** is a lightweight container with included Xray-core.

## Remnawave Panel

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 2GB, recommended 4GB.
- **CPU**: Minimum 2 cores, recommended 4 cores.
- **Storage**: Minimum and recommended 20GB.

:::tip
Remnawave can run with lower specs, but it's not recommended. Some of background processes can be resource-intensive.
:::

## Remnawave Node

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 1GB.
- **CPU**: Minimum 1 core.

:::tip
Remnawave Node by itself does not require much resources, but Xray-core can consume a lot of CPU and RAM under heavy load.
:::

## Software

Remnawave Panel and Remnawave Node requires [**Docker**](https://docs.docker.com/get-started/get-docker/) with the **Docker Compose plugin**.

<details>
<summary>Quick install</summary>

```bash
sudo curl -fsSL https://get.docker.com | sh
```

</details>
