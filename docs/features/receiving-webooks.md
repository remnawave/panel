---
sidebar_position: 2
slug: /features/webhooks
title: Receiving webhooks
---

## Overview

Remnawave can send webhooks for many events.

## Configuration

### .env configuration

```bash
WEBHOOK_ENABLED=true
WEBHOOK_URL=https://your-server.com/webhook
WEBHOOK_SECRET_HEADER=your-secret-header
```

| Variable                | Description                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `WEBHOOK_ENABLED`       | Enable webhooks.                                                                                                                              |
| `WEBHOOK_URL`           | The URL to send the webhook to. (must start with https:// or http://). Possible to specify multiple URLs separated by commas (without spaces) |
| `WEBHOOK_SECRET_HEADER` | This header will be used to sign the webhook payload. (only aA-zZ, 0-9 are allowed)                                                           |

### Headers

Remnawave will send the following headers with the webhook payload:

- `X-Remnawave-Signature` - The signature of the webhook payload. (signed with WEBHOOK_SECRET_HEADER)
- `X-Remnawave-Timestamp` - The timestamp of the webhook payload.

### Payload

The payload will be a JSON object.

```json title="Example webhook payload"
{
    "scope": "service",
    "event": "service.panel_started",
    "timestamp": "2026-01-07T11:57:29.426Z",
    "data": {
        "panelVersion": "2.5.0"
    }
}
```

Properties:

- `scope` - The scope of the webhook payload. (Since v2.5.0)
    - `user` - User events
    - `user_hwid_devices` - User HWID devices events
    - `node` - Node events
    - `service` - Service events
    - `crm` - Infra Billing events
    - `errors` - Errors events (reserved for future use)

- `event` - The event that occurred.
- `timestamp` - The timestamp of the webhook payload in ISO 8601 format.
- `data` - The data associated with the event.

:::tip

Detailed payload schema for each scope is available in the OpenAPI documentation.

👉 Refer to `Model Link` on each scope section below.

:::

## Scope: user

OpenAPI Model: `RemnawaveWebhookUserEventsDto`  
Model Link: https://docs.rw/api/#model/remnawavewebhookusereventsdto

Available events (`event` property):

- `user.created` - User created
- `user.modified` - User modified
- `user.deleted` - User deleted
- `user.revoked` - User revoked
- `user.disabled` - User disabled
- `user.enabled` - User enabled
- `user.limited` - User limited
- `user.expired` - User expired
- `user.traffic_reset` - User traffic reset
- `user.expires_in_72_hours` - User expires in 72 hours
- `user.expires_in_48_hours` - User expires in 48 hours
- `user.expires_in_24_hours` - User expires in 24 hours
- `user.expired_24_hours_ago` - User expired 24 hours ago
- `user.first_connected` - User first connected
- `user.bandwidth_usage_threshold_reached` - User bandwidth usage threshold reached
- `user.not_connected` - User not connected (Active only when `NOT_CONNECTED_USERS_NOTIFICATIONS_ENABLED` is true in .env.)

Remnawave Typescript SDK types:

```typescript
import { TRemnawaveWebhookUserEvent, RemnawaveWebhookUserEvents } from '@remnawave/backend-contract'
```

- `RemnawaveWebhookUserEvents` – raw Zod schema
- `TRemnawaveWebhookUserEvent` – inferred type from the schema

## Scope: user_hwid_devices

OpenAPI Model: `RemnawaveWebhookUserHwidDevicesEventsDto​`  
Model Link: https://docs.rw/api/#model/remnawavewebhookuserhwiddeviceseventsdto

Available events (`event` property):

- `user_hwid_devices.added` - User HWID device added
- `user_hwid_devices.deleted` - User HWID device deleted

Remnawave Typescript SDK types:

```typescript
import {
    TRemnawaveWebhookUserHwidDevicesEvent,
    RemnawaveWebhookUserHwidDevicesEvents
} from '@remnawave/backend-contract'
```

- `RemnawaveWebhookUserHwidDevicesEvents` – raw Zod schema
- `TRemnawaveWebhookUserHwidDevicesEvent` – inferred type from the schema

## Scope: node

OpenAPI Model: `RemnawaveWebhookServiceEventsDto​`  
Model Link: https://docs.rw/api/#model/remnawavewebhookenodeeventsdto

Available events (`event` property):

- `node.created` - Node created
- `node.modified` - Node modified
- `node.disabled` - Node disabled
- `node.enabled` - Node enabled
- `node.deleted` - Node deleted
- `node.connection_lost` - Node connection lost
- `node.connection_restored` - Node connection restored
- `node.traffic_notify` - Node traffic notify

Remnawave Typescript SDK types:

```typescript
import { TRemnawaveWebhookNodeEvent, RemnawaveWebhookNodeEvents } from '@remnawave/backend-contract'
```

- `RemnawaveWebhookNodeEvents` – raw Zod schema
- `TRemnawaveWebhookNodeEvent` – inferred type from the schema

## Scope: service

OpenAPI Model: `RemnawaveWebhookServiceEventsDto`  
Model Link: https://docs.rw/api/#model/remnawavewebhookserviceeventsdto

Available events (`event` property):

- `service.panel_started` - Panel started
- `service.login_attempt_failed` - Login attempt failed
- `service.login_attempt_success` - Login attempt success
- `service.subpage_config_changed` - Subpage config changed

Remnawave Typescript SDK types:

```typescript
import {
    TRemnawaveWebhookServiceEvent,
    RemnawaveWebhookServiceEvents
} from '@remnawave/backend-contract'
```

- `RemnawaveWebhookServiceEvents` – raw Zod schema
- `TRemnawaveWebhookServiceEvent` – inferred type from the schema

## Scope: crm

OpenAPI Model: `RemnawaveWebhookCrmEventsDto`  
Model Link: https://docs.rw/api/#model/remnawavewebhookcrmeventsdto

Available events (`event` property):

- `crm.infra_billing_node_payment_in_7_days` - Infra billing node payment in 7 days
- `crm.infra_billing_node_payment_in_48hrs` - Infra billing node payment in 48 hours
- `crm.infra_billing_node_payment_in_24hrs` - Infra billing node payment in 24 hours
- `crm.infra_billing_node_payment_due_today` - Infra billing node payment due today
- `crm.infra_billing_node_payment_overdue_24hrs` - Infra billing node payment overdue 24 hours
- `crm.infra_billing_node_payment_overdue_48hrs` - Infra billing node payment overdue 48 hours
- `crm.infra_billing_node_payment_overdue_7_days` - Infra billing node payment overdue 7 days

Remnawave Typescript SDK types:

```typescript
import { TRemnawaveWebhookCrmEvent, RemnawaveWebhookCrmEvents } from '@remnawave/backend-contract'
```

- `RemnawaveWebhookCrmEvents` – raw Zod schema
- `TRemnawaveWebhookCrmEvent` – inferred type from the schema

## Scope: errors

OpenAPI Model: `RemnawaveWebhookErrorsEventsDto`  
Model Link: https://docs.rw/api/#model/remnawavewebhookererroreventsdto

:::info

Reserved for future use.

:::

## Verify webhook

Remnawave will sign the webhook payload with the `WEBHOOK_SECRET_HEADER` and send it to the `WEBHOOK_URL`.

You can verify the webhook payload by checking the signature.

```typescript title="Webhook verification"
export interface WebhookHeaders {
	'x-remnawave-signature': string
	'x-remnawave-timestamp': string
}

validateWebhook(data: {
	body: unknown
	headers: WebhookHeaders
}): boolean {
	if (!this.webhookSecret) return false

	const signature = createHmac('sha256', this.webhookSecret)
		.update(JSON.stringify(data.body))
		.digest('hex')

	return signature === data.headers['x-remnawave-signature']
}
```

## Examples for different languages

### Python

<details>
<summary>Python sample code</summary>

```python
def validate_webhook(body, signature):
    webhook_secret_panel = "your_secret_token"
    """Validate webhook signature"""
    if isinstance(body, str):
        original_body = body
        logging.warning("Body is string, parsing for logging...")
        try:
            parsed_body = json.loads(body)
        except json.JSONDecodeError as e:
            logging.warning("Failed to parse body: %s", e)
            return False
    else:
        original_body = json.dumps(body, separators=(',', ':'))
        parsed_body = body

    computed_signature = hmac.new(
        webhook_secret_panel.encode('utf-8'),
        original_body.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(computed_signature, signature)

```

</details>

### Go

<details>
<summary>Go sample code</summary>

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
)

