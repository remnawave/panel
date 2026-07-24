### What it manages

- **26 resources** for users, nodes, hosts, squads, config profiles, subscriptions, billing, panel settings, API tokens, metadata, HWID devices, snippets, passkeys, and node plugins
- **23 data sources** for inventory, system and bandwidth statistics, subscriptions, connection keys, request history, passkeys, and HWID analytics
- **API token or username/password authentication**, with automatic JWT refresh for login-based sessions
- **Remnawave 2.8.x compatibility**, verified by an acceptance suite against a real panel
- **Terraform Registry documentation** indexed by [Context7](https://context7.com/batonogov/terraform-provider-remnawave) for AI coding assistants

### Quick start

Add the provider to your Terraform configuration:

```hcl
terraform {
  required_providers {
    remnawave = {
      source  = "batonogov/remnawave"
      version = "~> 0.7.0"
    }
  }
}

provider "remnawave" {
  endpoint  = "https://panel.example.com"
  api_token = var.remnawave_api_token
}

variable "remnawave_api_token" {
  type      = string
  sensitive = true
}
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
