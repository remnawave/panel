---
sidebar_position: 3
slug: /installation/rp/nginx
title: Nginx
---

## Overview

In this guide we will use Nginx as a reverse proxy for requests to Remnawave.
We will redirect a domain to our server, issue an SSL certificate and configure Nginx.
Complete [Quick Start](/installation/quick-start) and [Env Variables](/installation/env-variables) before continuing.

## Configuration

Requirements:

- Completed [Quick Start](/installation/quick-start)
- Completed [Env Variables](/installation/env-variables)
- Registered domain name (e.g. `my-super-panel.com`)

:::warning

You should have a registered domain name to continue.

:::

## Point domain to your server

Check out your server IP address, it is better to use a static IPv4 address.

Now, you need to point your domain to your server.

For example, it will be `my-super-panel.com` -> `193.122.122.122`.

There are two ways to do this:

1. Use a DNS provider (e.g. Cloudflare, Google Cloud, etc.)
2. Use a registrar (e.g. Namecheap, etc.)

### DNS provider

If you use Cloudflare, you need to add a record to your DNS.

Log in to your Cloudflare account [here](https://dash.cloudflare.com/login).
Select domain, which you want to point to your server.

On the left side of the page, click on `DNS` and then click on `Records`.

Click on `Create record`.

Select `Type` as `A` and `Name` as `@`.

:::info

If you want to use subdomains, you should write subdomain name (e.g. `panel`) in the `Name` field.

:::

In the `IPv4 address` field, you should write your server IP address.

Click on `Save`.

Now, you need to wait for the DNS to be updated.

:::info

There are a big difference between yellow cloud (domain is proxied with Cloudflare) and grey cloud (domain is not proxied with Cloudflare) in the Cloudflare control panel.

We will return later to this topic in this guide, but for now it really depends on you.

If Cloudflare works fine in your region, it is better to proxy the domain with Cloudflare. (Yellow cloud)

:::

![static](/reverse-proxies/nginx/cloudflare-dns.webp)

Some DNS providers have a different interface, but the process is the same.

## Issue an SSL certificate

Now, you need to issue an SSL certificate.

The most easy way is to use [acme.sh](https://acme.sh/).

:::warning

This guide will cover only issuing SSL certificate for the domain of the panel.
:::

### Install dependencies

```bash
sudo apt-get install cron socat
```

### Install acme.sh

:::info

You can use any email address to issue the certificate, but it is recommended to use a valid email address.

:::

Replace `EMAIL` with your email address.

```bash
curl https://get.acme.sh | sh -s email=EMAIL && source ~/.bashrc
```

### Create a folder for the certificates

```bash
mkdir -p ~/remnawave/nginx && cd ~/remnawave/nginx
```

### Issue a certificate

Replace `DOMAIN` with your domain name, which you want to issue a certificate for.

:::warning
Do not use domain zones: .ru, .su, .рф. Currently ZeroSSL does not support these zones.
:::

```bash
acme.sh --issue --standalone -d 'DOMAIN' --key-file ~/remnawave/nginx/privkey.key --fullchain-file ~/remnawave/nginx/fullchain.pem --alpn --tlsport 8443
```

:::info
Make sure that you have a **8443** port open on your server, it is used for the certificate issuance.
:::

![](/reverse-proxies/nginx/issue-cert.webp)

This screenshot shows that the certificate is issued.

Acme.sh will take care of renewing the certificate automatically every 60 days, just make sure that you have a **8443** port open (and not busy) on your server.

## Nginx configuration

### Simple configuration

Create a file `nginx.conf` in the `~/remnawave/nginx` folder.

```bash
cd ~/remnawave/nginx && nano nginx.conf
```

Paste the following configuration.

:::warning

Please, replace `REPLACE_WITH_YOUR_DOMAIN` with your domain name.

Review configuration below, look for red highlighted lines.

:::

```nginx title="nginx.conf"
user                 nginx;
pid                  /var/run/nginx.pid;
worker_processes     auto;
worker_rlimit_nofile 65535;

# Load modules
include              /etc/nginx/modules-enabled/*.conf;

events {
    multi_accept       on;
    worker_connections 65535;
}

http {
    charset                utf-8;
    sendfile               on;
    tcp_nopush             on;
    tcp_nodelay            on;
    server_tokens          off;
    log_not_found          off;
    types_hash_max_size    2048;
    types_hash_bucket_size 64;
    client_max_body_size   16M;

    # MIME
    include                mime.types;
    default_type           application/octet-stream;

    # Logging
    access_log             off;
    error_log              /dev/null;

    # SSL
    ssl_session_timeout    1d;
    ssl_session_cache      shared:SSL:10m;
    ssl_session_tickets    off;

    # Mozilla Intermediate configuration
    ssl_protocols          TLSv1.2 TLSv1.3;
    ssl_ciphers            ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

    # OCSP Stapling
    ssl_stapling           on;
    ssl_stapling_verify    on;
    resolver               1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
    resolver_timeout       2s;

    # Connection header for WebSocket reverse proxy
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ""      close;
    }

    map $remote_addr $proxy_forwarded_elem {

        # IPv4 addresses can be sent as-is
        ~^[0-9.]+$        "for=$remote_addr";

        # IPv6 addresses need to be bracketed and quoted
        ~^[0-9A-Fa-f:.]+$ "for=\"[$remote_addr]\"";

        # Unix domain socket names cannot be represented in RFC 7239 syntax
        default           "for=unknown";
    }

    map $http_forwarded $proxy_add_forwarded {

        # If the incoming Forwarded header is syntactically valid, append to it
        "~^(,[ \\t]*)*([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?(;([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?)*([ \\t]*,([ \\t]*([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?(;([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?)*)?)*$" "$http_forwarded, $proxy_forwarded_elem";

        # Otherwise, replace it
        default "$proxy_forwarded_elem";
    }

    # Load configs
    include /etc/nginx/conf.d/*.conf;

    # your domain
    server {
        listen                               443 ssl  reuseport;
        listen                               [::]:443 ssl reuseport;
        http2                                on;
        // highlight-next-line-red
        server_name                          REPLACE_WITH_YOUR_DOMAIN;

        # SSL
        ssl_certificate                      /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key                  /etc/nginx/ssl/privkey.key;

        # security headers
        add_header X-XSS-Protection          "1; mode=block" always;
        add_header X-Content-Type-Options    "nosniff" always;
        add_header Referrer-Policy           "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy   "default-src 'self' http: https: ws: wss: data: blob: 'unsafe-inline'; frame-ancestors 'self';" always;
        add_header Permissions-Policy        "interest-cohort=()" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # . files
        location ~ /\.(?!well-known) {
            deny all;
        }

        # logging
        access_log /var/log/nginx/access.log combined buffer=512k flush=1m;
        error_log  /var/log/nginx/error.log warn;

        # reverse proxy
        location / {
            proxy_pass                         http://127.0.0.1:3000;
            proxy_set_header Host              $host;
            proxy_http_version                 1.1;
            proxy_cache_bypass                 $http_upgrade;

            # Proxy SSL
            proxy_ssl_server_name              on;

            # Proxy headers
            proxy_set_header Upgrade           $http_upgrade;
            proxy_set_header Connection        $connection_upgrade;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header Forwarded         $proxy_add_forwarded;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host  $host;
            proxy_set_header X-Forwarded-Port  $server_port;

            # Proxy timeouts
            proxy_connect_timeout              60s;
            proxy_send_timeout                 60s;
            proxy_read_timeout                 60s;
        }

        # favicon.ico
        location = /favicon.ico {
            log_not_found off;
        }

        # robots.txt
        location = /robots.txt {
            log_not_found off;
        }

        # gzip
        gzip            on;
        gzip_vary       on;
        gzip_proxied    any;
        gzip_comp_level 6;
        gzip_types      text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
    }




}
```

### Create docker-compose.yml

Create a file `docker-compose.yml` in the `~/remnawave/nginx` folder.

```bash
cd ~/remnawave/nginx && nano docker-compose.yml
```

Paste the following configuration.

```yaml title="docker-compose.yml"
services:
    remnawave-nginx:
        image: nginx:latest
        container_name: remnawave-nginx
        hostname: remnawave-nginx
        volumes:
            - ./nginx.conf:/etc/nginx/nginx.conf:ro
            - ./fullchain.pem:/etc/nginx/ssl/fullchain.pem:ro
            - ./privkey.key:/etc/nginx/ssl/privkey.key:ro
        restart: always
        network_mode: host
```

### Start the container

```bash
docker compose up -d && docker compose logs -f -t
```

### Open the panel in the browser

Open the configured domain name in the browser and you will see login page.

![login-page](/reverse-proxies/nginx/login-page.webp)

## Troubleshooting

<Button label="Ask community" link="https://t.me/+YxzE4bOmEog2Zjhi" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />
