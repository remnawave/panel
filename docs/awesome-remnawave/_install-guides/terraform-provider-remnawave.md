### What it manages

- **Resources and data sources** for users, nodes, hosts, squads, config profiles, subscriptions, billing, panel settings, API tokens, metadata, HWID devices, snippets, passkeys, and node plugins
- **Import support** for bringing existing panel objects under Terraform management
- **API token or username/password authentication**, with automatic JWT refresh for login-based sessions
- **Acceptance-tested compatibility** across multiple real, digest-pinned Remnawave backends; see the [current compatibility matrix](https://github.com/batonogov/terraform-provider-remnawave#compatibility)
- **Terraform Registry documentation** indexed by [Context7](https://context7.com/batonogov/terraform-provider-remnawave) for AI coding assistants

### Quick start

Add the provider to your Terraform configuration:

```hcl
terraform {
  required_providers {
    remnawave = {
      source  = "batonogov/remnawave"
      version = ">= 1.4.0, < 2.0.0"
    }
  }
}
```

Keep credentials out of configuration and shell history. For this tutorial,
use a token with `system:read`, `users:read`, and `users:write` scopes; a
wildcard token also works.

```bash
export REMNAWAVE_ENDPOINT="https://panel.example.com"
read -rsp "Remnawave API token: " REMNAWAVE_API_TOKEN
export REMNAWAVE_API_TOKEN
printf '\n'
```

Create a Remnawave user as code:

```hcl
resource "remnawave_user" "example" {
  username               = "john-doe"
  expire_at              = "2030-01-01T00:00:00.000Z"
  traffic_limit_bytes    = 10737418240
  traffic_limit_strategy = "MONTH"
  description            = "Managed by Terraform"
}
```

Then initialize and review the plan before applying it:

```bash
terraform init
terraform plan
terraform apply
unset REMNAWAVE_API_TOKEN
```

See the complete resource and data-source reference in the [Terraform Registry](https://registry.terraform.io/providers/batonogov/remnawave/latest).
