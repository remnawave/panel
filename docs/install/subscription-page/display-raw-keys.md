---
sidebar_position: 4
title: Display Raw Keys
---

![Display raw keys](/install/subscription-page-display-raw-keys.webp)

:::warning

This setting will not have any effect if you have HWID enabled.
:::

If you want to display raw keys in the subscription page, you can turn on the "Show Connection Keys" toggle in the Subpage Builder in Remnawave Dashboard.

Restart the subscription page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```

### Disable Display Raw Keys {#disable-display-raw-keys}

If you want to disable displaying raw keys in the subscription page, you can turn off the "Show Connection Keys" toggle in the Subpage Builder in Remnawave Dashboard.

### Restart the subscription page container {#restart-subscription-page-container}

Restart the subscription page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```
