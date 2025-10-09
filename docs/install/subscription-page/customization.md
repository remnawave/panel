---
sidebar_position: 3
title: Customization
---

### Custom app-config.json (custom apps) {#app-config}

Modify your docker-compose.yml file to mount the app-config.json file to the subscription-page container:

```yaml
volumes:
    - ./app-config.json:/opt/app/frontend/assets/app-config.json
```

:::tip Understanding the syntax

In this example above, we are mounting the `app-config.json` file from the current directory on the **host** machine to the `/opt/app/frontend/assets/app-config.json` path in the subscription-page container.

- `./app-config.json` - This is the path to the app-config.json file in the current directory on the **host** machine.

- `/opt/app/frontend/assets/app-config.json` - This is the path to the app-config.json file in the subscription-page container. **Do not change this path**.

:::

Restart the subscription-page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```

### Quick Start Guide

For most users, you only need to understand these main parts:

1. **Languages** - Which languages to support (English is always included)
2. **Branding** - Your logo, brand name, and support link (optional)
3. **Apps** - Which VPN apps to show for each platform (Android, iOS, etc.)

<details>
<summary>📋 Technical Interface (for developers)</summary>

```tsx
export type TAdditionalLocales = 'fa' | 'ru' | 'zh'
export type TEnabledLocales = 'en' | TAdditionalLocales
export type TPlatform = 'android' | 'androidTV' | 'appleTV' | 'ios' | 'linux' | 'macos' | 'windows'

export interface ILocalizedText {
    en: string // English text (required)
    fa?: string // Persian text (optional)
    ru?: string // Russian text (optional)
    zh?: string // Chinese text (optional)
}

export interface IStep {
    description: ILocalizedText // Instructions text
}

export interface IButton {
    buttonLink: string // URL where button leads
    buttonText: ILocalizedText // Text on the button
}

export interface ITitleStep extends IStep {
    buttons: IButton[] // List of buttons
    title: ILocalizedText // Step title
}

export interface IAppConfig {
    // Optional extra steps
    additionalAfterAddSubscriptionStep?: ITitleStep
    additionalBeforeAddSubscriptionStep?: ITitleStep

    // Required steps
    addSubscriptionStep: IStep // How to add subscription
    connectAndUseStep: IStep // How to connect to VPN
    installationStep: {
        // How to install the app
        buttons: IButton[]
        description: ILocalizedText
    }

    // App details
    id: string // Unique app identifier
    name: string // App display name
    isFeatured: boolean // Show as recommended app
    isNeedBase64Encoding?: boolean // Some apps need special encoding
    urlScheme: string // How to open the app automatically
}

export interface ISubscriptionPageConfiguration {
    additionalLocales: TAdditionalLocales[] // Extra languages besides English
    branding?: {
        // Optional customization
        logoUrl?: string // Your company logo
        name?: string // Your company name
        supportUrl?: string // Your support page
    }
}

