### Axottle

Axottle is a self-hosted control panel for infrastructure built around Remnawave. Connect several Remnawave panels, provision servers, design traffic routes and handle daily operations from one workspace.

### Key features

- **Nodes and providers** — connect existing servers over SSH or provision VPS instances through supported provider APIs; manage groups, install services and configure TLS.
- **Flow Studio** — build visual topologies with entry points, transit nodes, WARP, external HTTP proxies, CDN and routing rules; import existing Remnawave configurations and review changes before applying them.
- **Flow Guard and RescueFlow** — configure checks, conditions and recovery branches; replace nodes, transfer their role in a Flow and switch routes where supported by the provider adapter.
- **Transports and load balancing** — manage HAProxy servers and pools, OpenFlux and Telegram proxy fleets.
- **Monitoring and status** — inspect node metrics, route and TLS checks, incidents, Telegram notifications and public status pages.
- **DNS, CDN and GeoAssets** — manage Cloudflare DNS, CDN resources, SelfSteal and routing lists.
- **Subscriptions and support** — publish subscription pages and Happ themes; handle Telegram tickets, SLA, a knowledge base and an operator portal.
- **Security and backups** — manage team permissions, MFA, abuse signals, QoS and Egress Guard; schedule encrypted backups for Axottle and Remnawave with local or S3-compatible storage.
- **Telepurte** — Web SSH, an SSH bastion, temporary access links and session recordings, with Axottle sign-in and node synchronization.
- **API and MCP** — scoped access for external clients, a searchable operation catalog and on-demand schema loading.

### Installation

Use a Linux server with an amd64 or arm64 processor, a domain name and an account with root or sudo access. See the [requirements](https://docs.axottle.com/en/getting-started/requirements) before installation.

```bash
curl -fsSL https://raw.githubusercontent.com/Axottle/axottle/main/install.sh | bash
```

The interactive installer configures the panel and HTTPS, downloads matching core and engine binaries, and verifies their signatures. When setup finishes, open the displayed panel URL, create the administrator account and connect Remnawave.

- [Quick start](https://docs.axottle.com/en/getting-started/quickstart)
- [First connection](https://docs.axottle.com/en/getting-started/first-connection)
- [Documentation](https://docs.axottle.com/en)

The documentation and the panel are available in English and Russian.
