---
sidebar_position: 1
title: Marzban
---

# Migrate from Marzban

This guide walks you through migrating your data from a Marzban panel to a Remnawave panel using the Remnawave migration tool.

## 1. Server Preparation {#server-preparation}

### 1.1. Installing Required Dependencies

Make sure your server has the necessary tools installed by updating the system packages and installing Git and wget.

```bash
# Update system packages
sudo apt-get update

# Install Git and wget
sudo apt-get install -y git wget
```

:::tip
Run `git --version` and `wget --version` to confirm successful installation.
:::

## 2. Downloading the Migration Tool {#downloading-migration-tool}

### 2.1. Downloading the Latest Release

Download the precompiled Remnawave migration tool from the GitHub releases page.

```bash
# Create and navigate to a working directory
mkdir -p /opt/remnawave && cd /opt/remnawave

# Download the latest version (v1.3.0 as of this guide)
wget https://github.com/remnawave/migrate/releases/download/v1.3.0/remnawave-migrate-v1.3.0-linux-amd64.tar.gz
```

### 2.2. Extracting the Tool

Unpack the downloaded archive to access the binary.

```bash
# Extract the tarball
tar -xf remnawave-migrate-v1.3.0-linux-amd64.tar.gz
```

:::tip
After extraction, you should see the `remnawave-migrate` binary in your directory. Use `ls -l` to verify.
:::

## 3. Configuration Setup {#configuration-setup}

### 3.1. Setting Up Migration Parameters

The migration tool uses command-line flags for configuration. Below is an example command with all the required parameters. Replace the placeholder values with your actual server details.

```bash
./remnawave-migrate \
  --panel-type=marzban \
  --panel-url="https://your-marzban-server" \
  --panel-username="admin" \
  --panel-password="your-admin-password" \
  --remnawave-url="https://your-remnawave-server" \
  --remnawave-token="your-remnawave-token" \
  --preserve-status
```

### 3.2. Configuration Options

The tool supports the following flags and their corresponding environment variables:

| Flag                   | Environment Variable | Description                                                   | Default   |
| ---------------------- | -------------------- | ------------------------------------------------------------- | --------- |
| `--panel-type`         | `PANEL_TYPE`         | Source panel type (`marzban` or `marzneshin`)                 | `marzban` |
| `--panel-url`          | `PANEL_URL`          | Source panel URL (e.g., `https://marzban.example.com`)        | -         |
| `--panel-username`     | `PANEL_USERNAME`     | Source panel admin username                                   | -         |
| `--panel-password`     | `PANEL_PASSWORD`     | Source panel admin password                                   | -         |
| `--remnawave-url`      | `REMNAWAVE_URL`      | Destination panel URL (e.g., `https://remnawave.example.com`) | -         |
| `--remnawave-token`    | `REMNAWAVE_TOKEN`    | Destination panel API token                                   | -         |
| `--batch-size`         | `BATCH_SIZE`         | Number of users to process per batch                          | `100`     |
| `--last-users`         | `LAST_USERS`         | Migrate only the last N users (0 = all users)                 | `0`       |
| `--preferred-strategy` | `PREFERRED_STRATEGY` | Traffic reset strategy for all users                          | -         |
| `--preserve-status`    | `PRESERVE_STATUS`    | Preserve user status from source panel                        | `false`   |

:::tip

- Use `--last-users=5` for a test migration with a small subset of users.
- Obtain your Remnawave API token from the Remnawave panel settings (e.g., under API or Integrations).
  :::

## 4. Post-Migration Verification {#post-migration-verification}

### 4.1. What to Check

After migration, verify the following on the Remnawave panel:

1. **User Count**: Ensure the number of migrated users matches the source.
2. **Data Integrity**:
    - Usernames
    - Passwords
    - Traffic limits
    - Expiration dates
    - User statuses (if `--preserve-status` was used)

:::tip
Log in to the Remnawave panel and spot-check a few users to confirm data accuracy.
:::

