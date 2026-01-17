## Telegram OAuth2

### 配置 Telegram 登录

要使用“通过 Telegram 登录”功能，你需要先创建一个 Telegram 机器人。
此外，还需要对该机器人进行正确配置，功能才能正常使用。

### 机器人配置

1. 打开 @BotFather（https://t.me/botfather）

2. 发送 `/mybots` 命令，并选择对应的机器人

3. 选择 `Bot settings` → `Domain`

4. 选择 `Set domain`

    然后向机器人发送用于访问 Remnawave 的域名，例如：

    ```
    https://panel.domain.com
    ```

### 访问权限配置

在填写完机器人 Token 后，需要指定允许登录的管理员 ID 列表。

1. 使用对应账号打开机器人：https://t.me/Get_myidrobot  
2. 机器人会返回你的用户 ID，将该 ID 填入对应的配置项中。

---

### 常见错误说明

#### 错误：BOT_DOMAIN_INVALID

该错误通常由机器人域名配置不正确导致。
请重新检查并按照「机器人配置」部分的步骤重新设置。

#### 错误：登录时未收到 Telegram 验证码

该问题无法通过 Remnawave 本身解决。
建议使用较早创建的 Telegram 机器人，或更换浏览器重试。

另外，也可以尝试先登录 Telegram 官方站点（例如 https://fragment.com），
因为浏览器中的 Telegram 会话是共享的，然后再尝试登录面板。
