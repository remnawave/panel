---
sidebar_position: 2
title: Серверный роутинг
---

В этом примере мы рассмотрим, как можно настроить серверный роутинг с помощью сервисных пользователей в панели Remnawave.

<!-- truncate -->

# Серверный роутинг

Некоторые пользователи могли столкнуться с проблемой, что Remnawave автоматически очищает массив _clients_ из серверной конфигурации. Это не ошибка и не баг, панель автоматически очищает эти массивы, так как для правильной работы некоторых функций панели – панель должна быть уверена в том, что в этом массиве не будет ничего лишнего.

Представим, что у нас имеется два сервера. Будем называть их: `RU-001`, `DE-001`.

Пользователи будут подключаться к серверу `RU-001`, мы будем делать _роутинг_ трафика и для примера – .ru сайты отправлять _напрямую_, а все остальное на сервер `DE-001`.

Для решения этой задачи нам потребуется создать _сервисного пользователя_, через который мы и будем производить **роутинг**.

## Создание профиля для DE-001

Перейдите в раздел _Config Profiles_ и создайте новый профиль, дадим ему название `Bridge Profile`.

```json
{
    "log": {
        "loglevel": "warning"
    },
    "dns": {},
    "inbounds": [
        {
            "tag": "BRIDGE_DE_IN",
            "port": 9999,
            "listen": "0.0.0.0",
            "protocol": "shadowsocks",
            "settings": {
                "clients": [],
                "network": "tcp,udp"
            },
            "sniffing": {
                "enabled": true,
                "destOverride": ["http", "tls", "quic"]
            }
        }
    ],
    "outbounds": [
        {
            "tag": "DIRECT",
            "protocol": "freedom"
        },
        {
            "tag": "BLOCK",
            "protocol": "blackhole"
        }
    ],
    "routing": {
        "rules": []
    }
}
```

Сохраняем обновленную конфигуруацию.

Переходим в раздел **Internal Squad** (Для создания нового сквада нажмите на плюсик справа в углу). В этом скваде включаем только свежесозданный инбаунд `BRIDGE_DE_IN` из профиля `Bridge Profile`.

Так же, обязательно включите этот инбаунд и профиль в карточке ноды. В нашем случае – ноды `DE-001`.

## Создание сервисного пользователя

Перейдите в раздел _Users_, создайте пользователя с названием `bridge_user_001`. Убедитесь, что у этого пользователя не установлено ограничений по трафику и установите дату, когда истекает подписка где-нибудь в районе 2099 года. (_Нам ведь не нужно, чтобы панель отключила юзера из-за достижения лимита трафика или по причине того, что у него истекла подписка?_)

Не забываем активировать сквад для этого пользователя. В нашем случае – активируем пользователю созданный выше сквад.

После того как пользователь успешно создался, откройте его карточку и в меню (кнопка **More Actions**) нажимаем на секцию **Detailed Info**.

В этой секции листаем в самый низ и в зависимости от того, какого типа у вас инбаунд, копируем информацию.

| Протокол    | Обозначение в панели |
| ----------- | -------------------- |
| Shadowsocks | SS Password          |
| VLESS       | VLESS UUID           |
| Trojan      | Trojan Password      |

Итого, у нас руках должен быть пароль для подключения.

## Настройка публичного профиля

Скорее всего такой профиль уже у вас имеется, по нему подключается пользователи. Секция inbounds в нем можно не трогать, нас интересует секция outbounds и routing.rules.

```json
{
    "log": { "loglevel": "none" },
    "inbounds": [
        {
            "tag": "PUBLIC_RU_INBOUND",
            "port": 443,
            "listen": "0.0.0.0",
            "protocol": "vless",
            "settings": { "clients": [], "decryption": "none" },
            "sniffing": { "enabled": true, "destOverride": ["http", "tls", "quic"] },
            "streamSettings": {
                "network": "raw",
                "security": "reality",
                "realitySettings": {
                    "target": "USE OWN VALUE!",
                    "show": false,
                    "xver": 0,
                    "shortIds": [""],
                    "privateKey": "USE OWN KEY!",
                    "serverNames": ["REPLACE WITH OWN VALUES!"]
                }
            }
        }
    ],
    "outbounds": [
        { "protocol": "freedom", "tag": "DIRECT" },
        { "protocol": "blackhole", "tag": "BLOCK" }
    ],
    "routing": {
        "rules": [
            { "ip": ["geoip:private"], "outboundTag": "BLOCK" },
            {
                "domain": ["geosite:private"],
                "outboundTag": "BLOCK"
            },
            { "protocol": ["bittorrent"], "outboundTag": "BLOCK" }
        ]
    }
}
```

Итак, изначально перед нами стоит задача – пользователи подключаются к серверу `RU-001` по протоколу `VLESS`, а дальше мы путем роутинга перенаправляем трафик.

### Outbound

Для начала нам нужно собрать `outbound`.

