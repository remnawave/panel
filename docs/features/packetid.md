---
sidebar_position: 4
title: PocketID OAuth
---

PocketID OAuth Allows you to log in to Remnawave Dashboard via the decentralized identification service PocketID.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/pocketid/pocketid-preview.png" alt="PocketID OAuth" width="800" style={{ borderRadius: '8px' }} />
</div>

---

### Setting up

1. Open Remnawave Panel and move to `Settings` -> `Telegram`.
2. Click on `PocketID` tab.
3. Enter:
   - `PocketID Client ID`
   - `PocketID Client Secret`
   - `Plain Domain`, Your PocketID domain (pocketid.yourdomain.com).
   - `Allowed Emails`, Enter your PocketID email.
4. Click on `Save` button.

---

### Configuring PocketID

1. Go to `Administration` > `OIDC Clients`
2. Click on `Add OIDC Client` button.
3. Enter:
- `Client Launch URL`
```bash
https://panel.domain.com
```
- `Callback URLs`
```bash
https://panel.domain.com/oauth2/callback/pocketid
```
4. Save the settings.

:::warning
Do not turn on `Puclic cient` and `PKCE`
:::

After that, a PocketID login button will appear in Remnawave.