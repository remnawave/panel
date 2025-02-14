---
sidebar_position: 4
slug: /installation/rp/try-cloudflare
title: Try Cloudflare
---

## Overview

In this guide we will use trial version of Cloudflare Tunnel to expose Remnawave to the public internet.

## Prerequisites

- Completed [Quick Start](/installation/quick-start)
- Completed [Env Variables](/installation/env)

:::warning

There is no need to have a registered domain name to continue.

But be careful, TryCloudflare (also known as Quick Tunnels) is a trial version of Cloudflare Tunnel, it has a limit of 200 in-flight connections.

:::

Learn more about Quick Tunnels [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/).

:::danger

Do not use TryCloudflare in production, it is only for development and testing purposes!

:::

## Setup

Firstly lets create a folder for our docker-compose.yml file.

```bash
mkdir -p ~/remnawave/try-cloudflare && cd ~/remnawave/try-cloudflare
```

Create a file `docker-compose.yml` and paste the following configuration.

```bash
nano docker-compose.yml
```

```yaml title="docker-compose.yml"
  remnawave-try-cloudflare:
    container_name: remnawave-try-cloudflare
    hostname: remnawave-try-cloudflare
    image: cloudflare/cloudflared:latest
    networks:
      - remnawave-network
    restart: always
    command: tunnel --no-autoupdate --url http://remnawave:3000 remnawave-cf

    networks:
        remnawave-network:
        name: remnawave-network
        driver: bridge
        external: true
```

### Start the container

```bash
docker compose up -d && docker compose logs -f
```

Check out the logs, and find the following lines:

```

INF +--------------------------------------------------------------------------------------------+
INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
INF |  https://usually-43434-wow-poor.trycloudflare.com                                |
INF +--------------------------------------------------------------------------------------------+
```

Open the following URL in the browser to access Remnawave.

:::danger

Do not use TryCloudflare in production, it is only for development and testing purposes!

TryCloudflare has a few limitations.

If you need similar setup for production, please use Cloudflare Tunnel or Nginx/Caddy/etc.

:::

## Troubleshooting

<Button label="Ask community" link="https://t.me/+YxzE4bOmEog2Zjhi" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />
