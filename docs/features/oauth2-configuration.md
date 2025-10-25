---
sidebar_position: 4
title: OAuth2 Configuration
---

OAuth2 allows you to authenticate to Remnawave dashboard using one of the configured providers.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/oauth2/oauth2-providers.webp" alt="OAuth2 Configuration" width="800" style={{ borderRadius: '8px' }} />
</div>

Remnawave supports the following providers:

- Telegram (follow [this guide](./telegram-oauth.md) to configure)
- [GitHub](#github)
- [Yandex](#yandex)
- [PocketID](#pocketid)

---

## Github {#github}

### Create an OAuth application

You will need to create an OAuth application in Github.  
Follow this link to create an application: [https://github.com/settings/applications/new](https://github.com/settings/applications/new)

```bash title="Authorization callback URL"
# Replace YOUR_PANEL_DOMAIN with your panel domain
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

:::warning

Don't forget to set the correct callback URL. Change `YOUR_PANEL_DOMAIN` to your panel domain.
:::

### Configuring OAuth2 in Remnawave

1. Open Remnawave Panel and move to `Remnawave Settings` -> `Authentication Methods`.
2. Select desired method and click on it to open configuration.
3. Click on `Enable` button.
4. Enter Client ID and Client Secret.
5. Enter List of allowed emails.
6. Click on `Save` button.

## PocketID {#pocketid}

### Create an OIDC Client

Login to your self-hosted PocketID instance and go to `Settings` → `OIDC Clients` → `Add OIDC Client`.

```bash title="Authorization callback URL"
# Replace YOUR_PANEL_DOMAIN with your panel domain
https://YOUR_PANEL_DOMAIN/oauth2/callback/pocketid
```

:::warning

Don't forget to set the correct callback URL. Change `YOUR_PANEL_DOMAIN` to your panel domain.
:::

## Yandex {#yandex}

:::danger
It is not recommended to use Yandex OAuth2 for self-hosted Remnawave instances.
:::

### Create an OAuth application

You will need to create an OAuth application in Yandex.

Follow this link to create an application: [https://oauth.yandex.com/client/new](https://oauth.yandex.com/client/new)

In the second step of creation select "Web application" and set the following callback URL:

```bash title="Authorization callback URL"
# Replace YOUR_PANEL_DOMAIN with your panel domain
https://YOUR_PANEL_DOMAIN/oauth2/callback/yandex
```

:::warning

Don't forget to set the correct callback URL. Change `YOUR_PANEL_DOMAIN` to your panel domain.
:::

In the third step of creation allow "Access to email address", no other permissions are needed.
