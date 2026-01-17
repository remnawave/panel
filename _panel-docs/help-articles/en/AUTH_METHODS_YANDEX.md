## OAuth2: Yandex

The Yandex authentication method is not recommended for use.

### Creating an OAuth Application

You need to create an OAuth application in Yandex.

Follow the link to create an application: https://oauth.yandex.com/client/new

On the second step of application creation, select the "Web application" option and enter the `Callback URL`

```
# Replace YOUR_PANEL_DOMAIN with your Remnawave panel address
https://YOUR_PANEL_DOMAIN/oauth2/callback/yandex
```

Don't forget to replace `YOUR_PANEL_DOMAIN` with the correct panel address.

On the third step of creation – make sure to check the box next to `Access to email address`, no other permissions are required.
