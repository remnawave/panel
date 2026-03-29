---
sidebar_position: 99
title: Node Plugins β
---

Плагины – это дополнительные модули, которые можно активировать на Remnawave Node для дополнительных функций: **Torrent Blocker**, **Ingress Filter**, **Egress Filter**, настройка **Connection Drop**.

<!-- truncate -->

:::tip

Плагины для нод доступны начиная с версии Remnawave Panel & Remnawave Node **v2.7.0**.

:::

<img src={require('/node-plugins/plugins-preview.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

## Требования {#requirements}

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

#### nftables {#nftables}

Убедитесь, что на хостовой машине доступен `nftables`. На большинстве современных дистрибутивов он уже установлен по умолчанию.

```bash title="Проверка версии nftables"
nft --version
```

#### Linux-ядро {#linux-kernel-version}

Требуется версия ядра **5.7** или выше.

```bash title="Проверка версии ядра"
uname -r
```

> **Примечание:** если версия ядра ниже 5.7, плагин работать не будет. Обновите ядро или обратитесь к документации вашего дистрибутива.

:::danger

Отнеситесь к настройке плагинов с осторожностью, плагины Torrent Blocker, Ingress Filter, Egress Filter будут работать напрямую с фаерволом на вашем сервере.

:::

<details>
<summary>Какую именно таблицу создаст Remnawave Node для работы плагинов?</summary>

```nftables title="nftables"
table ip remnanode {
        counter processed {
                packets 32 bytes 2060
        }

        counter ingress-filter-ip {
                packets 0 bytes 0
        }

        counter torrent-blocker {
                packets 0 bytes 0
        }

        counter egress-filter-ip {
                packets 0 bytes 0
        }

        counter egress-filter-port {
                packets 0 bytes 0
        }

        set ingress-filter-ip {
                type ipv4_addr
                flags timeout
                counter
        }

        set torrent-blocker {
                type ipv4_addr
                flags timeout
                counter
        }

        set egress-filter-ip {
                type ipv4_addr
                flags timeout
                counter
        }

        set egress-filter-port {
                type inet_proto . inet_service
                flags timeout
                counter
        }

        chain input {
                type filter hook input priority filter - 10; policy accept;
                counter name "processed"
                ip saddr @ingress-filter-ip log prefix "ingress-filter-ip: " counter name "ingress-filter-ip" drop
                ip saddr @torrent-blocker log prefix "torrent-blocker: " counter name "torrent-blocker" drop
        }

        chain forward {
                type filter hook forward priority filter - 10; policy accept;
                counter name "processed"
                ip saddr @ingress-filter-ip log prefix "ingress-filter-ip: " counter name "ingress-filter-ip" drop
                ip saddr @torrent-blocker log prefix "torrent-blocker: " counter name "torrent-blocker" drop
        }

        chain output {
                type filter hook output priority filter - 10; policy accept;
                ip daddr @egress-filter-ip counter name "egress-filter-ip" drop
                meta l4proto . th dport @egress-filter-port counter name "egress-filter-port" drop
        }
}
table ip6 remnanode6 {
        counter processed {
                packets 0 bytes 0
        }

        counter ingress-filter-ip6 {
                packets 0 bytes 0
        }

        counter torrent-blocker6 {
                packets 0 bytes 0
        }

        counter egress-filter-ip6 {
                packets 0 bytes 0
        }

        counter egress-filter-port6 {
                packets 0 bytes 0
        }

        set ingress-filter-ip6 {
                type ipv6_addr
                flags timeout
                counter
        }

        set torrent-blocker6 {
                type ipv6_addr
                flags timeout
                counter
        }

        set egress-filter-ip6 {
                type ipv6_addr
                flags timeout
                counter
        }

        set egress-filter-port6 {
                type inet_proto . inet_service
                flags timeout
                counter
        }

        chain input {
                type filter hook input priority filter - 10; policy accept;
                counter name "processed"
                ip6 saddr @ingress-filter-ip6 log prefix "ingress-filter-ip: " counter name "ingress-filter-ip6" drop
                ip6 saddr @torrent-blocker6 log prefix "torrent-blocker: " counter name "torrent-blocker6" drop
        }

        chain forward {
                type filter hook forward priority filter - 10; policy accept;
                counter name "processed"
                ip6 saddr @ingress-filter-ip6 log prefix "ingress-filter-ip: " counter name "ingress-filter-ip6" drop
                ip6 saddr @torrent-blocker6 log prefix "torrent-blocker: " counter name "torrent-blocker6" drop
        }

        chain output {
                type filter hook output priority filter - 10; policy accept;
                ip6 daddr @egress-filter-ip6 counter name "egress-filter-ip6" drop
                meta l4proto . th dport @egress-filter-port6 counter name "egress-filter-port6" drop
        }
}

```

</details>

## Поддержка CIDR {#cidr-support}

:::info

CIDR-нотация (IPv4 и IPv6) поддерживается в следующих плагинах: **Ingress Filter**, **Egress Filter** и **Shared Lists**.

В плагинах **Torrent Blocker** (`ignoreLists.ip`) и **Connection Drop** (`whitelistIps`) CIDR-нотация **не поддерживается** — указывайте только конкретные IP-адреса.

Примеры допустимых CIDR-значений: `192.168.1.1`, `10.0.0.0/8`, `172.16.0.0/12`, `2001:db8::1`, `2001:db8::/32`.

:::

## Структура конфигурации {#configuration-structure}

<img src={require('/node-plugins/configuration.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

```json title="Plugin configuration"
{
    "ingressFilter": {
        "enabled": false,
        "blockedIps": []
    },
    "egressFilter": {
        "enabled": false,
        "blockedIps": [],
        "blockedPorts": []
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

## Torrent Blocker {#torrent-blocker}

:::danger

Для работы этого плагина необходима **минимальная** версия Xray-Core – **26.3.27**. Эта версия ядра идет по умолчанию с Remnawave Node **v2.7.0**.

:::

:::warning

Для корректной работы Torrent Blocker в вашем **инбаунде** обязательно должен быть включен **sniffing** с `destOverride`, включающим необходимые протоколы. Без включенного снифинга Xray-Core не сможет определить протокол трафика (в том числе `bittorrent`), и правило маршрутизации Torrent Blocker не сработает.

```json
"sniffing": {
    "enabled": true,
    "destOverride": [
        "http",
        "tls",
        "quic"
    ]
}
```

:::

Torrent Blocker – это плагин, который блокирует IP-адрес, с которого был обнаружен Torrent-трафик.

### Конфигурация {#torrent-blocker-configuration}

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

| Field             | Type    | Description                                                                                                                      |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`         | boolean | Включает или выключает плагин, по умолчанию выключен                                                                             |
| `ignoreLists`     | object  | Список IP-адресов и ID пользователей, которые будут игнорироваться плагином                                                      |
| `blockDuration`   | number  | Время блокировки в секундах                                                                                                      |
| `includeRuleTags` | array   | Необязательное поле. Массив значений `ruleTag` из ваших routing rules, по которым также будет выполняться блокировка IP-адресов. |

```jsonc title="ignoreLists"
{
    "ip": [],
    "userId": []
}
```

| Field    | Type  | Description                                                                                                                                |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `ip`     | array | Список IP-адресов, которые будут игнорироваться плагином (CIDR не поддерживается). Можно использовать списки из конфигурации Shared Lists. |
| `userId` | array | Список ID пользователей, которые будут игнорироваться плагином                                                                             |

<details>
<summary>includeRuleTags — блокировка по дополнительным правилам маршрутизации</summary>

По умолчанию Torrent Blocker создаёт собственное правило маршрутизации и добавляет его как **первый элемент** массива `routing.rules`. Это правило отслеживает только протокол `bittorrent`.

Однако, если в вашей конфигурации Xray-Core уже есть **собственные правила маршрутизации** с тегами (`ruleTag`), которые также связаны с торрент-трафиком, вы можете указать их в `includeRuleTags`. В этом случае Torrent Blocker будет блокировать IP-адреса, обнаруженные не только своим правилом, но и всеми указанными правилами.

#### Пример {#include-rule-tags-example}

Допустим, в вашей конфигурации Xray-Core есть следующие правила маршрутизации:

```json title="Пользовательские routing rules в Xray-Core"
{
    "domain": [
        "geosite:category-public-tracker"
    ],
    "ruleTag": "TORRENT_BY_DOMAIN",
    "outboundTag": "TORRENT"
},
{
    "port": "6881-6889,51413,21413,17417,37305",
    "ruleTag": "TORRENT_BY_PORT",
    "outboundTag": "TORRENT"
}
```

Первое правило блокирует трафик по доменам публичных торрент-трекеров, второе — по портам, которые обычно используются торрент-клиентами.

Чтобы Torrent Blocker обрабатывал срабатывания этих правил и блокировал IP-адреса по ним, укажите их `ruleTag` в `includeRuleTags`:

```json title="Конфигурация Torrent Blocker с includeRuleTags"
"torrentBlocker": {
    "enabled": true,
    "ignoreLists": {
        "ip": [],
        "userId": []
    },
    "blockDuration": 3600,
    "includeRuleTags": ["TORRENT_BY_DOMAIN", "TORRENT_BY_PORT"]
}
```

В результате, если Xray-Core обнаружит трафик, подпадающий под правила `TORRENT_BY_DOMAIN` или `TORRENT_BY_PORT`, Torrent Blocker заблокирует IP-адрес источника точно так же, как если бы сработало его собственное правило по протоколу `bittorrent`.

</details>

### Техническая информация {#technical-information}

Плагин использует одно из нововведений в Xray-Core – `webhook` (PR: [#5722](https://github.com/XTLS/Xray-core/pull/5722)). Поэтому для работы плагина необходима версия Xray-Core **26.3.27** или выше.

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
                    "deduplication": 5
                    // highlight-next-line-green
                }
            }
        ]
    }
}
```

Правило всегда будет помещаться в начало массива `rules`, перед остальными правилами. А `outbound` будет всегда добавляться в конец массива `outbounds`.

</details>

### Принцип работы {#principle-of-operation}

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

Вебхук будет содержать полный объект уже знакомых нам объектов `node` и `user`, а так же объект `report`, который содержит всю доступную информацию.

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

## Ingress Filter {#ingress-filter}

Ingress Filter – это плагин, который перманентно блокирует IP-адрес, который находится в списке. **Ingress Filter фильтрует входящий (ingress) трафик**.

### Конфигурация {#ingress-filter-configuration}

```json
"ingressFilter": {
    "blockedIps": [],
    "enabled": false
}
```

| Field        | Type    | Description                                                                                                                                                                                           |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`    | boolean | Включает или выключает плагин, по умолчанию выключен                                                                                                                                                  |
| `blockedIps` | array   | Список IP-адресов или CIDR-подсетей (IPv4/IPv6), которые будут заблокированы плагином. Можно использовать списки из конфигурации Shared Lists. Примеры: `192.168.1.1`, `10.0.0.0/8`, `2001:db8::/32`. |

### Принцип работы {#ingress-filter-about}

IP-адреса, указанные в списке – будут заблокированы в `nftables`.

:::danger

Ingress Filter – это очень опасный инструмент. Будьте внимательны и осторожны при составлении списков.

:::

## Egress Filter {#egress-filter}

Egress Filter — плагин для блокировки **исходящего** трафика. Позволяет запретить подключения к определённым IP-адресам или портам на стороне назначения.  
Например, можно заблокировать доступ к конкретным IP-адресам внутренних _(например, 10.0.0.1, 10.0.0.2)_ или внешних сервисов _(например, 8.8.8.8, 8.8.4.4)_ или закрыть нежелательные порты _(например, 25, 465, 587)_.

### Конфигурация {#egress-filter-configuration}

```json
"egressFilter": {
    "blockedIps": [],
    "blockedPorts": [],
    "enabled": false
}
```

| Field          | Type    | Description                                                                                                                                                                                           |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blockedIps`   | array   | Список IP-адресов или CIDR-подсетей (IPv4/IPv6), которые будут заблокированы плагином. Можно использовать списки из конфигурации Shared Lists. Примеры: `192.168.1.1`, `10.0.0.0/8`, `2001:db8::/32`. |
| `blockedPorts` | array   | Список портов, которые будут заблокированы плагином.                                                                                                                                                  |
| `enabled`      | boolean | Включает или выключает плагин, по умолчанию выключен                                                                                                                                                  |

## Connection Drop {#connection-drop}

Connection Drop – это не полноценный плагин, а небольшая надстройка для того, чтобы была возможность добавлять IP-адреса в whitelist для функционала Connection Drop.

Начиная с версии Remnawave Node **v2.6.0** – и при включении директивы `cap_add: NET_ADMIN` – Remnawave Node автоматически сбрасывает соединения при удалении пользователя из Xray-Core. В случае использования мостов – это могло привести к тому, что мостовое соединение могло быть разорвано в результате работы этой функции.

Начиная с версии Remnawave Node **v2.7.0** – вы можете включить whitelist для функционала Connection Drop.

:::note

Функции Connection Drop будут работать **всегда**, здесь настраивается только включение или выключение whitelist для этого функционала.

:::

### Конфигурация {#connection-drop-configuration}

```json
"connectionDrop": {
    "enabled": false,
    "whitelistIps": []
}
```

| Field          | Type    | Description                                                                             |
| -------------- | ------- | --------------------------------------------------------------------------------------- |
| `enabled`      | boolean | Включает или выключает плагин, по умолчанию выключен                                    |
| `whitelistIps` | array   | Список IP-адресов, которые будут добавлены в whitelist для функционала Connection Drop. |

## Shared Lists {#shared-lists}

Shared Lists – это список IP-адресов, которые могут быть использованы в других плагинах.

### Конфигурация {#shared-lists-configuration}

```json
"sharedLists": [
    {
        "name": "ext:my-list",
        "type": "ipList",
        "items": ["127.0.0.1", "127.0.0.2", "10.0.0.0/8", "2001:db8::/32"]
    }
]
```

| Field   | Type   | Description                                                                                           |
| ------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `name`  | string | Имя списка, должно начинаться с `ext:`                                                                |
| `type`  | string | Тип списка, должен быть `ipList`                                                                      |
| `items` | array  | Список IP-адресов или CIDR-подсетей (IPv4/IPv6). Примеры: `127.0.0.1`, `10.0.0.0/8`, `2001:db8::/32`. |

Пример использования в конфигурации Torrent Blocker:

```json
"torrentBlocker": {
    "enabled": false,
    "ignoreLists": {
        "ip": ["ext:my-list"]
    },
    "blockDuration": 3600
}
```

## Executor {#executor}

<img src={require('/node-plugins/executor.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Executor" />

**Executor** позволяет вам отправлять команды на выполнение: временная блокировка IP-адресов, снятие блокировки IP-адресов, сброс таблицы `nftables`.

:::warning
Для его работы **необязательно** иметь включенные плагины, однако директива `cap_add: NET_ADMIN` должна быть **обязательно** включена.
:::

### Block IPs {#block-ips}

<img src={require('/node-plugins/executor-ip-block.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

Команда предназначена для **временной блокировки IP-адресов**. Вы можете указать несколько адресов и время блокировки в секундах. 0 – означает до момента перезапуска Remnawave Node или изменения конфигурации плагина, который привязан на этой ноде.

:::tip

Пожалуйста, не используйте эту команду для перманентной блокировки IP-адресов. Используйте плагин **Ingress Filter** для этого.

:::

### Unblock IPs {#unblock-ips}

<img src={require('/node-plugins/executor-ip-unblock.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Node Plugins" />

Команда предназначена для **снятия блокировки IP-адресов**. При ее выполнении – будет отправлен запрос на снятие IP-адреса из таблицы `nftables`.

### Reset nftables {#reset-nftables}

Команда предназначена для **сброса таблицы `nftables`**. При ее выполнении – будет отправлен запрос на пересоздание таблицы `nftables`.
