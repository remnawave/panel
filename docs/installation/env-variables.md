---
sidebar_position: 2
slug: /installation/env
title: Env variables
---

## Main Panel (aka Backend) {#panel}

### App Port

Port for the main panel inside the Docker container.

```bash
APP_PORT=3000
```

### Metrics port

Port for the metrics inside the Docker container.

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

- `max` (start instances on all cores - one instance per core)
- `<number>` (start instances on a specific number of cores - one instance per core)
- `-1` (start instances on all cores - 1  - one instance per core)

Leave it on the default value to start only 1 instance. \
Most users will not need to change this value but it can help achieve better performance with 40k+ users.

:::warning
Do not set this value to a number greater than the number of CPU cores in your machine.
:::

```bash
API_INSTANCES=1
```

### DATABASE_URL

Database URL. Supports only Postgres.

Format: `postgresql://{user}:{password}@{host}:{port}/{database}`

```bash
DATABASE_URL="postgresql://postgres:postgres@remnawave-db:5432/postgres"
```

### JWT

Make sure to change the secrets.

It is recommended to use a random string generator to create secrets with a minimum length of 64 characters.

These values are used to sign/verify the JWT tokens.

:::danger

Do not use the default credentials in production.
Make sure to generate strong secrets!

:::

You can use the following command to generate secrets:

```bash
openssl rand -hex 64
```

```bash
JWT_AUTH_SECRET=change_me
JWT_API_TOKENS_SECRET=change_me
```

### Telegram

These values are used to set up the Telegram bot.

`IS_TELEGRAM_ENABLED` is used for enabling/disabling Telegram notifications. Possible values: `true`, `false`.

It's possible to set the same `chat id` for `TELEGRAM_ADMIN_ID` and `NODES_NOTIFY_CHAT_ID`.

`NODES_NOTIFY_CHAT_ID` is used to send notifications for changes in the status of the nodes, so it is recommended to set it to the Id of a channel with turned on notifications.

```bash
IS_TELEGRAM_ENABLED=false
TELEGRAM_BOT_TOKEN=change_me
TELEGRAM_ADMIN_ID=change_me
NODES_NOTIFY_CHAT_ID=change_me
```

You can use group chat with topics for notifications. For this use `NODES_NOTIFY_THREAD_ID` and `TELEGRAM_ADMIN_THREAD_ID`. Also set the `chat id` of the group chat for variables `TELEGRAM_ADMIN_ID` and `NODES_NOTIFY_CHAT_ID`.

```bash
NODES_NOTIFY_THREAD_ID=change_me
TELEGRAM_ADMIN_THREAD_ID=change_me
```

### FRONT_END_DOMAIN

Frontend domain, used by Helmet middleware.

Example: `FRONT_END_DOMAIN=panel.example.com`

```bash
FRONT_END_DOMAIN=*
```

### SUBSCRIPTION PUBLIC DOMAIN

Default path for the subscription URL is `/api/sub/<sub uuid>`.

This value is used for easy access to the subscription URL in Frontend and API.

Must be a valid domain without http/https. Do not place `/` at the end of domain/path.

```bash
SUB_PUBLIC_DOMAIN=example.com/api/sub
```

### Docs

Enable docs.

```bash
IS_DOCS_ENABLED=true
```

If `IS_DOCS_ENABLED` is `true`, you can set up the paths to SwaggerUI and Scalar.

You can use SwaggerUI and Scalar to freely explore all of the API routes and endpoints.

:::tip

You can use the `API Keys` page in the admin dashboard (when `IS_DOCS_ENABLED` is set to true) for a quick link to the documentation.

:::

```bash
SWAGGER_PATH=/docs
SCALAR_PATH=/scalar
```

### PROMETHEUS

Metrics are enabled by default and currently you cannot disable them.

You can set up the credentials to access the metrics.

:::danger

Do not use the default credentials in production.

:::

You can use the following command to generate secrets:

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

If webhook is enabled, you must set up the URL and the secret.

:::danger

Do not use the default credentials in production.

:::

`WEBHOOK_SECRET_HEADER` is used to sign the webhook payload. It must be at least 32 characters long. Only a-z, 0-9, A-Z are allowed.

You can use the following command to generate secrets:

```bash
openssl rand -base64 64
```

```bash
WEBHOOK_URL=https://webhook.site/1234567890
WEBHOOK_SECRET_HEADER=vsmu67Kmg6R8FjIOF1WUY8LWBHie4scdEqrfsKmyf4IAf8dY3nFS0wwYHkhh6ZvQ
```

### Shared environment variables

These variables are not used by Remnawave itself, but can be used by the Postgres database or Cloudflare Tunnel, if you run them from the same `docker-compose.yml` file.

```bash
CLOUDFLARE_TOKEN=ey...
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
```
