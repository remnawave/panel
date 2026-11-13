## OAuth2: Github

### Создание OAuth приложения

Для начала вам необходимо создать OAuth приложение.
Перейдите по ссылке для создания приложения: [https://github.com/settings/applications/new](https://github.com/settings/applications/new)

В поле `Homepage URL` введите адрес вашей панели, например `https://panel.example.com`.

В пункте `Redirect URIs` введите адрес колбэка:

```bash
# Замените YOUR_PANEL_DOMAIN на адрес вашей панели
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

Не забудьте заменить `YOUR_PANEL_DOMAIN` на корректный адрес панели.
Чекбоксы `Allow wildcard matching`, `Enable Device Flow` и `Expire user access tokens` можно оставить выключенными.

### Настройки OAuth2 в Remnawave

После создания приложения скопируйте `Client ID`. Затем нажмите `Generate a new client secret` и скопируйте `Client Secret` — он показывается только один раз. Вставьте эти данные в соответствующем разделе. А чуть ниже введите список email-адресов, для которых будет разрешен вход — основной (primary) email GitHub-аккаунта.
