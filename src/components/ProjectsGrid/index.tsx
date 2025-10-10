import React from 'react'

import styles from './styles.module.css'

interface ProjectsGridProps {
    children: React.ReactNode
    columns?: 1 | 2 | 3
}

export default function ProjectsGrid({ children, columns = 3 }: ProjectsGridProps) {
    return (
        <div className={styles.projectsGrid} data-columns={columns}>
            {children}
        </div>
    )
}
