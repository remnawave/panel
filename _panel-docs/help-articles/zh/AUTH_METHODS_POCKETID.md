## OAuth2：PocketID

### 创建 OIDC 客户端

登录 PocketID 管理面板，并前往：
`Settings` → `OIDC Clients` → `Add OIDC Client`

```
# 将 YOUR_PANEL_DOMAIN 替换为你的 Remnawave 面板地址
https://YOUR_PANEL_DOMAIN/oauth2/callback/pocketid
```

### Remnawave 中的 OAuth2 设置

创建 OAuth2 应用后，复制生成的 `Client ID` 和 `Client Secret`，
并将其填写到对应的配置项中。
然后，在下方填写允许登录的邮箱地址列表。

在 `Plain Domain` 字段中，填写你的 PocketID 所在的域名。
只需要填写域名本身，不要包含路径和 `https://`，例如：
`pocketid.your-domain.com`

### 自定义声明（Custom Claims，v2.4.0+）

Remnawave 也支持通过自定义声明进行授权。
使用此方式时，无需再配置允许的邮箱地址列表。

Key

```
remnawaveAccess
```

Value

```
true
```

只要用户的令牌中包含该键值对（`remnawaveAccess: true`），即可通过授权。
