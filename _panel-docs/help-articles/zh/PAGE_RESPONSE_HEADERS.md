## 响应头（Headers）

响应头（Headers）是随订阅（响应）一起发送的 HTTP 头部。

在 Remnawave 中，你可以使用 `rwEncodeBase64:` 键将头部的值编码为 base64。

下面列出了一些常用的头部，其中一部分已默认配置。

### profile-title

主要用于在客户端中显示配置文件名称的头部。

键: `profile-title`

示例值: `rwEncodeBase64:我的超棒订阅`

默认值: `rwEncodeBase64:Remnawave`

### profile-web-page-url

用于在客户端中显示配置文件网页的链接。

键: `profile-web-page-url`

示例值: `rwEncodeBase64:https://dummy.docs.rw`

默认值: `rwEncodeBase64:{{SUBSCRIPTION_URL}}`

### profile-update-interval

用于设置客户端中的订阅更新间隔。

键: `profile-update-interval`

示例值: `1`

默认值: `12`

### support-url

用于设置客户端中的支持链接。

键: `support-url`

示例值: `https://dummy.docs.rw`

默认值: `https://dummy.docs.rw`

## 头部值中的模板变量

任何头部的值都可以使用模板变量，例如 `{{USERNAME}}` 或 `{{SUBSCRIPTION_URL}}`。在发送响应之前，它们会被替换为该用户的数据。

### `{{STATUS}}` 变量

用于插入用户的订阅状态。

| 状态       | 默认值     |
| ---------- | ---------- |
| `ACTIVE`   | `Active`   |
| `EXPIRED`  | `Expired`  |
| `LIMITED`  | `Limited`  |
| `DISABLED` | `Disabled` |

示例值: `rwEncodeBase64:你的订阅: {{STATUS}}`

### `{{RESET_STRATEGY}}` 变量

用于插入流量重置策略。默认输出值本身：`NO_RESET`、`DAY`、`WEEK`、`MONTH` 或 `MONTH_ROLLING`。

示例值: `rwEncodeBase64:重置: {{RESET_STRATEGY}}`

### 自定义名称

可以直接在头部值中覆盖名称，用 `|` 分隔多组 `值=名称`。`{{STATUS}}` 和 `{{RESET_STRATEGY}}` 支持覆盖。

示例值: `rwEncodeBase64:你的订阅 {{STATUS:ACTIVE=✅ 有效|EXPIRED=😓 已过期}}`

对活跃用户的结果: `你的订阅 ✅ 有效`

示例值: `rwEncodeBase64:重置: {{RESET_STRATEGY:NO_RESET=不重置|MONTH=每月一次}}`

按月重置时的结果: `重置: 每月一次`

规则：

- 各组之间用 `|` 分隔。
- 值与名称按第一个 `=` 分隔，变量名按第一个冒号分隔。因此名称中可以包含 `=` 和 `:`：`{{STATUS:ACTIVE=状态: 有效}}`。
- 名称中的空格会原样保留，包括开头的空格。
- 不必列出全部值，未指定的将保留默认名称。
- 未知值（例如拼写错误的 `ACTIVEE=`）会被忽略，并使用默认名称。
- 名称中不能使用 `|`、`{` 和 `}`。

> ⚠️ 表情符号、中文以及其他任何非 ASCII 字符只能与 `rwEncodeBase64:` 一起使用。HTTP 头部无法直接传输这类字符，未经编码将导致订阅无法下发。如果不使用 `rwEncodeBase64:`，请仅使用拉丁字符。
