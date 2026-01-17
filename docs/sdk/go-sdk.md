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

- **Generated with ogen**: Zero-reflection JSON decoder for high throughput
- **Type-safe**: Compile-time validation against OpenAPI 3.0 spec
- **Controller-based design**: Organized sub-clients for clean API access
- **Simplified signatures**: No verbose Params structs for simple operations
- **Context support**: First-class `context.Context` support

## Installation

```bash
go get github.com/Jolymmiles/remnawave-api-go/v2@latest
```

:::warning
Always pick and pin the correct version of the SDK to match the version of the Remnawave backend.
:::

| SDK Version | Remnawave Panel Version |
| ----------- | ----------------------- |
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
    createResp, err := client.Users().CreateUser(ctx, &remapi.CreateUserRequestDto{
        Username: "john_doe",
    })
    if err != nil {
        log.Fatal(err)
    }

    user := createResp.(*remapi.UserResponse).Response
    fmt.Printf("Created user: %s (UUID: %s)\n", user.Username, user.Uuid)

    // Disable user
    _, err = client.Users().DisableUser(ctx, user.Uuid.String())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("User disabled")

    // Enable user
    _, err = client.Users().EnableUser(ctx, user.Uuid.String())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("User enabled")

    // Delete user
    _, err = client.Users().DeleteUser(ctx, user.Uuid.String())
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
        nodeResp, _ := client.Nodes().GetOneNode(ctx, nodes[0].Uuid.String())
        node := nodeResp.(*remapi.NodeResponse).Response
        fmt.Printf("\nNode details: %s\n", node.Name)
    }
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

    switch e := resp.(type) {
    case *remapi.BadRequestError:
        fmt.Println("Validation errors:")
        for _, ve := range e.Errors {
            fmt.Printf("  - %s: %s (path: %v)\n", 
                ve.Code, ve.Message, ve.Path)
        }
    case *remapi.UnauthorizedError:
        fmt.Println("Invalid or expired token")
    case *remapi.ForbiddenError:
        fmt.Println("Access denied")
    case *remapi.NotFoundError:
        fmt.Println("Resource not found")
    case *remapi.InternalServerError:
        fmt.Printf("Server error: %s\n", e.Message.Value)
    case *remapi.UserResponse:
        fmt.Printf("User found: %s\n", e.Response.Username)
    }
}
```

</details>

## Available Controllers

| Controller | Description |
|------------|-------------|
| `client.Users()` | User management |
| `client.UsersBulkActions()` | Bulk user operations |
| `client.Nodes()` | Node management |
| `client.Hosts()` | Host management |
| `client.HostsBulkActions()` | Bulk host operations |
| `client.Auth()` | Authentication |
| `client.Subscription()` | Subscription management |
| `client.SubscriptionSettings()` | Subscription settings |
| `client.SubscriptionTemplate()` | Templates |
| `client.ConfigProfile()` | Config profiles |
| `client.InternalSquad()` | Internal squads |
| `client.ExternalSquad()` | External squads |
| `client.System()` | System info |
| `client.ApiTokens()` | API tokens |

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
