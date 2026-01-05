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
    badges?: {
        featured?: boolean
        hwid?: boolean
    }
    core?: CoreType
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
    logo?: string
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
        logo: '/clients/logo/happ-dark.svg',
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
        logo: '/clients/logo/flclashx-dark.svg',
        badges: {
            featured: true,
            hwid: true
        },
        githubRepo: 'pluralplay/flclashx',
        downloadLinks: {
            android: 'https://github.com/pluralplay/FlClashX/releases/latest',
            windows: 'https://github.com/pluralplay/FlClashX/releases/latest',
            macos: 'https://github.com/pluralplay/FlClashX/releases/latest',
            linux: 'https://github.com/pluralplay/FlClashX/releases/latest'
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
        logo: '/clients/logo/clash-meta-dark.svg',
        githubRepo: 'MetaCubeX/ClashMetaForAndroid',
        downloadLinks: {
            android: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest'
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
        logo: '/clients/logo/flclash-dark.svg',
        githubRepo: 'chen08209/FlClash',
        downloadLinks: {
            android: 'https://github.com/chen08209/FlClash/releases/latest',
            windows: 'https://github.com/chen08209/FlClash/releases/latest',
            macos: 'https://github.com/chen08209/FlClash/releases/latest',
            linux: 'https://github.com/chen08209/FlClash/releases/latest'
        },
        links: {
            github: 'https://github.com/chen08209/FlClash'
        }
    },
    {
        id: 'onexray',
        name: 'OneXray',
        core: 'xray',
        platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
        description: 'Lightweight X-Ray proxy client',
        logo: '/clients/logo/onexray-dark.svg',
        githubRepo: 'OneXray/OneXray',
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=net.yuandev.onexray',
            ios: 'https://apps.apple.com/app/onexray/id6503296188',
            windows: 'https://github.com/OneXray/OneXray/releases/latest',
            macos: 'https://apps.apple.com/app/onexray/id6503296188',
            linux: 'https://github.com/OneXray/OneXray/releases/latest'
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
        logo: '/clients/logo/v2rayng-dark.svg',
        githubRepo: '2dust/v2rayNG',
        downloadLinks: {
            android: 'https://github.com/2dust/v2rayNG/releases/latest'
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
        logo: '/clients/logo/v2box-dark.svg',
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
        logo: '/clients/logo/xray-dark.svg',
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
        description:
            'SimpleXray is a high-performance proxy client for Android, built upon the robust Xray-core.',
        logo: '/clients/logo/simplexray-dark.svg',
        githubRepo: 'lhear/SimpleXray',
        downloadLinks: {
            android: 'https://github.com/lhear/SimpleXray/releases/latest'
        },
        links: {
            github: 'https://github.com/lhear/SimpleXray'
        }
    },
    {
        id: 'singbox',
        name: 'Sing-box',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos'],
        description:
            'Universal proxy platform with multiple protocol support. ⚠️ iOS/macOS version outdated.',
        logo: '/clients/logo/sing-box-dark.svg',
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=io.nekohasekai.sfa',
            ios: 'https://apps.apple.com/us/app/sing-box-vt/id6673731168',
            macos: 'https://apps.apple.com/us/app/sing-box-vt/id6673731168'
        },
        links: {
            github: 'https://github.com/sing-box/sing-box',
            docs: 'https://sing-box.sagernet.org/'
        }
    },
    {
        id: 'husi',
        name: 'Husi',
        core: 'singbox',
        platforms: ['android'],
        description:
            'Husi is a non-professional and recreational proxy tool integration, aiming at promoting proxy customization.',
        logo: '/clients/logo/husi-dark.svg',
        githubRepo: 'xchacha20-poly1305/husi',
        downloadLinks: {
            android: 'https://github.com/xchacha20-poly1305/husi/releases/latest'
        },
        links: {
            github: 'https://github.com/xchacha20-poly1305/husi'
        }
    },
    {
        id: 'nekobox',
        name: 'NekoBox For Android',
        core: 'singbox',
        platforms: ['android'],
        description: 'Sing-box based proxy client with modern UI',
        logo: '/clients/logo/nekobox-dark.svg',
        githubRepo: 'MatsuriDayo/NekoBoxForAndroid',
        downloadLinks: {
            android: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/latest'
        },
        links: {
            telegram: 'https://t.me/nekoray_group',
            docs: 'https://matsuridayo.github.io/',
            github: 'https://github.com/MatsuriDayo/NekoBoxForAndroid'
        }
    },
    {
        id: 'karing',
        name: 'Karing',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos', 'windows'],
        description: 'Multi-platform proxy client based on Sing-box core.',
        logo: '/clients/logo/karing-dark.svg',
        githubRepo: 'KaringX/karing',
        downloadLinks: {
            android: 'https://github.com/KaringX/karing/releases/latest',
            ios: 'https://apps.apple.com/us/app/karing/id6472431552',
            macos: 'https://apps.apple.com/us/app/karing/id6472431552',
            windows: 'https://github.com/KaringX/karing/releases/latest'
        },
        links: {
            github: 'https://github.com/KaringX/karing',
            docs: 'https://karing.app/'
        }
    },
    {
        id: 'prizrakbox',
        name: 'Prizrak-Box',
        core: 'mihomo',
        platforms: ['windows', 'macos', 'linux'],
        description:
            'Desktop client with custom routing templates (includes built-in templates for Russia)',
        logo: '/clients/logo/prizrak-box-dark.svg',
        githubRepo: 'legiz-ru/Prizrak-Box',
        badges: {
            hwid: true
        },
        downloadLinks: {
            windows: 'https://github.com/legiz-ru/Prizrak-Box/releases/latest',
            macos: 'https://github.com/legiz-ru/Prizrak-Box/releases/latest',
            linux: 'https://github.com/legiz-ru/Prizrak-Box/releases/latest'
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
        description: 'A Clash Meta GUI based on Tauri.',
        logo: '/clients/logo/clash-verge-rev.svg',
        githubRepo: 'clash-verge-rev/clash-verge-rev',
        downloadLinks: {
            windows: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/latest',
            macos: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/latest',
            linux: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/latest'
        },
        links: {
            telegram: 'https://t.me/clash_verge_rev',
            github: 'https://github.com/clash-verge-rev/clash-verge-rev'
        }
    },
    {
        id: 'koalaclash',
        name: 'Koala Clash',
        core: 'mihomo',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Fork of Clash Verge Rev with improvements and optimizations.',
        logo: '/clients/logo/koala-clash-dark.svg',
        githubRepo: 'coolcoala/clash-verge-rev-lite',
        badges: {
            hwid: true,
            featured: true
        },
        downloadLinks: {
            windows: 'https://github.com/coolcoala/clash-verge-rev-lite/releases/latest',
            macos: 'https://github.com/coolcoala/clash-verge-rev-lite/releases/latest',
            linux: 'https://github.com/coolcoala/clash-verge-rev-lite/releases/latest'
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
        logo: '/clients/logo/v2rayng-dark.svg',
        githubRepo: '2dust/v2rayN',
        downloadLinks: {
            windows: 'https://github.com/2dust/v2rayN/releases/latest',
            macos: 'https://github.com/2dust/v2rayN/releases/latest',
            linux: 'https://github.com/2dust/v2rayN/releases/latest'
        },
        links: {
            github: 'https://github.com/2dust/v2rayN',
            docs: 'https://github.com/2dust/v2rayN/wiki'
        }
    },
    {
        id: 'throne',
        name: 'Throne (Formerly Nekoray)',
        core: 'singbox',
        platforms: ['windows', 'macos', 'linux'],
        description: 'Feature-rich Sing-box based client.',
        logo: '/clients/logo/throne-dark.svg',
        badges: {
            hwid: true
        },
        githubRepo: 'throneproj/Throne',
        downloadLinks: {
            windows: 'https://github.com/throneproj/Throne/releases/latest',
            macos: 'https://github.com/throneproj/Throne/releases/latest',
            linux: 'https://github.com/throneproj/Throne/releases/latest'
        },
        links: {
            github: 'https://github.com/throneproj/Throne'
        }
    },

    {
        id: 'streisand',
        name: 'Streisand',
        core: 'xray',
        platforms: ['ios', 'macos'],
        description: '⚠️ Sometimes has connection issues!',
        logo: '/clients/logo/straisand-dark.svg',
        downloadLinks: {
            ios: 'https://apps.apple.com/us/app/streisand/id6450534064',
            macos: 'https://apps.apple.com/us/app/streisand/id6450534064'
        }
    },
    {
        id: 'v2raytun',
        name: 'V2rayTun',
        core: 'xray',
        platforms: ['ios', 'macos', 'android', 'windows'],
        description: 'Simple and lightweight Xray client.',
        logo: '/clients/logo/v2raytun-dark.svg',
        badges: {
            hwid: true
        },
        downloadLinks: {
            ios: 'https://apps.apple.com/en/app/v2raytun/id6476628951',
            android: 'https://play.google.com/store/apps/details?id=com.v2raytun.android',
            windows: 'https://v2raytun.com/',
            macos: 'https://apps.apple.com/en/app/v2raytun/id6476628951'
        },
        links: {
            telegram: 'https://t.me/v2raytun',
            website: 'https://v2raytun.com/'
        }
    },
    {
        id: 'stash',
        name: 'Stash',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Advanced proxy client ($7)',
        logo: '/clients/logo/stash-dark.svg',
        downloadLinks: {
            ios: 'https://apps.apple.com/app/stash/id1596063349?platform=iphone',
            macos: 'https://stash.ws/macos/pricing/'
        },
        links: {
            docs: 'https://stash.ws/'
        }
    },
    {
        id: 'shadowrocket',
        name: 'ShadowRocket',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Popular proxy client ($3)',
        logo: '/clients/logo/shadowrocker-dark.svg',
        badges: {
            hwid: true
        },
        downloadLinks: {
            ios: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
            macos: 'https://apps.apple.com/us/app/shadowrocket/id932747118'
        }
    },
    {
        id: 'loon',
        name: 'Loon',
        core: 'other',
        platforms: ['ios', 'macos'],
        description: 'Advanced proxy client with scripting support ($8)',
        logo: '/clients/logo/loon-dark.svg',
        downloadLinks: {
            ios: 'https://apps.apple.com/in/app/loon/id1373567447',
            macos: 'https://apps.apple.com/in/app/loon/id1373567447'
        },
        links: {
            website: 'https://nsloon.app/'
        }
    },

    {
        id: 'clash-mi',
        name: 'Clash Mi',
        core: 'mihomo',
        platforms: ['android', 'ios'],
        description: 'Mihomo client for Android and iOS (Alpha version)',
        logo: '/clients/logo/clash-mi-dark.svg',
        downloadLinks: {
            android: 'https://github.com/KaringX/clashmi/releases/latest',
            ios: 'https://apps.apple.com/us/app/clash-mi/id6744321968'
        },
        links: {
            docs: 'https://clashmi.app'
        }
    },

    {
        id: 'hiddify',
        name: 'Hiddify',
        core: 'singbox',
        platforms: ['android', 'ios', 'macos', 'windows', 'linux'],
        description: '⚠️ No updates since October 2024!',
        logo: '/clients/logo/hiddify-dark.svg',
        githubRepo: 'hiddify/hiddify-app',
        downloadLinks: {
            android: 'https://play.google.com/store/apps/details?id=app.hiddify.com',
            ios: 'https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532',
            macos: 'https://github.com/hiddify/hiddify-app/releases',
            windows: 'https://github.com/hiddify/hiddify-app/releases',
            linux: 'https://github.com/hiddify/hiddify-app/releases'
        },
        links: {
            github: 'https://github.com/hiddify/hiddify-app'
        }
    },

    {
        id: 'clashMac',
        name: 'ClashMac',
        core: 'mihomo',
        platforms: ['macos'],
        description: 'A Modern Proxy Tool Built for macOS',
        logo: 'https://clashmac.app/assets/logo.png',
        downloadLinks: {
            android: 'https://clashmac.app/#download/'
        },
        links: {
            website: 'https://clashmac.app/'
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
