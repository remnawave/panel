---
sidebar_position: 1
slug: /migrating/marzban
title: Marzban
---

# Migration Guide from Marzban to Remnawave

This guide walks you through migrating your data from a Marzban panel to a Remnawave panel using the Remnawave migration tool.

## 1. Server Preparation {#server-preparation}

### 1.1. Installing Required Dependencies

Ensure your server has the necessary tools installed by updating the system packages and installing Git and wget.

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
mkdir -p ~/opt/remnawave && cd ~/opt/remnawave

# Download the latest version (v1.3.0 as of this guide)
wget https://github.com/remnawave/migrate/releases/download/v1.3.0/remnawave-migrate-v1.3.0-linux-amd64.tar.gz
```

### 2.2. Extracting the Tool

Unpack the downloaded archive to access the migration binary.

```bash
# Extract the tarball
tar -xf remnawave-migrate-v1.3.0-linux-amd64.tar.gz
```

:::tip
After extraction, you should see the `remnawave-migrate` binary in your directory. Use `ls -l` to verify.
:::

## 3. Configuration Setup {#configuration-setup}

### 3.1. Setting Up Migration Parameters

The migration tool uses command-line flags to configure the migration. Below is an example command with all required parameters. Replace the placeholder values with your actual server details.

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
