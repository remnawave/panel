---
sidebar_position: 2
title: Устранение неполадок
---

## Страница подписки

### 502 Bad Gateway на странице подписки {#502-bad-gateway-subscription-page}

#### Проблема

При переходе на домен страницы подписки возвращается ошибка 502 Bad Gateway.

#### Почему это происходит

Данная ошибка возникает по следующим причинам:

- Неправильный путь URL — открывается корневой домен без UUID подписки
- Реверс-прокси не перенаправляет запросы на контейнер страницы подписки
- Неверные переменные окружения
- DNS не указывает на правильный IP
- Контейнер страницы подписки недоступен
- Некорректные таймауты в конфигурации реверс-прокси
- Блокировка файрволом/WAF

#### Решение

1. Используйте правильный формат URL:

```
https://sub.example.com/<shortUuid>
```

2. Убедитесь, что реверс-прокси направляет трафик на `remnawave-subscription-page:3010`.

3. Проверьте логи контейнера страницы подписки:

```bash
docker compose logs -t -f
```

4. Проверьте значение `SUB_PUBLIC_DOMAIN` в `.env` панели. После правки перезапустите контейнер панели.

5. Убедитесь, что DNS указывает на правильный IP.

6. Проверьте доступность контейнера/бэкенда подписки.

7. Проверьте таймауты в конфигурации реверс-прокси.

8. Проверьте правила файрвола/WAF.

---

## Панель Remnawave

### "timeout of 45000ms exceeded" в панели {#timeout-45000ms-exceeded}

#### Проблема

В интерфейсе панели появляется сообщение об ошибке таймаута при операциях с нодами.

#### Почему это происходит

Данная ошибка возникает по следующим причинам:

- Панель не может подключиться к REST API ноды по указанному порту
- Блокировки или высокая задержка между панелью и нодой
- Несоответствие переменных окружения ноды настройкам панели

#### Решение

1. Убедитесь, что значение `Node Port` на ноде совпадает с портом, который использовался при генерации docker-compose для панели.

2. С хоста панели проверьте доступность порта ноды (telnet/curl).

3. Обеспечьте стабильное сетевое соединение. По возможности разместите ноду на сервере с надёжным каналом.

4. Для сложных топологий рассмотрите тунеллирование между панелью и нодой (например, с помощью Tailscale).

5. Проверьте соответствие переменных окружения ноды настройкам панели.

6. Просмотрите логи контейнера ноды:

```bash
docker compose logs -f -t
```

7. Убедитесь, что нода запустилась без ошибок привязки портов.

### 502 после обновления панели {#502-after-panel-upgrade}

#### Проблема

После обновления панели часть запросов возвращает ошибку 502.

#### Почему это происходит

Nginx не перезагрузился и не подхватил новый адрес от панели.

#### Решение

1. Следуйте разделу Upgrading в документации.

2. Перезапустите панель и зависимые сервисы.

3. Убедитесь, что контейнеры используют обновлённые образы.

4. Если реверс-прокси работает отдельно, перезапустите его.

5. Проверьте, что конфигурация прокси по-прежнему указывает на правильные контейнеры/сети.

### Telegram OAuth: "domain invalid" {#telegram-oauth-domain-invalid}

#### Проблема

При попытке авторизации через Telegram появляется ошибка "domain invalid".

#### Решение

1. Откройте @BotFather → Bot Settings → Domain.

2. Укажите домен панели:

```
https://panel.domain.com
```

3. Сохраните настройки в панели: Settings → Telegram.

:::caution
OAuth Telegram не поддерживает домены в зоне `.xyz`.
:::

### Ошибки collation после обновления PostgreSQL {#collation-errors-after-postgresql-upgrade}

#### Проблема

После мажорного обновления PostgreSQL возникают ошибки, связанные с collation базы данных.

#### Почему это происходит

Такие ошибки чаще появляются при смене мажорной версии PostgreSQL, когда collations старой БД не совпадают с требуемыми новой версии.

#### Решение

1. Откройте контейнер панели:

```bash
docker exec -it remnawave remnawave
```

2. В rescue CLI выполните действие:

```
● Fix Collation (Fix Collation issues for current database)
```

3. Перезапустите панель:

```bash
docker compose down && docker compose up -d
```

---

## Нода Remnawave

### ECONNREFUSED после переустановки ноды {#econnrefused-after-node-reinstall}

#### Проблема

Панель не может подключиться к ноде. В логах отображается ошибка ECONNREFUSED.

#### Решение

1. Убедитесь, что параметры ноды соответствуют тем, которые сгенерировала панель.

2. Подтвердите корректность `Node Port`.

3. Просмотрите логи:

```bash
docker compose logs -f -t
```

4. Убедитесь в отсутствии ошибок привязки портов и в доступности порта.

5. Проверьте `REMNAWAVE_PANEL_URL` для страницы подписки — он должен указывать на достижимый домен панели или внутренний сервис. Если страница подписки установлена рядом с Remnawave - следует использовать `http://remnawave-subscription-page:3010`.

### XML-RPC fault: SPAWN_ERROR: xray {#xml-rpc-fault-spawn-error-xray}

#### Проблема

В логах ноды отображается следующая ошибка:

