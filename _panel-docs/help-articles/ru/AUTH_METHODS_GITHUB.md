## OAuth2: Github

### Создание OAuth приложения

Для начала вам необходимо создать OAuth приложение.
Перейдите по ссылке для создания приложения: [https://github.com/settings/applications/new](https://github.com/settings/applications/new)

В пункте `Authorization callback URL` введите адрес вашей панели.

```bash
# Замените YOUR_PANEL_DOMAIN на адрес вашей панели
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

Не забудьте заменить `YOUR_PANEL_DOMAIN` на корректный адрес панели.

### Настройки OAuth2 в Remnawave

После создания OAuth2 приложения – скопируйте `Client ID` и `Client Secret`. Вставьте эти данные в соответствующем разделе. А чуть ниже введите список email-адресов для которых будет разрешен вход.
