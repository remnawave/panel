import GitHubStars from '@site/src/components/GitHubStars'
import Link from '@docusaurus/Link'
import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

type CoreType = 'mihomo' | 'other' | 'singbox' | 'xray'

interface ClientCardProps {
    core: CoreType
    coreIcon?: string
    description: string
    featured?: boolean
    githubRepo?: string
    hwidSupported?: boolean
    id?: string
    links?: {
        docs?: string
        download?: string
        github?: string
        telegram?: string
        website?: string
    }
    logo?: string
    platform?: string
    title: string
}

const CORE_CONFIG: Record<
    CoreType,
    { color: string; darkColor: string; iconSvg?: string; label: string }
> = {
    mihomo: {
        label: 'Mihomo',
        iconSvg: '/clients/mihomo.svg',
        color: '#3a4f66',
        darkColor: '#2a3847'
    },
    xray: {
        label: 'Xray',
        iconSvg: '/clients/xray.svg',
        color: '#4a3d5a',
        darkColor: '#3a2d4a'
    },
    singbox: {
        label: 'Sing-Box',
        iconSvg: '/clients/sb.svg',
        color: '#2d4a3d',
        darkColor: '#1d3a2d'
    },
    other: {
        label: 'Other',
        color: '#3d4349',
        darkColor: '#2d3339'
    }
}

export default function ClientCard({
    title,
    description,
    links,
    core,
    coreIcon,
    logo,
    featured = false,
    hwidSupported = false,
    githubRepo,
    id,
    platform
}: ClientCardProps) {
    const clientId =
        id ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

    const coreConfig = CORE_CONFIG[core] || CORE_CONFIG.other

    return (
        <div
            className={clsx(styles.clientCard, featured && styles.featured)}
            data-core={core}
            id={clientId}
        >
            <div className={styles.cardContent}>
                <div className={styles.badgesRow}>
                    <div className={styles.coreBadge} data-core={core}>
                        {(coreIcon || coreConfig.iconSvg) && (
                            <img
                                alt={coreConfig.label}
                                className={styles.coreIconSvg}
                                src={coreIcon || coreConfig.iconSvg}
                            />
                        )}
                        <span className={styles.coreLabel}>{coreConfig.label}</span>
                    </div>
                    <div className={styles.rightBadges}>
                        {featured && (
                            <span className={styles.featuredBadge}>
                                <svg
                                    className={styles.icon}
                                    fill="#FFD700"
                                    height="15"
                                    viewBox="0 0 16 16"
                                    width="15"
                                >
                                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                                </svg>
                            </span>
                        )}
                        {hwidSupported && (
                            <div
                                className={styles.hwidBadge}
                                data-tooltip="This client supports sending HWID"
                            >
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                                </svg>
                                <span>HWID</span>
                            </div>
                        )}
                        {githubRepo && links?.github && (
                            <Link className={styles.starsBadge} to={links.github}>
                                <GitHubStars repo={githubRepo} />
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.cardHeader}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.clientTitle}>
                            {logo && (
                                <img
                                    alt={`${title} logo`}
                                    className={styles.clientLogo}
                                    src={logo}
                                />
                            )}
                            <a className={styles.clientAnchor} href={`#${clientId}`}>
                                {title}
                            </a>
                        </h3>
                        {platform && <div className={styles.platformBadge}>{platform}</div>}
                    </div>
                </div>

                <p className={styles.description}>{description}</p>

                {links && (
                    <div className={styles.links}>
                        {links?.download && (
                            <Link
                                className={clsx(styles.link, styles.downloadLink)}
                                to={links.download}
                            >
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg>
                                Download
                            </Link>
                        )}

                        {links?.github && (
                            <Link
                                className={clsx(styles.link, styles.githubLink)}
                                to={links.github}
                            >
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                GitHub
                            </Link>
                        )}
                        {links?.docs && (
                            <Link className={clsx(styles.link, styles.docsLink)} to={links.docs}>
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                </svg>
                                Docs
                            </Link>
                        )}
                        {links?.telegram && (
                            <Link
                                className={clsx(styles.link, styles.telegramLink)}
                                to={links.telegram}
                            >
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                                </svg>
                                Telegram
                            </Link>
                        )}

                        {links?.website && (
                            <Link
                                className={clsx(styles.link, styles.websiteLink)}
                                to={links.website}
                            >
                                <svg fill="currentColor" height="14" viewBox="0 0 16 16" width="14">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                </svg>
                                Website
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
