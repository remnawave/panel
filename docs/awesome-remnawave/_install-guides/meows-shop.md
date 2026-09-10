### 🔥 Features

- 🐾 **Bot + Web Cabinet** — one backend serves a Telegram bot, a browser cabinet, a PWA and a Telegram Mini App
- 💳 **Payments** — YooKassa (with optional proxy), Platega (SBP, cards, acquiring, crypto), CryptoPay and Telegram Stars, confirmed by webhook or polling
- 🧾 **Мой Налог** — automatic receipts for self-employed sellers, with an optional proxy for servers hosted outside Russia
- 📦 **Two sales modes** — classic per-period pricing, or a tariff catalogue where every plan carries its own price, traffic limit, device count and squads
- 📱 **HWID device slots** — per-tariff device limits, purchasable extra slots, and connect-by-link/QR invites so a second phone or a TV can be added without logging into the cabinet
- 💎 **Loyalty program** — XP levels that unlock renewal discounts, recalculated from purchase history
- 🎟️ **Promo codes & referrals** — discount and bonus-day codes, referral links with rewards and statistics
- 🎡 **Fortune wheel** — configurable sector weights and rewards, daily free spin, spins paid in subscription days, live winners feed
- 💬 **Support chat** — built-in chat between users and admins right in the cabinet
- 🔔 **Lifecycle notifications** — expiring subscription reminders, "paid but never connected" nudges with a video guide button, and win-back campaigns that issue a time-limited discount code
- 🧩 **Admin panel in Telegram and browser** — users, tariffs, payments with CSV export, promo codes, loyalty, broadcasts, statistics, bot settings, infrastructure and Remnawave sync
- 🔐 **Multiple login methods** — email with verification and password reset, Google, Yandex, VK, and the Telegram Login Widget
- 🎨 **Landing page & themes** — public storefront page with tariffs, connection steps and FAQ, plus a set of seasonal and colour themes for the cabinet
- 🛰️ **Squads** — separate internal and external Remnawave squads for paid users and for trials
- 🌐 **RU / EN** — both the bot and the cabinet are fully localized

### Requirements

Linux, Docker and Docker Compose. By default the project is installed into `/opt/remnawave-telegram-shop`.

### Quick Start

Interactive installer — clones the repository, helps fill in `.env`, brings the containers up, and optionally sets up the cabinet, a reverse proxy with SSL, and smoke checks.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/MrMe0ws/remnawave-telegram-shop/main/scripts/meows-shop-setup.sh)
```

### Manual Installation

```bash
git clone https://github.com/MrMe0ws/remnawave-telegram-shop.git
cd remnawave-telegram-shop
cp .env.sample .env
# edit .env — at minimum TELEGRAM_TOKEN, REMNAWAVE_URL, REMNAWAVE_TOKEN,
# DATABASE_URL, PRICE_1…PRICE_12, ADMIN_TELEGRAM_ID, HEALTH_CHECK_PORT
docker compose up -d
```

### Update

Run from the installation directory:

```bash
cd /opt/remnawave-telegram-shop
docker compose pull
docker compose down && docker compose up -d
```

### Migration from Bedolaga

Interactive tool that moves existing users and tariffs over.

```bash
cd /opt/remnawave-telegram-shop
./scripts/meows-bedolaga-migrate.sh
```

:::tip
Remnawave `3.3.*` works with bot `5.x`. For panel `2.8.*` use bot `4.x` (frozen). Full matrix is in the repository documentation.
:::
