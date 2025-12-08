---
sidebar_position: 10
---

# Environment Variables

:::warning

To change environment variables, you must recreate the Remnawave containers.  
Just restarting the containers does not replace the environment within the container!

In order to recreate the container using docker compose, run `docker compose down && docker compose up -d`.

:::

## Change environment variables

You can change environment variables by editing the `.env` file. Most likely it is located in `/opt/remnawave`.

```bash title="Edit .env file"
cd /opt/remnawave && nano .env
```

## Ports

| Variable       | Description                            | Default |
| -------------- | -------------------------------------- | ------- |
| `APP_PORT`     | The port to run the Remnawave Panel on | `3000`  |
| `METRICS_PORT` | The port to run Metrics endpoints      | `3001`  |

<details>
<summary>Example</summary>

```bash title=".env file"
APP_PORT=3000
METRICS_PORT=3001
```

</details>

## Scaling API

Number of API instances to run.

Possible values:

- `max` (start instances on all cores)
- `<number>` (start instances on a specific number of cores)
- `-1` (start instances on all cores - 1)

Leave it on the default value to start only 1 instance.

Most users will not need to change this value but it can help achieve better performance with 40k+ users.

:::warning
Do not set this value to a number greater than the number of CPU cores in your machine.
:::

| Variable        | Description                        | Default |
| --------------- | ---------------------------------- | ------- |
| `API_INSTANCES` | The number of API instances to run | `1`     |

<details>
<summary>Example</summary>

```bash title=".env file"
API_INSTANCES=1
```

</details>

## Redis

| Variable         | Description                      | Default           | Required |
| ---------------- | -------------------------------- | ----------------- | -------- |
| `REDIS_HOST`     | The host of the Redis server     | `remnawave-redis` | Yes      |
| `REDIS_PORT`     | The port of the Redis server     | `6379`            | Yes      |
| `REDIS_DB`       | The database of the Redis server | `0`               | No       |
| `REDIS_PASSWORD` | The password of the Redis server |                   | No       |
| `REDIS_SOCKET`   | The socket of the Redis server   |                   | No       |

<details>
<summary>Example</summary>

```bash title=".env file"
REDIS_HOST=remnawave-redis
REDIS_PORT=6379
```

</details>

## Database

Variables below are not used by Remnawave, but by the database container.

| Variable            | Description                     | Default    | Required |
| ------------------- | ------------------------------- | ---------- | -------- |
| `POSTGRES_USER`     | The host of the Database server | `postgres` | No       |
| `POSTGRES_PASSWORD` | The port of the Database server | `postgres` | No       |
| `POSTGRES_DB`       | The user of the Database server | `postgres` | No       |

Remnawave uses PostgreSQL URL to connect to the database.

```

postgresql://{user}:{password}@{host}:{port}/{database}

```

```bash title="DATABASE_URL example"
DATABASE_URL="postgresql://postgres:postgres@remnawave-db:5432/postgres"
```

<details>
<summary>Example</summary>

```bash title=".env file"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

DATABASE_URL="postgresql://postgres:postgres@remnawave-db:5432/postgres"
```

</details>

## Secret keys

It is recommended to use a random string generator to create secrets with a minimum length of 64 characters.

:::danger

Do not use the default credentials in production.
Make sure to generate strong secrets!

:::

```bash title="Generating secrets"
openssl rand -hex 64
```

| Variable                | Description                           | Default     | Required |
| ----------------------- | ------------------------------------- | ----------- | -------- |
| `JWT_AUTH_SECRET`       | The secret key for the auth JWT       | `change_me` | Yes      |
| `JWT_API_TOKENS_SECRET` | The secret key for the API tokens JWT | `change_me` | Yes      |

<details>
<summary>Example</summary>

```bash title=".env file"
JWT_AUTH_SECRET=strong_secret_key
JWT_API_TOKENS_SECRET=strong_secret_key
```

</details>

## Telegram Notifications

`TELEGRAM_NOTIFY_USERS_CHAT_ID`, `TELEGRAM_NOTIFY_USERS_THREAD_ID` is used to send notifications about user events.

