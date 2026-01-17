---
title: Response Rules
sidebar_position: 8
---

:::warning
If you are unsure about the changes you are making, please proceed with caution. Incorrect modifications can disrupt the system.
:::

Response Rules (SRR) are an ordered (top-to-bottom; if the rule applies, the evaluation stops), JSON set of rules that the backend evaluates for incoming subscription requests.

<img src={require('./images/52.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Templates menu" />

:::tip
Response Rules will override the External Squads configuration.
:::

## Create a Custom Response Rule {#custom-srr}

Let's create a custom Response Rule that will give Android user with Happ client app a custom Template, and a custom header.

It should look something like this:
1. The user requests a subscription
2. Remnawave recognizes that he's using Happ on Android.
3. Remnawave responds with a custom `Happ Android` Template and adds a custom header `HappTheBestAppOnTheWorld`. 

Here's how the rule could look:

```json
{
  "name": "Happ Android",
  "description": "Serve custom JSON for Android",
  "enabled": true,
  "operator": "AND",          // Both "user-agent" and "x-device-os" must be matched
  "conditions": [
    {
      "caseSensitive": false,
      "headerName": "user-agent",
      "operator": "CONTAINS",
      "value": "happ"
    },
    {
      "caseSensitive": false,
      "headerName": "x-device-os",
      "operator": "EQUALS",
      "value": "android"
    }
  ],
  "responseType": "XRAY_JSON",
  "responseModifications": {
    "subscriptionTemplate": "Happ Android",   // Serve the custom Template
    "headers": [                              // Serve the custom headers
    {
      "key": "x-provider-id",
      "value": "HappTheBestAppOnTheWorld"
    }
    ]
  }
}  
```

## `rules` {#rules}

Each rule is an object with the following fields:

- `name` (string) — required; 1..50 chars  
  ```json
  "name": "Block Legacy Clients"
  ```

- `description` (string) — optional; max 250 chars  
  ```json
  "description": "Blocks requests from legacy clients"
  ```

- `enabled` (boolean) — required  
  Controls whether the rule is active. When `false`, the rule is skipped during evaluation.
  ```json
  "enabled": true
  ```

- `operator` (enum) — required; `AND` or `OR`  
  ```json
  "operator": "AND" // Rule matches only if ALL conditions match
  "operator": "OR"  // Rule matches if ANY condition matches
  ```

- `conditions` (array)  
  List of conditions to evaluate.
  ```json
  "conditions": []  // Empty = match everything (use for fallback rules)
  ```

- `responseType` (enum) — required  
  Determines what response to send when the rule matches:

  | Type              | Description                            |
  |-------------------|----------------------------------------|
  | `MIHOMO`          | Mihomo YAML config                     |
  | `CLASH`           | Clash YAML config                      |
  | `STASH`           | Stash YAML config                      |
  | `SINGBOX`         | Sing-box JSON config                   |
  | `XRAY_JSON`       | Xray JSON config                       |
  | `XRAY_BASE64`     | Base64-encoded Xray config             |
  | `BROWSER`         | HTML page for browsers                 |
  | `BLOCK`           | HTTP 403 Forbidden                     |
  | `STATUS_CODE_404` | HTTP 404 Not Found                     |
  | `STATUS_CODE_451` | HTTP 451 Unavailable For Legal Reasons |
  | `SOCKET_DROP`     | Drop the socket connection             |

  
- `responseModifications` (array) - optional  
  Additional modifications to apply to the response. Can be used to give a custom Template or headers.
    
    - `subscriptionTemplate` (string) - optional  
      Define a specific Template to be given if the rule is matched.  
    - `headers` (array) - optional  
      Respond with a custom header.  
      - `key` (string) - optional  
        Header name.  
      - `value` (string) - optional  
        Header value.  
  ```json
  "responseType": "SINGBOX",
  "responseModifications": {
      "subscriptionTemplate": "Singbox Legacy",
      "headers": [
        {
          "key": "x-custom-header",
          "value": "CustomHeaderValue"
        }
      ]
  }
  ```

### `rules.conditions` {#rules.conditions}

- `headerName` (string) — required  
  The HTTP header to check. Must comply with [RFC 7230](https://www.rfc-editor.org/rfc/rfc7230).
  ```json
  "headerName": "user-agent"    // Client app user-agent
  ```
  
- `operator` (enum) — required  
  Comparison operation to perform:

  | Operator          | Description         |
  |-------------------|---------------------|
  | `EQUALS`          | Exact match         |
  | `NOT_EQUALS`      | Inverse exact match |
  | `CONTAINS`        | Substring exists    |
  | `NOT_CONTAINS`    | Substring absent    |
  | `STARTS_WITH`     | Prefix match        |
  | `NOT_STARTS_WITH` | Prefix absence      |
  | `ENDS_WITH`       | Suffix match        |
  | `NOT_ENDS_WITH`   | Suffix absence      |
  | `REGEX`           | Regular expression  |
  | `NOT_REGEX`       | Inverse regex       |

- `value` (string) — required; 1..255 chars  
  The value to compare against the header value.
  ```json
  "value": "^sfa|sfi|sfm|sft|karing|singbox|rabbithole"
  ```

- `caseSensitive` (boolean) — required  
  ```json
  "caseSensitive": true   // The value is compared as is
  "caseSensitive": false  // The value is lowercased before comparison
  ```

:::tip Serve OS-specific Templates
You can easily respond with different Templates to different OSes.  

In the example below users with iOS will get a `Happ iOS` JSON, and users with Android will get a `Happ Android` JSON.  

```json
{
  "name": "Happ Android",
  "description": "Serve custom JSON for Android",
  "enabled": true,
  "operator": "AND",
  "conditions": [
    {
      "caseSensitive": false,
      "headerName": "user-agent",
      "operator": "CONTAINS",
      "value": "happ"
    },
    {
      "caseSensitive": false,
      "headerName": "x-device-os",
      "operator": "CONTAINS",
      "value": "android"
    }
  ],
  "responseType": "XRAY_JSON",
  "responseModifications": {
    "subscriptionTemplate": "Happ Android"
  }
},
{
  "name": "Happ iOS",
  "description": "Serve custom JSON for iOS",
  "enabled": true,
  "operator": "AND",
  "conditions": [
    {
      "caseSensitive": false,
      "headerName": "user-agent",
      "operator": "CONTAINS",
      "value": "happ"
    },
    {
      "caseSensitive": false,
      "headerName": "x-device-os",
      "operator": "CONTAINS",
      "value": "ios"
    }
  ],
  "responseType": "XRAY_JSON",
  "responseModifications": {
    "subscriptionTemplate": "Happ iOS"
  }
}
```
:::

:::tip Header Resolution Rules
1. Header names are case-insensitive
   ```json
   "user-agent" === "User-Agent" === "USER-AGENT"
   ```
2. If a header has multiple values, these will be concatenated into a single string, separated by commas.
3. Missing value of the headers result in skipped rule.
:::
