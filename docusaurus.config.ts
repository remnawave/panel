import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

import { themes as prismThemes } from 'prism-react-renderer'
import { ScalarOptions } from '@scalar/docusaurus'

const config: Config = {
    title: 'Remnawave Documentation',
    tagline: 'Remnawave Documentation',
    favicon: 'img/favicon.ico',
    url: 'https://docs.rw',
    baseUrl: '/',
    organizationName: 'remnawave',
    projectName: 'panel',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },
    markdown: {
        mermaid: true
    },
    themes: ['@docusaurus/theme-mermaid'],

    headTags: [
        {
            tagName: 'meta',
            attributes: {
                name: 'theme-color',
                content: '#242c38'
            }
        }
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: false,
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/remnawave/panel/tree/main'
                },
                // blog: {
                //     showReadingTime: true,
                //     editUrl: 'https://github.com/remnawave/panel/tree/main'
                // },
                blog: {
                    routeBasePath: '/blog',
                    path: 'blog',
                    showReadingTime: true,
                    // showLastUpdateAuthor: true,
                    // showLastUpdateTime: true,
                    // authorsMapPath: './blog/authors.yaml',
                    postsPerPage: 5,
                    feedOptions: {
                        type: 'all',
                        description:
                            'Keep up to date with upcoming Remnawave releases and articles by following our feed!',
                        copyright: `Copyright © ${new Date().getFullYear()} Remnawave`,
                        xslt: true
                    },
                    blogTitle: 'Remnawave blog',
                    blogDescription: 'Read blog posts about Remnawave from the team',
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All our posts'
                },
                theme: {
                    customCss: './src/css/custom.css'
                }
            } satisfies Preset.Options
        ]
    ],

    plugins: [
        async function myPlugin() {
            return {
                name: 'docusaurus-mantineui',
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer.
                    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
                    postcssOptions.plugins.push(require('postcss-preset-mantine'))
                    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
                    postcssOptions.plugins.push(require('postcss-simple-vars'))
                    return postcssOptions
                }
            }
        },
        [
            '@docusaurus/plugin-client-redirects',
            {
                redirects: [
                    // /docs/oldDoc -> /docs/newDoc
                    {
                        from: '/blog/learn',
                        to: '/docs/learn/quick-start'
                    },
                    {
                        to: '/docs/install/reverse-proxies/',
                        from: '/category/reverse-proxies'
                    },
                    {
                        from: '/docs/',
                        to: '/docs/overview/introduction'
                    },
                    {
                        from: '/donate',
                        to: '/docs/donate'
                    }
                ]
            }
        ],
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
                    orderSchemaPropertiesBy: 'preserve',
                    orderRequiredPropertiesFirst: true,
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
                src: 'img/logo.svg',
                href: 'https://docs.rw'
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: '📓 Docs'
                },
                {
                    href: 'https://hub.remna.st/changelog',
                    label: '🚀 Releases',
                    position: 'left'
                },
                { to: 'blog', label: '📚 Blog', position: 'left' },

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
                            to: '/docs/overview/introduction'
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
            darkTheme: prismThemes.dracula,
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
                },
                {
                    className: 'code-block-success-line',
                    line: 'highlight-next-line-green'
                },
                {
                    className: 'code-block-warning-line',
                    line: 'highlight-next-line-yellow'
                }
            ]
        }
    } satisfies Preset.ThemeConfig
}

export default config
