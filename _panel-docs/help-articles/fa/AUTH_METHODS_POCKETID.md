## OAuth2: PocketID

### Creating an OIDC Client

Log in to the PocketID admin panel and navigate to: `Settings` → `OIDC Clients` → `Add OIDC Client`

```
# Replace YOUR_PANEL_DOMAIN with your Remnawave panel address
https://YOUR_PANEL_DOMAIN/oauth2/callback/pocketid
```

### OAuth2 Settings in Remnawave

After creating the OAuth2 application – copy the `Client ID` and `Client Secret`. Insert this data in the corresponding section. And below, enter the list of email addresses for which login will be allowed.

In the `Plain Domain` field, enter the domain address where your PocketID is located.
Just enter the domain name – without the path and `https://`, for example: `pocketid.your-domain.com`

### Custom Claims (v2.4.0+)

Remnawave also supports authorization using Custom Claims.
When using this method, you do not need to specify an array of email addresses.

Key

```
remnawaveAccess
```

Value

```
true
```

Accordingly, if a user has this key (`remnawaveAccess: true`) in their token, they will be authorized.
