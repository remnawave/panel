### What it manages

- **26 resources** for users, nodes, hosts, squads, config profiles, subscriptions, billing, panel settings, API tokens, metadata, HWID devices, snippets, passkeys, and node plugins
- **25 data sources** for inventory, system and bandwidth statistics, subscriptions, connection keys, request history, passkeys, and HWID analytics
- **API token or username/password authentication**, with automatic JWT refresh for login-based sessions
- **Remnawave 2.7.4–3.2.2 compatibility**, acceptance-tested against real, digest-pinned 2.7.4, 2.8.1, 3.0.0, 3.1.0, and 3.2.2 backends
- **Node IP management** on Remnawave 3.2.2 and newer
- **Terraform Registry documentation** indexed by [Context7](https://context7.com/batonogov/terraform-provider-remnawave) for AI coding assistants

### Quick start

Add the provider to your Terraform configuration:

```hcl
terraform {
  required_providers {
    remnawave = {
      source  = "batonogov/remnawave"
      version = "~> 1.4.0"
    }
  }
}
```

Keep credentials out of configuration by using environment variables:

```bash
export REMNAWAVE_ENDPOINT="https://panel.example.com"
export REMNAWAVE_API_TOKEN="..."
```

Create a Remnawave user as code:

```hcl
resource "remnawave_user" "example" {
  username               = "john-doe"
  expire_at              = "2027-01-01T00:00:00.000Z"
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
```

See the complete resource and data-source reference in the [Terraform Registry](https://registry.terraform.io/providers/batonogov/remnawave/latest).
