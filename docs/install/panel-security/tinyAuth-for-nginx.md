---
sidebar_position: 4
slug: /security/tinyauth-for-nginx
title: TinyAuth for Nginx
---

TinyAuth is the simplest way to protect your apps with a login screen

## Installation

Now it's time to add TinyAuth to your existing docker-compose.yml file or create a new one. If creating a new file, don't forget to add the `services:` section. The configuration can be as simple as this:

```yaml title="docker-compose.yml"
tinyauth:
    container_name: tinyauth
    hostname: tinyauth
    image: ghcr.io/maposia/remnawave-tinyauth:latest
    restart: always
    ports:
      - '127.0.0.1:3002:3002'
    networks:
      - remnawave-network
    environment:
      - PORT=3002
      - APP_URL=https://tinyauth.example.com
      - USERS=your-username-password-hash
      - SECRET=some-random-32-chars-string
    volumes:
      - ./data:/data
  # To get USERS and SECRET read below

```

## Configuring variables

To generate your first hash for user, use the following command

```bash
docker run -it --rm ghcr.io/maposia/remnawave-tinyauth:latest user create --interactive
```

After running, you will be prompted to enter a username and password. You will also need to select <code>
output format</code>-<code>docker</code>

After that, you will see a message that the user has been created and a <code>username:passwordHash</code> will appear which needs to be used in docker-compose.yml in the env <code>USERS</code>

:::info

After you start the container, you can generate a hash for a user using the running tinyAuth container with the command.

```bash
docker exec -it tinyauth ./tinyauth user create --interactive
```

:::

:::info

Every configuration option that has a `FILE` equivalent (e.g. `USERS` and `USERS_FILE`), then the file can be used instead of the environment variable.

`USERS=` comma separated list of tinyauth users.*(required)*

`USERS_FILE=` A file containing a list of tinyauth users.

All environment variables you can see on official documentation https://tinyauth.app/docs/reference/configuration

:::

To generate the <code>SECRET</code> environment variable using <code>openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32</code>.

## Configure 

Next, you need to configure nginx.conf to protect the required path.

```nginx title="nginx.conf"
upstream tinyauth {
    server 127.0.0.1:3002;
}


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

server {
    server_name panel.remnawave.com;
    listen 443 ssl;
    http2 on;

    ssl_certificate "/etc/nginx/ssl/panel.remnawave.com/fullchain.pem";
    ssl_certificate_key "/etc/nginx/ssl/panel.remnawave.com/privkey.pem";
    ssl_trusted_certificate "/etc/nginx/ssl/panel.remnawave.com/fullchain.pem";

    location / {
        auth_request /tinyauth;                         
        error_page 401 = @tinyauth_login;

        proxy_http_version 1.1;
        proxy_pass http://remnawave;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

location /tinyauth {
  proxy_pass http://tinyauth/api/auth/nginx;

  proxy_set_header x-forwarded-proto $scheme;
  proxy_set_header x-forwarded-host $http_host;
  proxy_set_header x-forwarded-uri $request_uri;
}

    location @tinyauth_login {
    return 302 https://tinyauth.example.com/login?redirect_uri=$scheme://$http_host$request_uri; 
}

#Make sure to replace the http://tinyauth.example.com with your own app URL
```

## Running the container

After that, restart nginx and launch tinyAuth

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

## Issuing API-keys

:::info
 
You can use <code>Basic base64(username:password)</code> in the `X-Api-Key` header of your requests to the API.

Example: `X-Api-Key: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`

:::
