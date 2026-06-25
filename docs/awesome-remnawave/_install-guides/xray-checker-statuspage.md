### Key Features

- **Single static Go binary** – serves the status page, polls Xray Checker, and runs the Telegram bot; deployed as a tiny `distroless/static` image.
- **Built on Xray Checker** – reuses xray-checker's cached results and keeps the original status-page look; sub-server grouping and global-outage filtering included.
- **Fully managed from Telegram** – everything is controlled with inline buttons (`/menu`), no slash-command juggling. The panel lives in a single edited message.
- **Incidents & scheduled maintenance** – create and display incidents and planned works directly on the page.
- **Uptime history** – multi-day uptime per server with anti-fingerprint rendering.
- **Per-server visibility** – hide or show individual servers on the public page from the bot.
- **Admin alerts in DM** – server down/up, global checker outage, high-ping threshold, and a daily summary in the service timezone.
- **HTTPS handled for you** – set a domain in the bot and it brings up HTTPS automatically: self-signed (Cloudflare Full), Cloudflare Origin Certificate, or Let's Encrypt.
- **Local country flags** – embedded SVGs served from the app, so they work behind blocks without any external CDN.
- **Storage** – SQLite by default, or PostgreSQL.
- **Self-update** – pulls new builds over HTTPS with SHA256 verification (for bare-metal); in Docker just update the image.
