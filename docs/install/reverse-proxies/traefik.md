---
sidebar_position: 3
title: Traefik
description: Battle-tested reverse proxy
---

import PointDomainToIp from '/docs/partials/\_point_domain_to_ip.md';
import OpenLoginPage from '/docs/partials/\_open_login_page.md';

## Overview

In this guide we will be using Traefik as a reverse proxy to access the Remnawave panel. We will point a domain name to our server and configure Traefik. Traefik will handle the issuance of SSL certificates by itself.

<PointDomainToIp />

## Traefik configuration

### Create docker-compose.yml

Create a `docker-compose.yml` file in the `/opt/remnawave/traefik` directory.

```bash
mkdir -p /opt/remnawave/traefik && cd /opt/remnawave/traefik && nano docker-compose.yml
```

Paste the following configuration.

```yaml title="docker-compose.yml"
services:
    traefik:
        image: traefik:latest
        container_name: traefik
        restart: unless-stopped
        security_opt:
            - no-new-privileges:true
        networks:
            - remnawave-network
        ports:
            - '0.0.0.0:80:80'
            - '0.0.0.0:443:443'
        environment:
            - TZ=UTC
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock:ro
            - ./traefik.yml:/traefik.yml:ro
            - ./letsencrypt:/letsencrypt
            - ./config:/config:ro
            - ./logs:/var/log/traefik
networks:
    remnawave-network:
        name: remnawave-network
        driver: bridge
        external: false
```

### Create static configuration file

Creating a static configuration file called `traefik.yml` in the `/opt/remnawave/traefik` directory.

```bash
cd /opt/remnawave/traefik && nano traefik.yml
```

Paste the following configuration.

:::warning

Please replace `REPLACE_WITH_YOUR_EMAIL` with your email.

Review the configuration below, look for yellow highlighted lines.

:::

```yaml title="traefik.yml"
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
serversTransport:
  insecureSkipVerify: true
providers:
  file:
    directory: /config
    watch: true
certificatesResolvers:
  letsencrypt:
    acme:
      // highlight-next-line-yellow
      email: REPLACE_WITH_YOUR_EMAIL
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: http

log:
  level: "INFO"
  filePath: "/var/log/traefik/traefik.log"
accessLog:
  filePath: "/var/log/traefik/access.log"
```

### Create dynamic configuration file

Create a file called `remnawave.yml` in the `/opt/remnawave/traefik/config` directory.

```bash
mkdir -p /opt/remnawave/traefik/config && cd /opt/remnawave/traefik/config && nano remnawave.yml
```

Paste the following configuration.

:::warning

Please replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review the configuration below, look for yellow highlighted lines.

:::

```yaml title="remnawave.yml"
http:
  routers:
    remnawave:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - http
      middlewares:
        - remnawave-https-redirect
      service: remnawave

    remnawave-secure:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - https
      middlewares:
      tls:
        certResolver: letsencrypt
      service: remnawave

  middlewares:
    remnawave-https-redirect:
      redirectScheme:
        scheme: https

  services:
    remnawave:
      loadBalancer:
        servers:
          - url: "http://remnawave:3000"
```

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

### Restricting access to the panel by IP

If you want to restrict access to the panel by IP, you can create a middleware file named `ip_allow_list.yml`

```bash
cd /opt/remnawave/traefik/config && nano ip_allow_list.yml
```

Paste the following configuration.

:::warning

Please replace `REPLACE_WITH_YOUR_IP` with your allowed IP address (or ranges of allowed IPs by using CIDR notation).

Review the configuration below, look for yellow highlighted lines.

:::

:::info

If your domain name is proxied by Cloudflare, then you need to specify the IP ranges belonging to Cloudflare in the `excludedIPs` list.

Cloudflare regularly updates its IP ranges so it's a good practice to use the [official Cloudflare page](https://www.cloudflare.com/ips/) to make sure that you have an up-to-date list.

:::

```yaml title="ip_allow_list.yml"
http:
    middlewares:
        ip-allow-list:
            ipAllowList:
                sourceRange:
                // highlight-next-line-yellow
                    - "REPLACE_WITH_YOUR_IP"
                ipStrategy:
                    excludedIPs:
                        - 73.245.48.0/20
                        - 103.21.244.0/22
                        - 103.22.200.0/22
                        - 103.31.4.0/22
                        - 141.101.64.0/18
                        - 108.162.192.0/18
                        - 190.93.240.0/20
                        - 188.114.96.0/20
                        - 197.234.240.0/22
                        - 198.41.128.0/17
                        - 162.158.0.0/15
                        - 104.16.0.0/13
                        - 104.24.0.0/14
                        - 172.64.0.0/13
                        - 131.0.72.0/22
```

Then you need to add the middleware `ip-allow-list` to the `remnawave.yml` configuration file.

```bash
nano remnawave.yml
```

Pay attention to the green line which is the one you need to add.

```yaml title="remnawave.yml"
http:
    routers:
        remnawave:
            rule: 'Host(`REPLACE_WITH_YOUR_DOMAIN`)'
            entrypoints:
                - http
            middlewares:
                - remnawave-https-redirect
            service: remnawave

        remnawave-secure:
            rule: 'Host(`REPLACE_WITH_YOUR_DOMAIN`)'
            entrypoints:
                - https
            middlewares:
            // highlight-next-line-green
                - ip-allow-list
            tls:
                certResolver: letsencrypt
            service: remnawave

    middlewares:
        remnawave-https-redirect:
            redirectScheme:
                scheme: https

    services:
        remnawave:
            loadBalancer:
                servers:
                    - url: 'http://remnawave:3000'
```

### Allowing public access to the subscription path

For the subscription system to work correctly, the `/api/sub/` path must be publicly accessible.  
At the same time, the rest of the panel should remain protected by IP-based restrictions.

To achieve this, you need to define two separate routers for the same domain — one for `/api/sub/` (open access), and one for everything else (restricted).

Open the file `remnawave.yml` again:

```bash
nano /opt/remnawave/traefik/config/remnawave.yml
```

And update the router configuration as follows:

```yaml title="remnawave.yml"
http:
  routers:
    remnawave-sub:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`) && PathPrefix(`/api/sub/`)"
      entrypoints:
        - https
      service: remnawave
      tls:
        certResolver: letsencrypt

    remnawave-secure:
      // highlight-next-line-yellow
      rule: "Host(`REPLACE_WITH_YOUR_DOMAIN`)"
      entrypoints:
        - https
      middlewares:
        // highlight-next-line-green
        - ip-allow-list
      service: remnawave
      tls:
        certResolver: letsencrypt

  middlewares:
    remnawave-https-redirect:
      redirectScheme:
        scheme: https

  services:
    remnawave:
      loadBalancer:
        servers:
          - url: "http://remnawave:3000"
```

This configuration makes the `/api/sub/` path publicly accessible, while the rest of the panel remains IP-restricted.

<OpenLoginPage />
