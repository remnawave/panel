/**
 * Clients Data Source
 *
 * This file contains all proxy clients information.
 * Each client can support multiple platforms with platform-specific download links.
 *
 * @example
 * {
 *   id: 'my-client',
 *   name: 'My Client',
 *   core: 'mihomo',
 *   platforms: ['android', 'windows'],
 *   description: 'Amazing proxy client',
 *   badges: {
 *     featured: true,  // Shows first on all platforms
 *     hwid: true       // Shows HWID badge
 *   },
 *   githubRepo: 'user/repo',  // Shows GitHub stars badge
 *   downloadLinks: {
 *     android: 'https://play.google.com/...',  // Android-specific download
 *     windows: 'https://github.com/.../releases'  // Windows-specific download
 *   },
 *   links: {
 *     github: 'https://github.com/...',
 *     telegram: 'https://t.me/...',
 *     website: 'https://...',
 *     docs: 'https://...'
 *   }
 * }
 */

export type CoreType = 'mihomo' | 'other' | 'singbox' | 'xray'
export type Platform = 'android' | 'ios' | 'linux' | 'macos' | 'windows'

export interface Client {
    author?: string
    authorLink?: string
    badges?: {
        featured?: boolean
        hwid?: boolean
    }
    core: CoreType
    coreIcon?: string
    description: string
    downloadLinks?: {
        android?: string
        ios?: string
        linux?: string
        macos?: string
        windows?: string
    }
    githubRepo?: string
    id: string
    links?: {
        docs?: string
        github?: string
        telegram?: string
        website?: string
    }
    name: string
    platforms: Platform[]
}

