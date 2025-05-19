---
sidebar_position: 4
title: Remnawave Node
---

# Remnawave Node

Remnawave Node is a lightweight container with included Xray-core.

:::note

Remnawave Panel is not contains Xray-core inside, so you need to install Remnawave Node on a separate server in order to fully use Remnawave.
:::

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

## Step 4 - Create docker-compose.yml file

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

## Step 5 - Start the containers

Start the containers by running the following command:

```bash title="Start the containers"
docker compose up -d && docker compose logs -f -t
```

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
            - '/var/lib/remnanode:/var/lib/remnanode'
```

Usage in xray config:

```json
  "log": {
      "error": "/var/lib/remnanode/error.log",
      "access": "/var/lib/remnanode/access.log",
      "loglevel": "warning"
  }
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
/var/lib/remnanode/*.log {
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
