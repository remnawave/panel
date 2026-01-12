# Keycloak 身份验证

Keycloak 是一个开源的身份和访问管理解决方案，提供单点登录 (SSO) 功能。

## 先决条件

1. 运行中的 Keycloak 服务器
2. 创建客户端的管理员权限

## 配置步骤

### 1. 在 Keycloak 中创建客户端

1. 登录 Keycloak 管理控制台
2. 选择您的 realm（或创建新的）
3. 进入 **Clients** → **Create client**
4. 配置：
   - **Client ID**: `remnawave`（或您喜欢的名称）
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. 设置 **Valid redirect URIs**: `https://your-panel-domain.com/oauth2/callback/keycloak`
6. 设置 **Web Origins**: `https://your-panel-domain.com`
7. 保存客户端

### 2. 获取客户端凭据

1. 进入 **Clients** → 您的客户端 → **Credentials** 选项卡
2. 复制 **Client secret**

### 3. 配置访问控制

您可以使用**以下两种方法之一**（或同时使用）控制访问：

#### 选项 A：使用 Claim（推荐）

在令牌中添加自定义 claim `remnawaveAccess: true`：

1. 进入 **Clients** → 您的客户端 → **Client scopes** 选项卡
2. 点击 `<your-client-id>-dedicated`
3. 进入 **Mappers** 选项卡 → **Add mapper** → **By configuration**
4. 选择 **Hardcoded claim**
5. 配置：
   - **Name**: `remnawaveAccess`
   - **Token Claim Name**: `remnawaveAccess`
   - **Claim value**: `true`
   - **Claim JSON Type**: `boolean`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. 保存

#### 选项 B：使用允许的邮箱列表

您可以在 Remnawave 设置中指定允许的邮箱地址列表，而不是配置 claim。只有邮箱在此列表中的用户才能登录。

## Remnawave 配置

| 字段 | 描述 |
|------|------|
| **Keycloak Domain** | Keycloak 服务器域名，不含 `https://`（例如 `keycloak.example.com`）|
| **Frontend Domain** | Remnawave 面板域名，不含 `https://`（例如 `panel.example.com`）|
| **Realm** | Keycloak realm 名称（例如 `master`）|
| **Client ID** | 您创建的客户端 ID |
| **Client Secret** | Credentials 选项卡中的客户端密钥 |
| **Allowed Emails** | 允许登录的邮箱地址列表（使用 claim 时可选）|

## 故障排除

### "Email is not in the allowed list and remnawaveAccess claim is not present"
请确保满足以下条件之一：
- 用户通过 mapper 配置了 `remnawaveAccess: true` claim，或
- 用户的邮箱已添加到 Remnawave 设置的 Allowed Emails 列表中

### "Invalid redirect URI"
验证 Keycloak 中的重定向 URI 完全匹配：`https://your-panel-domain.com/oauth2/callback/keycloak`

### "State mismatch"
清除浏览器 cookies 并重试。如果身份验证流程被中断，可能会发生这种情况。

### "Invalid or missing email claim"
确保用户在 Keycloak 中设置了邮箱地址，并启用了 email scope。
