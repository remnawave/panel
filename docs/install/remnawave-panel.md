---
sidebar_position: 2
title: Remnawave Panel
---

import InstallDocker from '/docs/partials/\_install_docker.md';

# Remnawave Panel

Remnawave Panel is the main component of Remnawave. It is used to manage users, nodes, subscriptions, and more.

<InstallDocker />

## Step 1 – Download required files

```bash title="Create project directory"
mkdir /opt/remnawave && cd /opt/remnawave
```

Download [`docker-compose.yml`][compose-file] and [`.env.sample`][env-file] by running these commands:

```bash title="Get docker-compose.yml file"
curl -o docker-compose.yml https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/docker-compose-prod.yml
```

```bash title="Get .env file"
curl -o .env https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/.env.sample
```

## Step 2 – Configure the .env file

`JWT_AUTH_SECRET` and `JWT_API_TOKENS_SECRET` are used for authentication and related security functions.

Generate secret key by running the following commands:

```bash title="Generate secure keys"
sed -i "s/^JWT_AUTH_SECRET=.*/JWT_AUTH_SECRET=$(openssl rand -hex 64)/" .env && sed -i "s/^JWT_API_TOKENS_SECRET=.*/JWT_API_TOKENS_SECRET=$(openssl rand -hex 64)/" .env
```

```bash title="Generate passwords"
sed -i "s/^METRICS_PASS=.*/METRICS_PASS=$(openssl rand -hex 64)/" .env && sed -i "s/^WEBHOOK_SECRET_HEADER=.*/WEBHOOK_SECRET_HEADER=$(openssl rand -hex 64)/" .env
```

It is strongly recommended to change the default Postgres password.
 
```bash title="Change Postgres password"
pw=$(openssl rand -hex 24) && sed -i "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$pw/" .env && sed -i "s|^\(DATABASE_URL=\"postgresql://postgres:\)[^\@]*\(@.*\)|\1$pw\2|" .env
```

Now, open the `.env` file and update the following variables:

- `FRONT_END_DOMAIN`
- `SUB_PUBLIC_DOMAIN`

`FRONT_END_DOMAIN` is the domain name where the panel will be accessible. Enter your domain name here.
Example: `panel.yourdomain.com`.

`SUB_PUBLIC_DOMAIN` – for now, just enter your panel domain and add `/api/sub` to the end.  
Example: `panel.yourdomain.com/api/sub`.

:::tip More about environment variables
You can find more information about the environment variables in the [Environment Variables](/docs/install/environment-variables.md) page.
:::

## Step 3 – Start the containers

Start the containers by running the following command:

```bash title="Start the containers"
docker compose up -d && docker compose logs -f -t
```

After a few seconds, you should see output similar to this:

![Remnawave Panel](/install/panel_up.webp)

## Next Steps

:::danger
A reverse proxy is required to run Remnawave Panel properly.

Do not expose the services to the public internet. Use only `127.0.0.1` for Remnawave services.
:::

You can now proceed to reverse proxy installation.

<Button label="Reverse Proxy Installation" link="/docs/install/reverse-proxies/" variant="secondary" size="md" outline style={{ marginBottom: '1rem' }} />

[compose-file]: https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/docker-compose-prod.yml
[env-file]: https://raw.githubusercontent.com/remnawave/backend/refs/heads/main/.env.sample