```json
{
    "tag": "SS_OUTBOUND_TO_DE",
    "protocol": "shadowsocks",
    "settings": {
        "servers": [
            {
                "address": "ADDRESS OF DE-001",
                "password": "ПАРОЛЬ С ПРОШЛОГО ШАГА",
                "port": 9999,
                "level": 0,
                "method": "chacha20-ietf-poly1305"
            }
        ]
    }
}
```

| Значение | Что вводить?                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------- |
| address  | IP или доменное имя, которое будет направлено на ваш сервер, например IP-адрес сервера `DE-001`       |
| port     | Порт инбаунда, в нашем случае это порт инбаунда `BRIDGE_DE_IN`                                        |
| password | Пароль пользователя для подключения (в зависимости от протокола могут быть разные значения, см. выше) |

В случае **Shadowsocks** – не используйте никакие другие методы кроме `chacha20-ietf-poly1305`, так как Remnawave поддерживает только этот метод.

### Роутинг

Пример правила, которое направит весь трафик в указанный выше outbound.

```json
{
    "inboundTag": ["PUBLIC_RU_INBOUND"],
    "outboundTag": "SS_OUTBOUND_TO_DE"
}
```

Пример правил, которые направят RU сайты напрямую (сразу на выход из ноды `RU-001`, а все остальное в `DE-001`)

```json
      {
        "ip": [
          "geoip:ru"
        ],
        "outboundTag": "DIRECT"
      },
      {
        "domain": [
          "geosite:category-ru"
        ],
        "outboundTag": "DIRECT"
      }
```

Собираем полную конфигурацию, она будет выглядеть вот так.

```json
{
    "log": { "loglevel": "none" },
    "inbounds": [
        {
            "tag": "PUBLIC_RU_INBOUND",
            "port": 443,
            "listen": "0.0.0.0",
            "protocol": "vless",
            "settings": { "clients": [], "decryption": "none" },
            "sniffing": { "enabled": true, "destOverride": ["http", "tls", "quic"] },
            "streamSettings": {
                "network": "raw",
                "security": "reality",
                "realitySettings": {
                    "target": "USE OWN VALUE!",
                    "show": false,
                    "xver": 0,
                    "shortIds": [""],
                    "privateKey": "USE OWN KEY!",
                    "serverNames": ["REPLACE WITH OWN VALUES!"]
                }
            }
        }
    ],
    "outbounds": [
        { "protocol": "freedom", "tag": "DIRECT" },
        { "protocol": "blackhole", "tag": "BLOCK" },
        {
            "tag": "SS_OUTBOUND_TO_DE",
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "ADDRESS OF DE-001",
                        "password": "ПАРОЛЬ С ПРОШЛОГО ШАГА",
                        "port": 9999,
                        "level": 0,
                        "method": "chacha20-ietf-poly1305"
                    }
                ]
            }
        }
    ],
    "routing": {
        "rules": [
            { "ip": ["geoip:private"], "outboundTag": "BLOCK" },
            { "domain": ["geosite:private"], "outboundTag": "BLOCK" },
            { "protocol": ["bittorrent"], "outboundTag": "BLOCK" },
            { "ip": ["geoip:ru"], "outboundTag": "DIRECT" },
            { "domain": ["geosite:category-ru"], "outboundTag": "DIRECT" },
            {
                "inboundTag": ["PUBLIC_RU_INBOUND"],
                "outboundTag": "SS_OUTBOUND_TO_DE"
            }
        ]
    }
}
```

Соответственно, наш outbound – `SS_OUTBOUND_TO_DE` мы добавили в массив `outbounds`, а правила добавили в массив в объекте `rules` (который находится в объекте `routing`).

Правила в Xray работают по принципу очередности. Наши правила можно расшифровать примерно вот так:

1. Если IP адрес входит в `geoip:private` – **BLOCK** (отправляется в `outbound` **BLOCK**, который в свою очередь является _blackhole_ (блокируется)).
2. Если домен входит в категорию `geosite:private` – те же действия
3. Тоже самое и для `bittorrent` трафика.
4. Если IP адрес входит в `geoip:ru` – отправляем в `DIRECT` Outbound, следовательно трафик выйдет с нашего `RU-001` сервера.
5. Если домен входит в категорию `geosite:category-ru` – отправляем так же в `DIRECT`.
6. Если трафик пришел из инбаунда `PUBLIC_RU_INBOUND` – мы отправляем его в outbound `SS_OUTBOUND_TO_DE` (и там он уходит уходит на наш сервер – `DE-001`).

# Заключение

В этом примере у нас получилась вот такая схема:

- Пользователь подключается к серверу `RU-001` с помощью протокола `VLESS`
- Трафик попадает под правила:
    - RU-сайты (или IP) – идут сразу на выход (DIRECT)
    - Весь остальной трафик – отправляется через протокол `shadowsocks` на другой сервер – `DE-001`

В качестве транзитного протокола так же можно использовать и `VLESS`, в основном будет отличаться только наш `outbound`.
