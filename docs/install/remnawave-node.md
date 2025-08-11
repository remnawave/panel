---
sidebar_position: 4
title: Remnawave Node
---

import InstallDocker from '/docs/partials/\_install_docker.md';

# Remnawave Node

Remnawave Node is a lightweight container that includes Xray-core.

:::note
Remnawave Panel does not include Xray-core, so you need to install Remnawave Node on a separate server to use all features of Remnawave.
:::

<InstallDocker />

## Step 1 — Create project directory

```bash title="Create project directory"
mkdir /opt/remnanode && cd /opt/remnanode
```

## Step 2 — Configure the .env file

```bash title="Create .env file"
nano .env
```

:::tip
`SSL_CERT` value can be obtained from the Panel under Nodes → Management → Create new node (`+` button). Copy button in `Important note` will add `SSL_CERT=` to your clipboard. 
`APP_PORT` can be customized. Make sure it's not being used by other services.
:::

```bash title=".env file content"
APP_PORT=2222

SSL_CERT=CERT_FROM_MAIN_PANEL
```

:::caution
The line copied from the Panel already contains `SSL_CERT=` — just paste it directly from the clipboard.
:::

## Step 3 — Create docker-compose.yml file

```bash title="Create docker-compose.yml file"
nano docker-compose.yml
```

Paste this content and save:

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

## Step 4 — Start the containers

Start the containers by running the following command:

```bash title="Start the containers"
docker compose up -d && docker compose logs -f -t
```

## Advanced usage

### Loading modified geosite and geoip files

:::danger Important note

1. This example uses placeholder names for the `*-zapret.dat` files and the `:zapret` categories. Actual file names and categories will be different.
2. Routing configured on the server (node) controls server-side traffic and will not affect client DIRECT connections. To manage client traffic routing, configure routing on the client side.
:::

You can add additional geosite and geoip files by mounting them into the `/usr/local/share/xray/` directory inside the container.

:::caution
Do not mount the entire folder, this will overwrite the default Xray geosite and geoip files. Instead, mount each file separately.
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

Usage in Xray config:

```json
  "routing": {
    "rules": [
       // Other rules
      {
        "type": "field",
        "domain": [ // Calling the geosite file
          "ext:geo-zapret.dat:zapret"
        ],
        "inboundTag": [ // Optional
          "VLESS_TCP_REALITY"
        ],
        "outboundTag": "NOT_RU_OUTBOUND"
      },
      {
        "type": "field",
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

### Node Logs

You can access Node logs by mounting them to your host file system.

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

Usage in Xray config:

```json
  "log": {
      "error": "/var/log/remnanode/error.log",
      "access": "/var/log/remnanode/access.log",
      "loglevel": "warning"
  }
```

On the server hosting the node, create the folder `/var/log/remnanode` by running:

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

Run logrotate to test the configuration:

```bash
logrotate -vf /etc/logrotate.d/remnanode
```

### XRay SSL cert for Node

:::danger
This step is necessary if you implement TLS transport, for example, 'VLESS-Vision-TLS'. For Reality transport, this is not required.
:::

If you’re using certificates for your Xray configuration, you need to mount them into the panel.

:::info
Mount the folder using Docker volumes, and refer to the internal path in your configuration.
Inside the container, there is a dedicated (empty) directory for certificates:
`/var/lib/remnawave/configs/xray/ssl/`
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
When the Panel pushes the configuration to the Node, it will automatically read the mounted files and send the certificates to the Node.
:::

Usage in Xray config:

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
