---
sidebar_position: 3
title: Telegram OAuth
---

Telegram OAuth is a feature that allows you to authenticate to Remnawave dashboard using your Telegram account.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/tg-login/tg-login-preview.png" alt="Telegram OAuth" width="800" style={{ borderRadius: '8px' }} />
</div>

---

### .env configuration

```bash title="Editing .env file"
cd /opt/remnawave && nano .env
```

```bash title=".env configuration"
# Your Telegram bot token, you can get it from @BotFather
# If it already defined in .env, you can skip this variable
TELEGRAM_BOT_TOKEN="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"

# Enable Telegram OAuth
TELEGRAM_OAUTH_ENABLED=true

# List of admin IDs (numbers, not strings), separated by commas
TELEGRAM_OAUTH_ADMIN_IDS=[1234567890, 1234567891]
```

`TELEGRAM_OAUTH_ADMIN_IDS` - manages the list of admins who can access the Remnawave dashboard.

### How to get Telegram bot token

1. Go to [@BotFather](https://t.me/BotFather)
2. Create a new bot and get the token
3. Set the token in the `.env` file

### Setting up the bot

:::danger
It is necessary to set the domain under which you log in to the Remnawave dashboard.
:::

1. Go to [@BotFather](https://t.me/BotFather)
2. Send command `/mybots` and select previous created bot
3. Select option `Bot settings` → `Domain`
4. Select option `Set domain`

Now you need to send a message containing domain under which you log in to the Remnawave dashboard.

```bash
https://panel.domain.com
```
