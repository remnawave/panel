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
mkdir remnanode && cd remnanode
```

2. Create and configure the environment variables.

```bash
nano .env
```
3. Add the following content to the .env file:

:::info
APP_PORT and SSL_CERT can be found in the main panel under the Nodes tab, after clicking the Create node button.
:::

```bash title=".env"
APP_PORT=2222

SSL_CERT="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyAcjyADzLmB21Hz6NnnJ
L8Zoeo0iiPHS/rL/2xI/laBR2aEC58ippctZGU9akcD+hAPS9KsuRBDsSSnVpd1A
f+WiCCKouQCc7C9vbtJx4q6Dh7XThomBHLF5Xnlsa3z+ZES3uMHsSZy5IHdBdJ26
3CCT/Po+GVlc1fCMPHZh9sgZPPNXu22puqVFI1XIG795zzrclTsWsJiIN8VjC7bO
HisC7aBqHIByld6dE7TVDTrtlMJFwZXx1J5+AM19pwcsGuuakYRdgbavt/P30wEN
6+TjSSfV/x4Lm5Tdpqc2DHAgsaEEbxoTtcMG7WCqySLYiJZyEHe0P2k0pLTJjBcz
XQIDAQAB
-----END PUBLIC KEY-----"
```

:::caution  
Ensure that APP_PORT is only accessible from your panel IP!
:::


4. Create `docker-compose.yml` file, example below.

```yaml title="docker-compose.yml"
services:
  remnanode:
    container_name: remnanode
    hostname: remnanode
    image: remnawave/node:latest
    env_file:
      - .env
    network_mode: host
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