---
sidebar_position: 3
title: Xray JSON – Advanced
---

## Обзор

Для шаблонов подписки типа **XRAY_JSON** в Remnawave предусмотрены **Remnawave-директивы** — специальные инструкции, которые вы добавляете в JSON-шаблон. Панель обрабатывает их при генерации подписки и удаляет из итогового конфига — клиент их никогда не увидит.

На данный момент доступна директива `injectHosts`, позволяющая динамически подставлять outbound-конфигурации хостов в шаблон. Это полезно, когда вам нужно собрать сложную конфигурацию Xray с балансировщиками, кастомным роутингом или несколькими outbound'ами, при этом данные подключения (адрес, порт, ключи) подставятся автоматически из панели.

:::tip Совет
Представленные ниже конфигурации являются **примерами** для демонстрации механизма инжекта. Адаптируйте их под свои нужды.
:::

:::warning Внимание
Требуется Remnawave версии 2.6.2 или новее.
:::

## Условия работы

- **Виртуальный хост** (хост, которому назначен шаблон с инжектом) должен быть **включён** и **не скрыт**.
- **Инжектируемые хосты** (на UUID которых ссылается `hostUuids`) должны быть **включены**, но **скрыты**.
- **Все хосты** — и виртуальный, и инжектируемые — должны быть доступны конечному пользователю: инбаунд, к которому они привязаны, должен быть включён в сквад пользователя.
- Из виртуального хоста в итоговый конфиг попадают **примечание** (remark) и **описание сервера** (Server Description, если задано).

## Структура remnawave

Объект `remnawave` добавляется на корневой уровень JSON-шаблона:

```json
"remnawave": {
    "injectHosts": {
        "hostUuids": ["uuid-хоста-1", "uuid-хоста-2"],
        "tagPrefix": "proxy"
    }
},
```

| Поле        | Описание                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------- |
| `hostUuids` | Массив UUID хостов, outbound'ы которых будут подставлены в шаблон. Хосты должны быть **скрытыми**. |
| `tagPrefix` | Префикс тега для создаваемых outbound'ов.                                                          |

### Правила формирования тегов

- Первый хост из массива получает тег, равный `tagPrefix` (например, `proxy`).
- Каждый последующий хост получает тег `{tagPrefix}-{N}`, начиная с 2.

Пример для трёх хостов с `tagPrefix: "proxy"`:

| Порядок в hostUuids | Тег outbound'а |
| ------------------- | -------------- |
| 1-й                 | `proxy`        |
| 2-й                 | `proxy-2`      |
| 3-й                 | `proxy-3`      |

## Префиксное сопоставление в Xray

Поля `selector` (в `routing.balancers`) и `subjectSelector` (в `burstObservatory`) в Xray работают как **префиксные матчеры** — они сопоставляются с **началом** тега outbound'а, а не с его точным значением.

Например, если в конфиге есть outbound'ы с тегами `proxy`, `proxy-2`, `proxy-3`, `direct`:

| Значение selector / subjectSelector | Какие outbound'ы будут выбраны |
| ----------------------------------- | ------------------------------ |
| `["proxy"]`                         | `proxy`, `proxy-2`, `proxy-3`  |
| `["proxy-"]`                        | `proxy-2`, `proxy-3`           |

- `"selector": ["proxy"]` — подхватит **все** инжектированные outbound'ы, включая первый.
- `"selector": ["proxy-"]` — подхватит все **кроме первого** (только `proxy-2`, `proxy-3`, ...).

:::note Fallback через первый хост
Первый хост в `hostUuids` всегда получает тег без суффикса `-{N}` (просто `proxy`). Это позволяет использовать его как `fallbackTag` в балансировщике: если все outbound'ы из `selector` окажутся недоступны, трафик уйдёт на первый хост. Для этого задайте `"selector": ["proxy-"]` (только `proxy-2`, `proxy-3`, ...) и `"fallbackTag": "proxy"`.
:::

## Пошаговый пример: балансировщик с тремя хостами

В этом примере мы создадим конфигурацию, в которой три outbound'а объединены в балансировщик со стратегией `leastLoad` и мониторятся обсерваторией.

### Шаг 1. Создайте хосты

Создайте в панели хосты, которые будут участвовать в инжекте. В нашем примере это:

