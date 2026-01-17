---
title: Initial Setup
sidebar_position: 0
---

import DocCard from '@theme/DocCard';

In this guide, we'll walk you through the essential features of the Remnawave Panel, helping you get up and running quickly.  
We will cover every step, from your first login to the Panel to importing a subscription into a client application.

:::warning Note

- This guide is written for Panel **version 2.0** and newer.
- This guide also assumes that you have already installed Remnawave and its components.
- Some UI elements have changed their appearance in recent updates, but don’t worry — the functionality is largely unchanged, and this guide remains up to date.
  :::

## Getting Started {#first-steps}

After you've installed the Panel and its necessary components, the admin interface will be accessible through browser — navigate to the domain you've assigned the Panel to.

<img src={require('./images/1.webp').default} width="100%" style={{borderRadius: '8px'}} alt="First steps" />

First, you need to create a user. The first user to register automatically becomes the "super-admin."

:::tip Tip
If you ever forget your password, you can always recreate the super-admin account using the Rescue CLI.

To access the Rescue CLI, use the command: `docker exec -it remnawave remnawave`
:::

## Home Page {#home}

After registration, you will be taken to the main dashboard.

<img src={require('./images/2.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Home page" />

Let's break down the elements on this page.

### Remnawave Statistics {#remnawave-stats}

<img src={require('./images/3.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Remnawave stats"/>

The first two blocks, `Remnawave Usage` and `Process Details`, show you how Remnawave is currently utilizing system resources.  
In `Process Details`, you can see which internal Remnawave processes are consuming the most resources.
Depending on your configuration, there may be more than one REST-API process.

### Bandwidth Usage {#bandwidth}

<img src={require('./images/4.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Traffic usage"/>

This block displays overall traffic usage statistics for all users, with a comparison to the previous equivalent period.
For example, let's consider the `Today` metric. If you open the Panel at 4:00 PM, this block will show statistics from 12:00 AM to 4:00 PM today. However, the comparison will be against the _entire_ previous calendar day (from 12:00 AM to 11:59 PM).

Currently, the screenshot shows all zeros, but after we configure everything and connect a user, this block will reflect real data.

### Users {#home-users}

<img src={require('./images/5.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Users"/>

1.  `System` → `Total online on nodes`
    - This displays the total number of online connections across all Nodes. A single user can be connected to multiple Nodes **simultaneously**. This figure represents the sum of all connections on all Nodes, including duplicates.
    - **For example**: If User X is connected to Node A and Node B at the same time, this card will show 2 online connections.
2.  `Online stats`
    - This block displays the total number of unique online users, not counting duplicates.
    - **For example**: If User X is connected to Node A and Node B, this card will show 1 online user.
3.  `Users`
    - This block shows general information about all users.
    - **For example**: If you have two users — User X and User Z — the `Total` will display 2. If User X has an active subscription and User Z’s subscription has expired, then the `Active` and `Expired` counts will show 1 each.

### Navigation Menu {#nav}

On the left side you will see the navigation menu:

1. **Overview** — Contains the `Home` page, which displays high-level statistics and system information. We covered this earlier in the guide.
2. **Management** — This is the core section of the Panel — you'll spend most of your time here. It includes:
    - `Users` - Create and manage [Users](/docs/learn-en/users).
    - `Internal Squads` - Configure [Internal Squads](/docs/learn-en/squads).
    - `External Squads` - Configure [External Squads](/docs/learn-en/squads#whats-external-squad).
    - `Config Profiles` - Create and manage [Xray-core configurations](/docs/learn-en/config-profiles).
    - `Hosts` - Manage [entry points](/docs/learn-en/hosts) for users.
    - `Nodes`:
        - `Management` - View, edit, disable, or delete [Nodes](/docs/learn-en/nodes).
        - `Statistics` - Review detailed usage statistics per Node.
        - `Infra Billing` - Track infrastructure costs.
        - `Bandwidth` - Analyze traffic consumption across Nodes.
        - `Metrics` - Access live telemetry from Prometheus.
    - `Remnawave Settings` - Manage authentication methods, [API access](/api) and branding of your Panel.
3. **Tools** - the section with useful tools for reviwing data collected by the Panel about your users.
    - `HWID Inspector` - View hardware IDs reported by client apps.
    - `SRH Inspector` - Analyze subscription requests sent from client apps.
4. **Subscription** - Configure what the client app receives when fetching the subscription.
    - `Settings` - Manage additional metadata sent to supported clients, such as Subscription Name.
    - `Templates` - [Configure](/docs/learn-en/templates) client apps' configs.
    - `Response Rulse` - [Define](/docs/learn-en/routing-rules) how the configuration is generated for the client apps'.
5. **Utilities** - Tools designed to simplify and automate common tasks.
    - `Happ Routing` - A rule builder for creating and managing routing rules for Happ.
    - `Subscription Page` - Customize the content of the [Subscription Page](/docs/install/subscription-page/customization).

## Remnawave Settings {#settings}

With the 2.2.0 update, authentication methods and branding can now be managed in the dedicated `Remnawave Settings` section. `API Tokens` have been moved there too.

### Branding Settings {#branding-settings}

You can customize your Brand Name and use your own Logo.

- `Brand Name`  
  Set any text to replace the default “Remnawave” brand name on the login page and navigation menu.
- `Logo URL`  
  Upload your custom logo image to display on the login page and navigation menu.

### Authentication Methods {#oauth}

Remnawave supports multiple authentication methods for passwordless logins. You can enable one or more options based on your needs.

<img src={require('./images/50.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Users"/>

#### Passkey {#passkey}

Passkey authentication allows users to log in securely without passwords. You can register multiple passkeys across devices.

<details>
<summary>How to Set Up Passkey</summary>
1. **Define Your Domains**  
Before setting up Passkey authentication, you need to define your Panel domain.
    - `Frontend Domain`
    Public domain of your frontend without protocol (e.g., `panel.example.com`)
    define backand domain 
    - `Backend Domain`
    Define the fully qualified HTTPS origin for your backend your backend (e.g., `https://panel.example.com`)

2. **Register a Passkey**  
   Click `Manage`, then `Register`. Follow the steps your browser/device provides.

3. **Login Using Passkey**  
After registration, return to the login page to test the passkey. Once confirmed, you can disable username/password login.
  </details>

#### GitHub {#github}

You can login with your GitHub account to Remnawave.

<details>
<summary>How to Set Up GitHub</summary>
1. **Create a Github OAuth2 App**  
Visit [Developer Settings page](https://github.com/settings/applications/new) to register an app.
    - `Application name` — choose any name.
    - `Homepage URL` — `https://panel.example.com/` (replace `panel.example.com` with your Panel domain).
    - `Authorization callback URL` — `https://panel.example.com/oauth2/callback/github` (replace `panel.example.com` with your Panel domain).
    
2. **Get Client ID and Client Secret**  
Copy the `Client ID` and `Client Secret` from app page.

3. **Set the Variables in Remnawave**
    - `Client ID`
    - `Client Secret`
    - `Allowed Emails` — specify which GitHub email addresses can log in.

4. **Login Using GitHub**  
After registration, return to the login page to test the new authentication method. Once confirmed, you can disable username/password login.
  </details>

#### PocketID {#pocketid}

PocketID is a self-hosted OAuth2 solution. Follow the [official PocketID documentation](https://pocket-id.org/docs/setup/installation) to install it.

<details>
<summary>How to Set Up PocketID</summary>
1. **Create an OIDC Client**  
In `Administration` → `OIDC Clients`, click `Add OIDC Client`.  
    - `Name` — choose any name.
    - `Callback URLs` — `https://panel.example.com/oauth2/callback/pocketid` (replace `panel.example.com` with your Panel domain).

2. **Get Client ID and Client Secret**  
   Copy the `Client ID` and `Client Secret`.

3. **Set the Variables in Remnawave**
    - `Client ID`
    - `Client Secret`
    - `Plain Domain` — plain domain for PocketID instance. Do not use any paths or protocols, just a plain domain (e.g., `pocketid.example.com`)
    - `Allowed Emails` — add email addresses allowed to log in.
4. **Login Using PocketID**  
Return to the login page to test the new authentication method. Once confirmed, you can disable username/password login.
  </details>

#### Yandex ID {#yandexid}

:::warning
Yandex ID is not recommended for self-hosted Remnawave instances due to security concerns.
:::

<details>
<summary>How to Set Up Yandex ID</summary>
1. **Create a Yandex ID App**  
Visit [Yandex ID page](https://oauth.yandex.com/client/new/id) to create an app.
    - `Service name` — choose any name.
    - `Platforms` — select `Web services`.
    - `Redirect URI` — `https://panel.example.com/oauth2/callback/yandex` (replace `panel.example.com` with your Panel domain).
    -  `Permissions` — only `Access to email address` is required.

2. **Get Client ID and Client Secret**  
   Once the Yandex ID app is created, you'll see app profile where you need to copy `Client ID` and `Client Secret`.

3. **Set the Variables in Remnawave**
    - `Client ID`
    - `Client Secret`
    - `Allowed Emails` — set the email adresses of the yandex accounts you wish to give access to. The account on yandex that logins in be registered to the email that you specified here.

4. **Login Using Yandex ID**  
Return to the login page to test the new authentication method. Once confirmed, you can disable username/password login.
  </details>

#### Telegram OAuth {#telegram}

You can log in with your Telegram account.

<details>
<summary>How to Set Up Telegram OAuth</summary>

1. **Create a Bot**  
   Message `/newbot` to [@BotFather](https://t.me/BotFather) and create a new bot. Copy its token.

2. **Set Domain**  
   Message `/mybots`. Select the bot you created. The go to `Bot Settings` → `Domain` → `Set domain`.  
   Message the domain of your Panel. E.g. `https://panel.example.com`.

3. **Get Admin IDs**  
   Message `/start` to [@userinfobot](https://t.me/userinfobot). Copy the ID it responded with.

4. **Set the Variables in Remnawave**
    - `Bot Token` — set the token of a bot you created earlier.
    - `Allowed Admin IDs` — set the ID you got earlier from @userinfobot.

5. **Login Using Telegram Auth**  
Return to the login page to test the new authentication method. Once confirmed, you can disable username/password login.
  </details>

:::tip Locked yourself out?
If you disabled the password login and your OAuth doesn't work, you can enable it back with Remnawave Rescue CLI.

On a server hosting the Panel, run:
```bash
docker exec -it remnawave remnawave
```
:::

---

```mdx-code-block
<DocCard
  item={{ type: 'link', label: 'Nodes', description: 'Once you’ve created a super-admin and explored the Home page, your next step is to set up your first Node.', href: '/docs/learn-en/nodes' }}
/>
```
