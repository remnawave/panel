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

| Variable            | Description                         | Default    | Required |
| ------------------- | ----------------------------------- | ---------- | -------- |
| `POSTGRES_USER`     | The username of the Postgres server | `postgres` | No       |
| `POSTGRES_PASSWORD` | The password of the Postgres server | `postgres` | No       |
| `POSTGRES_DB`       | The database of the Postgres server | `postgres` | No       |

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

Each notification variable uses the unified format: `chat_id:thread_id`, where `thread_id` is optional.

| Variable                            | Description                                 | Default                    | Possible values                      |
| ----------------------------------- | ------------------------------------------- | -------------------------- | ------------------------------------ |
| `IS_TELEGRAM_NOTIFICATIONS_ENABLED` | Disable/Enable Telegram notifications       | `false`                    | `true`, `false`                      |
| `TELEGRAM_BOT_TOKEN`                | The token for the Telegram bot              |                            |                                      |
| `TELEGRAM_BOT_API_ROOT`             | Custom Telegram Bot API root URL (optional) | `https://api.telegram.org` |                                      |
| `TELEGRAM_BOT_PROXY`                | Proxy for Telegram Bot (optional)           |                            | `protocol://user:password@host:port` |
| `TELEGRAM_NOTIFY_USERS`             | Notifications about user events             |                            | `chat_id` or `chat_id:thread_id`     |
| `TELEGRAM_NOTIFY_NODES`             | Notifications about node events             |                            | `chat_id` or `chat_id:thread_id`     |
| `TELEGRAM_NOTIFY_CRM`               | Notifications about CRM events              |                            | `chat_id` or `chat_id:thread_id`     |
| `TELEGRAM_NOTIFY_SERVICE`           | Notifications about service events          |                            | `chat_id` or `chat_id:thread_id`     |
| `TELEGRAM_NOTIFY_TBLOCKER`          | Notifications about Torrent Blocker events  |                            | `chat_id` or `chat_id:thread_id`     |

:::note
Telegram Group Chat ID always starts with `-100`.
:::

<details>
<summary>Example</summary>

```bash title=".env file"

# Disable/Enable Telegram notifications
IS_TELEGRAM_NOTIFICATIONS_ENABLED=false

# Telegram bot token
TELEGRAM_BOT_TOKEN=change_me

# Optional: proxy for Telegram Bot
# TELEGRAM_BOT_PROXY=socks5://user:password@host:port

# Notifications (format: chat_id or chat_id:thread_id)
TELEGRAM_NOTIFY_USERS=change_me
TELEGRAM_NOTIFY_NODES=change_me
TELEGRAM_NOTIFY_CRM=change_me
TELEGRAM_NOTIFY_SERVICE=change_me
TELEGRAM_NOTIFY_TBLOCKER=change_me
```

</details>

## Domains

| Variable           | Description                                                  | Default | Required |
| ------------------ | ------------------------------------------------------------ | ------- | -------- |
| `FRONT_END_DOMAIN` | The domain of the Remnawave Panel. Used to set CORS headers. | `*`     | Yes      |

| Variable            | Description                                    | Default               | Required |
| ------------------- | ---------------------------------------------- | --------------------- | -------- |
| `SUB_PUBLIC_DOMAIN` | The domain and path of public subscription URL | `example.com/api/sub` | Yes      |

| Variable       | Description                                                                                   | Default | Required |
| -------------- | --------------------------------------------------------------------------------------------- | ------- | -------- |
| `PANEL_DOMAIN` | Panel domain for generating direct links (e.g. in Telegram notifications with inline buttons) |         | No       |

`SUB_PUBLIC_DOMAIN` is used to set the public subscription URL in RestAPI responses/UI in dashboard.

:::tip

If you are using with panel, just set to `yourpanel.com/api/sub`
:::

<details>
<summary>Example</summary>