- **Virtual Host** — виртуальный хост, которому будет назначен шаблон с инжектом. Он не скрыт и именно через него конечный пользователь получит конфиг.
- **Balancer #1**, **Balancer #2**, **Balancer #3** — хосты, outbound'ы которых будут подставлены в шаблон.

<img src={require('./images/xray-json-advanced/1.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Список хостов" />

### Шаг 2. Скройте инжектируемые хосты

Откройте карточку каждого хоста-балансировщика (Balancer #1, #2, #3), перейдите в раздел **Расширенные** и включите переключатель **Скрыть хост**.

Скрытые хосты не попадают в обычную подписку — они доступны только через механизм инжекта.

<img src={require('./images/xray-json-advanced/3.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Скрытие хостов-балансировщиков" />

### Шаг 3. Создайте шаблон подписки

Создайте шаблон подписки типа **XRAY_JSON**. В нём опишите полную конфигурацию: `dns`, `routing`, `inbounds`, `outbounds`, `burstObservatory` и другие нужные секции.

В массив `outbounds` поместите только статические outbound'ы (`direct`, `block`) — outbound'ы инжектируемых хостов будут добавлены автоматически.

На корневом уровне JSON добавьте объект `remnawave` с UUID скрытых хостов.

#### Пример шаблона

```json
{
    //highlight-next-line-green
    "remnawave": {
        //highlight-next-line-green
        "injectHosts": {
            //highlight-next-line-green
            "hostUuids": [
                //highlight-next-line-green
                "8478b271-95d3-4312-85ae-ecf63fb53d1d",
                //highlight-next-line-green
                "d31d6161-1315-4c1e-9a4b-141ab1c022f6",
                //highlight-next-line-green
                "5749f69e-cd1b-4012-9407-450434085196"
                //highlight-next-line-green
                "ЗАМЕНИТЬ_НА_СВОЙ_UUID"
            //highlight-next-line-green
            ],
            //highlight-next-line-green
            "tagPrefix": "proxy"
            //highlight-next-line-green
        }
    },
    "burstObservatory": {
        "pingConfig": {
            "timeout": "3s",
            "interval": "5m",
            "sampling": 1,
            "destination": "http://www.gstatic.com/generate_204",
            "connectivity": ""
        },
        "subjectSelector": ["proxy"]
    },
    "dns": {
        "servers": ["1.1.1.1", "1.0.0.1"],
        "queryStrategy": "UseIP"
    },
    "routing": {
        "balancers": [
            {
                "tag": "Super_Balancer",
                "selector": ["proxy"],
                "strategy": {
                    "type": "leastLoad",
                    "settings": {
                        "maxRTT": "1s",
                        "expected": 2,
                        "baselines": ["1s"],
                        "tolerance": 0.01
                    }
                },
                "fallbackTag": "direct"
            }
        ],
        "rules": [
            {
                "type": "field",
                "protocol": ["bittorrent"],
                "outboundTag": "direct"
            }
        ],
        "domainMatcher": "hybrid",
        "domainStrategy": "IPIfNonMatch"
    },
    "inbounds": [
        {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
                "udp": true,
                "auth": "noauth"
            },
            "sniffing": {
                "enabled": true,
                "routeOnly": false,
                "destOverride": ["http", "tls", "quic"]
            }
        },
        {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
                "allowTransparent": false
            },
            "sniffing": {
                "enabled": true,
                "routeOnly": false,
                "destOverride": ["http", "tls", "quic"]
            }
        }
    ],
    "outbounds": [
        {
            "tag": "direct",
            "protocol": "freedom"
        },
        {
            "tag": "block",
            "protocol": "blackhole"
        }
    ]
}
```

Обратите внимание:

- `"subjectSelector": ["proxy"]` — обсерватория будет мониторить **все** outbound'ы, тег которых начинается с `proxy` (т. е. `proxy`, `proxy-2`, `proxy-3`).
- `"selector": ["proxy"]` — балансировщик `Super_Balancer` будет распределять трафик между теми же outbound'ами.
- В `outbounds` шаблона указаны только `direct` и `block` — outbound'ы хостов добавятся автоматически перед ними.

### Шаг 4. Назначьте шаблон виртуальному хосту

Откройте карточку виртуального хоста (Virtual Host), перейдите в раздел **Расширенные** и в поле **Шаблон Xray JSON** выберите созданный шаблон.

Убедитесь, что переключатель **Скрыть хост** для виртуального хоста **выключен** — он должен быть видим в подписке.

<img src={require('./images/xray-json-advanced/2.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Назначение шаблона виртуальному хосту" />

### Шаг 5. Результат

При запросе подписки панель автоматически:

1. Возьмёт шаблон, назначенный виртуальному хосту.
2. Удалит из него объект `remnawave`.
3. Для каждого UUID из `hostUuids` найдёт скрытый хост и соберёт его outbound.
4. Подставит outbound'ы **в начало** массива `outbounds`.
5. Установит `remarks` из примечания виртуального хоста.

#### Итоговый конфиг, который получит клиент

```json
[
    {
        "dns": {
            "servers": ["1.1.1.1", "1.0.0.1"],
            "queryStrategy": "UseIP"
        },
        "routing": {
            "rules": [
                {
                    "type": "field",
                    "protocol": ["bittorrent"],
                    "outboundTag": "direct"
                }
            ],
            "balancers": [
                {
                    "tag": "Super_Balancer",
                    "selector": ["proxy"],
                    "strategy": {
                        "type": "leastLoad",
                        "settings": {
                            "maxRTT": "1s",
                            "expected": 2,
                            "baselines": ["1s"],
                            "tolerance": 0.01
                        }
                    },
                    "fallbackTag": "direct"
                }
            ],
            "domainMatcher": "hybrid",
            "domainStrategy": "IPIfNonMatch"
        },
        "inbounds": [
            {
                "tag": "socks",
                ...omitted...
            },
            {
                "tag": "http",
                ...omitted...
            }
        ],
        "outbounds": [
            {
                //highlight-next-line-green
                "tag": "proxy",
                "protocol": "vless",
                "settings": {...omitted...},
                "streamSettings": {...omitted...}
            },
            {
                //highlight-next-line-green
                "tag": "proxy-2",
                "protocol": "vless",
                "settings": {...omitted...},
                "streamSettings": {...omitted...}
            },
            {
                //highlight-next-line-green
                "tag": "proxy-3",
                "protocol": "vless",
                "settings": {...omitted...},
                "streamSettings": {...omitted...}
            },
            {
                "tag": "direct",
                "protocol": "freedom"
            },
            {
                "tag": "block",
                "protocol": "blackhole"
            }
        ],
        "burstObservatory": {
            "pingConfig": {
                "timeout": "3s",
                "interval": "5m",
                "sampling": 1,
                "destination": "http://www.gstatic.com/generate_204",
                "connectivity": ""
            },
            "subjectSelector": ["proxy"]
        },
        "remarks": "Virtual Host"
    }
]
```

Что произошло:

- Объект `remnawave` удалён из итогового конфига.
- Три outbound'а (`proxy`, `proxy-2`, `proxy-3`) подставлены в начало массива `outbounds`, перед `direct` и `block`.
- `"selector": ["proxy"]` в балансировщике автоматически захватил все три outbound'а, поскольку их теги начинаются с `proxy` (префиксное сопоставление).
- `"subjectSelector": ["proxy"]` в обсерватории аналогично подхватил все три outbound'а для мониторинга.
- `"remarks": "Virtual Host"` — взято из примечания виртуального хоста.

## Важные замечания

- **Виртуальный хост должен быть включён и не скрыт.** Именно он определяет, какой шаблон будет использован, и от него берутся `remarks` и `description`.
- **Инжектируемые хосты должны быть включены, но скрыты.** Если хост не скрыт, выключен или UUID не найден — он будет пропущен.
- **Все участвующие хосты** должны быть доступны конечному пользователю — инбаунд, к которому они привязаны, должен быть включён в сквад пользователя.
- **Объект `remnawave` удаляется** из итогового конфига — клиент его не увидит.
- **Outbound'ы добавляются в начало** массива `outbounds`. Статические outbound'ы из шаблона (`direct`, `block`) остаются после них.
- **Порядок UUID в `hostUuids`** определяет порядок outbound'ов и присваиваемые им теги.
- **Выбор шаблона и скрытие хоста** находятся в разделе **Расширенные** в карточке хоста.
