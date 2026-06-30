---
sidebar_position: 5
title: TypeScript SDK [community]
---

import Admonition from '@theme/Admonition';
import { FaPeopleGroup } from "react-icons/fa6";

<Admonition type="note" icon={<FaPeopleGroup />} title="Community SDK">
This SDK is fully community-maintained.
</Admonition>

Remnawave TypeScript SDK is a fully typed client for the RestAPI, built on top of `@remnawave/backend-contract`.

Unlike the official contract package, this SDK ships with a built-in HTTP client, so you can start making requests right away without wiring up Axios yourself.

✨ Key Features

- **Built-in HTTP client**: Ready to use out of the box, no need to implement your own transport.
- **Controller-based design**: Functionality is split into typed sub-clients (`client.users`, `client.nodes`, ...). Use only what you need.
- **Fully typed**: Requests and responses are typed against `@remnawave/backend-contract`.
- **Runtime validation**: Responses are validated with [Zod](https://zod.dev), throwing `RemnawaveValidationError` on schema mismatch.
- **Typed errors**: `RemnawaveApiError` exposes the HTTP status, Remnawave application error code and raw response body.
- **Reverse proxy & Zero Trust support**: Built-in options for Caddy auth token, Cloudflare Zero Trust and eGames cookie.

## Installation

```bash
npm install @mishkat/remnawave-sdk
```

:::warning
Always pick and pin the correct version of the SDK to match the version of the Remnawave backend.
:::

| SDK Version | Remnawave Panel Version |
| ----------- | ----------------------- |
| 1.5.x       | 2.8.x                   |
| 1.4.1       | 2.7.4                   |

## Quick Start

```typescript
import { RemnawaveSDK } from '@mishkat/remnawave-sdk'

const client = new RemnawaveSDK({
    panelUrl: 'https://remna.st', // or 'http://remnawave:3000' for docker network
    apiKey: 'your-api-key',

    // For Caddy reverse proxy authentication (optional)
    caddyAuthToken: 'your-caddy-token',

    // For Cloudflare Zero Trust (optional)
    cloudflareZeroTrustClientId: 'your-cf-client-id',
    cloudflareZeroTrustClientSecret: 'your-cf-client-secret',

    // eGames cookie (optional)
    eGamesCookie: 'your-egames-cookie'
})
```

## Usage

<details>
<summary>Users</summary>

```typescript
// Get all users
const users = await client.users.getAll({ start: 0, size: 25 })

// Get a single user
const userByUuid = await client.users.getByUuid('user-uuid')
const userByUsername = await client.users.getByUsername('username')
const userByTelegram = await client.users.getByTelegramId('123456789')

// Create a user
const user = await client.users.create({
    username: 'newuser',
    email: 'user@example.com'
    // ... other fields
})

// Update a user
const updated = await client.users.updateByUuidOrUsername({
    uuid: 'user-uuid',
    email: 'newemail@example.com'
})

// Lifecycle actions
await client.users.enable('user-uuid')
await client.users.disable('user-uuid')
await client.users.resetTraffic('user-uuid')
await client.users.revoke('user-uuid')
await client.users.delete('user-uuid')

// Bulk actions
await client.users.bulkDelete({ uuids: ['uuid1', 'uuid2'] })
await client.users.bulkResetTraffic({ uuids: ['uuid1', 'uuid2'] })
await client.users.bulkUpdate({ uuids: ['uuid1', 'uuid2'], updateData: { tag: 'premium' } })
```

</details>

<details>
<summary>Nodes</summary>

```typescript
// Create a node
const node = await client.nodes.create({
    name: 'Node 1',
    host: 'node.example.com',
    port: 443
    // ... other fields
})

// Read
const nodes = await client.nodes.getAll()
const one = await client.nodes.getOne('node-uuid')

// Update / lifecycle
await client.nodes.update({ uuid: 'node-uuid', name: 'Updated Node Name' })
await client.nodes.enable('node-uuid')
await client.nodes.disable('node-uuid')
await client.nodes.restart('node-uuid', { forceRestart: false })
await client.nodes.restartAll({ forceRestart: false })
await client.nodes.delete('node-uuid')

// Usage statistics
const realtime = await client.nodes.getRealtimeUsage()
const usage = await client.nodes.getUsageByRange({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
})
```

</details>

<details>
<summary>Error handling</summary>

The SDK throws two typed error classes, both exported from the package root. They extend the built-in `Error`, so existing `error instanceof Error` / `error.message` handling keeps working — while giving you structured access to the failure details.

```typescript
import {
    RemnawaveApiError,
    RemnawaveValidationError
} from '@mishkat/remnawave-sdk'

try {
    const user = await client.users.getByUuid('user-uuid')
    console.log(user)
} catch (error) {
    if (error instanceof RemnawaveApiError) {
        // Failed request (non-2xx) or network error
        console.error('Status:', error.status) // e.g. 401, 403, 404
        console.error('Error code:', error.errorCode) // e.g. "A025"
        console.error('Body:', error.data) // raw response body from the API
    } else if (error instanceof RemnawaveValidationError) {
        // The API responded, but the payload did not match the expected schema
        console.error('Validation issues:', error.issues)
    } else if (error instanceof Error) {
        console.error('Unexpected error:', error.message)
    }
}
```

</details>

## Available Controllers

| Controller | Description |
|------------|-------------|
| `client.auth` | Authentication (login, register, status) |
| `client.users` | User management and bulk actions |
| `client.nodes` | Node management and usage statistics |
| `client.hosts` | Host management and bulk actions |
| `client.system` | System stats, health and keygen |
| `client.subscription` | Single subscription info by short UUID |
| `client.subscriptions` | Subscription listing and lookup |
| `client.internalSquads` | Internal squads |
| `client.externalSquads` | External squads |
| `client.configProfiles` | Config profiles and inbounds |
| `client.keygen` | Public key retrieval |
| `client.snippets` | Snippets management |
| `client.hwid` | HWID device management |
| `client.subscriptionTemplate` | Subscription templates |
| `client.subscriptionSettings` | Subscription settings |
| `client.subscriptionRequestHistory` | Subscription request history |
| `client.infraBilling` | Infrastructure billing |

## Error Types

| Type | Thrown when |
|------|-------------|
| `RemnawaveApiError` | A request fails (non-2xx response) or the network call errors. Exposes `status`, `errorCode`, `data` and `cause`. |
| `RemnawaveValidationError` | A successful response does not match the expected schema. Exposes `issues` (the individual Zod validation issues). |

## 🛠️ Project Links

- **GitHub Repository:** [mishkatik/remnawave-sdk on GitHub](https://github.com/mishkatik/remnawave-sdk)
- **NPM:** [@mishkat/remnawave-sdk](https://www.npmjs.org/package/@mishkat/remnawave-sdk)
- **Author:** [Mishkat](https://github.com/mishkatik)
