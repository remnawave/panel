---
sidebar_position: 5
slug: /features/rescue-cli
title: Rescue CLI
---

## Overview

Rescue CLI is a built-in command-line tool that provides a set of maintenance and recovery commands for your Remnawave instance.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/rescue-cli/rescue-cli-preview.webp" alt="Rescue CLI" width="800" style={{ borderRadius: '8px' }} />
</div>

## Usage

To access Rescue CLI, use the following command:

```bash
docker exec -it remnawave cli
```

## Commands

### Reset superadmin

Fully resets the superadmin account, removing it from the database. After running this command, open the panel in a browser — you will be prompted to create a new superadmin account from scratch.

### Enable password authentication

Enables password-based authentication for the panel. This is useful if you have accidentally disabled password login via OAuth settings and can no longer access the panel.

### Reset certs

:::danger
Do not use this command if you are not sure what you are doing.
:::

Resets the internal certificates used by Remnawave.

### Get SECRET_KEY for a Remnawave Node

Displays the `SECRET_KEY` required to connect a Remnawave Node to the panel.

### Fix Collation

Fixes database collation issues.

### Clean up HWID Devices

Removes all stored HWID device records from the database. This is useful if you want to reset HWID devices for all users, allowing them to re-register their devices.

### Clean up SRH Table

Clears the SRH (Subscription Request History) table. This command removes all subscription request logs, which can help reduce database size if the table has grown significantly over time.

### Exit

Exits the Rescue CLI and returns to the shell.
