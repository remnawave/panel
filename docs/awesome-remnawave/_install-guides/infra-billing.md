### Key Features

- **Multi-provider support** — Timeweb Cloud, Hetzner Cloud, netcup, HostBill, ISPsystem BILLmanager, Selectel, 4VPS.SU, Netlen, Beget Cloud, Porkbun, Vultr, Linode, Aeza, Cloudflare, plus manual entries
- **Automated syncing** — balances, account currency, resource lists, billing dates, and daily snapshots via provider APIs
- **Payment imports** — transaction history where the provider API exposes it; manual entries via journal
- **Analytics & forecasting** — monthly/yearly expenses, breakdowns by provider/country/type/currency, and upcoming charges
- **Multi-currency** — automatic conversion (Central Bank of Russia rates) or manual rates
- **Telegram alerts** — low balance, upcoming charges, and sync errors
- **Secure by design** — password and/or passkey (WebAuthn) auth, provider tokens encrypted with AES-256-GCM

### Installation (production)

Requirements: Docker + the Docker Compose plugin, a domain, and a reverse proxy with TLS in front (login does not work without HTTPS — the session cookie is `Secure`). The image is pulled from GHCR (`ghcr.io/mishkatik/infra-billing`).

```bash
# 1. Directory
mkdir -p /opt/infra-billing && cd /opt/infra-billing

# 2. Download the prod compose file and the example config into .env
curl -fsSL -o docker-compose.yml https://raw.githubusercontent.com/mishkatik/infra-billing/main/docker-compose-prod.yml
curl -fsSL -o .env https://raw.githubusercontent.com/mishkatik/infra-billing/main/.env.example

# 3. Generate the encryption key (GNU sed; '#' separator because base64 can contain '/')
sed -i "s#^ENCRYPTION_KEY=.*#ENCRYPTION_KEY=$(openssl rand -base64 32)#" .env

# 4. Database password — the same value in POSTGRES_PASSWORD and in DATABASE_URL
pw=$(openssl rand -hex 24) && sed -i "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$pw/" .env && sed -i "s|^\(DATABASE_URL=\"postgresql://infra:\)[^\@]*\(@.*\)|\1$pw\2|" .env

# 5. Start (migrations run on startup)
docker compose up -d && docker compose logs -f
```

On first open the panel shows a registration screen — create the owner account (login + password; a passkey can be added later). The panel comes up on `127.0.0.1:8080`; put a reverse proxy with TLS in front of it.

### Reverse proxy + TLS (required)

The container only listens on `127.0.0.1:8080`, so it is not exposed directly. Put a reverse proxy in front that terminates TLS. **Login will not work without HTTPS** (the session cookie is marked `Secure`).

[Caddy](https://caddyserver.com) example (issues the certificate automatically):

```caddy
billing.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

### Updating

```bash
cd /opt/infra-billing && docker compose pull && docker compose down && docker compose up -d && docker compose logs -f
```
