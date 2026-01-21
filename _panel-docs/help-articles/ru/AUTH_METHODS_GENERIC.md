# Аутентификация через Generic OAuth2

Generic OAuth2 позволяет подключить любой OAuth2-совместимый провайдер идентификации к Remnawave. Это полезно, когда вы хотите использовать провайдеры, для которых нет специальной интеграции (например, Authentik, Authelia, Zitadel, Google, Microsoft и др.).

## Требования

1. OAuth2-совместимый провайдер идентификации
2. Права администратора для создания OAuth2 клиентов/приложений
3. Провайдер должен поддерживать claim `email` в токенах

## Шаги настройки

### 1. Создание OAuth2 приложения в вашем провайдере

Точные шаги зависят от провайдера, но в целом вам нужно:

1. Войти в админ-консоль вашего провайдера идентификации
2. Создать новое OAuth2/OIDC приложение
3. Настроить:
    - **Тип приложения**: Web Application
    - **Тип гранта**: Authorization Code
    - **Redirect URI**: `https://your-panel-domain.com/oauth2/callback/generic`
4. Сохранить **Client ID** и **Client Secret**
5. Найти **Authorization URL** и **Token URL** провайдера (обычно в документации или well-known endpoint)

### 2. Поиск URL-адресов провайдера

У большинства провайдеров эти эндпоинты задокументированы. Типичные примеры:

| Провайдер | Authorization URL                                                  | Token URL                                                      |
| --------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Google    | `https://accounts.google.com/o/oauth2/v2/auth`                     | `https://oauth2.googleapis.com/token`                          |
| Microsoft | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize` | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| Authentik | `https://your-authentik.com/application/o/authorize/`              | `https://your-authentik.com/application/o/token/`              |
| Authelia  | `https://your-authelia.com/api/oidc/authorization`                 | `https://your-authelia.com/api/oidc/token`                     |
| Zitadel   | `https://your-zitadel.com/oauth/v2/authorize`                      | `https://your-zitadel.com/oauth/v2/token`                      |

### 3. Поддержка PKCE

**PKCE (Proof Key for Code Exchange)** добавляет дополнительный уровень безопасности в OAuth2 поток. Включите эту опцию, если:

- Ваш провайдер поддерживает PKCE (большинство современных провайдеров поддерживают)
- Вы хотите усилить защиту от атак перехвата кода авторизации
- Ваш провайдер требует PKCE для публичных клиентов

> **Рекомендация**: Включите PKCE, если ваш провайдер это поддерживает.

## Настройка Remnawave

| Поле                  | Описание                                                                             |
| --------------------- | ------------------------------------------------------------------------------------ |
| **Client ID**         | ID клиента/приложения от вашего OAuth2 провайдера                                    |
| **Client Secret**     | Секрет клиента от вашего OAuth2 провайдера                                           |
| **Authorization URL** | URL эндпоинта авторизации OAuth2 (например, `https://provider.com/oauth2/authorize`) |
| **Token URL**         | URL эндпоинта токена OAuth2 (например, `https://provider.com/oauth2/token`)          |
| **Frontend Domain**   | Домен вашей панели Remnawave без `https://` (например, `panel.example.com`)          |
| **With PKCE**         | Включить PKCE (Proof Key for Code Exchange) для повышенной безопасности              |
| **Allowed Emails**    | Список email-адресов, которым разрешён вход                                          |

## Контроль доступа

Вы можете контролировать доступ **одним из двух способов** (или обоими):

### Вариант A: Использование списка Allowed Emails

Укажите список разрешённых email-адресов в настройках Remnawave. Только пользователи с email из этого списка смогут войти.

### Вариант B: Использование Custom Claim

Если список **Allowed Emails** пуст, Remnawave проверит наличие кастомного claim в токене:

| Ключ              | Значение |
| ----------------- | -------- |
| `remnawaveAccess` | `true`   |

Если токен пользователя содержит `remnawaveAccess: true`, он будет авторизован.

> **Примечание**: Вам нужно настроить ваш провайдер идентификации для включения этого кастомного claim в токен. Точные шаги зависят от провайдера — обычно это делается через настройки "mappers", "claims" или "token customization".

## Устранение неполадок

### "Invalid redirect URI"

Убедитесь, что redirect URI в вашем провайдере точно совпадает: `https://your-panel-domain.com/oauth2/callback/generic`

### "Invalid or missing email claim"

Проверьте:

- У пользователя установлен email-адрес в провайдере
- Scope `email` запрошен и предоставлен
- Ваш провайдер включает claim `email` в токен

### "State mismatch"

Очистите куки браузера и попробуйте снова. Это может произойти, если процесс аутентификации был прерван.

### "Token exchange failed"

Проверьте:

- **Token URL** указан правильно
- **Client ID** и **Client Secret** корректны
- Эндпоинт токена вашего провайдера доступен с сервера Remnawave

### "Access denied"

Email пользователя отсутствует в списке **Allowed Emails**. Добавьте его email-адрес для предоставления доступа.

### Ошибки, связанные с PKCE

Если вы получаете ошибки, связанные с `code_verifier` или `code_challenge`:

- Попробуйте отключить **With PKCE**, если ваш провайдер его не поддерживает
- Или включите, если ваш провайдер его требует