```title="cd /opt/remnanode && docker compose logs -f -t"
remnanode  | ERROR [HttpExceptionFilter]      Failed to get system stats - { stack: [ null ], code: 'A010', path: '/node/stats/get-system-stats' }
remnanode  | LOG [XrayService]      Getting config checksum...
remnanode  | LOG [XrayService]      XTLS config generated in: 1ms
// highlight-next-line-red
remnanode  | ERROR [XrayService]      XML-RPC fault: SPAWN_ERROR: xray - { stack: [ null ] }
remnanode  | LOG [XrayService]      Start XTLS took: 2s 568ms
remnanode  | ERROR [StatsService]     Failed to get system stats: /xray.app.stats.command.StatsService/GetSysStats UNAVAILABLE: No connection established. Last error: connect ECONNREFUSED 127.0.0.1:61000 (2025-05-08T14:36:08.821Z) - { stack: [ null ], isOk: false, code: 'A002' }
```

#### Почему это происходит

Данная ошибка возникает, когда Xray core не запускается из-за неправильной конфигурации.

#### Решение

1. Проверьте логи **Xray core** для получения детальной информации:

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.out.log
```

или

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.err.log
```

2. В большинстве случаев в логах будет указана причина, по которой Xray core не запускается.

3. Исправьте проблему в панели Remnawave в разделе **Xray Config**. Сохраните изменения.

---

## Ключевые переменные окружения

Конфигурация панели:

```bash
# Домен панели для CORS/UI
FRONT_END_DOMAIN=panel.yourdomain.com

# Публичный URL страницы подписки
SUB_PUBLIC_DOMAIN=sub.yourdomain.com
```

Страница подписки:

```bash
# Кастомный префикс подписки (опционально)
CUSTOM_SUB_PREFIX=/custom-path

# URL панели для доступа к API
REMNAWAVE_PANEL_URL=https://panel.yourdomain.com
```

Дополнительные опции:

```bash
# Включить документацию API
IS_DOCS_ENABLED=true
SWAGGER_PATH=/swagger
SCALAR_PATH=/scalar

# Метрики Prometheus
METRICS_USER=admin
METRICS_PASS=password
```

:::caution
После изменения переменных окружения перезапускайте соответствующие сервисы.
:::

---

## Быстрый диагностический чек-лист

При 502:

- [ ] DNS резолвится в правильный IP
- [ ] Контейнер бэкенда запущен
- [ ] Конфигурация реверс-прокси корректна
- [ ] Сервис доступен по правильному пути (домен vs подпуть)
- [ ] Таймауты прокси настроены адекватно
- [ ] Переменные окружения установлены верно
- [ ] Сервисы перезапущены после изменений

Если состояние ноды CONNECTED, но функциональность не работает:

- [ ] Убедитесь, что ноды в статусе CONNECTED (UI + логи)
- [ ] Проверьте корректность конфигурации ноды: servernames, target, dest и др.
- [ ] Убедитесь, что целевые адреса/порты доступны с хоста ноды
- [ ] Проверьте настройки панели:
  - [ ] Пользователь назначен в Internal Squad
  - [ ] Internal Squad имеет включённые Inbounds (берутся из Config Profile)
  - [ ] Внутренний сквад/хосты правильно назначены и активны
- [ ] Проверьте, что на хосте нет overrides в Advanced (Advanced → Overrides)
- [ ] После изменений в Hosts или Internal Squads обновите подписки в клиентских приложениях
- [ ] Просмотрите логи ноды на WARN/ERROR по маршрутизации, TLS, DNS и аутентификации
- [ ] Проверьте локальные правила файрвола на хосте ноды

При таймаутах:

- [ ] Node Port совпадает в конфигурации панели и ноды
- [ ] Панель может достучаться до порта ноды (telnet/curl)
- [ ] Контейнер ноды запущен
- [ ] Сетевое подключение стабильное
- [ ] Нет блокировок файрвола между панелью и нодой

При проблемах с Telegram OAuth:

- [ ] Домен правильно настроен в BotFather
- [ ] Используется поддерживаемая доменная зона (не `.xyz`)
- [ ] Настройки сохранены в панели

---

## Дополнительные ресурсы

- Руководство по установке: [https://remna.st/docs/overview/quick-start/](https://remna.st/docs/overview/quick-start/)
- Инструкция по использованию панели: [https://remna.st/blog/learn](https://remna.st/blog/learn)
- Установка панели: [https://remna.st/docs/install/remnawave-panel/](https://remna.st/docs/install/remnawave-panel/)
- Установка ноды: [https://remna.st/docs/install/remnawave-node/](https://remna.st/docs/install/remnawave-node/)
- Настройка страницы подписки: [https://remna.st/docs/install/subscription-page/bundled/](https://remna.st/docs/install/subscription-page/bundled/)
- Переменные окружения: [https://remna.st/docs/install/environment-variables/](https://remna.st/docs/install/environment-variables/)
- Руководство по обновлению: [https://remna.st/docs/install/upgrading/](https://remna.st/docs/install/upgrading/)
- Документация API: [https://remna.st/api/](https://remna.st/api/)
- Telegram-канал: [https://t.me/s/remnawave](https://t.me/s/remnawave)
- GitHub Issues: [https://github.com/remnawave/panel/issues](https://github.com/remnawave/panel/issues)

