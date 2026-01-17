import React from 'react'

import styles from './styles.module.css'

interface CategorySectionProps {
    children: React.ReactNode
    columns?: 1 | 2 | 3
    description?: string
    icon?: string
    id?: string
    title: string
}

export default function CategorySection({
    title,
    description,
    icon,
    children,
    columns = 3,
    id
}: CategorySectionProps) {
    const sectionId =
        id ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

    return (
        <section className={styles.categorySection}>
            <div className={styles.categoryHeader}>
                <div className={styles.categoryTitleWrapper} id={sectionId}>
                    {icon && <span className={styles.categoryIcon}>{icon}</span>}
                    <h2 className={styles.categoryTitle}>
                        <a className={styles.anchorLink} href={`#${sectionId}`}>
                            {title}
                        </a>
                    </h2>
                </div>
                {description && <p className={styles.categoryDescription}>{description}</p>}
            </div>
            <div className={styles.categoryContent} data-columns={columns}>
                {children}
            </div>
        </section>
    )
}
