### Features

- View your subscriptions in the mini app
- Multi-language support (English, Russian)

### Environment Variables

The application requires the following environment variables to be set:

| Variable              | Description                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REMNAWAVE_PANEL_URL` | Remnawave Panel URL, can be `http://remnawave:3000` or `https://panel.example.com`                                                                                                                                                                                     |
| `REMNAWAVE_TOKEN`     | Authentication token for Remnawave API                                                                                                                                                                                                                                 |
| `BUY_LINK`            | The URL for purchase actions                                                                                                                                                                                                                                           |
| `CRYPTO_LINK`         | Allows using encrypted links (currently supported Happ application)                                                                                                                                                                                                    |
| `REDIRECT_LINK`       | Allows you to specify a **custom redirect page URL** for deep links. Useful for handling protocols like `v2box://` in Telegram Desktop (Windows). For more details and examples, see [Telegram Deep Link Redirect](https://github.com/maposia/redirect-page/tree/main) |
| `AUTH_API_KEY`        | If you use "Caddy with security" or TinyAuth for Nginx addon, you can place here X-Api-Key, which will be applied to requests to Remnawave Panel.                                                                                                                      |

### Install and Run

#### 1. Create a new directory for the mini app

```bash
mkdir /opt/remnawave-telegram-sub-mini-app && cd /opt/remnawave-telegram-sub-mini-app
```

#### 2. Download the sample environment variables

```bash
curl -o .env https://raw.githubusercontent.com/maposia/remnawave-telegram-mini-bot/refs/heads/main/.env.example
```

#### 3. Configure the environment variables

```bash
nano .env
```

#### 4. Create docker-compose.yml file

```bash
nano docker-compose.yml
```

**Example below:**

```yaml
services:
    remnawave-mini-app:
        image: ghcr.io/maposia/remnawave-telegram-sub-mini-app:latest
        container_name: remnawave-telegram-mini-app
        hostname: remnawave-telegram-mini-app
        env_file:
            - .env
        restart: always
        # volumes:
        #   - ./app-config.json:/app/public/assets/app-config.json
        ports:
            - '127.0.0.1:3020:3020'
#      networks:
#         - remnawave-network

#networks:
#   remnawave-network:
#     name: remnawave-network
#      driver: bridge
#      external: true
```

Uncomment if you want to use your own template downloaded from the Remnawave panel.  
P.S. File must be placed in the same directory as this `docker-compose.yml` file

```yaml
volumes:
    - ./app-config.json:/app/public/assets/app-config.json
```

Uncomment if you want to use local connection via single network in docker

```yaml
networks:
  - remnawave-network

networks:
  remnawave-network:
    name: remnawave-network
    driver: bridge
    external: true
```

#### 5. Run containers

```bash
docker compose up -d && docker compose logs -f
```

#### 6. Access the mini app

Mini app is now running on `http://127.0.0.1:3020`  
Now we are ready to move on to Reverse Proxy installation.
