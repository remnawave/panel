---
sidebar_position: 2
slug: /subscription-templating/client-configuration
title: Clients configuration
---

## Client configuration

```tsx
export interface IAppConfig {
    id: `${Lowercase<string>}`
    name: string
    isFeatured: boolean
    isNeedBase64Encoding?: boolean
    urlScheme: string
    installationStep: {
        buttons: {
            buttonLink: string
            buttonText: {
                en: string
                fa: string
                ru: string
            }
        }[]
        description: {
            en: string
            fa: string
            ru: string
        }
    }
    addSubscriptionStep: {
        description: {
            en: string
            fa: string
            ru: string
        }
    }
    connectAndUseStep: {
        description: {
            en: string
            fa: string
            ru: string
        }
    }
    additionalBeforeAddSubscriptionStep?: {
        buttons: {
            buttonLink: string
            buttonText: {
                en: string
                fa: string
                ru: string
            }
        }[]
        description: {
            en: string
            fa: string
            ru: string
        }
        title: {
            en: string
            fa: string
            ru: string
        }
    }
    additionalAfterAddSubscriptionStep?: {
        buttons: {
            buttonLink: string
            buttonText: {
                en: string
                fa: string
                ru: string
            }
        }[]
        description: {
            en: string
            fa: string
            ru: string
        }
        title: {
            en: string
            fa: string
            ru: string
        }
    }
}

export interface IPlatformConfig {
    ios: IAppConfig[]
    android: IAppConfig[]
    pc: IAppConfig[]
}
```

## Usage Guide

This guide explains how to add client applications for different platforms to the Remnawave subscription page.

### Configuration Structure

Create a file named `app-config.json` with the following structure:

```json
{
    "ios": [
        /* iOS app configurations */
    ],
    "android": [
        /* Android app configurations */
    ],
    "pc": [
        /* Desktop app configurations */
    ]
}
```

Each platform contains an array of application configurations that follow the `IAppConfig` interface.

### Application Configuration Properties

| Property                              | Type    | Required | Description                                          |
| ------------------------------------- | ------- | -------- | ---------------------------------------------------- |
| `id`                                  | string  | Yes      | Unique lowercase identifier for the app              |
| `name`                                | string  | Yes      | Display name of the application                      |
| `isFeatured`                          | boolean | Yes      | Whether the app should be featured in the UI         |
| `isNeedBase64Encoding`                | boolean | No       | Whether the subscription URL needs Base64 encoding   |
| `urlScheme`                           | string  | Yes      | URL scheme for launching the app with subscription   |
| `installationStep`                    | object  | Yes      | Instructions for installing the application          |
| `addSubscriptionStep`                 | object  | Yes      | Instructions for adding a subscription               |
| `connectAndUseStep`                   | object  | Yes      | Instructions for connecting to VPN                   |
| `additionalBeforeAddSubscriptionStep` | object  | No       | Optional additional steps before adding subscription |
| `additionalAfterAddSubscriptionStep`  | object  | No       | Optional additional steps after adding subscription  |

### Localization

All user-facing text supports multiple languages:

```json
"description": {
  "en": "English text",
  "fa": "Persian text",
  "ru": "Russian text"
}
```

### Example App Configuration

Here's a simplified example for one application:

```json
{
    "id": "happ",
    "name": "Happ",
    "isFeatured": true,
    "urlScheme": "happ://add/",
    "installationStep": {
        "buttons": [
            {
                "buttonLink": "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
                "buttonText": {
                    "en": "Open in App Store",
                    "fa": "باز کردن در App Store",
                    "ru": "Открыть в App Store"
                }
            }
        ],
        "description": {
            "en": "Open the page in App Store and install the app.",
            "fa": "صفحه را در App Store باز کنید و برنامه را نصب کنید.",
            "ru": "Откройте страницу в App Store и установите приложение."
        }
    },
    "addSubscriptionStep": {
        "description": {
            "en": "Click the button below to add subscription",
            "fa": "برای افزودن اشتراک روی دکمه زیر کلیک کنید",
            "ru": "Нажмите кнопку ниже, чтобы добавить подписку"
        }
    },
    "connectAndUseStep": {
        "description": {
            "en": "Open the app and connect to the server",
            "fa": "برنامه را باز کنید و به سرور متصل شوید",
            "ru": "Откройте приложение и подключитесь к серверу"
        }
    }
}
```

### Optional Fields

#### Additional Steps

You can provide additional instructions before or after adding a subscription:

```json
"additionalBeforeAddSubscriptionStep": {
  "buttons": [
    {
      "buttonLink": "https://example.com/guide",
      "buttonText": {
        "en": "View Guide",
        "fa": "مشاهده راهنما",
        "ru": "Посмотреть руководство"
      }
    }
  ],
  "description": {
    "en": "Make sure to grant all required permissions",
    "fa": "اطمینان حاصل کنید که تمام مجوزهای لازم را اعطا کرده‌اید",
    "ru": "Убедитесь, что предоставили все необходимые разрешения"
  },
  "title": {
    "en": "Permissions",
    "fa": "مجوزها",
    "ru": "Разрешения"
  }
}
```

```json
"additionalAfterAddSubscriptionStep": {
  "buttons": [
    {
      "buttonLink": "https://example.com/guide",
      "buttonText": {
        "en": "View Guide",
        "fa": "مشاهده راهنما",
        "ru": "Посмотреть руководство"
      }
    }
  ],
  "description": {
    "en": "Make sure to grant all required permissions",
    "fa": "اطمینان حاصل کنید که تمام مجوزهای لازم را اعطا کرده‌اید",
    "ru": "Убедитесь, что предоставили все необходимые разрешения"
  },
  "title": {
    "en": "Permissions",
    "fa": "مجوزها",
    "ru": "Разрешения"
  }
}
```

#### Base64 Encoding

Some applications require the subscription URL to be Base64 encoded:

```json
"isNeedBase64Encoding": true
```

### Mounting to the subscrion-page

Modify your docker-compose.yml file to mount the app-config.json file to the subscription-page container:

```yaml
volumes:
    - ./app-config.json:/app/dist/assets/app-config.json
```

Restart the subscription-page container to apply the changes.

```bash
docker compose down && docker compose up -d && docker compose logs -f
```

### Full Example

See the [complete example](https://raw.githubusercontent.com/remnawave/subscription-page/refs/heads/main/public/assets/app-config.json) to understand how to configure multiple applications across different platforms.
