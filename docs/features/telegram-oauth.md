---
sidebar_position: 3
title: Telegram OAuth
---

Telegram OAuth is a feature that allows you to authenticate to Remnawave dashboard using your Telegram account.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/tg-login/tg-login-preview.png" alt="Telegram OAuth" width="800" style={{ borderRadius: '8px' }} />
</div>

---

### Setting up

1. Open Remnawave Panel and move to `Settings` -> `Telegram`.
2. Click on `Telegram` tab.
3. Enter Bot Token and list of allowed admin chat IDs.
4. Click on `Save` button.

### Setting up the bot

1. Go to [@BotFather](https://t.me/BotFather)
2. Send command `/mybots` and select previous created bot
3. Select option `Bot settings` → `Domain`
4. Select option `Set domain`

Now you need to send a message containing domain under which you log in to the Remnawave dashboard.

```bash
https://panel.domain.com
```
