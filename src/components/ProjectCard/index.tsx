import GitHubStars from '@site/src/components/GitHubStars'
import Link from '@docusaurus/Link'
import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

interface ProjectCardProps {
    aiPowered?: boolean
    author?: string
    authorLink?: string
    children?: React.ReactNode
    description: string
    featured?: boolean
    githubRepo?: string
    id?: string
    image?: string
    links?: {
        docs?: string
        github?: string
        telegram?: string
        website?: string
    }
    tags?: string[]
    title: string
}

export default function ProjectCard({
    title,
    description,
    author,
    authorLink,
    image,
    links,
    featured = false,
    aiPowered = false,
    githubRepo,
    id,
    children
}: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)

    const projectId =
        id ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsModalOpen(false)
            setIsClosing(false)
        }, 200)
    }

    return (
        <>
            <div className={clsx(styles.projectCard, featured && styles.featured)} id={projectId}>
                <div className={styles.badgesContainer}>
                    {aiPowered && (
                        <div
                            className={styles.aiPoweredBadge}
                            data-tooltip="Author reported that AI was used in development of this product"
                        >
                            <svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" opacity="0.7" />
                            </svg>
                            <span>AI</span>
                        </div>
                    )}
                    {githubRepo && links?.github && (
                        <Link className={styles.starsBadge} to={links.github}>
                            <GitHubStars repo={githubRepo} />
                        </Link>
                    )}
                </div>
                {image && (
                    <div className={styles.imageContainer}>
                        <img alt={title} className={styles.projectImage} src={image} />
                    </div>
                )}
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.titleWrapper}>
                            <h3 className={styles.projectTitle}>
                                <a className={styles.projectAnchor} href={`#${projectId}`}>
                                    {title}
                                </a>
                            </h3>
                            {author && (
                                <div className={styles.authorInfo}>
                                    <span className={styles.byText}>by</span>
                                    {authorLink ? (
                                        <Link className={styles.authorLink} to={authorLink}>
                                            {author}
                                        </Link>
                                    ) : (
                                        <span className={styles.authorName}>{author}</span>
                                    )}
                                </div>
                            )}
                        </div>
                        {featured && <span className={styles.featuredBadge}>⭐ Featured</span>}
                    </div>

                    <p className={styles.description}>{description}</p>

                    {(links || children) && (
                        <div className={styles.links}>
                            {children && (
                                <button
                                    className={clsx(styles.link, styles.installButton)}
                                    onClick={() => setIsModalOpen(true)}
                                    type="button"
                                >
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                    >
                                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                    </svg>
                                    Features & More Info
                                </button>
                            )}
                            {links?.github && (
                                <Link
                                    className={clsx(styles.link, styles.githubLink)}
                                    to={links.github}
                                >
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                    GitHub
                                </Link>
                            )}
                            {links?.docs && (
                                <Link
                                    className={clsx(styles.link, styles.docsLink)}
                                    to={links.docs}
                                >
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                    >
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
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                    >
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
                                    <svg
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        width="16"
                                    >
                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                    </svg>
                                    Website
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && children && (
                <div
                    className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
                    onClick={handleClose}
                >
                    <div
                        className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                <span className={styles.installIcon}>🚀</span>
                                Features & More Info
                            </h2>
                            <button
                                className={styles.closeButton}
                                onClick={handleClose}
                                type="button"
                            >
                                ✕
                            </button>
                        </div>
                        <div className={styles.modalBody}>{children}</div>
                    </div>
                </div>
            )}
        </>
    )
}
