## OAuth2: GitHub

### Creating an OAuth Application

First, you need to create an OAuth application.
Follow the link to create an application: [https://github.com/settings/applications/new](https://github.com/settings/applications/new)

In the `Homepage URL` field, enter the address of your panel, e.g. `https://panel.example.com`.

In the `Redirect URIs` field, enter the callback address:

```bash
# Replace YOUR_PANEL_DOMAIN with your panel address
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

Don't forget to replace `YOUR_PANEL_DOMAIN` with the correct panel address.
The `Allow wildcard matching`, `Enable Device Flow` and `Expire user access tokens` checkboxes can be left unchecked.

### OAuth2 Settings in Remnawave

After creating the application, copy the `Client ID`. Then click `Generate a new client secret` and copy the `Client Secret` — it is shown only once. Insert this data in the corresponding section. And below, enter the list of email addresses for which login will be allowed — the primary email of the GitHub account.