var webhookSecret = "your-secret-header"

type WebhookPayload struct {
    Event     string          `json:"event"`
    Data      json.RawMessage `json:"data"`
    Timestamp string          `json:"timestamp"`
}

type UserData struct {
    UUID            string `json:"uuid"`
    Username        string `json:"username"`
    Status          string `json:"status"`
    UsedTrafficBytes string `json:"usedTrafficBytes"`
    // Add other fields as needed
}

type NodeData struct {
    UUID        string `json:"uuid"`
    Name        string `json:"name"`
    IsConnected bool   `json:"isConnected"`
    // Add other fields as needed
}

func validateWebhook(body []byte, signature string) bool {
    mac := hmac.New(sha256.New, []byte(webhookSecret))
    mac.Write(body)
    expectedMAC := hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(signature), []byte(expectedMAC))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    // Read request body
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Error reading request body", http.StatusBadRequest)
        return
    }

    // Get headers
    signature := r.Header.Get("X-Remnawave-Signature")
    timestamp := r.Header.Get("X-Remnawave-Timestamp")

    // Validate signature
    if !validateWebhook(body, signature) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    // Parse payload
    var payload WebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Error parsing JSON", http.StatusBadRequest)
        return
    }

    // Handle different events
    if strings.HasPrefix(payload.Event, "user.") {
        // Parse user data
        var userData UserData
        if err := json.Unmarshal(payload.Data, &userData); err != nil {
            http.Error(w, "Error parsing user data", http.StatusBadRequest)
            return
        }

        fmt.Printf("User event %s for %s\n", payload.Event, userData.Username)

        // Handle specific user events
        switch payload.Event {
        case "user.created":
            // Handle user created
        case "user.expired":
            // Handle user expired
        }
    } else if strings.HasPrefix(payload.Event, "node.") {
        // Parse node data
        var nodeData NodeData
        if err := json.Unmarshal(payload.Data, &nodeData); err != nil {
            http.Error(w, "Error parsing node data", http.StatusBadRequest)
            return
        }

        fmt.Printf("Node event %s for %s\n", payload.Event, nodeData.Name)

        // Handle specific node events
        switch payload.Event {
        case "node.connection_lost":
            // Handle node connection lost
        case "node.connection_restored":
            // Handle node connection restored
        }
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Webhook received"))
}

func main() {
    http.HandleFunc("/webhook", webhookHandler)
    fmt.Println("Server running at http://localhost:3000")
    http.ListenAndServe(":3000", nil)
}
```

</details>
