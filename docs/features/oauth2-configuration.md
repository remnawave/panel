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

```bash title="Editing .env file"
cd /opt/remnawave && nano .env
```

```bash title=".env configuration"
# Enable Github OAuth2, possible values: true, false
OAUTH2_GITHUB_ENABLED=true

# Github client ID, you can get it from Github application settings
OAUTH2_GITHUB_CLIENT_ID="REPLACE_WITH_YOUR_CLIENT_ID"

# Github client secret, you can get it from Github application settings
OAUTH2_GITHUB_CLIENT_SECRET="REPLACE_WITH_YOUR_CLIENT_SECRET"

# List of allowed emails, separated by commas
OAUTH2_GITHUB_ALLOWED_EMAILS=["admin@example.com", "user@example.com"]
```

Don't forget to restart the Remnawave container:

```bash
docker compose down && docker compose up -d && docker compose logs -f -t
```

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

### Configuring OAuth2 in Remnawave

```bash title="Editing .env file"
cd /opt/remnawave && nano .env
```

```bash title=".env configuration"
# Enable PocketID OAuth2, possible values: true, false
OAUTH2_POCKETID_ENABLED=true

# PocketID Client ID, you can get it from OIDC Client settings
OAUTH2_POCKETID_CLIENT_ID="REPLACE_WITH_YOUR_CLIENT_ID"

# PocketID Client Secret, you can get it from OIDC Client settings
OAUTH2_POCKETID_CLIENT_SECRET="REPLACE_WITH_YOUR_CLIENT_SECRET"

# Plain domain where PocketID is hosted, do not place any paths here. Just plain domain.
OAUTH2_POCKETID_PLAIN_DOMAIN="pocketid.domain.com"

# List of allowed emails, separated by commas
OAUTH2_POCKETID_ALLOWED_EMAILS=["admin@example.com", "user@example.com"]
```

Don't forget to restart the Remnawave container:

```bash
docker compose down && docker compose up -d && docker compose logs -f -t
```

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

### Configuring OAuth2 in Remnawave

```bash title="Editing .env file"
cd /opt/remnawave && nano .env
```

```bash title=".env configuration"
# Enable Yandex OAuth2, possible values: true, false
OAUTH2_YANDEX_ENABLED=true

# Yandex Client ID, you can get it from OIDC Client settings
OAUTH2_YANDEX_CLIENT_ID="REPLACE_WITH_YOUR_CLIENT_ID"

# Yandex Client Secret, you can get it from OIDC Client settings
OAUTH2_YANDEX_CLIENT_SECRET="REPLACE_WITH_YOUR_CLIENT_SECRET"

# List of allowed emails, separated by commas
OAUTH2_YANDEX_ALLOWED_EMAILS=["admin@example.com", "user@example.com"]
```

Don't forget to restart the Remnawave container:

```bash
docker compose down && docker compose up -d && docker compose logs -f -t
```
