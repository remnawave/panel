# Keycloak 身份验证

Keycloak 是一个开源的身份和访问管理解决方案，提供单点登录 (SSO) 功能。

## 先决条件

1. 运行中的 Keycloak 服务器
2. 创建客户端和角色的管理员权限

## 配置步骤

### 1. 在 Keycloak 中创建客户端

1. 登录 Keycloak 管理控制台
2. 选择您的 realm（或创建新的）
3. 进入 **Clients** → **Create client**
4. 配置：
   - **Client ID**: `remnawave`（或您喜欢的名称）
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. 设置 **Valid redirect URIs**: `https://your-domain.com/oauth2/callback/keycloak`
6. 设置 **Web Origins**: `https://your-domain.com`
7. 保存客户端

### 2. 获取客户端凭据

1. 进入 **Clients** → 您的客户端 → **Credentials** 选项卡
2. 复制 **Client secret**

### 3. 创建 Admin 角色

1. 进入 **Clients** → 您的客户端 → **Roles** 选项卡
2. 点击 **Create role**
3. 名称: `admin`
4. 保存

### 4. 为用户分配角色

1. 进入 **Users** → 选择用户
2. 进入 **Role mapping** 选项卡
3. 点击 **Assign role**
4. 按客户端筛选并选择您的客户端
5. 分配 `admin` 角色

### 5. 配置角色映射器（重要！）

默认情况下，客户端角色不包含在 ID 令牌中。您需要添加映射器：

1. 进入 **Clients** → 您的客户端 → **Client scopes** 选项卡
2. 点击 `<your-client-id>-dedicated`
3. 进入 **Mappers** 选项卡 → **Add mapper** → **By configuration**
4. 选择 **User Client Role**
5. 配置：
   - **Name**: `client-roles`
   - **Client ID**: 选择您的客户端
   - **Token Claim Name**: `resource_access.${client_id}.roles`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. 保存

## Remnawave 配置

| 字段 | 描述 |
|------|------|
| **Domain** | Keycloak 服务器域名，不含 `https://`（例如 `keycloak.example.com`）|
| **Realm** | Keycloak realm 名称（例如 `master`）|
| **Client ID** | 您创建的客户端 ID |
| **Client Secret** | Credentials 选项卡中的客户端密钥 |
| **Seamless Authentication** | 启用后在登录页面自动重定向到 Keycloak |

## 无缝身份验证

启用后，用户访问登录页面时将自动重定向到 Keycloak。如果他们有活动的 Keycloak 会话，将自动登录而无需看到 Remnawave 登录表单。

## 故障排除

### "User does not have admin role"
确保用户在客户端的角色映射中分配了 `admin` 角色，而不是在 realm 角色中。

### "Invalid redirect URI"
验证 Keycloak 中的重定向 URI 完全匹配：`https://your-domain.com/oauth2/callback/keycloak`

### "State mismatch"
清除浏览器 cookies 并重试。如果身份验证流程被中断，可能会发生这种情况。
