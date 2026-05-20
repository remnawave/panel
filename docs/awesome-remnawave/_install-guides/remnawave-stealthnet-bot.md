### 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      STEALTHNET 3.0                      │
├──────────────┬──────────────┬──────────────┬─────────────┤
│  Telegram    │  Mini App    │  Client      │  Admin      │
│  Bot         │  (WebApp)    │  Dashboard   │  Panel      │
│  Grammy      │  React       │  React       │  React      │
├──────────────┴──────────────┴──────────────┴─────────────┤
│                   Backend API (Express)                  │
│            JWT Auth  ·  Prisma ORM  ·  Webhooks          │
├──────────────────────────────────────────────────────────┤
│          PostgreSQL          │       Remnawave API       │
│            (data)            │        (VPN core)         │
├──────────────────────────────┴───────────────────────────┤
│         Nginx + Let's Encrypt  ·  Docker Compose         │
└──────────────────────────────────────────────────────────┘
```

| Service      | Technologies                                           | Purpose                                                                          |
| ------------ | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **backend**  | Node.js, Express, Prisma, PostgreSQL                   | REST API: authentication, clients, plans, payments, referrals, promos, analytics |
| **frontend** | React 18, Vite, Tailwind CSS, shadcn/ui, Framer Motion | Admin panel + client dashboard + Telegram Mini App                               |
| **bot**      | Grammy (TypeScript)                                    | Full-featured Telegram bot with client account access                            |
| **nginx**    | Nginx + Certbot                                        | Reverse proxy, SSL, static files, gzip                                           |
| **postgres** | PostgreSQL 16                                          | Data storage                                                                     |

---

### ⚙️ Features

---

#### 💳 Payments & Subscriptions

* 💰 **Platega.io** — payment processing (cards, SBP, crypto, etc.); callback URL is available in the admin panel
* 🏦 **YooMoney** — balance top-ups and plan payments via card (transfer form, HTTP notifications); webhook URL with “Copy” button in settings
* 🧾 **YooKassa** — card and SBP payments via API (RUB only); 54-FZ receipts; `payment.succeeded` webhook; webhook URL can be copied from the admin panel
* 💼 **Internal balance payments** — deposit and charge from user balance
* ⚡ **Instant activation** — plans are activated automatically via webhook after payment (Platega, YooMoney, YooKassa)
* 🏷 **Payment description branding** — all payment providers automatically insert the **service name** from admin settings (General → Service Name) into the payment description
* 🧩 **Flexible plans** — categories, duration, traffic & device limits, binding to Remnawave squads
* 🌍 **Multi-currency support** — multiple currencies (USD, RUB, etc.)

---

#### 👥 Referral Program

* 🧱 **3 referral levels** — earn from direct invites and their referrals
* 📊 **Custom percentages** — configurable per level
* 🔄 **Automatic rewards** — bonuses credited to balance after each referral payment
* 🔗 **Referral links** — for both Telegram bot and website

---

#### 🎟 Promo System

* 🆓 **Promo groups** — free subscription via link (`/start promo_CODE`) with activation limits
* 🏷 **Promo codes** — percentage or fixed discounts, plus free days
* ⏳ **Usage limits** — total limit, per-client limit, expiration date
* 📈 **Activation statistics** — usage count, who activated, when

---

#### 🚀 Trial Period

* 🎁 **Free trial** — configurable duration, traffic and device limits
* 🔒 **One-time activation** — one trial per client
* 🧭 **Dedicated squads** — separate Remnawave squad for trial users

---

#### 🔗 Remnawave Integration

* 👤 **User management** — create, delete, block users in Remnawave
* 📦 **Subscriptions** — activation, renewal, status checks
* 🖥 **Nodes** — monitoring, enable/disable, restart
* 🗂 **Squads** — user distribution across servers
* 🔄 **Two-way synchronization** — data sync (Remnawave ↔ STEALTHNET)
* 📡 **Webhooks** — automatic processing of Remnawave events

---

#### 📱 Mobile & Mini App

* 📂 **Collapsible plan categories** — on narrow screens and inside the Mini App, categories are displayed as an accordion (first open by default, others expandable)
* 🧾 **Compact plan cards** — single-column layout on mobile, slim rows (name & parameters on the left, price and “Pay” button on the right)
* 🧭 **Unified mobile interface** — bottom navigation, compact header, identical UI in mobile browser and Telegram WebApp

---

#### 📊 Analytics & Reports

* 📈 **Dashboard** — real-time key metrics
* 💵 **Revenue charts** — daily data for the last 90 days
* 👥 **Client growth** — registration dynamics
* 🏆 **Top plans** — best-selling subscriptions
* 🧮 **Referral stats** — earnings per level
* 🔁 **Conversion tracking** — trial → paid subscription
* 🗃 **Sales reports** — filtering by date and payment provider

---

#### 🔐 Security

* 🛡 **JWT authentication** — access + refresh tokens
* 🔑 **Forced password change** — on first admin login
* 📧 **Email verification** — confirmation via email link
* 🚫 **Client blocking** — with reason specification
* 🔒 **SSL/TLS** — automatic Let's Encrypt certificates
