---
sidebar_position: 4
title: Go SDK [community]
---

import Admonition from '@theme/Admonition';
import { FaPeopleGroup } from "react-icons/fa6";

<Admonition type="note" icon={<FaPeopleGroup />} title="Community SDK">
This SDK is fully community-maintained.
</Admonition>

Remnawave Go SDK is a library for convenient interaction with the RestAPI.

✨ Key Features

- **Generated with [ogen](https://github.com/ogen-go/ogen) v1.19.0**: Zero-reflection JSON decoder for high throughput
- **Type-safe**: Compile-time validation against OpenAPI 3.0 spec
- **Controller-based design**: Organized sub-clients for clean API access
- **Simplified signatures**: No verbose Params structs for simple operations
- **Context support**: First-class `context.Context` support
- **OpenTelemetry**: Built-in tracing instrumentation
- **Request options**: Per-request customization via `...RequestOption`
- **Editors**: Request/response middleware support

## Installation

```bash
go get github.com/Jolymmiles/remnawave-api-go/v2@latest
```

:::warning
Always pick and pin the correct version of the SDK to match the version of the Remnawave backend.
:::

| SDK Version | Remnawave Panel Version |
| ----------- | ----------------------- |
| v2.6.1      | 2.6.1                   |
| v2.5.3      | 2.5.3                   |
| v2.3.0-6    | 2.3.0                   |
| v2.2.6-3    | 2.2.6                   |

## Usage

<details>
<summary>Basic example</summary>

```go
package main

import (
    "context"
    "fmt"
    "log"

    remapi "github.com/Jolymmiles/remnawave-api-go/v2/api"
)

func main() {
    ctx := context.Background()

    // Create base client
    baseClient, err := remapi.NewClient(
        "https://your-panel.example.com",
        remapi.StaticToken{Token: "YOUR_API_TOKEN"},
    )
    if err != nil {
        log.Fatal(err)
    }

    // Wrap with organized sub-clients
    client := remapi.NewClientExt(baseClient)

    // Get user by UUID - simplified signature
    resp, err := client.Users().GetUserByUuid(ctx, "user-uuid-here")
    if err != nil {
        log.Fatal(err)
    }

    switch r := resp.(type) {
    case *remapi.UserResponse:
        fmt.Printf("User: %s\n", r.Response.Username)
    case *remapi.NotFoundError:
        fmt.Println("User not found")
    case *remapi.BadRequestError:
        fmt.Printf("Validation error: %v\n", r.Errors)
    }
}
```

</details>

<details>
<summary>Create and manage users</summary>

```go
package main

import (
    "context"
    "fmt"
    "log"

    remapi "github.com/Jolymmiles/remnawave-api-go/v2/api"
)

func main() {
    ctx := context.Background()

    baseClient, _ := remapi.NewClient(
        "https://your-panel.example.com",
        remapi.StaticToken{Token: "YOUR_API_TOKEN"},
    )
    client := remapi.NewClientExt(baseClient)

    // Create user
    createResp, err := client.Users().CreateUser(ctx, &remapi.CreateUserRequest{
        Username: "john_doe",
    })
    if err != nil {
        log.Fatal(err)
    }

    user := createResp.(*remapi.UserResponse).Response
    fmt.Printf("Created user: %s (UUID: %s)\n", user.Username, user.UUID)

    // Disable user
    _, err = client.Users().DisableUser(ctx, user.UUID.String())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("User disabled")

    // Enable user
    _, err = client.Users().EnableUser(ctx, user.UUID.String())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("User enabled")

    // Delete user
    _, err = client.Users().DeleteUser(ctx, user.UUID.String())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("User deleted")
}
```

</details>

<details>
<summary>Node management</summary>

```go
package main

import (
    "context"
    "fmt"
    "log"

    remapi "github.com/Jolymmiles/remnawave-api-go/v2/api"
)

func main() {
    ctx := context.Background()

    baseClient, _ := remapi.NewClient(
        "https://your-panel.example.com",
        remapi.StaticToken{Token: "YOUR_API_TOKEN"},
    )
    client := remapi.NewClientExt(baseClient)

    // Get all nodes
    nodesResp, err := client.Nodes().GetAllNodes(ctx)
    if err != nil {
        log.Fatal(err)
    }

    nodes := nodesResp.(*remapi.NodesResponse).Response
    fmt.Printf("Total nodes: %d\n", len(nodes))

    for _, node := range nodes {
        fmt.Printf("  - %s (%s): connected=%v\n",
            node.Name, node.Address, node.IsConnected)
    }

    // Get single node
    if len(nodes) > 0 {
        nodeResp, _ := client.Nodes().GetOneNode(ctx, nodes[0].UUID.String())
        node := nodeResp.(*remapi.NodeResponse).Response
        fmt.Printf("\nNode details: %s\n", node.Name)
    }
}
```

</details>

<details>
<summary>Pagination</summary>

```go
package main

import (
    "context"
    "fmt"
    "log"

    remapi "github.com/Jolymmiles/remnawave-api-go/v2/api"
)

func main() {
    ctx := context.Background()

    baseClient, _ := remapi.NewClient(
        "https://your-panel.example.com",
        remapi.StaticToken{Token: "YOUR_API_TOKEN"},
    )
    client := remapi.NewClientExt(baseClient)

    // Use PaginationHelper for iterating through pages
    pager := remapi.NewPaginationHelper(50) // 50 items per page

    for pager.HasMore {
        resp, err := client.Users().GetAllUsers(ctx,
            pager.Limit,  // size
            pager.Offset, // start
        )
        if err != nil {
            log.Fatal(err)
        }

        users := resp.(*remapi.GetAllUsersResponse)
        for _, user := range users.Response.Users {
            fmt.Printf("User: %s (UUID: %s)\n", user.Username, user.UUID)
        }

        // Advance to next page
        pager.SetTotal(int(users.Response.Total))
        pager.NextPage()
    }

    fmt.Printf("Total users: %d\n", *pager.Total)
}
```

</details>

<details>
<summary>Error handling</summary>

```go
package main

import (
    "context"
    "fmt"
    "log"

    remapi "github.com/Jolymmiles/remnawave-api-go/v2/api"
)

func main() {
    ctx := context.Background()

    baseClient, _ := remapi.NewClient(
        "https://your-panel.example.com",
        remapi.StaticToken{Token: "YOUR_API_TOKEN"},
    )
    client := remapi.NewClientExt(baseClient)

    resp, err := client.Users().GetUserByUuid(ctx, "invalid-uuid")
    if err != nil {
        log.Fatal("Network error:", err)
    }

    // Available error types depend on the endpoint — check the generated
    // Res interface (e.g. UsersGetUserByUuidRes) for the full list.
    switch e := resp.(type) {
    case *remapi.UserResponse:
        fmt.Printf("User found: %s\n", e.Response.Username)
    case *remapi.BadRequestError:
        fmt.Println("Validation errors:")
        for _, ve := range e.Errors {
            fmt.Printf("  - %s: %s (path: %v)\n",
                ve.Code, ve.Message, ve.Path)
        }
    case *remapi.NotFoundError:
        fmt.Println("Resource not found")
    case *remapi.InternalServerError:
        fmt.Printf("Server error: %s\n", e.Message.Value)
    }
}
```

</details>

## Available Controllers

| Controller | Description |
|------------|-------------|
| `client.ApiTokens()` | API token management |
| `client.Auth()` | Authentication |
| `client.BandwidthStatsNodes()` | Node bandwidth statistics |
| `client.BandwidthStatsUsers()` | User bandwidth statistics |
| `client.ConfigProfile()` | Config profiles |
| `client.ExternalSquad()` | External squads |
| `client.Hosts()` | Host management |
| `client.HostsBulkActions()` | Bulk host operations |
| `client.HwidUserDevices()` | HWID devices |
| `client.InfraBilling()` | Infrastructure billing |
| `client.InternalSquad()` | Internal squads |
| `client.Keygen()` | Key generation |
| `client.Nodes()` | Node management |
| `client.NodesUsageHistory()` | Node usage history |
| `client.Passkey()` | Passkey authentication |
| `client.RemnawaveSettings()` | Panel settings |
| `client.Snippets()` | Code snippets |
| `client.Subscription()` | Subscription management |
| `client.SubscriptionPageConfig()` | Subscription page config |
| `client.SubscriptionSettings()` | Subscription settings |
| `client.SubscriptionTemplate()` | Subscription templates |
| `client.Subscriptions()` | Multiple subscriptions |
| `client.System()` | System info |
| `client.UserSubscriptionRequestHistory()` | Request history |
| `client.Users()` | User management |
| `client.UsersBulkActions()` | Bulk user operations |

## Error Types

| Type | HTTP Status | Description |
|------|-------------|-------------|
| `BadRequestError` | 400 | Validation errors with details |
| `UnauthorizedError` | 401 | Authentication required |
| `ForbiddenError` | 403 | Access denied |
| `NotFoundError` | 404 | Resource not found |
| `InternalServerError` | 500 | Server error |

## 🛠️ Project Links

- **GitHub Repository:** [remnawave-api-go on GitHub](https://github.com/Jolymmiles/remnawave-api-go)
- **Author:** [Jolymmiles](https://github.com/Jolymmiles)
