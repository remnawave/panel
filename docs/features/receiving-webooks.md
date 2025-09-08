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

| Variable                | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `WEBHOOK_ENABLED`       | Enable webhooks.                                                                    |
| `WEBHOOK_URL`           | The URL to send the webhook to. (must start with https:// or http://)               |
| `WEBHOOK_SECRET_HEADER` | This header will be used to sign the webhook payload. (only aA-zZ, 0-9 are allowed) |

### Headers

Remnawave will send the following headers with the webhook payload:

- `X-Remnawave-Signature` - The signature of the webhook payload. (signed with WEBHOOK_SECRET_HEADER)
- `X-Remnawave-Timestamp` - The timestamp of the webhook payload.

### Payload

The payload will be a JSON object with the following fields:

- `event` - The event that occurred.
- `data` - The data associated with the event. Will contain full User, Node or Service object.
- `timestamp` - The timestamp of the webhook payload.

### Events

#### User

- `user.created` - The user was created.
- `user.modified` - The user was modified.
- `user.deleted` - The user was deleted.
- `user.revoked` - The user was revoked.
- `user.disabled` - The user was disabled.
- `user.enabled` - The user was enabled.
- `user.limited` - The user was limited.
- `user.expired` - The user was expired.
- `user.traffic_reset` - The user's traffic was reset.
- `user.expires_in_72_hours` - The user's subscription will expire in 72 hours.
- `user.expires_in_48_hours` - The user's subscription will expire in 48 hours.
- `user.expires_in_24_hours` - The user's subscription will expire in 24 hours.
- `user.expired_24_hours_ago` - The user's subscription expired 24 hours ago.
- `user.first_connected` - The user connected to the node for the first time.
- `user.bandwidth_usage_threshold_reached` - The user's bandwidth usage threshold was reached.

User payload will contain full User object.

<details>
<summary>User object</summary>

```typescript
uuid: string
subscriptionUuid: string
shortUuid: string
username: string
status: 'DISABLED' | 'LIMITED' | 'EXPIRED' | 'ACTIVE'
usedTrafficBytes: string
lifetimeUsedTrafficBytes: string

trafficLimitBytes: string

trafficLimitStrategy: 'NO_RESET' | 'DAY' | 'WEEK' | 'MONTH'
subLastUserAgent: string | null
subLastOpenedAt: string | null

expireAt: string
onlineAt: string | null
subRevokedAt: string | null
lastTrafficResetAt: string | null

trojanPassword: string
vlessUuid: string
ssPassword: string

description: null | string
telegramId: string | null
email: string | null

hwidDeviceLimit: number | null
createdAt: string
updatedAt: string

firstConnectedAt: string | null
lastTriggeredThreshold: number

activeUserInbounds: Array<{
    uuid: string
    tag: string
    type: string
    network: string | null
    security: string | null
}>
```

</details>

#### Node

- `node.created` - Node was created.
- `node.modified` - Node was modified.
- `node.disabled` - Node was disabled.
- `node.enabled` - Node was enabled.
- `node.deleted` - Node was deleted.
- `node.connection_lost` - Node's connection was lost.
- `node.connection_restored` - Node's connection was restored.
- `node.traffic_notify` - Node reached the traffic notify limit.

Node payload will contain full Node object.

<details>
<summary>Node object</summary>

```typescript
uuid: string
name: string
address: string
port: null | number
isConnected: boolean
isConnecting: boolean
isDisabled: boolean
isNodeOnline: boolean
isXrayRunning: boolean
lastStatusChange: string | null
lastStatusMessage: string | null

xrayVersion: string | null
xrayUptime: string

usersOnline: number | null

isTrafficTrackingActive: boolean
trafficResetDay: number | null
trafficLimitBytes: string | null
trafficUsedBytes: string | null
notifyPercent: number | null

viewPosition: number
countryCode: string
consumptionMultiplier: string

cpuCount: number | null
cpuModel: string | null
totalRam: string | null

createdAt: string
updatedAt: string

excludedInbounds: Array<{
    uuid: string
    tag: string
    type: string
    network: string | null
    security: string | null
}>
```

</details>

#### Node Infra Billing

- `crm.infra_billing_node_payment_in_7_days` - Payment reminder 7 days in advance.
- `crm.infra_billing_node_payment_in_48hrs` - Payment reminder 48 hours in advance.
- `crm.infra_billing_node_payment_in_24hrs` - Payment reminder 24 hours in advance.
- `crm.infra_billing_node_payment_due_today` - Payment reminder on the due date
- `crm.infra_billing_node_payment_overdue_24hrs` - Overdue payment notification after 24 hours.
- `crm.infra_billing_node_payment_overdue_48hrs` - Overdue payment notification after 48 hours.
- `crm.infra_billing_node_payment_overdue_7_days` - Overdue payment notification after 7 days.

<details>	
<summary>Infra Billing Summary</summary>

```typescript
nodeName: string
providerName: string
loginUrl: string
nextBillingAt: date
```

</details>

#### Service

- `service.panel_started` - The service started.
- `service.login_attempt_failed` - The login attempt failed.
- `service.login_attempt_success` - The login attempt was successful.

Service payload will contain Service object.

<details>
<summary>Service object</summary>

```typescript
loginAttempt?: {
    username: string
    ip: string
    userAgent: string
    description?: string
    password?: string
}
```

</details>

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
