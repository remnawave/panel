---
sidebar_position: 1
---

# Requirements

This page lists the hardware and software requirements for running Remnawave.

**Remnawave Panel** is the main component of Remnawave. It is used to manage users, nodes, and other elements.
**Remnawave Node** is a lightweight container that includes Xray-core.

## Remnawave Panel

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 2 GB, recommended 4 GB.
- **CPU**: Minimum 2 cores, recommended 4 cores.
- **Storage**: 20 GB, minimum and recommended.

:::tip
Remnawave can run with lower specifications, but this is not recommended. Some background processes can be resource-intensive.
:::

## Remnawave Node

### Hardware

- **OS**: Recommended **Ubuntu** or **Debian**.
- **RAM**: Minimum 1 GB.
- **CPU**: Minimum 1 core.

:::tip
Remnawave Node itself does not require many resources; however, Xray-core can consume significant CPU and RAM under heavy load.
:::

## Software

Remnawave Panel and Remnawave Node require [**Docker**](https://docs.docker.com/get-started/get-docker/) with the **Docker Compose plugin**.

<details>
<summary>Install Docker using official script</summary>

```bash
sudo curl -fsSL https://get.docker.com | sh
```

</details>