`TELEGRAM_NOTIFY_NODES_CHAT_ID`, `TELEGRAM_NOTIFY_NODES_THREAD_ID` is used to send notifications about node events.

`TELEGRAM_NOTIFY_CRM_CHAT_ID`, `TELEGRAM_NOTIFY_CRM_THREAD_ID` is used to send notifications about CRM events.

| Variable                            | Description                           | Default | Possible values |
| ----------------------------------- | ------------------------------------- | ------- | --------------- |
| `IS_TELEGRAM_NOTIFICATIONS_ENABLED` | Disable/Enable Telegram notifications | `false` | `true`, `false` |
| `TELEGRAM_BOT_TOKEN`                | The token for the Telegram bot        |         |                 |
| `TELEGRAM_NOTIFY_USERS_CHAT_ID`     | The user/group chat id                |         |                 |
| `TELEGRAM_NOTIFY_NODES_CHAT_ID`     | The user/group chat id                |         |                 |
| `TELEGRAM_NOTIFY_CRM_CHAT_ID`       | The user/group chat id                |         |                 |
| `TELEGRAM_NOTIFY_USERS_THREAD_ID`   | The topic id of Telegram group        |         |                 |
| `TELEGRAM_NOTIFY_NODES_THREAD_ID`   | The topic id of Telegram group        |         |                 |
| `TELEGRAM_NOTIFY_CRM_THREAD_ID`     | The topic id of Telegram group        |         |                 |

:::note

Telegram Group Chat ID is always starts with `-100`.
:::

<details>
<summary>Example</summary>

```bash title=".env file"

# Disable/Enable Telegram notifications
IS_TELEGRAM_NOTIFICATIONS_ENABLED=false

# Telegram bot token
TELEGRAM_BOT_TOKEN=change_me

# Notifications about users
TELEGRAM_NOTIFY_USERS_CHAT_ID=change_me

# Notifications about nodes
TELEGRAM_NOTIFY_NODES_CHAT_ID=change_me

# Notifications about CRM
TELEGRAM_NOTIFY_CRM_CHAT_ID=change_me

# Optional, if you want to send notifications to specific topics in Telegram group
TELEGRAM_NOTIFY_USERS_THREAD_ID=
TELEGRAM_NOTIFY_NODES_THREAD_ID=
TELEGRAM_NOTIFY_CRM_THREAD_ID=
```

</details>

## Domains

| Variable           | Description                                                  | Default | Required |
| ------------------ | ------------------------------------------------------------ | ------- | -------- |
| `FRONT_END_DOMAIN` | The domain of the Remnawave Panel. Used to set CORS headers. | `*`     | Yes      |

| Variable            | Description                                    | Default               | Required |
| ------------------- | ---------------------------------------------- | --------------------- | -------- |
| `SUB_PUBLIC_DOMAIN` | The domain and path of public subscription URL | `example.com/api/sub` | Yes      |

`SUB_PUBLIC_DOMAIN` is used to set the public subscription URL in RestAPI responses/UI in dashboard.

:::tip

If you are using with panel, just set to `yourpanel.com/api/sub`
:::

<details>
<summary>Example</summary>

```bash title=".env file"
FRONT_END_DOMAIN=yourpanel.com
SUB_PUBLIC_DOMAIN=yourpanel.com/api/sub
```

</details>

## Documentation

| Variable          | Description                  | Default | Possible values |
| ----------------- | ---------------------------- | ------- | --------------- |
| `IS_DOCS_ENABLED` | Disable/Enable documentation | `false` | `true`, `false` |

`IS_DOCS_ENABLED` is used to disable/enable the documentation.

:::tip
You can use the `API Keys` page in the admin dashboard (when `IS_DOCS_ENABLED` is set to `true`) for a quick link to the documentation.
:::

| Variable       | Description                | Default   |
| -------------- | -------------------------- | --------- |
| `SWAGGER_PATH` | The path to the Swagger UI | `/docs`   |
| `SCALAR_PATH`  | The path to the Scalar UI  | `/scalar` |

<details>
<summary>Example</summary>

```bash title=".env file"
IS_DOCS_ENABLED=true
SWAGGER_PATH=/docs
SCALAR_PATH=/scalar
```

</details>

## Prometheus Metrics

:::tip

