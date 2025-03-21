---
sidebar_position: 1
slug: /migrating/marzban
title: Marzban
---

# Migration Guide from Marzban to Remnawave

## 1. Server Preparation {#server-preparation}

### 1.1. Installing Required Dependencies

Update the system packages and install the necessary development tools and Git.

```bash
# Update packages
sudo apt-get update

# Install required development tools and Git
sudo apt-get install -y build-essential gcc libc6-dev git wget
```

### 1.2. Installing Go

Install the latest version of Go on your server.

```bash
# Remove old Go version (if present)
sudo rm -rf /usr/local/go

# Download and install the latest Go version
wget https://go.dev/dl/go1.23.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.5.linux-amd64.tar.gz 

# Add Go to PATH
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
go version
```

:::tip
Run `go version` to confirm that Go is installed correctly. You should see the installed version, e.g., `go1.23.5`.
:::

## 2. Preparing the Migration Tool 

### 2.1. Cloning the Repository

Clone the migration tool repository from GitHub.

```bash
# Clone the repository
git clone https://github.com/remnawave/migrate.git
cd migrate/marzban
```

### 2.2. Building the Migration Tool

Compile the migration tool using Go.

```bash
# Build the tool
go build -o marzban-migration-tool
```

## 3. Configuration Setup 

### 3.1. Creating the Configuration File

Create a `.env` file to store the migration configuration.

```bash
# Create the configuration file
nano .env
```

### 3.2. Contents of the `.env` File

Add the following environment variables to the `.env` file. Replace placeholder values with your actual credentials and server details.

```bash
# Marzban panel details (note the https://)
export MARZBAN_URL="https://your-old-marzban-server"
export MARZBAN_USERNAME="admin"
export MARZBAN_PASSWORD="your-admin-password"

# Remnawave panel details (note the https://)
export REMNAWAVE_URL="https://your-new-remnawave-server"
export REMNAWAVE_TOKEN="your-remnawave-token"

# Migration settings
export BATCH_SIZE="50"            # Migrate 50 users at a time
export LAST_USERS="0"             # 0 = migrate all users
export CALENDAR_STRATEGY="false"   # Use calendar strategy for traffic
export PRESERVE_STATUS="true"     # Preserve user statuses
```

:::tip
Set `LAST_USERS="0"` to migrate all users. Use a smaller number (e.g., `5`) for testing purposes.
:::

## 4. Migration Process 

### 4.1. Pre-Migration Checks

Verify that both Marzban and Remnawave servers are accessible before starting the migration.

```bash
# Check Marzban availability
curl -k -I $MARZBAN_URL

# Check Remnawave availability
curl -k -I $REMNAWAVE_URL
```

:::tip
A successful response (e.g., HTTP 200) indicates the servers are reachable. If you encounter errors, check your URLs and network settings.
:::

### 4.2. Test Migration

Perform a test migration with a small subset of users to ensure everything works as expected.

```bash
# Load the configuration
source .env

# Test migration with a small batch (e.g., 5 users)
export LAST_USERS="5"  # Migrate only the last 5 users for testing
./marzban-migration-tool
```

### 4.3. Full Migration

Once the test is successful, proceed with migrating all users.

```bash
# Reset settings for full migration
export LAST_USERS="0"  # Migrate all users
./marzban-migration-tool
```

:::warning
Ensure you have a backup of your Marzban data before performing a full migration. This process is irreversible!
:::

---
