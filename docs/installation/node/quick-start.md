---
sidebar_position: 1
slug: /installation/node/quick-start
title: Quick start
---

## Installation

Remnanode consists of only one part:

- Node (with Xray Core inside)

Minimum requirements for Node:

- 1GB of RAM
- 1 CPU core
- Docker Engine

## Configuration

First of all, you need to configure the environment variables.

You can find the list of all environment variables in the [Environment Variables](/installation/node/env) page.

## Installation

:::info
This guide was written for Debian 12, instructions may vary for other distributions.
:::

1. To use Remnanode you will need to install docker, if not already.

```bash
sudo curl -fsSL https://get.docker.com | sh
```

2. Create a directory for the project files.

```bash
mkdir -p /opt/remnanode && cd /opt/remnanode
```

3. Create and edit the `.env` file.

```bash
nano .env
```

4. Add the following content to the .env file:

:::info
SSL_CERT can be found in the main panel under the Nodes tab, Management page, after clicking the Create new node button.
APP_PORT can be customized, make sure it's not being used by other services.
:::

```bash title=".env"
APP_PORT=2222

SSL_CERT=CERT_FROM_MAIN_PANEL
```

:::warning
Do not use port 61001 as APP_PORT - it is a service port!
Make sure APP_PORT is only accessible from your panel IP!
:::

5. Create a `docker-compose.yml` file, example below:

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

6. Run the container.

```bash
docker compose up -d
```

7. Check the logs.

```bash
docker compose logs -f
```

8. Remnanode is now running.

Now we are ready to create a new node in the main panel.

## Advanced usage

### GeoSite files

You can mount additional geosite files into the `/usr/local/share/xray/` directory in the container.

:::caution  
Do not mount the entire folder. Otherwise, you will overwrite the default Xray geosite files. Mount each file individually.
:::

Add the following to the `docker-compose.yml` file:

```yaml
services:
    remnanode:
        container_name: remnanode
        hostname: remnanode
        image: remnawave/node:latest
        restart: always
        network_mode: host
        env_file:
            - .env
        // highlight-next-line-green
        volumes:
            // highlight-next-line-green
            - './zapret.dat:/usr/local/share/xray/zapret.dat'
```

Usage in xray config:

```json
  "routing": {
    "rules": [
       // Other rules
      {
        "type": "field",
        "domain": [
          "ext:zapret.dat:zapret"
        ],
        "inboundTag": [ // Optional
          "VLESS_TCP_REALITY"
        ],
        "outboundTag": "NOT_RU_OUTBOUND"
      }
      // Other rules
    ]
  }
```
