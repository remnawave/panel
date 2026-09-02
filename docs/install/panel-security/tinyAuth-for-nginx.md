---
sidebar_position: 4
slug: /security/tinyauth-for-nginx
title: TinyAuth for Nginx
---

TinyAuth is a lightweight authentication middleware that protects your applications with a login screen.

This guide uses the Remnawave TinyAuth image based on TinyAuth v5.0.7:

```text
ghcr.io/maposia/remnawave-tinyauth:v5
```

:::caution Breaking changes in v5

TinyAuth v5 uses a new configuration format. Environment variables such as `PORT`, `APP_URL`, `USERS`, and `USERS_FILE` must be renamed before upgrading. See [Breaking changes: v4 to v5](#breaking-changes-v4-to-v5) before replacing a running v4 container.

:::

## Installation

Add TinyAuth to your existing `docker-compose.yml` file. If you are creating a new file, include the `services:` section.

```yaml title="docker-compose.yml"
services:
  tinyauth:
    container_name: tinyauth
    hostname: tinyauth
    image: ghcr.io/maposia/remnawave-tinyauth:v5
    restart: unless-stopped
    ports:
      - "127.0.0.1:3002:3002"
    networks:
      - remnawave-network
    environment:
      - TINYAUTH_SERVER_PORT=3002
      - TINYAUTH_APPURL=https://tinyauth.example.com
      - TINYAUTH_AUTH_USERS=your-username-password-hash
      - TINYAUTH_AUTH_SECURECOOKIE=true
      - TINYAUTH_DATABASE_PATH=/data/tinyauth.db
    volumes:
      - ./data:/data
```

Replace `tinyauth.example.com` with the domain where TinyAuth will be exposed.

:::warning

Do not publish port `3002` on all interfaces. Binding it to `127.0.0.1` ensures that only Nginx on the same host can access TinyAuth directly.

:::

## Creating a user

Generate the first user with the v5 image:

```bash
docker run -it --rm ghcr.io/maposia/remnawave-tinyauth:v5 user create --interactive
```

Enter a username and password, then select the Docker output format. The command returns a value in the following format:

```text
username:passwordHash
```

Use this value for `TINYAUTH_AUTH_USERS` in `docker-compose.yml`.

After TinyAuth is running, you can create another user with:

```bash
docker exec -it tinyauth tinyauth user create --interactive
```

Multiple users can be provided as a comma-separated list:

```yaml
environment:
  - TINYAUTH_AUTH_USERS=user1:passwordHash1,user2:passwordHash2
```

To load users from a file instead, use `TINYAUTH_AUTH_USERSFILE`:

```yaml
environment:
  - TINYAUTH_AUTH_USERSFILE=/run/secrets/tinyauth-users
```

The old `SECRET` environment variable is not used by TinyAuth v5 and must be removed.

See the [official configuration reference](https://tinyauth.app/docs/reference/configuration/) for all supported options.

## Configuring Nginx

First, configure the TinyAuth upstream:

```nginx title="nginx.conf"
upstream tinyauth {
    server 127.0.0.1:3002;
    keepalive 16;
}
```

Expose the TinyAuth login interface on its own domain:

```nginx title="nginx.conf"
server {
    server_name tinyauth.example.com;
    listen 443 ssl;
    http2 on;

    ssl_certificate "/etc/nginx/ssl/tinyauth.example.com/fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/tinyauth.example.com/privkey.pem";
    ssl_trusted_certificate "/etc/nginx/ssl/tinyauth.example.com/fullchain.pem";

    location / {
        proxy_pass http://tinyauth;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Add the following configuration to every application that should be protected:

```nginx title="nginx.conf"
server {
    server_name panel.remnawave.com;
    listen 443 ssl;
    http2 on;

    ssl_certificate "/etc/nginx/ssl/panel.remnawave.com/fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/panel.remnawave.com/privkey.pem";
    ssl_trusted_certificate "/etc/nginx/ssl/panel.remnawave.com/fullchain.pem";

    location / {
        auth_request /tinyauth;
        auth_request_set $tinyauth_location $upstream_http_x_tinyauth_location;
        error_page 401 403 =302 $tinyauth_location;

        proxy_http_version 1.1;
        proxy_pass http://remnawave;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Preserve credentials intended for the protected application.
        proxy_set_header Authorization $http_authorization;

        # TinyAuth credentials must not be forwarded to the application.
        proxy_set_header X-Api-Key "";

        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location = /tinyauth {
        internal;
        proxy_pass http://tinyauth/api/auth/nginx;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";

        # Always overwrite forwarded values instead of trusting client headers.
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Uri $request_uri;

        # X-Api-Key authenticates the request in TinyAuth while the original
        # Authorization header remains available to the protected application.
        proxy_set_header X-Api-Key $http_x_api_key;
        proxy_set_header Authorization $http_authorization;
    }
}
```

TinyAuth v5 returns the appropriate login, unauthorized, or error URL through the `X-Tinyauth-Location` response header. Nginx stores it in `$tinyauth_location` and uses it for the redirect, so a hardcoded `/login?redirect_uri=...` location is no longer required.

Validate and reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Starting TinyAuth

Start or recreate the TinyAuth container:

```bash
docker compose up -d --force-recreate tinyauth
docker compose logs -f tinyauth
```

Open a protected application and confirm that Nginx redirects the browser to `https://tinyauth.example.com`.

## Using `X-Api-Key`

The Remnawave TinyAuth image supports TinyAuth credentials in a separate `X-Api-Key` header. This allows the original `Authorization` header to pass through to the protected application.

The header must contain HTTP Basic credentials:

```text
X-Api-Key: Basic base64(username:password)
```

For example:

```text
X-Api-Key: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Example request:

```bash
curl https://panel.remnawave.com/api/example \
  -H "X-Api-Key: Basic $(printf 'username:password' | base64)" \
  -H "Authorization: Bearer application-token"
```

If `X-Api-Key` is absent, TinyAuth falls back to standard Basic authentication from the `Authorization` header. If `X-Api-Key` is present but malformed or uses a different scheme, authentication is rejected without fallback.

## Breaking changes: v4 to v5

TinyAuth v5 introduces a unified configuration format. All TinyAuth environment variables now use the `TINYAUTH_` prefix and are grouped by section.

| TinyAuth v4 | TinyAuth v5 |
| --- | --- |
| `PORT=3002` | `TINYAUTH_SERVER_PORT=3002` |
| `APP_URL=https://tinyauth.example.com` | `TINYAUTH_APPURL=https://tinyauth.example.com` |
| `USERS=...` | `TINYAUTH_AUTH_USERS=...` |
| `USERS_FILE=/path/to/users` | `TINYAUTH_AUTH_USERSFILE=/path/to/users` |
| `SECURE_COOKIE=true` | `TINYAUTH_AUTH_SECURECOOKIE=true` |

The complete mapping is available in the [official v4 to v5 migration guide](https://tinyauth.app/docs/breaking-updates/4-to-5/).

The Nginx integration also changes:

- Continue using `/api/auth/nginx` for the authentication subrequest.
- Read redirects from `X-Tinyauth-Location` instead of constructing the login URL manually.
- Mark the auth location as `internal`.
- Explicitly overwrite `X-Forwarded-Host` and the other forwarded headers.
- Explicitly pass `X-Api-Key` and `Authorization` to the auth subrequest.
- Clear `X-Api-Key` before proxying the request to the protected application.

### Upgrade procedure

1. Stop TinyAuth without deleting its data:

   ```bash
   docker compose stop tinyauth
   ```

2. Back up the SQLite database and current Compose configuration:

   ```bash
   cp -a ./data ./data-v4-backup
   cp docker-compose.yml docker-compose.v4.yml
   ```

3. Rename all v4 environment variables to their v5 equivalents and remove `SECRET`.

4. Update the image:

   ```yaml
   image: ghcr.io/maposia/remnawave-tinyauth:v5
   ```

5. Update the Nginx configuration and validate it:

   ```bash
   sudo nginx -t
   ```

6. Pull and start TinyAuth v5:

   ```bash
   docker compose pull tinyauth
   docker compose up -d --force-recreate tinyauth
   docker compose logs -f tinyauth
   ```

7. Verify browser login, cookie login, `X-Api-Key` authentication, and access to the protected application before removing the backup.

### Rollback

TinyAuth v5 applies additional SQLite migrations. Do not start TinyAuth v4 against a database that has already been migrated by v5.

To roll back, restore both the v4 Compose file and the v4 data backup:

```bash
docker compose stop tinyauth
rm -rf ./data
cp -a ./data-v4-backup ./data
cp docker-compose.v4.yml docker-compose.yml
docker compose up -d tinyauth
```