You can generate a random password for the metrics using the following command:

```bash
openssl rand -hex 64
```

:::

| Variable       | Description                  | Default     |
| -------------- | ---------------------------- | ----------- |
| `METRICS_USER` | The user for the metrics     | `admin`     |
| `METRICS_PASS` | The password for the metrics | `change_me` |

<details>
<summary>Example</summary>

```bash title=".env file"
METRICS_USER=admin
METRICS_PASS=change_me
```

</details>

Sample Prometheus config:

```yaml title="prometheus.yml"
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

## Webhook

| Variable                | Description                                                                     | Default | Possible values |
| ----------------------- | ------------------------------------------------------------------------------- | ------- | --------------- |
| `WEBHOOK_ENABLED`       | Enable/Disable webhook notifications                                            | `false` | `true`, `false` |
| `WEBHOOK_URL`           | The URL of the webhook, can be http:// or https://                              |         |                 |
| `WEBHOOK_SECRET_HEADER` | Key for signature, at least 32 characters long. Only a-z, 0-9, A-Z are allowed. |         |                 |

:::tip

You can generate a random password for the webhook secret using the following command:

```bash
openssl rand -hex 64
```

:::

<details>
<summary>Example</summary>

```bash title=".env file"
WEBHOOK_ENABLED=true
WEBHOOK_URL=https://your-server.com/webhook-path
WEBHOOK_SECRET_HEADER=strong_secret_key
```

</details>

## Bandwidth usage notifications

| Variable                                  | Description                                                                                                                                                              | Default | Possible values |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | --------------- |
| `BANDWIDTH_USAGE_NOTIFICATIONS_ENABLED`   | Enable/Disable bandwidth usage notifications                                                                                                                             | `false` | `true`, `false` |
| `BANDWIDTH_USAGE_NOTIFICATIONS_THRESHOLD` | The threshold for bandwidth usage notifications. Only in ASC order (example: [60, 80]), must be valid array of integer(min: 25, max: 95) numbers. No more than 5 values. |         |                 |

<details>
<summary>Example</summary>

```bash title=".env file"
BANDWIDTH_USAGE_NOTIFICATIONS_ENABLED=true
BANDWIDTH_USAGE_NOTIFICATIONS_THRESHOLD=[60, 80]
```

</details>

## Not Connected Users Notifications

| Variable                                        | Description                                                                                                                                                                                             | Default | Possible values |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- |
| `NOT_CONNECTED_USERS_NOTIFICATIONS_ENABLED`     | Enable/Disable not connected users notifications                                                                                                                                                        | `false` | `true`, `false` |
| `NOT_CONNECTED_USERS_NOTIFICATIONS_AFTER_HOURS` | The hours after which to send notifications for users who haven't connected. Only in ASC order (example: [6, 12, 24]), must be valid array of integer(min: 1, max: 168) numbers. No more than 3 values. |         |                 |

<details>
<summary>Example</summary>

```bash title=".env file"
### Not connected users notification (webhook, telegram)
NOT_CONNECTED_USERS_NOTIFICATIONS_ENABLED=false
# Only in ASC order (example: [6, 12, 24]), must be valid array of integer(min: 1, max: 168) numbers. No more than 3 values.
# Each value represents HOURS passed after user creation (user.createdAt)
NOT_CONNECTED_USERS_NOTIFICATIONS_AFTER_HOURS=[6, 24, 48]
```

</details>

## Miscellaneous

| Variable                  | Description                                                                              | Default |
| ------------------------- | ---------------------------------------------------------------------------------------- | ------- |
| `SHORT_UUID_LENGTH`       | The length of the generated short UUID (subscription). Min. length 16 and max. length 64 | `16`    |
| `IS_HTTP_LOGGING_ENABLED` | Enable/Disable HTTP logging                                                              | `false` |
| `JWT_AUTH_LIFETIME`       | The lifetime of the auth JWT in hours. Possible values from 12 to 168.                   | `12`    |

<details>
<summary>Example</summary>

```bash title=".env file"
SHORT_UUID_LENGTH=16
IS_HTTP_LOGGING_ENABLED=true
JWT_AUTH_LIFETIME=12
```

</details>