```bash title=".env file"
FRONT_END_DOMAIN=yourpanel.com
SUB_PUBLIC_DOMAIN=yourpanel.com/api/sub
PANEL_DOMAIN=yourpanel.com
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

You can use the ready-made Grafana dashboard to visualize collected metrics: [Remnawave Panel Dashboard](https://grafana.com/grafana/dashboards/25064-remnawave-monitoring-dashboard/)

<details>
<summary>Prometheus Metrics sample</summary>

```promql
# HELP remnawave_node_online_users Number of online users on a node
# TYPE remnawave_node_online_users gauge
remnawave_node_online_users{node_uuid="d86d8c63-944c-4398-9cf4-c3882a54a5d5",app="remnawave"} 0
remnawave_node_online_users{node_uuid="966e6378-ec47-4998-939e-123d9616b1dd",app="remnawave"} 0
remnawave_node_online_users{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 0
remnawave_node_online_users{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 0

# HELP remnawave_node_status Node connection status (1 - connected, 0 - disconnected)
# TYPE remnawave_node_status gauge
remnawave_node_status{node_uuid="d86d8c63-944c-4398-9cf4-c3882a54a5d5",app="remnawave"} 0
remnawave_node_status{node_uuid="966e6378-ec47-4998-939e-123d9616b1dd",app="remnawave"} 0
remnawave_node_status{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 1
remnawave_node_status{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 1

# HELP remnawave_users_status Counter for users statuses, updated every 1 minute
# TYPE remnawave_users_status gauge
remnawave_users_status{status="ACTIVE",app="remnawave"} 80000
remnawave_users_status{status="DISABLED",app="remnawave"} 4
remnawave_users_status{status="LIMITED",app="remnawave"} 0
remnawave_users_status{status="EXPIRED",app="remnawave"} 4

# HELP remnawave_users_online_stats Counter for online stats of distinct users, updated every 1 minute
# TYPE remnawave_users_online_stats gauge
remnawave_users_online_stats{metricType="onlineNow",app="remnawave"} 0
remnawave_users_online_stats{metricType="lastDay",app="remnawave"} 0
remnawave_users_online_stats{metricType="lastWeek",app="remnawave"} 1
remnawave_users_online_stats{metricType="neverOnline",app="remnawave"} 80002

# HELP remnawave_users_total Total number of users, updated every 1 minute
# TYPE remnawave_users_total gauge
remnawave_users_total{type="all",app="remnawave"} 80008

# HELP remnawave_node_inbound_upload_bytes Inbound upload bytes, updated every 30 seconds
# TYPE remnawave_node_inbound_upload_bytes counter
remnawave_node_inbound_upload_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="VLESS_TCP_REALITY",app="remnawave"} 1778
remnawave_node_inbound_upload_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="REMNAWAVE_API_INBOUND",app="remnawave"} 583

# HELP remnawave_node_inbound_download_bytes Inbound download bytes, updated every 30 seconds
# TYPE remnawave_node_inbound_download_bytes counter
remnawave_node_inbound_download_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="VLESS_TCP_REALITY",app="remnawave"} 5439
remnawave_node_inbound_download_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="REMNAWAVE_API_INBOUND",app="remnawave"} 1043

# HELP remnawave_node_outbound_upload_bytes Outbound upload bytes, updated every 30 seconds
# TYPE remnawave_node_outbound_upload_bytes counter
remnawave_node_outbound_upload_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="BLOCK",app="remnawave"} 0
remnawave_node_outbound_upload_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="DIRECT",app="remnawave"} 1740

# HELP remnawave_node_outbound_download_bytes Outbound download bytes, updated every 30 seconds
# TYPE remnawave_node_outbound_download_bytes counter
remnawave_node_outbound_download_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="BLOCK",app="remnawave"} 0
remnawave_node_outbound_download_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",tag="DIRECT",app="remnawave"} 5437

# HELP remnawave_process_rss_bytes Process resident set size in bytes.
# TYPE remnawave_process_rss_bytes gauge
remnawave_process_rss_bytes{instance_id="0",instance_name="processor",app="remnawave"} 178515968
remnawave_process_rss_bytes{instance_id="0",instance_name="api",app="remnawave"} 247222272
remnawave_process_rss_bytes{instance_id="0",instance_name="scheduler",app="remnawave"} 178470912
remnawave_process_rss_bytes{instance_id="1",instance_name="api",app="remnawave"} 248770560

# HELP remnawave_process_heap_used_bytes Process heap used in bytes.
# TYPE remnawave_process_heap_used_bytes gauge
remnawave_process_heap_used_bytes{instance_id="0",instance_name="processor",app="remnawave"} 79360240
remnawave_process_heap_used_bytes{instance_id="0",instance_name="api",app="remnawave"} 84165184
remnawave_process_heap_used_bytes{instance_id="0",instance_name="scheduler",app="remnawave"} 79288240
remnawave_process_heap_used_bytes{instance_id="1",instance_name="api",app="remnawave"} 82517568

# HELP remnawave_process_heap_total_bytes Process total heap size in bytes.
# TYPE remnawave_process_heap_total_bytes gauge
remnawave_process_heap_total_bytes{instance_id="0",instance_name="processor",app="remnawave"} 90984448
remnawave_process_heap_total_bytes{instance_id="0",instance_name="api",app="remnawave"} 89411584
remnawave_process_heap_total_bytes{instance_id="0",instance_name="scheduler",app="remnawave"} 95440896
remnawave_process_heap_total_bytes{instance_id="1",instance_name="api",app="remnawave"} 93343744

