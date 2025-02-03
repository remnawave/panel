import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
    title: 'Remnawave Documentation',
    tagline: 'Remnawave Documentation',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://remna.st',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'remnawave', // Usually your GitHub org/user name.
    projectName: 'panel', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
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
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    routeBasePath: '/',
                    editUrl: 'https://github.com/remnawave/panel/tree/main'
                },
                blog: false
                // theme: {
                //     customCss: './src/css/custom.css'
                // }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        sidebar: {
            hideable: true,
            autoCollapseCategories: false
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
            darkTheme: prismThemes.oneDark
        }
    } satisfies Preset.ThemeConfig
}

export default config
