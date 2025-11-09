## OAuth2: PocketID

### Создание OIDC Client

Зайдите в админ-панель PocketID и перейдите в раздел `Settings` → `OIDC Clients` → `Add OIDC Client`

```
# Замените YOUR_PANEL_DOMAIN на ваш адрес панели Remnawave
https://YOUR_PANEL_DOMAIN/oauth2/callback/pocketid
```

### Настройки OAuth2 в Remnawave

После создания OAuth2 приложения – скопируйте `Client ID` и `Client Secret`. Вставьте эти данные в соответствующем разделе. А чуть ниже введите список email-адресов для которых будет разрешен вход.

В поле `Домен` (`Plain Domain`) введите доменный адрес, на котором у вас расположен PocketID. Достаточно ввести просто доменное имя – без пути и https://, например: `pocketid.your-domain.com`
