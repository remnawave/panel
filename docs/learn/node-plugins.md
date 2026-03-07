---
sidebar_position: 99
title: Node Plugins β
---

Плагины – это дополнительные модули, которые можно активировать на Remnawave Node для дополнительных функций: **Torrent Blocker**, **Blacklist**, настройка **Connection Drop**.

<!-- truncate -->

:::warning

🚧 Эта страница находится в стадии разработки.

:::

:::tip

Плагины для нод доступны начиная с версии Remnawave Panel & Remnawave Node **v2.7.0**.

:::

<img src={require('/node-plugins/plugins-preview.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

## Требования

Для корректной работы плагинов в обязательном порядке требуется добавить директиву `cap_add: NET_ADMIN` в конфигурацию Remnawave Node.

```yaml title="docker-compose.yml"
services:
    remnanode:
        container_name: remnanode
        hostname: remnanode
        image: remnawave/node:latest
        network_mode: host
        restart: always
        // highlight-next-line-green
        cap_add:
            // highlight-next-line-green
            - NET_ADMIN
        ulimits:
            nofile:
                soft: 1048576
                hard: 1048576
        environment:
            - NODE_PORT=<NODE_PORT>
            - SECRET_KEY=<SECRET_KEY>
```

Так же вы должны убедиться, что на хостовой машине доступен `nftables`. Впрочем, он уже установлен по умолчанию на большинстве дистрибутивов.

```bash title="Проверка версии nftables"
nft --version
```

:::danger

Отнеситесь к настройке плагинов с осторожностью, плагины Torrent Blocker и Blacklist будут работать напрямую с фаерволом на вашем сервере.

:::

<details>
<summary>Какую именно таблицу создаст Remnawave Node для работы плагинов?</summary>

```nftables title="nftables"
table ip remnanode {
        set blacklist {
                type ipv4_addr
                flags timeout
        }

        set torrent-blocker {
                type ipv4_addr
                flags timeout
        }

        chain input {
                type filter hook input priority filter - 10; policy accept;
                ip saddr @blacklist log prefix "blacklist: " drop
                ip saddr @torrent-blocker log prefix "torrent-blocker: " drop
        }

        chain forward {
                type filter hook forward priority filter - 10; policy accept;
                ip saddr @blacklist log prefix "blacklist: " drop
                ip saddr @torrent-blocker log prefix "torrent-blocker: " drop
        }
}
table ip6 remnanode6 {
        set blacklist6 {
                type ipv6_addr
                flags timeout
        }

        set torrent-blocker6 {
                type ipv6_addr
                flags timeout
        }

        chain input {
                type filter hook input priority filter - 10; policy accept;
                ip6 saddr @blacklist6 log prefix "blacklist: " drop
                ip6 saddr @torrent-blocker6 log prefix "torrent-blocker: " drop
        }

        chain forward {
                type filter hook forward priority filter - 10; policy accept;
                ip6 saddr @blacklist6 log prefix "blacklist: " drop
                ip6 saddr @torrent-blocker6 log prefix "torrent-blocker: " drop
        }
}

```

</details>

## Структура конфигурации

<img src={require('/node-plugins/configuration.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

```json title="Plugin configuration"
{
    "blacklist": {
        "ip": [],
        "enabled": false
    },
    "torrentBlocker": {
        "enabled": false,
        "ignoreLists": {
            "ip": [],
            "userId": []
        },
        "blockDuration": 3600
    },
    "connectionDrop": {
        "enabled": false,
        "whitelistIps": []
    },
    "sharedLists": []
}
```

:::tip

Редактор конфигурации плагинов поддерживает подсказки (наведитесь на объект, чтобы прочитать описание), а так же автокомплит.

:::

## Torrent Blocker

:::danger

Для работы этого плагина необходима **минимальная** версия Xray-Core – **??.??.??**. Эта версия ядра идет по умолчанию с Remnawave Node **v2.7.0**.

:::

### Конфигурация

```json
"torrentBlocker": {
    "enabled": false,
    "ignoreLists": {
        "ip": [],
        "userId": []
    },
    "blockDuration": 3600
},
```

| Field           | Type    | Description                                                                 |
| --------------- | ------- | --------------------------------------------------------------------------- |
| `enabled`       | boolean | Включает или выключает плагин, по умолчанию выключен                        |
| `ignoreLists`   | object  | Список IP-адресов и ID пользователей, которые будут игнорироваться плагином |
| `blockDuration` | number  | Время блокировки в секундах                                                 |

```jsonc title="ignoreLists"
{
    "ip": [],
    "userId": []
}
```

| Field    | Type  | Description                                                                                                       |
| -------- | ----- | ----------------------------------------------------------------------------------------------------------------- |
| `ip`     | array | Список IP-адресов, которые будут игнорироваться плагином. Можно использовать списки из конфигурации Shared Lists. |
| `userId` | array | Список ID пользователей, которые будут игнорироваться плагином                                                    |

### Техническая информация

Плагин использует одно из нововведений в Xray-Core – `webhook` (PR: [#5722](https://github.com/XTLS/Xray-core/pull/5722)). Поэтому для работы плагина необходима версия Xray-Core **??.??.??** или выше.

<details>
<summary>Как включение плагина влияет на конфигурацию Xray-Core</summary>

Если этот плагин включен, Remnawave Node автоматически применит необходимые изменения в конфигурацию Xray-Core, с вашей стороны кроме включения плагина ничего делать не требуется.

:::warning

Как и написано выше – здесь описывается лишь то, что именно будет изменено в конфигурации Xray-Core. **Не добавляйте эти изменения вручную**, они будут применены автоматически.

:::

```json
{
    "inbounds": [],
    "outbounds": [
        {
            "tag": "DIRECT",
            "protocol": "freedom"
        },
        {
            "tag": "BLOCK",
            "protocol": "blackhole"
        },
        // highlight-next-line-green
        {
            // highlight-next-line-green
            "tag": "RW_TB_OUTBOUND_BLOCK",
            // highlight-next-line-green
            "protocol": "blackhole"
            // highlight-next-line-green
        }
    ],
    "routing": {
        "rules": [
            // highlight-next-line-green
            {
                // highlight-next-line-green
                "protocol": [
                    // highlight-next-line-green
                    "bittorrent"
                    // highlight-next-line-green
                ],
                // highlight-next-line-green
                "outboundTag": "RW_TB_OUTBOUND_BLOCK",
                // highlight-next-line-green
                "webhook": {
                    // highlight-next-line-green
                    "url": "<REPLACED IN RUNTIME BY REMNAWAVE NODE>",
                    // highlight-next-line-green
                    "deduplication": 30
                    // highlight-next-line-green
                }
            }
        ]
    }
}
```

Правило всегда будет помещаться в начало массива `rules`, перед остальными правилами. А `outbound` будет всегда добавляться в конец массива `outbounds`.

</details>

### Принцип работы

В рамках Xray-Core **невозможно** полностью блокировать Torrent-трафик. Xray-Core способен отслеживать только ~10-30% torrent-трафика, поэтому под "блокировкой" имеется в виду то, что после изначального обнаружения хотя бы одного `пакета` – IP-адрес, с которого пришел этот пакет, будет заблокирован на время, указанное в конфигурации.

После получения `пакета`, Xray-Core отправит информацию о нем в `webhook`, который будет обрабатываться Remnawave Node. После его получения – Remnawave Node моментально блокирует IP-адрес (в `nftables`), а так же обрывает соединение (аналог команды `ss -k`, `conntrack -D`).

Итак, принцип работы по пунктам можно описать вот так:

1. Remnawave Node добавляет необходимые изменения в конфигурацию Xray-Core.
2. Пользователь использует торрент
3. Его трафик попадает под правило, добавленное Remnawave Node в конфигурацию Xray-Core.
4. Xray-Core отправляет информацию о пакете в `webhook`.
5. Remnawave Node блокирует IP-адрес и обрывает соединение.
6. В течении ~15-30 секунд эта информация будет передана в Remnawave Panel.
7. Remnawave Panel отправит уведомление администратору в Telegram и так же отправит вебхук (`torrent_blocker.report`, scope: `torrent_blocker`).

:::info

Важно заметить, что дальнейшие действия относительно нарушителя вам необходимо реализовать самостоятельно. Remnawave Panel предоставляет все возможности для этого. После получения вебука от панели – вы можете перевести пользователя в статус `DISABLED`, если хотите чтобы пользователь не смог подключаться ко всем серверам.

:::

<details>
<summary>Что придет в вебхуке (`torrent_blocker.report`)</summary>

Вебхук будет содержать полный объект уже знакомые нам объекты `node` и `user`, а так же объект `report`, который содержит всю доступную информацию.

```json
{
    "scope": "torrent_blocker",
    "event": "torrent_blocker.report",
    "timestamp": "2026-03-07T16:02:50.564Z",
    "data": {
        "node": {},
        "user": {},
        "report": {
            "actionReport": {
                "blocked": true,
                "ip": "<omitted>",
                "blockDuration": 60,
                "willUnblockAt": "2026-03-07T16:03:48.986Z",
                "userId": "2",
                "processedAt": "2026-03-07T16:02:48.986Z"
            },
            "xrayReport": {
                "email": "2",
                "level": 0,
                "protocol": "bittorrent",
                "network": "tcp",
                "source": "<omitted>:51431",
                "destination": "<omitted>:59755",
                "routeTarget": null,
                "originalTarget": "tcp:<omitted>:59755",
                "inboundTag": "VLESS_TCP_REALITY",
                "inboundName": "vless",
                "inboundLocal": "<omitted>:443",
                "outboundTag": "RW_TB_OUTBOUND_BLOCK",
                "ts": 1772899368
            }
        }
    }
}
```

</details>
