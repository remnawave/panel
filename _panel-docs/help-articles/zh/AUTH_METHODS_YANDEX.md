## OAuth2：Yandex

不推荐使用 Yandex 的身份验证方式。

### 创建 OAuth 应用

你需要在 Yandex 中创建一个 OAuth 应用。

点击此链接创建应用： [https://oauth.yandex.com/client/new](https://oauth.yandex.com/client/new)

在创建应用的第二步中，选择 “Web application”（网页应用）选项，并填写 `Callback URL`

```
# 将 YOUR_PANEL_DOMAIN 替换为你的 Remnawave 面板地址
https://YOUR_PANEL_DOMAIN/oauth2/callback/yandex
```

别忘了将 `YOUR_PANEL_DOMAIN` 替换为正确的面板域名。

在创建的第三步中 —— 请确保勾选  “Access to email address”（访问邮箱地址），不需要其他权限。