## 5. Supporting Legacy Subscription Pages {#supporting-legacy-subscription-pages}

After migrating to Remnawave, the only way to ensure support and rendering of legacy Marzban subscription pages is by using the repository at [https://github.com/remnawave/subscription-page/](https://github.com/remnawave/subscription-page/).

### 5.1. Default Docker Compose Configuration

By default, the `docker-compose.yml` file for the subscription page service looks like this:

```yaml
services:
    remnawave-subscription-page:
        image: remnawave/subscription-page:latest
        container_name: remnawave-subscription-page
        hostname: remnawave-subscription-page
        restart: always
        environment:
            - REMNAWAVE_PLAIN_DOMAIN=domain.com
            - SUBSCRIPTION_PAGE_PORT=3010
        ports:
            - '127.0.0.1:3010:3010'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: true
```

### 5.2. Adjusting for Marzban Compatibility

During migration, you need to ensure compatibility with Marzban subscription paths and enable decryption of Marzban subscription links. Replace the `environment` section in the default configuration with the following:

```yaml
services:
    remnawave-subscription-page:
        image: remnawave/subscription-page:latest
        container_name: remnawave-subscription-page
        hostname: remnawave-subscription-page
        restart: always
        environment:
            - REMNAWAVE_PLAIN_DOMAIN=domain.com
            - SUBSCRIPTION_PAGE_PORT=3010
            - MARZBAN_LEGACY_LINK_ENABLED=true
            - MARZBAN_LEGACY_SECRET_KEY=secret
            - REMNAWAVE_API_TOKEN=token
            - CUSTOM_SUB_PREFIX=custom
        ports:
            - '127.0.0.1:3010:3010'
        networks:
            - remnawave-network

networks:
    remnawave-network:
        driver: bridge
        external: true
```

#### Configuration Options Explained

| Variable                      | Description                                                                                     | Example Value      |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | ------------------ |
| `REMNAWAVE_PLAIN_DOMAIN`      | The address of your Remnawave panel (without `https://`).                                       | `panel.domain.com` |
| `SUBSCRIPTION_PAGE_PORT`      | The port on which the subscription page service runs.                                           | `3010`             |
| `MARZBAN_LEGACY_LINK_ENABLED` | Enables support for legacy Marzban subscription links. Must be `true` to use the options below. | `true`             |
| `MARZBAN_LEGACY_SECRET_KEY`   | The secret key from your Marzban database, required for decrypting legacy links.                | `secret`           |
| `REMNAWAVE_API_TOKEN`         | The API token generated from your Remnawave panel dashboard (under "API Tokens").               | `token`            |
| `CUSTOM_SUB_PREFIX`           | A custom prefix for subscription URLs to match your Marzban setup (e.g., `sub`).                | `sub`              |

:::tip

- If `MARZBAN_LEGACY_LINK_ENABLED` is set to `true`, all subsequent variables (`MARZBAN_LEGACY_SECRET_KEY`, `REMNAWAVE_API_TOKEN`, and `CUSTOM_SUB_PREFIX`) must be provided.
- To retrieve the `MARZBAN_LEGACY_SECRET_KEY`, query your Marzban database with:
    ```sql
    SELECT secret_key FROM jwt LIMIT 1;
    ```
    For example, if your Marzban database is in a Docker container named `marzban-mysql`, connect to it using:
    ```bash
    docker exec -it marzban-mysql mysql -uroot -pPassword
    ```
    Replace `marzban-mysql` and `Password` with your actual container name and root password.
- Generate the `REMNAWAVE_API_TOKEN` from the Remnawave dashboard under the "API Tokens" section.
  :::

### 5.3. Verifying Legacy Support

After deploying the updated configuration:

1. Restart the `remnawave-subscription-page` service:
    ```bash
    docker compose up -d --force-recreate
    ```
2. Test an old Marzban subscription link to ensure it resolves correctly and displays user data on the Remnawave subscription page.
