## Headers

Headers are HTTP headers that are sent along with the subscription (response).

In Remnawave, you can use the `rwEncodeBase64:` key to encode a header value in base64.

Below is a list of popular headers. Some of them are configured by default.

### profile-title

A header that is mainly used to display the profile name in the client application.

Key: `profile-title`

Example value: `rwEncodeBase64:My awesome subscription`

Default value: `rwEncodeBase64:Remnawave`

### profile-web-page-url

Used to display a link to the profile web page in the client application.

Key: `profile-web-page-url`

Example value: `rwEncodeBase64:https://dummy.docs.rw`

Default value: `rwEncodeBase64:{{SUBSCRIPTION_URL}}`

### profile-update-interval

Used to set the subscription update interval in the client application.

Key: `profile-update-interval`

Example value: `1`

Default value: `12`

### support-url

Used to set the support link in the client application.

Key: `support-url`

Example value: `https://dummy.docs.rw`

Default value: `https://dummy.docs.rw`

## Variables in header values

Any header value can contain template variables — for example `{{USERNAME}}` or `{{SUBSCRIPTION_URL}}`. They are replaced with the user's data before the response is sent.

### The `{{STATUS}}` variable

Inserts the user's subscription status.

| Status     | Default value |
| ---------- | ------------- |
| `ACTIVE`   | `Active`      |
| `EXPIRED`  | `Expired`     |
| `LIMITED`  | `Limited`     |
| `DISABLED` | `Disabled`    |

Example value: `rwEncodeBase64:Your subscription: {{STATUS}}`

### The `{{RESET_STRATEGY}}` variable

Inserts the traffic reset strategy. By default the value itself is printed: `NO_RESET`, `DAY`, `WEEK`, `MONTH` or `MONTH_ROLLING`.

Example value: `rwEncodeBase64:Reset: {{RESET_STRATEGY}}`

### Custom labels

Labels can be overridden right in the header value by listing `VALUE=label` pairs separated by `|`. Overriding is supported by `{{STATUS}}` and `{{RESET_STRATEGY}}`.

Example value: `rwEncodeBase64:Your subscription is {{STATUS:ACTIVE=✅ Active|EXPIRED=😓 Expired}}`

Result for an active user: `Your subscription is ✅ Active`

Example value: `rwEncodeBase64:Reset: {{RESET_STRATEGY:NO_RESET=never|MONTH=once a month}}`

Result for a monthly reset: `Reset: once a month`

Rules:

- Pairs are separated by `|`.
- A value is split from its label at the first `=`, and the variable name at the first colon. That means both `=` and `:` are allowed inside a label: `{{STATUS:ACTIVE=Status: active}}`.
- Whitespace inside a label is preserved as is, including a leading space.
- Listing every value is optional — the ones you omit keep their default label.
- An unknown value (a typo such as `ACTIVEE=`) is ignored, and the default label is used.
- The characters `|`, `{` and `}` cannot be used inside a label.

> ⚠️ Emoji, Cyrillic and any other non-ASCII characters are only allowed together with `rwEncodeBase64:`. HTTP headers cannot carry such characters directly, and without encoding the subscription will not be served. Stick to Latin characters if `rwEncodeBase64:` is not used.
