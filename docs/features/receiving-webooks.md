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

`WEBHOOK_ENABLED` - Enable webhooks.  
`WEBHOOK_URL` - The URL to send the webhook to. (must start with https:// or http://)  
`WEBHOOK_SECRET_HEADER` - This header will be used to sign the webhook payload. (only aA-zZ, 0-9 are allowed)

### Headers

Remnawave will send the following headers with the webhook payload:

- `X-Remnawave-Signature` - The signature of the webhook payload. (signed with WEBHOOK_SECRET_HEADER)
- `X-Remnawave-Timestamp` - The timestamp of the webhook payload.

### Payload

The payload will be a JSON object with the following fields:

- `event` - The event that occurred.
- `data` - The data associated with the event. Will contain full User or Node object.
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

User payload will contain full User object.

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

activeUserInbounds: Array<{
    uuid: string
    tag: string
    type: string
    network: string | null
    security: string | null
}>
```

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

## Verify webhook

Remnawave will sign the webhook payload with the WEBHOOK_SECRET_HEADER and send it to the WEBHOOK_URL.

You can verify the webhook payload by checking the signature.

```typescript
/**
 * Webhook Headers
 */
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

### Python (Flask)

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json

app = Flask(__name__)

# Your webhook secret
WEBHOOK_SECRET = "your-secret-header"

def validate_webhook(body, signature):
    """Validate webhook signature"""
    computed_signature = hmac.new(
        WEBHOOK_SECRET.encode('utf-8'),
        json.dumps(body).encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(computed_signature, signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    # Get webhook data
    body = request.json

    # Get headers
    signature = request.headers.get('x-remnawave-signature')
    timestamp = request.headers.get('x-remnawave-timestamp')

    if not validate_webhook(body, signature):
        return jsonify({"error": "Invalid signature"}), 401

    # Process the webhook based on event
    event = body.get('event')
    data = body.get('data')

    if event.startswith('user.'):
        # Handle user events
        username = data.get('username')
        print(f"User event {event} for {username}")

        if event == 'user.created':
            # Handle user created
            pass
        elif event == 'user.expired':
            # Handle user expired
            pass

    elif event.startswith('node.'):
        # Handle node events
        node_name = data.get('name')
        print(f"Node event {event} for {node_name}")

        if event == 'node.connection_lost':
            # Handle node connection lost
            pass

    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(port=3000, debug=True)
```

### Go

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
