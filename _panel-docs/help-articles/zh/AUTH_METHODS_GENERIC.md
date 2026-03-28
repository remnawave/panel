# Generic OAuth2 身份验证

Generic OAuth2 允许您将任何兼容 OAuth2 的身份提供商连接到 Remnawave。当您想使用没有专门集成的提供商时（如 Authentik、Authelia、Zitadel、Google、Microsoft 等），这非常有用。

## 前提条件

1. 兼容 OAuth2 的身份提供商
2. 创建 OAuth2 客户端/应用程序的管理员权限
3. 提供商必须支持令牌中的 `email` 声明

## 配置步骤

### 1. 在您的提供商中创建 OAuth2 应用程序

具体步骤因提供商而异，但通常您需要：

1. 登录到您的身份提供商管理控制台
2. 创建新的 OAuth2/OIDC 应用程序
3. 配置：
    - **应用程序类型**：Web Application
    - **授权类型**：Authorization Code
    - **重定向 URI**：`https://your-panel-domain.com/oauth2/callback/generic`
4. 记下 **Client ID** 和 **Client Secret**
5. 找到提供商的 **Authorization URL** 和 **Token URL**（通常在文档或 well-known 端点中）

### 2. 查找提供商 URL

大多数提供商都记录了这些端点。常见模式：

| 提供商    | Authorization URL                                                  | Token URL                                                      |
| --------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Google    | `https://accounts.google.com/o/oauth2/v2/auth`                     | `https://oauth2.googleapis.com/token`                          |
| Microsoft | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize` | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| Authentik | `https://your-authentik.com/application/o/authorize/`              | `https://your-authentik.com/application/o/token/`              |
| Authelia  | `https://your-authelia.com/api/oidc/authorization`                 | `https://your-authelia.com/api/oidc/token`                     |
| Zitadel   | `https://your-zitadel.com/oauth/v2/authorize`                      | `https://your-zitadel.com/oauth/v2/token`                      |

### 3. PKCE 支持

**PKCE（Proof Key for Code Exchange）** 为 OAuth2 流程添加了额外的安全层。在以下情况下启用此选项：

- 您的提供商支持 PKCE（大多数现代提供商都支持）
- 您希望增强对授权码拦截攻击的保护
- 您的提供商要求公共客户端使用 PKCE

> **建议**：如果您的提供商支持 PKCE，请启用它。

## Remnawave 配置

| 字段                  | 描述                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| **Client ID**         | 来自您的 OAuth2 提供商的客户端/应用程序 ID                           |
| **Client Secret**     | 来自您的 OAuth2 提供商的客户端密钥                                   |
| **Authorization URL** | OAuth2 授权端点 URL（例如 `https://provider.com/oauth2/authorize`）  |
| **Token URL**         | OAuth2 令牌端点 URL（例如 `https://provider.com/oauth2/token`）      |
| **Frontend Domain**   | 您的 Remnawave 面板域名，不带 `https://`（例如 `panel.example.com`） |
| **With PKCE**         | 启用 PKCE（Proof Key for Code Exchange）以增强安全性                 |
| **Allowed Emails**    | 允许登录的电子邮件地址列表                                           |

## 访问控制

您可以使用**以下两种方法之一**（或两者同时使用）来控制访问：

### 选项 A：使用 Allowed Emails

在 Remnawave 设置中指定允许的电子邮件地址列表。只有电子邮件在此列表中的用户才能登录。

### 选项 B：使用自定义声明

如果 **Allowed Emails** 列表为空，Remnawave 将检查令牌中的自定义声明：

| 键                | 值     |
| ----------------- | ------ |
| `remnawaveAccess` | `true` |

如果用户的令牌包含 `remnawaveAccess: true`，他们将被授权。

> **注意**：您需要配置您的身份提供商以在令牌中包含此自定义声明。具体步骤因提供商而异——通常通过"映射器"、"声明"或"令牌自定义"设置完成。

## 故障排除

### "Invalid redirect URI"

验证您的提供商中的重定向 URI 完全匹配：`https://your-panel-domain.com/oauth2/callback/generic`

### "Invalid or missing email claim"

确保：

- 用户在您的提供商中设置了电子邮件地址
- 已请求并授予 `email` 作用域
- 您的提供商在令牌中包含 `email` 声明

### "State mismatch"

清除浏览器 Cookie 并重试。如果身份验证流程被中断，可能会发生这种情况。

### "Token exchange failed"

验证：

- **Token URL** 正确
- **Client ID** 和 **Client Secret** 正确
- 您的提供商的令牌端点可从 Remnawave 服务器访问

### "Access denied"

用户的电子邮件不在 **Allowed Emails** 列表中。添加他们的电子邮件地址以授予访问权限。

### PKCE 相关错误

如果您收到与 `code_verifier` 或 `code_challenge` 相关的错误：

- 如果您的提供商不支持 PKCE，请尝试禁用 **With PKCE**
- 或者如果您的提供商要求使用 PKCE，请启用它