# HELP remnawave_process_external_bytes Process external memory in bytes (C++ objects bound to JS).
# TYPE remnawave_process_external_bytes gauge
remnawave_process_external_bytes{instance_id="0",instance_name="processor",app="remnawave"} 4040229
remnawave_process_external_bytes{instance_id="0",instance_name="api",app="remnawave"} 4066479
remnawave_process_external_bytes{instance_id="0",instance_name="scheduler",app="remnawave"} 4021582
remnawave_process_external_bytes{instance_id="1",instance_name="api",app="remnawave"} 7595484

# HELP remnawave_process_array_buffers_bytes Process ArrayBuffers memory in bytes.
# TYPE remnawave_process_array_buffers_bytes gauge
remnawave_process_array_buffers_bytes{instance_id="0",instance_name="processor",app="remnawave"} 197378
remnawave_process_array_buffers_bytes{instance_id="0",instance_name="api",app="remnawave"} 222529
remnawave_process_array_buffers_bytes{instance_id="0",instance_name="scheduler",app="remnawave"} 171671
remnawave_process_array_buffers_bytes{instance_id="1",instance_name="api",app="remnawave"} 3751534

# HELP remnawave_process_event_loop_delay_ms Mean event loop delay in milliseconds.
# TYPE remnawave_process_event_loop_delay_ms gauge
remnawave_process_event_loop_delay_ms{instance_id="0",instance_name="processor",app="remnawave"} 20.104262477732792
remnawave_process_event_loop_delay_ms{instance_id="0",instance_name="api",app="remnawave"} 20.102243096774195
remnawave_process_event_loop_delay_ms{instance_id="0",instance_name="scheduler",app="remnawave"} 20.095705651821863
remnawave_process_event_loop_delay_ms{instance_id="1",instance_name="api",app="remnawave"} 20.109312

# HELP remnawave_process_event_loop_p99_ms Event loop delay p99 in milliseconds.
# TYPE remnawave_process_event_loop_p99_ms gauge
remnawave_process_event_loop_p99_ms{instance_id="0",instance_name="processor",app="remnawave"} 20.627455
remnawave_process_event_loop_p99_ms{instance_id="0",instance_name="api",app="remnawave"} 20.316159
remnawave_process_event_loop_p99_ms{instance_id="0",instance_name="scheduler",app="remnawave"} 20.414463
remnawave_process_event_loop_p99_ms{instance_id="1",instance_name="api",app="remnawave"} 20.381695

# HELP remnawave_process_active_handles Number of active resource handles.
# TYPE remnawave_process_active_handles gauge
remnawave_process_active_handles{instance_id="0",instance_name="processor",app="remnawave"} 145
remnawave_process_active_handles{instance_id="0",instance_name="api",app="remnawave"} 29
remnawave_process_active_handles{instance_id="0",instance_name="scheduler",app="remnawave"} 48
remnawave_process_active_handles{instance_id="1",instance_name="api",app="remnawave"} 29

# HELP remnawave_process_uptime_seconds Process uptime in seconds.
# TYPE remnawave_process_uptime_seconds gauge
remnawave_process_uptime_seconds{instance_id="0",instance_name="processor",app="remnawave"} 264694.362842572
remnawave_process_uptime_seconds{instance_id="0",instance_name="api",app="remnawave"} 264694.512636422
remnawave_process_uptime_seconds{instance_id="0",instance_name="scheduler",app="remnawave"} 264694.569192717
remnawave_process_uptime_seconds{instance_id="1",instance_name="api",app="remnawave"} 264694.753156229

