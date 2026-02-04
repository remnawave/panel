---
sidebar_position: 4
slug: /features/fine-tuned-notifications
title: Fine-tuned Notifications
---

## Overview

Starting from version 2.3.1, you can fine-tune the notifications that the panel sends to Telegram or Webhook. This feature allows you to enable or disable specific events for each notification channel separately.

## Configuration

To configure notifications, you need to download the configuration file, modify it, and mount it to the Docker container.

### Step 1: Download the configuration file

Download the notifications configuration file from the official repository:

```bash
cd /opt/remnawave && curl -o notifications-config.yml https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/configs/notifications/notifications-config.yml
```

Or use `wget`:

```bash
cd /opt/remnawave && wget https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/configs/notifications/notifications-config.yml
```

### Step 2: Configure the settings

Open the downloaded file in a text editor:

```bash
cd /opt/remnawave && nano notifications-config.yml
```

The file contains all available events with default settings. Each event has two channels:

- `telegram: true/false` - send notifications to Telegram
- `webhook: true/false` - send notifications via Webhook

#### Configuration examples:

**Disable Telegram notifications for user creation:**

```yaml
events:
    user.created:
        telegram: false # Disable Telegram
        webhook: true # Keep Webhook enabled
```

**Disable all notifications for device connections:**

```yaml
events:
    user_hwid_devices.added:
        telegram: false
        webhook: false
```

**Using anchors for bulk disabling:**

```yaml
events:
  user.expired:
    <<: *bothDisabled  # Disable both channels
```

### Step 3: Mount to Docker container

Add volume to your `docker-compose.yml`:

```bash
cd /opt/remnawave && nano docker-compose.yml
```

```yaml
services:
    remnawave:
        image: remnawave/remnawave:2
        // highlight-next-line-green
        volumes:
        // highlight-next-line-green
            - ./notifications-config.yml:/var/lib/remnawave/configs/notifications/notifications-config.yml:ro
        # ... other settings
```

### Step 4: Restart the container

After mounting the file, restart the container:

```bash
cd /opt/remnawave && docker compose down remnawave && docker compose up -d && docker compose logs -f
```

## Available Events

The configuration file supports numerous events organized by categories. The complete and up-to-date list of all available events can be found in the official repository: [events.ts](https://github.com/remnawave/backend/blob/main/libs/contract/constants/events/events.ts).
