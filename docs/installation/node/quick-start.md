---
sidebar_position: 1
slug: /installation/node/quick-start
title: Quick start
---

## Installation

Remnanode consists of one part:

- Node (with XRay Core inside)

Minimum requirements for Node:

- 1GB of RAM
- 1 CPU core
- Docker Engine

## Configuration

First of all, you need to configure the environment variables.

You can find the list of all environment variables in the [Environment Variables](/installation/node/env) page.

## Installation

:::info
This guide is written for Debian 12, instructions may vary for other distributions.
:::

1. Create separate directory for the project.

```bash
mkdir -p ~/remnanode && cd ~/remnanode
```

2. Create and configure the environment variables.

```bash
nano .env
```

3. Add the following content to the .env file:

:::info
SSL_CERT can be found in the main panel under the Nodes tab, after clicking the Create node button.
APP_PORT can be customized, make sure it's not used by other services.
:::

```bash title=".env"
APP_PORT=2222

SSL_CERT=CERT_FROM_MAIN_PANEL
```

:::caution  
Ensure that APP_PORT is only accessible from your panel IP!
:::

1. Create `docker-compose.yml` file, example below.

```yaml title="docker-compose.yml"
services:
    remnanode:
        container_name: remnanode
        hostname: remnanode
        image: remnawave/node:latest
        restart: always
        network_mode: host
        env_file:
            - .env
```

5. Run containers.

```bash
docker compose up -d
```

6. Check the logs.

```bash
docker compose logs -f
```

7. Remnanode is now running.

Now we are ready to create a Node in the main panel.
