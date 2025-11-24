## OAuth2: GitHub

### Creating an OAuth Application

First, you need to create an OAuth application.
Follow the link to create an application: [https://github.com/settings/applications/new](https://github.com/settings/applications/new)

In the `Authorization callback URL` field, enter the address of your panel.

```bash
# Replace YOUR_PANEL_DOMAIN with your panel address
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

Don't forget to replace `YOUR_PANEL_DOMAIN` with the correct panel address.

### OAuth2 Settings in Remnawave

After creating the OAuth2 application – copy the `Client ID` and `Client Secret`. Insert this data in the corresponding section. And below, enter the list of email addresses for which login will be allowed.
