---
sidebar_position: 4
title: Display Raw Keys
---

![Display raw keys](/install/subscription-page-display-raw-keys.webp)

:::warning

This setting will not have any effect if you have HWID enabled.
:::

If you want to display raw keys in the subscription page, you can set the `SUBSCRIPTION_UI_DISPLAY_RAW_KEYS` variable to `true` in the `.env` file.

```bash title=".env file"
cd /opt/remnawave/subscription && nano .env
```

```bash title=".env file content"

SUBSCRIPTION_UI_DISPLAY_RAW_KEYS=true
```

Restart the subscription page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```

### Disable Display Raw Keys {#disable-display-raw-keys}

If you want to disable displaying raw keys in the subscription page, you can set the `SUBSCRIPTION_UI_DISPLAY_RAW_KEYS` variable to `false` in the `.env` file.

```bash title=".env file"
cd /opt/remnawave/subscription && nano .env
```

```bash
SUBSCRIPTION_UI_DISPLAY_RAW_KEYS=false
```

### Restart the subscription page container {#restart-subscription-page-container}

Restart the subscription page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```
