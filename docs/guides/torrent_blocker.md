---
sidebar_position: 3
title: tBlocker
---

# Xray Torrent Blocker

[![en](https://img.shields.io/badge/lang-en-red)](https://github.com/kutovoys/xray-torrent-blocker/blob/main/README.md)
[![ru](https://img.shields.io/badge/lang-ru-blue)](https://github.com/kutovoys/xray-torrent-blocker/blob/main/README.ru.md)

Xray Torrent Blocker is an application designed to block torrent usage by users of the [Xray-based](https://github.com/XTLS/Xray-core) panels. The application analyzes logs, detects torrent activity, and temporarily blocks the user, sending notifications to the administrator via Telegram, and optionally to the user.

## Features:

- Monitoring logs of nodes for torrent usage.
- IP address blocking at the system level. Maximum block speed (no abuse reports!).
- Sending notifications via Telegram to both the administrator and the user.
- Configurable through a configuration file.
- Uses UFW for blocking.
- Configurable block duration.
- Supports temporary blocking with automatic unblocking.
- Simple installation and setup via systemd.
- Persistent block state between application restarts.
- Automatic block restoration after system reboot.
- Automatic cleanup of expired blocks.
- Supports webhook.

## Preparation

### Xray Configuration

- Enable logging. Section `log`

```json
    "log": {
      "access": "/var/lib/remnanode/access.log",
      "error": "/var/lib/remnanode/error.log",
      "loglevel": "error",
      "dnsLog": false
    }
```

- Configure BitTorrent traffic tagging. Section `routing`. Add the rule:

```json
        {
          "protocol": [
            "bittorrent"
          ],
          "outboundTag": "TORRENT",
          "type": "field"
        },
```

Here, `TORRENT` is the tag that the application will use to filter logs.

- Configure BitTorrent traffic blocking. Section `outbounds`. Send all traffic to blackhole:

```json
      {
        "protocol": "blackhole",
        "tag": "TORRENT"
      },
```

Unfortunately, this blocking only effectively handles about 20% of bittorrent traffic.

### Node Configuration

- On the server where the panel is hosted, create the folder `/var/lib/remnanode`:

```bash
  mkdir -p /var/lib/remnanode
```

- Add a new volume to the `/opt/remnanode/docker-compose.yml` file:

```yaml
volumes:
    - /var/lib/remnanode:/var/lib/remnanode #new volume
```

- Restart RemnaNode with the following command:

```bash
docker compose down --remove-orphans && docker compose up -d
```

## Installation

To automatically install the application, follow these steps:

- Run the installation script:

```bash
bash <(curl -fsSL git.new/install)
```

- The script will automatically install all dependencies, download the latest release, ask for the admin `Token` and `Chat ID`, and start the service.
- After installation, you can control the application via systemd:

```bash
systemctl start/status/stop tblocker
```

### Logrotate Configuration for RemnaNode

The configuration below is necessary to prevent your system from being clogged by logs.

```bash
/var/lib/remnanode/*.log {
    size 50M
    rotate 5
    compress
    missingok
    notifempty
    copytruncate
}
```

You can install logrotate and apply this configuration with the following command:

```bash
sudo apt update && sudo apt install logrotate && sudo bash -c 'cat > /etc/logrotate.d/remnanode <<EOF
/var/lib/remnanode/*.log {
    size 50M
    rotate 5
    compress
    missingok
    notifempty
    copytruncate
}
EOF' && logrotate -vf /etc/logrotate.d/remnanode
```

## Configuration

After installation, you can configure the application's behavior via the configuration file located at: `/opt/tblocker/config.yaml`.

Key configuration parameters:

- **LogFile** — the path to the log file to be monitored. Default: `/var/lib/remnanode/access.log`
    - You need to set up the LogFile parameter, as by default it uses a different directory (`marzban-node`).
- **BlockDuration** — the duration of the user's block in minutes. Default: `10`
- **TorrentTag** — the tag used to identify log entries related to torrents. Default: `TORRENT`
- **SendAdminMessage** — whether to send notifications to the administrator. Optional. Default: `true`
- **AdminBotToken** — the admin bot token for notifications. Optional.
- **AdminChatID** — the admin chat (or user) ID to which notifications will be sent. Optional.
- **SendUserMessage** — whether to send notifications to the user. Optional. Default: `false`
- **BotToken** — the bot token for sending messages to the user via Telegram. Optional.
- **TidRegex** — regular expression to extract the user's `CHAT_ID` from the log entry. Optional.
- **UserMessageTemplate** — the message template for notifying the user. Optional.
- **UsernameRegex** — regular expression to extract the user's login from the log entry. Optional.
- **StorageDir** — path to the directory for storing block data. Default: `/opt/tblocker`
- **SendWebhook** — Enables webhooks. Optional. Default: `false`
- **WebhookURL** — The URL to which webhooks will be sent. Optional.
- **WebhookHeaders** — A set of additional HTTP headers added to webhooks. Optional.

An example configuration file with detailed comments is available at `/opt/tblocker/config.yaml.example`.

### Example for Sending Notifications to Users (marzban example):

If the user's `CHAT_ID` is included in their login on the Marzban panel, you can configure the application to send notifications directly to the user.

For example, if the user's login in Marzban looks like this: `kutovoys_tgid-1234111`, you can set up the following in `config.yaml`:

- **TidRegex**: `telegramID(\\d+)`
- **UsernameRegex**: "email: (\\S+)"

In this case, the administrator will receive notifications with the username `kutovoys`, and the user will also be notified directly via Telegram when they are blocked.

### Block Data Storage

The application stores block information in a JSON file in the directory specified by the `StorageDir` parameter. This ensures:

- Persistent block state between application restarts
- Automatic block restoration after system reboot
- Proper user unblocking even after application restart
- Automatic cleanup of expired blocks

The block data file is located at: `/opt/tblocker/blocked_ips.json`