export interface ISubscriptionPageAppConfig {
    config: ISubscriptionPageConfiguration // Global settings
    platforms: Record<TPlatform, IAppConfig[]> // Apps for each platform
}
```

</details>

### Simple Configuration Examples

#### Example 1: Basic Setup (Minimal)

This is the simplest configuration - just support English and add one app for Android and iOS:

<details>
<summary>📋 Example 1</summary>

```json
{
    "config": {
        "additionalLocales": []
    },
    "platforms": {
        "android": [
            {
                "id": "v2rayng",
                "name": "v2rayNG",
                "isFeatured": true,
                "urlScheme": "v2rayng://add/",
                "installationStep": {
                    "buttons": [
                        {
                            "buttonLink": "https://play.google.com/store/apps/details?id=com.v2ray.ang",
                            "buttonText": { "en": "Install from Google Play" }
                        }
                    ],
                    "description": { "en": "Install v2rayNG from Google Play Store" }
                },
                "addSubscriptionStep": {
                    "description": { "en": "Tap the button below to add your subscription" }
                },
                "connectAndUseStep": {
                    "description": { "en": "Open the app, select a server and tap connect" }
                }
            }
        ],
        "ios": [
            {
                "id": "shadowrocket",
                "name": "Shadowrocket",
                "isFeatured": true,
                "urlScheme": "shadowrocket://add/",
                "installationStep": {
                    "buttons": [
                        {
                            "buttonLink": "https://apps.apple.com/app/shadowrocket/id932747118",
                            "buttonText": { "en": "Install from App Store" }
                        }
                    ],
                    "description": { "en": "Install Shadowrocket from App Store" }
                },
                "addSubscriptionStep": {
                    "description": { "en": "Tap the button below to add your subscription" }
                },
                "connectAndUseStep": {
                    "description": { "en": "Open the app and tap the connect button" }
                }
            }
        ],
        "windows": [],
        "macos": [],
        "linux": [],
        "androidTV": [],
        "appleTV": []
    }
}
```

</details>

#### Example 2: With Branding and Multiple Languages

This adds your company branding and supports Russian and Persian languages:

<details>
<summary>📋 Example 2</summary>

```json
{
    "config": {
        "additionalLocales": ["ru", "fa"],
        "branding": {
            "name": "MyVPN Service",
            "logoUrl": "https://example.com/logo.png",
            "supportUrl": "https://example.com/support"
        }
    },
    "platforms": {
        "android": [
            {
                "id": "v2rayng",
                "name": "v2rayNG",
                "isFeatured": true,
                "urlScheme": "v2rayng://add/",
                "installationStep": {
                    "buttons": [
                        {
                            "buttonLink": "https://play.google.com/store/apps/details?id=com.v2ray.ang",
                            "buttonText": {
                                "en": "Install from Google Play",
                                "ru": "Установить из Google Play",
                                "fa": "نصب از Google Play"
                            }
                        }
                    ],
                    "description": {
                        "en": "Install v2rayNG from Google Play Store",
                        "ru": "Установите v2rayNG из Google Play Store",
                        "fa": "v2rayNG را از Google Play Store نصب کنید"
                    }
                },
                "addSubscriptionStep": {
                    "description": {
                        "en": "Tap the button below to add your subscription",
                        "ru": "Нажмите кнопку ниже, чтобы добавить подписку",
                        "fa": "برای افزودن اشتراک روی دکمه زیر بزنید"
                    }
                },
                "connectAndUseStep": {
                    "description": {
                        "en": "Open the app, select a server and tap connect",
                        "ru": "Откройте приложение, выберите сервер и нажмите подключить",
                        "fa": "برنامه را باز کنید، سرور را انتخاب کنید و روی اتصال بزنید"
                    }
                }
            }
        ],
        "ios": [],
        "windows": [],
        "macos": [],
        "linux": [],
        "androidTV": [],
        "appleTV": []
    }
}
```

</details>

### Understanding the Structure

Every configuration file has two main parts:

1. **Global Settings (`config`)**:
    - `additionalLocales`: Extra languages (besides English)
    - `branding`: Your brand info (optional)

2. **Platform Apps (`platforms`)**:
    - For each platform (android, ios, etc.), list the VPN apps
    - Each app needs: name, install instructions, subscription instructions, and connect instructions

### Configuration Structure

Create a file named `app-config.json` with the following structure:

```json
{
    "config": {
        "additionalLocales": ["fa", "ru", "zh"],
        "branding": {
            "logoUrl": "https://example.com/logo.png",
            "name": "Your Brand Name",
            "supportUrl": "https://example.com/support"
        }
    },
    "platforms": {
        "ios": [
            /* iOS app configurations */
        ],
        "android": [
            /* Android app configurations */
        ],
        "androidTV": [
            /* Android TV app configurations */
        ],
        "appleTV": [
            /* Apple TV app configurations */
        ],
        "linux": [
            /* Linux app configurations */
        ],
        "macos": [
            /* macOS app configurations */
        ],
        "windows": [
            /* Windows app configurations */
        ]
    }
}
```

The configuration consists of two main sections:

- `config`: Global configuration settings including localization and branding
- `platforms`: Platform-specific application configurations

### 📋 Configuration Reference

#### Global Settings

| Property              | Type     | Required | What it does                                                                                   | Example                          |
| --------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------- | -------------------------------- |
| `additionalLocales`   | string[] | Yes      | Extra languages besides English. Options: `'fa'` (Persian), `'ru'` (Russian), `'zh'` (Chinese) | `["ru", "fa"]`                   |
| `branding`            | object   | No       | Your brand customization (all optional)                                                        | See below                        |
| `branding.logoUrl`    | string   | No       | Link to your brand logo image                                                                  | `"https://example.com/logo.png"` |
| `branding.name`       | string   | No       | Your brand name                                                                                | `"MyVPN Service"`                |
| `branding.supportUrl` | string   | No       | Link to your help/support page                                                                 | `"https://example.com/help"`     |

#### App Configuration

| Property                              | Type    | Required | What it does                                      | Example              |
| ------------------------------------- | ------- | -------- | ------------------------------------------------- | -------------------- |
| `id`                                  | string  | ✅ Yes   | Unique name for the app (lowercase, no spaces)    | `"v2rayng"`          |
| `name`                                | string  | ✅ Yes   | App name shown to users                           | `"v2rayNG"`          |
| `isFeatured`                          | boolean | ✅ Yes   | Show this app as recommended (true/false)         | `true`               |
| `isNeedBase64Encoding`                | boolean | ❌ No    | Some apps need special URL encoding               | `true` (for v2rayNG) |
| `urlScheme`                           | string  | ✅ Yes   | How to automatically open the app                 | `"v2rayng://add/"`   |
| `installationStep`                    | object  | ✅ Yes   | Instructions for downloading the app              | See examples above   |
| `addSubscriptionStep`                 | object  | ✅ Yes   | Instructions for adding your subscription         | See examples above   |
| `connectAndUseStep`                   | object  | ✅ Yes   | Instructions for connecting to VPN                | See examples above   |
| `additionalBeforeAddSubscriptionStep` | object  | ❌ No    | Extra steps before adding subscription (advanced) | Optional             |
| `additionalAfterAddSubscriptionStep`  | object  | ❌ No    | Extra steps after adding subscription (advanced)  | Optional             |

### Localization

English is always enabled by default. You can enable additional languages by specifying them in the `additionalLocales` array in the configuration.

All user-facing text supports multiple languages through the `ILocalizedText` interface:

```json
"description": {
  "en": "English text (required)",
  "fa": "Persian text (optional)",
  "ru": "Russian text (optional)",
  "zh": "Chinese text (optional)"
}
```

Note: The `en` field is required for all localized text. Other language fields are optional and should only be included if that language is enabled in `additionalLocales`.

### Example Complete Configuration

Here's a complete example configuration file with multiple platforms and apps:

```json
{
    "config": {
        "additionalLocales": ["fa", "ru"],
        "branding": {
            "logoUrl": "https://example.com/logo.png",
            "name": "My VPN Service",
            "supportUrl": "https://example.com/support"
        }
    },
    "platforms": {
        "ios": [
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
        ],
        "android": [
            {
                "id": "v2rayng",
                "name": "v2rayNG",
                "isFeatured": true,
                "isNeedBase64Encoding": true,
                "urlScheme": "v2rayng://add/",
                "installationStep": {
                    "buttons": [
                        {
                            "buttonLink": "https://play.google.com/store/apps/details?id=com.v2ray.ang",
                            "buttonText": {
                                "en": "Open in Google Play",
                                "fa": "باز کردن در Google Play",
                                "ru": "Открыть в Google Play"
                            }
                        }
                    ],
                    "description": {
                        "en": "Install v2rayNG from Google Play Store",
                        "fa": "v2rayNG را از Google Play Store نصب کنید",
                        "ru": "Установите v2rayNG из Google Play Store"
                    }
                },
                "addSubscriptionStep": {
                    "description": {
                        "en": "Tap the button to add subscription automatically",
                        "fa": "برای افزودن خودکار اشتراک روی دکمه بزنید",
                        "ru": "Нажмите кнопку для автоматического добавления подписки"
                    }
                },
                "connectAndUseStep": {
                    "description": {
                        "en": "Select a server and tap connect",
                        "fa": "یک سرور انتخاب کنید و روی اتصال بزنید",
                        "ru": "Выберите сервер и нажмите подключить"
                    }
                }
            }
        ],
        "windows": [],
        "macos": [],
        "linux": [],
        "androidTV": [],
        "appleTV": []
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

---

### Mounting custom template

This can be helpful if you want fully change UI of the subscription page.

- **The `index.html` file and all files in the `assets` directory must be mounted into the container at the following paths:**

    ```yaml
    volumes:
        - ./index.html:/opt/app/frontend/index.html
        - ./assets:/opt/app/frontend/assets
    ```

    :::tip
    You can find the source `index.html` here:
    [subscription-page/frontend/index.html](https://github.com/remnawave/subscription-page/blob/main/frontend/index.html)

    The `assets` directory is available here:
    [subscription-page/frontend/public/assets](https://github.com/remnawave/subscription-page/tree/main/frontend/public/assets)
    :::

#### Template Variables

Your HTML template must include three variables:

| Variable                 | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `<%= metaTitle %>`       | Will be resolved as META_TITLE (from .env)                                                                 |
| `<%= metaDescription %>` | Will be resolved as META_DESCRIPTION (from .env)                                                           |
| `<%- panelData %>`       | Base64‑encoded data (string), exactly matching the response from the /api/sub/`<shortUuid>`/info endpoint. |

<details>
<summary>Example of using panelData</summary>

```js
let panelData
panelData = '<%- panelData %>'
try {
    panelData = JSON.parse(atob(panelData))
} catch (error) {
    console.error('Error parsing panel data:', error)
}
```

</details>

:::danger
After mounting your template, ensure all three variables are present and used correctly in your code. If so, your subscription page will work out of the box without any further modifications.
:::

Restart the subscription-page container to apply the changes.

```bash
cd /opt/remnawave/subscription && docker compose down && docker compose up -d && docker compose logs -f
```

### Full Example

See the [complete example](https://raw.githubusercontent.com/remnawave/subscription-page/refs/heads/main/frontend/public/assets/app-config.json) to understand how to configure multiple applications across different platforms.
