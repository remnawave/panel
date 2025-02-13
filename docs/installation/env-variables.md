---
sidebar_position: 3
slug: /installation/env
title: Env variables
---

## Main Panel (aka Backend) {#panel}

### APP_PORT

Port for the main panel inside Docker container.

```bash
APP_PORT=3000
```

### DATABASE_URL

Database URL. Supported only Postgres.

Format: `postgresql://{user}:{password}@{host}:{port}/{database}`

```bash
DATABASE_URL="postgresql://postgres:postgres@remnawave-db:5432/postgres"
```

### JWT

Be sure to change the secrets.

It is recommended to use a random string generator to create the secrets with a minimum length of 64 characters.

This values are used to sign/verify the JWT tokens.

:::danger

Do not use default credentials in production.
Be sure to generate strong secrets!

:::

```bash
JWT_AUTH_SECRET=change_me
JWT_API_TOKENS_SECRET=change_me
```

### TELEGRAM

This values are used to send notifications to the Telegram bot.

You can set up the same `chat id` for `TELEGRAM_ADMIN_ID` and `NODES_NOTIFY_CHAT_ID`.

`NODES_NOTIFY_CHAT_ID` is used to send notifications of nodes status changes, so it is recommended to set it up to a channel with turned on notifications.

```bash
TELEGRAM_BOT_TOKEN=change_me
TELEGRAM_ADMIN_ID=change_me
NODES_NOTIFY_CHAT_ID=change_me
```

### FRONT_END_DOMAIN

Frontend domain, used by Helmet middleware.

Example: `FRONT_END_DOMAIN=panel.example.com`

```bash
FRONT_END_DOMAIN=*
```

### SUBSCRIPTION INFO

This values will be passed to response headers in subscription response.

A lot of clients relay on these headers.

For example, `SUB_UPDATE_INTERVAL` is used to update subscription in Streisand, Clash Verge and other clients.

```bash
SUB_SUPPORT_URL=https://support.example.com
SUB_PROFILE_TITLE=Subscription Profile
SUB_UPDATE_INTERVAL=12
SUB_WEBPAGE_URL=https://example.com
```

### SUBSCRIPTION PUBLIC DOMAIN

This value is used for a easy access to subscription URL in Frontend and API.

Must be a valid domain, without http/https. Do not place `/` to end of domain/path.

```bash
SUB_PUBLIC_DOMAIN=example.com
```

### User statuses

It can be used to customize user statuses remarks, which will see user if their status in not ACTIVE.

Must be an array of strings, each string is a remark.

```bash
EXPIRED_USER_REMARKS=["⚠️ Subscription expired","Contact support"]
DISABLED_USER_REMARKS=["❌ Subscription disabled","Contact support"]
LIMITED_USER_REMARKS=["🔴 Subscription limited","Contact support"]
```

### Admin credentials

Be sure to change the credentials.

:::danger

Do not use default credentials in production.

:::

```bash
SUPERADMIN_USERNAME=change_me
SUPERADMIN_PASSWORD=change_me
```

### Docs

Enable docs.

```bash
IS_DOCS_ENABLED=true
```

If `IS_DOCS_ENABLED` is `true`, you can set up the paths to SwaggerUI and Scalar.

You can freely explore all the API routes and endpoints.

:::tip

Check out `API Keys` page in admin dashboard with enabled `IS_DOCS_ENABLED` for quick route to documentation.

:::

```bash
SWAGGER_PATH=/docs
SCALAR_PATH=/scalar
```

### PROMETHEUS

Metrics are enabled by default, currently you can't disable them.

You can set up the credentials to access the metrics.

:::danger

Do not use default credentials in production.

:::

```bash
METRICS_USER=admin
METRICS_PASS=change_me
```

Metrics are available at `/api/metrics` path.

Sample Prometheus config:

```yaml
global:
    # scrape_interval: 15s
    scrape_timeout: 10s
    evaluation_interval: 15s
scrape_configs:
    - job_name: 'remnawave'
      scheme: http
      metrics_path: /api/metrics
      static_configs:
          - targets: ['remnawave:3000']
      scrape_interval: 30s
      basic_auth:
          username: admin
          password: change_me
```

### Webhook

Enable webhook.

```bash
WEBHOOK_ENABLED=true
```

If webhook is enabled, you must set up the URL and secret.

:::danger

Do not use default credentials in production.

:::

`WEBHOOK_SECRET_HEADER` is used to sign the webhook payload, must be exact 64 characters. Only a-z, 0-9, A-Z are allowed.

```bash
WEBHOOK_URL=https://webhook.site/1234567890
WEBHOOK_SECRET_HEADER=vsmu67Kmg6R8FjIOF1WUY8LWBHie4scdEqrfsKmyf4IAf8dY3nFS0wwYHkhh6ZvQ
```

### Shared environment variables

These variables are not used by Remnawave iteself, but can be used by Postgres database or Cloudflare Tunnel, if you will run them from the same `docker-compose.yml` file.

```bash
CLOUDFLARE_TOKEN=ey...
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
```

## Node {#node}

### APP_PORT

Port for the node inside Docker container.

```bash
APP_PORT=3001
```

### SSL_CERT

It can be retrieved from the main panel.

:::warning

Do not share your certificate with anyone.

:::

```bash
SSL_CERT=PUT CERTIFICATE HERE
```
