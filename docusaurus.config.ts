import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

import { themes as prismThemes } from 'prism-react-renderer'
import { ScalarOptions } from '@scalar/docusaurus'

const config: Config = {
    title: 'Remnawave Documentation',
    tagline: 'Remnawave Documentation',
    favicon: 'img/favicon.ico',
    url: 'https://remna.st',
    baseUrl: '/',
    organizationName: 'remnawave',
    projectName: 'panel',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    routeBasePath: '/',
                    editUrl: 'https://github.com/remnawave/panel/tree/main'
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css'
                }
            } satisfies Preset.Options
        ]
    ],

    plugins: [
        // [
        //     '@docusaurus/plugin-client-redirects',
        //     {
        //         redirects: [
        //             // /docs/oldDoc -> /docs/newDoc
        //             {
        //                 to: '/',
        //                 from: '/'
        //             }
        //         ]
        //     }
        // ]
        [
            '@scalar/docusaurus',
            {
                label: '🔗 API Specification',
                route: '/api',
                showNavLink: true, // optional, default is true
                configuration: {
                    spec: {
                        url: 'https://cdn.remna.st/docs/openapi.json'
                    },
                    theme: 'purple',
                    hideDarkModeToggle: true,
                    searchHotKey: 'k',
                    metaData: {
                        title: 'Remnawave API Specification',
                        description: 'Remnawave API Specification',
                        ogDescription: 'Remnawave API Specification',
                        ogTitle: 'Remnawave API Specification'
                    },
                    hideTestRequestButton: true,
                    customCss: `a[href="https://www.scalar.com"][target="_blank"] {
                                display: none !important;
                    }`,
                    darkMode: true,
                    hiddenClients: [
                        'asynchttp',
                        'nethttp',
                        'okhttp',
                        'unirest',
                        'nsurlsession',
                        'httr',
                        'native',
                        'libcurl',
                        'httpclient',
                        'restsharp',
                        'clj_http',
                        'webrequest',
                        'restmethod',
                        'cohttp'
                    ],
                    defaultHttpClient: {
                        targetKey: 'js',
                        clientKey: 'axios'
                    }
                }
            } as ScalarOptions
        ]
    ],
    themeConfig: {
        // image: 'img/docusaurus-social-card.jpg',

        docs: {
            sidebar: {
                hideable: true,
                autoCollapseCategories: false
            }
        },
        navbar: {
            title: 'Remnawave',
            logo: {
                alt: 'Remnawave Logo',
                src: 'img/logo.svg'
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Tutorial'
                },

                {
                    href: 'https://github.com/remnawave',
                    label: 'GitHub',
                    position: 'left'
                }
            ]
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Introduction',
                            to: '/'
                        }
                    ]
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Telegram',
                            href: 'https://t.me/remnawave'
                        },
                        {
                            label: 'Telegram Group',
                            href: 'https://t.me/+cAFRGkqSWJcxNjE6'
                        }
                    ]
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/remnawave'
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Remnawave`
        },
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
            respectPrefersColorScheme: false
        },

        prism: {
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['bash', 'nginx'],
            magicComments: [
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight-next-line',
                    block: { start: 'highlight-start', end: 'highlight-end' }
                },
                {
                    className: 'code-block-error-line',
                    line: 'highlight-next-line-red'
                }
            ]
        }
    } satisfies Preset.ThemeConfig
}

export default config
