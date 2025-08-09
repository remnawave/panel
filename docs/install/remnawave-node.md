---
sidebar_position: 4
title: Remnawave Node
---

import InstallDocker from '/docs/partials/\_install_docker.md';

# Remnawave Node

Remnawave Node is a lightweight container with included Xray-core.

:::note

Remnawave Panel is not contains Xray-core inside, so you need to install Remnawave Node on a separate server in order to fully use Remnawave.
:::

<InstallDocker />

## Step 1 - Creating project directory

```bash title="Creating project directory"
mkdir /opt/remnanode && cd /opt/remnanode
```

## Step 2 - Configure the .env file

```bash title="Creating .env file"
nano .env
```

:::tip
`SSL_CERT` can be found in the main panel under the Nodes tab, Management page, after clicking the **Create new node** button. `APP_PORT` can be customized, make sure it's not being used by other services.
:::

```bash title=".env file content"
APP_PORT=2222

SSL_CERT=CERT_FROM_MAIN_PANEL
```

:::caution
The line copied from the panel already contains `SSL_CERT=` — just paste it directly from the clipboard.
:::

## Step 3 - Create docker-compose.yml file

```bash title="Creating docker-compose.yml file"
nano docker-compose.yml
```

Paste the following content into the file:

```yaml title="docker-compose.yml file content"
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

## Step 4 - Start the containers

Start the containers by running the following command:

```bash title="Start the containers"
docker compose up -d && docker compose logs -f -t
```

## Advanced usage

### Loading modified geosite and geoip files

:::danger Important note

1. This guide contains only an example and does not reflect the real names of the `*-zapret.dat` files and the `:zapret` categories used in them. In reality, these things will be different.
2. Setting up routing on the server (node) will not allow you to send connections to DIRECT on clients. This is server routing, necessary for blocking or setting routes between servers. To manage client traffic, client routing is used.

:::

You can mount additional geosite and geoip files into the `/usr/local/share/xray/` directory in the container.

:::caution
Do not mount the entire folder. Otherwise, you will overwrite the default Xray geosite and geoip files. Mount each file individually.
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
            - './geo-zapret.dat:/usr/local/share/xray/geo-zapret.dat'
            // highlight-next-line-green
            - './ip-zapret.dat:/usr/local/share/xray/ip-zapret.dat'
```

Usage in xray config:

```json
  "routing": {
    "rules": [
       // Other rules
      {
        "type": "field",
        "domain": [ // Calling the geosite file
          "ext:geo-zapret.dat:zapret"
        ],
        "ip": [ // Calling the geoip file
          "ext:ip-zapret.dat:zapret"
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

### Log from Node

You can access logs from the node by mounting them to your host's file system.

:::caution
You **must** set up log rotation, otherwise the logs will fill up your disk!
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
            - '/var/log/remnanode:/var/log/remnanode'
```

Usage in xray config:

```json
  "log": {
      "error": "/var/log/remnanode/error.log",
      "access": "/var/log/remnanode/access.log",
      "loglevel": "warning"
  }
```

On the server where the node is hosted, create the folder `/var/log/remnanode`:

```bash
mkdir -p /var/log/remnanode
```

Install logrotate (if not already installed):

```bash
sudo apt update && sudo apt install logrotate
```

Create a logrotate configuration file:

```bash
nano /etc/logrotate.d/remnanode
```

Paste the following logrotate configuration for RemnaNode:

```bash
/var/log/remnanode/*.log {
      size 50M
      rotate 5
      compress
      missingok
      notifempty
      copytruncate
  }
```

Run logrotate manually to test:

```bash
logrotate -vf /etc/logrotate.d/remnanode
```

### XRay SSL cert for Node

:::danger
This item is necessary for you in case of implementation of TLS transport, for example "VLESS-Vision-TLS". In case of Reality, you do not need it.
:::

If you’re using certificates for your XRay configuration, you need to mount them into the panel.

:::info
Mount the folder via Docker volumes, and in the config refer to the internal path.
Inside the container there’s a dedicated (empty) folder for certs:
/var/lib/remnawave/configs/xray/ssl/
:::

Add the following to the `docker-compose.yml` file:

```yaml
remnawave:
  image: remnawave/backend:latest
  container_name: 'remnawave'
  hostname: remnawave
  restart: always
  ports:
    - '127.0.0.1:3000:3000'
  env_file:
    - .env
  networks:
    - remnawave-network
  // highlight-next-line-green
  volumes:
      // highlight-next-line-green
      - '/opt/remnawave/nginx:/var/lib/remnawave/configs/xray/ssl'
  depends_on:
    remnawave-db:
      condition: service_healthy
    remnawave-redis:
      condition: service_healthy
```

:::info
When the panel pushes the config to the node, it will automatically read the mounted files and send the certs to the node.
:::

Usage in XRay config:

```json
  "certificates": [
    {
    "keyFile": "/var/lib/remnawave/configs/xray/ssl/privkey.key",
    "certificateFile": "/var/lib/remnawave/configs/xray/ssl/fullchain.pem"
    // Other fields
    }
  ]
```

:::caution
Pay attention to the **.key** and **.pem** extensions.
:::