# HELP remnawave_node_network_rx_bytes_per_sec Node network receive speed in bytes per second
# TYPE remnawave_node_network_rx_bytes_per_sec gauge
remnawave_node_network_rx_bytes_per_sec{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 197.8021978021978
remnawave_node_network_rx_bytes_per_sec{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 197.60479041916167

# HELP remnawave_node_network_tx_bytes_per_sec Node network transmit speed in bytes per second
# TYPE remnawave_node_network_tx_bytes_per_sec gauge
remnawave_node_network_tx_bytes_per_sec{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 197.8021978021978
remnawave_node_network_tx_bytes_per_sec{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 197.60479041916167

# HELP remnawave_node_network_rx_bytes_total Node network total received bytes since boot from default interface
# TYPE remnawave_node_network_rx_bytes_total gauge
remnawave_node_network_rx_bytes_total{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 1812802415
remnawave_node_network_rx_bytes_total{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 28468345531

# HELP remnawave_node_network_tx_bytes_total Node network total transmitted bytes since boot from default interface
# TYPE remnawave_node_network_tx_bytes_total gauge
remnawave_node_network_tx_bytes_total{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 1528776659
remnawave_node_network_tx_bytes_total{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 18385221081

# HELP remnawave_node_memory_total_bytes Node total memory in bytes
# TYPE remnawave_node_memory_total_bytes gauge
remnawave_node_memory_total_bytes{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 32853663744
remnawave_node_memory_total_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 1008193536

# HELP remnawave_node_memory_free_bytes Node free memory in bytes
# TYPE remnawave_node_memory_free_bytes gauge
remnawave_node_memory_free_bytes{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 31891734528
remnawave_node_memory_free_bytes{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 540762112

# HELP remnawave_node_uptime_seconds Node OS uptime in seconds
# TYPE remnawave_node_uptime_seconds gauge
remnawave_node_uptime_seconds{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 1655366.32
remnawave_node_uptime_seconds{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 2171673.48

# HELP remnawave_node_cpu_count Node CPU count
# TYPE remnawave_node_cpu_count gauge
remnawave_node_cpu_count{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",app="remnawave"} 16
remnawave_node_cpu_count{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",app="remnawave"} 1

# HELP remnawave_node_system_info Node system info
# TYPE remnawave_node_system_info gauge
remnawave_node_system_info{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",arch="x64",cpu_model="AMD EPYC-Genoa Processor",hostname="remnanode",platform="linux",release="6.8.0-52-generic",version="#53-Ubuntu SMP PREEMPT_DYNAMIC Sat Jan 11 00:06:25 UTC 2025",app="remnawave"} 1
remnawave_node_system_info{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",arch="x64",cpu_model="Intel Core Processor (Broadwell, IBRS)",hostname="remnanode",platform="linux",release="6.8.0-101-generic",version="#101-Ubuntu SMP PREEMPT_DYNAMIC Mon Feb  9 10:15:05 UTC 2026",app="remnawave"} 1

# HELP remnawave_node_basic_info Node basic info
# TYPE remnawave_node_basic_info gauge
remnawave_node_basic_info{node_uuid="d86d8c63-944c-4398-9cf4-c3882a54a5d5",node_name="tester-1",node_country_emoji="🏴‍☠️",provider_name="Test",tags="",app="remnawave"} 1
remnawave_node_basic_info{node_uuid="966e6378-ec47-4998-939e-123d9616b1dd",node_name="tester-2",node_country_emoji="🏴‍☠️",provider_name="Test",tags="",app="remnawave"} 1
remnawave_node_basic_info{node_uuid="ed1727fd-5cdc-4ebb-8a24-71823714f6ad",node_name="tester-3",node_country_emoji="🏴‍☠️",provider_name="Test",tags="",app="remnawave"} 1
remnawave_node_basic_info{node_uuid="e31adcc0-5edb-463f-ba2e-9f3cb5ac69cf",node_name="tester-4",node_country_emoji="🏴‍☠️",provider_name="Test",tags="",app="remnawave"} 1
```

</details>

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

| Variable                             | Description                                                                              | Default | Possible values |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ------- | --------------- |
| `SHORT_UUID_LENGTH`                  | The length of the generated short UUID (subscription). Min. length 16 and max. length 64 | `16`    |                 |
| `IS_HTTP_LOGGING_ENABLED`            | Enable/Disable HTTP logging                                                              | `false` | `true`, `false` |
| `ENABLE_DEBUG_LOGS`                  | Enable/Disable debug logs                                                                | `false` | `true`, `false` |
| `JWT_AUTH_LIFETIME`                  | The lifetime of the auth JWT in hours. Possible values from 12 to 168.                   | `12`    |                 |
| `SERVICE_CLEAN_USAGE_HISTORY`        | Enable/Disable cleaning of usage history                                                 | `false` | `true`, `false` |
| `SERVICE_DISABLE_USER_USAGE_RECORDS` | Disable recording of user usage data                                                     | `false` | `true`, `false` |
| `USER_USAGE_IGNORE_BELOW_BYTES`      | Ignore user usage below this threshold (in bytes, max 1048576)                           | `0`     |                 |

<details>
<summary>Example</summary>

```bash title=".env file"
SHORT_UUID_LENGTH=16
IS_HTTP_LOGGING_ENABLED=true
ENABLE_DEBUG_LOGS=false
JWT_AUTH_LIFETIME=12
SERVICE_CLEAN_USAGE_HISTORY=false
SERVICE_DISABLE_USER_USAGE_RECORDS=false
USER_USAGE_IGNORE_BELOW_BYTES=0
```

</details>
````