export const CLIENTS: Client[] = [
    {
        id: 'happ',
        name: 'Happ',
        core: 'xray',
        platforms: ['android', 'ios', 'macos', 'windows'],
        description: 'Modern and feature-rich proxy client for Android, iOS, macOS, and Windows.',
        badges: {
            featured: true,
            hwid: true
        },
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=com.happproxy',
            ios: 'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
            macos: 'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
            windows:
                'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x86.exe',
            linux: 'https://github.com/Happ-proxy/happ-desktop/releases/'
        },
        links: {
            website: 'https://happ.su/main',
            telegram: 'https://t.me/happ_chat'
        }
    },
    {
        id: 'flclashx',
        name: 'FlClashX',
        core: 'mihomo',
        platforms: ['android', 'windows', 'macos', 'linux'],
        description: 'Fork of FlClash with improvements and additional features.',
        badges: {
            featured: true,
            hwid: true
        },
        githubRepo: 'pluralplay/flclashx',
        downloadLinks: {
            android: 'https://github.com/pluralplay/FlClashX/releases',
            windows: 'https://github.com/pluralplay/FlClashX/releases',
            macos: 'https://github.com/pluralplay/FlClashX/releases',
            linux: 'https://github.com/pluralplay/FlClashX/releases'
        },
        links: {
            github: 'https://github.com/pluralplay/FlClashX',
            telegram: 'https://t.me/flclashx'
        }
    },
    {
        id: 'clash-meta-android',
        name: 'Clash Meta for Android',
        core: 'mihomo',
        platforms: ['android'],
        description: 'A powerful Mihomo-based proxy client for Android',
        githubRepo: 'MetaCubeX/ClashMetaForAndroid',
        downloadLinks: {
            android: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases'
        },
        links: {
            github: 'https://github.com/MetaCubeX/ClashMetaForAndroid'
        }
    },
    {
        id: 'flclash',
        name: 'FlClash',
        core: 'mihomo',
        platforms: ['android', 'windows', 'macos', 'linux'],
        description: 'Multi-platform proxy client based on ClashMeta, simple and easy to use',
        githubRepo: 'chen08209/FlClash',
        downloadLinks: {
            android: 'https://github.com/chen08209/FlClash/releases',
            windows: 'https://github.com/chen08209/FlClash/releases',
            macos: 'https://github.com/chen08209/FlClash/releases',
            linux: 'https://github.com/chen08209/FlClash/releases'
        },
        links: {
            github: 'https://github.com/chen08209/FlClash'
        }
    },
    {
        id: 'clash-mi',
        name: 'Clash Mi',
        core: 'mihomo',
        platforms: ['android', 'ios'],
        description: 'Mihomo client for Android and iOS (Alpha version)',
        links: {
            github: 'https://github.com/placeholder/clash-mi'
        }
    },
    {
        id: 'onexray',
        name: 'OneXray',
        core: 'xray',
        platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
        description: 'Lightweight X-Ray proxy client',
        githubRepo: 'OneXray/OneXray',
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=net.yuandev.onexray',
            ios: 'https://apps.apple.com/app/onexray/id6503296188',
            windows: 'https://github.com/OneXray/OneXray/releases',
            macos: 'https://apps.apple.com/app/onexray/id6503296188',
            linux: 'https://github.com/OneXray/OneXray/releases'
        },
        links: {
            github: 'https://github.com/OneXray/OneXray'
        }
    },
    {
        id: 'v2rayng',
        name: 'V2rayNG',
        core: 'xray',
        platforms: ['android'],
        description: 'Popular and widely-used V2Ray client for Android',
        githubRepo: '2dust/v2rayNG',
        downloadLinks: {
            android: 'https://github.com/2dust/v2rayNG/releases'
        },
        links: {
            github: 'https://github.com/2dust/v2rayNG'
        }
    },
    {
        id: 'v2box',
        name: 'V2Box',
        core: 'xray',
        platforms: ['android', 'ios', 'macos'],
        description: 'Simple V2Ray client with clean interface',
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box',
            ios: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690',
            macos: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690'
        }
    },
    {
        id: 'simple-gui-client',
        name: 'Simple GUI Client',
        core: 'xray',
        platforms: ['android'],
        description: 'Minimalistic V2Ray GUI client for Android',
        author: 'SaeedDev94',
        authorLink: 'https://github.com/SaeedDev94',
        githubRepo: 'SaeedDev94/Xray',
        downloadLinks: {
            android: 'https://github.com/SaeedDev94/Xray/releases'
        },
        links: {
            github: 'https://github.com/SaeedDev94/Xray'
        }
    },
    {
        id: 'simplexray',
        name: 'SimpleXray',
        core: 'xray',
        platforms: ['android'],
        description: 'Straightforward Xray client for Android',
        githubRepo: 'lhear/SimpleXray',
        downloadLinks: {
            android: 'https://github.com/lhear/SimpleXray/releases'
        },
        links: {
            github: 'https://github.com/lhear/SimpleXray'
        }
    },
    {
        id: 'singbox',
        name: 'sing-box',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos'],
        description: 'Universal proxy platform with multiple protocol support',
        links: {
            github: 'https://github.com/placeholder/sing-box',
            website: 'https://play.google.com/store/apps/placeholder'
        }
    },
    {
        id: 'husi',
        name: 'Husi',
        core: 'singbox',
        platforms: ['android'],
        description: 'Feature-rich Sing-box based proxy client',
        links: {
            github: 'https://github.com/placeholder/husi'
        }
    },
    {
        id: 'nekobox',
        name: 'NekoBox',
        core: 'singbox',
        platforms: ['android'],
        description: 'Sing-box based proxy client with modern UI',
        links: {
            github: 'https://github.com/placeholder/nekobox'
        }
    },
    {
        id: 'karing',
        name: 'Karing',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos', 'windows'],
        description: 'Multi-platform proxy client based on Sing-box core',
        links: {
            github: 'https://github.com/placeholder/karing'
        }
    },
    {
        id: 'hiddify',
        name: 'Hiddify',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos', 'windows', 'linux'],
        description: 'Sing-box client (⚠️ No updates since October 2024)',
        links: {
            github: 'https://github.com/placeholder/hiddify'
        }
    },
    {
        id: 'prizrakbox',
        name: 'Prizrak-Box',
        core: 'mihomo',
        platforms: ['windows', 'macos', 'linux'],
        description:
            'Desktop client with custom routing templates (includes built-in templates for Russia)',
        githubRepo: 'legiz-ru/Prizrak-Box',
        badges: {
            hwid: true
        },
        links: {
            github: 'https://github.com/legiz-ru/Prizrak-Box'
        }
    },
    {
        id: 'clash-verge',
        name: 'Clash Verge',
        core: 'mihomo',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Modern Clash Meta GUI based on Tauri framework',
        links: {
            github: 'https://github.com/placeholder/clash-verge'
        }
    },
    {
        id: 'koalaclash',
        name: 'Koala Clash',
        core: 'mihomo',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Fork of Clash Verge Rev with improvements and optimizations.',
        githubRepo: 'coolcoala/clash-verge-rev-lite',
        badges: {
            hwid: true
        },
        links: {
            github: 'https://github.com/coolcoala/clash-verge-rev-lite',
            telegram: 'https://t.me/+WCL__GOFzZJkYjZi'
        }
    },
    {
        id: 'v2rayn',
        name: 'V2rayN',
        core: 'xray',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Popular V2Ray client.',
        links: {
            github: 'https://github.com/placeholder/v2rayn'
        }
    },
    {
        id: 'nekoray',
        name: 'NekoRay',
        core: 'singbox',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Feature-rich Sing-box based client.',
        links: {
            github: 'https://github.com/placeholder/nekoray'
        }
    },

    {
        id: 'streisand',
        name: 'Streisand',
        core: 'xray',
        platforms: ['ios', 'macos'],
        description: 'X-Ray client (⚠️ sometimes has connection issues)',
        links: {
            website: 'https://apps.apple.com/placeholder'
        }
    },
    {
        id: 'v2raytun',
        name: 'V2rayTun',
        core: 'xray',
        platforms: ['ios', 'macos'],
        description: 'V2Ray client with tunnel support',
        links: {
            website: 'https://apps.apple.com/placeholder'
        }
    },
    {
        id: 'stash',
        name: 'Stash',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Advanced proxy client ($7)',
        links: {
            website: 'https://apps.apple.com/placeholder',
            docs: 'https://placeholder.wiki'
        }
    },
    {
        id: 'shadowrocket',
        name: 'ShadowRocket',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Popular proxy client ($3)',
        links: {
            website: 'https://apps.apple.com/placeholder'
        }
    },
    {
        id: 'loon',
        name: 'Loon',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Advanced proxy client with scripting support ($8)',
        links: {
            website: 'https://apps.apple.com/placeholder'
        }
    }
]

export function getClientsByPlatform(platform: Platform): Client[] {
    return CLIENTS.filter((client) => client.platforms.includes(platform)).sort((a, b) => {
        const aFeatured = a.badges?.featured ? 1 : 0
        const bFeatured = b.badges?.featured ? 1 : 0
        return bFeatured - aFeatured
    })
}

export function getPlatformClients() {
    return {
        android: getClientsByPlatform('android'),
        ios: getClientsByPlatform('ios'),
        windows: getClientsByPlatform('windows'),
        macos: getClientsByPlatform('macos'),
        linux: getClientsByPlatform('linux')
    }
}
