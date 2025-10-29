---
title: Zapret RU GOV
authors: remnawave
tags: [learn, zapret]
date: 2025-10-29
---

Блокировка доступа к запрещенным в РФ сервисам и сайтам. Файл обновляется регулярно и автоматически, подгружая последние списки запрета.

# Zapret RU GOV

Zapret RU GOV - это автоматически обновляемый список заблокированных в Российской Федерации сайтов и сервисов. Актуальная версия всегда доступна в репозитории проекта.

## Скачивание актуальной версии

Актуальная версия всегда доступна по адресу:

```bash
wget -O zapret.dat https://github.com/kutovoys/ru_gov_zapret/releases/latest/download/zapret.dat
```

## Ветки данных

Файл zapret.dat содержит две ветки:

1. **zapret.dat:zapret** - Все что заблокировано РКН (Роскомнадзор)
2. **zapret.dat:zapret-zapad** - Ресурсы не обслуживающие Русские IP

## Установка для сервера

### Создание директории

Создаем папку для хранения assets:

```bash
mkdir -p /opt/remnawave/xray/share/
```

### Скачивание файла

Скачиваем актуальный файл zapret.dat:

```bash
wget -O /opt/remnawave/xray/share/zapret.dat https://github.com/kutovoys/ru_gov_zapret/releases/latest/download/zapret.dat
```

### Конфигурация маршрутизации

Редактируем конфигурацию xray и добавляем правила маршрутизации:

```json
"routing": {
    "rules": [
        {
            "outboundTag": "BLOCK",
            "domain": [
                "ext:zapret.dat:zapret",
                "ext:zapret.dat:zapret-zapad"
            ]
        }
    ]
}
```

## Использование в Docker

Для использования файла в контейнере remnanode, добавьте volume монтирование в docker-compose.yml:

```yaml
volumes:
  - /opt/remnawave/xray/share/zapret.dat:/usr/local/bin/zapret.dat
```

Пример фрагмента конфигурации remnanode:

```yaml
services:
  remnanode:
    image: remnawave/node:latest
    restart: unless-stopped
    network_mode: host
    volumes:
      - /opt/remnawave/xray/share/zapret.dat:/usr/local/bin/zapret.dat
```

## Примечания

:::info Информация
Убедитесь, что путь `/opt/remnawave/xray/share/` существует и имеет правильные права доступа для пользователя, от которого запускается сервис.
:::

:::tip Совет
Для автоматического обновления списка запретов рекомендуется настроить cron job, который будет периодически загружать свежую версию файла.
:::
