## OAuth2：GitHub

### 创建 OAuth 应用

首先，你需要创建一个 OAuth 应用。
请通过以下链接创建应用：
[https://github.com/settings/applications/new](https://github.com/settings/applications/new)

在 `Authorization callback URL` 字段中，填写你的面板地址。

```bash
# 将 YOUR_PANEL_DOMAIN 替换为你的面板地址
https://YOUR_PANEL_DOMAIN/oauth2/callback/github
```

请务必将 `YOUR_PANEL_DOMAIN` 替换为正确的面板域名。

### Remnawave 中的 OAuth2 设置

创建 OAuth2 应用后，复制生成的 `Client ID` 和 `Client Secret`，并将它们填写到对应的配置项中。
然后，在下方填写允许登录的邮箱地址列表。
