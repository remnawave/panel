# Аутентификация через Keycloak

Keycloak - это решение для управления идентификацией и доступом с поддержкой Single Sign-On (SSO).

## Требования

1. Работающий сервер Keycloak
2. Доступ администратора для создания клиентов

## Шаги настройки

### 1. Создание клиента в Keycloak

1. Войдите в Keycloak Admin Console
2. Выберите realm (или создайте новый)
3. Перейдите в **Clients** → **Create client**
4. Настройте:
   - **Client ID**: `remnawave` (или другое имя)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. **Valid redirect URIs**: `https://ваш-домен-панели.com/oauth2/callback/keycloak`
6. **Web Origins**: `https://ваш-домен-панели.com`
7. Сохраните клиент

### 2. Получение Client Secret

1. Перейдите в **Clients** → ваш клиент → вкладка **Credentials**
2. Скопируйте **Client secret**

### 3. Настройка контроля доступа

Вы можете контролировать доступ **одним из двух способов** (или обоими):

#### Вариант A: Через Claim (Рекомендуется)

Добавьте claim `remnawaveAccess: true` в токен:

1. Перейдите в **Clients** → ваш клиент → вкладка **Client scopes**
2. Нажмите на `<your-client-id>-dedicated`
3. Вкладка **Mappers** → **Add mapper** → **By configuration**
4. Выберите **Hardcoded claim**
5. Настройте:
   - **Name**: `remnawaveAccess`
   - **Token Claim Name**: `remnawaveAccess`
   - **Claim value**: `true`
   - **Claim JSON Type**: `boolean`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. Сохраните

#### Вариант B: Через список email-ов

Вместо настройки claim вы можете указать список разрешённых email-адресов в настройках Remnawave. Только пользователи с email из этого списка смогут войти.

## Настройки в Remnawave

| Поле | Описание |
|------|----------|
| **Keycloak Domain** | Домен сервера Keycloak без `https://` (например, `keycloak.example.com`) |
| **Frontend Domain** | Домен панели Remnawave без `https://` (например, `panel.example.com`) |
| **Realm** | Название realm в Keycloak (например, `master`) |
| **Client ID** | ID созданного клиента |
| **Client Secret** | Секрет из вкладки Credentials |
| **Allowed Emails** | Список email-адресов с разрешённым входом (опционально при использовании claim) |

## Решение проблем

### "Email is not in the allowed list and remnawaveAccess claim is not present"
Убедитесь что выполнено одно из условий:
- У пользователя настроен claim `remnawaveAccess: true` через маппер, ИЛИ
- Email пользователя добавлен в список Allowed Emails в настройках Remnawave

### "Invalid redirect URI"
Проверьте, что redirect URI точно совпадает: `https://ваш-домен-панели.com/oauth2/callback/keycloak`

### "State mismatch"
Очистите cookies браузера и попробуйте снова. Это может произойти если процесс аутентификации был прерван.

### "Invalid or missing email claim"
Убедитесь, что у пользователя указан email в Keycloak и включён scope email.
