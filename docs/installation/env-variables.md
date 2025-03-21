---
sidebar_position: 2
slug: /installation/env
title: Env variables
---

## Main Panel (aka Backend) {#panel}

### App Port

Port for the main panel inside Docker container.

```bash
APP_PORT=3000
```

### Metrics port

Port for the metrics inside Docker container.

```bash
METRICS_PORT=3001
```

### REDIS

Redis Host and Port.

```bash
REDIS_HOST=remnawave-redis
REDIS_PORT=6379
```

### API Instances

Number of API instances to run.

Possible values:

- `max` (start instances on all cores)
- `<number>` (start instances on number of cores)
- `-1` (start instances on all cores - 1)

Leave default value to start 1 instance. \
Most users will not need to change this value, it can help to achieve better performance with 40k+ users.

:::warning
Do not set this value more that physical cores count in your machine.
:::

```bash
API_INSTANCES=1
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

You can generate secrets with the following command:

```bash
openssl rand -hex 64
```

```bash
JWT_AUTH_SECRET=change_me
JWT_API_TOKENS_SECRET=change_me
```

### Telegram

This values are used to send notifications to the Telegram bot.

You can set up the same `chat id` for `TELEGRAM_ADMIN_ID` and `NODES_NOTIFY_CHAT_ID`.

`NODES_NOTIFY_CHAT_ID` is used to send notifications of nodes status changes, so it is recommended to set it up to a channel with turned on notifications.

`IS_TELEGRAM_ENABLED` is used to enable/disable Telegram notifications. Possible values: `true`, `false`.

```bash
IS_TELEGRAM_ENABLED=false
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

### SUBSCRIPTION PUBLIC DOMAIN

Default path for subscription URL is `/api/sub/<sub uuid>`.

This value is used for a easy access to subscription URL in Frontend and API.

Must be a valid domain, without http/https. Do not place `/` to end of domain/path.

```bash
SUB_PUBLIC_DOMAIN=example.com/api/sub
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

You can generate secrets with the following command:

```bash
openssl rand -hex 64
```

```bash
METRICS_USER=admin
METRICS_PASS=change_me
```

Metrics are available at `/metrics` path on `METRICS_PORT`.

Sample Prometheus config:

```yaml
global:
    # scrape_interval: 15s
    scrape_timeout: 10s
    evaluation_interval: 15s
scrape_configs:
    - job_name: 'remnawave'
      scheme: http
      metrics_path: /metrics
      static_configs:
          - targets: ['remnawave:3001']
      scrape_interval: 30s
      basic_auth:
          username: admin
          password: change_me
```

### Webhook

Enable webhook.

Possible values: `true`, `false`.

```bash
WEBHOOK_ENABLED=false
```

If webhook is enabled, you must set up the URL and secret.

:::danger

Do not use default credentials in production.

:::

`WEBHOOK_SECRET_HEADER` is used to sign the webhook payload, must be at least 32 characters. Only a-z, 0-9, A-Z are allowed.

You can generate secrets with the following command:

```bash
openssl rand -base64 64
```

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
