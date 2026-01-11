# Аутентификация через Keycloak

Keycloak - это решение для управления идентификацией и доступом с поддержкой Single Sign-On (SSO).

## Требования

1. Работающий сервер Keycloak
2. Доступ администратора для создания клиентов и ролей

## Шаги настройки

### 1. Создание клиента в Keycloak

1. Войдите в Keycloak Admin Console
2. Выберите realm (или создайте новый)
3. Перейдите в **Clients** → **Create client**
4. Настройте:
   - **Client ID**: `remnawave` (или другое имя)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. **Valid redirect URIs**: `https://ваш-домен.com/oauth2/callback/keycloak`
6. **Web Origins**: `https://ваш-домен.com`
7. Сохраните клиент

### 2. Получение Client Secret

1. Перейдите в **Clients** → ваш клиент → вкладка **Credentials**
2. Скопируйте **Client secret**

### 3. Создание роли Admin

1. Перейдите в **Clients** → ваш клиент → вкладка **Roles**
2. Нажмите **Create role**
3. Имя: `admin`
4. Сохраните

### 4. Назначение роли пользователю

1. Перейдите в **Users** → выберите пользователя
2. Вкладка **Role mapping**
3. Нажмите **Assign role**
4. Отфильтруйте по клиентам и выберите ваш клиент
5. Назначьте роль `admin`

### 5. Настройка маппера ролей (Важно!)

По умолчанию роли клиента не включаются в ID токен. Нужно добавить маппер:

1. Перейдите в **Clients** → ваш клиент → вкладка **Client scopes**
2. Нажмите на `<your-client-id>-dedicated`
3. Вкладка **Mappers** → **Add mapper** → **By configuration**
4. Выберите **User Client Role**
5. Настройте:
   - **Name**: `client-roles`
   - **Client ID**: выберите ваш клиент
   - **Token Claim Name**: `resource_access.${client_id}.roles`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. Сохраните

## Настройки в Remnawave

| Поле | Описание |
|------|----------|
| **Domain** | Домен Keycloak без `https://` (например, `keycloak.example.com`) |
| **Realm** | Название realm в Keycloak (например, `master`) |
| **Client ID** | ID созданного клиента |
| **Client Secret** | Секрет из вкладки Credentials |
| **Seamless Authentication** | Включите для автоматического перенаправления на Keycloak |

## Бесшовная аутентификация

При включении пользователи будут автоматически перенаправлены на Keycloak при посещении страницы входа. Если у них есть активная сессия Keycloak, они войдут автоматически.

## Решение проблем

### "User does not have admin role"
Убедитесь, что роль `admin` назначена в ролях клиента, а не в ролях realm.

### "Invalid redirect URI"
Проверьте, что redirect URI точно совпадает: `https://ваш-домен.com/oauth2/callback/keycloak`

### "State mismatch"
Очистите cookies браузера и попробуйте снова.
