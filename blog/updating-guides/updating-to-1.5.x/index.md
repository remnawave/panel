---
title: Updating from to 1.5.x
authors: remnawave
tags: [updating-guides]
date: 2025-04-06
---

# Release v1.5.x

<Button
    label="Check out full changelog"
    variant="secondary"
    outline
    link="https://hub.remna.st/changelog/remnawave-v1-5-0"
/>

### Warning

:::danger

It is necessary to update the Remnawave Node (Remnanode) to v1.5.x **AFTER** updating the Remnawave Panel.

:::

## Remnawave Panel

:::warning  
Open you current Remnawave Panel in browser and logout.
:::

### 1. Update Remnawave Panel

```bash
docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```

### 2. Recreate admin user with RESCUE CLI

1.5.x version of Remnawave Panel uses password hashing algorithm, so old admin user will not be able to login.

```bash
docker exec -it remnawave remnawave
```

After entering the Rescue CLI, select option 'Reset superadmin' and follow the instructions.

### 3. Open Remnawave Panel

You will be prompted to create a new superadmin user.

### 4. Getting new SSL_CERT

In Remnawave Dashboard, go to `Nodes` -> `Management` and copy new `SSL_CERT`.

### 5. Update Remnawave Node (Remnanode)

Firstly, update SSL_CERT in the `.env` file with new one.

```bash
cd /opt/remnanode && nano .env
```

Then, update Remnawave Node (Remnanode) with command:

```bash
docker compose pull && docker compose down && docker compose up -d && docker compose logs -f -t
```
